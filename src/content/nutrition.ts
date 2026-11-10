/**
 * ─────────────────────────────────────────────────────────────
 *  JIBBY FOODS — NUTRITION EDUCATION CONTENT
 *
 *  This file describes the GENERAL nutritional properties of the
 *  raw ingredients behind our products (yam, plantain, sorghum…).
 *  It is educational. It is NOT the laboratory-verified
 *  composition of any finished Jibby Foods product.
 *
 *  RULES FOR THIS FILE
 *  - No numbers. No calories, grams, %DV, GI values or scores.
 *    Verified figures belong in a product's `nutritionFacts`
 *    (see products.ts) and only once lab results are supplied.
 *  - Wording stays within "provides / contains / contributes to /
 *    may support". Never "cures, prevents, treats, guarantees".
 *  - Only list nutrients that are genuinely characteristic of the
 *    ingredient.
 * ─────────────────────────────────────────────────────────────
 */

/** Icon keys map to Lucide icons in components/nutrition/icons.ts */
export type NutrientIcon =
  | "zap"
  | "wheat"
  | "sprout"
  | "bean"
  | "activity"
  | "atom"
  | "bone"
  | "droplet"
  | "gem"
  | "flame"
  | "citrus"
  | "droplets"
  | "sparkles"
  | "leaf"
  | "sun";

export type NutrientId =
  | "carbohydrates"
  | "fibre"
  | "resistant-starch"
  | "protein"
  | "potassium"
  | "magnesium"
  | "phosphorus"
  | "iron"
  | "manganese"
  | "b-vitamins"
  | "vitamin-c"
  | "unsaturated-fats"
  | "polyphenols"
  | "plant-compounds"
  | "isoflavones"
  | "lutein-zeaxanthin";

export type Nutrient = {
  id: NutrientId;
  name: string;
  /** Short grouping label shown on the card. */
  kind: "Energy" | "Digestion" | "Protein" | "Mineral" | "Vitamin" | "Healthy fats" | "Plant compound";
  icon: NutrientIcon;
  /** What it is — one plain sentence. */
  what: string;
  /** Its role in normal body function. */
  role: string;
  /** Why it is nutritionally useful. */
  why: string;
};

