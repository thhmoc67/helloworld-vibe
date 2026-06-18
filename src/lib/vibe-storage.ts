import { vibeChips } from "@/src/tokens/vibes";

const STORAGE_KEY = "helloworld-selected-vibes";

const validVibeIds = new Set(vibeChips.map((chip) => chip.id));

function parseStoredVibes(raw: string | null): Set<string> {
  if (!raw) return new Set();

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(
      parsed.filter(
        (id): id is string => typeof id === "string" && validVibeIds.has(id),
      ),
    );
  } catch {
    return new Set();
  }
}

export function readStoredSelectedVibes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  return parseStoredVibes(window.localStorage.getItem(STORAGE_KEY));
}

export function persistSelectedVibes(selectedIds: ReadonlySet<string>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(Array.from(selectedIds)),
  );
}
