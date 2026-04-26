import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Oval extends Shape {
  private driftMomentum: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'oval', stats);
    this.setCooldowns(4000, 5000);
  }

  protected executeSkill1(): void {
    // Flash Dash - instant burst in chosen direction
    this.driftMomentum = 5;
  }

  protected executeSkill2(): void {
    // Slip Turn - quick sharp turn that resets movement angle
    this.driftMomentum = 3;
  }

  protected executeUltimate(): void {
    // Hyper Orbit - moves at extreme speed around enemy dealing repeated contact hits
    this.driftMomentum = 8;
  }

  protected applyPassive(): void {
    // Velocity Drift - keeps momentum better while turning
    // Applied via getSpeed()
  }

  getSpeed(): number {
    let speed = super.getSpeed();
    speed *= (1 + this.driftMomentum * 0.1);
    this.driftMomentum = Math.max(0, this.driftMomentum - 0.3);
    return speed;
  }

  update(deltaTime: number): void {
    super.updateCooldowns(deltaTime);
    this.applyPassive();
  }
}
