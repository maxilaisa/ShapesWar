import * as PIXI from 'pixi.js';
import { ShapeType, VisualEffectType } from '../types';

export class Renderer {
  private app: PIXI.Application;
  private fighters: Map<string, PIXI.Graphics> = new Map();
  private trails: Map<string, PIXI.Graphics[]> = new Map();
  private effects: PIXI.Container;
  private activeEffects: Map<string, Set<VisualEffectType>> = new Map();

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
    this.activeEffects.set(id, new Set());
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

    this.activeEffects.delete(id);
  }

  addVisualEffect(id: string, effect: VisualEffectType) {
    const effects = this.activeEffects.get(id);
    if (effects) {
      effects.add(effect);
      this.renderVisualEffect(id, effect);
    }
  }

  removeVisualEffect(id: string, effect: VisualEffectType) {
    const effects = this.activeEffects.get(id);
    if (effects) {
      effects.delete(effect);
    }
  }

  private renderVisualEffect(id: string, effect: VisualEffectType) {
    const graphics = this.fighters.get(id);
    if (!graphics) return;

    const x = graphics.x;
    const y = graphics.y;

    switch (effect) {
      case 'shock_trails':
        this.createShockTrails(x, y, 0x00ffff);
        break;
      case 'impact_rings':
        this.createImpactRings(x, y, 0xffff00);
        break;
      case 'speed_blur':
        this.createSpeedBlur(graphics);
        break;
      case 'red_slash_arcs':
        this.createSlashArcs(x, y, 0xff0000);
        break;
      case 'blink_trails':
        this.createBlinkTrails(x, y, 0x00ffff);
        break;
      case 'crit_sparks':
        this.createCritSparks(x, y, 0xff00ff);
        break;
      case 'cracks':
        this.createCracks(x, y);
        break;
      case 'dust_burst':
        this.createDustBurst(x, y, 0x8B4513);
        break;
      case 'metal_sparks':
        this.createMetalSparks(x, y, 0xFFD700);
        break;
      case 'hex_shields':
        this.createHexShields(x, y, 0x00ff00);
        break;
      case 'pulse_waves':
        this.createPulseWaves(x, y, 0x00ffff);
        break;
      case 'barrier_lines':
        this.createBarrierLines(x, y, 0xff0000);
        break;
      case 'purple_vortex':
        this.createVortex(x, y, 0x9400D3);
        break;
      case 'warped_space':
        this.createWarpedSpace(x, y, 0x800080);
        break;
      case 'debris_pull':
        this.createDebrisPull(x, y, 0x696969);
        break;
      case 'mirror_shards':
        this.createMirrorShards(x, y, 0xC0C0C0);
        break;
      case 'silver_trails':
        this.createSilverTrails(x, y, 0xC0C0C0);
        break;
      case 'clone_flicker':
        this.createCloneFlicker(x, y);
        break;
      case 'fire_sparks':
        this.createFireSparks(x, y, 0xff4500);
        break;
      case 'chain_blur':
        this.createChainBlur(graphics);
        break;
      case 'explosive_impacts':
        this.createExplosiveImpacts(x, y, 0xff6600);
        break;
      case 'illusion_fade':
        this.createIllusionFade(graphics);
        break;
      case 'pink_aura':
        this.createAura(x, y, 0xff69b4);
        break;
      case 'heart_particles':
        this.createHeartParticles(x, y, 0xff69b4);
        break;
      case 'crystal_shards':
        this.createCrystalShards(x, y, 0x00ffff);
        break;
      case 'lasers':
        this.createLasers(x, y, 0x00ff00);
        break;
      case 'refracted_light':
        this.createRefractedLight(x, y, 0xffffff);
        break;
      case 'silver_moon_trails':
        this.createMoonTrails(x, y, 0xC0C0C0);
        break;
      case 'curved_shockwave':
        this.createCurvedShockwave(x, y, 0x9400D3);
        break;
      case 'dark_mist':
        this.createDarkMist(x, y, 0x2f2f4f);
        break;
      case 'golden_forms':
        this.createGoldenForms(x, y, 0xFFD700);
        break;
      case 'weapon_morphing':
        this.createWeaponMorphing(x, y);
        break;
      case 'tactical_aura':
        this.createAura(x, y, 0x00ff00);
        break;
      case 'smoke_vanish':
        this.createSmokeVanish(x, y, 0x808080);
        break;
      case 'afterimages':
        this.createAfterimages(x, y);
        break;
      case 'shape_morphing':
        this.createShapeMorphing(x, y);
        break;
      case 'fragment_storm':
        this.createFragmentStorm(x, y, 0x00ffff);
        break;
      case 'arrow_trails':
        this.createArrowTrails(x, y, 0x00ff00);
        break;
      case 'blue_streaks':
        this.createBlueStreaks(x, y, 0x0000ff);
        break;
      case 'wind_lines':
        this.createWindLines(x, y, 0x87CEEB);
        break;
    }
  }

  private createShockTrails(x: number, y: number, color: number) {
    for (let i = 0; i < 5; i++) {
      const trail = new PIXI.Graphics();
      trail.beginFill(color, 0.6);
      trail.drawCircle(0, 0, 4);
      trail.endFill();
      trail.x = x + (Math.random() - 0.5) * 20;
      trail.y = y + (Math.random() - 0.5) * 20;
      this.effects.addChild(trail);

      let life = 1;
      const animate = () => {
        trail.alpha -= 0.05;
        life -= 0.05;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(trail);
        }
      };
      animate();
    }
  }

  private createImpactRings(x: number, y: number, color: number) {
    for (let i = 0; i < 3; i++) {
      const ring = new PIXI.Graphics();
      ring.lineStyle(2, color, 0.8);
      ring.drawCircle(0, 0, 10);
      ring.x = x;
      ring.y = y;
      this.effects.addChild(ring);

      let scale = 1;
      const animate = () => {
        scale += 0.1;
        ring.scale.set(scale);
        ring.alpha -= 0.03;
        if (ring.alpha > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(ring);
        }
      };
      setTimeout(() => animate(), i * 100);
    }
  }

  private createSpeedBlur(graphics: PIXI.Graphics) {
    graphics.filters = [new PIXI.filters.BlurFilter(2)];
    setTimeout(() => {
      graphics.filters = [];
    }, 500);
  }

  private createSlashArcs(x: number, y: number, color: number) {
    const arc = new PIXI.Graphics();
    arc.lineStyle(4, color, 0.8);
    arc.arc(0, 0, 30, 0, Math.PI);
    arc.x = x;
    arc.y = y;
    this.effects.addChild(arc);

    let rotation = 0;
    const animate = () => {
      rotation += 0.2;
      arc.rotation = rotation;
      arc.alpha -= 0.04;
      if (arc.alpha > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(arc);
      }
    };
    animate();
  }

  private createBlinkTrails(x: number, y: number, color: number) {
    for (let i = 0; i < 8; i++) {
      const trail = new PIXI.Graphics();
      trail.beginFill(color, 0.5);
      trail.drawCircle(0, 0, 2);
      trail.endFill();
      trail.x = x;
      trail.y = y;
      this.effects.addChild(trail);

      const angle = (Math.PI * 2 / 8) * i;
      const speed = 8;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        trail.x += velocity.x;
        trail.y += velocity.y;
        trail.alpha -= 0.05;
        life -= 0.05;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(trail);
        }
      };
      animate();
    }
  }

  private createCritSparks(x: number, y: number, color: number) {
    for (let i = 0; i < 12; i++) {
      const spark = new PIXI.Graphics();
      spark.beginFill(color, 1);
      spark.drawCircle(0, 0, 2);
      spark.endFill();
      spark.x = x;
      spark.y = y;
      this.effects.addChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 3;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        spark.x += velocity.x;
        spark.y += velocity.y;
        spark.alpha -= 0.04;
        life -= 0.04;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(spark);
        }
      };
      animate();
    }
  }

  private createCracks(x: number, y: number) {
    const crack = new PIXI.Graphics();
    crack.lineStyle(2, 0x4a4a4a, 0.7);
    crack.moveTo(-20, -10);
    crack.lineTo(0, 0);
    crack.lineTo(20, -5);
    crack.moveTo(-15, 10);
    crack.lineTo(0, 0);
    crack.lineTo(15, 15);
    crack.x = x;
    crack.y = y;
    this.effects.addChild(crack);

    let life = 1;
    const animate = () => {
      crack.alpha -= 0.02;
      life -= 0.02;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(crack);
      }
    };
    animate();
  }

  private createDustBurst(x: number, y: number, color: number) {
    for (let i = 0; i < 15; i++) {
      const dust = new PIXI.Graphics();
      dust.beginFill(color, 0.4);
      dust.drawCircle(0, 0, Math.random() * 8 + 3);
      dust.endFill();
      dust.x = x;
      dust.y = y;
      this.effects.addChild(dust);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        dust.x += velocity.x;
        dust.y += velocity.y;
        dust.alpha -= 0.02;
        dust.scale.x *= 0.98;
        dust.scale.y *= 0.98;
        life -= 0.02;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(dust);
        }
      };
      animate();
    }
  }

  private createMetalSparks(x: number, y: number, color: number) {
    for (let i = 0; i < 10; i++) {
      const spark = new PIXI.Graphics();
      spark.beginFill(color, 1);
      spark.drawCircle(0, 0, 1.5);
      spark.endFill();
      spark.x = x;
      spark.y = y;
      this.effects.addChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        spark.x += velocity.x;
        spark.y += velocity.y;
        spark.alpha -= 0.06;
        life -= 0.06;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(spark);
        }
      };
      animate();
    }
  }

  private createHexShields(x: number, y: number, color: number) {
    const shield = new PIXI.Graphics();
    shield.lineStyle(3, color, 0.6);
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3);
      shield.moveTo(Math.cos(angle) * 40, Math.sin(angle) * 40);
      shield.lineTo(Math.cos(angle) * 50, Math.sin(angle) * 50);
    }
    shield.x = x;
    shield.y = y;
    this.effects.addChild(shield);

    let life = 1;
    const animate = () => {
      shield.rotation += 0.02;
      shield.alpha -= 0.015;
      life -= 0.015;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(shield);
      }
    };
    animate();
  }

  private createPulseWaves(x: number, y: number, color: number) {
    for (let i = 0; i < 2; i++) {
      const wave = new PIXI.Graphics();
      wave.lineStyle(2, color, 0.5);
      wave.drawCircle(0, 0, 30);
      wave.x = x;
      wave.y = y;
      this.effects.addChild(wave);

      let scale = 1;
      const animate = () => {
        scale += 0.15;
        wave.scale.set(scale);
        wave.alpha -= 0.03;
        if (wave.alpha > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(wave);
        }
      };
      setTimeout(() => animate(), i * 300);
    }
  }

  private createBarrierLines(x: number, y: number, color: number) {
    for (let i = 0; i < 4; i++) {
      const line = new PIXI.Graphics();
      line.lineStyle(3, color, 0.7);
      line.moveTo(-30, 0);
      line.lineTo(30, 0);
      line.x = x;
      line.y = y;
      line.rotation = (i * Math.PI / 4);
      this.effects.addChild(line);

      let life = 1;
      const animate = () => {
        line.alpha -= 0.02;
        life -= 0.02;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(line);
        }
      };
      animate();
    }
  }

  private createVortex(x: number, y: number, color: number) {
    const vortex = new PIXI.Graphics();
    vortex.lineStyle(2, color, 0.6);
    for (let i = 0; i < 3; i++) {
      vortex.drawCircle(0, 0, 20 + i * 15);
    }
    vortex.x = x;
    vortex.y = y;
    this.effects.addChild(vortex);

    let rotation = 0;
    let life = 1;
    const animate = () => {
      rotation += 0.1;
      vortex.rotation = rotation;
      vortex.scale.set(1 + (1 - life) * 0.5);
      vortex.alpha -= 0.015;
      life -= 0.015;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(vortex);
      }
    };
    animate();
  }

  private createWarpedSpace(x: number, y: number, color: number) {
    const warp = new PIXI.Graphics();
    warp.beginFill(color, 0.3);
    warp.drawCircle(0, 0, 50);
    warp.endFill();
    warp.x = x;
    warp.y = y;
    this.effects.addChild(warp);

    let scale = 1;
    let life = 1;
    const animate = () => {
      scale = 1 + Math.sin(Date.now() * 0.01) * 0.3;
      warp.scale.set(scale);
      warp.alpha -= 0.01;
      life -= 0.01;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(warp);
      }
    };
    animate();
  }

  private createDebrisPull(x: number, y: number, color: number) {
    for (let i = 0; i < 8; i++) {
      const debris = new PIXI.Graphics();
      debris.beginFill(color, 0.8);
      debris.drawRect(-3, -3, 6, 6);
      debris.endFill();
      debris.x = x + (Math.random() - 0.5) * 100;
      debris.y = y + (Math.random() - 0.5) * 100;
      this.effects.addChild(debris);

      const angle = Math.atan2(y - debris.y, x - debris.x);
      const speed = 5;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        debris.x += velocity.x;
        debris.y += velocity.y;
        debris.rotation += 0.1;
        debris.alpha -= 0.02;
        life -= 0.02;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(debris);
        }
      };
      animate();
    }
  }

  private createMirrorShards(x: number, y: number, color: number) {
    for (let i = 0; i < 6; i++) {
      const shard = new PIXI.Graphics();
      shard.beginFill(color, 0.7);
      shard.moveTo(0, -10);
      shard.lineTo(-5, 5);
      shard.lineTo(5, 5);
      shard.endFill();
      shard.x = x;
      shard.y = y;
      shard.rotation = Math.random() * Math.PI * 2;
      this.effects.addChild(shard);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        shard.x += velocity.x;
        shard.y += velocity.y;
        shard.alpha -= 0.03;
        shard.rotation += 0.05;
        life -= 0.03;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(shard);
        }
      };
      animate();
    }
  }

  private createSilverTrails(x: number, y: number, color: number) {
    for (let i = 0; i < 6; i++) {
      const trail = new PIXI.Graphics();
      trail.lineStyle(2, color, 0.5);
      trail.moveTo(-15, 0);
      trail.lineTo(15, 0);
      trail.x = x;
      trail.y = y;
      trail.rotation = Math.random() * Math.PI * 2;
      this.effects.addChild(trail);

      let life = 1;
      const animate = () => {
        trail.alpha -= 0.04;
        trail.scale.set(1 + (1 - life));
        life -= 0.04;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(trail);
        }
      };
      animate();
    }
  }

  private createCloneFlicker(x: number, y: number) {
    const clone = new PIXI.Graphics();
    clone.beginFill(0xffffff, 0.3);
    clone.drawCircle(0, 0, 25);
    clone.endFill();
    clone.x = x;
    clone.y = y;
    this.effects.addChild(clone);

    let visible = true;
    let count = 0;
    const animate = () => {
      count++;
      if (count % 3 === 0) {
        visible = !visible;
        clone.alpha = visible ? 0.3 : 0;
      }
      if (count < 30) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(clone);
      }
    };
    animate();
  }

  private createFireSparks(x: number, y: number, color: number) {
    for (let i = 0; i < 15; i++) {
      const spark = new PIXI.Graphics();
      spark.beginFill(color, 1);
      spark.drawCircle(0, 0, Math.random() * 3 + 1);
      spark.endFill();
      spark.x = x;
      spark.y = y;
      this.effects.addChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed - 2
      };

      let life = 1;
      const animate = () => {
        spark.x += velocity.x;
        spark.y += velocity.y;
        velocity.y += 0.1;
        spark.alpha -= 0.04;
        life -= 0.04;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(spark);
        }
      };
      animate();
    }
  }

  private createChainBlur(graphics: PIXI.Graphics) {
    graphics.filters = [new PIXI.filters.BlurFilter(3)];
    setTimeout(() => {
      graphics.filters = [];
    }, 700);
  }

  private createExplosiveImpacts(x: number, y: number, color: number) {
    for (let i = 0; i < 20; i++) {
      const particle = new PIXI.Graphics();
      particle.beginFill(color, 1);
      particle.drawCircle(0, 0, Math.random() * 6 + 2);
      particle.endFill();
      particle.x = x;
      particle.y = y;
      this.effects.addChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

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
  }

  private createIllusionFade(graphics: PIXI.Graphics) {
    const originalAlpha = graphics.alpha;
    graphics.alpha = 0.3;
    setTimeout(() => {
      graphics.alpha = originalAlpha;
    }, 200);
  }

  private createAura(x: number, y: number, color: number) {
    const aura = new PIXI.Graphics();
    aura.beginFill(color, 0.2);
    aura.drawCircle(0, 0, 40);
    aura.endFill();
    aura.x = x;
    aura.y = y;
    this.effects.addChild(aura);

    let scale = 1;
    let life = 1;
    const animate = () => {
      scale = 1 + Math.sin(Date.now() * 0.008) * 0.1;
      aura.scale.set(scale);
      aura.alpha = 0.2 * life;
      life -= 0.008;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(aura);
      }
    };
    animate();
  }

  private createHeartParticles(x: number, y: number, color: number) {
    for (let i = 0; i < 8; i++) {
      const heart = new PIXI.Graphics();
      heart.beginFill(color, 0.6);
      heart.moveTo(0, 3);
      heart.bezierCurveTo(-5, -1, -5, 3, 0, 6);
      heart.bezierCurveTo(5, 3, 5, -1, 0, 3);
      heart.endFill();
      heart.x = x;
      heart.y = y;
      this.effects.addChild(heart);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed - 1
      };

      let life = 1;
      const animate = () => {
        heart.x += velocity.x;
        heart.y += velocity.y;
        heart.alpha -= 0.02;
        heart.scale.set(0.5 + life * 0.5);
        life -= 0.02;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(heart);
        }
      };
      animate();
    }
  }

  private createCrystalShards(x: number, y: number, color: number) {
    for (let i = 0; i < 8; i++) {
      const shard = new PIXI.Graphics();
      shard.lineStyle(2, color, 0.8);
      shard.moveTo(-10, 0);
      shard.lineTo(10, 0);
      shard.x = x;
      shard.y = y;
      shard.rotation = Math.random() * Math.PI * 2;
      this.effects.addChild(shard);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 3;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        shard.x += velocity.x;
        shard.y += velocity.y;
        shard.alpha -= 0.04;
        shard.rotation += 0.1;
        life -= 0.04;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(shard);
        }
      };
      animate();
    }
  }

  private createLasers(x: number, y: number, color: number) {
    for (let i = 0; i < 5; i++) {
      const laser = new PIXI.Graphics();
      laser.lineStyle(3, color, 0.9);
      laser.moveTo(-50, 0);
      laser.lineTo(50, 0);
      laser.x = x;
      laser.y = y;
      laser.rotation = (Math.PI / 5) * i;
      this.effects.addChild(laser);

      let life = 1;
      const animate = () => {
        laser.alpha -= 0.05;
        life -= 0.05;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(laser);
        }
      };
      animate();
    }
  }

  private createRefractedLight(x: number, y: number, color: number) {
    const light = new PIXI.Graphics();
    light.beginFill(color, 0.4);
    light.drawCircle(0, 0, 35);
    light.endFill();
    light.x = x;
    light.y = y;
    this.effects.addChild(light);

    let life = 1;
    const animate = () => {
      light.scale.set(1 + (1 - life) * 0.5);
      light.alpha = 0.4 * life;
      life -= 0.02;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(light);
      }
    };
    animate();
  }

  private createMoonTrails(x: number, y: number, color: number) {
    for (let i = 0; i < 5; i++) {
      const trail = new PIXI.Graphics();
      trail.lineStyle(2, color, 0.5);
      trail.arc(0, 0, 20, 0, Math.PI);
      trail.x = x;
      trail.y = y;
      trail.rotation = Math.random() * Math.PI * 2;
      this.effects.addChild(trail);

      let life = 1;
      const animate = () => {
        trail.alpha -= 0.03;
        trail.rotation += 0.02;
        life -= 0.03;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(trail);
        }
      };
      animate();
    }
  }

  private createCurvedShockwave(x: number, y: number, color: number) {
    const shockwave = new PIXI.Graphics();
    shockwave.lineStyle(3, color, 0.7);
    shockwave.arc(0, 0, 30, 0, Math.PI);
    shockwave.x = x;
    shockwave.y = y;
    this.effects.addChild(shockwave);

    let scale = 1;
    let rotation = 0;
    const animate = () => {
      scale += 0.1;
      rotation += 0.05;
      shockwave.scale.set(scale);
      shockwave.rotation = rotation;
      shockwave.alpha -= 0.03;
      if (shockwave.alpha > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(shockwave);
      }
    };
    animate();
  }

  private createDarkMist(x: number, y: number, color: number) {
    for (let i = 0; i < 10; i++) {
      const mist = new PIXI.Graphics();
      mist.beginFill(color, 0.3);
      mist.drawCircle(0, 0, Math.random() * 15 + 10);
      mist.endFill();
      mist.x = x + (Math.random() - 0.5) * 40;
      mist.y = y + (Math.random() - 0.5) * 40;
      this.effects.addChild(mist);

      let life = 1;
      const animate = () => {
        mist.alpha -= 0.01;
        mist.scale.set(1 + (1 - life) * 0.5);
        life -= 0.01;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(mist);
        }
      };
      animate();
    }
  }

  private createGoldenForms(x: number, y: number, color: number) {
    const forms = new PIXI.Graphics();
    forms.lineStyle(2, color, 0.6);
    for (let i = 0; i < 5; i++) {
      forms.drawPolygon([
        0, -25 - i * 5,
        -20 - i * 3, 10,
        20 + i * 3, 10
      ]);
    }
    forms.x = x;
    forms.y = y;
    this.effects.addChild(forms);

    let rotation = 0;
    let life = 1;
    const animate = () => {
      rotation += 0.03;
      forms.rotation = rotation;
      forms.alpha = 0.6 * life;
      life -= 0.01;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(forms);
      }
    };
    animate();
  }

  private createWeaponMorphing(x: number, y: number) {
    const morph = new PIXI.Graphics();
    morph.lineStyle(3, 0xFFD700, 0.7);
    morph.drawCircle(0, 0, 20);
    morph.x = x;
    morph.y = y;
    this.effects.addChild(morph);

    let shape = 0;
    let life = 1;
    const animate = () => {
      shape += 0.1;
      morph.clear();
      morph.lineStyle(3, 0xFFD700, 0.7);
      if (Math.floor(shape) % 3 === 0) {
        morph.drawCircle(0, 0, 20);
      } else if (Math.floor(shape) % 3 === 1) {
        morph.drawRect(-20, -20, 40, 40);
      } else {
        morph.drawPolygon([0, -25, -20, 15, 20, 15]);
      }
      morph.alpha = 0.7 * life;
      life -= 0.02;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(morph);
      }
    };
    animate();
  }

  private createSmokeVanish(x: number, y: number, color: number) {
    for (let i = 0; i < 12; i++) {
      const smoke = new PIXI.Graphics();
      smoke.beginFill(color, 0.4);
      smoke.drawCircle(0, 0, Math.random() * 12 + 8);
      smoke.endFill();
      smoke.x = x + (Math.random() - 0.5) * 30;
      smoke.y = y + (Math.random() - 0.5) * 30;
      this.effects.addChild(smoke);

      let life = 1;
      const animate = () => {
        smoke.alpha -= 0.02;
        smoke.scale.set(1 + (1 - life) * 0.8);
        smoke.y -= 0.5;
        life -= 0.02;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(smoke);
        }
      };
      animate();
    }
  }

  private createAfterimages(x: number, y: number) {
    for (let i = 0; i < 3; i++) {
      const image = new PIXI.Graphics();
      image.beginFill(0xffffff, 0.2);
      image.drawCircle(0, 0, 25);
      image.endFill();
      image.x = x;
      image.y = y;
      this.effects.addChild(image);

      setTimeout(() => {
        let life = 1;
        const animate = () => {
          image.alpha = 0.2 * life;
          life -= 0.05;
          if (life > 0) {
            requestAnimationFrame(animate);
          } else {
            this.effects.removeChild(image);
          }
        };
        animate();
      }, i * 100);
    }
  }

  private createShapeMorphing(x: number, y: number) {
    const morph = new PIXI.Graphics();
    morph.lineStyle(3, 0x00ffff, 0.6);
    morph.x = x;
    morph.y = y;
    this.effects.addChild(morph);

    let sides = 3;
    let life = 1;
    const animate = () => {
      morph.clear();
      morph.lineStyle(3, 0x00ffff, 0.6 * life);
      morph.drawPolygon(this.getPolygonPoints(sides, 25));
      sides = sides >= 8 ? 3 : sides + 0.05;
      life -= 0.015;
      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        this.effects.removeChild(morph);
      }
    };
    animate();
  }

  private getPolygonPoints(sides: number, radius: number): number[] {
    const points: number[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      );
    }
    return points;
  }

  private createFragmentStorm(x: number, y: number, color: number) {
    for (let i = 0; i < 20; i++) {
      const fragment = new PIXI.Graphics();
      fragment.beginFill(color, 0.7);
      fragment.drawRect(-3, -3, 6, 6);
      fragment.endFill();
      fragment.x = x;
      fragment.y = y;
      this.effects.addChild(fragment);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 3;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        fragment.x += velocity.x;
        fragment.y += velocity.y;
        fragment.rotation += 0.15;
        fragment.alpha -= 0.03;
        life -= 0.03;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(fragment);
        }
      };
      animate();
    }
  }

  private createArrowTrails(x: number, y: number, color: number) {
    for (let i = 0; i < 5; i++) {
      const arrow = new PIXI.Graphics();
      arrow.lineStyle(2, color, 0.7);
      arrow.moveTo(-15, 0);
      arrow.lineTo(15, 0);
      arrow.lineTo(10, -5);
      arrow.moveTo(15, 0);
      arrow.lineTo(10, 5);
      arrow.x = x;
      arrow.y = y;
      arrow.rotation = Math.random() * Math.PI * 2;
      this.effects.addChild(arrow);

      const angle = arrow.rotation;
      const speed = 10;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };

      let life = 1;
      const animate = () => {
        arrow.x += velocity.x;
        arrow.y += velocity.y;
        arrow.alpha -= 0.04;
        life -= 0.04;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(arrow);
        }
      };
      animate();
    }
  }

  private createBlueStreaks(x: number, y: number, color: number) {
    for (let i = 0; i < 4; i++) {
      const streak = new PIXI.Graphics();
      streak.lineStyle(4, color, 0.6);
      streak.moveTo(-30, 0);
      streak.lineTo(30, 0);
      streak.x = x;
      streak.y = y;
      streak.rotation = (Math.PI / 2) * i;
      this.effects.addChild(streak);

      let life = 1;
      const animate = () => {
        streak.alpha -= 0.05;
        streak.scale.x *= 0.95;
        life -= 0.05;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(streak);
        }
      };
      animate();
    }
  }

  private createWindLines(x: number, y: number, color: number) {
    for (let i = 0; i < 8; i++) {
      const line = new PIXI.Graphics();
      line.lineStyle(1, color, 0.4);
      line.moveTo(-20, 0);
      line.lineTo(20, 0);
      line.x = x + (Math.random() - 0.5) * 60;
      line.y = y + (Math.random() - 0.5) * 60;
      line.rotation = Math.random() * Math.PI;
      this.effects.addChild(line);

      let life = 1;
      const animate = () => {
        line.alpha -= 0.02;
        line.x += 2;
        life -= 0.02;
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          this.effects.removeChild(line);
        }
      };
      animate();
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
