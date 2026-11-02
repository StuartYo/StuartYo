/* 113 學年度 南一 學測第四次聯合模擬考 數學B (113nanyi4B) — handwritten solutions
 * Based on the booklet's own 解析 (PDF p.9–10), trimmed. Q3 uses the triple-angle identity instead of the graph,
 * Q6 counts k = |x − n| directly, Q9 uses coordinates for the dot products.
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet, p.9–10 解析). A4 scan, no /Rotate.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈40–66, options at x≈75–86.
 */

/* ---------------- 第 1 頁 : Q1 – Q4 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 18, 191, '(2)');
  T(pg, 86, 396, [
    '\\orange{燈軸水平，坡面與軸夾 15\\deg；母線與軸夾 10\\deg}',
    '15\\deg > 10\\deg ⇒ 上、下兩條母線都會打到坡面 \\gray{(右圖示意)}',
    '⇒ 照亮區域的邊界是封閉曲線 ⇒ 橢圓，選 \\red{\\box{(2)}}',
  ], { s: 12.5, lh: 1.5 });
  {   // side view (angles exaggerated): slope 24°, half-angle 12°
    const t1 = Math.tan(24 * Math.PI / 180), t2 = Math.tan(12 * Math.PI / 180);
    const S = x => 466 - (x - 520) * t1;               // slope line
    sk.line(520, 466, 700, S(700), { c: 'gray', w: 1.1 });
    sk.line(520, 466, 610, 466, { c: 'gray', w: 0.8, dash: '3 3' });
    const H = [540, 433];
    const xu = H[0] + (S(H[0]) - H[1]) / (t1 - t2), xl = H[0] + (S(H[0]) - H[1]) / (t1 + t2);
    const U = [xu, S(xu)], Lo = [xl, S(xl)];
    sk.line(H[0], H[1], 700, H[1], { c: 'gray', w: 0.9, dash: '3 3' });
    sk.line(H[0], H[1], U[0], U[1], { c: 'orange', w: 1.2 });
    sk.line(H[0], H[1], Lo[0], Lo[1], { c: 'orange', w: 1.2 });
    sk.line(Lo[0], Lo[1], U[0], U[1], { c: 'red', w: 2.2 });
    sk.line(H[0], H[1], H[0], S(H[0]), { c: 'green', w: 1.4 });
    sk.dot(H[0], H[1], { r: 2.2, c: 'green' });
    sk.label(H[0] - 22, H[1] - 8, '\\green{燈}', { s: 10 });
    sk.label(572, 452, '15\\deg', { s: 9 });
    sk.label(598, 422, '\\orange{10\\deg}', { s: 9 });
    sk.label(U[0] + 8, U[1] - 4, '\\red{兩端都在坡上}', { s: 10 });
  }

  // Q2
  ANS(pg, 18, 470, '(3)');
  T(pg, 392, 576, '時針每分轉 \\frac{\\pi}{360}，分針每分轉 \\frac{2\\pi}{60} = \\frac{\\pi}{30}', { s: 13 });
  T(pg, 86, 612, [
    '第一次重疊：分針比時針多轉一圈 ⇒ (\\frac{\\pi}{30} − \\frac{\\pi}{360})t = 2\\pi ⇒ t = \\frac{720}{11} 分',
    '\\theta = \\frac{\\pi}{360} \\cdot \\frac{720}{11} = \\red{\\box{\\frac{2}{11}\\pi}}',
  ], { s: 13, lh: 1.6, gap: 2 });

  // Q3
  ANS(pg, 18, 686, '(2)');
  T(pg, 86, 805, [
    '\\sin 3x = 3\\sin x − 4\\sin^{3}x \\gray{(三倍角公式)}',
    '⇒ 3\\sin x − 4\\sin^{3}x = 3\\sin x ⇒ \\sin^{3}x = 0 ⇒ \\sin x = 0',
    'x = −2\\pi, −\\pi, 0, \\pi, 2\\pi 共 5 個 ⇒ \\red{\\box{(2)}}',
  ], { s: 13, lh: 1.5 });
  {   // y = 3 sin x vs y = sin 3x on [−2π, 2π]
    const ux = 13, uy = 9.5, O = [662, 818], M = (x, y) => [O[0] + ux * x, O[1] - uy * y];
    sk.arrow(O[0] - 88, O[1], O[0] + 92, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 33, O[0], O[1] - 36, { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(x => 3 * Math.sin(x), -2 * Math.PI, 2 * Math.PI, M, { c: 'green', w: 1.2, n: 80 });
    sk.fn(x => Math.sin(3 * x), -2 * Math.PI, 2 * Math.PI, M, { c: 'blue', w: 1, n: 160 });
    [-2, -1, 0, 1, 2].forEach(k => { const p = M(k * Math.PI, 0); sk.dot(p[0], p[1], { r: 2, c: 'red' }); });
    sk.label(O[0] + 30, O[1] - 46, '\\green{y = 3\\sin x}', { s: 9.5 });
    sk.label(O[0] - 92, O[1] + 18, 'y = \\sin 3x', { s: 9.5 });
  }

  // Q4
  ANS(pg, 18, 878, '(4)');
  T(pg, 86, 996, [
    'y = 8\\log(\\frac{x}{3})^{2} = 16\\log\\frac{x}{3}',
    'y_2 − y_1 = 16(\\log\\frac{x_2}{3} − \\log\\frac{x_1}{3}) = 16\\log\\frac{x_2}{x_1} = 16\\log 9 = 32\\log 3',
    '⇒ y_2 = y_1 + 32\\log 3，選 \\red{\\box{(4)}}',
  ], { s: 13.5, lh: 1.6, gap: 2 });
});

/* ---------------- 第 2 頁 : Q5 – Q7 ---------------- */
page(3, (pg, sk) => {
  // Q5
  ANS(pg, 14, 101, '(1)');
  T(pg, 78, 258, [
    '\\orange{經度差 120\\deg + 60\\deg = 180\\deg ⇒ A、B 在同一條經線圈 (大圓) 上}',
    '最短路徑越過北極：圓心角 = (90\\deg − 24\\deg) \\times 2 = 132\\deg',
    '弧長 = 2\\pi \\cdot 12 \\cdot \\frac{132}{360} = \\red{\\box{\\frac{44}{5}\\pi}}',
  ], { s: 13, lh: 1.6, gap: 2 });
  {   // meridian cross-section
    const C = [672, 302], r = 40, P = a => [C[0] + r * Math.cos(a * Math.PI / 180), C[1] - r * Math.sin(a * Math.PI / 180)];
    sk.circle(C[0], C[1], r, { c: 'green', w: 1.1 });
    sk.line(C[0] - r - 8, C[1], C[0] + r + 8, C[1], { c: 'gray', w: 0.8, dash: '3 3' });
    sk.arc(C[0], C[1], r, 24, 156, { c: 'red', w: 2 });
    const A = P(156), B = P(24), N = P(90);
    sk.line(C[0], C[1], A[0], A[1], { c: 'gray', w: 0.9 }); sk.line(C[0], C[1], B[0], B[1], { c: 'gray', w: 0.9 });
    [A, B, N].forEach(p => sk.dot(p[0], p[1], { r: 1.8 }));
    sk.label(A[0] - 14, A[1] - 12, 'A', { s: 11 }); sk.label(B[0] + 5, B[1] - 12, 'B', { s: 11 });
    sk.label(N[0] - 4, N[1] - 18, 'N', { s: 10 });
    sk.label(C[0] - r - 34, C[1] - 7, '24\\deg', { s: 9.5 }); sk.label(C[0] + r + 9, C[1] - 7, '24\\deg', { s: 9.5 });
    sk.label(C[0] - 12, C[1] - 28, '\\orange{\\small{132\\deg}}', { s: 9 });
  }

  // Q6
  ANS(pg, 14, 360, '(5)');
  T(pg, 78, 488, [
    '令 k = |x − n|，b < k < a；每個正整數 k 對應 x = n \\pm k 兩個解',
    '10 個整數解 ⇒ (b, a) 內恰有 5 個整數 k：m + 1, …, m + 5',
    '⇒ b \\ge m 且 a \\le m + 6 ⇒ a − b \\le 6',
    '例：b = 1，a = 7 ⇒ k = 2 \\sim 6 恰 10 解 ⇒ 最大值 \\red{\\box{6}}，選 (5)',
  ], { s: 13, lh: 1.5 });
  {   // number line for k
    const y = 470, x0 = 572, d = 24;
    sk.line(x0 - 10, y, x0 + 7 * d + 12, y, { c: 'gray', w: 0.9, arrow: true, head: 4 });
    for (let k = 0; k <= 7; k++) sk.line(x0 + k * d, y - 3, x0 + k * d, y + 3, { c: 'gray', w: 0.8 });
    for (let k = 2; k <= 6; k++) sk.dot(x0 + k * d, y, { r: 2.2, c: 'red' });
    sk.circle(x0 + d, y, 3.2, { c: 'orange', w: 1 }); sk.circle(x0 + 7 * d, y, 3.2, { c: 'orange', w: 1 });
    sk.label(x0 + d - 4, y + 5, '\\orange{b}', { s: 10 }); sk.label(x0 + 7 * d - 4, y + 5, '\\orange{a}', { s: 10 });
    sk.label(x0 + 2 * d - 6, y + 6, '\\red{\\small{5 個 k}}', { s: 9 });
  }

  // Q7
  MANS(pg, 10, 656, [2, 4, 5]);
  MK(pg, 408, 816, false); MK(pg, 258, 843, true); MK(pg, 506, 868, false); MK(pg, 266, 894, true); MK(pg, 430, 923, true);
  T(pg, 430, 817, 'Y 不是 X 的一次函數 ⇒ r_{XY} < 1', { s: 12 });
  T(pg, 280, 844, 'Z = \\frac{1}{2}X ⇒ r_{XZ} = 1', { s: 12 });
  T(pg, 528, 869, '\\sig_Z = \\sqrt3 ≠ \\log_2\\sig_Y ≈ 3.55', { s: 11.5 });
  T(pg, 288, 895, '見下', { s: 12 });
  T(pg, 452, 924, '五點全在 Z = 0.5X 上 ⇒ 就是迴歸直線', { s: 12 });
  T(pg, 78, 952, [
    '\\orange{Z = \\log_2 Y：\\frac{1}{2}, 1, 2, 4, 5 ⇒ Z = \\frac{1}{2}X，完全正相關}',
    '(3) \\sig_Z = \\frac{1}{2}\\sig_X = \\sqrt3；\\sig_Y ≈ 11.7 ⇒ \\log_2\\sig_Y ≈ 3.55，不相等',
    '(4) \\mu_X = 5，\\sig_X^{2} = \\frac{16 + 9 + 1 + 9 + 25}{5} = 12 ⇒ \\sig_X = 2\\sqrt3',
  ], { s: 13, lh: 1.6, gap: 2 });
});

