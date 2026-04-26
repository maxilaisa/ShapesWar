import { useEffect, useRef, useState } from 'react';
import { PhysicsEngine } from '../physics/PhysicsEngine';
import { Renderer } from '../rendering/Renderer';
import { ShapeFactory } from '../shapes/ShapeFactory';
import { AISystem } from '../ai/AISystem';
import { GameMode, AIConfig, ShapeType, FighterState } from '../types';

interface GameArenaProps {
  gameMode: GameMode;
  aiConfig: AIConfig;
  isRunning: boolean;
}

export default function GameArena({ gameMode, aiConfig, isRunning }: GameArenaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physicsRef = useRef<PhysicsEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationFrameRef = useRef<number>();
  const [fighters, setFighters] = useState<Map<string, FighterState>>(new Map());
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = canvas.parentElement?.clientHeight || 600;

    const physics = new PhysicsEngine();
    const renderer = new Renderer(canvas, width, height);

    physicsRef.current = physics;
    rendererRef.current = renderer;

    const shapeTypes: ShapeType[] = ['circle', 'triangle', 'square', 'oval', 'hexagon', 'spiral'];
    const fighterCount = gameMode === '1v1' ? 2 : gameMode === 'ffa' ? 4 : 2;
    const selectedShapes = shapeTypes.slice(0, fighterCount);

    const fighterMap = new Map<string, FighterState>();
    const aiSystems = new Map<string, AISystem>();

    selectedShapes.forEach((shapeType, index) => {
      const id = `fighter-${index}`;
      const x = 100 + (index % 2) * (width - 200);
      const y = 100 + Math.floor(index / 2) * (height - 200);

      physics.createFighter(id, shapeType, x, y);
      renderer.createFighter(id, shapeType, ShapeFactory.getShapeColor(shapeType), x, y);

      const shape = ShapeFactory.createShape(id, shapeType);
      const ai = new AISystem(aiConfig);
      aiSystems.set(id, ai);

      fighterMap.set(id, {
        id,
        shapeType,
        hp: 100,
        ultimateCharges: 0,
        isUltimateActive: false,
        comboCount: 0,
        lastHitTime: 0,
        position: { x, y },
        velocity: { x: 0, y: 0 },
        aiState: 'neutral',
        skillCooldowns: { skill1: 0, skill2: 0, ultimate: 0 }
      });
    });

    setFighters(fighterMap);

    physics.onCollisionEvent((event) => {
      const fighter = fighterMap.get(event.fighterId);
      if (fighter) {
        const updatedFighter = { ...fighter };
        updatedFighter.hp = Math.max(0, updatedFighter.hp - event.damage);
        updatedFighter.lastHitTime = event.timestamp;
        
        const shape = ShapeFactory.createShape(event.fighterId, fighter.shapeType);
        shape.addUltimateCharge(event.hitType);
        updatedFighter.ultimateCharges = shape.getState().ultimateCharges;
        updatedFighter.comboCount = shape.getState().comboCount;

        fighterMap.set(event.fighterId, updatedFighter);
        setFighters(new Map(fighterMap));

        renderer.createImpactEffect(
          physics.getFighterPosition(event.fighterId)?.x || 0,
          physics.getFighterPosition(event.fighterId)?.y || 0,
          ShapeFactory.getShapeColor(fighter.shapeType)
        );

        if (updatedFighter.hp <= 0) {
          const aliveFighters = Array.from(fighterMap.values()).filter(f => f.hp > 0);
          if (aliveFighters.length === 1) {
            setWinner(aliveFighters[0].id);
          }
        }
      }
    });

    const gameLoop = () => {
      if (!isRunning) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      physics.update();

      fighterMap.forEach((fighter, id) => {
        const pos = physics.getFighterPosition(id);
        const vel = physics.getFighterVelocity(id);
        if (pos && vel) {
          renderer.updateFighterPosition(id, pos.x, pos.y);
          
          const ai = aiSystems.get(id);
          if (ai) {
            const enemyId = Array.from(fighterMap.keys()).find(key => key !== id);
            if (enemyId) {
              const enemyPos = physics.getFighterPosition(enemyId);
              const enemyVel = physics.getFighterVelocity(enemyId);
              if (enemyPos && enemyVel) {
                const decision = ai.decide(
                  ShapeFactory.createShape(id, fighter.shapeType),
                  enemyPos,
                  pos,
                  vel,
                  enemyVel,
                  200
                );

                if (decision.action === 'engage') {
                  const dx = decision.target.x - pos.x;
                  const dy = decision.target.y - pos.y;
                  const force = 0.001;
                  physics.applyForce(id, { x: dx * force, y: dy * force });
                } else if (decision.action === 'dodge' || decision.action === 'disengage') {
                  const dx = decision.target.x - pos.x;
                  const dy = decision.target.y - pos.y;
                  const force = 0.0015;
                  physics.applyForce(id, { x: dx * force, y: dy * force });
                }
              }
            }
          }
        }
      });

      renderer.render();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      physics.destroy();
      renderer.destroy();
    };
  }, [gameMode, aiConfig, isRunning]);

  return (
    <div style={{ flex: 1, position: 'relative', background: '#0a0a0f' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      {winner && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '20px 40px',
          borderRadius: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff'
        }}>
          Winner: {winner}
        </div>
      )}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        color: '#fff'
      }}>
        {Array.from(fighters.entries()).map(([id, fighter]) => (
          <div key={id} style={{ marginBottom: '5px' }}>
            <strong>{id}:</strong> HP: {fighter.hp.toFixed(0)} | Ultimate: {fighter.ultimateCharges}/10 | Combo: {fighter.comboCount}
          </div>
        ))}
      </div>
    </div>
  );
}
