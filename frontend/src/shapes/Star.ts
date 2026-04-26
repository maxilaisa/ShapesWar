import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const starWeapon: WeaponConfig = {
  type: 'spiked_chain_blades',
  name: 'Spiked Chain Blades',
  description: 'Whirling chain weapons that deal extra collision damage'
};

const starSkill1: SkillConfig = {
  name: 'Star Impact',
  cooldown: 4000,
  effects: [
    { type: 'damage', value: 30 },
    { type: 'knockback', value: 15 }
  ],
  visualEffects: ['fire_sparks', 'explosive_impacts'],
  description: 'Chain spin slam'
};

const starSkill2: SkillConfig = {
  name: 'Nova Spin',
  cooldown: 6000,
  effects: [
    { type: 'damage', value: 25 },
    { type: 'knockback', value: 12 },
    { type: 'buff', value: 1.3, duration: 3000 }
  ],
  visualEffects: ['chain_blur', 'fire_sparks'],
  description: 'Whirlwind blade spin'
};

const starUltimate: SkillConfig = {
  name: 'Burst Chain Mode',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 40 },
    { type: 'buff', value: 2.5, duration: 5000 },
    { type: 'knockback', value: 20 }
  ],
  visualEffects: ['fire_sparks', 'chain_blur', 'explosive_impacts'],
  description: 'Wild speed mode with chain combos'
};

export class Star extends Shape {
  private berserkMode: boolean = false;
  private rageStack: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'star', stats, starWeapon, starSkill1, starSkill2, starUltimate);
  }

  protected executeSkill1(): void {
    // Star Impact - chain spin slam
    this.rageStack = Math.min(10, this.rageStack + 2);
  }

  protected executeSkill2(): void {
    // Nova Spin - whirlwind blade spin
    this.rageStack = Math.min(10, this.rageStack + 3);
  }

  protected executeUltimate(): void {
    // Burst Chain Mode - wild speed mode with chain combos
    this.berserkMode = true;
    this.rageStack = 10;
    setTimeout(() => {
      this.berserkMode = false;
    }, 5000);
  }

  protected applyPassive(): void {
    // Spike Contact - extra collision damage
    // Applied in getDamage()
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.rageStack * 0.1);
    if (this.berserkMode) {
      damage *= 1.5;
    }
    this.rageStack = Math.max(0, this.rageStack - 0.5);
    return damage;
  }
}
