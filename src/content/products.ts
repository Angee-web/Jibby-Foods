/**
 * ─────────────────────────────────────────────────────────────
 *  JIBBY FOODS — PRODUCT CATALOGUE
 *
 *  To add a product: copy one entry, change the values, and add
 *  its photo to /public/images/products/. Nothing else to edit —
 *  the catalogue, product pages, sitemap and structured data all
 *  read from this list.
 *
 *  RULES FOR THIS FILE
 *  - `null` means "not yet confirmed by Jibby Foods". The site
 *    hides that field (or shows "Details coming soon").
 *  - Only fill ingredients, NAFDAC numbers, storage notes and
 *    pack sizes from the actual pack or company records.
 *  - `preparation.confirmed: false` shows the steps as a general
 *    guide with a "follow the pack instructions" note.
 *  - Nutrition education comes from the product's `ingredientBasis`
 *    (see nutrition.ts). Never type nutrient amounts here — only add
 *    `nutritionFacts` from a laboratory report or verified label.
 *
 *  - Copy NAFDAC numbers, ingredients and net weights EXACTLY as
 *    supplied. Never copy them from one product to another.
 *  - `producerConfirmed: true` only when the company has confirmed
 *    that product's producer/packager (see siteConfig.producer).
 *
 *  CONFIRMED BY THE COMPANY (packaging details, Nov 2026):
 *  Soya Beans Powder, Unripe Plantain Flour, Millet Corn Pap Powder,
 *  Poundo Yam Flour — ingredient, net weight and NAFDAC number.
 *
 *  STILL OUTSTANDING: guinea, white & yellow corn pap ingredients and
 *  NAFDAC numbers; separate yellow corn or millet flour products (if
 *  sold); the millet-to-corn ratio; storage instructions; production
 *  and expiry dates; laboratory nutrition results; the Soya Beans
 *  Powder pack photo.
 * ─────────────────────────────────────────────────────────────
 */

import type { IngredientId } from "./nutrition";

export type ProductFamily = "pap-powders" | "swallow-flours" | "soya-products";

/**
 * Verified, product-specific nutrition values (per 100g as sold).
 * Only fill from a laboratory report or the printed label.
 */
export type NutritionFacts = {
  basis: string; // e.g. "per 100g"
  source: string; // e.g. "Laboratory analysis, <lab name>, <date>"
  rows: { label: string; value: string; indent?: boolean }[];
};

export type Product = {
  slug: string;
  name: string;
  family: ProductFamily;
  /** One-line hook used on cards. */
  tagline: string;
  /** 1–2 sentence summary for cards and meta descriptions. */
  summary: string;
  /** Longer description paragraphs for the product page. */
  description: string[];
  /** Other names Nigerians use for this food — helps search and recognition. */
  alsoKnownAs: string[];
  /** Net weight(s) as printed on the pack. */
  sizes: string[];
  /** True once the company confirms this product's producer/packager. */
  producerConfirmed: boolean;
  /** Ways the product is commonly eaten. */
  enjoyWith: string[];
  ingredients: string | null;
  nafdacNumber: string | null;
  storage: string | null;
  preparation: { steps: string[]; confirmed: boolean } | null;
  /** Packaging description, e.g. "Resealable pouch". */
  packaging: string | null;
  /** Allergen statement as printed on the pack (null = not yet confirmed). */
  allergens: string | null;
  /** Raw ingredient(s) the nutrition education is drawn from. */
  ingredientBasis: IngredientId[];
  /** Product-specific note shown above the nutrition cards. */
  nutritionContext?: string;
  /** Verified per-product nutrition values. Leave null until lab-tested. */
  nutritionFacts: NutritionFacts | null;
  /** Everyday serving ideas from Nigerian food culture. */
  servingIdeas: { title: string; body: string }[];
  /** Optional hand-picked related product slugs. */
  related?: string[];
  /** Real pack photo. null = not yet supplied (an illustrated placeholder is shown). */
  image: { src: string; alt: string; width: number; height: number } | null;
  /** Colour of the grain/produce — drives the card and page tint. */
  tint: { surface: string; grain: [string, string]; ink: string };
  seo: { title: string; description: string };
};

