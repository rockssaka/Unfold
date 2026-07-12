import { useState } from 'react';
import { AppStateProvider, useAppState } from './hooks/useAppState';
import { BeliefDetailView } from './components/BeliefDetailView';
import { BeliefSetupView } from './components/BeliefSetupView';
import { DepthView } from './components/DepthView';
import { GroundView } from './components/GroundView';
import { HomeView } from './components/HomeView';
import { Layout } from './components/Layout';
import { PulseView } from './components/PulseView';
import { RitualView } from './components/RitualView';
import './index.css';

type Screen =
  | 'home'
  | 'ground'
  | 'pulse'
  | 'morning'
  | 'evening'
  | 'depth'
  | 'belief-setup'
  | 'belief-detail';

function AppRoutes() {
  const [screen, setScreen] = useState<Screen>('home');
  const {
    activeBelief,
    beliefDayNumber,
    hasActiveBelief,
    todayProgress,
    thisMonthCount,
    isDepthDay,
    markMorning,
    markEvening,
    markGrounding,
  } = useAppState();

  const goHome = () => setScreen('home');

  const openDepthOrSetup = () => {
    if (hasActiveBelief) setScreen('depth');
    else setScreen('belief-setup');
  };

  return (
    <Layout variant={screen === 'ground' ? 'ground' : 'default'}>
      {screen === 'home' && (
        <HomeView
          onGround={() => setScreen('ground')}
          onPulse={() => setScreen('pulse')}
          onMorning={() => setScreen('morning')}
          onEvening={() => setScreen('evening')}
          onDepth={openDepthOrSetup}
          onBeliefSetup={() => setScreen('belief-setup')}
          onBeliefDetail={() => setScreen('belief-detail')}
          activeBelief={activeBelief}
          beliefDayNumber={beliefDayNumber}
          morningDone={todayProgress?.morning ?? false}
          eveningDone={todayProgress?.evening ?? false}
          pulseDone={todayProgress?.pulse ?? false}
          monthCount={thisMonthCount}
          isDepthDay={isDepthDay}
          hasActiveBelief={hasActiveBelief}
        />
      )}

      {screen === 'ground' && (
        <GroundView onComplete={markGrounding} onBack={goHome} />
      )}

      {screen === 'pulse' && (
        <PulseView onBack={goHome} />
      )}

      {screen === 'morning' && (
        <RitualView type="morning" onComplete={markMorning} onBack={goHome} />
      )}

      {screen === 'evening' && (
        <RitualView type="evening" onComplete={markEvening} onBack={goHome} />
      )}

      {screen === 'depth' && (
        <DepthView onBack={goHome} />
      )}

      {screen === 'belief-setup' && (
        <BeliefSetupView
          onComplete={goHome}
          onBack={goHome}
          onDepth={() => setScreen('depth')}
        />
      )}

      {screen === 'belief-detail' && (
        <BeliefDetailView onBack={goHome} />
      )}
    </Layout>
  );
}

function App() {
  return (
    <AppStateProvider>
      <AppRoutes />
    </AppStateProvider>
  );
}

export default App;
