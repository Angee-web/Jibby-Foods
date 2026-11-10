import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Pending } from "@/components/ui/Pending";
import { Button } from "@/components/ui/Button";

/**
 * High-level stages common to producing dry pap powders and flours.
 * Replace the descriptions with Jibby Foods' actual process once confirmed.
 */
const steps = [
  { title: "Selecting", body: "Raw grains, plantain and yam are chosen for processing." },
  { title: "Cleaning", body: "Produce is cleaned and prepared before processing begins." },
  { title: "Processing", body: "Each product is processed according to its traditional method." },
  { title: "Drying & milling", body: "Processed produce is dried and milled into fine powder or flour." },
  { title: "Packing", body: "Finished products are sealed in labelled, resealable pouches." },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-cream-deep py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-green">Quality &amp; production</p>
            <h2 id="process-title" className="mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.04]">
              From grain to pack.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <p className="leading-relaxed text-muted">
              Every Jibby product follows the same journey: careful selection, preparation, processing and packing.
              <Pending note="replace with Jibby's actual process & quality checks" />
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-5">
          <span aria-hidden className="absolute left-[1.15rem] top-0 h-full w-px bg-charcoal/15 md:left-0 md:top-[1.15rem] md:h-px md:w-full" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative pl-14 md:pl-0 md:pt-14">
              <span className="absolute left-0 top-0 grid size-[2.3rem] place-items-center rounded-full bg-forest text-[0.85rem] font-semibold text-cream ring-4 ring-cream-deep">
                {i + 1}
              </span>
              <h3 className="text-[1.35rem] leading-tight">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-14">
          <Button href="/quality-and-production" variant="secondary" icon={<ArrowRight className="size-4" />}>
            How we make our products
          </Button>
        </div>
      </div>
    </section>
  );
}
