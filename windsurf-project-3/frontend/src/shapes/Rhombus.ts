import { Shape } from './Shape';
import { ShapeType } from '../types';

export class Rhombus extends Shape {
  constructor(id: string) {
    super(id, 'rhombus');
  }

  getSkill1Cooldown(): number {
    return 4000;
  }

  getSkill2Cooldown(): number {
    return 5000;
  }

  getPassiveEffect(): string {
    return 'Mirror Reflex: Counters gain bonus knockback';
  }

  getCounterBonus(): number {
    return 1.5;
  }

  useSkill1(): void {
    this.skillCooldowns.skill1 = this.getSkill1Cooldown();
  }

  useSkill2(): void {
    this.skillCooldowns.skill2 = this.getSkill2Cooldown();
  }

  useUltimate(): void {
    this.skillCooldowns.ultimate = 0;
  }
}
