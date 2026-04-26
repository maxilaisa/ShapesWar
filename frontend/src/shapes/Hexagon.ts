import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Hexagon extends Shape {
  private shieldStack: number = 0;
  private lastShieldTime: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'hexagon', stats);
    this.setCooldowns(5000, 6000);
  }

  protected executeSkill1(): void {
    // Shield Pulse - pushes enemies away in close range
    this.shieldStack = 3;
  }

  protected executeSkill2(): void {
    // Angle Lock - temporarily slows enemy turn speed and movement
    this.shieldStack = 2;
  }

  protected executeUltimate(): void {
    // Fortress Grid - creates temporary bounce walls around arena zones
    this.shieldStack = 5;
  }

  protected applyPassive(): void {
    // Honeycomb Guard - generates small shield every few seconds
    const now = Date.now();
    if (now - this.lastShieldTime > 5000) {
      this.shieldStack = Math.min(3, this.shieldStack + 1);
      this.lastShieldTime = now;
    }
  }
}
