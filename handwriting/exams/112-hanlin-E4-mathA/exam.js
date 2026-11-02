/* 臺北區 112 學年度第一學期 學科能力測驗模擬考試 數學A（北聯 B1／翰林 E4） — handwritten solutions
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet); the booklet's own 詳解 is PDF p.10–14.
 * Methods follow that 詳解, trimmed. Q15 uses its coordinate 另解; Q17 adds the plane-distance view;
 * Q20 uses OC·OD = |OC|^2 to get the z-coordinate directly.
 * Pages are 618 x 867 pt; backgrounds are rendered straight to 1588 x 2246 so lines.py gives engine coords.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈80, options at x≈104.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 28, 232, '(3)');
  T(pg, 200, 342, [
    '〈2a_{n} + 3〉：相鄰兩項差 = 2d 定值 \\red{\\ok}',
    '〈4^{a_{n}}〉：相鄰兩項比 = 4^{d} 定值 ⇒ 等比，差不是定值 \\red{\\ng}',
    '〈\\log a_{n}〉：差 = \\log\\frac{a_{n + 1}}{a_{n}}，等差數列的比值不固定 \\red{\\ng}',
    '〈\\log b_{n}〉：差 = \\log\\frac{b_{n + 1}}{b_{n}} = \\log r 定值 \\red{\\ok}',
    '〈\\frac{b_{n + 1}}{b_{n}}〉 = r, r, r, …：公差 0 的等差 \\red{\\ok}',
    '⇒ 共 \\red{\\box{3}} 個',
  ], { s: 13, lh: 1.42, gap: 1 });

  // Q2
  ANS(pg, 28, 562, '(1)');
  T(pg, 236, 632, [
    'f(x) = \\sqrt3\\sin x + \\cos x − 2\\cos x = \\sqrt3\\sin x − \\cos x',
    '= 2\\sin(x − \\frac{\\pi}{6})',
    '\\frac{\\pi}{2} \\le x \\le \\frac{4\\pi}{3} ⇒ \\frac{\\pi}{3} \\le x − \\frac{\\pi}{6} \\le \\frac{7\\pi}{6}',
    '\\sin 最大 1 \\small{(在 \\frac{\\pi}{2})}，最小 \\sin\\frac{7\\pi}{6} = −\\frac{1}{2}',
    '⇒ m = 2，n = −1 ⇒ \\red{\\box{(2, −1)}}',
  ], { s: 13, lh: 1.42, gap: 1 });
  {   // unit circle: arc of x − π/6 from π/3 to 7π/6
    const O = [690, 690], r = 44, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
    sk.arrow(O[0] - 62, O[1], O[0] + 62, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 58, O[0], O[1] - 62, { c: 'gray', w: 0.8, head: 3.5 });
    sk.circle(O[0], O[1], r, { c: 'gray', w: 0.7 });
    sk.arc(O[0], O[1], r, 60, 210, { c: 'green', w: 2 });
    const S = P(60), E = P(210), T1 = P(90);
    [S, E].forEach(p => sk.dot(p[0], p[1], { r: 1.8, c: 'green' }));
    sk.dot(T1[0], T1[1], { r: 2, c: 'red' });
    sk.line(E[0], E[1], O[0], E[1], { c: 'orange', w: 0.9, dash: '3 3' });
    sk.label(S[0] + 3, S[1] - 12, '\\green{\\frac{\\pi}{3}}', { s: 11 });
    sk.label(E[0] - 32, E[1] - 6, '\\green{\\frac{7\\pi}{6}}', { s: 11 });
    sk.label(T1[0] + 4, T1[1] - 16, '\\red{1}', { s: 11 });
    sk.label(O[0] + 3, E[1] - 3, '\\orange{−\\frac{1}{2}}', { s: 10 });
  }

  // Q3
  ANS(pg, 28, 848, '(5)');
  T(pg, 190, 880, [
    '\\orange{代入讓係數變 0 的 x 值}',
    'x = −4：0 = 16 − 4 − 4f(−4) ⇒ f(−4) = 3',
    'x = 0：4f(−1) = 0 ⇒ f(−1) = 0',
    'x = −1：3f(−2) = 1 − 1 − f(−1) = 0 ⇒ f(−2) = 0',
    '⇒ f(x) = a(x + 1)(x + 2)，f(−4) = 6a = 3 ⇒ a = \\frac{1}{2}',
    'f(1) = \\frac{1}{2} \\cdot 2 \\cdot 3 = \\red{\\box{3}}',
  ], { s: 13.5, lh: 1.45, gap: 1 });
});

/* ---------------- 第 2 頁 : Q4 – Q5 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 28, 109, '(2)');
  T(pg, 196, 420, [
    '標準化 z = \\frac{x − 80}{100}，|z| > 3 才算極端值',
    '⇒ x − 80 > 300 或 x − 80 < −300',
    '⇒ x > 380 或 x < −220 \\gray{\\small{(銷售量不會是負的)}}',
    '表中 > 380 的只有第 18 週的 390 ⇒ \\red{\\box{1}} 筆',
  ], { s: 14, lh: 1.6, gap: 2 });

  // Q5
  ANS(pg, 28, 686, '(4)');
  MK(pg, 246, 752, false);
  T(pg, 268, 754, '體積 = |行列式| ⇒ 行列式 = ±10，也可能是 −10', { s: 12 });
  MK(pg, 252, 802, false);
  T(pg, 274, 804, '行列式展開 = 7a − 4b + 5c = ±10', { s: 12 });
  MK(pg, 304, 826, false);
  T(pg, 326, 828, '代入平面 ABC：21 − 16 + 5 = 10 ≠ 0', { s: 12 });
  MK(pg, 524, 851, true);
  T(pg, 546, 853, '過 D 且 ∥ 平面 ABC 的那一面', { s: 12 });
  MK(pg, 354, 880, false);
  T(pg, 376, 882, '方向 (7, −4, 5) 是 ABC 的法向量 ⇒ 垂直', { s: 12 });
  T(pg, 104, 924, [
    '\\orange{\\vec{AB} \\times \\vec{AC} = (2, 1, −2) \\times (1, 3, 1) = (7, −4, 5) 是平面 ABC 的法向量}',
    '平面 ABC 過原點 A：7x − 4y + 5z = 0',
    '行列式 = (a, b, c) \\cdot (7, −4, 5) = 7a − 4b + 5c，體積 10 ⇒ 7a − 4b + 5c = ±10',
    '(4) 和 ABC 平行、過 D 的那一面就落在 7x − 4y + 5z = ±10 上 ⇒ \\red{\\box{(4)}}',
  ], { s: 13, lh: 1.55, gap: 2 });
});

/* ---------------- 第 3 頁 : Q6 – Q8 ---------------- */
page(4, (pg, sk) => {
  // Q6
  MANS(pg, 22, 184, [1, 2, 4]);
  MK(pg, 436, 237, true);
  T(pg, 458, 239, 'r^2 = 5(m − \\frac{1}{2})^2 + \\frac{3}{4} > 0', { s: 12 });
  MK(pg, 348, 270, true);
  T(pg, 370, 272, 'm = \\frac{1}{2} 時 r^2 最小 = \\frac{3}{4}，面積 \\frac{3\\pi}{4}', { s: 12 });
  MK(pg, 498, 302, false);
  T(pg, 520, 304, 'r^2 − d^2 可以 \\le 0', { s: 12 });
  MK(pg, 372, 326, true);
  T(pg, 394, 328, 'm^2 + 3m − 2 = 0 有實根 ⇒ 可相切', { s: 12 });
  MK(pg, 526, 351, false);
  T(pg, 548, 353, '弦長 2\\sqrt{m^2 + 3m − 2} 無上限', { s: 12 });
  T(pg, 104, 378, [
    '配方：(x + 2m)^2 + (y − m)^2 = 5m^2 − 5m + 2 = 5(m − \\frac{1}{2})^2 + \\frac{3}{4}',
    '圓心 (−2m, m) 到 L：d = \\frac{|−6m − 4m + 10|}{5} = |2m − 2|',
    'r^2 − d^2 = (5m^2 − 5m + 2) − 4(m − 1)^2 = m^2 + 3m − 2 \\gray{\\small{(> 0 兩交點，= 0 相切)}}',
  ], { s: 12.5, lh: 1.42, gap: 1 });

  // Q7
  MANS(pg, 22, 493, [1, 3, 4]);
  MK(pg, 288, 558, true);
  T(pg, 310, 560, 'x = y = z = 0 代入兩式都 = 0', { s: 12 });
  MK(pg, 392, 583, false);
  T(pg, 414, 585, '法向量平行 ⇒ 兩平面平行或重合，交不出直線', { s: 11.5 });
  MK(pg, 392, 607, true);
  T(pg, 414, 609, '例：x = 0 與 y = 0 交出 z 軸', { s: 12 });
  MK(pg, 276, 632, true);
  T(pg, 298, 634, 'L_{1}、L_{2} 的方向都是 (a, b, c) \\times (d, e, f)，又相異 ⇒ 平行', { s: 12 });
  MK(pg, 708, 656, false);
  T(pg, 104, 683, [
    '(5) L_{1} 過 O、A ⇒ 方向 (6, 1, 4)；L_{2} ∥ L_{1}，但 \\vec{BC} = (−3, 0, 2) 不平行 (6, 1, 4)',
    '⇒ C 不在 L_{2} 上',
  ], { s: 12.5, lh: 1.45 });

  // Q8
  MANS(pg, 22, 798, [2, 3]);
  T(pg, 300, 822, '\\orange{f(x) = a(x − 1)^3 + 3x + 1，對稱中心 (1, 4)}', { s: 12.5 });
  MK(pg, 344, 847, false);
  T(pg, 366, 849, '中心是 (1, f(1)) = (1, 4)', { s: 12 });
  MK(pg, 278, 871, true);
  T(pg, 300, 873, '兩點對稱於 x = 1 ⇒ 函數值和 = 2 \\times 4 = 8', { s: 12 });
  MK(pg, 410, 895, true);
  T(pg, 432, 897, 'f\'(x) = 3a(x − 1)^2 + 3 > 0，嚴格遞增', { s: 12 });
  MK(pg, 454, 920, false);
  T(pg, 476, 922, '應為 y = 3(x − 1) + 4 = 3x + 1', { s: 12 });
  MK(pg, 432, 944, false);
  T(pg, 454, 946, 'a(x − 1)^3 = 2(x − 1)', { s: 12 });
  T(pg, 104, 972, '(5) ⇒ (x − 1)[a(x − 1)^2 − 2] = 0 ⇒ x = 1、1 ± \\sqrt{\\frac{2}{a}}，有 3 個交點', { s: 12.5 });
});

