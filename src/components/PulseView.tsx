import { useState } from 'react';
import { pickAffirmations } from '../data/affirmations';
import { useAppState } from '../hooks/useAppState';
import { BreathingCircle } from './BreathingCircle';
import { Button } from './Button';
import styles from './PulseView.module.css';

type PulseStep = 'breathe' | 'belief' | 'affirm' | 'done';

interface PulseViewProps {
  onBack: () => void;
}

export function PulseView({ onBack }: PulseViewProps) {
  const { adaptiveBeliefText, markPulse } = useAppState();
  const [step, setStep] = useState<PulseStep>('breathe');
  const [affirmation] = useState(() => pickAffirmations(1, 'morning')[0]);

  const handleDone = () => {
    markPulse();
    setStep('done');
  };

  return (
    <div className={styles.pulse}>
      <button className={styles.back} onClick={onBack} type="button">
        ← Back
      </button>

      {step === 'breathe' && (
        <div className={styles.step}>
          <h1 className={styles.title}>Just a moment</h1>
          <p className={styles.bodyMuted}>One slow breath. That is enough to start.</p>
          <BreathingCircle cycles={1} onComplete={() => setStep('belief')} />
        </div>
      )}

      {step === 'belief' && (
        <div className={styles.step}>
          <p className={styles.label}>Your belief</p>
          <blockquote className={styles.belief}>&ldquo;{adaptiveBeliefText}&rdquo;</blockquote>
          <p className={styles.hint}>Read it quietly. Let it land.</p>
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('affirm')}>
            Continue
          </Button>
        </div>
      )}

      {step === 'affirm' && (
        <div className={styles.step}>
          <p className={styles.label}>One more</p>
          <blockquote className={styles.belief}>{affirmation.text}</blockquote>
          <Button variant="primary" size="lg" fullWidth onClick={handleDone}>
            That&apos;s enough for today
          </Button>
        </div>
      )}

      {step === 'done' && (
        <div className={styles.step}>
          <h1 className={styles.title}>You showed up.</h1>
          <p className={styles.body}>That is enough for today. Be gentle with yourself.</p>
          <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
            Return home
          </Button>
        </div>
      )}
    </div>
  );
}
