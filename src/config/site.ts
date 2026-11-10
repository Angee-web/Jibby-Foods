/**
 * ─────────────────────────────────────────────────────────────
 *  JIBBY FOODS — BUSINESS DETAILS
 *  This is the ONE place to update contact and company details.
 *
 *  Any value left as `null` is treated as "not yet supplied":
 *  the site hides it rather than showing made-up information.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Jibby Foods",
  legalName: null as string | null, // e.g. "Jibby Foods Limited" — add once confirmed

  /** Production domain. Set NEXT_PUBLIC_SITE_URL in .env.local / hosting settings. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  tagline: "Good food, rooted in tradition.",
  description:
    "Jibby Foods makes Nigerian pap powders, swallow flours and soya beans powder — guinea corn, white corn, yellow corn and millet corn pap, unripe plantain flour, poundo yam flour and soya beans powder.",

  contact: {
    /** Display format and international format (no spaces, no +). */
    phoneDisplay: "0906 166 3126",
    phoneE164: "+2349061663126",
    /** WhatsApp number in international format without "+" — used for wa.me links. */
    whatsapp: "2349061663126",
    email: null as string | null, // e.g. "hello@jibbyfoods.com"
    address: null as null | {
      street: string;
      city: string;
      state: string;
      country: string;
    },
    /** Opening hours text, e.g. "Mon–Sat, 8am–6pm" */
    hours: null as string | null,
  },

  /**
   * Producer & packager, as confirmed by the company. Shown on product
   * pages whose `producerConfirmed` is true.
   */
  producer: {
    name: "JIBBY Foods",
    address: {
      street: "225B Ikorodu Crescent, Dolphin Estates",
      state: "Lagos State",
      country: "Nigeria",
    },
    /**
     * Supplied by the company but NOT published: the phone number has only
     * 10 digits (Nigerian numbers have 11), and neither detail is yet
     * confirmed as a customer-service contact. Once confirmed, move them
     * into `contact` above.
     *   phone: "091-3700-716"
     *   email: "jibbyfoods1@gmail.com"
     */
  },

  /** Add full profile URLs once available. Empty entries are hidden. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
    x: null as string | null,
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products" },
  { label: "Quality & Production", href: "/quality-and-production" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact", href: "/contact" },
] as const;
