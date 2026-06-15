"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimateOnView<T extends HTMLElement = HTMLDivElement>(
  enabled = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    function handleChange() {
      setReduceMotion(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, reduceMotion]);

  const shouldAnimate = enabled && !reduceMotion;
  const isActive = !shouldAnimate || inView;

  return { ref, isActive, shouldAnimate };
}
