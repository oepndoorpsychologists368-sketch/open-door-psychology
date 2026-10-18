import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, ShieldAlert, Sparkles, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brand';
import { SERVICES_LIST } from '../../data/services';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F5EF]/90 backdrop-blur-md border-b border-[#163C3B]/10 shadow-[0_4px_20px_rgba(22,60,59,0.06)]'
          : 'bg-[#F8F5EF]/75 backdrop-blur-xs border-b border-[#163C3B]/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Zone 1: Brand Wordmark & Arch Monogram */}
          <Link
            to="/"
            className="group flex items-center gap-3 shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163C3B]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#163C3B] text-[#F8F5EF] flex items-center justify-center shadow-xs group-hover:bg-[#1D4E4D] transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" />
                <path d="M4 21h16" />
                <path d="M14 3v18" stroke="#D8A69C" />
                <circle cx="16.5" cy="12" r="1.25" fill="#D8A69C" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#163C3B] whitespace-nowrap group-hover:text-[#1D4E4D] transition-colors">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] font-medium tracking-wider text-[#D8A69C] uppercase font-sans -mt-0.5">
                Psychology &amp; Psychotherapy Sanctuary
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#252927]/80">
            <Link
              to="/about"
              className={`hover:text-[#163C3B] transition-colors whitespace-nowrap ${
                location.pathname === '/about'
                  ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                  : ''
              }`}
            >
              About
            </Link>

            <Link
              to="/approach"
              className={`hover:text-[#163C3B] transition-colors whitespace-nowrap ${
                location.pathname === '/approach'
                  ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                  : ''
              }`}
            >
              Our Approach
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1.5 hover:text-[#163C3B] transition-colors whitespace-nowrap cursor-pointer py-2 ${
                  location.pathname.startsWith('/services') || location.pathname.startsWith('/support')
                    ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                    : ''
                }`}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-[#163C3B] ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white border border-[#163C3B]/10 p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#163C3B]/60 px-3 py-1.5 font-sans">
                    Core Therapy Modalities
                  </div>
                  <div className="space-y-1">
                    {SERVICES_LIST.slice(0, 4).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block px-3 py-2 rounded-xl text-xs hover:bg-[#F8F5EF] text-[#252927] hover:text-[#163C3B] transition-colors"
                      >
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-[11px] text-neutral-500 line-clamp-1">
                          {s.shortDescription}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="my-2 border-t border-neutral-100" />

                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#163C3B]/60 px-3 py-1.5 font-sans">
                    Specialized Care Areas
                  </div>
                  <div className="space-y-1">
                    {SERVICES_LIST.slice(4).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/support/${s.slug}`}
                        className="block px-3 py-2 rounded-xl text-xs hover:bg-[#F8F5EF] text-[#252927] hover:text-[#163C3B] transition-colors"
                      >
                        <div className="font-semibold">{s.title}</div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-neutral-100 px-3">
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-[#163C3B] hover:text-[#D8A69C] transition-colors flex items-center justify-between"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/psychologists"
              className={`hover:text-[#163C3B] transition-colors whitespace-nowrap ${
                location.pathname.startsWith('/psychologists')
                  ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                  : ''
              }`}
            >
              Our Clinicians
            </Link>

            <Link
              to="/journal"
              className={`hover:text-[#163C3B] transition-colors whitespace-nowrap ${
                location.pathname.startsWith('/journal')
                  ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                  : ''
              }`}
            >
              Journal
            </Link>

            <Link
              to="/fees"
              className={`hover:text-[#163C3B] transition-colors whitespace-nowrap ${
                location.pathname === '/fees'
                  ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                  : ''
              }`}
            >
              Fees &amp; FAQ
            </Link>

            <Link
              to="/contact"
              className={`hover:text-[#163C3B] transition-colors whitespace-nowrap ${
                location.pathname === '/contact'
                  ? 'text-[#163C3B] font-semibold underline underline-offset-8 decoration-[#D8A69C] decoration-2'
                  : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: Direct Appointment Request Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/urgent-help"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
              title="Crisis numbers and urgent mental health support"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Urgent Help</span>
            </Link>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#F8F5EF] bg-[#163C3B] hover:bg-[#1D4E4D] shadow-xs active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D8A69C]" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-[#163C3B] hover:bg-[#163C3B]/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#163C3B]/10 bg-[#F8F5EF] px-4 pt-4 pb-8 space-y-4 animate-in fade-in duration-200 shadow-xl">
          <div className="space-y-1">
            <Link
              to="/about"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              About the Practice
            </Link>
            <Link
              to="/approach"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              Our Therapeutic Approach
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              All Therapy Services
            </Link>
            <Link
              to="/psychologists"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              Meet the Clinicians
            </Link>
            <Link
              to="/fees"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              Fees, Insurance &amp; Superbills
            </Link>
            <Link
              to="/faq"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              Frequently Asked Questions
            </Link>
            <Link
              to="/journal"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              The Open Door Journal
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white text-[#252927] hover:text-[#163C3B]"
            >
              San Francisco Studio &amp; Contact
            </Link>
            <Link
              to="/urgent-help"
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200"
            >
              Urgent Support Resources (988)
            </Link>
          </div>

          <div className="pt-3 border-t border-[#163C3B]/10 flex flex-col gap-3">
            <Link
              to="/appointment"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#F8F5EF] bg-[#163C3B] hover:bg-[#1D4E4D] shadow-xs"
            >
              <span>Begin Your Intake Journey</span>
              <ArrowRight className="w-4 h-4 text-[#D8A69C]" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-1">
              <Phone className="w-3.5 h-3.5 text-[#163C3B]" />
              <span>San Francisco: {BRAND_CONFIG.contact.phoneDemo}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
