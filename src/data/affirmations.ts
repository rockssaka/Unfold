export type AffirmationCategory =
  | 'confidence'
  | 'success'
  | 'health'
  | 'happiness';

export interface Affirmation {
  id: string;
  text: string;
  category: AffirmationCategory;
  /** When this affirmation is most clinically appropriate */
  context: 'morning' | 'evening' | 'both' | 'grounding';
}

/**
 * Curated affirmations grounded in CBT, self-compassion, and
 * acceptance-based approaches — present-tense, process-focused,
 * avoiding toxic positivity or unrealistic guarantees.
 */
export const affirmations: Affirmation[] = [
  // Confidence
  {
    id: 'conf-1',
    text: 'I trust my ability to handle what is in front of me, one step at a time.',
    category: 'confidence',
    context: 'both',
  },
  {
    id: 'conf-2',
    text: 'I have navigated difficulty before. That resilience is still in me.',
    category: 'confidence',
    context: 'morning',
  },
  {
    id: 'conf-3',
    text: 'My voice matters. I can speak with clarity and calm.',
    category: 'confidence',
    context: 'morning',
  },
  {
    id: 'conf-4',
    text: 'Uncertainty does not mean I am failing — it means I am human.',
    category: 'confidence',
    context: 'evening',
  },
  {
    id: 'conf-5',
    text: 'I am allowed to take up space without apologizing for it.',
    category: 'confidence',
    context: 'both',
  },
  {
    id: 'conf-g',
    text: 'Right now, in this breath, I am safe enough to slow down.',
    category: 'confidence',
    context: 'grounding',
  },

  // Success
  {
    id: 'succ-1',
    text: 'Progress matters more than perfection. One meaningful step is enough.',
    category: 'success',
    context: 'morning',
  },
  {
    id: 'succ-2',
    text: 'I am building something real, even when the results are not visible yet.',
    category: 'success',
    context: 'both',
  },
  {
    id: 'succ-3',
    text: 'Setbacks are information, not evidence that I should give up.',
    category: 'success',
    context: 'evening',
  },
  {
    id: 'succ-4',
    text: 'Rest is part of sustainable success, not a reward I must earn.',
    category: 'success',
    context: 'evening',
  },
  {
    id: 'succ-5',
    text: 'I define success by how I show up, not only by outcomes.',
    category: 'success',
    context: 'both',
  },
  {
    id: 'succ-g',
    text: 'I do not need to solve everything right now. I only need this next breath.',
    category: 'success',
    context: 'grounding',
  },

  // Health
  {
    id: 'hlth-1',
    text: 'My body is working with me. I treat it with patience and care.',
    category: 'health',
    context: 'morning',
  },
  {
    id: 'hlth-2',
    text: 'Nourishing myself — with food, rest, or kindness — is a valid priority.',
    category: 'health',
    context: 'both',
  },
  {
    id: 'hlth-3',
    text: 'Each slow breath is a small act of healing my nervous system.',
    category: 'health',
    context: 'grounding',
  },
  {
    id: 'hlth-4',
    text: 'I listen to what my body needs without judging myself for needing it.',
    category: 'health',
    context: 'evening',
  },
  {
    id: 'hlth-5',
    text: 'Recovery is not laziness. My mind and body deserve restoration.',
    category: 'health',
    context: 'evening',
  },
  {
    id: 'hlth-g',
    text: 'Tension can soften. I give my shoulders permission to drop, just a little.',
    category: 'health',
    context: 'grounding',
  },

  // Happiness
  {
    id: 'happy-1',
    text: 'I am allowed to feel joy without having earned it first.',
    category: 'happiness',
    context: 'morning',
  },
  {
    id: 'happy-2',
    text: 'Small moments of peace belong to me, even on difficult days.',
    category: 'happiness',
    context: 'both',
  },
  {
    id: 'happy-3',
    text: 'Contentment and ambition can coexist. I do not have to choose.',
    category: 'happiness',
    context: 'morning',
  },
  {
    id: 'happy-4',
    text: 'I notice what went okay today, however small it may seem.',
    category: 'happiness',
    context: 'evening',
  },
  {
    id: 'happy-5',
    text: 'I choose to soften toward myself, the way I would toward someone I care about.',
    category: 'happiness',
    context: 'evening',
  },
  {
    id: 'happy-g',
    text: 'This feeling will shift. I do not have to fight it — only breathe through it.',
    category: 'happiness',
    context: 'grounding',
  },
];

export const categoryLabels: Record<AffirmationCategory, string> = {
  confidence: 'Confidence',
  success: 'Success',
  health: 'Health',
  happiness: 'Happiness',
};

export function pickAffirmations(
  count: number,
  context: 'morning' | 'evening' | 'grounding',
  excludeIds: string[] = [],
): Affirmation[] {
  const pool = affirmations.filter(
    (a) =>
      (a.context === context || a.context === 'both') &&
      !excludeIds.includes(a.id),
  );

  const categories: AffirmationCategory[] = [
    'confidence',
    'success',
    'health',
    'happiness',
  ];

  const picked: Affirmation[] = [];
  const usedCategories = new Set<AffirmationCategory>();

  for (const cat of categories) {
    if (picked.length >= count) break;
    const candidates = pool.filter(
      (a) => a.category === cat && !usedCategories.has(cat),
    );
    if (candidates.length > 0) {
      const choice = candidates[Math.floor(Math.random() * candidates.length)];
      picked.push(choice);
      usedCategories.add(cat);
    }
  }

  while (picked.length < count && pool.length > picked.length) {
    const remaining = pool.filter((a) => !picked.some((p) => p.id === a.id));
    if (remaining.length === 0) break;
    picked.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  return picked.slice(0, count);
}
