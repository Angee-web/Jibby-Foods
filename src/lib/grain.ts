import type { Product } from "@/content/products";

type GrainStyle = { shape: "round" | "kernel" | "slice"; size: [number, number]; count: number };

const bySlug: Record<string, GrainStyle> = {
  "guinea-corn-pap-powder": { shape: "round", size: [5, 8], count: 220 },
  "white-corn-pap-powder": { shape: "kernel", size: [9, 13], count: 110 },
  "yellow-corn-pap-powder": { shape: "kernel", size: [9, 13], count: 110 },
  "millet-corn-pap-powder": { shape: "round", size: [4, 6], count: 320 },
  "unripe-plantain-flour": { shape: "slice", size: [9, 14], count: 70 },
  "poundo-yam-flour": { shape: "slice", size: [9, 14], count: 70 },
  "soya-beans-powder": { shape: "round", size: [7, 10], count: 170 },
};

export function grainFor(product: Pick<Product, "slug">): GrainStyle {
  return bySlug[product.slug] ?? { shape: "round", size: [5, 9], count: 180 };
}
