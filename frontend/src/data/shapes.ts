import { ShapeData, AIConfig } from '../types';

const FIXED_AI_PERSONALITIES: Record<string, AIConfig> = {
  circle: {
    aggression: 8,
    mobility: 8,
    precision: 5,
    chaos: 4,
    greed: 6,
    fear: 2,
    revenge: 5,
    skill: 7,
    discipline: 7
  },
  triangle: {
    aggression: 7,
    mobility: 8,
    precision: 9,
    chaos: 4,
    greed: 10,
    fear: 6,
    revenge: 3,
    skill: 8,
    discipline: 8
  },
  square: {
    aggression: 8,
    mobility: 3,
    precision: 5,
    chaos: 2,
    greed: 5,
    fear: 1,
    revenge: 10,
    skill: 6,
    discipline: 6
  },
  oval: {
    aggression: 6,
    mobility: 10,
    precision: 7,
    chaos: 6,
    greed: 5,
    fear: 5,
    revenge: 5,
    skill: 7,
    discipline: 7
  },
  hexagon: {
    aggression: 4,
    mobility: 5,
    precision: 8,
    chaos: 2,
    greed: 3,
    fear: 3,
    revenge: 7,
    skill: 9,
    discipline: 9
  },
  spiral: {
    aggression: 7,
    mobility: 8,
    precision: 4,
    chaos: 10,
    greed: 5,
    fear: 4,
    revenge: 5,
    skill: 5,
    discipline: 5
  },
  rhombus: {
    aggression: 5,
    mobility: 6,
    precision: 9,
    chaos: 3,
    greed: 4,
    fear: 5,
    revenge: 8,
    skill: 9,
    discipline: 9
  },
  star: {
    aggression: 10,
    mobility: 7,
    precision: 5,
    chaos: 8,
    greed: 9,
    fear: 1,
    revenge: 5,
    skill: 4,
    discipline: 4
  },
  heart: {
    aggression: 2,
    mobility: 5,
    precision: 6,
    chaos: 2,
    greed: 1,
    fear: 10,
    revenge: 5,
    skill: 8,
    discipline: 8
  },
  diamond: {
    aggression: 6,
    mobility: 7,
    precision: 10,
    chaos: 3,
    greed: 6,
    fear: 4,
    revenge: 5,
    skill: 10,
    discipline: 10
  },
  crescent: {
    aggression: 6,
    mobility: 8,
    precision: 8,
    chaos: 7,
    greed: 5,
    fear: 4,
    revenge: 5,
    skill: 8,
    discipline: 8
  },
  dodecahedron: {
    aggression: 7,
    mobility: 8,
    precision: 9,
    chaos: 4,
    greed: 6,
    fear: 2,
    revenge: 7,
    skill: 10,
    discipline: 10
  }
};

