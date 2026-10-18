import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Wind, Sparkles } from 'lucide-react';
import { soundscape } from '../../lib/soundscape';

export function BreathingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      soundscape.stop();
      setIsAudioEnabled(false);
      return;
    }

    let currentPhase: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
    let count = 4;
    setPhase(currentPhase);
    setSecondsRemaining(count);

    const interval = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        if (currentPhase === 'Inhale') {
          currentPhase = 'Hold';
          count = 7; // Classical 4-7-8 relaxing rhythm
        } else if (currentPhase === 'Hold') {
          currentPhase = 'Exhale';
          count = 8;
        } else {
          currentPhase = 'Inhale';
          count = 4;
          setCycleCount((c) => c + 1);
        }
        setPhase(currentPhase);
      }
      setSecondsRemaining(count);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const toggleAudio = () => {
    if (isAudioEnabled) {
      soundscape.stop();
      setIsAudioEnabled(false);
    } else {
      soundscape.play('resonance');
      setIsAudioEnabled(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#163C3B]/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#F8F5EF] border border-[#163C3B]/15 p-8 sm:p-12 text-center shadow-2xl space-y-8 z-10"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                isAudioEnabled
                  ? 'bg-[#163C3B] text-[#F8F5EF] font-semibold shadow-xs'
                  : 'bg-white text-[#252927] hover:text-[#163C3B] border border-[#163C3B]/10'
              }`}
            >
              {isAudioEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#D8A69C]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              )}
              <span>{isAudioEnabled ? '432Hz Drone Active' : 'Enable Calming Tone'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-neutral-500 hover:text-[#163C3B] hover:bg-[#163C3B]/10 transition-colors cursor-pointer"
              aria-label="Close breathing session"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Somatic Mandala Sphere */}
          <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
            {/* Outer expanding halo */}
            <motion.div
              animate={{
                scale: phase === 'Inhale' ? 1.45 : phase === 'Hold' ? 1.45 : 0.85,
                opacity: phase === 'Inhale' ? 0.8 : phase === 'Hold' ? 0.65 : 0.25,
              }}
              transition={{
                duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.5 : 8,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C7D4C1]/50 via-[#D8A69C]/40 to-[#D9D1E7]/50 blur-2xl"
            />

            {/* Inner defined circle */}
            <motion.div
              animate={{
                scale: phase === 'Inhale' ? 1.25 : phase === 'Hold' ? 1.25 : 0.9,
              }}
              transition={{
                duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.5 : 8,
                ease: 'easeInOut',
              }}
              className="relative w-40 h-40 rounded-full bg-white text-[#163C3B] flex flex-col items-center justify-center shadow-lg border border-[#163C3B]/15"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-[#163C3B]">
                {phase}
              </span>
              <span className="font-mono text-3xl font-light text-[#D8A69C] mt-1">
                {secondsRemaining}s
              </span>
            </motion.div>
          </div>

          {/* Somatic Guidance Text */}
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              {phase === 'Inhale' && 'Slowly fill your lungs and soften your chest.'}
              {phase === 'Hold' && 'Rest quietly in fullness. Nothing to rush or prove.'}
              {phase === 'Exhale' && 'Release slowly through your lips. Let tension melt away.'}
            </h3>
            <p className="text-xs text-neutral-500 font-sans">
              Completed cycles: {cycleCount} · Classical 4-7-8 Somatic Downregulation
            </p>
          </div>

          {/* Bottom Action */}
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#163C3B] text-[#F8F5EF] hover:bg-[#1D4E4D] transition-colors cursor-pointer shadow-xs"
          >
            I Feel Grounded · Return to Practice
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
