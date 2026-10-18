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
    <footer className="bg-[#0B0A0D] text-[#FFF9FC] pt-16 pb-12 mt-24 border-t border-[#F6C5D7]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency Crisis Notice Banner */}
        <div className="mb-14 rounded-2xl bg-[#151218] border border-[#EFA0BF]/30 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_10px_30px_rgba(11,10,13,0.5)]">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="w-5 h-5 text-[#EFA0BF] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#FFF9FC]/95 leading-relaxed">
              <span className="font-bold text-[#F6C5D7]">Immediate Crisis Notice: </span>
              <span>
                If you or someone you care about is experiencing immediate psychological danger, suicidal thoughts, or severe distress, please dial or text <strong className="text-white underline decoration-[#EFA0BF]">988</strong> (Suicide &amp; Crisis Lifeline) or proceed to the nearest emergency medical room.
              </span>
            </div>
          </div>
          <Link
            to="/urgent-help"
            className="px-4 py-2 rounded-full text-xs font-bold bg-[#F6C5D7] text-[#0B0A0D] hover:bg-[#EFA0BF] transition-all whitespace-nowrap shrink-0 shadow-[0_2px_10px_rgba(246,197,215,0.3)]"
          >
            Emergency Resources
          </Link>
        </div>

        {/* Main 4-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F6C5D7]/15">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-[#151218] border border-[#F6C5D7]/40 text-[#F6C5D7] flex items-center justify-center font-serif font-bold text-lg group-hover:scale-105 transition-all">
                OD
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFF9FC] group-hover:text-[#F6C5D7] transition-colors">
                {BRAND_CONFIG.name}
              </span>
            </Link>

            <div className="space-y-1">
              <p className="font-serif text-xl italic text-[#F6C5D7]">
                “{BRAND_CONFIG.primaryTagline}”
              </p>
              <p className="text-xs text-[#BEB7C0] font-medium tracking-wide">
                “{BRAND_CONFIG.supportingTagline}”
              </p>
            </div>

            <p className="text-xs text-[#BEB7C0] max-w-sm leading-relaxed">
              {BRAND_CONFIG.leadParagraph}
            </p>

            <div className="pt-2 text-xs text-[#BEB7C0] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EFA0BF]" />
                <span>{BRAND_CONFIG.contact.addressLine1}, {BRAND_CONFIG.contact.cityRegion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#EFA0BF]" />
                <span>{BRAND_CONFIG.contact.phoneDemo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#EFA0BF]" />
                <span>{BRAND_CONFIG.contact.hoursWeekdays}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Clinical Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F6C5D7] font-sans">
              Therapy Services
            </div>
            <ul className="space-y-2 text-xs text-[#BEB7C0]">
              {SERVICES_LIST.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-[#F6C5D7] transition-colors block py-0.5"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-[#EFA0BF] font-semibold hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View All Services</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Support Areas */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F6C5D7] font-sans">
              Specialized Care
            </div>
            <ul className="space-y-2 text-xs text-[#BEB7C0]">
              <li>
                <Link to="/support/anxiety-stress" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Anxiety &amp; Panic Relief
                </Link>
              </li>
              <li>
                <Link to="/support/depression" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Depression &amp; Burnout
                </Link>
              </li>
              <li>
                <Link to="/support/trauma" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Trauma &amp; Somatic Recovery
                </Link>
              </li>
              <li>
                <Link to="/psychologists" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Meet Our Clinicians
                </Link>
              </li>
              <li>
                <Link to="/fees" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Fees &amp; Superbill Estimator
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sanctuary & Policies */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F6C5D7] font-sans">
              Sanctuary &amp; Legal
            </div>
            <ul className="space-y-2 text-xs text-[#BEB7C0]">
              <li>
                <Link to="/about" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  About Open Door
                </Link>
              </li>
              <li>
                <Link to="/approach" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Our Non-Directive Approach
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  The Sanctuary Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Location &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Privacy Policy &amp; Confidentiality
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Terms of Care
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-[#F6C5D7] transition-colors block py-0.5">
                  Accessibility Commitment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#BEB7C0]">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[11px] text-[#BEB7C0]/80 max-w-2xl">
              {BRAND_CONFIG.disclaimers.demoNotice}
            </p>
            <p className="text-[11px] text-[#BEB7C0]/60">
              © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Licensed Clinical Psychology Sanctuary.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#151218] border border-[#F6C5D7]/30 text-xs font-semibold text-[#F6C5D7] hover:bg-[#F6C5D7] hover:text-[#0B0A0D] transition-all cursor-pointer shadow-xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
