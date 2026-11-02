/* 臺北區 112 學年度第一學期 學科能力測驗模擬考試 數學B（北聯 B1／翰林 E4） — handwritten solutions
 * Question pages are PDF p.2–7 (p.1 cover, p.8 formula sheet); the booklet's own 詳解 is PDF p.9–14.
 * Methods follow that 詳解, trimmed. Q4 uses the t = x + 1 expansion directly; Q12(5) also notes the
 * bottom-face route (sqrt13 ≈ 3.61, slightly shorter than the 詳解's sqrt5 + sqrt2 ≈ 3.65; answer unchanged).
 * Pages are 618 x 867 pt; backgrounds are rendered straight to 1588 x 2246 so lines.py gives engine coords.
 * Coordinates: 96-dpi px on A4 (794 x 1123). Question numbers sit at x≈80, options at x≈104.
 */

/* ---------------- 第 1 頁 : Q1 – Q3 ---------------- */
page(2, (pg, sk) => {
  // Q1
  ANS(pg, 28, 234, '(2)');
  T(pg, 210, 270, [
    '|x − 1| < a ⇒ 1 − a < x < 1 + a \\gray{\\small{(以 1 為中心，左右各 a)}}',
    'a 為整數 ⇒ 區間內的整數：2 − a, …, 1, …, a，共 2a − 1 個',
    '2a − 1 = 3 ⇒ a = \\red{\\box{2}}',
  ], { s: 13.5, lh: 1.55 });
  {
    const X = u => 300 + 45 * (u + 1), Y = 432;
    sk.arrow(272, Y, 512, Y, { c: 'gray', w: 0.9, head: 4 });
    sk.line(X(-1) + 4, Y, X(3) - 4, Y, { c: 'green', w: 2.2 });
    [-1, 3].forEach(u => sk.circle(X(u), Y, 3.6, { c: 'red', w: 1.2 }));
    [0, 1, 2].forEach(u => sk.dot(X(u), Y, { r: 2.4 }));
    [-1, 0, 1, 2, 3].forEach(u => sk.label(X(u) - (u < 0 ? 8 : 3), Y + 6, '\\gray{' + (u < 0 ? '−1' : u) + '}', { s: 10 }));
    sk.label(X(-1) - 16, Y - 24, '\\red{1 − a}', { s: 10 }); sk.label(X(3) - 14, Y - 24, '\\red{1 + a}', { s: 10 });
  }

  // Q2
  ANS(pg, 28, 480, '(4)');
  T(pg, 280, 640, [
    '光線形成以光源為頂點的圓錐：軸鉛直、半頂角 30\\deg',
    '展示板與地面夾 80\\deg ⇒ 與鉛直的軸夾 10\\deg',
    '\\orange{截面與軸的夾角 10\\deg < 30\\deg} ⇒ \\red{\\box{雙曲線}}',
    '\\gray{\\small{(夾角 = 90\\deg 圓，> 30\\deg 橢圓，= 30\\deg 拋物線，< 30\\deg 雙曲線)}}',
  ], { s: 12.5, lh: 1.55 });
  {
    const V = [700, 662], L = 128, s30 = 0.5, c30 = 0.866;
    sk.line(V[0], V[1], V[0] - L * s30, V[1] + L * c30, { c: 'blue', w: 1.3 });
    sk.line(V[0], V[1], V[0] + L * s30, V[1] + L * c30, { c: 'blue', w: 1.3 });
    sk.line(V[0], V[1], V[0], V[1] + 125, { c: 'gray', w: 0.9, dash: '3 3' });
    sk.line(694, 700, 714, 790, { c: 'green', w: 2 });
    sk.arc(V[0], V[1], 22, -90, -60, { c: 'orange', w: 1 });
    sk.label(V[0] + 6, V[1] + 22, '\\orange{\\small{30\\deg}}', { s: 9 });
    sk.label(716, 752, '\\green{板}', { s: 10 });
    sk.label(674, 734, '\\orange{\\small{10\\deg}}', { s: 9 });
    sk.label(V[0] + 5, V[1] - 13, '\\gray{\\small{光源}}', { s: 9 });
  }

  // Q3
  ANS(pg, 28, 799, '(1)');
  T(pg, 230, 884, [
    '經度差 30\\deg + 150\\deg = 180\\deg ⇒ 兩地和北極在同一條經線圈上',
    '這個圈就是大圓，兩地各離北極 90\\deg − 60\\deg = 30\\deg',
    '⇒ 球心角 \\ang AOB = 30\\deg + 30\\deg = 60\\deg = \\frac{\\pi}{3}',
    '最短距離 = 6371 \\times \\frac{\\pi}{3} ≈ 6672 ≈ \\red{\\box{6700}} 公里',
  ], { s: 13, lh: 1.55 });
  {
    const O = [706, 990], r = 52, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
    sk.circle(O[0], O[1], r, { c: 'blue', w: 1.2 });
    sk.line(O[0] - r, O[1], O[0] + r, O[1], { c: 'gray', w: 0.8, dash: '3 3' });
    const A = P(60), B = P(120), N = P(90);
    sk.line(A[0], A[1], B[0], B[1], { c: 'gray', w: 0.8, dash: '3 3' });
    sk.line(O[0], O[1], A[0], A[1], { c: 'green', w: 1.1 }); sk.line(O[0], O[1], B[0], B[1], { c: 'green', w: 1.1 });
    sk.arc(O[0], O[1], r, 60, 120, { c: 'red', w: 2.2 });
    sk.arc(O[0], O[1], 13, 60, 120, { c: 'orange', w: 1 });
    sk.dot(A[0], A[1], { r: 1.8 }); sk.dot(B[0], B[1], { r: 1.8 }); sk.dot(N[0], N[1], { r: 1.5, c: 'gray' });
    sk.label(A[0] + 3, A[1] - 13, 'A', { s: 10 }); sk.label(B[0] - 11, B[1] - 13, 'B', { s: 10 });
    sk.label(N[0] - 4, N[1] - 16, '\\gray{\\small{N}}', { s: 9 });
    sk.label(O[0] - 10, O[1] - 30, '\\orange{\\small{60\\deg}}', { s: 9 });
    sk.label(O[0] - 4, O[1] + 1, '\\gray{\\small{O}}', { s: 9 });
  }
});

