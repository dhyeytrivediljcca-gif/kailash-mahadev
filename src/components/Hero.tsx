import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ParticleCanvas } from './three/ParticleCanvas';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onEnter: () => void;
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onEnter, isReady = true }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Smooth RAF Lerp Inertia for Mouse Parallax
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      };
    };

    const updateParallax = () => {
      // 0.08 lerp for silky smooth organic physical inertia
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;
      setMouseOffset({ x: currentMouse.current.x, y: currentMouse.current.y });
      rafId.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.75)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-between items-center overflow-hidden bg-[#02050A]"
    >
      {/* 1. LAYER 01 — ENVIRONMENT (Layered Deep Midnight Gradient + Atmospheric Glow) */}
      <div className="absolute inset-0 bg-[#02050A] z-0" />

      {/* Subtle layered celestial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_#0B1726_0%,_#081321_32%,_#050B14_60%,_#02050A_100%)] z-0 opacity-90" />

      {/* Soft atmospheric moonlight aura reacting with 0.5x depth inertia */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] rounded-full bg-[radial-gradient(circle,rgba(185,213,242,0.08)_0%,rgba(11,23,38,0.22)_45%,transparent_75%)] blur-[90px] pointer-events-none z-0"
        style={{
          transform: !isTouchDevice
            ? `translate3d(calc(-50% + ${mouseOffset.x * 0.5}px), calc(-50% + ${mouseOffset.y * 0.5}px), 0)`
            : 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* 2. LAYER 02 — SACRED SUBJECT ATMOSPHERE (Minimal starlight motes canvas) */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          transform: !isTouchDevice
            ? `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`
            : undefined,
          willChange: 'transform',
        }}
      >
        <ParticleCanvas className="w-full h-full opacity-45" intensity="minimal" />
      </div>

      {/* Top Spacer for Clean Navbar Clearance */}
      <div className="relative z-10 pt-28 md:pt-36" />

      {/* 3. LAYER 03 — UI / TYPOGRAPHY COMPOSITION (0.2x subtle counter-movement) */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl transition-all duration-300 pointer-events-auto my-auto"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 1.8),
          transform: !isTouchDevice
            ? `translate3d(${mouseOffset.x * -0.2}px, ${mouseOffset.y * -0.15}px, 0)`
            : undefined,
          willChange: 'transform',
        }}
      >
        {/* Subtle Om glyph accent */}
        <div
          className={`text-2xl sm:text-3xl text-[#B9D5F2]/50 font-light glow-moonlight mb-3 select-none transition-opacity duration-1000 ${
            isReady ? 'hero-animate-title opacity-100' : 'opacity-0'
          }`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ॐ
        </div>

        {/* PRIMARY HEADING: MAHADEV (Line-by-line editorial emergence from darkness) */}
        <h1
          className={`font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light md:font-normal tracking-[0.28em] md:tracking-[0.34em] text-[#EAF2F7] uppercase glow-moonlight mb-4 select-none ${
            isReady ? 'hero-animate-title' : 'opacity-0'
          }`}
        >
          MAHADEV
        </h1>

        {/* SUBTITLE: THE STILLNESS BEYOND EVERYTHING */}
        <p
          className={`font-cormorant text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic text-[#B9D5F2]/80 tracking-[0.22em] mb-5 select-none ${
            isReady ? 'hero-animate-subtitle' : 'opacity-0'
          }`}
        >
          THE STILLNESS BEYOND EVERYTHING
        </p>

        {/* DESCRIPTION: "Where silence becomes meditation, and the mountains become prayer." */}
        <p
          className={`font-sans-ui text-xs sm:text-sm text-[#B9D5F2]/60 tracking-[0.16em] max-w-[540px] leading-relaxed mb-10 text-balance font-light ${
            isReady ? 'hero-animate-desc' : 'opacity-0'
          }`}
        >
          "Where silence becomes meditation, and the mountains become prayer."
        </p>

        {/* CTA: ENTER KAILASH → (Tactile magnetic button with layered arrow physics) */}
        <div className={isReady ? 'hero-animate-cta' : 'opacity-0'}>
          <MagneticButton
            onClick={onEnter}
            cursorLabel="ENTER"
            strength={6}
            innerStrength={3}
            className="group relative inline-flex items-center gap-3.5 px-8 py-3 rounded-full border border-[#B9D5F2]/25 hover:border-[#B9D5F2]/70 bg-transparent hover:bg-[#B9D5F2]/8 backdrop-blur-sm transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9D5F2] shadow-[0_0_20px_rgba(185,213,242,0.08)] hover:shadow-[0_0_30px_rgba(185,213,242,0.2)]"
            aria-label="Enter Kailash journey"
          >
            <span className="font-cinzel text-xs font-medium tracking-[0.3em] text-[#EAF2F7] uppercase transition-colors">
              ENTER KAILASH
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A96B] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Sacred Elevation Note */}
      <div
        className="relative z-10 pb-8 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
      >
        <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#B9D5F2]/40">
          SCROLL TO ASCEND
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#B9D5F2]/40 to-transparent" />
      </div>
    </section>
  );
};
