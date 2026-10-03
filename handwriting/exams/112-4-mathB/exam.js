/* 112 學年度 學測第四次模擬考 數學B — handwritten solutions
 * Coordinates: 96-dpi px on A4 (794 x 1123). Colours: blue = working (user's pen),
 * red = answers / ○✗ judgements, green = figures & auxiliary lines, orange = key idea.
 */
const T = (pg, x, y, lines, o = {}) => HW.text(pg, x, y, lines, { s: 15, ...o });
const ANS = (pg, x, y, s, o = {}) => HW.text(pg, x, y, s, { s: 21, c: 'red', ...o });

/* ---------------- 第 1 頁 : Q1 – Q4 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 10, 220, '(2)');
  T(pg, 82, 314, [
    '時針每分鐘轉 \\frac{30\\deg}{60} = 0.5\\deg',
    '6:50 時針應在「7」之前 10 分 \\times 0.5\\deg = 5\\deg',
    '⇒ 逆時針調回 5\\deg = 5 \\times \\frac{\\pi}{180} = \\red{\\box{\\frac{\\pi}{36}}}',
  ], { gap: 2 });
  {
    const cx = 690, cy = 364, r = 44;
    sk.circle(cx, cy, r, { c: 'green', w: 1.5 });
    const P = (deg, rr) => [cx + rr * Math.sin(deg * Math.PI / 180), cy - rr * Math.cos(deg * Math.PI / 180)];
    for (let k = 0; k < 12; k++) { const a = P(k * 30, r - 1), b = P(k * 30, r - 6); sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 1.2 }); }
    [[12, 0], [3, 90], [6, 180], [9, 270]].forEach(([t, d]) => { const p = P(d, r - 14); sk.label(p[0] - (t > 9 ? 7 : 4), p[1] - 9, String(t), { s: 11, c: 'green' }); });
    const p7 = P(210, r - 14); sk.label(p7[0] - 4, p7[1] - 8, '7', { s: 12, c: 'orange' });
    const m = P(300, 34); sk.line(cx, cy, m[0], m[1], { c: 'blue', w: 1.7 });                 // minute hand @50
    const wrong = P(210, 25); sk.line(cx, cy, wrong[0], wrong[1], { c: 'gray', w: 1.6, dash: '3 3' });
    const ok = P(205, 26); sk.line(cx, cy, ok[0], ok[1], { c: 'red', w: 2 });
    sk.dot(cx, cy, { r: 1.8, c: 'green' });
    sk.arc(cx, cy, r + 6, 90 - 216, 90 - 196, { c: 'red', w: 1.3, arrow: true, head: 5 });
    sk.label(cx - 78, cy + 36, '逆時針 5\\deg', { s: 12, c: 'red' });
    sk.label(cx + 48, cy - 40, '分針 50', { s: 11, c: 'blue' });
  }

  // Q2
  ANS(pg, 10, 423, '(4)');
  {
    const ox = 686, oy = 486, u = 18, M = (x, y) => [ox + u * x, oy - u * y];
    sk.arrow(612, oy, 776, oy, { c: 'gray', w: 1.1, head: 5 }); sk.arrow(ox, 616, ox, 438, { c: 'gray', w: 1.1, head: 5 });
    sk.label(778, oy - 9, 'x', { s: 12, c: 'gray' }); sk.label(ox + 4, 434, 'y', { s: 12, c: 'gray' }); sk.label(ox - 13, oy + 1, 'O', { s: 11, c: 'gray' });
    const [ccx, ccy] = M(1, -2);
    sk.circle(ccx, ccy, 3 * u, { c: 'blue', w: 1.5 });
    sk.dot(ccx, ccy, { r: 1.7 }); sk.label(ccx - 8, ccy + 2, '(1,−2)', { s: 10.5 });
    let a = M(-3.6, (-1 + 10.8) / 4), b = M(4.6, (-1 - 13.8) / 4);
    sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 1.5 }); sk.label(b[0] - 18, b[1] + 1, 'L_1', { s: 12, c: 'green' });
    a = M(-3.55, (4 * -3.55 + 5) / 3); b = M(0.62, (4 * 0.62 + 5) / 3);
    sk.line(a[0], a[1], b[0], b[1], { c: 'orange', w: 1.5 }); sk.label(b[0] + 3, b[1] - 4, 'L_2', { s: 12, c: 'orange' });
    const t = M(-1.4, -0.2); sk.dot(t[0], t[1], { r: 2.2, c: 'red' }); sk.label(t[0] - 30, t[1] + 2, '切點', { s: 10.5, c: 'red' });
    [M(3.793, -3.095), M(-0.833, 0.375)].forEach(p => sk.dot(p[0], p[1], { r: 2.2, c: 'red' }));
    const q = M(-0.92, 0.44); sk.dot(q[0], q[1], { r: 2.2, c: 'purple' });
    sk.label(612, 448, 'L_1 \\perp L_2', { s: 10.5, c: 'purple' });
    sk.label(742, 586, 'r = 3', { s: 11 });
  }
  T(pg, 82, 528, [
    'd(心, L_1) = \\frac{|3 − 8 + 1|}{5} = \\frac{4}{5} < 3 ⇒ 交 2 點',
    'd(心, L_2) = \\frac{|4 + 6 + 5|}{5} = 3 = r ⇒ 相切 1 點',
    'L_1 \\perp L_2 ⇒ 交 1 點 (在圓外，不重複) ⇒ 共 2+1+1 = \\red{\\box{4}} 個',
  ], { s: 14.5 });

  // Q3
  ANS(pg, 10, 628, '(5)');
  T(pg, 646, 654, ['a = 2.23737…', '\\sqrt5 = 2.23606…', '⇒ a > \\sqrt5'], { s: 13.5 });
  T(pg, 82, 728, [
    '令 f(x) = \\frac{x+5}{x+1} = 1 + \\frac{4}{x+1}，x>0 時遞減',
    'f(\\sqrt5) = \\frac{\\sqrt5 + 5}{\\sqrt5 + 1} = \\frac{\\sqrt5(1+\\sqrt5)}{\\sqrt5 + 1} = \\orange{\\sqrt5}  \\small{\\orange{← 關鍵!}}',
    'a > \\sqrt5 ⇒ f(a) < f(\\sqrt5) = \\sqrt5 ∴ \\red{\\box{a > \\sqrt5 > \\frac{a+5}{a+1}}}',
  ], { s: 14.5 });

  // Q4
  ANS(pg, 10, 836, '(2)');
  T(pg, 82, 928, [
    'a_n = 2^9 \\cdot (\\frac{25}{2})^{n−1} = 2^{10−n} \\cdot 5^{2n−2}   \\small{\\orange{(拆成 2、5 的次方)}}',
    'a_i a_j = 2^{20−(i+j)} \\cdot 5^{2(i+j)−4}   (i < j)',
    '\\log a_i + \\log a_j 為整數 ⇔ a_i a_j = 10^k ⇔ 20 − (i+j) = 2(i+j) − 4 ⇒ i + j = 8',
    '(i, j) = (1,7)、(2,6)、(3,5) ⇒ \\red{\\box{3 種}}  (此時 \\log = 12 為正整數 \\ck)',
  ], { s: 14.5, gap: 2 });
});

// stacked multi-choice answers in the left margin, e.g. MANS(pg, 10, 165, [1,4,5])
const MANS = (pg, x, y, arr, o = {}) => HW.text(pg, x, y, arr.map(a => `(${a})`), { s: 17, c: 'red', lh: 1.12, ...o });
// ○ / ✗ judgement mark placed right after an option
const MK = (pg, x, y, ok, s = 15) => HW.text(pg, x, y, ok ? '\\ok' : '\\ng', { s, c: 'red', tilt: 0 });
// small table of hand-written cells
const GRID = (pg, x, y, colW, rowH, rows, o = {}) => rows.forEach((r, i) => r.forEach((cell, j) => {
  const cx = x + colW.slice(0, j).reduce((a, b) => a + b, 0);
  if (cell !== '') HW.text(pg, cx, y + i * rowH, cell, { s: 12, tilt: 0.2, ...o });
}));

/* ---------------- 第 2 頁 : Q5 – Q7 ---------------- */
page(3, (pg, sk) => {
  // Q5
  ANS(pg, 10, 103, '(1)');
  T(pg, 82, 386, [
    '母線 10、高 6 ⇒ 半徑 8，半頂角 θ：\\tan θ = 8/6 ⇒ θ ≈ 53\\deg',
    'E \\perp 母線 ⇒ E 與軸的夾角 = 90\\deg − θ ≈ 37\\deg < θ \\small{\\orange{(比母線還陡)}}',
    '⇒ 截痕為 \\red{\\box{雙曲線}} 的一部分 \\small{\\orange{(頂角 106\\deg > 90\\deg 時，垂直母線必截出雙曲線)}}',
  ], { s: 13.5, lh: 1.42 });
  {
    const ax = 676, ay = 392, L = 74, ux = 0.8, uy = 0.6;
    const l = [ax - L * ux, ay + L * uy], r = [ax + L * ux, ay + L * uy];
    sk.line(ax, ay, l[0], l[1], { c: 'green', w: 1.5 }); sk.line(ax, ay, r[0], r[1], { c: 'green', w: 1.5 });
    sk.ellipse(ax, l[1], L * ux, 6, { c: 'green', w: 1.2, wob: 0.02 });
    sk.line(ax, ay, ax, l[1], { c: 'gray', w: 1, dash: '3 3' });
    sk.arc(ax, ay, 12, 233, 307, { c: 'green', w: 1 });
    sk.label(ax - 82, ay - 9, '頂角 106\\deg', { s: 11, c: 'green' });
    const p = [ax + 30 * ux, ay + 30 * uy];                                      // foot on right generatrix
    const e1 = [p[0] + 15 * 0.6, p[1] - 15 * 0.8], e2 = [p[0] - 0.6 * (l[1] - p[1]) / 0.8, l[1]];
    sk.line(e1[0], e1[1], e2[0], e2[1], { c: 'red', w: 1.7 });
    sk.rightAngle(p[0], p[1], -ux, -uy, -0.6, 0.8, 5, { c: 'red' });
    sk.label(e1[0] + 2, e1[1] - 12, 'E', { s: 12, c: 'red' });
    sk.label(r[0] - 4, r[1] - 22, '母線', { s: 10.5, c: 'green' });
  }

  // Q6
  ANS(pg, 10, 452, '(3)');
  T(pg, 82, 637, [
    '保險公司對每人的期望收益 = 1000 − 50000 \\times 0.6 = −29000 元',
    '1000 萬人：10^7 \\times (−29000) = −2.9 \\times 10^{11} 元 = −2900 億元',
    '⇒ 損失約 \\red{\\box{2900 億元}}   \\small{\\orange{(1 億 = 10^8)}}',
  ], { s: 14.5, gap: 1 });

  // Q7
  ANS(pg, 10, 725, '(3)');
  T(pg, 150, 786, [
    '以 O 為原點，\\vec{OB} 方向為 x 軸',
    '△OAF 為正三角形 ⇒ OA = 1，OB = 2',
    '\\vec{OP} \\cdot \\vec{OB} = |\\vec{OB}| \\times (\\vec{OP} 在 \\vec{OB} 上的投影)',
    '~~~~~~~~~~~~ = 2 \\times x_P',
    '⇒ 找 x 坐標最大的點 ⇒ \\green{C}',
    'x_C = 2 + \\frac{1}{2} = \\frac{5}{2} ⇒ 最大值 = 2 \\times \\frac{5}{2} = \\red{\\box{5}}',
  ], { s: 14.5, gap: 1 });
  sk.arrow(537, 903, 668, 903, { c: 'orange', w: 1.8, head: 7 });
  sk.line(670, 903, 742, 903, { c: 'gray', w: 1.1, dash: '3 3' });
  sk.line(699, 846, 699, 903, { c: 'green', w: 1.3, dash: '3 3' });
  sk.rightAngle(699, 903, 0, -1, 1, 0, 5, { c: 'green' });
  sk.label(703, 905, '\\frac{5}{2}', { s: 11.5, c: 'green' });
  sk.label(715, 822, 'C(\\frac{5}{2}, \\frac{\\sqrt3}{2})', { s: 11, c: 'green' });
  sk.label(600, 884, '(1,0)', { s: 10.5, c: 'green' });
  sk.label(672, 884, '(2,0)', { s: 10.5, c: 'green' });
  sk.label(560, 958, '\\orange{投影最長 ⇒ 點積最大}', { s: 12 });
});

