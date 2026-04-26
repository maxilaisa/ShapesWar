import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const crescentWeapon: WeaponConfig = {
  type: 'crescent_scythe',
  name: 'Crescent Scythe',
  description: 'Curved blade that deals extra damage with curved movement'
};

const crescentSkill1: SkillConfig = {
  name: 'Moon Hook',
  cooldown: 5000,
  effects: [
    { type: 'pull', value: 15, radius: 120 },
    { type: 'damage', value: 20 }
  ],
  visualEffects: ['silver_moon_trails', 'curved_shockwave'],
  description: 'Scythe hook pulls enemy'
};

const crescentSkill2: SkillConfig = {
  name: 'Crescent Flip',
  cooldown: 5000,
  effects: [
    { type: 'teleport', value: 100 },
    { type: 'damage', value: 22 },
    { type: 'buff', value: 1.3, duration: 2000 }
  ],
  visualEffects: ['silver_moon_trails', 'dark_mist'],
  description: 'Acrobatic flip slash'
};

const crescentUltimate: SkillConfig = {
  name: 'Lunar Rift',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 48 },
    { type: 'pull', value: 25, radius: 180 },
    { type: 'knockback', value: 15 }
  ],
  visualEffects: ['silver_moon_trails', 'dark_mist', 'curved_shockwave'],
  description: 'Large moon arc wave cutting battlefield'
};

export class Crescent extends Shape {
  private curveCharge: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'crescent', stats, crescentWeapon, crescentSkill1, crescentSkill2, crescentUltimate);
  }

  protected executeSkill1(): void {
    // Moon Hook - scythe hook pulls enemy
    this.curveCharge = Math.min(6, this.curveCharge + 3);
  }

  protected executeSkill2(): void {
    // Crescent Flip - acrobatic flip slash
    this.curveCharge = Math.min(6, this.curveCharge + 4);
  }

  protected executeUltimate(): void {
    // Lunar Rift - large moon arc wave cutting battlefield
    this.curveCharge = 6;
  }

  protected applyPassive(): void {
    // Curve Slash - curved movement boosts attacks
    // Applied in getDamage() based on curveCharge
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.curveCharge * 0.12);
    this.curveCharge = Math.max(0, this.curveCharge - 0.4);
    return damage;
  }

  getCurveCharge(): number {
    return this.curveCharge;
  }
}
