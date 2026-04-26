import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Dodecahedron extends Shape {
  private adaptationLevel: number = 0;
  private perfectForm: boolean = false;
  private enemyPatterns: Map<string, number> = new Map();

  constructor(id: string, stats: ShapeStats) {
    super(id, 'dodecahedron', stats);
    this.setCooldowns(5000, 7000);
  }

  protected executeSkill1(): void {
    // Geometry Lock - briefly restricts enemy movement options
    this.adaptationLevel += 2;
  }

  protected executeSkill2(): void {
    // Pattern Read - predictive dodge window increases evasion
    this.adaptationLevel += 3;
  }

  protected executeUltimate(): void {
    // Perfect Form - boosts all stats and AI reactions temporarily
    this.perfectForm = true;
    this.adaptationLevel = 10;
    setTimeout(() => {
      this.perfectForm = false;
    }, 6000);
  }

  protected applyPassive(): void {
    // Adaptive Logic - learns opponent patterns, gains small bonuses over time
    this.adaptationLevel = Math.min(10, this.adaptationLevel + 0.01);
  }

  recordEnemyPattern(pattern: string): void {
    const count = this.enemyPatterns.get(pattern) || 0;
    this.enemyPatterns.set(pattern, count + 1);
    if (count > 5) {
      this.adaptationLevel += 0.5;
    }
  }
}
