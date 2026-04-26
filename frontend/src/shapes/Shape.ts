import { ShapeType, HitType, FighterState, ShapeStats, WeaponConfig, SkillConfig, VisualEffectType } from '../types';

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
  protected weapon: WeaponConfig;
  protected skill1Config: SkillConfig;
  protected skill2Config: SkillConfig;
  protected ultimateConfig: SkillConfig;
  protected activeEffects: VisualEffectType[] = [];
  protected passiveActive: boolean = true;
  protected isUltimateActive: boolean = false;

  constructor(id: string, type: ShapeType, stats: ShapeStats, weapon: WeaponConfig, skill1Config: SkillConfig, skill2Config: SkillConfig, ultimateConfig: SkillConfig) {
    this.id = id;
    this.type = type;
    this.stats = stats;
    this.weapon = weapon;
    this.skill1Config = skill1Config;
    this.skill2Config = skill2Config;
    this.ultimateConfig = ultimateConfig;
    this.skill1CooldownMax = skill1Config.cooldown;
    this.skill2CooldownMax = skill2Config.cooldown;
  }

  getState(): Partial<FighterState> {
    return {
      hp: this.hp,
      comboCount: this.comboCount,
      ultimateCharges: this.ultimateCharges,
      isStunned: false,
      activeWeapon: this.weapon.type,
      activeEffects: this.activeEffects,
      passiveActive: this.passiveActive
    };
  }

  getWeapon(): WeaponConfig {
    return this.weapon;
  }

  getSkill1Config(): SkillConfig {
    return this.skill1Config;
  }

  getSkill2Config(): SkillConfig {
    return this.skill2Config;
  }

  getUltimateConfig(): SkillConfig {
    return this.ultimateConfig;
  }

  addVisualEffect(effect: VisualEffectType): void {
    if (!this.activeEffects.includes(effect)) {
      this.activeEffects.push(effect);
    }
  }

  removeVisualEffect(effect: VisualEffectType): void {
    const index = this.activeEffects.indexOf(effect);
    if (index > -1) {
      this.activeEffects.splice(index, 1);
    }
  }

  clearVisualEffects(): void {
    this.activeEffects = [];
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
    this.skill1Config.visualEffects.forEach(effect => this.addVisualEffect(effect));
    this.executeSkill1();
  }

  useSkill2(): void {
    if (!this.canUseSkill2()) return;
    this.skill2Cooldown = this.skill2CooldownMax;
    this.skill2Config.visualEffects.forEach(effect => this.addVisualEffect(effect));
    this.executeSkill2();
  }

  useUltimate(): void {
    if (!this.canUseUltimate()) return;
    this.ultimateCharges = 0;
    this.ultimateCooldown = 15000;
    this.isUltimateActive = true;
    this.ultimateConfig.visualEffects.forEach(effect => this.addVisualEffect(effect));
    this.executeUltimate();
    setTimeout(() => {
      this.isUltimateActive = false;
      this.ultimateConfig.visualEffects.forEach(effect => this.removeVisualEffect(effect));
    }, 5000);
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

  protected abstract executeSkill1(): void;
  protected abstract executeSkill2(): void;
  protected abstract executeUltimate(): void;
  protected abstract applyPassive(): void;
}
