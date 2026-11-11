import type { Contenido } from '../data/peliculas'
import type { FiltroTipo, Orden } from '../types'
import { Tarjeta } from '../components/Tarjeta'
import { Icono } from '../components/Icono'
import { generosDelCatalogo, normalizar, unirClases } from '../utils'

type Props = {
  catalogo: Contenido[]
  favoritos: number[]
  busqueda: string
  filtroTipo: FiltroTipo
  filtroGenero: string
  orden: Orden
  onBuscar: (texto: string) => void
  onTipo: (tipo: FiltroTipo) => void
  onGenero: (genero: string) => void
  onOrden: (orden: Orden) => void
  onLimpiar: () => void
  onAbrir: (contenido: Contenido) => void
  onFavorito: (contenido: Contenido) => void
}

export function Catalogo({
  catalogo,
  favoritos,
  busqueda,
  filtroTipo,
  filtroGenero,
  orden,
  onBuscar,
  onTipo,
  onGenero,
  onOrden,
  onLimpiar,
  onAbrir,
  onFavorito,
}: Props) {
  const generos = generosDelCatalogo(catalogo)
  const peliculas = catalogo.filter((item) => item.tipo === 'pelicula').length
  const series = catalogo.filter((item) => item.tipo === 'serie').length

  const filtrados = catalogo.filter((item) => {
    const coincideTexto = normalizar(item.titulo).includes(normalizar(busqueda))
      || normalizar(item.tituloOriginal).includes(normalizar(busqueda))
    const coincideTipo = filtroTipo === 'todos' || item.tipo === filtroTipo
    const coincideGenero = filtroGenero === 'Todos' || item.generos.includes(filtroGenero)
    return coincideTexto && coincideTipo && coincideGenero
  })

  const posicion = new Map(catalogo.map((item, indice) => [item.id, indice]))

  const ordenados = [...filtrados].sort((a, b) => {
    if (orden === 'puntuacion') return b.puntuacion - a.puntuacion
    if (orden === 'recientes') return b.anio - a.anio
    if (orden === 'az') return a.titulo.localeCompare(b.titulo, 'es')
    if (a.destacado && !b.destacado) return -1
    if (!a.destacado && b.destacado) return 1
    if (a.destacado && b.destacado) {
      return (posicion.get(a.id) ?? 0) - (posicion.get(b.id) ?? 0)
    }
    return b.puntuacion - a.puntuacion
  })

  const hayFiltros = Boolean(busqueda) || filtroTipo !== 'todos' || filtroGenero !== 'Todos'

  return (
    <div className="pagina">
      <header className="cabecera-pagina">
        <div>
          <span className="seccion__eyebrow"><Icono nombre="filme" size={14} /> Catálogo Cinecom</span>
          <h1 className="cabecera-pagina__titulo">Encuentra tu próxima historia</h1>
          <p className="cabecera-pagina__texto">
            {catalogo.length} títulos seleccionados entre películas y series. Busca, filtra y guarda
            todo lo que quieras ver después.
          </p>
        </div>
        <div className="cabecera-pagina__stats">
          <div className="stat"><strong>{catalogo.length}</strong><span>Títulos</span></div>
          <div className="stat"><strong>{peliculas}</strong><span>Películas</span></div>
          <div className="stat"><strong>{series}</strong><span>Series</span></div>
          <div className="stat"><strong>4K</strong><span>Calidad</span></div>
        </div>
      </header>

      <section className="filtros">
        <div className="filtros__superior">
          <label className="buscador-grande">
            <Icono nombre="buscar" size={19} />
            <input
              type="search"
              value={busqueda}
              placeholder="Buscar por título, por ejemplo: Dune, Arcane..."
              aria-label="Buscar títulos en el catálogo"
              onChange={(event) => onBuscar(event.target.value)}
            />
            {busqueda && (
              <button type="button" onClick={() => onBuscar('')} aria-label="Limpiar búsqueda">
                <Icono nombre="cerrar" size={15} />
              </button>
            )}
          </label>

          <div className="filtros__tipo" role="group" aria-label="Filtrar por tipo">
            <button
              type="button"
              className={unirClases('filtro-tipo', filtroTipo === 'todos' && 'filtro-tipo--activo')}
              onClick={() => onTipo('todos')}
            >
              Todos <span>{catalogo.length}</span>
            </button>
            <button
              type="button"
              className={unirClases('filtro-tipo', filtroTipo === 'pelicula' && 'filtro-tipo--activo')}
              onClick={() => onTipo('pelicula')}
            >
              Películas <span>{peliculas}</span>
            </button>
            <button
              type="button"
              className={unirClases('filtro-tipo', filtroTipo === 'serie' && 'filtro-tipo--activo')}
              onClick={() => onTipo('serie')}
            >
              Series <span>{series}</span>
            </button>
          </div>
        </div>

        <div className="filtros__generos">
          <div className="chips">
            <button
              type="button"
              className={unirClases('chip', filtroGenero === 'Todos' && 'chip--activo')}
              onClick={() => onGenero('Todos')}
            >
              Todos los géneros
            </button>
            {generos.map((genero) => (
              <button
                type="button"
                key={genero.nombre}
                className={unirClases('chip', filtroGenero === genero.nombre && 'chip--activo')}
                onClick={() => onGenero(genero.nombre)}
              >
                {genero.nombre} <span className="chip__cuenta">{genero.cantidad}</span>
              </button>
            ))}
          </div>

          <label className="select-envoltura">
            <Icono nombre="filtro" size={15} />
            <select
              className="select"
              value={orden}
              onChange={(event) => onOrden(event.target.value as Orden)}
              aria-label="Ordenar catálogo"
            >
              <option value="destacados">Destacados</option>
              <option value="puntuacion">Mejor valoradas</option>
              <option value="recientes">Más recientes</option>
              <option value="az">A – Z</option>
            </select>
            <Icono nombre="abajo" size={14} />
          </label>
        </div>
      </section>

      <div className="resultado-info">
        <p>
          <strong>{ordenados.length}</strong> {ordenados.length === 1 ? 'título encontrado' : 'títulos encontrados'}
          {filtroGenero !== 'Todos' && <span> · {filtroGenero}</span>}
          {busqueda && <span> · “{busqueda}”</span>}
        </p>
        {hayFiltros && (
          <button type="button" className="boton-texto boton-texto--suave" onClick={onLimpiar}>
            <Icono nombre="cerrar" size={14} /> Limpiar filtros
          </button>
        )}
      </div>

      {ordenados.length > 0 ? (
        <div className="grid-peliculas">
          {ordenados.map((item) => (
            <Tarjeta
              key={item.id}
              contenido={item}
              favorito={favoritos.includes(item.id)}
              onAbrir={onAbrir}
              onFavorito={onFavorito}
            />
          ))}
        </div>
      ) : (
        <div className="vacio">
          <span className="vacio__icono"><Icono nombre="buscar" size={30} /></span>
          <h2>No encontramos resultados</h2>
          <p>Prueba con otro título o quita algunos filtros para ampliar la búsqueda.</p>
          <button type="button" className="boton boton--primario" onClick={onLimpiar}>
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}
