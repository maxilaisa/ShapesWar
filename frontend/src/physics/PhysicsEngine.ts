import Matter from 'matter-js';
import { ShapeType, FighterState, CollisionEvent } from '../types';

export class PhysicsEngine {
  private engine: Matter.Engine;
  private render: Matter.Render | null = null;
  private runner: Matter.Runner | null = null;
  private fighters: Map<string, Matter.Body> = new Map();
  private walls: Matter.Body[] = [];
  private onCollision: ((event: CollisionEvent) => void) | null = null;

  constructor() {
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }
    });
  }

  initialize(canvas: HTMLCanvasElement, width: number, height: number) {
    this.render = Matter.Render.create({
      canvas,
      engine: this.engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#0a0a0f'
      }
    });

    this.createWalls(width, height);
    this.setupCollisionHandling();
    
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);
    Matter.Render.run(this.render);
  }

  private createWalls(width: number, height: number) {
    const wallThickness = 50;
    const walls = [
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true })
    ];
    
    this.walls = walls;
    Matter.Composite.add(this.engine.world, walls);
  }

  private setupCollisionHandling() {
    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        const fighterAId = bodyA.label;
        const fighterBId = bodyB.label;

        if (fighterAId && fighterBId) {
          this.handleFighterCollision(fighterAId, fighterBId, pair);
        } else if (fighterAId || fighterBId) {
          this.handleWallCollision(fighterAId || fighterBId, pair);
        }
      });
    });
  }

  private handleFighterCollision(id1: string, id2: string, pair: Matter.IPairCollision) {
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

  private handleWallCollision(fighterId: string, pair: Matter.IPairCollision) {
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
        body = Matter.Bodies.rectangle(x, y, radius * 1.8, radius * 1.8, { label: id });
        break;
      case 'oval':
        body = Matter.Bodies.ellipse(x, y, radius * 1.3, radius * 0.8, { label: id });
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

    body.friction = 0.01;
    body.frictionAir = 0.01;
    body.restitution = 0.9;
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
    return body ? { x: body.position.x, y: body.position.y } : null;
  }

  getFighterVelocity(fighterId: string): { x: number; y: number } | null {
    const body = this.fighters.get(fighterId);
    return body ? { x: body.velocity.x, y: body.velocity.y } : null;
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
    Matter.Engine.update(this.engine, 1000 / 60);
  }

  destroy() {
    if (this.runner) {
      Matter.Runner.stop(this.runner);
    }
    if (this.render) {
      Matter.Render.stop(this.render);
    }
    Matter.World.clear(this.engine.world);
    Matter.Engine.clear(this.engine);
  }
}