/* ---------------- 第 2 頁 : Q4 – Q6 ---------------- */
page(3, (pg, sk) => {
  // Q4
  ANS(pg, 28, 106, '(5)');
  T(pg, 236, 166, [
    'x = 0 附近的一次近似 = bx + c ⇒ b = 5，c = 2',
    '對稱中心 x = −\\frac{a}{3 \\cdot 2} = 1 ⇒ a = −6 \\gray{\\small{(驗：f(1) = 2 − 6 + 5 + 2 = 3)}}',
    '令 t = x + 1：f = 2(t − 1)^3 − 6(t − 1)^2 + 5(t − 1) + 2',
    't 的係數：6 + 12 + 5 = 23，常數：−2 − 6 − 5 + 2 = −11',
    '⇒ y = 23(x + 1) − 11 = \\red{\\box{23x + 12}}',
  ], { s: 13, lh: 1.45, gap: 1 });

  // Q5
  ANS(pg, 28, 320, '(5)');
  T(pg, 545, 374, [
    '\\orange{A(B − C) = O，B − C \\ne O}',
    '\\orange{若 A 可逆 ⇒ B = C 矛盾}',
    '\\orange{⇒ A 一定不可逆：\\det A = 0}',
  ], { s: 12, lh: 1.5 });
  T(pg, 190, 384, '2 \\cdot 3 − 6 \\cdot 1 = 0', { s: 12.5 });
  T(pg, 275, 427, '\\frac{\\sqrt3}{2} \\cdot \\frac{1}{2} − (−\\frac{1}{2})(−\\frac{\\sqrt3}{2}) = 0', { s: 12.5 });
  T(pg, 210, 480, '2^{2 + 5} − 2^{8 − 1} = 0', { s: 12.5 });
  T(pg, 233, 528, '\\log2 \\cdot 2\\log3 − \\log3 \\cdot 2\\log2 = 0', { s: 12.5 });
  T(pg, 246, 572, '\\log_2 3 \\cdot \\frac{3}{2}\\log_3 2 − \\frac{2}{3}\\log_2 3 \\cdot \\log_3 2 = \\frac{3}{2} − \\frac{2}{3} \\ne 0 ⇒ 可逆，\\red{不可能}', { s: 12.5 });

  // Q6
  ANS(pg, 28, 626, '(4)');
  {
    const O = [636.8, 717], A1 = [636.6, 641], A3 = [614.9, 704.3];
    sk.line(O[0], O[1], A1[0], A1[1], { c: 'green', w: 1.4 });
    sk.line(O[0], O[1], A3[0], A3[1], { c: 'green', w: 1.4 });
    sk.line(A1[0], A1[1], A3[0], A3[1], { c: 'red', w: 1.6 });
    sk.arc(O[0], O[1], 9, 90, 150, { c: 'orange', w: 1.1 });
    sk.label(650, 678, '\\green{1}', { s: 10 });
    sk.label(560, 690, '\\green{\\frac{1}{3}}', { s: 9 });
    sk.line(578, 700, 605, 709, { c: 'green', w: 0.8 });
  }
  T(pg, 200, 856, [
    '邊長 \\sqrt3 的正三角形，外接圓半徑 \\ov{OA_1} = \\frac{\\sqrt3}{\\sqrt3} = 1',
    '每做一次：繞 O 轉 30\\deg、縮成 \\frac{1}{\\sqrt3} 倍',
    '⇒ \\ov{OA_3} = 1 \\cdot (\\frac{1}{\\sqrt3})^2 = \\frac{1}{3}，\\ang A_1OA_3 = 60\\deg',
    '餘弦定理：\\ov{A_1A_3}^2 = 1^2 + (\\frac{1}{3})^2 − 2 \\cdot 1 \\cdot \\frac{1}{3}\\cos60\\deg = \\frac{7}{9}',
    '⇒ \\ov{A_1A_3} = \\red{\\box{\\frac{\\sqrt7}{3}}}',
  ], { s: 13.5, lh: 1.45, gap: 3 });
});

