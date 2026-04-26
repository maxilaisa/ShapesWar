import * as PIXI from 'pixi.js';
import { ShapeType } from '../types';

export class Renderer {
  private app: PIXI.Application;
  private fighters: Map<string, PIXI.Graphics> = new Map();
  private trails: Map<string, PIXI.Graphics[]> = new Map();
  private effects: PIXI.Container;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.app = new PIXI.Application({
      view: canvas,
      width,
      height,
      backgroundColor: 0x0a0a0f,
      antialias: false,
      resolution: 1
    });

    this.effects = new PIXI.Container();
    this.app.stage.addChild(this.effects);
  }

  createFighter(
    id: string,
    shapeType: ShapeType,
    color: number,
    x: number,
    y: number,
    size: number = 30
  ) {
    const graphics = new PIXI.Graphics();
    this.drawShape(graphics, shapeType, color, size);
    graphics.x = x;
    graphics.y = y;
    graphics.alpha = 1;

    this.fighters.set(id, graphics);
    this.trails.set(id, []);
    this.app.stage.addChild(graphics);
  }

  private drawShape(graphics: PIXI.Graphics, shapeType: ShapeType, color: number, size: number) {
    graphics.clear();
    graphics.beginFill(color);
    graphics.lineStyle(3, 0xffffff, 0.6);

    switch (shapeType) {
      case 'circle':
        graphics.drawCircle(0, 0, size);
        break;
      case 'triangle':
        graphics.drawPolygon([
          0, -size,
          -size * 0.866, size * 0.5,
          size * 0.866, size * 0.5
        ]);
        break;
      case 'square':
        graphics.drawRect(-size, -size, size * 2, size * 2);
        break;
      case 'oval':
        graphics.drawEllipse(0, 0, size * 1.3, size * 0.8);
        break;
      case 'hexagon':
        this.drawPolygon(graphics, 6, size);
        break;
      case 'spiral':
        this.drawSpiral(graphics, size);
        break;
      case 'rhombus':
        this.drawPolygon(graphics, 4, size, Math.PI / 4);
        break;
      case 'star':
        this.drawStar(graphics, 5, size, size * 0.5);
        break;
      case 'heart':
        this.drawHeart(graphics, size);
        break;
      case 'diamond':
        this.drawPolygon(graphics, 4, size);
        break;
      case 'crescent':
        this.drawCrescent(graphics, size);
        break;
      case 'dodecahedron':
        this.drawPolygon(graphics, 12, size);
        break;
      default:
        graphics.drawCircle(0, 0, size);
    }

    graphics.endFill();
    
    // Add glow effect
    graphics.beginFill(color, 0.3);
    graphics.lineStyle(0);
    graphics.drawCircle(0, 0, size * 1.2);
    graphics.endFill();
  }

  private drawPolygon(graphics: PIXI.Graphics, sides: number, radius: number, rotation: number = 0) {
    const points: number[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI / sides) + rotation - Math.PI / 2;
      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      );
    }
    graphics.drawPolygon(points);
  }

  private drawStar(graphics: PIXI.Graphics, points: number, outerRadius: number, innerRadius: number) {
    const starPoints: number[] = [];
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI / points) - Math.PI / 2;
      starPoints.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      );
    }
    graphics.drawPolygon(starPoints);
  }

  private drawHeart(graphics: PIXI.Graphics, size: number) {
    graphics.moveTo(0, size * 0.3);
    graphics.bezierCurveTo(-size, -size * 0.5, -size, size * 0.5, 0, size);
    graphics.bezierCurveTo(size, size * 0.5, size, -size * 0.5, 0, size * 0.3);
  }

  private drawSpiral(graphics: PIXI.Graphics, size: number) {
    graphics.moveTo(0, 0);
    for (let i = 0; i < 100; i++) {
      const angle = i * 0.2;
      const radius = (i / 100) * size;
      graphics.lineTo(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      );
    }
  }

  private drawCrescent(graphics: PIXI.Graphics, size: number) {
    graphics.arc(0, 0, size, 0, Math.PI * 2);
    graphics.beginFill(0x0a0a0f);
    graphics.arc(size * 0.3, 0, size * 0.8, 0, Math.PI * 2);
    graphics.endFill();
  }

  updateFighterPosition(id: string, x: number, y: number) {
    const graphics = this.fighters.get(id);
    if (graphics) {
      graphics.x = x;
      graphics.y = y;
      this.updateTrail(id, x, y);
    }
  }

  private updateTrail(id: string, x: number, y: number) {
    const trail = this.trails.get(id);
    if (!trail) return;

    const trailPoint = new PIXI.Graphics();
    trailPoint.beginFill(0xffffff, 0.3);
    trailPoint.drawCircle(0, 0, 3);
    trailPoint.endFill();
    trailPoint.x = x;
    trailPoint.y = y;

    trail.push(trailPoint);
    this.app.stage.addChild(trailPoint);

    if (trail.length > 20) {
      const oldPoint = trail.shift();
      if (oldPoint) {
        this.app.stage.removeChild(oldPoint);
      }
    }
  }

  createImpactEffect(x: number, y: number, color: number) {
    // Create multiple particles for better effect
    for (let i = 0; i < 8; i++) {
      const particle = new PIXI.Graphics();
      particle.beginFill(color, 1);
      particle.drawCircle(0, 0, Math.random() * 5 + 3);
      particle.endFill();
      particle.x = x;
      particle.y = y;
      particle.alpha = 1;

      const angle = (Math.PI * 2 / 8) * i;
      const speed = Math.random() * 3 + 2;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      this.effects.addChild(particle);

      let life = 1;
      const animate = () => {
        particle.x += velocity.x;
        particle.y += velocity.y;
        particle.alpha -= 0.03;
        particle.scale.x *= 0.95;
        particle.scale.y *= 0.95;
        life -= 0.03;
        
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(particle);
        }
      };
      animate();
    }

    // Add shockwave ring
    const shockwave = new PIXI.Graphics();
    shockwave.lineStyle(3, color, 0.8);
    shockwave.drawCircle(0, 0, 10);
    shockwave.x = x;
    shockwave.y = y;
    this.effects.addChild(shockwave);

    let scale = 1;
    const animateShockwave = () => {
      scale += 0.15;
      shockwave.scale.set(scale);
      shockwave.alpha -= 0.04;
      
      if (shockwave.alpha > 0) {
        requestAnimationFrame(animateShockwave);
      } else {
        this.effects.removeChild(shockwave);
      }
    };
    animateShockwave();
  }

  createUltimateEffect(id: string, color: number) {
    const graphics = this.fighters.get(id);
    if (!graphics) return;

    const aura = new PIXI.Graphics();
    aura.beginFill(color, 0.3);
    aura.drawCircle(0, 0, 50);
    aura.endFill();
    aura.x = graphics.x;
    aura.y = graphics.y;

    this.effects.addChild(aura);

    const animate = () => {
      const fighter = this.fighters.get(id);
      if (fighter) {
        aura.x = fighter.x;
        aura.y = fighter.y;
      }
      aura.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.2;
      aura.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.2;
      requestAnimationFrame(animate);
    };
    animate();
  }

  removeFighter(id: string) {
    const graphics = this.fighters.get(id);
    if (graphics) {
      this.app.stage.removeChild(graphics);
      this.fighters.delete(id);
    }

    const trail = this.trails.get(id);
    if (trail) {
      trail.forEach(point => this.app.stage.removeChild(point));
      this.trails.delete(id);
    }
  }

  render() {
    this.app.render();
  }

  resize(width: number, height: number) {
    this.app.renderer.resize(width, height);
  }

  destroy() {
    this.app.destroy(true);
  }
}
