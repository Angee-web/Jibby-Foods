import type { ReactNode } from "react";
import { Factory, ScrollText } from "lucide-react";
import type { Product } from "@/content/products";
import { siteConfig } from "@/config/site";
import { Pending, showPlaceholders } from "@/components/ui/Pending";

const pending = (note: string) => (showPlaceholders ? <Pending note={note} /> : null);

/**
 * Confirmed packaging details, laid out like a pack label. Every value is
 * company-supplied; missing ones are omitted on the live site.
 */
export function PackInformation({ product }: { product: Product }) {
  const { producer } = siteConfig;
  const rows: { label: string; value: ReactNode; mono?: boolean }[] = [
    { label: "Product name", value: product.name },
    { label: "Ingredients", value: product.ingredients ?? pending("ingredients as printed on the pack") },
    { label: "Net weight", value: product.sizes.length ? product.sizes.join(" · ") : pending("net weight") },
    {
      label: "NAFDAC Reg. No.",
      value: product.nafdacNumber ?? pending("NAFDAC registration number"),
      mono: Boolean(product.nafdacNumber),
    },
  ];
  const visible = rows.filter((r) => r.value != null);

  return (
    <section
      aria-labelledby={`pack-info-${product.slug}`}
      className="overflow-hidden rounded-[16px] bg-paper ring-1 ring-charcoal/15"
    >
      <header
        className="flex items-center gap-2.5 px-5 py-3 sm:px-6"
        style={{ backgroundColor: product.tint.surface, color: product.tint.ink }}
      >
        <ScrollText className="size-4" aria-hidden />
        <h3 id={`pack-info-${product.slug}`} className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em]">
          Pack information
        </h3>
      </header>

      <dl className="divide-y divide-line px-5 sm:px-6">
        {visible.map((r) => (
          <div key={r.label} className="grid gap-1 py-3.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
            <dt className="text-[0.82rem] font-semibold text-charcoal/70">{r.label}</dt>
            <dd
              className={`text-[0.98rem] text-charcoal ${r.mono ? "font-mono text-[0.95rem] tracking-[0.02em] [overflow-wrap:anywhere]" : ""}`}
              translate={r.mono ? "no" : undefined}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      {product.producerConfirmed ? (
        <div className="flex gap-3 border-t border-line bg-cream-deep/50 px-5 py-4 sm:px-6">
          <Factory className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
          <p className="text-[0.9rem] leading-relaxed text-charcoal/85">
            <span className="font-semibold text-charcoal">Produced and packaged by {producer.name}</span>
            <br />
            <span className="text-muted">
              {producer.address.street}, {producer.address.state}, {producer.address.country}.
            </span>
          </p>
        </div>
      ) : (
        pending("producer/packager for this product")
      )}

      {product.nafdacNumber || product.ingredients ? (
        <p className="border-t border-line px-5 py-3 text-[0.78rem] leading-relaxed text-muted sm:px-6">
          Packaging details, including the NAFDAC registration number, are shown as supplied by the company and printed
          on the pack.
        </p>
      ) : null}
    </section>
  );
}
