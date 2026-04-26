import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Square extends Shape {
  private anchored: boolean = false;
  private unstoppable: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'square', stats);
    this.setCooldowns(5000, 7000);
  }

  protected executeSkill1(): void {
    // Fortress Slam - jumps slightly then crashes down, causing shockwave knockback
  }

  protected executeSkill2(): void {
    // Anchor Brace - stops moving briefly and gains huge defense
    this.anchored = true;
    setTimeout(() => {
      this.anchored = false;
    }, 3000);
  }

  protected executeUltimate(): void {
    // Unstoppable Wall - rushes forward immune to knockback for several seconds
    this.unstoppable = true;
    setTimeout(() => {
      this.unstoppable = false;
    }, 5000);
  }

  protected applyPassive(): void {
    // Heavy Body - reduced knockback from enemy hits
    // Applied in takeDamage() via defense stat
  }

  takeDamage(amount: number): void {
    let defenseMultiplier = this.getDefense();
    if (this.anchored) defenseMultiplier *= 2;
    const actualDamage = amount * (1 - (defenseMultiplier - 1) * 0.5);
    this.hp = Math.max(0, this.hp - actualDamage);
  }

}
