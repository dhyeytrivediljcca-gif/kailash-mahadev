import React, { useEffect, useRef, useState } from 'react';

/**
 * Awwwards-Level Cinematic Custom Cursor
 * - Default: small luminous moonlight dot
 * - Interactive hover: transforms into a delicate, thin circular ring
 * - Sacred symbol hover: subtle expanded celestial ring
 * - Click event: brief, elegant ripple ring
 * - Pure visual geometry — NO text badges, NO distraction
 * - Silky smooth RAF interpolation (lerping physics)
 * - Auto-disabled on touch, mobile, and tablets
 */
export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<'default' | 'interactive' | 'symbol' | 'active'>('default');
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check touch / mobile devices or prefers-reduced-motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const symbolEl = target.closest('[data-cursor="symbol"], button[aria-expanded]') as HTMLElement | null;
      if (symbolEl) {
        const isActive = symbolEl.getAttribute('aria-expanded') === 'true' || symbolEl.getAttribute('data-active') === 'true';
        setHoverState(isActive ? 'active' : 'symbol');
        return;
      }

      const interactiveEl = target.closest('button, a, [role="button"], .cursor-pointer, img, .scroll-reveal-img, input') as HTMLElement | null;
      if (interactiveEl) {
        setHoverState('interactive');
      } else {
        setHoverState('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Silky smooth RAF physics loop
    const loop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Inner dot: responsive tracking (lerp 0.38)
      dotPos.current.x += (targetX - dotPos.current.x) * 0.38;
      dotPos.current.y += (targetY - dotPos.current.y) * 0.38;

      // Outer ring: fluid trailing dampening (lerp 0.16)
      ringPos.current.x += (targetX - ringPos.current.x) * 0.16;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none" aria-hidden="true">
      {/* Outer fluid trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out ${
            hoverState === 'active'
              ? 'w-12 h-12 border border-[#B9D5F2]/70 bg-[#B9D5F2]/10 scale-105 shadow-[0_0_20px_rgba(185,213,242,0.3)]'
              : hoverState === 'symbol'
              ? 'w-11 h-11 border border-[#B9D5F2]/55 bg-transparent scale-100 shadow-[0_0_15px_rgba(185,213,242,0.2)]'
              : hoverState === 'interactive'
              ? 'w-9 h-9 border border-[#B9D5F2]/45 bg-[#B9D5F2]/5 scale-100'
              : 'w-6 h-6 border border-[#B9D5F2]/20 bg-transparent scale-75 opacity-60'
          }`}
        />
      </div>

      {/* Inner luminous pinpoint dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-[#B9D5F2] transition-all duration-200 ${
            hoverState !== 'default'
              ? 'w-1 h-1 shadow-[0_0_6px_#B9D5F2] opacity-80'
              : 'w-1.5 h-1.5 shadow-[0_0_10px_#B9D5F2] opacity-100'
          }`}
        />
      </div>

      {/* Tiny Click Ripple */}
      {isClicking && (
        <div
          ref={rippleRef}
          className="fixed top-0 left-0 will-change-transform pointer-events-none"
          style={{
            transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          }}
        >
          <div className="w-10 h-10 rounded-full border border-[#B9D5F2]/60 animate-ping" />
        </div>
      )}
    </div>
  );
};
