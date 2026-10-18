import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function TraumaSupportPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'trauma')!;

  return (
    <ServiceDetailLayout
      service={service}
      breadcrumbCategory="Support Areas"
      customIntro={
        <div className="rounded-2xl bg-[#FBE3EC]/25 border border-[#0B0A0D]/10 p-6 text-xs sm:text-sm text-[#0B0A0D] leading-relaxed">
          <strong>Safety, Consent, and Gentle Pacing:</strong> We do not subscribe to therapies that force rapid catharsis or flood you with painful memories. In our trauma-informed framework, you always hold the remote control. We prioritize somatic stability, grounding, and personal boundaries first.
        </div>
      }
    />
  );
}
