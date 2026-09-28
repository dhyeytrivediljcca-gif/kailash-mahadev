import React from 'react';
import cosmicNightImg from '../assets/images/kailash_cosmic_night_1790521134754.jpg';

export const NightKailash: React.FC = () => {
  return (
    <section
      id="night"
      className="relative min-h-screen w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-36 px-6 md:px-16 flex flex-col justify-center border-t border-[#B9D5F2]/5"
    >
      {/* Deep Cosmos Starlit Canvas Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={cosmicNightImg}
          alt="Sacred Mount Kailash beneath the celestial Himalayan Milky Way starry cosmos"
          className="w-full h-full object-cover object-center opacity-65 transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/60 to-[#02050A]/80" />
        <div className="absolute inset-0 bg-[#071321]/30 mix-blend-multiply" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Section Index */}
        <div className="w-full flex items-center justify-between mb-16 pb-4 border-b border-[#B9D5F2]/10 text-xs tracking-[0.25em] text-[#B9D5F2]/60 uppercase scroll-reveal">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#C8A96B] tabular-nums">05</span>
            <span className="font-cinzel">MIDNIGHT CONSTELLATIONS</span>
          </div>
          <div className="font-cinzel text-[11px] tracking-widest text-[#B9D5F2]/80">
            SILENCE OF KAILASH
          </div>
        </div>

        {/* Small Crescent Moon Icon */}
        <div className="text-3xl text-[#B9D5F2] glow-moonlight mb-6 select-none opacity-85 scroll-reveal delay-100">
          ☾
        </div>

        {/* Centered Title */}
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.24em] text-[#EAF2F7] uppercase mb-6 glow-moonlight scroll-reveal delay-200">
          NIGHT AT KAILASH
        </h2>

        {/* Sacred Mantra */}
        <div className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-[#B9D5F2] tracking-[0.22em] mb-10 glow-moonlight scroll-reveal delay-300">
          ॐ नमः शिवाय
        </div>

        {/* Minimal Contemplative Reflection */}
        <p className="font-sans-ui text-xs sm:text-sm md:text-base text-[#B9D5F2]/70 tracking-widest max-w-xl leading-relaxed mb-8 font-light text-balance scroll-reveal delay-400">
          Under the icy canopy of billions of stars, the peak of Kailash rests in absolute silence. Time ceases to press forward, and the mind dissolves into primordial peace.
        </p>

        {/* Subtle Atmospheric Coordinates */}
        <div className="flex items-center gap-6 text-[11px] font-mono tracking-widest text-[#B9D5F2]/40 uppercase pt-4 border-t border-[#B9D5F2]/10 scroll-reveal delay-500">
          <span>ALTITUDE: 6638M</span>
          <span>·</span>
          <span>CELESTIAL TRANSCENDENCE</span>
          <span>·</span>
          <span>ETERNAL DHYANA</span>
        </div>
      </div>
    </section>
  );
};
