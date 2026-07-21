// Camera direction: gives each region a distinct base "mood" (eye height, field
// of view, sway, banking) blended pop-free at borders, and stages dramatic
// per-beat moves — descents into pits and dens, soaring into the clouds, storm
// turbulence, summit climbs, vista reveals — so the journey never settles into
// one repeated glide.
import * as THREE from 'three';
import { journey } from './path.js';
import { DIRECTIONS } from './direction.js';
import { clamp, smoothstep } from './utils.js';

const MOOD_KEYS = ['eye', 'fov', 'look', 'bob', 'sway', 'bank', 'lateral', 'orbit'];

// Convert a per-book direction spec into a camera mood.
function moodFromDir(dir) {
  return {
    eye: dir.eye,
    fov: dir.fov,
    look: dir.pitch * 44,        // gaze bias: up (+) / down over the land (-)
    bob: dir.vantage === 'floatUp' ? 0.6 : dir.vantage === 'reverent' ? 0.2 : 0.4,
    sway: dir.sway,
    bank: dir.roll,
    lateral: dir.lateral || 0,   // ride offset to one side of the path
    orbit: dir.orbit || 0,       // slow searching arc of the gaze
  };
}
const INTRO_MOOD = { eye: 8, fov: 4, look: 6, bob: 0.5, sway: 1.0, bank: 0.9, lateral: 0, orbit: 0.3 };

// Dramatic per-beat moves, matched by book id + story title.
const MOMENTS = [
  { book: 'exodus',       re: /arrives at Sinai/,     type: 'ascend',  mag: 30, range: 150, fov: -3 },
  { book: 'deuteronomy',  re: /dies within sight/,    type: 'ascend',  mag: 46, range: 190, fov: 8 },
  { book: 'joshua',       re: /crosses the Jordan/,   type: 'vista',   mag: 15, range: 175, fov: 9 },
  { book: 'judges',       re: /Samson dies destroying/,type: 'shake',  mag: 0.6, range: 110 },
  { book: 'kings',        re: /Baal on Carmel/,       type: 'pushin',  mag: 4,  range: 120, fov: -9 },
  { book: 'kings',        re: /Elijah ascends/,       type: 'soar',    mag: 78, range: 150, fov: 5, shake: 0.4 },
  { book: 'isaiah',       re: /sees YHWH enthroned/,  type: 'ascend',  mag: 34, range: 150, fov: -2 },
  { book: 'jeremiah',     re: /lowered into a cistern/,type: 'descend', mag: 22, range: 120, fov: -4, dark: 0.42 },
  { book: 'ezekiel',      re: /divine chariot/,       type: 'soar',    mag: 66, range: 170, fov: 4 },
  { book: 'ezekiel',      re: /valley of dry bones/,  type: 'lowskim', mag: 9,  range: 150 },
  { book: 'the-twelve',   re: /Jonah flees/,          type: 'descend', mag: 24, range: 130, fov: -5, dark: 0.5 },
  { book: 'psalms',       re: /righteous sufferer/,   type: 'descend', mag: 11, range: 160, dark: 0.36 },
  { book: 'job',          re: /./,                    type: 'shake',   mag: 1.3, range: 160, fov: 4 },
  { book: 'daniel',       re: /lions/,                type: 'descend', mag: 15, range: 120, fov: -3, dark: 0.4 },
  { book: 'daniel',       re: /son of man/,           type: 'soar',    mag: 84, range: 185, fov: 8 },
  { book: 'chronicles',   re: /Cyrus/,                type: 'soar',    mag: 42, range: 220, fov: 6 },
];

function bell(x, sigma) { const q = x / sigma; return Math.exp(-0.5 * q * q); }

export class CameraDirector {
  constructor() {
    // Moods aligned to journey.paramRegions (intro + 24 books + outro).
    const prs = journey.paramRegions;
    this.moods = prs.map((r, i) => {
      if (i === 0) return { ...INTRO_MOOD };
      if (i === prs.length - 1) return moodFromDir(DIRECTIONS.chronicles);
      const dir = DIRECTIONS[journey.regions[i - 1].book.id];
      return dir ? moodFromDir(dir) : { ...INTRO_MOOD };
    });

    // Resolve each moment to a world distance.
    this.moments = [];
    for (const m of MOMENTS) {
      const region = journey.regions.find(r => r.book.id === m.book);
      if (!region) continue;
      const story = region.stories.find(s => m.re.test(s.data.title));
      if (!story) continue;
      this.moments.push({ def: m, sd: story.d });
    }
    this._m = { eye: 0, fov: 0, look: 0, bob: 0, sway: 0, bank: 0, lateral: 0, orbit: 0 };
  }

  mood(d) {
    const w = journey.weights(d);
    let norm = 0;
    for (let i = 1; i < w.length; i += 2) norm += w[i];
    const out = this._m;
    for (const k of MOOD_KEYS) out[k] = 0;
    for (let i = 0; i < w.length; i += 2) {
      const md = this.moods[w[i]];
      const wi = w[i + 1] / norm;
      for (const k of MOOD_KEYS) out[k] += md[k] * wi;
    }
    return out;
  }

  // Apply dramatic beats. Mutates camPos/lookPos; returns render modifiers.
  drama(d, time, camPos, lookPos, smp, reduceMotion) {
    let fovAdd = 0, rollAdd = 0, exposureMul = 1, fogFarMul = 1;
    for (const { def, sd } of this.moments) {
      const b = bell(d - sd, def.range);
      if (b < 0.004) continue;
      switch (def.type) {
        case 'ascend':
          camPos.y += def.mag * b;
          lookPos.y += def.mag * 0.35 * b;
          fovAdd += (def.fov || 0) * b;
          break;
        case 'soar':
          camPos.y += def.mag * b;
          lookPos.y += def.mag * 0.12 * b;
          fovAdd += (def.fov || 0) * b;
          if (def.shake && !reduceMotion) {
            camPos.y += Math.sin(time * 9) * def.shake * b;
            rollAdd += Math.sin(time * 6.3) * 0.02 * def.shake * b;
          }
          break;
        case 'descend':
          camPos.y -= def.mag * b;
          lookPos.y -= def.mag * 0.5 * b;
          fovAdd += (def.fov || -3) * b;
          exposureMul *= (1 - (def.dark || 0) * b);
          fogFarMul *= (1 - 0.35 * b);
          break;
        case 'vista':
          camPos.y += def.mag * b;
          fovAdd += (def.fov || 8) * b;
          break;
        case 'pushin':
          camPos.y += (def.mag || 3) * b;
          fovAdd += (def.fov || -8) * b;
          break;
        case 'lowskim':
          camPos.y -= def.mag * b;
          break;
        case 'shake':
          if (!reduceMotion) {
            const j = def.mag * b;
            camPos.addScaledVector(smp.lat, Math.sin(time * 13.0 + sd) * j);
            camPos.y += Math.sin(time * 17.0 + sd * 0.5) * j * 0.7;
            rollAdd += Math.sin(time * 8.0 + sd) * 0.03 * def.mag * b;
            fovAdd += (def.fov || 0) * b * (0.6 + 0.4 * Math.sin(time * 4));
          }
          break;
      }
    }
    return { fovAdd, rollAdd, exposureMul, fogFarMul };
  }
}
