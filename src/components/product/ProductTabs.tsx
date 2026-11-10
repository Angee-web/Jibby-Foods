"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";
import { BookOpen, Soup, Sprout } from "lucide-react";
import type { Product } from "@/content/products";
import { NutritionSection } from "@/components/nutrition/NutritionSection";
import { ProductOverview } from "./ProductOverview";
import { HowToUse } from "./HowToUse";

export type TabId = "overview" | "nutrition" | "use";

const tabs: { id: TabId; label: string; icon: typeof BookOpen }[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "nutrition", label: "Nutritional Benefits", icon: Sprout },
  { id: "use", label: "How to Use", icon: Soup },
];

/**
 * WAI-ARIA tabs. Every panel stays in the HTML (inactive ones are `hidden`),
 * so all product content is crawlable and available without JavaScript.
 */
export function ProductTabs({
  product,
  idPrefix,
  initialTab = "overview",
  wide = false,
  stickyClass,
}: {
  product: Product;
  idPrefix: string;
  initialTab?: TabId;
  wide?: boolean;
  /** Classes that make the tab bar sticky, e.g. "sticky top-0". */
  stickyClass?: string;
}) {
  const [active, setActive] = useState<TabId>(initialTab);
  const [interacted, setInteracted] = useState(false);
  const refs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  function select(id: TabId, focus = false) {
    setActive(id);
    setInteracted(true);
    if (focus) refs.current[id]?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    const i = tabs.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next].id, true);
  }

  const panels: Record<TabId, ReactNode> = {
    overview: <ProductOverview product={product} />,
    nutrition: <NutritionSection product={product} wide={wide} />,
    use: <HowToUse product={product} />,
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`${stickyClass ?? ""} z-10 -mx-1 bg-cream/95 px-1 py-2 backdrop-blur-sm`}>
        <div
          role="tablist"
          aria-label={`${product.name} information`}
          onKeyDown={onKeyDown}
          className="flex gap-1 overflow-x-auto rounded-full bg-cream-deep p-1 [scrollbar-width:none]"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const selected = id === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  refs.current[id] = el;
                }}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${id}`}
                aria-selected={selected}
                aria-controls={`${idPrefix}-panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(id)}
                className={`relative flex min-h-11 flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[0.88rem] font-semibold transition-colors duration-300 ${
                  selected ? "text-cream" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId={`${idPrefix}-tab-pill`}
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <Icon className="relative size-4" aria-hidden />
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map(({ id }) => {
        const selected = id === active;
        return (
          <div
            key={id}
            role="tabpanel"
            id={`${idPrefix}-panel-${id}`}
            aria-labelledby={`${idPrefix}-tab-${id}`}
            hidden={!selected}
            tabIndex={0}
            className="mt-7 rounded-sm"
          >
            <motion.div
              key={selected ? `${id}-on` : `${id}-off`}
              initial={interacted ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {panels[id]}
            </motion.div>
          </div>
        );
      })}
    </MotionConfig>
  );
}
