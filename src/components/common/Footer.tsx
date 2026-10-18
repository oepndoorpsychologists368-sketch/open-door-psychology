import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldAlert, MapPin, Phone, Mail, Clock, Heart, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brand';
import { SERVICES_LIST } from '../../data/services';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#163C3B] text-[#F8F5EF] pt-16 pb-12 mt-24 border-t border-[#163C3B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency Crisis Notice Banner */}
        <div className="mb-14 rounded-2xl bg-white/[0.06] border border-white/12 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="w-5 h-5 text-[#D8A69C] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#F8F5EF]/95 leading-relaxed">
              <span className="font-semibold text-[#D8A69C]">Immediate Crisis Notice: </span>
              <span>
                If you or someone you care about is experiencing immediate psychological danger, suicidal thoughts, or severe distress, please dial or text <strong className="text-white underline">988</strong> (Suicide &amp; Crisis Lifeline) or proceed to the nearest emergency medical room.
              </span>
            </div>
          </div>
          <Link
            to="/urgent-help"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#D8A69C] text-[#163C3B] hover:bg-[#E8BCB3] transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            Emergency Resources
          </Link>
        </div>

        {/* Main 4-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.12] border border-white/20 text-[#D8A69C] flex items-center justify-center font-serif font-bold text-lg">
                OD
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#F8F5EF]">
                {BRAND_CONFIG.name}
              </span>
            </Link>

            <div className="space-y-1">
              <p className="font-serif text-xl italic text-[#D8A69C]">
                “{BRAND_CONFIG.primaryTagline}”
              </p>
              <p className="text-xs text-[#C7D4C1] font-medium tracking-wide">
                “{BRAND_CONFIG.supportingTagline}”
              </p>
            </div>

            <p className="text-xs text-[#F8F5EF]/75 max-w-sm leading-relaxed">
              {BRAND_CONFIG.leadParagraph}
            </p>

            <div className="pt-2 text-xs text-[#F8F5EF]/70 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8A69C]" />
                <span>{BRAND_CONFIG.contact.addressLine1}, {BRAND_CONFIG.contact.cityRegion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8A69C]" />
                <span>{BRAND_CONFIG.contact.phoneDemo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D8A69C]" />
                <span>{BRAND_CONFIG.contact.hoursWeekdays}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Clinical Services */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C7D4C1] font-sans">
              Therapy Services
            </div>
            <ul className="space-y-2 text-xs text-[#F8F5EF]/80">
              <li>
                <Link to="/services/individual-therapy" className="hover:text-[#D8A69C] transition-colors">
                  Individual Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/couples-therapy" className="hover:text-[#D8A69C] transition-colors">
                  Couples &amp; Relationship Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/family-therapy" className="hover:text-[#D8A69C] transition-colors">
                  Family Systems Support
                </Link>
              </li>
              <li>
                <Link to="/services/child-teen-therapy" className="hover:text-[#D8A69C] transition-colors">
                  Child &amp; Adolescent Care
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/services" className="text-[#D8A69C] hover:underline font-medium">
                  View All Modalities &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Support Areas */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C7D4C1] font-sans">
              Specialized Care
            </div>
            <ul className="space-y-2 text-xs text-[#F8F5EF]/80">
              <li>
                <Link to="/support/anxiety-stress" className="hover:text-[#D8A69C] transition-colors">
                  Anxiety, Panic &amp; Burnout
                </Link>
              </li>
              <li>
                <Link to="/support/depression" className="hover:text-[#D8A69C] transition-colors">
                  Depression &amp; Quiet Heaviness
                </Link>
              </li>
              <li>
                <Link to="/support/trauma" className="hover:text-[#D8A69C] transition-colors">
                  Complex Trauma &amp; Somatic Safety
                </Link>
              </li>
              <li>
                <Link to="/approach" className="hover:text-[#D8A69C] transition-colors">
                  Non-Directive Approach
                </Link>
              </li>
              <li>
                <Link to="/psychologists" className="hover:text-[#D8A69C] transition-colors">
                  Meet Our Psychologists
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Resources & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C7D4C1] font-sans">
              Client Information
            </div>
            <ul className="space-y-2 text-xs text-[#F8F5EF]/80">
              <li>
                <Link to="/appointment" className="hover:text-[#D8A69C] transition-colors font-semibold text-white">
                  Request an Appointment
                </Link>
              </li>
              <li>
                <Link to="/fees" className="hover:text-[#D8A69C] transition-colors">
                  Fees, Insurance &amp; Superbills
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#D8A69C] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#D8A69C] transition-colors">
                  The Open Door Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D8A69C] transition-colors">
                  Studio Location &amp; Directions
                </Link>
              </li>
              <li>
                <Link to="/urgent-help" className="hover:text-[#D8A69C] transition-colors text-rose-300">
                  Crisis Hotlines (988)
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#D8A69C] transition-colors">
                  Privacy Policy &amp; HIPAA
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#D8A69C] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-[#D8A69C] transition-colors">
                  Accessibility Commitment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Demonstration Notice and Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/60">
          <div className="text-center md:text-left space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-[#C7D4C1]/80 max-w-2xl">
              {BRAND_CONFIG.disclaimers.demoNotice}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F8F5EF] text-xs transition-colors cursor-pointer shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D8A69C]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
