export type GameMode = '1v1' | 'ffa' | 'tournament' | 'replay' | 'cinematic';

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

export type AIState = 'neutral' | 'pressure' | 'combo' | 'defensive' | 'punish' | 'ultimate';

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
  hitType: 'light' | 'clean' | 'wall_combo' | 'counter';
  damage: number;
  knockback: { x: number; y: number };
  timestamp: number;
}
