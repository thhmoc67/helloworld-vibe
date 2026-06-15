import type { CitySlug } from "@/src/tokens/cities";

export const localitiesByCity: Record<CitySlug, readonly string[]> = {
  ahmedabad: ["SG Highway", "Prahlad Nagar", "Navrangpura", "Satellite", "Vastrapur"],
  bangalore: [
    "HSR Layout",
    "Electronic City",
    "Indiranagar",
    "Kanakpura Road",
    "Kudlu Gate",
    "Nallurhalli",
  ],
  coimbatore: ["RS Puram", "Peelamedu", "Saibaba Colony", "Gandhipuram"],
  chennai: ["OMR", "Velachery", "T Nagar", "Anna Nagar", "Adyar"],
  delhi: ["Dwarka", "Saket", "Hauz Khas", "Rohini", "Nehru Place"],
  goa: ["Panaji", "Margao", "Calangute", "Baga"],
  gurugram: ["DLF Phase 1", "Sector 29", "Sohna Road", "Udyog Vihar"],
  hyderabad: ["Gachibowli", "Madhapur", "Kondapur", "Hitech City", "Kukatpally"],
  indore: ["Vijay Nagar", "Bhawarkua", "Palasia", "Rau"],
  jaipur: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C Scheme"],
};

export function getLocalitiesForCity(city: string) {
  return localitiesByCity[city as CitySlug] ?? [];
}
