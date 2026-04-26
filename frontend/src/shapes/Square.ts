import { Shape, ShapeStats } from './Shape';
import { ShapeType, WeaponConfig, SkillConfig } from '../types';

const squareWeapon: WeaponConfig = {
  type: 'giant_hammer_shield',
  name: 'Giant Hammer / Shield',
  description: 'Massive hammer for crushing blows and shield for defense'
};

const squareSkill1: SkillConfig = {
  name: 'Fortress Slam',
  cooldown: 5000,
  effects: [
    { type: 'damage', value: 30 },
    { type: 'knockback', value: 20 },
    { type: 'push', value: 15, radius: 100 }
  ],
  visualEffects: ['cracks', 'dust_burst', 'metal_sparks'],
  description: 'Hammer slam causes ground shockwave'
};

const squareSkill2: SkillConfig = {
  name: 'Anchor Brace',
  cooldown: 7000,
  effects: [
    { type: 'shield', value: 50, duration: 3000 },
    { type: 'buff', value: 2, duration: 3000 }
  ],
  visualEffects: ['metal_sparks', 'barrier_lines'],
  description: 'Plants shield into ground, blocks damage'
};

const squareUltimate: SkillConfig = {
  name: 'Unstoppable Wall',
  cooldown: 15000,
  effects: [
    { type: 'damage', value: 40 },
    { type: 'knockback', value: 30 },
    { type: 'buff', value: 3, duration: 5000 }
  ],
  visualEffects: ['cracks', 'dust_burst', 'metal_sparks'],
  description: 'Charges forward shield-first crushing enemies'
};

export class Square extends Shape {
  private anchored: boolean = false;
  private unstoppable: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'square', stats, squareWeapon, squareSkill1, squareSkill2, squareUltimate);
  }

  protected executeSkill1(): void {
    // Fortress Slam - hammer slam causes ground shockwave
  }

  protected executeSkill2(): void {
    // Anchor Brace - plants shield into ground, blocks damage
    this.anchored = true;
    setTimeout(() => {
      this.anchored = false;
    }, 3000);
  }

  protected executeUltimate(): void {
    // Unstoppable Wall - charges forward shield-first crushing enemies
    this.unstoppable = true;
    setTimeout(() => {
      this.unstoppable = false;
    }, 5000);
  }

  protected applyPassive(): void {
    // Heavy Body - high knockback resistance
    // Applied in takeDamage() via defense stat
  }

  takeDamage(amount: number): void {
    let defenseMultiplier = this.getDefense();
    if (this.anchored) defenseMultiplier *= 2;
    if (this.unstoppable) defenseMultiplier *= 1.5;
    const actualDamage = amount * (1 - (defenseMultiplier - 1) * 0.5);
    this.hp = Math.max(0, this.hp - actualDamage);
  }
}
