import sys
from PIL import Image, ImageDraw, ImageFont
pg, x0,y0,x1,y1, step = sys.argv[1], *map(int, sys.argv[2:7])
im=Image.open(f'bg/h-{pg}.png').convert('RGB')  # 192dpi = 2x of 96dpi coords
c=im.crop((x0*2,y0*2,x1*2,y1*2)); c=c.resize((c.width*2//2*1, c.height)) 
d=ImageDraw.Draw(c)
f=ImageFont.truetype('/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc',14)
for x in range((x0//step+1)*step, x1, step):
    d.line([( (x-x0)*2,0),((x-x0)*2,c.height)], fill=(255,0,0) if x%50==0 else (255,180,180), width=1)
    if x%50==0: d.text(((x-x0)*2+2,2), str(x), fill=(255,0,0), font=f)
for y in range((y0//step+1)*step, y1, step):
    d.line([(0,(y-y0)*2),(c.width,(y-y0)*2)], fill=(0,0,255) if y%50==0 else (180,180,255), width=1)
    if y%50==0: d.text((2,(y-y0)*2+2), str(y), fill=(0,0,255), font=f)
c.save(sys.argv[7])
