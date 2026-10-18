import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function AnxietyStressPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'anxiety-stress')!;

  return (
    <ServiceDetailLayout
      service={service}
      breadcrumbCategory="Support Areas"
      customIntro={
        <div className="rounded-2xl bg-[#D8A69C]/20 border border-[#163C3B]/10 p-6 text-xs sm:text-sm text-[#163C3B] leading-relaxed">
          <strong>Non-Pathologizing Understanding:</strong> Anxiety is not a flaw in your character; it is a sensitive nervous system working overtime to protect you from uncertainty. We do not attempt to eliminate every sensation of worry, but rather help you befriend your body and dismantle automatic panic spirals.
        </div>
      }
    />
  );
}
