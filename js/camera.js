// Camera direction: gives each region a distinct base "mood" (eye height, field
// of view, sway, banking) blended pop-free at borders, and stages dramatic
// per-beat moves — descents into pits and dens, soaring into the clouds, storm
// turbulence, summit climbs, vista reveals — so the journey never settles into
// one repeated glide.
import * as THREE from 'three';
import { journey } from './path.js';
import { clamp, smoothstep } from './utils.js';

// Per-terrain-style travel mood.
const STYLE_MOOD = {
  mountains:  { eye: 3,  fov: -3, look: 7,  bob: 0.45, sway: 0.7, bank: 1.2 },
  valley:     { eye: -1, fov: -3, look: 6,  bob: 0.5,  sway: 1.1, bank: 1.35 },
  canyon:     { eye: -3, fov: -7, look: 9,  bob: 0.35, sway: 0.6, bank: 1.5 },
  desert:     { eye: 7,  fov: 7,  look: -2, bob: 0.3,  sway: 1.5, bank: 0.8 },
  plain:      { eye: 9,  fov: 9,  look: -3, bob: 0.25, sway: 1.7, bank: 0.6 },
  hills:      { eye: 2,  fov: 0,  look: 3,  bob: 0.5,  sway: 1.0, bank: 1.0 },
  seaCliffs:  { eye: 11, fov: 2,  look: 1,  bob: 0.6,  sway: 0.9, bank: 1.1 },
  riverlands: { eye: 1,  fov: 2,  look: 2,  bob: 0.45, sway: 1.2, bank: 1.0 },
};
const MOOD_KEYS = ['eye', 'fov', 'look', 'bob', 'sway', 'bank'];

// Dramatic per-beat moves, matched by book id + story title.
const MOMENTS = [
  { book: 'exodus',       re: /Mountain in Smoke/,   type: 'ascend',  mag: 30, range: 150, fov: -3 },
  { book: 'deuteronomy',  re: /Mount Nebo/,          type: 'ascend',  mag: 46, range: 200, fov: 8 },
  { book: 'joshua',       re: /Crossing on Dry/,     type: 'vista',   mag: 15, range: 190, fov: 9 },
  { book: 'judges',       re: /Between the Pillars/, type: 'shake',   mag: 0.6, range: 110 },
  { book: 'kings',        re: /Fire on Carmel/,      type: 'pushin',  mag: 4,  range: 120, fov: -9 },
  { book: 'kings',        re: /Whirlwind of Fire/,   type: 'soar',    mag: 78, range: 150, fov: 5, shake: 0.4 },
  { book: 'isaiah',       re: /Throne in the Smoke/, type: 'ascend',  mag: 34, range: 150, fov: -2 },
  { book: 'jeremiah',     re: /Down in the Cistern/, type: 'descend', mag: 22, range: 120, fov: -4, dark: 0.42 },
  { book: 'ezekiel',      re: /Wheels Within/,       type: 'soar',    mag: 66, range: 175, fov: 4 },
  { book: 'ezekiel',      re: /Valley of Bones/,     type: 'lowskim', mag: 9,  range: 150 },
  { book: 'the-twelve',   re: /Flight to Tarshish/,  type: 'shake',   mag: 1.1, range: 150, fov: 3 },
  { book: 'the-twelve',   re: /Out of the Deep/,     type: 'descend', mag: 26, range: 130, fov: -5, dark: 0.5 },
  { book: 'psalms',       re: /Forsaken Hour/,       type: 'descend', mag: 10, range: 160, dark: 0.34 },
  { book: 'psalms',       re: /Hallelujah Dawn/,     type: 'vista',   mag: 16, range: 170, fov: 9 },
  { book: 'job',          re: /Out of the Whirlwind/,type: 'shake',   mag: 1.3, range: 160, fov: 4 },
  { book: 'daniel',       re: /Fourth in the Fire/,  type: 'pushin',  mag: 3,  range: 110, fov: -6 },
  { book: 'daniel',       re: /Den of Lions/,        type: 'descend', mag: 15, range: 120, fov: -3, dark: 0.4 },
  { book: 'daniel',       re: /One on the Clouds/,   type: 'soar',    mag: 84, range: 190, fov: 8 },
  { book: 'chronicles',   re: /Let Him Go Up/,       type: 'soar',    mag: 42, range: 230, fov: 6 },
];

function bell(x, sigma) { const q = x / sigma; return Math.exp(-0.5 * q * q); }

export class CameraDirector {
  constructor() {
    // Moods aligned to journey.paramRegions (intro + 24 books + outro).
    const prs = journey.paramRegions;
    this.moods = prs.map((r, i) => {
      if (i === 0) return { ...STYLE_MOOD.riverlands, eye: 6, fov: 4 };      // intro: a touch lifted
      if (i === prs.length - 1) return { ...STYLE_MOOD.hills, eye: 8, fov: 6 }; // outro: rising, open
      const book = journey.regions[i - 1].book;
      return { ...(STYLE_MOOD[book.terrain.style] || STYLE_MOOD.hills) };
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
    this._m = { eye: 0, fov: 0, look: 0, bob: 0, sway: 0, bank: 0 };
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