export const nutrients: Record<NutrientId, Nutrient> = {
  carbohydrates: {
    id: "carbohydrates",
    name: "Complex carbohydrates",
    kind: "Energy",
    icon: "zap",
    what: "Starch — long chains of sugar units packed into grains and root crops.",
    role: "Your body breaks starch down into glucose, which your cells use as fuel.",
    why: "Starchy staples provide much of the everyday energy in Nigerian meals. Paired with soup, beans, eggs or fish, they make a more balanced plate.",
  },
  fibre: {
    id: "fibre",
    name: "Dietary fibre",
    kind: "Digestion",
    icon: "wheat",
    what: "The parts of plant foods that your body cannot fully digest.",
    role: "Fibre adds bulk and helps food move steadily through the gut.",
    why: "Eating enough fibre contributes to normal digestion, and many people eat less fibre than is recommended.",
  },
  "resistant-starch": {
    id: "resistant-starch",
    name: "Resistant starch",
    kind: "Digestion",
    icon: "sprout",
    what: "Starch that ‘resists’ digestion in the small intestine and reaches the large intestine largely intact.",
    role: "There it can be fermented by beneficial gut microorganisms — in that sense it behaves much like dietary fibre.",
    why: "Because it is digested slowly or not at all, resistant starch may support digestive health and may influence how carbohydrate from a meal is digested and absorbed.",
  },
  protein: {
    id: "protein",
    name: "Plant-based protein",
    kind: "Protein",
    icon: "bean",
    what: "Protein is made of amino acids — the building blocks of muscle, skin, enzymes and more.",
    role: "Protein contributes to normal growth and to the maintenance of muscle and other body tissues.",
    why: "Plant foods are a useful everyday source of protein, especially when different plant proteins are eaten across the day.",
  },
  potassium: {
    id: "potassium",
    name: "Potassium",
    kind: "Mineral",
    icon: "activity",
    what: "A mineral found in many fruits, vegetables, roots and pulses.",
    role: "Potassium contributes to normal muscle function and the normal functioning of the nervous system.",
    why: "It is one of the minerals your body needs every day and gets mainly from plant foods.",
  },
  magnesium: {
    id: "magnesium",
    name: "Magnesium",
    kind: "Mineral",
    icon: "atom",
    what: "A mineral involved in hundreds of processes in the body.",
    role: "Magnesium contributes to normal muscle and nerve function, normal energy metabolism and the maintenance of normal bones.",
    why: "Whole grains, pulses and seeds are among the everyday foods that provide it.",
  },
  phosphorus: {
    id: "phosphorus",
    name: "Phosphorus",
    kind: "Mineral",
    icon: "bone",
    what: "A mineral found alongside calcium in bones and teeth.",
    role: "Phosphorus contributes to the maintenance of normal bones and teeth and to normal energy metabolism.",
    why: "It works with other minerals as part of a varied, balanced diet.",
  },
  iron: {
    id: "iron",
    name: "Iron",
    kind: "Mineral",
    icon: "droplet",
    what: "A mineral that is part of haemoglobin, the protein in red blood cells.",
    role: "Iron contributes to the normal formation of red blood cells and normal oxygen transport in the body.",
    why: "Iron from plant foods is absorbed less easily than iron from meat or fish. Eating it with vitamin C-rich foods — such as fruit or leafy vegetables — helps.",
  },
  manganese: {
    id: "manganese",
    name: "Manganese",
    kind: "Mineral",
    icon: "gem",
    what: "A trace mineral the body needs in small amounts.",
    role: "Manganese contributes to normal energy metabolism, the maintenance of normal bones and the protection of cells from oxidative stress.",
    why: "Whole grains are one of the main everyday sources of manganese.",
  },
  "b-vitamins": {
    id: "b-vitamins",
    name: "B vitamins",
    kind: "Vitamin",
    icon: "flame",
    what: "A family of vitamins — including thiamin, riboflavin and niacin — found in grains and other foods.",
    role: "B vitamins contribute to normal energy-yielding metabolism: they help your body release energy from the food you eat.",
    why: "Many B vitamins sit in the outer layers and germ of a grain, so how the grain is milled and sieved affects how much remains.",
  },
  "vitamin-c": {
    id: "vitamin-c",
    name: "Vitamin C",
    kind: "Vitamin",
    icon: "citrus",
    what: "A water-soluble vitamin found in fresh fruits, vegetables and some tubers.",
    role: "Vitamin C contributes to normal immune function and increases iron absorption.",
    why: "It is sensitive to heat, air and drying, so the amount in a dried flour can be much lower than in the fresh food.",
  },
  "unsaturated-fats": {
    id: "unsaturated-fats",
    name: "Unsaturated fats",
    kind: "Healthy fats",
    icon: "droplets",
    what: "The type of fat mostly found in seeds, nuts, beans and vegetable oils.",
    role: "Fat provides energy and helps the body absorb fat-soluble vitamins (A, D, E and K).",
    why: "Choosing foods with mainly unsaturated fats contributes to a balanced diet.",
  },
  polyphenols: {
    id: "polyphenols",
    name: "Natural polyphenols",
    kind: "Plant compound",
    icon: "sparkles",
    what: "Naturally occurring plant compounds that help give grains their colour.",
    role: "Many polyphenols show antioxidant activity. Research into how they act in the human body is still ongoing.",
    why: "Coloured varieties of some grains — such as red and brown sorghum — contain more of these compounds than paler varieties.",
  },
  "plant-compounds": {
    id: "plant-compounds",
    name: "Natural plant compounds",
    kind: "Plant compound",
    icon: "sparkles",
    what: "Compounds such as phenolics that occur naturally in fruits like plantain.",
    role: "Plants produce them for protection. Some show antioxidant activity in laboratory studies.",
    why: "They are part of what plant foods bring to the diet; research into their effects in people is ongoing.",
  },
  isoflavones: {
    id: "isoflavones",
    name: "Isoflavones",
    kind: "Plant compound",
    icon: "leaf",
    what: "Plant compounds found naturally in soya beans.",
    role: "Isoflavones are among the most studied plant compounds. Research into their effects in the body is ongoing.",
    why: "They are a characteristic part of soya foods, alongside soya’s protein and fibre.",
  },
  "lutein-zeaxanthin": {
    id: "lutein-zeaxanthin",
    name: "Lutein & zeaxanthin",
    kind: "Plant compound",
    icon: "sun",
    what: "Yellow carotenoid pigments that give yellow maize its golden colour.",
    role: "They are naturally concentrated in the retina of the eye and are associated with eye health in research.",
    why: "Yellow maize contains them, white maize contains very little. Eating corn is not a treatment for any eye condition.",
  },
};

