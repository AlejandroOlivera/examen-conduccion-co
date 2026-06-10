/** Grupos tematicos oficiales del examen CALE + secciones de refuerzo. */
export type GroupId = 'I' | 'II' | 'III' | 'IV' | 'mecanico' | 'casos';

/** Una pregunta de opcion multiple. */
export interface Question {
  /** Identificador estable (p. ej. "g1-03", "mec-02", "caso-05"). */
  readonly id: string;
  /** Grupo tematico al que pertenece. */
  readonly group: GroupId;
  /** Enunciado de la pregunta. */
  readonly prompt: string;
  /** Opciones en su orden original (la app las baraja en tiempo de ejecucion). */
  readonly options: readonly string[];
  /** Indice (base 0) de la opcion correcta dentro de `options`. */
  readonly answer: number;
  /** Justificacion breve apoyada en la normativa. */
  readonly explanation: string;
}

/** Configuracion de un modo de practica o simulacro. */
export interface ExamMode {
  /** Segmento de URL: /examen/[slug]. */
  readonly slug: string;
  /** Titulo visible. */
  readonly title: string;
  /** Etiqueta corta para tarjetas. */
  readonly short: string;
  /** Descripcion para la tarjeta del home. */
  readonly description: string;
  /** Grupos de preguntas que se incluyen en este modo. */
  readonly groups: readonly GroupId[];
  /** Si se define, toma una muestra aleatoria de N preguntas del conjunto. */
  readonly sample?: number;
  /** Cuenta regresiva en segundos (undefined = sin cronometro). */
  readonly timerSeconds?: number;
  /** true = retroalimentacion inmediata; false = solo al final (simulacro). */
  readonly immediateFeedback: boolean;
  /** Umbral de aprobacion en %, p. ej. 80 (undefined = practica libre). */
  readonly passPercent?: number;
  /** Token de color de acento (mapea a una variable CSS). */
  readonly accent: 'verde' | 'ambar' | 'rojo' | 'azul' | 'asfalto';
}

/** Configuracion serializable que recibe la isla de cliente del quiz. */
export interface QuizConfig {
  readonly mode: string;
  readonly title: string;
  readonly immediateFeedback: boolean;
  readonly timerSeconds: number | null;
  readonly passPercent: number | null;
  readonly sample: number | null;
}