/* ---------------- 第 3 頁 : Q8 – Q10 ---------------- */
page(4, (pg, sk) => {
  // Q8
  MANS(pg, 12, 99, [1, 3, 4, 5]);
  MK(pg, 152, 155, true); MK(pg, 168, 182, false); MK(pg, 382, 208, true); MK(pg, 588, 235, true); MK(pg, 588, 261, true);
  T(pg, 176, 150, '對稱中心 x = \\frac{2a}{3} = 2 ⇒ a = 3', { s: 12 });
  T(pg, 192, 182, '\\gray{同(1)}', { s: 12 });
  T(pg, 404, 208, 'f(2) = 8 − 24 + 18 − 3 = −1', { s: 12 });
  T(pg, 86, 288, [
    'a = 3：f(x) = x^{3} − 6x^{2} + 9x − 3 = (x − 2)^{3} − 3(x − 2) − 1',
    'y = f + g = (x − 2)^{3} + (b − 3)(x − 2) = (x − 2)[(x − 2)^{2} + b − 3]',
    '(4) b = 4：(x − 2)^{2} + 1 > 0 ⇒ 只有 x = 2　(5) b = 1：x = 2, 2 \\pm \\sqrt2 三個',
  ], { s: 12.5, lh: 1.5 });

  // Q9
  MANS(pg, 12, 354, [1, 2, 4]);
  MK(pg, 214, 435, true); MK(pg, 223, 462, true); MK(pg, 190, 489, false); MK(pg, 194, 515, true); MK(pg, 201, 542, false);
  T(pg, 238, 436, '首尾相接', { s: 12 });
  T(pg, 246, 462, '2\\vec{AB} + \\vec{AL} = (1, \\sqrt3) + (1, 0) = (2, \\sqrt3) = \\vec{AF}', { s: 11.5 });
  T(pg, 214, 486, '= 1 \\cdot 1 \\cdot \\cos 60\\deg = \\frac{1}{2}', { s: 11.5 });
  T(pg, 218, 513, '(\\frac{1}{2}, −\\frac{\\sqrt3}{2}) \\cdot (3, \\sqrt3) = \\frac{3}{2} − \\frac{3}{2} = 0', { s: 11.5 });
  T(pg, 225, 541, '(2, \\sqrt3) \\cdot (3, \\sqrt3) = 6 + 3 = 9', { s: 11.5 });
  T(pg, 86, 570, '\\orange{坐標：A(0, 0)、L(1, 0)、B(\\frac{1}{2}, \\frac{\\sqrt3}{2})、F(2, \\sqrt3)、G(3, \\sqrt3)、E(\\frac{3}{2}, \\frac{3\\sqrt3}{2})}', { s: 12 });

  // Q10
  MANS(pg, 4, 630, [1, 3, 4]);
  MK(pg, 357, 790, true); MK(pg, 396, 815, false); MK(pg, 407, 873, true); MK(pg, 397, 933, true); MK(pg, 313, 972, false);
  T(pg, 380, 791, '段數每步 \\times 2：2^{3} = 8', { s: 12 });
  T(pg, 420, 812, '每段長 (\\frac{1}{3})^{5} = \\frac{1}{243}', { s: 12 });
  T(pg, 430, 874, '每步留下 \\frac{2}{3}', { s: 12 });
  T(pg, 420, 930, 'E_n = (\\frac{2}{3})^{n}', { s: 12 });
  T(pg, 336, 970, '= \\frac{422}{243} ≠ \\frac{211}{81}', { s: 12 });
  T(pg, 86, 1006, [
    '(4) E_5 = \\frac{32}{243} ≈ 0.13 > \\frac{1}{10}，E_6 = \\frac{64}{729} ≈ 0.088 < \\frac{1}{10}，之後遞減 ⇒ 成立',
    '(5) E_1 + \\cdots + E_5 = \\frac{\\frac{2}{3}[1 − (\\frac{2}{3})^{5}]}{1 − \\frac{2}{3}} = 2(1 − \\frac{32}{243}) = \\frac{422}{243}',
  ], { s: 13, lh: 1.75, gap: 2 });
});

