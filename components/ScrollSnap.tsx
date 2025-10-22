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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSnappingRef = useRef(false);

  const sections = useMemo(() => {
    return Array.isArray(children) ? (children as React.ReactNode[]) : [children];
  }, [children]);

  // Rigid snap handler - forțează snap instant după ce scroll-ul se oprește
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const sectionEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-snap-section='true']")
    );
    if (sectionEls.length === 0) return;

    const snapToNearest = () => {
      if (isSnappingRef.current) return;
      
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const centerY = containerTop + containerHeight / 2;

      // Găsește secțiunea cea mai apropiată de centru
      let nearestIndex = 0;
      let minDistance = Infinity;

      sectionEls.forEach((section, idx) => {
        const sectionTop = section.offsetTop;
        const sectionCenter = sectionTop + section.clientHeight / 2;
        const distance = Math.abs(centerY - sectionCenter);

        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = idx;
        }
      });

      // Snap la secțiunea cea mai apropiată
      if (nearestIndex !== activeIndex || Math.abs(containerTop - sectionEls[nearestIndex].offsetTop) > 10) {
        isSnappingRef.current = true;
        setActiveIndex(nearestIndex);
        
        sectionEls[nearestIndex].scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });

        setTimeout(() => {
          isSnappingRef.current = false;
        }, 500);
      }
    };

    const handleScroll = () => {
      if (isSnappingRef.current) return;

      // Clear timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Așteaptă 150ms după ce scroll-ul se oprește, apoi snap
      scrollTimeoutRef.current = setTimeout(snapToNearest, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Observer pentru a detecta secțiunea vizibilă
    const observer = new IntersectionObserver(
      (entries) => {
        if (isSnappingRef.current) return;
        
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const index = sectionEls.findIndex((el) => el === mostVisible.target);
        if (index !== -1 && index !== activeIndex) {
          setActiveIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.5, 0.75, 1.0],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, activeIndex]);

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


