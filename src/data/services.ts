import { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'individual-therapy',
    slug: 'individual-therapy',
    title: 'Individual Therapy',
    category: 'core',
    shortDescription:
      'A dedicated space to examine life transitions, anxiety, identity, and personal grief alongside a supportive clinician.',
    heroHeadline: 'A Room to Speak Without Filter or Expectation',
    heroSubheadline:
      'Explore life transitions, quiet self-doubt, unresolved patterns, and personal renewal with a licensed psychologist dedicated to your pace.',
    idealFor: [
      'Navigating career, relationship, or identity crossroads',
      'Untangling pervasive overwhelm, burnout, or chronic worry',
      'Processing grief, loss, or silent emotional exhaustion',
      'Building deeper self-compassion, assertive boundaries, and somatic clarity',
    ],
    sessionStructure: {
      duration: '50 Minutes',
      cadence: 'Weekly or Bi-weekly',
      focus: 'Reflective, relational, and goal-aligned exploration',
    },
    keyPillars: [
      {
        title: 'Emotional Sanctuary',
        description:
          'No judgment, no unsolicited lectures, and no requirement to put on a brave face. Whatever you feel today is welcome here.',
      },
      {
        title: 'Integrative Modalities',
        description:
          'We draw from psychodynamic insight, Acceptance and Commitment Therapy (ACT), and somatic mindfulness tailored to your nervous system.',
      },
      {
        title: 'Sustainable Agency',
        description:
          'Uncover lasting internal resources that carry you through distress long after your session concludes.',
      },
    ],
    whatToExpect: [
      'Initial consultation mapping your history, immediate concerns, and therapeutic hopes',
      'Collaborative dialogue with space for silence, exploration, and emotional release',
      'Gentle observation of unconscious narratives and relational habits',
      'Practical grounding tools when anxious distress feels acute',
    ],
    recommendedPsychologists: ['dr-elena-vance', 'marcus-chen', 'dr-sophia-martinez'],
  },
  {
    id: 'couples-therapy',
    slug: 'couples-therapy',
    title: 'Couples Counseling',
    category: 'core',
    shortDescription:
      'Reconnecting across misunderstandings, deepening emotional intimacy, and learning to listen with curiosity instead of defense.',
    heroHeadline: 'Hearing What Lies Beneath the Disagreement',
    heroSubheadline:
      'Therapy for partners seeking to de-escalate cycles of conflict, renew vulnerability, and co-create an enduring culture of respect.',
    idealFor: [
      'Recurring communication breakdowns where both feel unheard',
      'Navigating major transitions like parenthood, relocations, or career shifts',
      'Repairing trust, emotional attunement, or intimacy after disconnect',
      'Couples seeking proactive alignment before marriage or cohabitation',
    ],
    sessionStructure: {
      duration: '60 – 75 Minutes',
      cadence: 'Bi-weekly or Weekly',
      focus: 'Dyadic dialogue, attachment safety, and relational habits',
    },
    keyPillars: [
      {
        title: 'Neutral Third Presence',
        description:
          'We do not choose sides or crown winners. Our client is the relationship itself and the safety between you.',
      },
      {
        title: 'Emotion-Focused Attunement',
        description:
          'Discover how anger and withdrawal often conceal softer needs for reassurance, safety, and affection.',
      },
      {
        title: 'Real-Time Repair Rituals',
        description:
          'Practice interrupting defensive reflex loops inside the safety of the room so you can apply them at home.',
      },
    ],
    whatToExpect: [
      'Safe environment where both perspectives receive equal consideration',
      'Exploration of core attachment styles and conflict triggers',
      'Guided conversational exercises to move past entrenched positions',
      'Clear agreements on respectful boundaries and cooling-off intervals',
    ],
    recommendedPsychologists: ['dr-sophia-martinez', 'julian-ross'],
  },
  {
    id: 'family-therapy',
    slug: 'family-therapy',
    title: 'Family Therapy',
    category: 'core',
    shortDescription:
      'Harmonizing multi-generational dynamics, establishing healthy familial boundaries, and supporting collective resilience.',
    heroHeadline: 'Cultivating Understanding Across Generations',
    heroSubheadline:
      'A constructive framework to help parents, adult siblings, and multi-generational households bridge emotional distance.',
    idealFor: [
      'Navigating blended families, divorce restructuring, or caregiving stress',
      'Intergenerational communication gaps and differing cultural values',
      'Supporting a family member through medical or psychological vulnerability',
      'Clarifying healthy boundaries without fracturing kinship bonds',
    ],
    sessionStructure: {
      duration: '75 Minutes',
      cadence: 'Bi-weekly',
      focus: 'Systemic interaction patterns, shared narratives, and mutual care',
    },
    keyPillars: [
      {
        title: 'Systemic Perspective',
        description:
          'Families are living ecosystems; shifting one habit gently changes how the entire unit functions.',
      },
      {
        title: 'Equal Voice Distribution',
        description:
          'Ensuring quieter members are protected from domination while passionate members are deeply heard.',
      },
      {
        title: 'Intergenerational Compassion',
        description:
          'Acknowledging the historic circumstances and cultural heritages that shaped each family member.',
      },
    ],
    whatToExpect: [
      'Initial whole-family assessment followed by tailored combination sessions',
      'Mapping of recurring multi-generational themes and unspoken assumptions',
      'Agreements for constructive problem-solving at home',
      'Fostering shared celebration and collaborative problem-solving',
    ],
    recommendedPsychologists: ['dr-amara-okafor', 'marcus-chen'],
  },
  {
    id: 'child-teen-therapy',
    slug: 'child-teen-therapy',
    title: 'Child & Teen Support',
    category: 'core',
    shortDescription:
      'Age-appropriate psychological care offering young people an encouraging space to process emotions, social pressures, and change.',
    heroHeadline: 'A Safe Harbor for Developing Minds',
    heroSubheadline:
      'Thoughtful, creative psychological support tailored to adolescents and young adults navigating modern academic and emotional complexity.',
    idealFor: [
      'Adolescent anxiety, perfectionism, and social isolation',
      'Difficult school transitions, peer conflict, and digital fatigue',
      'Emotional regulation challenges, mood swings, and anger bursts',
      'Youth adjusting to familial changes, grief, or neurodivergent discoveries',
    ],
    sessionStructure: {
      duration: '50 Minutes',
      cadence: 'Weekly',
      focus: 'Creative expression, trust-building, and coping strategies',
    },
    keyPillars: [
      {
        title: 'Developmental Fluency',
        description:
          'We engage young people through conversational warmth, creative mediums, and respect for their autonomy.',
      },
      {
        title: 'Collaborative Caregiver Alliance',
        description:
          'Regular parent check-ins ensure home environments reinforce the child’s emotional growth while respecting the teen’s confidentiality.',
      },
      {
        title: 'Resilience Skill-Building',
        description:
          'Empowering youth with somatic grounding, cognitive flexibility, and self-advocacy skills for adulthood.',
      },
    ],
    whatToExpect: [
      'Caregiver intake consultation to understand history and behavioral patterns',
      'Paced trust-building without interrogative pressure',
      'Practical tools for handling school anxiety and social comparison',
      'Progress check-ins with parents to celebrate milestones',
    ],
    recommendedPsychologists: ['claire-lindqvist', 'dr-elena-vance'],
  },
  {
    id: 'anxiety-stress',
    slug: 'anxiety-stress',
    title: 'Anxiety & Chronic Stress',
    category: 'specialized',
    shortDescription:
      'Slowing down the autonomic nervous system and transforming obsessive worry into self-trust and calm presence.',
    heroHeadline: 'Calming the Constant Internal Alarm',
    heroSubheadline:
      'Specialized psychological interventions to de-escalate generalized anxiety, panic attacks, high-functioning burnout, and somatic tension.',
    idealFor: [
      'Racing thoughts, persistent catastrophizing, and insomnia',
      'Physical symptoms of anxiety (chest tightness, shallow breath, muscle armor)',
      'Imposter phenomenon and relentless high-performer perfectionism',
      'Social avoidance and fear of being judged or losing control',
    ],
    sessionStructure: {
      duration: '50 Minutes',
      cadence: 'Weekly',
      focus: 'Neurobiology of calm, exposure pacing, and nervous system regulation',
    },
    keyPillars: [
      {
        title: 'Demystifying the Body’s Alarm',
        description:
          'Understanding why your fight-or-flight response activates and learning somatic techniques to signal biological safety.',
      },
      {
        title: 'Disarming Catastrophic Loops',
        description:
          'Gentle cognitive inquiry and ACT principles that allow intrusive thoughts to pass without dictating your choices.',
      },
      {
        title: 'Restorative Boundaries',
        description:
          'Rethinking over-commitment, chronic urgency, and the fear of saying no in professional and personal arenas.',
      },
    ],
    whatToExpect: [
      'Bio-psycho-social assessment of your anxiety triggers',
      'Customized breathing, bilateral grounding, and sensory practices',
      'Gradual desensitization to avoided situations with supportive scaffolding',
      'Noticeable reduction in baseline hypervigilance over time',
    ],
    recommendedPsychologists: ['dr-elena-vance', 'julian-ross', 'claire-lindqvist'],
  },
  {
    id: 'depression',
    slug: 'depression',
    title: 'Depression & Heavy Moods',
    category: 'specialized',
    shortDescription:
      'Compassionate companionship through seasons of numbness, low energy, loss of joy, and quiet self-criticism.',
    heroHeadline: 'Holding Hope When Everything Feels Muted',
    heroSubheadline:
      'A non-demanding, nonjudgmental space to rediscover vitality, self-worth, and meaningful connection at your own tempo.',
    idealFor: [
      'Pervasive heaviness, apathy, or difficulty finding joy in previously loved activities',
      'Severe morning fatigue, brain fog, and low motivation',
      'Pervasive shame, self-blame, and feelings of inadequacy',
      'Isolation and feeling burdensome to loved ones',
    ],
    sessionStructure: {
      duration: '50 Minutes',
      cadence: 'Weekly',
      focus: 'Paced reactivation, compassionate inquiry, and restorative presence',
    },
    keyPillars: [
      {
        title: 'Zero Pressure to "Fix" Instantly',
        description:
          'We meet you exactly where your energy is today. You do not need to perform enthusiasm or apologize for fatigue.',
      },
      {
        title: 'Gentle Behavioral Momentum',
        description:
          'Micro-steps that rebuild dopamine and nervous system warmth without triggering exhaustion.',
      },
      {
        title: 'Unraveling the Critic',
        description:
          'Examining the internal critic’s harsh voice and cultivating a steady, protective inner advocate.',
      },
    ],
    whatToExpect: [
      'A deeply supportive, low-friction atmosphere',
      'Gradual exploration of unresolved grief, unmet needs, or burnout precursors',
      'Collaboration with your physician or psychiatrist if medication is part of your care',
      'Celebration of quiet, everyday victories of vitality',
    ],
    recommendedPsychologists: ['marcus-chen', 'dr-amara-okafor', 'dr-elena-vance'],
  },
  {
    id: 'trauma',
    slug: 'trauma',
    title: 'Trauma-Informed Healing',
    category: 'specialized',
    shortDescription:
      'Paced, consent-focused therapy for complex relational trauma, adverse events, and nervous system hypervigilance.',
    heroHeadline: 'Reclaiming Wholeness, One Safe Moment at a Time',
    heroSubheadline:
      'Gentle, phased psychological care emphasizing safety, personal boundaries, and somatic reconnection after distress.',
    idealFor: [
      'Adult survivors of childhood emotional neglect or adverse events',
      'Traumatic shock following accidents, medical events, or abrupt loss',
      'Difficulty feeling safe in one’s body or maintaining trusting relationships',
      'Flashbacks, intrusive memories, or dissociation under stress',
    ],
    sessionStructure: {
      duration: '50 – 60 Minutes',
      cadence: 'Weekly',
      focus: 'Safety establishment, somatic grounding, and phased integration',
    },
    keyPillars: [
      {
        title: 'Strict Consent & Control',
        description:
          'You remain in complete control of what is shared and when. We never force premature retelling of painful events.',
      },
      {
        title: 'Body-First Grounding',
        description:
          'Trauma lives in physical sensations and defensive reflexes. We prioritize anchoring you safely in the present moment.',
      },
      {
        title: 'Post-Traumatic Growth',
        description:
          'Beyond symptom reduction: reclaiming vitality, intimacy, creative expression, and authentic peace.',
      },
    ],
    whatToExpect: [
      'Phase 1 focuses entirely on emotional stability, safety resources, and mutual trust',
      'Phase 2 introduces gentle processing of traumatic residue only when stability is established',
      'Phase 3 consolidates new identity, relational boundaries, and future purpose',
      'Constant pacing adjustments guided by your nervous system feedback',
    ],
    recommendedPsychologists: ['dr-sophia-martinez', 'dr-amara-okafor', 'julian-ross'],
  },
];
