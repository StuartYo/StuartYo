/* Handwriting engine: mini-LaTeX markup -> jittered handwriting DOM + hand-drawn SVG strokes.
 *
 * Markup (inside text lines):
 *   \frac{a}{b}  \sqrt{x}  x^{2} x_{n}  \vec{AB}  \ov{AB}  \mat{a&b\\c&d}  \cases{..\\..}
 *   \red{..} \green{..} \orange{..} \blue{..} \purple{..} \gray{..}
 *   \box{..} (hand-drawn box)  \circ{..} (ellipse)  \ul{..}  \wavy{..}  \hl{..} (highlighter)
 *   \ok (red ○)  \ng (red ✗)  \ck (✓)  \sum{lo}{hi}  \stk{hi}{lo} (stacked small, e.g. C\stk{9}{4})
 *   \small{..} \big{..}   ~ = small space
 *   symbols: \pi \theta \alpha \beta \le \ge \ne \Ra(⇒) \LR(⇔) \to \times \cdot \pm \deg \ang \tri
 *            \perp \approx \infty \Sig \sig \mu \therefore \because \cdots \equiv \para(∥) \circdeg
 */
(function () {
  // ---------- seeded RNG ----------
  let seed = 20231212;
  function rnd() { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
  const R = (a) => (rnd() - 0.5) * 2 * a;           // uniform in [-a, a]
  window.HW_reseed = (s) => { seed = s; };

  const SYM = { pi: 'π', theta: 'θ', alpha: 'α', beta: 'β', le: '≤', ge: '≥', ne: '≠', Ra: '⇒', LR: '⇔', to: '→',
    times: '×', cdot: '·', pm: '±', deg: '°', ang: '∠', tri: '△', perp: '⊥', approx: '≈', infty: '∞', Sig: 'Σ',
    sig: 'σ', mu: 'μ', therefore: '∴', because: '∵', cdots: '⋯', equiv: '≡', para: '∥', div: '÷', lt: '<', gt: '>',
    amp: '&', bs: '\\', lb: '{', rb: '}', minus: '−', ldots: '…', sim: '∼', prime: '′', in: '∈', cap: '∩', cup: '∪',
    Delta: 'Δ', lam: 'λ', omega: 'ω', phi: 'φ' };
  const ARGS = { frac: 2, sqrt: 1, vec: 1, ov: 1, mat: 1, cases: 1, red: 1, green: 1, orange: 1, blue: 1, purple: 1,
    gray: 1, box: 1, circ: 1, ul: 1, wavy: 1, hl: 1, sum: 2, stk: 2, small: 1, big: 1, sz: 2, ok: 0, ng: 0, ck: 0 };

  // ---------- parser ----------
  function readGroup(s, i) {               // s[i] === '{' ; returns [raw, nextIndex]
    let depth = 0, j = i;
    for (; j < s.length; j++) {
      if (s[j] === '\\') { j++; continue; }
      if (s[j] === '{') depth++;
      else if (s[j] === '}') { depth--; if (depth === 0) break; }
    }
    return [s.slice(i + 1, j), j + 1];
  }
  function readArg(s, i) {
    while (s[i] === ' ') i++;
    if (s[i] === '{') return readGroup(s, i);
    if (s[i] === '\\') { const m = /^\\([a-zA-Z]+)/.exec(s.slice(i)); if (m) return [m[0], i + m[0].length]; }
    return [s[i] || '', i + 1];
  }
  function splitTop(raw, sep) {            // split on sep at brace depth 0
    const out = []; let depth = 0, cur = '';
    for (let i = 0; i < raw.length; i++) {
      const c = raw[i];
      if (c === '\\' && raw.startsWith(sep, i) && depth === 0) { out.push(cur); cur = ''; i += sep.length - 1; continue; }
      if (c === '\\') { cur += c + (raw[i + 1] || ''); i++; continue; }
      if (c === '{') depth++; if (c === '}') depth--;
      if (depth === 0 && raw.startsWith(sep, i)) { out.push(cur); cur = ''; i += sep.length - 1; continue; }
      cur += c;
    }
    out.push(cur); return out;
  }
  function parse(s) {
    const nodes = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === '\\') {
        const m = /^\\([a-zA-Z]+)/.exec(s.slice(i));
        if (!m) { nodes.push({ t: 'ch', c: s[i + 1] }); i += 2; continue; }
        const name = m[1]; i += m[0].length;
        if (SYM[name] !== undefined) { nodes.push({ t: 'ch', c: SYM[name] }); if (s[i] === ' ' && /[a-zA-Z]/.test(name)) i++; continue; }
        const n = ARGS[name];
        if (n === undefined) { nodes.push({ t: 'ch', c: name }); continue; }
        const args = [];
        for (let k = 0; k < n; k++) { const [a, j] = readArg(s, i); args.push(a); i = j; }
        nodes.push({ t: name, args });
      } else if (c === '^' || c === '_') {
        const [a, j] = readArg(s, i + 1); nodes.push({ t: c === '^' ? 'sup' : 'sub', args: [a] }); i = j;
      } else if (c === '~') { nodes.push({ t: 'sp', w: 0.28 }); i++; }
      else if (c === ' ') { nodes.push({ t: 'sp', w: 0.3 }); i++; while (s[i] === ' ') i++; }
      else { nodes.push({ t: 'ch', c }); i++; }
    }
    return nodes;
  }

  // ---------- DOM building ----------
  const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };
  const CJK = /[　-鿿＀-￯]/;
  function glyph(c) {
    const s = el('span', 'g');
    const minus = c === '−';
    s.textContent = minus ? '-' : c;
    const cjk = CJK.test(c);
    const rot = R(cjk ? 3.0 : 3.8), ty = R(0.055), sc = 1 + R(0.05), sx = 1 + R(0.035);
    s.style.transform = `translateY(${ty.toFixed(3)}em) rotate(${rot.toFixed(2)}deg) scale(${(sc * sx).toFixed(3)}, ${sc.toFixed(3)})`;
    let ls = cjk ? R(0.035) : 0.01 + R(0.03);
    if (/[0-9]/.test(c)) ls += 0.06;
    if (minus) { s.style.transform += ' scaleX(1.35)'; s.style.margin = '0 0.1em'; ls += 0.08; }
    s.style.marginRight = ls.toFixed(3) + 'em';
    return s;
  }
  function deco(cls, kind) { const d = el('span', 'deco ' + cls); d.dataset.deco = kind; return d; }
  function build(src, parent) {
    for (const n of parse(src)) parent.appendChild(node(n));
    return parent;
  }
  function node(n) {
    switch (n.t) {
      case 'ch': return glyph(n.c);
      case 'sp': { const s = el('span', 'sp'); s.style.width = (n.w + R(0.06)).toFixed(3) + 'em'; return s; }
      case 'frac': { const d = deco('frac', 'frac'); const a = el('span', 'num'), b = el('span', 'fbar'), c = el('span', 'den');
        build(n.args[0], a); build(n.args[1], c); d.append(a, b, c); return d; }
      case 'sqrt': { const d = deco('sqrt', 'sqrt'); build(n.args[0], d); return d; }
      case 'vec': { const d = deco('vec', 'vec'); build(n.args[0], d); return d; }
      case 'ov': { const d = deco('ov', 'ov'); build(n.args[0], d); return d; }
      case 'sup': case 'sub': { const d = el('span', n.t); build(n.args[0], d); return d; }
      case 'mat': { const d = deco('mat', 'mat'); const g = el('span', 'grid');
        const rows = splitTop(n.args[0], '\\\\').map(r => splitTop(r, '&'));
        g.style.gridTemplateColumns = `repeat(${Math.max(...rows.map(r => r.length))}, auto)`;
        rows.forEach(r => r.forEach(cell => { const c = el('span'); build(cell.trim(), c); g.appendChild(c); }));
        d.appendChild(g); return d; }
      case 'cases': { const d = deco('cases', 'cases');
        splitTop(n.args[0], '\\\\').forEach(r => { const l = el('span', 'ln'); build(r.trim(), l); d.appendChild(l); }); return d; }
      case 'red': case 'green': case 'orange': case 'blue': case 'purple': case 'gray': {
        const s = el('span', 'c-' + n.t); s.style.display = 'inline'; build(n.args[0], s); return s; }
      case 'box': case 'circ': case 'ul': case 'wavy': case 'hl': { const d = deco(n.t, n.t); build(n.args[0], d); return d; }
      case 'ok': case 'ng': case 'ck': { const d = deco('mk', n.t); d.classList.add('c-' + (n.t === 'ck' ? 'green' : 'red')); return d; }
      case 'sum': { const d = deco('sum', 'none'); const hi = el('span', 'lim'), big = el('span', 'big'), lo = el('span', 'lim');
        build(n.args[1], hi); big.appendChild(glyph('Σ')); build(n.args[0], lo); d.append(hi, big, lo); return d; }
      case 'stk': { const d = deco('stk', 'none'); const a = el('span'), b = el('span'); build(n.args[0], a); build(n.args[1], b); d.append(a, b); return d; }
      case 'small': case 'big': { const s = el('span', n.t); build(n.args[0], s); return s; }
      case 'sz': { const s = el('span'); s.style.fontSize = n.args[0]; build(n.args[1], s); return s; }
    }
    return el('span');
  }

  // ---------- hand-drawn stroke geometry ----------
  const f2 = (v) => v.toFixed(2);
  function wline(x1, y1, x2, y2, o = {}) {
    const j = o.j ?? 0.5, L = Math.hypot(x2 - x1, y2 - y1) || 1;
    const amp = (o.bow ?? 1) * Math.min(2.2, 0.35 + L * 0.008);
    const nx = -(y2 - y1) / L, ny = (x2 - x1) / L, off = R(amp);
    const t = 0.5 + R(0.12);
    const cx = x1 + (x2 - x1) * t + nx * off, cy = y1 + (y2 - y1) * t + ny * off;
    return `M${f2(x1 + R(j))} ${f2(y1 + R(j))} Q${f2(cx)} ${f2(cy)} ${f2(x2 + R(j))} ${f2(y2 + R(j))}`;
  }
  function wpoly(pts, closed, o = {}) {
    let d = ''; const P = closed ? pts.concat([pts[0]]) : pts;
    for (let i = 0; i < P.length - 1; i++) d += wline(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1], o) + ' ';
    return d;
  }
  function smooth(pts) {                    // Catmull-Rom through points -> cubic Bezier path
    if (pts.length < 2) return '';
    let d = `M${f2(pts[0][0])} ${f2(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f2(c1[0])} ${f2(c1[1])} ${f2(c2[0])} ${f2(c2[1])} ${f2(p2[0])} ${f2(p2[1])}`;
    }
    return d;
  }
  function wellipse(cx, cy, rx, ry, o = {}) {
    const n = 28, a0 = (o.start ?? -2.2) + R(0.3), over = o.over ?? (0.22 + rnd() * 0.18);
    const ph1 = rnd() * 6.28, ph2 = rnd() * 6.28, k = o.wob ?? 0.035; const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + (Math.PI * 2 + over) * i / n;
      const w = 1 + k * Math.sin(2 * a + ph1) + k * 0.6 * Math.sin(3 * a + ph2) + (i / n) * (o.drift ?? 0.04);
      pts.push([cx + rx * w * Math.cos(a), cy + ry * w * Math.sin(a)]);
    }
    return smooth(pts);
  }
  function wcurve(pts, o = {}) {            // jittered smooth curve through points
    const j = o.j ?? 0.4; return smooth(pts.map(p => [p[0] + R(j), p[1] + R(j)]));
  }
  function arrowHead(x1, y1, x2, y2, size) {
    const a = Math.atan2(y2 - y1, x2 - x1), s = size, sp = 0.45 + R(0.06);
    const p1 = [x2 - s * Math.cos(a - sp), y2 - s * Math.sin(a - sp)], p2 = [x2 - s * Math.cos(a + sp), y2 - s * Math.sin(a + sp)];
    return `M${f2(p1[0])} ${f2(p1[1])} L${f2(x2)} ${f2(y2)} L${f2(p2[0])} ${f2(p2[1])}`;
  }
  window.HWG = { wline, wpoly, smooth, wellipse, wcurve, arrowHead, R, rnd };

  // ---------- decorations drawn after layout ----------
  const NS = 'http://www.w3.org/2000/svg';
  function svgFor(elm, w, h) {
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('class', 'd');
    s.setAttribute('width', w); s.setAttribute('height', h); s.style.width = w + 'px'; s.style.height = h + 'px';
    elm.appendChild(s); return s;
  }
  function path(svg, d, o = {}) {
    const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', o.fill || 'none');
    p.setAttribute('stroke', o.stroke || 'currentColor'); p.setAttribute('stroke-width', o.w);
    p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
    if (o.dash) p.setAttribute('stroke-dasharray', o.dash); if (o.op) p.setAttribute('opacity', o.op);
    svg.appendChild(p); return p;
  }
  function drawDecos(root) {
    const els = [...root.querySelectorAll('[data-deco]')].filter(e => e.dataset.deco !== 'none');
    // measure first (no layout thrash between writes)
    const meas = els.map(e => ({ e, w: e.offsetWidth, h: e.offsetHeight, fs: parseFloat(getComputedStyle(e).fontSize) }));
    for (const { e, w, h, fs } of meas) {
      const k = e.dataset.deco, sw = Math.max(1.05, fs * 0.085);
      const svg = svgFor(e, w, h);
      if (k === 'frac') {
        const bar = e.querySelector(':scope > .fbar'); const y = bar.offsetTop + bar.offsetHeight / 2;
        path(svg, wline(-1 + R(1), y + R(0.4), w + 1 + R(1), y + R(0.6), { bow: 0.6 }), { w: sw });
      } else if (k === 'sqrt') {
        const a = fs * 0.62, top = fs * 0.12;
        const d = `M${f2(a * 0.02)} ${f2(h * 0.6)} L${f2(a * 0.24)} ${f2(h * 0.52 + R(0.5))} L${f2(a * 0.5 + R(0.5))} ${f2(h - 1 + R(0.6))} L${f2(a * 0.86)} ${f2(top + R(0.4))} ` +
          wline(a * 0.86, top, w + 1 + R(1.2), top + R(0.8), { bow: 0.5 }).replace(/^M[^Q]+/, '');
        path(svg, d, { w: sw });
      } else if (k === 'vec') {
        const y = fs * 0.15, x2 = w - 1;
        path(svg, wline(1, y + R(0.3), x2, y + R(0.3), { bow: 0.5 }) + ' ' + arrowHead(1, y, x2, y, fs * 0.28), { w: sw * 0.9 });
      } else if (k === 'ov') {
        path(svg, wline(1, fs * 0.08, w - 1, fs * 0.08 + R(0.4), { bow: 0.4 }), { w: sw * 0.9 });
      } else if (k === 'mat') {
        const b = fs * 0.22, t = 1, bt = h - 1;
        path(svg, `M${f2(b + 1 + R(0.4))} ${f2(t + R(0.3))} L${f2(1 + R(0.3))} ${f2(t + 0.5)} L${f2(1 + R(0.5))} ${f2(bt)} L${f2(b + 1 + R(0.4))} ${f2(bt + R(0.3))}`, { w: sw });
        path(svg, `M${f2(w - b - 1 + R(0.4))} ${f2(t + R(0.3))} L${f2(w - 1 + R(0.3))} ${f2(t + 0.5)} L${f2(w - 1 + R(0.5))} ${f2(bt)} L${f2(w - b - 1 + R(0.4))} ${f2(bt + R(0.3))}`, { w: sw });
      } else if (k === 'cases') {
        const x = fs * 0.36, m = h / 2;
        path(svg, smooth([[x + 2, 1], [x - 1, 3], [x - 1, m - 4], [x - fs * 0.32, m], [x - 1, m + 4], [x - 1, h - 3], [x + 2, h - 1]]), { w: sw });
      } else if (k === 'box') {
        path(svg, wpoly([[-1, -1], [w + 1, 0], [w, h + 1], [0, h]], true, { bow: 0.5, j: 0.8 }), { w: sw, stroke: 'var(--red)' });
      } else if (k === 'circ') {
        path(svg, wellipse(w / 2, h / 2, w / 2 + 1, h / 2 + 0.5), { w: sw, stroke: 'var(--red)' });
      } else if (k === 'ul') {
        path(svg, wline(0, h - 1, w, h - 1 + R(0.8)), { w: sw });
      } else if (k === 'wavy') {
        const pts = []; for (let x = 0; x <= w; x += fs * 0.18) pts.push([x, h - fs * 0.1 + Math.sin(x / (fs * 0.18) * Math.PI) * fs * 0.07]);
        path(svg, smooth(pts), { w: sw * 0.85 });
      } else if (k === 'hl') {
        const p = path(svg, wline(-2, h * 0.55, w + 2, h * 0.55 + R(1), { bow: 0.3 }), { w: h * 0.62, stroke: 'var(--hl)' });
        svg.style.zIndex = -1; p.setAttribute('stroke-linecap', 'butt'); svg.style.mixBlendMode = 'multiply';
      } else if (k === 'ok') {
        path(svg, wellipse(w / 2, h / 2, w * 0.44, h * 0.44, { over: 0.35 }), { w: sw * 1.1 });
      } else if (k === 'ng') {
        path(svg, wline(w * 0.12, h * 0.12, w * 0.88, h * 0.88) + ' ' + wline(w * 0.86, h * 0.1, w * 0.14, h * 0.9), { w: sw * 1.1 });
      } else if (k === 'ck') {
        path(svg, `M${f2(w * 0.08)} ${f2(h * 0.52)} Q${f2(w * 0.25)} ${f2(h * 0.7)} ${f2(w * 0.38)} ${f2(h * 0.92)} Q${f2(w * 0.6)} ${f2(h * 0.4)} ${f2(w * 0.95)} ${f2(h * 0.06)}`, { w: sw * 1.1 });
      }
    }
  }

  // ---------- page API ----------
  window.HW = {
    build, drawDecos, path, wline, wpoly, wellipse, wcurve, smooth, arrowHead,
    // text block at (x, y) top-left; lines = array of markup strings
    text(page, x, y, lines, o = {}) {
      const b = el('div', 'hw'); b.style.left = x + 'px'; b.style.top = y + 'px';
      b.style.fontSize = (o.s || 15) + 'px'; if (o.c) b.classList.add('c-' + o.c);
      if (o.lh) b.style.lineHeight = o.lh; if (o.rot) b.style.transform = `rotate(${o.rot}deg)`;
      (Array.isArray(lines) ? lines : [lines]).forEach((l, i) => {
        const ln = el('span', 'ln'); build(l, ln);
        ln.style.transformOrigin = '0 60%'; ln.style.transform = `rotate(${R(o.tilt ?? 0.35).toFixed(2)}deg) translateX(${R(1.2).toFixed(1)}px)`;
        if (o.gap && i) ln.style.marginTop = o.gap + 'px';
        if (o.indent && o.indent[i]) ln.style.paddingLeft = o.indent[i] + 'px';
        b.appendChild(ln);
      });
      page.appendChild(b); return b;
    },
  };
})();
