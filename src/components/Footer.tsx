import type { FiltroTipo, Vista } from '../types'
import { Logo } from './Logo'
import { Icono } from './Icono'

type Props = {
  onNavegar: (vista: Vista) => void
  onAbrirCatalogo: (tipo?: FiltroTipo) => void
  onGenero: (genero: string) => void
}

const GENEROS = ['Ciencia ficción', 'Acción', 'Drama', 'Suspenso', 'Animación']

export function Footer({ onNavegar, onAbrirCatalogo, onGenero }: Props) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__marca">
          <Logo onClick={() => onNavegar('inicio')} />
          <p className="footer__descripcion">
            Una experiencia de streaming hecha para perderse en historias.
            Explora, guarda tus favoritos y descubre tu próxima obsesión.
          </p>
          <div className="footer__social" aria-label="Redes sociales de Cinecom">
            <span className="footer__social-icon"><Icono nombre="instagram" size={17} /></span>
            <span className="footer__social-icon"><Icono nombre="x" size={17} /></span>
            <span className="footer__social-icon"><Icono nombre="youtube" size={18} /></span>
            <span className="footer__social-icon"><Icono nombre="facebook" size={17} /></span>
          </div>
          <span className="footer__hecho">
            <Icono nombre="destellos" size={14} /> Hecho con React + Vite
          </span>
        </div>

        <div className="footer__columna">
          <h3 className="footer__titulo">Géneros populares</h3>
          {GENEROS.map((genero) => (
            <button key={genero} type="button" className="footer__enlace" onClick={() => onGenero(genero)}>
              {genero}
            </button>
          ))}
        </div>

        <div className="footer__columna">
          <h3 className="footer__titulo">Plataforma</h3>
          <button type="button" className="footer__enlace" onClick={() => onNavegar('inicio')}>Inicio</button>
          <button type="button" className="footer__enlace" onClick={() => onAbrirCatalogo('todos')}>Catálogo completo</button>
          <button type="button" className="footer__enlace" onClick={() => onNavegar('favoritos')}>Mis favoritos</button>
          <button type="button" className="footer__enlace" onClick={() => onNavegar('suscripcion')}>Suscripción VIP</button>
          <button type="button" className="footer__enlace" onClick={() => onAbrirCatalogo('serie')}>Series originales</button>
        </div>

        <div className="footer__columna footer__columna--tecnica">
          <h3 className="footer__titulo">Especificaciones técnicas</h3>
          <p className="footer__texto">Preparada para una experiencia de cine en casa.</p>
          <div className="footer__badges">
            <span className="badge-tech">4K UHD</span>
            <span className="badge-tech">HDR10+</span>
            <span className="badge-tech">Dolby Atmos</span>
            <span className="badge-tech">5.1</span>
          </div>
          <div className="footer__nota">
            <Icono nombre="escudo" size={15} />
            <span>Pagos y suscripciones simulados con fines académicos.</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Cinecom. Proyecto académico sin fines comerciales.</p>
        <div className="footer__legal">
          <a href="https://github.com/Geovani-ol/Cinecom" target="_blank" rel="noreferrer">Repositorio</a>
          <span>Privacidad</span>
          <span>Términos</span>
          <span>v1.0</span>
        </div>
      </div>
      <p className="footer__creditos">
        Los pósters, imágenes y tráilers pertenecen a sus respectivos distribuidores y se usan únicamente como material de demostración.
      </p>
    </footer>
  )
}
