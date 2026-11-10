/**
 * ─────────────────────────────────────────────────────────────
 *  JIBBY FOODS — QUALITY & PRODUCTION CONTENT
 *
 *  RULES FOR THIS FILE
 *  - Nothing here may describe a supplier, farm, location,
 *    certification, test or standard that Jibby Foods has not
 *    confirmed.
 *  - `jibbyPractice: null` = not yet confirmed. The site then shows
 *    only the general, educational text (and a "To confirm" marker
 *    in development). Fill it in with the company's own words.
 *  - `confirmed: false` on the journey/processes keeps the visible
 *    "Illustrative overview" label on the live site.
 * ─────────────────────────────────────────────────────────────
 */

import type { IngredientId } from "./nutrition";

/** Company sourcing statement. Leave null until supplied — do not invent suppliers or regions. */
export const sourcingStatement: string | null = null;

/**
 * Raw materials shown in the sourcing section (only those used in the confirmed range).
 * Millet Corn Pap is linked to millet only until its grain composition is confirmed.
 */
export const sourcedIngredients: { id: IngredientId; usedIn: string[] }[] = [
  { id: "sorghum", usedIn: ["guinea-corn-pap-powder"] },
  { id: "white-maize", usedIn: ["white-corn-pap-powder"] },
  { id: "yellow-maize", usedIn: ["yellow-corn-pap-powder"] },
  { id: "millet", usedIn: ["millet-corn-pap-powder"] },
  { id: "unripe-plantain", usedIn: ["unripe-plantain-flour"] },
  { id: "yam", usedIn: ["poundo-yam-flour"] },
  { id: "soya", usedIn: ["soya-beans-powder"] },
];

export type JourneyIcon = "sprout" | "scan" | "cog" | "clipboard" | "package" | "truck";

/** The production journey. Flip `confirmed` once Jibby Foods signs off the wording. */
export const productionJourney = {
  confirmed: false,
  steps: [
    { icon: "sprout", title: "Raw ingredients", body: "Grains, plantain and yam are received for production." },
    { icon: "scan", title: "Preparation", body: "Raw materials are checked, sorted and cleaned before processing." },
    { icon: "cog", title: "Processing", body: "Each product follows its own method — such as drying, milling and sieving." },
    { icon: "clipboard", title: "Quality checks", body: "Products are checked for appearance, texture and consistency." },
    { icon: "package", title: "Packaging", body: "Finished products are sealed in labelled, resealable pouches." },
    { icon: "truck", title: "Distribution", body: "Packs travel to retailers, distributors and households." },
  ] satisfies { icon: JourneyIcon; title: string; body: string }[],
};

/** Preparation activities before processing. */
export const preparationSteps: { title: string; body: string; confirmed: boolean }[] = [
  {
    title: "Inspection",
    body: "Raw materials are looked over for quality, colour and condition before they are accepted for use.",
    confirmed: false,
  },
  {
    title: "Sorting",
    body: "Stones, chaff, damaged grains and other foreign matter are separated out.",
    confirmed: false,
  },
  {
    title: "Cleaning & washing",
    body: "Grains are cleaned; plantain and yam are washed before peeling.",
    confirmed: false,
  },
  {
    title: "Preparation",
    body: "Plantain and yam are peeled and sliced; grains are made ready for their specific process.",
    confirmed: false,
  },
];

/**
 * How each product family is TRADITIONALLY made. Presented as an illustrative
 * overview of the food category, not as Jibby Foods' confirmed method.
 */
export const processes: {
  id: string;
  name: string;
  products: string[];
  steps: string[];
  note: string;
  confirmed: boolean;
}[] = [
  {
    id: "pap",
    name: "Pap powders",
    products: ["guinea-corn-pap-powder", "white-corn-pap-powder", "yellow-corn-pap-powder", "millet-corn-pap-powder"],
    steps: ["Steeping", "Fermentation", "Wet milling", "Sieving", "Drying", "Fine milling"],
    note: "Traditionally, grain is soaked and fermented, wet-milled and sieved. For pap powder, the settled pap is then dried and milled so it can be stored and prepared quickly.",
    confirmed: false,
  },
  {
    id: "plantain",
    name: "Unripe plantain flour",
    products: ["unripe-plantain-flour"],
    steps: ["Peeling", "Slicing", "Drying", "Milling", "Sieving"],
    note: "Green plantain is peeled, sliced and dried until brittle, then milled and sieved into a fine flour.",
    confirmed: false,
  },
  {
    id: "yam",
    name: "Poundo yam flour",
    products: ["poundo-yam-flour"],
    steps: ["Peeling", "Slicing", "Cooking", "Drying", "Milling"],
    note: "Yam is typically peeled, sliced, cooked or parboiled, dried and milled into a flour that turns into a smooth, stretchy swallow.",
    confirmed: false,
  },
];

export type QualityIcon = "scan" | "sparkles" | "wrench" | "scale" | "droplets" | "package" | "warehouse";

/** Quality areas. `why` is general food-handling education; `jibbyPractice` is the company's own, once confirmed. */
export const qualityAreas: { icon: QualityIcon; title: string; why: string; jibbyPractice: string | null }[] = [
  {
    icon: "scan",
    title: "Raw material inspection",
    why: "Good food starts with sound raw materials — free from mould, pests, damage and foreign matter.",
    jibbyPractice: null,
  },
  {
    icon: "sparkles",
    title: "Production hygiene",
    why: "Clean hands, clean surfaces and protective clothing help keep food safe throughout production.",
    jibbyPractice: null,
  },
  {
    icon: "wrench",
    title: "Equipment cleanliness",
    why: "Mills, dryers and sieves that are cleaned regularly help prevent contamination and carry-over between products.",
    jibbyPractice: null,
  },
  {
    icon: "scale",
    title: "Product consistency",
    why: "Consistent colour, fineness and texture mean every pack cooks and tastes the way you expect.",
    jibbyPractice: null,
  },
  {
    icon: "droplets",
    title: "Moisture control",
    why: "Dry foods keep best when they are properly dried — excess moisture can lead to spoilage.",
    jibbyPractice: null,
  },
  {
    icon: "package",
    title: "Packaging integrity",
    why: "A well-sealed pack protects flour and pap powder from moisture, pests and contamination.",
    jibbyPractice: null,
  },
  {
    icon: "warehouse",
    title: "Storage & handling",
    why: "Keeping finished products off the floor, dry and away from heat and sunlight helps preserve their quality.",
    jibbyPractice: null,
  },
];

/** Packaging features. `confirmed: true` only for what is visible on the actual packs. */
export const packagingFeatures: { title: string; body: string; confirmed: boolean }[] = [
  {
    title: "Clear product identification",
    body: "Every pack carries the product name and the Jibby Foods brand on the front.",
    confirmed: true,
  },
  {
    title: "Net weight on every pack",
    body: "Pap powders and Soya Beans Powder come in 500g packs; swallow flours in 1kg packs.",
    confirmed: true,
  },
  {
    title: "Resealable pouches",
    body: "Reseal after each use to help keep the contents dry and fresh.",
    confirmed: true,
  },
  {
    title: "Labelling & registration",
    body: "Ingredients, NAFDAC registration number and manufacturer details as printed on the pack.",
    confirmed: false,
  },
  {
    title: "Storage instructions",
    body: "Storage guidance printed on the pack.",
    confirmed: false,
  },
  {
    title: "Batch & date information",
    body: "Batch number, production date and best-before date for traceability.",
    confirmed: false,
  },
];
