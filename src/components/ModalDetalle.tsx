import { useState } from 'react'
import type { Contenido } from '../data/peliculas'
import { Icono } from './Icono'
import { idiomaTipo, unirClases } from '../utils'

type Pestana = 'sinopsis' | 'reparto' | 'similares'

type Props = {
  contenido: Contenido
  similares: Contenido[]
  favorito: boolean
  suscrito: boolean
  onCerrar: () => void
  onFavorito: (contenido: Contenido) => void
  onTrailer: (contenido: Contenido) => void
  onVerPelicula: (contenido: Contenido) => void
  onCompartir: (contenido: Contenido) => void
  onSeleccionar: (contenido: Contenido) => void
}

export function ModalDetalle({
  contenido,
  similares,
  favorito,
  suscrito,
  onCerrar,
  onFavorito,
  onTrailer,
  onVerPelicula,
  onCompartir,
  onSeleccionar,
}: Props) {
  const [pestana, setPestana] = useState<Pestana>('sinopsis')

  const tipo = idiomaTipo(contenido)
  const cabecera = `detalle-${contenido.id}`
  const coincidencia = Math.min(99, Math.round(88 + contenido.puntuacion * 1.1))

  return (
    <div className="overlay overlay--detalle" onMouseDown={onCerrar}>
      <article
        className="detalle"
        role="dialog"
        aria-modal="true"
        aria-labelledby={cabecera}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          className="detalle__hero"
          style={{ backgroundImage: `url(${contenido.backdrop})` }}
        >
          <div className="detalle__hero-degradado" />
          <button type="button" className="detalle__cerrar" onClick={onCerrar}>
            <span>ESC</span>
            <Icono nombre="cerrar" size={18} />
          </button>

          <div className="detalle__hero-contenido">
            <div className="detalle__badges">
              <span className="badge badge--tipo">{tipo}</span>
              {contenido.calidad.slice(0, 2).map((calidad) => (
                <span key={calidad} className="badge badge--calidad">{calidad}</span>
              ))}
              <span className="badge badge--clasificacion">{contenido.clasificacion}</span>
            </div>

            <h2 id={cabecera} className="detalle__titulo">{contenido.titulo}</h2>
            <p className="detalle__original">{contenido.tituloOriginal}</p>
            <p className="detalle__tagline">“{contenido.tagline}”</p>

            <div className="detalle__meta">
              <span>{contenido.anio}</span>
              <span className="punto" />
              <span>{contenido.duracion}</span>
              <span className="punto" />
              <span className="meta-estrella">
                <Icono nombre="estrella" size={13} relleno /> {contenido.puntuacion.toFixed(1)}
              </span>
              <span className="punto" />
              <span>{coincidencia}% de coincidencia</span>
              <span className="punto" />
              <span className="detalle__edad">{contenido.clasificacion}</span>
            </div>

            <div className="detalle__acciones">
              <button type="button" className="boton boton--primario" onClick={() => onTrailer(contenido)}>
                <Icono nombre="play" size={17} relleno /> Ver tráiler
              </button>
              <button type="button" className="boton boton--vip" onClick={() => onVerPelicula(contenido)}>
                {suscrito ? <Icono nombre="play" size={16} relleno /> : <Icono nombre="candado" size={16} />}
                {suscrito ? 'Ver película' : 'Ver con VIP'}
              </button>
              <button
                type="button"
                className={unirClases('boton-icono', favorito && 'boton-icono--activo')}
                onClick={() => onFavorito(contenido)}
                aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Icono nombre="corazon" size={19} relleno={favorito} />
              </button>
              <button
                type="button"
                className="boton-icono"
                onClick={() => onCompartir(contenido)}
                aria-label="Compartir título"
                title="Compartir título"
              >
                <Icono nombre="compartir" size={19} />
              </button>
            </div>
          </div>
        </div>

        <div className="detalle__cuerpo">
          <div className="detalle__principal">
            <div className="tabs" role="tablist" aria-label="Información del título">
              <button
                type="button"
                role="tab"
                aria-selected={pestana === 'sinopsis'}
                className={unirClases('tab', pestana === 'sinopsis' && 'tab--activo')}
                onClick={() => setPestana('sinopsis')}
              >
                Sinopsis
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pestana === 'reparto'}
                className={unirClases('tab', pestana === 'reparto' && 'tab--activo')}
                onClick={() => setPestana('reparto')}
              >
                Reparto
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pestana === 'similares'}
                className={unirClases('tab', pestana === 'similares' && 'tab--activo')}
                onClick={() => setPestana('similares')}
              >
                Títulos similares
              </button>
            </div>

            {pestana === 'sinopsis' && (
              <div className="detalle__seccion">
                <p className="detalle__sinopsis">{contenido.sinopsis}</p>
                <div className="generos-lista">
                  {contenido.generos.map((genero) => (
                    <span key={genero} className="chip chip--genero">{genero}</span>
                  ))}
                </div>
                <div className="detalle__aviso">
                  <Icono nombre="destellos" size={17} />
                  <p>
                    Disfruta de <strong>{contenido.titulo}</strong> en {contenido.calidad.join(', ')}.
                    {contenido.tipo === 'serie' ? ' Incluye todas las temporadas disponibles.' : ' Disponible para socios VIP.'}
                  </p>
                </div>
              </div>
            )}

            {pestana === 'reparto' && (
              <div className="detalle__seccion">
                <h3 className="detalle__subtitulo">Reparto principal</h3>
                <div className="reparto-grid">
                  {contenido.reparto.map((actor) => (
                    <div className="actor" key={actor.nombre}>
                      <img className="actor__foto" src={actor.foto} alt={`Fotografía de ${actor.nombre}`} loading="lazy" />
                      <div>
                        <p className="actor__nombre">{actor.nombre}</p>
                        <p className="actor__personaje">{actor.personaje}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestana === 'similares' && (
              <div className="detalle__seccion">
                <h3 className="detalle__subtitulo">También te puede gustar</h3>
                <div className="similares">
                  {similares.map((similar) => (
                    <button
                      type="button"
                      className="similar"
                      key={similar.id}
                      onClick={() => onSeleccionar(similar)}
                    >
                      <img src={similar.poster} alt={`Póster de ${similar.titulo}`} loading="lazy" />
                      <div className="similar__info">
                        <span className="similar__titulo">{similar.titulo}</span>
                        <span className="similar__meta">
                          {similar.anio} · <Icono nombre="estrella" size={11} relleno /> {similar.puntuacion.toFixed(1)}
                        </span>
                      </div>
                      <Icono nombre="flecha-derecha" size={16} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="detalle__lateral">
            <div className="ficha">
              <h3 className="ficha__titulo">Ficha técnica</h3>
              <div className="ficha__fila">
                <span className="ficha__clave">{contenido.tipo === 'serie' ? 'Creada por' : 'Dirección'}</span>
                <span className="ficha__valor">{contenido.director}</span>
              </div>
              <div className="ficha__fila">
                <span className="ficha__clave">Año</span>
                <span className="ficha__valor">{contenido.anio}</span>
              </div>
              <div className="ficha__fila">
                <span className="ficha__clave">Duración</span>
                <span className="ficha__valor">{contenido.duracion}</span>
              </div>
              {contenido.tipo === 'serie' && (
                <div className="ficha__fila">
                  <span className="ficha__clave">Episodios</span>
                  <span className="ficha__valor">{contenido.episodios}</span>
                </div>
              )}
              <div className="ficha__fila">
                <span className="ficha__clave">Clasificación</span>
                <span className="ficha__valor">{contenido.clasificacion}</span>
              </div>
              <div className="ficha__fila">
                <span className="ficha__clave">País</span>
                <span className="ficha__valor">{contenido.pais}</span>
              </div>
              <div className="ficha__fila">
                <span className="ficha__clave">Idioma original</span>
                <span className="ficha__valor">{contenido.idioma}</span>
              </div>
              <div className="ficha__fila">
                <span className="ficha__clave">Audio</span>
                <span className="ficha__valor">{contenido.audio}</span>
              </div>
              <div className="ficha__calidades">
                {contenido.calidad.map((calidad) => (
                  <span key={calidad} className="badge-tech">{calidad}</span>
                ))}
              </div>
            </div>

            <div className="panel-vip">
              <div className="panel-vip__icono"><Icono nombre="corona" size={20} /></div>
              <h3>{suscrito ? 'Tu plan VIP está activo' : 'Incluido con Cinecom VIP'}</h3>
              <p>
                {suscrito
                  ? 'Puedes reproducir este título completo en calidad 4K sin anuncios.'
                  : 'Reproduce películas completas, sin anuncios y en la mejor calidad.'}
              </p>
              {!suscrito && (
                <div className="panel-vip__precio">
                  <strong>$9.99</strong> <span>USD / mes</span>
                </div>
              )}
              <button type="button" className="boton boton--primario boton--bloque" onClick={() => onVerPelicula(contenido)}>
                <Icono nombre={suscrito ? 'play' : 'corona'} size={16} relleno={suscrito} />
                {suscrito ? 'Reproducir ahora' : 'Activar VIP y ver'}
              </button>
              <span className="panel-vip__nota">Suscripción simulada para esta demostración.</span>
            </div>

            <p className="detalle__nota">
              <Icono nombre="info" size={14} />
              Tráiler y ficha con fines demostrativos. Los derechos pertenecen a sus distribuidores.
            </p>
          </aside>
        </div>
      </article>
    </div>
  )
}
