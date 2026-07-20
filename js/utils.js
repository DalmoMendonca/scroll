// Small shared helpers: math, seeded RNG, canvas glow textures.
import * as THREE from 'three';

export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;

export function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export function gauss(x, sigma) {
  const q = x / sigma;
  return Math.exp(-0.5 * q * q);
}

// Frame-rate independent exponential approach.
export function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

// Deterministic RNG so the world is identical on every visit.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function color(hex) {
  return new THREE.Color(hex);
}

// Soft radial glow texture used by sprites and particles.
let glowTex = null;
export function getGlowTexture() {
  if (glowTex) return glowTex;
  const s = 128;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.6)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.16)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  glowTex = new THREE.CanvasTexture(cv);
  glowTex.colorSpace = THREE.SRGBColorSpace;
  return glowTex;
}

// Sharper spark texture (small hot core) for flames and stars.
let sparkTexCache = null;
export function getSparkTexture() {
  if (sparkTexCache) return sparkTexCache;
  const s = 64;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.12, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.25)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  sparkTexCache = new THREE.CanvasTexture(cv);
  sparkTexCache.colorSpace = THREE.SRGBColorSpace;
  return sparkTexCache;
}

export function makeSprite(colorHex, scale, opacity = 1, spark = false) {
  const mat = new THREE.SpriteMaterial({
    map: spark ? getSparkTexture() : getGlowTexture(),
    color: colorHex,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sp = new THREE.Sprite(mat);
  sp.scale.setScalar(scale);
  return sp;
}

export const prefersReducedMotion =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;