/* ---------------- 第 4 頁 : Q9 – Q11 ---------------- */
page(5, (pg, sk) => {
  // Q9
  MANS(pg, 22, 112, [1, 3, 5]);
  MK(pg, 214, 186, true); MK(pg, 490, 186, false); MK(pg, 666, 186, true);
  MK(pg, 270, 268, false); MK(pg, 426, 268, true);
  T(pg, 450, 246, [
    '(1) 旋轉 45\\deg：轉 8 次 = 360\\deg ⇒ I',
    '(2) 旋轉 22.5\\deg：8 次 = 180\\deg ⇒ −I',
    '(3) (−I)^8 = I',
    '(4) 旋轉 240\\deg \\times 8 = 1920\\deg，同界 120\\deg',
    '(5) 鏡射：A^2 = I ⇒ A^8 = I',
  ], { s: 12, lh: 1.32 });

  // Q10
  MANS(pg, 22, 404, [2, 3, 4, 5]);
  T(pg, 440, 405, '\\orange{銳角 ⇒ c^2 < a^2 + b^2，A + B > 90\\deg}', { s: 12 });
  MK(pg, 254, 430, false);
  T(pg, 276, 432, 'a + b > c ⇒ \\sin A + \\sin B > \\sin C', { s: 12 });
  MK(pg, 300, 455, true);
  T(pg, 322, 457, '即 \\sin^2 C < \\sin^2 A + \\sin^2 B ⇔ c^2 < a^2 + b^2', { s: 12 });
  MK(pg, 306, 479, true);
  T(pg, 328, 481, '2\\cos^2\\theta = 1 + \\cos 2\\theta，兩邊 \\times 2 − 1 就是 (2)', { s: 12 });
  MK(pg, 208, 504, true);
  T(pg, 230, 506, 'A > 90\\deg − B ⇒ \\sin A > \\sin(90\\deg − B) = \\cos B', { s: 12 });
  MK(pg, 402, 528, true);
  T(pg, 424, 530, '同理 \\sin B > \\cos C，\\sin C > \\cos A，相加', { s: 12 });

  // Q11
  MANS(pg, 22, 632, [3, 4]);
  MK(pg, 352, 838, false);
  T(pg, 374, 836, '擲出 1、2、3 ⇒ \\frac{3}{6} = \\frac{1}{2}', { s: 12 });
  MK(pg, 362, 878, false);
  T(pg, 384, 874, 'P(A) = \\frac{1}{2}(0.9) + \\frac{1}{3}(0.05) + \\frac{1}{6}(0.05) = \\frac{19}{40}', { s: 12 });
  MK(pg, 576, 918, true);
  T(pg, 598, 920, '題目已給 90 %', { s: 12 });
  MK(pg, 592, 958, true);
  T(pg, 614, 954, '\\frac{0.45}{0.475} = \\frac{18}{19}', { s: 12.5 });
  MK(pg, 388, 989, false);
  T(pg, 410, 991, 'A 最高（見下）', { s: 12 });
  T(pg, 104, 1022, [
    '(5) P(B) = \\frac{1}{2}(0.05) + \\frac{1}{3}(0.9) + \\frac{1}{6}(0.05) = \\frac{1}{3}，P(C) = 1 − \\frac{19}{40} − \\frac{1}{3} = \\frac{23}{120}',
    '⇒ P(A) = 0.475 > P(B) ≈ 0.333 > P(C) ≈ 0.192，最高的是 A',
  ], { s: 12.5, lh: 1.6 });
});

