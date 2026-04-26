import { Shape } from './Shape';
import { ShapeStats, ShapeType } from '../types';

export class Polygon extends Shape {
  private moduleCount: number = 0;
  private activeModules: Set<string> = new Set();

  constructor(id: string, stats: ShapeStats) {
    super(id, 'polygon', stats);
    this.setCooldowns(5000, 6000);
  }

  protected executeSkill1(): void {
    // Form Shift - temporarily changes shape properties
    this.moduleCount += 2;
    this.activeModules.add('shift');
    setTimeout(() => {
      this.activeModules.delete('shift');
    }, 3000);
  }

  protected executeSkill2(): void {
    // Adapt Module - gains resistance to last damage type
    this.moduleCount += 2;
    this.activeModules.add('adapt');
    setTimeout(() => {
      this.activeModules.delete('adapt');
    }, 4000);
  }

  protected executeUltimate(): void {
    // Modular Form - activates all modules simultaneously
    this.moduleCount = 8;
    this.activeModules.add('shift');
    this.activeModules.add('adapt');
    this.activeModules.add('boost');
    setTimeout(() => {
      this.activeModules.clear();
    }, 6000);
  }

  protected applyPassive(): void {
    // Modular Design - slowly gains modules over time
    this.moduleCount = Math.min(10, this.moduleCount + 0.02);
  }

  getDamage(): number {
    let damage = super.getDamage();
    if (this.activeModules.has('boost')) {
      damage *= 1.3;
    }
    damage *= (1 + this.moduleCount * 0.05);
    this.moduleCount = Math.max(0, this.moduleCount - 0.3);
    return damage;
  }

  getDefense(): number {
    let defense = super.getDefense();
    if (this.activeModules.has('adapt')) {
      defense *= 1.4;
    }
    defense *= (1 + this.moduleCount * 0.03);
    return defense;
  }

  getSpeed(): number {
    let speed = super.getSpeed();
    if (this.activeModules.has('shift')) {
      speed *= 1.2;
    }
    speed *= (1 + this.moduleCount * 0.02);
    return speed;
  }

  getModuleCount(): number {
    return this.moduleCount;
  }
}
