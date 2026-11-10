import { CookingPot, Info, UtensilsCrossed } from "lucide-react";
import type { Product } from "@/content/products";

/** "How to Use" tab: everyday Nigerian meal ideas and the general preparation method. */
export function HowToUse({ product }: { product: Product }) {
  const isPap = product.family === "pap-powders";
  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow" style={{ color: product.tint.ink }}>
          In everyday meals
        </p>
        <h3 className="mt-3 text-[1.75rem] leading-tight sm:text-[2rem]">
          {isPap ? "Ways to enjoy your pap" : `Serving ${product.name.toLowerCase()}`}
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {product.servingIdeas.map((idea) => (
            <li key={idea.title} className="rounded-[16px] bg-paper p-5 ring-1 ring-line">
              <UtensilsCrossed className="size-5" style={{ color: product.tint.ink }} aria-hidden />
              <h4 className="mt-3 font-serif text-[1.2rem] leading-tight">{idea.title}</h4>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{idea.body}</p>
            </li>
          ))}
        </ul>
      </div>

      {product.preparation ? (
        <div>
          <div className="flex items-center gap-3">
            <CookingPot className="size-5 text-green" aria-hidden />
            <h4 className="font-serif text-[1.45rem] leading-tight">
              {product.preparation.confirmed
                ? "How to prepare"
                : isPap
                  ? "How pap is traditionally prepared"
                  : "How swallow is traditionally prepared"}
            </h4>
          </div>
          <ol className="mt-5 space-y-4">
            {product.preparation.steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full text-[0.85rem] font-semibold"
                  style={{ backgroundColor: product.tint.surface, color: product.tint.ink }}
                >
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed text-charcoal/85">{s}</p>
              </li>
            ))}
          </ol>
          {!product.preparation.confirmed ? (
            <p className="mt-6 flex gap-3 rounded-[14px] bg-cream-deep/70 p-4 text-[0.88rem] leading-relaxed text-charcoal/80">
              <Info className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden />
              <span>
                This is a general guide to the traditional method. Quantities and timings vary, so always follow the
                preparation instructions printed on your Jibby Foods pack.
              </span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
