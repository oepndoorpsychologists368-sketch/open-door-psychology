/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ApproachPage } from './pages/ApproachPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { IndividualTherapyPage } from './pages/IndividualTherapyPage';
import { CouplesTherapyPage } from './pages/CouplesTherapyPage';
import { FamilyTherapyPage } from './pages/FamilyTherapyPage';
import { ChildTeenTherapyPage } from './pages/ChildTeenTherapyPage';
import { AnxietyStressPage } from './pages/AnxietyStressPage';
import { DepressionPage } from './pages/DepressionPage';
import { TraumaSupportPage } from './pages/TraumaSupportPage';
import { PsychologistsPage } from './pages/PsychologistsPage';
import { PsychologistDetailPage } from './pages/PsychologistDetailPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { FeesPage } from './pages/FeesPage';
import { FAQPage } from './pages/FAQPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { ContactPage } from './pages/ContactPage';
import { UrgentHelpPage } from './pages/UrgentHelpPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AmbientBar } from './components/wellness/AmbientBar';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F8F5EF] text-[#252927]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/approach" element={<ApproachPage />} />
            <Route path="/services" element={<ServicesOverviewPage />} />

            {/* Individual Service Pages */}
            <Route path="/services/individual-therapy" element={<IndividualTherapyPage />} />
            <Route path="/services/couples-therapy" element={<CouplesTherapyPage />} />
            <Route path="/services/family-therapy" element={<FamilyTherapyPage />} />
            <Route path="/services/child-teen-therapy" element={<ChildTeenTherapyPage />} />

            {/* Specialized Support Pages */}
            <Route path="/support/anxiety-stress" element={<AnxietyStressPage />} />
            <Route path="/support/depression" element={<DepressionPage />} />
            <Route path="/support/trauma" element={<TraumaSupportPage />} />

            {/* Team Directory & Dynamic Profiles */}
            <Route path="/psychologists" element={<PsychologistsPage />} />
            <Route path="/psychologists/:slug" element={<PsychologistDetailPage />} />

            {/* Booking, Fees & FAQ */}
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Journal Library & Dynamic Articles */}
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:slug" element={<JournalDetailPage />} />

            {/* Contact & Safety */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/urgent-help" element={<UrgentHelpPage />} />

            {/* Policy & Accessibility */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <AmbientBar />
        <Footer />
      </div>
    </HashRouter>
  );
}
