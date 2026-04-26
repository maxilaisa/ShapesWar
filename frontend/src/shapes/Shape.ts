import { ShapeType, HitType, FighterState, ShapeStats } from '../types';

export type { ShapeStats } from '../types';

export abstract class Shape {
  protected id: string;
  protected type: ShapeType;
  protected hp: number = 100;
  protected maxHp: number = 100;
  protected comboCount: number = 0;
  protected comboTimer: number | null = null;
  protected ultimateCharges: number = 0;
  protected maxUltimateCharges: number = 10;
  protected skill1Cooldown: number = 0;
  protected skill2Cooldown: number = 0;
  protected ultimateCooldown: number = 0;
  protected stats: ShapeStats;
  protected skill1CooldownMax: number = 4000;
  protected skill2CooldownMax: number = 5000;

  constructor(id: string, type: ShapeType, stats: ShapeStats) {
    this.id = id;
    this.type = type;
    this.stats = stats;
  }

  getState(): Partial<FighterState> {
    return {
      hp: this.hp,
      comboCount: this.comboCount,
      ultimateCharges: this.ultimateCharges,
      isStunned: false
    };
  }

  takeDamage(amount: number): void {
    const defenseMultiplier = this.stats.def / 100;
    const actualDamage = amount * (1 - (defenseMultiplier - 1) * 0.5);
    this.hp = Math.max(0, this.hp - actualDamage);
  }

  addUltimateCharge(hitType: HitType): void {
    const chargeAmount = hitType === 'wall' ? 1 : hitType === 'enemy' ? 2 : 3;
    this.ultimateCharges = Math.min(this.maxUltimateCharges, this.ultimateCharges + chargeAmount);
  }

  incrementCombo(): void {
    this.comboCount++;
    if (this.comboTimer) {
      clearTimeout(this.comboTimer);
    }
    this.comboTimer = setTimeout(() => {
      this.comboCount = 0;
    }, 2500);
  }

  canUseSkill1(): boolean {
    return this.skill1Cooldown <= 0;
  }

  canUseSkill2(): boolean {
    return this.skill2Cooldown <= 0;
  }

  canUseUltimate(): boolean {
    return this.ultimateCharges >= this.maxUltimateCharges && this.ultimateCooldown <= 0;
  }

  useSkill1(): void {
    if (!this.canUseSkill1()) return;
    this.skill1Cooldown = this.skill1CooldownMax;
    this.executeSkill1();
  }

  useSkill2(): void {
    if (!this.canUseSkill2()) return;
    this.skill2Cooldown = this.skill2CooldownMax;
    this.executeSkill2();
  }

  useUltimate(): void {
    if (!this.canUseUltimate()) return;
    this.ultimateCharges = 0;
    this.ultimateCooldown = 15000;
    this.executeUltimate();
  }

  updateCooldowns(deltaTime: number): void {
    this.skill1Cooldown = Math.max(0, this.skill1Cooldown - deltaTime);
    this.skill2Cooldown = Math.max(0, this.skill2Cooldown - deltaTime);
    this.ultimateCooldown = Math.max(0, this.ultimateCooldown - deltaTime);
  }

  update(deltaTime: number): void {
    this.updateCooldowns(deltaTime);
    this.applyPassive();
  }

  getDamage(): number {
    let damage = 10 * (this.stats.dmg / 100);
    if (this.comboCount > 0) {
      damage *= (1 + this.comboCount * 0.1);
    }
    return Math.min(damage, 10 * (this.stats.dmg / 100) * 2);
  }

  getSpeed(): number {
    return this.stats.spd / 100;
  }

  getDefense(): number {
    return this.stats.def / 100;
  }

  setCooldowns(skill1: number, skill2: number) {
    this.skill1CooldownMax = skill1;
    this.skill2CooldownMax = skill2;
  }

  protected abstract executeSkill1(): void;
  protected abstract executeSkill2(): void;
  protected abstract executeUltimate(): void;
  protected abstract applyPassive(): void;
}
