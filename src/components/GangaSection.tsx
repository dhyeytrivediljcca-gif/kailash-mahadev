import React from 'react';
import gangaImg from '../assets/images/ganga_celestial_flow_1790521123322.jpg';

export const GangaSection: React.FC = () => {
  return (
    <section
      id="ganga"
      className="relative min-h-screen w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-36 px-6 md:px-16 flex flex-col justify-center border-t border-[#B9D5F2]/5"
    >
      {/* Luminous turquoise and deep aqua background glows */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[#071321] rounded-full blur-[140px] pointer-events-none opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#0C2035] rounded-full blur-[120px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Index */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B9D5F2]/10 text-xs tracking-[0.25em] text-[#B9D5F2]/60 uppercase scroll-reveal">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#C8A96B] tabular-nums">04</span>
            <span className="font-cinzel">CELESTIAL DESCENT</span>
          </div>
          <div className="font-cormorant italic text-sm text-[#B9D5F2]/80">
            गङ्गातरङ्गरमणीयजटाकलापं
          </div>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 scroll-reveal delay-100">
            <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[0.18em] text-[#EAF2F7] uppercase mb-4 glow-moonlight">
              GANGA
            </h2>
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#C8A96B] uppercase font-medium">
              THE FLOW OF LIFE
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right scroll-reveal delay-200">
            <p className="font-cormorant text-lg sm:text-xl italic text-[#B9D5F2]/90">
              "Grace descending from infinite space to nurture the mortal earth."
            </p>
          </div>
        </div>

        {/* Visual Showcase: Celestial Ganga Canyon */}
        <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-sm overflow-hidden border border-[#B9D5F2]/15 group shadow-[0_20px_60px_rgba(2,5,10,0.85)] mb-12 scroll-reveal-img delay-200">
          <img
            src={gangaImg}
            alt="Celestial Ganga river cascading through misty Himalayan ice canyon with starlight reflections"
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/25 to-transparent" />

          {/* Moving Ethereal Water Wave Ribbons */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen animate-pulse"
            style={{
              background:
                'linear-gradient(45deg, transparent 40%, rgba(185, 213, 242, 0.2) 50%, transparent 60%)',
            }}
          />

          {/* Quiet Overlay Footer */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
            <div className="max-w-md">
              <span className="font-cinzel text-[11px] tracking-[0.25em] text-[#B9D5F2]/90 uppercase bg-[#02050A]/70 backdrop-blur-sm px-3.5 py-1.5 border border-[#B9D5F2]/20 rounded-sm">
                GANGA DHARA · THE BEARER OF THE CURRENT
              </span>
            </div>
            <div className="text-[11px] font-sans-ui tracking-widest text-[#B9D5F2]/70 uppercase">
              Himalayan Glacial Streams · Bhagirathi & Alaknanda
            </div>
          </div>
        </div>

        {/* Contemplative Text Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-[#B9D5F2]/10 scroll-reveal delay-300">
          <div>
            <h3 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#C8A96B] uppercase mb-3">
              THE GENTLE ARREST
            </h3>
            <p className="font-sans-ui text-xs sm:text-sm text-[#B9D5F2]/70 leading-relaxed font-light">
              According to ancient contemplation, when the celestial river descended with overwhelming celestial momentum, Mahadev received her torrent in his matted hair (Jata), calming her fury and letting her emerge as crystal life-giving streams for all beings.
            </p>
          </div>

          <div>
            <h3 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#C8A96B] uppercase mb-3">
              PURITY AND ETERNAL FLUIDITY
            </h3>
            <p className="font-sans-ui text-xs sm:text-sm text-[#B9D5F2]/70 leading-relaxed font-light">
              In spiritual philosophy, Ganga signifies the flow of Divine Grace (Anugraha)—ever renewing, washing away spiritual impurities, and reminding seekers that consciousness must remain fluid yet anchored in quiet mountain resolve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
