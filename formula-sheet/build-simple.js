// 精簡版公式表：一列一個公式（名稱｜符號提示｜公式），輸出師用版與學生默寫版 PDF。
// 用法：node build-simple.js <資料.js> <hs-math 資料夾> <輸出資料夾>
//   資料.js 匯出 { gsat: [...], ast: [...] }，每章 { t: 章名, tag?, rows: [[名稱, 提示, 公式, 標籤?], ...] }，
//   提示與公式用 hs-math 的 mathlite 語法（提示裡的數學式寫在 $…$ 內）。
//   數學式用 <hs-math>/assets/mathlite.js 排版。資料檔不放在這個 repo。
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const [dataFile, hsDir, outArg] = process.argv.slice(2);
if (!dataFile || !hsDir) { console.error('用法：node build-simple.js <資料.js> <hs-math 資料夾> <輸出資料夾>'); process.exit(1); }
const outDir = path.resolve(outArg || path.join(__dirname, 'out'));
const data = require(path.resolve(dataFile));

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(hsDir, 'assets/mathlite.js'), 'utf8'), ctx);
const { mathlite } = ctx.window;
const T = (s) => mathlite.typeset(s);
const M = (s) => mathlite.render(s, true);

const TAG = { A: '數A', B: '數B', 甲: '數甲', 乙: '數乙' };
const tag = (t) => (t ? `<span class="tag t${t}">${TAG[t]}</span>` : '');

function table(chapters) {
  let rows = '', n = 0;
  for (const ch of chapters) {
    rows += `<tr class="chap"><td colspan="3">${ch.t}${tag(ch.tag)}</td></tr>`;
    for (const [name, hint, f, t] of ch.rows) {
      n++;
      rows += `<tr><td class="n">${name}${tag(t)}</td><td class="h">${T(hint || '')}</td><td class="f"><span>${M(f)}</span></td></tr>`;
    }
  }
  return { html: `<table class="main"><colgroup><col class="cn"><col class="ch"><col class="cf"></colgroup>
<thead><tr><th>名稱</th><th>提示</th><th>公式</th></tr></thead><tbody>${rows}</tbody></table>`, n };
}

// common values, only in the 學測 sheet
const SQRT = [['sqrt(1)', '1'], ['sqrt(2)', 'approx 1.414'], ['sqrt(3)', 'approx 1.732'], ['sqrt(4)', '2'], ['sqrt(5)', 'approx 2.236'],
  ['sqrt(6)', 'approx 2.449'], ['sqrt(7)', 'approx 2.646'], ['sqrt(8)', 'approx 2.828'], ['sqrt(9)', '3'], ['sqrt(10)', 'approx 3.162']];
const LOG = [['log thin 1', '0'], ['log thin 2', 'approx 0.3010'], ['log thin 3', 'approx 0.4771'], ['log thin 4', 'approx 0.6021'],
  ['log thin 5', 'approx 0.6990'], ['log thin 6', 'approx 0.7782'], ['log thin 7', 'approx 0.8451'], ['log thin 8', 'approx 0.9031'],
  ['log thin 9', 'approx 0.9542'], ['log thin 10', '1']];
const TRIG = [
  ['0 deg', '0', '1', '0'],
  ['30 deg', 'frac(1, 2)', 'frac(sqrt(3), 2)', 'frac(sqrt(3), 3)'],
  ['45 deg', 'frac(sqrt(2), 2)', 'frac(sqrt(2), 2)', '1'],
  ['60 deg', 'frac(sqrt(3), 2)', 'frac(1, 2)', 'sqrt(3)'],
  ['90 deg', '1', '0', null],
  ['15 deg', 'frac(sqrt(6) - sqrt(2), 4)', 'frac(sqrt(6) + sqrt(2), 4)', '2 - sqrt(3)'],
  ['75 deg', 'frac(sqrt(6) + sqrt(2), 4)', 'frac(sqrt(6) - sqrt(2), 4)', '2 + sqrt(3)'],
];
function numbers() {
  const pairs = (list) => {
    const half = Math.ceil(list.length / 2);
    let body = '';
    for (let i = 0; i < half; i++) {
      const a = list[i], b = list[i + half];
      body += `<tr><td class="k">${M(a[0])}</td><td class="v"><span>${M(a[1])}</span></td>`
        + `<td class="k">${M(b[0])}</td><td class="v"><span>${M(b[1])}</span></td></tr>`;
    }
    return `<table class="num">${body}</table>`;
  };
  const trig = `<table class="num trig"><tr><th></th><th>${M('sin')}</th><th>${M('cos')}</th><th>${M('tan')}</th></tr>`
    + TRIG.map((r) => `<tr><td class="k">${M(r[0])}</td>`
      + r.slice(1).map((v) => `<td class="v"><span>${v === null ? '不存在' : M(v)}</span></td>`).join('') + '</tr>').join('')
    + '</table>';
  return `<div class="nums"><div><h3>根號</h3>${pairs(SQRT)}</div><div><h3>常用對數</h3>${pairs(LOG)}</div>
<div class="wide"><h3>特殊角</h3>${trig}</div>
<div><h3>常數</h3>${pairs([['pi', 'approx 3.1416'], ['e', 'approx 2.718']])}</div></div>`;
}

