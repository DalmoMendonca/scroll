// Living things: flocks, a slithering serpent, butterflies, locust swarms,
// eyes in the dark, one great fish, fireflies. All cheap CPU-animated
// silhouettes, active only when the traveler is near.
import * as THREE from 'three';
import { journey } from './path.js';
import { heightAt, waterLevelAt } from './terrain.js';
import { mulberry32, makeSprite, clamp, lerp } from './utils.js';

const _smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };

function worldPoint(d, u, dy = 0) {
  journey.sample(d, _smp);
  return new THREE.Vector3(
    _smp.pos.x + _smp.lat.x * u,
    heightAt(d, u) + dy,
    _smp.pos.z + _smp.lat.z * u,
  );
}

function findPlacement(region, types) {
  for (const t of types) {
    const p = region.placements.find(pl => pl.type === t);
    if (p) return p;
  }
  return null;
}

// ---- bird flock ------------------------------------------------------------
function birdFlock(region, rng, kind) {
  const conf = {
    birds: { color: 0x2a241f, count: 14, size: 1.0, speed: 0.14, flap: 7 },
    doves: { color: 0xe8e2d2, count: 9, size: 0.8, speed: 0.11, flap: 9 },
    ravens: { color: 0x15100c, count: 7, size: 1.15, speed: 0.16, flap: 6 },
  }[kind];
  const d = lerp(region.d0 + 200, region.d1 - 200, rng());
  const u = (rng() > 0.5 ? 1 : -1) * (30 + rng() * 120);
  const center = worldPoint(d, u, 30 + rng() * 22);

  const n = conf.count;
  const positions = new Float32Array(n * 6 * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.boundingSphere = new THREE.Sphere(center.clone(), 120);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color: conf.color, side: THREE.DoubleSide,
  }));
  mesh.frustumCulled = true;

  const birds = [];
  for (let i = 0; i < n; i++) {
    birds.push({
      phase: rng() * Math.PI * 2,
      r: 12 + rng() * 22,
      h: (rng() - 0.5) * 10,
      fp: rng() * Math.PI * 2,
      sp: 0.75 + rng() * 0.5,
    });
  }
  const fwd = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  const p = new THREE.Vector3();

  function update(t) {
    let vi = 0;
    const s = conf.size;
    for (const b of birds) {
      const a = t * conf.speed * b.sp + b.phase;
      p.set(center.x + Math.cos(a) * b.r, center.y + b.h + Math.sin(t * 0.5 + b.phase) * 3.5, center.z + Math.sin(a) * b.r * 0.72);
      fwd.set(-Math.sin(a), 0, Math.cos(a) * 0.72).normalize();
      right.crossVectors(up, fwd).normalize();
      const wingY = Math.sin(t * conf.flap * b.sp + b.fp) * 1.1 * s;
      // nose, wingL, tail / nose, tail, wingR
      const nx = p.x + fwd.x * 1.3 * s, ny = p.y, nz = p.z + fwd.z * 1.3 * s;
      const tx = p.x - fwd.x * 1.1 * s, ty = p.y + 0.15 * s, tz = p.z - fwd.z * 1.1 * s;
      const lx = p.x - right.x * 1.8 * s - fwd.x * 0.2, ly = p.y + wingY, lz = p.z - right.z * 1.8 * s - fwd.z * 0.2;
      const rx = p.x + right.x * 1.8 * s - fwd.x * 0.2, ry = p.y + wingY, rz = p.z + right.z * 1.8 * s - fwd.z * 0.2;
      positions[vi++] = nx; positions[vi++] = ny; positions[vi++] = nz;
      positions[vi++] = lx; positions[vi++] = ly; positions[vi++] = lz;
      positions[vi++] = tx; positions[vi++] = ty; positions[vi++] = tz;
      positions[vi++] = nx; positions[vi++] = ny; positions[vi++] = nz;
      positions[vi++] = tx; positions[vi++] = ty; positions[vi++] = tz;
      positions[vi++] = rx; positions[vi++] = ry; positions[vi++] = rz;
    }
    geo.attributes.position.needsUpdate = true;
  }
  return { group: mesh, update, d0: d - 500, d1: d + 500 };
}

