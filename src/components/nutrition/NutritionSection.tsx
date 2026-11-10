import { BookOpen, Check, FlaskConical, Info, TriangleAlert } from "lucide-react";
import type { Product } from "@/content/products";
import { ingredients, nutrientsFor, PAP_PROCESSING_NOTE } from "@/content/nutrition";
import { Pending } from "@/components/ui/Pending";
import { NutrientCard } from "./NutrientCard";
import { NutritionDisclaimer } from "./NutritionDisclaimer";
import { NutritionFactsPanel } from "./NutritionFactsPanel";

/** "Nutritional Benefits" tab: grain-level education, never invented product figures. */
export function NutritionSection({ product, wide = false }: { product: Product; wide?: boolean }) {
  const profiles = product.ingredientBasis.map((id) => ingredients[id]);
  const list = nutrientsFor(product.ingredientBasis);
  const benefits = [...new Set(profiles.flatMap((p) => p.benefits))];
  const notes = [...new Set(profiles.flatMap((p) => p.notes))];
  const allergens = [...new Set(profiles.map((p) => p.allergen).filter(Boolean))] as string[];
  const contextNotes = [
    product.family === "pap-powders" ? PAP_PROCESSING_NOTE : null,
    product.nutritionContext ?? null,
  ].filter(Boolean) as string[];
  const names = profiles.map((p) => p.name.toLowerCase());
  const subject = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0];

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow" style={{ color: product.tint.ink }}>
          Nutrition, explained
        </p>
        <h3 className="mt-3 text-[1.75rem] leading-tight sm:text-[2rem]">
          The nutritional benefits of {subject}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          {product.name} is made from {subject}. Here is what {profiles.length > 1 ? "these ingredients" : "this ingredient"}{" "}
          naturally {profiles.length > 1 ? "contain" : "contains"}, and how each nutrient contributes to everyday nutrition.
        </p>
      </div>

      {allergens.map((a) => (
        <p
          key={a}
          role="note"
          className="flex gap-3 rounded-[14px] border border-sorghum/40 bg-sorghum/5 p-4 text-[0.92rem] font-medium leading-relaxed text-sorghum"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          <span>
            <strong className="font-semibold">Allergen information: </strong>
            {a}
          </span>
        </p>
      ))}

      {contextNotes.length ? (
        <div className="space-y-3">
          {contextNotes.map((n) => (
            <p key={n} className="flex gap-3 rounded-[14px] bg-cream-deep/70 p-4 text-[0.9rem] leading-relaxed text-charcoal/80">
              <Info className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden />
              <span>{n}</span>
            </p>
          ))}
        </div>
      ) : null}

      {product.nutritionFacts ? (
        <div>
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cream">
            <FlaskConical className="size-3.5" aria-hidden />
            Laboratory results · finished product
          </p>
          <NutritionFactsPanel facts={product.nutritionFacts} productName={product.name} />
        </div>
      ) : (
        <Pending note="laboratory nutrition results for the finished product" />
      )}

      <div>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-charcoal/25 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-charcoal/70">
          <BookOpen className="size-3.5" aria-hidden />
          General ingredient information
        </p>
        <p className="mt-3 max-w-2xl text-[0.88rem] leading-relaxed text-muted">
          {product.nutritionFacts
            ? "The guide below describes the raw ingredient in general. For this product's measured values, see the laboratory results above."
            : `The guide below describes ${subject} in general. It is not a laboratory analysis of ${product.name}.`}
        </p>
        <h4 className="eyebrow mt-6 text-charcoal/60">Key nutrients in {subject}</h4>
        <ul className={`mt-4 grid gap-4 ${wide ? "md:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"}`}>
          {list.map(({ nutrient, notes }) => (
            <li key={nutrient.id}>
              <NutrientCard nutrient={nutrient} notes={notes} tint={product.tint} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[16px] p-6 sm:p-7" style={{ backgroundColor: product.tint.surface }}>
        <h4 className="font-serif text-[1.45rem] leading-tight" style={{ color: product.tint.ink }}>
          Potential dietary benefits
        </h4>
        <ul className="mt-4 grid gap-3">
          {benefits.map((b) => (
            <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-charcoal/85">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-paper" style={{ color: product.tint.ink }}>
                <Check className="size-3.5" aria-hidden strokeWidth={2.5} />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.88rem] leading-relaxed text-charcoal/70">
          {product.name} can form part of a balanced diet alongside vegetables, protein foods and fruit.
        </p>
      </div>

      {notes.length ? (
        <ul className="space-y-2 text-[0.88rem] leading-relaxed text-muted">
          {notes.map((n) => (
            <li key={n} className="flex gap-2">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              {n}
            </li>
          ))}
        </ul>
      ) : null}

      <NutritionDisclaimer />
    </div>
  );
}
