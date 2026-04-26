import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Star extends Shape {
  private berserkMode: boolean = false;
  private rageStack: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'star', stats);
    this.setCooldowns(4000, 6000);
  }

  protected executeSkill1(): void {
    // Star Impact - heavy forward smash
    this.rageStack += 2;
  }

  protected executeSkill2(): void {
    // Nova Spin - spins violently damaging nearby enemies
    this.rageStack += 3;
  }

  protected executeUltimate(): void {
    // Burst Chain Mode - huge speed and damage boost with combo extension
    this.berserkMode = true;
    this.rageStack = 10;
    setTimeout(() => {
      this.berserkMode = false;
    }, 5000);
  }

  protected applyPassive(): void {
    // Spike Contact - extra damage on every collision
    // Applied in getDamage()
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.rageStack * 0.1);
    if (this.berserkMode) {
      damage *= 1.5;
    }
    this.rageStack = Math.max(0, this.rageStack - 0.5);
    return damage;
  }
}
