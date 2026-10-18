import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { JOURNAL_ARTICLES } from '../data/journal';
import { PSYCHOLOGISTS_LIST } from '../data/psychologists';
import { psychologistAvatars } from '../data/assets';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, CheckCircle2, Bookmark } from 'lucide-react';

export function JournalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  const author = PSYCHOLOGISTS_LIST.find((p) => p.slug === article.authorSlug);
  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Journal', path: '/journal' },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="font-semibold text-[#0B0A0D] uppercase tracking-wider">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishDate}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTimeMinutes} min read</span>
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D] text-balance">
          {article.title}
        </h1>

        <p className="font-serif text-xl sm:text-2xl italic text-[#EFA0BF]">
          “{article.subtitle}”
        </p>

        {/* Author Byline */}
        {author && (
          <div className="pt-4 pb-2 border-y border-[#0B0A0D]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100">
                <img src={psychologistAvatars[author.slug]} alt={author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <Link to={`/psychologists/${author.slug}`} className="text-xs font-bold text-[#0B0A0D] hover:underline">
                  {author.name}
                </Link>
                <div className="text-[11px] text-neutral-500">{author.title}</div>
              </div>
            </div>

            <Link
              to={`/appointment?psychologist=${author.slug}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] hidden sm:block"
            >
              Consult with Author
            </Link>
          </div>
        )}
      </header>

      {/* Table of Contents & Key Summary Card */}
      <div className="rounded-2xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-6 space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Article Outline &amp; Summary
        </div>
        <p className="text-xs sm:text-sm text-neutral-700 italic">
          {article.summary}
        </p>
        <div className="pt-2 border-t border-[#0B0A0D]/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
            In this essay:
          </span>
          <ul className="text-xs text-[#0B0A0D] space-y-1 font-medium">
            {article.sections.map((sec, i) => (
              <li key={i}>
                • {sec.heading}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Editorial Body Prose */}
      <div className="space-y-10 text-neutral-800 leading-relaxed text-sm sm:text-base">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
              {section.heading}
            </h2>
            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-neutral-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Key Takeaways Box */}
      <div className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-4 shadow-xs">
        <h3 className="font-serif text-xl font-bold text-[#0B0A0D]">
          Reflective Takeaways
        </h3>
        <ul className="space-y-2.5">
          {article.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-[#FBE3EC] shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Reading */}
      <div className="pt-8 border-t border-[#0B0A0D]/10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
            Related Readings
          </h3>
          <Link to="/journal" className="text-xs font-semibold text-[#0B0A0D] hover:underline">
            View all articles &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.slug}
              to={`/journal/${rel.slug}`}
              className="p-6 rounded-2xl bg-white border border-[#0B0A0D]/10 hover:border-[#0B0A0D]/30 hover:shadow-xs transition-all block group"
            >
              <div className="text-[11px] font-semibold uppercase text-neutral-400 mb-1">
                {rel.category} · {rel.readingTimeMinutes} min
              </div>
              <h4 className="font-serif text-lg font-bold text-[#0B0A0D] group-hover:text-[#151218]">
                {rel.title}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{rel.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
