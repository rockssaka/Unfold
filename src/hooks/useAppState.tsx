import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState, BeliefWeek, DayProgress, EvidenceEntry, EvidenceSource } from '../types/app';
import { DEFAULT_ADAPTIVE_BELIEF } from '../types/app';

const STORAGE_KEY = 'unfold-state';
const LEGACY_KEY = 'unfold-progress';

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function newId(): string {
  return crypto.randomUUID();
}

const defaultState: AppState = {
  version: 2,
  days: [],
  beliefWeeks: [],
  activeBeliefId: null,
  settings: { depthDayOfWeek: 0, onboardingComplete: false },
  totalSessions: 0,
};

interface LegacyProgress {
  days?: Array<{
    date: string;
    morning: boolean;
    evening: boolean;
    groundings: number;
  }>;
  totalSessions?: number;
}

function migrateLegacy(): AppState | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const legacy: LegacyProgress = JSON.parse(raw);
    const days: DayProgress[] = (legacy.days ?? []).map((d) => ({
      date: d.date,
      morning: d.morning,
      evening: d.evening,
      pulse: false,
      groundings: d.groundings,
    }));
    localStorage.removeItem(LEGACY_KEY);
    return { ...defaultState, days, totalSessions: legacy.totalSessions ?? 0 };
  } catch {
    return null;
  }
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      return {
        ...defaultState,
        ...parsed,
        settings: { ...defaultState.settings, ...parsed.settings },
      };
    }
  } catch {
    console.warn('Unfold: corrupt state, resetting');
  }
  return migrateLegacy() ?? { ...defaultState };
}

function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getOrCreateDay(state: AppState, date: string): DayProgress {
  let day = state.days.find((d) => d.date === date);
  if (!day) {
    day = { date, morning: false, evening: false, pulse: false, groundings: 0 };
    state.days.push(day);
  }
  if (day.pulse === undefined) day.pulse = false;
  return day;
}

function useAppStateInternal() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeBelief = useMemo(() => {
    if (!state.activeBeliefId) return null;
    return state.beliefWeeks.find((w) => w.id === state.activeBeliefId) ?? null;
  }, [state.activeBeliefId, state.beliefWeeks]);

  const adaptiveBeliefText = activeBelief?.adaptiveBelief ?? DEFAULT_ADAPTIVE_BELIEF;

  const beliefDayNumber = useMemo(() => {
    if (!activeBelief) return 0;
    const start = new Date(activeBelief.weekStart + 'T12:00:00');
    const now = new Date(todayKey() + 'T12:00:00');
    const diff = Math.floor((now.getTime() - start.getTime()) / 86400000);
    return Math.max(1, diff + 1);
  }, [activeBelief]);

  const latestEvidence = activeBelief?.evidence.at(-1)?.text ?? null;

  const markMorning = useCallback(() => {
    setState((s) => {
      const next = { ...s, totalSessions: s.totalSessions + 1 };
      const day = getOrCreateDay(next, todayKey());
      day.morning = true;
      return { ...next, days: [...next.days] };
    });
  }, []);

  const markEvening = useCallback(() => {
    setState((s) => {
      const next = { ...s, totalSessions: s.totalSessions + 1 };
      const day = getOrCreateDay(next, todayKey());
      day.evening = true;
      return { ...next, days: [...next.days] };
    });
  }, []);

  const markPulse = useCallback(() => {
    setState((s) => {
      const next = { ...s, totalSessions: s.totalSessions + 1 };
      const day = getOrCreateDay(next, todayKey());
      day.pulse = true;
      return { ...next, days: [...next.days] };
    });
  }, []);

  const markGrounding = useCallback(() => {
    setState((s) => {
      const next = { ...s, totalSessions: s.totalSessions + 1 };
      const day = getOrCreateDay(next, todayKey());
      day.groundings += 1;
      return { ...next, days: [...next.days] };
    });
  }, []);

  const createBeliefWeek = useCallback(
    (
      data: Omit<BeliefWeek, 'id' | 'evidence' | 'depthCompletedAt'> & {
        fromDepth?: boolean;
        initialEvidence?: EvidenceEntry[];
      },
    ) => {
      const week: BeliefWeek = {
        id: newId(),
        evidence: data.initialEvidence ?? [],
        depthCompletedAt: data.fromDepth ? new Date().toISOString() : null,
        weekStart: data.weekStart,
        limitingBelief: data.limitingBelief,
        adaptiveBelief: data.adaptiveBelief,
        manifestationMode: data.manifestationMode,
        manifestationIntention: data.manifestationIntention,
        truthRatingStart: data.truthRatingStart,
        truthRatingEnd: data.truthRatingEnd,
      };
      setState((s) => ({
        ...s,
        beliefWeeks: [...s.beliefWeeks, week],
        activeBeliefId: week.id,
        settings: { ...s.settings, onboardingComplete: true },
      }));
      return week;
    },
    [],
  );

  const saveEvidence = useCallback((text: string, source: EvidenceSource) => {
    if (!text.trim()) return;
    setState((s) => {
      const id = s.activeBeliefId;
      if (!id) return s;
      const entry: EvidenceEntry = {
        id: newId(),
        text: text.trim(),
        date: todayKey(),
        source,
      };
      return {
        ...s,
        beliefWeeks: s.beliefWeeks.map((w) =>
          w.id === id ? { ...w, evidence: [...w.evidence, entry] } : w,
        ),
      };
    });
  }, []);

  const todayProgress = state.days.find((d) => d.date === todayKey());

  const thisMonthCount = state.days.filter((d) => {
    const now = new Date();
    const dayDate = new Date(d.date + 'T12:00:00');
    return (
      dayDate.getMonth() === now.getMonth() &&
      dayDate.getFullYear() === now.getFullYear() &&
      (d.morning || d.evening || d.pulse || d.groundings > 0)
    );
  }).length;

  const isDepthDay = new Date().getDay() === state.settings.depthDayOfWeek;

  return {
    state,
    activeBelief,
    adaptiveBeliefText,
    beliefDayNumber,
    latestEvidence,
    hasActiveBelief: activeBelief !== null,
    todayProgress,
    thisMonthCount,
    isDepthDay,
    markMorning,
    markEvening,
    markPulse,
    markGrounding,
    createBeliefWeek,
    saveEvidence,
  };
}

type AppStateValue = ReturnType<typeof useAppStateInternal>;

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const value = useAppStateInternal();
  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
