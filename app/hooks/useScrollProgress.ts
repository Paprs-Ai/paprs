"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if browser supports prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      window.requestAnimationFrame(() => setProgress(1));
      return;
    }

    let ticking = false;

    const calculateProgress = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const elementHeight = rect.height;

      // For sticky containers where height > viewHeight
      if (elementHeight > viewHeight) {
        // Scroll starts when the top of the element hits the top of the viewport
        const totalScrollable = elementHeight - viewHeight;
        const scrolled = -rect.top;
        
        let p = scrolled / totalScrollable;
        p = Math.max(0, Math.min(1, p));
        setProgress(p);
      } else {
        // For standard elements, calculate progress from entering bottom of viewport to leaving top
        const entryPoint = viewHeight;
        const exitPoint = -elementHeight;
        const totalDistance = entryPoint - exitPoint;
        const currentPosition = rect.top - exitPoint;
        
        // Progress goes from 0 (just entering bottom) to 1 (just leaving top)
        let p = 1 - currentPosition / totalDistance;
        p = Math.max(0, Math.min(1, p));
        setProgress(p);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    // Use passive event listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial call
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { ref, progress };
}