export const SHAPES_DATA: ShapeData[] = [
  {
    id: 'circle',
    type: 'circle',
    name: 'Circle',
    color: '#ff6b6b',
    aiConfig: FIXED_AI_PERSONALITIES.circle,
    passiveEffect: 'Momentum Build',
    skill1Name: 'Rolling Charge',
    skill1Cooldown: 4000,
    skill2Name: 'Rebound Feint',
    skill2Cooldown: 6000,
    ultimateName: 'Orbital Breaker'
  },
  {
    id: 'triangle',
    type: 'triangle',
    name: 'Triangle',
    color: '#4ecdc4',
    aiConfig: FIXED_AI_PERSONALITIES.triangle,
    passiveEffect: 'Critical Edge',
    skill1Name: 'Piercing Dash',
    skill1Cooldown: 4000,
    skill2Name: 'Edge Step',
    skill2Cooldown: 5000,
    ultimateName: 'Perfect Edge'
  },
  {
    id: 'square',
    type: 'square',
    name: 'Square',
    color: '#45b7d1',
    aiConfig: FIXED_AI_PERSONALITIES.square,
    passiveEffect: 'Heavy Body',
    skill1Name: 'Fortress Slam',
    skill1Cooldown: 5000,
    skill2Name: 'Anchor Brace',
    skill2Cooldown: 7000,
    ultimateName: 'Unstoppable Wall'
  },
  {
    id: 'oval',
    type: 'oval',
    name: 'Oval',
    color: '#96ceb4',
    aiConfig: FIXED_AI_PERSONALITIES.oval,
    passiveEffect: 'Velocity Drift',
    skill1Name: 'Flash Dash',
    skill1Cooldown: 4000,
    skill2Name: 'Slip Turn',
    skill2Cooldown: 5000,
    ultimateName: 'Hyper Orbit'
  },
  {
    id: 'hexagon',
    type: 'hexagon',
    name: 'Hexagon',
    color: '#ffeaa7',
    aiConfig: FIXED_AI_PERSONALITIES.hexagon,
    passiveEffect: 'Honeycomb Guard',
    skill1Name: 'Shield Pulse',
    skill1Cooldown: 5000,
    skill2Name: 'Angle Lock',
    skill2Cooldown: 6000,
    ultimateName: 'Fortress Grid'
  },
  {
    id: 'spiral',
    type: 'spiral',
    name: 'Spiral',
    color: '#dfe6e9',
    aiConfig: FIXED_AI_PERSONALITIES.spiral,
    passiveEffect: 'Spin Redirect',
    skill1Name: 'Vortex Pull',
    skill1Cooldown: 5000,
    skill2Name: 'Spiral Shift',
    skill2Cooldown: 6000,
    ultimateName: 'Gravity Collapse'
  },
  {
    id: 'rhombus',
    type: 'rhombus',
    name: 'Rhombus',
    color: '#fd79a8',
    aiConfig: FIXED_AI_PERSONALITIES.rhombus,
    passiveEffect: 'Mirror Reflex',
    skill1Name: 'Shard Counter',
    skill1Cooldown: 4000,
    skill2Name: 'Prism Flip',
    skill2Cooldown: 5000,
    ultimateName: 'Mirror Storm'
  },
  {
    id: 'star',
    type: 'star',
    name: 'Star',
    color: '#fdcb6e',
    aiConfig: FIXED_AI_PERSONALITIES.star,
    passiveEffect: 'Spike Contact',
    skill1Name: 'Star Impact',
    skill1Cooldown: 4000,
    skill2Name: 'Nova Spin',
    skill2Cooldown: 6000,
    ultimateName: 'Burst Chain Mode'
  },
  {
    id: 'heart',
    type: 'heart',
    name: 'Heart',
    color: '#e17055',
    aiConfig: FIXED_AI_PERSONALITIES.heart,
    passiveEffect: 'Recovery Pulse',
    skill1Name: 'Bait Shift',
    skill1Cooldown: 5000,
    skill2Name: 'Pulse Drift',
    skill2Cooldown: 6000,
    ultimateName: 'Sustain Field'
  },
  {
    id: 'diamond',
    type: 'diamond',
    name: 'Diamond',
    color: '#74b9ff',
    aiConfig: FIXED_AI_PERSONALITIES.diamond,
    passiveEffect: 'Critical Angles',
    skill1Name: 'Prism Strike',
    skill1Cooldown: 4000,
    skill2Name: 'Refraction Step',
    skill2Cooldown: 5000,
    ultimateName: 'Precision Lock'
  },
  {
    id: 'crescent',
    type: 'crescent',
    name: 'Crescent',
    color: '#a29bfe',
    aiConfig: FIXED_AI_PERSONALITIES.crescent,
    passiveEffect: 'Curve Slash',
    skill1Name: 'Moon Hook',
    skill1Cooldown: 5000,
    skill2Name: 'Crescent Flip',
    skill2Cooldown: 5000,
    ultimateName: 'Lunar Rift'
  },
  {
    id: 'dodecahedron',
    type: 'dodecahedron',
    name: 'Dodecahedron',
    color: '#00b894',
    aiConfig: FIXED_AI_PERSONALITIES.dodecahedron,
    passiveEffect: 'Adaptive Logic',
    skill1Name: 'Geometry Lock',
    skill1Cooldown: 5000,
    skill2Name: 'Pattern Read',
    skill2Cooldown: 7000,
    ultimateName: 'Perfect Form'
  }
];

export function getShapeData(type: string): ShapeData | undefined {
  return SHAPES_DATA.find(s => s.type === type);
}

export function getShapeColor(type: string): number {
  const shape = getShapeData(type);
  if (!shape) return 0xffffff;
  return parseInt(shape.color.replace('#', ''), 16);
}
