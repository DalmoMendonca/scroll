// The journey: one analytic winding path through the world, partitioned into
// regions (intro + 24 books + outro). Provides position/tangent sampling and
// smoothly interpolated per-region visual parameters.
import * as THREE from 'three';
import { BOOKS } from './data.js';
import { clamp, smoothstep, lerp, mulberry32 } from './utils.js';
import { worldNoise } from './noise.js';

export const INTRO_LEN = 520;
export const OUTRO_LEN = 1050;
export const BOOK_BASE = 480;
export const PER_STORY = 330;      // spacing so only one caption is on screen at a time
export const BLEND = 130;          // half-width of the border blend zone
export const CORRIDOR = 900;       // half-width of the modeled world

// Meander of the path in x as a function of distance d (~= z).
const M1A = 150, M1K = (Math.PI * 2) / 3900;
const M2A = 40, M2K = (Math.PI * 2) / 1700, M2P = 2.1;

function meanderX(d) {
  return M1A * Math.sin(d * M1K) + M2A * Math.sin(d * M2K + M2P);
}
function meanderDx(d) {
  return M1A * M1K * Math.cos(d * M1K) + M2A * M2K * Math.cos(d * M2K + M2P);
}
function meanderDdx(d) {
  return -M1A * M1K * M1K * Math.sin(d * M1K) - M2A * M2K * M2K * Math.sin(d * M2K + M2P);
}

// Terrain silhouette parameters per landscape style.
const STYLE = {
  mountains:  { floor: 26, vs: 16, ve: 110, amp: 150, wallStart: 420, wallEnd: 880, wallH: 200, ridge: 0.7,  dune: 0 },
  hills:      { floor: 16, vs: 18, ve: 140, amp: 70,  wallStart: 420, wallEnd: 880, wallH: 110, ridge: 0.15, dune: 0 },
  desert:     { floor: 12, vs: 20, ve: 180, amp: 45,  wallStart: 450, wallEnd: 900, wallH: 90,  ridge: 0.05, dune: 1 },
  canyon:     { floor: 14, vs: 30, ve: 90,  amp: 60,  wallStart: 90,  wallEnd: 260, wallH: 230, ridge: 0.9,  dune: 0 },
  plain:      { floor: 10, vs: 24, ve: 200, amp: 25,  wallStart: 500, wallEnd: 900, wallH: 60,  ridge: 0,    dune: 0 },
  seaCliffs:  { floor: 24, vs: 16, ve: 120, amp: 110, wallStart: 400, wallEnd: 880, wallH: 150, ridge: 0.5,  dune: 0 },
  valley:     { floor: 12, vs: 14, ve: 80,  amp: 100, wallStart: 300, wallEnd: 800, wallH: 170, ridge: 0.4,  dune: 0 },
  riverlands: { floor: 8,  vs: 18, ve: 120, amp: 55,  wallStart: 420, wallEnd: 880, wallH: 100, ridge: 0.1,  dune: 0 },
};

const TOD_LIGHT = {
  night:       { sun: 0.22, hemi: 0.42 },
  predawn:     { sun: 0.5,  hemi: 0.55 },
  dawn:        { sun: 0.95, hemi: 0.7 },
  morning:     { sun: 1.1,  hemi: 0.8 },
  noon:        { sun: 1.25, hemi: 0.92 },
  goldenHour:  { sun: 1.05, hemi: 0.72 },
  dusk:        { sun: 0.7,  hemi: 0.6 },
  storm:       { sun: 0.5,  hemi: 0.55 },
  starryNight: { sun: 0.32, hemi: 0.48 },
};

const NUMERIC_KEYS = [
  'floorY', 'vs', 've', 'amp', 'wallStart', 'wallEnd', 'wallH', 'ridge', 'dune',
  'sea', 'river', 'stars', 'sunElev', 'storm', 'threadGlow', 'sunI', 'hemiI',
  'snow', 'mesa',
];

