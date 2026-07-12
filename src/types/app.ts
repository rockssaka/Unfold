export type ManifestationMode = 'outcome' | 'identity' | 'trust';
export type EvidenceSource = 'ground' | 'morning' | 'evening' | 'depth' | 'manual';

export interface EvidenceEntry {
  id: string;
  text: string;
  date: string;
  source: EvidenceSource;
}

export interface BeliefWeek {
  id: string;
  weekStart: string;
  limitingBelief: string;
  adaptiveBelief: string;
  manifestationMode: ManifestationMode;
  manifestationIntention: string;
  truthRatingStart: number | null;
  truthRatingEnd: number | null;
  evidence: EvidenceEntry[];
  depthCompletedAt: string | null;
}

export interface DayProgress {
  date: string;
  morning: boolean;
  evening: boolean;
  pulse: boolean;
  groundings: number;
}

export interface AppSettings {
  depthDayOfWeek: number;
  onboardingComplete: boolean;
}

export interface AppState {
  version: 2;
  days: DayProgress[];
  beliefWeeks: BeliefWeek[];
  activeBeliefId: string | null;
  settings: AppSettings;
  totalSessions: number;
}

export const DEFAULT_ADAPTIVE_BELIEF =
  'Right now, in this breath, I am safe enough to slow down.';

export const MANIFESTATION_MODE_LABELS: Record<ManifestationMode, string> = {
  outcome: 'Outcome',
  identity: 'Identity',
  trust: 'Trust',
};
