// Catalogo de senales. Arte: las senales geometricas/textuales (PARE, velocidades, etc.)
// son SVG propios; las pictograficas provienen de Wikimedia Commons "SVG road signs in
// Colombia" (etiquetadas PD-ineligible, sin atribucion requerida).
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
  {
    slug: 'curva-peligrosa-izquierda',
    nombre: 'Curva peligrosa a la izquierda',
    categoria: 'preventiva',
    imagen: '/senales/curva-peligrosa-izquierda.svg',
    alt: 'Rombo amarillo con flecha negra que dobla a la izquierda',
    significado:
      'Advierte una curva peligrosa hacia la izquierda. El conductor debe reducir la velocidad y mantenerse en su carril antes de tomarla.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'curva-y-contracurva',
    nombre: 'Curva y contracurva',
    categoria: 'preventiva',
    imagen: '/senales/curva-y-contracurva.svg',
    alt: 'Rombo amarillo con flecha en forma de S que indica curva y contracurva',
    significado:
      'Advierte una curva seguida de otra en sentido contrario. Reducir la velocidad y extremar la atencion en ambos giros.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'interseccion',
    nombre: 'Interseccion de vias',
    categoria: 'preventiva',
    imagen: '/senales/interseccion.svg',
    alt: 'Rombo amarillo con una cruz negra que representa una interseccion de vias',
    significado:
      'Advierte un cruce de vias a nivel adelante. Reducir la velocidad y estar atento a los vehiculos que ingresan por la via transversal.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'semaforo',
    nombre: 'Semaforo',
    categoria: 'preventiva',
    imagen: '/senales/semaforo.svg',
    alt: 'Rombo amarillo con un semaforo de tres luces: roja, amarilla y verde',
    significado:
      'Advierte la proximidad de un semaforo. El conductor debe disminuir la velocidad y prepararse para detenerse segun la luz.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'resalto',
    nombre: 'Resalto',
    categoria: 'preventiva',
    imagen: '/senales/resalto.svg',
    alt: 'Rombo amarillo con la silueta de un resalto sobre la calzada',
    significado:
      'Advierte un resalto o reductor de velocidad sobre la via. El conductor debe disminuir la velocidad para pasarlo con seguridad.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'pare-adelante',
    nombre: 'Prevencion de pare',
    categoria: 'preventiva',
    imagen: '/senales/pare-adelante.svg',
    alt: 'Rombo amarillo con una senal de PARE roja y una flecha hacia arriba',
    significado:
      'Anticipa una senal de PARE mas adelante. El conductor debe prepararse para detenerse por completo en el punto indicado.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'ceda-el-paso-adelante',
    nombre: 'Prevencion de ceda el paso',
    categoria: 'preventiva',
    imagen: '/senales/ceda-el-paso-adelante.svg',
    alt: 'Rombo amarillo con una senal de Ceda el Paso y una flecha hacia arriba',
    significado:
      'Anticipa una senal de Ceda el Paso mas adelante. El conductor debe prepararse para ceder el paso a la via prioritaria.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'tunel',
    nombre: 'Tunel',
    categoria: 'preventiva',
    imagen: '/senales/tunel.svg',
    alt: 'Rombo amarillo con la entrada de un tunel',
    significado:
      'Advierte la proximidad de un tunel. El conductor debe encender las luces, reducir la velocidad y no adelantar dentro del tunel.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'zona-derrumbe',
    nombre: 'Zona de derrumbe',
    categoria: 'preventiva',
    imagen: '/senales/zona-derrumbe.svg',
    alt: 'Rombo amarillo con un vehiculo y rocas cayendo por una ladera',
    significado:
      'Advierte una zona propensa a derrumbes o caida de rocas sobre la via. Extremar la precaucion y estar atento a obstaculos en la calzada.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'superficie-deslizante',
    nombre: 'Superficie deslizante',
    categoria: 'preventiva',
    imagen: '/senales/superficie-deslizante.svg',
    alt: 'Rombo amarillo con un vehiculo derrapando sobre marcas de deslizamiento',
    significado:
      'Advierte que la via puede ser deslizante, sobre todo con lluvia. Reducir la velocidad y evitar frenadas y maniobras bruscas.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'maquinaria-agricola',
    nombre: 'Maquinaria agricola en la via',
    categoria: 'preventiva',
    imagen: '/senales/maquinaria-agricola.svg',
    alt: 'Rombo amarillo con la silueta de un tractor',
    significado:
      'Advierte la posible presencia de maquinaria agricola en la via. El conductor debe reducir la velocidad y extremar la atencion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'zona-escolar',
    nombre: 'Zona escolar',
    categoria: 'preventiva',
    imagen: '/senales/zona-escolar.svg',
    alt: 'Pentagono verde con la figura de dos estudiantes caminando',
    significado:
      'Pentagono verde que advierte una zona escolar y el cruce de estudiantes. Reducir la velocidad al maximo y ceder el paso a los ninos.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024) — Ley 2251 de 2022',
  },
  {
    slug: 'animales-en-via',
    nombre: 'Animales en la via',
    categoria: 'preventiva',
    imagen: '/senales/animales-en-via.svg',
    alt: 'Rombo amarillo con la silueta de una vaca',
    significado:
      'Advierte la posible presencia o el cruce de animales en la via. El conductor debe reducir la velocidad y estar preparado para detenerse.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'siga-de-frente',
    nombre: 'Siga de frente',
    categoria: 'reglamentaria',
    imagen: '/senales/siga-de-frente.svg',
    alt: 'Circulo blanco con borde rojo y una flecha negra hacia arriba',
    significado:
      'Senal reglamentaria que obliga a seguir de frente; no se permite girar en esa interseccion.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'giro-obligatorio-izquierda',
    nombre: 'Giro solo a la izquierda',
    categoria: 'reglamentaria',
    imagen: '/senales/giro-obligatorio-izquierda.svg',
    alt: 'Circulo blanco con borde rojo y una flecha que gira a la izquierda',
    significado: 'Indica que en esa interseccion solo se permite girar a la izquierda.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'giro-obligatorio-derecha',
    nombre: 'Giro solo a la derecha',
    categoria: 'reglamentaria',
    imagen: '/senales/giro-obligatorio-derecha.svg',
    alt: 'Circulo blanco con borde rojo y una flecha que gira a la derecha',
    significado: 'Indica que en esa interseccion solo se permite girar a la derecha.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-girar-derecha',
    nombre: 'Prohibido girar a la derecha',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-girar-derecha.svg',
    alt: 'Circulo blanco con borde rojo y una flecha a la derecha tachada',
    significado:
      'Giro a la derecha prohibido para todos los vehiculos en esa interseccion. El conductor debe continuar de frente o girar a la izquierda si se permite.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-giro-en-u',
    nombre: 'Prohibido giro en U',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-giro-en-u.svg',
    alt: 'Circulo blanco con borde rojo y una flecha en forma de U tachada',
    significado:
      'Prohibe hacer un giro en U para regresar en sentido contrario en ese punto de la via.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-vehiculos-automotores',
    nombre: 'Circulacion prohibida de vehiculos automotores',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-vehiculos-automotores.svg',
    alt: 'Circulo blanco con borde rojo y la silueta de un automovil tachada',
    significado: 'Prohibe la circulacion de todos los vehiculos automotores por esa via.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-vehiculos-carga',
    nombre: 'Circulacion prohibida de vehiculos de carga',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-vehiculos-carga.svg',
    alt: 'Circulo blanco con borde rojo y la silueta de un camion tachada',
    significado: 'Prohibe la circulacion de vehiculos de carga (camiones) por esa via.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-peatones',
    nombre: 'Circulacion prohibida de peatones',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-peatones.svg',
    alt: 'Circulo blanco con borde rojo y la silueta de un peaton tachada',
    significado:
      'Prohibe la circulacion de peatones por esa via; deben usar una ruta alterna segura.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-motocicletas',
    nombre: 'Circulacion prohibida de motocicletas',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-motocicletas.svg',
    alt: 'Circulo blanco con borde rojo y la silueta de una motocicleta tachada',
    significado: 'Prohibe la circulacion de motocicletas por esa via.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-adelantar',
    nombre: 'Prohibido adelantar',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-adelantar.svg',
    alt: 'Circulo blanco con borde rojo y dos automoviles con una barra diagonal',
    significado: 'Prohibe adelantar o rebasar a otro vehiculo en ese tramo de la via.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-parquear-detener',
    nombre: 'No parquear ni detenerse',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-parquear-detener.svg',
    alt: 'Circulo blanco con borde rojo, letra P y dos barras rojas en X',
    significado:
      'Prohibe tanto parquear como detenerse en esa zona, ni siquiera por unos segundos.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'prohibido-pitar',
    nombre: 'Prohibido pitar',
    categoria: 'reglamentaria',
    imagen: '/senales/prohibido-pitar.svg',
    alt: 'Circulo blanco con borde rojo y una corneta o bocina tachada',
    significado: 'Prohibe el uso del pito o la bocina en esa zona, salvo en caso de emergencia.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'altura-maxima',
    nombre: 'Altura maxima permitida',
    categoria: 'reglamentaria',
    imagen: '/senales/altura-maxima.svg',
    alt: 'Circulo blanco con borde rojo y un valor de altura entre dos triangulos verticales',
    significado:
      'Indica la altura maxima permitida; ningun vehiculo mas alto que el valor senalado puede pasar.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
  {
    slug: 'ancho-maximo',
    nombre: 'Ancho maximo permitido',
    categoria: 'reglamentaria',
    imagen: '/senales/ancho-maximo.svg',
    alt: 'Circulo blanco con borde rojo y un valor de ancho entre dos triangulos horizontales',
    significado:
      'Indica el ancho maximo permitido; ningun vehiculo mas ancho que el valor senalado puede pasar.',
    norma: 'Manual de Senalizacion Vial (Resolucion 20243040045005 de 2024)',
  },
];