// ---- serpent ---------------------------------------------------------------
function serpent(region, rng) {
  const anchor = findPlacement(region, ['gardenTree', 'serpentPole']);
  const d = anchor ? anchor.d : (region.d0 + region.d1) / 2;
  const u = anchor ? anchor.u + 9 : 60;
  const base = worldPoint(d, u, 0);

  const RINGS = 34, RADIAL = 5, LEN = 7;
  const positions = new Float32Array((RINGS + 1) * RADIAL * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const idx = [];
  for (let i = 0; i < RINGS; i++) {
    for (let r = 0; r < RADIAL; r++) {
      const a = i * RADIAL + r, b = i * RADIAL + ((r + 1) % RADIAL);
      idx.push(a, a + RADIAL, b, b, a + RADIAL, b + RADIAL);
    }
  }
  geo.setIndex(idx);
  geo.boundingSphere = new THREE.Sphere(base.clone(), 30);
  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({
    color: 0x3d5a2e, emissive: 0x0f2008, flatShading: true,
  }));

  const spine = [];
  for (let i = 0; i <= RINGS; i++) spine.push(new THREE.Vector3());
  const tangent = new THREE.Vector3(), norm = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);

  function update(t) {
    const orbit = t * 0.13;
    for (let i = 0; i <= RINGS; i++) {
      const s = i / RINGS;
      const along = orbit + s * (LEN / 9);
      const wob = Math.sin(s * 9 - t * 2.6) * 0.55 * (1 - s * 0.4);
      const cx = base.x + Math.cos(along) * 3.2 + Math.cos(along + Math.PI / 2) * wob;
      const cz = base.z + Math.sin(along) * 3.2 + Math.sin(along + Math.PI / 2) * wob;
      spine[i].set(cx, base.y + 0.32 + Math.max(0, Math.sin(s * 6 - t * 2.6)) * 0.1, cz);
    }
    let vi = 0;
    for (let i = 0; i <= RINGS; i++) {
      const s = i / RINGS;
      const radius = 0.3 * (1 - Math.abs(s - 0.35) * 1.1) + 0.06;
      const a0 = Math.max(0, i - 1), a1 = Math.min(RINGS, i + 1);
      tangent.subVectors(spine[a1], spine[a0]).normalize();
      norm.crossVectors(up, tangent).normalize();
      for (let r = 0; r < RADIAL; r++) {
        const a = (r / RADIAL) * Math.PI * 2;
        const ca = Math.cos(a) * radius, sa = Math.sin(a) * radius;
        positions[vi++] = spine[i].x + norm.x * ca;
        positions[vi++] = spine[i].y + sa;
        positions[vi++] = spine[i].z + norm.z * ca;
      }
    }
    geo.attributes.position.needsUpdate = true;
  }
  return { group: mesh, update, d0: d - 380, d1: d + 380 };
}

// ---- butterflies -----------------------------------------------------------
function butterflies(region, rng, accent) {
  const anchor = findPlacement(region, ['vineyard', 'gardenTree', 'tree']);
  const d = anchor ? anchor.d : (region.d0 + region.d1) / 2;
  const u = anchor ? anchor.u : 40;
  const base = worldPoint(d, u, 3);

  const N = 8;
  const positions = new Float32Array(N * 12 * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.boundingSphere = new THREE.Sphere(base.clone(), 40);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color: accent, side: THREE.DoubleSide, transparent: true, opacity: 0.85,
  }));
  const bs = [];
  for (let i = 0; i < N; i++) {
    bs.push({ p1: rng() * 9, p2: rng() * 9, p3: rng() * 9, f: 8 + rng() * 4, s: 0.5 + rng() * 0.35 });
  }
  const c = new THREE.Vector3();
  function update(t) {
    let vi = 0;
    for (const b of bs) {
      c.set(
        base.x + Math.sin(t * 0.31 + b.p1) * 8,
        base.y + 2.5 + Math.sin(t * 0.53 + b.p2) * 2,
        base.z + Math.cos(t * 0.27 + b.p3) * 8,
      );
      const flap = Math.sin(t * b.f) * 1.1;
      const s = b.s;
      // two wing quads (as 2 tris each) hinged on body axis (along x)
      for (const side of [-1, 1]) {
        const wy = Math.cos(flap) * s * side, wz = Math.sin(Math.abs(flap)) * s;
        // body line: (±0.3s, 0, 0); wingtip: (0, wy?) build quad: b0, b1, tipA, tipB
        const b0x = c.x - 0.3 * s, b1x = c.x + 0.3 * s;
        const tipAy = c.y + wz, tipAz = c.z + wy;
        positions[vi++] = b0x; positions[vi++] = c.y; positions[vi++] = c.z;
        positions[vi++] = b1x; positions[vi++] = c.y; positions[vi++] = c.z;
        positions[vi++] = b1x + 0.2 * s; positions[vi++] = tipAy; positions[vi++] = tipAz;
        positions[vi++] = b0x; positions[vi++] = c.y; positions[vi++] = c.z;
        positions[vi++] = b1x + 0.2 * s; positions[vi++] = tipAy; positions[vi++] = tipAz;
        positions[vi++] = b0x - 0.2 * s; positions[vi++] = tipAy; positions[vi++] = tipAz;
      }
    }
    geo.attributes.position.needsUpdate = true;
  }
  return { group: mesh, update, d0: d - 350, d1: d + 350 };
}

