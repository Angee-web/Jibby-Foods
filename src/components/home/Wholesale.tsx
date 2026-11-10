import { ArrowRight, Boxes, Phone, ShoppingBasket, Store, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";

const audiences = [
  { icon: Store, title: "Supermarkets", body: "Shelf-ready, labelled packs." },
  { icon: ShoppingBasket, title: "Retailers & shops", body: "Pap and swallow customers ask for." },
  { icon: Truck, title: "Distributors", body: "Partner with us to reach new areas." },
  { icon: Boxes, title: "Bulk buyers", body: "Volume orders for events and institutions." },
];

export function Wholesale() {
  return (
    <section aria-labelledby="wholesale-title" className="on-dark relative isolate overflow-hidden bg-forest py-20 text-cream md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-gold">Wholesale &amp; distribution</p>
          <h2 id="wholesale-title" className="mt-4 text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.02]">
            Stock Jibby Foods on your shelves.
          </h2>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-cream/75">
            We supply supermarkets, retailers, distributors and bulk buyers. Tell us what you need and our team will
            come back to you with availability, pricing and delivery options.
          </p>
          <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {audiences.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-soft text-gold ring-1 ring-cream/10">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-sans text-[1.02rem] font-semibold">{title}</h3>
                  <p className="mt-1 text-[0.93rem] text-cream/65">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <div className="rounded-[18px] bg-cream p-7 text-charcoal sm:p-9">
            <p className="eyebrow text-green">Business enquiries</p>
            <p className="mt-4 font-serif text-[1.9rem] leading-tight">Let&apos;s talk supply.</p>
            <p className="mt-3 leading-relaxed text-muted">
              Share your business name, location and the products you are interested in.
            </p>
            <div className="mt-7 grid gap-3">
              <Button href="/wholesale" icon={<ArrowRight className="size-4" />}>
                Start a wholesale enquiry
              </Button>
              <Button
                href={whatsappLink("Hello Jibby Foods, I'm interested in wholesale / distribution. ")}
                variant="secondary"
                icon={<WhatsAppIcon className="size-[1.1rem]" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-charcoal/80 hover:text-charcoal"
            >
              <Phone className="size-4" aria-hidden /> Or call {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
