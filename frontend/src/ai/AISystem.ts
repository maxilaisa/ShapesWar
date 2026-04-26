import { AIConfig, AIState, ShapeType } from '../types';
import { Shape } from '../shapes/Shape';

export class AISystem {
  private config: AIConfig;
  private currentState: AIState = 'neutral';
  private lastDecisionTime: number = 0;
  private decisionInterval: number = 100;

  constructor(config: AIConfig) {
    this.config = config;
  }

  updateConfig(config: AIConfig) {
    this.config = config;
  }

  decide(
    myShape: Shape,
    enemyPosition: { x: number; y: number },
    myPosition: { x: number; y: number },
    myVelocity: { x: number; y: number },
    enemyVelocity: { x: number; y: number },
    wallDistance: number
  ): { action: string; target: { x: number; y: number } } {
    const now = Date.now();
    if (now - this.lastDecisionTime < this.decisionInterval) {
      return { action: 'continue', target: myPosition };
    }
    this.lastDecisionTime = now;

    const distance = this.calculateDistance(myPosition, enemyPosition);
    const scores = this.calculateUtilityScores(
      distance,
      wallDistance,
      myShape,
      enemyVelocity,
      myVelocity
    );

    const bestAction = this.getBestAction(scores);
    this.currentState = this.determineState(bestAction, scores);

    const target = this.calculateTarget(
      bestAction,
      myPosition,
      enemyPosition,
      myVelocity
    );

    return { action: bestAction, target };
  }

  private calculateDistance(pos1: { x: number; y: number }, pos2: { x: number; y: number }): number {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
  }

  private calculateUtilityScores(
    distance: number,
    wallDistance: number,
    shape: Shape,
    enemyVelocity: { x: number; y: number },
    myVelocity: { x: number; y: number }
  ): Record<string, number> {
    const scores: Record<string, number> = {
      engage: 0,
      dodge: 0,
      bait: 0,
      skill1: 0,
      skill2: 0,
      ultimate: 0,
      disengage: 0
    };

    const enemySpeed = Math.sqrt(enemyVelocity.x ** 2 + enemyVelocity.y ** 2);
    const mySpeed = Math.sqrt(myVelocity.x ** 2 + myVelocity.y ** 2);

    // Aggression influence
    scores.engage += this.config.aggression * 2;
    scores.skill1 += this.config.aggression * 1.5;
    scores.skill2 += this.config.aggression * 1.5;

    // Mobility influence
    scores.dodge += this.config.mobility * 2;
    scores.disengage += this.config.mobility * 1.5;

    // Precision influence
    scores.skill1 += this.config.precision * 2;
    scores.skill2 += this.config.precision * 2;

    // Chaos influence
    scores.bait += this.config.chaos * 2;
    scores.engage += this.config.chaos * 0.5;

    // Greed influence
    scores.engage += this.config.greed * 1.5;
    scores.skill1 += this.config.greed * 1;

    // Fear influence
    scores.dodge += this.config.fear * 2;
    scores.disengage += this.config.fear * 2;

    // Revenge influence
    if (shape.getState().hp < 50) {
      scores.engage += this.config.revenge * 2;
      scores.skill1 += this.config.revenge * 1.5;
    }

    // Skill influence
    scores.skill1 += this.config.skill * 1.5;
    scores.skill2 += this.config.skill * 1.5;

    // Discipline influence
    if (this.currentState === 'combo') {
      scores.engage += this.config.discipline * 2;
      scores.dodge -= this.config.discipline;
    }

    // Distance-based modifiers
    if (distance < 100) {
      scores.engage += 3;
      scores.skill1 += 2;
      scores.dodge += 2;
    } else if (distance > 300) {
      scores.engage -= 2;
      scores.disengage += 2;
    }

    // Wall opportunity
    if (wallDistance < 150) {
      scores.engage += 2;
      scores.skill1 += 1.5;
    }

    // Enemy speed consideration
    if (enemySpeed > 10) {
      scores.dodge += 2;
      scores.bait += 1.5;
    }

    // Ultimate availability
    if (shape.getState().ultimateCharges >= 10) {
      scores.ultimate += 10;
    }

    // Cooldown consideration
    if (!shape.canUseSkill1()) {
      scores.skill1 = -100;
    }
    if (!shape.canUseSkill2()) {
      scores.skill2 = -100;
    }

    return scores;
  }

  private getBestAction(scores: Record<string, number>): string {
    let bestAction = 'engage';
    let bestScore = -Infinity;

    for (const [action, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        bestAction = action;
      }
    }

    return bestAction;
  }

  private determineState(action: string, scores: Record<string, number>): AIState {
    if (action === 'ultimate') return 'ultimate';
    if (scores.engage > 8) return 'pressure';
    if (scores.dodge > 8) return 'defensive';
    if (scores.skill1 > 6 || scores.skill2 > 6) return 'combo';
    if (scores.bait > 6) return 'punish';
    return 'neutral';
  }

  private calculateTarget(
    action: string,
    myPosition: { x: number; y: number },
    enemyPosition: { x: number; y: number },
    myVelocity: { x: number; y: number }
  ): { x: number; y: number } {
    switch (action) {
      case 'engage':
        return enemyPosition;
      case 'dodge':
        return {
          x: myPosition.x - myVelocity.x * 2,
          y: myPosition.y - myVelocity.y * 2
        };
      case 'bait':
        return {
          x: myPosition.x + (enemyPosition.x - myPosition.x) * 0.5,
          y: myPosition.y + (enemyPosition.y - myPosition.y) * 0.5
        };
      case 'disengage':
        return {
          x: myPosition.x - (enemyPosition.x - myPosition.x),
          y: myPosition.y - (enemyPosition.y - myPosition.y)
        };
      default:
        return enemyPosition;
    }
  }

  getCurrentState(): AIState {
    return this.currentState;
  }
}
