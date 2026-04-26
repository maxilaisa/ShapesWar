import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Rhombus extends Shape {
  private counterStance: boolean = false;
  private dodgeBonus: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'rhombus', stats);
    this.setCooldowns(4000, 5000);
  }

  protected executeSkill1(): void {
    // Shard Counter - counter stance. If hit during stance, retaliates strongly
    this.counterStance = true;
    setTimeout(() => {
      this.counterStance = false;
    }, 2000);
  }

  protected executeSkill2(): void {
    // Prism Flip - quickly flips behind enemy
    this.dodgeBonus = true;
    setTimeout(() => {
      this.dodgeBonus = false;
    }, 1000);
  }

  protected executeUltimate(): void {
    // Mirror Storm - rapid angle strikes from multiple directions
    this.dodgeBonus = true;
    setTimeout(() => {
      this.dodgeBonus = false;
    }, 3000);
  }

  protected applyPassive(): void {
    // Mirror Reflex - perfect dodge boosts next attack damage
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
