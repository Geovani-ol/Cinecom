import type { Contenido } from '../data/peliculas'
import type { FiltroTipo, Suscripcion } from '../types'
import { FilaContenido } from '../components/FilaContenido'
import { Icono } from '../components/Icono'
import { generosDelCatalogo, unirClases } from '../utils'

type Props = {
  catalogo: Contenido[]
  favoritos: number[]
  suscripcion: Suscripcion | null
  onAbrir: (contenido: Contenido) => void
  onFavorito: (contenido: Contenido) => void
  onTrailer: (contenido: Contenido) => void
  onVerPelicula: (contenido: Contenido) => void
  onAbrirCatalogo: (tipo?: FiltroTipo) => void
  onGenero: (genero: string) => void
  onVip: () => void
}

const BENEFICIOS = [
  { icono: 'pantalla' as const, titulo: '4K Ultra HD + HDR', texto: 'Cada detalle, como en el cine.' },
  { icono: 'audifonos' as const, titulo: 'Dolby Atmos 5.1', texto: 'Un sonido que te rodea.' },
  { icono: 'escudo' as const, titulo: 'Sin anuncios', texto: 'Solo la historia, sin interrupciones.' },
  { icono: 'dispositivo' as const, titulo: 'Multiplataforma', texto: 'Tu colección en cualquier pantalla.' },
]

