import { useState } from 'react';
import type { ManifestationMode } from '../types/app';
import { MANIFESTATION_MODE_LABELS } from '../types/app';
import { COMMON_LIMITING_BELIEFS, suggestAdaptiveBelief } from '../data/beliefPrompts';
import { todayKey, useAppState } from '../hooks/useAppState';
import { Button } from './Button';
import styles from './BeliefSetupView.module.css';

interface BeliefSetupViewProps {
  onComplete: () => void;
  onBack: () => void;
  onDepth?: () => void;
}

export function BeliefSetupView({ onComplete, onBack, onDepth }: BeliefSetupViewProps) {
  const { createBeliefWeek } = useAppState();
  const [limiting, setLimiting] = useState('');
  const [adaptive, setAdaptive] = useState('');
  const [mode, setMode] = useState<ManifestationMode>('identity');
  const [intention, setIntention] = useState('');

  const handleLimitingPick = (belief: string) => {
    setLimiting(belief);
    if (!adaptive) setAdaptive(suggestAdaptiveBelief(belief));
  };

  const handleSave = () => {
    if (!limiting.trim() || !adaptive.trim()) return;
    createBeliefWeek({
      weekStart: todayKey(),
      limitingBelief: limiting.trim(),
      adaptiveBelief: adaptive.trim(),
      manifestationMode: mode,
      manifestationIntention: intention.trim(),
      truthRatingStart: null,
      truthRatingEnd: null,
      fromDepth: false,
    });
    onComplete();
  };

  const modes: ManifestationMode[] = ['outcome', 'identity', 'trust'];

  return (
    <div className={styles.setup}>
      <button className={styles.back} onClick={onBack} type="button">
        ← Back
      </button>

      <h1 className={styles.title}>Set your belief</h1>
      <p className={styles.subtitle}>
        A quick setup to begin. For the full experience, try a Depth session later.
      </p>

      {onDepth && (
        <button className={styles.depthLink} onClick={onDepth} type="button">
          Prefer the full Depth session →
        </button>
      )}

      <label className={styles.field}>
        Limiting belief you are loosening
        <textarea
          value={limiting}
          onChange={(e) => setLimiting(e.target.value)}
          placeholder="A belief that feels heavy..."
          rows={2}
        />
      </label>

      <div className={styles.chips}>
        {COMMON_LIMITING_BELIEFS.slice(0, 4).map((b) => (
          <button
            key={b}
            type="button"
            className={styles.chip}
            onClick={() => handleLimitingPick(b)}
          >
            {b}
          </button>
        ))}
      </div>

      <label className={styles.field}>
        Adaptive belief to strengthen
        <textarea
          value={adaptive}
          onChange={(e) => setAdaptive(e.target.value)}
          placeholder="A kinder belief that feels true enough..."
          rows={2}
        />
      </label>

      <p className={styles.fieldLabel}>Manifestation mode this week</p>
      <div className={styles.modes}>
        {modes.map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles.modeBtn} ${mode === m ? styles.modeActive : ''}`}
            onClick={() => setMode(m)}
          >
            {MANIFESTATION_MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <label className={styles.field}>
        Intention for the week
        <textarea
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder={
            mode === 'outcome'
              ? 'Something specific you are moving toward...'
              : mode === 'identity'
                ? 'I am becoming someone who...'
                : 'I can tolerate not knowing yet because...'
          }
          rows={2}
        />
      </label>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleSave}
        disabled={!limiting.trim() || !adaptive.trim()}
      >
        Set as this week&apos;s belief
      </Button>
    </div>
  );
}
