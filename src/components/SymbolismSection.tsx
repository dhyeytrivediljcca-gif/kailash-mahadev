import React, { useState, useEffect } from 'react';
import { SACRED_SYMBOLS } from '../data/symbolism';

// Sacred mathematical angles around the central ॐ
// -90° (Top), -18° (Upper-Right), 54° (Lower-Right), 126° (Lower-Left), 198° (Upper-Left)
const SYMBOL_ANGLES: Record<string, number> = {
  'third-eye': -90,
  'crescent-moon': -18,
  'vasuki': 54,
  'damaru': 126,
  'trishula': 198,
};

export const SymbolismSection: React.FC = () => {
  // Single active state - ONLY null or symbol ID
  // SCROLL NEVER RESETS OR MODIFIES THIS STATE
  const [activeSymbolId, setActiveSymbolId] = useState<string | null>(null);
  const omClicks = React.useRef<number[]>([]);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  const activeSymbol = SACRED_SYMBOLS.find((s) => s.id === activeSymbolId) || null;

  const handleSymbolClick = (id: string) => {
    setActiveSymbolId((prev) => (prev === id ? null : id));
  };

  // Subtle Easter Egg: 3 clicks on central ॐ within 2.5 seconds
  const handleOmClick = () => {
    const now = Date.now();
    omClicks.current = [...omClicks.current.filter((t) => now - t < 2500), now];
    if (omClicks.current.length >= 3) {
      omClicks.current = [];
      setIsEasterEggActive(true);
      setTimeout(() => setIsEasterEggActive(false), 3000);
    }
  };

  // Keyboard Escape listener to collapse panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeSymbolId) {
        setActiveSymbolId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSymbolId]);

  return (
    <section
      id="symbolism"
      className="relative min-h-screen w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-36 px-6 md:px-16 flex flex-col justify-center border-t border-[#B9D5F2]/5"
    >
      {/* Ambient background celestial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#071321] rounded-full blur-[160px] pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#0C2035] rounded-full blur-[140px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B9D5F2]/10 text-xs tracking-[0.25em] text-[#B9D5F2]/60 uppercase scroll-reveal">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#C8A96B] tabular-nums">03</span>
            <span className="font-cinzel">SACRED ICONOGRAPHY</span>
          </div>
          <div className="font-sans-ui text-[#B9D5F2]/70 text-[11px] tracking-widest hidden sm:block">
            CLICK ANY SYMBOL FOR SACRED CONTEMPLATION
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal delay-100">
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[0.18em] text-[#EAF2F7] uppercase mb-3 glow-moonlight">
            SYMBOLISM
          </h2>
          <p className="font-cormorant text-lg sm:text-xl italic text-[#B9D5F2]/80 tracking-widest">
            Visual metaphors of transcendent consciousness
          </p>
        </div>

        {/* Main Composition: Central Constellation (Left) + Side Information Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ============================================================== */}
          {/* 1. SACRED CONSTELLATION: Central ॐ + Surrounding Shiva Symbols */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[420px] sm:min-h-[480px] scroll-reveal delay-200">
            {/* Concentric Celestial Guide Rings */}
            <div className="absolute w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] rounded-full border border-[#B9D5F2]/10 pointer-events-none" />
            <div className="absolute w-[210px] h-[210px] sm:w-[270px] sm:h-[270px] rounded-full border border-[#B9D5F2]/15 border-dashed pointer-events-none animate-[spin_90s_linear_infinite]" />

            {/* Central Sacred ॐ Anchor (Permanent Source with slow breathing pulse) */}
            <div
              onClick={handleOmClick}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#071321]/90 border border-[#B9D5F2]/30 flex flex-col items-center justify-center text-4xl sm:text-5xl text-[#B9D5F2] glow-moonlight animate-om-breathe shadow-[0_0_40px_rgba(185,213,242,0.25)] select-none cursor-pointer transition-all duration-500 hover:border-[#B9D5F2]/60"
              title="Pranava · Source of Sound"
              aria-label="Sacred Pranava Om"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOmClick();
              }}
            >
              <span>ॐ</span>
              <span className="text-[9px] font-cinzel tracking-[0.25em] text-[#C8A96B] uppercase mt-1">
                PRANAVA
              </span>

              {/* Subtle Easter Egg Awakening Moment */}
              {isEasterEggActive && (
                <>
                  <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(200,169,107,0.35)_0%,rgba(185,213,242,0.18)_50%,transparent_70%)] animate-pulse pointer-events-none" />
                  <div className="absolute -bottom-9 pointer-events-none animate-fade-in text-center whitespace-nowrap z-30">
                    <span className="font-cormorant text-sm sm:text-base italic text-[#C8A96B] tracking-[0.3em] drop-shadow-[0_0_12px_rgba(200,169,107,0.6)]">
                      ॐ नमः शिवाय · सर्वं शिवमयं
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Surrounding 5 Sacred Symbols arranged around the central ॐ */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {SACRED_SYMBOLS.map((symbol) => {
                const angleDeg = SYMBOL_ANGLES[symbol.id] ?? 0;
                const angleRad = (angleDeg * Math.PI) / 180;
                // Responsive radius
                const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 122 : 158;
                const x = Math.round(Math.cos(angleRad) * radius);
                const y = Math.round(Math.sin(angleRad) * radius);
                const isSelected = activeSymbolId === symbol.id;
                const hasActiveSymbol = activeSymbolId !== null;

                // Micro 3D perspective shifts on hover per sacred object
                const hoverTransformClass =
                  symbol.id === 'trishula'
                    ? 'group-hover:rotate-6 group-hover:scale-105'
                    : symbol.id === 'damaru'
                    ? 'group-hover:-rotate-12 group-hover:scale-105'
                    : symbol.id === 'crescent-moon'
                    ? 'group-hover:scale-110'
                    : symbol.id === 'vasuki'
                    ? 'group-hover:-translate-y-1 group-hover:scale-105'
                    : 'group-hover:scale-108';

                return (
                  <button
                    key={symbol.id}
                    onClick={() => handleSymbolClick(symbol.id)}
                    aria-expanded={isSelected}
                    aria-label={`${symbol.name}: ${symbol.tagline}. Click to ${isSelected ? 'collapse' : 'view'} details`}
                    data-cursor="symbol"
                    data-active={isSelected ? 'true' : 'false'}
                    className={`pointer-events-auto absolute transition-all duration-500 flex flex-col items-center cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9D5F2] ${
                      isSelected
                        ? 'scale-105 z-20 opacity-100'
                        : hasActiveSymbol
                        ? 'opacity-70 hover:opacity-100 hover:scale-103 z-10'
                        : isEasterEggActive
                        ? 'opacity-100 scale-103 glow-gold z-10'
                        : 'opacity-85 hover:opacity-100 hover:scale-103 z-10'
                    }`}
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0)`,
                    }}
                  >
                    {/* Active sacred pulse aura */}
                    {isSelected && (
                      <div className="absolute -inset-2.5 rounded-full border border-[#B9D5F2]/45 animate-pulse pointer-events-none" />
                    )}

                    {/* Circular Icon Node with 3D micro-movement */}
                    <div
                      className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-[#0C2035] border-2 border-[#B9D5F2] text-white shadow-[0_0_28px_rgba(185,213,242,0.55)]'
                          : 'bg-[#071321]/90 border border-[#B9D5F2]/20 text-[#B9D5F2]/80 group-hover:border-[#B9D5F2]/60 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(185,213,242,0.25)]'
                      }`}
                    >
                      <span className={`inline-block transition-transform duration-300 ease-out ${hoverTransformClass}`}>
                        {symbol.icon}
                      </span>
                      <div className="absolute inset-1 rounded-full border border-[#B9D5F2]/10 pointer-events-none" />
                    </div>

                    {/* Name Label */}
                    <span
                      className={`font-cinzel text-[10px] sm:text-[11px] tracking-wider uppercase mt-1.5 transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'text-[#B9D5F2] font-semibold glow-moonlight'
                          : 'text-[#B9D5F2]/60 group-hover:text-[#EAF2F7]'
                      }`}
                    >
                      {symbol.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. SIDE INFORMATION PANEL (Persists on Scroll, Smooth Crossfade) */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center scroll-reveal delay-300">
            {activeSymbol ? (
              <div
                className="w-full bg-[#071321]/85 border border-[#B9D5F2]/25 backdrop-blur-xl rounded-sm p-7 sm:p-9 text-left relative overflow-hidden shadow-[0_15px_50px_rgba(2,5,10,0.85)] transition-all duration-300 ease-out"
              >
                {/* Atmospheric Soft Rim Glow inside panel */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B9D5F2]/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Coordinated Inner Content Animation (Prevents outer container jumping) */}
                <div key={activeSymbol.id} className="animate-panel-content-in relative z-10">
                  {/* Top Row: Symbol Icon, Name, Subtitle */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#B9D5F2]/15">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#0C2035] border border-[#B9D5F2]/40 flex items-center justify-center text-2xl text-[#B9D5F2] shadow-[0_0_20px_rgba(185,213,242,0.3)] shrink-0">
                        {activeSymbol.icon}
                      </div>
                      <div>
                        <h3 className="font-cinzel text-xl sm:text-2xl font-semibold tracking-wider text-[#EAF2F7] uppercase glow-moonlight">
                          {activeSymbol.name}
                        </h3>
                        <p className="font-cormorant text-xs sm:text-sm italic text-[#C8A96B] tracking-wide mt-0.5">
                          {activeSymbol.sanskrit} · {activeSymbol.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans-ui text-xs sm:text-sm text-[#B9D5F2]/85 leading-relaxed font-light mt-5 mb-6 text-balance">
                    {activeSymbol.description}
                  </p>

                  {/* Threefold Principles */}
                  <div className="space-y-2.5 pt-4 border-t border-[#B9D5F2]/10">
                    <div className="font-cinzel text-[11px] tracking-[0.25em] text-[#C8A96B] uppercase font-semibold">
                      THREEFOLD PRINCIPLES
                    </div>
                    <div className="flex flex-col space-y-2">
                      {activeSymbol.aspects.map((aspect, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-[#EAF2F7]/90 font-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B9D5F2]/70 shrink-0 shadow-[0_0_6px_#B9D5F2]" />
                          <span>{aspect}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: COLLAPSE × Button */}
                  <div className="mt-8 pt-4 border-t border-[#B9D5F2]/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#B9D5F2]/40 uppercase tracking-widest">
                      SACRED METAPHOR ACTIVE
                    </span>

                    <button
                      onClick={() => setActiveSymbolId(null)}
                      data-cursor="CLOSE"
                      className="group flex items-center gap-1.5 text-[10px] font-cinzel tracking-widest text-[#B9D5F2]/80 hover:text-white px-3.5 py-1.5 rounded-full border border-[#B9D5F2]/25 hover:border-[#B9D5F2]/60 bg-[#0C2035]/60 hover:bg-[#0C2035] transition-all duration-300 cursor-pointer"
                      aria-label="Collapse information panel"
                    >
                      <span>COLLAPSE</span>
                      <span className="text-[#C8A96B] group-hover:rotate-90 transition-transform duration-300">×</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Serene resting constellation state */
              <div className="w-full bg-[#071321]/30 border border-[#B9D5F2]/10 rounded-sm p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden transition-all duration-500">
                <div className="w-14 h-14 rounded-full border border-[#B9D5F2]/20 flex items-center justify-center text-2xl text-[#C8A96B] mb-4">
                  🔱
                </div>
                <h3 className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.25em] text-[#EAF2F7] uppercase mb-2">
                  SACRED CONSTELLATION
                </h3>
                <p className="font-cormorant text-sm sm:text-base italic text-[#B9D5F2]/60 max-w-xs leading-relaxed mb-6">
                  Click any sacred symbol in the celestial circle to contemplate its transcendent meaning.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#B9D5F2]/40 uppercase">
                  <span>5 SACRED ATTRIBUTES</span>
                  <span>·</span>
                  <span>PERSISTS ON SCROLL</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
