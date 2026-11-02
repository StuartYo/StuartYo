/* 南一 111 學年度學測第四次聯合模擬考 數學A — handwritten solutions
 * Based on the booklet's own 解析 (PDF p.9–12), trimmed; Q1 uses a number-line argument, Q7(3) uses det,
 * Q15 uses the 解析's cos(90°+θ) route, Q20 follows <法一> (L always passes R(1,1,0)).
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet, p.9–12 解析). The scan pages carry /Rotate 270.
 * Coordinates: 96-dpi px on A4 (794 x 1123).
 */

/* ---------------- 第 1 頁 : Q1 – Q4 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 14, 194, '(3)');
  T(pg, 110, 262, [
    '|x| + |x − 5| = x 到 0 與到 5 的距離和',
    '0 \\le x \\le 5 時 = 5 < 8 都可以；在 [0, 5] 外每多走 1，和多 2',
    '⇒ 最多超出 1.5 ⇒ −1.5 < x < 6.5 ⇒ x = −1, 0, 1, …, 6 共 \\red{\\box{8}} 個',
  ], { s: 13.5, lh: 1.5 });

  // Q2
  ANS(pg, 14, 356, '(2)');
  T(pg, 110, 462, [
    '令 k = \\log_3 2：\\frac{\\log 8}{\\log 9} = \\frac{3\\log 2}{2\\log 3} = \\frac{3}{2}k，\\frac{\\log 4}{\\log 3} = 2k',
    '兩股比 \\frac{3}{2} : 2 = 3 : 4 ⇒ 斜邊 = \\frac{5}{2}k',
    '周長 = (\\frac{3}{2} + 2 + \\frac{5}{2})k = 6\\log_3 2 = \\log_3 64 ⇒ x = \\red{\\box{64}}',
  ], { s: 13.5, lh: 1.5, gap: 2 });

  // Q3
  ANS(pg, 14, 566, '(4)');
  T(pg, 285, 664, '設 \\ang BAD = \\ang DAC = \\theta，\\tri ABC = \\tri ABD + \\tri ADC', { s: 13 });
  T(pg, 110, 700, [
    '\\frac{1}{2} \\cdot 3 \\cdot 6\\sin 2\\theta = \\frac{1}{2} \\cdot 3 \\cdot 3\\sin\\theta + \\frac{1}{2} \\cdot 3 \\cdot 6\\sin\\theta',
    '⇒ 18\\sin\\theta\\cos\\theta = \\frac{27}{2}\\sin\\theta ⇒ \\cos\\theta = \\frac{3}{4}',
    '\\cos\\ang BAC = \\cos 2\\theta = 2 \\cdot \\frac{9}{16} − 1 = \\red{\\box{\\frac{1}{8}}}',
  ], { s: 13, lh: 1.3, gap: 1 });
  {   // marks on the printed figure: A(571,576) B(538,641) D(590.5,641) C(693,641)
    const A = [571, 576];
    sk.arc(A[0], A[1], 15, -117, -74, { c: 'orange', w: 1 });
    sk.arc(A[0], A[1], 19, -72, -29, { c: 'orange', w: 1 });
    sk.label(563, 594, '\\orange{\\theta}', { s: 9 });
    sk.label(586, 592, '\\orange{\\theta}', { s: 9 });
    sk.label(538, 597, '\\green{3}', { s: 10 });
    sk.label(586, 614, '\\green{3}', { s: 10 });
    sk.label(642, 590, '\\green{6}', { s: 10 });
  }

  // Q4
  ANS(pg, 14, 806, '(4)');
  T(pg, 110, 925, [
    'P、Q 在直線 BC 上 ⇒ 係數和 = 1',
    'a + b = 1，2b + (7a − 3b) = 1 ⇒ a = \\frac{1}{4}，b = \\frac{3}{4}',
    '\\vec{AP} = \\frac{1}{4}\\vec{AB} + \\frac{3}{4}\\vec{AC} ⇒ \\ov{BP} : \\ov{PC} = 3 : 1',
    '\\vec{AQ} = \\frac{3}{2}\\vec{AB} − \\frac{1}{2}\\vec{AC} ⇒ Q 在 B 外側，\\ov{QB} = \\frac{1}{2}\\ov{BC}',
    '\\ov{PQ} = (\\frac{1}{2} + \\frac{3}{4})\\ov{BC} = \\frac{5}{4}\\ov{BC}，同高',
    '⇒ \\tri APQ = \\frac{5}{4} \\times 48 = \\red{\\box{60}}',
  ], { s: 13, lh: 1.4, gap: 1 });
  {   // Q --2-- B ----3---- P -1- C on one line, A above
    const y = 1035, u = 30, Q = [570, y], B = [570 + 2 * u, y], P = [570 + 5 * u, y], C = [570 + 6 * u, y], A = [660, 945];
    sk.line(Q[0] - 8, y, C[0] + 8, y, { c: 'gray', w: 0.9 });
    sk.poly([A, Q, P], { fill: 'hl', op: 0.5, c: 'orange', w: 1.2 });
    sk.line(A[0], A[1], B[0], B[1], { c: 'blue', w: 1.2 });
    sk.line(A[0], A[1], C[0], C[1], { c: 'blue', w: 1.2 });
    [Q, B, P, C].forEach(p => sk.dot(p[0], p[1], { r: 1.7 }));
    sk.label(A[0] - 4, A[1] - 17, 'A', { s: 11 });
    sk.label(Q[0] - 4, y + 3, 'Q', { s: 11 }); sk.label(B[0] - 4, y + 3, 'B', { s: 11 });
    sk.label(P[0] - 4, y + 3, 'P', { s: 11 }); sk.label(C[0] - 2, y + 3, 'C', { s: 11 });
    sk.label((Q[0] + B[0]) / 2 - 3, y - 17, '\\green{2}', { s: 10 });
    sk.label((B[0] + P[0]) / 2 + 6, y - 17, '\\green{3}', { s: 10 });
    sk.label((P[0] + C[0]) / 2 - 3, y - 17, '\\green{1}', { s: 10 });
  }
});

/* ---------------- 第 2 頁 : Q5 – Q7 ---------------- */
page(3, (pg, sk) => {
  // Q5
  ANS(pg, 22, 104, '(5)');
  T(pg, 200, 166, [
    '先選連排的人（3 種），設為大華；中明、小強各 2 天且都不能相鄰',
    '大華排 一二：三四五六 只能交錯 ⇒ 2 種',
    '大華排 二三：四五六 交錯（中小中 或 小中小），一 自動決定 ⇒ 2 種',
    '大華排 三四：一二、五六 各自兩人不同 ⇒ 2 \\times 2 = 4 種',
    '大華排 四五、五六：和 二三、一二 對稱 ⇒ 2 + 2 種',
    '共 2 + 2 + 4 + 2 + 2 = 12 ⇒ 3 \\times 12 = \\red{\\box{36}}',
  ], { s: 13, lh: 1.45 });

  // Q6
  MANS(pg, 22, 440, [1, 3, 4, 5]);
  MK(pg, 432, 465, true); MK(pg, 442, 492, false); MK(pg, 477, 523, true); MK(pg, 406, 561, true); MK(pg, 442, 588, true);
  T(pg, 452, 465, '= 2(x + \\frac{3}{4})^2 − \\frac{17}{8}，都是 2x^2 平移', { s: 11.5 });
  T(pg, 462, 492, '= 2(x − 2)^3 − 24(x − 2) − 31', { s: 11.5 });
  T(pg, 497, 518, '= \\cos(2x − \\frac{\\pi}{3}) = \\cos 2(x − \\frac{\\pi}{6})', { s: 11.5 });
  T(pg, 426, 561, '= 10^{x + \\log 3} − 6：左移 \\log 3、下移 6', { s: 11.5 });
  T(pg, 462, 588, '= \\log_2(x − 4) + \\log_2 3：右移 4、上移', { s: 11.5 });
  T(pg, 110, 618, '(2) 2x^3 + 1 沒有一次項，但右邊以 x = 2 為中心展開多了 −24(x − 2)，形狀不同', { s: 12 });

  // Q7
  MANS(pg, 22, 722, [1, 2, 4, 5]);
  MK(pg, 190, 771, true); MK(pg, 190, 798, true); MK(pg, 305, 828, false); MK(pg, 245, 874, true); MK(pg, 292, 920, true);
  T(pg, 210, 770, 'A = 旋轉 −40\\deg ⇒ A^9 = 旋轉 −360\\deg = I ⇒ A^{11} = A^2', { s: 12 });
  T(pg, 210, 797, 'B = 鏡射（軸的斜角 40\\deg）⇒ B^2 = I ⇒ B^{13} = B = B^5', { s: 12 });
  T(pg, 325, 827, '旋轉 \\cdot 鏡射 = 鏡射，det(AB) = 1 \\cdot (−1) = −1；選項的 det = 1', { s: 12 });
  T(pg, 265, 873, 'AB 是鏡射 ⇒ (AB)^2 = I', { s: 12 });
  T(pg, 312, 919, '(1, \\tan 40\\deg) 在 B 的鏡射軸 y = (\\tan 40\\deg)x 上，不動', { s: 12 });
  T(pg, 110, 975, [
    '\\gray{旋轉 \\theta：\\mat{\\cos\\theta & −\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta}　　鏡射（軸斜角 \\frac{\\theta}{2}）：\\mat{\\cos\\theta & \\sin\\theta\\\\ \\sin\\theta & −\\cos\\theta}}',
    '\\gray{\\small{A：\\sin 50\\deg = \\cos(−40\\deg)、\\cos 50\\deg = −\\sin(−40\\deg)；B：\\theta = 80\\deg ⇒ 軸斜角 40\\deg}}',
    '\\gray{\\small{(3) 實際 AB = \\mat{\\cos 40\\deg & \\sin 40\\deg\\\\ \\sin 40\\deg & −\\cos 40\\deg}}}',
  ], { s: 12, lh: 1.5, gap: 3 });
});

