import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Heart extends Shape {
  private lastHitTime: number = Date.now();
  private sustainField: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'heart', stats);
    this.setCooldowns(5000, 6000);
  }

  protected executeSkill1(): void {
    // Bait Shift - creates fake movement then sidesteps
  }

  protected executeSkill2(): void {
    // Pulse Drift - escapes while restoring small HP
    this.hp = Math.min(this.maxHp, this.hp + 5);
  }

  protected executeUltimate(): void {
    // Sustain Field - area aura granting healing + defense
    this.sustainField = true;
    setTimeout(() => {
      this.sustainField = false;
    }, 8000);
  }

  protected applyPassive(): void {
    // Recovery Pulse - regenerates slowly when not hit
    const now = Date.now();
    if (now - this.lastHitTime > 3000) {
      this.hp = Math.min(this.maxHp, this.hp + 0.1);
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