// ---- locust swarm ----------------------------------------------------------
function locusts(region, rng) {
  const story = region.stories.find(s => /locust/i.test(s.data.title));
  const d = story ? story.d : lerp(region.d0 + 250, region.d1 - 250, rng());
  const base = worldPoint(d, (rng() > 0.5 ? 1 : -1) * (60 + rng() * 60), 16);

  const N = 380;
  const positions = new Float32Array(N * 3);
  const seeds = [];
  for (let i = 0; i < N; i++) seeds.push({ a: rng() * 9, b: rng() * 9, c: rng() * 9, r: 6 + rng() * 22 });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.boundingSphere = new THREE.Sphere(base.clone(), 60);
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0x1a140c, size: 0.55, sizeAttenuation: true, transparent: true, opacity: 0.85,
  }));
  function update(t) {
    const cx = base.x + Math.sin(t * 0.17) * 20;
    const cz = base.z + Math.cos(t * 0.13) * 16;
    let vi = 0;
    for (const s of seeds) {
      positions[vi++] = cx + Math.sin(t * 0.7 + s.a) * s.r;
      positions[vi++] = base.y + Math.sin(t * 0.9 + s.b) * 9 + Math.sin(t * 3.1 + s.c) * 1.5;
      positions[vi++] = cz + Math.cos(t * 0.6 + s.c) * s.r;
    }
    geo.attributes.position.needsUpdate = true;
    geo.boundingSphere.center.set(cx, base.y, cz);
  }
  return { group: pts, update, d0: d - 450, d1: d + 450 };
}

// ---- eyes in the dark ------------------------------------------------------
function lionEyes(region, rng) {
  const isDen = region.book.id === 'daniel';
  const story = isDen ? region.stories.find(s => /lions/i.test(s.data.title)) : null;
  const d = story ? story.d : lerp(region.d0 + 200, region.d1 - 200, rng());
  const side = rng() > 0.5 ? 1 : -1;
  const group = new THREE.Group();
  const pairs = [];
  const nPairs = isDen ? 4 : 2;
  for (let i = 0; i < nPairs; i++) {
    const u = side * (isDen ? 42 + rng() * 26 : 90 + rng() * 90);
    const pd = d + (rng() - 0.5) * (isDen ? 30 : 160);
    const p = worldPoint(pd, u, 1.1);
    const pair = new THREE.Group();
    for (const s of [-1, 1]) {
      const eye = makeSprite(0xffb36b, 0.55, 0.9, true);
      eye.position.set(s * 0.34, 0, 0);
      pair.add(eye);
    }
    pair.position.copy(p);
    pairs.push({ g: pair, t0: rng() * 7, blink: 3 + rng() * 4 });
    group.add(pair);
  }
  if (isDen && story) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(4.5, 5.5, 1),
      new THREE.MeshLambertMaterial({ color: 0x55493f, flatShading: true }));
    const sp = worldPoint(story.d, side * 34, 2.2);
    slab.position.copy(sp);
    slab.rotation.z = 0.12;
    group.add(slab);
    const seal = makeSprite(0xc9b8ff, 3, 0.4);
    seal.position.copy(sp).y += 3.4;
    group.add(seal);
    story.worldPos = sp.clone();
  }
  function update(t) {
    for (const p of pairs) {
      const cycle = (t + p.t0) % p.blink;
      const open = cycle > 0.18 ? 1 : 0.1;
      const flick = 0.75 + 0.25 * Math.sin(t * 3.3 + p.t0 * 9);
      p.g.children.forEach(e => { e.material.opacity = 0.85 * open * flick; e.scale.y = 0.55 * open; });
    }
  }
  return { group, update, d0: d - 420, d1: d + 420 };
}

