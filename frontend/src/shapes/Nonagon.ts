import { Shape } from './Shape';
import { ShapeStats, ShapeType } from '../types';

export class Nonagon extends Shape {
  private mirageStack: number = 0;
  private lastMirageTime: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'nonagon', stats);
    this.setCooldowns(4500, 5500);
  }

  protected executeSkill1(): void {
    // Phantom Dash - leaves a decoy that moves briefly
    this.mirageStack += 3;
  }

  protected executeSkill2(): void {
    // Illusion Step - appears to dash but stays in place
    this.mirageStack += 2;
  }

  protected executeUltimate(): void {
    // Mirage Logic - creates multiple decoys that confuse enemy AI
    this.mirageStack += 6;
  }

  protected applyPassive(): void {
    // Ghostly Presence - chance to dodge attacks based on mirageStack
    const now = Date.now();
    if (now - this.lastMirageTime > 4000) {
      this.mirageStack = Math.min(5, this.mirageStack + 1);
      this.lastMirageTime = now;
    }
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.mirageStack * 0.08);
    this.mirageStack = Math.max(0, this.mirageStack - 0.4);
    return damage;
  }

  getSpeed(): number {
    let speed = super.getSpeed();
    speed *= (1 + this.mirageStack * 0.05);
    return speed;
  }

  getMirageStack(): number {
    return this.mirageStack;
  }
}