/* ---------------- 第 5 頁 : Q12 – Q15 ---------------- */
page(6, (pg, sk) => {
  // Q12
  ANS(pg, 22, 196, '\\sqrt{13}', { s: 17 });
  T(pg, 110, 274, [
    'P 到 L：d = \\frac{|2a + 3b + 3|}{\\sqrt{13}}，a、b > 0',
    '算幾：2a + 3b \\ge 2\\sqrt{2a \\cdot 3b} = 2\\sqrt{25} = 10 \\gray{\\small{(2a = 3b = 5 時等號成立)}}',
    '⇒ d \\ge \\frac{10 + 3}{\\sqrt{13}} = \\red{\\box{\\sqrt{13}}}',
  ], { s: 13.5, lh: 1.4, gap: 1 });

  // Q13
  ANS(pg, 22, 380, '\\frac{\\sqrt6}{2}', { s: 16 });
  T(pg, 110, 486, [
    '邊長 4。A(t, a^{t})、B(t, a^{t} + 4) ⇒ a^{t} + 4 = 2a^{t} ⇒ a^{t} = 4',
    'C 在 B 的左邊 4 單位：C(t − 4, 8) ⇒ 8 = 3a^{t − 4} = \\frac{3 \\cdot 4}{a^4}',
    '⇒ a^4 = \\frac{3}{2} ⇒ a^2 = \\sqrt{\\frac{3}{2}} = \\red{\\box{\\frac{\\sqrt6}{2}}}',
  ], { s: 13.5, lh: 1.42, gap: 1 });
  T(pg, 560, 520, [
    '\\gray{C 若在右邊：8 = 12a^4}',
    '\\gray{⇒ a < 1 不合}',
  ], { s: 11.5, lh: 1.35 });

  // Q14
  ANS(pg, 22, 592, '560', { s: 19 });
  T(pg, 262, 706, [
    '分兩隊：\\frac{C\\stk{8}{4} C\\stk{4}{4}}{2!} = 35 \\gray{\\small{(兩隊不分名稱，除以 2!)}}',
    '每隊各選隊長：4 \\times 4 = 16',
    '⇒ 35 \\times 16 = \\red{\\box{560}}',
  ], { s: 13.5, lh: 1.45, gap: 1 });

  // Q15
  ANS(pg, 22, 814, '\\frac{10}{3}', { s: 17 });
  T(pg, 104, 980, [
    'O 為原點：A(5, 0)，\\cos\\ang AOC = \\frac{1}{4} ⇒ C(1, \\sqrt{15})，B = A + C = (6, \\sqrt{15})，D(3, 0)',
    '\\vec{DB} = (3, \\sqrt{15})，AE \\perp BD ⇒ 直線 AE：3(x − 5) + \\sqrt{15}y = 0',
    'OC：y = \\sqrt{15}x 代入 ⇒ 3x + 15x = 15 ⇒ x = \\frac{5}{6}',
    '\\ov{OE} = \\frac{5}{6} \\div \\cos\\ang AOC = \\frac{5}{6} \\times 4 = \\red{\\box{\\frac{10}{3}}}',
  ], { s: 13, lh: 1.42, gap: 1 });
});

