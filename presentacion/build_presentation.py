from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

BASE = Path(__file__).resolve().parent
IMG = BASE / 'img'
OUT = BASE.parent / 'Cinecom-Presentacion.pptx'

# ---------- Paleta y tipografías ----------
NEGRO = RGBColor(10, 12, 21)
TEXTO = RGBColor(245, 244, 249)
MUTED = RGBColor(178, 178, 196)
TENUE = RGBColor(123, 126, 147)
ROJO = RGBColor(225, 29, 72)
ROSA = RGBColor(251, 113, 133)
AMBAR = RGBColor(245, 165, 36)
MORADO = RGBColor(99, 102, 241)
VERDE = RGBColor(52, 211, 153)
CARD = RGBColor(17, 21, 40)
CARD_2 = RGBColor(14, 18, 34)
BORDE = RGBColor(44, 49, 78)
BLANCO = RGBColor(255, 255, 255)
DISPLAY = 'Georgia'
BODY = 'Calibri'
MONO = 'Courier New'

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]


# ---------- Helpers ----------
def add_text(slide, x, y, w, h, text='', size=14, color=TEXTO, font=BODY,
             bold=False, italic=False, align=PP_ALIGN.LEFT,
             anchor=MSO_ANCHOR.TOP, line_spacing=1.0, margins=(0, 0, 0, 0),
             space_after=0, spacing=None, link=None):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = Inches(margins[0])
    tf.margin_right = Inches(margins[1])
    tf.margin_top = Inches(margins[2])
    tf.margin_bottom = Inches(margins[3])
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]
    p.alignment = align
    p.line_spacing = line_spacing
    p.space_after = Pt(space_after)
    run = p.add_run()
    run.text = text
    apply_run(run, size, color, font, bold, italic, spacing)
    if link:
        run.hyperlink.address = link
    return box


def apply_run(run, size, color, font, bold=False, italic=False, spacing=None):
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    if spacing is not None:
        rPr = run._r.get_or_add_rPr()
        rPr.set('spc', str(int(spacing * 100)))


def add_rich_text(slide, x, y, w, h, parts, align=PP_ALIGN.LEFT,
                  anchor=MSO_ANCHOR.TOP, line_spacing=1.0):
    """parts: lista de tuplas (texto, tamaño, color, fuente, bold, italic, space_after)"""
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    first = True
    for part in parts:
        text, size, color, font, bold, italic, space_after = part
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.alignment = align
        p.line_spacing = line_spacing
        p.space_after = Pt(space_after)
        r = p.add_run()
        r.text = text
        apply_run(r, size, color, font, bold, italic)
    return box


def add_card(slide, x, y, w, h, fill=CARD, line=BORDE, radius=0.08, line_width=1.0):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.adjustments[0] = radius
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.color.rgb = line
    shape.line.width = Pt(line_width)
    shape.shadow.inherit = False
    return shape


def add_pill(slide, x, y, w, h, text, fill=CARD, line=BORDE, color=MUTED,
             size=9, bold=False, font=BODY):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.adjustments[0] = 0.5
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.color.rgb = line
    shape.line.width = Pt(0.8)
    shape.shadow.inherit = False
    tf = shape.text_frame
    tf.clear()
    tf.word_wrap = False
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = text
    apply_run(r, size, color, font, bold)
    return shape


def add_circle_number(slide, x, y, n, fill=ROJO, color=BLANCO, size=0.34, diameter=0.34):
    shape = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(diameter), Inches(diameter))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    shape.shadow.inherit = False
    tf = shape.text_frame
    tf.clear()
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = str(n)
    apply_run(r, size, color, BODY, True)


def add_line(slide, x1, y1, x2, y2, color=BORDE, width=1.0):
    from pptx.enum.shapes import MSO_CONNECTOR
    line = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    line.line.color.rgb = color
    line.line.width = Pt(width)
    return line


