import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Compass,
  ArrowRight,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Video,
  Volume2,
  VolumeX,
  User,
  Heart,
} from 'lucide-react';
import { PSYCHOLOGISTS_LIST } from '../../data/psychologists';
import { SERVICES_LIST } from '../../data/services';
import { psychologistAvatars } from '../../data/assets';
import { soundscape } from '../../lib/soundscape';

interface LiveOpening {
  psychologistSlug: string;
  serviceSlug: string;
  dayText: string;
  timeSlot: string;
  format: 'in-person' | 'telehealth';
  locationBadge: string;
}

const UPCOMING_OPENINGS: LiveOpening[] = [
  {
    psychologistSlug: 'dr-elena-vance',
    serviceSlug: 'individual-therapy',
    dayText: 'Tomorrow (Intake)',
    timeSlot: '10:30 AM – 11:20 AM',
    format: 'in-person',
    locationBadge: 'San Francisco Sanctuary',
  },
  {
    psychologistSlug: 'marcus-chen',
    serviceSlug: 'couples-therapy',
    dayText: 'Thursday',
    timeSlot: '02:30 PM – 03:20 PM',
    format: 'telehealth',
    locationBadge: 'Secure Telehealth (CA)',
  },
  {
    psychologistSlug: 'dr-sophia-martinez',
    serviceSlug: 'depression',
    dayText: 'Friday',
    timeSlot: '01:00 PM – 01:50 PM',
    format: 'in-person',
    locationBadge: 'San Francisco Sanctuary',
  },
  {
    psychologistSlug: 'julian-ross',
    serviceSlug: 'trauma',
    dayText: 'Next Monday',
    timeSlot: '04:00 PM – 04:50 PM',
    format: 'telehealth',
    locationBadge: 'Secure Telehealth (CA)',
  },
];

