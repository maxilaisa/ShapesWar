import { AIConfig, AIState, ShapeType } from '../types';

export interface AISensorData {
  enemyDistance: number;
  enemyVelocity: { x: number; y: number };
  enemyHP: number;
  myHP: number;
  myVelocity: { x: number; y: number };
  wallProximity: number;
  comboCount: number;
  ultimateCharges: number;
  skill1Ready: boolean;
  skill2Ready: boolean;
  ultimateReady: boolean;
}

export type AIAction = 
  | 'attack' 
  | 'chase' 
  | 'dodge' 
  | 'bait' 
  | 'retreat' 
  | 'skill1' 
  | 'skill2' 
  | 'ultimate' 
  | 'combo_extend';

export class AISystem {
  private config: AIConfig;
  private state: AIState = 'neutral';
  private behaviorDrift: number;
  private lastAction: AIAction = 'attack';
  private actionHistory: AIAction[] = [];

  constructor(config: AIConfig) {
    this.config = { ...config };
    this.behaviorDrift = (Math.random() - 0.5) * 0.1;
  }

  private applyDrift(value: number): number {
    return Math.max(0, Math.min(10, value * (1 + this.behaviorDrift)));
  }

  private getEffectiveConfig(): AIConfig {
    return {
      aggression: this.applyDrift(this.config.aggression),
      mobility: this.applyDrift(this.config.mobility),
      precision: this.applyDrift(this.config.precision),
      chaos: this.applyDrift(this.config.chaos),
      greed: this.applyDrift(this.config.greed),
      fear: this.applyDrift(this.config.fear),
      revenge: this.applyDrift(this.config.revenge),
      skill: this.applyDrift(this.config.skill),
      discipline: this.applyDrift(this.config.discipline)
    };
  }

  decide(sensorData: AISensorData): AIAction {
    const cfg = this.getEffectiveConfig();
    this.updateState(sensorData, cfg);

    const actions: { action: AIAction; score: number }[] = [
      { action: 'attack', score: this.scoreAttack(sensorData, cfg) },
      { action: 'chase', score: this.scoreChase(sensorData, cfg) },
      { action: 'dodge', score: this.scoreDodge(sensorData, cfg) },
      { action: 'bait', score: this.scoreBait(sensorData, cfg) },
      { action: 'retreat', score: this.scoreRetreat(sensorData, cfg) },
      { action: 'skill1', score: this.scoreSkill1(sensorData, cfg) },
      { action: 'skill2', score: this.scoreSkill2(sensorData, cfg) },
      { action: 'ultimate', score: this.scoreUltimate(sensorData, cfg) },
      { action: 'combo_extend', score: this.scoreComboExtend(sensorData, cfg) }
    ];

    const bestAction = actions.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    this.lastAction = bestAction.action;
    this.actionHistory.push(bestAction.action);
    if (this.actionHistory.length > 5) {
      this.actionHistory.shift();
    }

    return bestAction.action;
  }

  private updateState(sensorData: AISensorData, cfg: AIConfig) {
    const hpRatio = sensorData.myHP / 100;
    const enemyHpRatio = sensorData.enemyHP / 100;

    if (sensorData.ultimateReady) {
      this.state = 'ultimate';
    } else if (sensorData.comboCount > 2) {
      this.state = 'combo';
    } else if (hpRatio < 0.3 && cfg.fear > 5) {
      this.state = 'defensive';
    } else if (enemyHpRatio < 0.3 && cfg.aggression > 7) {
      this.state = 'pressure';
    } else if (sensorData.enemyDistance < 100 && cfg.revenge > 6) {
      this.state = 'punish';
    } else {
      this.state = 'neutral';
    }
  }

  private scoreAttack(sensorData: AISensorData, cfg: AIConfig): number {
    let score = cfg.aggression * 2;
    
    if (sensorData.enemyDistance < 150) score += cfg.precision * 1.5;
    if (sensorData.myHP > sensorData.enemyHP) score += cfg.greed;
    if (this.state === 'pressure') score += 5;
    if (this.state === 'combo') score += 3;
    
    if (sensorData.myHP < 30) score -= cfg.fear * 2;
    if (sensorData.wallProximity < 50) score -= 3;
    
    return score;
  }

