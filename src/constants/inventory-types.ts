const inventoryTypes: Record<string, string> = {
  "1SHARING": "Single Sharing",
  "2SHARING": "Double Sharing",
  "3SHARING": "Triple Sharing",
  "4SHARING": "Quadruple Sharing",
  "5SHARING": "5 Sharing",
  "6SHARING": "6 Sharing",
  "7SHARING": "7 Sharing",
  SHARING: "Sharing",
  STUDIO: "Studio Room",
  PRIVATE: "Private Room",
  "1RK": "1 RK",
  "1BHK": "1 BHK",
  "2BHK": "2 BHK",
  "3BHK": "3 BHK",
  "4BHK": "4 BHK",
  "5BHK": "5 BHK",
  "6BHK": "6 BHK",
  "7BHK": "7 BHK",
};

export function getInventoryTypeLabel(raw: string): string {
  if (!raw) return "";
  const normalized = raw.toUpperCase().replace(/\s+/g, "");
  if (inventoryTypes[normalized]) return inventoryTypes[normalized];
  const sharingMatch = normalized.match(/^(\d+)SHARING$/);
  if (sharingMatch) return `${sharingMatch[1]} Sharing`;
  return raw.replace(/([A-Z])/g, " $1").trim() || raw;
}
