/* 翰林 110 學年度學測全國第四次模擬考 (110-E4) 數學A — handwritten solutions
 * Based on the separate 詳解 booklet (scan, 5 pages: 詳解 p.14–18), trimmed; Q2 shows the 雙重根號 step,
 * Q4 uses CD = 1, Q19 uses P(max = k) = (2k − 1)/36.
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet).
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈70, options at x≈94.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 18, 222, '(3)');
  T(pg, 420, 336, [
    '10^{2.602} = 10^2 \\times 10^{0.602}',
    '\\log 4 = 2\\log 2 ≈ 0.602 ⇒ 10^{0.602} ≈ 4',
    '⇒ 高度 ≈ 100 \\times 4 = 400 公尺',
    '最接近 395 公尺 ⇒ \\red{\\box{(3)}}',
  ], { s: 14, lh: 1.55, gap: 2 });

  // Q2
  ANS(pg, 18, 520, '(2)');
  T(pg, 170, 632, [
    '\\frac{1}{2}r^2 \\cdot \\frac{\\pi}{2} = (102 − 20\\sqrt2)\\pi ⇒ r^2 = 408 − 80\\sqrt2',
    '= 408 − 2\\sqrt{3200} = (\\sqrt{400} − \\sqrt8)^2  \\small{\\gray{(400 + 8 = 408，400 \\times 8 = 3200)}}',
    '⇒ r = 20 − 2\\sqrt2 ≈ 20 − 2.83 = 17.17 ⇒ 最接近 \\red{\\box{17}}',
  ], { s: 14, lh: 1.5, gap: 4 });

  // Q3
  ANS(pg, 18, 790, '(5)');
  T(pg, 180, 894, [
    '設通過 n 關：(1.2)^n > 4 ⇒ n\\log 1.2 > \\log 4',
    '\\log 1.2 = \\log\\frac{12}{10} = 2\\log 2 + \\log 3 − 1 ≈ 0.0791',
    '⇒ n > \\frac{0.6020}{0.0791} ≈ 7.6 ⇒ 至少 \\red{\\box{8}} 關',
    '\\gray{驗算：1.2^7 ≈ 3.58 < 4，1.2^8 ≈ 4.30 > 4}',
  ], { s: 14, lh: 1.55, gap: 2 });
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 18, 98, '(1)');
  T(pg, 200, 152, [
    '設 \\ov{CD} = 1：\\ov{AD} = \\frac{1}{\\tan 30\\deg} = \\sqrt3，\\ov{AC} = 2',
    '\\ov{AB} = 4\\sqrt3 ⇒ \\ov{BD} = 3\\sqrt3 ⇒ \\ov{BC} = \\sqrt{27 + 1} = 2\\sqrt7',
    '餘弦定理：\\cos C = \\frac{2^2 + (2\\sqrt7)^2 − (4\\sqrt3)^2}{2 \\cdot 2 \\cdot 2\\sqrt7} = \\frac{−16}{8\\sqrt7} = \\red{\\box{\\frac{−2\\sqrt7}{7}}}',
    '\\gray{\\small{(C 是鈍角，cos 為負)}}',
  ], { s: 14, lh: 1.55, gap: 3 });
  {   // B ---- D -- A with C above D (CD = 1, AD = √3, BD = 3√3)
    const u = 38, A = [690, 440], D = [A[0] - Math.sqrt(3) * u, 440], B = [A[0] - 4 * Math.sqrt(3) * u, 440], C = [D[0], 440 - u];
    sk.poly([A, B, C], { closed: true, c: 'blue', w: 1.3 });
    sk.line(C[0], C[1], D[0], D[1], { c: 'green', w: 1.1, dash: '3 3' });
    sk.rightAngle(D[0], D[1], 1, 0, 0, -1, 6, { c: 'green', w: 0.9 });
    sk.arc(A[0], A[1], 20, 150, 180, { c: 'orange', w: 1 });
    sk.label(A[0] - 44, A[1] - 17, '\\orange{\\small{30\\deg}}', { s: 9 });
    sk.label(A[0] + 4, A[1] - 6, 'A', { s: 11 }); sk.label(B[0] - 13, B[1] - 6, 'B', { s: 11 });
    sk.label(C[0] - 4, C[1] - 18, 'C', { s: 11 }); sk.label(D[0] - 4, D[1] + 2, 'D', { s: 11 });
    sk.label(D[0] + 4, D[1] - 28, '\\green{1}', { s: 10 });
    sk.label((B[0] + D[0]) / 2 - 12, D[1] + 2, '\\green{3\\sqrt3}', { s: 10 });
    sk.label((A[0] + D[0]) / 2 - 6, D[1] + 2, '\\green{\\sqrt3}', { s: 10 });
    sk.label((A[0] + C[0]) / 2 + 4, (A[1] + C[1]) / 2 - 18, '\\green{2}', { s: 10 });
    sk.label((B[0] + C[0]) / 2 - 10, (B[1] + C[1]) / 2 - 22, '\\green{2\\sqrt7}', { s: 10 });
  }

  // Q5
  ANS(pg, 18, 492, '(4)');
  T(pg, 175, 552, [
    'L_1：點 (1, −a, 0)，方向 (1, −2, −1)',
    'L_2：點 (b, 13, 3)，方向 (−1, 6, 2)',
    '法向量 \\vec{n} = (1, −2, −1) \\times (−1, 6, 2) = (2, −1, 4)',
    'E 過 P(0, −3, 0)：2x − (y + 3) + 4z = 0 ⇒ 2x − y + 4z = 3',
    '(1, −a, 0) 在 E 上：2 + a = 3 ⇒ a = 1',
    '(b, 13, 3) 在 E 上：2b − 13 + 12 = 3 ⇒ b = 2 ⇒ a + b = \\red{\\box{3}}',
  ], { s: 14, lh: 1.5, gap: 2 });

  // Q6
  ANS(pg, 18, 790, '(5)');
  T(pg, 100, 980, '\\orange{圖形一路遞減 ⇒ a < 0；對稱中心 A(h, k) 在第一象限 ⇒ h > 0，k > 0}', { s: 13 });
  MK(pg, 286, 843, false); MK(pg, 251, 868, false); MK(pg, 236, 893, false); MK(pg, 271, 919, false); MK(pg, 286, 944, true);
  T(pg, 306, 842, 'x^3 係數 1 > 0', { s: 12 });
  T(pg, 271, 867, 'x^3 係數 1 > 0', { s: 12 });
  T(pg, 256, 892, '中心 (0, 5) 在 y 軸上，h = 0', { s: 12 });
  T(pg, 291, 917, '= −(x − 2)^3 + 3(x − 2) + 5，在 A 附近遞增', { s: 12 });
  T(pg, 306, 942, '= −(x − 2)^3 − 3(x − 2) + 5，中心 (2, 5)，恆遞減', { s: 12 });
  T(pg, 100, 1008, '\\gray{\\small{(中心 h = −\\frac{b}{3a}；寫成 a(x − h)^3 + p(x − h) + k 後，a < 0 且 p < 0 才會像圖中一路往下)}}', { s: 12 });
});

/* ---------------- 第 3 頁 : Q7 – Q8 ---------------- */
page(4, (pg, sk) => {
  // Q7
  ANS(pg, 18, 95, '(2)');
  T(pg, 210, 304, [
    '\\orange{五顆全部取完，第 5 次 (萬位) 是袋中任一顆的機率都是 \\frac{1}{5}}',
    '獎金 > 5 萬 ⇔ 萬位 \\ge 5',
    '甲袋 (擲 1、2 點，\\frac{2}{6})：6、7、8、9 ⇒ \\frac{4}{5}',
    '乙袋 (擲 3 \\sim 6 點，\\frac{4}{6})：5、6、8 ⇒ \\frac{3}{5}',
    'P(6 點且 > 5 萬) = \\frac{1}{6} \\cdot \\frac{3}{5} = \\frac{3}{30}',
    'P(> 5 萬) = \\frac{2}{6} \\cdot \\frac{4}{5} + \\frac{4}{6} \\cdot \\frac{3}{5} = \\frac{8 + 12}{30} = \\frac{20}{30}',
    '⇒ P(6 點 | > 5 萬) = \\frac{3}{30} ÷ \\frac{20}{30} = \\red{\\box{\\frac{3}{20}}}',
  ], { s: 14, lh: 1.5, gap: 4 });

  // Q8
  MANS(pg, 16, 625, [1, 3, 4, 5]);
  sk.label(614, 832, '\\red{\\small{變少}}', { s: 12 });
  MK(pg, 394, 934, true); MK(pg, 473, 959, false); MK(pg, 522, 985, true); MK(pg, 596, 1010, true); MK(pg, 568, 1036, true);
  T(pg, 414, 933, '21,290,279 → … → 22,297,000 每年都增加', { s: 12 });
  T(pg, 493, 958, '106 年 296,826 < 105 年 305,556', { s: 12 });
  T(pg, 542, 984, '362,393 − 278,388 = 84,005', { s: 12 });
  T(pg, 616, 1009, '\\frac{362393}{2229.7} ≈ 162.5', { s: 12 });
  T(pg, 588, 1035, '車多事故也多 (r ≈ 0.81)', { s: 12 });
});

