import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const spiralWeapon: WeaponConfig = {
  type: 'gravity_staff',
  name: 'Gravity Staff',
  description: 'Staff that manipulates gravity and creates spatial distortions'
};

const spiralSkill1: SkillConfig = {
  name: 'Vortex Pull',
  cooldown: 5000,
  effects: [
    { type: 'pull', value: 20, radius: 100 },
    { type: 'damage', value: 15 }
  ],
  visualEffects: ['purple_vortex', 'warped_space'],
  description: 'Creates mini black hole'
};

const spiralSkill2: SkillConfig = {
  name: 'Spiral Shift',
  cooldown: 4000,
  effects: [
    { type: 'teleport', value: 150 },
    { type: 'buff', value: 1.3, duration: 2000 }
  ],
  visualEffects: ['warped_space', 'purple_vortex'],
  description: 'Random short teleport'
};

const spiralUltimate: SkillConfig = {
  name: 'Gravity Collapse',
  cooldown: 15000,
  effects: [
    { type: 'pull', value: 30, radius: 200 },
    { type: 'damage', value: 50 },
    { type: 'knockback', value: 15 }
  ],
  visualEffects: ['purple_vortex', 'warped_space', 'debris_pull'],
  description: 'Massive singularity dragging enemies inward'
};

export class Spiral extends Shape {
  private chaosLevel: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'spiral', stats, spiralWeapon, spiralSkill1, spiralSkill2, spiralUltimate);
  }

  protected executeSkill1(): void {
    // Vortex Pull - creates mini black hole
    this.chaosLevel = 3;
  }

  protected executeSkill2(): void {
    // Spiral Shift - random short teleport
    this.chaosLevel = 4;
  }

  protected executeUltimate(): void {
    // Gravity Collapse - massive singularity dragging enemies inward
    this.chaosLevel = 6;
  }

  protected applyPassive(): void {
    // Spin Redirect - hits curve oddly
    // This is handled by the physics engine checking chaosLevel
  }

  getChaosLevel(): number {
    return this.chaosLevel;
  }

  reduceChaos(): void {
    this.chaosLevel = Math.max(0, this.chaosLevel - 0.5);
  }
}
