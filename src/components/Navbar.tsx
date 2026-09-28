import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import kailashImg from '../assets/images/kailash_north_face_1790521112486.jpg';
import shivaImg from '../assets/images/shiva_meditator_twilight_1790521100363.jpg';
import gangaImg from '../assets/images/ganga_celestial_flow_1790521123322.jpg';
import nightImg from '../assets/images/kailash_cosmic_night_1790521134754.jpg';
import peakImg from '../assets/images/kailash_sacred_peak_1790521087073.jpg';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onTrishulaClick?: () => void;
  visible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onTrishulaClick,
  visible = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPreview, setHoveredPreview] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Scroll Progress (0 to 100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      // Active Section Spy
      const sections = ['hero', 'kailash', 'shiva', 'symbolism', 'ganga', 'night', 'meditation'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { number: '01', label: 'KAILASH', id: 'kailash', previewImg: kailashImg, subtitle: 'The sacred 6638m axis of the world' },
    { number: '02', label: 'MAHADEV', id: 'shiva', previewImg: shivaImg, subtitle: 'The meditator beyond form and void' },
    { number: '03', label: 'SYMBOLISM', id: 'symbolism', previewImg: peakImg, subtitle: 'Trishula, Chandra, Serpent, and Damaru' },
    { number: '04', label: 'GANGA', id: 'ganga', previewImg: gangaImg, subtitle: 'Celestial descent through sacred mists' },
    { number: '05', label: 'NIGHT', id: 'night', previewImg: nightImg, subtitle: 'Cosmic silence beneath the Milky Way' },
    { number: '06', label: 'MEDITATION', id: 'meditation', previewImg: shivaImg, subtitle: 'Pranayama & the eternal pulse of stillness' },
  ];

  const handleItemClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* 13. Minimal 1.5px Scroll Progress Line at Top of Viewport */}
      <div className="fixed top-0 left-0 right-0 h-[1.5px] z-50 pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#B9D5F2]/40 via-[#B9D5F2] to-[#C8A96B] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ease-out px-6 md:px-12 flex items-center justify-between pointer-events-none ${
          !visible
            ? 'opacity-0 pointer-events-none -translate-y-4'
            : isScrolled
            ? 'opacity-100 bg-[#02050A]/85 backdrop-blur-xl border-b border-[#B9D5F2]/10 py-3.5 shadow-[0_8px_32px_rgba(2,5,10,0.85)] translate-y-0'
            : 'opacity-100 bg-transparent py-6 md:py-8 translate-y-0'
        }`}
      >
        {/* LEFT: Brand Wordmark + Interactive Trishula Logo */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('hero')}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
            aria-label="Mahadev - Return to summit"
          >
            <span
              onClick={(e) => {
                if (onTrishulaClick) {
                  e.stopPropagation();
                  onTrishulaClick();
                }
              }}
              title="About Trishula"
              className="text-[#C8A96B] text-sm group-hover:scale-110 transition-transform duration-300 p-0.5"
            >
              🔱
            </span>
            <span className="font-cinzel text-xs md:text-sm font-semibold tracking-[0.28em] text-[#EAF2F7]/90 group-hover:text-white transition-colors duration-300">
              MAHADEV
            </span>
          </button>
        </div>

        {/* CENTER: Navigation Links with Active Indicator & Clean Spacing */}
        <nav className="hidden lg:flex pointer-events-auto items-center gap-8 xl:gap-10 text-[11px] font-medium tracking-[0.24em] font-cinzel">
          {[
            { id: 'kailash', label: 'KAILASH' },
            { id: 'shiva', label: 'MAHADEV' },
            { id: 'symbolism', label: 'SYMBOLISM' },
            { id: 'ganga', label: 'GANGA' },
            { id: 'night', label: 'NIGHT' },
            { id: 'meditation', label: 'MEDITATION' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 nav-underline-center transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#EAF2F7] font-semibold glow-moonlight'
                    : 'text-[#B9D5F2]/60 hover:text-[#EAF2F7]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C8A96B] shadow-[0_0_6px_#C8A96B] transition-opacity duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Perfectly Balanced Luxury EXPLORE Pill (Magnetic micro-interaction) */}
        <div className="pointer-events-auto flex items-center">
          <MagneticButton
            onClick={() => setIsMenuOpen(true)}
            cursorLabel="EXPLORE"
            strength={7}
            className="group relative flex items-center gap-2.5 px-4 py-1.5 rounded-full font-cinzel text-[11px] tracking-[0.25em] text-[#EAF2F7] bg-[#071321]/50 hover:bg-[#0C2035]/80 border border-[#B9D5F2]/20 hover:border-[#B9D5F2]/60 backdrop-blur-md transition-all duration-300 shadow-[0_2px_15px_rgba(2,5,10,0.5)] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9D5F2]"
            aria-label="Open exploration menu"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3 h-3 text-[#C8A96B] group-hover:translate-x-1.5 transition-all duration-300 ease-out" />
          </MagneticButton>
        </div>
      </header>

      {/* FULLSCREEN CINEMATIC NAVIGATION OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-[#02050A] transition-all duration-700 ease-in-out flex flex-col justify-between p-8 md:p-16 overflow-hidden ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'opacity-0 pointer-events-none scale-105'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Cinematic exploration navigation"
      >
        {/* Dynamic Background Image Preview on Hover */}
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
              hoveredPreview === item.id ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms',
            }}
          >
            <img
              src={item.previewImg}
              alt=""
              className="w-full h-full object-cover object-center filter saturate-75 contrast-110 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02050A] via-[#02050A]/75 to-[#02050A]/85" />
          </div>
        ))}

        {/* Ambient Cosmic Radial Blur */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#071321] rounded-full blur-[160px] pointer-events-none opacity-50" />

        {/* Top bar inside menu */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#C8A96B] text-lg">🔱</span>
            <span className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-[#EAF2F7]/90">
              KAILASH SANCTUARY · JOURNEY
            </span>
          </div>

          <MagneticButton
            onClick={() => setIsMenuOpen(false)}
            cursorLabel="CLOSE"
            strength={6}
            className="flex items-center gap-2 text-[11px] tracking-[0.25em] font-cinzel text-[#B9D5F2]/80 hover:text-white px-4 py-1.5 rounded-full border border-[#B9D5F2]/20 hover:border-[#B9D5F2]/60 bg-[#071321]/50 backdrop-blur-md transition-all duration-300 cursor-pointer"
            aria-label="Close menu"
          >
            <span>CLOSE</span>
            <X className="w-3.5 h-3.5 text-[#B9D5F2]" />
          </MagneticButton>
        </div>

        {/* Center: Interactive Nav Menu with Real-Time Previews */}
        <nav className="relative z-10 my-auto flex flex-col space-y-4 md:space-y-6 max-w-3xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setHoveredPreview(item.id)}
              onMouseLeave={() => setHoveredPreview(null)}
              className="group flex items-baseline gap-6 md:gap-10 text-left transition-transform duration-300 hover:translate-x-4 cursor-pointer focus:outline-none"
            >
              <span className="font-mono text-xs md:text-sm tracking-widest text-[#B9D5F2]/35 group-hover:text-[#C8A96B] transition-colors tabular-nums">
                {item.number}
              </span>
              <div className="flex flex-col">
                <span className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.16em] text-[#EAF2F7] group-hover:text-[#B9D5F2] group-hover:glow-moonlight transition-all duration-300">
                  {item.label}
                </span>
                <span className="font-sans-ui text-[11px] tracking-[0.2em] text-[#B9D5F2]/50 uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.subtitle}
                </span>
              </div>
              <span className="text-sm text-[#C8A96B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center">
                →
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom meta inside menu */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs tracking-widest text-[#B9D5F2]/45 border-t border-[#B9D5F2]/10 pt-6">
          <div className="font-cormorant italic text-sm text-[#B9D5F2]/70 mb-2 sm:mb-0">
            "Where silence becomes meditation, and the mountains become prayer."
          </div>
          <div className="font-cinzel tracking-[0.22em] text-[#C8A96B]/80 text-[11px]">
            ॐ नमः शिवाय · 6638M
          </div>
        </div>
      </div>
    </>
  );
};
