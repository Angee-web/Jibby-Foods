"use client";

import { motion, MotionConfig } from "motion/react";
import { ClipboardCheck, Cog, Package, ScanSearch, Sprout, Truck } from "lucide-react";
import type { JourneyIcon } from "@/content/quality";

const icons: Record<JourneyIcon, typeof Sprout> = {
  sprout: Sprout,
  scan: ScanSearch,
  cog: Cog,
  clipboard: ClipboardCheck,
  package: Package,
  truck: Truck,
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Raw ingredients → … → distribution. Horizontal from lg, vertical below. */
export function ProductionJourney({ steps }: { steps: { icon: JourneyIcon; title: string; body: string }[] }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* Never hide content when JavaScript is unavailable. */}
      <noscript>
        <style>{"[data-journey] *{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <motion.ol
        data-journey=""
        className="relative grid gap-9 lg:grid-cols-6 lg:gap-5"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Connecting line that draws itself in */}
        <motion.span
          aria-hidden
          className="absolute left-[1.6rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gold/60 lg:left-0 lg:top-[1.6rem] lg:h-px lg:w-full lg:origin-left"
          variants={{ hidden: { scaleY: 0, scaleX: 0 }, shown: { scaleY: 1, scaleX: 1, transition: { duration: 1.4, ease } } }}
        />
        {steps.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <motion.li
              key={s.title}
              className="relative pl-20 lg:pl-0 lg:pt-20"
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            >
              <span className="absolute left-0 top-0 grid size-[3.2rem] place-items-center rounded-full bg-gold text-forest ring-[6px] ring-forest">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                Step {i + 1}
                <span className="sr-only"> of {steps.length}</span>
              </p>
              <h3 className="mt-1.5 text-[1.4rem] leading-tight text-cream">{s.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-cream/70">{s.body}</p>
            </motion.li>
          );
        })}
      </motion.ol>
    </MotionConfig>
  );
}