export type IngredientId =
  | "yam"
  | "unripe-plantain"
  | "soya"
  | "sorghum"
  | "millet"
  | "yellow-maize"
  | "white-maize";

export type IngredientProfile = {
  id: IngredientId;
  name: string;
  /** Common Nigerian names, used in copy and for search. */
  localNames: string[];
  /** Nutrients characteristic of the RAW ingredient, in display order. */
  nutrients: NutrientId[];
  /** Optional ingredient-specific detail appended to a nutrient card. */
  nutrientNotes?: Partial<Record<NutrientId, string>>;
  /** Potential dietary benefits, in responsible wording. */
  benefits: string[];
  /** Short accuracy notes (processing, gluten, etc.). */
  notes: string[];
  /** Allergen notice that applies to anything made from this ingredient. */
  allergen?: string;
  /** Colours for the illustrative ingredient artwork. */
  art: { surface: string; grain: [string, string]; shape: "round" | "kernel" | "slice" };
};

const GLUTEN_NOTE = (grain: string) =>
  `${grain} is naturally gluten-free. However, Jibby Foods products are not certified gluten-free: that would require verified controls against cross-contamination during processing.`;

export const ingredients: Record<IngredientId, IngredientProfile> = {
  yam: {
    id: "yam",
    name: "Yam",
    localNames: ["Isu", "Ji", "Doya"],
    nutrients: ["carbohydrates", "fibre", "potassium", "magnesium", "phosphorus", "b-vitamins", "vitamin-c"],
    nutrientNotes: {
      "vitamin-c":
        "Fresh yam contains vitamin C, but drying and milling reduce it — flour will contain less than fresh yam.",
    },
    benefits: [
      "Provides carbohydrates for energy.",
      "Fibre contributes to normal digestion.",
      "Potassium contributes to normal muscle and nerve function.",
      "Magnesium and phosphorus contribute to normal body functions.",
    ],
    notes: [
      "Describes yam as a food. Drying and milling into flour change the levels of some nutrients, and the B vitamins and vitamin C in particular vary with processing.",
    ],
    art: { surface: "#EEDFCD", grain: ["#8A5A3C", "#D9C7A8"], shape: "slice" },
  },
  "unripe-plantain": {
    id: "unripe-plantain",
    name: "Unripe plantain",
    localNames: ["Ogede agbagba", "Green plantain"],
    nutrients: ["carbohydrates", "resistant-starch", "fibre", "plant-compounds"],
    nutrientNotes: {
      "resistant-starch":
        "Green (unripe) plantain stores much of its starch as resistant starch. How much remains in a flour depends on drying temperature, and cooking also changes it — our finished flour has not been laboratory tested for it.",
      fibre: "The fibre content of plantain flour depends on how the plantain is peeled and processed.",
    },
    benefits: [
      "Resistant starch behaves similarly to dietary fibre.",
      "Resistant starch can be fermented by beneficial gut microorganisms.",
      "May support digestive health as part of a varied diet.",
      "May influence how carbohydrate from a meal is digested and absorbed.",
    ],
    notes: [
      "We do not claim that Jibby Foods Unripe Plantain Flour is high in resistant starch: that would require laboratory confirmation.",
    ],
    art: { surface: "#DFE6CC", grain: ["#6E8B3D", "#4F6A2A"], shape: "slice" },
  },
  soya: {
    id: "soya",
    name: "Soya beans",
    localNames: ["Soybeans", "Waken suya"],
    nutrients: ["protein", "fibre", "unsaturated-fats", "magnesium", "potassium", "iron", "isoflavones"],
    nutrientNotes: {
      protein:
        "Soya is one of the few plant foods that provides all the essential amino acids — the ones your body cannot make itself.",
    },
    benefits: [
      "Provides essential amino acids.",
      "Protein contributes to normal growth and the maintenance of body tissues.",
      "Fibre contributes to normal digestion.",
      "Unsaturated fats contribute to a balanced diet.",
      "Provides minerals the body needs for normal functions.",
    ],
    notes: ["Soya beans must be properly cooked or processed before eating."],
    allergen:
      "Contains soya. Soya is a common food allergen — anyone with a soya allergy should avoid this product.",
    art: { surface: "#F4E7C4", grain: ["#D8B86A", "#B8964A"], shape: "round" },
  },
  sorghum: {
    id: "sorghum",
    name: "Guinea corn (sorghum)",
    localNames: ["Oka baba", "Dawa", "Sorghum"],
    nutrients: [
      "carbohydrates",
      "fibre",
      "protein",
      "magnesium",
      "phosphorus",
      "manganese",
      "b-vitamins",
      "polyphenols",
    ],
    nutrientNotes: {
      polyphenols:
        "Certain sorghum varieties — especially the red and brown types — contain antioxidant compounds; levels vary by variety and processing.",
    },
    benefits: [
      "Provides carbohydrates for energy.",
      "Fibre contributes to normal digestion.",
      "Its minerals contribute to normal body functions.",
      "Certain sorghum varieties contain naturally occurring antioxidant compounds.",
    ],
    notes: [GLUTEN_NOTE("Sorghum")],
    art: { surface: "#F3DFD5", grain: ["#A33B26", "#7E2D1C"], shape: "round" },
  },
  millet: {
    id: "millet",
    name: "Millet",
    localNames: ["Gero", "Pearl millet"],
    nutrients: ["carbohydrates", "fibre", "iron", "magnesium", "phosphorus", "potassium", "b-vitamins"],
    benefits: [
      "Fibre contributes to normal digestion.",
      "Iron contributes to normal oxygen transport in the body.",
      "Magnesium contributes to normal muscle and nerve function.",
      "B vitamins contribute to normal energy metabolism.",
    ],
    notes: [GLUTEN_NOTE("Millet")],
    art: { surface: "#E9E4D0", grain: ["#B3A374", "#7F7656"], shape: "round" },
  },
  "yellow-maize": {
    id: "yellow-maize",
    name: "Yellow corn (maize)",
    localNames: ["Agbado", "Masara", "Oka"],
    nutrients: ["carbohydrates", "fibre", "b-vitamins", "magnesium", "phosphorus", "lutein-zeaxanthin"],
    benefits: [
      "Provides carbohydrates for energy.",
      "Fibre contributes to normal digestion.",
      "B vitamins contribute to normal energy metabolism.",
      "Contains lutein and zeaxanthin, carotenoids associated with eye health.",
    ],
    notes: ["Eating corn does not treat or prevent eye disease."],
    art: { surface: "#F7E4B0", grain: ["#E0A12A", "#C9841A"], shape: "kernel" },
  },
  "white-maize": {
    id: "white-maize",
    name: "White corn (maize)",
    localNames: ["Agbado funfun", "Masara"],
    nutrients: ["carbohydrates", "fibre", "b-vitamins", "magnesium", "phosphorus"],
    benefits: [
      "Provides carbohydrates for energy.",
      "Fibre contributes to normal digestion.",
      "B vitamins contribute to normal energy metabolism.",
    ],
    notes: [
      "White maize contains very little of the yellow carotenoids (lutein and zeaxanthin) found in yellow maize.",
    ],
    art: { surface: "#F1EBDD", grain: ["#E4D9BE", "#CDBF9C"], shape: "kernel" },
  },
};

