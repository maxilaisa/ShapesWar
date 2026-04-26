import Matter from 'matter-js';
import { ShapeType, CollisionEvent } from '../types';

export class PhysicsEngine {
  private engine: Matter.Engine;
  private fighters: Map<string, Matter.Body> = new Map();
  private onCollision: ((event: CollisionEvent) => void) | null = null;
  private gravityWells: Map<string, { x: number; y: number; strength: number; radius: number; duration: number }> = new Map();
  private barriers: Map<string, Matter.Body> = new Map();

  constructor() {
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }
    });
  }

  initialize(width: number, height: number) {
    this.createWalls(width, height);
    this.setupCollisionHandling();
  }

  private createWalls(width: number, height: number) {
    const wallThickness = 50;
    const walls = [
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true, label: 'wall' }),
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, label: 'wall' }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true, label: 'wall' }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true, label: 'wall' })
    ];
    
    Matter.Composite.add(this.engine.world, walls);
  }

  private setupCollisionHandling() {
    Matter.Events.on(this.engine, 'collisionStart', (event: Matter.IEventCollision<Matter.Engine>) => {
      event.pairs.forEach((pair: Matter.Pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        const fighterAId = bodyA.label;
        const fighterBId = bodyB.label;

        if (fighterAId && fighterBId && fighterAId !== 'wall' && fighterBId !== 'wall') {
          this.handleFighterCollision(fighterAId, fighterBId);
        } else if ((fighterAId && fighterAId !== 'wall') || (fighterBId && fighterBId !== 'wall')) {
          this.handleWallCollision(fighterAId || fighterBId);
        }
      });
    });
  }

  private handleFighterCollision(id1: string, id2: string) {
    const velocity1 = this.fighters.get(id1)?.velocity || { x: 0, y: 0 };
    const velocity2 = this.fighters.get(id2)?.velocity || { x: 0, y: 0 };
    
    const relativeVelocity = Math.sqrt(
      Math.pow(velocity1.x - velocity2.x, 2) + 
      Math.pow(velocity1.y - velocity2.y, 2)
    );

    const baseDamage = Math.min(relativeVelocity * 0.5, 20);
    const hitType = this.determineHitType(relativeVelocity);

    if (this.onCollision) {
      this.onCollision({
        fighterId: id1,
        hitType,
        damage: baseDamage,
        knockback: { x: velocity2.x * 0.3, y: velocity2.y * 0.3 },
        timestamp: Date.now()
      });

      this.onCollision({
        fighterId: id2,
        hitType,
        damage: baseDamage,
        knockback: { x: velocity1.x * 0.3, y: velocity1.y * 0.3 },
        timestamp: Date.now()
      });
    }
  }

  private handleWallCollision(fighterId: string) {
    const body = this.fighters.get(fighterId);
    if (!body) return;

    const velocity = body.velocity;
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

    if (speed > 5) {
      if (this.onCollision) {
        this.onCollision({
          fighterId,
          hitType: 'wall_combo',
          damage: speed * 0.3,
          knockback: { x: -velocity.x * 0.5, y: -velocity.y * 0.5 },
          timestamp: Date.now()
        });
      }
    }
  }

  private determineHitType(velocity: number): 'light' | 'clean' | 'wall_combo' | 'counter' {
    if (velocity > 15) return 'clean';
    if (velocity > 8) return 'light';
    return 'light';
  }

  createFighter(
    id: string,
    shapeType: ShapeType,
    x: number,
    y: number,
    radius: number = 30
  ): Matter.Body {
    let body: Matter.Body;

    switch (shapeType) {
      case 'circle':
        body = Matter.Bodies.circle(x, y, radius, { label: id });
        break;
      case 'triangle':
        body = Matter.Bodies.polygon(x, y, 3, radius, { label: id });
        break;
      case 'square':
        body = Matter.Bodies.rectangle(x, y, radius * 2, radius * 2, { label: id });
        break;
      case 'oval':
        body = Matter.Bodies.circle(x, y, radius, { label: id });
        break;
      case 'hexagon':
        body = Matter.Bodies.polygon(x, y, 6, radius, { label: id });
        break;
      case 'rhombus':
        body = Matter.Bodies.polygon(x, y, 4, radius, { label: id, angle: Math.PI / 4 });
        break;
      case 'star':
        body = Matter.Bodies.polygon(x, y, 5, radius, { label: id });
        break;
      case 'diamond':
        body = Matter.Bodies.polygon(x, y, 4, radius, { label: id });
        break;
      default:
        body = Matter.Bodies.circle(x, y, radius, { label: id });
    }

    body.friction = 0;
    body.frictionAir = 0;
    body.restitution = 1.0;
    body.mass = 10;
    body.density = 0.001;

    this.fighters.set(id, body);
    Matter.Composite.add(this.engine.world, body);
    
    return body;
  }

  applyForce(fighterId: string, force: { x: number; y: number }) {
    const body = this.fighters.get(fighterId);
    if (body) {
      Matter.Body.applyForce(body, body.position, force);
    }
  }

  setVelocity(fighterId: string, velocity: { x: number; y: number }) {
    const body = this.fighters.get(fighterId);
    if (body) {
      Matter.Body.setVelocity(body, velocity);
    }
  }

  getFighterPosition(fighterId: string): { x: number; y: number } | null {
    const body = this.fighters.get(fighterId);
    if (!body) return null;
    return { x: body.position.x, y: body.position.y };
  }

  getFighterVelocity(fighterId: string): { x: number; y: number } | null {
    const body = this.fighters.get(fighterId);
    if (!body) return null;
    return { x: body.velocity.x, y: body.velocity.y };
  }

  removeFighter(fighterId: string) {
    const body = this.fighters.get(fighterId);
    if (body) {
      Matter.Composite.remove(this.engine.world, body);
      this.fighters.delete(fighterId);
    }
  }

  onCollisionEvent(callback: (event: CollisionEvent) => void) {
    this.onCollision = callback;
  }

  update() {
    this.updateGravityWells();
    Matter.Engine.update(this.engine, 1000 / 60);
  }

  teleportFighter(fighterId: string, x: number, y: number) {
    const body = this.fighters.get(fighterId);
    if (body) {
      Matter.Body.setPosition(body, { x, y });
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
    }
  }

  createGravityWell(id: string, x: number, y: number, strength: number, radius: number, duration: number) {
    this.gravityWells.set(id, { x, y, strength, radius, duration });
    
    setTimeout(() => {
      this.removeGravityWell(id);
    }, duration);
  }

  removeGravityWell(id: string) {
    this.gravityWells.delete(id);
  }

  private updateGravityWells() {
    this.gravityWells.forEach((well, wellId) => {
      this.fighters.forEach((body, fighterId) => {
        const dx = well.x - body.position.x;
        const dy = well.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < well.radius && distance > 5) {
          const forceMagnitude = (well.strength / (distance * distance)) * 1000;
          const force = {
            x: (dx / distance) * forceMagnitude,
            y: (dy / distance) * forceMagnitude
          };
          Matter.Body.applyForce(body, body.position, force);
        }
      });
    });
  }

  createBarrier(id: string, x: number, y: number, width: number, height: number, angle: number = 0, duration: number = 3000) {
    const barrier = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      label: 'barrier',
      angle: angle,
      isSensor: false
    });

    this.barriers.set(id, barrier);
    Matter.Composite.add(this.engine.world, barrier);

    setTimeout(() => {
      this.removeBarrier(id);
    }, duration);

    return barrier;
  }

  removeBarrier(id: string) {
    const barrier = this.barriers.get(id);
    if (barrier) {
      Matter.Composite.remove(this.engine.world, barrier);
      this.barriers.delete(id);
    }
  }

  applyPull(fighterId: string, targetX: number, targetY: number, strength: number) {
    const body = this.fighters.get(fighterId);
    if (body) {
      const dx = targetX - body.position.x;
      const dy = targetY - body.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        const force = {
          x: (dx / distance) * strength,
          y: (dy / distance) * strength
        };
        Matter.Body.applyForce(body, body.position, force);
      }
    }
  }

  applyPush(fighterId: string, fromX: number, fromY: number, strength: number) {
    const body = this.fighters.get(fighterId);
    if (body) {
      const dx = body.position.x - fromX;
      const dy = body.position.y - fromY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        const force = {
          x: (dx / distance) * strength,
          y: (dy / distance) * strength
        };
        Matter.Body.applyForce(body, body.position, force);
      }
    }
  }

  destroy() {
    Matter.World.clear(this.engine.world, false);
    Matter.Engine.clear(this.engine);
    this.gravityWells.clear();
    this.barriers.clear();
  }
}
