"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollSnapProps = {
  children: React.ReactNode;
  className?: string;
  /** Enable snapping behavior (e.g., only on mobile) */
  enabled?: boolean;
};

export function ScrollSnap({ children, className, enabled = true }: ScrollSnapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = useMemo(() => {
    return Array.isArray(children) ? (children as React.ReactNode[]) : [children];
  }, [children]);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const sectionEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-snap-section='true']")
    );
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry with largest intersection ratio as the active section
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const index = sectionEls.findIndex((el) => el === mostVisible.target);
        if (index !== -1) setActiveIndex(index);
      },
      {
        root: container,
        threshold: [0.25, 0.5, 0.75, 1.0],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const sectionEls = container.querySelectorAll<HTMLElement>("[data-snap-section='true']");
    const target = sectionEls[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        enabled && "snap-y snap-mandatory h-[100dvh] overflow-y-auto",
        // provide good defaults; consumer can override via className
        className
      )}
      style={enabled ? { overscrollBehavior: 'none' } : undefined}
    >
      {/* Sections */}
      {sections}

      {/* Dot navigation - visible only when enabled */}
      {enabled && sections.length > 1 && (
        <nav
          aria-label="Section navigation"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
        >
          {sections.map((_, i) => (
            <button
              key={i}
              aria-label={`Mergi la secțiunea ${i + 1}`}
              aria-current={activeIndex === i}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all",
                activeIndex === i
                  ? "bg-primary scale-125 shadow"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </nav>
      )}
    </div>
  );
}


