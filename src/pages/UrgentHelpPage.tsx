import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldAlert, PhoneCall, MessageSquare, AlertTriangle, Globe } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';

export function UrgentHelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Urgent Help & Safety Resources' }]} />

      {/* Critical Disclaimer Alert */}
      <div className="rounded-3xl bg-rose-50 border-2 border-rose-300 p-8 sm:p-10 space-y-4 text-rose-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-200 text-rose-900 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            If You Are in Immediate Crisis or Danger
          </h1>
        </div>

        <p className="text-sm sm:text-base leading-relaxed font-medium">
          Open Door Psychology &amp; Wellness is a scheduled outpatient psychotherapy practice. We do <strong>not</strong> operate a 24/7 emergency psychiatric service, crisis response unit, or emergency hotline.
        </p>

        <p className="text-xs sm:text-sm leading-relaxed">
          If you, a family member, or someone you know is in acute distress, experiencing suicidal thoughts, self-harm impulses, or facing immediate physical danger, please utilize one of the accredited emergency resources below right now.
        </p>
      </div>

      {/* Primary Emergency Hotlines (Accredited Public Services) */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
          Accredited 24/7 Crisis Support Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 988 Suicide & Crisis Lifeline */}
          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <PhoneCall className="w-4 h-4 text-rose-700" />
              <span>United States &amp; Canada</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#163C3B]">
              988 Suicide &amp; Crisis Lifeline
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Free, confidential 24/7 telephone and chat support for individuals in suicidal crisis or emotional distress.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#163C3B]">
              Dial or Text: <span className="font-mono text-sm bg-neutral-100 px-2 py-0.5 rounded-md">988</span>
            </div>
          </div>

          {/* Crisis Text Line */}
          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <MessageSquare className="w-4 h-4 text-[#163C3B]" />
              <span>Free 24/7 Text Support</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#163C3B]">
              Crisis Text Line
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Connect with a trained crisis counselor via confidential text message from anywhere in the US, UK, or Canada.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#163C3B]">
              Text <span className="font-mono text-sm bg-neutral-100 px-2 py-0.5 rounded-md">HOME</span> to <span className="font-mono text-sm bg-neutral-100 px-2 py-0.5 rounded-md">741741</span>
            </div>
          </div>

          {/* Local Emergency Services */}
          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Immediate Physical Danger</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#163C3B]">
              Emergency Medical Services
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If life safety or physical medical care is required, please call your local emergency operator (such as <strong>911</strong> in North America or <strong>112</strong> in Europe) or go directly to the nearest hospital emergency room.
            </p>
          </div>

          {/* International Resources */}
          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Globe className="w-4 h-4 text-[#163C3B]" />
              <span>International Directory</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#163C3B]">
              Befrienders Worldwide &amp; IASP
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If you reside outside the United States, visit the International Association for Suicide Prevention (iasp.info/resources/Crisis_Centres) or findahelpline.com to access free confidential support hotlines in your region.
            </p>
          </div>
        </div>
      </div>

      {/* Grounding & Holding Space Note */}
      <div className="rounded-3xl bg-[#F8F5EF] border border-[#163C3B]/10 p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-[#163C3B]">
          A Grounding Remainder While You Connect
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Acute emotional waves feel permanent in the moment, but physiology changes. Take a slow breath through your nose and allow your exhale to be twice as long. You do not have to carry this storm alone—reaching out for support is an act of supreme courage.
        </p>
      </div>
    </div>
  );
}
