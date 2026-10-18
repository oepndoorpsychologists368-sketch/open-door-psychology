import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, Compass, Heart } from 'lucide-react';
import { SERVICES_LIST } from '../../data/services';
import { PSYCHOLOGISTS_LIST } from '../../data/psychologists';
import { psychologistAvatars } from '../../data/assets';

export function CareMatchmaker() {
  const [step, setStep] = useState(0); // 0 = start, 1 = Q1, 2 = Q2, 3 = Result
  const [answers, setAnswers] = useState({
    theme: '',
    style: '',
  });

  const question1Options = [
    { id: 'anxiety', label: 'Overwhelm, Panic & High-Stress Burnout', service: 'anxiety-stress' },
    { id: 'couples', label: 'Recurring Relationship Distance or Conflict', service: 'couples-therapy' },
    { id: 'grief', label: 'Quiet Heaviness, Apathy, or Life Transitions', service: 'depression' },
    { id: 'trauma', label: 'Unresolved Past Distress & Somatic Tension', service: 'trauma' },
    { id: 'teen', label: 'Adolescent Pressures or Young Adult Identity', service: 'child-teen-therapy' },
  ];

  const question2Options = [
    { id: 'gentle', label: 'Warm, Unrushed, Reflective Exploration' },
    { id: 'practical', label: 'Concrete Grounding Tools & Emotion Skills' },
    { id: 'somatic', label: 'Body-Attuned Nervous System Regulation' },
    { id: 'relational', label: 'Dyadic Communication & Systemic Insight' },
  ];

  const handleSelectQ1 = (serviceSlug: string) => {
    setAnswers((prev) => ({ ...prev, theme: serviceSlug }));
    setStep(2);
  };

  const handleSelectQ2 = (styleId: string) => {
    setAnswers((prev) => ({ ...prev, style: styleId }));
    setStep(3);
  };

  const resetMatchmaker = () => {
    setAnswers({ theme: '', style: '' });
    setStep(0);
  };

  const matchedService = SERVICES_LIST.find((s) => s.slug === (answers.theme || 'individual-therapy')) || SERVICES_LIST[0];
  const matchedPsychologistSlug = matchedService.recommendedPsychologists[0] || 'dr-elena-vance';
  const matchedPsychologist = PSYCHOLOGISTS_LIST.find((p) => p.slug === matchedPsychologistSlug) || PSYCHOLOGISTS_LIST[0];

  return (
    <div className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-6 sm:p-10 shadow-xs text-[#252927]">
      {step === 0 && (
        <div className="max-w-xl mx-auto text-center space-y-4 py-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FBE3EC]/30 border border-[#0B0A0D]/15 text-[#0B0A0D] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6 text-[#0B0A0D]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70 font-sans">
            Care Pathway Matchmaker
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
            Find Your Resonant Clinician in 60 Seconds
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Not sure where to begin? Answer two brief questions regarding your current emotional state and we’ll match you with the most resonant clinical modality and practitioner.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#0B0A0D] text-[#FFF9FC] hover:bg-[#151218] transition-colors cursor-pointer shadow-xs"
            >
              <span>Begin Guidance Match</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EFA0BF]" />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70 font-sans">
              Step 1 of 2 · Focus Area
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
              What feels most prominent for you right now?
            </h3>
          </div>

          <div className="space-y-2.5">
            {question1Options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectQ1(opt.service)}
                className="w-full text-left p-4 rounded-2xl bg-[#FFF9FC] hover:bg-[#F2EFE8] border border-[#0B0A0D]/10 hover:border-[#EFA0BF] transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="text-xs sm:text-sm font-medium text-[#252927] group-hover:text-[#0B0A0D]">
                  {opt.label}
                </span>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0B0A0D] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={resetMatchmaker}
              className="text-xs text-neutral-500 hover:text-[#0B0A0D] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70 font-sans">
              Step 2 of 2 · Therapeutic Resonance
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
              What kind of presence feels most supportive right now?
            </h3>
          </div>

          <div className="space-y-2.5">
            {question2Options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectQ2(opt.id)}
                className="w-full text-left p-4 rounded-2xl bg-[#FFF9FC] hover:bg-[#F2EFE8] border border-[#0B0A0D]/10 hover:border-[#EFA0BF] transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="text-xs sm:text-sm font-medium text-[#252927] group-hover:text-[#0B0A0D]">
                  {opt.label}
                </span>
                <Check className="w-4 h-4 text-neutral-400 group-hover:text-[#0B0A0D] transition-colors" />
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-neutral-500 hover:text-[#0B0A0D] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Step 1</span>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 max-w-xl mx-auto"
        >
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FBE3EC]/30 text-[#0B0A0D] font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#EFA0BF]" />
              <span>Your Recommended Pathway</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
              {matchedService.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {matchedService.shortDescription}
            </p>
          </div>

          {/* Matched Clinician Card */}
          <div className="rounded-2xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-5 flex items-center gap-4">
            <img
              src={psychologistAvatars[matchedPsychologist.slug] || psychologistAvatars['dr-elena-vance']}
              alt={matchedPsychologist.name}
              className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#0B0A0D]/10 shadow-xs"
            />
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#EFA0BF] font-sans">
                Recommended Clinician
              </div>
              <div className="font-serif font-bold text-base text-[#0B0A0D]">
                {matchedPsychologist.name}
              </div>
              <div className="text-xs text-neutral-500 line-clamp-1">
                {matchedPsychologist.title} · {matchedPsychologist.approach}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={resetMatchmaker}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs text-neutral-600 hover:text-[#0B0A0D] hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Matchmaker</span>
            </button>

            <Link
              to={`/appointment?service=${matchedService.slug}&psychologist=${matchedPsychologist.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#0B0A0D] text-[#FFF9FC] hover:bg-[#151218] transition-colors shadow-xs"
            >
              <span>Book with {matchedPsychologist.name.split(',')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EFA0BF]" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