/* ---------------- 第 4 頁 : Q9 – Q11 ---------------- */
page(5, (pg, sk) => {
  // Q9
  MANS(pg, 16, 108, [1, 2, 5]);
  MK(pg, 200, 214, true); MK(pg, 254, 245, true); MK(pg, 183, 276, false); MK(pg, 193, 307, false); MK(pg, 279, 338, true);
  T(pg, 220, 210, 'AB 第 1 列 = x_1x_3 + y_1y_3 + z_1z_3 = \\vec{a} \\cdot \\vec{c} = 2，第 2 列 \\vec{b} \\cdot \\vec{c} = −2', { s: 12 });
  T(pg, 274, 242, '= \\vec{a} \\cdot \\vec{c} + \\vec{b} \\cdot \\vec{c} = 2 + (−2) = 0', { s: 12 });
  T(pg, 203, 273, '反例：\\vec{a} = (0, 1, 0)、\\vec{b} = (−2, 1, −2)、\\vec{c} = (1, 2, 1)', { s: 12 });
  T(pg, 213, 304, '同上反例 |\\vec{a}| = 1，|\\vec{b}| = 3', { s: 12 });
  T(pg, 299, 335, [
    '若 \\vec{a}、\\vec{b} 同向：\\vec{a} = t\\vec{b} (t > 0)',
    '⇒ 2 = \\vec{a} \\cdot \\vec{c} = t(\\vec{b} \\cdot \\vec{c}) = −2t，矛盾',
    '⇒ 不同向 ⇒ 三角不等式取 >',
  ], { s: 12, lh: 1.5 });

  // Q10
  MANS(pg, 16, 437, [1, 4]);
  {   // coordinates on the printed grid (unit = 18.35 px, A at (639, 520)); k = 2
    sk.label(676, 431, '\\green{\\small{(2, 8)}}', { s: 10 });
    sk.label(692, 451, '\\green{\\small{(4, 6)}}', { s: 10 });
    sk.label(728, 489, '\\green{\\small{(8, 2)}}', { s: 10 });
  }
  T(pg, 100, 672, [
    '\\orange{設邊長 k：\\vec{AB} = (k, 4k)，\\vec{AD} = (4k, k) ⇒ \\vec{AB} \\cdot \\vec{AD} = 8k^2 = 32 ⇒ k = 2}',
    '\\orange{⇒ B(2, 8)、C(4, 6)、D(8, 2)}',
  ], { s: 12.5, lh: 1.5 });
  MK(pg, 206, 504, true); MK(pg, 250, 537, false); MK(pg, 270, 578, false); MK(pg, 224, 612, true); MK(pg, 250, 645, false);
  T(pg, 226, 502, '|(2, 8)| = \\sqrt{68} = 2\\sqrt{17}', { s: 12 });
  T(pg, 270, 534, '= \\frac{1}{3}(4 + 8, 16 + 2) = (4, 6)，長度 = 2\\sqrt{13}', { s: 12 });
  T(pg, 290, 576, '\\vec{AC} = (4, 6)：\\vec{AC} \\cdot \\vec{AB} = 8 + 48 = 56 > \\vec{AC} \\cdot \\vec{AD} = 32 + 12 = 44', { s: 12 });
  T(pg, 244, 609, '\\frac{32}{2\\sqrt{17} \\cdot 2\\sqrt{17}} = \\frac{32}{68} = \\frac{8}{17}', { s: 12 });
  T(pg, 270, 643, '\\frac{1}{2}|2 \\cdot 2 − 8 \\cdot 8| = \\frac{60}{2} = 30', { s: 12 });

  // Q11
  MANS(pg, 16, 765, [1, 2, 4]);
  T(pg, 470, 856, '\\orange{A：轉 \\frac{\\pi}{3}；B：轉 −\\frac{\\pi}{3}}', { s: 12.5 });
  MK(pg, 372, 826, true); MK(pg, 218, 862, true); MK(pg, 198, 910, false); MK(pg, 174, 948, true); MK(pg, 174, 971, false);
  T(pg, 392, 822, 'B 的 \\theta = −\\frac{\\pi}{3}：\\cos(−\\frac{\\pi}{3}) = \\frac{1}{2}，\\sin(−\\frac{\\pi}{3}) = −\\frac{\\sqrt3}{2}', { s: 12 });
  T(pg, 238, 858, '對角 \\frac{1}{2} + \\frac{1}{2} = 1，其餘 −\\frac{\\sqrt3}{2} + \\frac{\\sqrt3}{2} = 0', { s: 12 });
  T(pg, 218, 906, 'A^3 = 旋轉 \\pi = \\mat{−1&0\\\\0&−1} ≠ I', { s: 12 });
  T(pg, 194, 945, '先轉 \\frac{\\pi}{3} 再轉 −\\frac{\\pi}{3}，順序無關，都 = I', { s: 12 });
  T(pg, 194, 970, [
    'B^{−1} = A (轉 \\frac{\\pi}{3})，B^2 = 轉 −\\frac{2\\pi}{3} ≠ A',
  ], { s: 12 });
});

