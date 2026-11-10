"use client";

import { Suspense, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { families, type Product, type ProductFamily } from "@/content/products";
import { DiscoveryCard } from "./DiscoveryCard";
import { openProductDialog, ProductDialogController } from "./ProductDialog";

type Filter = "all" | ProductFamily;

/**
 * Responsive product grid with family filters. Cards open the animated
 * detail dialog; without JavaScript they link to the product pages.
 */
export function ProductExplorer({ products, showFilters = true }: { products: Product[]; showFilters?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? products : products.filter((p) => p.family === filter);
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All products", count: products.length },
    ...(Object.keys(families) as ProductFamily[]).map((f) => ({
      id: f,
      label: families[f].name,
      count: products.filter((p) => p.family === f).length,
    })),
  ];

  return (
    <MotionConfig reducedMotion="user">
      {showFilters ? (
        <div role="group" aria-label="Filter products" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-charcoal/15 px-4 text-[0.9rem] font-semibold text-charcoal/75 transition-colors hover:border-charcoal/40 hover:text-charcoal aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-cream"
            >
              {f.label}
              <span className="text-[0.78rem] opacity-60">{f.count}</span>
            </button>
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "product" : "products"}
      </p>

      <motion.ul layout className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-8" : ""}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <DiscoveryCard product={p} onOpen={openProductDialog} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Suspense fallback={null}>
        <ProductDialogController />
      </Suspense>
    </MotionConfig>
  );
}