def brand(slide, x=0.7, y=0.38, scale=1.0):
    icon_size = 0.34 * scale
    box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(icon_size), Inches(icon_size))
    box.adjustments[0] = 0.22
    box.fill.solid()
    box.fill.fore_color.rgb = ROJO
    box.line.fill.background()
    box.shadow.inherit = False
    tf = box.text_frame
    tf.clear()
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = 'C'
    apply_run(r, 11 * scale, BLANCO, BODY, True)

    tx = x + icon_size + 0.11
    box2 = slide.shapes.add_textbox(Inches(tx), Inches(y - 0.01), Inches(1.35 * scale), Inches(icon_size + 0.02))
    tf2 = box2.text_frame
    tf2.clear()
    tf2.word_wrap = False
    tf2.margin_left = 0
    tf2.margin_right = 0
    tf2.margin_top = 0
    tf2.margin_bottom = 0
    tf2.vertical_anchor = MSO_ANCHOR.MIDDLE
    p2 = tf2.paragraphs[0]
    r1 = p2.add_run()
    r1.text = 'Cine'
    apply_run(r1, 17 * scale, TEXTO, DISPLAY, True)
    r2 = p2.add_run()
    r2.text = 'com'
    apply_run(r2, 17 * scale, ROSA, DISPLAY, True)


def chrome(slide, number, total=7):
    add_text(slide, 0.7, 7.05, 3.2, 0.22, 'CINECOM · PROYECTO T3', 7.5, TENUE, BODY, True)
    add_text(slide, 11.5, 7.05, 1.12, 0.22, f'{number:02d} / {total:02d}', 7.5, TENUE, BODY,
             align=PP_ALIGN.RIGHT)


def content_heading(slide, eyebrow, title, lead=None, title_size=32, title_w=11.6,
                    title_h=1.0, lead_y=2.3, lead_w=10.6):
    brand(slide)
    add_text(slide, 0.7, 0.94, 10.5, 0.24, eyebrow, 8.5, ROSA, BODY, True)
    add_text(slide, 0.7, 1.18, title_w, title_h, title, title_size, TEXTO, DISPLAY, True, line_spacing=0.98)
    if lead:
        add_text(slide, 0.7, lead_y, lead_w, 0.42, lead, 12, MUTED, BODY, line_spacing=1.15)


def add_bullet(slide, x, y, w, title, detail, number=None):
    if number is not None:
        add_circle_number(slide, x, y + 0.02, number, diameter=0.30, size=9)
        tx = x + 0.42
    else:
        add_text(slide, x, y + 0.02, 0.16, 0.24, '•', 15, ROJO, BODY, True)
        tx = x + 0.2
    add_text(slide, tx, y, w, 0.26, title, 11.5, TEXTO, BODY, True)
    add_text(slide, tx, y + 0.25, w, 0.22, detail, 9.2, TENUE, BODY, line_spacing=1.1)


# ============================================================
# DIAPOSITIVA 1 · PORTADA
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'portada.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)

brand(s, x=0.78, y=0.52, scale=1.08)
add_text(s, 11.0, 0.56, 1.6, 0.24, 'T3 · 2026', 8.5, MUTED, BODY, True, align=PP_ALIGN.RIGHT)

add_text(s, 0.8, 1.72, 6.2, 0.24, 'PROYECTO T3 · PROGRAMACIÓN DEL LADO DEL CLIENTE', 8.5, ROSA, BODY, True)
add_text(s, 0.8, 2.02, 6.4, 0.85, 'Cinecom', 66, TEXTO, DISPLAY, True, line_spacing=0.92)
add_text(s, 0.82, 3.02, 6.2, 0.62, 'Catálogo interactivo de películas y series', 21, TEXTO, BODY, False, line_spacing=1.05)
add_text(s, 0.82, 3.75, 5.8, 0.55, 'Explora, guarda y descubre tu próxima historia.', 12.5, MUTED, BODY, line_spacing=1.3)

# Línea y meta
line = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.82), Inches(4.62), Inches(1.15), Inches(0.035))
line.fill.solid(); line.fill.fore_color.rgb = ROJO; line.line.fill.background(); line.shadow.inherit = False
add_text(s, 2.1, 4.55, 4.5, 0.24, 'React + TypeScript + Vite', 10, MUTED, BODY, True)
add_text(s, 0.82, 6.72, 5.6, 0.25, 'Geovani Olvera  ·  Noviembre 2026', 9.5, TENUE, BODY)