export const families: Record<
  ProductFamily,
  { name: string; slug: ProductFamily; intro: string; format: string; seoTitle: string; seoDescription: string }
> = {
  "pap-powders": {
    name: "Pap Powders",
    slug: "pap-powders",
    format: "Dry pap powder — mixed with water and cooked into pap",
    intro:
      "Dry pap (ogi, akamu, koko) powders made from guinea corn, white corn, yellow corn and millet. Mix, stir in hot water and breakfast is ready.",
    seoTitle: "Pap Powder (Ogi, Akamu) — Guinea Corn, Corn & Millet Pap",
    seoDescription:
      "Jibby Foods pap powders: guinea corn pap, white corn pap, yellow corn pap and millet corn pap in 500g resealable packs. Quick to prepare Nigerian ogi.",
  },
  "swallow-flours": {
    name: "Swallow Flours",
    slug: "swallow-flours",
    format: "Flour — cooked in hot water into a smooth swallow",
    intro:
      "Flours for the swallows Nigerians love — unripe plantain flour (elubo ogede) and poundo yam flour, in 1kg resealable packs.",
    seoTitle: "Swallow Flours — Unripe Plantain Flour & Poundo Yam Flour",
    seoDescription:
      "Jibby Foods swallow flours: unripe plantain flour and poundo yam flour in 1kg resealable packs. Enjoy with egusi, okra, ogbono and other Nigerian soups.",
  },
  "soya-products": {
    name: "Soya Products",
    slug: "soya-products",
    format: "Dry powder made from soya beans",
    intro: "Soya Beans Powder — made from soya beans, in a 500g pack.",
    seoTitle: "Soya Beans Powder — Jibby Foods Soya Products",
    seoDescription:
      "Jibby Foods Soya Beans Powder, made from soya beans, in a 500g pack. Learn about the nutritional benefits of soya beans and how soya is used in Nigerian meals.",
  },
};

const PAP_PREP = {
  confirmed: false,
  steps: [
    "Put the desired quantity of pap powder in a bowl.",
    "Add a little cool water and stir into a smooth, lump-free paste.",
    "Pour in freshly boiled water gradually, stirring continuously, until the pap thickens to your preferred consistency.",
    "Sweeten or add milk to taste and serve warm.",
  ],
};

const PAP_IDEAS = {
  akara: {
    title: "Pap and akara",
    body: "The classic Nigerian breakfast — warm pap with freshly fried bean cakes on the side.",
  },
  moimoi: {
    title: "With moi moi",
    body: "Steamed bean pudding alongside pap adds plant protein to a light morning meal.",
  },
  milk: {
    title: "Creamy and sweet",
    body: "Stir in milk and a little sugar or honey to taste, as many families do.",
  },
  bread: {
    title: "Pap and bread",
    body: "A quick, filling weekday breakfast before school or work.",
  },
  kosai: {
    title: "Koko and kosai",
    body: "In the north, millet koko is enjoyed with kosai (akara) or puff-puff for breakfast.",
  },
};

const SWALLOW_PREP = {
  confirmed: false,
  steps: [
    "Bring water to the boil in a pot.",
    "Reduce the heat and add the flour gradually, stirring vigorously with a wooden spatula (turning stick) to prevent lumps.",
    "Keep turning until smooth and stretchy. Add a little hot water, cover and allow to steam for a few minutes.",
    "Turn again until firm and smooth, then mould and serve with your favourite soup.",
  ],
};

