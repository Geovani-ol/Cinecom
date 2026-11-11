import { useRef } from 'react'
import type { Contenido } from '../data/peliculas'
import { Tarjeta } from './Tarjeta'
import { Icono } from './Icono'

type Props = {
  titulo: string
  descripcion?: string
  items: Contenido[]
  favoritos: number[]
  numerada?: boolean
  onAbrir: (contenido: Contenido) => void
  onFavorito: (contenido: Contenido) => void
  onVerTodo: () => void
}

export function FilaContenido({
  titulo,
  descripcion,
  items,
  favoritos,
  numerada = false,
  onAbrir,
  onFavorito,
  onVerTodo,
}: Props) {
  const pista = useRef<HTMLDivElement>(null)

  const mover = (direccion: number) => {
    pista.current?.scrollBy({ left: direccion * 620, behavior: 'smooth' })
  }

  if (items.length === 0) return null

  return (
    <section className="seccion">
      <div className="seccion__cabecera">
        <div className="seccion__titulo-grupo">
          <span className="seccion__eyebrow">Cinecom selecciona</span>
          <h2 className="seccion__titulo">{titulo}</h2>
          {descripcion && <p className="seccion__descripcion">{descripcion}</p>}
        </div>
        <div className="seccion__acciones">
          <button type="button" className="boton-redondo" onClick={() => mover(-1)} aria-label="Desplazar a la izquierda">
            <Icono nombre="izquierda" size={18} />
          </button>
          <button type="button" className="boton-redondo" onClick={() => mover(1)} aria-label="Desplazar a la derecha">
            <Icono nombre="derecha" size={18} />
          </button>
          <button type="button" className="boton-texto" onClick={onVerTodo}>
            Ver todo <Icono nombre="flecha-derecha" size={15} />
          </button>
        </div>
      </div>

      <div className="fila__scroll" ref={pista}>
        {items.map((item, indice) => (
          <div className="fila__item" key={item.id}>
            <Tarjeta
              contenido={item}
              favorito={favoritos.includes(item.id)}
              onAbrir={onAbrir}
              onFavorito={onFavorito}
              posicion={numerada ? indice + 1 : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
