import styles from './TimePicker.module.css';

interface TimePickerProps {
  onPulse: () => void;
  onRitual: () => void;
  pulseDone: boolean;
}

export function TimePicker({ onPulse, onRitual, pulseDone }: TimePickerProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>How much time do you have?</p>
      <div className={styles.options}>
        <button className={styles.option} onClick={onPulse} type="button">
          <span className={styles.optionName}>Pulse</span>
          <span className={styles.optionTime}>~2 min{pulseDone ? ' ✓' : ''}</span>
        </button>
        <button className={styles.option} onClick={onRitual} type="button">
          <span className={styles.optionName}>Ritual</span>
          <span className={styles.optionTime}>~5 min</span>
        </button>
      </div>
    </div>
  );
}
