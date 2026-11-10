import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, siteConfig } from "@/config/site";
import { products } from "@/content/products";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink, generalOrderMessage } from "@/lib/whatsapp";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  x: "X (Twitter)",
};

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const { contact, social } = siteConfig;
  const socials = Object.entries(social).filter(([, url]) => Boolean(url)) as [string, string][];
  const year = await currentYear();

  return (
    <footer className="on-dark bg-forest text-cream/80">
      <div className="container-x grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
            Nigerian pap powders and swallow flours, made from familiar grains and packed in resealable pouches for
            homes, retailers and distributors.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-cream hover:underline">
                    {socialLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="eyebrow text-gold">Explore</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-cream">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/wholesale" className="hover:text-cream">
                Wholesale
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-gold">Products</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:text-cream">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-gold">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li>
              <a href={`tel:${contact.phoneE164}`} className="inline-flex items-center gap-3 hover:text-cream">
                <Phone className="size-4 text-gold" aria-hidden /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(generalOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-cream"
              >
                <WhatsAppIcon className="size-4 text-gold" /> WhatsApp us
              </a>
            </li>
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 hover:text-cream">
                  <Mail className="size-4 text-gold" aria-hidden /> {contact.email}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <address className="not-italic">
                  {contact.address.street}, {contact.address.city}, {contact.address.state}
                </address>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-2 py-6 text-[0.8rem] text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName ?? siteConfig.name}. All rights reserved.
          </p>
          <p>Made in Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
