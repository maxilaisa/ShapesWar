import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const hexagonWeapon: WeaponConfig = {
  type: 'shield_drones',
  name: 'Shield Drones',
  description: 'Autonomous drones that create defensive barriers and fire beams'
};

const hexagonSkill1: SkillConfig = {
  name: 'Shield Pulse',
  cooldown: 5000,
  effects: [
    { type: 'push', value: 20, radius: 120 },
    { type: 'knockback', value: 10 }
  ],
  visualEffects: ['hex_shields', 'pulse_waves'],
  description: 'Pulse blast pushes enemies away'
};

const hexagonSkill2: SkillConfig = {
  name: 'Angle Lock',
  cooldown: 6000,
  effects: [
    { type: 'debuff', value: 0.5, duration: 3000 },
    { type: 'push', value: 10, radius: 80 }
  ],
  visualEffects: ['barrier_lines', 'hex_shields'],
  description: 'Launches trap field slowing target'
};

const hexagonUltimate: SkillConfig = {
  name: 'Fortress Grid',
  cooldown: 15000,
  effects: [
    { type: 'shield', value: 40, duration: 5000 },
    { type: 'damage', value: 35 },
    { type: 'push', value: 15, radius: 150 }
  ],
  visualEffects: ['hex_shields', 'barrier_lines', 'pulse_waves'],
  description: 'Summons rotating barrier walls + drones firing beams'
};

export class Hexagon extends Shape {
  private shieldStack: number = 0;
  private lastShieldTime: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'hexagon', stats, hexagonWeapon, hexagonSkill1, hexagonSkill2, hexagonUltimate);
  }

  protected executeSkill1(): void {
    // Shield Pulse - pulse blast pushes enemies away
    this.shieldStack = 3;
  }

  protected executeSkill2(): void {
    // Angle Lock - launches trap field slowing target
    this.shieldStack = 2;
  }

  protected executeUltimate(): void {
    // Fortress Grid - summons rotating barrier walls + drones firing beams
    this.shieldStack = 5;
  }

  protected applyPassive(): void {
    // Honeycomb Guard - auto barrier appears periodically
    const now = Date.now();
    if (now - this.lastShieldTime > 5000) {
      this.shieldStack = Math.min(3, this.shieldStack + 1);
      this.lastShieldTime = now;
    }
  }

  takeDamage(amount: number): void {
    let actualDamage = amount;
    if (this.shieldStack > 0) {
      actualDamage *= 0.7;
      this.shieldStack--;
    }
    super.takeDamage(actualDamage);
  }
}
