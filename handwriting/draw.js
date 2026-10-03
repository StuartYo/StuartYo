/* Page-level hand-drawn sketch layer (coordinates = 96-dpi page px). */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const COL = { blue: 'var(--blue)', red: 'var(--red)', green: 'var(--green)', orange: 'var(--orange)',
    purple: 'var(--purple)', gray: 'var(--gray)', hl: 'var(--hl)' };
  const col = (c) => COL[c] || c || COL.blue;
  const { R } = window.HWG;

  class Sketch {
    constructor(page) {
      this.page = page;
      this.svg = document.createElementNS(NS, 'svg');
      this.svg.setAttribute('class', 'layer');
      this.svg.setAttribute('viewBox', '0 0 793.6 1122.56');
      page.appendChild(this.svg);
    }
    _p(d, o = {}) {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d); p.setAttribute('fill', o.fill ? col(o.fill) : 'none');
      p.setAttribute('stroke', (o.fill && !o.stroke) || o.c === 'none' ? 'none' : col(o.c));
      p.setAttribute('stroke-width', o.w ?? 1.45);
      p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
      if (o.dash) p.setAttribute('stroke-dasharray', o.dash === true ? '4.5 3.5' : o.dash);
      if (o.op) p.setAttribute('opacity', o.op);
      this.svg.appendChild(p); return this;
    }
    line(x1, y1, x2, y2, o = {}) {
      let d = HW.wline(x1, y1, x2, y2, o);
      if (o.arrow) d += ' ' + HW.arrowHead(x1, y1, x2, y2, o.head ?? 7);
      if (o.arrow2) d += ' ' + HW.arrowHead(x2, y2, x1, y1, o.head ?? 7);
      return this._p(d, o);
    }
    arrow(x1, y1, x2, y2, o = {}) { return this.line(x1, y1, x2, y2, { ...o, arrow: true }); }
    poly(pts, o = {}) {
      if (o.fill) {                         // filled shapes need one continuous closed path
        let d = `M${pts[0][0] + R(0.4)} ${pts[0][1] + R(0.4)}`;
        const P = pts.concat([pts[0]]);
        for (let i = 1; i < P.length; i++) {
          const [x1, y1] = P[i - 1], [x2, y2] = P[i];
          d += ` Q${(x1 + x2) / 2 + R(0.6)} ${(y1 + y2) / 2 + R(0.6)} ${x2 + R(0.4)} ${y2 + R(0.4)}`;
        }
        this._p(d + ' Z', { ...o, w: 0, stroke: false, c: 'none' });
        return o.w ? this._p(HW.wpoly(pts, true, o), { ...o, fill: null }) : this;
      }
      return this._p(HW.wpoly(pts, !!o.closed, o), o);
    }
    curve(pts, o = {}) { return this._p(HW.wcurve(pts, o), o); }
    fn(f, x0, x1, map, o = {}) {           // plot y=f(x); map(x,y)->[px,py]
      const pts = [], n = o.n || 40;
      for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; pts.push(map(x, f(x))); }
      return this.curve(pts, { j: 0.25, ...o });
    }
    ellipse(cx, cy, rx, ry, o = {}) { return this._p(HW.wellipse(cx, cy, rx, ry, o), o); }
    circle(cx, cy, r, o = {}) { return this.ellipse(cx, cy, r, r, { wob: 0.012, over: 0.12, drift: 0.008, ...o }); }
    dot(x, y, o = {}) { return this._p(HW.wellipse(x, y, o.r ?? 2, o.r ?? 2, { wob: 0.05, over: 0.4 }), { ...o, fill: o.c || 'blue', w: 0.8 }); }
    arc(cx, cy, r, a0, a1, o = {}) {        // degrees, math orientation (counter-clockwise, y up)
      const pts = []; const n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 8));
      for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]); }
      let d = HW.smooth(pts);
      if (o.arrow) { const p = pts[pts.length - 2], q = pts[pts.length - 1]; d += ' ' + HW.arrowHead(p[0], p[1], q[0], q[1], o.head ?? 6); }
      return this._p(d, o);
    }
    rightAngle(x, y, ux, uy, vx, vy, s = 6, o = {}) {   // corner at (x,y) along unit dirs u, v
      const a = [x + ux * s, y + uy * s], b = [x + (ux + vx) * s, y + (uy + vy) * s], c = [x + vx * s, y + vy * s];
      return this._p(`M${a[0]} ${a[1]} L${b[0] + R(0.3)} ${b[1] + R(0.3)} L${c[0]} ${c[1]}`, { w: 1.1, ...o });
    }
    label(x, y, markup, o = {}) { return HW.text(this.page, x, y, markup, { s: 12, ...o }); }
  }
  window.Sketch = Sketch;
})();
