import { siteConfig } from "@/config/site";
import type { Product } from "@/content/products";

/**
 * Structured data helpers. Only real, supplied information is included:
 * missing details (email, address, socials) are simply omitted.
 */
export function organizationSchema() {
  const { contact, social } = siteConfig;
  const sameAs = Object.values(social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    url: siteConfig.url,
    description: siteConfig.description,
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phoneE164,
        contactType: "sales",
        areaServed: "NG",
        availableLanguage: ["en"],
        ...(contact.email ? { email: contact.email } : {}),
      },
    ],
    ...(contact.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.street,
            addressLocality: contact.address.city,
            addressRegion: contact.address.state,
            addressCountry: "NG",
          },
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-NG",
  };
}

/** Product structured data — no prices, ratings or offers are invented. */
export function productSchema(product: Product, categoryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/products/${product.slug}#product`,
    name: product.name,
    description: product.summary,
    url: `${siteConfig.url}/products/${product.slug}`,
    ...(product.image ? { image: `${siteConfig.url}${product.image.src}` } : {}),
    category: categoryName,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.producerConfirmed
      ? {
          manufacturer: {
            "@type": "Organization",
            name: siteConfig.producer.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.producer.address.street,
              addressRegion: siteConfig.producer.address.state,
              addressCountry: "NG",
            },
          },
        }
      : {}),
    ...(product.nafdacNumber
      ? {
          additionalProperty: [
            { "@type": "PropertyValue", name: "NAFDAC registration number", value: product.nafdacNumber },
          ],
        }
      : {}),
    ...(product.alsoKnownAs.length ? { alternateName: product.alsoKnownAs } : {}),
    ...(product.sizes.length === 1 ? { size: product.sizes[0] } : {}),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${siteConfig.url}${it.url}`,
    })),
  };
}
