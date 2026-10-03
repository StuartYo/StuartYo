import sys, pymupdf
src, overlay, out, first = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
doc = pymupdf.open(src); ov = pymupdf.open(overlay)
print('overlay pages', ov.page_count, ov[0].rect, 'src', doc[0].rect)
for i in range(ov.page_count):
    pg = doc[first - 1 + i]
    pg.show_pdf_page(pg.rect, ov, i, overlay=True)
doc.save(out, garbage=4, deflate=True)
print('saved', out)
