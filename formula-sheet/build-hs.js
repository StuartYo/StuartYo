// 依「高中數學全範圍」網站（hs-math，自編講義 17 章）的章節與公式，
// 產生公式總表的師用版與學生默寫版 PDF。
//
// 用法：node build-hs.js <hs-math 資料夾> <輸出資料夾> [公式 JSON]
//   公式來源預設讀 <hs-math>/chapters/chXX.js 的 formulas；
//   若給了第三個參數，改用該 JSON（{ ch01: [...], ... }，格式同 formulas 陣列）。
// 章節順序、冊別、標題取自 <hs-math>/assets/chapters.js，數學式用 <hs-math>/assets/mathlite.js 排版，
// 所以公式長相和網站上完全一樣。講義內容不會被複製進這個 repo。
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const [hsDir, outArg, formulasJson] = process.argv.slice(2);
if (!hsDir) { console.error('用法：node build-hs.js <hs-math 資料夾> <輸出資料夾> [公式 JSON]'); process.exit(1); }
const outDir = path.resolve(outArg || path.join(__dirname, 'out'));

// ---------- load the site's own data and renderer ----------
function runInWindow(file, win = {}) {
  const ctx = { window: win, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file, timeout: 5000 });
  return ctx.window;
}
const site = runInWindow(path.join(hsDir, 'assets/chapters.js'));
const mathlite = runInWindow(path.join(hsDir, 'assets/mathlite.js')).mathlite;

function chapterFormulas() {
  if (formulasJson) return JSON.parse(fs.readFileSync(formulasJson, 'utf8'));
  const out = {};
  for (const ch of site.CHAPTERS) {
    const win = runInWindow(path.join(hsDir, 'chapters', ch.id + '.js'), { CHAPTER_DATA: {} });
    out[ch.id] = (win.CHAPTER_DATA[ch.id] || {}).formulas || [];
  }
  return out;
}
const formulas = chapterFormulas();

// ---------- common values (not part of the notes; written in mathlite syntax) ----------
const SQRT = [['sqrt(1)', '1'], ['sqrt(2)', '≈ $1.414$'], ['sqrt(3)', '≈ $1.732$'], ['sqrt(4)', '2'], ['sqrt(5)', '≈ $2.236$'],
  ['sqrt(6)', '≈ $2.449$'], ['sqrt(7)', '≈ $2.646$'], ['sqrt(8)', '≈ $2.828$'], ['sqrt(9)', '3'], ['sqrt(10)', '≈ $3.162$']];
const LOG = [['log thin 1', '0'], ['log thin 2', '≈ $0.3010$'], ['log thin 3', '≈ $0.4771$'], ['log thin 4', '≈ $0.6021$'], ['log thin 5', '≈ $0.6990$'],
  ['log thin 6', '≈ $0.7782$'], ['log thin 7', '≈ $0.8451$'], ['log thin 8', '≈ $0.9031$'], ['log thin 9', '≈ $0.9542$'], ['log thin 10', '1']];
const TRIG = [
  ['0 deg', '0', '1', '0'],
  ['30 deg quad (frac(pi, 6))', 'frac(1, 2)', 'frac(sqrt(3), 2)', 'frac(sqrt(3), 3)'],
  ['45 deg quad (frac(pi, 4))', 'frac(sqrt(2), 2)', 'frac(sqrt(2), 2)', '1'],
  ['60 deg quad (frac(pi, 3))', 'frac(sqrt(3), 2)', 'frac(1, 2)', 'sqrt(3)'],
  ['90 deg quad (frac(pi, 2))', '1', '0', null],
  ['15 deg', 'frac(sqrt(6) - sqrt(2), 4)', 'frac(sqrt(6) + sqrt(2), 4)', '2 - sqrt(3)'],
  ['75 deg', 'frac(sqrt(6) + sqrt(2), 4)', 'frac(sqrt(6) - sqrt(2), 4)', '2 + sqrt(3)'],
];
const CONST = [['pi', '≈ $3.1416$'], ['e', '≈ $2.718$']];

// ---------- HTML ----------
const T = (s) => mathlite.typeset(s);           // $$block$$ and $inline$ → MathML, same as the site

// A few notes write math as plain text (outside $…$), which the site shows raw: "x_0 pm r", "sqrt(2)".
// Tidy only those patterns (plus one Markdown **bold**), and only outside $…$, so the printout reads cleanly.
function tidyNote(note) {
  return note.split(/(\$[^$]*\$)/).map((part) => (part.startsWith('$') ? part : part
    .replace(/\bpm\b/g, '±')
    .replace(/sqrt\(([^()]+)\)/g, '√$1')
    .replace(/\b([A-Za-z])_([0-9A-Za-z])\b/g, '$1<sub>$2</sub>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>'))).join('');
}
const m = (s) => T('$' + s + '$');
const val = (s) => `<span>${s.includes('$') ? T(s) : m(s)}</span>`;   // one element, so the student copy can hide it whole

