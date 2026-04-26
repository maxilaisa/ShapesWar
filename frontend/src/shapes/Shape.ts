import { AIConfig, HitType } from '../types';

export abstract class Shape {
  protected id: string;
  protected type: string;
  protected hp: number = 100;
  protected ultimateCharges: number = 0;
  protected comboCount: number = 0;
  protected lastHitTime: number = 0;
  protected skillCooldowns: {
    skill1: number;
    skill2: number;
    ultimate: number;
  } = { skill1: 0, skill2: 0, ultimate: 0 };

  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
  }

  abstract getSkill1Cooldown(): number;
  abstract getSkill2Cooldown(): number;
  abstract getPassiveEffect(): string;

  getState() {
    return {
      hp: this.hp,
      ultimateCharges: this.ultimateCharges,
      comboCount: this.comboCount,
      skillCooldowns: { ...this.skillCooldowns }
    };
  }

  takeDamage(damage: number) {
    this.hp = Math.max(0, this.hp - damage);
  }

  addUltimateCharge(hitType: HitType) {
    let charge = 0;
    switch (hitType) {
      case 'light':
        charge = 1;
        break;
      case 'clean':
        charge = 2;
        break;
      case 'wall_combo':
        charge = 3;
        break;
      case 'counter':
        charge = 4;
        break;
    }
    this.ultimateCharges = Math.min(10, this.ultimateCharges + charge);
  }

  incrementCombo() {
    const now = Date.now();
    if (now - this.lastHitTime < 2500) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastHitTime = now;
  }

  resetCombo() {
    const now = Date.now();
    if (now - this.lastHitTime > 2500) {
      this.comboCount = 0;
    }
  }

  canUseSkill1(): boolean {
    return Date.now() >= this.skillCooldowns.skill1;
  }

  canUseSkill2(): boolean {
    return Date.now() >= this.skillCooldowns.skill2;
  }

  canUseUltimate(): boolean {
    return this.ultimateCharges >= 10;
  }

  useSkill1(): void {
    this.skillCooldowns.skill1 = Date.now() + this.getSkill1Cooldown();
  }

  useSkill2(): void {
    this.skillCooldowns.skill2 = Date.now() + this.getSkill2Cooldown();
  }

  useUltimate(): void {
    this.ultimateCharges = 0;
    this.skillCooldowns.ultimate = 0;
  }

  updateCooldowns(deltaTime: number) {
    this.skillCooldowns.skill1 = Math.max(0, this.skillCooldowns.skill1 - deltaTime);
    this.skillCooldowns.skill2 = Math.max(0, this.skillCooldowns.skill2 - deltaTime);
    this.skillCooldowns.ultimate = Math.max(0, this.skillCooldowns.ultimate - deltaTime);
  }
}
