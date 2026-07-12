import type { BeliefWeek } from '../types/app';
import { MANIFESTATION_MODE_LABELS } from '../types/app';
import styles from './BeliefCard.module.css';

interface BeliefCardProps {
  belief: BeliefWeek | null;
  dayNumber: number;
  onTap: () => void;
  onSetup: () => void;
}

export function BeliefCard({
  belief,
  dayNumber,
  onTap,
  onSetup,
}: BeliefCardProps) {
  if (!belief) {
    return (
      <button className={styles.setupCard} onClick={onSetup} type="button">
        <p className={styles.setupLabel}>This week&apos;s belief</p>
        <p className={styles.setupText}>Set your first belief to begin</p>
        <span className={styles.setupCta}>Tap to start →</span>
      </button>
    );
  }

  return (
    <button className={styles.card} onClick={onTap} type="button">
      <p className={styles.label}>This week&apos;s belief</p>
      <p className={styles.belief}>&ldquo;{belief.adaptiveBelief}&rdquo;</p>
      <p className={styles.meta}>
        {MANIFESTATION_MODE_LABELS[belief.manifestationMode]} · Day {dayNumber}
      </p>
    </button>
  );
}