/* ---------------- 第 3 頁 : Q7 – Q9 ---------------- */
page(4, (pg, sk) => {
  // Q7
  MANS(pg, 24, 186, [2, 3, 4]);
  T(pg, 205, 263, '\\orange{數灰格：近視 n(G) = 13，其中女生 (第 5、6 行) 5 人}', { s: 11.5 });
  MK(pg, 284, 310, false);
  T(pg, 304, 311, 'C\\stk{30}{3} − C\\stk{20}{3} − C\\stk{10}{3} = 2800', { s: 12 });
  MK(pg, 550, 342, true);
  T(pg, 570, 337, '\\frac{C\\stk{13}{2}}{C\\stk{30}{2}} = \\frac{78}{435}', { s: 11.5 });
  MK(pg, 676, 382, true);
  T(pg, 697, 380, '\\frac{5}{10}', { s: 11.5 });
  MK(pg, 697, 422, true);
  T(pg, 718, 420, '\\frac{5}{13}', { s: 11.5 });
  MK(pg, 244, 479, false);
  T(pg, 264, 477, 'P(A|G) = \\frac{5}{13} \\ne P(A) = \\frac{10}{30} = \\frac{1}{3} ⇒ 不獨立', { s: 12 });
  T(pg, 110, 514, '\\gray{(1) 至少一男一女 = 全部 − 全男 − 全女 = 4060 − 1140 − 120 = 2800，不是 5600}', { s: 11.5 });

  // Q8
  MANS(pg, 24, 552, [1, 2, 3, 5]);
  MK(pg, 430, 585, true);
  T(pg, 450, 586, '週期都是 \\frac{2\\pi}{1} = 2\\pi', { s: 12 });
  MK(pg, 444, 617, true);
  T(pg, 470, 619, '−1 \\le \\sin2x \\le 1 ⇒ −1 \\le y \\le 3', { s: 12 });
  MK(pg, 598, 642, true);
  T(pg, 618, 645, 'x + \\pi 與 x − \\pi 差一個週期 2\\pi', { s: 11 });
  MK(pg, 386, 676, false);
  T(pg, 406, 678, 'x = \\frac{\\pi}{2}：y = \\sin\\pi = 0，不是最高或最低點', { s: 12 });
  MK(pg, 428, 716, true);
  T(pg, 448, 718, 'y = −\\cos x，x = −\\frac{\\pi}{2} 時 y = 0 \\small{(在中心線上)}', { s: 12 });
  T(pg, 110, 758, '\\gray{正弦型圖形：對稱軸要過最高 / 最低點；對稱中心是圖形與中心線 (y = 平均值) 的交點}', { s: 11.5 });

  // Q9
  MANS(pg, 24, 799, [2, 3, 4]);
  T(pg, 470, 830, [
    '\\orange{Y = X + 100}',
    '\\orange{Z = 10X + 100}',
    '\\orange{W = 8X + 211}',
  ], { s: 12.5, lh: 1.55 });
  MK(pg, 312, 922, false);
  T(pg, 332, 924, '\\sig_Y = \\sig_X', { s: 12 });
  MK(pg, 316, 946, true);
  T(pg, 336, 948, '\\sig_Z = 10\\sig_X > \\sig_W = 8\\sig_X', { s: 12 });
  MK(pg, 407, 971, true);
  T(pg, 427, 973, 'Y、Z 都是 X 乘正數再加常數 ⇒ 兩個 r 都 = 1', { s: 12 });
  MK(pg, 408, 995, true);
  T(pg, 428, 993, 'Q_3(Z) = \\frac{z_{15} + z_{16}}{2} = 255 = \\frac{w_5 + w_6}{2} = Q_1(W)', { s: 12 });
  MK(pg, 440, 1020, false);
  T(pg, 460, 1022, '移除前後都是第 3 個數 = 3', { s: 12 });
  T(pg, 110, 1050, '\\gray{(5) 20 \\times 13\\% = 2.6 → 第 3 個；移除 4 後 19 \\times 13\\% = 2.47 → 還是第 3 個 (= 3)，不變}', { s: 11.5 });
});