# Tarjeta de datos sobre la imagen
card = add_card(s, 9.05, 5.55, 3.5, 1.18, fill=RGBColor(8, 10, 18), line=RGBColor(60, 64, 88), radius=0.10)
add_text(s, 9.28, 5.72, 3.0, 0.18, 'EN NÚMEROS', 7.5, ROSA, BODY, True)
# Tres columnas
for i, (num, lab) in enumerate([('24', 'títulos'), ('24', 'tráilers'), ('6', 'series')]):
    x = 9.28 + i * 1.02
    add_text(s, x, 5.96, 0.85, 0.34, num, 21, TEXTO, DISPLAY, True)
    add_text(s, x, 6.29, 0.85, 0.16, lab, 7.2, TENUE, BODY, True)

# Nota de demo
add_text(s, 7.4, 6.86, 5.2, 0.2, 'Presentación · 5 min  |  Demo · 5 min', 8, TENUE, BODY, False, align=PP_ALIGN.RIGHT)


# ============================================================
# DIAPOSITIVA 2 · QUÉ ES
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'fondo.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)
content_heading(s, 'LA IDEA', 'Una app para explorar y guardar historias.',
                'Cinecom reúne películas y series en una experiencia de streaming con datos y recursos 100% locales.',
                title_w=5.35, title_h=1.35, lead_y=2.62, lead_w=5.2)

# 2x2 features
features = [
    ('24 títulos', '18 películas + 6 series'),
    ('Búsqueda y filtros', 'por título, tipo y género'),
    ('Ficha completa', 'sinopsis, reparto y ficha técnica'),
    ('Favoritos', 'persistentes en LocalStorage'),
]
for i, (title, detail) in enumerate(features):
    x = 0.7 + (i % 2) * 2.5
    y = 3.18 + (i // 2) * 1.02
    add_card(s, x, y, 2.34, 0.86, fill=CARD_2, radius=0.08)
    add_text(s, x + 0.16, y + 0.13, 2.0, 0.24, title, 11.5, TEXTO, BODY, True)
    add_text(s, x + 0.16, y + 0.41, 2.0, 0.26, detail, 8.8, TENUE, BODY, line_spacing=1.05)

# Quote
q = add_card(s, 0.7, 5.45, 4.84, 0.72, fill=RGBColor(225, 29, 72), line=RGBColor(225, 29, 72), radius=0.08)
add_text(s, 0.92, 5.61, 4.4, 0.4, 'Sin backend: el catálogo vive en un arreglo local.', 12.5, BLANCO, DISPLAY, True, italic=True)

# Mini strip
add_text(s, 0.7, 6.5, 4.9, 0.22, '24 títulos  ·  24 tráilers  ·  100% frontend', 8.5, TENUE, BODY, True)

# Screenshot
label = add_text(s, 6.45, 1.38, 6.1, 0.24, 'CATÁLOGO · BÚSQUEDA, FILTROS Y TARJETAS', 7.8, ROSA, BODY, True)
s.shapes.add_picture(str(IMG / 'catalogo.png'), Inches(6.28), Inches(1.62), width=Inches(6.35))
chrome(s, 2)


# ============================================================
# DIAPOSITIVA 3 · TECNOLOGÍAS
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'fondo.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)
content_heading(s, 'TECNOLOGÍAS', 'React, TypeScript y Vite.',
                'Componentes, estado y eventos con herramientas estándar del frontend.')

techs = [
    ('React 19', 'Componentes, props y hooks.', ROJO),
    ('TypeScript', 'Catálogo y props tipadas.', MORADO),
    ('Vite 8', 'Dev server y build.', AMBAR),
    ('CSS puro', 'Responsive, sin UI kit.', ROSA),
    ('LocalStorage', 'Favoritos y plan VIP.', VERDE),
]
for i, (name, detail, color) in enumerate(techs):
    x = 0.7 + i * 2.44
    add_card(s, x, 2.62, 2.27, 1.6, fill=CARD, radius=0.09)
    bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.17), Inches(2.62), Inches(0.52), Inches(0.06))
    bar.fill.solid(); bar.fill.fore_color.rgb = color; bar.line.fill.background(); bar.shadow.inherit = False
    add_text(s, x + 0.17, 2.88, 1.95, 0.28, name, 14.5, TEXTO, BODY, True)
    add_text(s, x + 0.17, 3.26, 1.95, 0.55, detail, 9.2, TENUE, BODY, line_spacing=1.2)
    add_text(s, x + 0.17, 3.9, 1.2, 0.16, f'0{i+1}', 7, color, BODY, True)

