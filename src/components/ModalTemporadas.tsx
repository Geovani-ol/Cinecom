import { useState } from 'react'
import type { Contenido } from '../data/peliculas'
import { obtenerTemporadas, type Episodio } from '../data/episodios'
import { Icono } from './Icono'
import { unirClases } from '../utils'

type Props = {
  contenido: Contenido
  suscrito: boolean
  onCerrar: () => void
  onReproducir: (episodio: Episodio, temporada: number) => void
  onSolicitarVip: () => void
}

export function ModalTemporadas({ contenido, suscrito, onCerrar, onReproducir, onSolicitarVip }: Props) {
  const temporadas = obtenerTemporadas(contenido.slug)
  const [temporadaActiva, setTemporadaActiva] = useState(temporadas[0]?.numero ?? 1)
  const temporada = temporadas.find((item) => item.numero === temporadaActiva) ?? temporadas[0]

  return (
    <div className="overlay overlay--temporadas" onMouseDown={onCerrar}>
      <article
        className="temporadas"
        role="dialog"
        aria-modal="true"
        aria-label={`Temporadas y episodios de ${contenido.titulo}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="temporadas__hero" style={{ backgroundImage: `url(${contenido.backdrop})` }}>
          <div className="temporadas__hero-velo" />
          <button type="button" className="detalle__cerrar" onClick={onCerrar}>
            <span>ESC</span>
            <Icono nombre="cerrar" size={18} />
          </button>
          <div className="temporadas__hero-info">
            <div className="detalle__badges">
              <span className="badge badge--tipo">Serie</span>
              <span className="badge badge--calidad">
                <Icono nombre={suscrito ? 'corona' : 'candado'} size={10} />
                {suscrito ? 'VIP activo' : 'Vista previa'}
              </span>
              {contenido.calidad.slice(0, 2).map((calidad) => (
                <span key={calidad} className="badge badge--calidad">{calidad}</span>
              ))}
            </div>
            <h2 className="temporadas__titulo">{contenido.titulo}</h2>
            <p className="temporadas__subtitulo">
              {temporadas.length} {temporadas.length === 1 ? 'temporada' : 'temporadas'} · {contenido.episodios} episodios · {contenido.anio}
            </p>
          </div>
        </header>

        <div className="temporadas__cuerpo">
          <aside className="temporadas__menu" aria-label="Seleccionar temporada">
            <span className="seccion__eyebrow">Temporadas</span>
            {temporadas.map((item) => (
              <button
                key={item.numero}
                type="button"
                className={unirClases('temporada-btn', item.numero === temporada?.numero && 'temporada-btn--activo')}
                onClick={() => setTemporadaActiva(item.numero)}
              >
                <span className="temporada-btn__numero">T{item.numero}</span>
                <span className="temporada-btn__datos">
                  <strong>Temporada {item.numero}</strong>
                  <small>{item.episodios.length} episodios · {item.anio}</small>
                </span>
              </button>
            ))}
          </aside>

          <section className="temporadas__episodios">
            {!suscrito && (
              <div className="temporadas__gate">
                <div>
                  <Icono nombre="candado" size={15} />
                  <strong>Vista previa</strong>
                  <span className="temporadas__gate-punto">·</span>
                  <span>Activa VIP para reproducir los episodios.</span>
                </div>
                <button type="button" className="boton boton--primario" onClick={onSolicitarVip}>
                  <Icono nombre="corona" size={14} /> Activar VIP
                </button>
              </div>
            )}
            {temporada ? (
              <>
                <div className="temporadas__cabecera">
                  <div>
                    <h3>Temporada {temporada.numero}</h3>
                    <p>{temporada.episodios.length} episodios · {temporada.anio}</p>
                  </div>
                  <span className={`temporadas__vip${suscrito ? '' : ' temporadas__vip--bloqueado'}`}>
                    <Icono nombre={suscrito ? 'corona' : 'candado'} size={13} />
                    {suscrito ? 'Incluido en VIP' : 'Solo VIP'}
                  </span>
                </div>
                <div className="episodios">
                  {temporada.episodios.map((episodio) => (
                    <button
                      key={episodio.numero}
                      type="button"
                      className={`episodio${suscrito ? '' : ' episodio--bloqueado'}`}
                      onClick={() => (suscrito ? onReproducir(episodio, temporada.numero) : onSolicitarVip())}
                      aria-label={suscrito
                        ? `Reproducir ${episodio.titulo}`
                        : `Activar VIP para reproducir ${episodio.titulo}`}
                    >
                      <span className="episodio__numero">{String(episodio.numero).padStart(2, '0')}</span>
                      <span className="episodio__datos">
                        <strong>{episodio.titulo}</strong>
                        <small>{episodio.duracion} min · {episodio.anio}</small>
                      </span>
                      <span className="episodio__accion">
                        <Icono nombre={suscrito ? 'play' : 'candado'} size={14} relleno={suscrito} />
                        {suscrito ? 'Reproducir' : 'Solo VIP'}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="temporadas__vacio">
                <Icono nombre="info" size={24} />
                <p>Todavía no hay episodios disponibles para esta serie.</p>
              </div>
            )}
          </section>
        </div>

        <footer className="temporadas__pie">
          <span>
            <Icono nombre="info" size={13} />
            {suscrito
              ? 'Elige un episodio para verlo en el reproductor de demostración.'
              : 'Puedes explorar temporadas y episodios; activa VIP para reproducirlos.'}
          </span>
          <span className="temporadas__demo">Sin cobros reales · modo demo</span>
        </footer>
      </article>
    </div>
  )
}
