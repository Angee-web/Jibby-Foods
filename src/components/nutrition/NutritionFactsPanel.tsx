import type { NutritionFacts } from "@/content/products";

/**
 * Verified nutrition facts. Rendered ONLY when a product has real,
 * laboratory- or label-verified values in `nutritionFacts`.
 */
export function NutritionFactsPanel({ facts, productName }: { facts: NutritionFacts; productName: string }) {
  return (
    <section aria-label={`Nutrition facts for ${productName}`} className="rounded-[14px] border-2 border-charcoal bg-paper p-5">
      <h4 className="font-sans text-xl font-bold text-charcoal">Nutrition facts</h4>
      <p className="text-sm text-muted">{facts.basis}</p>
      <table className="mt-3 w-full border-t-4 border-charcoal text-[0.92rem]">
        <tbody>
          {facts.rows.map((r) => (
            <tr key={r.label} className="border-b border-line">
              <th scope="row" className={`py-2 text-left font-medium ${r.indent ? "pl-4 font-normal text-muted" : ""}`}>
                {r.label}
              </th>
              <td className="py-2 text-right tabular-nums">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-muted">Source: {facts.source}</p>
    </section>
  );
}
