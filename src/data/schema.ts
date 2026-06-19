/* ============================================================
   Esquemas Zod para validar el banco de preguntas y los modos.
   No se importan en runtime del cliente (no inflan el bundle): se usan
   en los tests (y por tanto en CI), de modo que un dato invalido —indice
   de respuesta fuera de rango, id duplicado, opciones repetidas— rompe la
   verificacion antes de llegar a produccion.
   ============================================================ */

import { z } from 'zod';

export const groupIdSchema = z.enum(['I', 'II', 'III', 'IV', 'mecanico', 'casos']);

export const vehicleCategorySchema = z.enum(['carro', 'moto']);

export const questionSchema = z
  .object({
    id: z.string().min(1),
    category: vehicleCategorySchema,
    group: groupIdSchema,
    prompt: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
    answer: z.number().int().nonnegative(),
    explanation: z.string().min(5),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  })
  .refine((q) => q.answer < q.options.length, {
    message: 'El indice `answer` esta fuera del rango de `options`.',
    path: ['answer'],
  })
  .refine((q) => new Set(q.options).size === q.options.length, {
    message: 'Hay opciones de texto duplicado.',
    path: ['options'],
  });

/** Valida el banco completo y, ademas, la unicidad global de los ids. */
export const questionBankSchema = z.array(questionSchema).superRefine((questions, ctx) => {
  const seen = new Set<string>();
  questions.forEach((q, i) => {
    if (seen.has(q.id)) {
      ctx.addIssue({ code: 'custom', message: `Id duplicado: ${q.id}`, path: [i, 'id'] });
    }
    seen.add(q.id);
  });
});

export const examModeSchema = z.object({
  category: vehicleCategorySchema,
  slug: z.string().min(1),
  title: z.string().min(1),
  short: z.string().min(1),
  description: z.string().min(1),
  groups: z.array(groupIdSchema).min(1),
  sample: z.number().int().positive().optional(),
  timerSeconds: z.number().int().positive().optional(),
  immediateFeedback: z.boolean(),
  passPercent: z.number().int().min(1).max(100).optional(),
  accent: z.enum(['verde', 'ambar', 'rojo', 'azul', 'asfalto']),
});

export const senalCategoriaSchema = z.enum(['reglamentaria', 'preventiva', 'informativa']);

export const senalSchema = z.object({
  slug: z.string().min(1),
  nombre: z.string().min(1),
  categoria: senalCategoriaSchema,
  imagen: z.string().regex(/^\/senales\/[a-z0-9-]+\.svg$/),
  alt: z.string().min(5),
  significado: z.string().min(10),
  norma: z.string().optional(),
  metaDescription: z.string().max(160).optional(),
});

export const senalBankSchema = z.array(senalSchema).superRefine((senales, ctx) => {
  const seen = new Set<string>();
  senales.forEach((s, i) => {
    if (seen.has(s.slug)) {
      ctx.addIssue({ code: 'custom', message: `Slug duplicado: ${s.slug}`, path: [i, 'slug'] });
    }
    seen.add(s.slug);
  });
});