# Flujo de datos
add_text(s, 0.7, 4.55, 6.2, 0.22, 'FLUJO DE DATOS', 8.2, ROSA, BODY, True)
flow = [
    ('data/peliculas.ts', AMBAR),
    ('App.tsx · estado', ROSA),
    ('Páginas + componentes', MORADO),
    ('localStorage', VERDE),
]
for i, (txt, color) in enumerate(flow):
    x = 0.7 + i * 2.95
    add_card(s, x, 4.84, 2.65, 0.62, fill=CARD_2, radius=0.45)
    add_text(s, x + 0.15, 4.98, 2.35, 0.2, txt, 9.2, color, MONO, True, align=PP_ALIGN.CENTER)
    if i < 3:
        add_text(s, x + 2.68, 4.98, 0.25, 0.2, '→', 12, TENUE, BODY, True, align=PP_ALIGN.CENTER)

# Nota
add_card(s, 0.7, 5.86, 11.9, 0.64, fill=RGBColor(10, 13, 25), line=BORDE, radius=0.08)
add_text(s, 0.96, 6.03, 11.35, 0.28,
         'Sin backend  ·  sin base de datos  ·  sin API en tiempo de ejecución  ·  assets locales en public/',
         10, MUTED, BODY, True)
chrome(s, 3)


# ============================================================
# DIAPOSITIVA 4 · INSTALACIÓN
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'fondo.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)
content_heading(s, 'INSTALACIÓN', 'Se instala como un proyecto de React.',
                'Solo necesitas Node.js 20 o superior y pnpm (npm también funciona).')

# Terminal
add_card(s, 0.7, 1.92, 7.15, 3.62, fill=RGBColor(5, 7, 13), line=RGBColor(52, 57, 84), radius=0.08)
# barra
bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.7), Inches(1.92), Inches(7.15), Inches(0.38))
bar.fill.solid(); bar.fill.fore_color.rgb = RGBColor(17, 21, 40); bar.line.fill.background(); bar.shadow.inherit = False
for i, c in enumerate([RGBColor(255, 95, 87), RGBColor(254, 188, 46), RGBColor(40, 200, 64)]):
    dot = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.93 + i * 0.2), Inches(2.04), Inches(0.1), Inches(0.1))
    dot.fill.solid(); dot.fill.fore_color.rgb = c; dot.line.fill.background(); dot.shadow.inherit = False
add_text(s, 1.62, 2.03, 4.5, 0.18, 'cinecom — terminal', 7.5, TENUE, MONO)

term_lines = [
    ('# 1. Instalar dependencias', TENUE, False),
    ('pnpm install', TEXTO, True),
    ('', TEXTO, False),
    ('# 2. Levantar el servidor de desarrollo', TENUE, False),
    ('pnpm dev', TEXTO, True),
    ('', TEXTO, False),
    ('# 3. Abrir en el navegador', TENUE, False),
    ('http://localhost:5173', ROSA, True),
    ('', TEXTO, False),
    ('# 4. Build de producción', TENUE, False),
    ('pnpm build', TEXTO, True),
]
y = 2.58
for text, color, bold in term_lines:
    if text:
        add_text(s, 0.98, y, 6.5, 0.24, text, 11.2, color, MONO, bold)
    y += 0.255

# Right cards
right = [
    ('Sin backend', 'No hay servidor ni base de datos.'),
    ('Assets incluidos', 'Pósters, tráilers y fuentes en public/.'),
    ('Build listo', 'pnpm build genera la carpeta dist/.'),
]
for i, (title, detail) in enumerate(right):
    y = 1.92 + i * 1.24
    add_card(s, 8.2, y, 4.4, 1.08, fill=CARD_2, radius=0.08)
    add_text(s, 8.42, y + 0.16, 0.22, 0.22, '✓', 11, VERDE, BODY, True)
    add_text(s, 8.7, y + 0.14, 3.7, 0.24, title, 11.5, TEXTO, BODY, True)
    add_text(s, 8.7, y + 0.43, 3.65, 0.4, detail, 8.8, TENUE, BODY, line_spacing=1.1)

