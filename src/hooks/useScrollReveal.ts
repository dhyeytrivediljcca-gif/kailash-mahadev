import { useEffect } from 'react';

/**
 * High-performance IntersectionObserver hook for cinematic scroll reveals.
 * Elements reveal progressively with cubic-bezier easing, translateY, and de-blurring.
 * Initial elements already in the viewport are revealed immediately.
 */
export function useScrollReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-img');
      if (elements.length === 0) return;

      if (prefersReducedMotion) {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.06,
          rootMargin: '0px 0px -20px 0px',
        }
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already visible within viewport upon loading/unmount
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    }, 60);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
