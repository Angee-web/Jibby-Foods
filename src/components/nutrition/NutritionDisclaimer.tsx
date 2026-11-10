import { ShieldCheck } from "lucide-react";
import { NUTRITION_DISCLAIMER } from "@/content/nutrition";

export function NutritionDisclaimer({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Nutrition information disclaimer"
      className={`flex gap-3 rounded-[14px] border border-dashed border-charcoal/20 bg-cream-deep/60 p-4 text-[0.85rem] leading-relaxed text-charcoal/75 sm:p-5 ${className}`}
    >
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
      <p>
        <strong className="font-semibold text-charcoal">About this information. </strong>
        {NUTRITION_DISCLAIMER}
      </p>
    </aside>
  );
}