/* ---------------- 第 5 頁 : Q12 – Q15 ---------------- */
page(6, (pg, sk) => {
  // Q12
  MANS(pg, 16, 104, [2, 3, 5]);
  T(pg, 220, 200, '\\orange{座號 n 報出 a_n = 1 + 4(n − 1) = 4n − 3}', { s: 12.5 });
  MK(pg, 260, 228, false); MK(pg, 392, 254, true); MK(pg, 376, 279, true); MK(pg, 494, 305, false); MK(pg, 494, 330, true);
  T(pg, 280, 226, '4n − 3 = 67 ⇒ n = 17.5 不是整數', { s: 12 });
  T(pg, 412, 252, 'a_{24} = 93 = 3 \\times 31', { s: 12 });
  T(pg, 396, 277, '4n − 3 = 3(n − 1) + n ⇒ 3 | a_n ⇔ 3 | n ⇒ n = 3, 6, …, 39 共 13 人', { s: 12 });
  T(pg, 514, 302, '座號 3, 6, 9, …, 39：\\frac{6}{3} ≠ \\frac{9}{6}', { s: 12 });
  T(pg, 514, 328, '公差 3 的等差數列', { s: 12 });

  // Q13
  MANS(pg, 16, 406, [1, 3, 5]);
  T(pg, 316, 458, '\\orange{\\vec{GE} = \\frac{1}{2}\\vec{DA}、\\vec{GF} = \\frac{1}{2}\\vec{CB} ⇒ ∠EGF = \\theta}', { s: 12 });
  MK(pg, 282, 486, true); MK(pg, 213, 518, false); MK(pg, 216, 549, true); MK(pg, 156, 580, false); MK(pg, 234, 618, true);
  T(pg, 302, 484, 'AD、BC 不共平面且不相交', { s: 12 });
  T(pg, 233, 515, '\\vec{EF} = \\frac{1}{2}(\\vec{AB} + \\vec{CD})，和 \\vec{AB} 不平行', { s: 12 });
  T(pg, 236, 546, '\\vec{EG} = \\vec{CG} − \\vec{CE} = \\frac{1}{2}(\\vec{CD} − \\vec{CA}) = \\frac{1}{2}\\vec{AD}', { s: 12 });
  T(pg, 176, 578, '\\tri EGF：\\cos\\theta = \\frac{1.5^2 + 2.5^2 − (\\sqrt6)^2}{2 \\cdot 1.5 \\cdot 2.5} = \\frac{2.5}{7.5} = \\frac{1}{3} < \\frac{1}{2} ⇒ \\theta > \\frac{\\pi}{3}', { s: 12 });
  T(pg, 254, 616, '\\sin\\theta = \\frac{2\\sqrt2}{3} ⇒ 3 \\cdot 5 \\cdot \\frac{2\\sqrt2}{3} = 10\\sqrt2', { s: 12 });
  {   // triangle EGF : GE = 3/2, GF = 5/2, EF = √6, angle G = θ (cos θ = 1/3)
    const u = 34, G = [628, 640], th = Math.acos(1 / 3);
    const F = [G[0] + 2.5 * u, G[1]], E = [G[0] + 1.5 * u * Math.cos(th), G[1] - 1.5 * u * Math.sin(th)];
    sk.poly([G, F, E], { closed: true, c: 'green', w: 1.2 });
    sk.arc(G[0], G[1], 11, 0, th * 180 / Math.PI, { c: 'orange', w: 1 });
    sk.label(G[0] + 12, G[1] - 17, '\\orange{\\small{\\theta}}', { s: 9 });
    sk.label(G[0] - 12, G[1] - 6, 'G', { s: 10 }); sk.label(F[0] + 3, F[1] - 6, 'F', { s: 10 }); sk.label(E[0] - 3, E[1] - 16, 'E', { s: 10 });
    sk.label(G[0] - 7, (G[1] + E[1]) / 2 - 12, '\\green{\\small{\\frac{3}{2}}}', { s: 9 });
    sk.label((G[0] + F[0]) / 2 - 6, G[1] + 1, '\\green{\\small{\\frac{5}{2}}}', { s: 9 });
    sk.label((E[0] + F[0]) / 2 + 6, (E[1] + F[1]) / 2 - 12, '\\green{\\small{\\sqrt6}}', { s: 9 });
  }

  // Q14
  ANS(pg, 14, 772, '99', { s: 18 });
  T(pg, 440, 806, 'x = 4 是 x^2 − 5x + 4 的根 ⇒ q(4) = 3 \\cdot 4 + 2 = 14', { s: 12 });
  T(pg, 110, 852, 'f(x) = (x + 3)q(x) + 1 ⇒ f(4) = 7 \\cdot 14 + 1 = \\red{\\box{99}}', { s: 13.5 });

  // Q15
  ANS(pg, 10, 902, '500', { s: 18 });
  T(pg, 470, 1044, '\\gray{A 東石、B 泰煥、C 日錫、D 元泰}', { s: 12 });
  T(pg, 100, 1070, [
    '\\orange{M 在 \\ov{AB} 的中垂線 CD 上}：\\ov{MB} = r，\\ov{DB} = 300，\\ov{MD} = 900 − r',
    '⇒ r^2 = (900 − r)^2 + 300^2 ⇒ 1800r = 810000 + 90000 ⇒ r = \\red{\\box{500}}',
  ], { s: 12.5, lh: 1.45 });
  {   // A 東石, B 泰煥, D 元泰 (midpoint), C 日錫 ; scale 500 m = 26 px
    const s = 26 / 500, M = [728, 1072], r = 500 * s;
    const D = [M[0], M[1] + 400 * s], A = [M[0] - 300 * s, D[1]], B = [M[0] + 300 * s, D[1]], C = [M[0], D[1] - 900 * s];
    sk.circle(M[0], M[1], r, { c: 'gray', w: 0.9 });
    sk.line(A[0], A[1], B[0], B[1], { c: 'blue', w: 1.1 });
    sk.line(C[0], C[1], D[0], D[1], { c: 'blue', w: 1.1 });
    sk.line(M[0], M[1], B[0], B[1], { c: 'green', w: 1.1 });
    sk.dot(M[0], M[1], { r: 1.5, c: 'red' });
    sk.label(M[0] - 13, M[1] - 9, '\\small{M}', { s: 9 }); sk.label(C[0] - 3, C[1] - 13, '\\small{C}', { s: 9 });
    sk.label(A[0] - 10, A[1] - 3, '\\small{A}', { s: 9 }); sk.label(B[0] + 2, B[1] - 3, '\\small{B}', { s: 9 });
    sk.label(D[0] - 3, D[1] + 1, '\\small{D}', { s: 9 }); sk.label(M[0] + 9, M[1] - 3, '\\green{\\small{r}}', { s: 9 });
  }
});

