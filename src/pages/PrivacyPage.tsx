import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock, HardDrive, EyeOff } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Transparency &amp; Data Ethics
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Privacy Policy
        </h1>
        <p className="font-serif text-lg italic text-[#EFA0BF]">
          “How data is handled within this frontend prototype.”
        </p>
        <p className="text-xs text-neutral-400">
          Last Updated: October 2026 · Effective Immediately
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0B0A0D]">
            <HardDrive className="w-5 h-5 text-[#0B0A0D]" />
            <h2>1. Frontend-Only Architecture &amp; Local Storage</h2>
          </div>
          <p>
            Open Door Psychology &amp; Wellness operates this website purely as a modern client-side application. There is <strong>no backend database, no cloud storage bucket, and no remote server API</strong> receiving user entries.
          </p>
          <p>
            When you interact with the Appointment Booking Wizard or the Contact Inquiry Form, any sample entries you provide (such as names, dates, or emails) are processed and saved solely inside your local web browser’s temporary storage (<code>localStorage</code>).
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0B0A0D]">
            <Lock className="w-5 h-5 text-[#0B0A0D]" />
            <h2>2. No Server Transmission of Protected Health Information (PHI)</h2>
          </div>
          <p>
            Because this application does not communicate with an external server:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>No personal identifiable information (PII) is uploaded to third-party databases.</li>
            <li>No medical histories, diagnoses, or clinical notes are requested or collected.</li>
            <li>No commercial marketing cookies, advertising pixels, or behavioral tracking telemetry are loaded.</li>
          </ul>
        </section>

        <section className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0B0A0D]">
            <EyeOff className="w-5 h-5 text-[#0B0A0D]" />
            <h2>3. Managing Your Browser Data</h2>
          </div>
          <p>
            You can remove simulated booking requests stored in your browser at any time by:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-600">
            <li>Clicking “Clear Local History” on the Appointment Booking page.</li>
            <li>Clearing your web browser cache or local website storage data for this origin.</li>
          </ul>
        </section>

        <section className="rounded-3xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-8 space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#0B0A0D]">
            4. Real Clinical Privacy Standards
          </h2>
          <p>
            When prospective clients transition from this demonstration to formal care with our licensed practitioners, all formal communications and clinical records are governed by strict state and federal healthcare confidentiality statutes, including the Health Insurance Portability and Accountability Act (HIPAA) and applicable California Board of Psychology regulations.
          </p>
        </section>
      </div>
    </div>
  );
}
