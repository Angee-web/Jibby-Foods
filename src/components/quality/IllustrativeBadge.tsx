import { Info } from "lucide-react";

/** Publicly visible label for content that shows typical practice rather than Jibby's confirmed process. */
export function IllustrativeBadge({ tone = "light", label = "Illustrative overview" }: { tone?: "light" | "dark"; label?: string }) {
  const cls =
    tone === "dark" ? "border-cream/25 text-cream/80" : "border-charcoal/20 text-charcoal/70";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] ${cls}`}>
      <Info className="size-3.5" aria-hidden />
      {label}
    </span>
  );
}
