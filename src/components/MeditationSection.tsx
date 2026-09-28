import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize2, X, RotateCcw } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Stillness';
type DurationOption = 'free' | 30 | 60;

export const MeditationSection: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const [duration, setDuration] = useState<DurationOption>('free');
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const phaseTimerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);

  // 4s Inhale -> 2s Hold -> 4s Exhale -> 2s Stillness cycle
  const phases: { name: BreathPhase; duration: number; sanskrit: string }[] = [
    { name: 'Inhale', duration: 4000, sanskrit: 'पूरक · PURAKA' },
    { name: 'Hold', duration: 2000, sanskrit: 'कुम्भक · KUMBHAKA' },
    { name: 'Exhale', duration: 4000, sanskrit: 'रेचक · RECHAKA' },
    { name: 'Stillness', duration: 2000, sanskrit: 'शून्य · SHUNYATA' },
  ];

  // Handle Breathing Cycles
  useEffect(() => {
    if (!isActive) {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      return;
    }

    let currentPhaseIndex = 0;

    const runPhase = () => {
      const current = phases[currentPhaseIndex];
      setBreathPhase(current.name);

      phaseTimerRef.current = window.setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        if (currentPhaseIndex === 0) {
          setCycleCount((prev) => prev + 1);
        }
        runPhase();
      }, current.duration);
    };

    runPhase();

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [isActive]);

  // Handle Countdown Timer for 30s / 60s
  useEffect(() => {
    if (!isActive || duration === 'free') {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      return;
    }

    countdownTimerRef.current = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          setIsActive(false);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [isActive, duration]);

  // Handle Escape key to exit immersive mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isImmersive) {
        setIsImmersive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImmersive]);

  const startMeditation = (selectedDuration: DurationOption = duration, openImmersive: boolean = false) => {
    setIsCompleted(false);
    setCycleCount(0);
    setDuration(selectedDuration);
    if (selectedDuration !== 'free') {
      setSecondsRemaining(selectedDuration);
    } else {
      setSecondsRemaining(null);
    }
    setIsActive(true);
    if (openImmersive) {
      setIsImmersive(true);
    }
  };

  const toggleMeditation = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      startMeditation(duration, false);
    }
  };

  const currentPhaseData = phases.find((p) => p.name === breathPhase) || phases[0];

  return (
    <section
      id="meditation"
      className="relative min-h-screen w-full bg-[#02050A] text-[#EAF2F7] overflow-hidden py-24 md:py-36 px-6 md:px-16 flex flex-col justify-center items-center border-t border-[#B9D5F2]/5"
    >
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#071321] rounded-full blur-[160px] pointer-events-none opacity-60" />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="w-full flex items-center justify-between mb-16 pb-4 border-b border-[#B9D5F2]/10 text-xs tracking-[0.25em] text-[#B9D5F2]/60 uppercase scroll-reveal">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#C8A96B] tabular-nums">06</span>
            <span className="font-cinzel">PRANAYAMA & DHYANA</span>
          </div>
          <div className="font-mono text-[#B9D5F2]/70 tabular-nums">
            STILLNESS PROTOCOL
          </div>
        </div>

        {/* Section Title */}
        <div className="scroll-reveal delay-100">
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[0.2em] text-[#EAF2F7] uppercase mb-3 glow-moonlight">
            MEDITATION
          </h2>
          <p className="font-cormorant text-lg sm:text-xl italic text-[#B9D5F2]/80 tracking-widest mb-8">
            Return to the breath, anchored in the silence of Kailash
          </p>

          {/* Duration Selector Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#071321]/60 border border-[#B9D5F2]/15 backdrop-blur-sm mb-8">
            {(['free', 30, 60] as DurationOption[]).map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setDuration(opt);
                  if (isActive) {
                    startMeditation(opt, false);
                  }
                }}
                className={`px-4 py-1.5 rounded-full font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  duration === opt
                    ? 'bg-[#B9D5F2]/20 text-[#EAF2F7] font-semibold border border-[#B9D5F2]/40 shadow-[0_0_15px_rgba(185,213,242,0.2)]'
                    : 'text-[#B9D5F2]/50 hover:text-[#B9D5F2] border border-transparent'
                }`}
              >
                {opt === 'free' ? 'FLOW' : `${opt}S DHYANA`}
              </button>
            ))}
          </div>
        </div>

        {/* Breathing Circle Visualizer */}
        <div className="relative my-8 flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 scroll-reveal delay-200">
          {/* Outer pulsed guide ring */}
          <div
            className={`absolute inset-0 rounded-full border border-[#B9D5F2]/20 transition-all duration-1000 ease-in-out ${
              isActive && breathPhase === 'Inhale'
                ? 'scale-125 border-[#B9D5F2]/50 shadow-[0_0_60px_rgba(185,213,242,0.3)]'
                : isActive && breathPhase === 'Exhale'
                ? 'scale-90 border-[#B9D5F2]/10'
                : 'scale-100 border-[#B9D5F2]/20'
            }`}
          />

          {/* Secondary celestial orbit */}
          <div
            className={`absolute -inset-4 rounded-full border border-[#B9D5F2]/10 border-dashed pointer-events-none transition-transform duration-1000 ${
              isActive ? 'animate-[spin_40s_linear_infinite]' : ''
            }`}
          />

          {/* Glowing Aura Disk */}
          <div
            className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#071321] via-[#0C2035] to-[#02050A] border border-[#B9D5F2]/30 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-[0_0_50px_rgba(12,32,53,0.8)] ${
              isActive && (breathPhase === 'Inhale' || breathPhase === 'Hold')
                ? 'scale-115 shadow-[0_0_80px_rgba(185,213,242,0.4)] border-[#B9D5F2]/60'
                : isActive && breathPhase === 'Exhale'
                ? 'scale-85 opacity-70'
                : 'scale-100 animate-breathe'
            }`}
          >
            {/* Center Sacred Om */}
            <div className="text-5xl sm:text-6xl text-[#B9D5F2] font-light glow-moonlight mb-2 select-none">
              ॐ
            </div>
            <div className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C8A96B] font-semibold">
              {isActive ? breathPhase : 'STILLNESS'}
            </div>
            {isActive && (
              <div className="font-cormorant text-[11px] italic text-[#B9D5F2]/60 tracking-wider mt-0.5">
                {currentPhaseData.sanskrit}
              </div>
            )}
          </div>
        </div>

        {/* Sacred Mantra */}
        <div className="font-cormorant text-2xl sm:text-3xl italic text-[#B9D5F2] tracking-widest my-3 scroll-reveal delay-300">
          ॐ नमः शिवाय
        </div>

        {/* Interactive Actions Grid */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 scroll-reveal delay-400">
          {/* Primary Toggle Button */}
          <MagneticButton
            onClick={toggleMeditation}
            cursorLabel={isActive ? 'PAUSE' : 'BREATHE'}
            strength={8}
            className="flex items-center gap-3 px-8 py-3 bg-[#071321]/70 hover:bg-[#0C2035] border border-[#B9D5F2]/25 hover:border-[#B9D5F2]/60 rounded-full font-cinzel text-xs tracking-[0.25em] text-[#EAF2F7] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(185,213,242,0.1)] hover:shadow-[0_0_30px_rgba(185,213,242,0.25)] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9D5F2]"
            aria-label={isActive ? 'Pause meditation breathing exercise' : 'Begin meditation breathing exercise'}
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>PAUSE STILLNESS</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#B9D5F2]" />
                <span>BEGIN BREATHING</span>
              </>
            )}
          </MagneticButton>

          {/* Fullscreen Immersive Meditation Trigger */}
          <MagneticButton
            onClick={() => startMeditation(duration, true)}
            cursorLabel="EXPAND"
            strength={8}
            className="flex items-center gap-2.5 px-6 py-3 bg-transparent hover:bg-[#B9D5F2]/5 border border-[#B9D5F2]/20 hover:border-[#B9D5F2]/50 rounded-full font-cinzel text-xs tracking-[0.25em] text-[#B9D5F2] uppercase transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9D5F2]"
            aria-label="Enter Immersive Fullscreen Meditation"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>ENTER IMMERSIVE MEDITATION</span>
          </MagneticButton>
        </div>

        {/* Live Session Stats */}
        {isActive && (
          <div className="mt-4 flex items-center gap-6 font-mono text-xs text-[#B9D5F2]/60 tracking-widest tabular-nums animate-fade-in">
            <span>Completed Cycles: {cycleCount}</span>
            {secondsRemaining !== null && (
              <>
                <span>·</span>
                <span className="text-[#C8A96B] font-semibold">Remaining: {secondsRemaining}s</span>
              </>
            )}
          </div>
        )}

        {isCompleted && !isActive && (
          <div className="mt-4 font-cinzel text-xs tracking-[0.25em] text-[#C8A96B] uppercase animate-fade-in flex items-center gap-2">
            <span>Dhyana Session Completed · Peace Prevails</span>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* FULLSCREEN IMMERSIVE MEDITATION SANCTUARY (Focused Experience) */}
      {/* ============================================================== */}
      <div
        className={`fixed inset-0 z-50 bg-[#02050A]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-14 overflow-hidden transition-all duration-700 ease-in-out ${
          isImmersive ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Immersive Kailash Meditation Sanctuary"
      >
        {/* Soft Cosmic Depth Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#071321] rounded-full blur-[180px] pointer-events-none opacity-60" />

        {/* Top Header inside Immersive Mode */}
        <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-[#C8A96B] text-lg">ॐ</span>
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#EAF2F7]/90 uppercase">
              IMMERSIVE DHYANA · KAILASH SANCTUARY
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Session Mode Switcher in Immersive Mode */}
            <div className="hidden sm:inline-flex items-center gap-1.5 p-1 rounded-full bg-[#071321]/80 border border-[#B9D5F2]/15">
              {(['free', 30, 60] as DurationOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => startMeditation(opt, true)}
                  className={`px-3 py-1 rounded-full font-cinzel text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                    duration === opt
                      ? 'bg-[#B9D5F2]/25 text-[#EAF2F7] font-semibold border border-[#B9D5F2]/40'
                      : 'text-[#B9D5F2]/40 hover:text-[#B9D5F2]'
                  }`}
                >
                  {opt === 'free' ? 'FLOW' : `${opt}S`}
                </button>
              ))}
            </div>

            {/* EXIT Button */}
            <MagneticButton
              onClick={() => setIsImmersive(false)}
              cursorLabel="EXIT"
              strength={6}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B9D5F2]/20 hover:border-[#B9D5F2]/60 bg-[#071321]/60 hover:bg-[#0C2035] font-cinzel text-[11px] tracking-[0.25em] text-[#EAF2F7] uppercase transition-all duration-300 cursor-pointer"
              aria-label="Exit immersive meditation"
            >
              <span>EXIT</span>
              <X className="w-3.5 h-3.5 text-[#B9D5F2]" />
            </MagneticButton>
          </div>
        </div>

        {/* Center: Majestic Full-Scale Breath Visualizer */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          {/* Subtle Outer Horizon Aura */}
          <div
            className={`relative flex items-center justify-center w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] transition-all duration-1000 ${
              isActive && breathPhase === 'Inhale'
                ? 'scale-110'
                : isActive && breathPhase === 'Exhale'
                ? 'scale-95'
                : 'scale-100'
            }`}
          >
            {/* Outermost Thin Sacred Ring */}
            <div
              className={`absolute inset-0 rounded-full border border-[#B9D5F2]/15 transition-all duration-[4000ms] ${
                isActive && (breathPhase === 'Inhale' || breathPhase === 'Hold')
                  ? 'border-[#B9D5F2]/40 shadow-[0_0_80px_rgba(185,213,242,0.35)]'
                  : 'border-[#B9D5F2]/10'
              }`}
            />

            {/* Glowing Focal Breath Sphere */}
            <div
              className={`w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-[#02050A] via-[#071321] to-[#0C2035] border border-[#B9D5F2]/40 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                isActive && (breathPhase === 'Inhale' || breathPhase === 'Hold')
                  ? 'scale-115 border-[#B9D5F2]/70 shadow-[0_0_100px_rgba(185,213,242,0.45)]'
                  : isActive && breathPhase === 'Exhale'
                  ? 'scale-85 opacity-70'
                  : 'scale-100'
              }`}
            >
              <div className="text-6xl sm:text-7xl md:text-8xl text-[#B9D5F2] font-light glow-moonlight mb-2 select-none">
                ॐ
              </div>
              <div className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#C8A96B] font-semibold">
                {isActive ? breathPhase : isCompleted ? 'PEACE' : 'STILLNESS'}
              </div>
              <div className="font-cormorant text-xs sm:text-sm italic text-[#B9D5F2]/70 tracking-widest mt-1">
                {currentPhaseData.sanskrit}
              </div>
            </div>
          </div>

          {/* Immersion Guidance Typography */}
          <div className="mt-8 text-center max-w-lg">
            <p className="font-cormorant text-2xl sm:text-3xl italic text-[#B9D5F2] tracking-[0.2em] mb-2 glow-moonlight">
              ॐ नमः शिवाय
            </p>
            <p className="font-sans-ui text-xs sm:text-sm text-[#B9D5F2]/60 font-light tracking-widest">
              {breathPhase === 'Inhale' && 'Slowly receive the sacred prana of the Himalayan heights...'}
              {breathPhase === 'Hold' && 'Rest suspended in boundless presence, untouched by thought.'}
              {breathPhase === 'Exhale' && 'Release every tension, dissolving quietly into Kailash.'}
              {breathPhase === 'Stillness' && 'Abide in the silent unconditioned stillness within.'}
            </p>
          </div>
        </div>

        {/* Bottom Status & Controls in Immersive Mode */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-4 pt-4 border-t border-[#B9D5F2]/10">
          <div className="font-mono text-xs text-[#B9D5F2]/60 tracking-widest tabular-nums">
            {secondsRemaining !== null ? (
              <span className="text-[#C8A96B] font-medium">REMAINING: {secondsRemaining}s</span>
            ) : (
              <span>FLOW PROTOCOL · UNLIMITED</span>
            )}
            <span className="mx-3">·</span>
            <span>CYCLES: {cycleCount}</span>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={() => setIsActive(!isActive)}
              cursorLabel={isActive ? 'PAUSE' : 'RESUME'}
              strength={6}
              className="flex items-center gap-2 px-6 py-2 rounded-full border border-[#B9D5F2]/30 hover:border-[#B9D5F2]/70 bg-[#0C2035]/60 hover:bg-[#0C2035] font-cinzel text-xs tracking-[0.25em] text-[#EAF2F7] uppercase transition-all duration-300 cursor-pointer"
            >
              {isActive ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#B9D5F2]" />
                  <span>RESUME</span>
                </>
              )}
            </MagneticButton>

            <button
              onClick={() => startMeditation(duration, true)}
              title="Reset cycle"
              className="p-2 rounded-full border border-[#B9D5F2]/20 hover:border-[#B9D5F2]/60 text-[#B9D5F2]/70 hover:text-[#B9D5F2] transition-colors cursor-pointer"
              aria-label="Reset session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
