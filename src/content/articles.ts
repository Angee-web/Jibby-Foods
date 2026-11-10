/**
 * Article index. Each article's body lives in /src/content/articles/<slug>.mdx
 * (added with the Recipes & Blog page). Add an entry here to publish a new one.
 */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "How-to" | "Ingredients" | "Meal ideas" | "Kitchen tips";
  /** ISO date */
  published: string;
  readingMinutes: number;
  /** Product slug used for the card's grain artwork and related links. */
  product: string;
};

export const articles: Article[] = [
  {
    slug: "how-to-prepare-guinea-corn-pap",
    title: "How to prepare guinea corn pap (ogi baba) without lumps",
    excerpt: "A simple method for smooth, reddish-brown pap from powder — and how to get the thickness just right.",
    category: "How-to",
    published: "2026-11-09",
    readingMinutes: 4,
    product: "guinea-corn-pap-powder",
  },
  {
    slug: "what-is-unripe-plantain-flour",
    title: "What is unripe plantain flour, and how do you use it?",
    excerpt: "Elubo ogede explained: what it is made from, how it differs from other swallows and how to cook it.",
    category: "Ingredients",
    published: "2026-11-09",
    readingMinutes: 5,
    product: "unripe-plantain-flour",
  },
  {
    slug: "how-to-make-poundo-yam",
    title: "How to make smooth poundo yam in a pot",
    excerpt: "No mortar, no pestle. The water ratio and turning technique for stretchy, lump-free pounded yam.",
    category: "How-to",
    published: "2026-11-09",
    readingMinutes: 4,
    product: "poundo-yam-flour",
  },
];
