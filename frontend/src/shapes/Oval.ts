import { Shape } from './Shape';

export class Oval extends Shape {
  constructor(id: string) {
    super(id, 'oval');
  }

  getSkill1Cooldown(): number {
    return 4000;
  }

  getSkill2Cooldown(): number {
    return 5000;
  }

  getPassiveEffect(): string {
    return 'Velocity Drift: Maintains speed after rebounds';
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
