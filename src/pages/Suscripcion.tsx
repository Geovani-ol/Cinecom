import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Contenido } from '../data/peliculas'
import type { Plan, Suscripcion } from '../types'
import { Icono } from '../components/Icono'
import { formatearTarjeta, formatearVencimiento, unirClases } from '../utils'

type Props = {
  suscripcion: Suscripcion | null
  contenidoPendiente: Contenido | null
  onSuscribir: (plan: Plan) => void
  onCancelar: () => void
  onVerPendiente: () => void
  onAbrirCatalogo: () => void
}

type PlanConBeneficios = Plan & {
  descripcion: string
  beneficios: string[]
  popular?: boolean
  ahorro?: string
}

const PLANES: PlanConBeneficios[] = [
  {
    id: 'estreno',
    nombre: 'Pase de estreno',
    precio: 3.99,
    periodo: '48 horas',
    descripcion: 'Una película, una noche.',
    beneficios: ['1 película a elección', 'Calidad 4K HDR', 'Audio Dolby Atmos', '2 dispositivos'],
  },
  {
    id: 'mensual',
    nombre: 'Cinecom VIP Mensual',
    precio: 9.99,
    periodo: 'cada mes',
    descripcion: 'Todo el catálogo, sin límites.',
    beneficios: ['Catálogo completo', 'Series y películas', 'Sin anuncios', '2 pantallas a la vez', 'Cancela cuando quieras'],
    popular: true,
  },
  {
    id: 'anual',
    nombre: 'Cinecom VIP Anual',
    precio: 89.99,
    periodo: 'cada año',
    descripcion: 'Un año entero de historias.',
    beneficios: ['Todo lo del plan mensual', '4 pantallas a la vez', 'Descargas sin conexión', 'Acceso anticipado a estrenos'],
    ahorro: '2 meses gratis',
  },
]

const PREGUNTAS = [
  {
    pregunta: '¿Este cobro es real?',
    respuesta: 'No. La pasarela de pago es una simulación para la demostración del proyecto académico. No se solicita ni se cobra dinero real.',
  },
  {
    pregunta: '¿Puedo cancelar cuando quiera?',
    respuesta: 'Sí. Desde esta misma página puedes cancelar el plan con el botón “Cancelar suscripción”. La sesión guardará el estado en tu navegador.',
  },
  {
    pregunta: '¿Qué pasa si recargo la página?',
    respuesta: 'Tu plan VIP y tus favoritos se guardan en LocalStorage, así que se mantienen mientras uses el mismo navegador.',
  },
]

