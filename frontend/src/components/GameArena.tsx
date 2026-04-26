import { useEffect, useRef, useState } from 'react';
import { PhysicsEngine } from '../physics/PhysicsEngine';
import { Renderer } from '../rendering/Renderer';
import { ShapeFactory } from '../shapes/ShapeFactory';
import { AISystem, AISensorData, AIAction } from '../ai/AISystem';
import { ShapeType } from '../types';
import { SHAPES_DATA } from '../data/shapes';
import { Shape } from '../shapes/Shape';

interface GameArenaProps {
  fighter1Type: ShapeType;
  fighter2Type: ShapeType;
  isRunning: boolean;
  onEnd?: (winner: string | null) => void;
}

export function GameArena({ fighter1Type, fighter2Type, isRunning, onEnd }: GameArenaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physicsRef = useRef<PhysicsEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [fighter1HP, setFighter1HP] = useState(100);
  const [fighter2HP, setFighter2HP] = useState(100);
  const [fighter1Ultimate, setFighter1Ultimate] = useState(0);
  const [fighter2Ultimate, setFighter2Ultimate] = useState(0);

  const fighter1Ref = useRef<Shape | null>(null);
  const fighter2Ref = useRef<Shape | null>(null);
  const ai1Ref = useRef<AISystem | null>(null);
  const ai2Ref = useRef<AISystem | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = 800;
    const height = 600;

    const physics = new PhysicsEngine();
    const renderer = new Renderer(canvas, width, height);

    physics.initialize(width, height);
    physics.onCollisionEvent((event) => {
      handleCollision(event);
    });

    physicsRef.current = physics;
    rendererRef.current = renderer;

    const shape1Data = SHAPES_DATA.find(s => s.type === fighter1Type);
    const shape2Data = SHAPES_DATA.find(s => s.type === fighter2Type);

    if (shape1Data && shape2Data) {
      const fighter1 = ShapeFactory.createShape('fighter1', fighter1Type);
      const fighter2 = ShapeFactory.createShape('fighter2', fighter2Type);

      fighter1Ref.current = fighter1;
      fighter2Ref.current = fighter2;

      ai1Ref.current = new AISystem(shape1Data.aiConfig);
      ai2Ref.current = new AISystem(shape2Data.aiConfig);

      const color1 = parseInt(shape1Data.color.replace('#', ''), 16);
      const color2 = parseInt(shape2Data.color.replace('#', ''), 16);

      physics.createFighter('fighter1', fighter1Type, width * 0.3, height / 2, 30);
      physics.createFighter('fighter2', fighter2Type, width * 0.7, height / 2, 30);

      renderer.createFighter('fighter1', fighter1Type, color1, width * 0.3, height / 2, 30);
      renderer.createFighter('fighter2', fighter2Type, color2, width * 0.7, height / 2, 30);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      physics.destroy();
      renderer.destroy();
    };
  }, [fighter1Type, fighter2Type]);

  const handleCollision = (event: any) => {
    const fighter = event.fighterId === 'fighter1' ? fighter1Ref.current : fighter2Ref.current;
    if (fighter) {
      fighter.takeDamage(event.damage);
      fighter.addUltimateCharge(event.hitType);
      fighter.incrementCombo();

      if (event.fighterId === 'fighter1') {
        setFighter1HP(fighter.getState().hp);
        setFighter1Ultimate(fighter.getState().ultimateCharges);
      } else {
        setFighter2HP(fighter.getState().hp);
        setFighter2Ultimate(fighter.getState().ultimateCharges);
      }

      const renderer = rendererRef.current;
      if (renderer) {
        const shapeData = event.fighterId === 'fighter1' 
          ? SHAPES_DATA.find(s => s.type === fighter1Type)
          : SHAPES_DATA.find(s => s.type === fighter2Type);
        if (shapeData) {
          const color = parseInt(shapeData.color.replace('#', ''), 16);
          const pos = physicsRef.current?.getFighterPosition(event.fighterId);
          if (pos) {
            renderer.createImpactEffect(pos.x, pos.y, color);
          }
        }
      }
    }
  };

  const gameLoop = () => {
    if (!physicsRef.current || !rendererRef.current) return;

    const physics = physicsRef.current;
    const renderer = rendererRef.current;

    physics.update();

    const pos1 = physics.getFighterPosition('fighter1');
    const pos2 = physics.getFighterPosition('fighter2');
    const vel1 = physics.getFighterVelocity('fighter1');
    const vel2 = physics.getFighterVelocity('fighter2');

    if (pos1 && pos2 && vel1 && vel2) {
      renderer.updateFighterPosition('fighter1', pos1.x, pos1.y);
      renderer.updateFighterPosition('fighter2', pos2.x, pos2.y);

      if (isRunning && ai1Ref.current && ai2Ref.current) {
        const ai1 = ai1Ref.current;
        const ai2 = ai2Ref.current;

        const sensorData1: AISensorData = {
          enemyDistance: Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)),
          enemyVelocity: vel2,
          enemyHP: fighter2HP,
          myHP: fighter1HP,
          myVelocity: vel1,
          wallProximity: Math.min(pos1.x, pos1.y, 800 - pos1.x, 600 - pos1.y),
          comboCount: fighter1Ref.current?.getState().comboCount || 0,
          ultimateCharges: fighter1Ultimate,
          skill1Ready: fighter1Ref.current?.canUseSkill1() || false,
          skill2Ready: fighter1Ref.current?.canUseSkill2() || false,
          ultimateReady: fighter1Ref.current?.canUseUltimate() || false
        };

        const sensorData2: AISensorData = {
          enemyDistance: Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)),
          enemyVelocity: vel1,
          enemyHP: fighter1HP,
          myHP: fighter2HP,
          myVelocity: vel2,
          wallProximity: Math.min(pos2.x, pos2.y, 800 - pos2.x, 600 - pos2.y),
          comboCount: fighter2Ref.current?.getState().comboCount || 0,
          ultimateCharges: fighter2Ultimate,
          skill1Ready: fighter2Ref.current?.canUseSkill1() || false,
          skill2Ready: fighter2Ref.current?.canUseSkill2() || false,
          ultimateReady: fighter2Ref.current?.canUseUltimate() || false
        };

        const action1 = ai1.decide(sensorData1);
        const action2 = ai2.decide(sensorData2);

        const target1 = ai1.getActionTarget(action1, pos1, pos2);
        const target2 = ai2.getActionTarget(action2, pos2, pos1);

        const forceMagnitude = 0.0005;
        const dx1 = target1.x - pos1.x;
        const dy1 = target1.y - pos1.y;
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        if (dist1 > 0) {
          physics.applyForce('fighter1', {
            x: (dx1 / dist1) * forceMagnitude,
            y: (dy1 / dist1) * forceMagnitude
          });
        }

        const dx2 = target2.x - pos2.x;
        const dy2 = target2.y - pos2.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (dist2 > 0) {
          physics.applyForce('fighter2', {
            x: (dx2 / dist2) * forceMagnitude,
            y: (dy2 / dist2) * forceMagnitude
          });
        }
      }
    }

    renderer.render();

    if (fighter1HP <= 0 || fighter2HP <= 0) {
      if (onEnd) {
        onEnd(fighter1HP <= 0 ? 'fighter2' : 'fighter1');
      }
      return;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, fighter1HP, fighter2HP, fighter1Ultimate, fighter2Ultimate]);

  return (
    <div className="game-arena">
      <canvas ref={canvasRef} width={800} height={600} />
      <div className="health-bars">
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${fighter1HP}%`, background: SHAPES_DATA.find(s => s.type === fighter1Type)?.color }}></div>
          <span>{fighter1HP} HP</span>
        </div>
        <div className="ultimate-bar">
          <div className="ultimate-fill" style={{ width: `${fighter1Ultimate * 10}%` }}></div>
          <span>ULTIMATE</span>
        </div>
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${fighter2HP}%`, background: SHAPES_DATA.find(s => s.type === fighter2Type)?.color }}></div>
          <span>{fighter2HP} HP</span>
        </div>
        <div className="ultimate-bar">
          <div className="ultimate-fill" style={{ width: `${fighter2Ultimate * 10}%` }}></div>
          <span>ULTIMATE</span>
        </div>
      </div>
    </div>
  );
}
