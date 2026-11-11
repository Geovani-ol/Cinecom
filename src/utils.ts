import type { Contenido } from './data/peliculas'

// Quita acentos y mayúsculas para que la búsqueda sea más tolerante.
export function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function unirClases(...clases: Array<string | false | null | undefined>) {
  return clases.filter(Boolean).join(' ')
}

// Convierte 5520 segundos en "1:32:00" o en "32:00".
export function formatearTiempo(totalSegundos: number) {
  const horas = Math.floor(totalSegundos / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = Math.floor(totalSegundos % 60)
  const dosDigitos = (n: number) => String(n).padStart(2, '0')

  if (horas > 0) return `${horas}:${dosDigitos(minutos)}:${dosDigitos(segundos)}`
  return `${minutos}:${dosDigitos(segundos)}`
}

// Duración aproximada que usamos para la barra del reproductor simulado.
export function duracionEnSegundos(contenido: Contenido) {
  if (contenido.tipo === 'serie') return 52 * 60
  const horas = Number(contenido.duracion.match(/(\d+)h/)?.[1] ?? 0)
  const minutos = Number(contenido.duracion.match(/(\d+)min/)?.[1] ?? 0)
  return horas * 3600 + minutos * 60
}

export function idiomaTipo(contenido: Contenido) {
  return contenido.tipo === 'pelicula' ? 'Película' : 'Serie'
}

export function generosDelCatalogo(catalogo: Contenido[]) {
  const cuenta = new Map<string, number>()
  catalogo.forEach((item) => {
    item.generos.forEach((genero) => {
      cuenta.set(genero, (cuenta.get(genero) ?? 0) + 1)
    })
  })
  return [...cuenta.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
}

export function formatearTarjeta(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 16)
  return numeros.replace(/(.{4})/g, '$1 ').trim()
}

export function formatearVencimiento(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 4)
  if (numeros.length <= 2) return numeros
  return `${numeros.slice(0, 2)}/${numeros.slice(2)}`
}
