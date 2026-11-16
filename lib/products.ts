/**
 * Shop catalogue. Categories, prices, options and product copy mirror the
 * live store (juliannaturals.com); only three products are listed for now.
 */

export const CATEGORIES = [
  { slug: "clay-masks", name: "Clay Masks" },
  { slug: "big-rass-giant-bubbles", name: "Big Rass Giant Bubbles" },
  { slug: "lotion-bars-mommy-balm", name: "Lotion Bars/Mommy Balm" },
  { slug: "lip-balm", name: "Lip Balm" },
  { slug: "soap", name: "Soap, Artisan Crafted in Small Batches" },
  { slug: "deodorant", name: "Deodorant" },
  { slug: "deep-moisture-treatment", name: "Deep Moisture Treatment" },
  { slug: "hair-body-oil", name: "Hair/Body Oil" },
  { slug: "aroma-rollers", name: "Aroma Rollers" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export type ProductImage = { src: string; alt: string };

export type ProductOption = {
  /** Option group label, e.g. "Scent" or "Size". */
  label: string;
  choices: { name: string; price: number }[];
};

export type Product = {
  slug: string;
  name: string;
  /** Full name as listed on the live store, when longer than `name`. */
  fullName?: string;
  subtitle: string;
  /** Display price for listings (range when options differ). */
  price: string;
  /** [listing thumbnail, product-page lifestyle photo] */
  images: [ProductImage, ProductImage];
  /** Empty = listed under "All Items" only (as on the live store). */
  categories: CategorySlug[];
  option: ProductOption;
  /** Offers "Subscribe & save" (15% off, every 2 weeks) like the live store. */
  subscription?: boolean;
  description: string[];
  highlights: string[];
  ingredients?: string;
  howToUse?: string[];
  /** Short closing line under the description. */
  note?: string;
};

export const SUBSCRIPTION_DISCOUNT = 0.15;

export const PRODUCTS: Product[] = [
  {
    slug: "after-shave-balm",
    name: "After Shave Balm",
    subtitle: "All natural & hydrating · Cool Coconut",
    price: "$16.00",
    images: [
      {
        src: "/product-thumbnail-1.jpeg",
        alt: "Tin of Julian Naturals all-natural hydrating after shave balm in Cool Coconut",
      },
      {
        src: "/product-page-product-1.jpeg",
        alt: "Two tins of after shave balm on a rustic wooden shelf beside a coconut and a shaving brush",
      },
    ],
    categories: [],
    option: {
      label: "Scent",
      choices: [
        { name: "Unscented", price: 16 },
        { name: "Cool Coconut", price: 16 },
      ],
    },
    description: [
      "Soothe and nourish your skin the natural way with Julian Naturals Aftershave Balm, a rich, hydrating formula designed to calm irritation, reduce redness, and lock in moisture after shaving.",
      "We carefully craft this balm using cold-pressed seed oils and butters sourced from suppliers with proven records of quality and integrity, so you can trust what you’re putting on your skin.",
      "It delivers deep moisture without leaving a greasy feel, just soft, smooth, healthy skin.",
    ],
    highlights: [
      "Calms irritation and reduces redness after shaving",
      "Locks in moisture without a greasy feel",
      "Cold-pressed seed oils and butters from trusted suppliers",
      "No synthetic fragrances, dyes, or preservatives",
    ],
    ingredients:
      "Beeswax, Coconut Oil, Olive Oil, Cocoa Butter, Avocado Oil, Almond Oil, Grapeseed Oil, Sunflower Oil, Shea Butter, Lanolin, Vitamin E",
    howToUse: ["Apply a small amount to clean skin after shaving to soothe, protect, and hydrate."],
    note: "No synthetic fragrances, dyes, or preservatives — only pure, skin-loving ingredients.",
  },
  {
    slug: "body-nourishing-oil",
    name: "Body Nourishing Oil",
    subtitle: "Lanolin, shea & cocoa butters · Simply Naked",
    price: "$28.00 – $50.00",
    images: [
      {
        src: "/product-thumbnail-2.jpeg",
        alt: "Amber dropper bottle of Julian Naturals Body Nourishing Oil, Simply Naked",
      },
      {
        src: "/product-page-product-2.jpeg",
        alt: "A hand lifting a bottle of Body Nourishing Oil from a wooden tray with shea butter and cocoa beans",
      },
    ],
    categories: ["hair-body-oil"],
    option: {
      label: "Size",
      choices: [
        { name: "4oz Body Oil", price: 28 },
        { name: "8oz Body Oil", price: 46 },
        { name: "2x4oz Body Oil", price: 50 },
      ],
    },
    description: [
      "Our Body Nourishing Oil is a deeply moisturizing, water-free blend designed to support dry, sensitive, or compromised skin. Made in small batches with nutrient-rich oils and butters, it melts into the skin gradually — absorbing in about five minutes and leaving skin nourished, soft, and protected without a sticky or heavy feel.",
      "This oil is especially loved after a shower, when warm skin helps it absorb beautifully and lock in moisture for lasting comfort.",
      "Simply Naked is completely unscented and ideal for sensitive skin, fragrance-free households, and those who prefer pure, uncomplicated skincare.",
    ],
    highlights: [
      "Deep, lasting moisture without water or alcohol",
      "Absorbs in ~5 minutes with a soft, nourished finish",
      "Supports the skin barrier and helps reduce dryness",
      "Excellent after bathing, shaving, or sun exposure",
      "Gentle enough for daily, full-body use",
    ],
    ingredients:
      "Coconut Oil, Olive Oil, Avocado Oil, Sunflower Oil, Sweet Almond Oil, Grapeseed Oil, Lanolin, Shea Butter, Cocoa Butter, Vitamin E",
    howToUse: [
      "Apply to warm, slightly damp skin after a shower or bath.",
      "Massage in gently and allow a few minutes to absorb.",
      "A little goes a long way.",
    ],
    note: "Handcrafted in small batches by our family and batch numbered for freshness.",
  },
  {
    slug: "desert-rain-deodorant",
    name: "Desert Rain Deodorant",
    fullName: "Desert Rain Deodorant All-Natural for Whole Body Use",
    subtitle: "All-natural for whole body use · Extra strength",
    price: "$8.00 – $60.00",
    images: [
      {
        src: "/product-thumbnail-3.jpeg",
        alt: "Julian Naturals Desert Rain aluminum-free extra strength whole body deodorant stick",
      },
      {
        src: "/product-page-product-3.jpeg",
        alt: "Desert Rain deodorant sticks on a stone shelf with dried sage and a rolled towel",
      },
    ],
    categories: ["deodorant"],
    option: {
      label: "Size",
      choices: [
        { name: "Travel Size Deodorant", price: 8 },
        { name: "Large Deodorant", price: 25 },
        { name: "Three Large Deodorants", price: 60 },
      ],
    },
    subscription: true,
    description: [
      "Introducing the Desert Rain all-natural deodorant – the perfect solution for achieving whole-body freshness without exposing yourself to harsh chemicals. This deodorant is made entirely from natural ingredients, ensuring that you can use it with confidence.",
      "Experience a refreshing, long-lasting scent that keeps you smelling great all day long. The Desert Rain all-natural deodorant is designed for whole-body use, providing comprehensive protection against odor and sweat.",
      "Designed with your well-being in mind, this product contains no harsh chemicals or synthetic fragrances. It’s perfect for individuals who want to avoid exposure to harmful substances and prioritize natural solutions instead.",
    ],
    highlights: [
      "Whole-body freshness, made entirely from natural ingredients",
      "Refreshing, long-lasting scent that keeps you fresh all day",
      "Protection against odor and sweat",
      "No harsh chemicals or synthetic fragrances",
    ],
    note: "Say goodbye to unpleasant body odor and embrace a refreshing clean scent, without compromising your health or values.",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPrice = (amount: number) =>
  `$${amount.toFixed(2)}`;
