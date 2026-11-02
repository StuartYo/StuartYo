/* 113 學年度 翰林 E4（北北基聯合模擬考）數學A — handwritten solutions
 * Single file: cover p.1, question pages PDF p.2–7, formula sheet p.8, 詳解 PDF p.10–15 (answer table on p.10).
 * Methods follow that 詳解, trimmed. Q1 checks (√3 − √2 + 1)^2 directly; Q9 uses direction angles (53°, −7°, ≈53.13°);
 * Q16 reflects the direction vector of L1 across L instead of the tan-difference route; Q20 notes f(x) = h(rx).
 * Pages are 618 x 867 pt; backgrounds are rendered straight to 1588 x 2246 so lines.py gives engine coords.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈80, options at x≈104.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 30, 236, '(3)');
  T(pg, 330, 276, [
    '\\orange{6 = 3 + 2 + 1 ⇒ 試 x = \\sqrt3，y = −\\sqrt2，z = 1}',
    'x^2 + y^2 + z^2 = 6',
    '2(xy + yz + zx) = −2\\sqrt6 − 2\\sqrt2 + 2\\sqrt3 \\ok',
    '⇒ 原式 = |\\sqrt3 − \\sqrt2 + 1|',
    '≈ 1.732 − 1.414 + 1 = \\red{\\box{1.318}}',
  ], { s: 13.5, lh: 1.55 });

  // Q2
  ANS(pg, 30, 462, '(2)');
  T(pg, 240, 568, [
    '\\sig_x^2 = (x_i^2 的平均) − \\mu_x^2',
    '⇒ x_i^2 的平均 = 144 + 16^2 = 400',
    '\\mu_y = \\frac{1}{8} \\cdot 400 − 3 \\cdot 16 + 11 = 50 − 48 + 11 = \\red{\\box{13}}',
    '\\gray{\\small{(平均可逐項取，但 x_i^2 的平均要用 \\sig^2 + \\mu^2)}}',
  ], { s: 13.5, lh: 1.6 });

  // Q3
  ANS(pg, 30, 754, '(4)');
  T(pg, 176, 878, [
    '連 \\ov{CD}：\\ov{AD} 是直徑 ⇒ \\ang ACD = 90\\deg',
    '⇒ \\ang CED = 90\\deg − \\ang CDB',
    '\\tri BCD 的外接圓就是這個圓，直徑 8',
    '正弦定理：\\frac{\\ov{BC}}{\\sin\\ang CDB} = 8 ⇒ \\sin\\ang CDB = \\frac{5}{8}',
    '\\sin\\ang CED = \\cos\\ang CDB = \\sqrt{1 − \\frac{25}{64}} = \\red{\\box{\\frac{\\sqrt{39}}{8}}}',
  ], { s: 13.5, lh: 1.55 });
  {
    const C = [650.3, 766.8], D = [708.7, 841.7], E = [591, 813.8], A = [556, 841.6];
    sk.line(C[0], C[1], D[0], D[1], { c: 'green', w: 1.4 });
    const u = [(A[0] - C[0]), (A[1] - C[1])], lu = Math.hypot(...u), v = [(D[0] - C[0]), (D[1] - C[1])], lv = Math.hypot(...v);
    sk.rightAngle(C[0], C[1], u[0] / lu, u[1] / lu, v[0] / lv, v[1] / lv, 7, { c: 'green', w: 1 });
    sk.label(612, 776, '\\green{5}', { s: 10 });
    sk.label(626, 846, '\\green{8}', { s: 10 });
  }
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 30, 109, '(4)');
  T(pg, 200, 190, [
    '排序：30, 30, 40, \\ul{50, 50}, 60, 70, 90 ⇒ M = 50',
    '選 3 人，中位數 = 50：',
    '\\circ{1} 恰一個 50：低 (3 選 1) \\times 50 (2 選 1) \\times 高 (3 選 1) = 18',
    '\\circ{2} 兩個 50：第三人 6 選 1 = 6',
    '共 18 + 6 = \\red{\\box{24}} 種',
  ], { s: 13.5, lh: 1.55 });

  // Q5
  ANS(pg, 30, 404, '(3)');
  T(pg, 248, 464, '方向都是 (0, 0, 1) ⇒ 平行', { s: 12 });
  T(pg, 326, 511, '方向 (0, 0, 1)、(0, 0, −2) 平行', { s: 12 });
  T(pg, 366, 548, [
    '(1, −1, 0) \\times (0, 1, 1) = (−1, −1, 1)',
    '(1, −3, 0) \\times (2, −6, 1) = (−3, −1, 0) \\red{不平行}',
  ], { s: 12, lh: 1.45 });
  T(pg, 432, 601, '(2, 1, −2) \\para (4, 2, −4) 平行', { s: 12 });
  T(pg, 416, 642, '(1, 1, 2) \\para (2, 2, 4) 平行', { s: 12 });
  T(pg, 104, 690, [
    '\\orange{方向向量平行 ⇒ 公垂線有無限多條；不平行 (歪斜或相交) ⇒ 恰一條}',
    '只有 (3) 的兩方向不平行 ⇒ \\red{\\box{(3)}}',
  ], { s: 13, lh: 1.6 });

  // Q6
  ANS(pg, 30, 772, '(5)');
  T(pg, 160, 830, [
    '\\ov{AB} = \\sqrt{1 + 4 + 4} = 3，\\vec{AD} = \\frac{2}{3}\\vec{AB} + \\frac{1}{3}\\vec{AC}',
    '|\\vec{AD}|^2 = \\frac{4}{9} \\cdot 9 + \\frac{4}{9}\\vec{AB} \\cdot \\vec{AC} + \\frac{1}{9} \\cdot 4 = \\frac{40}{9} + \\frac{4}{9}\\vec{AB} \\cdot \\vec{AC}',
    '\\orange{三角形 ⇒ 0 < \\ang A < \\pi ⇒ −6 < \\vec{AB} \\cdot \\vec{AC} < 6}',
    '⇒ \\frac{16}{9} < \\ov{AD}^2 < \\frac{64}{9} ⇒ \\frac{4}{3} < \\ov{AD} < \\frac{8}{3}',
    'a + b = \\frac{4}{3} + \\frac{8}{3} = \\red{\\box{4}}',
  ], { s: 13.5, lh: 1.55 });
  {
    const A = [690, 850], B = [612, 935], C = [740, 935], D = [B[0] + (C[0] - B[0]) / 3, 935];
    sk.poly([A, B, C], { closed: true, c: 'blue', w: 1.2 });
    sk.arrow(A[0], A[1], D[0], D[1], { c: 'orange', w: 1.2, head: 5 });
    sk.dot(D[0], D[1], { r: 1.6 });
    sk.label(A[0] - 4, A[1] - 17, 'A', { s: 10 }); sk.label(B[0] - 12, B[1] - 6, 'B', { s: 10 });
    sk.label(C[0] + 3, C[1] - 6, 'C', { s: 10 }); sk.label(D[0] - 3, D[1] + 2, 'D', { s: 10 });
    sk.label(637, 879, '\\green{3}', { s: 10 }); sk.label(720, 880, '\\green{2}', { s: 10 });
    sk.label(624, 938, '\\green{\\small{1}}', { s: 9 }); sk.label(690, 938, '\\green{\\small{2}}', { s: 9 });
  }
});

/* ---------------- 第 3 頁 : Q7 – Q9 ---------------- */
page(4, (pg, sk) => {
  // Q7
  MANS(pg, 30, 187, [1, 2, 5]);
  MK(pg, 214, 240, true);
  T(pg, 236, 241, '900 \\times 7 = 6300 到 999 \\times 7 = 6993', { s: 11.5 });
  MK(pg, 268, 263, true);
  T(pg, 290, 264, '7b 與 b 同奇偶 ⇒ f 與 b 同奇偶', { s: 11.5 });
  MK(pg, 272, 287, false);
  T(pg, 294, 288, 'd = 3 \\sim 9，只有 7 個', { s: 11.5 });
  MK(pg, 620, 318, false);
  T(pg, 642, 314, '\\frac{3}{20}', { s: 11.5 });
  MK(pg, 160, 378, true);
  T(pg, 186, 374, [
    '(4) 乘積共 100 個；d = 6：6601 = 943 \\times 7 到 6699 = 957 \\times 7，共 15 個 ⇒ \\frac{15}{100} = \\frac{3}{20}',
    '(5) 其中 e = 5：6650 = 950 \\times 7、6657 = 951 \\times 7，共 2 個 ⇒ \\frac{2}{15}',
  ], { s: 12, lh: 1.65 });

  // Q8
  MANS(pg, 30, 483, [1, 2, 3]);
  MK(pg, 382, 535, true);
  T(pg, 402, 536, 'a < 0，如 y = −2^x', { s: 11.5 });
  MK(pg, 424, 560, true);
  T(pg, 444, 561, '定義域 x > 0', { s: 11.5 });
  MK(pg, 454, 584, true);
  T(pg, 474, 585, 'a = −1, b = 1 (右圖)', { s: 11.5 });
  MK(pg, 466, 609, false);
  MK(pg, 596, 633, false);
  T(pg, 104, 658, [
    '(4) b\\log_3 x = \\frac{b}{\\log 3}\\log x = \\log x ⇒ b = \\log 3 ≈ 0.477 > 0.4',
    '(5) 和 y = \\log x 對稱於 y = x 的是 y = 10^x；a \\cdot 2^x 只是 2^x 鉛直伸縮，變不成 10^x',
  ], { s: 12, lh: 1.6 });
  {
    const u = 22, O = [652, 548], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 34, O[1], O[0] + 60, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 58, O[0], O[1] - 28, { c: 'gray', w: 0.8, head: 3.5 });
    sk.fn(x => -Math.pow(2, x), -1.5, 1.32, M, { c: 'blue', w: 1.2 });
    sk.fn(x => Math.log(x) / Math.log(3), 0.08, 2.6, M, { c: 'green', w: 1.2 });
    const P = M(0.265, -1.2); sk.dot(P[0], P[1], { r: 2, c: 'red' });
    sk.label(O[0] + 30, O[1] + 34, '\\small{−2^x}', { s: 9 });
    sk.label(O[0] + 40, O[1] - 22, '\\green{\\small{\\log_3 x}}', { s: 9 });
  }

  // Q9
  MANS(pg, 30, 746, [1, 4, 5]);
  T(pg, 420, 778, '\\orange{\\vec a 在 53\\deg、\\vec b 在 −7\\deg、\\vec c 在 ≈53.13\\deg 方向}', { s: 11.5 });
  MK(pg, 334, 808, true);
  T(pg, 356, 809, '53\\deg − (−7\\deg) = 60\\deg', { s: 11.5 });
  MK(pg, 276, 838, false);
  T(pg, 298, 839, '|\\vec c| = 5，夾角 ≈ 0.13\\deg ⇒ \\vec a \\cdot \\vec c 略小於 5', { s: 11.5 });
  MK(pg, 446, 870, false);
  T(pg, 466, 866, '\\sin 60\\deg = \\frac{\\sqrt3}{2} > \\frac{1}{2}', { s: 11.5 });
  MK(pg, 588, 912, true);
  MK(pg, 338, 965, true);
  T(pg, 360, 966, '\\vec a、\\vec b 不平行 ⇒ 唯一', { s: 11.5 });
  T(pg, 104, 994, [
    '(4) \\vec c 在 \\vec a 上的投影長 = 5\\cos 0.13\\deg ≈ 5，在 \\vec b 上 = 5\\cos 60.13\\deg ≈ 2.49',
    '\\gray{(\\vec a = (\\cos 53\\deg, \\sin 53\\deg)，\\vec b = (\\cos(−7\\deg), \\sin(−7\\deg))；\\vec c = (3, 4) 與 x 軸夾角 ≈ 53.13\\deg)}',
  ], { s: 12, lh: 1.6 });
  {
    const O = [634, 892], P = (r, d) => [O[0] + r * Math.cos(d * Math.PI / 180), O[1] - r * Math.sin(d * Math.PI / 180)];
    const a = P(36, 53), b = P(36, -7), c = P(78, 53.13);
    sk.arrow(O[0], O[1], c[0], c[1], { c: 'green', w: 1, head: 4 });
    sk.arrow(O[0], O[1], a[0], a[1], { c: 'blue', w: 1.4, head: 4 });
    sk.arrow(O[0], O[1], b[0], b[1], { c: 'blue', w: 1.4, head: 4 });
    sk.arc(O[0], O[1], 14, -7, 53, { c: 'orange', w: 1 });
    sk.label(a[0] - 16, a[1] - 6, '\\vec a', { s: 10 }); sk.label(b[0] + 2, b[1] - 8, '\\vec b', { s: 10 });
    sk.label(c[0] + 3, c[1] - 6, '\\green{\\vec c}', { s: 10 });
    sk.label(O[0] + 16, O[1] - 18, '\\orange{\\small{60\\deg}}', { s: 8 });
  }
});