/* ---------------- 第 6 頁 : Q16 – Q20 ---------------- */
page(7, (pg, sk) => {
  // Q16
  ANS(pg, 12, 140, '\\frac{8\\sqrt{70}}{7}', { s: 14 });
  T(pg, 240, 196, '\\orange{在 \\ov{BC} 上取 D 使 \\ov{DA} = \\ov{DB} = x ⇒ \\ang DAB = B，\\ang DAC = A − B}', { s: 11.5 });
  T(pg, 230, 216, '\\tri ADC：\\frac{x^2 + 4^2 − (12 − x)^2}{2 \\cdot 4 \\cdot x} = −\\frac{1}{5} ⇒ x = 5，\\ov{DC} = 7 ⇒ \\cos C = \\frac{4^2 + 7^2 − 5^2}{2 \\cdot 4 \\cdot 7} = \\frac{5}{7}', { s: 12 });
  T(pg, 104, 250, '\\ov{AB}^2 = 4^2 + 12^2 − 2 \\cdot 4 \\cdot 12 \\cdot \\frac{5}{7} = \\frac{640}{7} ⇒ \\ov{AB} = \\red{\\box{\\frac{8\\sqrt{70}}{7}}}', { s: 12.5 });

  // Q17
  ANS(pg, 18, 290, '\\frac{2}{13}', { s: 17 });
  T(pg, 104, 348, [
    '\\orange{令 c = 2 − 3a − 4b，即 3a + 4b + c = 2，求 a^2 + b^2 + c^2 最小 = 原點到平面距離^2}',
    '柯西：(a^2 + b^2 + c^2)(3^2 + 4^2 + 1^2) \\ge (3a + 4b + c)^2 = 4 ⇒ 最小值 = \\frac{4}{26} = \\red{\\box{\\frac{2}{13}}}',
  ], { s: 12.5, lh: 1.5 });

  // Q18
  ANS(pg, 28, 636, '(4)');
  T(pg, 236, 704, [
    'O 為原點：A(p, 0, 0)、B(0, q, 0)、C(0, 0, r)',
    'q^2 + r^2 = m^2，p^2 + r^2 = n^2，p^2 + q^2 + r^2 = ℓ^2',
    '⇒ p^2 = ℓ^2 − m^2，q^2 = ℓ^2 − n^2',
    '\\ov{AB}^2 = p^2 + q^2 = 2ℓ^2 − m^2 − n^2',
    '⇒ \\ov{AB} = \\red{\\box{\\sqrt{2ℓ^2 − m^2 − n^2}}}',
  ], { s: 13, lh: 1.5, gap: 1 });

  // Q19
  ANS(pg, 4, 852, ['13 < ℓ', '< \\sqrt{194}'], { s: 12.5, lh: 1.3 });
  T(pg, 184, 900, 'q^2 + r^2 = 25，p^2 + r^2 = 169 ⇒ ℓ^2 = p^2 + q^2 + r^2 = 169 + q^2 > 169', { s: 12.5 });
  T(pg, 104, 926, '又 ℓ^2 = 25 + 169 − r^2 = 194 − r^2 < 194 ⇒ \\red{\\box{13 < ℓ < \\sqrt{194}}}', { s: 12.5 });

  // Q20
  ANS(pg, 4, 952, '(\\sqrt2, 0, 2)', { s: 12 });
  T(pg, 104, 1022, [
    '\\orange{D 是 O 的對角頂點：\\ov{OD} = \\sqrt{\\frac{6}{4} + \\frac{6}{4} + 6} = 3 ⇒ D(0, 0, 3)}；C 投影在 x 軸正向 ⇒ C(x, 0, z)，x > 0',
    '\\vec{OC} \\cdot \\vec{OD} = \\vec{OC} \\cdot (\\vec{OA} + \\vec{OB} + \\vec{OC}) = |\\vec{OC}|^2 = 6，又 = 3z ⇒ z = 2',
    'x = \\sqrt{6 − 2^2} = \\sqrt2 ⇒ C\\red{\\box{(\\sqrt2, 0, 2)}}',
  ], { s: 12, lh: 1.42, gap: 0 });
});