/* ---------------- 第 4 頁 : Q10 – Q12 ---------------- */
page(5, (pg, sk) => {
  // Q10
  MANS(pg, 24, 108, [1, 5]);
  T(pg, 380, 206, '設 1 格 x 次、2 格 y 次：x + 2y = 6', { s: 12.5 });
  GRID(pg, 384, 232, [62, 48, 74, 48, 48], 23, [
    ['n = x + y', '3', '4', '5', '6'],
    ['(x, y)', '(0, 3)', '(2, 2)', '(4, 1)', '(6, 0)'],
    ['方法數', '1', '\\frac{4!}{2!2!} = 6', '5', '1'],
  ], { s: 11.5 });
  MK(pg, 170, 207, true);
  T(pg, 190, 210, 'm = 1 + 6 + 5 + 1 = 13', { s: 12 });
  MK(pg, 178, 240, false);
  T(pg, 198, 238, 'P_3 = \\frac{1}{13}', { s: 12 });
  MK(pg, 178, 280, false);
  T(pg, 198, 278, 'P_4 = \\frac{6}{13}', { s: 12 });
  MK(pg, 172, 312, false);
  T(pg, 192, 309, 'P_4 = \\frac{6}{13} > P_5 = \\frac{5}{13}', { s: 12 });
  MK(pg, 174, 344, true);
  T(pg, 194, 341, 'E = \\frac{3 \\cdot 1 + 4 \\cdot 6 + 5 \\cdot 5 + 6 \\cdot 1}{13} = \\frac{58}{13}', { s: 12 });

  // Q11
  MANS(pg, 24, 465, [2, 4, 5]);
  MK(pg, 302, 518, false);
  T(pg, 322, 520, '(x + 1)^2 + (y − 1)^2 = 4，圓心 (−1, 1)', { s: 12 });
  MK(pg, 240, 542, true);
  T(pg, 260, 544, 'r = 2 ⇒ 面積 4\\pi', { s: 12 });
  MK(pg, 318, 566, false);
  T(pg, 338, 563, 'd = \\frac{|−4 − 3 + 12|}{5} = 1 ⇒ 弦長 = 2\\sqrt{4 − 1} = 2\\sqrt3', { s: 11.5 });
  MK(pg, 494, 591, true);
  MK(pg, 438, 616, true);
  T(pg, 110, 646, [
    '(4) L 與兩軸圍成 3-4-5 直角三角形，內切圓 r = \\frac{3 + 4 − 5}{2} = 1 最小 \\gray{\\small{(旁切圓更大)}}',
    '(5) x = 0, −1, −2, −3 時，y 依序可取 5、3、2、1 個 ⇒ 共 11 個',
  ], { s: 12, lh: 1.6 });
  {
    const u = 23, O = [724, 692], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(O[0] - 92, O[1], O[0] + 34, O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 12, O[0], O[1] - 112, { c: 'gray', w: 0.8, head: 3.5 });
    sk.poly([M(-3, 0), M(0, 4), M(0, 0)], { fill: 'hl', op: 0.55, c: 'green', w: 1.2 });
    const c = M(-1, 1); sk.circle(c[0], c[1], u, { c: 'orange', w: 1 });
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [-1, 0], [-1, 1], [-1, 2], [-2, 0], [-2, 1], [-3, 0]].forEach(([x, y]) => { const p = M(x, y); sk.dot(p[0], p[1], { r: 1.7, c: 'red' }); });
    sk.label(M(-3, 0)[0] - 8, O[1] + 2, '\\gray{\\small{−3}}', { s: 8 });
    sk.label(O[0] + 4, M(0, 4)[1] - 6, '\\gray{\\small{4}}', { s: 8 });
    sk.label(M(-2.6, 2.2)[0], M(-2.6, 2.2)[1], '\\green{L}', { s: 10 });
  }

  // Q12
  MANS(pg, 24, 731, [1, 2, 3, 4]);
  {
    const A = [567.8, 825.0], P = [583.4, 799.2], G = [634.6, 799.8], B = [701.6, 809.4], F = [669.8, 756.5];
    sk.poly([A, P, G, B], { c: 'orange', w: 1.6 });
    sk.dot(G[0], G[1], { r: 2, c: 'orange' }); sk.label(G[0] - 13, G[1] - 15, '\\orange{G}', { s: 10 });
    sk.dot(F[0], F[1], { r: 2, c: 'red' }); sk.label(F[0] + 3, F[1] - 15, '\\red{F}', { s: 10 });
  }
  MK(pg, 362, 806, true);
  T(pg, 382, 808, '六個方向各看到 3 格 ⇒ 3 \\times 6 = 18', { s: 11.5 });
  MK(pg, 258, 831, true);
  T(pg, 278, 830, '\\sqrt{2^2 + 2^2 + 1^2} = 3', { s: 12 });
  MK(pg, 434, 855, true);
  T(pg, 454, 857, '只有 B 和 F(0, 1, 2)', { s: 12 });
  MK(pg, 692, 891, true);
  MK(pg, 478, 923, false);
  T(pg, 498, 925, '最短 ≈ 3.61 > 3.5', { s: 12 });
  T(pg, 110, 956, [
    '\\orange{O 為原點：A(2, 0, 0)、B(0, 2, 1)、C(1, 1, 2)、D(2, 1, 1)、E(1, 2, 1)、G(1, 1, 1)}',
    '(4) \\ov{OC} = \\ov{OD} = \\ov{OE} = \\sqrt6，\\tri CDE 正三角形 ⇒ O 在桌面的投影是重心 (\\frac{4}{3}, \\frac{4}{3}, \\frac{4}{3})',
    '⇒ 距離 = \\sqrt{(\\frac{4}{3})^2 \\times 3} = \\frac{4\\sqrt3}{3}',
    '(5) 走上面 A → G → B：\\sqrt{2^2 + 1^2} + \\sqrt2 = \\sqrt5 + \\sqrt2 ≈ 3.65',
    '\\gray{\\small{(經底面再上背面展開：\\sqrt{3^2 + 2^2} = \\sqrt{13} ≈ 3.61，這才是最短)}} ⇒ 都 > 3.5',
  ], { s: 12.5, lh: 1.45, gap: 2 });
});

