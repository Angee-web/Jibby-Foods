import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  Handshake,
  Package,
  Phone,
  Scale,
  ScanSearch,
  ShoppingBasket,
  Sparkles,
  Store,
  Truck,
  Warehouse,
  Wrench,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getProduct, products } from "@/content/products";
import { ingredients } from "@/content/nutrition";
import {
  packagingFeatures,
  preparationSteps,
  processes,
  productionJourney,
  qualityAreas,
  sourcedIngredients,
  sourcingStatement,
  type QualityIcon,
} from "@/content/quality";
import { GrainField } from "@/components/art/GrainField";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Pending } from "@/components/ui/Pending";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { IllustrativeBadge } from "@/components/quality/IllustrativeBadge";
import { ProductionJourney } from "@/components/quality/ProductionJourney";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Quality & Production — How Our Pap and Flours Are Made",
  description:
    "How Jibby Foods approaches ingredients, preparation, processing, quality and packaging for its Nigerian pap powders, unripe plantain flour and poundo yam flour.",
  alternates: { canonical: "/quality-and-production" },
  openGraph: {
    title: "Quality Begins With Every Ingredient — Jibby Foods",
    description: "The care behind every pack of Jibby Foods pap powder and swallow flour.",
    url: "/quality-and-production",
  },
};

const qualityIcons: Record<QualityIcon, LucideIcon> = {
  scan: ScanSearch,
  sparkles: Sparkles,
  wrench: Wrench,
  scale: Scale,
  droplets: Droplets,
  package: Package,
  warehouse: Warehouse,
};