function rowsHtml() {
  let n = 0, html = '', lastBook = '';
  for (const ch of site.CHAPTERS) {
    if (ch.book !== lastBook) {
      const b = site.BOOKS.find((x) => x.id === ch.book);
      const elective = ch.book === 'c';
      html += `<div class="part${elective ? ' elective' : ''}">${b.name.replace(/\s+/g, ' ')}`
        + `<small>${elective ? '分科測驗範圍，學測不考' : b.sub}</small></div>`;
      lastBook = ch.book;
    }
    const tag = ch.mathA ? '<span class="tag A">數A</span>' : '';
    html += `<div class="chap${ch.book === 'c' ? ' elective' : ''}"><span class="chno">CH${ch.no}</span>${ch.title}${tag}</div>`;
    for (const r of formulas[ch.id] || []) {
      if (r.g) { html += `<div class="grp">${r.g}</div>`; continue; }
      n++;
      html += `<div class="row"><div class="no">${n}</div><div class="name"><b>${r.n}</b></div>`
        + `<div class="ans">${T('$$' + r.f + '$$')}${r.note ? `<div class="cond">${T(tidyNote(r.note))}</div>` : ''}</div></div>`;
    }
  }
  return { html, count: n };
}

function numbersHtml() {
  const pairTable = (rows) => {
    const half = Math.ceil(rows.length / 2);
    let body = '';
    for (let i = 0; i < half; i++) {
      const a = rows[i], b = rows[i + half];
      body += `<tr><td class="k">${m(a[0])}</td><td class="v">${val(a[1])}</td>`
        + (b ? `<td class="k">${m(b[0])}</td><td class="v">${val(b[1])}</td>` : '<td class="k"></td><td class="v"></td>') + '</tr>';
    }
    return `<table>${body}</table>`;
  };
  const trig = '<table class="trig"><tr><th></th><th>' + m('sin') + '</th><th>' + m('cos') + '</th><th>' + m('tan') + '</th></tr>'
    + TRIG.map((r) => `<tr><td class="k">${m(r[0])}</td>`
      + r.slice(1).map((v) => (v === null ? '<td class="v txt">不存在</td>' : `<td class="v">${m(v)}</td>`)).join('') + '</tr>').join('')
    + '</table>';
  const html = `<div class="nums">
    <div class="card"><h3>根號 1 ～ 10</h3>${pairTable(SQRT)}</div>
    <div class="card"><h3>log 1 ～ log 10（以 10 為底）</h3>${pairTable(LOG)}</div>
    <div class="card wide"><h3>特殊角的三角函數值</h3>${trig}</div>
    <div class="card"><h3>常數</h3>${pairTable(CONST)}</div></div>`;
  return { html, count: SQRT.length + LOG.length + TRIG.length * 3 + CONST.length };
}

function page(version) {
  const { html: body, count } = rowsHtml();
  const { html: nums, count: numCount } = numbersHtml();
  const teacher = version === 'teacher';
  const badge = teacher ? '師用版（標準答案）' : '學生默寫版';
  const total = count + numCount;
  const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<title>高中數學公式總表・${badge}</title>
<link rel="stylesheet" href="style.css"><link rel="stylesheet" href="hs.css"></head>
<body class="${version}">
<div class="head"><div><h1>高中數學公式總表</h1>
<div class="sub">依講義《高中數學全範圍》17 章・共 ${count} 條公式 ＋ ${numCount} 個常見數值</div></div>
<div class="badge">${badge}</div></div>
<div class="info"><label>姓名<span></span></label><label>日期<span></span></label><label>答對<span class="short"></span>／ ${total}</label></div>
<div class="legend">章節順序和公式名稱都跟講義網站的「公式速查」一致。標示 <span class="tag A">數A</span> 的整章只有數A 要學；
橘色的「分科測驗 數甲」是分科範圍。默寫時寫出完整公式，灰色小字的條件也要會。</div>
${body}
<div class="part">常見數值<small>講義外補充</small></div>
${nums}
</body></html>`;
  return { html, total };
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of ['style.css', 'hs.css']) fs.copyFileSync(path.join(__dirname, f), path.join(outDir, f));
  fs.mkdirSync(path.join(outDir, 'fonts'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'fonts/NotoSansTC.ttf'), path.join(outDir, 'fonts/NotoSansTC.ttf'));
  fs.copyFileSync(path.join(__dirname, 'node_modules/@fontsource/stix-two-math/files/stix-two-math-latin-400-normal.woff2'),
    path.join(outDir, 'fonts/STIXTwoMath.woff2'));

  const browser = await chromium.launch();
  for (const [version, label] of [['teacher', '師用版'], ['student', '學生默寫版']]) {
    const { html, total } = page(version);
    const htmlPath = path.join(outDir, `hs-${version}.html`);
    fs.writeFileSync(htmlPath, html);
    const p = await browser.newPage();
    await p.goto('file://' + htmlPath);
    await p.evaluate(() => document.fonts.ready);
    const file = `高中數學公式總表（講義版）-${label}.pdf`;
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
