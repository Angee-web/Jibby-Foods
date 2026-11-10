import Link from "next/link";

/**
 * INTERIM LOGO — a typographic lock-up based on the "JF" monogram and
 * wordmark used on Jibby Foods' own flyer. Replace with the official
 * logo file (SVG preferred) when supplied: put it in /public/brand/ and
 * swap the markup below for an <Image>.
 */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const text = tone === "dark" ? "text-charcoal" : "text-cream";
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Jibby Foods — home">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-[6px] bg-gold font-serif text-[1.05rem] leading-none text-charcoal shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]"
      >
        JF
      </span>
      <span className={`font-serif text-[1.35rem] leading-none tracking-[0.04em] ${text}`}>
        JIBBY <span className="text-[0.95em]">FOODS</span>
      </span>
    </Link>
  );
}
