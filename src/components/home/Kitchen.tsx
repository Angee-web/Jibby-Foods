import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/content/articles";
import { getProduct } from "@/content/products";
import { GrainField } from "@/components/art/GrainField";
import { grainFor } from "@/lib/grain";
import { Reveal } from "@/components/ui/Reveal";

export function Kitchen() {
  const [featured, ...rest] = articles;
  return (
    <section aria-labelledby="kitchen-title" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-green">In the kitchen</p>
            <h2 id="kitchen-title" className="mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.04]">
              Recipes, guides and breakfast ideas.
            </h2>
          </div>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 font-semibold text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green"
          >
            All recipes &amp; guides <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal as="li" className="lg:col-span-7 lg:row-span-2">
            <ArticleCard article={featured} large />
          </Reveal>
          {rest.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i + 1) * 100} className="lg:col-span-5">
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArticleCard({ article, large = false }: { article: (typeof articles)[number]; large?: boolean }) {
  const product = getProduct(article.product);
  const tint = product?.tint ?? { surface: "#efe6d4", grain: ["#d9a52e", "#70452d"] as [string, string], ink: "#292820" };
  const g = product ? grainFor(product) : { shape: "round" as const, size: [5, 9] as [number, number], count: 180 };
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-[16px] bg-paper ring-1 ring-line ${
        large ? "flex-col" : "flex-col sm:flex-row"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/9] sm:aspect-auto sm:w-[40%]"}`}
        style={{ backgroundColor: tint.surface }}
      >
        <GrainField
          colors={tint.grain}
          shape={g.shape}
          size={[g.size[0] * 1.1, g.size[1] * 1.1]}
          count={Math.round(g.count * 0.8)}
          aspect={large ? 1.6 : 1.2}
          seed={article.slug.length}
          className="absolute inset-0 size-full transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-charcoal">
          {article.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${large ? "p-7 md:p-9" : "p-6"}`}>
        <h3 className={`${large ? "text-[clamp(1.6rem,2.6vw,2.2rem)]" : "text-[1.35rem]"} leading-tight`}>
          <Link href={`/recipes/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{article.excerpt}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-muted">
          <Clock className="size-4" aria-hidden /> {article.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