/* ---------------- 第 4 頁 : Q10 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q10
  MANS(pg, 30, 112, [1, 2, 5]);
  MK(pg, 210, 208, true);
  T(pg, 232, 209, '\\ov{GI} = \\sqrt3a，\\ov{AI}^2 = \\ov{GI}^2 + \\ov{AG}^2', { s: 11.5 });
  MK(pg, 356, 231, true);
  T(pg, 378, 233, '18 \\ge 2\\sqrt{3a^2b^2} ⇒ ab \\le 3\\sqrt3 \\gray{(a = \\sqrt3, b = 3)}', { s: 11.5 });
  MK(pg, 624, 258, false);
  T(pg, 646, 254, '\\frac{27\\sqrt3}{2}', { s: 11.5 });
  MK(pg, 358, 283, false);
  T(pg, 380, 284, '周長 2(a + b) \\le 4\\sqrt6', { s: 11.5 });
  MK(pg, 662, 318, true);
  T(pg, 104, 350, [
    '(3) V = \\frac{3\\sqrt3}{2}a^2 \\cdot b = \\frac{27\\sqrt3}{2}　(4) 柯西 (3a^2 + b^2)(\\frac{1}{3} + 1) \\ge (a + b)^2 ⇒ a + b \\le 2\\sqrt6',
    '(5) 等號 b = 3a ⇒ a = \\frac{\\sqrt6}{2}、b = \\frac{3\\sqrt6}{2}，表面積 = 2 \\cdot \\frac{3\\sqrt3}{2}a^2 + 6ab = \\frac{9\\sqrt3}{2} + 27 = \\frac{9\\sqrt3 + 54}{2}',
  ], { s: 12, lh: 1.45 });
  {
    const A = [619.5, 141], G = [619.5, 201.5], I = [684, 220.5];
    sk.line(G[0], G[1], I[0], I[1], { c: 'green', w: 1.4 });
    sk.line(A[0], A[1], I[0], I[1], { c: 'green', w: 1.1, dash: '3 3' });
  }

  // Q11
  MANS(pg, 30, 423, [2, 5]);
  MK(pg, 292, 498, false);
  T(pg, 314, 500, 'R = \\mat{\\cos 30\\deg&−\\sin 30\\deg\\\\\\sin 30\\deg&\\cos 30\\deg} ⇒ 和 = 2\\cos 30\\deg = \\sqrt3', { s: 11.5 });
  MK(pg, 284, 530, true);
  T(pg, 306, 532, '(0, −4) 轉 30\\deg ⇒ D(2, −2\\sqrt3)，m = \\frac{−2\\sqrt3}{2 + 4} = −\\frac{\\sqrt3}{3}', { s: 11.5 });
  MK(pg, 211, 566, false);
  T(pg, 233, 568, 'C 反轉 30\\deg ⇒ A(−2\\sqrt3, 2)，a_1a_2 = −4\\sqrt3', { s: 11.5 });
  MK(pg, 187, 590, false);
  T(pg, 209, 586, 'm_L = \\frac{2 + 4}{−2\\sqrt3} = −\\sqrt3 ⇒ \\theta = −60\\deg', { s: 11.5 });
  MK(pg, 712, 622, true);
  T(pg, 104, 664, [
    '(5) L\' 斜角 \\phi = −60\\deg，鏡射矩陣 \\mat{\\cos 2\\phi&\\sin 2\\phi\\\\\\sin 2\\phi&−\\cos 2\\phi}：q = \\sin(−120\\deg) = −\\frac{\\sqrt3}{2}，s = −\\cos(−120\\deg) = \\frac{1}{2}',
    '⇒ q + s = \\frac{1 − \\sqrt3}{2}',
  ], { s: 11.5, lh: 1.4 });

  // Q12
  MANS(pg, 30, 738, [1, 4, 5]);
  MK(pg, 202, 856, true);
  T(pg, 224, 852, '\\orange{O 是正\\tri ABC 中心}：\\frac{2r}{\\sqrt3} = 1 + r ⇒ r = \\frac{\\sqrt3}{2 − \\sqrt3} = 3 + 2\\sqrt3', { s: 11.5 });
  MK(pg, 298, 896, false);
  T(pg, 320, 893, '= \\frac{1}{3}\\tri ABC = \\frac{\\sqrt3}{3}r^2 = 12 + 7\\sqrt3', { s: 11.5 });
  MK(pg, 431, 936, false);
  T(pg, 453, 933, '最大 \\frac{1}{2} \\cdot \\ov{OA} \\cdot 1 = \\frac{4 + 2\\sqrt3}{2} = 2 + \\sqrt3', { s: 11.5 });
  MK(pg, 579, 976, true);
  T(pg, 601, 974, 'B、C 方向之間 \\frac{1}{3} 圓', { s: 11.5 });
  MK(pg, 597, 1015, true);
  T(pg, 104, 1046, [
    '(5) ℓ^2 = \\ov{AP}^2 − r^2 = (1 + r)^2 + 1 − 2(1 + r)\\cos\\theta − r^2 = 2(1 + r)(1 − \\cos\\theta) = 4(1 + r)\\sin^2\\frac{\\theta}{2}',
    '1 + r = 4 + 2\\sqrt3 = (1 + \\sqrt3)^2 ⇒ ℓ = 2(1 + \\sqrt3)\\sin\\frac{\\theta}{2} = (2 + 2\\sqrt3)\\sin\\frac{\\theta}{2}',
  ], { s: 11.5, lh: 1.45 });
  {
    const B = [614.1, 779.5], O = [624.8, 826.5], A = [670.8, 840.5], C = [590, 859.2];
    sk.poly([A, B, C], { closed: true, c: 'green', w: 1.1 });
    sk.line(O[0], O[1], A[0], A[1], { c: 'orange', w: 1.1, dash: '3 3' });
  }
});

/* ---------------- 第 5 頁 : Q13 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 16, 186, '2.04', { s: 18 });
  T(pg, 252, 236, [
    '綜合除法在 x = 2 展開 (t = x − 2)：f = −4t^3 + 2t^2 − t + 2',
    'g = −t + 2 ⇒ f − g = −4t^3 + 2t^2，t = −0.01 ⇒ \\red{2.04} \\times 10^{−4}',
  ], { s: 11.5, lh: 1.45 });

  // Q14
  ANS(pg, 26, 286, '30', { s: 19 });
  T(pg, 450, 481, '三角 15 層：\\Sig C\\stk{k+1}{2} = C\\stk{17}{3} = 680', { s: 11.5 });
  T(pg, 552, 580, [
    '方 12 層：\\Sig k^2 = 650',
    '剩 680 − 650 = \\red{\\box{30}}',
  ], { s: 11.5, lh: 1.4 });

  // Q15
  ANS(pg, 14, 629, '0.95', { s: 18 });
  T(pg, 476, 652, '陽性比例：帶原者 a、非帶原者 b', { s: 11.5 });
  T(pg, 545, 727, [
    '5a \\ge 0.9(5a + 95b) ⇒ a \\ge 171b',
    'x = 0.05a + 0.95(1 − b) \\ge 0.95 + 7.6b \\ge \\red{0.95}',
  ], { s: 11.5, lh: 1.4 });

  // Q16
  ANS(pg, 16, 784, '−\\frac{9}{13}', { s: 16 });
  T(pg, 340, 842, [
    '\\orange{L 過圓心和 P ⇒ L_1、L_2 對稱於 L}',
    '(1, 3) 對 (3, 1) 鏡射：\\frac{2 \\cdot 6}{10}(3, 1) − (1, 3) = (\\frac{13}{5}, −\\frac{9}{5}) ⇒ m_2 = \\red{\\box{−\\frac{9}{13}}}',
  ], { s: 11.5, lh: 1.45 });

  // Q17
  ANS(pg, 14, 922, '\\frac{8\\sqrt3}{49}', { s: 15 });
  T(pg, 562, 978, [
    'O 到 L 的垂足 H：',
    'H = (5 + 3t, 5 + 2t, 4 − 2t)',
    '\\vec{OH} \\cdot (3, 2, −2) = 17t + 17 = 0',
    '⇒ H(2, 3, 6)，\\ov{OH} = 7',
  ], { s: 11.5, lh: 1.35 });
  T(pg, 90, 1056, [
    '\\orange{E_1、E_2 都含過 O 且平行 L 的直線 L\'，\\ov{OH} \\perp L\'} ⇒ \\ov{OH} 與平面夾 \\alpha：\\sin\\alpha = \\frac{4\\sqrt3}{7}，\\cos\\alpha = \\frac{1}{7}',
    '\\ov{OH} 夾在 E_1、E_2 之間，各夾 \\alpha ⇒ 兩面夾角 2\\alpha (或補角)：\\sin\\theta = 2 \\cdot \\frac{4\\sqrt3}{7} \\cdot \\frac{1}{7} = \\red{\\box{\\frac{8\\sqrt3}{49}}}',
  ], { s: 11.5, lh: 1.4 });
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q18
  ANS(pg, 30, 548, '(4)');
  T(pg, 380, 618, [
    '\\frac{B}{A} = \\frac{1 − 0.9^{11}}{0.1} \\div \\frac{1 − 0.95^{11}}{0.05} = \\frac{1}{2} \\cdot \\frac{1 − 0.314}{1 − 0.569} ≈ \\red{0.796}',
  ], { s: 12.5 });

  // Q19
  ANS(pg, 14, 680, '50%', { s: 17 });
  // Q20
  ANS(pg, 4, 748, ['\\small{中心 y}', '\\frac{20}{27}', '不變'], { s: 13, lh: 1.25 });

  T(pg, 90, 900, [
    '19.  \\frac{P[1 − (1 − r)^3]}{r} = \\frac{7}{4}P ⇒ 4(3r − 3r^2 + r^3) = 7r ⇒ 4r^2 − 12r + 5 = 0',
    '⇒ (2r − 1)(2r − 5) = 0 ⇒ r = \\frac{1}{2} \\gray{\\small{(r = \\frac{5}{2} > 100\\% 不合)}} ⇒ 準備率 \\red{\\box{50\\%}}',
  ], { s: 13.5, lh: 1.55 });
  T(pg, 90, 982, [
    '20.  \\frac{N}{M} = \\frac{1}{x} \\cdot \\frac{1 − (1 − rx)^4}{1 − (1 − r)^4}，1 − (1 − u)^4 = 4u − 6u^2 + 4u^3 − u^4 \\gray{\\small{(u = rx)}}',
    '⇒ \\frac{N}{M} = \\frac{r}{1 − (1 − r)^4}(4 − 6rx + 4r^2x^2 − r^3x^3) ⇒ \\red{\\box{f(x) = −r^3x^3 + 4r^2x^2 − 6rx + 4}}',
    '\\orange{f(x) = h(rx)，h(u) = −u^3 + 4u^2 − 6u + 4：只是水平伸縮，y 值不變}',
    '中心 x = −\\frac{4r^2}{3(−r^3)} = \\frac{4}{3r}，y = h(\\frac{4}{3}) = −\\frac{64}{27} + \\frac{64}{9} − 8 + 4 = \\frac{20}{27} ⇒ \\red{不隨 r 改變}',
  ], { s: 13, lh: 1.55 });
});
