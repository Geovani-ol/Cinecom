# Cinecom · Guion para 5 minutos

> Las mismas notas están dentro del PPTX, en la vista del expositor.
> La demo en vivo va aparte (5 minutos).

## 0:00 – 0:20 · Apertura
Buenos días. Les presento **Cinecom**, un catálogo interactivo de películas y series hecho con React. La idea es explorar contenido, consultar su información, guardar favoritos y vivir una experiencia tipo streaming, con tráiler y suscripción VIP simulada. Todo funciona sin backend.

## 0:20 – 1:00 · ¿Qué es?
Cinecom reúne **24 títulos: 18 películas y 6 series** definidos en un arreglo local. El usuario puede buscar por título, filtrar por tipo o género, abrir una ficha con sinopsis, reparto y ficha técnica, y guardar favoritos. Los favoritos y la suscripción se conservan en el navegador. Es una app **100% frontend**: sin base de datos ni servidor.

## 1:00 – 1:45 · Tecnologías
La base es **React 19 con TypeScript y Vite**. React divide la interfaz en componentes: Navbar, Tarjeta, ModalDetalle y Reproductor. TypeScript tipa el catálogo y las props. Vite hace el desarrollo y el build. El estilo es **CSS puro** con variables y media queries. El estado principal vive en `App` y se persiste en **LocalStorage**. Los datos y recursos son locales.

## 1:45 – 2:30 · Instalación
Solo se necesita **Node.js 20+** y **pnpm** (npm también funciona). Se clona el repositorio y se ejecuta:

```bash
pnpm install
pnpm dev
```

Vite levanta la app en `http://localhost:5173`. Para producción, `pnpm build` genera `dist/`. No hay backend, variables de entorno ni base de datos: pósters, tráilers y fuentes ya están en `public/`.

## 2:30 – 3:20 · Cómo se usa
El recorrido tiene cinco pasos:

1. Explorar el catálogo.
2. Buscar o filtrar por tipo/género.
3. Abrir la ficha: sinopsis, reparto y similares.
4. Guardar favoritos con el corazón (persisten al recargar).
5. Ver el tráiler o pasar por la suscripción VIP.

## 3:20 – 4:20 · Demo
- Abrir el catálogo y filtrar.
- Abrir Dune, ver el tráiler y guardar un favorito.
- Probar “Ver con VIP”.
- Elegir un plan y usar la tarjeta de prueba: **4242 4242 4242 4242**, **12/30**, **CVV 123**.
- Al pagar se activa la membresía y se habilita el reproductor.
- Recordar: el pago y la reproducción completa son **simulados**.

## 4:20 – 4:40 · Cierre
En resumen: Cinecom es una app React completa en el frontend, con 24 títulos, tráilers locales, favoritos persistentes y una experiencia VIP simulada. El código y el README están en el repositorio. Muchas gracias, ¿preguntas?

## Checklist para la demo
- [ ] Servidor levantado con `pnpm dev`.
- [ ] Navegador en `http://localhost:5173` (o el puerto que indique Vite).
- [ ] Catálogo visible y búsqueda funcionando.
- [ ] Un favorito guardado para mostrar “Mis favoritos”.
- [ ] Pago de prueba listo.
- [ ] Volumen del equipo activado para el tráiler.
