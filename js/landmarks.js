// Distant horizon landmarks: big, low-detail silhouettes far off the path that
// give each region its own skyline — Egypt's pyramids, Babylon's ziggurats,
// Zion on its hill, snow ranges, the great sea. Fog hazes them into the
// distance so they read as landscape, not props.
import * as THREE from 'three';
import { journey } from './path.js';
import { heightAt } from './terrain.js';
import { mulberry32, makeSprite } from './utils.js';

function lam(color, emissive, ei) {
  return new THREE.MeshLambertMaterial({
    color, flatShading: true,
    emissive: emissive || 0x000000, emissiveIntensity: ei || 0,
  });
}
const unit = new THREE.BoxGeometry(1, 1, 1);
function box(w, h, d, mat) { const m = new THREE.Mesh(unit, mat); m.scale.set(w, h, d); return m; }
function pyramid(size, h, mat) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(size, h, 4, 1), mat);
  m.rotation.y = Math.PI / 4;
  return m;
}

const STONE = 0x8a7f70, SAND = 0xb9986a, DARKSTONE = 0x4a4038, GOLD = 0xc9a44a;

const BUILDERS = {
  pyramids(rng) {
    const g = new THREE.Group();
    const mat = lam(SAND);
    const specs = [[105, 145, 0, 0], [78, 108, -190, 50], [58, 82, 160, -40]];
    for (const [s, h, x, z] of specs) {
      const p = pyramid(s, h, mat);
      p.position.set(x, h / 2, z);
      g.add(p);
    }
    return g;
  },

  ziggurat(rng, big) {
    const g = new THREE.Group();
    const scale = big ? 1.5 : 1;
    const tiers = 7;
    for (let i = 0; i < tiers; i++) {
      const w = (150 - i * 18) * scale;
      const t = box(w, 15 * scale, w, lam(i % 2 ? DARKSTONE : 0x7a5a48));
      t.position.y = (7.5 + i * 15) * scale;
      g.add(t);
    }
    const shrine = box(24 * scale, 20 * scale, 24 * scale, lam(0x8a4a3a, 0x3a1505, 0.6));
    shrine.position.y = (tiers * 15 + 10) * scale;
    g.add(shrine);
    // surrounding city blocks
    for (let i = 0; i < 14; i++) {
      const w = 12 + rng() * 22, h = 14 + rng() * 40;
      const b = box(w, h, 12 + rng() * 22, lam(DARKSTONE));
      const a = rng() * Math.PI * 2, r = 130 + rng() * 130;
      b.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
      g.add(b);
    }
    return g;
  },

  holyCity(rng, opts = {}) {
    const g = new THREE.Group();
    const gold = opts.gold;
    // the hill (Zion)
    const hill = new THREE.Mesh(new THREE.ConeGeometry(190, 95, 7, 2), lam(opts.dark ? 0x3a352e : 0x6e6153));
    hill.position.y = 30; hill.scale.y = 0.75; g.add(hill);
    // wall ring
    const wallMat = lam(opts.dark ? 0x2e2a24 : STONE);
    const n = 16;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const seg = box(38, 26 + (i % 3) * 6, 12, wallMat);
      seg.position.set(Math.cos(a) * 105, 62, Math.sin(a) * 105);
      seg.rotation.y = -a;
      if (opts.dark && rng() > 0.5) { seg.position.y -= 12; seg.rotation.z = (rng() - 0.5) * 0.6; }
      g.add(seg);
    }
    // temple / towers on the crown
    const temple = box(46, 52, 38, lam(gold ? GOLD : STONE, gold ? 0x3a2808 : 0, gold ? 0.7 : 0));
    temple.position.y = 96; g.add(temple);
    const cap = box(52, 10, 44, lam(GOLD, 0x3a2808, gold ? 0.9 : 0.3));
    cap.position.y = 124; g.add(cap);
    for (const sx of [-1, 1]) {
      const tower = box(16, 70, 16, lam(gold ? GOLD : 0x9a8a6a, gold ? 0x3a2808 : 0, gold ? 0.5 : 0));
      tower.position.set(sx * 30, 92, 18); g.add(tower);
    }
    if (gold) {
      const glow = makeSprite(0xffe0a0, 150, 0.32); glow.position.y = 108; g.add(glow);
      const halo = makeSprite(0xfff2c9, 70, 0.5); halo.position.y = 120; g.add(halo);
      const shaft = makeSprite(0xffe6b0, 1, 0.16); shaft.scale.set(30, 320, 1); shaft.position.y = 150; g.add(shaft);
    }
    if (opts.dark) {
      for (let i = 0; i < 3; i++) {
        const smoke = makeSprite(0x3a332e, 90 + i * 30, 0.16);
        smoke.material.blending = THREE.NormalBlending;
        smoke.position.set((rng() - 0.5) * 80, 130 + i * 40, 0);
        g.add(smoke);
      }
      const ember = makeSprite(0x8a2a15, 130, 0.12); ember.position.y = 80; g.add(ember);
    }
    if (opts.scaffold) {
      for (let i = 0; i < 5; i++) {
        const pole = box(2, 60, 2, lam(0x6b4a33));
        const a = rng() * Math.PI * 2;
        pole.position.set(Math.cos(a) * 40, 96, Math.sin(a) * 40 + 18); g.add(pole);
      }
    }
    return g;
  },

  snowRange(rng) {
    const g = new THREE.Group();
    const rock = lam(0x6a6f78), snow = lam(0xe6ecf2);
    for (let i = 0; i < 6; i++) {
      const h = 150 + rng() * 130;
      const s = 70 + rng() * 40;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(s, h, 5, 2), rock);
      peak.position.set((i - 2.5) * 130 + (rng() - 0.5) * 40, h / 2, (rng() - 0.5) * 120);
      g.add(peak);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(s * 0.42, h * 0.32, 5, 1), snow);
      cap.position.set(peak.position.x, h * 0.86, peak.position.z);
      g.add(cap);
    }
    return g;
  },

  mesaField(rng) {
    const g = new THREE.Group();
    const mat = lam(0x9a6a44);
    for (let i = 0; i < 7; i++) {
      const r = 28 + rng() * 34, h = 40 + rng() * 55;
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.12, h, 6), mat);
      m.position.set((rng() - 0.5) * 520, h / 2, (rng() - 0.5) * 320);
      g.add(m);
    }
    return g;
  },

  greatSea(rng) {
    // The great city Nineveh on the far shore — a low sprawl with a ziggurat.
    const g = new THREE.Group();
    for (let i = 0; i < 22; i++) {
      const w = 16 + rng() * 26, h = 22 + rng() * 52;
      const b = box(w, h, 16 + rng() * 26, lam(0x6a5442));
      b.position.set((rng() - 0.5) * 380, h / 2, (rng() - 0.5) * 130);
      g.add(b);
    }
    const zig = this.ziggurat(rng, false);
    zig.scale.setScalar(0.75);
    zig.position.set(40, 0, -30);
    g.add(zig);
    const haze = makeSprite(0x8a6a4a, 260, 0.1); haze.position.y = 60; g.add(haze);
    return g;
  },
};

