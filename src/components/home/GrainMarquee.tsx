"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const words = ["Guinea corn", "White corn", "Yellow corn", "Millet", "Green plantain", "Yam"];
const dots = ["#a33b26", "#d8ccae", "#e0a12a", "#b3a374", "#6e8b3d", "#8a5a3c"];

export function GrainMarquee() {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <li key={w} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-serif text-[1.6rem] italic text-charcoal/85 md:px-10 md:text-[2.1rem]">{w}</span>
          <span aria-hidden className="size-2.5 rounded-full" style={{ background: dots[i] }} />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="The grains we work with" className="relative border-y border-line bg-cream-deep">
      <div className="group flex overflow-hidden py-5 md:py-7">
        <div
          className="flex animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationPlayState: paused ? "paused" : undefined }}
        >
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play scrolling text" : "Pause scrolling text"}
        aria-pressed={paused}
        className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-cream text-charcoal/70 shadow-sm ring-1 ring-line transition-colors hover:text-charcoal motion-reduce:hidden"
      >
        {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
      </button>
    </section>
  );
}