export function HeroCarePortal() {
  const [activeTab, setActiveTab] = useState<'openings' | 'navigator' | 'grounding'>('openings');

  // Openings filter
  const [openingFormat, setOpeningFormat] = useState<'all' | 'in-person' | 'telehealth'>('all');

  // Care Navigator State
  const [selectedFocus, setSelectedFocus] = useState<string>('burnout');

  // Grounding state
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Filter openings
  const filteredOpenings = UPCOMING_OPENINGS.filter((o) => {
    if (openingFormat === 'all') return true;
    return o.format === openingFormat;
  });

  // Focus areas definition for quick navigator
  const focusAreas = [
    {
      id: 'burnout',
      label: 'Exhaustion & High-Stress Burnout',
      serviceSlug: 'anxiety-stress',
      serviceTitle: 'Anxiety, Panic & Burnout Care',
      clinicianSlug: 'dr-elena-vance',
      note: 'Evidence-based nervous system regulation & restorative pacing.',
    },
    {
      id: 'couples',
      label: 'Relationship Distance or Friction',
      serviceSlug: 'couples-therapy',
      serviceTitle: 'Couples & Relational Therapy',
      clinicianSlug: 'marcus-chen',
      note: 'Emotion-focused de-escalation for partners seeking reconnective safety.',
    },
    {
      id: 'grief',
      label: 'Quiet Heaviness, Numbness or Grief',
      serviceSlug: 'depression',
      serviceTitle: 'Depression & Existential Support',
      clinicianSlug: 'dr-sophia-martinez',
      note: 'Gentle psychodynamic exploration without rush or pressure.',
    },
    {
      id: 'trauma',
      label: 'Unresolved Trauma & Body Tension',
      serviceSlug: 'trauma',
      serviceTitle: 'Complex Trauma & Somatic Safety',
      clinicianSlug: 'julian-ross',
      note: 'Somatic Experiencing and phased safety for nervous system recalibration.',
    },
  ];

  const activeFocus = focusAreas.find((f) => f.id === selectedFocus) || focusAreas[0];
  const matchedClinician = PSYCHOLOGISTS_LIST.find((p) => p.slug === activeFocus.clinicianSlug) || PSYCHOLOGISTS_LIST[0];

  // Grounding breath timer loop
  useEffect(() => {
    if (!isBreathingActive) return;

    let currentPhase: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
    let count = 4;
    setBreathPhase(currentPhase);
    setBreathSeconds(count);

    const interval = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        if (currentPhase === 'Inhale') {
          currentPhase = 'Hold';
          count = 7;
        } else if (currentPhase === 'Hold') {
          currentPhase = 'Exhale';
          count = 8;
        } else {
          currentPhase = 'Inhale';
          count = 4;
        }
        setBreathPhase(currentPhase);
      }
      setBreathSeconds(count);
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const toggleSound = () => {
    if (isAudioOn) {
      soundscape.stop();
      setIsAudioOn(false);
    } else {
      soundscape.play('resonance');
      setIsAudioOn(true);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-[#151218] border border-[#F6C5D7]/25 shadow-[0_16px_50px_rgba(11,10,13,0.7)] overflow-hidden flex flex-col justify-between text-[#FFF9FC]">
      {/* Top Header & Interactive Tabs */}
      <div className="p-5 sm:p-6 pb-0 border-b border-[#F6C5D7]/15 bg-[#0B0A0D]/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EFA0BF] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F6C5D7]">
              Intake Sanctuary Hub
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBE3EC]/10 border border-[#F6C5D7]/25 text-[11px] font-semibold text-[#F6C5D7]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EFA0BF]" />
            <span>Accepting New Clients This Week</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 overflow-x-auto pb-px scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setActiveTab('openings');
              setIsBreathingActive(false);
            }}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-t border-x ${
              activeTab === 'openings'
                ? 'bg-[#151218] text-[#F6C5D7] border-[#F6C5D7]/30 shadow-xs -mb-px z-10'
                : 'text-[#BEB7C0] hover:text-[#FFF9FC] border-transparent hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#EFA0BF]" />
            <span>Next Openings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('navigator');
              setIsBreathingActive(false);
            }}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-t border-x ${
              activeTab === 'navigator'
                ? 'bg-[#151218] text-[#F6C5D7] border-[#F6C5D7]/30 shadow-xs -mb-px z-10'
                : 'text-[#BEB7C0] hover:text-[#FFF9FC] border-transparent hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#EFA0BF]" />
            <span>Find What Fits</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('grounding');
              setIsBreathingActive(true);
            }}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-t border-x ${
              activeTab === 'grounding'
                ? 'bg-[#151218] text-[#F6C5D7] border-[#F6C5D7]/30 shadow-xs -mb-px z-10'
                : 'text-[#BEB7C0] hover:text-[#FFF9FC] border-transparent hover:bg-white/5'
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-[#EFA0BF]" />
            <span>Somatic Pause</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Live Openings */}
      {activeTab === 'openings' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#BEB7C0] font-medium">
              Consultation availability (In-Person &amp; Telehealth):
            </span>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-[#0B0A0D] p-1 rounded-full border border-[#F6C5D7]/25 text-[11px]">
              <button
                type="button"
                onClick={() => setOpeningFormat('all')}
                className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  openingFormat === 'all' ? 'bg-[#F6C5D7] text-[#0B0A0D] font-bold' : 'text-[#BEB7C0]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setOpeningFormat('in-person')}
                className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  openingFormat === 'in-person' ? 'bg-[#F6C5D7] text-[#0B0A0D] font-bold' : 'text-[#BEB7C0]'
                }`}
              >
                In-Person
              </button>
              <button
                type="button"
                onClick={() => setOpeningFormat('telehealth')}
                className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  openingFormat === 'telehealth' ? 'bg-[#F6C5D7] text-[#0B0A0D] font-bold' : 'text-[#BEB7C0]'
                }`}
              >
                Virtual
              </button>
            </div>
          </div>

          {/* Openings List */}
          <div className="space-y-2.5">
            {filteredOpenings.slice(0, 3).map((opening, idx) => {
              const clinician = PSYCHOLOGISTS_LIST.find((p) => p.slug === opening.psychologistSlug);
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-3.5 sm:p-4 bg-[#0B0A0D]/70 hover:bg-[#0B0A0D] border border-[#F6C5D7]/15 hover:border-[#EFA0BF]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={psychologistAvatars[opening.psychologistSlug] || psychologistAvatars['dr-elena-vance']}
                      alt={clinician?.name || 'Psychologist'}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#F6C5D7]/30"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#FFF9FC]">
                          {clinician?.name}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FBE3EC]/20 text-[#F6C5D7] border border-[#F6C5D7]/30">
                          {opening.dayText}
                        </span>
                      </div>
                      <div className="text-xs text-[#BEB7C0]">
                        {opening.timeSlot}
                      </div>
                      <div className="text-[11px] text-[#C87596] flex items-center gap-1 font-medium">
                        {opening.format === 'in-person' ? (
                          <MapPin className="w-3 h-3 text-[#EFA0BF]" />
                        ) : (
                          <Video className="w-3 h-3 text-[#EFA0BF]" />
                        )}
                        <span>{opening.locationBadge}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/appointment?clinician=${opening.psychologistSlug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#0B0A0D] bg-[#F6C5D7] hover:bg-[#EFA0BF] shadow-xs transition-all whitespace-nowrap self-end sm:self-center"
                  >
                    <span>Claim Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#BEB7C0]">
            <span>Need a custom appointment time?</span>
            <Link
              to="/appointment"
              className="font-bold text-[#F6C5D7] hover:text-[#EFA0BF] hover:underline"
            >
              Browse Complete Calendar →
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Find What Fits (Interactive Match Navigator) */}
      {activeTab === 'navigator' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="text-xs text-[#BEB7C0]">
            Select what you are carrying right now for tailored guidance:
          </div>

          {/* Focus Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {focusAreas.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFocus(f.id)}
                className={`p-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer border ${
                  selectedFocus === f.id
                    ? 'bg-[#F6C5D7] text-[#0B0A0D] border-[#F6C5D7] shadow-[0_2px_12px_rgba(246,197,215,0.35)]'
                    : 'bg-[#0B0A0D]/70 text-[#FFF9FC] border-[#F6C5D7]/15 hover:border-[#EFA0BF]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{f.label}</span>
                  {selectedFocus === f.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B0A0D]" />}
                </div>
              </button>
            ))}
          </div>

          {/* Matched Recommended Care Card */}
          <div className="p-4 rounded-2xl bg-[#0B0A0D] border border-[#F6C5D7]/20 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6C5D7]">
                  Recommended Care Pathway
                </span>
                <h4 className="font-serif text-base font-bold text-[#FFF9FC]">
                  {activeFocus.serviceTitle}
                </h4>
              </div>
              <Link
                to={`/services/${activeFocus.serviceSlug}`}
                className="text-xs font-bold text-[#EFA0BF] hover:underline whitespace-nowrap"
              >
                Learn More
              </Link>
            </div>

            <p className="text-xs text-[#BEB7C0] leading-relaxed">
              {activeFocus.note}
            </p>

            {/* Matched Clinician Preview */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={psychologistAvatars[matchedClinician.slug] || psychologistAvatars['dr-elena-vance']}
                  alt={matchedClinician.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#F6C5D7]/30"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#FFF9FC]">{matchedClinician.name}</div>
                  <div className="text-[#C87596] text-[11px]">{matchedClinician.title}</div>
                </div>
              </div>

              <Link
                to={`/appointment?clinician=${matchedClinician.slug}&service=${activeFocus.serviceSlug}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B0A0D] bg-[#F6C5D7] hover:bg-[#EFA0BF] transition-all"
              >
                Request Match
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Somatic Pause (Interactive Grounding & Calming Sound) */}
      {activeTab === 'grounding' && (
        <div className="p-5 sm:p-6 space-y-5 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6C5D7]">
              Biological 4-7-8 Parasympathetic Reset
            </span>
            <h4 className="font-serif text-lg font-bold text-[#FFF9FC]">
              Take 60 seconds before deciding.
            </h4>
            <p className="text-xs text-[#BEB7C0] max-w-sm mx-auto">
              Follow the expanding circle. Inhale peace, hold gentle safety, exhale exhaustion.
            </p>
          </div>

          {/* Interactive Breathing Visualizer */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-xl border-2 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 bg-[#F6C5D7]/20 border-[#F6C5D7] shadow-[0_0_35px_rgba(246,197,215,0.45)]'
                  : breathPhase === 'Hold'
                  ? 'scale-110 bg-[#EFA0BF]/30 border-[#EFA0BF] shadow-[0_0_40px_rgba(239,160,191,0.55)]'
                  : 'scale-90 bg-[#FBE3EC]/10 border-[#FBE3EC]/40 shadow-[0_0_20px_rgba(251,227,236,0.25)]'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#F6C5D7]">
                {breathPhase}
              </span>
              <span className="font-serif text-3xl font-bold text-[#FFF9FC]">
                {breathSeconds}s
              </span>
            </div>
          </div>

          {/* Audio Synthesizer Control */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                isAudioOn
                  ? 'bg-[#F6C5D7] text-[#0B0A0D] border-[#F6C5D7] shadow-[0_2px_12px_rgba(246,197,215,0.4)]'
                  : 'bg-[#0B0A0D] text-[#FFF9FC] border-[#F6C5D7]/20 hover:border-[#F6C5D7]/50'
              }`}
            >
              {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isAudioOn ? 'Mute Tibetan Singing Bowl' : 'Play Calming Resonance'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer Callout */}
      <div className="px-5 py-3.5 bg-[#0B0A0D] border-t border-[#F6C5D7]/15 flex items-center justify-between text-xs text-[#BEB7C0]">
        <div className="flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-[#EFA0BF] fill-[#EFA0BF]" />
          <span>No preparation or apology needed.</span>
        </div>
        <Link
          to="/appointment"
          className="font-bold text-[#F6C5D7] hover:text-[#EFA0BF] hover:underline"
        >
          Book Consultation →
        </Link>
      </div>
    </div>
  );
}