/* ---------------- 第 6 頁 : Q16 – Q19 ---------------- */
page(7, (pg, sk) => {
  // Q16
  ANS(pg, 2, 92, '(\\frac{1}{3}, −\\frac{2}{3})', { s: 10.5 });
  T(pg, 398, 198, 'A(\\log_3 2, 2)、B(\\log_3 8, 8)', { s: 11 });
  T(pg, 76, 228, 'x：\\log_3 2 = m \\cdot 3\\log_3 2 ⇒ m = \\frac{1}{3}；y：2 = 8m + n \\small{\\gray{(C(0, 1))}} ⇒ n = −\\frac{2}{3}', { s: 11.5 });

  // Q17
  ANS(pg, 14, 276, '\\frac{5}{6}', { s: 16 });
  T(pg, 212, 369, [
    '\\ov{AB} = |\\sin k − \\sqrt3\\cos k| = |2\\sin(k − \\frac{\\pi}{3})|，k − \\frac{\\pi}{3} \\in [−\\frac{\\pi}{3}, \\frac{7\\pi}{6})',
    '\\sin(k − \\frac{\\pi}{3}) = 1 時最大 ⇒ k − \\frac{\\pi}{3} = \\frac{\\pi}{2} ⇒ k = \\red{\\box{\\frac{5}{6}}}\\pi',
  ], { s: 12, lh: 1.45 });

  // Q18
  ANS(pg, 18, 772, '(4)');
  T(pg, 180, 822, [
    '4 人、4 空位，人不相鄰：',
    '先排 4 個空位，5 個空隙選 4 個放人 C\\stk{5}{4} = 5',
    '兩端是史、瓊 (2!)，中間是傑、大 (2!)',
    '⇒ 5 \\times 2 \\times 2 = \\red{\\box{20}}',
  ], { s: 12.5, lh: 1.55 });

  // Q19
  ANS(pg, 2, 942, '\\frac{805}{3}', { s: 15 });
  T(pg, 478, 820, [
    '\\orange{19.} P(較大 = k) = \\frac{k^2 − (k − 1)^2}{36} = \\frac{2k − 1}{36}',
    '\\gray{\\small{(兩顆都 \\le k，扣掉兩顆都 \\le k − 1)}}',
    'E = \\sum{k=1}{6} 60k \\cdot \\frac{2k − 1}{36}',
    '= \\frac{60}{36}(1 + 6 + 15 + 28 + 45 + 66) = \\frac{5}{3} \\times 161 = \\red{\\box{\\frac{805}{3}}} 元',
  ], { s: 12, lh: 1.45, gap: 1 });
});
