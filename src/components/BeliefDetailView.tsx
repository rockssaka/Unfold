import { useState } from 'react';
import type { BeliefWeek } from '../types/app';
import { MANIFESTATION_MODE_LABELS } from '../types/app';
import { useAppState } from '../hooks/useAppState';
import { Button } from './Button';
import styles from './BeliefDetailView.module.css';

interface BeliefDetailViewProps {
  onBack: () => void;
}

export function BeliefDetailView({ onBack }: BeliefDetailViewProps) {
  const { activeBelief, state, saveEvidence } = useAppState();
  const [newEvidence, setNewEvidence] = useState('');

  const pastWeeks = state.beliefWeeks.filter((w) => w.id !== activeBelief?.id);

  const handleAddEvidence = () => {
    if (!newEvidence.trim()) return;
    saveEvidence(newEvidence, 'manual');
    setNewEvidence('');
  };

  if (!activeBelief) {
    return (
      <div className={styles.detail}>
        <button className={styles.back} onClick={onBack} type="button">← Back</button>
        <p className={styles.empty}>No active belief yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <button className={styles.back} onClick={onBack} type="button">← Back</button>
      <h1 className={styles.title}>This week&apos;s belief</h1>

      <BeliefPair belief={activeBelief} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Evidence log</h2>
        {activeBelief.evidence.length === 0 ? (
          <p className={styles.emptyHint}>Moments will appear here as you practice.</p>
        ) : (
          <ul className={styles.evidenceList}>
            {activeBelief.evidence.map((e) => (
              <li key={e.id} className={styles.evidenceItem}>
                <p>{e.text}</p>
                <span className={styles.evidenceMeta}>{e.date} · {e.source}</span>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.addEvidence}>
          <textarea
            value={newEvidence}
            onChange={(e) => setNewEvidence(e.target.value)}
            placeholder="Add a moment that supports your adaptive belief..."
            rows={2}
          />
          <Button variant="secondary" onClick={handleAddEvidence} disabled={!newEvidence.trim()}>
            Add
          </Button>
        </div>
      </section>

      {activeBelief.truthRatingStart !== null && (
        <p className={styles.rating}>
          Limiting belief felt {activeBelief.truthRatingStart}/10 true at start of week.
        </p>
      )}

      {pastWeeks.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Past weeks</h2>
          {pastWeeks.slice(-3).reverse().map((w) => (
            <div key={w.id} className={styles.pastWeek}>
              <p className={styles.pastBelief}>{w.adaptiveBelief}</p>
              <p className={styles.pastMeta}>
                {MANIFESTATION_MODE_LABELS[w.manifestationMode]} · {w.weekStart}
                {w.truthRatingStart !== null && ` · started ${w.truthRatingStart}/10`}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function BeliefPair({ belief }: { belief: BeliefWeek }) {
  return (
    <div className={styles.pair}>
      <div className={styles.pairCol}>
        <p className={styles.pairLabel}>Loosening</p>
        <p className={styles.limiting}>{belief.limitingBelief}</p>
      </div>
      <div className={styles.pairCol}>
        <p className={styles.pairLabel}>Strengthening</p>
        <p className={styles.adaptive}>{belief.adaptiveBelief}</p>
      </div>
      <p className={styles.intention}>
        {MANIFESTATION_MODE_LABELS[belief.manifestationMode]}: {belief.manifestationIntention || '—'}
      </p>
    </div>
  );
}
