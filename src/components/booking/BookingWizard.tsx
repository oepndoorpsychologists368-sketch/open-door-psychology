import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Printer,
  Brain,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_LIST } from '../../data/services';
import { PSYCHOLOGISTS_LIST } from '../../data/psychologists';
import { BookingState, StoredBooking } from '../../types';

const DEMO_TIME_SLOTS = [
  '09:00 AM – 09:50 AM',
  '10:30 AM – 11:20 AM',
  '01:00 PM – 01:50 PM',
  '02:30 PM – 03:20 PM',
  '04:00 PM – 04:50 PM',
  '05:30 PM – 06:20 PM',
];

const INITIAL_BOOKING: BookingState = {
  serviceId: 'individual-therapy',
  serviceName: 'Individual Therapy',
  psychologistSlug: 'help-me-choose',
  psychologistName: 'Help me choose based on my needs',
  date: '',
  timeSlot: '10:30 AM – 11:20 AM',
  modality: 'in-person',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  referralSource: 'Search or Recommendation',
  notes: '',
  consentAgreed: false,
  demoAcknowledged: false,
};

export function BookingWizard({ initialServiceSlug, initialPsychologistSlug }: { initialServiceSlug?: string; initialPsychologistSlug?: string }) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(() => {
    const b = { ...INITIAL_BOOKING };
    if (initialServiceSlug) {
      const matchSvc = SERVICES_LIST.find((s) => s.slug === initialServiceSlug);
      if (matchSvc) {
        b.serviceId = matchSvc.slug;
        b.serviceName = matchSvc.title;
      }
    }
    if (initialPsychologistSlug) {
      const matchPsy = PSYCHOLOGISTS_LIST.find((p) => p.slug === initialPsychologistSlug);
      if (matchPsy) {
        b.psychologistSlug = matchPsy.slug;
        b.psychologistName = matchPsy.name;
      }
    }
    return b;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<StoredBooking | null>(null);
  const [existingBookings, setExistingBookings] = useState<StoredBooking[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('opendoor_demo_bookings');
      if (raw) {
        setExistingBookings(JSON.parse(raw));
      }
    } catch {
      // localStorage silent fallback
    }
  }, [submittedBooking]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!booking.serviceId) newErrors.serviceId = 'Please select a therapy service.';
    } else if (currentStep === 2) {
      if (!booking.psychologistSlug) newErrors.psychologistSlug = 'Please select a clinician or “Help me choose”.';
    } else if (currentStep === 3) {
      if (!booking.date) {
        newErrors.date = 'Please select a preferred consultation date.';
      } else if (booking.date < minDateString) {
        newErrors.date = 'Please select a date from tomorrow onwards.';
      }
    } else if (currentStep === 4) {
      if (!booking.timeSlot) newErrors.timeSlot = 'Please select an available demonstration time slot.';
    } else if (currentStep === 5) {
      if (!booking.firstName.trim()) newErrors.firstName = 'First name is required.';
      if (!booking.lastName.trim()) newErrors.lastName = 'Last name is required.';
      if (!booking.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
        newErrors.email = 'Please provide a valid email format.';
      }
      if (!booking.phone.trim()) {
        newErrors.phone = 'Phone number is required for appointment logistics.';
      }
    } else if (currentStep === 6) {
      if (!booking.consentAgreed) {
        newErrors.consentAgreed = 'You must acknowledge the appointment policies.';
      }
      if (!booking.demoAcknowledged) {
        newErrors.demoAcknowledged = 'Please confirm that you understand this is a demonstration request.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 6));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    const refNum = `ODP-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalRecord: StoredBooking = {
      ...booking,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
    };

    try {
      const currentList: StoredBooking[] = JSON.parse(
        localStorage.getItem('opendoor_demo_bookings') || '[]'
      );
      currentList.unshift(finalRecord);
      localStorage.setItem('opendoor_demo_bookings', JSON.stringify(currentList));
    } catch {
      // Local storage limit
    }

    setSubmittedBooking(finalRecord);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#EFA0BF', '#F6C5D7', '#C87596', '#0B0A0D'],
      });
    } catch {
      // Confetti optional
    }
  };

  const resetForm = () => {
    setBooking(INITIAL_BOOKING);
    setSubmittedBooking(null);
    setStep(1);
    setErrors({});
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedBooking) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-[#F6C5D7] p-8 sm:p-10 shadow-[0_16px_48px_rgba(246,197,215,0.25)] text-[#0B0A0D]">
        <div className="w-14 h-14 rounded-2xl bg-[#FBE3EC] border border-[#EFA0BF]/40 text-[#C87596] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C87596]">
            Demonstration Consultation Pass
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0B0A0D]">
            Request Saved Locally
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5460] max-w-md mx-auto">
            Your demonstration consultation request has been validated and recorded inside your browser storage.
          </p>
        </div>

        {/* Demonstration Notice */}
        <div className="my-6 rounded-2xl bg-[#FBE3EC]/60 border border-[#EFA0BF]/30 p-4 text-xs text-[#0B0A0D] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#C87596] shrink-0 mt-0.5" />
          <div>
            <strong>Demonstration Simulation: </strong>
            Because this application runs entirely client-side without an external hospital server, this request has
            <strong> NOT</strong> been transmitted to an actual clinic or physician. No medical diagnosis or consultation is active.
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="rounded-2xl bg-[#FFF9FC] p-5 space-y-3 text-xs sm:text-sm border border-[#F6C5D7]">
          <div className="flex justify-between items-center pb-2 border-b border-[#FBE3EC]">
            <span className="text-[#5A5460]">Reference Code</span>
            <span className="font-mono font-bold text-[#0B0A0D] bg-white px-2.5 py-1 rounded-md border border-[#F6C5D7]">
              {submittedBooking.referenceNumber}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#5A5460]">Service</span>
            <span className="font-semibold text-[#0B0A0D]">{submittedBooking.serviceName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#5A5460]">Clinician</span>
            <span className="font-semibold text-[#0B0A0D]">{submittedBooking.psychologistName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#5A5460]">Requested Date &amp; Time</span>
            <span className="font-semibold text-[#C87596]">
              {submittedBooking.date} · {submittedBooking.timeSlot}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#5A5460]">Format</span>
            <span className="capitalize font-semibold text-[#0B0A0D]">{submittedBooking.modality}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#FBE3EC]">
            <span className="text-[#5A5460]">Contact</span>
            <span className="font-semibold text-[#0B0A0D]">
              {submittedBooking.firstName} {submittedBooking.lastName} ({submittedBooking.email})
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#FFF9FC] border border-[#F6C5D7] text-[#0B0A0D] hover:bg-[#FBE3EC] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Consultation Pass</span>
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#EFA0BF] text-[#0B0A0D] hover:bg-[#C87596] hover:text-white transition-colors cursor-pointer shadow-md shadow-[#EFA0BF]/25"
          >
            Create Another Demonstration Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-[#F6C5D7] p-6 sm:p-10 shadow-[0_16px_48px_rgba(246,197,215,0.25)] text-[#0B0A0D]">
      {/* Progress Steps Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-[#5A5460] mb-3">
          <span>Step {step} of 6</span>
          <span className="text-[#C87596] font-bold font-mono">
            {step === 1 && '1. Select Service'}
            {step === 2 && '2. Choose Psychologist'}
            {step === 3 && '3. Preferred Date & Modality'}
            {step === 4 && '4. Demo Time Slot'}
            {step === 5 && '5. Contact Details'}
            {step === 6 && '6. Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-[#FBE3EC] h-2 rounded-full overflow-hidden border border-[#F6C5D7]">
          <div
            className="bg-gradient-to-r from-[#EFA0BF] to-[#C87596] h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
                Which therapy service are you looking for?
              </h3>
              <p className="text-xs text-[#5A5460] mt-1 font-medium">
                Select the care category that best describes your current journey.
              </p>
            </div>

            {errors.serviceId && (
              <p className="text-xs text-rose-600 font-semibold">{errors.serviceId}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SERVICES_LIST.map((svc) => {
                const selected = booking.serviceId === svc.slug;
                return (
                  <button
                    key={svc.slug}
                    type="button"
                    onClick={() => {
                      setBooking({
                        ...booking,
                        serviceId: svc.slug,
                        serviceName: svc.title,
                      });
                      setErrors({});
                    }}
                    className={`text-left p-4 rounded-2xl bg-[#FFF9FC] transition-all cursor-pointer ${
                      selected
                        ? 'border-2 border-[#EFA0BF] bg-[#FBE3EC]/50 shadow-xs'
                        : 'border border-[#F6C5D7] hover:border-[#EFA0BF] hover:bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#0B0A0D]">{svc.title}</div>
                    <div className="text-xs text-[#5A5460] mt-1 line-clamp-2">
                      {svc.shortDescription}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PSYCHOLOGIST SELECTION */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
                Select a Clinician
              </h3>
              <p className="text-xs text-[#5A5460] mt-1 font-medium">
                Choose a specific team member, or select “Help me choose” to let us guide you.
              </p>
            </div>

            {errors.psychologistSlug && (
              <p className="text-xs text-rose-600 font-semibold">{errors.psychologistSlug}</p>
            )}

            <div className="space-y-2.5 pt-2">
              {/* Help me choose option */}
              <button
                type="button"
                onClick={() => {
                  setBooking({
                    ...booking,
                    psychologistSlug: 'help-me-choose',
                    psychologistName: 'Help me choose based on my needs',
                  });
                  setErrors({});
                }}
                className={`w-full text-left p-4 rounded-2xl bg-[#FFF9FC] transition-all cursor-pointer ${
                  booking.psychologistSlug === 'help-me-choose'
                    ? 'border-2 border-[#EFA0BF] bg-[#FBE3EC]/50 shadow-xs'
                    : 'border border-[#F6C5D7] hover:border-[#EFA0BF] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-[#0B0A0D]">
                      Help Me Choose
                    </div>
                    <div className="text-xs text-[#5A5460] mt-0.5">
                      Our intake coordinator will pair you with the best clinician for your schedule and goals.
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#C87596] shrink-0" />
                </div>
              </button>

              {/* Individual Psychologists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {PSYCHOLOGISTS_LIST.map((psy) => {
                  const selected = booking.psychologistSlug === psy.slug;
                  return (
                    <button
                      key={psy.slug}
                      type="button"
                      onClick={() => {
                        setBooking({
                          ...booking,
                          psychologistSlug: psy.slug,
                          psychologistName: psy.name,
                        });
                        setErrors({});
                      }}
                      className={`text-left p-4 rounded-2xl bg-[#FFF9FC] transition-all cursor-pointer ${
                        selected
                          ? 'border-2 border-[#EFA0BF] bg-[#FBE3EC]/50 shadow-xs'
                          : 'border border-[#F6C5D7] hover:border-[#EFA0BF] hover:bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#0B0A0D]">{psy.name}</div>
                      <div className="text-xs text-[#C87596] font-semibold mt-0.5 line-clamp-1">{psy.title}</div>
                      <div className="mt-2 text-[11px] text-[#5A5460]">
                        {psy.focusAreas.slice(0, 2).join(' · ')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PREFERRED DATE & MODALITY */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
                Preferred Date &amp; Modality
              </h3>
              <p className="text-xs text-[#5A5460] mt-1 font-medium">
                Select your preferred day. Appointments are offered weekdays and Saturdays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B0A0D] mb-1.5">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBooking({ ...booking, modality: 'in-person' })}
                    className={`p-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      booking.modality === 'in-person'
                        ? 'border-[#EFA0BF] bg-[#EFA0BF] text-[#0B0A0D] shadow-xs'
                        : 'border-[#F6C5D7] bg-[#FFF9FC] text-[#5A5460] hover:bg-white'
                    }`}
                  >
                    In-Person Studio
                  </button>
                  <button
                    type="button"
                    onClick={() => setBooking({ ...booking, modality: 'telehealth' })}
                    className={`p-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      booking.modality === 'telehealth'
                        ? 'border-[#EFA0BF] bg-[#EFA0BF] text-[#0B0A0D] shadow-xs'
                        : 'border-[#F6C5D7] bg-[#FFF9FC] text-[#5A5460] hover:bg-white'
                    }`}
                  >
                    Virtual Telehealth
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="booking-date" className="block text-xs font-semibold text-[#0B0A0D] mb-1.5">
                  Requested Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={minDateString}
                  value={booking.date}
                  onChange={(e) => {
                    setBooking({ ...booking, date: e.target.value });
                    setErrors({});
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#F6C5D7] text-sm text-[#0B0A0D] focus:outline-hidden focus:ring-2 focus:ring-[#EFA0BF]"
                />
                {errors.date && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-[#FFF9FC] p-4 text-xs text-[#5A5460] border border-[#F6C5D7]">
              <strong className="text-[#0B0A0D]">Sanctuary Note:</strong> In-person consultations take place at our San Francisco studio. Telehealth consultations are accessible throughout California via encrypted high-definition video.
            </div>
          </div>
        )}

        {/* STEP 4: TIME SLOT SELECTION */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
                Choose an Available Demo Slot
              </h3>
              <p className="text-xs text-[#5A5460] mt-1 font-medium">
                Sample slots shown for demonstration purposes. These do not represent live clinic availability.
              </p>
            </div>

            {errors.timeSlot && (
              <p className="text-xs text-rose-600 font-semibold">{errors.timeSlot}</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {DEMO_TIME_SLOTS.map((slot) => {
                const selected = booking.timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setBooking({ ...booking, timeSlot: slot });
                      setErrors({});
                    }}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selected
                        ? 'border-[#EFA0BF] bg-[#EFA0BF] text-[#0B0A0D] font-bold shadow-md shadow-[#EFA0BF]/25'
                        : 'border-[#F6C5D7] bg-[#FFF9FC] hover:border-[#EFA0BF] hover:bg-white text-xs font-semibold text-[#0B0A0D]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 mx-auto mb-1.5 text-[#C87596]" />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: CONTACT DETAILS */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
                Your Contact Information
              </h3>
              <p className="text-xs text-[#5A5460] mt-1 font-medium">
                Basic logistical details for appointment coordination. We never request sensitive symptoms or payment data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#0B0A0D] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={booking.firstName}
                  onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#F6C5D7] text-sm text-[#0B0A0D] focus:outline-hidden focus:ring-2 focus:ring-[#EFA0BF]"
                  placeholder="e.g. Maya"
                />
                {errors.firstName && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B0A0D] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={booking.lastName}
                  onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#F6C5D7] text-sm text-[#0B0A0D] focus:outline-hidden focus:ring-2 focus:ring-[#EFA0BF]"
                  placeholder="e.g. Lin"
                />
                {errors.lastName && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B0A0D] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={booking.email}
                  onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#F6C5D7] text-sm text-[#0B0A0D] focus:outline-hidden focus:ring-2 focus:ring-[#EFA0BF]"
                  placeholder="maya.lin@example.com"
                />
                {errors.email && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B0A0D] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#F6C5D7] text-sm text-[#0B0A0D] focus:outline-hidden focus:ring-2 focus:ring-[#EFA0BF]"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B0A0D] mb-1">
                Optional Notes / What You Hope to Explore
              </label>
              <textarea
                rows={3}
                value={booking.notes}
                onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#F6C5D7] text-sm text-[#0B0A0D] focus:outline-hidden focus:ring-2 focus:ring-[#EFA0BF]"
                placeholder="Share any preferences or what brought you here today..."
              />
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMIT */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
                Review Your Consultation Request
              </h3>
              <p className="text-xs text-[#5A5460] mt-1 font-medium">
                Please verify your demonstration details below before finalizing.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FFF9FC] p-5 space-y-3 border border-[#F6C5D7] text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-[#FBE3EC]">
                <span className="text-[#5A5460]">Selected Service</span>
                <span className="font-bold text-[#0B0A0D]">{booking.serviceName}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-[#FBE3EC]">
                <span className="text-[#5A5460]">Requested Clinician</span>
                <span className="font-bold text-[#0B0A0D]">{booking.psychologistName}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-[#FBE3EC]">
                <span className="text-[#5A5460]">Format &amp; Schedule</span>
                <span className="font-bold text-[#C87596] capitalize">
                  {booking.modality} · {booking.date || 'Date not selected'} ({booking.timeSlot})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#5A5460]">Client Contact</span>
                <span className="font-bold text-[#0B0A0D]">
                  {booking.firstName} {booking.lastName} ({booking.email})
                </span>
              </div>
            </div>

            {/* Consents */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={booking.consentAgreed}
                  onChange={(e) => {
                    setBooking({ ...booking, consentAgreed: e.target.checked });
                    setErrors({});
                  }}
                  className="mt-0.5 rounded border-[#F6C5D7] text-[#EFA0BF] focus:ring-[#EFA0BF]"
                />
                <span className="text-xs text-[#5A5460] leading-relaxed">
                  I understand that this consultation request is governed by our privacy policy and out-of-network model. *
                </span>
              </label>
              {errors.consentAgreed && <p className="text-xs text-rose-600 font-semibold">{errors.consentAgreed}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={booking.demoAcknowledged}
                  onChange={(e) => {
                    setBooking({ ...booking, demoAcknowledged: e.target.checked });
                    setErrors({});
                  }}
                  className="mt-0.5 rounded border-[#F6C5D7] text-[#EFA0BF] focus:ring-[#EFA0BF]"
                />
                <span className="text-xs text-[#5A5460] leading-relaxed">
                  I confirm that this is a frontend demonstration application and no real payment or clinic booking is processed. *
                </span>
              </label>
              {errors.demoAcknowledged && <p className="text-xs text-rose-600 font-semibold">{errors.demoAcknowledged}</p>}
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="mt-8 pt-6 border-t border-[#FBE3EC] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-[#0B0A0D] bg-[#FFF9FC] border border-[#F6C5D7] hover:bg-[#FBE3EC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full text-xs font-bold bg-[#EFA0BF] text-[#0B0A0D] hover:bg-[#C87596] hover:text-white transition-colors cursor-pointer shadow-md shadow-[#EFA0BF]/25"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-all cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#EFA0BF]" />
              <span>Submit Demonstration Request</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
