import sys
from PIL import Image
import numpy as np
for pg in sys.argv[1:]:
    im=np.array(Image.open(f'bg/h-{pg}.png').convert('L'))<128  # 192 dpi
    H,W=im.shape
    rows=im[:, 60:W-20].sum(1)
    print(f'=== page {pg} (coords in 96dpi px)')
    y=0; 
    while y<H:
        if rows[y]>0:
            y0=y
            while y<H and rows[y]>0: y+=1
            y1=y
            seg=im[y0:y1]
            cols=np.where(seg.sum(0)>0)[0]
            # split into x clusters with gaps > 30px(192dpi)
            cl=[];s=cols[0];p=cols[0]
            for c in cols[1:]:
                if c-p>40: cl.append((s,p)); s=c
                p=c
            cl.append((s,p))
            if y1-y0>=3:
                print(f'y {y0/2:6.1f}-{y1/2:6.1f}  x: '+' '.join(f'[{a/2:.0f}-{b/2:.0f}]' for a,b in cl))
        else: y+=1