export function Suscripcion({
  suscripcion,
  contenidoPendiente,
  onSuscribir,
  onCancelar,
  onVerPendiente,
  onAbrirCatalogo,
}: Props) {
  const [planId, setPlanId] = useState('mensual')
  const [nombre, setNombre] = useState('')
  const [tarjeta, setTarjeta] = useState('')
  const [vencimiento, setVencimiento] = useState('')
  const [cvv, setCvv] = useState('')
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [procesando, setProcesando] = useState(false)
  const [exito, setExito] = useState(false)

  const plan = PLANES.find((item) => item.id === planId) ?? PLANES[1]

  const validar = () => {
    const nuevosErrores: Record<string, string> = {}
    if (nombre.trim().length < 3) nuevosErrores.nombre = 'Escribe el nombre como aparece en la tarjeta.'
    if (tarjeta.replace(/\D/g, '').length < 15) nuevosErrores.tarjeta = 'Ingresa al menos 15 dígitos.'
    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) nuevosErrores.vencimiento = 'Usa el formato MM/AA.'
    if (cvv.replace(/\D/g, '').length < 3) nuevosErrores.cvv = 'El CVV debe tener 3 o 4 dígitos.'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const pagar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (procesando || !validar()) return
    setProcesando(true)
    window.setTimeout(() => {
      onSuscribir(plan)
      setProcesando(false)
      setExito(true)
    }, 1500)
  }

  const cancelar = () => {
    if (window.confirm('¿Seguro que quieres cancelar tu suscripción VIP?')) {
      onCancelar()
      setExito(false)
    }
  }

  const fecha = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="pagina pagina--vip">
      <header className="vip-hero">
        <div className="vip-hero__fondo" style={{ backgroundImage: 'url(/backdrops/dune-parte-dos.jpg)' }} />
        <div className="vip-hero__degradado" />
        <div className="vip-hero__contenido">
          <span className="seccion__eyebrow"><Icono nombre="corona" size={14} /> Cinecom VIP</span>
          <h1>El cine se disfruta<br /><em>sin pausas.</em></h1>
          <p>
            Estrenos, clásicos y series completas en 4K HDR con Dolby Atmos.
            Sin anuncios, sin complicaciones y con tu lista de favoritos siempre contigo.
          </p>
          <div className="vip-hero__badges">
            <span className="badge-tech">4K UHD</span>
            <span className="badge-tech">Dolby Atmos</span>
            <span className="badge-tech">Sin anuncios</span>
            <span className="badge-tech">Multiplataforma</span>
          </div>
          {contenidoPendiente && !suscripcion && (
            <div className="vip-hero__pendiente">
              <Icono nombre="play" size={15} relleno />
              Estás a un paso de ver <strong>{contenidoPendiente.titulo}</strong>
            </div>
          )}
        </div>
      </header>

      {suscripcion ? (
        <section className="vip-activa">
          <div className="vip-activa__icono"><Icono nombre="corona" size={28} /></div>
          <div className="vip-activa__texto">
            <span className="seccion__eyebrow">Membresía activa</span>
            <h2>{exito ? '¡Bienvenido a Cinecom VIP!' : 'Tu plan VIP está activo'}</h2>
            <p>
              Plan <strong>{suscripcion.plan}</strong> · ${suscripcion.precio.toFixed(2)} USD {suscripcion.periodo}.
              Activado el {suscripcion.fecha}.
            </p>
            <p className="vip-activa__nota">
              Esta suscripción es una simulación académica. No se realizó ningún cargo real.
            </p>
          </div>
          <div className="vip-activa__acciones">
            {contenidoPendiente && (
              <button type="button" className="boton boton--primario" onClick={onVerPendiente}>
                <Icono nombre="play" size={17} relleno /> Ver {contenidoPendiente.titulo}
              </button>
            )}
            <button type="button" className="boton boton--cristal" onClick={onAbrirCatalogo}>
              <Icono nombre="filme" size={16} /> Explorar catálogo
            </button>
            <button type="button" className="boton-texto boton-texto--peligro" onClick={cancelar}>
              Cancelar suscripción
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="seccion seccion--planes">
            <div className="seccion__cabecera">
              <div className="seccion__titulo-grupo">
                <span className="seccion__eyebrow">Elige cómo entrar</span>
                <h2 className="seccion__titulo">Un plan para cada maratón</h2>
                <p className="seccion__descripcion">Selecciona un plan para continuar. Puedes cambiarlo después.</p>
              </div>
              <span className="planes__garantia"><Icono nombre="escudo" size={15} /> Pago 100% simulado</span>
            </div>

            <div className="planes">
              {PLANES.map((item) => (
                <label
                  key={item.id}
                  className={unirClases(
                    'plan',
                    item.popular && 'plan--popular',
                    planId === item.id && 'plan--seleccionado',
                  )}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={item.id}
                    checked={planId === item.id}
                    onChange={() => setPlanId(item.id)}
                  />
                  {item.popular && <span className="plan__etiqueta">Más popular</span>}
                  {item.ahorro && <span className="plan__etiqueta plan__etiqueta--ahorro">{item.ahorro}</span>}
                  <span className="plan__nombre">{item.nombre}</span>
                  <span className="plan__descripcion">{item.descripcion}</span>
                  <span className="plan__precio">
                    <sup>$</sup>{item.precio.toFixed(2)}
                    <small>USD / {item.periodo}</small>
                  </span>
                  <span className="plan__linea" />
                  <span className="plan__lista">
                    {item.beneficios.map((beneficio) => (
                      <span key={beneficio}><Icono nombre="check" size={14} /> {beneficio}</span>
                    ))}
                  </span>
                  <span className="plan__radio">{planId === item.id && <span />}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="pago">
            <div className="pago__formulario">
              <div className="pago__cabecera">
                <div>
                  <span className="seccion__eyebrow">Paso final</span>
                  <h2>Datos de pago</h2>
                </div>
                <div className="pago__metodos">
                  <span>VISA</span><span>Mastercard</span><span>AMEX</span>
                </div>
              </div>
              <p className="pago__aviso">
                <Icono nombre="info" size={15} /> Demo académica: usa cualquier tarjeta de prueba. No se realizará ningún cobro.
              </p>

              <form onSubmit={pagar} noValidate>
                <div className="campo">
                  <label htmlFor="nombre">Nombre en la tarjeta</label>
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    placeholder="Geovani Olvera"
                    autoComplete="cc-name"
                    onChange={(event) => setNombre(event.target.value)}
                    aria-invalid={Boolean(errores.nombre)}
                  />
                  {errores.nombre && <span className="campo__error">{errores.nombre}</span>}
                </div>

                <div className="campo">
                  <label htmlFor="tarjeta">Número de tarjeta</label>
                  <div className="campo__con-icono">
                    <input
                      id="tarjeta"
                      type="text"
                      inputMode="numeric"
                      value={tarjeta}
                      placeholder="4242 4242 4242 4242"
                      autoComplete="cc-number"
                      onChange={(event) => setTarjeta(formatearTarjeta(event.target.value))}
                      aria-invalid={Boolean(errores.tarjeta)}
                    />
                    <Icono nombre="tarjeta" size={18} />
                  </div>
                  {errores.tarjeta && <span className="campo__error">{errores.tarjeta}</span>}
                </div>

                <div className="pago__fila">
                  <div className="campo">
                    <label htmlFor="vencimiento">Vencimiento</label>
                    <input
                      id="vencimiento"
                      type="text"
                      inputMode="numeric"
                      value={vencimiento}
                      placeholder="MM/AA"
                      autoComplete="cc-exp"
                      onChange={(event) => setVencimiento(formatearVencimiento(event.target.value))}
                      aria-invalid={Boolean(errores.vencimiento)}
                    />
                    {errores.vencimiento && <span className="campo__error">{errores.vencimiento}</span>}
                  </div>
                  <div className="campo">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="password"
                      inputMode="numeric"
                      value={cvv}
                      placeholder="123"
                      maxLength={4}
                      autoComplete="cc-csc"
                      onChange={(event) => setCvv(event.target.value.replace(/\D/g, ''))}
                      aria-invalid={Boolean(errores.cvv)}
                    />
                    {errores.cvv && <span className="campo__error">{errores.cvv}</span>}
                  </div>
                </div>

                <button type="submit" className="boton boton--primario boton--bloque pago__boton" disabled={procesando}>
                  {procesando ? (
                    <><span className="spinner" /> Procesando pago...</>
                  ) : (
                    <><Icono nombre="candado" size={17} /> Pagar ${plan.precio.toFixed(2)} USD</>
                  )}
                </button>
                <p className="pago__terminos">
                  Al continuar aceptas los términos de la demostración. Este proyecto no está afiliado a las plataformas reales.
                </p>
                <p className="pago__prueba">Tarjeta de prueba: 4242 4242 4242 4242 · CVV: 123</p>
              </form>
            </div>

            <aside className="resumen">
              <span className="seccion__eyebrow">Resumen</span>
              <h3>{plan.nombre}</h3>
              <p className="resumen__periodo">Acceso {plan.periodo}</p>
              <div className="resumen__filas">
                <span>Subtotal <b>${plan.precio.toFixed(2)}</b></span>
                <span>IVA incluido <b>$0.00</b></span>
              </div>
              <div className="resumen__total">
                <span>Total hoy</span>
                <strong>${plan.precio.toFixed(2)} <small>USD</small></strong>
              </div>
              <ul className="resumen__beneficios">
                {plan.beneficios.slice(0, 4).map((beneficio) => (
                  <li key={beneficio}><Icono nombre="check" size={14} /> {beneficio}</li>
                ))}
              </ul>
              <span className="resumen__seguro"><Icono nombre="escudo" size={15} /> Compra simulada y segura</span>
            </aside>
          </section>

        </>
      )}

          <section className="seccion seccion--beneficios-vip">
            <div className="beneficios">
              <div className="beneficio"><span className="beneficio__icono"><Icono nombre="pantalla" size={20} /></span><div><h3>4K Ultra HD + HDR</h3><p>Imagen nítida en cada plano.</p></div></div>
              <div className="beneficio"><span className="beneficio__icono"><Icono nombre="audifonos" size={20} /></span><div><h3>Dolby Atmos</h3><p>Sonido envolvente de cine.</p></div></div>
              <div className="beneficio"><span className="beneficio__icono"><Icono nombre="descargar" size={20} /></span><div><h3>Descargas</h3><p>Descarga y mira sin conexión.</p></div></div>
              <div className="beneficio"><span className="beneficio__icono"><Icono nombre="dispositivo" size={20} /></span><div><h3>En todas partes</h3><p>TV, tablet, laptop y móvil.</p></div></div>
            </div>
          </section>

      <section className="seccion faq">
        <div className="seccion__cabecera">
          <div className="seccion__titulo-grupo">
            <span className="seccion__eyebrow">Antes de suscribirte</span>
            <h2 className="seccion__titulo">Preguntas frecuentes</h2>
          </div>
        </div>
        <div className="faq__lista">
          {PREGUNTAS.map((item) => (
            <details key={item.pregunta}>
              <summary>{item.pregunta}<Icono nombre="abajo" size={17} /></summary>
              <p>{item.respuesta}</p>
            </details>
          ))}
        </div>
        <p className="faq__fecha">Fecha de esta visita: {fecha}</p>
      </section>
    </div>
  )
}
