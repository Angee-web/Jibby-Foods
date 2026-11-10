import { Reveal } from "@/components/ui/Reveal";

/**
 * Only commitments that are visible from the product itself are stated here.
 * Add claims about sourcing, testing or certification once verified.
 */
const reasons = [
  {
    title: "Grains you already know",
    body: "Guinea corn, white and yellow maize, millet, green plantain and yam — the staples behind generations of Nigerian meals.",
  },
  {
    title: "Ready in minutes",
    body: "No soaking, grinding or pounding at home. Mix with water, cook, and the meal is on the table.",
  },
  {
    title: "Resealable, see-through packs",
    body: "A clear pouch shows exactly what is inside, and the zip seal makes it easy to close the pack between uses.",
  },
  {
    title: "For homes and for shelves",
    body: "Household packs for families, with wholesale supply for supermarkets, retailers and distributors.",
  },
];

export function WhyJibby() {
  return (
    <section aria-labelledby="why-title" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-green">Why Jibby Foods</p>
          <h2 id="why-title" className="mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.04]">
            Tradition, without the long preparation.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 90} className="border-t border-charcoal/80 pt-6">
              <span className="font-serif text-[2.6rem] leading-none text-gold-deep" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="mt-5 text-[1.45rem] leading-tight">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{r.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
