import { useState } from 'react'
import type { Contenido } from '../data/peliculas'
import { Icono } from './Icono'
import { idiomaTipo } from '../utils'

type Props = {
  contenido: Contenido
  onCerrar: () => void
}

export function ModalTrailer({ contenido, onCerrar }: Props) {
  const [error, setError] = useState(false)

  return (
    <div className="overlay overlay--trailer" onMouseDown={onCerrar}>
      <div
        className="trailer"
        role="dialog"
        aria-modal="true"
        aria-label={`Tráiler de ${contenido.titulo}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="trailer__cabecera">
          <div>
            <span className="seccion__eyebrow">Tráiler oficial</span>
            <h2 className="trailer__titulo">{contenido.titulo}</h2>
          </div>
          <button type="button" className="detalle__cerrar" onClick={onCerrar}>
            <span>ESC</span>
            <Icono nombre="cerrar" size={18} />
          </button>
        </div>

        <div className="trailer__video">
          {error ? (
            <div className="trailer__fallback" style={{ backgroundImage: `url(${contenido.backdrop})` }}>
              <Icono nombre="filme" size={34} />
              <p>No se pudo cargar el tráiler local.</p>
              <span>Intenta de nuevo o abre la ficha de la película.</span>
            </div>
          ) : (
            <video
              key={contenido.id}
              src={contenido.trailer}
              poster={contenido.backdrop}
              controls
              autoPlay
              playsInline
              onError={() => setError(true)}
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          )}
        </div>

        <div className="trailer__pie">
          <div className="detalle__meta">
            <span>{idiomaTipo(contenido)}</span>
            <span className="punto" />
            <span>{contenido.anio}</span>
            <span className="punto" />
            <span>{contenido.duracion}</span>
            <span className="punto" />
            <span className="meta-estrella"><Icono nombre="estrella" size={12} relleno /> {contenido.puntuacion.toFixed(1)}</span>
          </div>
          <div className="trailer__calidades">
            {contenido.calidad.map((calidad) => <span key={calidad} className="badge-tech">{calidad}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}