function IngredientArt({ id, className = "" }: { id: (typeof sourcedIngredients)[number]["id"]; className?: string }) {
  const ing = ingredients[id];
  return (
    <div aria-hidden className={`relative overflow-hidden ${className}`} style={{ backgroundColor: ing.art.surface }}>
      <GrainField
        colors={ing.art.grain}
        shape={ing.art.shape}
        size={ing.art.shape === "round" ? [7, 12] : ing.art.shape === "kernel" ? [11, 16] : [13, 19]}
        count={ing.art.shape === "round" ? 190 : ing.art.shape === "kernel" ? 95 : 55}
        seed={id.length * 7}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default function QualityPage() {
  const journey = productionJourney;
  return (
    <>
      {/* 1 — Hero */}
      <section aria-labelledby="quality-title" className="overflow-hidden bg-cream-deep">
        <div className="container-x pb-16 pt-8 md:pb-24 md:pt-10">
          <Breadcrumbs items={[{ label: "Quality & Production", href: "/quality-and-production" }]} />
          <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow text-green">Quality &amp; production</p>
              <h1 id="quality-title" className="mt-4 text-[clamp(2.6rem,6.4vw,5rem)] leading-[0.98]">
                Quality Begins With <em className="italic text-green">Every Ingredient.</em>
              </h1>
              <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-muted">
                At Jibby Foods, we believe that quality food starts with careful attention to the ingredients,
                preparation and processes behind every product.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#journey" icon={<ArrowRight className="size-4" />}>
                  See the journey
                </Button>
                <Button href="#business" variant="secondary">
                  Business enquiries
                </Button>
              </div>
            </Reveal>

            {/* Ingredient mosaic (illustrative until production photography is supplied) */}
            <Reveal className="lg:col-span-6" delay={120}>
              <div className="grid grid-cols-3 gap-3">
                {sourcedIngredients
                  .filter(({ id }) => id !== "white-maize")
                  .map(({ id }, i) => (
                  <figure key={id} className={`overflow-hidden rounded-[16px] ring-1 ring-black/5 ${i % 3 === 1 ? "translate-y-5" : ""}`}>
                    <IngredientArt id={id} className="aspect-[3/4]" />
                    <figcaption className="sr-only">{ingredients[id].name}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 text-right text-xs text-muted">
                Illustrations of our raw ingredients
                <Pending note="replace with ingredient & production photography" />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey overview */}
      <section id="journey" aria-labelledby="journey-title" className="on-dark scroll-mt-20 bg-forest py-20 text-cream md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-gold">From field to kitchen</p>
              <h2 id="journey-title" className="mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02]">
                The journey of every pack.
              </h2>
            </Reveal>
            <Reveal className="space-y-4 lg:col-span-5" delay={100}>
              <p className="leading-relaxed text-cream/75">
                Six stages take our ingredients from raw produce to the pack on your shelf. Each product follows its own
                path through them.
              </p>
              {!journey.confirmed ? <IllustrativeBadge tone="dark" /> : null}
            </Reveal>
          </div>
          <div className="mt-16">
            <ProductionJourney steps={journey.steps} />
          </div>
          {!journey.confirmed ? (
            <p className="mt-14 max-w-2xl text-[0.85rem] leading-relaxed text-cream/55">
              This is a general overview of how dry pap powders and flours are produced. Details of our own process
              will be added here as they are confirmed.
            </p>
          ) : null}
        </div>
      </section>

      {/* 2 — Ingredient sourcing */}
      <section aria-labelledby="sourcing-title" className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow text-green">01 · Ingredient sourcing</p>
              <h2 id="sourcing-title" className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]">
                Familiar Nigerian staples.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="leading-relaxed text-muted">
                Our range is built on grains, plantain, yam and soya beans that have fed Nigerian families for generations. Choosing
                sound raw materials is the first step towards a good finished product.
              </p>
              {sourcingStatement ? (
                <p className="mt-4 leading-relaxed text-charcoal/85">{sourcingStatement}</p>
              ) : (
                <Pending note="how & where raw materials are sourced and selected" />
              )}
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sourcedIngredients.map(({ id, usedIn }, i) => {
              const ing = ingredients[id];
              return (
                <Reveal as="li" key={id} delay={i * 70} className="overflow-hidden rounded-[18px] bg-paper ring-1 ring-line">
                  <IngredientArt id={id} className="aspect-[16/9]" />
                  <div className="p-6">
                    <h3 className="text-[1.5rem] leading-tight">{ing.name}</h3>
                    <p className="mt-1 text-sm text-muted">{ing.localNames.join(" · ")}</p>
                    <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-charcoal/55">Used in</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {usedIn.map((slug) => {
                        const p = getProduct(slug);
                        return p ? (
                          <li key={slug}>
                            <Link
                              href={`/products/${slug}`}
                              className="inline-flex rounded-full bg-cream-deep px-3 py-1 text-[0.82rem] font-medium text-charcoal/85 transition-colors hover:bg-forest hover:text-cream"
                            >
                              {p.name}
                            </Link>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3 — Ingredient preparation */}
      <section aria-labelledby="prep-title" className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-green">02 · Ingredient preparation</p>
            <h2 id="prep-title" className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]">
              Ready before processing begins.
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Before any milling or drying, raw materials need to be clean and free of anything that does not belong in
              food.
            </p>
            {preparationSteps.some((s) => !s.confirmed) ? (
              <div className="mt-6">
                <IllustrativeBadge label="Typical steps" />
              </div>
            ) : null}
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {preparationSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="rounded-[16px] bg-cream p-6 ring-1 ring-line">
                <span className="font-serif text-[2.2rem] leading-none text-gold-deep">0{i + 1}</span>
                <h3 className="mt-4 text-[1.35rem] leading-tight">{s.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — Processing & milling */}
      <section aria-labelledby="processing-title" className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-green">03 · Processing &amp; milling</p>
              <h2 id="processing-title" className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]">
                Different foods, different journeys.
              </h2>
            </Reveal>
            <Reveal className="space-y-4 lg:col-span-5" delay={100}>
              <p className="leading-relaxed text-muted">
                Pap, plantain flour and yam flour are each made in their own way. These are the traditional methods
                behind each type of product.
              </p>
              {processes.some((p) => !p.confirmed) ? <IllustrativeBadge label="Traditional methods" /> : null}
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {processes.map((proc, i) => {
              const lead = getProduct(proc.products[0]);
              return (
                <Reveal key={proc.id} delay={i * 100} className="flex flex-col overflow-hidden rounded-[18px] bg-paper ring-1 ring-line">
                  <div className="relative h-36 overflow-hidden" style={{ backgroundColor: lead?.tint.surface }}>
                    {lead ? (
                      <GrainField
                        colors={lead.tint.grain}
                        shape={proc.id === "pap" ? "round" : "slice"}
                        size={proc.id === "pap" ? [6, 10] : [12, 17]}
                        count={proc.id === "pap" ? 200 : 60}
                        seed={i * 13 + 3}
                        aspect={2.4}
                        className="absolute inset-0 h-full w-full"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-[1.6rem] leading-tight">{proc.name}</h3>
                    <ol aria-label={`${proc.name} process stages`} className="mt-4 flex flex-wrap items-center gap-1.5">
                      {proc.steps.map((st, j) => (
                        <li key={st} className="flex items-center gap-1.5">
                          <span className="rounded-full bg-cream-deep px-3 py-1 text-[0.8rem] font-medium text-charcoal/85">
                            {st}
                          </span>
                          {j < proc.steps.length - 1 ? (
                            <ArrowRight className="size-3.5 text-charcoal/35" aria-hidden />
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-5 text-[0.93rem] leading-relaxed text-muted">{proc.note}</p>
                    <p className="mt-auto pt-6 text-[0.82rem] text-charcoal/65">
                      Applies to:{" "}
                      {proc.products
                        .map((s) => getProduct(s))
                        .filter(Boolean)
                        .map((p, k, arr) => (
                          <span key={p!.slug}>
                            <Link href={`/products/${p!.slug}`} className="font-semibold text-green hover:underline">
                              {p!.name}
                            </Link>
                            {k < arr.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Pending note="Jibby's actual process for each product (then set confirmed: true)" />
        </div>
      </section>

      {/* 5 — Quality assurance */}
      <section aria-labelledby="qa-title" className="bg-cream-deep py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-green">04 · Quality assurance</p>
              <h2 id="qa-title" className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]">
                What quality means for dry foods.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={100}>
              <p className="leading-relaxed text-muted">
                Pap powders and flours are simple foods, and their quality depends on getting the basics right at every
                stage. These are the areas that matter most.
              </p>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {qualityAreas.map((q, i) => {
              const Icon = qualityIcons[q.icon];
              return (
                <Reveal
                  as="li"
                  key={q.title}
                  delay={(i % 4) * 70}
                  className={`flex flex-col rounded-[16px] bg-paper p-6 ring-1 ring-line ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
                >
                  <span className="grid size-11 place-items-center rounded-full bg-forest text-gold">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.3rem] leading-tight">{q.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{q.why}</p>
                  {q.jibbyPractice ? (
                    <p className="mt-4 border-t border-line pt-4 text-[0.9rem] leading-relaxed text-charcoal/85">
                      <strong className="font-semibold text-green">At Jibby Foods: </strong>
                      {q.jibbyPractice}
                    </p>
                  ) : (
                    <Pending note="what Jibby actually does here" />
                  )}
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-10 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
            Business buyers can request details of our production and quality practices directly —{" "}
            <a href="#business" className="font-semibold text-green underline decoration-green/30 underline-offset-4 hover:decoration-green">
              get in touch
            </a>
            .
          </p>
        </div>
      </section>

      {/* 6 — Packaging & handling */}
      <section aria-labelledby="packaging-title" className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-green">05 · Packaging &amp; handling</p>
              <h2 id="packaging-title" className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]">
                Sealed, labelled and easy to store.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                The right packaging protects dry food from moisture, air and pests, and tells you exactly what you are
                buying.
              </p>
              <ul className="mt-8 space-y-4">
                {packagingFeatures
                  .filter((f) => f.confirmed)
                  .map((f) => (
                    <li key={f.title} className="flex gap-3.5">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green text-cream">
                        <Check className="size-3.5" strokeWidth={2.6} aria-hidden />
                      </span>
                      <p className="leading-relaxed">
                        <span className="font-semibold">{f.title}.</span>{" "}
                        <span className="text-muted">{f.body}</span>
                      </p>
                    </li>
                  ))}
              </ul>
              {packagingFeatures
                .filter((f) => !f.confirmed)
                .map((f) => (
                  <Pending key={f.title} note={f.title.toLowerCase()} />
                ))}
              <p className="mt-8 rounded-[14px] bg-cream-deep/70 p-4 text-[0.9rem] leading-relaxed text-charcoal/80">
                <strong className="font-semibold">Kitchen tip: </strong>
                reseal the pouch after every use and keep it in a cool, dry place away from direct sunlight.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={120}>
              <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                {products.flatMap((p) => (p.image ? [{ ...p, image: p.image }] : [])).map((p, i) => (
                  <li
                    key={p.slug}
                    className={`group relative overflow-hidden rounded-[16px] ${i % 3 === 1 ? "translate-y-6" : ""}`}
                    style={{ backgroundColor: p.tint.surface }}
                  >
                    <Link href={`/products/${p.slug}`} className="block p-[12%]">
                      <span className="relative block aspect-[2/3] overflow-hidden rounded-[8px] shadow-[0_14px_30px_-16px_rgb(41_40_32/0.6)] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
                        <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 160px, 28vw" className="object-cover" />
                      </span>
                      <span className="mt-3 block text-center text-[0.78rem] font-semibold leading-tight text-charcoal/80">
                        {p.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 — Our commitment */}
      <section aria-labelledby="commitment-title" className="on-dark relative isolate overflow-hidden bg-forest py-24 text-cream md:py-32">
        <GrainField
          colors={["#2a4433", "#34503a"]}
          count={120}
          size={[6, 11]}
          seed={41}
          spill={0.8}
          aspect={3}
          className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-70"
        />
        <Reveal className="container-x text-center">
          <p className="eyebrow text-gold">06 · Our commitment</p>
          <h2 id="commitment-title" className="mx-auto mt-5 max-w-4xl text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.02]">
            Food you can bring to your table <em className="italic text-gold">with confidence.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-cream/75">
            We are committed to making traditional Nigerian foods that families can enjoy every day — prepared with care,
            packed properly, and described honestly.
          </p>
          <ul className="mx-auto mt-14 grid max-w-4xl gap-8 text-left sm:grid-cols-3">
            {[
              { title: "Careful preparation", body: "Attention to ingredients and process at every stage." },
              { title: "Proper packaging", body: "Labelled, resealable packs that protect what is inside." },
              { title: "Honest information", body: "Clear product details and responsible nutrition content." },
            ].map((c) => (
              <li key={c.title} className="border-t border-cream/20 pt-5">
                <h3 className="font-sans text-[1.02rem] font-semibold">{c.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-cream/65">{c.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 8 — Business enquiries */}
      <section id="business" aria-labelledby="business-title" className="scroll-mt-20 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-green">Business enquiries</p>
            <h2 id="business-title" className="mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02]">
              Partner with Jibby Foods.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              We welcome enquiries from businesses that want to stock or distribute our products. Tell us about your
              business, and we will come back to you with availability, pricing and supply options.
            </p>
            <ul className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {[
                { icon: Store, label: "Retailers" },
                { icon: ShoppingBasket, label: "Supermarkets" },
                { icon: Boxes, label: "Wholesalers" },
                { icon: Truck, label: "Distributors" },
                { icon: Handshake, label: "Bulk purchasers" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream-deep text-green">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-semibold">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <div className="rounded-[20px] bg-paper p-7 ring-1 ring-line sm:p-9">
              <p className="font-serif text-[1.9rem] leading-tight">Let&apos;s talk supply.</p>
              <p className="mt-3 leading-relaxed text-muted">
                Share your business name, location and the products you are interested in.
              </p>
              <div className="mt-7 grid gap-3">
                <Button
                  href={whatsappLink(
                    "Hello Jibby Foods, I'm interested in stocking / distributing your products. My business is: ",
                  )}
                  icon={<WhatsAppIcon className="size-[1.1rem]" />}
                >
                  Enquire on WhatsApp
                </Button>
                <Button href={`tel:${siteConfig.contact.phoneE164}`} variant="secondary" icon={<Phone className="size-4" />}>
                  Call {siteConfig.contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
