import { Shape } from './Shape';

export class Spiral extends Shape {
  constructor(id: string) {
    super(id, 'spiral');
  }

  getSkill1Cooldown(): number {
    return 5000;
  }

  getSkill2Cooldown(): number {
    return 6000;
  }

  getPassiveEffect(): string {
    return 'Spin Redirect: Slightly alters rebound vectors';
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
