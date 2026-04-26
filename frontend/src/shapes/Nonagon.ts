import { Shape } from './Shape';
import { ShapeStats, ShapeType, WeaponConfig, SkillConfig } from '../types';

const nonagonWeapon: WeaponConfig = {
  type: 'clone_kunai',
  name: 'Clone Kunai',
  description: 'Thrown weapons that create illusionary clones'
};

const nonagonSkill1: SkillConfig = {
  name: 'Mirage Clone',
  cooldown: 4500,
  effects: [
    { type: 'teleport', value: 80 },
    { type: 'damage', value: 18 },
    { type: 'buff', value: 1.3, duration: 2000 }
  ],
  visualEffects: ['smoke_vanish', 'afterimages'],
  description: 'Creates real-looking clones'
};

const nonagonSkill2: SkillConfig = {
  name: 'Phantom Dash',
  cooldown: 5500,
  effects: [
    { type: 'teleport', value: 100 },
    { type: 'buff', value: 1.4, duration: 2500 }
  ],
  visualEffects: ['afterimages', 'smoke_vanish'],
  description: 'Leaves decoy that moves briefly'
};

const nonagonUltimate: SkillConfig = {
  name: 'Phantom Swarm',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 52 },
    { type: 'knockback', value: 20 },
    { type: 'buff', value: 2, duration: 5000 }
  ],
  visualEffects: ['smoke_vanish', 'afterimages', 'clone_flicker'],
  description: 'All clones attack at once'
};

export class Nonagon extends Shape {
  private mirageStack: number = 0;
  private lastMirageTime: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'nonagon', stats, nonagonWeapon, nonagonSkill1, nonagonSkill2, nonagonUltimate);
  }

  protected executeSkill1(): void {
    // Mirage Clone - creates real-looking clones
    this.mirageStack = Math.min(5, this.mirageStack + 3);
  }

  protected executeSkill2(): void {
    // Phantom Dash - leaves decoy that moves briefly
    this.mirageStack = Math.min(5, this.mirageStack + 2);
  }

  protected executeUltimate(): void {
    // Phantom Swarm - all clones attack at once
    this.mirageStack = 5;
  }

  protected applyPassive(): void {
    // Ghostly Presence - chance to dodge attacks
    const now = Date.now();
    if (now - this.lastMirageTime > 4000) {
      this.mirageStack = Math.min(5, this.mirageStack + 1);
      this.lastMirageTime = now;
    }
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.mirageStack * 0.1);
    this.mirageStack = Math.max(0, this.mirageStack - 0.4);
    return damage;
  }

  getSpeed(): number {
    let speed = super.getSpeed();
    speed *= (1 + this.mirageStack * 0.08);
    return speed;
  }

  getMirageStack(): number {
    return this.mirageStack;
  }
}
