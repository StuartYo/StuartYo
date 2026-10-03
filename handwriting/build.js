// usage: node build.js preview <exam.js> [pageN]   |   node build.js pdf <exam.js> out.pdf
// (exam path is relative to this folder; preview expects bg/h-NN.png rendered at 192 dpi)
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const path = require('path');
(async () => {
  const mode = process.argv[2], exam = encodeURIComponent(process.argv[3]); const dir = __dirname;
  const b = await chromium.launch();
  if (mode === 'preview') {
    const only = process.argv[4]; require('fs').mkdirSync(path.join(dir, 'prev'), { recursive: true });
    const p = await b.newPage({ viewport: { width: 800, height: 1130 }, deviceScaleFactor: 2 });
    p.on('console', m => console.log('console:', m.text())); p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('file://' + path.join(dir, 'index.html') + '?bg=1&bgdir=' + encodeURIComponent(process.env.BGDIR || 'bg') + '&exam=' + exam + (only ? '&only=' + only : ''));
    await p.waitForFunction('window.READY === true', null, { timeout: 60000 });
    for (const h of await p.$$('.page')) { const id = await h.getAttribute('id'); await h.screenshot({ path: path.join(dir, 'prev', id + '.png') }); console.log('shot', id); }
  } else {
    const p = await b.newPage();
    p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('file://' + path.join(dir, 'index.html') + '?exam=' + exam);
    await p.waitForFunction('window.READY === true', null, { timeout: 60000 });
    await p.pdf({ path: process.argv[4], preferCSSPageSize: true, printBackground: false, omitBackground: true });
    console.log('pdf written');
  }
  await b.close();
})();
