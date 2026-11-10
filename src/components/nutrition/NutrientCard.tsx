import { Info } from "lucide-react";
import type { Nutrient } from "@/content/nutrition";
import { nutrientIcons } from "./icons";

/** One nutrient, explained in plain language: what it is, what it does, why it matters. */
export function NutrientCard({
  nutrient,
  notes = [],
  tint,
}: {
  nutrient: Nutrient;
  notes?: string[];
  tint: { surface: string; ink: string };
}) {
  const Icon = nutrientIcons[nutrient.icon];
  return (
    <article className="flex h-full flex-col rounded-[16px] bg-paper p-5 ring-1 ring-line sm:p-6">
      <div className="flex items-center gap-3.5">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full"
          style={{ backgroundColor: tint.surface, color: tint.ink }}
        >
          <Icon className="size-5" aria-hidden strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{nutrient.kind}</p>
          <h4 className="font-serif text-[1.3rem] leading-tight text-charcoal">{nutrient.name}</h4>
        </div>
      </div>
      <dl className="mt-4 grid gap-3 text-[0.92rem] leading-relaxed">
        <div>
          <dt className="sr-only">What it is</dt>
          <dd className="text-charcoal/90">{nutrient.what}</dd>
        </div>
        <div>
          <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-green">What it does</dt>
          <dd className="mt-0.5 text-muted">{nutrient.role}</dd>
        </div>
        <div>
          <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-green">Why it matters</dt>
          <dd className="mt-0.5 text-muted">{nutrient.why}</dd>
        </div>
      </dl>
      {notes.length ? (
        <div className="mt-4 space-y-2 border-t border-line pt-4">
          {notes.map((n) => (
            <p key={n} className="flex gap-2 text-[0.85rem] leading-relaxed text-charcoal/75">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden />
              <span>{n}</span>
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
