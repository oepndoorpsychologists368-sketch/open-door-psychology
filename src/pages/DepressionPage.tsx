import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function DepressionPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'depression')!;

  return (
    <ServiceDetailLayout
      service={service}
      breadcrumbCategory="Support Areas"
      customIntro={
        <div className="rounded-2xl bg-[#D9D1E7]/25 border border-[#0B0A0D]/10 p-6 text-xs sm:text-sm text-[#0B0A0D] leading-relaxed">
          <strong>Compassionate Realism:</strong> Depression is not a choice or a consequence of lacking willpower. Telling someone with low vitality to “look on the bright side” only deepens isolation. We offer a low-pressure environment where you can show up without performing optimism.
        </div>
      }
    />
  );
}
