import { Shape } from './Shape';

export class Circle extends Shape {
  private momentumStack: number = 0;

  constructor(id: string) {
    super(id, 'circle');
  }

  getSkill1Cooldown(): number {
    return 4000;
  }

  getSkill2Cooldown(): number {
    return 6000;
  }

  getPassiveEffect(): string {
    return 'Momentum Build: Each rebound adds 5% force to next collision (stacks up to 3)';
  }

  addMomentum(): void {
    this.momentumStack = Math.min(3, this.momentumStack + 1);
  }

  getMomentumBonus(): number {
    const bonus = this.momentumStack * 0.05;
    this.momentumStack = 0;
    return bonus;
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
