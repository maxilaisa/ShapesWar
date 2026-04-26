import { Shape } from './Shape';
import { ShapeStats, ShapeType, WeaponConfig, SkillConfig } from '../types';

const polygonWeapon: WeaponConfig = {
  type: 'fragment_blades',
  name: 'Fragment Blades',
  description: 'Splitting weapons that adapt to counter enemy tactics'
};

const polygonSkill1: SkillConfig = {
  name: 'Adaptive Split',
  cooldown: 5000,
  effects: [
    { type: 'damage', value: 22 },
    { type: 'buff', value: 1.4, duration: 3000 },
    { type: 'teleport', value: 70 }
  ],
  visualEffects: ['shape_morphing', 'fragment_storm'],
  description: 'Splits into mini polygons with knives'
};

const polygonSkill2: SkillConfig = {
  name: 'Form Shift',
  cooldown: 6000,
  effects: [
    { type: 'buff', value: 1.5, duration: 4000 },
    { type: 'shield', value: 15, duration: 3000 }
  ],
  visualEffects: ['shape_morphing', 'fragment_storm'],
  description: 'Temporarily changes shape properties'
};

const polygonUltimate: SkillConfig = {
  name: 'Evolution Mode',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 48 },
    { type: 'buff', value: 2.2, duration: 6000 },
    { type: 'knockback', value: 16 }
  ],
  visualEffects: ['shape_morphing', 'fragment_storm', 'weapon_morphing'],
  description: 'Transforms weapon to counter enemy'
};

export class Polygon extends Shape {
  private moduleCount: number = 0;
  private activeModules: Set<string> = new Set();

  constructor(id: string, stats: ShapeStats) {
    super(id, 'polygon', stats, polygonWeapon, polygonSkill1, polygonSkill2, polygonUltimate);
  }

  protected executeSkill1(): void {
    // Adaptive Split - splits into mini polygons with knives
    this.moduleCount = Math.min(10, this.moduleCount + 2);
    this.activeModules.add('shift');
    setTimeout(() => {
      this.activeModules.delete('shift');
    }, 3000);
  }

  protected executeSkill2(): void {
    // Form Shift - temporarily changes shape properties
    this.moduleCount = Math.min(10, this.moduleCount + 2);
    this.activeModules.add('adapt');
    setTimeout(() => {
      this.activeModules.delete('adapt');
    }, 4000);
  }

  protected executeUltimate(): void {
    // Evolution Mode - transforms weapon to counter enemy
    this.moduleCount = 10;
    this.activeModules.add('shift');
    this.activeModules.add('adapt');
    this.activeModules.add('boost');
    setTimeout(() => {
      this.activeModules.clear();
    }, 6000);
  }

  protected applyPassive(): void {
    // Modular Design - slowly gains modules over time
    this.moduleCount = Math.min(10, this.moduleCount + 0.02);
  }

  getDamage(): number {
    let damage = super.getDamage();
    if (this.activeModules.has('boost')) {
      damage *= 1.3;
    }
    damage *= (1 + this.moduleCount * 0.06);
    this.moduleCount = Math.max(0, this.moduleCount - 0.3);
    return damage;
  }

  getDefense(): number {
    let defense = super.getDefense();
    if (this.activeModules.has('adapt')) {
      defense *= 1.4;
    }
    defense *= (1 + this.moduleCount * 0.04);
    return defense;
  }

  getSpeed(): number {
    let speed = super.getSpeed();
    if (this.activeModules.has('shift')) {
      speed *= 1.2;
    }
    speed *= (1 + this.moduleCount * 0.03);
    return speed;
  }

  getModuleCount(): number {
    return this.moduleCount;
  }
}
