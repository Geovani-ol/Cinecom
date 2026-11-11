import { useState } from 'react'
import type { Contenido } from '../data/peliculas'
import type { FiltroTipo } from '../types'
import { Tarjeta } from '../components/Tarjeta'
import { FilaContenido } from '../components/FilaContenido'
import { Icono } from '../components/Icono'
import { duracionEnSegundos, unirClases } from '../utils'

type Props = {
  catalogo: Contenido[]
  favoritos: number[]
  onAbrir: (contenido: Contenido) => void
  onFavorito: (contenido: Contenido) => void
  onAbrirCatalogo: () => void
  onLimpiar: () => void
}

export function Favoritos({
  catalogo,
  favoritos,
  onAbrir,
  onFavorito,
  onAbrirCatalogo,
  onLimpiar,
}: Props) {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos')

  const guardados = favoritos
    .map((id) => catalogo.find((item) => item.id === id))
    .filter((item): item is Contenido => Boolean(item))

  const peliculas = guardados.filter((item) => item.tipo === 'pelicula').length
  const series = guardados.filter((item) => item.tipo === 'serie').length
  const destacado = guardados[0] ?? catalogo[0]
  const promedio = guardados.length
    ? (guardados.reduce((total, item) => total + item.puntuacion, 0) / guardados.length).toFixed(1)
    : '0.0'
  const horas = Math.round(
    guardados.reduce((total, item) => {
      if (item.tipo === 'serie') return total + (item.episodios ?? 0) * 0.85
      return total + duracionEnSegundos(item) / 3600
    }, 0),
  )

  const visibles = guardados.filter((item) => filtroTipo === 'todos' || item.tipo === filtroTipo)

  const generosFavoritos = [...new Set(guardados.flatMap((item) => item.generos))]
  const recomendados = catalogo
    .filter((item) => !favoritos.includes(item.id))
    .filter((item) => item.generos.some((genero) => generosFavoritos.includes(genero)))
    .sort((a, b) => b.puntuacion - a.puntuacion)
    .slice(0, 8)

  const limpiar = () => {
    if (window.confirm('¿Quieres quitar todos los títulos de tu lista de favoritos?')) {
      onLimpiar()
    }
  }

  return (
    <div className="pagina pagina--favoritos">
      <header className="favoritos-hero">
        <div className="favoritos-hero__fondo" style={{ backgroundImage: `url(${destacado.backdrop})` }} />
        <div className="favoritos-hero__degradado" />
        <div className="favoritos-hero__contenido">
          <span className="seccion__eyebrow">
            <Icono nombre="marcador" size={14} /> Colección personal · guardada en este navegador
          </span>
          <div className="favoritos-hero__titulo-linea">
            <h1>Mis favoritos</h1>
            <span className="favoritos-hero__contador">{guardados.length}</span>
          </div>
          <p className="favoritos-hero__texto">
            Tu biblioteca personal de películas y series. Todo lo que guardaste para no perderlo
            de vista, en un solo lugar.
          </p>

          <div className="favoritos-hero__stats">
            <div><strong>{guardados.length}</strong><span>Títulos</span></div>
            <div><strong>{peliculas}</strong><span>Películas</span></div>
            <div><strong>{series}</strong><span>Series</span></div>
            <div><strong>{promedio}</strong><span>Promedio ★</span></div>
            <div><strong>{horas} h</strong><span>Por disfrutar</span></div>
          </div>

          <div className="favoritos-hero__acciones">
            <button type="button" className="boton boton--primario" onClick={onAbrirCatalogo}>
              <Icono nombre="filme" size={17} /> Explorar catálogo
            </button>
            {guardados.length > 0 && (
              <button type="button" className="boton boton--cristal" onClick={limpiar}>
                <Icono nombre="papelera" size={16} /> Limpiar lista
              </button>
            )}
            <span className="favoritos-hero__sync">
              <Icono nombre="escudo" size={14} /> Sincronizado con LocalStorage
            </span>
          </div>
        </div>
      </header>

      {guardados.length === 0 ? (
        <div className="vacio vacio--favoritos">
          <span className="vacio__icono"><Icono nombre="corazon" size={34} /></span>
          <h2>Tu lista todavía está esperando</h2>
          <p>
            Pasa el cursor por un póster y toca el corazón para guardar películas y series.
            Las vas a encontrar aquí cuando quieras.
          </p>
          <button type="button" className="boton boton--primario" onClick={onAbrirCatalogo}>
            <Icono nombre="destellos" size={17} /> Descubrir títulos
          </button>
        </div>
      ) : (
        <>
          <section className="barra-favoritos">
            <div className="filtros__tipo" role="group" aria-label="Filtrar favoritos por tipo">
              <button
                type="button"
                className={unirClases('filtro-tipo', filtroTipo === 'todos' && 'filtro-tipo--activo')}
                onClick={() => setFiltroTipo('todos')}
              >
                Todos <span>{guardados.length}</span>
              </button>
              <button
                type="button"
                className={unirClases('filtro-tipo', filtroTipo === 'pelicula' && 'filtro-tipo--activo')}
                onClick={() => setFiltroTipo('pelicula')}
              >
                Películas <span>{peliculas}</span>
              </button>
              <button
                type="button"
                className={unirClases('filtro-tipo', filtroTipo === 'serie' && 'filtro-tipo--activo')}
                onClick={() => setFiltroTipo('serie')}
              >
                Series <span>{series}</span>
              </button>
            </div>
            <span className="barra-favoritos__nota">
              <Icono nombre="calendario" size={14} /> Agregados recientemente
            </span>
          </section>

          {visibles.length === 0 ? (
            <div className="vacio vacio--mini">
              <span className="vacio__icono"><Icono nombre="filtro" size={26} /></span>
              <h2>No hay {filtroTipo === 'pelicula' ? 'películas' : 'series'} en tu lista</h2>
              <p>Cambia el filtro o agrega títulos desde el catálogo.</p>
              <button type="button" className="boton boton--primario" onClick={() => setFiltroTipo('todos')}>
                Ver todos mis favoritos
              </button>
            </div>
          ) : (
            <div className="grid-peliculas">
              {visibles.map((item) => (
                <Tarjeta
                  key={item.id}
                  contenido={item}
                  favorito
                  onAbrir={onAbrir}
                  onFavorito={onFavorito}
                />
              ))}
            </div>
          )}

          {recomendados.length > 0 && (
            <div className="seccion-favoritos">
              <FilaContenido
                titulo="Porque guardaste estas historias"
                descripcion="Una selección basada en los géneros que ya tienes en tu colección."
                items={recomendados}
                favoritos={favoritos}
                onAbrir={onAbrir}
                onFavorito={onFavorito}
                onVerTodo={onAbrirCatalogo}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
