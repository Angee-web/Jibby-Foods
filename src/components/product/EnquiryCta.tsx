import { Phone } from "lucide-react";
import type { Product } from "@/content/products";
import { siteConfig } from "@/config/site";
import { productEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Product enquiry: opens WhatsApp with the product name and pack size pre-filled. */
export function EnquiryCta({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div className={compact ? "grid gap-2.5 sm:grid-cols-[1fr_auto]" : "grid gap-3"}>
      <a
        href={whatsappLink(productEnquiryMessage(product.name, product.sizes))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-green px-6 text-[0.95rem] font-semibold text-cream shadow-[0_10px_24px_-12px_rgb(31_51_38/0.7)] transition-[background-color,transform] duration-300 hover:bg-forest active:scale-[0.98]"
      >
        <WhatsAppIcon className="size-5" />
        Enquire About This Product
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
      <a
        href={`tel:${siteConfig.contact.phoneE164}`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-5 text-[0.9rem] font-semibold text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
      >
        <Phone className="size-4" aria-hidden />
        {compact ? "Call" : `Call ${siteConfig.contact.phoneDisplay}`}
        {compact ? <span className="sr-only"> {siteConfig.contact.phoneDisplay}</span> : null}
      </a>
    </div>
  );
}