/* ---------------- 第 3 頁 : Q8 – Q10 ---------------- */
page(4, (pg, sk) => {
  // Q8
  MANS(pg, 12, 104, [1, 3, 4]);
  MK(pg, 222, 134, true); MK(pg, 226, 161, false); MK(pg, 636, 188, true); MK(pg, 486, 214, true); MK(pg, 451, 241, false);
  T(pg, 242, 132, '中心 x = −\\frac{9}{3a} = −3 ⇒ a = 1；f(−3) = 20 ⇒ b = 10', { s: 11.5 });
  T(pg, 246, 160, 'a > 0：x 很負時 f(x) < 0', { s: 11.5 });
  T(pg, 506, 213, 'f(−1.99) ≈ 4 − 14(0.01) = 3.86', { s: 11.5 });
  T(pg, 471, 240, 'g(x) = (x + 3)^3 − 17(x + 3) 有 3 個根', { s: 11.5 });
  T(pg, 100, 270, [
    '\\orange{(3)(4) 以 x = −2 展開：f(x) = (x + 2)^3 + 3(x + 2)^2 − 14(x + 2) + 4}',
    'x ≈ −2 時取一次部分：y = −14(x + 2) + 4 = −14x − 24；(x + 2)^3、(x + 2)^2 很小',
    '(5) 以 x = −3 展開 f(x) = (x + 3)^3 − 17(x + 3) + 20 ⇒ g = 0 的根：−3、−3 ± \\sqrt{17}',
  ], { s: 12, lh: 1.45 });

  // Q9
  MANS(pg, 12, 348, [1, 2, 4, 5]);
  MK(pg, 722, 434, true); MK(pg, 262, 488, true); MK(pg, 722, 515, false); MK(pg, 418, 572, true); MK(pg, 358, 634, true);
  T(pg, 282, 487, '1 − 0.5 \\times 0.4 \\times 0.3 = 0.94', { s: 12 });
  T(pg, 438, 566, 'A、C 都中 = 0.21 + 0.14，\\frac{0.35}{0.65} = \\frac{7}{13}', { s: 12 });
  T(pg, 378, 628, 'n = 6：\\frac{7}{64} > 0.1；n = 7：\\frac{8}{128} < 0.1', { s: 12 });
  T(pg, 100, 660, [
    '(1) 0.5 \\times 0.6 \\times 0.7 = 0.21　(3) 擊沉 = 三中 + 恰兩中 = 0.21 + (0.09 + 0.14 + 0.21) = 0.65',
    '(5) 至少中 2 發：1 − \\frac{1}{2^n} − \\frac{n}{2^n} > 0.9 ⇔ \\frac{n + 1}{2^n} < 0.1 ⇒ n 最小 = 7',
  ], { s: 12, lh: 1.5, gap: 2 });

  // Q10
  MANS(pg, 6, 742, [2, 3, 4]);
  MK(pg, 236, 778, false); MK(pg, 332, 808, true); MK(pg, 222, 848, true); MK(pg, 400, 886, true); MK(pg, 466, 927, false);
  T(pg, 256, 777, 'f(0) = \\sqrt3 \\ne 0，不是奇函數', { s: 12 });
  T(pg, 352, 806, '2x + \\frac{\\pi}{3} \\in [\\frac{\\pi}{3}, \\frac{4\\pi}{3}] ⇒ \\sin \\in [−\\frac{\\sqrt3}{2}, 1]', { s: 12 });
  T(pg, 242, 846, '2\\sin 100\\deg > 2\\sin 105\\deg \\small{(90\\deg \\sim 180\\deg 遞減)}', { s: 12 });
  T(pg, 420, 884, 'f = 2\\sin(−\\frac{\\pi}{2}) = −2 最小值 ⇒ 對稱軸', { s: 12 });
  T(pg, 486, 925, 'f = 2\\sin 2(x + \\frac{\\pi}{6})：左移 \\frac{\\pi}{6}', { s: 12 });
  T(pg, 100, 965, [
    '\\orange{化簡：f(x) = 2\\sin 2x − 2(\\frac{1}{2}\\sin 2x − \\frac{\\sqrt3}{2}\\cos 2x) = \\sin 2x + \\sqrt3\\cos 2x = 2\\sin(2x + \\frac{\\pi}{3})}',
    '(3) f(\\frac{\\pi}{9}) = 2\\sin\\frac{5\\pi}{9} = 2\\sin 100\\deg，f(\\frac{\\pi}{8}) = 2\\sin\\frac{7\\pi}{12} = 2\\sin 105\\deg',
    '(4) 2x + \\frac{\\pi}{3} = −\\frac{\\pi}{2} ⇒ x = −\\frac{5\\pi}{12}，正弦圖形在最低點處對稱',
  ], { s: 12, lh: 1.5, gap: 2 });
});

