import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQ_LIST } from '../data/faqs';
import { ChevronDown, HelpCircle, ArrowRight, Search, X } from 'lucide-react';

export function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'faq-1': true });

  const categories = ['all', 'Starting Out', 'Sessions & Approach', 'Fees & Admin', 'Privacy & Rights'];

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_LIST.forEach((f) => {
      allOpen[f.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
    const queryMatch =
      !searchQuery.trim() ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && queryMatch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Knowledge Base &amp; Guidance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Frequently Asked Questions
        </h1>
        <p className="font-serif text-xl italic text-[#EFA0BF]">
          “Every question is valid, especially the ones you feel hesitant to voice.”
        </p>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Clear answers about session logistics, choosing your clinician, confidentiality, and out-of-network insurance reimbursement.
        </p>
      </div>

      {/* Search Input & Category Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. insurance, first session, confidentiality)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-[#0B0A0D]/10 text-sm focus:outline-hidden focus:border-[#0B0A0D] focus:ring-1 focus:ring-[#0B0A0D]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs & Expand/Collapse Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'all'
                  ? FAQ_LIST.length
                  : FAQ_LIST.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#0B0A0D] text-white'
                      : 'bg-white text-neutral-600 border border-[#0B0A0D]/10 hover:bg-[#FFF9FC]'
                  }`}
                >
                  <span>{cat === 'all' ? 'All Questions' : cat}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="text-[#0B0A0D] hover:underline font-medium cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-neutral-300">·</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-neutral-500 hover:underline cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white border border-neutral-100 p-8 space-y-2">
            <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto" />
            <p className="text-sm font-medium text-neutral-600">No matching questions found.</p>
            <p className="text-xs text-neutral-400">Try adjusting your search terms or view all categories.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#0B0A0D]/10 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FFF9FC]/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B0A0D]/60">
                      {faq.category}
                    </span>
                    <h2 className="font-serif text-lg font-bold text-[#0B0A0D]">
                      {faq.question}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 mt-1 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0B0A0D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#FFF9FC]/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have a Question? */}
      <div className="rounded-3xl bg-[#FFFFFF] border border-[#0B0A0D]/10 p-8 text-center space-y-3">
        <h3 className="font-serif text-xl font-bold text-[#0B0A0D]">
          Have a question not addressed here?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
          Our intake team is happy to provide confidential answers regarding your individual circumstances.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-colors"
          >
            Send an Inquiry
          </Link>
          <Link
            to="/appointment"
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#FFF9FC] text-[#0B0A0D] border border-[#0B0A0D]/10 hover:bg-[#FBE3EC]/30 transition-colors"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
