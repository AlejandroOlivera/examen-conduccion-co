import type { GroupId, Question, VehicleCategory } from './types';
import { withCategory } from './category';

/**
 * Banco de preguntas del taller. Las opciones se almacenan en su orden
 * "natural"; la isla de cliente las baraja en cada intento para que la
 * posicion de la respuesta correcta no sea predecible.
 *
 * Las preguntas se definen por categoria de vehiculo (sin el campo
 * `category`) y se etiquetan al componer `QUESTIONS` al final del archivo.
 *
 * Fuentes: Ley 769 de 2002 (CNTT) y reformas (Ley 1383/2010, Ley 1696/2013,
 * Ley 2161/2021, Ley 2251/2022) y Resolucion 20253040037125 de 2025 (CALE).
 */
const CARRO_QUESTIONS = [
  // ───────────────────────── GRUPO I ─────────────────────────
  {
    id: 'g1-01',
    group: 'I',
    prompt:
      'Las normas que regulan la circulacion de peatones, pasajeros, conductores y vehiculos en Colombia estan contenidas principalmente en:',
    options: [
      'El Registro Unico Nacional de Transito (RUNT) y sus manuales de tramites',
      'El Codigo Nacional de Transito Terrestre (Ley 769 de 2002)',
      'La Agencia Nacional de Seguridad Vial',
      'Los Centros de Reconocimiento de Conductores',
    ],
    answer: 1,
    explanation:
      'El CNTT (Ley 769 de 2002) es la norma marco que regula el transito en todo el territorio nacional.',
  },
  {
    id: 'g1-02',
    group: 'I',
    prompt: 'La maxima autoridad de transito en Colombia es:',
    options: [
      'La Policia Nacional',
      'El Ministerio de Transporte',
      'La Superintendencia de Transporte',
      'Los gobernadores y alcaldes',
    ],
    answer: 1,
    explanation:
      'Segun el Art. 3 del CNTT, el Ministerio de Transporte es la maxima autoridad en politica y reglamentacion de transito.',
  },
  {
    id: 'g1-03',
    group: 'I',
    prompt: 'La licencia de transito es:',
    options: [
      'El documento publico, personal e intransferible que autoriza a una persona a conducir en todo el pais',
      'El SOAT del vehiculo',
      'El documento publico que identifica al vehiculo, acredita su propiedad y lo autoriza a circular',
      'El certificado de la revision tecnico-mecanica',
    ],
    answer: 2,
    explanation:
      'La licencia de transito (tarjeta de propiedad) identifica al vehiculo y acredita su propiedad; no debe confundirse con la licencia de conduccion.',
  },
  {
    id: 'g1-04',
    group: 'I',
    prompt: 'La licencia de conduccion es:',
    options: [
      'Un documento que pertenece al vehiculo',
      'Un documento publico, personal e intransferible que autoriza a su titular a conducir',
      'Un permiso temporal que entrega el CEA',
      'Un certificado opcional que los mayores de 18 anios solo necesitan en viajes intermunicipales',
    ],
    answer: 1,
    explanation:
      'Es personal e intransferible y habilita a la persona (no al vehiculo) para conducir en el pais.',
  },
  {
    id: 'g1-05',
    group: 'I',
    prompt:
      'La categoria que habilita para conducir automoviles particulares (carro mecanico de uso familiar) es:',
    options: ['A2', 'B1', 'C1', 'B2'],
    answer: 1,
    explanation:
      'B1 habilita para automoviles, camperos, camionetas, microbuses y motocarros de servicio particular.',
  },
  {
    id: 'g1-06',
    group: 'I',
    prompt: 'La vigencia de la licencia de conduccion para un conductor de 25 anios es de:',
    options: ['5 anios', '1 anio', '10 anios', 'Indefinida'],
    answer: 2,
    explanation:
      'Para menores de 60 anios la vigencia es de 10 anios; 5 anios entre 60 y 80; 1 anio para mayores de 80.',
  },
  {
    id: 'g1-07',
    group: 'I',
    prompt: 'El SOAT es:',
    options: [
      'Un seguro voluntario que cubre los danios materiales del vehiculo y de terceros',
      'El Seguro Obligatorio de Accidentes de Transito que ampara a las victimas',
      'Un impuesto departamental',
      'Un certificado de emisiones',
    ],
    answer: 1,
    explanation:
      'El SOAT es obligatorio y ampara a las victimas de siniestros viales (gastos medicos, incapacidad, muerte).',
  },
  {
    id: 'g1-08',
    group: 'I',
    prompt: 'El RUNT es:',
    options: [
      'El Registro Unico Nacional de Transito, que centraliza la informacion de conductores y vehiculos',
      'Una empresa privada de aseguradoras',
      'La autoridad nacional de transito que impone los comparendos y recauda las multas en todo el territorio',
      'Un sistema solo para motocicletas',
    ],
    answer: 0,
    explanation:
      'El RUNT integra y centraliza los registros de transito a nivel nacional (Art. 8 CNTT).',
  },
  {
    id: 'g1-09',
    group: 'I',
    prompt: 'Antes de iniciar la marcha, el conductor debe verificar:',
    options: [
      'Solo el nivel de gasolina, pues lo demas se revisa en la tecnico-mecanica anual',
      'Espejos, cinturon, frenos, direccion, luces y niveles del motor',
      'Unicamente que el motor encienda y no muestre testigos rojos en el tablero',
      'Que el radio y el aire acondicionado funcionen correctamente antes de salir',
    ],
    answer: 1,
    explanation:
      'La inspeccion previa (mantenimiento preventivo) reduce el riesgo de fallas y siniestros.',
  },
  {
    id: 'g1-10',
    group: 'I',
    prompt: 'En un carro de transmision mecanica, el pedal del embrague se ubica:',
    options: [
      'A la derecha del freno',
      'En el centro, entre el acelerador y el freno, para pisarlo con cualquier pie',
      'A la izquierda del freno, accionado con el pie izquierdo',
      'Es el mismo pedal del freno',
    ],
    answer: 2,
    explanation:
      'De izquierda a derecha: embrague, freno y acelerador. El embrague se acciona con el pie izquierdo.',
  },
  {
    id: 'g1-11',
    group: 'I',
    prompt: 'La funcion principal del embrague (clutch) en un carro mecanico es:',
    options: [
      'Aumentar la potencia del motor inyectando mas combustible cada vez que se pisa a fondo el pedal',
      'Acoplar y desacoplar el motor de la caja de cambios para cambiar de marcha sin danio',
      'Frenar el vehiculo',
      'Activar las luces direccionales',
    ],
    answer: 1,
    explanation:
      'El embrague conecta y desconecta el motor de la transmision, permitiendo cambiar de marcha de forma segura.',
  },
  {
    id: 'g1-12',
    group: 'I',
    prompt: 'Para arrancar el motor de un carro mecanico desde detenido se recomienda:',
    options: [
      'Acelerar mientras se gira la llave',
      'Pisar a fondo el embrague, dejar la palanca en neutro y girar la llave',
      'Dejar el carro en segunda marcha y arrancar',
      'Halar el freno de mano hasta el tope y girar la llave sin pisar ningun pedal',
    ],
    answer: 1,
    explanation:
      'Arrancar en neutro con el embrague pisado evita que el carro salte hacia adelante.',
  },
  {
    id: 'g1-13',
    group: 'I',
    prompt: 'El nivel correcto del aceite del motor se verifica:',
    options: [
      'Con el motor encendido y caliente al maximo',
      'Con el motor apagado, en superficie plana y tras unos minutos para que el aceite baje al carter',
      'Solo en un taller especializado',
      'Mirando el tablero, nunca con la varilla',
    ],
    answer: 1,
    explanation: 'En plano y con el motor en reposo la lectura de la varilla es confiable.',
  },
  {
    id: 'g1-14',
    group: 'I',
    prompt: 'Si el testigo rojo de temperatura se enciende mientras conduces, debes:',
    options: [
      'Acelerar para alejarte rapido',
      'Detenerte en lugar seguro, apagar el motor y dejar enfriar antes de revisar el refrigerante',
      'Apagar el aire acondicionado y seguir varias horas',
      'Ignorarlo si el motor no hace ruido',
    ],
    answer: 1,
    explanation:
      'El sobrecalentamiento puede fundir el motor; detenerse y dejar enfriar evita un danio grave.',
  },
  {
    id: 'g1-15',
    group: 'I',
    prompt: 'El testigo del aceite (lampara roja en forma de aceitera) significa:',
    options: [
      'Falta gasolina',
      'Presion de aceite baja: detener cuanto antes para evitar danio grave del motor',
      'Hace falta cambiar el filtro de aire',
      'Esta mal puesto el cinturon',
    ],
    answer: 1,
    explanation:
      'La baja presion de aceite puede destruir el motor en minutos; hay que detenerse de inmediato.',
  },
  {
    id: 'g1-16',
    group: 'I',
    prompt: 'El freno de mano (o de estacionamiento) sirve para:',
    options: [
      'Frenar el vehiculo en marcha en lugar del freno de pie',
      'Inmovilizar el vehiculo cuando esta estacionado',
      'Cambiar las marchas mas rapido sin pisar el embrague',
      'Reemplazar la funcion del pedal del embrague al arrancar',
    ],
    answer: 1,
    explanation: 'Mantiene el vehiculo inmovil al estacionar y asiste el arranque en pendiente.',
  },
  {
    id: 'g1-17',
    group: 'I',
    prompt:
      'Al estacionar un carro mecanico mirando hacia arriba en una pendiente con sardinel, lo correcto es:',
    options: [
      'Dejarlo en neutro y sin freno de mano',
      'Dejarlo en primera, freno de mano puesto y ruedas delanteras giradas hacia afuera del sardinel',
      'Dejarlo en reversa con las ruedas hacia el sardinel',
      'Es igual que en superficie plana',
    ],
    answer: 1,
    explanation:
      'En subida se deja primera y se giran las ruedas de modo que, si rueda, el sardinel lo detenga.',
  },
  {
    id: 'g1-18',
    group: 'I',
    prompt: 'Al estacionar un carro mecanico mirando hacia abajo en una pendiente, lo correcto es:',
    options: [
      'Dejarlo en primera con las ruedas delanteras giradas hacia afuera, igual que al estacionar en subida',
      'Dejarlo en reversa, freno de mano puesto y ruedas delanteras giradas hacia el sardinel',
      'Sin freno de mano pero en cuarta marcha',
      'Solo con el freno de pedal pisado',
    ],
    answer: 1,
    explanation:
      'En bajada se deja reversa y las ruedas hacia el sardinel para que lo frene si llega a rodar.',
  },
  {
    id: 'g1-19',
    group: 'I',
    prompt:
      'El examen de aptitud fisica, mental y de coordinacion motriz para la licencia se realiza en:',
    options: [
      'Cualquier clinica u hospital que cuente con medico general y sala de espera',
      'Un Centro de Reconocimiento de Conductores (CRC) registrado en el RUNT',
      'El Ministerio de Transporte directamente, en jornadas que organiza en sus sedes regionales',
      'Cualquier escuela de manejo que cuente con instructores certificados y pista propia',
    ],
    answer: 1,
    explanation: 'El certificado de aptitud lo expide un CRC habilitado y registrado en el RUNT.',
  },
  {
    id: 'g1-20',
    group: 'I',
    prompt: 'El curso teorico-practico para obtener la licencia se realiza en:',
    options: [
      'El RUNT',
      'Un Centro de Ensenanza Automovilistica (CEA) registrado en el RUNT',
      'La Policia de Transito',
      'Un Centro de Apoyo Logistico de Evaluacion (CALE) habilitado por el Ministerio',
    ],
    answer: 1,
    explanation: 'Los CEA imparten la formacion; los CALE evaluan; el CRC certifica aptitud.',
  },

  // ───────────────────────── GRUPO II ─────────────────────────
  {
    id: 'g2-01',
    group: 'II',
    prompt: 'El peaton debe cruzar la calzada:',
    options: [
      'Por cualquier punto que elija, ya que el peaton conserva prioridad absoluta sobre los vehiculos',
      'Por los pasos peatonales (cebras, puentes o semaforos peatonales), respetando las senales',
      'Corriendo entre carros para ganar tiempo',
      'Unicamente de noche',
    ],
    answer: 1,
    explanation:
      'El peaton tiene deberes: debe usar los cruces habilitados y respetar la senalizacion.',
  },
  {
    id: 'g2-02',
    group: 'II',
    prompt: 'El uso del cinturon de seguridad en Colombia es obligatorio para:',
    options: [
      'Solo el conductor',
      'Conductor y copiloto',
      'Todos los ocupantes, en cualquier asiento',
      'Unicamente en carretera, porque en zona urbana las velocidades bajas no lo exigen',
    ],
    answer: 2,
    explanation:
      'Todos los ocupantes deben usar cinturon, en cualquier asiento y en cualquier via.',
  },
  {
    id: 'g2-03',
    group: 'II',
    prompt: 'Los menores de 10 anios deben:',
    options: [
      'Ir en el asiento delantero con cinturon',
      'Ir en los asientos traseros, con sistema de retencion infantil acorde a su edad, peso y estatura',
      'Ir sin ninguna restriccion especial siempre que viajen acompaniados por sus padres o un adulto responsable',
      'Ir en el regazo de un adulto',
    ],
    answer: 1,
    explanation:
      'Los menores de 10 anios viajan atras y con sistema de retencion infantil adecuado.',
  },
  {
    id: 'g2-04',
    group: 'II',
    prompt: 'Al aproximarse a un cruce no senalizado, el conductor debe:',
    options: [
      'Acelerar para pasar primero',
      'Reducir la velocidad y ceder el paso al vehiculo que se aproxima por la derecha',
      'Tocar la bocina con anticipacion y pasar de primero sin reducir la velocidad',
      'Detenerse durante cinco minutos completos antes de cruzar, sin importar si la via esta libre',
    ],
    answer: 1,
    explanation:
      'Sin senalizacion, la prioridad es para quien viene por la derecha; siempre se reduce la velocidad.',
  },
  {
    id: 'g2-05',
    group: 'II',
    prompt: 'El uso de las luces direccionales es obligatorio:',
    options: [
      'Solo de noche',
      'Al girar, cambiar de carril, adelantar y entrar o salir de una via',
      'Solo en carretera',
      'Es opcional cuando hay buena visibilidad y los demas conductores pueden anticipar la maniobra',
    ],
    answer: 1,
    explanation: 'Anunciar la maniobra con direccionales previene siniestros y es obligatorio.',
  },
  {
    id: 'g2-06',
    group: 'II',
    prompt: 'Tienen prioridad absoluta en la via:',
    options: [
      'Los camiones de carga',
      'Los buses intermunicipales, por transportar un mayor numero de pasajeros',
      'Los vehiculos de emergencia en servicio, con luces y sirena activas',
      'Los carros particulares de mayor cilindraje',
    ],
    answer: 2,
    explanation: 'Los vehiculos de emergencia en servicio tienen prioridad sobre todos los demas.',
  },
  {
    id: 'g2-07',
    group: 'II',
    prompt: 'Para adelantar a otro vehiculo en una via de doble sentido es necesario:',
    options: [
      'Hacerlo por la derecha en cualquier momento',
      'Verificar visibilidad, espacio y linea segmentada; senalizar y adelantar por la izquierda',
      'Acelerar al maximo sin senalizar',
      'Hacerlo en cualquier tramo, incluso en curvas, puentes y tuneles, si el de adelante va muy despacio',
    ],
    answer: 1,
    explanation:
      'El adelantamiento se hace por la izquierda, con visibilidad, senalizando y solo donde este permitido.',
  },
  {
    id: 'g2-08',
    group: 'II',
    prompt: 'Esta prohibido adelantar en:',
    options: [
      'Curvas, puentes, tuneles, pasos a nivel, cruces, lineas continuas y zonas escolares',
      'Solo en autopistas y vias de doble calzada, debido a las altas velocidades que alli se alcanzan',
      'Unicamente de noche',
      'Nunca, siempre se puede adelantar',
    ],
    answer: 0,
    explanation:
      'En esos puntos la visibilidad o el riesgo hacen que adelantar este expresamente prohibido.',
  },
  {
    id: 'g2-09',
    group: 'II',
    prompt: 'El uso del celular mientras se conduce:',
    options: [
      'Es libre si vas a baja velocidad',
      'Esta prohibido, salvo con sistema manos libres que no requiera manipulacion',
      'Solo esta prohibido escribir mensajes; hablar con el telefono en la mano esta permitido',
      'Esta permitido si el carro es automatico',
    ],
    answer: 1,
    explanation:
      'Manipular el celular distrae y esta prohibido; solo se admite manos libres sin manipulacion.',
  },
  {
    id: 'g2-10',
    group: 'II',
    prompt: 'Al circular bajo lluvia intensa, el conductor debe:',
    options: [
      'Acelerar para no quedar atrapado',
      'Reducir la velocidad, encender luces bajas y aumentar la distancia de seguridad',
      'Encender las luces altas para mejorar la visibilidad a traves de la cortina de agua',
      'Apagar las luces para no encandilar',
    ],
    answer: 1,
    explanation:
      'Con lluvia el agarre baja: menos velocidad, mas distancia y luces bajas (las altas reflejan en la lluvia).',
  },
  {
    id: 'g2-11',
    group: 'II',
    prompt: 'Las luces altas (plenas) deben:',
    options: [
      'Usarse permanentemente en ciudad',
      'Cambiarse a bajas ante un vehiculo de frente o al circular detras de otro',
      'Usarse para saludar',
      'Mantenerse encendidas en zonas escolares para alertar a los ninios del paso del vehiculo',
    ],
    answer: 1,
    explanation:
      'Las luces altas encandilan; deben bajarse ante vehiculos de frente o que van adelante.',
  },
  {
    id: 'g2-12',
    group: 'II',
    prompt: 'La distancia de seguridad con el vehiculo de adelante debe ser:',
    options: [
      'Un metro siempre',
      'Suficiente para detenerse con seguridad segun la velocidad y el estado de la via',
      'Solo se aplica en carretera',
      'No existe esta regla; cada conductor la define segun su propia experiencia al volante',
    ],
    answer: 1,
    explanation:
      'La distancia depende de la velocidad; la regla de los 2-3 segundos es una guia practica.',
  },
  {
    id: 'g2-13',
    group: 'II',
    prompt: 'En una glorieta (rotonda), la prioridad la tiene:',
    options: [
      'El que va a entrar, porque quienes circulan adentro deben facilitar la incorporacion',
      'El que ya circula dentro de la glorieta',
      'El de mayor tamanio, por su menor capacidad de frenado y maniobra',
      'El que llegue circulando a mayor velocidad',
    ],
    answer: 1,
    explanation:
      'Quien ya circula dentro de la glorieta tiene la prioridad; el que entra cede el paso.',
  },
  {
    id: 'g2-14',
    group: 'II',
    prompt: 'En un semaforo en amarillo intermitente debes:',
    options: [
      'Detenerte siempre por completo, como ante una senal de PARE',
      'Reducir la velocidad, mirar y pasar con precaucion',
      'Acelerar de inmediato para cruzar antes de que lleguen otros vehiculos',
      'Tratarlo exactamente igual que un semaforo en rojo fijo',
    ],
    answer: 1,
    explanation: 'El amarillo intermitente significa precaucion: reducir y avanzar verificando.',
  },
  {
    id: 'g2-15',
    group: 'II',
    prompt: 'En un semaforo en rojo intermitente debes:',
    options: [
      'Pasar sin detenerte',
      'Detener completamente y avanzar solo cuando sea seguro (equivale a un PARE)',
      'Reducir la velocidad y pasar con precaucion, sin necesidad de detenerte por completo',
      'Ignorarlo si no hay otros carros',
    ],
    answer: 1,
    explanation: 'El rojo intermitente equivale a la senal PARE: alto total y ceder el paso.',
  },
  {
    id: 'g2-16',
    group: 'II',
    prompt: 'Los motociclistas y ciclistas son considerados usuarios:',
    options: [
      'De menor importancia',
      'Vulnerables, por lo que se debe extremar precaucion y respetar su espacio',
      'Iguales a un camion',
      'No estan regulados por el Codigo Nacional de Transito, que solo aplica a automotores',
    ],
    answer: 1,
    explanation:
      'El enfoque de Sistema Seguro (Ley 2251/2022) protege especialmente a los actores viales vulnerables.',
  },
  {
    id: 'g2-17',
    group: 'II',
    prompt: 'Frente a una ambulancia con sirena, el conductor debe:',
    options: [
      'Continuar normalmente',
      'Reducir velocidad, ceder el paso orillandose a la derecha y nunca seguirla aprovechando el paso',
      'Adelantarla',
      'Tocarle bocina',
    ],
    answer: 1,
    explanation: 'Se cede el paso a la emergencia; seguirla "colado" es peligroso e infractor.',
  },
  {
    id: 'g2-18',
    group: 'II',
    prompt: 'El uso del pito o bocina esta reservado para:',
    options: [
      'Saludar a conocidos o agradecer el paso a otros conductores',
      'Apurar al vehiculo de adelante cuando demora en arrancar',
      'Prevenir accidentes en situaciones de riesgo',
      'Reclamar al peaton que cruza por fuera de la cebra',
    ],
    answer: 2,
    explanation: 'La bocina es un elemento de seguridad, no de presion ni saludo.',
  },
  {
    id: 'g2-19',
    group: 'II',
    prompt: 'Si vas conduciendo y te sientes con suenio, lo correcto es:',
    options: [
      'Tomar cafe y seguir',
      'Acelerar para llegar antes',
      'Detenerte en un lugar seguro y descansar; el suenio al volante causa siniestros graves',
      'Bajar el vidrio y subir el volumen',
    ],
    answer: 2,
    explanation: 'La fatiga reduce reflejos como el alcohol; lo seguro es detenerse y descansar.',
  },
  {
    id: 'g2-20',
    group: 'II',
    prompt: 'La obligacion de portar chaleco reflectivo y triangulos se relaciona con:',
    options: [
      'Solo motocicletas',
      'El equipo de prevencion y seguridad del automovil (botiquin, extintor, repuesto, gato, herramientas, 2 triangulos, chaleco)',
      'Solo carros de servicio publico',
      'No es obligatorio',
    ],
    answer: 1,
    explanation:
      'Todo automovil debe portar el equipo de carretera completo para emergencias y averias.',
  },

  // ───────────────────────── GRUPO III ─────────────────────────
  {
    id: 'g3-01',
    group: 'III',
    prompt: 'Las senales reglamentarias suelen ser de fondo:',
    options: [
      'Amarillo con borde negro, sin importar su forma',
      'Blanco con borde rojo (generalmente circulares)',
      'Verde con orla y letras blancas reflectivas',
      'Azul',
    ],
    answer: 1,
    explanation:
      'Las reglamentarias (obligacion/prohibicion) son circulares, fondo blanco y borde rojo.',
  },
  {
    id: 'g3-02',
    group: 'III',
    prompt: 'Una senal de PARE es:',
    options: [
      'Circular roja con una franja blanca horizontal en el centro',
      'Octagonal, fondo rojo, letras blancas que dicen PARE',
      'Triangular amarilla con borde negro y orla reflectiva',
      'Cuadrada azul',
    ],
    answer: 1,
    explanation: 'La senal PARE es octagonal roja; obliga a detencion total.',
  },
  {
    id: 'g3-03',
    group: 'III',
    prompt: 'Las senales preventivas (advierten un peligro) son:',
    options: [
      'Rojas circulares con borde blanco y simbolo reflectivo en el centro',
      'Amarillas, en forma de rombo, con simbolo negro',
      'Verdes',
      'Blancas rectangulares con una flecha direccional',
    ],
    answer: 1,
    explanation:
      'Las preventivas son rombos amarillos con simbolo negro que anuncian un riesgo proximo.',
  },
  {
    id: 'g3-04',
    group: 'III',
    prompt: 'Las senales informativas son habitualmente:',
    options: [
      'Rectangulares azules o verdes',
      'Rojas con una franja blanca horizontal en el centro',
      'Amarillas en forma de rombo con simbolos de color rojo',
      'Octagonales rojas',
    ],
    answer: 0,
    explanation: 'Las informativas (servicios, destinos) son rectangulares azules o verdes.',
  },
  {
    id: 'g3-05',
    group: 'III',
    prompt: 'Una senal azul con una "P" blanca indica:',
    options: [
      'Prohibido parquear en toda la cuadra',
      'Estacionamiento permitido',
      'Paradero exclusivo de buses',
      'Puesto de control de policia adelante',
    ],
    answer: 1,
    explanation: 'La "P" sobre fondo azul informa zona de estacionamiento permitido.',
  },
  {
    id: 'g3-06',
    group: 'III',
    prompt: 'Una linea continua amarilla en el centro de una calzada de doble sentido significa:',
    options: [
      'Se puede adelantar libremente si no viene trafico en sentido contrario',
      'Prohibido adelantar e invadir el carril contrario',
      'Solo se cruza con permiso de la autoridad',
      'Es decorativa',
    ],
    answer: 1,
    explanation:
      'La linea continua prohibe rebasarla; no se puede adelantar ni invadir el sentido contrario.',
  },
  {
    id: 'g3-07',
    group: 'III',
    prompt: 'Una linea discontinua (segmentada) en el centro de la via significa:',
    options: [
      'Esta permitido adelantar si hay visibilidad y seguridad',
      'Prohibido adelantar en cualquier circunstancia, igual que la linea continua',
      'Via cerrada',
      'Calle de un solo sentido',
    ],
    answer: 0,
    explanation:
      'La linea segmentada permite el adelantamiento cuando es seguro y hay visibilidad.',
  },
  {
    id: 'g3-08',
    group: 'III',
    prompt: 'Las flechas pintadas en el pavimento indican:',
    options: [
      'Decoracion',
      'El sentido obligatorio de circulacion del carril',
      'Una direccion apenas sugerida que el conductor puede ignorar',
      'Vias destinadas exclusivamente a bicicletas',
    ],
    answer: 1,
    explanation:
      'Las flechas en el carril indican el movimiento obligatorio (recto, giro) desde ese carril.',
  },
  {
    id: 'g3-09',
    group: 'III',
    prompt: 'La senal del paso peatonal (cebra) obliga al conductor a:',
    options: [
      'Acelerar antes de que el peaton baje a la calzada',
      'Ceder el paso al peaton',
      'Tocar bocina para advertir al peaton que debe esperar',
      'Cambiar de carril sin reducir la velocidad',
    ],
    answer: 1,
    explanation: 'En la cebra el peaton tiene prioridad; el conductor cede el paso.',
  },
  {
    id: 'g3-10',
    group: 'III',
    prompt: 'Una senal preventiva de curva peligrosa indica que el conductor debe:',
    options: [
      'Mantener la velocidad porque la senal es apenas informativa',
      'Reducir la velocidad y no adelantar dentro de la curva',
      'Aumentar la velocidad para salir pronto de la curva',
      'Apagar luces',
    ],
    answer: 1,
    explanation:
      'Ante curva peligrosa se reduce velocidad y no se adelanta por falta de visibilidad.',
  },
  {
    id: 'g3-11',
    group: 'III',
    prompt: 'Un semaforo verde para vehiculos significa:',
    options: [
      'Pasar siempre sin verificar, pues el verde garantiza el cruce despejado',
      'Via libre: avanzar respetando a quien aun termina de cruzar',
      'Acelerar al maximo',
      'Detenerse',
    ],
    answer: 1,
    explanation: 'El verde habilita el paso, pero siempre cediendo a quien aun ocupa el cruce.',
  },
  {
    id: 'g3-12',
    group: 'III',
    prompt: 'Un semaforo en amarillo fijo significa:',
    options: [
      'Acelerar para alcanzar a pasar antes de que cambie a rojo',
      'Prevencion: detenerse si es seguro hacerlo',
      'Cruzar como si fuera verde',
      'Es ignorable',
    ],
    answer: 1,
    explanation: 'El amarillo anuncia el rojo: si se puede detener con seguridad, hay que hacerlo.',
  },
  {
    id: 'g3-13',
    group: 'III',
    prompt: 'Un agente de transito con la mano levantada hacia arriba indica:',
    options: [
      'Continuar la marcha sin detenerse',
      'Alto / detenerse',
      'Girar a la derecha',
      'Adelantar al vehiculo de adelante',
    ],
    answer: 1,
    explanation: 'Las senales del agente priman sobre el semaforo; mano arriba significa alto.',
  },
  {
    id: 'g3-14',
    group: 'III',
    prompt: 'El carril izquierdo en una via de varios carriles se reserva preferentemente para:',
    options: [
      'Estacionamiento',
      'Adelantar o circular mas rapido segun el flujo; no para circular permanentemente',
      'Ciclistas',
      'Vehiculos pesados',
    ],
    answer: 1,
    explanation:
      'El carril izquierdo es de adelantamiento; ocuparlo de forma permanente entorpece el flujo.',
  },
  {
    id: 'g3-15',
    group: 'III',
    prompt: 'En una zona escolar se debe:',
    options: [
      'Mantener 50 km/h, el limite general urbano, sin reducir',
      'Reducir a maximo 30 km/h y extremar precaucion',
      'Tocar bocina constantemente',
      'Estacionar libremente',
    ],
    answer: 1,
    explanation: 'La Ley 2251/2022 fija 30 km/h en zonas escolares y residenciales.',
  },
  {
    id: 'g3-16',
    group: 'III',
    prompt:
      'Una senal de PARE complementada con "via principal" indica que el conductor de la via secundaria debe:',
    options: [
      'Detenerse completamente y ceder el paso',
      'Solo reducir la velocidad, sin necesidad de detenerse del todo',
      'Avanzar primero porque llego antes a la interseccion',
      'Estacionar',
    ],
    answer: 0,
    explanation:
      'Quien llega por la via secundaria con PARE debe detenerse del todo y ceder a la principal.',
  },
  {
    id: 'g3-17',
    group: 'III',
    prompt: 'Un paso a nivel ferroviario exige:',
    options: [
      'Acelerar para cruzar rapido antes de que baje la barrera o suene la alarma',
      'Reducir, mirar a ambos lados y cruzar solo cuando sea seguro',
      'Pasar siempre primero',
      'Estacionarse encima del paso',
    ],
    answer: 1,
    explanation: 'El tren no puede frenar a tiempo; hay que cruzar solo con plena seguridad.',
  },
  {
    id: 'g3-18',
    group: 'III',
    prompt: 'El carril exclusivo de transporte publico (bus, BRT):',
    options: [
      'Puede usarse por particulares cuando hay poco trafico o en horas valle',
      'No puede ser invadido por particulares, salvo emergencia o excepcion senalizada',
      'Es opcional',
      'Es solo para taxis',
    ],
    answer: 1,
    explanation:
      'Invadir el carril exclusivo es infraccion; se respeta salvo excepcion senalizada.',
  },
  {
    id: 'g3-19',
    group: 'III',
    prompt: 'En vias de doble calzada sin pasos peatonales, la velocidad maxima es:',
    options: ['80 km/h', '90 km/h, como en las demas carreteras nacionales', '120 km/h', '60 km/h'],
    answer: 2,
    explanation: 'La Ley 2251/2022 permite hasta 120 km/h en doble calzada sin pasos peatonales.',
  },
  {
    id: 'g3-20',
    group: 'III',
    prompt: 'Las luces estacionarias (4 direccionales) se usan para:',
    options: [
      'Andar normal de noche para que el vehiculo sea mas visible',
      'Indicar que el vehiculo esta varado o circula lento por averia',
      'Adelantar',
      'Para frenar',
    ],
    answer: 1,
    explanation:
      'Las intermitentes advierten a otros que el vehiculo representa un peligro temporal.',
  },
  {
    id: 'g3-21',
    group: 'III',
    prompt: 'Que obligacion impone al conductor la senal de octogono rojo que se muestra?',
    image: '/senales/pare.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Detenerse completamente antes de continuar',
      'Reducir la velocidad al cruzar',
      'Ceder el paso a vehiculos de la via principal',
      'Continuar si no hay trafico visible',
    ],
    answer: 0,
    explanation:
      'La senal PARE (octogono rojo) es reglamentaria: el conductor debe detener totalmente el vehiculo antes de continuar, sin excepcion.',
  },
  {
    id: 'g3-22',
    group: 'III',
    prompt: 'Que obligacion impone al conductor la senal de triangulo invertido que se muestra?',
    image: '/senales/ceda-el-paso.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Detenerse completamente',
      'Ceder el paso a todos los vehiculos y peatones con prioridad',
      'Girar a la izquierda obligatoriamente',
      'Aumentar la velocidad para incorporarse',
    ],
    answer: 1,
    explanation:
      'El triangulo invertido rojo y blanco indica "Ceda el paso": el conductor debe permitir el paso a quienes tengan prioridad antes de continuar.',
  },
  {
    id: 'g3-23',
    group: 'III',
    prompt:
      'Que restriccion impone al conductor la senal circular con el numero 30 que se muestra?',
    image: '/senales/velocidad-maxima-30.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'La velocidad minima permitida es 30 km/h',
      'La velocidad maxima permitida es 30 km/h',
      'La velocidad recomendada en lluvia es 30 km/h',
      'Zona escolar con limite de 30 km/h solo en horario',
    ],
    answer: 1,
    explanation:
      'El circulo rojo con numero indica velocidad maxima reglamentaria. Circular por encima de 30 km/h en esa via es una infraccion.',
  },
  {
    id: 'g3-24',
    group: 'III',
    prompt:
      'Que prohibicion establece la senal circular con flecha y barra diagonal que se muestra?',
    image: '/senales/prohibido-girar-izquierda.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Giro a la izquierda obligatorio',
      'Giro a la izquierda permitido solo a motos',
      'Giro a la izquierda prohibido para todos los vehiculos',
      'Solo camiones no pueden girar a la izquierda',
    ],
    answer: 2,
    explanation:
      'La barra diagonal roja sobre la flecha de giro indica prohibicion. Ningun vehiculo puede girar a la izquierda en ese punto.',
  },
  {
    id: 'g3-25',
    group: 'III',
    prompt:
      'Que advierte al conductor la senal romboidal amarilla con flecha curva que se muestra?',
    image: '/senales/curva-peligrosa-derecha.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Prohibicion de girar a la derecha',
      'Curva peligrosa hacia la derecha en la via',
      'Zona de derrumbes frecuentes',
      'Via con pendiente descendente a la derecha',
    ],
    answer: 1,
    explanation:
      'El rombo amarillo con flecha curva es una senal preventiva que advierte una curva peligrosa a la derecha; el conductor debe reducir la velocidad.',
  },

  // ───────────────────────── GRUPO IV ─────────────────────────
  {
    id: 'g4-01',
    group: 'IV',
    prompt: 'El comparendo es:',
    options: [
      'Un recibo del impuesto vehicular anual que se paga ante la secretaria de hacienda del municipio',
      'La orden formal de comparecer ante la autoridad de transito por una presunta infraccion',
      'Una factura de combustible',
      'Una multa ya pagada que no admite ningun recurso',
    ],
    answer: 1,
    explanation:
      'El comparendo es la orden de comparecer; la multa es la sancion economica que puede derivarse.',
  },
  {
    id: 'g4-02',
    group: 'IV',
    prompt:
      'El conductor sorprendido en grado 1 de alcoholemia (40-99 mg/100 ml) por primera vez se expone a:',
    options: [
      'Llamado de atencion verbal',
      'Multa, suspension de la licencia por 3 anios, inmovilizacion del vehiculo y trabajo comunitario',
      'Solo la asistencia a un curso de manejo defensivo, sin multa ni suspension',
      'Nada, porque la ley solo sanciona a quien supere los 100 mg de alcohol por cada 100 ml de sangre',
    ],
    answer: 1,
    explanation:
      'Art. 152 CNTT (Ley 1696/2013): grado 1, primera vez, implica suspension de 3 anios entre otras sanciones.',
  },
  {
    id: 'g4-03',
    group: 'IV',
    prompt: 'Si un conductor se niega a la prueba de alcoholemia o se da a la fuga, la sancion es:',
    options: [
      'Una llamada de atencion',
      'Cancelacion de la licencia, multa de 1.440 SMDLV e inmovilizacion del vehiculo por 20 dias habiles',
      'Solo una multa economica, sin tocar la licencia ni el vehiculo',
      'Suspension de la licencia por solo 1 mes, sin multa ni inmovilizacion, como medida pedagogica transitoria',
    ],
    answer: 1,
    explanation: 'Paragrafo 3 del Art. 152 CNTT: negarse o huir acarrea las sanciones mas severas.',
  },
  {
    id: 'g4-04',
    group: 'IV',
    prompt:
      'Para conductores de servicio publico, transporte escolar e instructores, las sanciones por alcoholemia:',
    options: [
      'Son exactamente iguales a las de los conductores particulares, sin agravante alguno',
      'Se duplican en multa y periodo de suspension',
      'Son menores, porque su experiencia al volante reduce el riesgo',
      'Solo aplican cuando el conductor causa un accidente con heridos',
    ],
    answer: 1,
    explanation:
      'El CNTT duplica multa y suspension para estos conductores por su mayor responsabilidad.',
  },
  {
    id: 'g4-05',
    group: 'IV',
    prompt: 'Excederse del limite de velocidad permitido corresponde a una infraccion tipo:',
    options: ['A (leve)', 'C (grave)', 'F (alcoholemia)', 'Ninguna'],
    answer: 1,
    explanation: 'El exceso de velocidad esta tipificado como infraccion C (grave) en el CNTT.',
  },
  {
    id: 'g4-06',
    group: 'IV',
    prompt: 'Conducir sin licencia de conduccion se sanciona con:',
    options: [
      'Solo una advertencia verbal del agente, sin registro alguno',
      'Multa e inmovilizacion del vehiculo',
      'Una multa simbolica que se condona al asistir a una charla',
      'Un curso pedagogico opcional ofrecido por el organismo de transito',
    ],
    answer: 1,
    explanation: 'Conducir sin licencia (o con licencia vencida) implica multa e inmovilizacion.',
  },
  {
    id: 'g4-07',
    group: 'IV',
    prompt: 'Conducir sin SOAT vigente acarrea:',
    options: [
      'Solo recomendacion',
      'Multa e inmovilizacion del vehiculo hasta presentar el SOAT vigente',
      'Nada si tienes pico y placa al dia',
      'Suspension de la licencia por 10 anios y retencion definitiva de las placas del vehiculo',
    ],
    answer: 1,
    explanation: 'El SOAT es obligatorio; circular sin el genera multa e inmovilizacion.',
  },
  {
    id: 'g4-08',
    group: 'IV',
    prompt: 'Si causas un siniestro vial con personas lesionadas, debes:',
    options: [
      'Huir',
      'Detenerte, prestar auxilio, llamar al 123 y no mover el vehiculo si hay heridos',
      'Negociar un pago en efectivo con el afectado y seguir la marcha',
      'Mover los vehiculos rapidamente y borrar la evidencia antes de que lleguen las autoridades',
    ],
    answer: 1,
    explanation:
      'La prioridad es la vida: auxiliar, reportar y preservar la escena. Huir agrava la responsabilidad penal.',
  },
  {
    id: 'g4-09',
    group: 'IV',
    prompt: 'El pico y placa es:',
    options: [
      'Una norma nacional uniforme del Ministerio de Transporte, con horarios identicos en todo el pais',
      'Una restriccion de circulacion de origen distrital o municipal que depende de cada ciudad',
      'Un impuesto',
      'Un comparendo automatico',
    ],
    answer: 1,
    explanation: 'Cada municipio define su pico y placa segun sus necesidades de movilidad.',
  },
  {
    id: 'g4-10',
    group: 'IV',
    prompt: 'Un conductor novato (primer ano con licencia), segun la Ley 2161 de 2021, debe:',
    options: [
      'Circular siempre solo, sin ningun acompanante a bordo, durante todo el primer anio de la licencia',
      'Portar el distintivo "C" durante 6 meses y cumplir condiciones de acompanante en ciertos casos',
      'Pagar las multas con un recargo del doble por ser principiante',
      'Conducir solo motos',
    ],
    answer: 1,
    explanation:
      'La Ley 2161/2021 introdujo el distintivo "C" y condiciones para conductores principiantes.',
  },
  {
    id: 'g4-11',
    group: 'IV',
    prompt:
      'La revision tecnico-mecanica (RTM) para vehiculos particulares de servicio diferente al publico:',
    options: [
      'No es obligatoria',
      'Es obligatoria a partir del 6.o anio contado desde la matricula y luego cada anio',
      'Cada 5 anios contados desde la matricula, sin importar el tipo de servicio del vehiculo',
      'Solo para taxis',
    ],
    answer: 1,
    explanation:
      'Los particulares la presentan a partir del sexto anio desde la matricula y despues anualmente.',
  },
  {
    id: 'g4-12',
    group: 'IV',
    prompt: 'Las multas de transito se calculan en:',
    options: [
      'Salarios minimos mensuales completos, por lo que la multa minima equivale a un mes de salario',
      'Salarios minimos diarios legales vigentes (SMDLV) o Unidades de Valor Base (UVB)',
      'Dolares',
      'Galones de gasolina',
    ],
    answer: 1,
    explanation: 'El CNTT expresa las multas en SMDLV; recientemente tambien en UVB.',
  },
  {
    id: 'g4-13',
    group: 'IV',
    prompt: 'Un carro inmovilizado por una autoridad de transito:',
    options: [
      'Se queda estacionado en el sitio bajo custodia del agente hasta que el conductor regrese con los documentos',
      'Es llevado a los patios oficiales y el propietario paga multa, grua y parqueadero para recuperarlo',
      'Se entrega a otro conductor',
      'Se destruye',
    ],
    answer: 1,
    explanation:
      'La inmovilizacion traslada el vehiculo a patios; recuperarlo exige pagar los costos y subsanar la causa.',
  },
  {
    id: 'g4-14',
    group: 'IV',
    prompt: 'Estacionar en zona prohibida u obstruyendo el trafico se sanciona con:',
    options: [
      'Ninguna sancion si el conductor permanece cerca del vehiculo',
      'Multa e inmovilizacion mediante grua',
      'Solo un llamado de atencion verbal del agente de transito',
      'La asistencia a un curso de manejo, sin multa ni grua',
    ],
    answer: 1,
    explanation: 'Estacionar mal genera multa y, si obstruye, inmovilizacion por grua.',
  },
  {
    id: 'g4-15',
    group: 'IV',
    prompt: 'No usar el cinturon de seguridad es:',
    options: [
      'Conducta libre',
      'Una infraccion sancionable con multa para el conductor (y responsabilidad sobre menores)',
      'Solo recomendacion',
      'Una falta que solo se configura si ocurre un accidente con lesiones comprobadas por medicina legal',
    ],
    answer: 1,
    explanation:
      'El cinturon es obligatorio; su omision se multa y el conductor responde por los menores a bordo.',
  },
  {
    id: 'g4-16',
    group: 'IV',
    prompt: 'Transportar menores sin sistema de retencion infantil adecuado:',
    options: [
      'No tiene problema',
      'Comete infraccion y sera multado, con inmovilizacion procedente si insiste',
      'Es permitido si el vehiculo circula a baja velocidad y solo en trayectos cortos del barrio',
      'Solo aplica a taxis',
    ],
    answer: 1,
    explanation: 'Es infraccion no usar la silla o sistema de retencion adecuado para el menor.',
  },
  {
    id: 'g4-17',
    group: 'IV',
    prompt: 'Un agente de transito puede retener preventivamente la licencia:',
    options: [
      'A su entera discrecion, sin causal legal ni acta que respalde la medida',
      'En casos de embriaguez o cuando la ley lo autorice, hasta que quede en firme el acto administrativo',
      'Cuando le caigas mal',
      'Nunca',
    ],
    answer: 1,
    explanation: 'La retencion preventiva esta reglada; procede, entre otros, ante alcoholemia.',
  },
  {
    id: 'g4-18',
    group: 'IV',
    prompt: 'Circular en sentido contrario a la via es:',
    options: [
      'Sin sancion',
      'Una infraccion grave, con multa, posible inmovilizacion y registro en el historial',
      'Solo es falta si un policia la presencia directamente; las fotodetecciones no sirven de prueba',
      'Falta administrativa simple',
    ],
    answer: 1,
    explanation:
      'Circular contravia pone en alto riesgo a terceros y se sanciona como infraccion grave.',
  },
  {
    id: 'g4-19',
    group: 'IV',
    prompt: 'El conductor debe renovar la licencia:',
    options: [
      'Cada 6 meses',
      'Antes del vencimiento (10, 5 o 1 anio segun edad), presentando el certificado de aptitud vigente y el pago',
      'Nunca',
      'Unicamente cuando la pierda o se la roben, pues no tiene fecha de vencimiento',
    ],
    answer: 1,
    explanation:
      'La renovacion requiere certificado de aptitud vigente del CRC y se hace antes del vencimiento.',
  },
  {
    id: 'g4-20',
    group: 'IV',
    prompt: 'La cancelacion definitiva de la licencia procede, entre otras causas, por:',
    options: [
      'Cambiar de domicilio',
      'Reincidencia en grados altos de alcoholemia, negarse reiteradamente a la prueba o causar siniestros graves con responsabilidad penal',
      'Dejar vencer el SOAT del vehiculo por mas de un mes',
      'Acumular mas de un comparendo pendiente de pago en el SIMIT',
    ],
    answer: 1,
    explanation:
      'La cancelacion es la sancion mas grave y procede en los casos previstos por el CNTT.',
  },

  // ───────────────────────── MECANICO ─────────────────────────
  {
    id: 'mec-01',
    group: 'mecanico',
    prompt: 'El "punto de mordida" del embrague es:',
    options: [
      'Cuando el pedal del embrague esta pisado a fondo y el plato gira libre sin transmitir movimiento',
      'El punto donde el plato comienza a transmitir el movimiento del motor a las ruedas',
      'El instante en que el disco del embrague se rompe por desgaste',
      'Una falla mecanica que obliga a cambiar el embrague',
    ],
    answer: 1,
    explanation:
      'Es el momento clave para arrancar suave y para sostener el carro en pendiente sin rodar.',
  },
  {
    id: 'mec-02',
    group: 'mecanico',
    prompt: 'Bajar una pendiente larga en punto muerto (neutro) es:',
    options: [
      'Una tecnica recomendable porque ahorra gasolina y reduce el desgaste del motor en todo el descenso',
      'Una practica peligrosa: se pierde el freno motor y aumenta el riesgo de quedarse sin frenos',
      'Obligatorio por norma en pendientes de mas de 2 km',
      'Indiferente',
    ],
    answer: 1,
    explanation:
      'Sin freno motor, los frenos se recalientan y pueden fallar; nunca se baja en neutro.',
  },
  {
    id: 'mec-03',
    group: 'mecanico',
    prompt: 'El freno motor consiste en:',
    options: [
      'Apagar el motor en plena marcha para que deje de empujar y el carro se detenga por si solo',
      'Reducir la marcha para que el propio motor ayude a desacelerar el vehiculo',
      'Accionar el freno de mano con el carro en marcha para ayudar a frenar las ruedas traseras',
      'Acelerar a fondo con el pedal del embrague pisado para que el motor retenga el vehiculo',
    ],
    answer: 1,
    explanation:
      'Reducir de marcha aprovecha la compresion del motor para frenar, util en bajadas largas.',
  },
  {
    id: 'mec-04',
    group: 'mecanico',
    prompt: 'En un trancon largo y lento, mantener el pie permanentemente sobre el embrague:',
    options: [
      'Es lo correcto, porque permite reaccionar mas rapido cuando la fila avanza',
      'Desgasta el embrague; lo ideal es poner neutro y soltar el pedal cuando estas detenido',
      'Mejora el rendimiento del combustible porque el motor trabaja con menos carga en cada avance',
      'No tiene ningun efecto sobre el desgaste de las piezas',
    ],
    answer: 1,
    explanation: 'Apoyar el pie en el embrague (clutch resting) desgasta el collarin y el plato.',
  },
  {
    id: 'mec-05',
    group: 'mecanico',
    prompt:
      'Para detenerte por completo en un semaforo en rojo conduciendo un mecanico, lo correcto es:',
    options: [
      'Dejarlo con una marcha alta engranada sin pisar ningun pedal',
      'Pisar embrague y freno, poner neutro, mantener el freno y soltar el embrague mientras esperas',
      'Apagar el carro siempre, en cualquier espera por corta que sea',
      'Solo pisar el freno con la marcha puesta y el motor exigido a altas revoluciones hasta que cambie la luz',
    ],
    answer: 1,
    explanation: 'Neutro + freno evita calar el motor y descansa el embrague durante la espera.',
  },
  {
    id: 'mec-06',
    group: 'mecanico',
    prompt: 'Si se cala el motor (se apaga al arrancar), frecuentemente significa que:',
    options: [
      'Es signo de una averia grave en la caja de cambios que obliga a remolcar el carro hasta el taller',
      'Soltaste el embrague muy rapido o con poco acelerador: vuelve a encender y reintenta',
      'Debes bajarte y empujar el carro hasta el anden antes de volver a encenderlo',
      'Hay que cambiar el motor',
    ],
    answer: 1,
    explanation:
      'Calar al arrancar suele ser tecnica de embrague/acelerador, no una falla del vehiculo.',
  },
  {
    id: 'mec-07',
    group: 'mecanico',
    prompt: 'La caja en posicion "R" sirve para:',
    options: [
      'Un modo deportivo de la caja que entrega mas potencia y una respuesta mas rapida en cada cambio',
      'Reversa: desplaza el vehiculo hacia atras y se engrana con el carro totalmente detenido',
      'Mantener el motor en regimen alto de revoluciones',
      'Apagar el motor',
    ],
    answer: 1,
    explanation:
      'Engranar reversa con el carro en movimiento puede danar la caja; siempre detenido.',
  },
  {
    id: 'mec-08',
    group: 'mecanico',
    prompt: 'En una bajada empinada, lo mas seguro es ir en:',
    options: [
      '5.a o neutro',
      'Una marcha baja (2.a o 3.a) usando freno motor y complementando con frenadas suaves',
      'Reversa',
      'Sin marcha y con el motor apagado',
    ],
    answer: 1,
    explanation:
      'La marcha baja sostiene la velocidad con freno motor y evita recalentar los frenos.',
  },

  // ───────────────────────── CASOS PRACTICOS ─────────────────────────
  {
    id: 'caso-01',
    group: 'casos',
    prompt:
      'Vas a 50 km/h en via urbana. El semaforo pasa de verde a amarillo cuando estas a 2 metros del cruce. Lo correcto es:',
    options: [
      'Frenar bruscamente hasta detenerte sobre la linea, sin importar el carro que viene atras',
      'Pasar con precaucion: ya no hay distancia segura para detenerse',
      'Acelerar al maximo para cruzar antes de que cambie a rojo',
      'Tocar bocina de forma sostenida y cruzar sin reducir la velocidad',
    ],
    answer: 1,
    explanation:
      'El amarillo obliga a detenerse solo si se puede hacer con seguridad; frenar de golpe pegado al cruce es peligroso.',
  },
  {
    id: 'caso-02',
    group: 'casos',
    prompt:
      'Subes una pendiente en un mecanico y te detienes en un PARE con un carro pegado atras. Para reiniciar sin chocarlo:',
    options: [
      'Poner neutro y salir rapido, dejando que el carro ruede hacia atras para tomar impulso antes de engranar primera',
      'Usar freno de mano, primera, embrague al punto de mordida, soltar el freno de mano y acelerar suave',
      'Pedir al otro carro que se mueva',
      'Apagar el motor',
    ],
    answer: 1,
    explanation:
      'La tecnica de arranque en pendiente con freno de mano evita que el carro ruede hacia atras.',
  },
  {
    id: 'caso-03',
    group: 'casos',
    prompt:
      'Conduces en carretera nacional (90 km/h max) y empieza a llover fuerte. Lo correcto es:',
    options: [
      'Mantener los 90 km/h, pues es la velocidad maxima permitida en esa via',
      'Reducir a 60-70 km/h, encender luces bajas, aumentar la distancia y evitar frenadas bruscas',
      'Encender las luces altas todo el tiempo para ver mejor a traves de la cortina de agua, sin bajar la velocidad',
      'Detenerte de inmediato en la mitad del carril hasta que pase la lluvia',
    ],
    answer: 1,
    explanation:
      'La lluvia reduce el agarre y la visibilidad; bajar la velocidad y ampliar distancias previene el hidroplaneo.',
  },
  {
    id: 'caso-04',
    group: 'casos',
    prompt:
      'En un reten te miden alcoholemia y das 120 mg/100 ml (primera vez). La consecuencia es:',
    options: [
      'Un llamado de atencion por escrito, sin multa ni afectacion de la licencia',
      'Grado 2 de alcoholemia: multa alta, suspension de la licencia por 5 anios, inmovilizacion y trabajo comunitario',
      'Solo un curso pedagogico de transito, sin sancion economica',
      'Ninguna sancion, porque no hubo accidente ni danios a terceros',
    ],
    answer: 1,
    explanation:
      '100-149 mg/100 ml es grado 2; en primera vez implica suspension de 5 anios (Art. 152 CNTT).',
  },
  {
    id: 'caso-05',
    group: 'casos',
    prompt:
      'Entras a una glorieta al mismo tiempo que otro carro que ya viene circulando dentro. La prioridad es de:',
    options: [
      'Ti, por entrar primero: quien llega antes a la glorieta tiene prelacion',
      'El vehiculo que ya esta dentro de la glorieta',
      'El de mayor tamanio, porque necesita mas espacio para maniobrar',
      'El que viene por la izquierda, como en una interseccion sin senales',
    ],
    answer: 1,
    explanation: 'En glorieta cede quien entra; la prioridad la tiene quien ya circula dentro.',
  },
  {
    id: 'caso-06',
    group: 'casos',
    prompt:
      'De noche, en via nacional, aparece un vehiculo de frente con luces altas. Lo correcto es:',
    options: [
      'Encender tus luces altas y mantenerlas asi para responderle hasta cruzarte con el otro vehiculo',
      'Mantener luces bajas y mirar levemente al borde derecho sin perder de vista la via',
      'Apagar todas las luces por un momento para no deslumbrarte',
      'Tocar bocina',
    ],
    answer: 1,
    explanation:
      'Responder con luces altas encandila a ambos; mirar al borde derecho ayuda a no deslumbrarse.',
  },
  {
    id: 'caso-07',
    group: 'casos',
    prompt: 'Tienes un siniestro leve, sin lesionados, solo danios materiales. Lo correcto es:',
    options: [
      'Huir del lugar, ya que solo hubo danios materiales',
      'Detenerte, senalizar, intercambiar datos, tomar fotos y reportar al seguro o la autoridad',
      'Discutir y pelear con el otro conductor hasta que acepte la culpa',
      'Acordar con el otro conductor cambiar las versiones de lo sucedido para cobrarle todo al seguro',
    ],
    answer: 1,
    explanation: 'Aun sin heridos hay que documentar y reportar; huir constituye infraccion.',
  },
  {
    id: 'caso-08',
    group: 'casos',
    prompt: 'Te detienen en un reten y tu licencia esta vencida desde hace 2 meses. Que procede?',
    options: [
      'Nada, porque la licencia vencida conserva validez hasta 6 meses despues del vencimiento',
      'Es como conducir sin licencia: multa e inmovilizacion; debes renovarla cuanto antes',
      'Pagar al agente',
      'Continuar discutiendo',
    ],
    answer: 1,
    explanation:
      'Una licencia vencida no habilita para conducir; la sancion es equivalente a no tenerla.',
  },
] satisfies readonly Omit<Question, 'category'>[];

