export function gentleReframe(thought: string, adaptiveBelief?: string): string {
  const lower = thought.toLowerCase();

  if (lower.includes('not enough') || lower.includes("can't")) {
    return 'This feeling of not being enough is familiar — it is not proof. You have handled hard things before.';
  }
  if (lower.includes('always') || lower.includes('never')) {
    return 'When the mind says "always" or "never," it is often overstating. One moment is just one moment.';
  }
  if (lower.includes('should')) {
    return 'The word "should" adds pressure. What if you asked "what do I need right now?" instead?';
  }
  if (lower.includes('fail') || lower.includes('mistake')) {
    return 'A setback is information, not a verdict on who you are.';
  }
  if (adaptiveBelief) {
    return `You are carrying a heavy thought. Your active belief offers another angle: "${adaptiveBelief}"`;
  }
  return 'This thought is loud right now. It does not have to be the only truth. You are here, breathing — that counts.';
}
