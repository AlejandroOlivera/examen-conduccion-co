import type { ExamMode, VehicleCategory } from './types';
import { withCategory } from './category';

/**
 * Modos de carro (licencia B1). Los 4 grupos + mecanico + casos son practica
 * con retroalimentacion inmediata; "simulacro" replica el examen oficial:
 * 40 preguntas aleatorias, 40 minutos, aprobacion 80 %. Se etiquetan con su
 * categoria al componer EXAM_MODES al final del archivo.
 */
const CARRO_MODES = [
  {
    slug: 'grupo-1',
    title: 'Grupo I — Aspectos generales, autoridades, licencias y mecanica basica',
    short: 'Grupo I',
    description:
      'Marco legal, autoridades de transito, documentos, categorias de licencia y mecanica basica del vehiculo (incluye embrague y cambios).',
    groups: ['I'],
    immediateFeedback: true,
    accent: 'azul',
  },
  {
    slug: 'grupo-2',
    title: 'Grupo II — Normas de comportamiento',
    short: 'Grupo II',
    description:
      'Comportamiento de peatones, pasajeros y conductores: prioridades, adelantamiento, luces, cinturon y conduccion segura.',
    groups: ['II'],
    immediateFeedback: true,
    accent: 'verde',
  },
  {
    slug: 'grupo-3',
    title: 'Grupo III — Senales de transito e infraestructura',
    short: 'Grupo III',
    description:
      'Senales reglamentarias, preventivas e informativas, demarcacion del pavimento, semaforos y uso de la via.',
    groups: ['III'],
    immediateFeedback: true,
    accent: 'ambar',
  },
  {
    slug: 'grupo-4',
    title: 'Grupo IV — Infracciones, sanciones y procedimientos',
    short: 'Grupo IV',
    description:
      'Comparendos, alcoholemia, inmovilizacion, SOAT, RTM, conductor novato y procedimientos ante la autoridad.',
    groups: ['IV'],
    immediateFeedback: true,
    accent: 'rojo',
  },
  {
    slug: 'mecanico',
    title: 'Carro mecanico (transmision manual)',
    short: 'Mecanico',
    description:
      'Refuerzo especifico: embrague, punto de mordida, arranque en pendiente, freno motor y errores tipicos.',
    groups: ['mecanico'],
    immediateFeedback: true,
    accent: 'asfalto',
  },
  {
    slug: 'casos',
    title: 'Casos practicos',
    short: 'Casos',
    description:
      'Situaciones reales en via: retenes, glorietas, lluvia, siniestros y decisiones al volante.',
    groups: ['casos'],
    immediateFeedback: true,
    accent: 'verde',
  },
  {
    slug: 'simulacro',
    title: 'Simulacro oficial — 40 preguntas / 40 minutos',
    short: 'Simulacro',
    description:
      'Mismo formato del CALE: 40 preguntas aleatorias de todos los temas, cronometro de 40 minutos y aprobacion con el 80 %.',
    groups: ['I', 'II', 'III', 'IV', 'mecanico', 'casos'],
    sample: 40,
    timerSeconds: 40 * 60,
    immediateFeedback: false,
    passPercent: 80,
    accent: 'asfalto',
  },
] satisfies readonly Omit<ExamMode, 'category'>[];

/**
 * Modos de moto (licencias A1/A2). Estructura CALE por grupos tematicos + un
 * simulacro cronometrado. No incluye "mecanico", que es especifico de la
 * transmision manual de carro. El simulacro toma una muestra de 40 preguntas
 * de todos los grupos, igual que el examen oficial.
 */
const MOTO_MODES = [
  {
    slug: 'grupo-1',
    title: 'Grupo I — Aspectos generales, autoridades y licencias (moto)',
    short: 'Grupo I',
    description:
      'Marco legal, autoridades de transito, documentos y categorias de licencia de motocicleta (A1 y A2).',
    groups: ['I'],
    immediateFeedback: true,
    accent: 'azul',
  },
  {
    slug: 'grupo-2',
    title: 'Grupo II — Normas de comportamiento (moto)',
    short: 'Grupo II',
    description: 'Casco, acompanante, comportamiento del motociclista y conduccion segura en moto.',
    groups: ['II'],
    immediateFeedback: true,
    accent: 'verde',
  },
  {
    slug: 'grupo-3',
    title: 'Grupo III — Senales de transito e infraestructura (moto)',
    short: 'Grupo III',
    description:
      'Senales, uso del carril, luces y demarcacion aplicadas a la circulacion en motocicleta.',
    groups: ['III'],
    immediateFeedback: true,
    accent: 'ambar',
  },
  {
    slug: 'grupo-4',
    title: 'Grupo IV — Infracciones, sanciones y procedimientos (moto)',
    short: 'Grupo IV',
    description:
      'Comparendos, alcoholemia, SOAT, placa e identificacion y procedimientos para el motociclista.',
    groups: ['IV'],
    immediateFeedback: true,
    accent: 'rojo',
  },
  {
    slug: 'casos',
    title: 'Casos practicos (moto)',
    short: 'Casos',
    description:
      'Situaciones reales en via para motociclistas: lluvia, trancones y decisiones al conducir.',
    groups: ['casos'],
    immediateFeedback: true,
    accent: 'verde',
  },
  {
    slug: 'simulacro',
    title: 'Simulacro de moto — 40 preguntas / 40 minutos',
    short: 'Simulacro',
    description:
      'Mismo formato del CALE: 40 preguntas aleatorias de todos los temas, cronometro de 40 minutos y aprobacion con el 80 %.',
    groups: ['I', 'II', 'III', 'IV', 'casos'],
    sample: 40,
    timerSeconds: 40 * 60,
    immediateFeedback: false,
    passPercent: 80,
    accent: 'asfalto',
  },
] satisfies readonly Omit<ExamMode, 'category'>[];

/** Todos los modos: carro y moto, ya etiquetados con su categoria. */
export const EXAM_MODES: readonly ExamMode[] = [
  ...withCategory<ExamMode>(CARRO_MODES, 'carro'),
  ...withCategory<ExamMode>(MOTO_MODES, 'moto'),
];

/** Modos de una categoria, en su orden de definicion. */
export function modesForCategory(category: VehicleCategory): ExamMode[] {
  return EXAM_MODES.filter((m) => m.category === category);
}

/** Resuelve un modo por su categoria y slug (el slug solo es unico por categoria). */
export function getMode(category: string, slug: string): ExamMode | undefined {
  return EXAM_MODES.find((m) => m.category === category && m.slug === slug);
}
