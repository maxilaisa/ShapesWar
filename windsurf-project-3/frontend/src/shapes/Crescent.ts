import { Shape } from './Shape';
import { ShapeType } from '../types';

export class Crescent extends Shape {
  constructor(id: string) {
    super(id, 'crescent');
  }

  getSkill1Cooldown(): number {
    return 5000;
  }

  getSkill2Cooldown(): number {
    return 5000;
  }

  getPassiveEffect(): string {
    return 'Curve Slash: Curved contact redirects enemies';
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