const CSS = `
@font-face { font-family: 'TC'; src: url('fonts/NotoSansTC.ttf'); font-weight: 100 900; }
@font-face { font-family: 'STIX Two Math'; src: url('fonts/STIXTwoMath.woff2') format('woff2'); }
@page { size: A4; margin: 11mm 11mm 13mm 11mm; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #fff; }
body { font-family: 'TC', sans-serif; color: #1b1f27; font-size: 10pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
math { font-family: 'STIX Two Math', serif; font-size: 1.1em; }
td.f math, td.h math, .num math { math-style: normal; }
td.f math[display="block"], .num math[display="block"] { display: inline math; }
h1 { font-size: 15pt; margin: 0 0 2.5mm; display: flex; justify-content: space-between; align-items: baseline; }
h1 small { font-size: 10pt; font-weight: 600; color: #6b7684; }
table.main { width: 100%; border-collapse: collapse; table-layout: fixed; }
col.cn { width: 40mm; } col.ch { width: 50mm; }
thead { display: table-header-group; }
th { background: #1f4e8c; color: #fff; font-weight: 700; text-align: left; padding: 1.4mm 2mm; font-size: 9.5pt; }
td { border: 0.6pt solid #c9d1dc; padding: 1.3mm 2mm; vertical-align: middle; }
tr { break-inside: avoid; }
tbody tr:not(.chap) td { height: 11mm; }
tr.chap td { background: #e8eef7; font-weight: 800; color: #1f4e8c; font-size: 10.5pt; padding: 1.1mm 2mm; }
td.n { font-weight: 700; }
td.h { color: #5f6b7a; font-size: 9pt; }
.tag { display: inline-block; margin-left: 1.5mm; font-size: 7.5pt; font-weight: 700; padding: 0.3mm 1.1mm; border-radius: 0.8mm; vertical-align: 0.1em; }
.tA { color: #1f5fbf; border: 0.6pt solid #1f5fbf; } .tB { color: #1b8a4b; border: 0.6pt solid #1b8a4b; }
.t甲 { color: #8a5a00; border: 0.6pt solid #8a5a00; } .t乙 { color: #8e3fb3; border: 0.6pt solid #8e3fb3; }
.nums { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm 5mm; margin-top: 5mm; break-before: auto; }
.nums > div { break-inside: avoid; } .nums .wide { grid-column: 1 / -1; }
.nums h3 { margin: 0 0 1mm; font-size: 10.5pt; color: #1f4e8c; }
table.num { width: 100%; border-collapse: collapse; }
table.num td, table.num th { height: 9.5mm; text-align: center; }
table.num th { background: #e8eef7; color: #1f4e8c; text-align: center; }
table.num td.k { background: #f6f8fb; width: 20%; }
.student td.f > span, .student td.v > span { visibility: hidden; }
`;

function page(title, label, version, chapters, withNumbers) {
  const { html, n } = table(chapters);
  return { n, html: `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>${title}・${label}</title>
<style>${CSS}</style></head><body class="${version}">
<h1>${title}<small>${label}</small></h1>
${html}${withNumbers ? numbers() : ''}
</body></html>` };
}

(async () => {
  fs.mkdirSync(path.join(outDir, 'fonts'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'fonts/NotoSansTC.ttf'), path.join(outDir, 'fonts/NotoSansTC.ttf'));
  fs.copyFileSync(path.join(__dirname, 'node_modules/@fontsource/stix-two-math/files/stix-two-math-latin-400-normal.woff2'),
    path.join(outDir, 'fonts/STIXTwoMath.woff2'));
  const browser = await chromium.launch();
  const jobs = [
    ['學測範圍 公式表', data.gsat, true, 'gsat'],
    ['分科範圍 公式表', data.ast, false, 'ast'],
  ];
  for (const [title, chapters, withNumbers, key] of jobs) {
    for (const [version, label] of [['teacher', '師用版'], ['student', '默寫版']]) {
      const { html, n } = page(title, label, version, chapters, withNumbers);
      const htmlPath = path.join(outDir, `${key}-${version}.html`);
      fs.writeFileSync(htmlPath, html);
      const p = await browser.newPage();
      await p.goto('file://' + htmlPath);
      await p.evaluate(() => document.fonts.ready);
      const file = `${title.replace(' ', '')}-${label}.pdf`;
      await p.pdf({
        path: path.join(outDir, file), format: 'A4', printBackground: true, preferCSSPageSize: true,
        displayHeaderFooter: true, headerTemplate: '<div></div>',
        footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#8a94a3"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      });
      await p.close();
      console.log(`${file}: ${n} 條`);
    }
  }
  await browser.close();
})();
