"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { families, getProduct, type Product } from "@/content/products";
import { PackShot } from "./PackShot";
import { ProductTabs } from "./ProductTabs";
import { EnquiryCta } from "./EnquiryCta";

const PARAM = "product";

/** Remembers whether the dialog was opened from this page (so closing can go "back"). */
let openedInPage = false;
let returnFocusTo: HTMLElement | null = null;

/** Opens a product's detail dialog by adding `?product=<slug>` to the URL. */
export function openProductDialog(slug: string, trigger?: HTMLElement) {
  openedInPage = true;
  returnFocusTo = trigger ?? null;
  window.history.pushState(null, "", `?${PARAM}=${encodeURIComponent(slug)}`);
}

/**
 * Reads `?product=` and shows the matching product in an animated dialog.
 * Shareable, and the browser Back button closes it. Must sit inside <Suspense>.
 */
export function ProductDialogController() {
  const params = useSearchParams();
  const pathname = usePathname();
  const product = getProduct(params.get(PARAM) ?? "");

  const close = useCallback(() => {
    if (openedInPage) {
      openedInPage = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", pathname);
    }
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence
        onExitComplete={() => {
          returnFocusTo?.focus({ preventScroll: true });
          returnFocusTo = null;
        }}
      >
        {product ? <ProductDialog key={product.slug} product={product} onClose={close} /> : null}
      </AnimatePresence>
    </MotionConfig>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

function ProductDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `dialog-${product.slug}-title`;

  // Scroll lock, initial focus, Escape to close, and a focus trap.
  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !frameRef.current) return;
      const items = [
        ...frameRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.closest("[hidden]"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      html.style.paddingRight = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-forest/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        onClick={onClose}
      />

      <motion.div
        ref={frameRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative h-[100dvh] w-full overflow-hidden bg-cream shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)] md:h-[min(880px,calc(100dvh-3rem))] md:max-w-6xl md:rounded-[22px]"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.5, ease }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${product.name}`}
          className="absolute right-3 top-3 z-20 grid size-11 place-items-center rounded-full bg-paper/90 text-charcoal shadow-[0_4px_14px_-6px_rgb(0_0_0/0.35)] ring-1 ring-line backdrop-blur transition-colors hover:bg-charcoal hover:text-cream md:right-5 md:top-5"
        >
          <X className="size-5" aria-hidden />
        </button>

        {/* Mobile: the whole panel scrolls. Desktop: image left, content scrolls right. */}
        <div className="h-full overflow-y-auto overscroll-contain md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:overflow-hidden">
          <motion.div
            className="relative md:h-full"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
          >
            <PackShot
              product={product}
              priority
              className="aspect-[4/3] md:aspect-auto md:h-full"
              photoClassName="w-[40%] md:w-[58%]"
              sizes="(min-width: 768px) 300px, 40vw"
            />
          </motion.div>

          <div className="md:h-full md:overflow-y-auto md:overscroll-contain">
            <motion.div
              className="px-5 pb-10 pt-7 sm:px-8 md:px-10 md:pt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.15 }}
            >
              <p className="eyebrow" style={{ color: product.tint.ink }}>
                {families[product.family].name} · {product.alsoKnownAs[0]}
              </p>
              <h2 id={titleId} className="mt-3 pr-12 text-[clamp(2rem,4vw,3rem)] leading-[1.04]">
                {product.name}
              </h2>
              <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-muted">{product.summary}</p>

              <div className="mt-6">
                <EnquiryCta product={product} compact />
              </div>

              <div className="mt-8">
                <ProductTabs product={product} idPrefix={`dlg-${product.slug}`} stickyClass="sticky top-0 pr-14" />
              </div>

              <div className="mt-10 border-t border-line pt-6">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-green underline decoration-green/30 underline-offset-[6px] hover:decoration-green"
                >
                  Open the full {product.name} page
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
