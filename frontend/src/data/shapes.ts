import { ShapeType, AIConfig, WeaponConfig, SkillConfig } from '../types';

export interface ShapeStats {
  hp: number;
  dmg: number;
  def: number;
  spd: number;
}

export const SHAPES_DATA: {
  id: string;
  type: ShapeType;
  name: string;
  color: string;
  description: string;
  role: string;
  stats: ShapeStats;
  passiveEffect: string;
  passiveName: string;
  skill1Name: string;
  skill1Cooldown: number;
  skill2Name: string;
  skill2Cooldown: number;
  ultimateName: string;
  weapon: WeaponConfig;
  skill1Config: SkillConfig;
  skill2Config: SkillConfig;
  ultimateConfig: SkillConfig;
  aiConfig: AIConfig;
}[] = [
  {
    id: 'circle',
    type: 'circle',
    name: 'Circle',
    color: '#ff6b6b',
    description: 'Momentum fighter that builds speed through rebounds',
    role: 'Momentum Brawler',
    stats: { hp: 100, dmg: 103, def: 95, spd: 108 },
    passiveEffect: 'Higher speed = stronger hits',
    passiveName: 'Momentum Build',
    skill1Name: 'Rolling Charge',
    skill1Cooldown: 4000,
    skill2Name: 'Rebound Feint',
    skill2Cooldown: 6000,
    ultimateName: 'Orbital Breaker',
    weapon: {
      type: 'energy_gauntlets',
      name: 'Energy Gauntlets',
      description: 'Summoned energy constructs that amplify momentum-based attacks'
    },
    skill1Config: {
      name: 'Rolling Charge',
      cooldown: 4000,
      effects: [{ type: 'knockback', value: 15 }, { type: 'damage', value: 20 }],
      visualEffects: ['shock_trails', 'speed_blur'],
      description: 'Wraps gauntlets in energy and launches forward with powerful momentum'
    },
    skill2Config: {
      name: 'Rebound Feint',
      cooldown: 6000,
      effects: [{ type: 'teleport', value: 100 }, { type: 'knockback', value: 10 }],
      visualEffects: ['impact_rings', 'speed_blur'],
      description: 'Bounces off wall then redirects at unexpected angle'
    },
    ultimateConfig: {
      name: 'Orbital Breaker',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 50 }, { type: 'knockback', value: 25 }, { type: 'buff', value: 2, duration: 5000 }],
      visualEffects: ['shock_trails', 'impact_rings', 'speed_blur'],
      description: 'Spins around enemy with glowing fists, final uppercut blast'
    },
    aiConfig: {
      aggression: 7,
      mobility: 8,
      precision: 6,
      chaos: 4,
      greed: 6,
      fear: 3,
      revenge: 5,
      skill: 7,
      discipline: 5
    }
  },
  {
    id: 'triangle',
    type: 'triangle',
    name: 'Triangle',
    color: '#4ecdc4',
    description: 'Assassin with burst damage and precise engages',
    role: 'Blade Assassin',
    stats: { hp: 100, dmg: 118, def: 84, spd: 112 },
    passiveEffect: 'Sword tip hits crit more often',
    passiveName: 'Critical Edge',
    skill1Name: 'Piercing Dash',
    skill1Cooldown: 4000,
    skill2Name: 'Edge Step',
    skill2Cooldown: 5000,
    ultimateName: 'Perfect Edge',
    weapon: {
      type: 'dual_energy_swords',
      name: 'Dual Energy Swords',
      description: 'Summoned energy blades that deliver critical strikes'
    },
    skill1Config: {
      name: 'Piercing Dash',
      cooldown: 4000,
      effects: [{ type: 'damage', value: 25 }, { type: 'knockback', value: 8 }],
      visualEffects: ['red_slash_arcs', 'blink_trails'],
      description: 'Dashes through enemy with blade slash trail'
    },
    skill2Config: {
      name: 'Edge Step',
      cooldown: 5000,
      effects: [{ type: 'teleport', value: 80 }, { type: 'damage', value: 20 }],
      visualEffects: ['blink_trails', 'crit_sparks'],
      description: 'Teleport sidestep then backstab slash'
    },
    ultimateConfig: {
      name: 'Perfect Edge',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 60 }, { type: 'knockback', value: 20 }, { type: 'buff', value: 2.5, duration: 5000 }],
      visualEffects: ['red_slash_arcs', 'blink_trails', 'crit_sparks'],
      description: 'Three teleport slashes then giant finishing cut'
    },
    aiConfig: {
      aggression: 9,
      mobility: 8,
      precision: 9,
      chaos: 3,
      greed: 8,
      fear: 2,
      revenge: 7,
      skill: 8,
      discipline: 7
    }
  },
  {
    id: 'square',
    type: 'square',
    name: 'Square',
    color: '#45b7d1',
    description: 'Tank that is slow, durable, and punishes mistakes',
    role: 'Fortress Juggernaut',
    stats: { hp: 100, dmg: 92, def: 125, spd: 72 },
    passiveEffect: 'High knockback resistance',
    passiveName: 'Heavy Body',
    skill1Name: 'Fortress Slam',
    skill1Cooldown: 5000,
    skill2Name: 'Anchor Brace',
    skill2Cooldown: 7000,
    ultimateName: 'Unstoppable Wall',
    weapon: {
      type: 'giant_hammer_shield',
      name: 'Giant Hammer / Shield',
      description: 'Massive hammer for crushing blows and shield for defense'
    },
    skill1Config: {
      name: 'Fortress Slam',
      cooldown: 5000,
      effects: [{ type: 'damage', value: 30 }, { type: 'knockback', value: 20 }, { type: 'push', value: 15, radius: 100 }],
      visualEffects: ['cracks', 'dust_burst', 'metal_sparks'],
      description: 'Hammer slam causes ground shockwave'
    },
    skill2Config: {
      name: 'Anchor Brace',
      cooldown: 7000,
      effects: [{ type: 'shield', value: 50, duration: 3000 }, { type: 'buff', value: 2, duration: 3000 }],
      visualEffects: ['metal_sparks', 'barrier_lines'],
      description: 'Plants shield into ground, blocks damage'
    },
    ultimateConfig: {
      name: 'Unstoppable Wall',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 40 }, { type: 'knockback', value: 30 }, { type: 'buff', value: 3, duration: 5000 }],
      visualEffects: ['cracks', 'dust_burst', 'metal_sparks'],
      description: 'Charges forward shield-first crushing enemies'
    },
    aiConfig: {
      aggression: 4,
      mobility: 3,
      precision: 5,
      chaos: 2,
      greed: 3,
      fear: 2,
      revenge: 8,
      skill: 5,
      discipline: 9
    }
  },
  {
    id: 'oval',
    type: 'oval',
    name: 'Oval',
    color: '#96ceb4',
    description: 'Speed harasser with constant movement',
    role: 'Velocity Ranger',
    stats: { hp: 100, dmg: 92, def: 86, spd: 125 },
    passiveEffect: 'Keeps speed while aiming',
    passiveName: 'Velocity Drift',
    skill1Name: 'Flash Dash',
    skill1Cooldown: 3000,
    skill2Name: 'Rapid Volley',
    skill2Cooldown: 5000,
    ultimateName: 'Hyper Orbit',
    weapon: {
      type: 'twin_energy_bows',
      name: 'Twin Energy Bows',
      description: 'Dual energy bows that fire tracking arrows while moving'
    },
    skill1Config: {
      name: 'Flash Dash',
      cooldown: 3000,
      effects: [{ type: 'teleport', value: 120 }, { type: 'buff', value: 1.5, duration: 2000 }],
      visualEffects: ['blue_streaks', 'wind_lines'],
      description: 'High-speed dodge'
    },
    skill2Config: {
      name: 'Rapid Volley',
      cooldown: 5000,
      effects: [{ type: 'damage', value: 15 }, { type: 'knockback', value: 5 }],
      visualEffects: ['arrow_trails', 'wind_lines'],
      description: 'Fires 3 tracking arrows while moving'
    },
    ultimateConfig: {
      name: 'Hyper Orbit',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 45 }, { type: 'buff', value: 2, duration: 5000 }],
      visualEffects: ['arrow_trails', 'wind_lines', 'blue_streaks'],
      description: 'Runs circles around enemy firing nonstop arrows'
    },
    aiConfig: {
      aggression: 6,
      mobility: 10,
      precision: 5,
      chaos: 6,
      greed: 5,
      fear: 4,
      revenge: 4,
      skill: 6,
      discipline: 4
    }
  },
  {
    id: 'hexagon',
    type: 'hexagon',
    name: 'Hexagon',
    color: '#ffeaa7',
    description: 'Defender that is safe, reactive, and punishes aggression',
    role: 'Tactical Defender',
    stats: { hp: 100, dmg: 90, def: 118, spd: 88 },
    passiveEffect: 'Auto barrier appears periodically',
    passiveName: 'Honeycomb Guard',
    skill1Name: 'Shield Pulse',
    skill1Cooldown: 5000,
    skill2Name: 'Angle Lock',
    skill2Cooldown: 6000,
    ultimateName: 'Fortress Grid',
    weapon: {
      type: 'shield_drones',
      name: 'Shield Drones',
      description: 'Autonomous drones that create defensive barriers and fire beams'
    },
    skill1Config: {
      name: 'Shield Pulse',
      cooldown: 5000,
      effects: [{ type: 'push', value: 20, radius: 120 }, { type: 'knockback', value: 10 }],
      visualEffects: ['hex_shields', 'pulse_waves'],
      description: 'Pulse blast pushes enemies away'
    },
    skill2Config: {
      name: 'Angle Lock',
      cooldown: 6000,
      effects: [{ type: 'debuff', value: 0.5, duration: 3000 }, { type: 'push', value: 10, radius: 80 }],
      visualEffects: ['barrier_lines', 'hex_shields'],
      description: 'Launches trap field slowing target'
    },
    ultimateConfig: {
      name: 'Fortress Grid',
      cooldown: 15000,
      effects: [{ type: 'shield', value: 40, duration: 5000 }, { type: 'damage', value: 35 }, { type: 'push', value: 15, radius: 150 }],
      visualEffects: ['hex_shields', 'barrier_lines', 'pulse_waves'],
      description: 'Summons rotating barrier walls + drones firing beams'
    },
    aiConfig: {
      aggression: 3,
      mobility: 4,
      precision: 7,
      chaos: 2,
      greed: 2,
      fear: 2,
      revenge: 9,
      skill: 7,
      discipline: 8
    }
  },
  {
    id: 'spiral',
    type: 'spiral',
    name: 'Spiral',
    color: '#dfe6e9',
    description: 'Chaos fighter with unpredictable movement',
    role: 'Chaos Mage',
    stats: { hp: 100, dmg: 104, def: 92, spd: 108 },
    passiveEffect: 'Hits curve oddly',
    passiveName: 'Spin Redirect',
    skill1Name: 'Vortex Pull',
    skill1Cooldown: 5000,
    skill2Name: 'Spiral Shift',
    skill2Cooldown: 4000,
    ultimateName: 'Gravity Collapse',
    weapon: {
      type: 'gravity_staff',
      name: 'Gravity Staff',
      description: 'Staff that manipulates gravity and creates spatial distortions'
    },
    skill1Config: {
      name: 'Vortex Pull',
      cooldown: 5000,
      effects: [{ type: 'pull', value: 20, radius: 100 }, { type: 'damage', value: 15 }],
      visualEffects: ['purple_vortex', 'warped_space'],
      description: 'Creates mini black hole'
    },
    skill2Config: {
      name: 'Spiral Shift',
      cooldown: 4000,
      effects: [{ type: 'teleport', value: 150 }, { type: 'buff', value: 1.3, duration: 2000 }],
      visualEffects: ['warped_space', 'purple_vortex'],
      description: 'Random short teleport'
    },
    ultimateConfig: {
      name: 'Gravity Collapse',
      cooldown: 15000,
      effects: [{ type: 'pull', value: 30, radius: 200 }, { type: 'damage', value: 50 }, { type: 'knockback', value: 15 }],
      visualEffects: ['purple_vortex', 'warped_space', 'debris_pull'],
      description: 'Massive singularity dragging enemies inward'
    },
    aiConfig: {
      aggression: 7,
      mobility: 8,
      precision: 4,
      chaos: 10,
      greed: 6,
      fear: 3,
      revenge: 5,
      skill: 6,
      discipline: 3
    }
  },
  {
    id: 'rhombus',
    type: 'rhombus',
    name: 'Rhombus',
    color: '#fd79a8',
    description: 'Counter duelist that baits mistakes and punishes',
    role: 'Counter Ninja',
    stats: { hp: 100, dmg: 108, def: 96, spd: 100 },
    passiveEffect: 'Perfect dodge empowers next hit',
    passiveName: 'Mirror Reflex',
    skill1Name: 'Shard Counter',
    skill1Cooldown: 4000,
    skill2Name: 'Prism Flip',
    skill2Cooldown: 5000,
    ultimateName: 'Mirror Storm',
    weapon: {
      type: 'shuriken_daggers',
      name: 'Shuriken + Daggers',
      description: 'Thrown projectiles and melee daggers for counter attacks'
    },
    skill1Config: {
      name: 'Shard Counter',
      cooldown: 4000,
      effects: [{ type: 'shield', value: 30, duration: 2000 }, { type: 'damage', value: 25 }, { type: 'knockback', value: 12 }],
      visualEffects: ['mirror_shards', 'silver_trails'],
      description: 'Blocks then throws explosive shuriken'
    },
    skill2Config: {
      name: 'Prism Flip',
      cooldown: 5000,
      effects: [{ type: 'teleport', value: 100 }, { type: 'damage', value: 20 }, { type: 'buff', value: 1.5, duration: 2000 }],
      visualEffects: ['silver_trails', 'clone_flicker'],
      description: 'Backflip teleport behind enemy'
    },
    ultimateConfig: {
      name: 'Mirror Storm',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 55 }, { type: 'knockback', value: 18 }, { type: 'buff', value: 2, duration: 4000 }],
      visualEffects: ['mirror_shards', 'silver_trails', 'clone_flicker'],
      description: 'Clone images throw dozens of shuriken'
    },
    aiConfig: {
      aggression: 5,
      mobility: 6,
      precision: 8,
      chaos: 4,
      greed: 7,
      fear: 3,
      revenge: 9,
      skill: 8,
      discipline: 7
    }
  },
  {
    id: 'star',
    type: 'star',
    name: 'Star',
    color: '#fdcb6e',
    description: 'Berserker with maximum aggression',
    role: 'Berserker Warrior',
    stats: { hp: 100, dmg: 122, def: 82, spd: 110 },
    passiveEffect: 'Extra collision damage',
    passiveName: 'Spike Contact',
    skill1Name: 'Star Impact',
    skill1Cooldown: 4000,
    skill2Name: 'Nova Spin',
    skill2Cooldown: 6000,
    ultimateName: 'Burst Chain Mode',
    weapon: {
      type: 'spiked_chain_blades',
      name: 'Spiked Chain Blades',
      description: 'Whirling chain weapons that deal extra collision damage'
    },
    skill1Config: {
      name: 'Star Impact',
      cooldown: 4000,
      effects: [{ type: 'damage', value: 30 }, { type: 'knockback', value: 15 }],
      visualEffects: ['fire_sparks', 'explosive_impacts'],
      description: 'Chain spin slam'
    },
    skill2Config: {
      name: 'Nova Spin',
      cooldown: 6000,
      effects: [{ type: 'damage', value: 25 }, { type: 'knockback', value: 12 }, { type: 'buff', value: 1.3, duration: 3000 }],
      visualEffects: ['chain_blur', 'fire_sparks'],
      description: 'Whirlwind blade spin'
    },
    ultimateConfig: {
      name: 'Burst Chain Mode',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 40 }, { type: 'buff', value: 2.5, duration: 5000 }, { type: 'knockback', value: 20 }],
      visualEffects: ['fire_sparks', 'chain_blur', 'explosive_impacts'],
      description: 'Wild speed mode with chain combos'
    },
    aiConfig: {
      aggression: 10,
      mobility: 7,
      precision: 5,
      chaos: 7,
      greed: 9,
      fear: 1,
      revenge: 6,
      skill: 5,
      discipline: 3
    }
  },
  {
    id: 'heart',
    type: 'heart',
    name: 'Heart',
    color: '#e17055',
    description: 'Sustain survivor that outlasts enemies',
    role: 'Trickster Support',
    stats: { hp: 100, dmg: 80, def: 108, spd: 94 },
    passiveEffect: 'Regens slowly',
    passiveName: 'Recovery Pulse',
    skill1Name: 'Bait Shift',
    skill1Cooldown: 5000,
    skill2Name: 'Pulse Drift',
    skill2Cooldown: 4000,
    ultimateName: 'Sustain Field',
    weapon: {
      type: 'charm_wand_pulse_daggers',
      name: 'Charm Wand / Pulse Daggers',
      description: 'Support weapons that create illusions and healing effects'
    },
    skill1Config: {
      name: 'Bait Shift',
      cooldown: 5000,
      effects: [{ type: 'teleport', value: 80 }, { type: 'buff', value: 1.2, duration: 2000 }],
      visualEffects: ['illusion_fade', 'pink_aura'],
      description: 'Leaves clone decoy'
    },
    skill2Config: {
      name: 'Pulse Drift',
      cooldown: 4000,
      effects: [{ type: 'heal', value: 10 }, { type: 'teleport', value: 100 }],
      visualEffects: ['heart_particles', 'pink_aura'],
      description: 'Dash with healing trail'
    },
    ultimateConfig: {
      name: 'Sustain Field',
      cooldown: 15000,
      effects: [{ type: 'heal', value: 30 }, { type: 'shield', value: 25, duration: 8000 }, { type: 'buff', value: 1.5, duration: 8000 }],
      visualEffects: ['pink_aura', 'heart_particles', 'illusion_fade'],
      description: 'Healing zone with pulse waves'
    },
    aiConfig: {
      aggression: 3,
      mobility: 5,
      precision: 6,
      chaos: 3,
      greed: 2,
      fear: 5,
      revenge: 4,
      skill: 6,
      discipline: 8
    }
  },
  {
    id: 'diamond',
    type: 'diamond',
    name: 'Diamond',
    color: '#74b9ff',
    description: 'Precision striker with accuracy and prediction',
    role: 'Precision Hunter',
    stats: { hp: 100, dmg: 114, def: 90, spd: 104 },
    passiveEffect: 'Perfect angle hits bonus damage',
    passiveName: 'Critical Angles',
    skill1Name: 'Prism Strike',
    skill1Cooldown: 4000,
    skill2Name: 'Refraction Step',
    skill2Cooldown: 5000,
    ultimateName: 'Precision Lock',
    weapon: {
      type: 'crystal_spear_laser_bow',
      name: 'Crystal Spear / Laser Bow',
      description: 'Precision weapons that deal bonus damage at perfect angles'
    },
    skill1Config: {
      name: 'Prism Strike',
      cooldown: 4000,
      effects: [{ type: 'damage', value: 28 }, { type: 'knockback', value: 10 }],
      visualEffects: ['crystal_shards', 'lasers'],
      description: 'Spear lunge with piercing beam'
    },
    skill2Config: {
      name: 'Refraction Step',
      cooldown: 5000,
      effects: [{ type: 'teleport', value: 90 }, { type: 'buff', value: 1.4, duration: 2000 }],
      visualEffects: ['refracted_light', 'crystal_shards'],
      description: 'Short-range teleport split into light images'
    },
    ultimateConfig: {
      name: 'Precision Lock',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 50 }, { type: 'knockback', value: 22 }, { type: 'buff', value: 2, duration: 4000 }],
      visualEffects: ['crystal_shards', 'lasers', 'refracted_light'],
      description: 'Auto-aim crystal shots then spear finisher'
    },
    aiConfig: {
      aggression: 7,
      mobility: 6,
      precision: 10,
      chaos: 3,
      greed: 7,
      fear: 3,
      revenge: 6,
      skill: 9,
      discipline: 8
    }
  },
  {
    id: 'crescent',
    type: 'crescent',
    name: 'Crescent',
    color: '#a29bfe',
    description: 'Trickster with curved movement and traps',
    role: 'Moon Rogue',
    stats: { hp: 100, dmg: 106, def: 94, spd: 108 },
    passiveEffect: 'Curved movement boosts attacks',
    passiveName: 'Curve Slash',
    skill1Name: 'Moon Hook',
    skill1Cooldown: 5000,
    skill2Name: 'Crescent Flip',
    skill2Cooldown: 5000,
    ultimateName: 'Lunar Rift',
    weapon: {
      type: 'crescent_scythe',
      name: 'Crescent Scythe',
      description: 'Curved blade that deals extra damage with curved movement'
    },
    skill1Config: {
      name: 'Moon Hook',
      cooldown: 5000,
      effects: [{ type: 'pull', value: 15, radius: 120 }, { type: 'damage', value: 20 }],
      visualEffects: ['silver_moon_trails', 'curved_shockwave'],
      description: 'Scythe hook pulls enemy'
    },
    skill2Config: {
      name: 'Crescent Flip',
      cooldown: 5000,
      effects: [{ type: 'teleport', value: 100 }, { type: 'damage', value: 22 }, { type: 'buff', value: 1.3, duration: 2000 }],
      visualEffects: ['silver_moon_trails', 'dark_mist'],
      description: 'Acrobatic flip slash'
    },
    ultimateConfig: {
      name: 'Lunar Rift',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 48 }, { type: 'pull', value: 25, radius: 180 }, { type: 'knockback', value: 15 }],
      visualEffects: ['silver_moon_trails', 'dark_mist', 'curved_shockwave'],
      description: 'Large moon arc wave cutting battlefield'
    },
    aiConfig: {
      aggression: 6,
      mobility: 7,
      precision: 6,
      chaos: 8,
      greed: 6,
      fear: 4,
      revenge: 5,
      skill: 7,
      discipline: 5
    }
  },
  {
    id: 'dodecahedron',
    type: 'dodecahedron',
    name: 'Dodecahedron',
    color: '#00b894',
    description: 'All-rounder with smart adaptive fighting',
    role: 'Perfect Warrior',
    stats: { hp: 100, dmg: 102, def: 102, spd: 102 },
    passiveEffect: 'Learns enemy style',
    passiveName: 'Adaptive Logic',
    skill1Name: 'Geometry Lock',
    skill1Cooldown: 5000,
    skill2Name: 'Pattern Read',
    skill2Cooldown: 7000,
    ultimateName: 'Perfect Form',
    weapon: {
      type: 'morphing_arsenal',
      name: 'Morphing Arsenal',
      description: 'Adaptive weapon that cycles through different forms to counter opponents'
    },
    skill1Config: {
      name: 'Geometry Lock',
      cooldown: 5000,
      effects: [{ type: 'debuff', value: 0.6, duration: 3000 }, { type: 'damage', value: 20 }],
      visualEffects: ['golden_forms', 'weapon_morphing'],
      description: 'Uses chains/traps based on opponent'
    },
    skill2Config: {
      name: 'Pattern Read',
      cooldown: 7000,
      effects: [{ type: 'buff', value: 1.5, duration: 4000 }, { type: 'shield', value: 20, duration: 2000 }],
      visualEffects: ['tactical_aura', 'golden_forms'],
      description: 'Counter weapon chosen automatically'
    },
    ultimateConfig: {
      name: 'Perfect Form',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 45 }, { type: 'buff', value: 2.5, duration: 6000 }, { type: 'knockback', value: 18 }],
      visualEffects: ['golden_forms', 'weapon_morphing', 'tactical_aura'],
      description: 'Cycles sword, spear, bow, hammer rapidly'
    },
    aiConfig: {
      aggression: 6,
      mobility: 6,
      precision: 7,
      chaos: 4,
      greed: 5,
      fear: 3,
      revenge: 6,
      skill: 8,
      discipline: 9
    }
  },
  {
    id: '13',
    type: 'dodecahedron',
    name: 'Dodecahedron',
    color: '#FF6B6B',
    description: 'The master tactician with adaptive learning abilities.',
    role: 'Tactician',
    stats: { hp: 100, dmg: 100, def: 100, spd: 100 },
    passiveEffect: 'Adaptive Logic - learns opponent patterns, gains small bonuses over time',
    skill1Name: 'Geometry Lock',
    skill1Cooldown: 5000,
    skill2Name: 'Pattern Read',
    skill2Cooldown: 7000,
    ultimateName: 'Perfect Form',
    aiConfig: {
      aggression: 0.5,
      mobility: 0.5,
      precision: 0.9,
      chaos: 0.2,
      greed: 0.4,
      fear: 0.3,
      revenge: 0.6,
      skill: 0.9,
      discipline: 0.9
    }
  },
  {
    id: '14',
    type: 'nonagon',
    name: 'Nonagon',
    color: '#9B59B6',
    description: 'A clone shape with mirage and illusion abilities.',
    role: 'Mirage Illusionist',
    stats: { hp: 100, dmg: 100, def: 100, spd: 100 },
    passiveEffect: 'Chance to dodge attacks',
    passiveName: 'Ghostly Presence',
    skill1Name: 'Mirage Clone',
    skill1Cooldown: 4500,
    skill2Name: 'Phantom Dash',
    skill2Cooldown: 5500,
    ultimateName: 'Phantom Swarm',
    weapon: {
      type: 'clone_kunai',
      name: 'Clone Kunai',
      description: 'Thrown weapons that create illusionary clones'
    },
    skill1Config: {
      name: 'Mirage Clone',
      cooldown: 4500,
      effects: [{ type: 'teleport', value: 80 }, { type: 'damage', value: 18 }, { type: 'buff', value: 1.3, duration: 2000 }],
      visualEffects: ['smoke_vanish', 'afterimages'],
      description: 'Creates real-looking clones'
    },
    skill2Config: {
      name: 'Phantom Dash',
      cooldown: 5500,
      effects: [{ type: 'teleport', value: 100 }, { type: 'buff', value: 1.4, duration: 2500 }],
      visualEffects: ['afterimages', 'smoke_vanish'],
      description: 'Leaves decoy that moves briefly'
    },
    ultimateConfig: {
      name: 'Phantom Swarm',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 52 }, { type: 'knockback', value: 20 }, { type: 'buff', value: 2, duration: 5000 }],
      visualEffects: ['smoke_vanish', 'afterimages', 'clone_flicker'],
      description: 'All clones attack at once'
    },
    aiConfig: {
      aggression: 6,
      mobility: 8,
      precision: 7,
      chaos: 7,
      greed: 5,
      fear: 4,
      revenge: 5,
      skill: 7,
      discipline: 6
    }
  },
  {
    id: '15',
    type: 'polygon',
    name: 'Polygon',
    color: '#1ABC9C',
    description: 'A clone shape with modular form-shifting abilities.',
    role: 'Adaptive Splitter',
    stats: { hp: 100, dmg: 100, def: 100, spd: 100 },
    passiveEffect: 'Slowly gains modules over time',
    passiveName: 'Modular Design',
    skill1Name: 'Adaptive Split',
    skill1Cooldown: 5000,
    skill2Name: 'Form Shift',
    skill2Cooldown: 6000,
    ultimateName: 'Evolution Mode',
    weapon: {
      type: 'fragment_blades',
      name: 'Fragment Blades',
      description: 'Splitting weapons that adapt to counter enemy tactics'
    },
    skill1Config: {
      name: 'Adaptive Split',
      cooldown: 5000,
      effects: [{ type: 'damage', value: 22 }, { type: 'buff', value: 1.4, duration: 3000 }, { type: 'teleport', value: 70 }],
      visualEffects: ['shape_morphing', 'fragment_storm'],
      description: 'Splits into mini polygons with knives'
    },
    skill2Config: {
      name: 'Form Shift',
      cooldown: 6000,
      effects: [{ type: 'buff', value: 1.5, duration: 4000 }, { type: 'shield', value: 15, duration: 3000 }],
      visualEffects: ['shape_morphing', 'fragment_storm'],
      description: 'Temporarily changes shape properties'
    },
    ultimateConfig: {
      name: 'Evolution Mode',
      cooldown: 15000,
      effects: [{ type: 'damage', value: 48 }, { type: 'buff', value: 2.2, duration: 6000 }, { type: 'knockback', value: 16 }],
      visualEffects: ['shape_morphing', 'fragment_storm', 'weapon_morphing'],
      description: 'Transforms weapon to counter enemy'
    },
    aiConfig: {
      aggression: 5,
      mobility: 6,
      precision: 8,
      chaos: 3,
      greed: 6,
      fear: 3,
      revenge: 7,
      skill: 8,
      discipline: 8
    }
  }
];

export function getShapeData(type: string): typeof SHAPES_DATA[0] | undefined {
  return SHAPES_DATA.find(s => s.type === type);
}

export function getShapeColor(type: string): number {
  const shape = getShapeData(type);
  if (!shape) return 0xffffff;
  return parseInt(shape.color.replace('#', ''), 16);
}