export const products: Product[] = [
  {
    slug: "guinea-corn-pap-powder",
    name: "Guinea Corn Pap Powder",
    family: "pap-powders",
    tagline: "The deep-red pap, known as ogi baba.",
    summary:
      "Pap powder made from guinea corn — the reddish-brown pap many Nigerians grew up on. Ready to mix with hot water.",
    description: [
      "Guinea corn pap is the reddish-brown pap known in many homes as ogi baba. Jibby Foods Guinea Corn Pap Powder brings it to your kitchen in dry powder form, so there is no soaking, grinding or sieving to do at home.",
      "Simply mix with a little water, stir in hot water and enjoy as a warm breakfast or light meal — on its own, with milk, or alongside akara, moi moi or bread.",
    ],
    alsoKnownAs: ["Ogi baba", "Sorghum pap", "Red pap", "Akamu", "Koko"],
    sizes: ["500g"],
    producerConfirmed: false,
    enjoyWith: ["Akara", "Moi moi", "Bread", "Milk"],
    ingredients: null,
    nafdacNumber: null,
    storage: null,
    preparation: PAP_PREP,
    packaging: "Resealable pouch",
    allergens: null,
    ingredientBasis: ["sorghum"],
    nutritionFacts: null,
    servingIdeas: [PAP_IDEAS.akara, PAP_IDEAS.moimoi, PAP_IDEAS.milk],
    related: ["millet-corn-pap-powder", "yellow-corn-pap-powder", "white-corn-pap-powder"],
    image: {
      src: "/images/products/jibby-foods-guinea-corn-pap-powder-pack.jpg",
      alt: "Jibby Foods Guinea Corn Pap Powder 500g resealable pack with red guinea corn grains on the label",
      width: 190,
      height: 300,
    },
    tint: { surface: "#F3DFD5", grain: ["#A33B26", "#7E2D1C"], ink: "#5A2216" },
    seo: {
      title: "Guinea Corn Pap Powder (Ogi Baba) 500g",
      description:
        "Jibby Foods Guinea Corn Pap Powder — reddish-brown ogi baba in a 500g resealable pack. No soaking or grinding: mix, add hot water and serve.",
    },
  },
  {
    slug: "white-corn-pap-powder",
    name: "White Corn Pap Powder",
    family: "pap-powders",
    tagline: "Classic, smooth white ogi.",
    summary:
      "Pap powder made from white corn (maize) for the smooth, creamy white pap enjoyed across Nigeria.",
    description: [
      "White corn pap is the classic smooth, pale ogi served in homes across Nigeria. Jibby Foods White Corn Pap Powder lets you prepare it in minutes, without the overnight soaking and wet-milling of traditional pap.",
      "Prepare it thick or light, sweeten to taste and pair with akara, moi moi or bread for a familiar Nigerian breakfast.",
    ],
    alsoKnownAs: ["White ogi", "Akamu", "Koko", "Maize pap"],
    sizes: ["500g"],
    producerConfirmed: false,
    enjoyWith: ["Akara", "Moi moi", "Bread", "Milk"],
    ingredients: null,
    nafdacNumber: null,
    storage: null,
    preparation: PAP_PREP,
    packaging: "Resealable pouch",
    allergens: null,
    ingredientBasis: ["white-maize"],
    nutritionFacts: null,
    servingIdeas: [PAP_IDEAS.akara, PAP_IDEAS.bread, PAP_IDEAS.milk],
    related: ["yellow-corn-pap-powder", "guinea-corn-pap-powder", "millet-corn-pap-powder"],
    image: {
      src: "/images/products/jibby-foods-white-corn-pap-powder-pack.jpg",
      alt: "Jibby Foods White Corn Pap Powder 500g resealable pack with white maize kernels on the label",
      width: 177,
      height: 261,
    },
    tint: { surface: "#F1EBDD", grain: ["#E4D9BE", "#CDBF9C"], ink: "#5C5238" },
    seo: {
      title: "White Corn Pap Powder (White Ogi) 500g",
      description:
        "Jibby Foods White Corn Pap Powder — smooth white ogi (akamu) in a 500g resealable pack. Quick to prepare for a classic Nigerian breakfast.",
    },
  },
  {
    slug: "yellow-corn-pap-powder",
    name: "Yellow Corn Pap Powder",
    family: "pap-powders",
    tagline: "Golden pap from yellow maize.",
    summary:
      "Pap powder made from yellow corn (maize) — a golden ogi with a familiar corn flavour.",
    description: [
      "Made from yellow maize, Jibby Foods Yellow Corn Pap Powder prepares into a golden pap with the familiar taste of corn. It comes as a dry powder in a resealable pack, ready whenever you need it.",
      "Enjoy it warm for breakfast with milk and sugar, or the traditional way with akara and moi moi.",
    ],
    alsoKnownAs: ["Yellow ogi", "Akamu", "Koko", "Maize pap"],
    sizes: ["500g"],
    producerConfirmed: false,
    enjoyWith: ["Akara", "Moi moi", "Bread", "Milk"],
    ingredients: null,
    nafdacNumber: null,
    storage: null,
    preparation: PAP_PREP,
    packaging: "Resealable pouch",
    allergens: null,
    ingredientBasis: ["yellow-maize"],
    nutritionFacts: null,
    servingIdeas: [PAP_IDEAS.akara, PAP_IDEAS.moimoi, PAP_IDEAS.milk],
    related: ["white-corn-pap-powder", "millet-corn-pap-powder", "guinea-corn-pap-powder"],
    image: {
      src: "/images/products/jibby-foods-yellow-corn-pap-powder-pack.jpg",
      alt: "Jibby Foods Yellow Corn Pap Powder 500g resealable pack with yellow maize kernels on the label",
      width: 206,
      height: 303,
    },
    tint: { surface: "#F7E4B0", grain: ["#E0A12A", "#C9841A"], ink: "#5E3F0C" },
    seo: {
      title: "Yellow Corn Pap Powder (Yellow Ogi) 500g",
      description:
        "Jibby Foods Yellow Corn Pap Powder — golden ogi made from yellow maize in a 500g resealable pack. Mix, add hot water and serve.",
    },
  },
  {
    slug: "millet-corn-pap-powder",
    name: "Millet Corn Pap Powder",
    family: "pap-powders",
    tagline: "Pap with the character of millet.",
    summary:
      "Pap powder from the Jibby Foods millet range, for a pap with the distinctive taste of millet.",
    description: [
      "Millet pap is a favourite across Nigeria for its distinctive, slightly nutty taste. Jibby Foods Millet Corn Pap Powder comes ready to prepare — no soaking or grinding needed.",
      "Prepare it like any pap: mix into a paste, stir in hot water and serve warm with your favourite breakfast sides.",
    ],
    alsoKnownAs: ["Millet corn pap", "Millet ogi", "Akamu", "Koko", "Hausa koko"],
    sizes: ["500g"],
    producerConfirmed: true,
    enjoyWith: ["Akara", "Kosai", "Bread", "Milk"],
    // Company-supplied wording, used provisionally. Do not add a grain ratio.
    ingredients: "Millet corn",
    nafdacNumber: "LG-ETO-01-3432L",
    storage: null,
    preparation: PAP_PREP,
    packaging: "Resealable pouch",
    allergens: null,
    // TODO(Jibby Foods): confirm the exact grain composition before adding any other grain here.
    ingredientBasis: ["millet"],
    nutritionContext:
      "The ingredient on this pack is listed as \"millet corn\". Until the exact grain composition is confirmed, the guide below describes millet only.",
    nutritionFacts: null,
    servingIdeas: [PAP_IDEAS.kosai, PAP_IDEAS.akara, PAP_IDEAS.milk],
    related: ["guinea-corn-pap-powder", "yellow-corn-pap-powder", "white-corn-pap-powder"],
    image: {
      src: "/images/products/jibby-foods-millet-corn-pap-powder-pack.jpg",
      alt: "Jibby Foods Millet Corn Pap Powder 500g resealable pack with millet grains on the label",
      width: 160,
      height: 236,
    },
    tint: { surface: "#E9E4D0", grain: ["#B3A374", "#7F7656"], ink: "#45402B" },
    seo: {
      title: "Millet Corn Pap Powder (Millet Ogi) 500g",
      description:
        "Jibby Foods Millet Corn Pap Powder in a 500g resealable pack. Quick-to-prepare millet pap (koko) for breakfast — no soaking or grinding.",
    },
  },
  {
    slug: "unripe-plantain-flour",
    name: "Unripe Plantain Flour",
    family: "swallow-flours",
    tagline: "Elubo ogede, ready to turn.",
    summary:
      "Flour made from unripe (green) plantain, prepared as a swallow and enjoyed with Nigerian soups.",
    description: [
      "Unripe plantain flour — elubo ogede — is made from green plantain that has been dried and milled. Jibby Foods Unripe Plantain Flour lets you make plantain swallow at home in minutes.",
      "Turn it in hot water until smooth, then serve with egusi, okra, ogbono, efo riro or any soup you love.",
    ],
    alsoKnownAs: ["Elubo ogede", "Unripe plantain powder", "Plantain amala", "Green plantain flour"],
    sizes: ["1kg"],
    producerConfirmed: true,
    enjoyWith: ["Egusi soup", "Okra soup", "Ogbono soup", "Efo riro"],
    ingredients: "Unripe plantain",
    nafdacNumber: "LG-ETO-01-6505L",
    storage: null,
    preparation: SWALLOW_PREP,
    packaging: "Resealable pouch",
    allergens: null,
    ingredientBasis: ["unripe-plantain"],
    nutritionFacts: null,
    servingIdeas: [
      {
        title: "Elubo ogede and efo riro",
        body: "Plantain swallow with rich vegetable soup — a favourite in many Yoruba homes.",
      },
      {
        title: "With okra or ogbono",
        body: "The smooth, slightly earthy swallow pairs naturally with draw soups.",
      },
      {
        title: "Balance the plate",
        body: "Serve with a soup that includes vegetables and fish, meat, egg or beans for protein.",
      },
    ],
    related: ["poundo-yam-flour", "guinea-corn-pap-powder", "millet-corn-pap-powder"],
    image: {
      src: "/images/products/jibby-foods-unripe-plantain-flour-pack.jpg",
      alt: "Jibby Foods Unripe Plantain Flour 1kg resealable pack with green plantains on the label",
      width: 181,
      height: 266,
    },
    tint: { surface: "#DFE6CC", grain: ["#6E8B3D", "#4F6A2A"], ink: "#2F4219" },
    seo: {
      title: "Unripe Plantain Flour (Elubo Ogede) 1kg",
      description:
        "Jibby Foods Unripe Plantain Flour — elubo ogede in a 1kg resealable pack. Make smooth plantain swallow for egusi, okra and ogbono soup.",
    },
  },
  {
    slug: "poundo-yam-flour",
    name: "Poundo Yam Flour",
    family: "swallow-flours",
    tagline: "Pounded yam, without the mortar.",
    summary:
      "Yam flour for making smooth, stretchy poundo yam at home — no mortar and pestle required.",
    description: [
      "Pounded yam is one of Nigeria's most loved swallows, but pounding yam takes time and effort. Jibby Foods Poundo Yam Flour lets you make smooth, stretchy poundo in a pot in minutes.",
      "Serve with egusi, efo riro, okra, ogbono or banga soup — the way pounded yam has always been enjoyed.",
    ],
    alsoKnownAs: ["Yam flour", "Poundo iyan", "Pounded yam flour", "Iyan"],
    sizes: ["1kg"],
    producerConfirmed: true,
    enjoyWith: ["Egusi soup", "Efo riro", "Okra soup", "Banga soup"],
    ingredients: "Yam tubers",
    nafdacNumber: "LG-ETO-01-6504L",
    storage: null,
    preparation: SWALLOW_PREP,
    packaging: "Resealable pouch",
    allergens: null,
    ingredientBasis: ["yam"],
    nutritionFacts: null,
    servingIdeas: [
      {
        title: "Poundo and egusi",
        body: "The celebration plate — smooth poundo yam with melon-seed soup and leafy greens.",
      },
      {
        title: "With banga or afang",
        body: "Enjoy it the South-South way with palm-fruit banga soup or vegetable-rich afang.",
      },
      {
        title: "Sunday lunch, any day",
        body: "Ready in minutes in a pot, so pounded yam no longer has to wait for the weekend.",
      },
    ],
    related: ["unripe-plantain-flour", "guinea-corn-pap-powder", "yellow-corn-pap-powder"],
    image: {
      src: "/images/products/jibby-foods-poundo-yam-flour-pack.jpg",
      alt: "Jibby Foods Poundo Yam Flour 1kg resealable pack with yam tubers on the label",
      width: 188,
      height: 296,
    },
    tint: { surface: "#EEDFCD", grain: ["#8A5A3C", "#D9C7A8"], ink: "#4A2C19" },
    seo: {
      title: "Poundo Yam Flour (Poundo Iyan) 1kg",
      description:
        "Jibby Foods Poundo Yam Flour in a 1kg resealable pack. Make smooth, stretchy pounded yam at home — no mortar and pestle needed.",
    },
  },
  {
    slug: "soya-beans-powder",
    name: "Soya Beans Powder",
    family: "soya-products",
    tagline: "Soya beans, in powder form.",
    summary: "A powder made from soya beans, in a 500g pack — a convenient way to bring soya into home cooking.",
    description: [
      "Jibby Foods Soya Beans Powder is made from soya beans and comes in a 500g pack.",
      "Soya is one of the few plant foods that provides all the essential amino acids, and it has long been part of Nigerian home cooking — from soya-enriched pap to soya milk.",
    ],
    alsoKnownAs: ["Soybean powder", "Soya powder"],
    sizes: ["500g"],
    producerConfirmed: true,
    enjoyWith: ["Pap", "Moi moi", "Akara"],
    ingredients: "Soya beans",
    nafdacNumber: "LG-ETO-01-6503L",
    storage: null,
    // TODO(Jibby Foods): add the preparation instructions printed on the pack.
    preparation: null,
    packaging: null,
    allergens: null,
    ingredientBasis: ["soya"],
    nutritionFacts: null,
    servingIdeas: [
      {
        title: "Soya-enriched pap",
        body: "Many Nigerian families stir soya into pap while it cooks, adding plant protein to breakfast.",
      },
      {
        title: "In bean dishes",
        body: "Some home cooks add soya to moi moi and akara alongside the usual beans.",
      },
      {
        title: "Always cook it",
        body: "Soya should be properly cooked before eating. Follow the instructions on your pack.",
      },
    ],
    related: ["guinea-corn-pap-powder", "millet-corn-pap-powder", "yellow-corn-pap-powder"],
    image: null,
    tint: { surface: "#F4E7C4", grain: ["#D8B86A", "#B8964A"], ink: "#5E4A1C" },
    seo: {
      title: "Soya Beans Powder 500g",
      description:
        "Jibby Foods Soya Beans Powder, made from soya beans, in a 500g pack. Learn about the nutritional benefits of soya beans and how soya is used in Nigerian meals.",
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByFamily(family: ProductFamily) {
  return products.filter((p) => p.family === family);
}

export function relatedProducts(product: Product, count = 3) {
  if (product.related?.length) {
    return product.related
      .map((s) => getProduct(s))
      .filter((p): p is Product => Boolean(p))
      .slice(0, count);
  }
  const same = products.filter((p) => p.family === product.family && p.slug !== product.slug);
  const other = products.filter((p) => p.family !== product.family);
  return [...same, ...other].slice(0, count);
}
