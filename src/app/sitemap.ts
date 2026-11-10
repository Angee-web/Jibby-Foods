import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { families, products } from "@/content/products";

/** Lists only routes that exist. Add new pages here as they are built. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/products"), changeFrequency: "monthly", priority: 0.9 },
    ...Object.keys(families).map((f) => ({ url: url(`/products/${f}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...products.map((p) => ({
      url: url(`/products/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(p.image ? { images: [url(p.image.src)] } : {}),
    })),
    { url: url("/quality-and-production"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
