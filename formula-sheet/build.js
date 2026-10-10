// 產生「高中數學公式總表」師用版與學生默寫版 PDF。
// 用法：node build.js <輸出資料夾>
// 需要：npm install（katex）、Playwright + Chromium、fonts/NotoSansTC.ttf（見 README）
const fs = require('fs');
const path = require('path');
const katex = require('katex');
const { sections, numbers } = require('./data');

let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const outDir = path.resolve(process.argv[2] || path.join(__dirname, 'out'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// "$...$" = math, everything else = text
function mixed(src, display = false) {
  return src.split(/(\$[^$]+\$)/).map((part) => {
    if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
      const tex = (display ? '\\displaystyle ' : '') + part.slice(1, -1);
      return katex.renderToString(tex, { throwOnError: true, strict: 'ignore', output: 'html' });
    }
    return esc(part);
  }).join('');
}

const TAG = { A: '<span class="tag A">數A</span>', B: '<span class="tag B">數B</span>' };

function rows() {
  let n = 0, html = '', lastPart = '';
  for (const s of sections) {
    if (s.part !== lastPart) {
      const note = s.elective ? '<small>分科測驗範圍，學測不考</small>' : '';
      html += `<div class="part${s.elective ? ' elective' : ''}">${esc(s.part)}${note}</div>`;
      lastPart = s.part;
    }
    html += `<div class="sec${s.elective ? ' elective' : ''}">${esc(s.title)}</div>`;
    for (const it of s.items) {
      n++;
      const lines = (Array.isArray(it.f) ? it.f : [it.f]).map((l) => `<div>${mixed(l, true)}</div>`).join('');
      const cond = it.c ? `<div class="cond">條件：${mixed(it.c)}</div>` : '';
      const hint = it.h ? `<span class="hint">${mixed(it.h)}</span>` : '';
      html += `<div class="row"><div class="no">${n}</div>`
        + `<div class="name"><b>${mixed(it.n)}</b>${it.t ? TAG[it.t] : ''}${hint}</div>`
        + `<div class="ans">${lines}${cond}</div></div>`;
    }
  }
  return { html, count: n };
}

function numberCards() {
  let count = 0;
  const cards = numbers.map((g) => {
    if (g.grid) {
      const head = g.grid.head.map((h) => `<th>${mixed(h)}</th>`).join('');
      const body = g.grid.rows.map((r) => {
        count += r.length - 1;
        return `<tr><td class="k">${mixed(r[0])}</td>`
          + r.slice(1).map((v) => (v.includes('$') ? `<td class="v">${mixed(v)}</td>` : `<td class="v txt">${esc(v)}</td>`)).join('') + '</tr>';
      }).join('');
      return `<div class="card wide"><h3>${esc(g.title)}</h3><table class="trig"><tr>${head}</tr>${body}</table></div>`;
    }
    count += g.items.length;
    const half = Math.ceil(g.items.length / 2);
    let body = '';
    for (let i = 0; i < half; i++) {
      const a = g.items[i], b = g.items[i + half];
      body += `<tr><td class="k">${mixed(a[0])}</td><td class="v">${mixed(a[1])}</td>`
        + (b ? `<td class="k">${mixed(b[0])}</td><td class="v">${mixed(b[1])}</td>` : '<td class="k"></td><td class="v"></td>') + '</tr>';
    }
    return `<div class="card"><h3>${mixed(g.title.replace(/log/g, '$\\log$'))}</h3><table>${body}</table></div>`;
  }).join('');
  return { html: cards, count };
}

function page(version) {
  const { html: body, count } = rows();
  const { html: nums, count: numCount } = numberCards();
  const teacher = version === 'teacher';
  const badge = teacher ? '師用版（標準答案）' : '學生默寫版';
  // same header in both versions so rows and page breaks line up; the teacher copy just hides it
  const info = `<div class="info"><label>姓名<span></span></label><label>日期<span></span></label><label>答對<span class="short"></span>／ ${count + numCount}</label></div>`;
  const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<title>高中數學公式總表・${badge}</title>
<link rel="stylesheet" href="katex/katex.min.css"><link rel="stylesheet" href="style.css"></head>
<body class="${version}">
<div class="head"><div><h1>高中數學公式總表</h1>
<div class="sub">高一～高三全範圍（108 課綱）・共 ${count} 個公式 ＋ ${numCount} 個常見數值</div></div>
<div class="badge">${badge}</div></div>
${info}
<div class="legend">標示 <span class="tag A">數A</span> 的只有數A 學、<span class="tag B">數B</span> 的只有數B 學，沒有標示的兩科都要背；
橘色的「高三・選修」是分科測驗（數甲／數乙）範圍。默寫時寫出完整公式，有成立條件的也要寫。</div>
${body}
<div class="part">常見數值</div>
<div class="nums">${nums}</div>
</body></html>`;
  return { html, total: count + numCount };
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  fs.cpSync(path.join(__dirname, 'node_modules/katex/dist'), path.join(outDir, 'katex'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'style.css'), path.join(outDir, 'style.css'));
  fs.cpSync(path.join(__dirname, 'fonts'), path.join(outDir, 'fonts'), { recursive: true });

  const browser = await chromium.launch();
  for (const [version, label, file] of [['teacher', '師用版', '高中數學公式總表-師用版.pdf'], ['student', '學生默寫版', '高中數學公式總表-學生默寫版.pdf']]) {
    const { html, total } = page(version);
    const htmlPath = path.join(outDir, `${version}.html`);
    fs.writeFileSync(htmlPath, html);
    const p = await browser.newPage();
    await p.goto('file://' + htmlPath);
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({
      path: path.join(outDir, file), format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<div></div>',
      footerTemplate: `<div style="width:100%;font-size:8px;color:#7a8594;padding:0 12mm;display:flex;justify-content:space-between;font-family:'Noto Sans TC',sans-serif">
        <span>高中數學公式總表・${label}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });
    await p.close();
    console.log(`${file}: ${total} 項`);
  }
  await browser.close();
})();
