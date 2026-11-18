// Información de temporadas y episodios de las series del catálogo.
// Los títulos están en español y se obtuvieron de TMDB para la demostración.

export type Episodio = {
  numero: number
  titulo: string
  duracion: number
  anio: string
}

export type Temporada = {
  numero: number
  anio: string
  episodios: Episodio[]
}

export const TEMPORADAS: Record<string, Temporada[]> = {
  'severance': [
    {
      numero: 1,
      anio: '2022',
      episodios: [
        { numero: 1, titulo: 'Buenas noticias sobre el Infierno', duracion: 59, anio: '2022' },
        { numero: 2, titulo: 'Medio bucle', duracion: 57, anio: '2022' },
        { numero: 3, titulo: 'En perpetuidad', duracion: 60, anio: '2022' },
        { numero: 4, titulo: 'El "tú" que eres', duracion: 50, anio: '2022' },
        { numero: 5, titulo: 'La sombría barbarie de Óptica y diseño.', duracion: 47, anio: '2022' },
        { numero: 6, titulo: 'Esconderse y buscar', duracion: 44, anio: '2022' },
        { numero: 7, titulo: 'Jazz desafiante', duracion: 53, anio: '2022' },
        { numero: 8, titulo: '¿Qué hay de cenar?', duracion: 50, anio: '2022' },
        { numero: 9, titulo: 'Los "nosotros" que somos', duracion: 44, anio: '2022' },
      ],
    },
    {
      numero: 2,
      anio: '2025',
      episodios: [
        { numero: 1, titulo: 'Hola, Srita. Cobel', duracion: 54, anio: '2025' },
        { numero: 2, titulo: 'Adiós, Sra. Selvig', duracion: 49, anio: '2025' },
        { numero: 3, titulo: '¿Quién está viva?', duracion: 57, anio: '2025' },
        { numero: 4, titulo: 'La Cuenca de la Aflicción', duracion: 54, anio: '2025' },
        { numero: 5, titulo: 'El caballo de Troya', duracion: 50, anio: '2025' },
        { numero: 6, titulo: 'Atila', duracion: 52, anio: '2025' },
        { numero: 7, titulo: 'Chikhai Bardo', duracion: 53, anio: '2025' },
        { numero: 8, titulo: 'Dulce desprecio', duracion: 41, anio: '2025' },
        { numero: 9, titulo: 'Al cierre', duracion: 48, anio: '2025' },
        { numero: 10, titulo: 'Cold Harbor', duracion: 80, anio: '2025' },
      ],
    },
  ],
  'arcane': [
    {
      numero: 1,
      anio: '2021',
      episodios: [
        { numero: 1, titulo: '¡Bienvenidos!', duracion: 44, anio: '2021' },
        { numero: 2, titulo: 'Algunos misterios están mejor sin resolver', duracion: 41, anio: '2021' },
        { numero: 3, titulo: 'La violencia bruta es necesaria para el cambio', duracion: 45, anio: '2021' },
        { numero: 4, titulo: '¡Feliz Día del Progreso!', duracion: 41, anio: '2021' },
        { numero: 5, titulo: 'Todos quieren ser mis enemigos', duracion: 41, anio: '2021' },
        { numero: 6, titulo: 'Cuando estas paredes se derrumben', duracion: 43, anio: '2021' },
        { numero: 7, titulo: 'El pequeño salvador', duracion: 41, anio: '2021' },
        { numero: 8, titulo: 'Aceite y agua', duracion: 41, anio: '2021' },
        { numero: 9, titulo: 'El monstruo que creaste', duracion: 42, anio: '2021' },
      ],
    },
    {
      numero: 2,
      anio: '2024',
      episodios: [
        { numero: 1, titulo: 'El peso del liderazgo', duracion: 41, anio: '2024' },
        { numero: 2, titulo: 'Ver cómo se quema todo', duracion: 40, anio: '2024' },
        { numero: 3, titulo: 'Por fin pudiste pronunciar mi nombre', duracion: 41, anio: '2024' },
        { numero: 4, titulo: 'Pintemos la ciudad de azul', duracion: 40, anio: '2024' },
        { numero: 5, titulo: 'Ampollas y piedra', duracion: 43, anio: '2024' },
        { numero: 6, titulo: 'El mensaje oculto en el patrón', duracion: 40, anio: '2024' },
        { numero: 7, titulo: 'Finjamos que es la primera vez', duracion: 42, anio: '2024' },
        { numero: 8, titulo: 'Matar es un ciclo', duracion: 41, anio: '2024' },
        { numero: 9, titulo: 'La mugre bajo tus uñas', duracion: 51, anio: '2024' },
      ],
    },
  ],
  'breaking-bad': [
    {
      numero: 1,
      anio: '2008',
      episodios: [
        { numero: 1, titulo: 'Principio del fin', duracion: 59, anio: '2008' },
        { numero: 2, titulo: 'El gato en la bolsa', duracion: 49, anio: '2008' },
        { numero: 3, titulo: 'Y la bolsa en el río', duracion: 49, anio: '2008' },
        { numero: 4, titulo: 'Cáncer', duracion: 49, anio: '2008' },
        { numero: 5, titulo: 'Materia gris', duracion: 49, anio: '2008' },
        { numero: 6, titulo: 'Un loco puñado de nada', duracion: 49, anio: '2008' },
        { numero: 7, titulo: 'Acuerdo no violento', duracion: 48, anio: '2008' },
      ],
    },
    {
      numero: 2,
      anio: '2009',
      episodios: [
        { numero: 1, titulo: 'Siete con treinta y siete', duracion: 48, anio: '2009' },
        { numero: 2, titulo: 'A las brasas', duracion: 48, anio: '2009' },
        { numero: 3, titulo: 'Picadura de una abeja muerta', duracion: 47, anio: '2009' },
        { numero: 4, titulo: 'Abajo', duracion: 48, anio: '2009' },
        { numero: 5, titulo: 'Rotura', duracion: 48, anio: '2009' },
        { numero: 6, titulo: 'Cucú', duracion: 48, anio: '2009' },
        { numero: 7, titulo: 'Negro y azul', duracion: 48, anio: '2009' },
        { numero: 8, titulo: '¡Llama a Saul!', duracion: 48, anio: '2009' },
        { numero: 9, titulo: 'Cuatro días afuera', duracion: 48, anio: '2009' },
        { numero: 10, titulo: 'Terminado', duracion: 48, anio: '2009' },
        { numero: 11, titulo: 'Mandala', duracion: 48, anio: '2009' },
        { numero: 12, titulo: 'Phoenix', duracion: 48, anio: '2009' },
        { numero: 13, titulo: 'ABQ', duracion: 48, anio: '2009' },
      ],
    },
    {
      numero: 3,
      anio: '2010',
      episodios: [
        { numero: 1, titulo: 'No más', duracion: 48, anio: '2010' },
        { numero: 2, titulo: 'Caballo sin nombre', duracion: 48, anio: '2010' },
        { numero: 3, titulo: 'T. S. T.', duracion: 48, anio: '2010' },
        { numero: 4, titulo: 'Luz verde', duracion: 48, anio: '2010' },
        { numero: 5, titulo: 'Más', duracion: 48, anio: '2010' },
        { numero: 6, titulo: 'Atardecer', duracion: 48, anio: '2010' },
        { numero: 7, titulo: 'Un minuto', duracion: 48, anio: '2010' },
        { numero: 8, titulo: 'Te veo', duracion: 48, anio: '2010' },
        { numero: 9, titulo: 'Kafkiano', duracion: 48, anio: '2010' },
        { numero: 10, titulo: 'Vuelo', duracion: 48, anio: '2010' },
        { numero: 11, titulo: 'Abiquiú', duracion: 48, anio: '2010' },
        { numero: 12, titulo: 'Medias medidas', duracion: 48, anio: '2010' },
        { numero: 13, titulo: 'Medidas totales', duracion: 48, anio: '2010' },
      ],
    },
    {
      numero: 4,
      anio: '2011',
      episodios: [
        { numero: 1, titulo: 'Navaja', duracion: 48, anio: '2011' },
        { numero: 2, titulo: 'Revólver calibre 38', duracion: 46, anio: '2011' },
        { numero: 3, titulo: 'Casa abierta', duracion: 47, anio: '2011' },
        { numero: 4, titulo: 'Puntos clave', duracion: 46, anio: '2011' },
        { numero: 5, titulo: 'Copiloto', duracion: 48, anio: '2011' },
        { numero: 6, titulo: 'Arrinconados', duracion: 48, anio: '2011' },
        { numero: 7, titulo: 'Perro problemático', duracion: 48, anio: '2011' },
        { numero: 8, titulo: 'Hermanos', duracion: 48, anio: '2011' },
        { numero: 9, titulo: 'Micrófono', duracion: 48, anio: '2011' },
        { numero: 10, titulo: 'Salud', duracion: 48, anio: '2011' },
        { numero: 11, titulo: 'Entrepiso', duracion: 47, anio: '2011' },
        { numero: 12, titulo: 'Fin de los tiempos', duracion: 46, anio: '2011' },
        { numero: 13, titulo: 'Cara a cara', duracion: 51, anio: '2011' },
      ],
    },
    {
      numero: 5,
      anio: '2012',
      episodios: [
        { numero: 1, titulo: 'Vive libre o muere', duracion: 43, anio: '2012' },
        { numero: 2, titulo: 'Madrigal', duracion: 48, anio: '2012' },
        { numero: 3, titulo: 'Peligro', duracion: 48, anio: '2012' },
        { numero: 4, titulo: '51 (Cincuenta y uno)', duracion: 48, anio: '2012' },
        { numero: 5, titulo: 'Carga de muerte', duracion: 49, anio: '2012' },
        { numero: 6, titulo: 'Adquisición', duracion: 48, anio: '2012' },
        { numero: 7, titulo: 'Di mi nombre', duracion: 48, anio: '2012' },
        { numero: 8, titulo: 'Planeando sobre todos', duracion: 48, anio: '2012' },
        { numero: 9, titulo: 'Dinero sangriento', duracion: 48, anio: '2013' },
        { numero: 10, titulo: 'Enterrado', duracion: 48, anio: '2013' },
        { numero: 11, titulo: 'Confesiones', duracion: 48, anio: '2013' },
        { numero: 12, titulo: 'Perro rabioso', duracion: 48, anio: '2013' },
        { numero: 13, titulo: 'Tohajiilee', duracion: 47, anio: '2013' },
        { numero: 14, titulo: 'Ozymandias', duracion: 48, anio: '2013' },
        { numero: 15, titulo: 'Pizarra de granito', duracion: 54, anio: '2013' },
        { numero: 16, titulo: 'Felina', duracion: 56, anio: '2013' },
      ],
    },
  ],
  'stranger-things': [
    {
      numero: 1,
      anio: '2016',
      episodios: [
        { numero: 1, titulo: 'Capítulo uno: La desaparición de Will Byers', duracion: 48, anio: '2016' },
        { numero: 2, titulo: 'Capítulo dos: La loca de la calle Maple', duracion: 55, anio: '2016' },
        { numero: 3, titulo: 'Capítulo tres: Todo está bien', duracion: 51, anio: '2016' },
        { numero: 4, titulo: 'Capítulo cuatro: El cuerpo', duracion: 50, anio: '2016' },
        { numero: 5, titulo: 'Capítulo cinco: La pulga y el acróbata', duracion: 52, anio: '2016' },
        { numero: 6, titulo: 'Capítulo seis: El monstruo', duracion: 46, anio: '2016' },
        { numero: 7, titulo: 'Capítulo siete: La bañera', duracion: 42, anio: '2016' },
        { numero: 8, titulo: 'Capítulo ocho: El otro lado', duracion: 54, anio: '2016' },
      ],
    },
    {
      numero: 2,
      anio: '2017',
      episodios: [
        { numero: 1, titulo: 'Capítulo uno: MADMAX', duracion: 48, anio: '2017' },
        { numero: 2, titulo: 'Capítulo dos: Dulce o truco, bicho raro', duracion: 56, anio: '2017' },
        { numero: 3, titulo: 'Capítulo tres: El renacuajo', duracion: 51, anio: '2017' },
        { numero: 4, titulo: 'Capítulo cuatro: Will, el Sabio', duracion: 46, anio: '2017' },
        { numero: 5, titulo: 'Capítulo cinco: Dig Dug', duracion: 58, anio: '2017' },
        { numero: 6, titulo: 'Capítulo seis: El espía', duracion: 52, anio: '2017' },
        { numero: 7, titulo: 'Capítulo siete: La hermana perdida', duracion: 46, anio: '2017' },
        { numero: 8, titulo: 'Capítulo ocho: El azotamentes', duracion: 48, anio: '2017' },
        { numero: 9, titulo: 'Capítulo nueve: El portal', duracion: 62, anio: '2017' },
      ],
    },
    {
      numero: 3,
      anio: '2019',
      episodios: [
        { numero: 1, titulo: 'Capítulo uno: ¿Me copias, Suzie?', duracion: 51, anio: '2019' },
        { numero: 2, titulo: 'Capítulo dos: Ratas de centro comercial', duracion: 51, anio: '2019' },
        { numero: 3, titulo: 'Capítulo tres: El caso de la socorrista desaparecida', duracion: 50, anio: '2019' },
        { numero: 4, titulo: 'Capítulo cuatro: La prueba de la sauna', duracion: 53, anio: '2019' },
        { numero: 5, titulo: 'Capítulo cinco: El ejército del Azotamentes', duracion: 52, anio: '2019' },
        { numero: 6, titulo: 'Capítulo seis: E pluribus unum', duracion: 60, anio: '2019' },
        { numero: 7, titulo: 'Capítulo siete: La mordedura', duracion: 56, anio: '2019' },
        { numero: 8, titulo: 'Capítulo ocho: La batalla de Starcourt', duracion: 78, anio: '2019' },
      ],
    },
    {
      numero: 4,
      anio: '2022',
      episodios: [
        { numero: 1, titulo: 'El club Fuego Infernal', duracion: 79, anio: '2022' },
        { numero: 2, titulo: 'La maldición de Vecna', duracion: 78, anio: '2022' },
        { numero: 3, titulo: 'El monstruo y la superheroína', duracion: 64, anio: '2022' },
        { numero: 4, titulo: 'Querido Billy', duracion: 79, anio: '2022' },
        { numero: 5, titulo: 'El proyecto Nina', duracion: 75, anio: '2022' },
        { numero: 6, titulo: 'La inmersión', duracion: 74, anio: '2022' },
        { numero: 7, titulo: 'La masacre en el Laboratorio de Hawkins', duracion: 100, anio: '2022' },
        { numero: 8, titulo: 'Papá', duracion: 86, anio: '2022' },
        { numero: 9, titulo: 'El huésped', duracion: 143, anio: '2022' },
      ],
    },
    {
      numero: 5,
      anio: '2025',
      episodios: [
        { numero: 1, titulo: 'Capítulo uno: La misión', duracion: 72, anio: '2025' },
        { numero: 2, titulo: 'Capítulo dos: La desaparición de...', duracion: 58, anio: '2025' },
        { numero: 3, titulo: 'Capítulo tres: La trampa de Turnbow', duracion: 70, anio: '2025' },
        { numero: 4, titulo: 'Capítulo cuatro: Hechicero', duracion: 87, anio: '2025' },
        { numero: 5, titulo: 'Capítulo cinco: Electrochoque', duracion: 69, anio: '2025' },
        { numero: 6, titulo: 'Capítulo seis: La huida de Camazotz', duracion: 76, anio: '2025' },
        { numero: 7, titulo: 'Capítulo siete: El puente', duracion: 67, anio: '2025' },
        { numero: 8, titulo: 'Capítulo ocho: Este Lado', duracion: 129, anio: '2025' },
      ],
    },
  ],
  'the-last-of-us': [
    {
      numero: 1,
      anio: '2023',
      episodios: [
        { numero: 1, titulo: 'Cuando Estés Perdido en la Oscuridad', duracion: 81, anio: '2023' },
        { numero: 2, titulo: 'Infectados', duracion: 53, anio: '2023' },
        { numero: 3, titulo: 'Mucho, Mucho tiempo', duracion: 77, anio: '2023' },
        { numero: 4, titulo: 'Por Favor, Toma mi Mano', duracion: 47, anio: '2023' },
        { numero: 5, titulo: 'Resistir y Sobrevivir', duracion: 60, anio: '2023' },
        { numero: 6, titulo: 'Parentesco', duracion: 61, anio: '2023' },
        { numero: 7, titulo: 'Lo que Dejamos Atrás', duracion: 57, anio: '2023' },
        { numero: 8, titulo: 'Cuando Más Necesitamos', duracion: 52, anio: '2023' },
        { numero: 9, titulo: 'Busca la luz', duracion: 46, anio: '2023' },
      ],
    },
    {
      numero: 2,
      anio: '2025',
      episodios: [
        { numero: 1, titulo: 'Días Futuros', duracion: 59, anio: '2025' },
        { numero: 2, titulo: 'A Través del Valle', duracion: 57, anio: '2025' },
        { numero: 3, titulo: 'El Camino', duracion: 57, anio: '2025' },
        { numero: 4, titulo: 'Día Uno', duracion: 53, anio: '2025' },
        { numero: 5, titulo: 'Siente Su Amor', duracion: 45, anio: '2025' },
        { numero: 6, titulo: 'El Precio', duracion: 60, anio: '2025' },
        { numero: 7, titulo: 'Convergencia', duracion: 50, anio: '2025' },
      ],
    },
  ],
  'house-of-the-dragon': [
    {
      numero: 1,
      anio: '2022',
      episodios: [
        { numero: 1, titulo: 'Los herederos del Dragón', duracion: 66, anio: '2022' },
        { numero: 2, titulo: 'El príncipe canalla', duracion: 54, anio: '2022' },
        { numero: 3, titulo: 'El segundo de su nombre', duracion: 63, anio: '2022' },
        { numero: 4, titulo: 'El Rey del mar estrecho', duracion: 62, anio: '2022' },
        { numero: 5, titulo: 'Nosotros iluminamos el camino', duracion: 60, anio: '2022' },
        { numero: 6, titulo: 'La Princesa y la Reina', duracion: 67, anio: '2022' },
        { numero: 7, titulo: 'Marcaderiva', duracion: 59, anio: '2022' },
        { numero: 8, titulo: 'El señor de las mareas', duracion: 67, anio: '2022' },
        { numero: 9, titulo: 'El Consejo Verde', duracion: 58, anio: '2022' },
        { numero: 10, titulo: 'La reina negra', duracion: 59, anio: '2022' },
      ],
    },
    {
      numero: 2,
      anio: '2024',
      episodios: [
        { numero: 1, titulo: 'Hijo por Hijo', duracion: 58, anio: '2024' },
        { numero: 2, titulo: 'Rhaenyra La Cruel', duracion: 69, anio: '2024' },
        { numero: 3, titulo: 'El Molino Ardiente', duracion: 66, anio: '2024' },
        { numero: 4, titulo: 'El Dragón Rojo y El Dorado', duracion: 55, anio: '2024' },
        { numero: 5, titulo: 'El Regente', duracion: 63, anio: '2024' },
        { numero: 6, titulo: 'La Plebe', duracion: 67, anio: '2024' },
        { numero: 7, titulo: 'La Cosecha Roja', duracion: 64, anio: '2024' },
        { numero: 8, titulo: 'La Reina que Siempre Fue', duracion: 69, anio: '2024' },
      ],
    },
  ],
}

export function obtenerTemporadas(slug: string): Temporada[] {
  return TEMPORADAS[slug] ?? []
}
