import { Shape } from './Shape';
import { ShapeType } from '../types';

export class Diamond extends Shape {
  constructor(id: string) {
    super(id, 'diamond');
  }

  getSkill1Cooldown(): number {
    return 4000;
  }

  getSkill2Cooldown(): number {
    return 5000;
  }

  getPassiveEffect(): string {
    return 'Critical Angles: Precision-based bonus damage';
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
