import { ShapeType, AIConfig } from '../types';

export interface ShapeStats {
  hp: number;
  dmg: number;
  def: number;
  spd: number;
}

export const SHAPES_DATA: {
  id: string;
  type: ShapeType;
  name: string;
  color: string;
  description: string;
  role: string;
  stats: ShapeStats;
  passiveEffect: string;
  skill1Name: string;
  skill1Cooldown: number;
  skill2Name: string;
  skill2Cooldown: number;
  ultimateName: string;
  aiConfig: AIConfig;
}[] = [
  {
    id: 'circle',
    type: 'circle',
    name: 'Circle',
    color: '#ff6b6b',
    description: 'Momentum fighter that builds speed through rebounds',
    role: 'Momentum fighter',
    stats: { hp: 100, dmg: 103, def: 95, spd: 108 },
    passiveEffect: 'Momentum Build',
    skill1Name: 'Rolling Charge',
    skill1Cooldown: 4000,
    skill2Name: 'Rebound Feint',
    skill2Cooldown: 6000,
    ultimateName: 'Orbital Breaker',
    aiConfig: {
      aggression: 7,
      mobility: 8,
      precision: 6,
      chaos: 4,
      greed: 6,
      fear: 3,
      revenge: 5,
      skill: 7,
      discipline: 5
    }
  },
  {
    id: 'triangle',
    type: 'triangle',
    name: 'Triangle',
    color: '#4ecdc4',
    description: 'Assassin with burst damage and precise engages',
    role: 'Assassin',
    stats: { hp: 100, dmg: 118, def: 84, spd: 112 },
    passiveEffect: 'Critical Edge',
    skill1Name: 'Piercing Dash',
    skill1Cooldown: 4000,
    skill2Name: 'Edge Step',
    skill2Cooldown: 5000,
    ultimateName: 'Perfect Edge',
    aiConfig: {
      aggression: 9,
      mobility: 8,
      precision: 9,
      chaos: 3,
      greed: 8,
      fear: 2,
      revenge: 7,
      skill: 8,
      discipline: 7
    }
  },
  {
    id: 'square',
    type: 'square',
    name: 'Square',
    color: '#45b7d1',
    description: 'Tank that is slow, durable, and punishes mistakes',
    role: 'Tank',
    stats: { hp: 100, dmg: 92, def: 125, spd: 72 },
    passiveEffect: 'Heavy Body',
    skill1Name: 'Fortress Slam',
    skill1Cooldown: 5000,
    skill2Name: 'Anchor Brace',
    skill2Cooldown: 7000,
    ultimateName: 'Unstoppable Wall',
    aiConfig: {
      aggression: 4,
      mobility: 3,
      precision: 5,
      chaos: 2,
      greed: 3,
      fear: 2,
      revenge: 8,
      skill: 5,
      discipline: 9
    }
  },
  {
    id: 'oval',
    type: 'oval',
    name: 'Oval',
    color: '#96ceb4',
    description: 'Speed harasser with constant movement',
    role: 'Speed harasser',
    stats: { hp: 100, dmg: 92, def: 86, spd: 125 },
    passiveEffect: 'Velocity Drift',
    skill1Name: 'Flash Dash',
    skill1Cooldown: 4000,
    skill2Name: 'Slip Turn',
    skill2Cooldown: 5000,
    ultimateName: 'Hyper Orbit',
    aiConfig: {
      aggression: 6,
      mobility: 10,
      precision: 5,
      chaos: 6,
      greed: 5,
      fear: 4,
      revenge: 4,
      skill: 6,
      discipline: 4
    }
  },
  {
    id: 'hexagon',
    type: 'hexagon',
    name: 'Hexagon',
    color: '#ffeaa7',
    description: 'Defender that is safe, reactive, and punishes aggression',
    role: 'Defender',
    stats: { hp: 100, dmg: 90, def: 118, spd: 88 },
    passiveEffect: 'Honeycomb Guard',
    skill1Name: 'Shield Pulse',
    skill1Cooldown: 5000,
    skill2Name: 'Angle Lock',
    skill2Cooldown: 6000,
    ultimateName: 'Fortress Grid',
    aiConfig: {
      aggression: 3,
      mobility: 4,
      precision: 7,
      chaos: 2,
      greed: 2,
      fear: 2,
      revenge: 9,
      skill: 7,
      discipline: 8
    }
  },
  {
    id: 'spiral',
    type: 'spiral',
    name: 'Spiral',
    color: '#dfe6e9',
    description: 'Chaos fighter with unpredictable movement',
    role: 'Chaos skirmisher',
    stats: { hp: 100, dmg: 104, def: 92, spd: 108 },
    passiveEffect: 'Spin Redirect',
    skill1Name: 'Vortex Pull',
    skill1Cooldown: 5000,
    skill2Name: 'Spiral Shift',
    skill2Cooldown: 6000,
    ultimateName: 'Gravity Collapse',
    aiConfig: {
      aggression: 7,
      mobility: 8,
      precision: 4,
      chaos: 10,
      greed: 6,
      fear: 3,
      revenge: 5,
      skill: 6,
      discipline: 3
    }
  },
  {
    id: 'rhombus',
    type: 'rhombus',
    name: 'Rhombus',
    color: '#fd79a8',
    description: 'Counter duelist that baits mistakes and punishes',
    role: 'Counter duelist',
    stats: { hp: 100, dmg: 108, def: 96, spd: 100 },
    passiveEffect: 'Mirror Reflex',
    skill1Name: 'Shard Counter',
    skill1Cooldown: 4000,
    skill2Name: 'Prism Flip',
    skill2Cooldown: 5000,
    ultimateName: 'Mirror Storm',
    aiConfig: {
      aggression: 5,
      mobility: 6,
      precision: 8,
      chaos: 4,
      greed: 7,
      fear: 3,
      revenge: 9,
      skill: 8,
      discipline: 7
    }
  },
  {
    id: 'star',
    type: 'star',
    name: 'Star',
    color: '#fdcb6e',
    description: 'Berserker with maximum aggression',
    role: 'Berserker',
    stats: { hp: 100, dmg: 122, def: 82, spd: 110 },
    passiveEffect: 'Spike Contact',
    skill1Name: 'Star Impact',
    skill1Cooldown: 4000,
    skill2Name: 'Nova Spin',
    skill2Cooldown: 6000,
    ultimateName: 'Burst Chain Mode',
    aiConfig: {
      aggression: 10,
      mobility: 7,
      precision: 5,
      chaos: 7,
      greed: 9,
      fear: 1,
      revenge: 6,
      skill: 5,
      discipline: 3
    }
  },
  {
    id: 'heart',
    type: 'heart',
    name: 'Heart',
    color: '#e17055',
    description: 'Sustain survivor that outlasts enemies',
    role: 'Sustain survival',
    stats: { hp: 100, dmg: 80, def: 108, spd: 94 },
    passiveEffect: 'Recovery Pulse',
    skill1Name: 'Bait Shift',
    skill1Cooldown: 5000,
    skill2Name: 'Pulse Drift',
    skill2Cooldown: 6000,
    ultimateName: 'Sustain Field',
    aiConfig: {
      aggression: 3,
      mobility: 5,
      precision: 6,
      chaos: 3,
      greed: 2,
      fear: 5,
      revenge: 4,
      skill: 6,
      discipline: 8
    }
  },
  {
    id: 'diamond',
    type: 'diamond',
    name: 'Diamond',
    color: '#74b9ff',
    description: 'Precision striker with accuracy and prediction',
    role: 'Precision striker',
    stats: { hp: 100, dmg: 114, def: 90, spd: 104 },
    passiveEffect: 'Critical Angles',
    skill1Name: 'Prism Strike',
    skill1Cooldown: 4000,
    skill2Name: 'Refraction Step',
    skill2Cooldown: 5000,
    ultimateName: 'Precision Lock',
    aiConfig: {
      aggression: 7,
      mobility: 6,
      precision: 10,
      chaos: 3,
      greed: 7,
      fear: 3,
      revenge: 6,
      skill: 9,
      discipline: 8
    }
  },
  {
    id: 'crescent',
    type: 'crescent',
    name: 'Crescent',
    color: '#a29bfe',
    description: 'Trickster with curved movement and traps',
    role: 'Trickster',
    stats: { hp: 100, dmg: 106, def: 94, spd: 108 },
    passiveEffect: 'Curve Slash',
    skill1Name: 'Moon Hook',
    skill1Cooldown: 5000,
    skill2Name: 'Crescent Flip',
    skill2Cooldown: 5000,
    ultimateName: 'Lunar Rift',
    aiConfig: {
      aggression: 6,
      mobility: 7,
      precision: 6,
      chaos: 8,
      greed: 6,
      fear: 4,
      revenge: 5,
      skill: 7,
      discipline: 5
    }
  },
  {
    id: 'dodecahedron',
    type: 'dodecahedron',
    name: 'Dodecahedron',
    color: '#00b894',
    description: 'All-rounder with smart adaptive fighting',
    role: 'All-rounder',
    stats: { hp: 100, dmg: 102, def: 102, spd: 102 },
    passiveEffect: 'Adaptive Logic',
    skill1Name: 'Geometry Lock',
    skill1Cooldown: 5000,
    skill2Name: 'Pattern Read',
    skill2Cooldown: 7000,
    ultimateName: 'Perfect Form',
    aiConfig: {
      aggression: 6,
      mobility: 6,
      precision: 7,
      chaos: 4,
      greed: 5,
      fear: 3,
      revenge: 6,
      skill: 8,
      discipline: 9
    }
  },
  {
    id: '13',
    type: 'dodecahedron',
    name: 'Dodecahedron',
    color: '#FF6B6B',
    description: 'The master tactician with adaptive learning abilities.',
    role: 'Tactician',
    stats: { hp: 100, dmg: 100, def: 100, spd: 100 },
    passiveEffect: 'Adaptive Logic - learns opponent patterns, gains small bonuses over time',
    skill1Name: 'Geometry Lock',
    skill1Cooldown: 5000,
    skill2Name: 'Pattern Read',
    skill2Cooldown: 7000,
    ultimateName: 'Perfect Form',
    aiConfig: {
      aggression: 0.5,
      mobility: 0.5,
      precision: 0.9,
      chaos: 0.2,
      greed: 0.4,
      fear: 0.3,
      revenge: 0.6,
      skill: 0.9,
      discipline: 0.9
    }
  },
  {
    id: '14',
    type: 'nonagon',
    name: 'Nonagon',
    color: '#9B59B6',
    description: 'A clone shape with mirage and illusion abilities.',
    role: 'Clone',
    stats: { hp: 100, dmg: 100, def: 100, spd: 100 },
    passiveEffect: 'Ghostly Presence - chance to dodge attacks based on mirageStack',
    skill1Name: 'Phantom Dash',
    skill1Cooldown: 4500,
    skill2Name: 'Illusion Step',
    skill2Cooldown: 5500,
    ultimateName: 'Mirage Logic',
    aiConfig: {
      aggression: 0.6,
      mobility: 0.8,
      precision: 0.7,
      chaos: 0.7,
      greed: 0.5,
      fear: 0.4,
      revenge: 0.5,
      skill: 0.7,
      discipline: 0.6
    }
  },
  {
    id: '15',
    type: 'polygon',
    name: 'Polygon',
    color: '#1ABC9C',
    description: 'A clone shape with modular form-shifting abilities.',
    role: 'Clone',
    stats: { hp: 100, dmg: 100, def: 100, spd: 100 },
    passiveEffect: 'Modular Design - slowly gains modules over time',
    skill1Name: 'Form Shift',
    skill1Cooldown: 5000,
    skill2Name: 'Adapt Module',
    skill2Cooldown: 6000,
    ultimateName: 'Modular Form',
    aiConfig: {
      aggression: 0.5,
      mobility: 0.6,
      precision: 0.8,
      chaos: 0.3,
      greed: 0.6,
      fear: 0.3,
      revenge: 0.7,
      skill: 0.8,
      discipline: 0.8
    }
  }
];

export function getShapeData(type: string): typeof SHAPES_DATA[0] | undefined {
  return SHAPES_DATA.find(s => s.type === type);
}

export function getShapeColor(type: string): number {
  const shape = getShapeData(type);
  if (!shape) return 0xffffff;
  return parseInt(shape.color.replace('#', ''), 16);
}
