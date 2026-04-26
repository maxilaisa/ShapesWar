import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Crescent extends Shape {
  private curveCharge: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'crescent', stats);
    this.setCooldowns(5000, 5000);
  }

  protected executeSkill1(): void {
    // Moon Hook - hooks enemy into curved pull path
    this.curveCharge = 3;
  }

  protected executeSkill2(): void {
    // Crescent Flip - leaps over enemy and repositions
    this.curveCharge = 4;
  }

  protected executeUltimate(): void {
    // Lunar Rift - creates curved gravity path dragging enemy sideways
    this.curveCharge = 6;
  }

  protected applyPassive(): void {
    // Curve Slash - curving motion deals extra damage on contact
    // Applied in getDamage() based on curveCharge
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.curveCharge * 0.1);
    this.curveCharge = Math.max(0, this.curveCharge - 0.4);
    return damage;
  }

  getCurveCharge(): number {
    return this.curveCharge;
  }
}