// Per-book terrain character, beyond what the landscape style provides.
const BOOK_TERRAIN = {
  isaiah:       { snow: 0.92, wallH: 250, amp: 165 },   // towering snow ranges
  lamentations: { snow: 0.5 },
  psalms:       { snow: 0.3 },
  numbers:      { mesa: 0.6 },                            // wilderness buttes
  exodus:       { mesa: 0.45 },
  deuteronomy:  { snow: 0.25 },
  daniel:       { vs: 40, ve: 260 },                      // wide flat Babylon plain
  esther:       { vs: 40, ve: 260 },
  ecclesiastes: { amp: 14, vs: 46, ve: 300 },             // flat, pale, endless
};
const COLOR_KEYS = ['skyTop', 'skyHorizon', 'fog', 'sun', 'terrainLow', 'terrainHigh', 'accent'];

function paramsFromBook(book) {
  const st = STYLE[book.terrain.style] || STYLE.hills;
  const tod = TOD_LIGHT[book.palette.timeOfDay] || TOD_LIGHT.morning;
  const p = {
    floorY: st.floor,
    vs: st.vs, ve: st.ve,
    amp: st.amp * book.terrain.amplitude,
    wallStart: st.wallStart, wallEnd: st.wallEnd, wallH: st.wallH,
    ridge: st.ridge, dune: st.dune,
    sea: (book.terrain.water === 'sea' || book.terrain.water === 'floodwaters') ? 1 : 0,
    river: book.terrain.water === 'river' ? 1 : 0,
    stars: book.palette.stars,
    sunElev: book.palette.sunElevation,
    storm: book.palette.timeOfDay === 'storm' ? 1 : 0,
    threadGlow: book.threadGlow,
    sunI: tod.sun, hemiI: tod.hemi,
    snow: 0, mesa: 0,
  };
  const ov = BOOK_TERRAIN[book.id];
  if (ov) Object.assign(p, ov);
  for (const k of COLOR_KEYS) p[k] = new THREE.Color(book.palette[k]);
  return p;
}

export class RegionParams {
  constructor() {
    for (const k of NUMERIC_KEYS) this[k] = 0;
    for (const k of COLOR_KEYS) this[k] = new THREE.Color();
  }
}

export class Journey {
  constructor() {
    // ---- Regions along d ----
    let d = INTRO_LEN;
    this.regions = BOOKS.map((book, bi) => {
      const len = BOOK_BASE + book.stories.length * PER_STORY;
      const rng = mulberry32(1000 + bi * 77);
      const n = book.stories.length;
      const startSide = (bi % 2 === 0) ? 1 : -1;
      const s0 = d + 280, s1 = d + len - 170;
      const stories = book.stories.map((st, i) => ({
        data: st,
        d: n === 1 ? (s0 + s1) / 2 : s0 + (i * (s1 - s0)) / (n - 1),
        side: (i % 2 === 0 ? 1 : -1) * startSide,
        worldPos: null, // filled by props.js once terrain exists
      }));

      // Every prop is owned by its story and sits AT that beat, so the visual
      // always matches the caption (no free-floating set pieces out of sequence).
      const placements = [];
      const hasRiver = book.terrain.water === 'river';
      stories.forEach(s => {
        if (!s.data.prop) return;
        // the river cut lives at u ∈ [~38, ~80]; keep right-side props past it
        const uMag = hasRiver && s.side > 0 ? 96 + rng() * 38 : 34 + rng() * 26;
        placements.push({
          type: s.data.prop, note: '',
          d: s.d, side: s.side, u: uMag * s.side,
          book, story: s,
        });
      });

      const region = { book, index: bi, d0: d, d1: d + len, len, stories, placements };
      d += len;
      return region;
    });
    this.introEnd = INTRO_LEN;
    this.outroStart = d;
    this.total = d + OUTRO_LEN;

    // ---- Parameter track: intro + books + outro ----
    const genesis = paramsFromBook(BOOKS[0]);
    const intro = { ...genesis };
    for (const k of COLOR_KEYS) intro[k] = genesis[k].clone();
    intro.skyTop = new THREE.Color('#05050f');
    intro.skyHorizon = new THREE.Color('#1a1430');
    intro.fog = new THREE.Color('#0c0a1c');
    intro.terrainLow = new THREE.Color('#07060f');
    intro.terrainHigh = new THREE.Color('#221c38');
    intro.stars = 0.95; intro.sunI = 0.5; intro.hemiI = 0.45; intro.sunElev = -0.08;
    intro.sun = new THREE.Color('#c98a5e');
    intro.threadGlow = 0.06;

    const chron = paramsFromBook(BOOKS[BOOKS.length - 1]);
    const outro = { ...chron };
    for (const k of COLOR_KEYS) outro[k] = chron[k].clone();
    outro.skyTop = new THREE.Color('#7aa8cf');
    outro.skyHorizon = new THREE.Color('#ffe2a8');
    outro.fog = new THREE.Color('#e8c9a0');
    outro.sun = new THREE.Color('#fff2cf');
    outro.terrainLow = new THREE.Color('#8a6a52');
    outro.terrainHigh = new THREE.Color('#e8cf9e');
    outro.accent = new THREE.Color('#ffe6a8');
    outro.stars = 0; outro.sunElev = 0.12; outro.sunI = 1.15; outro.hemiI = 0.85;
    outro.amp = 30; outro.wallH = 40; outro.floorY = 10; outro.threadGlow = 1.0;
    outro.storm = 0; outro.sea = 0; outro.river = 0;

    this.paramRegions = [
      { d0: 0, d1: INTRO_LEN, p: intro },
      ...this.regions.map(r => ({ d0: r.d0, d1: r.d1, p: paramsFromBook(r.book) })),
      { d0: this.outroStart, d1: this.total + 600, p: outro },
    ];

    this._w = []; // scratch weights
  }

