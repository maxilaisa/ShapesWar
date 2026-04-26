import { Shape } from './Shape';

export class Square extends Shape {
  constructor(id: string) {
    super(id, 'square');
  }

  getSkill1Cooldown(): number {
    return 5000;
  }

  getSkill2Cooldown(): number {
    return 7000;
  }

  getPassiveEffect(): string {
    return 'Heavy Body: Reduced knockback';
  }

  getKnockbackReduction(): number {
    return 0.3;
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
