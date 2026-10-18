export interface FeeStructureItem {
  service: string;
  duration: string;
  demoFeeRange: string;
  description: string;
  insuranceNote: string;
}

export const DEMO_FEE_SCHEDULE: FeeStructureItem[] = [
  {
    service: 'Individual Psychotherapy',
    duration: '50 Minutes',
    demoFeeRange: '$225 – $290 [Demo Placeholder]',
    description: 'Comprehensive one-on-one session with a licensed clinical psychologist or licensed psychotherapist.',
    insuranceNote: 'Superbill provided for out-of-network reimbursement.',
  },
  {
    service: 'Couples & Relationship Counseling',
    duration: '60 – 75 Minutes',
    demoFeeRange: '$280 – $360 [Demo Placeholder]',
    description: 'Specialized relational consultation for partners seeking conflict de-escalation and attachment repair.',
    insuranceNote: 'Usually eligible for out-of-network benefits depending on policy.',
  },
  {
    service: 'Family Therapy Consultation',
    duration: '75 Minutes',
    demoFeeRange: '$320 – $390 [Demo Placeholder]',
    description: 'Multi-member family session supporting systemic dynamics and intergenerational communication.',
    insuranceNote: 'Itemized billing statements supplied monthly.',
  },
  {
    service: 'Adolescent & Teen Support',
    duration: '50 Minutes',
    demoFeeRange: '$225 – $280 [Demo Placeholder]',
    description: 'Youth-centered psychotherapy including periodic parent collaborative check-in sessions.',
    insuranceNote: 'Reimbursable under many behavioral health plans.',
  },
  {
    service: 'Initial Clinical Intake & Evaluation',
    duration: '60 Minutes',
    demoFeeRange: '$275 – $340 [Demo Placeholder]',
    description: 'In-depth initial history intake, goals assessment, and tailored clinical roadmap design.',
    insuranceNote: 'Diagnostic codes included on itemized superbill.',
  },
];

export const DEMO_PAYMENT_POLICIES = {
  cancellationWindow: '48 Hours',
  cancellationPolicy:
    'We reserve each appointment slot exclusively for you. Appointments cancelled or rescheduled with less than 48 hours notice are billed at the full session rate, except in acute medical emergencies.',
  slidingScaleNotice:
    'We believe compassionate care should remain accessible. Our clinicians hold a limited number of subsidized sliding-scale slots reserved for students, non-profit workers, and individuals experiencing acute financial distress. Please mention this during intake.',
  acceptedPaymentMethods: [
    'Major Credit & Debit Cards (Visa, MasterCard, Amex)',
    'Health Savings Accounts (HSA)',
    'Flexible Spending Accounts (FSA)',
    'Direct ACH Electronic Transfer',
  ],
  goodFaithEstimateNote:
    'Under the No Surprises Act, healthcare providers must provide clients who are not using insurance or are self-paying with a "Good Faith Estimate" of expected charges prior to receiving services.',
};
