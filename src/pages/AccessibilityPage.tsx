import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Eye, Keyboard, Monitor, Mail, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';

export function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Accessibility Statement' }]} />

      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
          Universal Access &amp; Care
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163C3B]">
          Accessibility Statement
        </h1>
        <p className="font-serif text-lg italic text-[#D8A69C]">
          “We believe mental health resources must be open and navigable for every person.”
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="rounded-3xl bg-white border border-[#163C3B]/10 p-8 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
            Our Commitment to Digital Accessibility
          </h2>
          <p>
            Open Door Psychology &amp; Wellness is dedicated to ensuring that our digital experience is accessible to individuals of all abilities, including those who rely on screen readers, keyboard-only navigation, speech recognition software, or specific contrast requirements.
          </p>
          <p>
            We adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA specifications across our website architecture.
          </p>
        </section>

        {/* Implemented Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#163C3B]">
              <Keyboard className="w-5 h-5 text-[#163C3B]" />
              <h3>Keyboard Navigation &amp; Focus</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All interactive components—including navigation menus, appointment selection cards, date pickers, and accordion drawers—are fully reachable and operable via keyboard (Tab, Enter, Spacebar, Escape) with visible focus rings.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#163C3B]">
              <Eye className="w-5 h-5 text-[#163C3B]" />
              <h3>High Contrast &amp; Legibility</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Colors and typography meet or exceed WCAG AA contrast ratios (minimum 4.5:1 for body text, 3:1 for large display headlines), eliminating light-gray text on low-contrast backgrounds.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#163C3B]">
              <Monitor className="w-5 h-5 text-[#163C3B]" />
              <h3>Reduced Motion Support</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We respect the <code>prefers-reduced-motion</code> system media query. For users with vestibular conditions, Three.js 3D rotations, decorative parallax, and transitions are automatically calmed or disabled.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#163C3B]/10 p-6 space-y-3">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#163C3B]">
              <CheckCircle2 className="w-5 h-5 text-[#163C3B]" />
              <h3>Semantic HTML &amp; Screen Readers</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All layouts use meaningful heading hierarchies (<code>h1</code> through <code>h4</code>), ARIA expanded/controls attributes on accordions and menus, and descriptive text alternatives for imagery.
            </p>
          </div>
        </div>

        {/* Usable Feedback Contact Placeholder */}
        <section className="rounded-3xl bg-[#F8F5EF] border border-[#163C3B]/10 p-8 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
            Reporting Accessibility Barriers
          </h2>
          <p>
            If you encounter any difficulty navigating or accessing content on this website, please let us know so we can promptly address it:
          </p>
          <div className="space-y-1.5 text-xs text-neutral-700 font-medium">
            <div>Accessibility Coordinator: <code>{BRAND_CONFIG.contact.emailDemo}</code></div>
            <div>Direct Phone: <code>{BRAND_CONFIG.contact.phoneDemo}</code></div>
            <div>Physical Studio Access: ADA compliant ground-floor elevator access to Suite 400 with automatic doors and wide corridors.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
