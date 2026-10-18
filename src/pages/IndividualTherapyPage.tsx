import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function IndividualTherapyPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'individual-therapy')!;

  return (
    <ServiceDetailLayout
      service={service}
      customIntro={
        <div className="rounded-2xl bg-[#C7D4C1]/20 border border-[#163C3B]/10 p-6 text-xs sm:text-sm text-[#163C3B] leading-relaxed">
          <strong>A Note on Starting:</strong> Many people assume individual psychotherapy requires a catastrophic crisis. In reality, our clients often arrive during quiet crossroads—wondering why success feels hollow, wrestling with an unspoken grief, or wanting to understand why certain relational boundaries feel so hard to maintain.
        </div>
      }
    />
  );
}
