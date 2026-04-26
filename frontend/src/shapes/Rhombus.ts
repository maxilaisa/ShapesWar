import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const rhombusWeapon: WeaponConfig = {
  type: 'shuriken_daggers',
  name: 'Shuriken + Daggers',
  description: 'Thrown projectiles and melee daggers for counter attacks'
};

const rhombusSkill1: SkillConfig = {
  name: 'Shard Counter',
  cooldown: 4000,
  effects: [
    { type: 'shield', value: 30, duration: 2000 },
    { type: 'damage', value: 25 },
    { type: 'knockback', value: 12 }
  ],
  visualEffects: ['mirror_shards', 'silver_trails'],
  description: 'Blocks then throws explosive shuriken'
};

const rhombusSkill2: SkillConfig = {
  name: 'Prism Flip',
  cooldown: 5000,
  effects: [
    { type: 'teleport', value: 100 },
    { type: 'damage', value: 20 },
    { type: 'buff', value: 1.5, duration: 2000 }
  ],
  visualEffects: ['silver_trails', 'clone_flicker'],
  description: 'Backflip teleport behind enemy'
};

const rhombusUltimate: SkillConfig = {
  name: 'Mirror Storm',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 55 },
    { type: 'knockback', value: 18 },
    { type: 'buff', value: 2, duration: 4000 }
  ],
  visualEffects: ['mirror_shards', 'silver_trails', 'clone_flicker'],
  description: 'Clone images throw dozens of shuriken'
};

export class Rhombus extends Shape {
  private counterStance: boolean = false;
  private dodgeBonus: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'rhombus', stats, rhombusWeapon, rhombusSkill1, rhombusSkill2, rhombusUltimate);
  }

  protected executeSkill1(): void {
    // Shard Counter - blocks then throws explosive shuriken
    this.counterStance = true;
    setTimeout(() => {
      this.counterStance = false;
    }, 2000);
  }

  protected executeSkill2(): void {
    // Prism Flip - backflip teleport behind enemy
    this.dodgeBonus = true;
    setTimeout(() => {
      this.dodgeBonus = false;
    }, 2000);
  }

  protected executeUltimate(): void {
    // Mirror Storm - clone images throw dozens of shuriken
    this.dodgeBonus = true;
    setTimeout(() => {
      this.dodgeBonus = false;
    }, 4000);
  }

  protected applyPassive(): void {
    // Mirror Reflex - perfect dodge empowers next hit
    // Applied in getDamage()
  }

  getDamage(): number {
    let damage = super.getDamage();
    if (this.dodgeBonus) {
      damage *= 1.8;
    }
    return damage;
  }

  isCounterStance(): boolean {
    return this.counterStance;
  }

  triggerCounter(): void {
    this.counterStance = false;
    this.dodgeBonus = true;
  }
}
