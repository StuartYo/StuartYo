/* Shared helpers for exam solution files (loaded before the exam file). */
const T = (pg, x, y, lines, o = {}) => HW.text(pg, x, y, lines, { s: 15, ...o });
const ANS = (pg, x, y, s, o = {}) => HW.text(pg, x, y, s, { s: 21, c: 'red', ...o });

// stacked multi-choice answers in the left margin, e.g. MANS(pg, 10, 165, [1,4,5])
const MANS = (pg, x, y, arr, o = {}) => HW.text(pg, x, y, arr.map(a => `(${a})`), { s: 17, c: 'red', lh: 1.12, ...o });
// ○ / ✗ judgement mark placed right after an option
const MK = (pg, x, y, ok, s = 15) => HW.text(pg, x, y, ok ? '\\ok' : '\\ng', { s, c: 'red', tilt: 0 });
// small table of hand-written cells
const GRID = (pg, x, y, colW, rowH, rows, o = {}) => rows.forEach((r, i) => r.forEach((cell, j) => {
  const cx = x + colW.slice(0, j).reduce((a, b) => a + b, 0);
  if (cell !== '') HW.text(pg, cx, y + i * rowH, cell, { s: 12, tilt: 0.2, ...o });
}));