/* ---------------- 第 3 頁 : Q8 – Q10 ---------------- */
page(4, (pg, sk) => {
  // Q8
  MANS(pg, 8, 163, [1, 4, 5]);
  MK(pg, 339, 192, true); MK(pg, 615, 192, false); MK(pg, 327, 215, false); MK(pg, 507, 215, true); MK(pg, 319, 239, true);
  T(pg, 634, 182, '多了 x < −\\frac{2023}{3}', { s: 12 });
  T(pg, 345, 214, '需 x>0', { s: 12 });
  T(pg, 526, 213, '|x+1|<\\sqrt3 ⇔ −\\sqrt3<x+1<\\sqrt3 同', { s: 12.5 });
  T(pg, 338, 237, '2^x + 2^{−x} \\ge 2 > \\sqrt3 ⇒ 第一個因式恆正 ⇒ 同', { s: 12.5 });
  T(pg, 82, 260, [
    'x^2+2x−2<0 ⇔ \\red{−1−\\sqrt3 < x < −1+\\sqrt3}   \\small{\\orange{(要找解集合完全一樣的)}}',
    '(1) −x^2+2x−2023 = −(x−1)^2 − 2022 < 0 恆負 ⇒ 同除負數變號 ⇔ x^2+2x−2 < 0 同',
    '(3) \\log 要 x > 0 ⇒ 解只剩 0 < x < −1+\\sqrt3，不同',
  ], { s: 13, lh: 1.3 });

  // Q9
  MANS(pg, 8, 321, [1, 2, 4, 5]);
  T(pg, 226, 369, 'Q 在 y=f(x) 上 ⇒ f(−1) = d = −3；令 t = x+1', { s: 13 });
  MK(pg, 143, 398, true); MK(pg, 325, 422, true); MK(pg, 392, 447, false); MK(pg, 580, 474, true); MK(pg, 648, 514, true);
  T(pg, 161, 395, 'f − g = at^3 + bt^2 + (c−2)t = 0 的三根 t_P、0、t_R；PQ = QR ⇒ Q 為中點 ⇒ t_P + t_R = 0 ⇒ b = 0', { s: 12.5 });
  T(pg, 343, 419, '餘式 = f(−1) = d = −3', { s: 12.5 });
  T(pg, 410, 444, 'f − g = a(x+1)^3 + (c−2)(x+1) 對稱中心 (−1, 0) ≠ Q', { s: 12.5 });
  T(pg, 82, 541, [
    '\\orange{f − g = t(at^2 + c − 2) 有三相異根 ⇔ a(c−2) < 0}',
    '(4) a<0 ⇒ c>2；y = at^3 + (c − 1/2)t，a(c − 1/2) < 0 ⇒ 必有 3 個交點',
    '(5) y = at^3 + (c + 1/2)t 有 3 交點 ⇔ a(c + 1/2) < 0 ⇒ c + 1/2 > 0 ⇒ c > −1/2',
  ], { s: 13, lh: 1.3 });

  // Q10
  MANS(pg, 8, 604, [3, 4, 5]);
  GRID(pg, 524, 884, [24, 34, 38, 36, 36, 36, 34], 17, [
    ['', 'A', 'B', 'C', 'D', 'E', 'F'],
    ['甲', '128', '124', '128', '\\red{137}', '136', '\\red{139}'],
    ['乙', '\\red{.36}', '−1.19', '−.52', '\\red{1.09}', '−.07', '.32'],
  ]);
  sk.line(522, 902, 760, 902, { c: 'green', w: 1 }); sk.line(545, 885, 545, 937, { c: 'green', w: 1 });
  MK(pg, 469, 929, false); MK(pg, 275, 950, false); MK(pg, 293, 972, true); MK(pg, 291, 993, true); MK(pg, 469, 1014, true);
  T(pg, 293, 946, '平均 = 0 + 0 = 0', { s: 12.5 });
  T(pg, 311, 968, '平均 = 74 + 58 = 132', { s: 12.5 });
  T(pg, 309, 989, '乙變異數 = (.36^2+1.19^2+.52^2+1.09^2+.07^2+.32^2)÷6 ≈ 0.52 ⇒ σ ≈ 0.72 < 1', { s: 12 });
  T(pg, 487, 1011, '負相關 (見下)', { s: 12.5 });
  T(pg, 82, 1034, [
    '(1) 甲案 F(139) 最高；但乙案 D 1.09 > A 0.36 > F 0.32 ⇒ F 只排第 3，不會錄取',
    '(5) \\orange{乙變異數 = σ_1^2 + σ_2^2 + 2rσ_1σ_2 = 1 + 1 + 2r} ⇒ 0.52 = 2 + 2r ⇒ r ≈ −0.74 < 0',
  ], { s: 13, lh: 1.35 });
});

