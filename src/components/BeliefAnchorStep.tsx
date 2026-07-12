import { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { Button } from './Button';
import styles from './BeliefAnchorStep.module.css';

interface BeliefAnchorStepProps {
  mode: 'morning' | 'evening';
  onContinue: () => void;
}

export function BeliefAnchorStep({ mode, onContinue }: BeliefAnchorStepProps) {
  const { activeBelief, adaptiveBeliefText, latestEvidence, saveEvidence } = useAppState();
  const [reflection, setReflection] = useState('');

  const isMorning = mode === 'morning';

  const handleContinue = () => {
    if (!isMorning && reflection.trim()) {
      saveEvidence(reflection, 'evening');
    }
    onContinue();
  };

  return (
    <div className={styles.step}>
      <h2 className={styles.title}>
        {isMorning ? 'Belief anchor' : 'Belief reflection'}
      </h2>
      <p className={styles.bodyMuted}>
        {isMorning
          ? 'Carry this belief into your day.'
          : 'When did you live this belief today? Optional — no pressure.'}
      </p>

      <blockquote className={styles.belief}>
        &ldquo;{activeBelief?.adaptiveBelief ?? adaptiveBeliefText}&rdquo;
      </blockquote>

      {isMorning && latestEvidence && (
        <p className={styles.evidence}>
          <span className={styles.evidenceLabel}>Recent evidence: </span>
          {latestEvidence}
        </p>
      )}

      {!isMorning && (
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="A moment when you lived this belief..."
          rows={3}
        />
      )}

      <Button variant="primary" size="lg" fullWidth onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}
