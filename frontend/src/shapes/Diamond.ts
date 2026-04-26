import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const diamondWeapon: WeaponConfig = {
  type: 'crystal_spear_laser_bow',
  name: 'Crystal Spear / Laser Bow',
  description: 'Precision weapons that deal bonus damage at perfect angles'
};

const diamondSkill1: SkillConfig = {
  name: 'Prism Strike',
  cooldown: 4000,
  effects: [
    { type: 'damage', value: 28 },
    { type: 'knockback', value: 10 }
  ],
  visualEffects: ['crystal_shards', 'lasers'],
  description: 'Spear lunge with piercing beam'
};

const diamondSkill2: SkillConfig = {
  name: 'Refraction Step',
  cooldown: 5000,
  effects: [
    { type: 'teleport', value: 90 },
    { type: 'buff', value: 1.4, duration: 2000 }
  ],
  visualEffects: ['refracted_light', 'crystal_shards'],
  description: 'Short-range teleport split into light images'
};

const diamondUltimate: SkillConfig = {
  name: 'Precision Lock',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 50 },
    { type: 'knockback', value: 22 },
    { type: 'buff', value: 2, duration: 4000 }
  ],
  visualEffects: ['crystal_shards', 'lasers', 'refracted_light'],
  description: 'Auto-aim crystal shots then spear finisher'
};

export class Diamond extends Shape {
  private precisionStack: number = 0;
  private lockedOn: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'diamond', stats, diamondWeapon, diamondSkill1, diamondSkill2, diamondUltimate);
  }

  protected executeSkill1(): void {
    // Prism Strike - spear lunge with piercing beam
    this.precisionStack = Math.min(5, this.precisionStack + 3);
  }

  protected executeSkill2(): void {
    // Refraction Step - short-range teleport split into light images
    this.precisionStack = Math.min(5, this.precisionStack + 2);
  }

  protected executeUltimate(): void {
    // Precision Lock - auto-aim crystal shots then spear finisher
    this.lockedOn = true;
    this.precisionStack = 5;
    setTimeout(() => {
      this.lockedOn = false;
    }, 4000);
  }

  protected applyPassive(): void {
    // Critical Angles - perfect angle hits bonus damage
    // Applied in getDamage() based on precisionStack
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.precisionStack * 0.12);
    if (this.lockedOn) {
      damage *= 1.4;
    }
    this.precisionStack = Math.max(0, this.precisionStack - 0.3);
    return damage;
  }

  isLockedOn(): boolean {
    return this.lockedOn;
  }
}
