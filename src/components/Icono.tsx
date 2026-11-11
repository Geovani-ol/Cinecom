import type { ReactNode } from 'react'

export type NombreIcono =
  | 'buscar'
  | 'corazon'
  | 'play'
  | 'pausa'
  | 'estrella'
  | 'cerrar'
  | 'filme'
  | 'corona'
  | 'check'
  | 'abajo'
  | 'izquierda'
  | 'derecha'
  | 'reloj'
  | 'calendario'
  | 'compartir'
  | 'marcador'
  | 'candado'
  | 'usuario'
  | 'tarjeta'
  | 'destellos'
  | 'volumen'
  | 'silencio'
  | 'pantalla'
  | 'atras'
  | 'adelante'
  | 'flecha-izquierda'
  | 'flecha-derecha'
  | 'papelera'
  | 'filtro'
  | 'info'
  | 'escudo'
  | 'monitor'
  | 'audifonos'
  | 'menu'
  | 'mas'
  | 'descargar'
  | 'dispositivo'
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'youtube'

const ICONOS: Record<NombreIcono, ReactNode> = {
  buscar: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <path d="m20.5 20.5-4.6-4.6" />
    </>
  ),
  corazon: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  play: <path d="m7 4 13 8-13 8V4Z" />,
  pausa: (
    <>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </>
  ),
  estrella: (
    <polygon points="12 2.5 15.1 8.7 22 9.7 17 14.6 18.2 21.5 12 18.2 5.8 21.5 7 14.6 2 9.7 8.9 8.7 12 2.5" />
  ),
  cerrar: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  filme: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 3v18M17 3v18M3 8h4M17 8h4M3 16h4M17 16h4M7 12h10" />
    </>
  ),
  corona: (
    <>
      <path d="m2.5 5 3.2 12h12.6l3.2-12-6.2 6.5L12 4.5l-3.3 7L2.5 5Z" />
      <path d="M6 21h12" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  abajo: <path d="m6 9 6 6 6-6" />,
  izquierda: <path d="m15 18-6-6 6-6" />,
  derecha: <path d="m9 18 6-6-6-6" />,
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  calendario: (
    <>
      <path d="M8 2v4M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  compartir: (
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.3 13.5 7.4 4.3M15.7 6.2 8.3 10.5" />
    </>
  ),
  marcador: <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />,
  candado: (
    <>
      <rect x="3" y="10" width="18" height="11" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </>
  ),
  usuario: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  tarjeta: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </>
  ),
  destellos: (
    <>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </>
  ),
  volumen: (
    <>
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  silencio: (
    <>
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </>
  ),
  pantalla: (
    <>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </>
  ),
  atras: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  adelante: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  'flecha-izquierda': (
    <>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </>
  ),
  'flecha-derecha': (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  papelera: (
    <>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  filtro: <path d="M3 5h18l-7 8.2V20l-4-2v-4.8L3 5Z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  escudo: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1v7Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  audifonos: (
    <>
      <path d="M3 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a10 10 0 0 1 20 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  mas: <path d="M12 5v14M5 12h14" />,
  descargar: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  dispositivo: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M11 18h2" />
    </>
  ),
  facebook: <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  x: <path d="m4 4 16 16M20 4 4 20" />,
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
}

type Props = {
  nombre: NombreIcono
  size?: number
  relleno?: boolean
  className?: string
  strokeWidth?: number
}

export function Icono({
  nombre,
  size = 20,
  relleno = false,
  className,
  strokeWidth = 1.8,
}: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={relleno ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONOS[nombre]}
    </svg>
  )
}
