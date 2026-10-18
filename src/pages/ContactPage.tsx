import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BRAND_CONFIG } from '../data/brand';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please enter your message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
          Reach Out to Open Door
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163C3B]">
          We Are Here to Listen
        </h1>
        <p className="font-serif text-xl italic text-[#D8A69C]">
          “Whether you have questions about our clinicians, fees, or accessibility, our door is open.”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          Please use the inquiry form below for non-urgent administrative and scheduling questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Opening Hours */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-3xl bg-white border border-[#163C3B]/10 p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
              San Francisco Studio &amp; Details
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#163C3B] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#163C3B]">{BRAND_CONFIG.contact.addressLine1}</div>
                  <div>{BRAND_CONFIG.contact.addressLine2}</div>
                  <div>{BRAND_CONFIG.contact.cityRegion}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#163C3B] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#163C3B]">Telephone Placeholder</div>
                  <div>{BRAND_CONFIG.contact.phoneDemo}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#163C3B] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#163C3B]">Email Placeholder</div>
                  <div>{BRAND_CONFIG.contact.emailDemo}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#163C3B]/70">
                <Clock className="w-3.5 h-3.5 text-[#163C3B]" />
                <span>Hours of Operation</span>
              </div>
              <div className="text-xs text-neutral-600 space-y-1">
                <div>{BRAND_CONFIG.contact.hoursWeekdays}</div>
                <div>{BRAND_CONFIG.contact.hoursSaturday}</div>
                <div className="text-neutral-400">{BRAND_CONFIG.contact.hoursSunday}</div>
              </div>
            </div>
          </div>

          {/* Urgent Help Notice */}
          <div className="rounded-2xl bg-rose-50 border border-rose-200 p-5 text-xs text-rose-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              <span>Not for Emergency or Crisis Use</span>
            </div>
            <p className="leading-relaxed">
              If you or a loved one are experiencing acute emotional crisis or suicidal thoughts, please call <strong>988</strong> (in the US) or visit your nearest emergency room immediately.
            </p>
          </div>
        </div>

        {/* Right: Honest Demonstration Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-[#163C3B]/10 p-8 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#C7D4C1]/40 text-[#163C3B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#163C3B]">
                  Inquiry Simulated Successfully
                </h3>
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 max-w-md mx-auto text-left flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Frontend Demonstration Note: </strong>
                    Because this is a static client-side prototype with no backend server, your inquiry has not been transmitted over the internet or sent to a clinic inbox.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#163C3B] text-white hover:bg-[#1D4E4D]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#163C3B]">
                    Send a General Inquiry
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    For prospective clients seeking practical guidance before scheduling.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#163C3B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:border-[#163C3B]"
                      placeholder="e.g. Jordan Hayes"
                    />
                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163C3B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:border-[#163C3B]"
                      placeholder="jordan@example.com"
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#163C3B] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:border-[#163C3B]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163C3B] mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:border-[#163C3B] bg-white"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Fee & Superbill Inquiry">Fee &amp; Superbill Inquiry</option>
                      <option value="Telehealth Information">Telehealth Information</option>
                      <option value="Accessibility Needs">Accessibility Needs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#163C3B] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:border-[#163C3B]"
                    placeholder="How can we assist your journey?"
                  />
                  {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#163C3B] text-white hover:bg-[#1D4E4D] transition-colors"
                  >
                    <span>Submit Demonstration Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
