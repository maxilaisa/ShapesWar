import { GameMode, AIConfig } from '../types';

interface ControlPanelProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  aiConfig: AIConfig;
  setAiConfig: (config: AIConfig) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

export default function ControlPanel({
  gameMode,
  setGameMode,
  aiConfig,
  setAiConfig,
  isRunning,
  setIsRunning
}: ControlPanelProps) {
  const handleSliderChange = (key: keyof AIConfig, value: number) => {
    setAiConfig({ ...aiConfig, [key]: value });
  };

  return (
    <div style={{
      width: '300px',
      background: '#1a1a2e',
      padding: '20px',
      overflowY: 'auto',
      borderRight: '1px solid #333'
    }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>🎮 Shape Arena</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#4ecdc4', marginBottom: '10px' }}>Game Mode</h3>
        <select
          value={gameMode}
          onChange={(e) => setGameMode(e.target.value as GameMode)}
          style={{
            width: '100%',
            padding: '8px',
            background: '#0a0a0f',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '5px'
          }}
        >
          <option value="1v1">1v1 Duel</option>
          <option value="ffa">Free For All</option>
          <option value="tournament">Tournament</option>
          <option value="replay">Replay Mode</option>
          <option value="cinematic">Cinematic Mode</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            width: '100%',
            padding: '12px',
            background: isRunning ? '#ff6b6b' : '#4ecdc4',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#4ecdc4', marginBottom: '10px' }}>AI Behavior</h3>
        
        {Object.entries(aiConfig).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#fff', marginBottom: '5px', fontSize: '12px' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={value}
              onChange={(e) => handleSliderChange(key as keyof AIConfig, parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#0a0a0f', borderRadius: '5px' }}>
        <h4 style={{ color: '#ffe66d', marginBottom: '10px' }}>How to Play</h4>
        <p style={{ color: '#aaa', fontSize: '12px', lineHeight: '1.5' }}>
          Watch autonomous shapes battle using physics-based combat. Adjust AI sliders to change behavior patterns.
          Shapes build ultimate charges through hits and combos. First to eliminate opponents wins!
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#0a0a0f', borderRadius: '5px' }}>
        <h4 style={{ color: '#ffe66d', marginBottom: '10px' }}>Shape Abilities</h4>
        <ul style={{ color: '#aaa', fontSize: '11px', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Circle:</strong> Momentum builds on rebounds</li>
          <li><strong>Triangle:</strong> Critical angle bonus damage</li>
          <li><strong>Square:</strong> Reduced knockback</li>
          <li><strong>Oval:</strong> Maintains speed after bounces</li>
          <li><strong>Hexagon:</strong> Damage reduction on repeated hits</li>
          <li><strong>Spiral:</strong> Alters rebound vectors</li>
          <li><strong>Rhombus:</strong> Counter bonus knockback</li>
          <li><strong>Star:</strong> Multi-hit impacts</li>
          <li><strong>Heart:</strong> Regenerates when disengaged</li>
          <li><strong>Diamond:</strong> Precision-based bonuses</li>
          <li><strong>Crescent:</strong> Curved contact redirects</li>
          <li><strong>Dodecahedron:</strong> Learns enemy patterns</li>
        </ul>
      </div>
    </div>
  );
}
