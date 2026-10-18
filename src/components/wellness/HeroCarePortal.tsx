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
    <div className="w-full rounded-3xl bg-white border border-[#163C3B]/10 shadow-[0_12px_44px_rgba(22,60,59,0.06)] overflow-hidden flex flex-col justify-between">
      {/* Top Header & Interactive Tabs */}
      <div className="p-5 sm:p-6 pb-0 border-b border-[#163C3B]/10 bg-[#F8F5EF]/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]">
              Intake Sanctuary Hub
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163C3B]/5 border border-[#163C3B]/10 text-[11px] font-medium text-[#163C3B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8A69C]" />
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
            className={`px-3.5 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-t border-x ${
              activeTab === 'openings'
                ? 'bg-white text-[#163C3B] border-[#163C3B]/10 shadow-xs -mb-px z-10'
                : 'text-neutral-500 hover:text-[#163C3B] border-transparent hover:bg-white/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#D8A69C]" />
            <span>Next Openings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('navigator');
              setIsBreathingActive(false);
            }}
            className={`px-3.5 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-t border-x ${
              activeTab === 'navigator'
                ? 'bg-white text-[#163C3B] border-[#163C3B]/10 shadow-xs -mb-px z-10'
                : 'text-neutral-500 hover:text-[#163C3B] border-transparent hover:bg-white/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#163C3B]" />
            <span>Find What Fits</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('grounding');
              setIsBreathingActive(true);
            }}
            className={`px-3.5 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-t border-x ${
              activeTab === 'grounding'
                ? 'bg-white text-[#163C3B] border-[#163C3B]/10 shadow-xs -mb-px z-10'
                : 'text-neutral-500 hover:text-[#163C3B] border-transparent hover:bg-white/50'
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-[#D8A69C]" />
            <span>Somatic Pause</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Live Openings */}
      {activeTab === 'openings' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-neutral-500 font-medium">
              Consultation availability (In-Person &amp; Telehealth):
            </span>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-[#F8F5EF] p-1 rounded-lg border border-[#163C3B]/10 text-[11px]">
              <button
                type="button"
                onClick={() => setOpeningFormat('all')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  openingFormat === 'all' ? 'bg-[#163C3B] text-white font-medium' : 'text-neutral-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setOpeningFormat('in-person')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  openingFormat === 'in-person' ? 'bg-[#163C3B] text-white font-medium' : 'text-neutral-600'
                }`}
              >
                In-Person
              </button>
              <button
                type="button"
                onClick={() => setOpeningFormat('telehealth')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  openingFormat === 'telehealth' ? 'bg-[#163C3B] text-white font-medium' : 'text-neutral-600'
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
                  className="rounded-2xl p-3.5 sm:p-4 bg-[#F8F5EF] hover:bg-[#F2EFE8] border border-[#163C3B]/10 hover:border-[#D8A69C] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={psychologistAvatars[opening.psychologistSlug] || psychologistAvatars['dr-elena-vance']}
                      alt={clinician?.name || 'Psychologist'}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#163C3B]/10"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#163C3B]">
                          {clinician?.name}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {opening.dayText}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#163C3B] font-semibold">
                          {opening.timeSlot}
                        </span>
                        <span aria-hidden="true" className="text-neutral-300">·</span>
                        <span className="flex items-center gap-1">
                          {opening.format === 'in-person' ? (
                            <MapPin className="w-3 h-3 text-[#D8A69C]" />
                          ) : (
                            <Video className="w-3 h-3 text-[#3B82F6]" />
                          )}
                          <span>{opening.locationBadge}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/appointment?service=${opening.serviceSlug}&psychologist=${opening.psychologistSlug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#163C3B] text-[#F8F5EF] group-hover:bg-[#1D4E4D] transition-colors whitespace-nowrap shadow-2xs self-end sm:self-center"
                  >
                    <span>Reserve Slot</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D8A69C]" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>No referral needed · Confidential scheduling</span>
            </span>
            <Link to="/appointment" className="text-[#163C3B] font-semibold hover:underline">
              View All Openings &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Find What Fits */}
      {activeTab === 'navigator' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-[#163C3B]">
              What season are you navigating?
            </h3>
            <p className="text-xs text-neutral-500">
              Select what feels heaviest and we’ll show the direct clinical pathway.
            </p>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {focusAreas.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFocus(f.id)}
                className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                  selectedFocus === f.id
                    ? 'bg-[#163C3B] text-[#F8F5EF] border-[#163C3B] shadow-xs'
                    : 'bg-[#F8F5EF] hover:bg-[#F2EFE8] text-[#252927] border-[#163C3B]/10'
                }`}
              >
                <div className="font-semibold">{f.label}</div>
              </button>
            ))}
          </div>

          {/* Matched Outcome Box */}
          <div className="rounded-2xl p-4 bg-[#F8F5EF] border border-[#163C3B]/10 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D8A69C]">
                  Recommended Pathway
                </span>
                <div className="font-serif font-bold text-base text-[#163C3B]">
                  {activeFocus.serviceTitle}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeFocus.note}
                </p>
              </div>

              <img
                src={psychologistAvatars[matchedClinician.slug]}
                alt={matchedClinician.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#163C3B]/10"
              />
            </div>

            <div className="pt-2 border-t border-[#163C3B]/10 flex items-center justify-between">
              <div className="text-xs text-neutral-500">
                Lead Specialist: <strong className="text-[#163C3B]">{matchedClinician.name.split(',')[0]}</strong>
              </div>
              <Link
                to={`/appointment?service=${activeFocus.serviceSlug}&psychologist=${matchedClinician.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#163C3B] text-white hover:bg-[#1D4E4D]"
              >
                <span>Request Intake</span>
                <ArrowRight className="w-3 h-3 text-[#D8A69C]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Somatic Grounding */}
      {activeTab === 'grounding' && (
        <div className="p-5 sm:p-6 text-center space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-medium text-[#163C3B]">4-7-8 Parasympathetic Reset</span>
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#163C3B] hover:text-[#D8A69C] transition-colors cursor-pointer"
            >
              {isAudioOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D8A69C]" />
                  <span>432Hz Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Enable Drone Tone</span>
                </>
              )}
            </button>
          </div>

          {/* Calming Breath Circle */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#C7D4C1]/40 via-[#D8A69C]/30 to-[#D9D1E7]/40 blur-xl transition-transform duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-125 opacity-80'
                  : breathPhase === 'Hold'
                  ? 'scale-125 opacity-60'
                  : 'scale-90 opacity-30'
              }`}
            />
            <div
              className={`relative w-28 h-28 rounded-full bg-white border border-[#163C3B]/15 shadow-md flex flex-col items-center justify-center transition-all duration-1000 ${
                breathPhase === 'Inhale' ? 'scale-110' : breathPhase === 'Hold' ? 'scale-110' : 'scale-95'
              }`}
            >
              <span className="font-serif text-lg font-bold text-[#163C3B]">{breathPhase}</span>
              <span className="font-mono text-2xl font-light text-[#D8A69C]">{breathSeconds}s</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-neutral-600 font-medium">
              {breathPhase === 'Inhale' && 'Slowly fill your lungs through your nose.'}
              {breathPhase === 'Hold' && 'Rest quietly in fullness without strain.'}
              {breathPhase === 'Exhale' && 'Gently release tension completely through parted lips.'}
            </p>
            <p className="text-[11px] text-neutral-400">
              Take 60 seconds right now before taking your next step.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#163C3B] text-[#F8F5EF] hover:bg-[#1D4E4D] shadow-2xs"
            >
              <span>I’m Ready to Schedule</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D8A69C]" />
            </Link>
          </div>
        </div>
      )}

      {/* Persistent Bottom Sanctuary Guarantee Bar */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#F8F5EF] border-t border-[#163C3B]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-[#D8A69C]" />
          <span>“Don’t Cry. Just Come.” — Zero judgment, unrushed care.</span>
        </div>
        <Link to="/approach" className="font-semibold text-[#163C3B] hover:underline whitespace-nowrap">
          Our Care Philosophy &rarr;
        </Link>
      </div>
    </div>
  );
}