/* ---------------- 第 5 頁 : Q13 – Q17 ---------------- */
page(6, (pg, sk) => {
  // Q13
  ANS(pg, 34, 186, '\\frac{3}{7}', { s: 18 });
  T(pg, 110, 280, [
    '令 a = \\log x，b = \\log y：2a + 3b = \\frac{4}{3} \\circ{1}，3a + b = \\frac{1}{2} \\circ{2}',
    '3 \\times \\circ{1} − 2 \\times \\circ{2}：7b = 4 − 1 = 3 ⇒ \\log y = \\red{\\box{\\frac{3}{7}}}',
  ], { s: 13.5, lh: 1.5, gap: 4 });

  // Q14
  ANS(pg, 22, 374, '400', { s: 19 });
  T(pg, 110, 452, [
    'a_n = 2 + 4 + 6 + … + 2n = n(n + 1) = n^2 + n',
    '所求 = (5^2 + 6^2 + … + 10^2) + (5 + 6 + … + 10) = (385 − 30) + 45 = \\red{\\box{400}}',
  ], { s: 13.5, lh: 1.6 });
  T(pg, 470, 452, '\\gray{\\small{(1^2 + … + 10^2 = 385，1^2 + … + 4^2 = 30)}}', { s: 11 });

  // Q15
  ANS(pg, 16, 543, '2520', { s: 19 });
  T(pg, 110, 644, [
    '情形一：數學排第 1 節：其餘 6 科任排 6! = 720',
    '情形二：數學排第 2、3、4 節：3 \\times 5 \\small{(體育避開第 1 節)} \\times 5! = 1800',
    '共 720 + 1800 = \\red{\\box{2520}}',
  ], { s: 13, lh: 1.5 });

  // Q16
  ANS(pg, 34, 732, '4', { s: 19 });
  T(pg, 110, 824, [
    'x(x − 1) 除：f(0) = 3，f(1) = a + 3；x(x + 1) 除：f(0) = b',
    'x^2 − 1 除：f(1) = −2 + 4 = 2 ⇒ a = −1，b = 3',
    'g(x) = −x^2 + 3x + c，g(−1) = −1 − 3 + c = 0 ⇒ c = \\red{\\box{4}}',
  ], { s: 13, lh: 1.5 });

  // Q17
  ANS(pg, 26, 920, '10', { s: 19 });
  T(pg, 110, 1012, [
    '圓 (x + 1)^2 + y^2 = 5：Q(−1, 0)，r = \\sqrt5；雷射不能穿過圓',
    '⇒ 最早可射到的 C：BC 恰與圓相切。切線 y = m(x − 4)',
    '\\frac{|−5m|}{\\sqrt{m^2 + 1}} = \\sqrt5 ⇒ m = ±\\frac{1}{2}，取 −\\frac{1}{2}：x + 2y = 4',
    'C(−6 − 3t, 4t) 代入 ⇒ 5t = 10 ⇒ \\ov{AC} = 5t = \\red{\\box{10}}',
  ], { s: 12, lh: 1.4, gap: 1 });
  {
    const u = 9.5, O = [712, 1076], M = (x, y) => [O[0] + u * x, O[1] - u * y];
    sk.arrow(M(-14, 0)[0], O[1], M(5.6, 0)[0], O[1], { c: 'gray', w: 0.8, head: 3.5 });
    sk.arrow(O[0], O[1] + 8, O[0], M(0, 9.2)[1], { c: 'gray', w: 0.8, head: 3.5 });
    const Q = M(-1, 0); sk.circle(Q[0], Q[1], u * Math.sqrt(5), { c: 'blue', w: 1.1 });
    const A = M(-6, 0), C = M(-12, 8), B = M(4, 0);
    sk.line(A[0], A[1], C[0], C[1], { c: 'green', w: 1.3 });
    sk.line(B[0], B[1], C[0], C[1], { c: 'red', w: 1.2 });
    [A, B, C].forEach(p => sk.dot(p[0], p[1], { r: 1.8 }));
    sk.label(A[0] - 4, A[1] + 1, '\\small{A}', { s: 9 }); sk.label(B[0] - 2, B[1] + 1, '\\small{B}', { s: 9 });
    sk.label(C[0] - 4, C[1] - 15, '\\small{C(−12, 8)}', { s: 9 });
    sk.label(M(-3, 3.5)[0] + 4, M(-3, 3.5)[1] - 12, '\\red{\\small{x + 2y = 4}}', { s: 9 });
  }
});

