import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/products";
import { PackShot } from "./PackShot";

export function ProductCard({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col">
      <PackShot product={product} className="aspect-[4/5] rounded-[14px]" />
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <H className="text-[1.45rem] leading-tight text-charcoal">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </H>
          <span className="shrink-0 rounded-full border border-charcoal/15 px-2.5 py-0.5 text-xs font-semibold text-muted">
            {product.sizes.join(" · ")}
          </span>
        </div>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{product.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
          View product
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}
