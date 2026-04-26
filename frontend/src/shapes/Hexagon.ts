import { Shape } from './Shape';

export class Hexagon extends Shape {
  private recentHits: number[] = [];

  constructor(id: string) {
    super(id, 'hexagon');
  }

  getSkill1Cooldown(): number {
    return 5000;
  }

  getSkill2Cooldown(): number {
    return 6000;
  }

  getPassiveEffect(): string {
    return 'Honeycomb Guard: Repeated hits do reduced knockback';
  }

  getKnockbackMultiplier(): number {
    const now = Date.now();
    this.recentHits = this.recentHits.filter(time => now - time < 2000);
    const multiplier = Math.max(0.5, 1 - (this.recentHits.length * 0.1));
    this.recentHits.push(now);
    return multiplier;
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
