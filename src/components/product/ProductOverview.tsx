import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { families, type Product } from "@/content/products";
import { ingredients } from "@/content/nutrition";
import { Pending, showPlaceholders } from "@/components/ui/Pending";
import { PackInformation } from "./PackInformation";

/** Placeholder for an unconfirmed field: visible in development only, row omitted on the live site. */
const pending = (note: string) => (showPlaceholders ? <Pending note={note} /> : null);

/** "Overview" tab. Unconfirmed fields are omitted (or flagged in development). */
export function ProductOverview({ product }: { product: Product }) {
  const family = families[product.family];
  const ingredientAllergens = product.ingredientBasis.map((id) => ingredients[id].allergen).filter(Boolean) as string[];

  const facts: { label: string; value: ReactNode }[] = [{ label: "Product format", value: family.format }];
  facts.push({ label: "Packaging", value: product.packaging ?? pending("packaging type") });
  if (product.allergens || ingredientAllergens.length) {
    facts.push({
      label: "Allergens",
      value: (
        <span className="inline-flex gap-1.5 text-sorghum">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {product.allergens ?? ingredientAllergens.join(" ")}
        </span>
      ),
    });
  }
  facts.push({ label: "Storage", value: product.storage ?? pending("storage instructions from the pack") });
  facts.push({ label: "Best before", value: pending("production & expiry date information") });

  const rows = facts.filter((f) => f.value != null);

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-[1.02rem] leading-relaxed text-charcoal/85">
        {product.description.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <PackInformation product={product} />

      {product.alsoKnownAs.length ? (
        <div>
          <h3 className="eyebrow text-charcoal/60">Also known as</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.alsoKnownAs.map((n) => (
              <li key={n} className="rounded-full border border-charcoal/15 px-3 py-1 text-[0.85rem] text-charcoal/80">
                {n}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="eyebrow text-charcoal/60">More details</h3>
        <dl className="mt-3 divide-y divide-line border-y border-line">
          {rows.map((f) => (
            <div key={f.label} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-[0.85rem] font-semibold text-charcoal">{f.label}</dt>
              <dd className="text-[0.95rem] leading-relaxed text-muted">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h3 className="eyebrow text-charcoal/60">Commonly enjoyed with</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {product.enjoyWith.map((e) => (
            <li
              key={e}
              className="rounded-full px-3.5 py-1.5 text-[0.88rem] font-medium"
              style={{ backgroundColor: product.tint.surface, color: product.tint.ink }}
            >
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
