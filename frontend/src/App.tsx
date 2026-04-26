import { useState } from 'react';
import GameArena from './components/GameArena';
import ControlPanel from './components/ControlPanel';
import { GameMode, AIConfig } from './types';

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('1v1');
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    aggression: 5,
    mobility: 5,
    precision: 5,
    chaos: 5,
    greed: 5,
    fear: 5,
    revenge: 5,
    skill: 5,
    discipline: 5
  });
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ControlPanel
        gameMode={gameMode}
        setGameMode={setGameMode}
        aiConfig={aiConfig}
        setAiConfig={setAiConfig}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <GameArena
        gameMode={gameMode}
        aiConfig={aiConfig}
        isRunning={isRunning}
      />
    </div>
  );
}

export default App;
