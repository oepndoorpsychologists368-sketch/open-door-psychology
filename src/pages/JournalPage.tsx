import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { JOURNAL_ARTICLES } from '../data/journal';
import { PSYCHOLOGISTS_LIST } from '../data/psychologists';
import { siteImages, psychologistAvatars } from '../data/assets';
import { Search, Clock, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const categories = ['all', 'Foundations', 'Anxiety & Calm', 'Relationships', 'Reflection', 'Mindfulness'];

  const filteredArticles = JOURNAL_ARTICLES.filter((art) => {
    const categoryMatch = selectedCategory === 'all' || art.category === selectedCategory;
    const queryMatch =
      !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && queryMatch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const featuredArticle = JOURNAL_ARTICLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'Journal & Resources' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
          The Open Door Journal
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163C3B]">
          Reflections on Mind, Body &amp; Vulnerability
        </h1>
        <p className="font-serif text-xl italic text-[#D8A69C]">
          “Original essays on emotional pacing, nervous system regulation, and modern relationships.”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          Written by our clinical psychologists to offer grounded perspective, compassionate reflections, and actionable grounding tools between therapy sessions.
        </p>
      </div>

      {/* Featured Lead Editorial Article */}
      {featuredArticle && currentPage === 1 && selectedCategory === 'all' && !searchQuery && (
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#163C3B]/10 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-[#163C3B] uppercase tracking-wider">{featuredArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredArticle.publishDate}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{featuredArticle.readingTimeMinutes} min read</span>
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B] text-balance">
              <Link to={`/journal/${featuredArticle.slug}`} className="hover:text-[#1D4E4D]">
                {featuredArticle.title}
              </Link>
            </h2>

            <p className="font-serif text-base italic text-[#D8A69C]">
              {featuredArticle.subtitle}
            </p>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {featuredArticle.summary}
            </p>

            <div className="pt-2">
              <Link
                to={`/journal/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#163C3B] text-white hover:bg-[#1D4E4D] transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[340px]">
            <img
              src={siteImages.journalStillLife}
              alt="Reflective journal with tea and pen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search articles by theme or keyword..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[#163C3B]/10 text-xs sm:text-sm focus:outline-hidden focus:border-[#163C3B]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const count =
              cat === 'all'
                ? JOURNAL_ARTICLES.length
                : JOURNAL_ARTICLES.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-[#163C3B] text-white'
                    : 'bg-white text-neutral-600 border border-[#163C3B]/10 hover:bg-[#F8F5EF]'
                }`}
              >
                <span>{cat === 'all' ? 'All Articles' : cat}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Article Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((art) => {
            const author = PSYCHOLOGISTS_LIST.find((p) => p.slug === art.authorSlug);
            return (
              <article
                key={art.slug}
                className="rounded-3xl bg-white border border-[#163C3B]/10 p-7 flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-[#163C3B] uppercase tracking-wider text-[11px]">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readingTimeMinutes} min</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#163C3B] group-hover:text-[#1D4E4D]">
                    <Link to={`/journal/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>

                  {author && (
                    <div className="pt-2 flex items-center gap-2.5 text-xs text-neutral-500">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-100">
                        <img src={psychologistAvatars[author.slug]} alt={author.name} className="w-full h-full object-cover" />
                      </div>
                      <span>By {author.name.split(',')[0]}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={`/journal/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163C3B] group-hover:underline"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-neutral-400">{art.publishDate}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Working Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-[#163C3B]/10">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#163C3B]/10 text-[#163C3B] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F8F5EF] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg font-semibold transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#163C3B] text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#F8F5EF]'
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#163C3B]/10 text-[#163C3B] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F8F5EF] transition-colors cursor-pointer"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Meditative Interlude Banner */}
      <div className="rounded-3xl bg-[#F8F5EF] border border-[#163C3B]/10 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3 aspect-4/3 rounded-2xl overflow-hidden shadow-xs">
          <img
            src={siteImages.stoneBalance}
            alt="Mindful stone balance sculpture on travertine"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
            Somatic Integration
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#163C3B]">
            Reading is reflection; practice is transformation.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Intellectual insight alone rarely heals relational loops or chronic worry. In therapy, we translate ideas into embodied safety through paced nervous system attunement.
          </p>
          <div className="pt-1">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163C3B] hover:underline"
            >
              <span>Begin one-on-one sessions with our team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
