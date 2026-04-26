import { useState } from 'react';
import { GameArena } from './components/GameArena';
import { SHAPES_DATA } from './data/shapes';
import { ShapeType } from './types';
import './App.css';

function App() {
  const [selectedFighter1, setSelectedFighter1] = useState<ShapeType>('circle');
  const [selectedFighter2, setSelectedFighter2] = useState<ShapeType>('triangle');
  const [isSimulating, setIsSimulating] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const handleStart = () => {
    setWinner(null);
    setIsSimulating(true);
  };

  const handleEnd = (winnerId: string | null) => {
    setIsSimulating(false);
    setWinner(winnerId);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Shape Arena Simulator</h1>
        <p>Autonomous Physics-Based Battle Simulator</p>
      </header>

      <div className="main-content">
        <div className="fighter-selection">
          <div className="fighter-panel">
            <h2>Fighter 1</h2>
            <div className="fighter-grid">
              {SHAPES_DATA.map(fighter => (
                <button
                  key={fighter.id}
                  className={`fighter-card ${selectedFighter1 === fighter.type ? 'selected' : ''}`}
                  onClick={() => setSelectedFighter1(fighter.type)}
                  style={{ borderColor: selectedFighter1 === fighter.type ? fighter.color : '#333' }}
                >
                  <div className="fighter-icon" style={{ background: fighter.color }}></div>
                  <span>{fighter.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="vs-divider">VS</div>

          <div className="fighter-panel">
            <h2>Fighter 2</h2>
            <div className="fighter-grid">
              {SHAPES_DATA.map(fighter => (
                <button
                  key={fighter.id}
                  className={`fighter-card ${selectedFighter2 === fighter.type ? 'selected' : ''}`}
                  onClick={() => setSelectedFighter2(fighter.type)}
                  style={{ borderColor: selectedFighter2 === fighter.type ? fighter.color : '#333' }}
                >
                  <div className="fighter-icon" style={{ background: fighter.color }}></div>
                  <span>{fighter.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="arena-section">
          <div className="arena-container">
            <GameArena
              fighter1Type={selectedFighter1}
              fighter2Type={selectedFighter2}
              isRunning={isSimulating}
              onEnd={handleEnd}
            />
            {winner && (
              <div className="winner-overlay">
                <h2>
                  {SHAPES_DATA.find(s => s.type === (winner === 'fighter1' ? selectedFighter1 : selectedFighter2))?.name} Wins!
                </h2>
              </div>
            )}
          </div>

          <div className="controls">
            <button
              className="start-button"
              onClick={isSimulating ? () => setIsSimulating(false) : handleStart}
              disabled={selectedFighter1 === selectedFighter2}
            >
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
