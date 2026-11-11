import { Icono } from './Icono'

type Props = {
  onClick: () => void
  compacto?: boolean
}

export function Logo({ onClick, compacto = false }: Props) {
  return (
    <button type="button" className="logo" onClick={onClick} aria-label="Ir al inicio de Cinecom">
      <span className="logo__marca">
        <Icono nombre="filme" size={19} />
      </span>
      {!compacto && (
        <span className="logo__texto">
          Cine<span>com</span>
        </span>
      )}
    </button>
  )
}
