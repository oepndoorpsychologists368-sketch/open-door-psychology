import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Shield, Compass, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BRAND_CONFIG } from '../data/brand';
import { siteImages } from '../data/assets';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Split Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            Our Purpose &amp; Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163C3B] text-balance">
            Creating an Unhurried Sanctuary for Honest Human Recovery
          </h1>
          <p className="font-serif text-xl italic text-[#D8A69C]">
            “We founded Open Door on a simple premise: care shouldn’t require you to apologize for your distress.”
          </p>
          <p className="text-base text-neutral-600 leading-relaxed">
            Founded in San Francisco, Open Door Psychology &amp; Wellness is a boutique private mental health practice designed from the ground up to counteract the sterile, rushed atmosphere of modern corporate healthcare.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/appointment"
              className="px-6 py-3 rounded-full text-xs font-semibold text-[#F8F5EF] bg-[#163C3B] hover:bg-[#1D4E4D] transition-colors"
            >
              Book an Initial Consultation
            </Link>
            <Link
              to="/psychologists"
              className="px-6 py-3 rounded-full text-xs font-medium text-[#163C3B] border border-[#163C3B]/20 hover:bg-[#163C3B]/5 transition-colors"
            >
              Meet Our Clinicians
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-[#163C3B]/10 aspect-4/5">
            <img
              src={siteImages.architecturalArch}
              alt="Open Door peaceful architectural archway"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* The Origin of "Don't Cry. Just Come." */}
      <section className="rounded-3xl bg-[#FFFFFF] border border-[#163C3B]/10 p-8 sm:p-12 space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            The Origin of Our Motto
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#163C3B]">
            Why “Don’t Cry. Just Come.”?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Time and time again, our clinical team heard prospective clients say on phone inquiries: <em>“I wanted to call you two months ago, but I couldn’t stop crying, and I didn’t want to be a burden on the phone.”</em>
          </p>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            That revelation broke our hearts. The very emotion that signaled the need for care was being interpreted as a barrier to receiving it. We decided right then to write our welcome on the front door: you do not have to hold back tears. You do not need to compose a neat thesis about your feelings. You just have to come as you are.
          </p>
        </div>
      </section>

      {/* Core Practice Values Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            What Drives Us Every Day
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#163C3B]">
            Our Foundational Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C7D4C1]/40 text-[#163C3B] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              Ethical Integrity &amp; Strict Discretion
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We operate outside insurance networks precisely to ensure no diagnostic labels are permanently stamped on medical histories without explicit clinical necessity.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D8A69C]/40 text-[#163C3B] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              Relational Collaboration
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We never position ourselves as detached authoritarian figures dispensing generic advice. We walk beside you with curiosity, humility, and warmth.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] border border-[#163C3B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9D1E7]/50 text-[#163C3B] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163C3B]">
              Environment as Medicine
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              From our natural oak furnishings and acoustic tranquility to our gentle lighting and warm tea, every physical element is attuned to down-regulating your nervous system.
            </p>
          </div>
        </div>
      </section>

      {/* Sanctuary Environment Visual Spread */}
      <section className="rounded-3xl overflow-hidden bg-white border border-[#163C3B]/10 grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 h-full min-h-[340px]">
          <img
            src={siteImages.botanicalCourtyard}
            alt="Sanctuary courtyard with natural water and timber"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            A Space Crafted for Safety
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#163C3B]">
            Why the Physical Setting Matters
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Trauma and anxiety live deeply in our nervous systems. When you walk into fluorescent-lit hallways with humming machinery and clipboard queues, your autonomic threat detection system spikes.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            We selected natural timber, tactile ceramics, sound-damped wool rugs, and living greenery so your body receives continuous biological signals that you are completely safe.
          </p>
          <div className="pt-2">
            <Link
              to="/approach"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163C3B] hover:underline"
            >
              <span>Explore our collaborative approach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="rounded-3xl bg-[#163C3B] text-white p-8 sm:p-12 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Ready to experience a different kind of psychology practice?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
          We invite you to reach out for a demonstration consultation or ask any questions about our clinicians.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            to="/appointment"
            className="px-6 py-3 rounded-full text-xs font-semibold bg-[#F8F5EF] text-[#163C3B] hover:bg-white transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