// ---- the great fish --------------------------------------------------------
function greatFish(region, rng) {
  const story = region.stories.find(s => /jonah|deep|fish/i.test(s.data.title)) || region.stories[0];
  const d = story.d;
  const u = -190;
  const waterY = waterLevelAt(d, 'sea');
  journey.sample(d, _smp);
  const cx = _smp.pos.x + _smp.lat.x * u;
  const cz = _smp.pos.z + _smp.lat.z * u;

  const profile = [];
  const radii = [0.02, 0.9, 1.6, 2.0, 1.9, 1.5, 0.9, 0.45, 0.18];
  for (let i = 0; i < radii.length; i++) {
    profile.push(new THREE.Vector2(radii[i], (i / (radii.length - 1)) * 13 - 6.5));
  }
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 8),
    new THREE.MeshLambertMaterial({ color: 0x26343f, flatShading: true }));
  body.rotation.z = Math.PI / 2; // length along x
  const tail = new THREE.Mesh(unitTri(), new THREE.MeshLambertMaterial({
    color: 0x1e2a33, side: THREE.DoubleSide, flatShading: true,
  }));
  tail.scale.set(3.4, 4.4, 1);
  tail.position.x = -7.6;
  const g = new THREE.Group();
  g.add(body); g.add(tail);
  const spray = [];
  for (let i = 0; i < 5; i++) { const s = makeSprite(0xcfe8f0, 2.2, 0, true); spray.push(s); g.add(s); }
  const glow = makeSprite(0x8fb8cf, 16, 0.12); g.add(glow);

  const T = 17;
  function update(t) {
    const q = ((t + rng.offset || 0) / T) % 1;
    if (q < 0.22) {
      const a = (q / 0.22) * Math.PI; // breach arc
      const along = -14 + (q / 0.22) * 28;
      g.position.set(cx + along * 0.4, waterY + Math.sin(a) * 9 - 1.5, cz + along);
      g.rotation.z = 0;
      g.rotation.x = 0;
      g.rotation.y = Math.PI / 2 + 0.2;
      g.rotation.z = (a - Math.PI / 2) * -0.7;
      const sprayOn = q < 0.05 || q > 0.18;
      spray.forEach((s, i) => {
        s.material.opacity = sprayOn ? 0.5 * Math.random() : 0;
        s.position.set(Math.sin(i * 4 + t * 9) * 3, -2 + Math.random() * 2, Math.sin(i * 7) * 3);
      });
    } else {
      const back = (q - 0.22) / 0.78;
      g.position.set(cx + 12 - back * 26 * 0.4, waterY - 4.5, cz + 14 - back * 28);
      g.rotation.set(0, Math.PI / 2 + 0.2, 0);
      spray.forEach(s => { s.material.opacity = 0; });
    }
  }
  return { group: g, update, d0: d - 450, d1: d + 450 };
}

function unitTri() {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([
    0, 0, 0, -1, 0.9, 0, -1, -0.9, 0,
  ], 3));
  g.computeVertexNormals();
  return g;
}

// ---- fireflies -------------------------------------------------------------
function fireflies(region, rng) {
  const d = lerp(region.d0 + 200, region.d1 - 200, rng());
  const base = worldPoint(d, (rng() > 0.5 ? 1 : -1) * (24 + rng() * 50), 2);
  const group = new THREE.Group();
  const fs = [];
  for (let i = 0; i < 14; i++) {
    const f = makeSprite(0xffe9a0, 0.8, 0.8, true);
    fs.push({ s: f, a: rng() * 9, b: rng() * 9, c: rng() * 9 });
    group.add(f);
  }
  function update(t) {
    for (const f of fs) {
      f.s.position.set(
        base.x + Math.sin(t * 0.4 + f.a) * 11,
        base.y + 1.5 + Math.sin(t * 0.7 + f.b) * 1.8,
        base.z + Math.cos(t * 0.33 + f.c) * 11,
      );
      f.s.material.opacity = Math.max(0, Math.sin(t * 1.7 + f.a * 5)) * 0.85;
    }
  }
  return { group, update, d0: d - 350, d1: d + 350 };
}

// ---- manager ---------------------------------------------------------------
export function buildCreatures(scene, accentOf) {
  const systems = [];
  for (const region of journey.regions) {
    const rng = mulberry32(region.index * 313 + 5);
    for (const kind of region.book.creatures) {
      let sys = null;
      if (kind === 'birds' || kind === 'doves' || kind === 'ravens') sys = birdFlock(region, rng, kind);
      else if (kind === 'serpent') sys = serpent(region, rng);
      else if (kind === 'butterflies') sys = butterflies(region, rng, accentOf(region.book));
      else if (kind === 'locusts') sys = locusts(region, rng);
      else if (kind === 'lionEyes') sys = lionEyes(region, rng);
      else if (kind === 'greatFish') sys = greatFish(region, rng);
      else if (kind === 'fireflies') sys = fireflies(region, rng);
      if (sys) {
        sys.group.visible = false;
        scene.add(sys.group);
        systems.push(sys);
      }
    }
  }
  return {
    update(camD, t) {
      for (const s of systems) {
        const active = camD > s.d0 && camD < s.d1;
        s.group.visible = active;
        if (active) s.update(t);
      }
    },
  };
}
