import { ArrowRight } from "lucide-react";
import { products } from "@/content/products";
import { GrainField } from "@/components/art/GrainField";
import { grainFor } from "@/lib/grain";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const swatchLabels: Record<string, string> = {
  "guinea-corn-pap-powder": "Guinea corn",
  "white-corn-pap-powder": "White corn",
  "yellow-corn-pap-powder": "Yellow corn",
  "millet-corn-pap-powder": "Millet",
  "unripe-plantain-flour": "Green plantain",
  "poundo-yam-flour": "Yam",
  "soya-beans-powder": "Soya beans",
};

export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="bg-paper py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-green">About Jibby Foods</p>
          <h2 id="about-title" className="mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.04]">
            The foods Nigerian homes already love — made easier to enjoy.
          </h2>
          <div className="mt-7 max-w-xl space-y-4 text-[1.04rem] leading-relaxed text-muted">
            <p>
              Traditional pap and swallow take time: soaking, grinding, sieving, drying, pounding. Jibby Foods does that
              work before the food reaches you, turning familiar grains and produce into ready-to-prepare powders and
              flours.
            </p>
            <p>
              The result is the taste you grew up with, in a pack that fits a busy household, a supermarket shelf or a
              distributor&apos;s warehouse.
            </p>
          </div>
          <div className="mt-9">
            <Button href="/about" variant="secondary" icon={<ArrowRight className="size-4" />}>
              Our story
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={120}>
          <figure>
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {products.map((p, i) => {
                const g = grainFor(p);
                return (
                  <li key={p.slug} className="group w-[calc((100%-1.5rem)/3)] sm:w-[calc((100%-2rem)/3)]">
                    <div
                      className="relative aspect-square overflow-hidden rounded-full ring-1 ring-black/5 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                      style={{ backgroundColor: p.tint.surface }}
                    >
                      <GrainField
                        colors={p.tint.grain}
                        shape={g.shape}
                        size={[g.size[0] * 2.4, g.size[1] * 2.4]}
                        count={Math.round(g.count * 0.45)}
                        seed={20 + i}
                        className="absolute inset-0 size-full"
                      />
                    </div>
                    <p className="mt-3 text-center text-[0.85rem] font-medium text-charcoal/80">{swatchLabels[p.slug]}</p>
                  </li>
                );
              })}
            </ul>
            <figcaption className="mt-6 text-center text-sm text-muted">
              The grains, crops and beans behind the Jibby range.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
