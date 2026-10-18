import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BookingWizard } from '../components/booking/BookingWizard';
import { ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';

export function AppointmentPage() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || undefined;
  const initialPsychologist = searchParams.get('psychologist') || undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Appointment Booking' }]} />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Begin Your Care Journey
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Request an Appointment
        </h1>
        <p className="font-serif text-xl italic text-[#EFA0BF]">
          “Don’t Cry. Just Come.”
        </p>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Complete the six guided steps below to select your service, practitioner, preferred date, and time. No clinical diagnosis or medical history is required to begin.
        </p>
      </div>

      {/* Booking Wizard Interactive Component */}
      <BookingWizard
        initialServiceSlug={initialService}
        initialPsychologistSlug={initialPsychologist}
      />

      {/* What happens next explanation */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#0B0A0D]">
          What Happens After an Appointment Request?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1.5">
            <div className="font-serif font-bold text-base text-[#EFA0BF]">1. Intake Review</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our clinical coordinator reviews availability and ensures your clinician matches your requested goals.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-serif font-bold text-base text-[#EFA0BF]">2. Welcome Welcome</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              You receive a welcome packet with studio directions or encrypted telehealth video links.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-serif font-bold text-base text-[#EFA0BF]">3. Your First Session</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Arrive unhurried. The first session is an open, compassionate dialogue without any demand for composure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
