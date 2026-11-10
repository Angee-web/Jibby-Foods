import { siteConfig } from "@/config/site";

/** Build a wa.me link with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productOrderMessage(productName: string, size?: string) {
  return `Hello Jibby Foods, I'd like to order ${productName}${size ? ` (${size})` : ""}. Please share price and delivery details.`;
}

export function productEnquiryMessage(productName: string, sizes?: string[]) {
  const size = sizes?.length ? ` (${sizes.join(" / ")})` : "";
  return `Hello Jibby Foods, I'd like to enquire about ${productName}${size}. Please share availability, price and delivery details.`;
}

export const generalOrderMessage =
  "Hello Jibby Foods, I'd like to make an order / enquiry.";
