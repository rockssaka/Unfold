export const COMMON_LIMITING_BELIEFS = [
  'I have to earn rest.',
  'I am not good enough yet.',
  'If I slow down, I will fall behind.',
  'Good things do not last for people like me.',
  'I must be perfect to be loved.',
  'Asking for help means I am weak.',
  'I do not deserve happiness without suffering first.',
];

export const DEPTH_PROMPTS = {
  evidenceFor: 'What moments, even small ones, suggest this limiting belief might be true?',
  evidenceAgainst: 'What experiences suggest this belief might not be the whole truth?',
  adaptiveCraft: 'Knowing both sides, what would a kinder, more balanced belief sound like?',
  outcome: 'What specific outcome are you moving toward this week?',
  identity: 'Finish: I am becoming someone who...',
  trust: 'Finish: I can tolerate not knowing yet because...',
};

export function suggestAdaptiveBelief(limiting: string): string {
  const lower = limiting.toLowerCase();
  if (lower.includes('rest') || lower.includes('slow')) {
    return 'Rest is part of how I succeed, not a reward I must earn.';
  }
  if (lower.includes('enough') || lower.includes('good')) {
    return 'I am learning and growing — my worth is not on hold until I arrive somewhere else.';
  }
  if (lower.includes('perfect')) {
    return 'I can be imperfect and still be worthy of connection and respect.';
  }
  if (lower.includes('help') || lower.includes('weak')) {
    return 'Needing support is human. Reaching out is a form of strength.';
  }
  if (lower.includes('deserve') || lower.includes('happiness')) {
    return 'I am allowed to feel joy without having suffered enough first.';
  }
  return 'I can hold uncertainty and still take gentle care of myself.';
}