/* ---------------- 第 4 頁 : Q11 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q11
  MANS(pg, 16, 106, [1, 2, 3]);
  MK(pg, 195, 519, true); MK(pg, 420, 568, true); MK(pg, 355, 619, true); MK(pg, 370, 670, false); MK(pg, 440, 719, false);
  T(pg, 215, 517, '級距 = \\frac{90}{60} = 1.5，\\frac{68}{1.5} ≈ 45.3 ⇒ 第 46 級', { s: 12 });
  T(pg, 440, 568, '100 分、89 分都 > 59 \\times 1.5 = 88.5 ⇒ 都是 60 級', { s: 11.5 });
  T(pg, 375, 619, '15 級制級距 D = 4d：40 級 ⇔ (39d, 40d]', { s: 11.5 });
  T(pg, 390, 670, '15 級的 k 級 ↔ 60 級的 4k − 3 \\sim 4k，無法確定', { s: 11.5 });
  T(pg, 460, 719, '反例：1、2、3 級 ↔ 4、5、9 級', { s: 11.5 });
  T(pg, 110, 745, [
    '(3) (39d, 40d] = (9.75D, 10D] 落在 15 級制的 10 級；換算不改變大小順序 ⇒ 中位數 10 級',
    '(5) \\gray{S_1^2 = \\frac{2}{3}，S_2^2 = \\frac{4 + 1 + 9}{3} = \\frac{14}{3} < 16S_1^2 = \\frac{32}{3} ⇒ S_2 < 4S_1}',
  ], { s: 12, lh: 1.45, gap: 2 });

  // Q12
  ANS(pg, 18, 882, '37', { s: 18 });
  T(pg, 100, 998, [
    '標準化後的迴歸線斜率 = r ⇒ r = −0.9',
    'y 對 x 斜率 m = r \\cdot \\frac{\\sig_y}{\\sig_x} = −0.9 \\cdot \\frac{10}{18} = −\\frac{1}{2}',
    '迴歸線過 (\\mu_x, \\mu_y) = (51, \\mu_y) 與 (27, 49)：49 − \\mu_y = −\\frac{1}{2}(27 − 51) = 12 ⇒ \\mu_y = \\red{\\box{37}}',
  ], { s: 13, lh: 1.45, gap: 2 });
});

/* ---------------- 第 5 頁 : Q13 – Q16 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 2, 112, '(0, 4)', { s: 11.5 });
  T(pg, 100, 174, [
    '圓心 M 在過 A 且垂直 L 的直線上（斜率 −\\frac{1}{2}）：M = (2 − 2t, 3 + t)',
    '\\ov{MA}^2 = \\ov{MB}^2：5t^2 = (4 − 2t)^2 + (t − 2)^2 = 5t^2 − 20t + 20 ⇒ t = 1 ⇒ M = \\red{\\box{(0, 4)}}',
  ], { s: 13, lh: 1.55, gap: 2 });

  // Q14
  ANS(pg, 4, 258, '240', { s: 14 });
  T(pg, 470, 448, [
    '42 − 12 = 30 = 5 \\times 6，90 − 42 = 48 = 8 \\times 6',
    '每多一圈多 6 \\times (5, 8, 11, 14, …)',
    'a_5 = 6(2 + 5 + 8 + 11 + 14) = 6 \\times 40 = \\red{\\box{240}}',
  ], { s: 12, lh: 1.5 });
  T(pg, 100, 572, '\\gray{驗算：6n^2 個小三角形，每條內邊被算兩次 ⇒ 邊數 = \\frac{3 \\cdot 6n^2 + 6n}{2} = 9n^2 + 3n，n = 5：225 + 15 = 240}', { s: 11.5 });

  // Q15
  ANS(pg, 2, 652, '\\sqrt{442}', { s: 11.5 });
  T(pg, 96, 752, [
    '\\tri BCD：\\ov{BC} = \\sqrt{25^2 − 15^2} = 20，\\sin\\ang BDC = \\frac{20}{25} = \\frac{4}{5}；\\ang ADC = 90\\deg + \\ang BDC ⇒ \\cos\\ang ADC = −\\frac{4}{5}',
    '\\ov{AC}^2 = 7^2 + 15^2 − 2 \\cdot 7 \\cdot 15 \\cdot (−\\frac{4}{5}) = 49 + 225 + 168 = 442 ⇒ \\ov{AC} = \\red{\\box{\\sqrt{442}}}',
  ], { s: 11.5, lh: 1.6, gap: 2 });
  {   // printed figure: B(569,663) A(700,656) D(680,706) C(626,746)
    const B = [569, 663], A = [700, 656], D = [680, 706], C = [626, 746];
    sk.line(A[0], A[1], C[0], C[1], { c: 'red', w: 1.1, dash: '3 3' });
    sk.rightAngle(D[0], D[1], -0.933, -0.361, 0.37, -0.93, 6, { c: 'green' });
    sk.rightAngle(C[0], C[1], -0.566, -0.824, 0.804, -0.595, 6, { c: 'green' });
    sk.label(612, 668, '\\green{25}', { s: 9 });
    sk.label(697, 674, '\\green{7}', { s: 10 });
    sk.label(658, 722, '\\green{15}', { s: 9 });
    sk.label(578, 702, '\\green{20}', { s: 9 });
  }

  // Q16
  ANS(pg, 8, 830, '12', { s: 16 });
  T(pg, 100, 962, [
    '(a_2b_3 − a_3b_2, a_3b_1 − a_1b_3, a_1b_2 − a_2b_1) = \\vec{OA} \\times \\vec{OB}',
    '⇒ 已知式 = (\\vec{OA} \\times \\vec{OB}) \\cdot \\vec{OC} = 72 = 平行六面體體積',
    '體積 = 底面積 \\times 高，高 \\le |\\vec{OC}| = \\sqrt{4 + 4 + 1} = 3',
    '⇒ |\\vec{OA} \\times \\vec{OB}| \\ge 24 ⇒ \\tri OAB = \\frac{1}{2}|\\vec{OA} \\times \\vec{OB}| \\ge \\red{\\box{12}} \\small{\\gray{(\\vec{OC} \\perp 底面時)}}',
  ], { s: 13, lh: 1.5, gap: 1 });
});

/* ---------------- 第 6 頁 : Q17 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q17
  ANS(pg, 24, 138, '2', { s: 20 });
  T(pg, 250, 200, 'mx − y \\le m ⇔ y \\ge m(x − 1)：過 C(1, 0) 的直線上方', { s: 12 });
  T(pg, 100, 230, [
    '全部 \\tri OAB = \\frac{1}{2} \\cdot 6 \\cdot 4 = 12，要切掉 12 − \\frac{23}{4} = \\frac{25}{4}',
    'm > 0：切掉 \\tri BCF = \\frac{1}{2} \\cdot 5 \\cdot y_F = \\frac{25}{4} ⇒ y_F = \\frac{5}{2}，x_F = \\frac{9}{4}',
    'm = \\frac{5/2}{9/4 − 1} = \\red{\\box{2}}　\\gray{\\small{(m \\le 0 時至少含 \\tri BCD = \\frac{25}{3} > \\frac{23}{4}，不合)}}',
  ], { s: 12, lh: 1.5, gap: 1 });
  {
    const u = 19, O = [625, 306], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 8, O[1], O[0] + 128, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 6, O[0], O[1] - 92, { c: 'gray', w: 0.8, head: 3.5 });
    sk.poly([M(0, 0), M(0, 4), M(2.25, 2.5), M(1, 0)], { fill: 'hl', op: 0.55, c: 'green', w: 1 });
    let a = M(0, 4), b = M(6, 0); sk.line(a[0], a[1], b[0], b[1], { c: 'blue', w: 1.2 });
    a = M(0.9, -0.2); b = M(2.5, 3); sk.line(a[0], a[1], b[0], b[1], { c: 'orange', w: 1.2 });
    sk.label(M(0, 4)[0] - 12, M(0, 4)[1] - 7, 'A', { s: 10 });
    sk.label(M(6, 0)[0] - 4, O[1] + 1, 'B', { s: 10 });
    sk.label(M(1, 0)[0] + 2, O[1] + 1, 'C', { s: 10 }); sk.label(O[0] - 11, O[1] + 1, 'O', { s: 10 });
    sk.label(M(2.25, 2.5)[0] + 4, M(2.25, 2.5)[1] - 8, 'F', { s: 10 });
  }

  // Q18
  ANS(pg, 14, 540, '(4)');
  T(pg, 100, 630, [
    '不相交 ⇒ L_1 \\para E_1 ⇒ 法向量 \\perp 方向向量：(2, −1, c) \\cdot (3, 4, −2) = 2 − 2c = 0 ⇒ c = 1',
    '\\gray{檢查：L_1 上的 (1, 2, 2) 代入 E_1：2 − 2 + 2 = 2 \\ne 1，不在 E_1 上} ⇒ \\red{\\box{c = 1}}',
  ], { s: 12.5, lh: 1.55 });

  // Q19
  ANS(pg, 2, 734, '(−\\frac{1}{3}, 3)', { s: 10 });
  T(pg, 100, 785, [
    'E_1 \\perp E_2：(2, −1, c) \\cdot (1, 1, d) = 1 + cd = 0 ⇒ cd = −1',
    'A、B 到 E_2 等距且異側 ⇒ 中點 M(−1, −3, 2) 在 E_2 上',
    '−1 − 3 + 2d = 2 ⇒ d = 3，c = −\\frac{1}{3} ⇒ (c, d) = \\red{\\box{(−\\frac{1}{3}, 3)}}',
  ], { s: 13, lh: 1.45, gap: 1 });

  // Q20
  ANS(pg, 4, 874, ['(\\frac{13}{14},', '\\frac{40}{21},', '\\frac{43}{21})'], { s: 11, lh: 1.9 });
  T(pg, 100, 930, [
    'R(1, 1, 0) 代入：2 − 1 = 1 \\ok，1 + 1 = 2 \\ok ⇒ R 在 L 上（不論 c、d）',
    'E 過 P、Q、R：\\vec{PQ} = (1, −2, −2)，\\vec{PR} = (−1, 0, −3)',
    '法向量 \\vec{PQ} \\times \\vec{PR} = (6, 5, −2) ⇒ E：6x + 5y − 2z = 11',
    'L_1：(1 + 3t, 2 + 4t, 2 − 2t) 代入 E：12 + 42t = 11 ⇒ t = −\\frac{1}{42}',
    '⇒ 交點 \\red{\\box{(\\frac{13}{14}, \\frac{40}{21}, \\frac{43}{21})}}',
  ], { s: 13, lh: 1.5, gap: 1 });
});
