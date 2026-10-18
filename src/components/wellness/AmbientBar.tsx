import React, { useState } from 'react';
import { Wind, VolumeX, CloudRain, Waves, Sparkles } from 'lucide-react';
import { soundscape } from '../../lib/soundscape';
import { BreathingModal } from './BreathingModal';

export function AmbientBar() {
  const [isBreathOpen, setIsBreathOpen] = useState(false);
  const [soundMode, setSoundMode] = useState<'off' | 'resonance' | 'rain' | 'breeze'>('off');

  const toggleSound = () => {
    if (soundMode === 'off') {
      soundscape.play('resonance');
      setSoundMode('resonance');
    } else if (soundMode === 'resonance') {
      soundscape.play('rain');
      setSoundMode('rain');
    } else if (soundMode === 'rain') {
      soundscape.play('breeze');
      setSoundMode('breeze');
    } else {
      soundscape.stop();
      setSoundMode('off');
    }
  };

  return (
    <>
      <BreathingModal isOpen={isBreathOpen} onClose={() => setIsBreathOpen(false)} />

      {/* Floating Bottom Ambient Luxury Widget */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <div className="rounded-2xl bg-white/95 backdrop-blur-md p-1.5 text-[#252927] border border-[#163C3B]/12 flex items-center gap-1.5 shadow-[0_10px_30px_rgba(22,60,59,0.12)]">
          {/* 60s Guided Breath Trigger */}
          <button
            type="button"
            onClick={() => setIsBreathOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[#F8F5EF] hover:bg-[#F2EFE8] text-[#163C3B] hover:text-[#1D4E4D] border border-[#163C3B]/10 transition-all cursor-pointer shadow-2xs"
            title="Take a 60-second guided somatic breath"
          >
            <Wind className="w-3.5 h-3.5 text-[#D8A69C]" />
            <span>Somatic Breath</span>
          </button>

          {/* Meditative Soundscape Trigger */}
          <button
            type="button"
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              soundMode !== 'off'
                ? 'bg-[#163C3B] text-[#F8F5EF] font-bold shadow-xs'
                : 'bg-[#F8F5EF] hover:bg-[#F2EFE8] text-[#252927]/80 hover:text-[#163C3B] border border-[#163C3B]/10'
            }`}
            title="Toggle meditative ambient soundscape (Web Audio synthesized)"
          >
            {soundMode === 'off' && <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
            {soundMode === 'resonance' && <Waves className="w-3.5 h-3.5 text-[#D8A69C] animate-pulse" />}
            {soundMode === 'rain' && <CloudRain className="w-3.5 h-3.5 text-[#C7D4C1]" />}
            {soundMode === 'breeze' && <Wind className="w-3.5 h-3.5 text-[#D8A69C]" />}
            <span>
              {soundMode === 'off' && 'Soundscape Off'}
              {soundMode === 'resonance' && '432Hz Drone'}
              {soundMode === 'rain' && 'Gentle Rain'}
              {soundMode === 'breeze' && 'Cedar Breeze'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
