import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Circle extends Shape {
  private momentumStack: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'circle', stats);
    this.setCooldowns(4000, 6000);
  }

  protected executeSkill1(): void {
    // Rolling Charge - charges forward quickly with strong knockback
    this.momentumStack += 3;
  }

  protected executeSkill2(): void {
    // Rebound Feint - dashes into wall, instantly ricochets at new angle
    this.momentumStack += 2;
  }

  protected executeUltimate(): void {
    // Orbital Breaker - rapidly circles target with multiple hits, then slams
    this.momentumStack += 5;
  }

  protected applyPassive(): void {
    // Momentum Build - the faster Circle moves, the more damage its collisions deal
    // This is applied in getDamage() based on momentumStack
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.momentumStack * 0.15);
    this.momentumStack = Math.max(0, this.momentumStack - 0.5);
    return damage;
  }

  addMomentum(amount: number): void {
    this.momentumStack = Math.min(10, this.momentumStack + amount);
  }
}
