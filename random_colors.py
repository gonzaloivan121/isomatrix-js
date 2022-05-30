import random
import numpy as np
from PIL import Image

im = Image.new("RGB", (32,32))
im = np.array(im)
greyscale = False

for r in range(0,32):
    for c in range(0,32):
        if greyscale:
            ra = random.randint(27,92)
            re = ra
            gr = ra
            bl = ra
        else:
            re = random.randint(89,185)
            gr = random.randint(61,133)
            bl = random.randint(41,92)

        im[r][c]=[re,gr,bl]

im = Image.fromarray(im, 'RGB')
im.show()
im.save('savedimage4.jpg')