# Nota inferior
add_text(s, 0.7, 5.9, 11.9, 0.55,
         'El README incluye los comandos, la estructura de carpetas y la explicación de cada componente.',
         9.5, TENUE, BODY, line_spacing=1.25)
add_pill(s, 0.7, 6.55, 2.0, 0.36, 'Node.js 20+', fill=RGBColor(17, 21, 40), color=MUTED, size=8.5, bold=True)
add_pill(s, 2.82, 6.55, 1.45, 0.36, 'pnpm', fill=RGBColor(17, 21, 40), color=MUTED, size=8.5, bold=True)
add_pill(s, 4.4, 6.55, 1.55, 0.36, 'o npm', fill=RGBColor(17, 21, 40), color=MUTED, size=8.5, bold=True)
chrome(s, 4)


# ============================================================
# DIAPOSITIVA 5 · CÓMO SE USA
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'fondo.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)
content_heading(s, 'CÓMO SE USA', 'Cómo se usa Cinecom',
                'El recorrido del usuario, en cinco pasos.',
                title_w=5.5, title_h=0.8, lead_y=2.0, lead_w=5.2)

steps = [
    ('Explora', '24 títulos en una cuadrícula visual.'),
    ('Busca y filtra', 'por título, tipo (película/serie) y género.'),
    ('Abre la ficha', 'sinopsis, reparto, ficha técnica y similares.'),
    ('Guarda', 'marca favoritos; se conservan al recargar.'),
    ('Reproduce', 'tráiler local o película con VIP simulado.'),
]
# línea vertical
add_line(s, 1.04, 2.65, 1.04, 5.95, color=RGBColor(46, 51, 78), width=1.2)
for i, (title, detail) in enumerate(steps):
    y = 2.55 + i * 0.8
    add_circle_number(s, 0.88, y, i + 1, diameter=0.33, size=9)
    add_text(s, 1.38, y - 0.01, 4.6, 0.26, title, 12.5, TEXTO, BODY, True)
    add_text(s, 1.38, y + 0.27, 4.8, 0.25, detail, 9.2, TENUE, BODY, line_spacing=1.1)

# pequeño tip
add_card(s, 0.7, 6.45, 5.45, 0.45, fill=RGBColor(17, 21, 40), line=BORDE, radius=0.08)
add_text(s, 0.9, 6.56, 5.1, 0.22, 'Tip: Escape cierra la ficha y el reproductor.', 8.6, MUTED, BODY, True)

# Screenshot detalle
add_text(s, 6.52, 1.38, 6.0, 0.22, 'FICHA DE DETALLE · PESTAÑAS Y ACCIONES', 7.8, ROSA, BODY, True)
s.shapes.add_picture(str(IMG / 'detalle.png'), Inches(6.32), Inches(1.6), width=Inches(6.45))
chrome(s, 5)


# ============================================================
# DIAPOSITIVA 6 · DEMO VIP
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'fondo.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)
content_heading(s, 'DEMO', 'La demo: del catálogo a la pantalla.',
                'Suscripción VIP simulada y reproductor de demostración, sin cobros reales.')
add_pill(s, 11.02, 1.28, 1.62, 0.34, '3 planes', fill=RGBColor(225, 29, 72), line=RGBColor(225, 29, 72), color=BLANCO, size=8, bold=True)

add_text(s, 0.7, 1.86, 5.8, 0.22, 'VIP · PLANES Y PAGO SIMULADO', 7.8, ROSA, BODY, True)
add_text(s, 6.87, 1.86, 5.8, 0.22, 'REPRODUCTOR · MODO DEMOSTRACIÓN', 7.8, ROSA, BODY, True)
s.shapes.add_picture(str(IMG / 'vip.png'), Inches(0.55), Inches(2.1), width=Inches(5.88))
s.shapes.add_picture(str(IMG / 'player.png'), Inches(6.72), Inches(2.1), width=Inches(5.88))

