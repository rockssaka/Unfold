import { useState } from 'react';
import { gentleReframe } from '../data/reframes';
import { useAppState } from '../hooks/useAppState';
import { Button } from './Button';
import styles from './ThoughtCapture.module.css';

interface ThoughtCaptureProps {
  onContinue: () => void;
  onSkip: () => void;
}

export function ThoughtCapture({ onContinue, onSkip }: ThoughtCaptureProps) {
  const { adaptiveBeliefText, saveEvidence } = useAppState();
  const [thought, setThought] = useState('');
  const [reframe, setReframe] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleReframe = () => {
    if (!thought.trim()) return;
    setReframe(gentleReframe(thought, adaptiveBeliefText));
  };

  const handleSaveEvidence = () => {
    if (thought.trim()) {
      saveEvidence(thought, 'ground');
      setSaved(true);
    }
  };

  return (
    <div className={styles.capture}>
      <h2 className={styles.title}>Is there a thought weighing on you?</h2>
      <p className={styles.hint}>Optional. You can skip at any time.</p>

      <textarea
        value={thought}
        onChange={(e) => {
          setThought(e.target.value);
          setReframe(null);
          setSaved(false);
        }}
        placeholder="Name the thought, without judging it..."
        rows={3}
      />

      {!reframe && thought.trim() && (
        <Button variant="secondary" fullWidth onClick={handleReframe}>
          Offer a gentle reframe
        </Button>
      )}

      {reframe && (
        <blockquote className={styles.reframe}>{reframe}</blockquote>
      )}

      {reframe && !saved && (
        <Button variant="ghost" fullWidth onClick={handleSaveEvidence}>
          Save this moment as evidence
        </Button>
      )}

      {saved && <p className={styles.saved}>Saved to your evidence log.</p>}

      <Button variant="primary" size="lg" fullWidth onClick={onContinue}>
        Continue
      </Button>
      <button className={styles.skip} onClick={onSkip} type="button">
        Skip
      </button>
    </div>
  );
}