/** Applies to every pap product. */
export const PAP_PROCESSING_NOTE =
  "Pap (ogi) is traditionally made by soaking and fermenting the grain, then milling and sieving it. Sieving removes much of the bran and germ, so finished pap usually contains less fibre, protein and minerals than the whole grain, and fermentation changes its composition further. The information here describes the grain itself, not the measured content of our finished pap.";

export const NUTRITION_DISCLAIMER =
  "This information is for general education. It describes the typical nutritional properties of the raw ingredients, not the laboratory-tested composition of Jibby Foods products, and it is not medical advice. Nutrient levels vary with variety, processing and preparation. If you have a medical condition or special dietary needs, please speak to a doctor or registered dietitian.";

/** Collects the unique nutrients across a product's ingredients, in order. */
export function nutrientsFor(ids: IngredientId[]) {
  const seen = new Set<NutrientId>();
  const list: { nutrient: Nutrient; notes: string[] }[] = [];
  for (const id of ids) {
    const ing = ingredients[id];
    for (const n of ing.nutrients) {
      const note = ing.nutrientNotes?.[n];
      if (seen.has(n)) {
        if (note) list.find((x) => x.nutrient.id === n)?.notes.push(note);
        continue;
      }
      seen.add(n);
      list.push({ nutrient: nutrients[n], notes: note ? [note] : [] });
    }
  }
  return list;
}
