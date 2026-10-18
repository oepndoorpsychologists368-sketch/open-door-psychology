import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Layers, HeartHandshake, Compass, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteImages } from '../data/assets';

export function ApproachPage() {
  const approaches = [
    {
      title: 'Attentive, Non-Directive Listening',
      description:
        'In regular conversation, people listen while preparing their next rebuttal or advice. In our rooms, listening is an act of deep attunement. We listen not only to your words, but to pauses, vocal cadence, and the bodily sensations accompanying your memories.',
    },
    {
      title: 'Integrative, Pluralistic Modalities',
      description:
        'No single psychological framework holds a monopoly on healing. We tailor our clinical toolkit to your specific nervous system—integrating psychodynamic insight, Acceptance and Commitment Therapy (ACT), somatic experiencing, and narrative reflection.',
    },
    {
      title: 'Respecting Defenses and Boundaries',
      description:
        'We never tear down emotional walls with forceful confrontation. The defenses you built developed for very valid reasons during past threats. We treat those boundaries with respect, helping you assess whether they are still serving you today.',
    },
    {
      title: 'Pacing Governed by Your Nervous System',
      description:
        'True neurobiological rewiring cannot be rushed. Moving too fast creates flooding and retraumatization. We move at the speed of safety, allowing your system to consolidate new feelings of security before exploring deeper terrain.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'Our Approach' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Clinical Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D] text-balance">
          Therapy as Collaboration, Not Correction
        </h1>
        <p className="font-serif text-xl italic text-[#EFA0BF]">
          “We don’t believe individuals are broken machines needing assembly-line repair.”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          Human emotional distress is a natural response to complex relational, cultural, and biological circumstances. Rather than imposing rigid, scripted formulas, we co-create a reflective relationship where your autonomy remains paramount.
        </p>
      </div>

      {/* Split Image Feature */}
      <div className="rounded-3xl bg-[#FFFFFF] border border-[#0B0A0D]/10 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
            The Consulting Alliance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
            Why the Therapeutic Relationship Matters Most
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Decades of outcome research confirm what intuition tells us: the specific technique used matters far less than the authenticity of the bond between client and therapist.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            When you experience steady, compassionate consistency from another person week after week, your nervous system learns that it is possible to be seen fully without abandonment or reproach.
          </p>
          <div className="pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B0A0D] hover:underline"
            >
              <span>Begin with an intake consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 h-full min-h-[300px]">
          <img
            src={siteImages.counselingSpace}
            alt="Warm consulting chairs in serene therapy space"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4 Pillars of Our Approach */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
            How We Work In Practice
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0B0A0D]">
            Four Core Tenets of Our Care
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approaches.map((app, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#FFFFFF] border border-[#0B0A0D]/10 p-7 space-y-3"
            >
              <div className="text-xs font-mono font-bold text-[#EFA0BF]">
                0{index + 1}.
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B0A0D]">
                {app.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrative Modalities Table */}
      <div className="rounded-3xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-8 sm:p-10 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
          Evidence-Based Modalities We Draw Upon
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
          Rather than dogmatically forcing one school of thought, our clinicians blend methods based on your individual needs and goals:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white border border-[#0B0A0D]/5 space-y-1.5">
            <h4 className="font-semibold text-xs text-[#0B0A0D]">Psychodynamic Insight</h4>
            <p className="text-xs text-neutral-500">Unearthing early relational habits, unconscious patterns, and recurring emotional scripts.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#0B0A0D]/5 space-y-1.5">
            <h4 className="font-semibold text-xs text-[#0B0A0D]">Acceptance &amp; Commitment (ACT)</h4>
            <p className="text-xs text-neutral-500">Defusing anxious rumination and anchoring daily behavior to what you truly value.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#0B0A0D]/5 space-y-1.5">
            <h4 className="font-semibold text-xs text-[#0B0A0D]">Somatic &amp; Nervous System Reg</h4>
            <p className="text-xs text-neutral-500">Listening to the physiological body, down-regulating flight responses through grounding.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#0B0A0D]/5 space-y-1.5">
            <h4 className="font-semibold text-xs text-[#0B0A0D]">Emotion-Focused Couples (EFT)</h4>
            <p className="text-xs text-neutral-500">De-escalating cycles of conflict and building durable attachment security between partners.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#0B0A0D]/5 space-y-1.5">
            <h4 className="font-semibold text-xs text-[#0B0A0D]">Dialectical Skills (DBT)</h4>
            <p className="text-xs text-neutral-500">Practical distress tolerance, emotional regulation, and assertive interpersonal boundary skills.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#0B0A0D]/5 space-y-1.5">
            <h4 className="font-semibold text-xs text-[#0B0A0D]">Trauma-Informed Phased Care</h4>
            <p className="text-xs text-neutral-500">Prioritizing emotional stabilization and agency before processing painful memories.</p>
          </div>
        </div>
      </div>

      {/* Somatic Balance Visual Spread */}
      <section className="rounded-3xl overflow-hidden bg-white border border-[#0B0A0D]/10 grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
            Internal Alignment
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
            Equilibrium is an active practice, not a static state.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Just like balanced river stones, emotional equilibrium requires acknowledging shifting currents and gravity. We help you develop the internal flexibility to sway with life without toppling.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/appointment"
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-colors"
            >
              Book an Initial Consultation
            </Link>
            <Link
              to="/psychologists"
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#FFF9FC] text-[#0B0A0D] hover:bg-[#FBE3EC]/40 transition-colors"
            >
              Browse Clinicians
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 h-full min-h-[300px]">
          <img
            src={siteImages.stoneBalance}
            alt="Mindful river stone balance on travertine pedestal"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
