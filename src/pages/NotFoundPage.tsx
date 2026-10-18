import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      <div className="space-y-3">
        <span className="font-serif text-6xl sm:text-7xl font-bold text-[#D8A69C]">
          404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#163C3B]">
          A Room That Doesn't Exist
        </h1>
        <p className="font-serif text-lg italic text-[#252927]/70">
          “You took a turn into quiet space. Let’s guide you back to open ground.”
        </p>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
          The page you requested may have moved or been updated. You can return home or browse our primary pathways below.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#163C3B] text-white hover:bg-[#1D4E4D] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#F8F5EF] text-[#163C3B] border border-[#163C3B]/20 hover:bg-[#C7D4C1]/30 transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Browse Services</span>
        </Link>
        <Link
          to="/appointment"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-white text-[#163C3B] border border-[#163C3B]/20 hover:bg-[#F8F5EF] transition-colors"
        >
          <span>Book Demo Consultation</span>
        </Link>
      </div>
    </div>
  );
}
