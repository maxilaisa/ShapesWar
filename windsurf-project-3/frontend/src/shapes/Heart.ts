import { Shape } from './Shape';
import { ShapeType } from '../types';

export class Heart extends Shape {
  private lastEngagementTime: number = 0;

  constructor(id: string) {
    super(id, 'heart');
  }

  getSkill1Cooldown(): number {
    return 5000;
  }

  getSkill2Cooldown(): number {
    return 6000;
  }

  getPassiveEffect(): string {
    return 'Recovery Pulse: Regens slowly while disengaged';
  }

  updateRecovery(): void {
    const now = Date.now();
    if (now - this.lastEngagementTime > 3000) {
      this.hp = Math.min(100, this.hp + 0.1);
    }
  }

  engage(): void {
    this.lastEngagementTime = Date.now();
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
