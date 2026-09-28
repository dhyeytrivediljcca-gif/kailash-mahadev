import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'initial' | 'om-revealed' | 'progressing' | 'fading'>('initial');

  useEffect(() => {
    // 1. Stage sequence: 0-250ms black with faint glow -> om emerges
    const omTimer = setTimeout(() => {
      setStage('om-revealed');
    }, 250);

    // 2. Progress starts running from 0 -> 100% over ~2000ms
    const startProgressTimer = setTimeout(() => {
      setStage('progressing');
    }, 450);

    const startTime = Date.now();
    const duration = 2000; // 2 seconds smooth loading duration

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - (startTime + 450);
      if (elapsed > 0) {
        const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
        setProgress(rawProgress);

        if (rawProgress >= 100) {
          clearInterval(progressInterval);

          // Hold at 100% briefly, then smoothly transition into black / main hero
          setTimeout(() => {
            setStage('fading');
            setTimeout(() => {
              onComplete();
            }, 850);
          }, 250);
        }
      }
    }, 25);

    return () => {
      clearTimeout(omTimer);
      clearTimeout(startProgressTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02050A] text-[#EAF2F7] transition-opacity duration-900 ease-out select-none pointer-events-none ${
        stage === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Entering Kailash loading sequence"
    >
      {/* Subtle faint ambient central glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(185,213,242,0.12)_0%,rgba(11,23,38,0.35)_40%,transparent_75%)] pointer-events-none transition-opacity duration-1000 ease-out" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Sacred Om — Large, thin/elegant, softly illuminated, centered, minimal */}
        <div
          className={`text-6xl sm:text-7xl font-light text-[#EAF2F7] glow-moonlight select-none transition-all duration-1000 ease-out mb-7 ${
            stage === 'initial'
              ? 'opacity-0 scale-85 blur-[12px]'
              : stage === 'om-revealed' || stage === 'progressing'
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-105 blur-[4px]'
          }`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ॐ
        </div>

        {/* Status text: ENTERING KAILASH */}
        <div
          className={`font-cinzel text-xs sm:text-[13px] tracking-[0.38em] uppercase text-[#B9D5F2]/75 mb-6 transition-all duration-700 ease-out ${
            stage !== 'initial' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          ENTERING KAILASH
        </div>

        {/* Minimal Progress Line — Thin horizontal bar (0 -> 100%) */}
        <div
          className={`w-44 sm:w-52 h-[1px] bg-[#0C2035]/80 overflow-hidden relative mb-5 transition-opacity duration-700 ${
            stage !== 'initial' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-transparent via-[#B9D5F2]/80 to-[#C8A96B] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sacred Mantra Text: ॐ नमः शिवाय (Small typography, low opacity, atmospheric) */}
        <div
          className={`font-cormorant text-xs sm:text-sm italic tracking-[0.25em] text-[#B9D5F2]/45 transition-opacity duration-1000 ease-out ${
            stage !== 'initial' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ॐ नमः शिवाय
        </div>
      </div>
    </div>
  );
};
