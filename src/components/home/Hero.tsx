import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { families, products } from "@/content/products";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { GrainField } from "@/components/art/GrainField";
import { whatsappLink, generalOrderMessage } from "@/lib/whatsapp";

// Arrange the six packs into three staggered columns: pap / mixed / swallow
const columns = [
  ["guinea-corn-pap-powder", "white-corn-pap-powder"],
  ["yellow-corn-pap-powder", "unripe-plantain-flour"],
  ["millet-corn-pap-powder", "poundo-yam-flour"],
].map((col) =>
  col.flatMap((slug) => {
    const p = products.find((x) => x.slug === slug);
    return p?.image ? [{ ...p, image: p.image }] : [];
  }),
);

const facts = ["500g & 1kg resealable packs", "Order by WhatsApp or phone", "Wholesale enquiries welcome"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-12 pb-16 pt-8 md:pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-green">
            <span>Pap powders</span>
            <span aria-hidden className="size-1 rounded-full bg-gold" />
            <span>Swallow flours</span>
            <span aria-hidden className="size-1 rounded-full bg-gold" />
            <span>Made in Nigeria</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.9rem,8.2vw,6.1rem)] leading-[0.95] text-charcoal"
          >
            Good food,
            <br />
            rooted in <em className="italic text-green">tradition.</em>
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-muted md:text-[1.15rem]">
            Jibby Foods makes pap powders and swallow flours from grains Nigerian homes have always known — guinea
            corn, maize, millet, green plantain and yam — packed in resealable pouches and ready for your kitchen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" icon={<ArrowRight className="size-4" />}>
              Explore our products
            </Button>
            <Button
              href={whatsappLink(generalOrderMessage)}
              variant="secondary"
              icon={<WhatsAppIcon className="size-[1.1rem]" />}
            >
              Order on WhatsApp
            </Button>
          </div>
          <ul className="mt-10 grid gap-2.5 text-[0.9rem] text-charcoal/80 sm:flex sm:flex-wrap sm:gap-x-6">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-4 text-green" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pack line-up on a forest-green stage (echoes the brand's own flyer) */}
        <div className="lg:col-span-6 xl:col-span-6">
          <div className="relative isolate overflow-hidden rounded-[22px] bg-forest px-5 pb-10 pt-8 sm:px-8 lg:px-10 lg:pb-14 lg:pt-12">
            <GrainField
              colors={["#d9a52e", "#c98e1f", "#a33b26", "#e8dcc0", "#b3a374"]}
              shape="round"
              size={[4, 7]}
              count={70}
              seed={11}
              spill={1.4}
              aspect={2.6}
              className="absolute inset-x-0 bottom-0 -z-10 h-[30%] w-full opacity-60"
            />
            <div
              aria-hidden
              className="absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-gold/25"
            />
            <div
              aria-hidden
              className="absolute -right-12 -top-12 -z-10 size-48 rounded-full border border-gold/20"
            />
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {columns.map((col, ci) => (
                <ul key={ci} className={`grid gap-3 sm:gap-5 ${ci === 1 ? "-translate-y-0 pt-0" : "pt-8 sm:pt-12"}`}>
                  {col.map((p, ri) => (
                    <li
                      key={p.slug}
                      className="relative aspect-[2/3] overflow-hidden rounded-[10px] shadow-[0_24px_40px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10 motion-safe:animate-[menuIn_0.9s_var(--ease-out-soft)_both]"
                      style={{ animationDelay: `${150 + (ci * 2 + ri) * 90}ms` }}
                    >
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        fill
                        priority={ri === 0}
                        sizes="(min-width: 1280px) 190px, (min-width: 1024px) 15vw, 30vw"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <p className="relative mt-8 flex items-center justify-between gap-4 text-[0.8rem] text-cream/70">
              <span className="eyebrow text-gold">The Jibby range</span>
              <span>{products.length} products · {Object.keys(families).length} families</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
