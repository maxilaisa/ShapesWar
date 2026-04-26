import { ShapeType, AIState } from '../types';

export abstract class Shape {
  protected id: string;
  protected shapeType: ShapeType;
  protected hp: number = 100;
  protected ultimateCharges: number = 0;
  protected isUltimateActive: boolean = false;
  protected comboCount: number = 0;
  protected lastHitTime: number = 0;
  protected aiState: AIState = 'neutral';
  protected skillCooldowns: {
    skill1: number;
    skill2: number;
    ultimate: number;
  } = { skill1: 0, skill2: 0, ultimate: 0 };

  constructor(id: string, shapeType: ShapeType) {
    this.id = id;
    this.shapeType = shapeType;
  }

  abstract getSkill1Cooldown(): number;
  abstract getSkill2Cooldown(): number;
  abstract useSkill1(): void;
  abstract useSkill2(): void;
  abstract useUltimate(): void;
  abstract getPassiveEffect(): string;

  takeDamage(damage: number): void {
    this.hp = Math.max(0, this.hp - damage);
  }

  addUltimateCharge(hitType: 'light' | 'clean' | 'wall_combo' | 'counter'): void {
    const chargeMap = {
      light: 1,
      clean: 2,
      wall_combo: 3,
      counter: 4
    };
    this.ultimateCharges = Math.min(10, this.ultimateCharges + chargeMap[hitType]);
  }

  activateUltimate(): void {
    if (this.ultimateCharges >= 10 && !this.isUltimateActive) {
      this.isUltimateActive = true;
      this.ultimateCharges = 0;
      this.useUltimate();
      setTimeout(() => {
        this.isUltimateActive = false;
      }, 8000);
    }
  }

  addCombo(): void {
    const now = Date.now();
    if (now - this.lastHitTime < 2500) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastHitTime = now;
  }

  updateCooldowns(deltaTime: number): void {
    this.skillCooldowns.skill1 = Math.max(0, this.skillCooldowns.skill1 - deltaTime);
    this.skillCooldowns.skill2 = Math.max(0, this.skillCooldowns.skill2 - deltaTime);
    this.skillCooldowns.ultimate = Math.max(0, this.skillCooldowns.ultimate - deltaTime);
  }

  canUseSkill1(): boolean {
    return this.skillCooldowns.skill1 <= 0;
  }

  canUseSkill2(): boolean {
    return this.skillCooldowns.skill2 <= 0;
  }

  getState() {
    return {
      id: this.id,
      shapeType: this.shapeType,
      hp: this.hp,
      ultimateCharges: this.ultimateCharges,
      isUltimateActive: this.isUltimateActive,
      comboCount: this.comboCount,
      lastHitTime: this.lastHitTime,
      aiState: this.aiState,
      skillCooldowns: { ...this.skillCooldowns }
    };
  }
}
