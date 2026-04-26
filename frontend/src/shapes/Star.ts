import { Shape } from './Shape';
import { ShapeType } from '../types';

export class Star extends Shape {
  constructor(id: string) {
    super(id, 'star');
  }

  getSkill1Cooldown(): number {
    return 4000;
  }

  getSkill2Cooldown(): number {
    return 6000;
  }

  getPassiveEffect(): string {
    return 'Spike Contact: Some impacts multi-hit';
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
