import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function CouplesTherapyPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'couples-therapy')!;

  return (
    <ServiceDetailLayout
      service={service}
      customIntro={
        <div className="rounded-2xl bg-[#EFA0BF]/20 border border-[#0B0A0D]/10 p-6 text-xs sm:text-sm text-[#0B0A0D] leading-relaxed">
          <strong>Nonjudgmental Relational Stance:</strong> We never promise guaranteed relationship outcomes, nor do we position ourselves as referees determining who is right or wrong. Our purpose is to help both partners understand their relational dance, identify fight-or-flight triggers, and speak vulnerable truths with renewed safety.
        </div>
      }
    />
  );
}
