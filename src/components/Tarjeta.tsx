import type { KeyboardEvent } from 'react'
import type { Contenido } from '../data/peliculas'
import { Icono } from './Icono'
import { unirClases } from '../utils'

type Props = {
  contenido: Contenido
  favorito: boolean
  onAbrir: (contenido: Contenido) => void
  onFavorito: (contenido: Contenido) => void
  posicion?: number
}

export function Tarjeta({ contenido, favorito, onAbrir, onFavorito, posicion }: Props) {
  const tipo = contenido.tipo === 'pelicula' ? 'Película' : 'Serie'

  const abrirConTeclado = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onAbrir(contenido)
    }
  }

  return (
    <article
      className="tarjeta"
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${contenido.titulo}`}
      onClick={() => onAbrir(contenido)}
      onKeyDown={abrirConTeclado}
    >
      <div className="tarjeta__poster">
        <img
          className="tarjeta__imagen"
          src={contenido.poster}
          alt={`Póster de ${contenido.titulo}`}
          loading="lazy"
          decoding="async"
        />
        <div className="tarjeta__velo" />
        <span className="tarjeta__insignia">
          {tipo} <b>{contenido.calidad[0]}</b>
        </span>
        <button
          type="button"
          className={unirClases('tarjeta__corazon', favorito && 'tarjeta__corazon--activo')}
          onClick={(event) => {
            event.stopPropagation()
            onFavorito(contenido)
          }}
          aria-label={favorito ? `Quitar ${contenido.titulo} de favoritos` : `Agregar ${contenido.titulo} a favoritos`}
          title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Icono nombre="corazon" size={16} relleno={favorito} />
        </button>
        <span className="tarjeta__play" aria-hidden="true">
          <Icono nombre="play" size={19} relleno />
        </span>
        {posicion !== undefined && <span className="tarjeta__rank">{String(posicion).padStart(2, '0')}</span>}
      </div>

      <div className="tarjeta__info">
        <div className="tarjeta__linea">
          <h3 className="tarjeta__titulo">{contenido.titulo}</h3>
          <span className="tarjeta__puntuacion">
            <Icono nombre="estrella" size={12} relleno />
            {contenido.puntuacion.toFixed(1)}
          </span>
        </div>
        <p className="tarjeta__meta">
          {contenido.anio} <span>·</span> {contenido.duracion}
        </p>
        <p className="tarjeta__generos">{contenido.generos.slice(0, 2).join(' · ')}</p>
      </div>
    </article>
  )
}