/* ---------------- 第 4 頁 : Q11 – Q13 ---------------- */
page(5, (pg, sk) => {
  // Q11
  MANS(pg, 8, 95, [2, 3, 4]);
  MK(pg, 307, 259, false); MK(pg, 315, 281, true); MK(pg, 461, 302, true); MK(pg, 513, 324, true); MK(pg, 348, 347, false);
  T(pg, 325, 256, '0.6 + 0.3 \\times 0.5 = 0.75', { s: 12.5 });
  T(pg, 333, 278, '0.3\\times0.5 + 0.75\\times0.3 = 0.375', { s: 12.5 });
  T(pg, 479, 300, '3/30', { s: 12.5 });
  T(pg, 366, 344, '期望付 1000(0.5\\times0.175+0.7\\times0.375+0.9\\times0.45) = 755', { s: 12 });
  T(pg, 82, 362, '最後折扣：五折 0.1 + 0.75\\times0.1 = 0.175、七折 0.375、九折 0.75\\times0.6 = 0.45  ｜ (4) \\frac{0.1}{0.175} = \\frac{4}{7} ≈ 0.57',
    { s: 12 });
  {   // probability tree
    const r0 = [566, 292];
    const n1 = [[606, 258, '五折', '0.1'], [606, 292, '七折', '0.3'], [606, 326, '九折', '0.6']];
    sk.dot(r0[0], r0[1], { r: 1.8, c: 'green' });
    n1.forEach(([x, y, t]) => { sk.line(r0[0], r0[1], x - 2, y, { c: 'green', w: 1.2 }); sk.label(x, y - 8, t, { s: 11.5 }); });
    sk.label(568, 258, '0.1', { s: 9.5, c: 'green' }); sk.label(578, 279, '0.3', { s: 9.5, c: 'green' }); sk.label(566, 311, '0.6', { s: 9.5, c: 'green' });
    sk.label(633, 250, '停', { s: 11, c: 'gray' });
    sk.line(633, 292, 664, 279, { c: 'green', w: 1.2 }); sk.label(667, 271, '停', { s: 11, c: 'gray' }); sk.label(640, 270, '.5', { s: 9.5, c: 'green' });
    sk.line(633, 292, 664, 304, { c: 'green', w: 1.2 }); sk.label(640, 299, '.5', { s: 9.5, c: 'green' });
    sk.line(633, 326, 664, 326, { c: 'green', w: 1.2 });
    sk.label(667, 297, '再摸', { s: 11, c: 'orange' }); sk.label(667, 319, '再摸', { s: 11, c: 'orange' });
    sk.line(694, 306, 712, 314, { c: 'orange', w: 1.1, arrow: true, head: 4 }); sk.line(694, 327, 712, 322, { c: 'orange', w: 1.1, arrow: true, head: 4 });
    sk.poly([[714, 290], [764, 290], [764, 340], [714, 340]], { closed: true, c: 'orange', w: 1.1, bow: 0.4 });
    sk.label(717, 290, ['五 0.1', '七 0.3', '九 0.6'], { s: 11, lh: 1.25 });
    sk.label(712, 274, '\\orange{共 0.75}', { s: 10.5 });
  }

  // Q12
  MANS(pg, 8, 392, [1, 4, 5]);
  T(pg, 124, 476, '令 A = \\mat{a & a+k \\\\ a+2k & a+3k}，k ≠ 0', { s: 11.5 });
  MK(pg, 209, 515, true); MK(pg, 546, 516, false); MK(pg, 224, 561, false); MK(pg, 556, 561, true); MK(pg, 244, 608, true);
  T(pg, 228, 504, ['det A = a(a+3k)−(a+k)(a+2k)', '~~~~~~~ = −2k^2 ≠ 0'], { s: 11.5 });
  T(pg, 563, 503, 'AB = \\mat{4a+3k & 6a+4k \\\\ 4a+11k & 6a+16k} \\stk{q−p=2a+k}{s−r=2a+5k}', { s: 11.5 });
  T(pg, 241, 549, 'AB = \\mat{2a+k & 2a+k \\\\ 2a+5k & 2a+5k} p = q', { s: 11.5 });
  T(pg, 573, 549, 'AB = \\mat{2a−k & 2a+k \\\\ 2a+3k & 2a+5k} 公差 2k', { s: 11.5 });
  T(pg, 262, 596, 'AB = \\mat{3a−2k & 3a+k \\\\ 3a+4k & 3a+7k} 公差 3k ≠ 0', { s: 12 });

  // Q13
  ANS(pg, 8, 688, '\\sqrt{19}', { s: 17 });
  T(pg, 500, 813, ['坐標取 (前, 右, 上)，原點在後方左下角', '\\orange{每個視圖讀兩個坐標，三圖拼起來}'], { s: 12.5 });
  [[222, 962, 'blue'], [371, 958, 'blue'], [442, 886, 'green'], [535, 877, 'green'], [559, 945, 'blue']]
    .forEach(([x, y, c]) => sk.circle(x, y, 7, { c, w: 1.3 }));
  T(pg, 632, 866, [
    '前視：\\blue{藍}(右2, 上1)',
    '右視：\\blue{藍}(前3, 上1)',
    '~~~~~~~~~~ \\green{綠}(前0, 上4)',
    '上視：\\green{綠}(右1, 前0)',
    '~~~~~~~~~~ \\blue{藍}(右2, 前3)',
  ], { s: 11.5, c: 'gray', lh: 1.38 });
  T(pg, 82, 1040, [
    '⇒ \\blue{藍 (3, 2, 1)}、\\green{綠 (0, 1, 4)}',
    '距離 = \\sqrt{(3−0)^2 + (2−1)^2 + (1−4)^2} = \\sqrt{9+1+9} = \\red{\\box{\\sqrt{19}}}',
  ], { s: 14.5, gap: 2 });
});