  // Position/frame of the path at distance d. Writes into `out` {pos,tan,lat}.
  sample(d, out) {
    const x = meanderX(d);
    const dx = meanderDx(d);
    out.pos.set(x, this.floorYAt(d), d);
    const inv = 1 / Math.hypot(dx, 1);
    out.tan.set(dx * inv, 0, inv);
    out.lat.set(inv, 0, -dx * inv); // horizontal left-perpendicular
    return out;
  }

  curvature(d) { return meanderDdx(d); }

  worldXZ(d, u) {
    const x = meanderX(d);
    const dx = meanderDx(d);
    const inv = 1 / Math.hypot(dx, 1);
    return { x: x + inv * u, z: d - dx * inv * u };
  }

  // Region blend weights at d over paramRegions. Returns array of [idx, w].
  weights(d) {
    const w = this._w;
    w.length = 0;
    const prs = this.paramRegions;
    for (let i = 0; i < prs.length; i++) {
      const r = prs[i];
      if (d < r.d0 - BLEND || d > r.d1 + BLEND) continue;
      const rise = i === 0 ? 1 : smoothstep(r.d0 - BLEND, r.d0 + BLEND, d);
      const fall = i === prs.length - 1 ? 1 : 1 - smoothstep(r.d1 - BLEND, r.d1 + BLEND, d);
      const wi = rise * fall;
      if (wi > 0.0005) w.push(i, wi);
    }
    if (w.length === 0) { // beyond ends
      w.push(d <= 0 ? 0 : prs.length - 1, 1);
    }
    return w;
  }

  params(d, out) {
    const w = this.weights(d);
    let norm = 0;
    for (let i = 1; i < w.length; i += 2) norm += w[i];
    for (const k of NUMERIC_KEYS) out[k] = 0;
    for (const k of COLOR_KEYS) out[k].setRGB(0, 0, 0);
    for (let i = 0; i < w.length; i += 2) {
      const p = this.paramRegions[w[i]].p;
      const wi = w[i + 1] / norm;
      for (const k of NUMERIC_KEYS) out[k] += p[k] * wi;
      for (const k of COLOR_KEYS) {
        out[k].r += p[k].r * wi;
        out[k].g += p[k].g * wi;
        out[k].b += p[k].b * wi;
      }
    }
    return out;
  }

  floorYAt(d) {
    const w = this.weights(d);
    let norm = 0, y = 0;
    for (let i = 1; i < w.length; i += 2) norm += w[i];
    for (let i = 0; i < w.length; i += 2) {
      y += this.paramRegions[w[i]].p.floorY * w[i + 1];
    }
    y /= norm;
    // gentle long-wave undulation of the valley floor
    return y + worldNoise.noise(d * 0.0021, 3.7) * 4;
  }

  regionAt(d) {
    for (const r of this.regions) if (d >= r.d0 && d < r.d1) return r;
    return null;
  }
}

export const journey = new Journey();
