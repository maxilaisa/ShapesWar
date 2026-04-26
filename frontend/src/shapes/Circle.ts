import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const circleWeapon: WeaponConfig = {
  type: 'energy_gauntlets',
  name: 'Energy Gauntlets',
  description: 'Summoned energy constructs that amplify momentum-based attacks'
};

const circleSkill1: SkillConfig = {
  name: 'Rolling Charge',
  cooldown: 4000,
  effects: [
    { type: 'knockback', value: 15 },
    { type: 'damage', value: 20 }
  ],
  visualEffects: ['shock_trails', 'speed_blur'],
  description: 'Wraps gauntlets in energy and launches forward with powerful momentum'
};

const circleSkill2: SkillConfig = {
  name: 'Rebound Feint',
  cooldown: 6000,
  effects: [
    { type: 'teleport', value: 100 },
    { type: 'knockback', value: 10 }
  ],
  visualEffects: ['impact_rings', 'speed_blur'],
  description: 'Bounces off wall then redirects at unexpected angle'
};

const circleUltimate: SkillConfig = {
  name: 'Orbital Breaker',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 50 },
    { type: 'knockback', value: 25 },
    { type: 'buff', value: 2, duration: 5000 }
  ],
  visualEffects: ['shock_trails', 'impact_rings', 'speed_blur'],
  description: 'Spins around enemy with glowing fists, final uppercut blast'
};

export class Circle extends Shape {
  private momentumStack: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'circle', stats, circleWeapon, circleSkill1, circleSkill2, circleUltimate);
  }

  protected executeSkill1(): void {
    // Rolling Charge - wraps gauntlets in energy and launches forward
    this.momentumStack = Math.min(10, this.momentumStack + 3);
  }

  protected executeSkill2(): void {
    // Rebound Feint - wall bounce then fake angle redirect
    this.momentumStack = Math.min(10, this.momentumStack + 2);
  }

  protected executeUltimate(): void {
    // Orbital Breaker - spins around enemy with glowing fists, final uppercut blast
    this.momentumStack = 10;
  }

  protected applyPassive(): void {
    // Momentum Build - higher speed = stronger hits
    // Applied in getDamage() based on momentumStack
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.momentumStack * 0.15);
    this.momentumStack = Math.max(0, this.momentumStack - 0.5);
    return damage;
  }

  addMomentum(amount: number): void {
    this.momentumStack = Math.min(10, this.momentumStack + amount);
  }
}