/* ---------------- 第 5 頁 : Q14 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q14
  ANS(pg, 8, 90, '\\frac{2}{15}', { s: 18 });
  T(pg, 225, 197, 'Γ_1：y = \\log_2 16x = 4 + \\log_2 x ⇒ \\orange{Γ_1 是 Γ_2 往上平移 4}', { s: 13.5 });
  T(pg, 82, 223, [
    '設 P(a, 4 + \\log_2 a)，鉛垂線 ⇒ R(a, \\log_2 a)，PR = 4',
    '水平線：\\log_2 x = 4 + \\log_2 a ⇒ x = 16a ⇒ Q(16a, 4 + \\log_2 a)，PQ = 15a',
    'm_{QR} = \\frac{PR}{PQ} = \\frac{4}{15a} = 2 ⇒ a = \\red{\\box{\\frac{2}{15}}}',
  ], { s: 14, lh: 1.4 });
  {
    const ox = 628, oy = 272, M = (x, y) => [ox + 30 * x, oy - 8.5 * y];
    sk.arrow(616, oy, 768, oy, { c: 'gray', w: 1, head: 4 }); sk.arrow(ox, 308, ox, 220, { c: 'gray', w: 1, head: 4 });
    sk.fn(x => Math.log2(x), 0.068, 4.6, M, { c: 'blue', w: 1.4 });
    sk.fn(x => 4 + Math.log2(x), 0.065, 4.6, M, { c: 'green', w: 1.4 });
    const P = M(0.25, 2), Rr = M(0.25, -2), Q = M(4, 2);
    sk.line(P[0], P[1], Rr[0], Rr[1], { c: 'orange', w: 1.2, dash: '3 2.5' });
    sk.line(P[0], P[1], Q[0], Q[1], { c: 'orange', w: 1.2, dash: '3 2.5' });
    sk.line(Q[0], Q[1], Rr[0], Rr[1], { c: 'red', w: 1.5 });
    [P, Rr, Q].forEach(p => sk.dot(p[0], p[1], { r: 1.8, c: 'red' }));
    sk.label(P[0] - 2, P[1] - 15, 'P', { s: 11 }); sk.label(Rr[0] + 3, Rr[1] - 2, 'R', { s: 11 }); sk.label(Q[0] + 2, Q[1] - 15, 'Q', { s: 11 });
    sk.label(655, 223, 'Γ_1', { s: 11, c: 'green' }); sk.label(730, 262, 'Γ_2', { s: 11 });
    sk.label(P[0] + 3, 258, '4', { s: 10, c: 'orange' }); sk.label(690, 243, '15a', { s: 10, c: 'orange' });
  }

  // Q15
  ANS(pg, 4, 309, '2\\sqrt{19}', { s: 15 });
  {
    const C = [500, 424], B = [577, 387], A = [701, 326], Bp = [577, 462];
    sk.line(B[0], B[1], Bp[0], Bp[1], { c: 'green', w: 1.1, dash: '3 3' });
    sk.rightAngle(577, 425, 0, 1, 1, 0, 5, { c: 'green' });
    sk.line(C[0], C[1], Bp[0], Bp[1], { c: 'green', w: 1.4 });
    sk.line(A[0], A[1], Bp[0], Bp[1], { c: 'red', w: 1.5 });
    sk.dot(Bp[0], Bp[1], { r: 2, c: 'green' }); sk.label(Bp[0] - 18, Bp[1] - 5, "B'", { s: 12.5, c: 'green' });
    sk.label(527, 444, '4', { s: 11.5, c: 'green' });
    sk.arc(C[0], C[1], 24, -26, 0, { c: 'green', w: 1 }); sk.label(526, 426, '30\\deg', { s: 9.5, c: 'green' });
  }
  T(pg, 60, 440, [
    'B 對 L 作對稱點 B\' ⇒ BP = B\'P',
    'AP + BP = AP + PB\' \\ge AB\'  \\small{\\orange{(A、P、B\' 共線時最小)}}',
    '△ACB\'：CA = 10，CB\' = 4，∠ACB\' = 30\\deg + 30\\deg = 60\\deg',
    'AB\'^2 = 10^2 + 4^2 − 2 \\cdot 10 \\cdot 4 \\cos60\\deg = 76 ⇒ 最小值 = \\red{\\box{2\\sqrt{19}}}',
  ], { s: 13.5, lh: 1.32 });

  // Q16
  ANS(pg, 6, 520, '\\frac{5}{66}', { s: 18 });
  T(pg, 186, 628, '乘積 ÷ 8 餘 3 ⇒ 乘積為奇數 ⇒ 兩顆都是奇數號', { s: 13.5 });
  T(pg, 82, 651, [
    '奇數依 ÷8 的餘數分：餘1 \\lb1, 9\\rb、餘3 \\lb3, 11\\rb、餘5 \\lb5\\rb、餘7 \\lb7\\rb',
    '餘數相乘 \\equiv 3：1\\times3 = 3、5\\times7 = 35 \\equiv 3   \\small{\\gray{(3\\times3≡1、1\\times5≡5、1\\times7≡7、3\\times5≡7、3\\times7≡5、5^2≡7^2≡1 都不行)}}',
    '⇒ 2\\times2 + 1\\times1 = 5 種，P = \\frac{5}{C\\stk{12}{2}} = \\red{\\box{\\frac{5}{66}}}',
  ], { s: 13.5, lh: 1.38 });

  // Q17
  ANS(pg, 6, 733, '192', { s: 18 });
  T(pg, 54, 872, ['以 10cm 為 1 單位：', '4 (40cm)、5 (50cm)', '4x + 5y = 80', '\\orange{左右對稱 ⇒ 只看左半}', '\\orange{右半是鏡射}'], { s: 12, lh: 1.32 });
  {
    const bar = (y, cells, centerKind) => {      // cells: widths in units of 10cm (left half drawn), mirrored
      const x0 = 606, W = 152, u = W / 80; let x = x0;
      sk.poly([[x0, y], [x0 + W, y], [x0 + W, y + 13], [x0, y + 13]], { closed: true, c: 'blue', w: 1.1, bow: 0.3 });
      const half = cells.reduce((a, b) => a + b, 0);
      cells.forEach(c => { x += c * u; sk.line(x, y, x, y + 13, { c: 'blue', w: 0.9 }); });
      let xr = x0 + W; cells.forEach(c => { xr -= c * u; sk.line(xr, y, xr, y + 13, { c: 'blue', w: 0.9 }); });
      const cx = x0 + W / 2;
      if (centerKind) sk.poly([[x0 + half * u, y], [x0 + W - half * u, y], [x0 + W - half * u, y + 13], [x0 + half * u, y + 13]], { closed: true, fill: 'hl', w: 0 });
      sk.line(cx, y - 5, cx, y + 18, { c: 'red', w: 1.2, dash: '2.5 2' });
    };
    bar(882, [4, 4, 5, 5, 5, 5, 4, 4, 4], false);
    sk.label(606, 897, '中間是接縫', { s: 10.5, c: 'red' });
    bar(922, [4, 5, 4, 5, 5, 5, 4, 4], true);
    sk.label(606, 937, '中間是一片 40', { s: 10.5, c: 'red' });
  }
  T(pg, 82, 990, [
    'Case 1 中線是接縫：左半 4x+5y = 40 ⇒ (x,y) = (10,0)、(5,4)、(0,8) ⇒ 1 + C\\stk{9}{4} + 1 = 128',
    'Case 2 中間是 40 磚：左半 = 38 ⇒ (7,2)、(2,6) ⇒ C\\stk{9}{2} + C\\stk{8}{2} = 36 + 28 = 64',
    'Case 3 中間是 50 磚：左半 = 37.5 不是整數 ⇒ 0 種',
    '共 128 + 64 = \\red{\\box{192}} 種',
  ], { s: 13.5, lh: 1.42 });
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q18
  T(pg, 82, 590, [
    '單點透視：往後延伸的平行線 (\\vec{CG}、\\vec{BF}、\\vec{OD}、\\vec{AE}) 交於消失點 P',
    'CG：y = \\frac{8}{15}x + 36，BF：y = −\\frac{4}{5}(x − 50) + 36 = −\\frac{4}{5}x + 76',
    '\\frac{8}{15}x + 36 = −\\frac{4}{5}x + 76 ⇒ \\frac{4}{3}x = 40 ⇒ x = 30，y = 52 ⇒ \\red{\\box{P(30, 52)}}',
  ], { s: 14.5, lh: 1.4 });

  // Q19
  T(pg, 82, 727, [
    'OABC、DEFG 皆為長方形 ⇒ DG ∥ CO (鉛直)、DE ∥ OA (水平)',
    'D 在 \\vec{OP}：y = \\frac{52}{30}x = \\frac{26}{15}x 上，且 x_D = x_G = 15 ⇒ \\red{\\box{D(15, 26)}}',
    'E 在 \\vec{AP}：y = −\\frac{13}{5}(x − 50) 上，且 x_E = x_F = 40 ⇒ \\red{\\box{E(40, 26)}}',
    '\\orange{檢查：y_D = y_E = 26 ⇒ DE 水平 \\ck；其實 G、F、D、E 恰為 PC、PB、PO、PA 的中點}',
  ], { s: 14, lh: 1.36 });

  // Q20
  T(pg, 82, 888, [
    '\\orange{透視圖保持「直線、交點」，但不保持「中點、比例」}',
    '⇒ 頂部長方形 CBFG 的中心 = 對角線 \\ov{CF}、\\ov{BG} 的交點',
    'CF：y = \\frac{44 − 36}{40 − 0}x + 36 = \\frac{1}{5}x + 36',
    'BG：y = \\frac{44 − 36}{15 − 50}(x − 50) + 36 = −\\frac{8}{35}x + \\frac{332}{7}',
    '\\frac{1}{5}x + 36 = −\\frac{8}{35}x + \\frac{332}{7} ⇒ 7x + 1260 = −8x + 1660',
    '⇒ x = \\frac{80}{3}，y = \\frac{16}{3} + 36 = \\frac{124}{3} ⇒ 避雷針 \\red{\\box{(\\frac{80}{3}, \\frac{124}{3})}}',
  ], { s: 14, lh: 1.38 });
  {   // to-scale perspective sketch
    const M = (x, y) => [575 + 3.6 * x, 1085 - 3.6 * y];
    const O = M(0, 0), A = M(50, 0), B = M(50, 36), C = M(0, 36), G = M(15, 44), F = M(40, 44), D = M(15, 26), E = M(40, 26), P = M(30, 52), Z = M(80 / 3, 124 / 3);
    sk.poly([O, A, B, C], { closed: true, c: 'blue', w: 1.4 });
    sk.poly([C, G, F, B], { c: 'blue', w: 1.4 });
    sk.poly([G, D, E, F], { c: 'blue', w: 1.1, dash: '3.5 3' });
    sk.line(O[0], O[1], D[0], D[1], { c: 'blue', w: 1.1, dash: '3.5 3' }); sk.line(A[0], A[1], E[0], E[1], { c: 'blue', w: 1.1, dash: '3.5 3' });
    [[G, P], [F, P], [D, P], [E, P]].forEach(([a, b]) => sk.line(a[0], a[1], b[0], b[1], { c: 'green', w: 1.1, dash: '2.5 2.5' }));
    sk.line(C[0], C[1], F[0], F[1], { c: 'orange', w: 1.3 }); sk.line(B[0], B[1], G[0], G[1], { c: 'orange', w: 1.3 });
    sk.dot(P[0], P[1], { r: 2.3, c: 'red' }); sk.label(P[0] + 5, P[1] - 12, 'P(30,52)', { s: 11, c: 'red' });
    sk.dot(Z[0], Z[1], { r: 2.4, c: 'red' }); sk.label(Z[0] - 28, Z[1] + 27, '避雷針', { s: 10.5, c: 'red' });
    sk.line(Z[0] - 6, Z[1] + 26, Z[0] - 1, Z[1] + 4, { c: 'red', w: 1, arrow: true, head: 4 });
    [[O, 'O', -12, 0], [A, 'A', 3, 0], [B, 'B', 4, -8], [C, 'C', -13, -8], [G, 'G', -12, -14], [F, 'F', 3, -14]]
      .forEach(([p, t, dx, dy]) => sk.label(p[0] + dx, p[1] + dy, t, { s: 11, c: 'gray' }));
    sk.label(D[0] - 10, D[1] + 1, '\\red{D}', { s: 11 }); sk.label(E[0] + 1, E[1] + 1, '\\red{E}', { s: 11 });
    sk.label(600, 1093, '\\gray{(依比例畫)}', { s: 10 });
  }
});
