"use client";

import { useEffect, useState } from "react";
import {
  persistSelectedVibes,
  readStoredSelectedVibes,
} from "@/src/lib/vibe-storage";

export function useSelectedVibes() {
  const [selectedVibes, setSelectedVibes] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    setSelectedVibes(readStoredSelectedVibes());
  }, []);

  function toggleVibe(id: string) {
    setSelectedVibes((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      persistSelectedVibes(next);
      return next;
    });
  }

  function clearSelectedVibes() {
    const next = new Set<string>();
    persistSelectedVibes(next);
    setSelectedVibes(next);
  }

  return { selectedVibes, toggleVibe, clearSelectedVibes };
}
