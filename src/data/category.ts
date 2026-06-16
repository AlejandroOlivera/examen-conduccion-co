import type { VehicleCategory } from './types';

/** Categoria por defecto del sitio: la home y el hero son de carro (Licencia B1). */
export const DEFAULT_CATEGORY: VehicleCategory = 'carro';

/**
 * Etiqueta visible de cada categoria. Es exhaustivo sobre `VehicleCategory`:
 * al agregar una categoria nueva, TypeScript obliga a anadir su etiqueta aqui.
 */
export const CATEGORY_LABELS: Record<VehicleCategory, string> = {
  carro: 'Carro',
  moto: 'Moto',
};

/**
 * Etiqueta un conjunto de elementos (preguntas o modos) con su categoria de
 * vehiculo. Los datos se definen sin el campo `category` y se etiquetan al
 * componer los bancos completos, evitando repetir la categoria en cada item.
 */
export function withCategory<T extends { readonly category: VehicleCategory }>(
  items: readonly Omit<T, 'category'>[],
  category: VehicleCategory,
): T[] {
  return items.map((item) => ({ ...item, category }) as T);
}
