import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const dodecahedronWeapon: WeaponConfig = {
  type: 'morphing_arsenal',
  name: 'Morphing Arsenal',
  description: 'Adaptive weapon that cycles through different forms to counter opponents'
};

const dodecahedronSkill1: SkillConfig = {
  name: 'Geometry Lock',
  cooldown: 5000,
  effects: [
    { type: 'debuff', value: 0.6, duration: 3000 },
    { type: 'damage', value: 20 }
  ],
  visualEffects: ['golden_forms', 'weapon_morphing'],
  description: 'Uses chains/traps based on opponent'
};

const dodecahedronSkill2: SkillConfig = {
  name: 'Pattern Read',
  cooldown: 7000,
  effects: [
    { type: 'buff', value: 1.5, duration: 4000 },
    { type: 'shield', value: 20, duration: 2000 }
  ],
  visualEffects: ['tactical_aura', 'golden_forms'],
  description: 'Counter weapon chosen automatically'
};

const dodecahedronUltimate: SkillConfig = {
  name: 'Perfect Form',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 45 },
    { type: 'buff', value: 2.5, duration: 6000 },
    { type: 'knockback', value: 18 }
  ],
  visualEffects: ['golden_forms', 'weapon_morphing', 'tactical_aura'],
  description: 'Cycles sword, spear, bow, hammer rapidly'
};

export class Dodecahedron extends Shape {
  private adaptationLevel: number = 0;
  private perfectForm: boolean = false;
  private enemyPatterns: Map<string, number> = new Map();

  constructor(id: string, stats: ShapeStats) {
    super(id, 'dodecahedron', stats, dodecahedronWeapon, dodecahedronSkill1, dodecahedronSkill2, dodecahedronUltimate);
  }

  protected executeSkill1(): void {
    // Geometry Lock - uses chains/traps based on opponent
    this.adaptationLevel = Math.min(10, this.adaptationLevel + 2);
  }

  protected executeSkill2(): void {
    // Pattern Read - counter weapon chosen automatically
    this.adaptationLevel = Math.min(10, this.adaptationLevel + 3);
  }

  protected executeUltimate(): void {
    // Perfect Form - cycles sword, spear, bow, hammer rapidly
    this.perfectForm = true;
    this.adaptationLevel = 10;
    setTimeout(() => {
      this.perfectForm = false;
    }, 6000);
  }

  protected applyPassive(): void {
    // Adaptive Logic - learns enemy style
    this.adaptationLevel = Math.min(10, this.adaptationLevel + 0.01);
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.adaptationLevel * 0.08);
    if (this.perfectForm) {
      damage *= 1.6;
    }
    this.adaptationLevel = Math.max(0, this.adaptationLevel - 0.3);
    return damage;
  }

  getDefense(): number {
    let defense = super.getDefense();
    if (this.perfectForm) {
      defense *= 1.4;
    }
    return defense;
  }

  recordEnemyPattern(pattern: string): void {
    const count = this.enemyPatterns.get(pattern) || 0;
    this.enemyPatterns.set(pattern, count + 1);
    if (count > 5) {
      this.adaptationLevel = Math.min(10, this.adaptationLevel + 0.5);
    }
  }
}
