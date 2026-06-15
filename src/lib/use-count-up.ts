"use client";

import { useEffect, useState } from "react";

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

export function useCountUp(
  target: number,
  {
    active = true,
    enabled = true,
    duration = 1000,
  }: {
    active?: boolean;
    enabled?: boolean;
    duration?: number;
  } = {},
) {
  const [value, setValue] = useState(enabled && active ? 0 : target);

  useEffect(() => {
    if (!enabled || !active) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * easeOutCubic(progress)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, enabled, target]);

  return value;
}
