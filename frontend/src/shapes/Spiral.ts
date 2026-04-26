import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Spiral extends Shape {
  private chaosLevel: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'spiral', stats);
    this.setCooldowns(5000, 6000);
  }

  protected executeSkill1(): void {
    // Vortex Pull - pulls nearby enemy toward Spiral
    this.chaosLevel = 3;
  }

  protected executeSkill2(): void {
    // Spiral Shift - sudden sideways movement warp
    this.chaosLevel = 4;
  }

  protected executeUltimate(): void {
    // Gravity Collapse - creates pull zone dragging enemy into repeated impacts
    this.chaosLevel = 6;
  }

  protected applyPassive(): void {
    // Spin Redirect - when hit, trajectory may curve unpredictably
    // This is handled by the physics engine checking chaosLevel
  }

  getChaosLevel(): number {
    return this.chaosLevel;
  }

  reduceChaos(): void {
    this.chaosLevel = Math.max(0, this.chaosLevel - 0.5);
  }
}
