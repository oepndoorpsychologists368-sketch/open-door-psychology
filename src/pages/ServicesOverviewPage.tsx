import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Shield, Users, User, HeartHandshake } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SERVICES_LIST } from '../data/services';

export function ServicesOverviewPage() {
  const coreServices = SERVICES_LIST.filter((s) => s.category === 'core');
  const specializedServices = SERVICES_LIST.filter((s) => s.category === 'specialized');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'Services Overview' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Tailored Care Pathways
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Comprehensive Psychological Services
        </h1>
        <p className="font-serif text-xl italic text-[#EFA0BF]">
          “Whether you are coming on your own, with a partner, or seeking support for a teen, our door is open.”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          Every human being encounters thresholds where the tools that once worked are no longer sufficient. Explore our primary therapy formats and specialized support areas below.
        </p>
      </div>

      {/* 1. Core Therapy Formats Section */}
      <section className="space-y-6">
        <div className="border-b border-[#0B0A0D]/10 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
            Core Clinical Disciplines
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Standard modalities offered both in-studio and via secure California telehealth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreServices.map((svc) => (
            <div
              key={svc.slug}
              className="rounded-3xl bg-[#FFFFFF] border border-[#0B0A0D]/10 p-8 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono">{svc.sessionStructure.duration}</span>
                  <span className="capitalize">{svc.sessionStructure.cadence}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#0B0A0D] group-hover:text-[#151218]">
                  {svc.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {svc.shortDescription}
                </p>

                <div className="pt-3 border-t border-neutral-100">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B0A0D]/70 block mb-2">
                    Common Focus Areas:
                  </span>
                  <ul className="text-xs text-neutral-500 space-y-1">
                    {svc.idealFor.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#EFA0BF] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  to={`/services/${svc.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B0A0D] hover:underline"
                >
                  <span>Detailed service overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/appointment?service=${svc.slug}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-colors"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Specialized Clinical Support Areas */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-[#0B0A0D]/10 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
            Focused Support Areas
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Empathetic, nonjudgmental approaches tailored to specific emotional and physiological experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specializedServices.map((svc) => (
            <div
              key={svc.slug}
              className="rounded-3xl bg-[#FFF9FC] border border-[#0B0A0D]/15 p-7 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-neutral-400">
                  {svc.sessionStructure.duration}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0B0A0D]">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {svc.shortDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0B0A0D]/10 flex items-center justify-between">
                <Link
                  to={`/support/${svc.slug}`}
                  className="text-xs font-bold text-[#0B0A0D] group-hover:underline flex items-center gap-1"
                >
                  <span>Read pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/appointment?service=${svc.slug}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#0B0A0D] border border-[#0B0A0D]/20 hover:bg-[#FBE3EC]/40"
                >
                  Schedule
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Helpful Guidance Callout */}
      <div className="rounded-3xl bg-[#0B0A0D] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl font-bold">Unsure which service suits you best?</h3>
          <p className="text-xs sm:text-sm text-neutral-300">
            You don’t need to diagnose yourself. Choose “Help me choose” during booking or contact our intake coordinator for guidance.
          </p>
        </div>
        <Link
          to="/appointment?psychologist=help-me-choose"
          className="px-6 py-3 rounded-full text-xs font-semibold bg-[#FFF9FC] text-[#0B0A0D] hover:bg-white transition-colors shrink-0"
        >
          Help Me Choose a Service
        </Link>
      </div>
    </div>
  );
}
