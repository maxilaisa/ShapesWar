export type ShapeType = 
  | 'circle' 
  | 'triangle' 
  | 'square' 
  | 'oval' 
  | 'hexagon' 
  | 'spiral' 
  | 'rhombus' 
  | 'star' 
  | 'heart' 
  | 'diamond' 
  | 'crescent' 
  | 'dodecahedron';

export type AIState = 'neutral' | 'pressure' | 'defensive' | 'punish' | 'combo' | 'ultimate';

export type HitType = 'light' | 'clean' | 'wall_combo' | 'counter';

export interface AIConfig {
  aggression: number;
  mobility: number;
  precision: number;
  chaos: number;
  greed: number;
  fear: number;
  revenge: number;
  skill: number;
  discipline: number;
}

export interface FighterState {
  id: string;
  shapeType: ShapeType;
  hp: number;
  ultimateCharges: number;
  isUltimateActive: boolean;
  comboCount: number;
  lastHitTime: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  aiState: AIState;
  skillCooldowns: {
    skill1: number;
    skill2: number;
    ultimate: number;
  };
}

export interface CollisionEvent {
  fighterId: string;
  hitType: HitType;
  damage: number;
  knockback: { x: number; y: number };
  timestamp: number;
}

export interface ShapeData {
  id: string;
  type: ShapeType;
  name: string;
  color: string;
  aiConfig: AIConfig;
  passiveEffect: string;
  skill1Name: string;
  skill1Cooldown: number;
  skill2Name: string;
  skill2Cooldown: number;
  ultimateName: string;
}
