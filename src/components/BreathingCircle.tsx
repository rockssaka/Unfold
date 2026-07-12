import { useEffect, useState } from 'react';
import styles from './BreathingCircle.module.css';

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

const PHASES: { phase: Phase; label: string; duration: number }[] = [
  { phase: 'inhale', label: 'Breathe in', duration: 4 },
  { phase: 'hold', label: 'Hold', duration: 4 },
  { phase: 'exhale', label: 'Breathe out', duration: 4 },
  { phase: 'rest', label: 'Rest', duration: 4 },
];

interface BreathingCircleProps {
  cycles?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function BreathingCircle({
  cycles = 3,
  onComplete,
  autoStart = true,
}: BreathingCircleProps) {
  const [cycle, setCycle] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(autoStart);

  const current = PHASES[phaseIndex];

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;

        const nextPhase = (phaseIndex + 1) % PHASES.length;
        if (nextPhase === 0) {
          const nextCycle = cycle + 1;
          if (nextCycle >= cycles) {
            setRunning(false);
            onComplete?.();
            return 0;
          }
          setCycle(nextCycle);
        }
        setPhaseIndex(nextPhase);
        return PHASES[nextPhase].duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, phaseIndex, cycle, cycles, onComplete]);

  const scaleClass =
    current.phase === 'inhale'
      ? styles.inhale
      : current.phase === 'exhale'
        ? styles.exhale
        : current.phase === 'hold'
          ? styles.hold
          : styles.rest;

  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${scaleClass}`}>
        <span className={styles.seconds}>{secondsLeft}</span>
      </div>
      <p className={styles.label}>{current.label}</p>
      <p className={styles.cycle}>
        {cycle + 1} of {cycles}
      </p>
      {!running && cycle === 0 && phaseIndex === 0 && (
        <button
          className={styles.startBtn}
          onClick={() => setRunning(true)}
          type="button"
        >
          Begin breathing
        </button>
      )}
    </div>
  );
}
