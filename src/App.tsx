import { useEffect, useState } from 'react'
import './App.css'
import { CATALOGO, type Contenido } from './data/peliculas'
import type { FiltroTipo, Orden, Plan, Suscripcion, Vista } from './types'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ModalDetalle } from './components/ModalDetalle'
import { ModalTrailer } from './components/ModalTrailer'
import { Reproductor } from './components/Reproductor'
import { Toast } from './components/Toast'
import { Inicio } from './pages/Inicio'
import { Catalogo } from './pages/Catalogo'
import { Favoritos } from './pages/Favoritos'
import { Suscripcion as PaginaSuscripcion } from './pages/Suscripcion'

function leerFavoritos(): number[] {
  try {
    const guardado = JSON.parse(localStorage.getItem('cinecom:favoritos') ?? '[]')
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

function leerSuscripcion(): Suscripcion | null {
  try {
    const guardado = JSON.parse(localStorage.getItem('cinecom:suscripcion') ?? 'null')
    if (guardado && typeof guardado.plan === 'string') return guardado
    return null
  } catch {
    return null
  }
}

function App() {
  const [vista, setVista] = useState<Vista>('inicio')
  const [busqueda, setBusqueda] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos')
  const [filtroGenero, setFiltroGenero] = useState('Todos')
  const [orden, setOrden] = useState<Orden>('destacados')
  const [favoritos, setFavoritos] = useState<number[]>(leerFavoritos)
  const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(leerSuscripcion)
  const [seleccionada, setSeleccionada] = useState<Contenido | null>(null)
  const [trailer, setTrailer] = useState<Contenido | null>(null)
  const [reproductor, setReproductor] = useState<Contenido | null>(null)
  const [pendiente, setPendiente] = useState<Contenido | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [menuAbierto, setMenuAbierto] = useState(false)

  const hayOverlay = Boolean(seleccionada || trailer || reproductor)

  useEffect(() => {
    try {
      localStorage.setItem('cinecom:favoritos', JSON.stringify(favoritos))
    } catch {
      // Si el navegador bloquea LocalStorage, la app sigue funcionando en memoria.
    }
  }, [favoritos])

  useEffect(() => {
    try {
      localStorage.setItem('cinecom:suscripcion', JSON.stringify(suscripcion))
    } catch {
      // Sin persistencia, el estado se mantiene durante la sesión.
    }
  }, [suscripcion])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [vista])

  useEffect(() => {
    document.body.style.overflow = hayOverlay ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [hayOverlay])

  useEffect(() => {
    if (!mensaje) return
    const temporizador = window.setTimeout(() => setMensaje(''), 3400)
    return () => window.clearTimeout(temporizador)
  }, [mensaje])

  useEffect(() => {
    const alPresionar = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (trailer) setTrailer(null)
      else if (reproductor) setReproductor(null)
      else if (seleccionada) setSeleccionada(null)
      else if (menuAbierto) setMenuAbierto(false)
    }
    document.addEventListener('keydown', alPresionar)
    return () => document.removeEventListener('keydown', alPresionar)
  }, [trailer, reproductor, seleccionada, menuAbierto])

  const navegar = (nuevaVista: Vista) => {
    if (nuevaVista !== 'suscripcion') setPendiente(null)
    setVista(nuevaVista)
    setMenuAbierto(false)
  }

  const abrirCatalogo = (tipo: FiltroTipo = 'todos') => {
    setFiltroTipo(tipo)
    setFiltroGenero('Todos')
    setBusqueda('')
    setOrden('destacados')
    navegar('catalogo')
  }

  const buscar = (texto: string) => {
    setBusqueda(texto)
    if (vista !== 'catalogo') {
      setFiltroTipo('todos')
      setFiltroGenero('Todos')
      setOrden('destacados')
      setVista('catalogo')
      setMenuAbierto(false)
      setPendiente(null)
    }
  }

  const filtrarPorGenero = (genero: string) => {
    setFiltroGenero(genero)
    setFiltroTipo('todos')
    setBusqueda('')
    setOrden('destacados')
    navegar('catalogo')
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroTipo('todos')
    setFiltroGenero('Todos')
    setOrden('destacados')
  }

  const alternarFavorito = (contenido: Contenido) => {
    const yaEsFavorito = favoritos.includes(contenido.id)
    setFavoritos((lista) =>
      yaEsFavorito ? lista.filter((id) => id !== contenido.id) : [contenido.id, ...lista],
    )
    setMensaje(yaEsFavorito
      ? `“${contenido.titulo}” se quitó de tus favoritos`
      : `“${contenido.titulo}” se agregó a tus favoritos`)
  }

  const limpiarFavoritos = () => {
    setFavoritos([])
    setMensaje('Tu lista de favoritos quedó vacía')
  }

  const compartir = (contenido: Contenido) => {
    const texto = `${contenido.titulo} (${contenido.anio}) en Cinecom`
    if (navigator.share) {
      navigator.share({ title: contenido.titulo, text: texto, url: window.location.href }).catch(() => {
        // Si el usuario cancela el diálogo nativo no mostramos error.
      })
      return
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${texto} · ${window.location.href}`)
        .then(() => setMensaje('Enlace copiado al portapapeles'))
        .catch(() => setMensaje('Comparte Cinecom con tus amigos'))
      return
    }
    setMensaje('Comparte Cinecom con tus amigos')
  }

  const verPelicula = (contenido: Contenido) => {
    if (suscripcion) {
      setSeleccionada(null)
      setReproductor(contenido)
      return
    }
    setSeleccionada(null)
    setPendiente(contenido)
    setVista('suscripcion')
    setMensaje('Activa tu plan VIP para ver la película completa')
  }

  const activarPlan = (plan: Plan) => {
    const nueva: Suscripcion = {
      plan: plan.nombre,
      precio: plan.precio,
      periodo: plan.periodo,
      fecha: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }),
    }
    setSuscripcion(nueva)
    setMensaje('¡Suscripción VIP activada! Ya puedes ver películas completas')
  }

  const cancelarSuscripcion = () => {
    setSuscripcion(null)
    setPendiente(null)
    setMensaje('Tu suscripción VIP fue cancelada')
  }

  const verPendiente = () => {
    if (pendiente) {
      setReproductor(pendiente)
      setPendiente(null)
      setVista('inicio')
    } else {
      navegar('inicio')
    }
  }

  const similares = seleccionada
    ? CATALOGO
      .filter((item) => item.id !== seleccionada.id && item.generos.some((genero) => seleccionada.generos.includes(genero)))
      .sort((a, b) => b.puntuacion - a.puntuacion)
      .slice(0, 4)
    : []

  return (
    <div className="app">
      <a className="saltar" href="#contenido">Saltar al contenido</a>

      <Navbar
        vista={vista}
        favoritos={favoritos.length}
        suscripcion={suscripcion}
        busqueda={busqueda}
        menuAbierto={menuAbierto}
        onMenu={setMenuAbierto}
        onNavegar={navegar}
        onAbrirCatalogo={abrirCatalogo}
        onBuscar={buscar}
      />

      <main id="contenido">
        {vista === 'inicio' && (
          <Inicio
            catalogo={CATALOGO}
            favoritos={favoritos}
            suscripcion={suscripcion}
            onAbrir={setSeleccionada}
            onFavorito={alternarFavorito}
            onTrailer={setTrailer}
            onVerPelicula={verPelicula}
            onAbrirCatalogo={abrirCatalogo}
            onGenero={filtrarPorGenero}
            onVip={() => navegar('suscripcion')}
          />
        )}

        {vista === 'catalogo' && (
          <Catalogo
            catalogo={CATALOGO}
            favoritos={favoritos}
            busqueda={busqueda}
            filtroTipo={filtroTipo}
            filtroGenero={filtroGenero}
            orden={orden}
            onBuscar={buscar}
            onTipo={setFiltroTipo}
            onGenero={setFiltroGenero}
            onOrden={setOrden}
            onLimpiar={limpiarFiltros}
            onAbrir={setSeleccionada}
            onFavorito={alternarFavorito}
          />
        )}

        {vista === 'favoritos' && (
          <Favoritos
            catalogo={CATALOGO}
            favoritos={favoritos}
            onAbrir={setSeleccionada}
            onFavorito={alternarFavorito}
            onAbrirCatalogo={() => abrirCatalogo('todos')}
            onLimpiar={limpiarFavoritos}
          />
        )}

        {vista === 'suscripcion' && (
          <PaginaSuscripcion
            suscripcion={suscripcion}
            contenidoPendiente={pendiente}
            onSuscribir={activarPlan}
            onCancelar={cancelarSuscripcion}
            onVerPendiente={verPendiente}
            onAbrirCatalogo={() => abrirCatalogo('todos')}
          />
        )}
      </main>

      <Footer
        onNavegar={navegar}
        onAbrirCatalogo={abrirCatalogo}
        onGenero={filtrarPorGenero}
      />

      {seleccionada && (
        <ModalDetalle
          contenido={seleccionada}
          similares={similares}
          favorito={favoritos.includes(seleccionada.id)}
          suscrito={Boolean(suscripcion)}
          onCerrar={() => setSeleccionada(null)}
          onFavorito={alternarFavorito}
          onTrailer={setTrailer}
          onVerPelicula={verPelicula}
          onCompartir={compartir}
          onSeleccionar={setSeleccionada}
        />
      )}

      {trailer && <ModalTrailer contenido={trailer} onCerrar={() => setTrailer(null)} />}

      {reproductor && suscripcion && (
        <Reproductor
          key={reproductor.id}
          contenido={reproductor}
          suscripcion={suscripcion}
          onCerrar={() => setReproductor(null)}
        />
      )}

      {!reproductor && <Toast mensaje={mensaje} />}
    </div>
  )
}

export default App
