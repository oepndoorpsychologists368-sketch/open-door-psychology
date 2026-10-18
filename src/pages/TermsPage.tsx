import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FileCheck, Shield, AlertTriangle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Website Conditions
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Terms of Use
        </h1>
        <p className="font-serif text-lg italic text-[#EFA0BF]">
          “Understanding the scope, limits, and purpose of our digital presence.”
        </p>
        <p className="text-xs text-neutral-400">
          Last Updated: October 2026 · Demonstrative Terms
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0B0A0D]">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2>1. No Therapist-Client Relationship Established Online</h2>
          </div>
          <p>
            Visiting this website, reading journal publications, exploring service pages, or submitting an appointment request through the interactive booking wizard does <strong>not</strong> establish a therapist-client or physician-patient relationship.
          </p>
          <p>
            A formal therapeutic alliance is initiated solely after direct mutual intake consultation, verification of clinical jurisdiction, and the mutual execution of formal informed consent and clinical engagement agreements.
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0B0A0D]">
            <Shield className="w-5 h-5 text-[#0B0A0D]" />
            <h2>2. Informational &amp; Educational Purpose Only</h2>
          </div>
          <p>
            All content published on this website—including articles in the Journal, descriptions of anxiety, depression, couples therapy, and grounding exercises—is provided exclusively for educational and reflective purposes.
          </p>
          <p>
            It is not medical advice, individualized clinical diagnosis, or a substitute for professional mental health evaluation. If you are experiencing distress, you should always seek direct evaluation from a licensed healthcare provider.
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0B0A0D]">
            <FileCheck className="w-5 h-5 text-[#0B0A0D]" />
            <h2>3. Interactive Demonstration Limitations</h2>
          </div>
          <p>
            The scheduling feature provided on this website is an interactive prototype demonstrating user experience and appointment workflow. Time slots shown reflect demonstrative schedules and do not indicate guaranteed real-time availability.
          </p>
        </section>
      </div>
    </div>
  );
}
