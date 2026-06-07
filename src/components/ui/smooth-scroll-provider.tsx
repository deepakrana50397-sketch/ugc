"use client";

import { useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const ScrollContext = createContext<Lenis | null>(null);

export const useScroll = () => useContext(ScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider value={lenisRef.current}>
      {children}
    </ScrollContext.Provider>
  );
}
