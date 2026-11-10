import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  families,
  getProduct,
  products,
  productsByFamily,
  relatedProducts,
  type Product,
  type ProductFamily,
} from "@/content/products";
import { ingredients } from "@/content/nutrition";
import { PackShot } from "@/components/product/PackShot";
import { ProductTabs } from "@/components/product/ProductTabs";
import { EnquiryCta } from "@/components/product/EnquiryCta";
import { DiscoveryCard } from "@/components/product/DiscoveryCard";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { NutritionDisclaimer } from "@/components/nutrition/NutritionDisclaimer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListSchema, productSchema } from "@/lib/schema";

/**
 * One dynamic segment serves both product pages (/products/poundo-yam-flour)
 * and family pages (/products/pap-powders) — the URLs the site already links to.
 */
export function generateStaticParams() {
  return [...products.map((p) => ({ slug: p.slug })), ...Object.keys(families).map((slug) => ({ slug }))];
}

function isFamily(slug: string): slug is ProductFamily {
  return slug in families;
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (isFamily(slug)) {
    const f = families[slug];
    return {
      title: f.seoTitle,
      description: f.seoDescription,
      alternates: { canonical: `/products/${slug}` },
      openGraph: { title: f.seoTitle, description: f.seoDescription, url: `/products/${slug}` },
    };
  }
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.seo.title} — Jibby Foods`,
      description: product.seo.description,
      url: `/products/${product.slug}`,
      ...(product.image
        ? { images: [{ url: product.image.src, width: product.image.width, height: product.image.height, alt: product.image.alt }] }
        : {}),
    },
  };
}

export default async function ProductOrFamilyPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  if (isFamily(slug)) return <FamilyPage family={slug} />;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}

function ProductPage({ product }: { product: Product }) {
  const family = families[product.family];
  const related = relatedProducts(product);
  const sourceNames = product.ingredientBasis.map((id) => ingredients[id].name);

  return (
    <>
      <JsonLd data={productSchema(product, family.name)} />

      <section aria-labelledby="product-title" className="bg-cream-deep">
        <div className="container-x pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs
            items={[
              { label: "Our Products", href: "/products" },
              { label: family.name, href: `/products/${family.slug}` },
              { label: product.name, href: `/products/${product.slug}` },
            ]}
          />
          <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-6">
              <PackShot
                product={product}
                priority
                className="aspect-[5/4] rounded-[22px]"
                photoClassName="w-[42%]"
                sizes="(min-width: 1024px) 260px, 45vw"
              />
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="eyebrow" style={{ color: product.tint.ink }}>
                {family.name} · {product.alsoKnownAs.slice(0, 2).join(" · ")}
              </p>
              <h1 id="product-title" className="mt-4 text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1]">
                {product.name}
              </h1>
              <p className="mt-3 font-serif text-[1.35rem] italic leading-snug text-charcoal/70">{product.tagline}</p>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">{product.summary}</p>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[0.9rem]">
                <div>
                  <dt className="text-muted">Pack size</dt>
                  <dd className="font-semibold">{product.sizes.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="text-muted">Made from</dt>
                  <dd className="font-semibold">{sourceNames.join(" & ")}</dd>
                </div>
              </dl>
              <div className="mt-8 max-w-md">
                <EnquiryCta product={product} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label={`${product.name} details`} className="py-14 md:py-20">
        <div className="container-x max-w-5xl">
          <ProductTabs product={product} idPrefix={`page-${product.slug}`} wide stickyClass="sticky top-[4.5rem] lg:top-20" />
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-paper py-16 md:py-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">
                You may also like
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-semibold text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green"
              >
                See all products <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <DiscoveryCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

function FamilyPage({ family }: { family: ProductFamily }) {
  const f = families[family];
  const list = productsByFamily(family);
  return (
    <>
      <JsonLd data={itemListSchema(list.map((p) => ({ name: p.name, url: `/products/${p.slug}` })))} />
      <section aria-labelledby="family-title" className="bg-cream-deep">
        <div className="container-x pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs
            items={[
              { label: "Our Products", href: "/products" },
              { label: f.name, href: `/products/${family}` },
            ]}
          />
          <Reveal className="mt-10 max-w-3xl md:mt-14">
            <p className="eyebrow text-green">Our products</p>
            <h1 id="family-title" className="mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[1]">
              {f.name}
            </h1>
            <p className="mt-5 text-[1.08rem] leading-relaxed text-muted">{f.intro}</p>
          </Reveal>
        </div>
      </section>
      <section aria-label={`${f.name} range`} className="py-16 md:py-24">
        <div className="container-x">
          <ProductExplorer products={list} showFilters={false} />
          <NutritionDisclaimer className="mt-14" />
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-1.5 font-semibold text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green"
          >
            Explore the full range <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
