export interface Senal {
  slug: string;
  nombre: string;
  categoria: 'reglamentaria' | 'preventiva' | 'informativa';
  imagen: string;
  alt: string;
  significado: string;
  norma?: string;
  metaDescription?: string;
}

export const SENALES: Senal[] = [
  {
    slug: 'pare',
    nombre: 'Pare',
    categoria: 'reglamentaria',
    imagen: '/senales/pare.svg',
    alt: 'Octogono rojo con la palabra PARE en blanco',
    significado:
      'La senal PARE es octagonal roja; obliga a detencion total antes de la linea de pare. El conductor debe cerciorarse de que la via este libre antes de continuar.',
    norma:
      'Ley 769 de 2002 (CNTT), Art. 67 — Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'ceda-el-paso',
    nombre: 'Ceda el Paso',
    categoria: 'reglamentaria',
    imagen: '/senales/ceda-el-paso.svg',
    alt: 'Triangulo invertido blanco con borde rojo y texto CEDA EL PASO',
    significado:
      'Indica que el conductor debe reducir la velocidad y ceder el paso a todos los vehiculos y peatones que circulan por la via prioritaria, antes de continuar.',
    norma:
      'Ley 769 de 2002 (CNTT), Art. 60 — Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'no-entre',
    nombre: 'No Entre',
    categoria: 'reglamentaria',
    imagen: '/senales/no-entre.svg',
    alt: 'Circulo rojo relleno con barra blanca horizontal',
    significado:
      'La senal de no entre (circulo rojo relleno con barra blanca horizontal) indica que el ingreso a esa via esta prohibido para todos los vehiculos. Circular en sentido contrario es una grave infraccion.',
    metaDescription:
      'Senal No Entre: circulo rojo con barra blanca indica via prohibida para todos los vehiculos. Circular en sentido contrario es infraccion grave.',
    norma:
      'Ley 769 de 2002 (CNTT) — Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-10',
    nombre: 'Velocidad maxima 10 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-10.svg',
    alt: 'Circulo blanco con borde rojo y el numero 10 en negro',
    significado:
      'Fija la velocidad maxima en 10 km/h, propia de zonas de alta presencia de peatones como parqueaderos, peajes y vias internas. Superarlo es una infraccion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-20',
    nombre: 'Velocidad maxima 20 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-20.svg',
    alt: 'Circulo blanco con borde rojo y el numero 20 en negro',
    significado:
      'Fija la velocidad maxima en 20 km/h en tramos que exigen precaucion extrema. Superar este limite constituye una infraccion de transito.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-30',
    nombre: 'Velocidad maxima 30 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-30.svg',
    alt: 'Circulo blanco con borde rojo y el numero 30 en negro',
    significado:
      'El circulo rojo con numero indica velocidad maxima reglamentaria. Circular por encima de 30 km/h en esa via es una infraccion. Aplica en zonas escolares y residenciales segun la Ley 2251 de 2022.',
    metaDescription:
      'Velocidad maxima 30 km/h: limite reglamentario en zonas escolares y residenciales (Ley 2251 de 2022). Superarlo es una infraccion de transito.',
    norma:
      'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024) — Ley 2251 de 2022 (velocidades en zonas escolares)',
  },
  {
    slug: 'velocidad-maxima-40',
    nombre: 'Velocidad maxima 40 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-40.svg',
    alt: 'Circulo blanco con borde rojo y el numero 40 en negro',
    significado:
      'Fija la velocidad maxima en 40 km/h, habitual en vias urbanas secundarias. Superar este limite constituye una infraccion de transito.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-50',
    nombre: 'Velocidad maxima 50 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-50.svg',
    alt: 'Circulo blanco con borde rojo y el numero 50 en negro',
    significado:
      'Fija la velocidad maxima en 50 km/h, el limite general en vias urbanas tras la Ley 2251 de 2022. Superarlo constituye una infraccion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024) — Ley 2251 de 2022',
  },
  {
    slug: 'velocidad-maxima-60',
    nombre: 'Velocidad maxima 60 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-60.svg',
    alt: 'Circulo blanco con borde rojo y el numero 60 en negro',
    significado:
      'El circulo blanco con borde rojo y el numero 60 es una senal restrictiva que fija la velocidad maxima permitida en 60 km/h en ese tramo. Superar este limite constituye una infraccion de transito.',
    metaDescription:
      'Velocidad maxima 60 km/h: senal restrictiva que fija el limite en ese tramo. Superarlo constituye una infraccion de transito.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-70',
    nombre: 'Velocidad maxima 70 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-70.svg',
    alt: 'Circulo blanco con borde rojo y el numero 70 en negro',
    significado:
      'Fija la velocidad maxima en 70 km/h en ese tramo. Superar este limite constituye una infraccion de transito.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-80',
    nombre: 'Velocidad maxima 80 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-80.svg',
    alt: 'Circulo blanco con borde rojo y el numero 80 en negro',
    significado:
      'El circulo blanco con borde rojo y el numero 80 es una senal restrictiva que fija la velocidad maxima permitida en 80 km/h en ese tramo. Es el limite habitual en vias rurales segun la Ley 2251 de 2022.',
    metaDescription:
      'Velocidad maxima 80 km/h: limite habitual en vias rurales (Ley 2251 de 2022). Senal restrictiva; superarlo es infraccion de transito.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024) — Ley 2251 de 2022',
  },
  {
    slug: 'velocidad-maxima-100',
    nombre: 'Velocidad maxima 100 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-100.svg',
    alt: 'Circulo blanco con borde rojo y el numero 100 en negro',
    significado:
      'Fija la velocidad maxima en 100 km/h, habitual en vias rurales nacionales de doble calzada. Superarlo constituye una infraccion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-110',
    nombre: 'Velocidad maxima 110 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-110.svg',
    alt: 'Circulo blanco con borde rojo y el numero 110 en negro',
    significado:
      'Fija la velocidad maxima en 110 km/h, presente en algunas autopistas de doble calzada. Superar este limite constituye una infraccion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'velocidad-maxima-120',
    nombre: 'Velocidad maxima 120 km/h',
    categoria: 'reglamentaria',
    imagen: '/senales/velocidad-maxima-120.svg',
    alt: 'Circulo blanco con borde rojo y el numero 120 en negro',
    significado:
      'Fija la velocidad maxima en 120 km/h, el limite mas alto permitido, habitual en autopistas de doble calzada. Superarlo constituye una infraccion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-girar-izquierda',
    nombre: 'Prohibido girar a la izquierda',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-girar-izquierda.svg',
    alt: 'Circulo blanco con borde rojo y flecha curva a la izquierda tachada',
    significado:
      'Giro a la izquierda prohibido para todos los vehiculos en esa interseccion. El conductor debe continuar de frente o girar a la derecha si la senalizacion lo permite.',
    metaDescription:
      'Prohibido girar a la izquierda: ningun vehiculo puede doblar en esa interseccion. Continuar de frente o girar a la derecha.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-parquear',
    nombre: 'Prohibido parquear',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-parquear.svg',
    alt: 'Circulo blanco con borde rojo, letra P negra y barra diagonal roja',
    significado:
      "La senal de prohibido parquear (circulo con 'P' y barra diagonal roja) indica que detener o estacionar el vehiculo en esa zona esta prohibido. Hacerlo puede resultar en inmovilizacion del vehiculo y multa.",
    metaDescription:
      "Prohibido parquear: la senal con 'P' y barra roja prohibe estacionar. Hacerlo puede resultar en inmovilizacion y multa.",
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'curva-peligrosa-derecha',
    nombre: 'Curva peligrosa a la derecha',
    categoria: 'preventiva',
    imagen: '/senales/curva-peligrosa-derecha.svg',
    alt: 'Rombo amarillo con flecha curva indicando una curva hacia la derecha',
    significado:
      'El rombo amarillo con flecha curva es una senal preventiva que advierte una curva peligrosa a la derecha; el conductor debe reducir la velocidad y mantenerse en su carril para afrontar la curva con seguridad.',
    metaDescription:
      'Curva peligrosa a la derecha: rombo amarillo que advierte curva riesgosa. Reducir velocidad y mantenerse en carril.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'glorieta',
    nombre: 'Glorieta',
    categoria: 'preventiva',
    imagen: '/senales/glorieta.svg',
    alt: 'Rombo amarillo con flechas circulares formando un anillo',
    significado:
      'El rombo amarillo con flechas circulares advierte la proximidad de una glorieta. El conductor debe ceder el paso a quienes ya circulan dentro de la rotonda y ajustar la velocidad antes de ingresar.',
    metaDescription:
      'Glorieta: rombo amarillo que advierte una rotonda proxima. Ceder el paso a quienes ya circulan dentro y ajustar velocidad.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'peatones',
    nombre: 'Zona de peatones',
    categoria: 'preventiva',
    imagen: '/senales/peatones.svg',
    alt: 'Rombo amarillo con figura de peaton caminando',
    significado:
      'El rombo amarillo con figura de peaton es una senal preventiva que advierte la presencia de peatones en la via o zona adyacente; el conductor debe reducir velocidad y ceder el paso.',
    metaDescription:
      'Zona de peatones: rombo amarillo que advierte presencia de personas en la via. Reducir velocidad y ceder el paso.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
];