/* ---------------- 第 6 頁 : Q18 – Q20 ---------------- */
page(7, (pg, sk) => {
  // shared coordinate sketch of 圖(二) (x and y scaled differently)
  const sx = 16, sy = 8.4, O = [652, 858], M = (x, y) => [O[0] + sx * x, O[1] - sy * y];
  {
    sk.arrow(M(-7.6, 0)[0], O[1], M(7.2, 0)[0], O[1], { c: 'gray', w: 0.8, head: 3.5 });
    const V = M(0, 24), A = M(-6, 0), B = M(6, 0);
    sk.line(V[0], V[1], A[0], A[1], { c: 'blue', w: 1.1 }); sk.line(V[0], V[1], B[0], B[1], { c: 'blue', w: 1.1 });
    [-3, 0, 3].forEach(x => { const p = M(x, 0); sk.line(V[0], V[1], p[0], p[1], { c: 'gray', w: 0.7 }); });
    const S = M(-1.2, 14.4), R = M(1.2, 14.4), P = M(-2, 8), Q = M(2, 8), D = M(-2, 16), Cc = M(2, 16);
    sk.poly([P, Q, R, S], { fill: 'hl', op: 0.6, c: 'orange', w: 1.1 });
    sk.line(D[0], D[1], Cc[0], Cc[1], { c: 'gray', w: 0.8 });
    sk.line(D[0], D[1], B[0], B[1], { c: 'red', w: 1.3 });
    [V, S, Q, D].forEach(p => sk.dot(p[0], p[1], { r: 1.6, c: 'red' }));
    sk.label(V[0] + 4, V[1] - 8, 'V(0, 24)', { s: 10 });
    sk.label(D[0] - 58, D[1] - 12, 'D\'(−2, 16)', { s: 10 });
    sk.label(S[0] - 78, S[1] - 10, 'S\'(−\\frac{6}{5}, \\frac{72}{5})', { s: 10 });
    sk.label(Q[0] + 7, Q[1] - 8, 'Q\'(2, 8)', { s: 10 });
    sk.label(M(-6, 0)[0] - 10, O[1] + 1, 'A\'', { s: 10 }); sk.label(M(-3, 0)[0] - 6, O[1] + 1, 'E\'', { s: 10 });
    sk.label(M(3, 0)[0] - 4, O[1] + 1, 'F\'', { s: 10 }); sk.label(M(6, 0)[0] - 2, O[1] + 1, 'B\'', { s: 10 });
    sk.label(M(-0.4, 0)[0] - 2, O[1] + 1, '\\gray{\\small{O}}', { s: 9 });
  }

  // Q18
  ANS(pg, 28, 607, '(2)');
  T(pg, 238, 664, [
    'A\'(−6, 0)、V(0, 24)',
    'D\' 在 VA\' 上，到 V 的距離 8 ⇒ y = 16',
    'VA\' 上 y = 16 處：x = −6 \\cdot \\frac{8}{24} = −2',
    '⇒ D\'(−2, 16)',
    'm_{B\'D\'} = \\frac{16 − 0}{−2 − 6} = −2',
    '⇒ y = −2(x − 6) = \\red{\\box{−2x + 12}}',
  ], { s: 12.5, lh: 1.5, gap: 2 });

  // Q19
  ANS(pg, 4, 870, '(−\\frac{6}{5}, \\frac{72}{5})', { s: 12 });
  T(pg, 526, 878, '\\orange{S 在對角線 BD 上 ⇒ S\' 在 B\'D\' 上}', { s: 11.5 });
  T(pg, 110, 897, [
    'S 在第 2 條直行 ⇒ S\' 在 E\'V 上，E\'(−3, 0)：y = 8x + 24；與 y = −2x + 12 聯立',
    '⇒ x = −\\frac{6}{5}，y = \\frac{72}{5} ⇒ S\' \\red{\\box{(−\\frac{6}{5}, \\frac{72}{5})}}',
  ], { s: 12, lh: 1.3 });

  // Q20
  ANS(pg, 28, 948, '\\frac{512}{25}', { s: 15 });
  T(pg, 110, 980, [
    'Q 也在 BD 上：F\'(3, 0)，F\'V：y = −8x + 24，與 y = −2x + 12 交於 Q\'(2, 8)',
    '由對稱：S\'R\' = 2 \\times \\frac{6}{5} = \\frac{12}{5}，P\'Q\' = 2 \\times 2 = 4，高 = \\frac{72}{5} − 8 = \\frac{32}{5}',
    '梯形 P\'Q\'R\'S\' = \\frac{1}{2}(\\frac{12}{5} + 4) \\times \\frac{32}{5} = \\frac{16}{5} \\times \\frac{32}{5} = \\red{\\box{\\frac{512}{25}}}',
  ], { s: 13, lh: 1.6, gap: 4 });
});
