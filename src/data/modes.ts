import type { ExamMode } from './types';

/**
 * Modos disponibles. Los 4 grupos + mecanico + casos son practica con
 * retroalimentacion inmediata; "simulacro" replica el examen oficial:
 * 40 preguntas aleatorias, 40 minutos, aprobacion 80 %.
 */
export const EXAM_MODES: readonly ExamMode[] = [
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
];

export function getMode(slug: string): ExamMode | undefined {
  return EXAM_MODES.find((m) => m.slug === slug);
}
