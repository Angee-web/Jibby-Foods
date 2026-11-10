import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "gold" | "ghost-light" | "link";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98] min-h-12 px-6";

const variants: Record<Variant, string> = {
  primary: "bg-green text-cream hover:bg-forest shadow-[0_1px_0_rgb(0_0_0/0.08)]",
  secondary:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream",
  gold: "bg-gold text-charcoal hover:bg-gold-soft",
  "ghost-light": "border border-cream/35 text-cream hover:bg-cream hover:text-forest",
  link: "min-h-0 px-0 rounded-none text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function Button({ href, variant = "primary", children, icon, external, className = "", ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
          {icon}
        </span>
      ) : null}
    </>
  );
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
