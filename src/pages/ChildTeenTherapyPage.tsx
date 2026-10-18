import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function ChildTeenTherapyPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'child-teen-therapy')!;

  return (
    <ServiceDetailLayout
      service={service}
      customIntro={
        <div className="rounded-2xl bg-[#FBE3EC]/20 border border-[#0B0A0D]/10 p-6 text-xs sm:text-sm text-[#0B0A0D] leading-relaxed">
          <strong>Youth Agency &amp; Caregiver Alliance:</strong> Adolescents need an environment where they do not feel audited or judged by adults. We maintain strict ethical confidentiality with teens regarding their personal reflections, while providing parents with high-level guidance on communication and home support.
        </div>
      }
    />
  );
}