# Test strip
add_card(s, 0.55, 6.27, 12.1, 0.6, fill=RGBColor(17, 21, 40), line=RGBColor(60, 65, 92), radius=0.08)
add_text(s, 0.78, 6.41, 4.2, 0.22, 'PARA LA DEMO', 7.8, ROSA, BODY, True)
add_text(s, 0.78, 6.6, 2.8, 0.15, 'Tarjeta de prueba', 7.2, TENUE, BODY, True)
add_text(s, 2.35, 6.43, 5.6, 0.22, '4242 4242 4242 4242   ·   12/30   ·   CVV 123', 10.5, TEXTO, MONO, True)
add_text(s, 8.65, 6.43, 3.8, 0.22, 'Cualquier nombre  ·  sin cobro real', 8.5, TENUE, BODY, True)
chrome(s, 6)


# ============================================================
# DIAPOSITIVA 7 · CIERRE
# ============================================================
s = prs.slides.add_slide(BLANK)
s.shapes.add_picture(str(IMG / 'portada.png'), 0, 0, width=prs.slide_width, height=prs.slide_height)
brand(s, x=0.78, y=0.52, scale=1.0)
add_text(s, 0.8, 1.62, 6.0, 0.24, 'EN RESUMEN', 8.5, ROSA, BODY, True)
add_text(s, 0.8, 1.92, 5.8, 1.05, 'Gracias.', 60, TEXTO, DISPLAY, True, line_spacing=0.9)
add_text(s, 0.82, 3.0, 5.6, 0.55, 'Cinecom · historias a un clic.', 19, MUTED, BODY, False, line_spacing=1.1)

takeaways = [
    'React + estado + componentes para toda la interfaz.',
    '24 títulos y 24 tráilers descargados y locales.',
    'Búsqueda, favoritos, detalle y VIP simulados.',
]
for i, text in enumerate(takeaways):
    y = 4.05 + i * 0.46
    add_text(s, 0.85, y, 0.2, 0.22, '✓', 10.5, VERDE, BODY, True)
    add_text(s, 1.12, y, 5.3, 0.28, text, 10.5, MUTED, BODY, True)

# Repo card
add_card(s, 7.35, 1.95, 5.25, 3.38, fill=RGBColor(8, 10, 18), line=RGBColor(60, 65, 92), radius=0.09)
add_text(s, 7.62, 2.2, 4.7, 0.22, 'REPOSITORIO', 8.2, ROSA, BODY, True)
add_text(s, 7.62, 2.52, 4.75, 0.55, 'github.com/Geovani-ol/Cinecom', 15, TEXTO, BODY, True, line_spacing=1.0)
add_text(s, 7.62, 3.22, 4.65, 0.25, 'README con instalación, estructura y componentes.', 9, TENUE, BODY, line_spacing=1.15)
# mini terminal
add_card(s, 7.62, 3.75, 4.65, 1.22, fill=RGBColor(4, 6, 12), line=RGBColor(44, 49, 78), radius=0.06)
add_text(s, 7.82, 3.93, 4.25, 0.22, '$ pnpm install', 10.2, VERDE, MONO, True)
add_text(s, 7.82, 4.22, 4.25, 0.22, '$ pnpm dev', 10.2, TEXTO, MONO, True)
add_text(s, 7.82, 4.52, 4.25, 0.2, '# http://localhost:5173', 9.2, TENUE, MONO)
add_text(s, 7.62, 5.15, 4.6, 0.2, 'Proyecto académico · sin fines comerciales.', 7.5, TENUE, BODY)
chrome(s, 7)


