import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const heartWeapon: WeaponConfig = {
  type: 'charm_wand_pulse_daggers',
  name: 'Charm Wand / Pulse Daggers',
  description: 'Support weapons that create illusions and healing effects'
};

const heartSkill1: SkillConfig = {
  name: 'Bait Shift',
  cooldown: 5000,
  effects: [
    { type: 'teleport', value: 80 },
    { type: 'buff', value: 1.2, duration: 2000 }
  ],
  visualEffects: ['illusion_fade', 'pink_aura'],
  description: 'Leaves clone decoy'
};

const heartSkill2: SkillConfig = {
  name: 'Pulse Drift',
  cooldown: 4000,
  effects: [
    { type: 'heal', value: 10 },
    { type: 'teleport', value: 100 }
  ],
  visualEffects: ['heart_particles', 'pink_aura'],
  description: 'Dash with healing trail'
};

const heartUltimate: SkillConfig = {
  name: 'Sustain Field',
  cooldown: 15000,
  effects: [
    { type: 'heal', value: 30 },
    { type: 'shield', value: 25, duration: 8000 },
    { type: 'buff', value: 1.5, duration: 8000 }
  ],
  visualEffects: ['pink_aura', 'heart_particles', 'illusion_fade'],
  description: 'Healing zone with pulse waves'
};

export class Heart extends Shape {
  private lastHitTime: number = Date.now();
  private sustainField: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'heart', stats, heartWeapon, heartSkill1, heartSkill2, heartUltimate);
  }

  protected executeSkill1(): void {
    // Bait Shift - leaves clone decoy
  }

  protected executeSkill2(): void {
    // Pulse Drift - dash with healing trail
    this.hp = Math.min(this.maxHp, this.hp + 10);
  }

  protected executeUltimate(): void {
    // Sustain Field - healing zone with pulse waves
    this.sustainField = true;
    setTimeout(() => {
      this.sustainField = false;
    }, 8000);
  }

  protected applyPassive(): void {
    // Recovery Pulse - regens slowly
    const now = Date.now();
    if (now - this.lastHitTime > 3000) {
      this.hp = Math.min(this.maxHp, this.hp + 0.2);
    }
  }

  takeDamage(amount: number): void {
    this.lastHitTime = Date.now();
    let actualDamage = amount;
    if (this.sustainField) {
      actualDamage *= 0.7;
    }
    super.takeDamage(actualDamage);
  }
}
