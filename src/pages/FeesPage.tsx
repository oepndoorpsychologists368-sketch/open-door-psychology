import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DEMO_FEE_SCHEDULE, DEMO_PAYMENT_POLICIES } from '../data/fees';
import { ShieldCheck, Info, CheckCircle2, FileText, CreditCard, ArrowRight, Calculator, DollarSign, Sparkles } from 'lucide-react';

export function FeesPage() {
  // Interactive Superbill Reimbursement Estimator State
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [coverageRate, setCoverageRate] = useState(70);
  const [sessionsPerMonth, setSessionsPerMonth] = useState(4);
  const [deductibleMet, setDeductibleMet] = useState(true);

  const baseRates = [260, 310, 260, 275, 295];
  const currentBaseRate = baseRates[selectedServiceIndex] || 260;
  const currentServiceName = DEMO_FEE_SCHEDULE[selectedServiceIndex]?.service || 'Individual Psychotherapy';

  const monthlyGross = currentBaseRate * sessionsPerMonth;
  const estimatedReimbursementPerSession = deductibleMet ? Math.round(currentBaseRate * (coverageRate / 100)) : 0;
  const estimatedMonthlyReimbursement = estimatedReimbursementPerSession * sessionsPerMonth;
  const estimatedNetPerSession = currentBaseRate - estimatedReimbursementPerSession;
  const estimatedNetMonthly = monthlyGross - estimatedMonthlyReimbursement;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Fees & Practical Information' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
          Transparency &amp; Administration
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0A0D]">
          Fees &amp; Practical Information
        </h1>
        <p className="font-serif text-xl italic text-[#EFA0BF]">
          “Clear, honest financial expectations so there are never surprises in your care.”
        </p>
        <p className="text-base text-neutral-600 leading-relaxed">
          We operate as an out-of-network private practice to preserve complete clinical independence, strict privacy, and individualized session pacing without third-party diagnostic mandates.
        </p>
      </div>

      {/* Important Demonstration Notice */}
      <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Notice: </strong>
          All fees, session rates, and policies listed below are illustrative demonstration placeholders. They demonstrate how financial transparency is structured. Actual rates will be finalized and agreed upon prior to service commencement.
        </div>
      </div>

      {/* Fee Table */}
      <div className="rounded-3xl bg-white border border-[#0B0A0D]/10 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0B0A0D]">
              Demonstration Fee Schedule
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Standard clinical consultations for licensed clinicians (out-of-network rates).
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBE3EC]/30 text-xs text-[#0B0A0D] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA0BF]" />
            <span>Monthly Superbill Provided</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FFF9FC] text-[#0B0A0D] font-semibold border-b border-[#0B0A0D]/10">
              <tr>
                <th className="py-3.5 px-6">Clinical Service</th>
                <th className="py-3.5 px-6">Duration</th>
                <th className="py-3.5 px-6">Fee Range [Demo]</th>
                <th className="py-3.5 px-6">Insurance Reimbursement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {DEMO_FEE_SCHEDULE.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#0B0A0D]">
                    <div>{item.service}</div>
                    <div className="text-xs text-neutral-500 font-normal mt-0.5">
                      {item.description}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-neutral-600 whitespace-nowrap">
                    {item.duration}
                  </td>
                  <td className="py-4 px-6 font-mono font-semibold text-[#0B0A0D] whitespace-nowrap">
                    {item.demoFeeRange}
                  </td>
                  <td className="py-4 px-6 text-neutral-600 text-xs">
                    {item.insuranceNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTERACTIVE OUT-OF-NETWORK SUPERBILL ESTIMATOR */}
      <div className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B0A0D]/70">
              <Calculator className="w-4 h-4 text-[#0B0A0D]" />
              <span>Interactive Planning Tool</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0A0D]">
              Out-of-Network Superbill Reimbursement Estimator
            </h2>
          </div>
          <p className="text-xs text-neutral-500 max-w-sm">
            Estimate your net out-of-pocket investment after submitting monthly Superbill claims to your PPO health plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                1. Select Service Type
              </label>
              <select
                value={selectedServiceIndex}
                onChange={(e) => setSelectedServiceIndex(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#0B0A0D]/15 text-xs sm:text-sm font-medium text-[#0B0A0D] focus:outline-hidden focus:ring-1 focus:ring-[#0B0A0D]"
              >
                {DEMO_FEE_SCHEDULE.map((s, idx) => (
                  <option key={idx} value={idx}>
                    {s.service} (Est. ${baseRates[idx]}/session)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  2. Insurance Reimbursement Rate
                </label>
                <span className="text-xs font-bold text-[#0B0A0D] bg-[#FBE3EC]/30 px-2 py-0.5 rounded-md">
                  {coverageRate}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={coverageRate}
                onChange={(e) => setCoverageRate(Number(e.target.value))}
                className="w-full accent-[#0B0A0D] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>30% (Basic PPO)</span>
                <span>60%–70% (Standard)</span>
                <span>80%–90% (Generous)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  3. Frequency
                </label>
                <select
                  value={sessionsPerMonth}
                  onChange={(e) => setSessionsPerMonth(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FC] border border-[#0B0A0D]/15 text-xs sm:text-sm font-medium text-[#0B0A0D] focus:outline-hidden focus:ring-1 focus:ring-[#0B0A0D]"
                >
                  <option value={2}>Bi-weekly (2 sessions/mo)</option>
                  <option value={4}>Weekly (4 sessions/mo)</option>
                  <option value={6}>Intensive (6 sessions/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  4. Out-of-Network Deductible
                </label>
                <div className="flex items-center gap-2 pt-1.5">
                  <input
                    type="checkbox"
                    id="deductible"
                    checked={deductibleMet}
                    onChange={(e) => setDeductibleMet(e.target.checked)}
                    className="w-4 h-4 accent-[#0B0A0D] rounded cursor-pointer"
                  />
                  <label htmlFor="deductible" className="text-xs text-neutral-600 cursor-pointer">
                    Met for current year
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-6 rounded-2xl bg-[#FFF9FC] border border-[#0B0A0D]/12 p-6 sm:p-7 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#EFA0BF] block">
              Estimated Financial Breakdown
            </span>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#0B0A0D]/10">
              <div>
                <div className="text-[11px] text-neutral-500">Practice Session Rate</div>
                <div className="font-serif text-2xl font-bold text-[#0B0A0D]">${currentBaseRate}</div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-500">Est. Insurer Check Back</div>
                <div className="font-serif text-2xl font-bold text-[#C87596]">
                  +${estimatedReimbursementPerSession}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#0B0A0D]/10 space-y-2">
              <div className="flex justify-between items-center text-xs text-neutral-600">
                <span>Estimated Net Investment / Session:</span>
                <span className="font-serif text-lg font-bold text-[#0B0A0D]">
                  ${estimatedNetPerSession}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-600">
                <span>Monthly Investment ({sessionsPerMonth} sessions):</span>
                <span className="font-serif text-lg font-bold text-[#0B0A0D]">
                  ${estimatedNetMonthly}
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 italic pt-1">
                *Monthly Superbill will state gross ${monthlyGross}; expected refund from your insurer is approx. ${estimatedMonthlyReimbursement}.
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed">
              We recommend calling the member number on the back of your insurance card and asking: <em>“What is my out-of-network reimbursement rate for outpatient behavioral health codes 90834 or 90837?”</em>
            </p>
          </div>
        </div>
      </div>

      {/* Superbills & Insurance Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#FBE3EC]/40 text-[#0B0A0D] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
            How Monthly Superbills Work
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Many PPO insurance policies cover between 50% and 80% of psychotherapy costs once annual deductibles are met.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            On the first of each calendar month, our client portal automatically generates an itemized <strong>Superbill</strong> with diagnostic ICD-10 and CPT codes. You simply upload this document to your insurance portal for direct reimbursement.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#0B0A0D]/10 p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#EFA0BF]/40 text-[#0B0A0D] flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0B0A0D]">
            Payment Methods &amp; HSA / FSA
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Therapy fees qualify as eligible healthcare expenses under most Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA), allowing you to pay using pre-tax dollars.
          </p>
          <ul className="text-xs text-neutral-600 space-y-2 pt-1">
            {DEMO_PAYMENT_POLICIES.acceptedPaymentMethods.map((m, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B0A0D]" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cancellation & Sliding Scale */}
      <div className="rounded-3xl bg-[#FFF9FC] border border-[#0B0A0D]/10 p-8 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#0B0A0D]">
              Cancellation &amp; Rescheduling Policy ({DEMO_PAYMENT_POLICIES.cancellationWindow})
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {DEMO_PAYMENT_POLICIES.cancellationPolicy}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#0B0A0D]">
              Subsidized Sliding-Scale Openings
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {DEMO_PAYMENT_POLICIES.slidingScaleNotice}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#0B0A0D]/10 text-xs text-neutral-500">
          <strong>No Surprises Act / Good Faith Estimate: </strong>
          {DEMO_PAYMENT_POLICIES.goodFaithEstimateNote}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/appointment"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold bg-[#0B0A0D] text-white hover:bg-[#151218] transition-colors"
        >
          <span>Schedule an Initial Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
