import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Filter, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PSYCHOLOGISTS_LIST } from '../data/psychologists';
import { psychologistAvatars } from '../data/assets';

export function PsychologistsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedFocus, setSelectedFocus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const filteredPsychologists = PSYCHOLOGISTS_LIST.filter((p) => {
    const langMatch =
      selectedLanguage === 'all' || p.languages.includes(selectedLanguage);
    const focusMatch =
      selectedFocus === 'all' ||
      p.focusAreas.some((f) => f.toLowerCase().includes(selectedFocus.toLowerCase()));
    return langMatch && focusMatch;
  });

  const totalPages = Math.ceil(filteredPsychologists.length / itemsPerPage) || 1;
  const paginatedPsychologists = filteredPsychologists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (focus: string) => {
    setSelectedFocus(focus);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Our Psychologists' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          The Clinical Team
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Meet Our Clinicians
        </h1>
        <p className="font-serif text-xl italic text-[#EFA0BF]">
          “We believe the best therapy is rooted in deep warmth, clinical excellence, and unconditional respect.”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          Our team comprises licensed clinical psychologists, marriage and family therapists, and clinical social workers dedicated to nuanced, unhurried mental healthcare.
        </p>
      </div>

      {/* Clear Demonstration Notice Badge */}
      <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Profiles Notice: </strong>
          The profiles below are fictional demonstration placeholders designed for Open Door Psychology &amp; Wellness. They demonstrate layout, clinical approaches, and scheduling workflows. Fictional credentials are not represented as real.
        </div>
      </div>

      {/* Interactive Filters Bar with Count Indicator */}
      <div className="rounded-2xl bg-white border border-[#0B0A0D]/10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <Filter className="w-3.5 h-3.5 text-[#0B0A0D]" />
          <span>Showing {filteredPsychologists.length} of {PSYCHOLOGISTS_LIST.length} Clinicians</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedFocus === 'all'
                ? 'bg-[#0B0A0D] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Specialties
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('anxiety')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedFocus === 'anxiety'
                ? 'bg-[#0B0A0D] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Anxiety &amp; Burnout
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('trauma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedFocus === 'trauma'
                ? 'bg-[#0B0A0D] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Trauma &amp; Somatic
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('couples')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedFocus === 'couples'
                ? 'bg-[#0B0A0D] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Couples &amp; Family
          </button>
        </div>
      </div>

      {/* Psychologist Directory Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedPsychologists.map((psy) => (
            <div
              key={psy.slug}
              className="rounded-3xl bg-white border border-[#0B0A0D]/10 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div>
                <div className="relative aspect-16/10 bg-[#FFF9FC] overflow-hidden">
                  <img
                    src={psychologistAvatars[psy.slug]}
                    alt={psy.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#0B0A0D] shadow-xs">
                    {psy.experienceYears} Years Exp.
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0B0A0D] group-hover:text-[#151218]">
                      {psy.name}
                    </h3>
                    <div className="text-xs font-medium text-[#EFA0BF]">{psy.title}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {psy.bio}
                  </p>

                  <div className="pt-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0B0A0D]/60 mb-1.5">
                      Areas of Clinical Interest:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {psy.focusAreas.map((f, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-neutral-600 bg-[#FFF9FC] px-2.5 py-0.5 rounded-md border border-[#0B0A0D]/5"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-neutral-500 italic">
                    {psy.philosophicalNote}
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0 border-t border-neutral-100 flex items-center justify-between mt-4">
                <Link
                  to={`/psychologists/${psy.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0B0A0D] hover:underline"
                >
                  <span>Full biography &amp; approach</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/appointment?psychologist=${psy.slug}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-colors"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Working Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-[#0B0A0D]/10">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#0B0A0D]/10 text-[#0B0A0D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FFF9FC] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg font-semibold transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#0B0A0D] text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#FFF9FC]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <span className="ml-2 text-neutral-400">Page {currentPage} of {totalPages}</span>
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#0B0A0D]/10 text-[#0B0A0D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FFF9FC] transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Matchmaking Help Card */}
      <div className="rounded-3xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
            Need help finding the right clinician match?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg">
            Tell us about your scheduling needs and what you hope to explore. Our intake coordinator will suggest the best fit.
          </p>
        </div>
        <Link
          to="/appointment?psychologist=help-me-choose"
          className="px-6 py-3 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-colors shrink-0"
        >
          Match Me with a Psychologist
        </Link>
      </div>
    </div>
  );
}
