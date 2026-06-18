"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchAllProperty,
  fetchPropertiesBySlug,
  SRP_LIST_PAGE_SIZE,
} from "@/src/apis/srp";
import { genderFilterApiValue } from "@/src/lib/srp-slug-parse";
import type { SrpPageKind } from "@/src/lib/srp/resolve-srp-page";
import type { Property } from "@/src/models/property";

export type SrpPaginationContext = {
  kind: SrpPageKind;
  city: string;
  localitySlug?: string;
  landmarkSlug?: string;
  slugGender?: "male only" | "female only";
};

const LOAD_ROOT_MARGIN_PX = 400;

function sentinelNearViewport(sentinel: HTMLElement) {
  return sentinel.getBoundingClientRect().top <= window.innerHeight + LOAD_ROOT_MARGIN_PX;
}

function mergeUniqueProperties(previous: Property[], incoming: Property[]) {
  if (incoming.length === 0) return previous;

  const seen = new Set(previous.map((property) => property.id));
  const uniqueIncoming = incoming.filter((property) => !seen.has(property.id));
  if (uniqueIncoming.length === 0) return previous;

  return [...previous, ...uniqueIncoming];
}

export function useSrpPagination(
  initialProperties: Property[],
  total: number,
  context: SrpPaginationContext,
  resetKey: string,
) {
  const [properties, setProperties] = useState(initialProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    () => total > initialProperties.length,
  );

  const pageRef = useRef(1);
  const hasMoreRef = useRef(total > initialProperties.length);
  const totalRef = useRef(total);
  const loadingRef = useRef(false);
  const contextRef = useRef(context);
  const sentinelRef = useRef<HTMLDivElement>(null);

  contextRef.current = context;
  totalRef.current = total;

  const resetSnapshot = `${resetKey}:${total}:${initialProperties.length}`;

  useEffect(() => {
    setProperties(initialProperties);
    pageRef.current = 1;
    const more = total > initialProperties.length;
    hasMoreRef.current = more;
    setHasMore(more);
    loadingRef.current = false;
    setIsLoading(false);
  }, [resetSnapshot, initialProperties, total]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    const nextPage = pageRef.current + 1;
    loadingRef.current = true;
    pageRef.current = nextPage;
    setIsLoading(true);

    try {
      const ctx = contextRef.current;
      const apiGender = genderFilterApiValue(undefined, ctx.slugGender);
      const filter = apiGender
        ? { gender: apiGender, amenities: [] as string[] }
        : undefined;
      const params = { page: nextPage, page_size: SRP_LIST_PAGE_SIZE };

      const response =
        ctx.kind === "landmark" && ctx.landmarkSlug
          ? await fetchPropertiesBySlug(
              { slug: ctx.landmarkSlug, filter },
              params,
            )
          : await fetchAllProperty(
              {
                city: ctx.city,
                localityName: ctx.localitySlug?.replace(/-/g, " "),
                filter,
              },
              params,
            );

      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        setProperties((prev) => {
          const merged = mergeUniqueProperties(prev, response.data);
          const added = merged.length - prev.length;
          const nextTotal = response.pageInfo?.total ?? totalRef.current;
          const more = added > 0 && merged.length < nextTotal;
          hasMoreRef.current = more;
          setHasMore(more);
          if (added === 0) {
            pageRef.current = nextPage - 1;
          }
          return merged;
        });
      } else {
        pageRef.current = nextPage - 1;
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } catch {
      pageRef.current = nextPage - 1;
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  const maybeLoadMore = useCallback(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMoreRef.current || loadingRef.current) return;
    if (!sentinelNearViewport(sentinel)) return;
    void loadMore();
  }, [loadMore]);

  useEffect(() => {
    if (!hasMore) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: `${LOAD_ROOT_MARGIN_PX}px` },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    if (!hasMore) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        maybeLoadMore();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, maybeLoadMore]);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    requestAnimationFrame(() => {
      maybeLoadMore();
    });
  }, [properties.length, hasMore, isLoading, maybeLoadMore]);

  return { properties, isLoading, hasMore, sentinelRef };
}
