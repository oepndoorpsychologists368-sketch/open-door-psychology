import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Clock, Calendar, Heart, Info } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PSYCHOLOGISTS_LIST } from '../data/psychologists';
import { SERVICES_LIST } from '../data/services';
import { psychologistAvatars } from '../data/assets';

export function PsychologistDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const psychologist = PSYCHOLOGISTS_LIST.find((p) => p.slug === slug);

  if (!psychologist) {
    return <Navigate to="/psychologists" replace />;
  }

  // Related services that recommend this clinician
  const relevantServices = SERVICES_LIST.filter((s) =>
    s.recommendedPsychologists.includes(psychologist.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Our Psychologists', path: '/psychologists' },
          { label: psychologist.name },
        ]}
      />

      {/* Demonstration Notice */}
      <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Profile: </strong>
          This is an illustrative profile with placeholder biographical narratives for Open Door Psychology &amp; Wellness. Fictional license numbers and clinical credentials will be replaced with real practitioner credentials prior to formal clinic launch.
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Portrait & Key Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden bg-white border border-[#163C3B]/10 shadow-sm aspect-square">
            <img
              src={psychologistAvatars[psychologist.slug]}
              alt={psychologist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#163C3B]">
              Clinical Logistics
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">Experience</span>
                <span className="font-medium text-[#163C3B]">{psychologist.experienceYears} Years</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">Languages</span>
                <span className="font-medium text-[#163C3B]">{psychologist.languages.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">License Status</span>
                <span className="font-medium text-[#163C3B]">{psychologist.licensePlaceholder}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Consultation Modes</span>
                <span className="font-medium text-[#163C3B]">San Francisco Studio &amp; Telehealth</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/appointment?psychologist=${psychologist.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#163C3B] hover:bg-[#1D4E4D] transition-colors"
              >
                <span>Request Appointment with {psychologist.name.split(',')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Philosophy & Therapeutic Approach */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
              {psychologist.title}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163C3B]">
              {psychologist.name}
            </h1>
            <p className="font-serif text-xl italic text-[#D8A69C] pt-1">
              {psychologist.philosophicalNote}
            </p>
          </div>

          {/* Biography */}
          <div className="rounded-3xl bg-white border border-[#163C3B]/10 p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
              Biography &amp; Background
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {psychologist.bio}
            </p>
          </div>

          {/* Approach */}
          <div className="rounded-3xl bg-[#F8F5EF] border border-[#163C3B]/10 p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
              Therapeutic Approach &amp; In-Session Style
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {psychologist.approach}
            </p>

            <div className="pt-4 border-t border-[#163C3B]/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70 block mb-3">
                Key Specializations:
              </span>
              <div className="flex flex-wrap gap-2">
                {psychologist.focusAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-[#163C3B]/10 text-[#163C3B]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Demonstration Qualifications */}
          <div className="rounded-3xl bg-white border border-[#163C3B]/10 p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
              Education &amp; Clinical Credentials [Demo Placeholder]
            </h2>
            <ul className="space-y-2.5">
              {psychologist.qualifications.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-[#C7D4C1] shrink-0 mt-0.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Services */}
          {relevantServices.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl font-bold text-[#163C3B]">
                Services Guided by {psychologist.name.split(',')[0]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relevantServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/services/${svc.slug}`}
                    className="p-4 rounded-2xl bg-white border border-[#163C3B]/10 hover:border-[#163C3B]/30 hover:shadow-xs transition-all block"
                  >
                    <div className="font-semibold text-xs text-[#163C3B]">{svc.title}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{svc.sessionStructure.duration}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Return link */}
          <div className="pt-4">
            <Link
              to="/psychologists"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163C3B] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all psychologists</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
