import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Clock,
  Compass,
  Sparkles,
  ChevronDown,
  Wind,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { HeroCarePortal } from '../components/wellness/HeroCarePortal';
import { CareMatchmaker } from '../components/wellness/CareMatchmaker';
import { BRAND_CONFIG } from '../data/brand';
import { SERVICES_LIST } from '../data/services';
import { PSYCHOLOGISTS_LIST } from '../data/psychologists';
import { FAQ_LIST } from '../data/faqs';
import { siteImages, psychologistAvatars } from '../data/assets';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-24 sm:space-y-36">
      {/* 1. HERO SECTION WITH INTAKE PORTAL & OPENINGS NAVIGATOR */}
      <section className="relative pt-6 sm:pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & Action Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#163C3B]/80">
                <span>San Francisco Sanctuary &amp; California Telehealth</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#163C3B] leading-[1.08] text-balance">
                  {BRAND_CONFIG.primaryTagline}
                </h1>
                <p className="font-serif text-xl sm:text-2xl italic text-[#D8A69C]">
                  “{BRAND_CONFIG.supportingTagline}”
                </p>
                <p className="text-base sm:text-lg text-[#252927]/85 max-w-xl leading-relaxed">
                  {BRAND_CONFIG.leadParagraph}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#F8F5EF] bg-[#163C3B] hover:bg-[#1D4E4D] shadow-sm active:scale-[0.98] transition-all"
                >
                  <span>Find Your Psychologist</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/approach"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-[#163C3B] bg-[#C7D4C1]/30 hover:bg-[#C7D4C1]/50 border border-[#163C3B]/10 transition-colors"
                >
                  <span>Explore Our Approach</span>
                </Link>
              </div>

              {/* Quiet Proof Markers */}
              <div className="pt-6 border-t border-[#163C3B]/10 flex flex-wrap items-center gap-6 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#163C3B]" />
                  <span>Licensed Clinical Specialists</span>
                </div>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#163C3B]" />
                  <span>No Waiting List for Intake</span>
                </div>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#163C3B]" />
                  <span>In-Person &amp; Telehealth</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Intake Hub & Openings Navigator */}
            <div className="lg:col-span-6 relative">
              <HeroCarePortal />
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL INTRODUCTION: A LITTLE MORE ROOM TO BREATHE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#163C3B]/10 p-8 sm:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
                The Philosophy of Open Door
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B] text-balance">
                A little more room to breathe.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Modern life constantly demands justification. We feel we must earn rest, defend our boundaries, and explain why we feel sorrow when on paper everything looks fine.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Open Door was built as an oasis from that performance. When you sit in our studio or log into our encrypted telehealth space, the expectation to hold everything together stops at the threshold.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#163C3B] hover:underline"
                >
                  <span>Read our story &amp; values</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-16/10">
                <img
                  src={siteImages.therapyRoom}
                  alt="Open Door calm sunlit therapy sanctuary"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163C3B]/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-xs sm:text-sm font-medium italic">
                    “The sanctuary space at Suite 400 — designed intentionally for quiet and restoration.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR WELCOMING PRINCIPLES OF CARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            Our Guiding Anchors
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B]">
            Four Principles of Welcoming Care
          </h2>
          <p className="text-sm text-neutral-600">
            How we hold space, protect your dignity, and partner with you throughout therapy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_CONFIG.principles.map((pr) => (
            <div
              key={pr.number}
              className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-7 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-3">
                <div className="font-serif text-3xl font-bold text-[#D8A69C] group-hover:scale-105 transition-transform duration-300">
                  {pr.number}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#163C3B]">
                  {pr.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {pr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CARE MATCHMAKER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CareMatchmaker />
      </section>

      {/* 5. THERAPY SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
              Care Pathways
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B]">
              Therapy Tailored to Your Life
            </h2>
            <p className="text-sm text-neutral-600 max-w-xl">
              We offer evidence-grounded, compassionate modalities for individuals, couples, adolescents, and families.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#163C3B] hover:underline"
          >
            <span>View all 7 services &amp; support areas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 3).map((svc) => (
            <div
              key={svc.slug}
              className="rounded-3xl bg-[#FFFFFF] border border-[#163C3B]/10 p-7 flex flex-col justify-between hover:border-[#163C3B]/30 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="text-xs font-mono font-medium text-neutral-400">
                  {svc.sessionStructure.duration} · {svc.sessionStructure.cadence}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#163C3B] group-hover:text-[#1D4E4D]">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {svc.shortDescription}
                </p>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#163C3B]/60">
                    Common Focus:
                  </div>
                  <ul className="text-xs text-neutral-500 space-y-1">
                    {svc.idealFor.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#D8A69C] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  to={`/services/${svc.slug}`}
                  className="text-xs font-semibold text-[#163C3B] group-hover:underline flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/appointment?service=${svc.slug}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F8F5EF] text-[#163C3B] hover:bg-[#C7D4C1]/40"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRANQUIL VISUAL REST INTERLUDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden aspect-21/9 shadow-md border border-[#163C3B]/10">
          <img
            src={siteImages.botanicalCourtyard}
            alt="Serene interior Japanese botanical courtyard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#163C3B]/85 via-[#163C3B]/40 to-transparent flex items-center p-8 sm:p-14">
            <div className="max-w-md space-y-3 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C7D4C1]">
                Sanctuary Architecture
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Stillness is not an empty luxury; it is where clarity begins.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200">
                Our physical clinic and online spaces are curated to quiet sensory overload so your nervous system can settle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MEET OUR CLINICIANS PREVIEW */}
      <section className="bg-[#163C3B] text-[#F8F5EF] py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C7D4C1]">
                Clinical Team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Compassionate Clinicians Dedicated to Your Pace
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                Every psychologist at Open Door brings deep empathy, specialized licensing, and a warm, nonjudgmental presence.
              </p>
            </div>
            <Link
              to="/psychologists"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#F8F5EF] text-[#163C3B] hover:bg-white transition-colors"
            >
              <span>Meet all clinicians</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PSYCHOLOGISTS_LIST.slice(0, 3).map((psy) => (
              <div
                key={psy.slug}
                className="rounded-2xl bg-[#1D4E4D] border border-white/10 p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-[#163C3B]">
                    <img
                      src={psychologistAvatars[psy.slug]}
                      alt={psy.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">{psy.name}</h3>
                    <div className="text-xs text-[#D8A69C]">{psy.title}</div>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {psy.bio}
                  </p>
                  <div className="text-[11px] text-[#C7D4C1] italic">
                    {psy.philosophicalNote}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={`/psychologists/${psy.slug}`}
                    className="text-xs font-semibold text-white hover:underline"
                  >
                    View profile &amp; approach &rarr;
                  </Link>
                  <Link
                    to={`/appointment?psychologist=${psy.slug}`}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white"
                  >
                    Request Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOW APPOINTMENTS WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            Uncomplicated Steps
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B]">
            How Beginning Works
          </h2>
          <p className="text-sm text-neutral-600">
            We removed the friction so you can focus on finding your footing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#C7D4C1]/40 text-[#163C3B] flex items-center justify-center font-serif font-bold text-lg">
              1
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              Choose Your Care or Ask Us
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Explore our therapy pathways or choose “Help me choose” in our scheduler. No need to diagnose yourself beforehand.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#D8A69C]/40 text-[#163C3B] flex items-center justify-center font-serif font-bold text-lg">
              2
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              Pick In-Person or Telehealth
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Meet in our quiet San Francisco sanctuary or connect through confidential high-definition video anywhere in California.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#D9D1E7]/50 text-[#163C3B] flex items-center justify-center font-serif font-bold text-lg">
              3
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              Arrive Just as You Are
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              No preparation required. Speak freely, shed the burden of composure, and let your psychologist guide the conversation.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            Answers &amp; Clarity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600">
            Common questions about starting therapy, fees, and what to expect.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.slice(0, 4).map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8F5EF]/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#163C3B]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#163C3B] hover:underline"
          >
            <span>View all questions on privacy, insurance &amp; scheduling</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 10. LARGE FINAL INVITATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#163C3B] via-[#1D4E4D] to-[#163C3B] text-white p-10 sm:p-16 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C7D4C1]">
              The Door is Open
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white text-balance">
              Don’t Cry. Just Come.
            </h2>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              You do not have to carry everything alone until you break. Step inside, catch your breath, and take your next step at your own pace.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/appointment"
              className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#F8F5EF] text-[#163C3B] hover:bg-white shadow-md transition-all active:scale-[0.98]"
            >
              Request Demonstration Consultation
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              Ask an Inquiry Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
