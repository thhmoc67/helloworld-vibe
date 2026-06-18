export const srpPriceRangeMin = 1000;
export const srpPriceRangeMax = 99999;
export const srpPriceRangeStep = 100;

export type SrpFilterOption = {
  label: string;
  value: string;
};

export const srpBudgetPresets: readonly SrpFilterOption[] = [
  { label: "Any budget", value: "" },
  { label: "Under ₹10,000", value: "1000,10000" },
  { label: "₹10,000 – ₹15,000", value: "10000,15000" },
  { label: "₹15,000 – ₹20,000", value: "15000,20000" },
  { label: "₹20,000+", value: "20000,99999" },
];

export const srpGenderOptions: readonly SrpFilterOption[] = [
  { label: "Men Only", value: "male only" },
  { label: "Women Only", value: "female only" },
  { label: "Coliving", value: "any gender" },
];

export const srpSortingOptions: readonly SrpFilterOption[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export const srpAmenitiesList: readonly string[] = [
  "AC",
  "Attached bathroom",
  "Balcony",
  "Carrom Board",
  "Cloths dry stand",
  "Coffee Table",
  "Cots",
  "Cupboard",
  "DTH",
  "Dining table & Chair",
  "Foosball",
  "Fridge",
  "Geyser",
  "House keeping",
  "Kitchen",
  "Lift",
  "Mattress 5inch",
  "Mattress 8inch",
  "Pillow",
  "RO",
  "Side table",
  "Sofa",
  "Soft furnishing",
  "Study table",
  "TV",
  "Table tennis",
  "Washing machine",
  "Water Cooler",
];

export const srpDefaultSort = srpSortingOptions[0];
