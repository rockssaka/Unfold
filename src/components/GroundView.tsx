import { useState } from 'react';
import type { Affirmation } from '../data/affirmations';
import { pickAffirmations } from '../data/affirmations';
import { BreathingCircle } from './BreathingCircle';
import { Button } from './Button';
import { ThoughtCapture } from './ThoughtCapture';
import styles from './GroundView.module.css';

type GroundStep = 'welcome' | 'breathe' | 'senses' | 'thought' | 'affirm' | 'done';

const SENSE_STEPS = [
  { count: 5, sense: 'things you can see', prompt: 'Look around slowly. Name 5 things you can see.' },
  { count: 4, sense: 'things you can touch', prompt: 'Notice 4 things you can feel — texture, temperature, pressure.' },
  { count: 3, sense: 'things you can hear', prompt: 'Listen for 3 sounds, near or far.' },
  { count: 2, sense: 'things you can smell', prompt: 'Notice 2 scents, or imagine a calming smell you like.' },
  { count: 1, sense: 'thing you can taste', prompt: 'One taste — or simply notice your mouth, unclenched.' },
];

interface GroundViewProps {
  onComplete: () => void;
  onBack: () => void;
}

export function GroundView({ onComplete, onBack }: GroundViewProps) {
  const [step, setStep] = useState<GroundStep>('welcome');
  const [senseIndex, setSenseIndex] = useState(0);
  const [affirmations] = useState<Affirmation[]>(() =>
    pickAffirmations(2, 'grounding'),
  );
  const [affirmIndex, setAffirmIndex] = useState(0);

  const handleFinish = () => {
    setStep('done');
    onComplete();
  };

  return (
    <div className={styles.ground}>
      <button className={styles.back} onClick={onBack} type="button">
        ← Back
      </button>

      {step === 'welcome' && (
        <div className={styles.step}>
          <h1 className={styles.title}>You found your way here.</h1>
          <p className={styles.body}>
            That is enough for now. You do not need to fix anything in this
            moment — only arrive.
          </p>
          <p className={styles.bodyMuted}>
            We will move slowly. You can stop at any time.
          </p>
          <Button variant="ground" size="lg" fullWidth onClick={() => setStep('breathe')}>
            I am ready
          </Button>
        </div>
      )}

      {step === 'breathe' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Slow your breath</h2>
          <p className={styles.bodyMuted}>Follow the circle. There is no rush.</p>
          <BreathingCircle cycles={2} onComplete={() => setStep('senses')} />
        </div>
      )}

      {step === 'senses' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>
            {SENSE_STEPS[senseIndex].count} {SENSE_STEPS[senseIndex].sense}
          </h2>
          <p className={styles.body}>{SENSE_STEPS[senseIndex].prompt}</p>
          <p className={styles.progress}>
            Step {senseIndex + 1} of {SENSE_STEPS.length}
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              if (senseIndex < SENSE_STEPS.length - 1) {
                setSenseIndex((i) => i + 1);
              } else {
                setStep('thought');
              }
            }}
          >
            {senseIndex < SENSE_STEPS.length - 1 ? 'Continue' : 'Almost there'}
          </Button>
        </div>
      )}

      {step === 'thought' && (
        <div className={styles.step}>
          <ThoughtCapture
            onContinue={() => setStep('affirm')}
            onSkip={() => setStep('affirm')}
          />
        </div>
      )}

      {step === 'affirm' && (
        <div className={styles.step}>
          <p className={styles.category}>Stay with this</p>
          <blockquote className={styles.affirmation}>
            {affirmations[affirmIndex].text}
          </blockquote>
          <p className={styles.speakHint}>
            Say it quietly, or read it slowly twice.
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              if (affirmIndex < affirmations.length - 1) {
                setAffirmIndex((i) => i + 1);
              } else {
                handleFinish();
              }
            }}
          >
            {affirmIndex < affirmations.length - 1 ? 'Next' : 'I feel steadier'}
          </Button>
        </div>
      )}

      {step === 'done' && (
        <div className={styles.step}>
          <h1 className={styles.title}>You unfolded.</h1>
          <p className={styles.body}>
            The stress may still be there — but you created a little space
            around it. That space is yours.
          </p>
          <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
            Return home
          </Button>
        </div>
      )}
    </div>
  );
}
