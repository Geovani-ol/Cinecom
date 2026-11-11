export type Vista = 'inicio' | 'catalogo' | 'favoritos' | 'suscripcion'

export type FiltroTipo = 'todos' | 'pelicula' | 'serie'

export type Orden = 'destacados' | 'puntuacion' | 'recientes' | 'az'

export type Suscripcion = {
  plan: string
  precio: number
  periodo: string
  fecha: string
}
export type Plan = {
  id: string
  nombre: string
  precio: number
  periodo: string
}
