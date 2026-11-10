import Image from "next/image";
import type { Product } from "@/content/products";
import { GrainField } from "@/components/art/GrainField";
import { grainFor } from "@/lib/grain";

/**
 * The product pack presented on its own grain-coloured "stage".
 * The photo is shown unaltered (packaging must not be edited).
 */
export function PackShot({
  product,
  sizes = "(min-width: 1024px) 220px, 40vw",
  priority = false,
  className = "",
  photoClassName = "w-[58%]",
  seed = 3,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
  photoClassName?: string;
  seed?: number;
}) {
  const g = grainFor(product);
  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundColor: product.tint.surface }}
    >
      <GrainField
        colors={product.tint.grain}
        shape={g.shape}
        size={g.size}
        count={g.count}
        seed={seed + product.slug.length}
        spill={0.9}
        aspect={1.75}
        className="absolute inset-x-0 bottom-0 -z-10 h-[46%] w-full opacity-90"
      />
      <div className="flex h-full items-center justify-center py-[9%]">
        <div
          className={`relative aspect-[2/3] overflow-hidden rounded-[10px] shadow-[0_18px_40px_-18px_rgb(41_40_32/0.55),0_2px_6px_rgb(41_40_32/0.12)] ring-1 ring-black/5 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:-rotate-[1.2deg] ${photoClassName}`}
        >
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          ) : (
            // Temporary stand-in until the real pack photo is supplied.
            <div
              role="img"
              aria-label={`${product.name} — pack photo coming soon`}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed p-3 text-center"
              style={{ backgroundColor: product.tint.surface, borderColor: product.tint.grain[1], color: product.tint.ink }}
            >
              <span className="font-serif text-[clamp(0.85rem,2.4vw,1.35rem)] leading-tight">{product.name}</span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] opacity-75">Pack photo coming soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
