import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Calendar, Shield, Users, Heart } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ServiceItem } from '../../types';
import { PSYCHOLOGISTS_LIST } from '../../data/psychologists';
import { psychologistAvatars } from '../../data/assets';

interface ServiceDetailLayoutProps {
  service: ServiceItem;
  breadcrumbCategory?: string;
  customIntro?: React.ReactNode;
}

export function ServiceDetailLayout({
  service,
  breadcrumbCategory = 'Services',
  customIntro,
}: ServiceDetailLayoutProps) {
  const recommendedPsychologists = PSYCHOLOGISTS_LIST.filter((p) =>
    service.recommendedPsychologists.includes(p.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs
        items={[
          { label: breadcrumbCategory, path: '/services' },
          { label: service.title },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
          {service.category === 'core' ? 'Clinical Discipline' : 'Focused Support Pathway'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163C3B] text-balance">
          {service.heroHeadline}
        </h1>
        <p className="font-serif text-xl italic text-[#D8A69C]">
          “{service.heroSubheadline}”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            to={`/appointment?service=${service.slug}`}
            className="px-6 py-3 rounded-full text-xs font-semibold text-[#F8F5EF] bg-[#163C3B] hover:bg-[#1D4E4D] transition-colors"
          >
            Request Consultation for {service.title}
          </Link>
          <Link
            to="/fees"
            className="px-6 py-3 rounded-full text-xs font-medium text-[#163C3B] border border-[#163C3B]/20 hover:bg-[#163C3B]/5 transition-colors"
          >
            View Fee &amp; Superbill Info
          </Link>
        </div>
      </div>

      {customIntro && <div>{customIntro}</div>}

      {/* Session Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <Clock className="w-4 h-4 text-[#163C3B]" />
            <span>Session Duration</span>
          </div>
          <div className="font-serif text-xl font-bold text-[#163C3B]">
            {service.sessionStructure.duration}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <Calendar className="w-4 h-4 text-[#163C3B]" />
            <span>Recommended Cadence</span>
          </div>
          <div className="font-serif text-xl font-bold text-[#163C3B]">
            {service.sessionStructure.cadence}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <Shield className="w-4 h-4 text-[#163C3B]" />
            <span>Focus &amp; Pacing</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-[#163C3B] mt-0.5">
            {service.sessionStructure.focus}
          </div>
        </div>
      </div>

      {/* 2-Column: Ideal For & What To Expect */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ideal For */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-[#163C3B]/10 p-8 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
            Who Often Seeks This Support
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            You may recognize yourself in one or more of these emotional thresholds:
          </p>
          <ul className="space-y-3 pt-2">
            {service.idealFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-[#C7D4C1] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to Expect */}
        <div className="lg:col-span-6 rounded-3xl bg-[#F8F5EF] border border-[#163C3B]/10 p-8 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
            What to Expect in Sessions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            How we structure and gently navigate our time together:
          </p>
          <ul className="space-y-3 pt-2">
            {service.whatToExpect.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-600">
                <span className="font-serif font-bold text-[#D8A69C] mt-0.5">{idx + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Pillars Grid */}
      <section className="space-y-6">
        <div className="border-b border-[#163C3B]/10 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#163C3B]">
            Core Tenets of Our {service.title} Care
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.keyPillars.map((pillar, i) => (
            <div key={i} className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D8A69C]">0{i + 1}</span>
              <h3 className="font-serif text-lg font-bold text-[#163C3B]">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Clinicians */}
      {recommendedPsychologists.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="border-b border-[#163C3B]/10 pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#163C3B]">
                Psychologists Specializing in {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Clinicians on our demonstration team with dedicated focus in this domain.
              </p>
            </div>
            <Link to="/psychologists" className="text-xs font-semibold text-[#163C3B] hover:underline hidden sm:block">
              View all psychologists &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedPsychologists.map((psy) => (
              <div
                key={psy.slug}
                className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
                    <img
                      src={psychologistAvatars[psy.slug]}
                      alt={psy.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#163C3B]">{psy.name}</h3>
                    <div className="text-xs text-[#D8A69C]">{psy.title}</div>
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-3">{psy.bio}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={`/psychologists/${psy.slug}`}
                    className="text-xs font-semibold text-[#163C3B] group-hover:underline"
                  >
                    View profile
                  </Link>
                  <Link
                    to={`/appointment?service=${service.slug}&psychologist=${psy.slug}`}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#163C3B] text-white hover:bg-[#1D4E4D]"
                  >
                    Request
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Booking Invitation */}
      <section className="rounded-3xl bg-[#163C3B] text-white p-8 sm:p-12 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Ready to begin {service.title.toLowerCase()}?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
          Take your next step without pressure. Book an initial demonstration consultation or consult with our team.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            to={`/appointment?service=${service.slug}`}
            className="px-6 py-3 rounded-full text-xs font-semibold bg-[#F8F5EF] text-[#163C3B] hover:bg-white transition-colors"
          >
            Schedule Demonstration Session
          </Link>
        </div>
      </section>
    </div>
  );
}
