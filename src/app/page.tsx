import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { GrainMarquee } from "@/components/home/GrainMarquee";
import { ProductRange } from "@/components/home/ProductRange";
import { AboutIntro } from "@/components/home/AboutIntro";
import { WhyJibby } from "@/components/home/WhyJibby";
import { Process } from "@/components/home/Process";
import { Kitchen } from "@/components/home/Kitchen";
import { Wholesale } from "@/components/home/Wholesale";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Jibby Foods — Nigerian Pap Powders & Swallow Flours" },
  description:
    "Jibby Foods makes guinea corn, white corn, yellow corn and millet pap powders, unripe plantain flour and poundo yam flour. Order on WhatsApp or enquire about wholesale.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jibby Foods — Good food, rooted in tradition",
    description:
      "Nigerian pap powders and swallow flours in resealable packs. Order on WhatsApp or enquire about wholesale.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <Hero />
      <GrainMarquee />
      <ProductRange />
      <AboutIntro />
      <WhyJibby />
      <Process />
      <Kitchen />
      <Wholesale />
      <FinalCta />
    </>
  );
}
