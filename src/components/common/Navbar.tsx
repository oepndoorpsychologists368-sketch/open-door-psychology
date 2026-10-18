import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, ShieldAlert, Sparkles, Heart, Phone, Calendar } from 'lucide-react';
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
      setScrolled(window.scrollY > 15);
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF9FC]/92 backdrop-blur-md border-b border-[#F6C5D7]/40 shadow-[0_4px_25px_rgba(246,197,215,0.22)]'
          : 'bg-[#FFF9FC]/80 backdrop-blur-xs border-b border-[#FBE3EC]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-18 sm:h-20 min-w-0">
          
          {/* Zone 1: Brand Wordmark & Arch Monogram */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3 shrink min-w-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EFA0BF]"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B0A0D] text-[#FFF9FC] flex items-center justify-center shadow-[0_4px_12px_rgba(11,10,13,0.15)] group-hover:bg-[#151218] group-hover:scale-105 transition-all shrink-0 border border-[#F6C5D7]/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" />
                <path d="M4 21h16" />
                <path d="M14 3v18" stroke="#F6C5D7" />
                <circle cx="16.5" cy="12" r="1.25" fill="#EFA0BF" />
              </svg>
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 font-serif text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-tight text-[#0B0A0D] group-hover:text-[#C87596] transition-colors leading-tight">
                <span>{BRAND_CONFIG.name}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EFA0BF] shrink-0"></span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#C87596] uppercase font-sans -mt-0.5 truncate hidden sm:block">
                Psychology &amp; Wellness Sanctuary
              </span>
            </div>
          </Link>

          {/* Zone 2: Desktop Navigation Links (Responsive layout for laptops & desktops) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-xs xl:text-sm font-medium text-[#0B0A0D]/80 shrink-0">
            <Link
              to="/about"
              className={`px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap ${
                isActive('/about')
                  ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
                  : ''
              }`}
            >
              About
            </Link>

            <Link
              to="/approach"
              className={`px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap ${
                isActive('/approach')
                  ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
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
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive('/services') || isActive('/support')
                    ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
                    : ''
                }`}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-[#C87596] ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#FFFFFF] border border-[#F6C5D7] p-3 shadow-[0_12px_36px_rgba(246,197,215,0.35)] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C87596] px-3 py-1 font-sans">
                    Core Therapy Modalities
                  </div>
                  <div className="space-y-1">
                    {SERVICES_LIST.slice(0, 4).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block px-3 py-2 rounded-xl text-xs hover:bg-[#FFF9FC] text-[#0B0A0D] hover:text-[#C87596] transition-colors"
                      >
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-[11px] text-[#5A5460] line-clamp-1">
                          {s.shortDescription}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="my-2 border-t border-[#FBE3EC]" />

                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C87596] px-3 py-1 font-sans">
                    Specialized Care Areas
                  </div>
                  <div className="space-y-1">
                    {SERVICES_LIST.slice(4).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/support/${s.slug}`}
                        className="block px-3 py-2 rounded-xl text-xs hover:bg-[#FFF9FC] text-[#0B0A0D] hover:text-[#C87596] transition-colors"
                      >
                        <div className="font-semibold">{s.title}</div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#FBE3EC] px-3">
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-[#0B0A0D] hover:text-[#C87596] transition-colors flex items-center justify-between"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#EFA0BF]" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/psychologists"
              className={`px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap ${
                isActive('/psychologists')
                  ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
                  : ''
              }`}
            >
              Our Clinicians
            </Link>

            <Link
              to="/journal"
              className={`px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap ${
                isActive('/journal')
                  ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
                  : ''
              }`}
            >
              Journal
            </Link>

            <Link
              to="/fees"
              className={`px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap ${
                isActive('/fees')
                  ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
                  : ''
              }`}
            >
              Fees &amp; FAQ
            </Link>

            <Link
              to="/contact"
              className={`px-2.5 py-1.5 rounded-full hover:text-[#0B0A0D] hover:bg-[#FBE3EC]/60 transition-colors whitespace-nowrap ${
                isActive('/contact')
                  ? 'text-[#0B0A0D] font-semibold underline underline-offset-8 decoration-[#EFA0BF] decoration-2'
                  : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: CTA Buttons & Responsive Controls (Guaranteed zero clipping) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Urgent Help Button - Always fully visible on tablet and desktop */}
            <Link
              to="/urgent-help"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#0B0A0D] bg-white hover:bg-[#FBE3EC] border border-[#EFA0BF] shadow-xs hover:border-[#C87596] transition-all whitespace-nowrap"
              title="Crisis lines & immediate support"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#C87596]" />
              <span>Urgent Help</span>
            </Link>

            {/* Book Consultation Button - Pookie Blush Pink, always visible */}
            <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 rounded-full text-xs font-bold text-[#0B0A0D] bg-[#F6C5D7] hover:bg-[#EFA0BF] shadow-[0_3px_12px_rgba(246,197,215,0.45)] hover:shadow-[0_6px_20px_rgba(239,160,191,0.5)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap border border-[#FBE3EC]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0B0A0D]" />
              <span>Book Consultation</span>
            </Link>

            {/* Hamburger Menu Button - Activates cleanly below xl breakpoint */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-xl text-[#0B0A0D] hover:bg-[#FBE3EC] transition-colors cursor-pointer border border-transparent hover:border-[#F6C5D7]"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-[#C87596]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Full Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-18 sm:top-20 z-40 bg-[#0B0A0D]/50 backdrop-blur-xs xl:hidden animate-in fade-in duration-200">
          <div className="w-full max-w-md ml-auto h-[calc(100vh-4.5rem)] bg-[#FFF9FC] border-l border-[#F6C5D7] shadow-2xl flex flex-col justify-between overflow-y-auto p-5 sm:p-6 animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              {/* Header quick banner */}
              <div className="p-3.5 rounded-2xl bg-[#FBE3EC] border border-[#F6C5D7]/60 flex items-center justify-between">
                <div>
                  <div className="font-serif text-sm font-bold text-[#0B0A0D]">“Don't Cry. Just Come.”</div>
                  <div className="text-[11px] text-[#C87596]">Compassionate psychotherapy sanctuary</div>
                </div>
                <Heart className="w-5 h-5 text-[#EFA0BF] fill-[#EFA0BF]" />
              </div>

              {/* Direct Urgent Help in Mobile Drawer */}
              <Link
                to="/urgent-help"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EFA0BF] text-xs font-semibold text-[#0B0A0D] shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#C87596]" />
                  <span>24/7 Urgent Crisis Numbers &amp; Lifelines</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#C87596]" />
              </Link>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#C87596] px-2 py-1 font-sans">
                  Navigation
                </div>
                <Link
                  to="/"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/') && location.pathname === '/' ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/about') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  About Our Sanctuary
                </Link>
                <Link
                  to="/approach"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/approach') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Our Clinical Approach
                </Link>
                <Link
                  to="/services"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/services') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Therapy Services
                </Link>
                <Link
                  to="/psychologists"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/psychologists') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Our Licensed Clinicians
                </Link>
                <Link
                  to="/fees"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/fees') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Fees &amp; Superbill Estimator
                </Link>
                <Link
                  to="/faq"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/faq') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Frequently Asked Questions
                </Link>
                <Link
                  to="/journal"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/journal') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Mental Health Journal
                </Link>
                <Link
                  to="/contact"
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive('/contact') ? 'bg-[#FBE3EC] text-[#0B0A0D] font-bold' : 'text-[#0B0A0D]/80 hover:bg-[#FBE3EC]/50'
                  }`}
                >
                  Studio &amp; Telehealth Contact
                </Link>
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-6 border-t border-[#FBE3EC] space-y-3">
              <Link
                to="/appointment"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-bold text-[#0B0A0D] bg-[#F6C5D7] hover:bg-[#EFA0BF] shadow-[0_4px_16px_rgba(246,197,215,0.5)] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </Link>
              <div className="text-center text-[11px] text-[#5A5460]">
                {BRAND_CONFIG.contact.phoneDemo}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
