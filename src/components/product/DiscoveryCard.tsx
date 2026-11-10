"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { families, type Product } from "@/content/products";
import { nutrientsFor } from "@/content/nutrition";
import { PackShot } from "./PackShot";

/** Up to three characteristic nutrients of the source ingredient(s), for the card's subtle highlight. */
export function grainHighlights(product: Product, count = 3) {
  return nutrientsFor(product.ingredientBasis)
    .filter(({ nutrient }) => nutrient.id !== "carbohydrates")
    .slice(0, count)
    .map(({ nutrient }) => nutrient.name);
}

/**
 * Product discovery card. It is a real link to the product page (works without JS
 * and for crawlers); `onOpen` lets the catalogue open the detail dialog instead.
 */
export function DiscoveryCard({
  product,
  onOpen,
  priority = false,
}: {
  product: Product;
  onOpen?: (slug: string, trigger: HTMLElement) => void;
  priority?: boolean;
}) {
  const highlights = grainHighlights(product);
  return (
    <Link
      href={`/products/${product.slug}`}
      scroll={false}
      onClick={(e) => {
        if (!onOpen || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onOpen(product.slug, e.currentTarget);
      }}
      aria-haspopup={onOpen ? "dialog" : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-paper ring-1 ring-line transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(41_40_32/0.45)] focus-visible:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <PackShot
          product={product}
          priority={priority}
          className="aspect-[4/3.6] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          photoClassName="w-[44%]"
          sizes="(min-width: 1024px) 180px, (min-width: 640px) 25vw, 45vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-charcoal/75 backdrop-blur-sm">
          {families[product.family].name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.5rem] leading-tight text-charcoal">{product.name}</h3>
          <span className="mt-1 shrink-0 rounded-full border border-charcoal/15 px-2.5 py-0.5 text-xs font-semibold text-muted">
            {product.sizes.join(" · ")}
          </span>
        </div>
        <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{product.summary}</p>

        {highlights.length ? (
          <p className="mt-4 text-[0.8rem] leading-relaxed text-charcoal/70">
            <span className="font-semibold" style={{ color: product.tint.ink }}>
              In the {product.family === "pap-powders" ? "grain" : "ingredient"}:
            </span>{" "}
            {highlights.join(" · ")}
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.92rem] font-semibold text-green">
          <span className="underline decoration-green/30 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-green">
            Explore Product
          </span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
