import React, { useRef } from 'react';
import kailashNorthFaceImg from '../assets/images/kailash_north_face_1790521112486.jpg';

export const KailashSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="kailash"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-36 px-6 md:px-16 flex flex-col justify-center border-t border-[#B9D5F2]/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#071321] rounded-full blur-[130px] pointer-events-none opacity-60" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#0C2035] rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B9D5F2]/10 text-xs tracking-[0.25em] text-[#B9D5F2]/60 uppercase scroll-reveal">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#C8A96B] tabular-nums">01</span>
            <span className="font-cinzel">SACRED GEOGRAPHY</span>
          </div>
          <div className="font-mono tabular-nums text-[#B9D5F2]/80">
            31.0674° N, 81.3119° E
          </div>
        </div>

        {/* Massive Main Heading & Elevation Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 scroll-reveal delay-100">
            <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[0.18em] text-[#EAF2F7] uppercase mb-4 glow-moonlight">
              KAILASH
            </h2>
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#C8A96B] uppercase font-medium">
              THE MOUNTAIN BEYOND ORDINARY
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end scroll-reveal delay-200">
            <div className="flex items-baseline gap-2 text-right">
              <span className="font-cinzel text-6xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#B9D5F2]/90 glow-moonlight tabular-nums">
                6638
              </span>
              <span className="font-cinzel text-xl sm:text-2xl text-[#C8A96B] tracking-widest font-normal">
                M
              </span>
            </div>
            <span className="text-[11px] font-sans-ui tracking-[0.25em] uppercase text-[#B9D5F2]/50 mt-1">
              Himalayan Gangdise Summit Elevation
            </span>
          </div>
        </div>

        {/* Visual Frame: Mount Kailash North Face */}
        <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-sm overflow-hidden mb-12 border border-[#B9D5F2]/15 group shadow-[0_20px_60px_rgba(2,5,10,0.9)] scroll-reveal-img delay-300">
          <img
            src={kailashNorthFaceImg}
            alt="North face granite striations and pristine glaciers of Mount Kailash"
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/30 to-transparent" />
          <div className="absolute inset-0 bg-[#071321]/20 pointer-events-none mix-blend-color" />

          {/* Quiet bottom overlay detail */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
            <div className="max-w-md">
              <p className="font-cormorant text-lg sm:text-xl italic text-[#EAF2F7]/95 tracking-wide leading-relaxed">
                "The Himalayas have long been associated with silence, contemplation and spiritual journeys."
              </p>
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#B9D5F2]/80 uppercase bg-[#02050A]/70 backdrop-blur-md px-3.5 py-1.5 border border-[#B9D5F2]/20 rounded-sm">
              Source of 4 Sacred Rivers · Lake Manasarovar
            </div>
          </div>
        </div>

        {/* Minimal Contextual Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-6 border-t border-[#B9D5F2]/10 text-xs sm:text-sm scroll-reveal delay-400">
          <div>
            <h3 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#C8A96B] uppercase mb-2">
              AXIS OF STILLNESS
            </h3>
            <p className="font-sans-ui text-[#B9D5F2]/70 leading-relaxed font-light">
              Revered across ancient traditions as the terrestrial center of cosmic harmony (Mount Meru), untouched by mountaineers out of deep reverence for its sacred silence.
            </p>
          </div>

          <div>
            <h3 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#C8A96B] uppercase mb-2">
              THE FOUR WATERS
            </h3>
            <p className="font-sans-ui text-[#B9D5F2]/70 leading-relaxed font-light">
              Its glacial basin feeds the lifeline waterways of Asia: the Indus, the Brahmaputra, the Karnali (Ganges tributary), and the Sutlej.
            </p>
          </div>

          <div>
            <h3 className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#C8A96B] uppercase mb-2">
              THE SILENT PARIKRAMA
            </h3>
            <p className="font-sans-ui text-[#B9D5F2]/70 leading-relaxed font-light">
              For centuries, pilgrims circumambulate the 52-kilometer mountain path in silent contemplation, surrendering ego into the eternal Himalayan winds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
