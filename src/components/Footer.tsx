import React from 'react';
import { ArrowUp } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface FooterProps {
  onBeginAgain: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBeginAgain }) => {
  return (
    <footer className="relative w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-32 px-6 border-t border-[#B9D5F2]/10 flex flex-col items-center justify-center text-center">
      {/* Subtle deep Himalayan radial ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,23,38,0.6)_0%,rgba(2,5,10,0.98)_75%)] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Sacred Trishula */}
        <div className="text-3xl sm:text-4xl text-[#C8A96B] mb-5 select-none transition-transform duration-500 hover:scale-110 scroll-reveal">
          🔱
        </div>

        {/* Wordmark */}
        <div className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.28em] text-[#EAF2F7] uppercase mb-3 glow-moonlight scroll-reveal delay-100">
          MAHADEV
        </div>

        {/* Sacred Mantra */}
        <div className="font-cormorant text-lg sm:text-xl italic text-[#B9D5F2]/80 tracking-[0.2em] mb-12 scroll-reveal delay-200">
          ॐ नमः शिवाय
        </div>

        {/* 19. FINAL CREATOR SIGNATURE */}
        <div className="w-full flex flex-col items-center my-6 scroll-reveal delay-300">
          {/* Subtle thin separator line */}
          <div className="w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#B9D5F2]/20 to-transparent mb-5" />

          {/* Central Sacred Om */}
          <div className="text-2xl text-[#B9D5F2]/60 font-light select-none mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
            ॐ
          </div>

          {/* Artist's signature: by dhyey trivedi | hari om */}
          <p className="font-cormorant text-sm sm:text-base italic tracking-[0.22em] text-[#B9D5F2]/50 hover:text-[#B9D5F2]/80 transition-colors lowercase select-none">
            by dhyey trivedi | hari om
          </p>

          {/* Subtle thin separator line */}
          <div className="w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#B9D5F2]/20 to-transparent mt-5" />
        </div>

        {/* 20. RETURN TO SUMMIT CTA BUTTON (Subtly magnetic) */}
        <div className="mt-8 scroll-reveal delay-400">
          <MagneticButton
            onClick={onBeginAgain}
            cursorLabel="ASCEND"
            strength={8}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#B9D5F2]/20 hover:border-[#B9D5F2]/60 bg-[#071321]/40 hover:bg-[#071321] transition-all duration-300 font-cinzel text-[11px] tracking-[0.28em] text-[#EAF2F7] uppercase cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9D5F2]"
            aria-label="Begin again - Scroll to summit"
          >
            <span>BEGIN AGAIN</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#B9D5F2] group-hover:-translate-y-1 transition-transform duration-300" />
          </MagneticButton>
        </div>

        {/* Quiet Footnote */}
        <div className="mt-16 pt-8 border-t border-[#B9D5F2]/8 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans-ui text-[#B9D5F2]/35 tracking-wider">
          <div className="mb-2 sm:mb-0">
            Kailash Sanctuary · An Ode to Eternal Stillness
          </div>
          <div className="font-mono tabular-nums">
            Gangdise Mountains · 6638M
          </div>
        </div>
      </div>
    </footer>
  );
};