/* ---------------- 第 4 頁 : Q11 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q11
  MANS(pg, 4, 100, [3, 5]);
  MK(pg, 516, 410, false); MK(pg, 516, 436, false); MK(pg, 680, 459, true); MK(pg, 188, 511, false); MK(pg, 460, 537, true);
  T(pg, 538, 411, '1、10 切換，15 不 ⇒ 2 次 ⇒ 熄', { s: 11.5 });
  T(pg, 538, 437, '三個都切換 ⇒ 3 次 ⇒ 亮', { s: 11.5 });
  T(pg, 210, 512, '後兩個有順序，應為 P\\stk{9}{2}', { s: 11.5 });
  T(pg, 76, 562, [
    '\\orange{會切換 9 號的號碼 (同列、同行、9 本身)：1, 5, 9, 10, 11, 12, 13 共 7 個；其餘 9 個}',
    '(3) 亮→熄→亮 ⇔ 三個都切換：P\\stk{7}{3} = 210　(4) 先切換再兩個不切換：P\\stk{7}{1} \\times P\\stk{9}{2} = 504',
    '(5) 最後亮 ⇔ 切換奇數次：3 個切換 210 + 恰 1 個切換 3 \\times 7 \\times P\\stk{9}{2} = 1512，共 1722',
  ], { s: 12.5, lh: 1.6, gap: 2 });

  // Q12
  ANS(pg, 1, 727, ['(2, 5,', '169)'], { s: 13, lh: 1.2 });
  T(pg, 76, 932, [
    'A(14, 0)、B(14, 10)、C(−10, 10)',
    '\\ang ABC = 90\\deg ⇒ AC 是外接圓直徑',
    '圓心 = AC 中點 (2, 5)',
    'm = r^{2} = (14 − 2)^{2} + (0 − 5)^{2} = 169',
    '⇒ (h, k, m) = \\red{\\box{(2, 5, 169)}}',
  ], { s: 13.5, lh: 1.75 });
  {
    const u = 6.6, O = [600, 1049], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 76, O[1], O[0] + 112, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 46, O[0], O[1] - 100, { c: 'gray', w: 0.8, head: 3.5 });
    const A = M(14, 0), B = M(14, 10), C = M(-10, 10), Q = M(2, 5);
    sk.circle(Q[0], Q[1], 13 * u, { c: 'green', w: 1, dash: '4 3' });
    sk.poly([A, B, C], { closed: true, c: 'blue', w: 1.2 });
    sk.line(A[0], A[1], C[0], C[1], { c: 'orange', w: 1, dash: '3 3' });
    sk.rightAngle(B[0], B[1], -1, 0, 0, 1, 6, { c: 'blue' });
    [A, B, C].forEach(p => sk.dot(p[0], p[1], { r: 1.8 })); sk.dot(Q[0], Q[1], { r: 2, c: 'red' });
    sk.label(A[0] + 4, A[1] + 2, 'A', { s: 11 }); sk.label(B[0] + 4, B[1] - 14, 'B', { s: 11 });
    sk.label(C[0] - 14, C[1] - 14, 'C', { s: 11 }); sk.label(Q[0] + 4, Q[1] - 17, '\\red{(2, 5)}', { s: 10 });
    sk.label(O[0] - 12, O[1] + 1, '\\small{O}', { s: 9 });
  }
});

/* ---------------- 第 5 頁 : Q13 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 4, 103, '3\\sqrt3', { s: 15 });
  T(pg, 86, 170, [
    '\\tri AEF：AE = AF = 2，夾 60\\deg ⇒ 正三角形，EF = 2',
    '\\tri ADE：DE^{2} = 36 + 4 − 2 \\cdot 6 \\cdot 2\\cos 60\\deg = 28 ⇒ DE = DF = 2\\sqrt7',
    'EF 中點 M：DM = \\sqrt{28 − 1} = 3\\sqrt3 ⇒ 面積 = \\frac{1}{2} \\cdot 2 \\cdot 3\\sqrt3 = \\red{\\box{3\\sqrt3}}',
  ], { s: 12.5, lh: 1.45 });
  {   // tetrahedron sketch with triangle EFD
    const A = [690, 140], B = [640, 230], C = [748, 230], D = [714, 204];
    const E = [A[0] + (B[0] - A[0]) / 3, A[1] + (B[1] - A[1]) / 3], F = [A[0] + (C[0] - A[0]) / 3, A[1] + (C[1] - A[1]) / 3];
    sk.poly([E, F, D], { closed: true, fill: 'hl', op: 0.6, c: 'none' });
    const L = (p, q, o) => sk.line(p[0], p[1], q[0], q[1], o);
    const so = { c: 'green', w: 1.1 }, da = { c: 'green', w: 0.9, dash: '3 3' };
    L(A, B, so); L(A, C, so); L(B, C, so); L(A, D, da); L(B, D, da); L(C, D, da);
    L(E, F, { c: 'orange', w: 1.3 }); L(E, D, { c: 'orange', w: 1.3 }); L(F, D, { c: 'orange', w: 1.3 });
    [[A, 'A', -4, -15], [B, 'B', -12, -4], [C, 'C', 4, -4], [D, 'D', 2, 2], [E, 'E', -13, -8], [F, 'F', 5, -10]]
      .forEach(([p, s, dx, dy]) => sk.label(p[0] + dx, p[1] + dy, s, { s: 10 }));
  }

  // Q14
  ANS(pg, 2, 252, '\\frac{1}{7}\\mat{3&4\\\\3&4}', { s: 11 });
  T(pg, 462, 296, 'Y = I − X ⇒ A = 5X − 2(I − X) = 7X − 2I', { s: 12.5 });
  T(pg, 462, 322, 'X = \\frac{1}{7}(A + 2I) = \\frac{1}{7}\\mat{3&4\\\\3&4}', { s: 12.5 });
  T(pg, 86, 376, 'X^{2} = \\frac{1}{49}\\mat{21&28\\\\21&28} = X ⇒ X^{n} = X ⇒ X^{2024} = \\red{\\box{\\frac{1}{7}\\mat{3&4\\\\3&4}}}', { s: 13 });

  // Q15
  ANS(pg, 2, 456, '\\frac{289}{1089}', { s: 12.5 });
  T(pg, 86, 590, [
    '每次取到奇數：正面 \\frac{2}{3} \\cdot \\frac{4}{8} + 反面 \\frac{1}{3} \\cdot \\frac{6}{11} = \\frac{1}{3} + \\frac{2}{11} = \\frac{17}{33}',
    '乘積為奇數 ⇔ 兩數都是奇數 ⇒ (\\frac{17}{33})^{2} = \\red{\\box{\\frac{289}{1089}}}',
  ], { s: 13, lh: 1.75, gap: 2 });

  // Q16
  ANS(pg, 10, 670, '2');
  T(pg, 400, 752, '紅球 x 顆、藍球 20 − x 顆；店家每次期望賺 6 元', { s: 12.5 });
  T(pg, 86, 784, [
    '20 − (20 \\cdot \\frac{x}{40} + 100 \\cdot \\frac{20 − x}{40}) = 6 ⇒ 20x + 2000 − 100x = 560',
    '⇒ x = 18，藍球 \\red{\\box{2}} 顆',
  ], { s: 13, lh: 1.7, gap: 2 });

  // Q17
  ANS(pg, 8, 864, '92');
  T(pg, 462, 993, '\\orange{陽性中「真有瘜肉」的比例}', { s: 12.5 });
  T(pg, 86, 1024, 'P = \\frac{\\frac{1}{30} \\times 98\\%}{\\frac{1}{30} \\times 98\\% + \\frac{29}{30} \\times 0.3\\%} = \\frac{0.98}{0.98 + 0.087} ≈ 0.9185 ≈ \\red{\\box{92}}%', { s: 13.5 });
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q18
  ANS(pg, 4, 720, '(2)', { s: 18 });
  T(pg, 404, 793, '進口稅 = 200 \\times 17.5% = 35 萬', { s: 12.5 });
  T(pg, 72, 815, '\\orange{電動車 > 140 萬 ⇒ 貨物稅率減半 30% → 15%}，貨物稅 = (200 + 35) \\times 15% = \\red{\\box{35.25}} 萬', { s: 12.5 });

  // Q19
  ANS(pg, 4, 840, '(2)', { s: 18 });
  T(pg, 424, 913, '營業稅 = (235 + 35.25) \\times 5% = 13.5125', { s: 12 });
  T(pg, 72, 937, '奢侈稅基 283.7625 < 300 ⇒ 免奢侈稅；總計 = 235 + 35.25 + 13.5125 = \\red{\\box{283.7625}} 萬', { s: 12.5 });

  // Q20
  ANS(pg, 2, 962, ['69.09', '萬元'], { s: 12, lh: 1.2 });
  T(pg, 72, 1010, [
    '一般車：進口稅 35，貨物稅 235 \\times 30% = 70.5，營業稅 (235 + 70.5) \\times 5% = 15.275',
    '奢侈稅基 = 235 + 70.5 + 15.275 = 320.775 > 300 ⇒ 奢侈稅 32.0775，總計 352.8525 萬',
    '差額 = 352.8525 − 283.7625 = \\red{\\box{69.09}} 萬元',
  ], { s: 12.5, lh: 1.55 });
});
