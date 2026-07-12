import { useState } from 'react';
import type { Affirmation } from '../data/affirmations';
import { categoryLabels, pickAffirmations } from '../data/affirmations';
import { BeliefAnchorStep } from './BeliefAnchorStep';
import { BreathingCircle } from './BreathingCircle';
import { Button } from './Button';
import styles from './RitualView.module.css';

type RitualType = 'morning' | 'evening';

type RitualStep =
  | 'intro'
  | 'affirm'
  | 'belief'
  | 'intention'
  | 'reflect'
  | 'release'
  | 'breathe'
  | 'complete';

const MORNING_INTENTIONS = [
  'Today I will be patient with myself.',
  'Today I will take one step that matters.',
  'Today I will notice something good.',
  'Today I will rest without guilt.',
];

interface RitualViewProps {
  type: RitualType;
  onComplete: () => void;
  onBack: () => void;
}

export function RitualView({ type, onComplete, onBack }: RitualViewProps) {
  const isMorning = type === 'morning';
  const [step, setStep] = useState<RitualStep>('intro');
  const [affirmations] = useState<Affirmation[]>(() =>
    pickAffirmations(3, isMorning ? 'morning' : 'evening'),
  );
  const [affirmIndex, setAffirmIndex] = useState(0);
  const [intention, setIntention] = useState(MORNING_INTENTIONS[0]);
  const [customIntention, setCustomIntention] = useState('');
  const [reflection, setReflection] = useState('');
  const [release, setRelease] = useState('');

  const title = isMorning ? 'Morning ritual' : 'Evening ritual';

  const introText = isMorning
    ? 'Before the day asks things of you, take a few minutes to set a gentle foundation.'
    : 'The day is winding down. Let yourself arrive here without needing to perform.';

  const handleAffirmNext = () => {
    if (affirmIndex < affirmations.length - 1) {
      setAffirmIndex((i) => i + 1);
    } else {
      setStep('belief');
    }
  };

  const handleBeliefContinue = () => {
    setStep(isMorning ? 'intention' : 'reflect');
  };

  const handleComplete = () => {
    setStep('complete');
    onComplete();
  };

  return (
    <div className={styles.ritual}>
      <button className={styles.back} onClick={onBack} type="button">
        ← Back
      </button>

      <p className={styles.label}>{title}</p>

      {step === 'intro' && (
        <div className={styles.step}>
          <h1 className={styles.title}>
            {isMorning ? 'Open into the day' : 'Unfold into rest'}
          </h1>
          <p className={styles.body}>{introText}</p>
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('affirm')}>
            Begin
          </Button>
        </div>
      )}

      {step === 'affirm' && (
        <div className={styles.step}>
          <p className={styles.progress}>
            Affirmation {affirmIndex + 1} of {affirmations.length}
          </p>
          <p className={styles.category}>
            {categoryLabels[affirmations[affirmIndex].category]}
          </p>
          <blockquote className={styles.affirmation}>
            {affirmations[affirmIndex].text}
          </blockquote>
          <p className={styles.speakHint}>
            Read it slowly. Let the words land before moving on.
          </p>
          <Button variant="primary" size="lg" fullWidth onClick={handleAffirmNext}>
            {affirmIndex < affirmations.length - 1 ? 'I receive this' : 'Continue'}
          </Button>
        </div>
      )}

      {step === 'belief' && (
        <BeliefAnchorStep mode={isMorning ? 'morning' : 'evening'} onContinue={handleBeliefContinue} />
      )}

      {step === 'intention' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Set a gentle intention</h2>
          <p className={styles.bodyMuted}>
            Not a to-do list — a direction for how you want to move through today.
          </p>
          <div className={styles.intentionList}>
            {MORNING_INTENTIONS.map((item) => (
              <button
                key={item}
                type="button"
                className={`${styles.intentionOption} ${intention === item && !customIntention ? styles.selected : ''}`}
                onClick={() => {
                  setIntention(item);
                  setCustomIntention('');
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <label className={styles.fieldLabel}>
            Or write your own
            <textarea
              value={customIntention}
              onChange={(e) => setCustomIntention(e.target.value)}
              placeholder="Today I will..."
              rows={2}
            />
          </label>
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('breathe')}>
            Continue
          </Button>
        </div>
      )}

      {step === 'reflect' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>One thing that went okay</h2>
          <p className={styles.bodyMuted}>
            However small. This is not about gratitude pressure — just honest noticing.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Something that went okay today..."
            rows={3}
          />
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('release')}>
            Continue
          </Button>
        </div>
      )}

      {step === 'release' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>What can wait until tomorrow</h2>
          <p className={styles.bodyMuted}>
            Name what you are setting down for now. It will still be there if needed.
          </p>
          <textarea
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            placeholder="I can let go of..."
            rows={3}
          />
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('breathe')}>
            Continue
          </Button>
        </div>
      )}

      {step === 'breathe' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>
            {isMorning ? 'Three breaths to begin' : 'Three breaths to rest'}
          </h2>
          <BreathingCircle cycles={3} onComplete={handleComplete} />
        </div>
      )}

      {step === 'complete' && (
        <div className={styles.step}>
          <h1 className={styles.title}>
            {isMorning ? 'You are ready.' : 'You can rest now.'}
          </h1>
          {isMorning && (customIntention || intention) && (
            <p className={styles.intentionSummary}>
              Your intention: <em>{customIntention || intention}</em>
            </p>
          )}
          <p className={styles.body}>
            {isMorning
              ? 'Carry this softness with you. You do not have to be perfect — only present.'
              : 'Whatever you set down can wait. You did enough for today.'}
          </p>
          <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
            Return home
          </Button>
        </div>
      )}
    </div>
  );
}
