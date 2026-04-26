import { Shape, ShapeStats } from './Shape';
import { ShapeType } from '../types';

export class Triangle extends Shape {
  private critCharge: number = 0;

  constructor(id: string, stats: ShapeStats) {
    super(id, 'triangle', stats);
    this.setCooldowns(4000, 5000);
  }

  protected executeSkill1(): void {
    // Piercing Dash - very fast straight dash that punches through enemy
    this.critCharge = 3;
  }

  protected executeSkill2(): void {
    // Edge Step - short dodge step followed by counter strike
    this.critCharge = 2;
  }

  protected executeUltimate(): void {
    // Perfect Edge - three ultra-fast precision dashes with high crit chance
    this.critCharge = 5;
  }

  protected applyPassive(): void {
    // Critical Edge - sharp clean-angle hits deal bonus damage
    // Applied in getDamage()
  }

  getDamage(): number {
    let damage = super.getDamage();
    if (this.critCharge > 0) {
      damage *= 1.5;
      this.critCharge--;
    }
    return damage;
  }
}
