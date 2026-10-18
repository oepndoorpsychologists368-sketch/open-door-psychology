import React from 'react';
import { ServiceDetailLayout } from '../components/services/ServiceDetailLayout';
import { SERVICES_LIST } from '../data/services';

export function FamilyTherapyPage() {
  const service = SERVICES_LIST.find((s) => s.slug === 'family-therapy')!;

  return (
    <ServiceDetailLayout
      service={service}
      customIntro={
        <div className="rounded-2xl bg-[#D9D1E7]/30 border border-[#0B0A0D]/10 p-6 text-xs sm:text-sm text-[#0B0A0D] leading-relaxed">
          <strong>Systemic Family Approach:</strong> When one family member experiences distress, the ripples affect the entire household. Our family sessions provide a safe arena to voice intergenerational differences, reset collective boundaries, and develop shared rituals of affection and mutual accountability.
        </div>
      }
    />
  );
}
