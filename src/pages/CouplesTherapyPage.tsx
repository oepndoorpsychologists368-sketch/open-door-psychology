import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function CouplesTherapyPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'couples-therapy')!;

  return (
    <ServiceDetailLayout
      service={service}
      customIntro={
        <div className="rounded-2xl bg-[#D8A69C]/20 border border-[#163C3B]/10 p-6 text-xs sm:text-sm text-[#163C3B] leading-relaxed">
          <strong>Nonjudgmental Relational Stance:</strong> We never promise guaranteed relationship outcomes, nor do we position ourselves as referees determining who is right or wrong. Our purpose is to help both partners understand their relational dance, identify fight-or-flight triggers, and speak vulnerable truths with renewed safety.
        </div>
      }
    />
  );
}
