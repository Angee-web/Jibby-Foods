"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { nav, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { whatsappLink, generalOrderMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change (adjust state during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll, close on Escape, keep focus inside the open menu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = [...panel.querySelectorAll<HTMLElement>("a,button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        // No backdrop-blur while the menu is open: backdrop-filter makes the header the
        // containing block for the fixed menu panel inside it, collapsing the panel to 0px.
        open
          ? "bg-cream shadow-[0_1px_0_var(--color-line)]"
          : scrolled
            ? "bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-sm"
            : "bg-cream"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-forest focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative rounded-full px-3 py-2 text-[0.92rem] font-medium text-charcoal/80 transition-colors hover:text-charcoal aria-[current=page]:text-charcoal after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-green after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center gap-1.5 rounded-full bg-green px-5 text-[0.9rem] font-semibold text-cream transition-colors hover:bg-forest sm:inline-flex"
          >
            Order / Enquire
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-cream lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-cream lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col pb-8 pt-6">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item, i) => (
                <li key={item.href} style={{ animationDelay: `${i * 40}ms` }} className="motion-safe:animate-[menuIn_0.5s_var(--ease-out-soft)_both]">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-serif text-[1.9rem] leading-tight text-charcoal aria-[current=page]:text-green"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-charcoal/40" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-10">
            <a
              href={whatsappLink(generalOrderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 font-semibold text-cream"
            >
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-6 py-3.5 font-semibold text-charcoal"
            >
              <Phone className="size-4" aria-hidden /> Call {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
