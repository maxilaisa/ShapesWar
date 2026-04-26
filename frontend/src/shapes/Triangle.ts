import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const triangleWeapon: WeaponConfig = {
  type: 'dual_energy_swords',
  name: 'Dual Energy Swords',
  description: 'Summoned energy blades that deliver critical strikes'
};

const triangleSkill1: SkillConfig = {
  name: 'Piercing Dash',
  cooldown: 4000,
  effects: [
    { type: 'damage', value: 25 },
    { type: 'knockback', value: 8 }
  ],
  visualEffects: ['red_slash_arcs', 'blink_trails'],
  description: 'Dashes through enemy with blade slash trail'
};

const triangleSkill2: SkillConfig = {
  name: 'Edge Step',
  cooldown: 5000,
  effects: [
    { type: 'teleport', value: 80 },
    { type: 'damage', value: 20 }
  ],
  visualEffects: ['blink_trails', 'crit_sparks'],
  description: 'Teleport sidestep then backstab slash'
};

const triangleUltimate: SkillConfig = {
  name: 'Perfect Edge',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 60 },
    { type: 'knockback', value: 20 },
    { type: 'buff', value: 2.5, duration: 5000 }
  ],
  visualEffects: ['red_slash_arcs', 'blink_trails', 'crit_sparks'],
  description: 'Three teleport slashes then giant finishing cut'
};

export class Triangle extends Shape {
  private critCharge: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'triangle', stats, triangleWeapon, triangleSkill1, triangleSkill2, triangleUltimate);
  }

  protected executeSkill1(): void {
    // Piercing Dash - dashes through enemy with blade slash trail
    this.critCharge = 3;
  }

  protected executeSkill2(): void {
    // Edge Step - teleport sidestep then backstab slash
    this.critCharge = 2;
  }

  protected executeUltimate(): void {
    // Perfect Edge - three teleport slashes then giant finishing cut
    this.critCharge = 5;
  }

  protected applyPassive(): void {
    // Critical Edge - sword tip hits crit more often
    // Applied in getDamage()
  }

  getDamage(): number {
    let damage = super.getDamage();
    if (this.critCharge > 0) {
      damage *= 1.5;
      this.critCharge--;
    }
    return damage;
  }
}
