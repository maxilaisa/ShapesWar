import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Diamond extends Shape {
  private precisionStack: number = 0;
  private lockedOn: boolean = false;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'diamond', stats);
    this.setCooldowns(4000, 5000);
  }

  protected executeSkill1(): void {
    // Prism Strike - fast direct lunge
    this.precisionStack = 3;
  }

  protected executeSkill2(): void {
    // Refraction Step - short blink dodge
    this.precisionStack = 2;
  }

  protected executeUltimate(): void {
    // Precision Lock - auto-target burst sequence with perfect tracking
    this.lockedOn = true;
    this.precisionStack = 5;
    setTimeout(() => {
      this.lockedOn = false;
    }, 4000);
  }

  protected applyPassive(): void {
    // Critical Angles - side-angle hits gain bonus damage
    // Applied in getDamage() based on precisionStack
  }

  getDamage(): number {
    let damage = super.getDamage();
    damage *= (1 + this.precisionStack * 0.12);
    if (this.lockedOn) {
      damage *= 1.4;
    }
    this.precisionStack = Math.max(0, this.precisionStack - 0.3);
    return damage;
  }

  isLockedOn(): boolean {
    return this.lockedOn;
  }
}
