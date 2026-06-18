"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SrpQuery } from "@/src/models/srp-query";

function readSrpQuery(searchParams: URLSearchParams): SrpQuery {
  const price = searchParams.get("price")?.trim();
  const gender = searchParams.get("gender")?.trim();
  const amenity = searchParams.get("amenity")?.trim();
  const food = searchParams.get("food")?.trim();
  const sort = searchParams.get("sort")?.trim();

  return {
    ...(price ? { price } : {}),
    ...(gender ? { gender } : {}),
    ...(amenity ? { amenity } : {}),
    ...(food ? { food } : {}),
    ...(sort ? { sort } : {}),
  };
}

export function useSrpFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useMemo(() => readSrpQuery(searchParams), [searchParams]);

  const setQuery = useCallback(
    (updates: Partial<SrpQuery>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates) as Array<
        [keyof SrpQuery, string | undefined]
      >) {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      const next = params.toString();
      router.push(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearQuery = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { query, setQuery, clearQuery };
}
