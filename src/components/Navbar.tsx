import type { FiltroTipo, Suscripcion, Vista } from '../types'
import { Logo } from './Logo'
import { Icono } from './Icono'
import { unirClases } from '../utils'

type Props = {
  vista: Vista
  favoritos: number
  suscripcion: Suscripcion | null
  busqueda: string
  menuAbierto: boolean
  onMenu: (abierto: boolean) => void
  onNavegar: (vista: Vista) => void
  onAbrirCatalogo: (tipo?: FiltroTipo) => void
  onBuscar: (texto: string) => void
}

export function Navbar({
  vista,
  favoritos,
  suscripcion,
  busqueda,
  menuAbierto,
  onMenu,
  onNavegar,
  onAbrirCatalogo,
  onBuscar,
}: Props) {
  const claseEnlace = (activo: boolean) =>
    unirClases('navbar__enlace', activo && 'navbar__enlace--activo')

  const irAInicio = () => {
    onNavegar('inicio')
    onMenu(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Logo onClick={irAInicio} />

        <nav className="navbar__enlaces" aria-label="Navegación principal">
          <button
            type="button"
            className={claseEnlace(vista === 'inicio')}
            onClick={irAInicio}
          >
            Inicio
          </button>
          <button
            type="button"
            className={claseEnlace(vista === 'catalogo')}
            onClick={() => {
              onAbrirCatalogo('todos')
              onMenu(false)
            }}
          >
            Explorar
          </button>
          <button
            type="button"
            className={claseEnlace(false)}
            onClick={() => {
              onAbrirCatalogo('pelicula')
              onMenu(false)
            }}
          >
            Películas
          </button>
          <button
            type="button"
            className={claseEnlace(false)}
            onClick={() => {
              onAbrirCatalogo('serie')
              onMenu(false)
            }}
          >
            Series
          </button>
          <button
            type="button"
            className={claseEnlace(vista === 'favoritos')}
            onClick={() => {
              onNavegar('favoritos')
              onMenu(false)
            }}
          >
            Mis favoritos
            {favoritos > 0 && <span className="navbar__badge">{favoritos}</span>}
          </button>
        </nav>

        <div className="navbar__acciones">
          <label className="buscador-nav">
            <Icono nombre="buscar" size={17} />
            <input
              className="buscador-nav__input"
              type="search"
              value={busqueda}
              placeholder="Buscar títulos..."
              aria-label="Buscar en el catálogo"
              onChange={(event) => onBuscar(event.target.value)}
            />
            {busqueda && (
              <button
                type="button"
                className="buscador-nav__limpiar"
                onClick={() => onBuscar('')}
                aria-label="Limpiar búsqueda"
              >
                <Icono nombre="cerrar" size={13} />
              </button>
            )}
          </label>

          <button
            type="button"
            className={unirClases('boton-vip', suscripcion && 'boton-vip--activo')}
            onClick={() => {
              onNavegar('suscripcion')
              onMenu(false)
            }}
          >
            <Icono nombre="corona" size={16} />
            <span>{suscripcion ? 'VIP activo' : 'Hazte VIP'}</span>
          </button>

          <button
            type="button"
            className="avatar"
            onClick={() => {
              onNavegar('favoritos')
              onMenu(false)
            }}
            title="Mi colección"
            aria-label="Ir a mi colección"
          >
            G
          </button>

          <button
            type="button"
            className="navbar__menu-btn"
            onClick={() => onMenu(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
          >
            <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="menu-movil">
          <label className="buscador-nav buscador-nav--movil">
            <Icono nombre="buscar" size={17} />
            <input
              className="buscador-nav__input"
              type="search"
              value={busqueda}
              placeholder="Buscar películas o series..."
              aria-label="Buscar en el catálogo"
              onChange={(event) => onBuscar(event.target.value)}
            />
          </label>
          <div className="menu-movil__enlaces">
            <button type="button" onClick={irAInicio}>Inicio</button>
            <button type="button" onClick={() => { onAbrirCatalogo('todos'); onMenu(false) }}>Explorar catálogo</button>
            <button type="button" onClick={() => { onAbrirCatalogo('pelicula'); onMenu(false) }}>Películas</button>
            <button type="button" onClick={() => { onAbrirCatalogo('serie'); onMenu(false) }}>Series</button>
            <button type="button" onClick={() => { onNavegar('favoritos'); onMenu(false) }}>
              Mis favoritos {favoritos > 0 && <span className="navbar__badge">{favoritos}</span>}
            </button>
            <button type="button" onClick={() => { onNavegar('suscripcion'); onMenu(false) }}>
              {suscripcion ? 'Mi suscripción VIP' : 'Suscripción VIP'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
