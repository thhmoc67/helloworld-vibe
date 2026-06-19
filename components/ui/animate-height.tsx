"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/src/lib/cn";

export function AnimateHeight({
  children,
  className,
  contentClassName,
  style,
  durationMs = 300,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  durationMs?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();
  const [canTransition, setCanTransition] = useState(false);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const outer = outerRef.current;
    if (!content || !outer) return;

    const measure = () => {
      let next = content.scrollHeight;
      const maxHeight = parseFloat(getComputedStyle(outer).maxHeight);
      if (Number.isFinite(maxHeight) && maxHeight > 0) {
        next = Math.min(next, maxHeight);
      }
      setHeight(next);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCanTransition(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={outerRef}
      className={cn(
        "overflow-hidden",
        canTransition &&
          "transition-[height] ease-in-out motion-reduce:transition-none",
        className,
      )}
      style={{
        ...style,
        height: height !== undefined ? `${height}px` : undefined,
        transitionDuration: canTransition ? `${durationMs}ms` : undefined,
      }}
    >
      <div ref={contentRef} className={contentClassName}>
        {children}
      </div>
    </div>
  );
}
