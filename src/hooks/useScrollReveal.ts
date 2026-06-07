'use client';

import { useEffect } from 'react';

/**
 * Hook to initialize IntersectionObserver for elements with the '.reveal-on-scroll' class.
 * Automatically adds the '.revealed' class when elements enter the viewport.
 * Respects 'prefers-reduced-motion' by rendering elements immediately.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = () => {
      if (mediaQuery.matches) {
        document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
          el.classList.add('revealed');
        });
      }
    };

    handleMotionPreference();
    mediaQuery.addEventListener('change', handleMotionPreference);

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMotionPreference);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px', // Trigger slightly before entering fully
      }
    );

    // Initial observation
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Re-check for dynamically added elements (like filter changes)
    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      currentElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreference);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
export default useScrollReveal;
