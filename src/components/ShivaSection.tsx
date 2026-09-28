import React, { useState, useEffect, useRef } from 'react';
import shivaImg from '../assets/images/shiva_meditator_twilight_1790521100363.jpg';

export const ShivaSection: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle 3D mouse parallax factor: max 3-8px
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="shiva"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-36 px-6 md:px-16 flex flex-col justify-center border-t border-[#B9D5F2]/5"
    >
      {/* 1. Background Aura Layer (Moves subtly 2px) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#071321] rounded-full blur-[150px] pointer-events-none opacity-80 transition-transform duration-700 ease-out"
        style={{
          transform: !isTouch
            ? `translate3d(calc(-50% + ${mouseOffset.x * 2}px), calc(-50% + ${mouseOffset.y * 2}px), 0)`
            : 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#B9D5F2]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Editorial Section Number */}
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#B9D5F2]/10 text-xs tracking-[0.25em] text-[#B9D5F2]/60 uppercase scroll-reveal">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#C8A96B] tabular-nums">02</span>
            <span className="font-cinzel">MAHADEVA DHYANA</span>
          </div>
          <div className="font-cormorant italic text-sm text-[#B9D5F2]/80">
            "In stillness, all creation dissolves into peace."
          </div>
        </div>

        {/* Header Block */}
        <div className="text-center max-w-3xl mb-12 scroll-reveal delay-100">
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.24em] text-[#EAF2F7] uppercase mb-3 glow-moonlight">
            SHIVA
          </h2>
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#C8A96B] uppercase mb-5 font-medium">
            THE MEDITATOR
          </p>
          <p className="font-cormorant text-xl sm:text-2xl italic text-[#B9D5F2]/85 tracking-[0.16em]">
            Stillness. Awareness. Transformation.
          </p>
        </div>

        {/* 2. Midground Visual Frame: Meditating Shiva Artwork (Moves 4px) */}
        <div
          className="relative w-full max-w-4xl aspect-16/10 md:aspect-16/9 rounded-sm overflow-hidden border border-[#B9D5F2]/20 shadow-[0_0_80px_rgba(7,17,31,0.9)] group scroll-reveal-img delay-200 transition-transform duration-700 ease-out"
          style={{
            transform: !isTouch
              ? `translate3d(${mouseOffset.x * 4}px, ${mouseOffset.y * 3}px, 0)`
              : undefined,
            willChange: 'transform',
          }}
        >
          <img
            src={shivaImg}
            alt="Lord Shiva seated in deep meditation amidst the Himalayan snow, peaceful countenance with crescent moon in jata"
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-104"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Atmospheric Scrims & Soft Rim Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-[#02050A]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,5,10,0.85)_100%)]" />

          {/* 3. Foreground Sacred Badges (Moves 7px for pronounced 3D depth) */}
          <div
            className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none transition-transform duration-500 ease-out"
            style={{
              transform: !isTouch
                ? `translate3d(${mouseOffset.x * 7}px, ${mouseOffset.y * 5}px, 0)`
                : undefined,
              willChange: 'transform',
            }}
          >
            <div className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#B9D5F2]/80 bg-[#02050A]/75 backdrop-blur-md px-4 py-2 border border-[#B9D5F2]/15 rounded-sm shadow-[0_4px_20px_rgba(2,5,10,0.8)]">
              DHYANA MUDRA · MEDITATIVE PRESENCE
            </div>
            <div className="font-cormorant text-base md:text-lg italic text-[#C8A96B] bg-[#02050A]/75 backdrop-blur-md px-4 py-1.5 border border-[#C8A96B]/20 rounded-sm shadow-[0_4px_20px_rgba(2,5,10,0.8)]">
              शान्ताकारं भुजगशयनम्
            </div>
          </div>
        </div>

        {/* Minimal Prose on Transcendence */}
        <div className="mt-12 max-w-2xl text-center scroll-reveal delay-300">
          <p className="font-sans-ui text-xs sm:text-sm md:text-base text-[#B9D5F2]/70 leading-relaxed font-light tracking-wide text-balance">
            Neither beginning nor end, neither form nor formlessness. Shiva represents the pure, unconditioned consciousness that abides unaffected behind the eternal dance of the cosmos.
          </p>
        </div>
      </div>
    </section>
  );
};
