import { useEffect, useRef, useState } from 'react'
import type { Contenido } from '../data/peliculas'
import type { Suscripcion } from '../types'
import { Icono } from './Icono'
import { duracionEnSegundos, formatearTiempo, idiomaTipo } from '../utils'

type Props = {
  contenido: Contenido
  suscripcion: Suscripcion | null
  onCerrar: () => void
}

export function Reproductor({ contenido, suscripcion, onCerrar }: Props) {
  const duracion = duracionEnSegundos(contenido)
  const [pausado, setPausado] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [silenciado, setSilenciado] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)
  const progresoRef = useRef(0)

  const porcentaje = Math.min(100, (progreso / duracion) * 100)

  useEffect(() => {
    if (pausado) return
    const intervalo = window.setInterval(() => {
      progresoRef.current = Math.min(progresoRef.current + 1, duracion)
      setProgreso(progresoRef.current)
      if (progresoRef.current >= duracion) setPausado(true)
    }, 1000)
    return () => window.clearInterval(intervalo)
  }, [pausado, duracion])

  useEffect(() => {
    const alPresionar = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setPausado((valor) => !valor)
      }
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [])

  const alternarPantallaCompleta = async () => {
    try {
      if (!document.fullscreenElement) {
        await contenedor.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Algunos navegadores no permiten pantalla completa dentro de una demostración.
    }
  }

  const moverProgreso = (segundos: number) => {
    const nuevoValor = Math.max(0, Math.min(duracion, progresoRef.current + segundos))
    progresoRef.current = nuevoValor
    setProgreso(nuevoValor)
  }

  return (
    <div className="reproductor" ref={contenedor}>
      <div className="reproductor__fondo" style={{ backgroundImage: `url(${contenido.backdrop})` }} />
      <div className="reproductor__velo" />

      <div className="reproductor__top">
        <button type="button" className="reproductor__volver" onClick={onCerrar}>
          <Icono nombre="flecha-izquierda" size={20} />
          <span>Volver al catálogo</span>
        </button>
        <div className="reproductor__info">
          <span className="reproductor__mini-logo"><Icono nombre="filme" size={15} /> CINECOM</span>
          <div>
            <h2>{contenido.titulo}</h2>
            <p>
              {contenido.tipo === 'serie' ? 'Temporada 1 · Episodio 1' : 'Película completa'} · {contenido.anio}
            </p>
          </div>
        </div>
        <div className="reproductor__top-derecha">
          <span className="reproductor__badge"><Icono nombre="corona" size={13} /> {suscripcion?.plan ?? 'VIP'}</span>
          <span className="reproductor__calidad">{contenido.calidad[0]}</span>
        </div>
      </div>

      <div className="reproductor__centro">
        {pausado && (
          <button type="button" className="reproductor__play-grande" onClick={() => setPausado(false)} aria-label="Reanudar reproducción">
            <Icono nombre="play" size={32} relleno />
          </button>
        )}
        <span className="reproductor__demo">
          <Icono nombre="info" size={13} /> Modo demostración · reproducción simulada
        </span>
      </div>

      <div className="reproductor__controles">
        <div className="reproductor__barra">
          <span>{formatearTiempo(progreso)}</span>
          <input
            className="reproductor__rango"
            type="range"
            min={0}
            max={duracion}
            step={1}
            value={progreso}
            onChange={(event) => {
              const nuevoValor = Number(event.target.value)
              progresoRef.current = nuevoValor
              setProgreso(nuevoValor)
            }}
            aria-label="Avanzar o retroceder en la reproducción"
            style={{
              background: `linear-gradient(to right, #e11d48 0%, #e11d48 ${porcentaje}%, rgba(255,255,255,.25) ${porcentaje}%, rgba(255,255,255,.25) 100%)`,
            }}
          />
          <span>{formatearTiempo(duracion)}</span>
        </div>

        <div className="reproductor__botones">
          <div className="reproductor__botones-grupo">
            <button type="button" className="reproductor__boton" onClick={() => moverProgreso(-10)} aria-label="Retroceder 10 segundos">
              <Icono nombre="atras" size={19} />
            </button>
            <button type="button" className="reproductor__boton reproductor__boton--principal" onClick={() => setPausado(!pausado)} aria-label={pausado ? 'Reproducir' : 'Pausar'}>
              <Icono nombre={pausado ? 'play' : 'pausa'} size={20} relleno />
            </button>
            <button type="button" className="reproductor__boton" onClick={() => moverProgreso(10)} aria-label="Avanzar 10 segundos">
              <Icono nombre="adelante" size={19} />
            </button>
            <button type="button" className="reproductor__boton" onClick={() => setSilenciado(!silenciado)} aria-label={silenciado ? 'Activar sonido' : 'Silenciar'}>
              <Icono nombre={silenciado ? 'silencio' : 'volumen'} size={19} />
            </button>
            <span className="reproductor__idioma">Audio: Español latino · {contenido.audio.split('·')[0].trim()}</span>
          </div>
          <div className="reproductor__botones-grupo">
            <span className="reproductor__modo">{idiomaTipo(contenido)} · {contenido.calidad.join(' · ')}</span>
            <button type="button" className="reproductor__boton" onClick={alternarPantallaCompleta} aria-label="Pantalla completa">
              <Icono nombre="pantalla" size={19} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
