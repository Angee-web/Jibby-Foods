import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { families, productsByFamily } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { PackShot } from "@/components/product/PackShot";
import { Reveal } from "@/components/ui/Reveal";

export function ProductRange() {
  const pap = productsByFamily("pap-powders");
  const swallow = productsByFamily("swallow-flours");

  return (
    <section aria-labelledby="range-title" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-green">Our products</p>
            <h2 id="range-title" className="mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.02]">
              Everyday Nigerian staples, from breakfast to dinner.
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-2">
            <p className="text-[1.02rem] leading-relaxed text-muted">
              Pap for the morning, swallow for the evening. Every Jibby product comes in a clear resealable pouch so
              you can see exactly what you are buying.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green"
            >
              See the full catalogue <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        {/* Pap powders */}
        <div className="mt-16 md:mt-20">
          <FamilyHeading
            title={families["pap-powders"].name}
            meta="500g packs"
            href="/products/pap-powders"
            alsoCalled="Ogi · Akamu · Koko"
          />
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {pap.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Swallow flours — wider, horizontal presentation */}
        <div className="mt-20 md:mt-24">
          <FamilyHeading
            title={families["swallow-flours"].name}
            meta="1kg packs"
            href="/products/swallow-flours"
            alsoCalled="Elubo ogede · Poundo iyan"
          />
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {swallow.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 100}>
                <article className="group relative grid h-full overflow-hidden rounded-[16px] bg-paper ring-1 ring-line sm:grid-cols-[0.95fr_1.05fr]">
                  <PackShot product={p} className="aspect-[4/3] sm:aspect-auto sm:min-h-[22rem]" photoClassName="w-[44%] sm:w-[54%]" />
                  <div className="flex flex-col p-6 sm:p-8">
                    <p className="eyebrow" style={{ color: p.tint.ink }}>
                      {p.alsoKnownAs[0]}
                    </p>
                    <h3 className="mt-3 text-[1.85rem] leading-tight">
                      <Link href={`/products/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/60">
                      Enjoy with
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {p.enjoyWith.map((e) => (
                        <li key={e} className="rounded-full bg-cream-deep px-3 py-1 text-[0.8rem] text-charcoal/80">
                          {e}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-green">
                      View product
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FamilyHeading({ title, meta, href, alsoCalled }: { title: string; meta: string; href: string; alsoCalled: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="text-[1.6rem] leading-none md:text-[1.9rem]">{title}</h3>
        <span className="text-sm text-muted">{alsoCalled}</span>
      </div>
      <div className="flex items-center gap-5 text-sm">
        <span className="text-muted">{meta}</span>
        <Link href={href} className="font-semibold text-green hover:underline hover:underline-offset-4">
          View all {title.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}
