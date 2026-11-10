import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Soup, Sprout } from "lucide-react";
import { products } from "@/content/products";
import { ingredients } from "@/content/nutrition";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { NutritionDisclaimer } from "@/components/nutrition/NutritionDisclaimer";
import { GrainField } from "@/components/art/GrainField";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Wholesale } from "@/components/home/Wholesale";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Products — Nigerian Pap Powders & Swallow Flours",
  description:
    "Explore Jibby Foods' traditional Nigerian food products — guinea corn, corn and millet corn pap powders, unripe plantain flour, poundo yam flour and soya beans powder — and learn about their nutrition and everyday uses.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Discover the Goodness of Every Grain — Jibby Foods",
    description:
      "Traditional Nigerian pap powders and swallow flours, with clear, responsible nutrition information and meal ideas.",
    url: "/products",
  },
};

const ribbon = (["sorghum", "white-maize", "yellow-maize", "millet", "unripe-plantain", "yam", "soya"] as const).map(
  (id) => ingredients[id],
);

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={itemListSchema(products.map((p) => ({ name: p.name, url: `/products/${p.slug}` })))} />

      {/* Hero */}
      <section aria-labelledby="products-title" className="relative overflow-hidden bg-cream-deep">
        <div className="container-x pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs items={[{ label: "Our Products", href: "/products" }]} />
          <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow text-green">Our products</p>
              <h1 id="products-title" className="mt-4 text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98]">
                Discover the Goodness of <em className="italic text-green">Every Grain.</em>
              </h1>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:pb-3" delay={120}>
              <p className="text-[1.08rem] leading-relaxed text-muted">
                Explore our range of traditional Nigerian food products and discover their nutritional value,
                versatility and place in everyday meals.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: BookOpen, title: "Overview", body: "What each product is, its format and pack size." },
                { icon: Sprout, title: "Nutritional benefits", body: "The nutrients in each grain, explained simply." },
                { icon: Soup, title: "How to use", body: "Familiar Nigerian meals to enjoy it with." },
              ].map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3.5 rounded-[14px] bg-paper/70 p-4 ring-1 ring-line">
                  <Icon className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
                  <p className="text-[0.9rem] leading-relaxed text-muted">
                    <span className="block font-semibold text-charcoal">{title}</span>
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Six-grain ribbon, one band per source ingredient */}
        <div aria-hidden className="grid h-16 grid-cols-7 md:h-20">
          {ribbon.map((ing, i) => (
            <div key={ing.id} className="relative overflow-hidden" style={{ backgroundColor: ing.art.surface }}>
              <GrainField
                colors={ing.art.grain}
                shape={ing.art.shape}
                size={ing.art.shape === "round" ? [6, 10] : [10, 15]}
                count={ing.art.shape === "round" ? 160 : 60}
                seed={i * 11 + 5}
                aspect={2.5}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section aria-labelledby="catalogue-title" className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="catalogue-title" className="text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">
              The Jibby Foods range
            </h2>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-muted">
              Select a product to explore its nutrition, ingredients and the meals it belongs in.
            </p>
          </div>
          <ProductExplorer products={products} />
        </div>
      </section>

      {/* How to read our nutrition information */}
      <section aria-labelledby="nutrition-note-title" className="pb-20 md:pb-28">
        <div className="container-x">
          <Reveal className="grid gap-8 rounded-[22px] bg-paper p-7 ring-1 ring-line md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-green">Nutrition, responsibly</p>
              <h2 id="nutrition-note-title" className="mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">
                How to read our nutrition information
              </h2>
            </div>
            <div className="space-y-4 leading-relaxed text-muted lg:col-span-7">
              <p>
                Our nutrition guides describe the grains, plantain and yam our products are made from — what they
                naturally contain and how those nutrients contribute to everyday nutrition. We do not show calories,
                gram amounts or percentages until they have been confirmed by laboratory testing of our finished
                products.
              </p>
              <p>
                Processing matters: soaking, fermenting, milling, sieving and drying all change a food&apos;s
                composition. Where that is especially relevant — for example in pap — we say so.
              </p>
              <NutritionDisclaimer className="mt-2" />
              <Link
                href="/quality-and-production"
                className="inline-flex items-center gap-1.5 pt-2 font-semibold text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green"
              >
                How our products are made <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Wholesale />
    </>
  );
}
