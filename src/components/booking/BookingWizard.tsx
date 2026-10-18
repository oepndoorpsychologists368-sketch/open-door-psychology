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
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38D9E6', '#5EEAD4', '#3B82F6'],
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
      <div className="max-w-2xl mx-auto rounded-3xl glass-panel p-8 sm:p-10 shadow-2xl text-[#F4F8FC]">
        <div className="w-14 h-14 rounded-2xl bg-[#38D9E6]/20 border border-[#38D9E6]/40 text-[#38D9E6] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#38D9E6]">
            Demonstration Consultation Pass
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#F4F8FC]">
            Request Saved Locally
          </h2>
          <p className="text-xs sm:text-sm text-[#A9BED1] max-w-md mx-auto">
            Your demonstration consultation request has been validated and recorded inside your browser storage.
          </p>
        </div>

        {/* Demonstration Notice */}
        <div className="my-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs text-amber-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Demonstration Simulation: </strong>
            Because this application runs entirely client-side without an external hospital server, this request has
            <strong> NOT</strong> been transmitted to an actual clinic or physician. No medical diagnosis or consultation is active.
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="rounded-2xl glass-card p-5 space-y-3 text-xs sm:text-sm border border-white/12">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-[#A9BED1]">Reference Code</span>
            <span className="font-mono font-bold text-[#38D9E6] bg-white/[0.08] px-2.5 py-1 rounded-md border border-white/10">
              {submittedBooking.referenceNumber}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#A9BED1]">Service</span>
            <span className="font-medium text-[#F4F8FC]">{submittedBooking.serviceName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#A9BED1]">Clinician</span>
            <span className="font-medium text-[#F4F8FC]">{submittedBooking.psychologistName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#A9BED1]">Requested Date &amp; Time</span>
            <span className="font-medium text-[#38D9E6]">
              {submittedBooking.date} · {submittedBooking.timeSlot}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#A9BED1]">Format</span>
            <span className="capitalize font-medium text-[#F4F8FC]">{submittedBooking.modality}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="text-[#A9BED1]">Contact</span>
            <span className="font-medium text-[#F4F8FC]">
              {submittedBooking.firstName} {submittedBooking.lastName} ({submittedBooking.email})
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold bg-white/[0.08] border border-white/15 text-[#F4F8FC] hover:bg-white/[0.15] hover:text-[#38D9E6] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Consultation Pass</span>
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#38D9E6] text-[#06111F] hover:bg-[#5EEAD4] transition-colors cursor-pointer shadow-md shadow-[#38D9E6]/25"
          >
            Create Another Demonstration Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-3xl glass-panel p-6 sm:p-10 shadow-2xl text-[#F4F8FC]">
      {/* Progress Steps Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-[#A9BED1] mb-3">
          <span>Step {step} of 6</span>
          <span className="text-[#38D9E6] font-semibold font-mono">
            {step === 1 && '1. Select Service'}
            {step === 2 && '2. Choose Psychologist'}
            {step === 3 && '3. Preferred Date & Modality'}
            {step === 4 && '4. Demo Time Slot'}
            {step === 5 && '5. Contact Details'}
            {step === 6 && '6. Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-[#38D9E6] to-[#3B82F6] h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">
                Which therapy service are you looking for?
              </h3>
              <p className="text-xs text-[#A9BED1] mt-1">
                Select the care category that best describes your current journey.
              </p>
            </div>

            {errors.serviceId && (
              <p className="text-xs text-rose-400 font-medium">{errors.serviceId}</p>
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
                    className={`text-left p-4 rounded-2xl glass-card transition-all cursor-pointer ${
                      selected
                        ? 'border-[#38D9E6] bg-white/[0.1] ring-1 ring-[#38D9E6]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#F4F8FC]">{svc.title}</div>
                    <div className="text-xs text-[#A9BED1] mt-1 line-clamp-2">
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
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">
                Select a Clinician
              </h3>
              <p className="text-xs text-[#A9BED1] mt-1">
                Choose a specific team member, or select “Help me choose” to let us guide you.
              </p>
            </div>

            {errors.psychologistSlug && (
              <p className="text-xs text-rose-400 font-medium">{errors.psychologistSlug}</p>
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
                className={`w-full text-left p-4 rounded-2xl glass-card transition-all cursor-pointer ${
                  booking.psychologistSlug === 'help-me-choose'
                    ? 'border-[#38D9E6] bg-white/[0.1] ring-1 ring-[#38D9E6]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#38D9E6]">
                      Help Me Choose
                    </div>
                    <div className="text-xs text-[#A9BED1] mt-0.5">
                      Our intake coordinator will pair you with the best clinician for your schedule and goals.
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#38D9E6] shrink-0" />
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
                      className={`text-left p-4 rounded-2xl glass-card transition-all cursor-pointer ${
                        selected
                          ? 'border-[#38D9E6] bg-white/[0.1] ring-1 ring-[#38D9E6]'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-sm text-[#F4F8FC]">{psy.name}</div>
                      <div className="text-xs text-[#38D9E6] mt-0.5 line-clamp-1">{psy.title}</div>
                      <div className="mt-2 text-[11px] text-[#A9BED1]">
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
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">
                Preferred Date &amp; Modality
              </h3>
              <p className="text-xs text-[#A9BED1] mt-1">
                Select your preferred day. Appointments are offered weekdays and Saturdays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A9BED1] mb-1.5">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBooking({ ...booking, modality: 'in-person' })}
                    className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      booking.modality === 'in-person'
                        ? 'border-[#38D9E6] bg-[#38D9E6] text-[#06111F]'
                        : 'border-white/10 bg-white/[0.04] text-[#A9BED1] hover:bg-white/[0.08]'
                    }`}
                  >
                    In-Person Studio
                  </button>
                  <button
                    type="button"
                    onClick={() => setBooking({ ...booking, modality: 'telehealth' })}
                    className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      booking.modality === 'telehealth'
                        ? 'border-[#38D9E6] bg-[#38D9E6] text-[#06111F]'
                        : 'border-white/10 bg-white/[0.04] text-[#A9BED1] hover:bg-white/[0.08]'
                    }`}
                  >
                    Virtual Telehealth
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="booking-date" className="block text-xs font-semibold text-[#A9BED1] mb-1.5">
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
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
                {errors.date && (
                  <p className="text-xs text-rose-400 font-medium mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            <div className="rounded-xl glass-card p-4 text-xs text-[#A9BED1] border border-white/10">
              <strong className="text-[#38D9E6]">Sanctuary Note:</strong> In-person consultations take place at our San Francisco studio. Telehealth consultations are accessible throughout California via encrypted high-definition video.
            </div>
          </div>
        )}

        {/* STEP 4: TIME SLOT SELECTION */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">
                Choose an Available Demo Slot
              </h3>
              <p className="text-xs text-[#A9BED1] mt-1">
                Sample slots shown for demonstration purposes. These do not represent live clinic availability.
              </p>
            </div>

            {errors.timeSlot && (
              <p className="text-xs text-rose-400 font-medium">{errors.timeSlot}</p>
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
                        ? 'border-[#38D9E6] bg-[#38D9E6] text-[#06111F] font-bold shadow-md shadow-[#38D9E6]/25'
                        : 'border-white/10 bg-white/[0.04] hover:border-[#38D9E6]/50 hover:bg-white/[0.08] text-xs font-medium text-[#F4F8FC]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 mx-auto mb-1.5 opacity-70" />
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
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">
                Your Contact Information
              </h3>
              <p className="text-xs text-[#A9BED1] mt-1">
                Basic logistical details for appointment coordination. We never request sensitive symptoms or payment data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#A9BED1] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={booking.firstName}
                  onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="e.g. Maya"
                />
                {errors.firstName && <p className="text-xs text-rose-400 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A9BED1] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={booking.lastName}
                  onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="e.g. Lin"
                />
                {errors.lastName && <p className="text-xs text-rose-400 mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A9BED1] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={booking.email}
                  onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="maya.lin@example.com"
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A9BED1] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A9BED1] mb-1">
                Optional Brief Scheduling Notes
              </label>
              <textarea
                rows={2}
                value={booking.notes}
                onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                placeholder="e.g. Prefer morning consultations or wheelchair accessible room"
              />
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMISSION */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">
                Review Your Demonstration Request
              </h3>
              <p className="text-xs text-[#A9BED1] mt-1">
                Confirm your requested details before submitting this frontend prototype request.
              </p>
            </div>

            {/* Review Summary Card */}
            <div className="rounded-2xl glass-card p-5 space-y-2.5 text-xs sm:text-sm border border-white/12">
              <div className="flex justify-between">
                <span className="text-[#A9BED1]">Service:</span>
                <span className="font-semibold text-[#38D9E6]">{booking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A9BED1]">Clinician:</span>
                <span className="font-semibold text-[#F4F8FC]">{booking.psychologistName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A9BED1]">Date &amp; Slot:</span>
                <span className="font-semibold text-[#38D9E6]">
                  {booking.date || 'Tomorrow'} · {booking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A9BED1]">Modality:</span>
                <span className="capitalize font-semibold text-[#F4F8FC]">{booking.modality}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-[#A9BED1]">Name:</span>
                <span className="font-semibold text-[#F4F8FC]">
                  {booking.firstName} {booking.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A9BED1]">Email &amp; Phone:</span>
                <span className="font-semibold text-[#F4F8FC]">
                  {booking.email} · {booking.phone}
                </span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={booking.consentAgreed}
                  onChange={(e) => setBooking({ ...booking, consentAgreed: e.target.checked })}
                  className="mt-0.5 rounded border-white/20 text-[#38D9E6] focus:ring-[#38D9E6] bg-black/40"
                />
                <span className="text-[#A9BED1]">
                  I acknowledge the 48-hour consultation cancellation policy and agree to receive appointment scheduling notifications.
                </span>
              </label>
              {errors.consentAgreed && (
                <p className="text-xs text-rose-400 pl-6">{errors.consentAgreed}</p>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={booking.demoAcknowledged}
                  onChange={(e) => setBooking({ ...booking, demoAcknowledged: e.target.checked })}
                  className="mt-0.5 rounded border-white/20 text-[#38D9E6] focus:ring-[#38D9E6] bg-black/40"
                />
                <span className="text-[#A9BED1]">
                  <strong className="text-[#F4F8FC]">Frontend Demonstration Acknowledgment:</strong> I understand that this request is a local browser simulation. No data will be transmitted to an external server or clinic, and no medical appointment is confirmed.
                </span>
              </label>
              {errors.demoAcknowledged && (
                <p className="text-xs text-rose-400 pl-6">{errors.demoAcknowledged}</p>
              )}
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-[#A9BED1] bg-white/[0.06] hover:bg-white/[0.12] hover:text-[#F4F8FC] border border-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-[#06111F] bg-[#38D9E6] hover:bg-[#5EEAD4] transition-colors cursor-pointer shadow-md shadow-[#38D9E6]/25"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-[#06111F] bg-[#38D9E6] hover:bg-[#5EEAD4] transition-colors shadow-lg shadow-[#38D9E6]/30 cursor-pointer"
            >
              <span>Submit Demonstration Request</span>
              <CheckCircle2 className="w-4 h-4 text-[#06111F]" />
            </button>
          )}
        </div>
      </form>

      {/* Previous Demo Bookings in Local Storage */}
      {existingBookings.length > 0 && !submittedBooking && (
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A9BED1]">
              Your Saved Local Demo Bookings ({existingBookings.length})
            </span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('opendoor_demo_bookings');
                setExistingBookings([]);
              }}
              className="text-[11px] text-[#A9BED1]/60 hover:text-rose-400 cursor-pointer"
            >
              Clear Local History
            </button>
          </div>
          <div className="space-y-2">
            {existingBookings.slice(0, 2).map((b) => (
              <div
                key={b.referenceNumber}
                className="p-3 rounded-xl glass-card text-xs flex items-center justify-between border border-white/10"
              >
                <div>
                  <span className="font-mono font-semibold text-[#38D9E6]">{b.referenceNumber}</span> · {b.serviceName} with {b.psychologistName}
                </div>
                <div className="text-[#A9BED1]">{b.date} ({b.timeSlot})</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