/**
 * Banco inicial de moto (licencias A1/A2). Conjunto de muestra para validar
 * la estructura multi-categoria; se completa con el banco real mas adelante.
 * IDs prefijados con `m-` para no chocar con los de carro.
 */
const MOTO_QUESTIONS = [
  // ───────────────────────── GRUPO I ─────────────────────────
  {
    id: 'm-g1-01',
    group: 'I',
    prompt:
      'En Colombia, la licencia de conduccion para motocicletas de hasta 125 c.c. es la categoria:',
    options: ['A1', 'A2', 'B1', 'C1'],
    answer: 0,
    explanation:
      'La categoria A1 habilita para motocicletas, motociclos y mototriciclos hasta 125 c.c.; la A2, para cilindrajes superiores (Resolucion 20253040037125 de 2025).',
  },
  {
    id: 'm-g1-02',
    group: 'I',
    prompt: 'Para conducir una motocicleta de mas de 125 c.c. se requiere la licencia categoria:',
    options: ['A1', 'A2', 'B1', 'No requiere licencia'],
    answer: 1,
    explanation: 'La categoria A2 cubre motocicletas y similares de cilindrada superior a 125 c.c.',
  },
  {
    id: 'm-g1-03',
    group: 'I',
    prompt:
      'La edad minima para obtener la licencia de conduccion de motocicleta (categoria A1 o A2) es:',
    options: ['14 anos', '16 anos', '18 anos', '21 anos'],
    answer: 1,
    explanation:
      'El CNTT permite tramitar la licencia de moto desde los 16 anos; antes de los 18 se requiere autorizacion del representante legal.',
  },
  {
    id: 'm-g1-04',
    group: 'I',
    prompt: 'Para transitar legalmente en motocicleta, el conductor debe portar:',
    options: [
      'Licencia de conduccion, licencia de transito y SOAT vigentes',
      'Unicamente la licencia de conduccion',
      'Solo el SOAT',
      'Ningun documento si la motocicleta es nueva',
    ],
    answer: 0,
    explanation:
      'Para circular se exige licencia de conduccion vigente, licencia de transito, SOAT y revision tecnicomecanica cuando corresponda (CNTT).',
  },
  {
    id: 'm-g1-05',
    group: 'I',
    prompt: 'La licencia categoria A2 NO habilita para conducir:',
    options: [
      'Motocicletas de mas de 125 c.c.',
      'Mototriciclos y motociclos',
      'Automoviles y camionetas particulares',
      'Motocicletas de uso particular',
    ],
    answer: 2,
    explanation:
      'A2 habilita para motocicletas y similares de mas de 125 c.c.; para conducir automoviles particulares se requiere la categoria B1.',
  },
  {
    id: 'm-g1-06',
    group: 'I',
    prompt: 'El Registro Unico Nacional de Transito (RUNT) es:',
    options: [
      'Una aseguradora obligatoria de vehiculos',
      'El sistema que integra y centraliza el registro de conductores, vehiculos, licencias e infracciones',
      'El codigo que regula el transito terrestre',
      'El examen practico de conduccion',
    ],
    answer: 1,
    explanation:
      'El RUNT centraliza a nivel nacional la informacion de conductores, vehiculos, licencias, infracciones y mas.',
  },
  {
    id: 'm-g1-07',
    group: 'I',
    prompt:
      'En una motocicleta, el documento que identifica el vehiculo y acredita su propiedad es:',
    options: [
      'La licencia de transito (tarjeta de propiedad)',
      'La licencia de conduccion',
      'El SOAT',
      'El certificado de revision tecnicomecanica',
    ],
    answer: 0,
    explanation:
      'La licencia de transito identifica al vehiculo y acredita su propiedad; la licencia de conduccion habilita a la persona para conducir.',
  },
  {
    id: 'm-g1-08',
    group: 'I',
    prompt: 'Una persona de 16 anos que desea obtener la licencia de motocicleta (A1) requiere:',
    options: [
      'Esperar hasta los 18 anos',
      'Tener primero la licencia B1',
      'Autorizacion de su representante legal',
      'Un permiso especial de la Policia de Transito',
    ],
    answer: 2,
    explanation:
      'La licencia de moto puede tramitarse desde los 16 anos; mientras la persona sea menor de edad se exige autorizacion del representante legal.',
  },
  {
    id: 'm-g1-09',
    group: 'I',
    prompt: 'Para obtener por primera vez la licencia de motocicleta se requiere, en general:',
    options: [
      'Unicamente pagar los derechos de tramite',
      'Aprobar los examenes teorico y practico en un Centro de Ensenanza Automovilistica y obtener el certificado de aptitud',
      'Ser mayor de 21 anos',
      'Presentar solo un certificado medico',
    ],
    answer: 1,
    explanation:
      'Se exige aprobar la formacion y los examenes teorico-practico en un CEA reconocido y contar con el certificado de aptitud fisica, mental y de coordinacion motriz.',
  },
  {
    id: 'm-g1-10',
    group: 'I',
    prompt: 'La revision tecnico-mecanica y de emisiones contaminantes (RTM) en motocicletas:',
    options: [
      'No aplica a las motocicletas',
      'Reemplaza al SOAT',
      'Solo se exige a motos de mas de 125 c.c.',
      'Es obligatoria; los vehiculos nuevos quedan exentos durante el periodo que fija la ley',
    ],
    answer: 3,
    explanation:
      'La RTM es obligatoria para motocicletas; los vehiculos nuevos estan exentos durante el plazo legal y luego deben renovarla periodicamente.',
  },
  {
    id: 'm-g1-11',
    group: 'I',
    prompt: 'El SOAT de la motocicleta cubre principalmente:',
    options: [
      'Los danos materiales de la propia motocicleta',
      'Los gastos por lesiones o muerte de las personas en un accidente de transito',
      'El hurto de la motocicleta',
      'El pago de las multas de transito',
    ],
    answer: 1,
    explanation:
      'El SOAT ampara a las victimas de siniestros viales (gastos medicos, incapacidad y muerte); no cubre danos materiales ni hurto.',
  },
  {
    id: 'm-g1-12',
    group: 'I',
    prompt:
      'Conducir una motocicleta sin haber obtenido la licencia de conduccion correspondiente:',
    options: [
      'Es una infraccion que acarrea multa e inmovilizacion del vehiculo',
      'Esta permitido en zonas rurales',
      'Solo se sanciona si ocurre un accidente',
      'Es valido con el comprobante de inscripcion al curso',
    ],
    answer: 0,
    explanation:
      'Conducir sin licencia valida es una infraccion sancionable con multa e inmovilizacion del vehiculo (CNTT).',
  },
  // ───────────────────────── GRUPO II ─────────────────────────
  {
    id: 'm-g2-01',
    group: 'II',
    prompt: 'Al transportar un acompanante en motocicleta, este debe:',
    options: [
      'Ir de pie sobre los estribos',
      'Usar casco y ubicarse en el puesto destinado para el',
      'Viajar sin casco si el recorrido es corto',
      'Sostener objetos voluminosos con ambas manos',
    ],
    answer: 1,
    explanation:
      'Conductor y acompanante deben usar casco y el acompanante debe ir en el asiento disenado para ello (Art. 94 del CNTT).',
  },
  {
    id: 'm-g2-02',
    group: 'II',
    prompt: 'El uso del casco en motocicleta, para conductor y acompanante, es:',
    options: [
      'Opcional en zonas rurales',
      'Obligatorio y debe estar debidamente abrochado',
      'Obligatorio solo de noche',
      'Obligatorio solo para el conductor',
    ],
    answer: 1,
    explanation:
      'El Art. 94 del CNTT exige casco que cumpla la norma tecnica para conductor y acompanante en todo momento.',
  },
  {
    id: 'm-g2-03',
    group: 'II',
    prompt: 'Sobre el numero de acompanantes en una motocicleta, la norma general indica que:',
    options: [
      'Pueden ir hasta tres personas',
      'Solo se permite un acompanante',
      'No hay limite si todos llevan casco',
      'Se permiten dos acompanantes en vias rurales',
    ],
    answer: 1,
    explanation:
      'La motocicleta solo puede transportar un acompanante, ubicado en el puesto destinado para ello.',
  },
  {
    id: 'm-g2-04',
    group: 'II',
    prompt: 'Para conducir una motocicleta de forma segura en via urbana, el motociclista debe:',
    options: [
      'Mantener una velocidad y una distancia de seguimiento prudentes segun el trafico',
      'Circular siempre a la maxima velocidad permitida',
      'Seguir de cerca a los vehiculos para aprovechar su estela',
      'Frenar unicamente con el freno trasero',
    ],
    answer: 0,
    explanation:
      'La conduccion segura exige adecuar la velocidad a las condiciones de la via y dejar distancia suficiente para reaccionar y frenar a tiempo.',
  },
  {
    id: 'm-g2-05',
    group: 'II',
    prompt: 'Sobre transportar ninos pequenos como acompanantes en motocicleta:',
    options: [
      'Esta permitido a cualquier edad si llevan casco',
      'No se permite transportar menores que no puedan sujetarse firmemente y apoyar los pies en las estriberas',
      'Pueden ir adelante, entre el conductor y el manubrio',
      'Se permite si el recorrido es corto',
    ],
    answer: 1,
    explanation:
      'No deben transportarse menores que no alcancen a sostenerse por si mismos ni a apoyar los pies en las estriberas; su seguridad es prioritaria.',
  },
  {
    id: 'm-g2-06',
    group: 'II',
    prompt: 'Mientras conduce una motocicleta, manipular el telefono movil con la mano:',
    options: [
      'Esta permitido en los semaforos',
      'Esta prohibido porque distrae y reduce el control del vehiculo',
      'Se permite con manos libres solo de noche',
      'Es valido si se va a baja velocidad',
    ],
    answer: 1,
    explanation:
      'Manipular el celular al conducir es una distraccion sancionable; el conductor debe mantener el control y ambas manos en el manubrio.',
  },
  {
    id: 'm-g2-07',
    group: 'II',
    prompt: 'Como regla general, el adelantamiento a otro vehiculo se realiza:',
    options: [
      'Por la derecha',
      'Por la izquierda, cuando la via lo permita y con seguridad',
      'Por el carril contrario en plena curva',
      'Por el anden',
    ],
    answer: 1,
    explanation:
      'El adelantamiento se hace por la izquierda, solo cuando hay visibilidad y espacio suficientes y la senalizacion lo permite.',
  },
  {
    id: 'm-g2-08',
    group: 'II',
    prompt: 'Respecto al uso del carril, el motociclista debe:',
    options: [
      'Circular sobre las lineas que separan los carriles',
      'Ocupar su carril como cualquier vehiculo, sin compartirlo en paralelo',
      'Transitar siempre por la berma',
      'Cambiar de carril sin senalizar',
    ],
    answer: 1,
    explanation:
      'La moto tiene derecho a usar un carril completo y debe respetarlo; circular sobre las lineas o en paralelo dentro del mismo carril es riesgoso y sancionable.',
  },
  {
    id: 'm-g2-09',
    group: 'II',
    prompt: 'Antes de girar o cambiar de carril, el motociclista debe:',
    options: [
      'Acelerar sin avisar',
      'Indicar la maniobra con las luces direccionales y con anticipacion',
      'Hacer senas unicamente con el pie',
      'Girar de inmediato si no ve vehiculos',
    ],
    answer: 1,
    explanation:
      'Toda maniobra de giro o cambio de carril debe anunciarse con anticipacion mediante las direccionales para advertir a los demas.',
  },
  {
    id: 'm-g2-10',
    group: 'II',
    prompt: 'Transportar carga en una motocicleta es admisible siempre que:',
    options: [
      'Sobresalga ampliamente a los lados',
      'No dificulte la conduccion, la visibilidad ni la estabilidad del vehiculo',
      'Se lleve en los brazos del conductor',
      'Cubra la placa',
    ],
    answer: 1,
    explanation:
      'La carga no debe comprometer el control, la visibilidad ni la estabilidad, ni ocultar las luces o la placa del vehiculo.',
  },
  {
    id: 'm-g2-11',
    group: 'II',
    prompt:
      'Al aproximarse a un cruce peatonal (cebra) con peatones cruzando, el motociclista debe:',
    options: [
      'Tocar la bocina para que se apuren',
      'Ceder el paso y detenerse si es necesario',
      'Pasar rapido entre los peatones',
      'Acelerar antes de que terminen de cruzar',
    ],
    answer: 1,
    explanation:
      'El peaton tiene prioridad en los cruces senalizados; el conductor debe cederle el paso (CNTT).',
  },
  {
    id: 'm-g2-12',
    group: 'II',
    prompt: 'Conducir una motocicleta en estado de fatiga o somnolencia:',
    options: [
      'Mejora los reflejos',
      'Aumenta el riesgo de siniestro y debe evitarse',
      'No afecta si se va despacio',
      'Solo importa en viajes largos con carga',
    ],
    answer: 1,
    explanation:
      'La fatiga reduce la atencion y el tiempo de reaccion; conducir cansado eleva el riesgo de accidente y debe evitarse.',
  },
  // ───────────────────────── GRUPO III ─────────────────────────
  {
    id: 'm-g3-01',
    group: 'III',
    prompt: 'Durante el dia, mientras circula, la motocicleta debe llevar:',
    options: [
      'Las luces apagadas para ahorrar bateria',
      'Las luces delanteras y traseras encendidas',
      'Solo las direccionales',
      'Las luces encendidas solo en tuneles',
    ],
    answer: 1,
    explanation:
      'La motocicleta debe transitar con las luces encendidas de dia y de noche para ser mas visible (Art. 96 del CNTT).',
  },
  {
    id: 'm-g3-02',
    group: 'III',
    prompt:
      'El "zigzagueo" entre vehiculos o el uso del mismo carril por varias motos en paralelo:',
    options: [
      'Esta permitido si hay trafico lento',
      'Esta prohibido por ser maniobra riesgosa',
      'Solo se permite en avenidas anchas',
      'Es obligatorio para adelantar',
    ],
    answer: 1,
    explanation:
      'La moto debe transitar por su carril como cualquier vehiculo; zigzaguear o compartir carril en paralelo es una maniobra peligrosa y sancionable.',
  },
  {
    id: 'm-g3-03',
    group: 'III',
    prompt: 'Ante una senal reglamentaria de "PARE", el motociclista debe:',
    options: [
      'Disminuir y continuar si no viene nadie',
      'Detenerse por completo antes de la linea y ceder el paso',
      'Tocar la bocina y seguir',
      'Acelerar para cruzar rapido',
    ],
    answer: 1,
    explanation:
      'La senal PARE obliga a detencion total antes de la linea y a ceder el paso, igual que para cualquier vehiculo.',
  },
  {
    id: 'm-g3-04',
    group: 'III',
    prompt: 'Las senales de transito se clasifican principalmente en:',
    options: [
      'Verticales, horizontales y de papel',
      'Reglamentarias, preventivas e informativas',
      'Urbanas y rurales',
      'Obligatorias y opcionales',
    ],
    answer: 1,
    explanation:
      'Las senales se agrupan en reglamentarias (obligaciones o prohibiciones), preventivas (advierten un riesgo) e informativas (orientan al conductor).',
  },
  {
    id: 'm-g3-05',
    group: 'III',
    prompt: 'Las senales preventivas advierten al conductor sobre:',
    options: [
      'Una obligacion que debe cumplir siempre',
      'Un posible riesgo o condicion peligrosa mas adelante',
      'La distancia a una ciudad',
      'Lugares de servicios turisticos',
    ],
    answer: 1,
    explanation:
      'Las preventivas anuncian un peligro o condicion especial proxima (curva, cruce, etc.) para que el conductor extreme precaucion.',
  },
  {
    id: 'm-g3-06',
    group: 'III',
    prompt: 'Cuando el semaforo cambia a luz amarilla, el motociclista debe:',
    options: [
      'Acelerar para alcanzar a pasar',
      'Detenerse si puede hacerlo con seguridad, pues anuncia el rojo',
      'Ignorarla por completo',
      'Tocar la bocina y seguir',
    ],
    answer: 1,
    explanation:
      'El amarillo advierte que viene el rojo; se debe detener, salvo que se este tan cerca del cruce que frenar resulte inseguro.',
  },
  {
    id: 'm-g3-07',
    group: 'III',
    prompt: 'Ante un semaforo en rojo, el conductor de motocicleta debe:',
    options: [
      'Detenerse por completo antes de la linea de pare',
      'Avanzar si no vienen vehiculos',
      'Reducir y cruzar con precaucion',
      'Pasar por el costado de los autos detenidos',
    ],
    answer: 0,
    explanation:
      'El rojo obliga a detencion total antes de la linea de pare; la marcha se reanuda solo con la luz verde.',
  },
  {
    id: 'm-g3-08',
    group: 'III',
    prompt: 'Una linea continua en el centro de la calzada indica que:',
    options: [
      'Se puede adelantar libremente',
      'No esta permitido adelantar ni traspasarla',
      'Es solo decorativa',
      'Se debe circular justo sobre ella',
    ],
    answer: 1,
    explanation:
      'La linea continua prohibe adelantar y cruzarla; separa sentidos o carriles que no deben invadirse.',
  },
  {
    id: 'm-g3-09',
    group: 'III',
    prompt: 'La senal "CEDA EL PASO" obliga al conductor a:',
    options: [
      'Detenerse siempre por completo',
      'Reducir la velocidad y ceder el paso a los vehiculos de la via preferente',
      'Acelerar para incorporarse',
      'Tocar la bocina antes de pasar',
    ],
    answer: 1,
    explanation:
      'Con "ceda el paso" se disminuye la marcha y, de ser necesario, se detiene para dar prioridad a quienes circulan por la via principal.',
  },
  {
    id: 'm-g3-10',
    group: 'III',
    prompt:
      'Las senales reglamentarias (por ejemplo "PARE" o "PROHIBIDO GIRAR") se caracterizan por:',
    options: [
      'Ser de cumplimiento opcional',
      'Imponer obligaciones o prohibiciones de obligatorio cumplimiento',
      'Solo informar distancias',
      'Aplicar unicamente a vehiculos de carga',
    ],
    answer: 1,
    explanation:
      'Las reglamentarias indican obligaciones, restricciones o prohibiciones cuyo incumplimiento constituye una infraccion.',
  },
  {
    id: 'm-g3-11',
    group: 'III',
    prompt:
      'Las lineas blancas anchas pintadas a lo ancho de la via en una interseccion (cebra) senalan:',
    options: [
      'Una zona de parqueo',
      'El cruce destinado a los peatones',
      'Un carril exclusivo de motos',
      'El inicio de una autopista',
    ],
    answer: 1,
    explanation:
      'La cebra demarca el cruce peatonal; el conductor debe respetarla y ceder el paso a los peatones que cruzan.',
  },
  {
    id: 'm-g3-12',
    group: 'III',
    prompt:
      'Si una via exhibe una senal que prohibe el transito de motocicletas, el motociclista debe:',
    options: [
      'Ignorarla si tiene experiencia',
      'Respetar la prohibicion y no ingresar a esa via',
      'Pasar solo durante el dia',
      'Pasar empujando la moto',
    ],
    answer: 1,
    explanation:
      'Las senales reglamentarias de prohibicion deben acatarse; ingresar donde la moto tiene prohibido circular es una infraccion.',
  },
  {
    id: 'm-g3-13',
    group: 'III',
    prompt: 'Que obligacion impone al motociclista la senal de octogono rojo que se muestra?',
    image: '/senales/pare.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Reducir la velocidad y continuar si no hay trafico',
      'Detenerse completamente y ceder el paso antes de continuar',
      'Solo aplica para vehiculos de cuatro ruedas',
      'Detenerse unicamente si hay peatones cruzando',
    ],
    answer: 1,
    explanation:
      'La senal PARE obliga a todos los conductores, incluidos los motociclistas, a detener completamente el vehiculo antes de continuar.',
  },
  {
    id: 'm-g3-14',
    group: 'III',
    prompt:
      'Que restriccion impone al motociclista la senal circular con el numero 60 que se muestra?',
    image: '/senales/velocidad-maxima-60.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Velocidad minima recomendada de 60 km/h',
      'Velocidad maxima permitida de 60 km/h',
      'Velocidad de crucero ideal para motocicletas',
      'Limite de velocidad solo en via mojada',
    ],
    answer: 1,
    explanation:
      'El circulo rojo con numero es una senal reglamentaria de velocidad maxima. Superar los 60 km/h en esa via constituye una infraccion de transito.',
  },
  {
    id: 'm-g3-15',
    group: 'III',
    prompt:
      'Que advierte al motociclista la senal romboidal amarilla con flecha curva que se muestra?',
    image: '/senales/curva-peligrosa-derecha.svg',
    imageAlt: 'Senal de transito para identificar',
    options: [
      'Via cerrada por derrumbe',
      'Curva peligrosa a la derecha; reducir velocidad y ajustar trayectoria',
      'Prohibicion de adelantar en curva',
      'Zona de peaje proxima',
    ],
    answer: 1,
    explanation:
      'El rombo amarillo con flecha curva advierte una curva peligrosa a la derecha. El motociclista debe reducir velocidad y ajustar la trayectoria con anticipacion.',
  },
  // ───────────────────────── GRUPO IV ─────────────────────────
  {
    id: 'm-g4-01',
    group: 'IV',
    prompt: 'Conducir una motocicleta bajo los efectos del alcohol:',
    options: [
      'Se sanciona con menor severidad que en carro',
      'Esta sujeto a las mismas sanciones por grado de alcoholemia que cualquier conductor',
      'Solo se sanciona si hay siniestro',
      'No aplica a motos',
    ],
    answer: 1,
    explanation:
      'Las sanciones por grados de alcoholemia (Ley 1696 de 2013) aplican a todo conductor, incluido el de motocicleta.',
  },
  {
    id: 'm-g4-02',
    group: 'IV',
    prompt: 'El SOAT en una motocicleta es:',
    options: [
      'Opcional',
      'Obligatorio para poder transitar',
      'Necesario solo en carretera',
      'Reemplazable por la tecnomecanica',
    ],
    answer: 1,
    explanation:
      'El SOAT es obligatorio para todo vehiculo automotor; circular sin el acarrea multa e inmovilizacion.',
  },
  {
    id: 'm-g4-03',
    group: 'IV',
    prompt: 'Sobre la placa de la motocicleta y su identificacion, la norma exige que:',
    options: [
      'Solo el conductor porte un distintivo',
      'La placa este visible y legible segun la reglamentacion vigente',
      'No es necesaria si la moto es nueva',
      'Se ubique unicamente en la parte delantera',
    ],
    answer: 1,
    explanation:
      'La motocicleta debe portar su placa unica nacional visible y legible; su alteracion u ocultamiento es infraccion.',
  },
  {
    id: 'm-g4-04',
    group: 'IV',
    prompt:
      'Cuando una autoridad de transito solicita al motociclista la prueba de alcoholemia, este:',
    options: [
      'Puede negarse sin consecuencias',
      'Esta obligado a practicarsela; negarse acarrea sancion',
      'Solo debe hacerla si tuvo un accidente',
      'Puede exigir hacerla al dia siguiente',
    ],
    answer: 1,
    explanation:
      'Negarse a la prueba de embriaguez se sanciona como si se hubiera hallado el mayor grado de alcoholemia (Ley 1696 de 2013).',
  },
  {
    id: 'm-g4-05',
    group: 'IV',
    prompt: 'Las sanciones por conducir bajo los efectos del alcohol se graduan segun:',
    options: [
      'El tipo de vehiculo unicamente',
      'El grado de alcoholemia detectado',
      'La hora del dia',
      'El color de la motocicleta',
    ],
    answer: 1,
    explanation:
      'La Ley 1696 de 2013 establece sanciones crecientes (multa, suspension de licencia, trabajo comunitario) segun el grado de alcoholemia.',
  },
  {
    id: 'm-g4-06',
    group: 'IV',
    prompt: 'La orden de comparendo es:',
    options: [
      'Un reconocimiento por buena conducta vial',
      'El documento con que la autoridad notifica una presunta infraccion y cita al conductor',
      'Un permiso para circular sin licencia',
      'Un descuento en el SOAT',
    ],
    answer: 1,
    explanation:
      'El comparendo es la orden mediante la cual la autoridad de transito notifica una infraccion y cita al presunto infractor.',
  },
  {
    id: 'm-g4-07',
    group: 'IV',
    prompt: 'La inmovilizacion de la motocicleta consiste en:',
    options: [
      'Retirarle la placa de forma definitiva',
      'Suspender temporalmente su circulacion y trasladarla a un parqueadero autorizado',
      'Una simple multa en dinero',
      'Cambiar el propietario del vehiculo',
    ],
    answer: 1,
    explanation:
      'La inmovilizacion suspende la circulacion del vehiculo, que se lleva a patios autorizados hasta subsanar la causa (por ejemplo, sin SOAT o sin licencia).',
  },
  {
    id: 'm-g4-08',
    group: 'IV',
    prompt: 'Conducir o ser acompanante en motocicleta sin casco que cumpla la norma:',
    options: [
      'No tiene sancion',
      'Es una infraccion de transito sancionable',
      'Solo se sanciona en carretera',
      'Esta permitido a baja velocidad',
    ],
    answer: 1,
    explanation:
      'El uso de casco homologado es obligatorio para conductor y acompanante; no usarlo es una infraccion (Art. 94 del CNTT).',
  },
  {
    id: 'm-g4-09',
    group: 'IV',
    prompt: 'Superar los limites de velocidad establecidos:',
    options: [
      'Solo importa en zona escolar',
      'Es una infraccion y aumenta el riesgo y la gravedad de los siniestros',
      'Esta permitido si la via esta despejada',
      'No aplica a las motocicletas',
    ],
    answer: 1,
    explanation:
      'Exceder los limites de velocidad es una infraccion sancionable y eleva la probabilidad y la severidad de los accidentes.',
  },
  {
    id: 'm-g4-10',
    group: 'IV',
    prompt: 'Circular con el SOAT vencido en una motocicleta:',
    options: [
      'Esta permitido durante un mes de gracia',
      'Es una infraccion que puede acarrear multa e inmovilizacion',
      'Solo se sanciona si hay un accidente',
      'No tiene ninguna consecuencia',
    ],
    answer: 1,
    explanation:
      'El SOAT debe estar vigente para circular; hacerlo sin el o vencido acarrea multa e inmovilizacion del vehiculo.',
  },
  {
    id: 'm-g4-11',
    group: 'IV',
    prompt: 'Un motociclista involucrado en un accidente con heridos debe:',
    options: [
      'Retirarse del lugar para evitar problemas',
      'Detenerse, prestar o procurar auxilio y avisar a las autoridades',
      'Continuar la marcha si el dano parece leve',
      'Mover de inmediato a los heridos sin precaucion',
    ],
    answer: 1,
    explanation:
      'Todo conductor involucrado en un siniestro debe detenerse, socorrer a los lesionados y reportar a las autoridades; darse a la fuga agrava su responsabilidad.',
  },
  {
    id: 'm-g4-12',
    group: 'IV',
    prompt: 'La acumulacion de infracciones graves o la reincidencia puede llevar a:',
    options: [
      'Un aumento del cilindraje permitido',
      'La suspension o cancelacion de la licencia de conduccion',
      'La exencion del SOAT',
      'Un ascenso automatico de categoria',
    ],
    answer: 1,
    explanation:
      'La autoridad puede suspender o cancelar la licencia de conduccion ante infracciones graves o reincidencia, conforme al CNTT.',
  },
  // ───────────────────────── CASOS ─────────────────────────
  {
    id: 'm-caso-01',
    group: 'casos',
    prompt: 'Vas en moto y se aproxima lluvia fuerte. Lo mas seguro es:',
    options: [
      'Aumentar la velocidad para llegar antes',
      'Reducir la velocidad, aumentar la distancia de seguimiento y extremar precaucion al frenar',
      'Frenar bruscamente con el freno delantero',
      'Apagar las luces para ver mejor',
    ],
    answer: 1,
    explanation:
      'Con piso mojado disminuye el agarre; hay que reducir velocidad, ampliar distancias y frenar de forma progresiva.',
  },
  {
    id: 'm-caso-02',
    group: 'casos',
    prompt:
      'En un trancon, un motociclista pretende avanzar entre los carros detenidos. Lo correcto es:',
    options: [
      'Avanzar entre los vehiculos porque la moto es angosta',
      'Respetar el carril y la fila, sin zigzaguear entre los vehiculos',
      'Subirse al anden para adelantar',
      'Usar el carril contrario',
    ],
    answer: 1,
    explanation:
      'La moto debe respetar su carril y la fila; circular entre vehiculos o por el anden es riesgoso y sancionable.',
  },
  {
    id: 'm-caso-03',
    group: 'casos',
    prompt: 'Vas a conducir tu moto de noche. Para ser mas visible deberias:',
    options: [
      'Vestir ropa oscura',
      'Usar elementos reflectivos, el casco puesto y mantener las luces encendidas',
      'Apagar las luces para no encandilar',
      'Circular pegado a los vehiculos para guiarte',
    ],
    answer: 1,
    explanation:
      'De noche baja la visibilidad; ropa o elementos reflectivos, casco y luces encendidas ayudan a que otros conductores te vean a tiempo.',
  },
  {
    id: 'm-caso-04',
    group: 'casos',
    prompt: 'Te acercas a una curva con arena o gravilla sobre el asfalto. Lo correcto es:',
    options: [
      'Entrar a la curva acelerando',
      'Reducir antes de la curva y evitar frenar o girar bruscamente sobre la zona suelta',
      'Frenar fuerte con el freno delantero dentro de la curva',
      'Inclinar la moto al maximo',
    ],
    answer: 1,
    explanation:
      'Sobre superficies sueltas baja el agarre; conviene reducir antes de entrar y mantener la moto estable, sin frenadas ni giros bruscos.',
  },
  {
    id: 'm-caso-05',
    group: 'casos',
    prompt: 'Circulas junto a un camion o un bus en la ciudad. Lo mas seguro es:',
    options: [
      'Permanecer a su lado, dentro de su punto ciego',
      'Evitar sus puntos ciegos y mantener distancia para ser visible',
      'Adelantarlo por la derecha pegado a la acera',
      'Seguirlo muy de cerca',
    ],
    answer: 1,
    explanation:
      'Los vehiculos grandes tienen amplios puntos ciegos; hay que evitarlos, hacerse visible y mantener distancia para reaccionar ante sus maniobras.',
  },
  {
    id: 'm-caso-06',
    group: 'casos',
    prompt: 'Al ingresar a una glorieta (rotonda), por regla general:',
    options: [
      'Tiene prioridad quien va a entrar',
      'Tiene prioridad quien ya circula dentro de la glorieta',
      'Se entra sin mirar porque todos ceden',
      'Las motos siempre entran primero',
    ],
    answer: 1,
    explanation:
      'En la glorieta tiene prelacion quien ya circula por ella; quien va a ingresar debe ceder el paso (CNTT).',
  },
  {
    id: 'm-caso-07',
    group: 'casos',
    prompt: 'Aparece de repente un obstaculo en tu carril. La reaccion mas segura suele ser:',
    options: [
      'Frenar de golpe solo con el freno delantero',
      'Frenar de forma progresiva con ambos frenos y, si es seguro, esquivar con control',
      'Cerrar los ojos y soltar el manubrio',
      'Acelerar para pasar antes',
    ],
    answer: 1,
    explanation:
      'Frenar de manera progresiva con ambos frenos mantiene la estabilidad; una frenada brusca solo con el delantero puede bloquear la rueda y provocar una caida.',
  },
] satisfies readonly Omit<Question, 'category'>[];

/** Banco completo: preguntas de carro y de moto, ya etiquetadas. */
export const QUESTIONS: readonly Question[] = [
  ...withCategory<Question>(CARRO_QUESTIONS, 'carro'),
  ...withCategory<Question>(MOTO_QUESTIONS, 'moto'),
];

/** Devuelve las preguntas de una categoria que pertenecen a alguno de los grupos. */
export function questionsForGroups(
  category: VehicleCategory,
  groups: readonly GroupId[],
): Question[] {
  return QUESTIONS.filter((q) => q.category === category && groups.includes(q.group));
}