  private scoreChase(sensorData: AISensorData, cfg: AIConfig): number {
    let score = cfg.mobility * 1.5;
    
    if (sensorData.enemyDistance > 200) score += cfg.aggression;
    if (sensorData.myHP > sensorData.enemyHP) score += cfg.greed;
    if (this.state === 'pressure') score += 4;
    
    if (sensorData.myHP < 40) score -= cfg.fear * 2;
    
    return score;
  }

  private scoreDodge(sensorData: AISensorData, cfg: AIConfig): number {
    let score = cfg.mobility * 1.2;
    
    if (sensorData.enemyDistance < 100) score += cfg.precision;
    if (sensorData.myHP < 50) score += cfg.fear * 2;
    if (this.state === 'defensive') score += 5;
    if (this.state === 'punish') score += 3;
    
    if (sensorData.wallProximity < 50) score -= 4;
    
    return score;
  }

  private scoreBait(sensorData: AISensorData, cfg: AIConfig): number {
    let score = cfg.chaos * 1.5;
    
    if (sensorData.enemyDistance > 150) score += cfg.precision;
    if (sensorData.comboCount === 0) score += cfg.discipline;
    if (this.state === 'punish') score += 4;
    
    if (sensorData.myHP < 30) score -= cfg.fear * 2;
    
    return score;
  }

  private scoreRetreat(sensorData: AISensorData, cfg: AIConfig): number {
    let score = cfg.fear * 2;
    
    if (sensorData.myHP < 30) score += 5;
    if (sensorData.enemyDistance < 80) score += cfg.precision;
    if (this.state === 'defensive') score += 4;
    
    if (sensorData.myHP > 70) score -= cfg.aggression * 2;
    if (sensorData.wallProximity < 50) score -= 5;
    
    return score;
  }

  private scoreSkill1(sensorData: AISensorData, cfg: AIConfig): number {
    if (!sensorData.skill1Ready) return -100;
    
    let score = cfg.skill * 1.5;
    
    if (sensorData.enemyDistance < 150) score += cfg.precision;
    if (this.state === 'combo') score += 4;
    if (this.state === 'pressure') score += 3;
    
    if (sensorData.myHP < 20) score -= cfg.fear;
    
    return score;
  }

  private scoreSkill2(sensorData: AISensorData, cfg: AIConfig): number {
    if (!sensorData.skill2Ready) return -100;
    
    let score = cfg.skill * 1.3;
    
    if (sensorData.enemyDistance < 200) score += cfg.precision;
    if (this.state === 'punish') score += 4;
    if (this.state === 'combo') score += 3;
    
    if (sensorData.myHP < 20) score -= cfg.fear;
    
    return score;
  }

  private scoreUltimate(sensorData: AISensorData, cfg: AIConfig): number {
    if (!sensorData.ultimateReady) return -100;
    
    let score = cfg.skill * 2;
    
    if (sensorData.myHP < 30) score += 5;
    if (sensorData.enemyHP < 30) score += cfg.greed * 2;
    if (sensorData.comboCount > 3) score += 4;
    
    if (sensorData.enemyDistance > 300) score -= 3;
    
    return score;
  }

  private scoreComboExtend(sensorData: AISensorData, cfg: AIConfig): number {
    if (sensorData.comboCount < 2) return -50;
    
    let score = cfg.discipline * 1.5;
    
    if (sensorData.comboCount > 4) score += 3;
    if (sensorData.enemyDistance < 100) score += cfg.precision;
    if (this.state === 'combo') score += 5;
    
    if (sensorData.wallProximity < 50) score -= 4;
    
    return score;
  }

  getState(): AIState {
    return this.state;
  }

  getActionTarget(action: AIAction, myPos: { x: number; y: number }, enemyPos: { x: number; y: number }): { x: number; y: number } {
    const dx = enemyPos.x - myPos.x;
    const dy = enemyPos.y - myPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    switch (action) {
      case 'attack':
      case 'chase':
        return { x: enemyPos.x, y: enemyPos.y };
      case 'dodge':
        return { 
          x: myPos.x - normalizedDy * 100, 
          y: myPos.y + normalizedDx * 100 
        };
      case 'retreat':
        return { 
          x: myPos.x - normalizedDx * 150, 
          y: myPos.y - normalizedDy * 150 
        };
      case 'bait':
        return { 
          x: myPos.x + normalizedDx * 50, 
          y: myPos.y + normalizedDy * 50 
        };
      default:
        return { x: enemyPos.x, y: enemyPos.y };
    }
  }
}
