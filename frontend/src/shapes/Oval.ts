import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const ovalWeapon: WeaponConfig = {
  type: 'twin_energy_bows',
  name: 'Twin Energy Bows',
  description: 'Dual energy bows that fire tracking arrows while moving'
};

const ovalSkill1: SkillConfig = {
  name: 'Flash Dash',
  cooldown: 3000,
  effects: [
    { type: 'teleport', value: 120 },
    { type: 'buff', value: 1.5, duration: 2000 }
  ],
  visualEffects: ['blue_streaks', 'wind_lines'],
  description: 'High-speed dodge'
};

const ovalSkill2: SkillConfig = {
  name: 'Rapid Volley',
  cooldown: 5000,
  effects: [
    { type: 'damage', value: 15 },
    { type: 'knockback', value: 5 }
  ],
  visualEffects: ['arrow_trails', 'wind_lines'],
  description: 'Fires 3 tracking arrows while moving'
};

const ovalUltimate: SkillConfig = {
  name: 'Hyper Orbit',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 45 },
    { type: 'buff', value: 2, duration: 5000 }
  ],
  visualEffects: ['arrow_trails', 'wind_lines', 'blue_streaks'],
  description: 'Runs circles around enemy firing nonstop arrows'
};

export class Oval extends Shape {
  private driftMomentum: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'oval', stats, ovalWeapon, ovalSkill1, ovalSkill2, ovalUltimate);
  }

  protected executeSkill1(): void {
    // Flash Dash - high-speed dodge
    this.driftMomentum = 5;
  }

  protected executeSkill2(): void {
    // Rapid Volley - fires 3 tracking arrows while moving
    this.driftMomentum = 3;
  }

  protected executeUltimate(): void {
    // Hyper Orbit - runs circles around enemy firing nonstop arrows
    this.driftMomentum = 8;
  }

  protected applyPassive(): void {
    // Velocity Drift - keeps speed while aiming
    // Applied via getSpeed()
  }

  getSpeed(): number {
    let speed = super.getSpeed();
    speed *= (1 + this.driftMomentum * 0.1);
    this.driftMomentum = Math.max(0, this.driftMomentum - 0.3);
    return speed;
  }
}
