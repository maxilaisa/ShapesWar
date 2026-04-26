# 🎮 Shape Arena Simulator

A physics-based autonomous shape battle simulation game featuring 12 unique shapes with special abilities, AI decision-making, and combo systems.

## Features

- **12 Unique Shapes**: Circle, Triangle, Square, Oval, Hexagon, Spiral, Rhombus, Star, Heart, Diamond, Crescent, Dodecahedron
- **Physics-Based Combat**: Momentum collisions, wall bounces, knockback, and combo chains
- **AI Decision System**: Frame-by-frame utility scoring with adjustable behavior parameters
- **Ultimate System**: Build charges through hits and combos to unleash powerful abilities
- **Multiple Game Modes**: 1v1, Free-For-All, Tournament, Replay, and Cinematic modes
- **Visual Effects**: Particle effects, trails, impact effects, and ultimate auras

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Matter.js for physics simulation
- PixiJS for rendering
- Socket.io-client for real-time updates

### Backend
- Node.js with Express
- Socket.io for real-time communication
- REST API for game state management

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on port 3001.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on port 3000.

## Deployment on Render

This project is configured for deployment on Render using the provided `render.yaml` file.

### Backend Deployment
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Render will automatically detect the backend configuration
4. Set environment variables as needed

### Frontend Deployment
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set the build command to `cd frontend && npm install && npm run build`
4. Set the publish directory to `frontend/dist`
5. Set the API URL environment variable

## Game Mechanics

### Universal Stats
- All shapes: 100 HP
- Same base collision damage
- Same movement cap
- Same mass baseline
- Ultimate requirement: 10 hit charges

### Damage System
- Physical contact: collision hits, charge impacts, bounce impacts, counter impacts
- Ranged abilities: push, redirect, pressure, zone, bait

### Ultimate Bar Charges
- Light hit: +1 charge
- Clean hit: +2 charges
- Wall combo hit: +3 charges
- Counter hit: +4 charges
- 10 charges = Ultimate activation

### Combo System
- Hit chaining within 2.5 seconds
- Contact: +1 combo
- Wall combo: +2 combo
- Air re-contact: +2 combo
- Counter-hit: +3 combo

### AI Behavior Sliders
Adjust the AI behavior using these parameters:
- **Aggression**: How likely to engage enemies
- **Mobility**: Movement and dodging tendency
- **Precision**: Skill usage accuracy
- **Chaos**: Unpredictable behavior
- **Greed**: Pursuit of damage opportunities
- **Fear**: Defensive behavior
- **Revenge**: Counter-attack when damaged
- **Skill**: Ability usage frequency
- **Discipline**: Sticking to strategies

## Shape Abilities

### Circle - Momentum Hunter
- **Passive**: Momentum Build - Each rebound adds 5% force to next collision (stacks up to 3)
- **Skill 1**: Rolling Charge - Curved ram with wall ricochet
- **Skill 2**: Rebound Feint - Fake bounce angle then redirect
- **Ultimate**: Orbital Breaker - Rapid ricochet mode with increased bounce speed

### Triangle - Assassin
- **Passive**: Critical Edge - Perfect-angle contacts do bonus impact
- **Skill 1**: Piercing Dash - Instant lunge in chosen angle
- **Skill 2**: Edge Step - Micro dodge into immediate counter angle
- **Ultimate**: Perfect Edge - All contact hits count as critical impacts

### Square - Juggernaut
- **Passive**: Heavy Body - Reduced knockback
- **Skill 1**: Fortress Slam - Heavy forward body slam with knockback burst
- **Skill 2**: Anchor Brace - Plants itself, increases mass
- **Ultimate**: Unstoppable Wall - Ignores collision interruption, charges through opponents

### Oval - Skirmisher
- **Passive**: Velocity Drift - Maintains speed after rebounds
- **Skill 1**: Flash Dash - Rapid multi-angle burst movement
- **Skill 2**: Slip Turn - Sudden trajectory reversal
- **Ultimate**: Hyper Orbit - Extreme speed ricochet mode

### Hexagon - Counter Defender
- **Passive**: Honeycomb Guard - Repeated hits do reduced knockback
- **Skill 1**: Shield Pulse - Repels nearby enemies
- **Skill 2**: Angle Lock - Punishes enemies entering certain approach angles
- **Ultimate**: Fortress Grid - Rotating defensive geometric barrier

### Spiral - Chaos Disruptor
- **Passive**: Spin Redirect - Slightly alters rebound vectors
- **Skill 1**: Vortex Pull - Applies movement drag toward spiral center
- **Skill 2**: Spiral Shift - Sudden chaotic bounce pattern burst
- **Ultimate**: Gravity Collapse - Localized chaos field distorting trajectories

### Rhombus - Counter Punisher
- **Passive**: Mirror Reflex - Counters gain bonus knockback
- **Skill 1**: Shard Counter - Counter stance, reflects stronger rebound
- **Skill 2**: Prism Flip - Angle inversion maneuver
- **Ultimate**: Mirror Storm - Chains reflected counter impacts

### Star - Berserker
- **Passive**: Spike Contact - Some impacts multi-hit
- **Skill 1**: Star Impact - Burst lunge strike
- **Skill 2**: Nova Spin - Spinning contact flurry
- **Ultimate**: Burst Chain Mode - Successive impacts can chain explosively

### Heart - Survival Trickster
- **Passive**: Recovery Pulse - Regens slowly while disengaged
- **Skill 1**: Bait Shift - Fake retreat causing enemy overcommit
- **Skill 2**: Pulse Drift - Defensive movement reset
- **Ultimate**: Sustain Field - High evasion + recovery mode

### Diamond - Precision Hunter
- **Passive**: Critical Angles - Precision-based bonus damage
- **Skill 1**: Prism Strike - Predictive intercept strike
- **Skill 2**: Refraction Step - Fake path switch
- **Ultimate**: Precision Lock - Greatly improved intercept prediction

### Crescent - Trick Duelist
- **Passive**: Curve Slash - Curved contact redirects enemies
- **Skill 1**: Moon Hook - Hooks enemy into bad bounce angle
- **Skill 2**: Crescent Flip - Arc-shaped evasive reversal
- **Ultimate**: Lunar Rift - Temporary warped movement field

### Dodecahedron - Adaptive Tactician
- **Passive**: Adaptive Logic - Learns repeated enemy patterns
- **Skill 1**: Geometry Lock - Funnels enemy movement into predictable routes
- **Skill 2**: Pattern Read - Temporary bounce-path prediction
- **Ultimate**: Perfect Form - 8 second perfect tactical mode

## License

MIT License
