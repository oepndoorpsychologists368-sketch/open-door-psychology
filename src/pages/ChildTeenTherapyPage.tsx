import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function ChildTeenTherapyPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'child-teen-therapy')!;

  return (
    <ServiceDetailLayout
      service={service}
      customIntro={
        <div className="rounded-2xl bg-[#C7D4C1]/20 border border-[#163C3B]/10 p-6 text-xs sm:text-sm text-[#163C3B] leading-relaxed">
          <strong>Youth Agency &amp; Caregiver Alliance:</strong> Adolescents need an environment where they do not feel audited or judged by adults. We maintain strict ethical confidentiality with teens regarding their personal reflections, while providing parents with high-level guidance on communication and home support.
        </div>
      }
    />
  );
}
