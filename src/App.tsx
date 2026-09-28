/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { KailashSection } from './components/KailashSection';
import { ShivaSection } from './components/ShivaSection';
import { SymbolismSection } from './components/SymbolismSection';
import { GangaSection } from './components/GangaSection';
import { NightKailash } from './components/NightKailash';
import { MeditationSection } from './components/MeditationSection';
import { Footer } from './components/Footer';
import { useLenis } from './hooks/useLenis';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollTo } = useLenis();

  // Cinematic scroll reveal observer
  useScrollReveal([isLoading]);

  const handleNavigate = (sectionId: string) => {
    scrollTo(`#${sectionId}`);
  };

  const handleBeginAgain = () => {
    scrollTo(0);
  };

  return (
    <div className="relative min-h-screen bg-[#02050A] text-[#EAF2F7] selection:bg-[#B9D5F2]/20 selection:text-white overflow-x-hidden">
      {/* Subtle 2.5% Film-Grain Noise Texture across the entire Kailash canvas */}
      <div className="fixed inset-0 pointer-events-none z-30 bg-noise opacity-90" aria-hidden="true" />

      {/* Cinematic Custom Cursor (Desktop only, subtle) */}
      <CustomCursor />

      {/* Atmospheric Navigation Bar — Only revealed after OM intro completes (Zero audio controls) */}
      <Navbar
        onNavigate={handleNavigate}
        visible={!isLoading}
      />

      {/* Initial Cinematic OM Ritual Loading Journey (Triggers on every page refresh) */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Continuous Journey */}
      <main className="relative flex flex-col w-full">
        {/* 1. Hero Section — Pure Typography-Focused Cinematic Opening */}
        <Hero onEnter={() => handleNavigate('kailash')} isReady={!isLoading} />

        {/* 2. Kailash Landscape — 6638m */}
        <KailashSection />

        {/* 3. Shiva — The Meditator */}
        <ShivaSection />

        {/* 4. Symbolism — Interactive Metaphors */}
        <SymbolismSection />

        {/* 5. Ganga — The Flow of Life */}
        <GangaSection />

        {/* 6. Night at Kailash — Celestial Silence */}
        <NightKailash />

        {/* 7. Meditation — Interactive Breath & Presence */}
        <MeditationSection />

        {/* 8. Footer — Return & Begin Again */}
        <Footer onBeginAgain={handleBeginAgain} />
      </main>
    </div>
  );
}
