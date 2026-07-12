import { Button } from './Button';
import { BeliefCard } from './BeliefCard';
import { TimePicker } from './TimePicker';
import type { BeliefWeek } from '../types/app';
import styles from './HomeView.module.css';

interface HomeViewProps {
  onGround: () => void;
  onPulse: () => void;
  onMorning: () => void;
  onEvening: () => void;
  onDepth: () => void;
  onBeliefSetup: () => void;
  onBeliefDetail: () => void;
  activeBelief: BeliefWeek | null;
  beliefDayNumber: number;
  morningDone: boolean;
  eveningDone: boolean;
  pulseDone: boolean;
  monthCount: number;
  isDepthDay: boolean;
  hasActiveBelief: boolean;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function HomeView({
  onGround,
  onPulse,
  onMorning,
  onEvening,
  onDepth,
  onBeliefSetup,
  onBeliefDetail,
  activeBelief,
  beliefDayNumber,
  morningDone,
  eveningDone,
  pulseDone,
  monthCount,
  isDepthDay,
  hasActiveBelief,
}: HomeViewProps) {
  const hour = new Date().getHours();
  const suggestMorning = hour < 14;
  const suggestEvening = hour >= 14;

  const handleRitual = () => {
    if (suggestMorning && !morningDone) onMorning();
    else if (suggestEvening && !eveningDone) onEvening();
    else if (!morningDone) onMorning();
    else onEvening();
  };

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <p className={styles.brand}>Unfold</p>
        <h1 className={styles.greeting}>{getGreeting()}</h1>
        <p className={styles.subtitle}>
          You do not have to carry everything at once.
          <br />
          Let something open, gently.
        </p>
      </header>

      <section className={styles.groundSection}>
        <Button variant="ground" size="lg" fullWidth onClick={onGround}>
          I need to ground now
        </Button>
        <p className={styles.groundHint}>
          For when stress feels heavy. About 2 minutes.
        </p>
      </section>

      <BeliefCard
        belief={activeBelief}
        dayNumber={beliefDayNumber}
        onTap={onBeliefDetail}
        onSetup={onBeliefSetup}
      />

      <TimePicker onPulse={onPulse} onRitual={handleRitual} pulseDone={pulseDone} />

      <section className={styles.rituals}>
        <h2 className={styles.sectionTitle}>Daily practice</h2>

        <button
          className={`${styles.ritualCard} ${morningDone ? styles.done : ''} ${suggestMorning && !morningDone ? styles.suggested : ''}`}
          onClick={onMorning}
          type="button"
        >
          <span className={styles.ritualIcon} aria-hidden="true">☀</span>
          <div className={styles.ritualText}>
            <span className={styles.ritualName}>Morning ritual</span>
            <span className={styles.ritualDesc}>Affirmations, belief & intention · ~5 min</span>
          </div>
          {morningDone && <span className={styles.check}>✓</span>}
        </button>

        <button
          className={`${styles.ritualCard} ${eveningDone ? styles.done : ''} ${suggestEvening && !eveningDone ? styles.suggested : ''}`}
          onClick={onEvening}
          type="button"
        >
          <span className={styles.ritualIcon} aria-hidden="true">☽</span>
          <div className={styles.ritualText}>
            <span className={styles.ritualName}>Evening ritual</span>
            <span className={styles.ritualDesc}>Reflect, release & belief · ~5 min</span>
          </div>
          {eveningDone && <span className={styles.check}>✓</span>}
        </button>

        {(isDepthDay || !hasActiveBelief) && (
          <button className={styles.depthCard} onClick={onDepth} type="button">
            <span className={styles.ritualIcon} aria-hidden="true">◎</span>
            <div className={styles.ritualText}>
              <span className={styles.ritualName}>
                {hasActiveBelief ? 'Depth session' : 'Set your first belief'}
              </span>
              <span className={styles.ritualDesc}>
                {hasActiveBelief
                  ? 'Weekly belief work · ~15 min'
                  : 'Guided belief setup · ~15 min'}
              </span>
            </div>
          </button>
        )}
      </section>

      {monthCount > 0 && (
        <footer className={styles.footer}>
          <p className={styles.encouragement}>
            You showed up on {monthCount} day{monthCount !== 1 ? 's' : ''} this month. That matters.
          </p>
        </footer>
      )}
    </div>
  );
}