export function Inicio({
  catalogo,
  favoritos,
  suscripcion,
  onAbrir,
  onFavorito,
  onTrailer,
  onVerPelicula,
  onAbrirCatalogo,
  onGenero,
  onVip,
}: Props) {
  const hero = catalogo.find((item) => item.slug === 'dune-parte-dos') ?? catalogo[0]
  const [parteUno, ...resto] = hero.titulo.split(':')
  const parteDos = resto.join(':').trim()

  const topDiez = [...catalogo].sort((a, b) => b.puntuacion - a.puntuacion).slice(0, 10)
  const aclamadas = [...catalogo]
    .filter((item) => item.tipo === 'pelicula' && item.puntuacion >= 8.4)
    .sort((a, b) => b.puntuacion - a.puntuacion)
    .slice(0, 8)
  const series = catalogo.filter((item) => item.tipo === 'serie')
  const recientes = [...catalogo].sort((a, b) => b.anio - a.anio).slice(0, 8)
  const generos = generosDelCatalogo(catalogo).slice(0, 10)
  const asistente = catalogo.filter((item) => item.destacado).slice(0, 3)

  const favoritoHero = favoritos.includes(hero.id)

  return (
    <div className="pagina pagina--inicio">
      <section className="hero">
        <div className="hero__fondo" style={{ backgroundImage: `url(${hero.backdrop})` }} />
        <div className="hero__degradado" />

        <div className="hero__contenido">
          <div className="hero__eyebrow">
            <span className="punto-vivo" /> Destacado en Cinecom
          </div>
          <h1 className="hero__titulo">
            {parteUno}
            {parteDos && (
              <>
                :{' '}
                <br />
                <em>{parteDos}</em>
              </>
            )}
          </h1>
          <p className="hero__tagline">“{hero.tagline}”</p>
          <div className="hero__meta">
            <span>{hero.anio}</span>
            <span className="punto" />
            <span>{hero.duracion}</span>
            <span className="punto" />
            <span className="meta-estrella"><Icono nombre="estrella" size={13} relleno /> {hero.puntuacion.toFixed(1)}</span>
            <span className="punto" />
            <span>{hero.clasificacion}</span>
            <span className="hero__calidad">{hero.calidad[0]}</span>
          </div>
          <p className="hero__sinopsis">{hero.sinopsis}</p>

          <div className="hero__acciones">
            <button type="button" className="boton boton--primario" onClick={() => onTrailer(hero)}>
              <Icono nombre="play" size={18} relleno /> Ver tráiler
            </button>
            <button type="button" className="boton boton--cristal" onClick={() => onVerPelicula(hero)}>
              {suscripcion ? <Icono nombre="play" size={17} relleno /> : <Icono nombre="candado" size={17} />}
              {suscripcion ? 'Ver película' : 'Ver con VIP'}
            </button>
            <button
              type="button"
              className={unirClases('boton-icono boton-icono--cristal', favoritoHero && 'boton-icono--activo')}
              onClick={() => onFavorito(hero)}
              aria-label={favoritoHero ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Icono nombre="corazon" size={19} relleno={favoritoHero} />
            </button>
          </div>

          <div className="hero__detalles">
            <span><Icono nombre="corona" size={14} /> Incluido en tu plan VIP</span>
            <span><Icono nombre="pantalla" size={14} /> {hero.calidad.join(' · ')}</span>
          </div>
        </div>

        <aside className="top-card" aria-label="Top 3 de hoy">
          <div className="top-card__cabecera">
            <span className="seccion__eyebrow">Top de hoy</span>
            <span className="top-card__vivo"><span className="punto-vivo" /> En vivo</span>
          </div>
          {asistente.map((item, indice) => (
            <button type="button" key={item.id} className="top-card__fila" onClick={() => onAbrir(item)}>
              <span className="top-card__num">{indice + 1}</span>
              <img className="top-card__poster" src={item.poster} alt="" />
              <span className="top-card__datos">
                <span className="top-card__nombre">{item.titulo.split(':')[0]}</span>
                <span className="top-card__meta">{item.anio} · {item.generos[0]}</span>
              </span>
              <span className="top-card__punto"><Icono nombre="estrella" size={11} relleno /> {item.puntuacion.toFixed(1)}</span>
            </button>
          ))}
          <button type="button" className="top-card__ver" onClick={() => onAbrirCatalogo('todos')}>
            Ver ranking completo <Icono nombre="flecha-derecha" size={14} />
          </button>
        </aside>

        <div className="hero__abajo">
          <span><Icono nombre="destellos" size={14} /> Una selección de Cinecom</span>
          <span className="hero__scroll">Desliza para explorar <Icono nombre="abajo" size={14} /></span>
        </div>
      </section>

      <FilaContenido
        titulo="Top 10 de la semana"
        descripcion="Las historias que todos están viendo en Cinecom."
        items={topDiez}
        favoritos={favoritos}
        numerada
        onAbrir={onAbrir}
        onFavorito={onFavorito}
        onVerTodo={() => onAbrirCatalogo('todos')}
      />

      <section className="seccion seccion--generos">
        <div className="seccion__cabecera">
          <div className="seccion__titulo-grupo">
            <span className="seccion__eyebrow">Encuentra tu mood</span>
            <h2 className="seccion__titulo">Explora por género</h2>
          </div>
          <button type="button" className="boton-texto" onClick={() => onAbrirCatalogo('todos')}>
            Catálogo completo <Icono nombre="flecha-derecha" size={15} />
          </button>
        </div>
        <div className="genero-nube">
          {generos.map((genero) => (
            <button type="button" key={genero.nombre} className="genero-nube__item" onClick={() => onGenero(genero.nombre)}>
              <span>{genero.nombre}</span>
              <b>{genero.cantidad}</b>
            </button>
          ))}
        </div>
      </section>

      <FilaContenido
        titulo="Aclamadas por la crítica"
        descripcion="Películas que dejaron huella y siguen dando de qué hablar."
        items={aclamadas}
        favoritos={favoritos}
        onAbrir={onAbrir}
        onFavorito={onFavorito}
        onVerTodo={() => onAbrirCatalogo('pelicula')}
      />

      <FilaContenido
        titulo="Series que enganchan"
        descripcion="Un episodio no es suficiente. Prometido."
        items={series}
        favoritos={favoritos}
        onAbrir={onAbrir}
        onFavorito={onFavorito}
        onVerTodo={() => onAbrirCatalogo('serie')}
      />

      <section className="seccion">
        <div className="beneficios">
          {BENEFICIOS.map((beneficio) => (
            <div className="beneficio" key={beneficio.titulo}>
              <span className="beneficio__icono"><Icono nombre={beneficio.icono} size={20} /></span>
              <div>
                <h3>{beneficio.titulo}</h3>
                <p>{beneficio.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion">
        <div className="cta-vip">
          <div className="cta-vip__fondo" style={{ backgroundImage: `url(${catalogo[2]?.backdrop ?? hero.backdrop})` }} />
          <div className="cta-vip__contenido">
            <span className="seccion__eyebrow">Cinecom VIP</span>
            <h2>Vive el cine sin límites.</h2>
            <p>
              Películas completas, estrenos exclusivos y la mejor calidad de imagen y sonido.
              Todo desde <strong>$9.99 USD al mes</strong>.
            </p>
            <div className="cta-vip__acciones">
              <button type="button" className="boton boton--primario" onClick={onVip}>
                <Icono nombre="corona" size={17} /> {suscripcion ? 'Gestionar mi plan' : 'Hazte VIP'}
              </button>
              <span className="cta-vip__nota"><Icono nombre="escudo" size={14} /> Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </section>

      <FilaContenido
        titulo="Recién llegados"
        descripcion="Lo último que aterrizó en el catálogo."
        items={recientes}
        favoritos={favoritos}
        onAbrir={onAbrir}
        onFavorito={onFavorito}
        onVerTodo={() => onAbrirCatalogo('todos')}
      />
    </div>
  )
}
