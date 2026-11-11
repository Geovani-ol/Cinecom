import { Icono } from './Icono'

export function Toast({ mensaje }: { mensaje: string }) {
  if (!mensaje) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast__icono"><Icono nombre="check" size={15} /></span>
      <span>{mensaje}</span>
    </div>
  )
}