// region id -> landmark spec
const PLACEMENTS = [
  { book: 'exodus', type: 'pyramids', side: 1, u: 360, at: 0.15 },
  { book: 'numbers', type: 'mesaField', side: 1, u: 470, at: 0.5 },
  { book: 'joshua', type: 'holyCity', side: 1, u: 520, at: 0.7, opts: {} },
  { book: 'kings', type: 'holyCity', side: -1, u: 400, at: 0.2, opts: { gold: true } },
  { book: 'isaiah', type: 'snowRange', side: 1, u: 620, at: 0.5 },
  { book: 'jeremiah', type: 'holyCity', side: 1, u: 500, at: 0.5, opts: {} },
  { book: 'ezekiel', type: 'ziggurat', side: -1, u: 520, at: 0.35, big: false },
  { book: 'the-twelve', type: 'greatSea', side: -1, u: 560, at: 0.45 },
  { book: 'psalms', type: 'holyCity', side: 1, u: 470, at: 0.6, opts: { gold: true } },
  { book: 'lamentations', type: 'holyCity', side: 1, u: 430, at: 0.5, opts: { dark: true } },
  { book: 'esther', type: 'ziggurat', side: -1, u: 470, at: 0.5, big: false },
  { book: 'daniel', type: 'ziggurat', side: 1, u: 500, at: 0.4, big: true },
  { book: 'ezra-nehemiah', type: 'holyCity', side: 1, u: 470, at: 0.5, opts: { scaffold: true } },
  { book: 'chronicles', type: 'holyCity', side: -1, u: 420, at: 0.55, opts: { gold: true } },
];

export function buildLandmarks(scene) {
  const root = new THREE.Group();
  root.name = 'landmarks';
  const gates = [];
  const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };

  for (const pl of PLACEMENTS) {
    const region = journey.regions.find(r => r.book.id === pl.book);
    if (!region) continue;
    const builder = BUILDERS[pl.type];
    if (!builder) continue;
    const d = region.d0 + region.len * pl.at;
    const u = pl.u * pl.side;
    const rng = mulberry32(region.index * 613 + 17);
    let g;
    try { g = builder.call(BUILDERS, rng, pl.type === 'greatSea' ? region.book.palette : (pl.big ?? pl.opts)); }
    catch (e) { console.warn('landmark failed', pl.type, e); continue; }

    journey.sample(d, smp);
    const wx = smp.pos.x + smp.lat.x * u;
    const wz = smp.pos.z + smp.lat.z * u;
    const wy = pl.type === 'greatSea' ? heightAt(d, 0) - 6 : heightAt(d, u) - 4;
    g.position.set(wx, wy, wz);
    // face roughly toward the path
    const yaw = Math.atan2(-pl.side * smp.lat.x, -pl.side * smp.lat.z);
    g.rotation.y = yaw + (rng() - 0.5) * 0.5;
    root.add(g);
    gates.push({ d, g, span: 1900 });
  }

  scene.add(root);
  return {
    update(camD) {
      for (const gt of gates) gt.g.visible = Math.abs(gt.d - camD) < gt.span;
    },
  };
}