# ============================================================
# NOTAS DEL EXPOSITOR
# ============================================================
notes = [
    (
        "[0:00 – 0:20] APERTURA\n"
        "Buenos días. Les presento Cinecom, un catálogo interactivo de películas y series hecho con React. "
        "La idea es simple: explorar contenido, consultar su información, guardar favoritos y vivir una experiencia "
        "tipo streaming, con tráiler y una suscripción VIP simulada. Todo funciona sin backend.\n\n"
        "TIP: Señala la portada y di: “la estética está inspirada en plataformas de streaming”."
    ),
    (
        "[0:20 – 1:00] QUÉ ES\n"
        "Cinecom reúne 24 títulos: 18 películas y 6 series, definidos en un arreglo local. El usuario puede buscar "
        "por título, filtrar por tipo o género, abrir una ficha con sinopsis, reparto y ficha técnica, y guardar "
        "favoritos. Los favoritos y la suscripción se conservan en el navegador. Es una app 100% frontend: "
        "no hay base de datos ni servidor. La información y los recursos viven dentro del proyecto.\n\n"
        "TIP: No leas todas las tarjetas; menciona las cuatro funciones y pasa a tecnología."
    ),
    (
        "[1:00 – 1:45] TECNOLOGÍAS\n"
        "La base es React 19 con TypeScript y Vite. React permite dividir la interfaz en componentes: Navbar, "
        "Tarjeta, ModalDetalle y Reproductor. TypeScript tipa el catálogo y las props. Vite hace el desarrollo y "
        "el build. Todo el estilo es CSS puro con variables y media queries; no usamos una librería de componentes. "
        "El estado principal vive en App y se persiste en LocalStorage. Los datos y recursos son locales.\n\n"
        "TIP: Si preguntan por el estado, di que App concentra vista, búsqueda, filtros, favoritos y suscripción."
    ),
    (
        "[1:45 – 2:30] INSTALACIÓN\n"
        "Para instalarlo solo se necesita Node 20 o superior y pnpm. Se clona el repositorio, se ejecutan "
        "pnpm install y pnpm dev. Vite levanta la app en localhost:5173. Para producción, pnpm build genera dist. "
        "No hay backend, variables de entorno ni base de datos: los pósters, tráilers y fuentes ya están en public. "
        "Si usan npm, también funciona con npm install y npm run dev.\n\n"
        "TIP: Muestra la terminal solo si el tiempo lo permite; los comandos ya están en pantalla."
    ),
    (
        "[2:30 – 3:20] CÓMO SE USA\n"
        "Este es el recorrido: uno, explorar el catálogo; dos, buscar o filtrar; tres, abrir la ficha y ver "
        "sinopsis, reparto o títulos similares; cuatro, guardar favoritos con el corazón, que persisten al recargar; "
        "y cinco, ver el tráiler o pasar por la suscripción VIP. El detalle muestra la información completa y desde "
        "ahí se puede reproducir el tráiler local.\n\n"
        "TIP: Haz clic en una tarjeta mientras hablas; la demo en vivo puede empezar aquí."
    ),
    (
        "[3:20 – 4:20] DEMO\n"
        "Para la demo: entramos al catálogo, filtramos, abrimos Dune, vemos el tráiler, guardamos un favorito y "
        "probamos el flujo VIP. Sin suscripción, “Ver con VIP” lleva a los planes. Elegimos el plan mensual y usamos "
        "la tarjeta de prueba 4242 4242 4242 4242, vencimiento 12/30 y CVV 123. Al pagar se activa la membresía y se "
        "habilita el reproductor. El reproductor es una simulación: barra, pausa, adelantar y pantalla completa, "
        "identificado como modo demostración. No hay cobro real.\n\n"
        "TIP: Si algo falla, vuelve al catálogo y muestra favoritos; es la función más rápida de demostrar."
    ),
    (
        "[4:20 – 4:40] CIERRE\n"
        "En resumen: Cinecom es una app React completa en el frontend, con 24 títulos, tráilers locales, favoritos "
        "persistentes y una experiencia VIP simulada. El código y el README están en el repositorio. "
        "Muchas gracias; ¿preguntas?\n\n"
        "TIP: Deja la diapositiva de cierre visible durante las preguntas."
    ),
]

for slide, note in zip(prs.slides, notes):
    slide.notes_slide.notes_text_frame.text = note

# Metadatos del documento
prs.core_properties.title = 'Cinecom — Presentación del proyecto'
prs.core_properties.subject = 'T3 Proyecto: Explorador de películas y series'
prs.core_properties.author = 'Geovani Olvera'
prs.core_properties.comments = 'Presentación de 5 minutos + notas del expositor.'

prs.save(OUT)
print('Guardado:', OUT)
print('Diapositivas:', len(prs.slides))
print('Tamaño:', OUT.stat().st_size // 1024, 'KB')
