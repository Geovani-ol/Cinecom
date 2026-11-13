from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

BASE = Path(__file__).resolve().parent
IMG = BASE / 'img'
IMG.mkdir(exist_ok=True)

W, H = 2560, 1440


def radial_glow(size, center, radius, color, strength):
    w, h = size
    y, x = np.ogrid[:h, :w]
    cx, cy = center
    dist = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    mask = np.clip(1 - dist / radius, 0, 1) ** 2 * strength
    layer = np.zeros((h, w, 3), dtype=np.float32)
    for i, c in enumerate(color):
        layer[:, :, i] = c * mask
    return layer


def base_background():
    img = np.zeros((H, W, 3), dtype=np.float32)
    img[:, :] = (9, 11, 20)
    img += radial_glow((W, H), (2050, 80), 1500, (225, 29, 72), 0.30)
    img += radial_glow((W, H), (80, 780), 1500, (99, 102, 241), 0.20)
    img += radial_glow((W, H), (1300, 1500), 1100, (0, 0, 0), 0.0)
    arr = np.clip(img, 0, 255).astype(np.uint8)
    im = Image.fromarray(arr, 'RGB')

    # Textura de puntos, muy sutil, como la interfaz de Cinecom.
    dots = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(dots)
    for y in range(0, H, 30):
        for x in range(0, W, 30):
            d.ellipse((x, y, x + 2, y + 2), fill=(255, 255, 255, 12))
    im = Image.alpha_composite(im.convert('RGBA'), dots)

    # Viñeta inferior.
    grad = Image.new('L', (1, H))
    for y in range(H):
        grad.putpixel((0, y), int(90 * (y / H) ** 2))
    black = Image.new('RGBA', (W, H), (0, 0, 0, 255))
    black.putalpha(grad.resize((W, H)))
    im = Image.alpha_composite(im, black)
    return im.convert('RGB')


def title_background():
    foto = Image.open(BASE.parent / 'public/backdrops/dune-parte-dos.jpg').convert('RGB')
    foto = ImageOps.fit(foto, (W, H), method=Image.Resampling.LANCZOS)
    foto = foto.filter(ImageFilter.GaussianBlur(1.2))
    foto = Image.eval(foto, lambda p: int(p * 0.84))

    # Degradado para que el texto respire a la izquierda.
    overlay = np.zeros((H, W, 4), dtype=np.uint8)
    y, x = np.ogrid[:H, :W]
    t = np.clip(x / (W * 0.82), 0, 1)
    alpha = (0.96 - 0.78 * t).clip(0, 1) ** 1.15
    bottom = np.clip((y - H * 0.55) / (H * 0.45), 0, 1) ** 1.5
    alpha = np.clip(alpha + bottom * 0.86, 0, 1)
    overlay[:, :, 0] = 7
    overlay[:, :, 1] = 9
    overlay[:, :, 2] = 17
    overlay[:, :, 3] = (alpha * 255).astype(np.uint8)
    base = Image.alpha_composite(foto.convert('RGBA'), Image.fromarray(overlay, 'RGBA'))

    # Puntos y brillo rojo tenue.
    dots = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(dots)
    for yy in range(0, H, 30):
        for xx in range(0, W, 30):
            d.ellipse((xx, yy, xx + 2, yy + 2), fill=(255, 255, 255, 10))
    base = Image.alpha_composite(base, dots)
    return base.convert('RGB')


def rounded_shot(src, out, width=1680, radius=34, border=(58, 63, 91, 255)):
    im = Image.open(src).convert('RGB')
    ratio = width / im.width
    im = im.resize((width, int(im.height * ratio)), Image.Resampling.LANCZOS)
    w, h = im.size
    pad = 54
    shadow_pad = 40

    canvas = Image.new('RGBA', (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    shadow = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(
        (pad, pad + 22, w + pad, h + pad + 22),
        radius=radius,
        fill=(0, 0, 0, 210),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    canvas = Image.alpha_composite(canvas, shadow)

    mask = Image.new('L', (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=255)
    shot = im.convert('RGBA')
    shot.putalpha(mask)
    canvas.alpha_composite(shot, (pad, pad))

    border_layer = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    bd = ImageDraw.Draw(border_layer)
    bd.rounded_rectangle(
        (pad, pad, w + pad - 1, h + pad - 1),
        radius=radius,
        outline=border,
        width=2,
    )
    canvas = Image.alpha_composite(canvas, border_layer)
    canvas.save(out, 'PNG')
    return canvas.size


if __name__ == '__main__':
    bg = base_background()
    bg.save(IMG / 'fondo.png', optimize=True)
    title_background().save(IMG / 'portada.png', optimize=True)

    shots = {
        'docs/preview-catalogo.jpg': 'catalogo.png',
        'docs/preview-detalle.jpg': 'detalle.png',
        'docs/preview-vip.jpg': 'vip.png',
        '.tools/shots/22-reproductor-final.png': 'player.png',
        'docs/preview-home.jpg': 'home.png',
    }
    for src, name in shots.items():
        size = rounded_shot(BASE.parent / src, IMG / name)
        print(name, size)
    print('fondo', bg.size)
