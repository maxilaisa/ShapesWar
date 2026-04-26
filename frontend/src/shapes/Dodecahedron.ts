import { Shape } from './Shape';
import { ShapeType } from '../types';

export class Dodecahedron extends Shape {
  private enemyPatterns: Map<string, number[]> = new Map();

  constructor(id: string) {
    super(id, 'dodecahedron');
  }

  getSkill1Cooldown(): number {
    return 5000;
  }

  getSkill2Cooldown(): number {
    return 7000;
  }

  getPassiveEffect(): string {
    return 'Adaptive Logic: Learns repeated enemy patterns';
  }

  recordPattern(enemyId: string, action: number): void {
    if (!this.enemyPatterns.has(enemyId)) {
      this.enemyPatterns.set(enemyId, []);
    }
    const patterns = this.enemyPatterns.get(enemyId)!;
    patterns.push(action);
    if (patterns.length > 10) {
      patterns.shift();
    }
  }

  predictPattern(enemyId: string): number | null {
    const patterns = this.enemyPatterns.get(enemyId);
    if (!patterns || patterns.length < 3) return null;
    
    const lastAction = patterns[patterns.length - 1];
    const count = patterns.filter(a => a === lastAction).length;
    return count > 2 ? lastAction : null;
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
