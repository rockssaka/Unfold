import { useState } from 'react';
import type { ManifestationMode } from '../types/app';
import { MANIFESTATION_MODE_LABELS } from '../types/app';
import {
  COMMON_LIMITING_BELIEFS,
  DEPTH_PROMPTS,
  suggestAdaptiveBelief,
} from '../data/beliefPrompts';
import { todayKey, newId, useAppState } from '../hooks/useAppState';
import { Button } from './Button';
import styles from './DepthView.module.css';

type DepthStep =
  | 'checkin'
  | 'limiting'
  | 'evidenceFor'
  | 'evidenceAgainst'
  | 'adaptive'
  | 'mode'
  | 'complete';

interface DepthViewProps {
  onBack: () => void;
}

export function DepthView({ onBack }: DepthViewProps) {
  const { createBeliefWeek } = useAppState();
  const [step, setStep] = useState<DepthStep>('checkin');
  const [truthRating, setTruthRating] = useState(5);
  const [limiting, setLimiting] = useState('');
  const [evidenceFor, setEvidenceFor] = useState('');
  const [evidenceAgainst, setEvidenceAgainst] = useState('');
  const [adaptive, setAdaptive] = useState('');
  const [mode, setMode] = useState<ManifestationMode>('identity');
  const [intention, setIntention] = useState('');

  const handleLimitingPick = (belief: string) => {
    setLimiting(belief);
    setAdaptive(suggestAdaptiveBelief(belief));
  };

  const handleFinish = () => {
    const initialEvidence = evidenceAgainst.trim()
      ? [
          {
            id: newId(),
            text: evidenceAgainst.trim(),
            date: todayKey(),
            source: 'depth' as const,
          },
        ]
      : [];

    createBeliefWeek({
      weekStart: todayKey(),
      limitingBelief: limiting.trim(),
      adaptiveBelief: adaptive.trim(),
      manifestationMode: mode,
      manifestationIntention: intention.trim(),
      truthRatingStart: truthRating,
      truthRatingEnd: null,
      fromDepth: true,
      initialEvidence,
    });
    setStep('complete');
  };

  const modes: ManifestationMode[] = ['outcome', 'identity', 'trust'];

  return (
    <div className={styles.depth}>
      <button className={styles.back} onClick={onBack} type="button">
        ← Back
      </button>

      <p className={styles.label}>Depth session</p>

      {step === 'checkin' && (
        <div className={styles.step}>
          <h1 className={styles.title}>Weekly check-in</h1>
          <p className={styles.body}>
            How true does your limiting belief feel right now? There is no wrong answer.
          </p>
          <div className={styles.sliderWrap}>
            <input
              type="range"
              min={0}
              max={10}
              value={truthRating}
              onChange={(e) => setTruthRating(Number(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderValue}>{truthRating} / 10</span>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('limiting')}>
            Continue
          </Button>
        </div>
      )}

      {step === 'limiting' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Name the limiting belief</h2>
          <textarea
            value={limiting}
            onChange={(e) => setLimiting(e.target.value)}
            placeholder="What belief feels heavy or limiting?"
            rows={3}
          />
          <div className={styles.chips}>
            {COMMON_LIMITING_BELIEFS.map((b) => (
              <button key={b} type="button" className={styles.chip} onClick={() => handleLimitingPick(b)}>
                {b}
              </button>
            ))}
          </div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep('evidenceFor')}
            disabled={!limiting.trim()}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 'evidenceFor' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Evidence it might be true</h2>
          <p className={styles.bodyMuted}>{DEPTH_PROMPTS.evidenceFor}</p>
          <textarea
            value={evidenceFor}
            onChange={(e) => setEvidenceFor(e.target.value)}
            rows={4}
          />
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('evidenceAgainst')}>
            Continue
          </Button>
        </div>
      )}

      {step === 'evidenceAgainst' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Evidence it might not be the whole truth</h2>
          <p className={styles.bodyMuted}>{DEPTH_PROMPTS.evidenceAgainst}</p>
          <textarea
            value={evidenceAgainst}
            onChange={(e) => setEvidenceAgainst(e.target.value)}
            rows={4}
          />
          <Button variant="primary" size="lg" fullWidth onClick={() => {
            if (!adaptive) setAdaptive(suggestAdaptiveBelief(limiting));
            setStep('adaptive');
          }}>
            Continue
          </Button>
        </div>
      )}

      {step === 'adaptive' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Craft an adaptive belief</h2>
          <p className={styles.bodyMuted}>{DEPTH_PROMPTS.adaptiveCraft}</p>
          <textarea
            value={adaptive}
            onChange={(e) => setAdaptive(e.target.value)}
            rows={3}
          />
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep('mode')}
            disabled={!adaptive.trim()}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 'mode' && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Manifestation mode this week</h2>
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
            {mode === 'outcome' && DEPTH_PROMPTS.outcome}
            {mode === 'identity' && DEPTH_PROMPTS.identity}
            {mode === 'trust' && DEPTH_PROMPTS.trust}
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              rows={2}
            />
          </label>
          <Button variant="primary" size="lg" fullWidth onClick={handleFinish}>
            Set as this week&apos;s belief
          </Button>
        </div>
      )}

      {step === 'complete' && (
        <div className={styles.step}>
          <h1 className={styles.title}>Your belief is set.</h1>
          <blockquote className={styles.summaryBelief}>&ldquo;{adaptive}&rdquo;</blockquote>
          <p className={styles.body}>
            This will thread through your daily rituals this week. Be patient with the process.
          </p>
          <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
            Return home
          </Button>
        </div>
      )}
    </div>
  );
}
