export type ShapeType = 
  | 'circle' 
  | 'triangle' 
  | 'square' 
  | 'oval' 
  | 'hexagon' 
  | 'spiral' 
  | 'rhombus' 
  | 'star' 
  | 'heart' 
  | 'diamond' 
  | 'crescent' 
  | 'dodecahedron'
  | 'nonagon'
  | 'polygon';

export type AIState = 'neutral' | 'pressure' | 'defensive' | 'punish' | 'combo' | 'ultimate';

export type HitType = 'light' | 'clean' | 'wall_combo' | 'counter' | 'wall' | 'enemy';

export type WeaponType = 
  | 'energy_gauntlets'
  | 'dual_energy_swords'
  | 'giant_hammer_shield'
  | 'twin_energy_bows'
  | 'shield_drones'
  | 'gravity_staff'
  | 'shuriken_daggers'
  | 'spiked_chain_blades'
  | 'charm_wand_pulse_daggers'
  | 'crystal_spear_laser_bow'
  | 'crescent_scythe'
  | 'morphing_arsenal'
  | 'clone_kunai'
  | 'fragment_blades';

export type VisualEffectType = 
  | 'shock_trails'
  | 'impact_rings'
  | 'speed_blur'
  | 'red_slash_arcs'
  | 'blink_trails'
  | 'crit_sparks'
  | 'cracks'
  | 'dust_burst'
  | 'metal_sparks'
  | 'arrow_trails'
  | 'wind_lines'
  | 'blue_streaks'
  | 'hex_shields'
  | 'barrier_lines'
  | 'pulse_waves'
  | 'purple_vortex'
  | 'warped_space'
  | 'debris_pull'
  | 'mirror_shards'
  | 'silver_trails'
  | 'clone_flicker'
  | 'fire_sparks'
  | 'chain_blur'
  | 'explosive_impacts'
  | 'pink_aura'
  | 'heart_particles'
  | 'illusion_fade'
  | 'crystal_shards'
  | 'lasers'
  | 'refracted_light'
  | 'silver_moon_trails'
  | 'dark_mist'
  | 'curved_shockwave'
  | 'golden_forms'
  | 'weapon_morphing'
  | 'tactical_aura'
  | 'smoke_vanish'
  | 'afterimages'
  | 'shape_morphing'
  | 'fragment_storm';

export type SkillEffect = {
  type: 'damage' | 'knockback' | 'stun' | 'heal' | 'shield' | 'teleport' | 'pull' | 'push' | 'buff' | 'debuff';
  value: number;
  duration?: number;
  radius?: number;
};

export type SkillConfig = {
  name: string;
  cooldown: number;
  effects: SkillEffect[];
  visualEffects: VisualEffectType[];
  description: string;
};

export type WeaponConfig = {
  type: WeaponType;
  name: string;
  description: string;
};

export interface AIConfig {
  aggression: number;
  mobility: number;
  precision: number;
  chaos: number;
  greed: number;
  fear: number;
  revenge: number;
  skill: number;
  discipline: number;
}

export interface FighterState {
  id: string;
  shapeType: ShapeType;
  hp: number;
  ultimateCharges: number;
  isUltimateActive: boolean;
  comboCount: number;
  lastHitTime: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  aiState: AIState;
  skillCooldowns: {
    skill1: number;
    skill2: number;
    ultimate: number;
  };
  isStunned: boolean;
  activeWeapon: WeaponType | null;
  activeEffects: VisualEffectType[];
  passiveActive: boolean;
}

export interface CollisionEvent {
  fighterId: string;
  hitType: HitType;
  damage: number;
  knockback: { x: number; y: number };
  timestamp: number;
}

export interface ShapeData {
  id: string;
  type: ShapeType;
  name: string;
  color: string;
  aiConfig: AIConfig;
  passiveEffect: string;
  passiveName: string;
  skill1Name: string;
  skill1Cooldown: number;
  skill2Name: string;
  skill2Cooldown: number;
  ultimateName: string;
  stats: ShapeStats;
  role: string;
  weapon: WeaponConfig;
  skill1Config: SkillConfig;
  skill2Config: SkillConfig;
  ultimateConfig: SkillConfig;
}

export interface ShapeStats {
  hp: number;
  dmg: number;
  def: number;
  spd: number;
}
