// Procedural set pieces. Every prop is composed from flat-shaded primitives
// and glow sprites — painterly silhouettes, no loaded assets. Some react to
// the traveler: walls fall or rise, bones stand, writing appears.
import * as THREE from 'three';
import { journey } from './path.js';
import { heightAt, waterLevelAt } from './terrain.js';
import { mulberry32, makeSprite, clamp, lerp, smoothstep, gauss, getGlowTexture } from './utils.js';
import { Reflector } from '../vendor/jsm/objects/Reflector.js';
import { DecalGeometry } from '../vendor/jsm/geometries/DecalGeometry.js';

// A daubed blood-splatter texture (irregular blobs and drips) for projected
// Passover decals.
let _bloodTex = null;
function bloodTexture() {
  if (_bloodTex) return _bloodTex;
  const s = 256, cv = document.createElement('canvas'); cv.width = cv.height = s;
  const c = cv.getContext('2d');
  c.clearRect(0, 0, s, s);
  const rnd = mulberry32(99);
  c.fillStyle = '#8f1d12';
  for (let i = 0; i < 26; i++) {
    const x = 40 + rnd() * (s - 80), y = 30 + rnd() * (s - 90), r = 10 + rnd() * 34;
    c.globalAlpha = 0.55 + rnd() * 0.45;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    // drips running down
    if (rnd() > 0.4) { c.fillRect(x - r * 0.18, y, r * 0.36, r + rnd() * 60); }
  }
  c.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  _bloodTex = tex;
  return tex;
}

// ---- shared materials / geometry helpers -----------------------------------
function lam(color, opts = {}) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts });
}
const MAT = {
  stone: lam(0x8a7f74),
  stoneLight: lam(0xb0a695),
  stoneDark: lam(0x55493f),
  wood: lam(0x6b4a33),
  woodDark: lam(0x402d1f),
  cloth: lam(0xcfc4ae),
  clothDark: lam(0x9a8f7a),
  leaf: lam(0x4a6b3d),
  leafDark: lam(0x2e4a34),
  gold: lam(0xc9a44a, { emissive: 0x3a2808, emissiveIntensity: 0.8 }),
  dark: lam(0x241f1a),
  white: lam(0xe8e2d4),
  grape: lam(0x452a4e),
  bone: lam(0xd8d0bc),
};

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const unitPlane = new THREE.PlaneGeometry(1, 1);
const icoGeos = [new THREE.IcosahedronGeometry(1, 0), new THREE.IcosahedronGeometry(1, 1)];

function box(w, h, d, mat) {
  const m = new THREE.Mesh(unitBox, mat);
  m.scale.set(w, h, d);
  return m;
}
function plane(w, h, mat) {
  const m = new THREE.Mesh(unitPlane, mat);
  m.scale.set(w, h, 1);
  return m;
}
function cyl(rTop, rBot, h, mat, seg = 7) {
  return new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat);
}
function blob(r, mat, det = 0) {
  const m = new THREE.Mesh(icoGeos[det], mat);
  m.scale.setScalar(r);
  return m;
}
function emissivePlane(w, h, colorHex, intensity = 1) {
  const m = new THREE.Mesh(unitPlane, new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorHex).multiplyScalar(intensity),
    side: THREE.DoubleSide,
  }));
  m.scale.set(w, h, 1);
  return m;
}
function ghostMat(colorHex, opacity) {
  return new THREE.MeshBasicMaterial({
    color: colorHex, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
}

const accentMats = new Map();
function accentMat(book) {
  if (!accentMats.has(book.id)) {
    const c = new THREE.Color(book.palette.accent);
    accentMats.set(book.id, new THREE.MeshLambertMaterial({
      color: c.clone().multiplyScalar(0.35),
      emissive: c, emissiveIntensity: 1, flatShading: true,
    }));
  }
  return accentMats.get(book.id);
}

// Plant a local offset on the terrain relative to the prop's own base height,
// so clusters follow the slope instead of floating.
function groundDelta(ctx, ox, oz) {
  const u = (ctx.overrideU != null ? ctx.overrideU : ctx.placement.u);
  return heightAt(ctx.placement.d + oz, u + ox) - heightAt(ctx.placement.d, u);
}

// A small flame: layered sparks + optional smoke column.
function flameGroup(ctx, scale = 1, smoke = true) {
  const g = new THREE.Group();
  const sparks = [
    makeSprite(0xffdf9e, 3.2 * scale, 0.9, true),
    makeSprite(0xff9a3e, 4.6 * scale, 0.55, true),
    makeSprite(0xff5a2a, 6.5 * scale, 0.3),
  ];
  sparks.forEach((s, i) => { s.position.y = i * 0.5 * scale; g.add(s); });
  const smokes = [];
  if (smoke) {
    for (let i = 0; i < 3; i++) {
      const s = makeSprite(0x8a8580, 4 * scale, 0.12);
      s.material.blending = THREE.NormalBlending;
      s.position.y = 4 + i * 4 * scale;
      smokes.push(s); g.add(s);
    }
  }
  g.userData.update = (t) => {
    const f = 0.85 + 0.3 * Math.sin(t * 9 + ctx.seed * 20) * Math.sin(t * 5.3 + 1);
    sparks[0].scale.setScalar(3.2 * scale * f);
    sparks[1].scale.setScalar(4.6 * scale * (2 - f) * 0.55);
    smokes.forEach((s, i) => {
      const q = ((t * 0.8 + i * 1.4) % 4.2) / 4.2;
      s.position.y = (3 + q * 11) * scale;
      s.material.opacity = 0.14 * (1 - q);
      s.scale.setScalar((3 + q * 5) * scale);
    });
  };
  return g;
}

// Column of fire / cloud with scrolling shader.
function columnMaterial(colorA, colorB, isCloud) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uA: { value: new THREE.Color(colorA) },
      uB: { value: new THREE.Color(colorB) },
      uSoft: { value: isCloud ? 1.0 : 0.0 },
    },
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    blending: isCloud ? THREE.NormalBlending : THREE.AdditiveBlending,
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime, uSoft;
      uniform vec3 uA, uB;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      void main() {
        vec2 p = vec2(vUv.x * 3.0, vUv.y * 4.0 - uTime * (0.55 - uSoft * 0.35));
        float n = vn(p) * 0.6 + vn(p * 2.3) * 0.4;
        float edge = sin(vUv.x * 3.14159);
        float a = smoothstep(0.25, 0.75, n) * edge;
        a *= smoothstep(0.0, 0.15, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
        vec3 col = mix(uB, uA, n);
        gl_FragColor = vec4(col, a * mix(0.75, 0.5, uSoft));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

function columnMesh(r, h, mat) {
  const g = new THREE.CylinderGeometry(r * 0.75, r, h, 10, 6, true);
  const m = new THREE.Mesh(g, mat);
  m.position.y = h / 2;
  return m;
}

// Volumetric clouds: the fragment shader raymarches an fBm density field into
// the plane, self-shadowing toward the light, so the cloud has real depth.
function volumetricCloudMaterial(tint) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }, uLight: { value: new THREE.Vector3(0.5, 0.6, 0.3).normalize() },
      uTint: { value: new THREE.Color(tint) }, uScale: { value: 1 },
    },
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float uTime,uScale; uniform vec3 uLight,uTint;
      float hash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
      float vnoise(vec3 x){ vec3 i=floor(x),f=fract(x); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
      float fbm(vec3 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*vnoise(p); p*=2.03; a*=0.5; } return s; }
      void main(){
        vec3 p = vec3((vUv-0.5)*6.0*uScale, uTime*0.04);
        float trans=1.0; vec3 col=vec3(0.0);
        for(int i=0;i<28;i++){
          float d = fbm(p) - 0.52;
          if(d>0.0){
            float ls = fbm(p + uLight*0.4) - 0.52;
            float lit = exp(-max(ls,0.0)*4.0);
            vec3 c = mix(vec3(0.34,0.40,0.52), mix(vec3(1.0),uTint,0.4), lit);
            float a = clamp(d*0.9,0.0,1.0)*0.16;
            col += c*a*trans; trans *= 1.0-a;
          }
          p += vec3(0.0,0.0,0.07) + uLight*0.03;
          if(trans<0.02) break;
        }
        float edge = smoothstep(0.0,0.28,vUv.x)*smoothstep(1.0,0.72,vUv.x)*smoothstep(0.0,0.34,vUv.y)*smoothstep(1.0,0.7,vUv.y);
        gl_FragColor = vec4(col, (1.0-trans)*edge);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

// ---- builders --------------------------------------------------------------
const BUILDERS = {

  tree(ctx) {
    const g = new THREE.Group();
    if (ctx.book.id === 'isaiah') { // a shoot from the stump
      const stump = cyl(1.7, 2.1, 2.2, MAT.woodDark, 9);
      stump.position.y = 1.1; g.add(stump);
      const shoot = cyl(0.02, 0.14, 2.6, lam(0x7dd87a, { emissive: 0x2a8a3a, emissiveIntensity: 1.2 }), 5);
      shoot.position.set(0.5, 3.4, 0); g.add(shoot);
      const leaf = blob(0.5, lam(0x8aef8a, { emissive: 0x3aa84a, emissiveIntensity: 1 }));
      leaf.position.set(0.5, 4.8, 0); leaf.scale.set(0.7, 0.4, 0.7); g.add(leaf);
      const glow = makeSprite(0x9effa0, 5, 0.4); glow.position.set(0.5, 4.5, 0); g.add(glow);
      ctx.focusH = 4;
      return { group: g };
    }
    if (ctx.book.id === 'esther') { // fifty cubits high, and bare
      const trunk = cyl(0.35, 0.8, 30, MAT.dark, 6);
      trunk.position.y = 15; g.add(trunk);
      for (let i = 0; i < 4; i++) {
        const br = cyl(0.1, 0.3, 7, MAT.dark, 5);
        br.position.y = 20 + i * 2.6;
        br.rotation.z = (i % 2 ? 1 : -1) * (0.9 + ctx.rng() * 0.4);
        br.position.x = (i % 2 ? 1 : -1) * 2.4;
        g.add(br);
      }
      const beam = box(4.5, 0.35, 0.35, MAT.dark); beam.position.y = 29; g.add(beam);
      ctx.focusH = 24;
      return { group: g };
    }
    // default / tree of life
    const glowing = ctx.book.id === 'proverbs';
    const trunk = cyl(0.5, 0.9, 5, MAT.wood, 7);
    trunk.position.y = 2.5; g.add(trunk);
    const leafMat = glowing ? lam(0x5a8a4a, { emissive: 0x2a5a1a, emissiveIntensity: 0.5 }) : MAT.leafDark;
    for (let i = 0; i < 3; i++) {
      const c = blob(2.6 - i * 0.5, leafMat, 0);
      c.position.set((ctx.rng() - 0.5) * 2, 5.5 + i * 1.8, (ctx.rng() - 0.5) * 2);
      c.scale.y *= 0.8;
      g.add(c);
    }
    if (glowing) {
      for (let i = 0; i < 5; i++) {
        const f = makeSprite(0xffd98c, 1.4, 0.8, true);
        f.position.set((ctx.rng() - 0.5) * 4, 5 + ctx.rng() * 3.5, (ctx.rng() - 0.5) * 4);
        g.add(f);
      }
      const halo = makeSprite(0xffe9b0, 9, 0.25); halo.position.y = 6.5; g.add(halo);
    }
    ctx.focusH = 6;
    return { group: g };
  },

  gardenTree(ctx) {
    const g = new THREE.Group();
    const t1 = cyl(0.7, 1.3, 8, MAT.wood, 8); t1.position.set(-1.2, 4, 0); t1.rotation.z = 0.18; g.add(t1);
    const t2 = cyl(0.6, 1.1, 7.5, MAT.wood, 8); t2.position.set(1.4, 3.75, 0); t2.rotation.z = -0.2; g.add(t2);
    const leafMat = lam(0x3d6b44, { emissive: 0x14301a, emissiveIntensity: 0.6 });
    const crowns = [[-2.2, 9, 0, 4.2], [2.6, 8.6, 0.4, 3.8], [0.2, 11, -0.3, 3.4]];
    for (const [x, y, z, r] of crowns) {
      const c = blob(r, leafMat, 1);
      c.position.set(x, y, z); c.scale.y *= 0.75;
      g.add(c);
    }
    const fruits = [];
    for (let i = 0; i < 9; i++) {
      const f = makeSprite(0xffd98c, 1.5, 0.9, true);
      const a = ctx.rng() * Math.PI * 2;
      f.position.set(Math.cos(a) * (2 + ctx.rng() * 3), 7.5 + ctx.rng() * 4, Math.sin(a) * (2 + ctx.rng() * 2.5));
      fruits.push(f); g.add(f);
    }
    const pool = makeSprite(0xffe9b8, 16, 0.22); pool.position.y = 1; g.add(pool);
    g.scale.setScalar(1.8);
    g.userData.update = (t) => {
      fruits.forEach((f, i) => { f.material.opacity = 0.65 + 0.3 * Math.sin(t * 1.3 + i * 2.1); });
    };
    ctx.focusH = 16;
    return { group: g, update: g.userData.update };
  },

  ark(ctx) {
    if (ctx.book.id === 'joshua') { // ark of the covenant
      const g = new THREE.Group();
      const chest = box(3.2, 1.9, 1.9, MAT.gold); chest.position.y = 1.6; g.add(chest);
      const lid = box(3.4, 0.35, 2.1, MAT.gold); lid.position.y = 2.7; g.add(lid);
      for (const s of [-1, 1]) {
        const pole = cyl(0.11, 0.11, 6, MAT.wood, 5);
        pole.rotation.z = Math.PI / 2;
        pole.position.set(0, 1.1, s * 1.15); g.add(pole);
        const wing = plane(1.4, 0.9, new THREE.MeshLambertMaterial({
          color: 0xd8bc6a, emissive: 0x554411, side: THREE.DoubleSide, flatShading: true,
        }));
        wing.position.set(s * 0.9, 3.4, 0);
        wing.rotation.set(-0.4, 0, s * -0.7);
        g.add(wing);
      }
      const glow = makeSprite(0xffe9b0, 8, 0.5); glow.position.y = 3.2; g.add(glow);
      ctx.focusH = 3;
      return { group: g };
    }
    // Noah's ark, aground
    const g = new THREE.Group();
    const hull = box(24, 6, 9, MAT.woodDark); hull.position.y = 3.4; g.add(hull);
    const keelF = box(4, 5, 8.4, MAT.woodDark); keelF.position.set(13, 3.8, 0); keelF.rotation.y = 0.5; g.add(keelF);
    const keelB = keelF.clone(); keelB.position.x = -13; keelB.rotation.y = -0.5; g.add(keelB);
    const cabin = box(12, 3.2, 6.4, MAT.wood); cabin.position.y = 8; g.add(cabin);
    const roofL = plane(13, 4.4, MAT.woodDark); roofL.rotation.set(-Math.PI / 2 + 0.6, 0, 0);
    roofL.position.set(0, 10.4, -1.7); g.add(roofL);
    const roofR = roofL.clone(); roofR.rotation.x = -Math.PI / 2 - 0.6; roofR.position.z = 1.7; g.add(roofR);
    const win = emissivePlane(1.4, 1.1, ctx.book.palette.accent, 1.4);
    win.position.set(3, 8.2, 3.26); g.add(win);
    const winGlow = makeSprite(0xffd98c, 4, 0.5); winGlow.position.set(3, 8.2, 3.6); g.add(winGlow);
    g.rotation.z = 0.07; g.rotation.x = 0.03;
    ctx.facePath = true;
    ctx.focusH = 7;
    return { group: g };
  },

  ziggurat(ctx) {
    const g = new THREE.Group();
    // Babel towers over everything; other ziggurats are large but earthly.
    const babel = ctx.book.id === 'genesis';
    const tiers = babel ? 9 : 5;
    const tierH = babel ? 12 : 4;
    const baseW = babel ? 78 : 26;
    const shrink = babel ? 7.4 : 4.6;
    for (let i = 0; i < tiers; i++) {
      const w = baseW - i * shrink;
      const t = box(w, tierH, w, i % 2 ? MAT.stoneDark : lam(0x7a5a48));
      t.position.y = tierH / 2 + i * tierH;
      g.add(t);
    }
    const top = tiers * tierH;
    // a great spiralling ramp climbing the face
    const rampN = babel ? tiers : 1;
    for (let i = 0; i < rampN; i++) {
      const w = baseW - i * shrink;
      const ramp = box(babel ? 7 : 4, 1.4, babel ? w * 0.9 : 16, MAT.stoneDark);
      ramp.position.set((i % 2 ? 1 : -1) * (babel ? 2 : 0), tierH / 2 + i * tierH + 1, (i % 2 ? 1 : -1) * w * 0.28);
      ramp.rotation.x = -0.5; ramp.rotation.y = (i % 2) * Math.PI;
      g.add(ramp);
    }
    const shrine = box(babel ? 12 : 4, babel ? 8 : 3, babel ? 12 : 4, lam(0x8a4a3a));
    shrine.position.y = top + (babel ? 4 : 1.5); g.add(shrine);
    const ember = makeSprite(0xff8a4a, babel ? 12 : 4, 0.5); ember.position.y = top + (babel ? 8 : 4); g.add(ember);
    if (babel) {
      // its top lost in cloud — "a tower whose top may reach unto heaven"
      const clouds = [];
      for (let i = 0; i < 5; i++) {
        const c = makeSprite(0xb9a68e, 40 + i * 14, 0.2);
        c.material.blending = THREE.NormalBlending;
        c.position.set((i - 2) * 16, top - 6 + i * 8, 0);
        clouds.push(c); g.add(c);
      }
      ctx.facePath = true;
      ctx.focusH = 82;
      return {
        group: g,
        update: (t) => {
          clouds.forEach((c, i) => { c.position.x = (i - 2) * 16 + Math.sin(t * 0.15 + i) * 10; });
        },
      };
    }
    ctx.focusH = 16;
    return { group: g };
  },

  city(ctx) {
    const g = new THREE.Group();
    const rng = ctx.rng;
    const lonely = ctx.book.id === 'lamentations';
    const burning = ctx.story && /Sodom falls/.test(ctx.story.data.title);
    const ruin = lonely || burning;
    const lit = !ruin && (ctx.book.palette.stars > 0.2 || ctx.book.id === 'chronicles' ||
      ['night', 'predawn', 'dusk', 'starryNight'].includes(ctx.book.palette.timeOfDay));
    const n = 16 + Math.floor(rng() * 8);
    const baseMat = burning ? lam(0x241c18) : lonely ? MAT.dark : (rng() > 0.5 ? MAT.stone : MAT.stoneLight);
    const windows = [];
    const buildings = [];
    for (let i = 0; i < n; i++) {
      // taller, wider footprints — a city reads as a city, not a hamlet
      const w = 5 + rng() * 8, h = 7 + rng() * (ruin ? 12 : 20), dd = 5 + rng() * 8;
      const b = box(w, h, dd, baseMat);
      const a = rng() * Math.PI * 2, rad = rng() * 52;
      const ox = Math.cos(a) * rad, oz = Math.sin(a) * rad;
      b.position.set(ox, h / 2 - 0.6 + groundDelta(ctx, ox, oz), oz);
      g.add(b);
      buildings.push({ b, w, h, dd });
      if (ruin && rng() > 0.5) { b.rotation.z = (rng() - 0.5) * 0.7; b.rotation.x = (rng() - 0.5) * 0.3; b.position.y -= h * 0.35; }
    }
    const winMat = (bright) => new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffd98c).multiplyScalar(bright), side: THREE.DoubleSide,
    });
    const nWin = ruin ? 0 : (lit ? 20 : 0);
    for (let i = 0; i < nWin; i++) {
      const bl = buildings[(rng() * buildings.length) | 0];
      const win = plane(0.6, 0.9, winMat(1.25));
      const face = (rng() * 4) | 0;
      const ox = face === 0 ? bl.w / 2 + 0.06 : face === 1 ? -bl.w / 2 - 0.06 : (rng() - 0.5) * bl.w * 0.6;
      const oz = face === 2 ? bl.dd / 2 + 0.06 : face === 3 ? -bl.dd / 2 - 0.06 : (rng() - 0.5) * bl.dd * 0.6;
      win.position.set(bl.b.position.x + ox, bl.b.position.y - bl.h * 0.1 + rng() * bl.h * 0.4, bl.b.position.z + oz);
      if (face < 2) win.rotation.y = Math.PI / 2;
      windows.push(win); g.add(win);
    }
    if (lit) { const halo = makeSprite(0xffce8a, 52, 0.13); halo.position.y = 16; g.add(halo); }

    const flames = [];
    if (burning) {
      // stylized fire and smoke pouring off the toppled city
      for (let i = 0; i < 9; i++) {
        const bl = buildings[(rng() * buildings.length) | 0];
        const fl = flameGroup(ctx, 1.4 + rng() * 1.2, true);
        fl.position.set(bl.b.position.x + (rng() - 0.5) * bl.w, bl.b.position.y + bl.h * 0.3, bl.b.position.z + (rng() - 0.5) * bl.dd);
        flames.push(fl); g.add(fl);
      }
      const glow = makeSprite(0xff6a2a, 90, 0.4); glow.position.y = 14; g.add(glow);
      const glow2 = makeSprite(0xffb35e, 46, 0.5); glow2.position.y = 8; g.add(glow2);
      // a pillar of smoke rising over the plain, "as the smoke of a furnace"
      const smokes = [];
      for (let i = 0; i < 6; i++) {
        const sm = makeSprite(0x2a221e, 28 + i * 10, 0.28);
        sm.material.blending = THREE.NormalBlending;
        smokes.push(sm); g.add(sm);
      }
      ctx.facePath = true;
      ctx.focusH = 20;
      return {
        group: g,
        update: (t) => {
          flames.forEach(f => f.userData.update && f.userData.update(t));
          smokes.forEach((s, i) => {
            const q = ((t * 0.09 + i * 0.16) % 1);
            s.position.set(6 + Math.sin(t * 0.3 + i) * 8, 18 + q * 70, -4);
            s.material.opacity = 0.32 * (1 - q);
            s.scale.setScalar(22 + q * 46);
          });
          glow.material.opacity = 0.35 + 0.12 * Math.sin(t * 4);
        },
      };
    }

    if (lonely) { const dying = makeSprite(0x8a2a1a, 70, 0.12); dying.position.y = 12; g.add(dying); ctx.facePath = true; }
    ctx.focusH = 15;
    let update;
    if (windows.length) {
      update = (t) => { windows.forEach((wsp, i) => { wsp.visible = Math.sin(t * 0.4 + i * 5.1) > -0.92; }); };
    }
    return { group: g, update };
  },

  temple(ctx) {
    const g = new THREE.Group();
    const platform = box(30, 3, 20, MAT.stoneLight); platform.position.y = 1.5; g.add(platform);
    const hall = box(13, 11, 20, lam(0xc2b193)); hall.position.y = 8.5; g.add(hall);
    const roofTrim = box(14, 0.7, 21, MAT.gold); roofTrim.position.y = 14.2; g.add(roofTrim);
    for (const s of [-1, 1]) {
      const pillar = cyl(1.1, 1.3, 9, lam(0x9a6a3a), 9);
      pillar.position.set(s * 4.4, 7.5, 11.2); g.add(pillar);
      const cap = box(3, 1.2, 3, MAT.gold); cap.position.set(s * 4.4, 12.4, 11.2); g.add(cap);
    }
    const door = emissivePlane(3, 6.5, ctx.book.palette.accent, 1.2);
    door.position.set(0, 6.5, 10.05); g.add(door);
    const doorGlow = makeSprite(0xffe0a0, 10, 0.4); doorGlow.position.set(0, 7, 12); g.add(doorGlow);

    let update;
    if (ctx.book.id === 'ezekiel') {
      // the river from the threshold — a widening luminous stream
      const pts = [];
      const segs = 9;
      for (let i = 0; i <= segs; i++) {
        const q = i / segs;
        pts.push({ w: 0.8 + q * 7, x: 0, y: 3.2 - q * 6.5, z: 10.5 + q * 42 });
      }
      const positions = [];
      for (let i = 0; i <= segs; i++) {
        positions.push(pts[i].x - pts[i].w / 2, pts[i].y, pts[i].z);
        positions.push(pts[i].x + pts[i].w / 2, pts[i].y, pts[i].z);
      }
      const idx = [];
      for (let i = 0; i < segs; i++) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setIndex(idx);
      const riv = new THREE.Mesh(geo, ghostMat(0xb8e87a, 0.35));
      g.add(riv);
      const motes = [];
      for (let i = 0; i < 7; i++) { const m = makeSprite(0xd8f07a, 1.6, 0.8, true); motes.push(m); g.add(m); }
      update = (t) => {
        motes.forEach((m, i) => {
          const q = ((t * 0.12 + i * 0.143) % 1);
          m.position.set((ctx.seed * 7 + i * 13) % 5 - 2.5 + Math.sin(t + i) * 1.2, 3.2 - q * 6.2 + 0.6, 10.5 + q * 42);
          m.material.opacity = 0.7 * Math.sin(q * Math.PI);
        });
      };
    }
    g.scale.setScalar(1.15);
    ctx.facePath = true;
    ctx.focusH = 11;
    return { group: g, update };
  },

  tent(ctx) {
    const g = new THREE.Group();
    const base = box(9, 3.4, 5.5, MAT.cloth); base.position.y = 1.7; g.add(base);
    const roofL = plane(10, 4, MAT.clothDark);
    roofL.rotation.set(-Math.PI / 2 + 0.75, 0, 0); roofL.position.set(0, 4.6, -1.6); g.add(roofL);
    const roofR = roofL.clone(); roofR.rotation.x = -Math.PI / 2 - 0.75; roofR.position.z = 1.6; g.add(roofR);
    const door = emissivePlane(1.6, 2.6, ctx.book.palette.accent, 1.1);
    door.position.set(0, 1.4, 2.79); g.add(door);
    const seam = emissivePlane(9.2, 0.18, ctx.book.palette.accent, 0.8);
    seam.position.set(0, 0.35, 2.77); g.add(seam);
    const glow = makeSprite(0xffdf9e, 9, 0.45); glow.position.y = 3.4; g.add(glow);
    const clouds = [];
    if (['leviticus', 'numbers', 'exodus'].includes(ctx.book.id)) {
      for (let i = 0; i < 3; i++) {
        const c = makeSprite(0xd8d4cf, 8 + i * 3, 0.16);
        c.material.blending = THREE.NormalBlending;
        c.position.set((i - 1) * 3.4, 9 + i * 1.6, 0);
        clouds.push(c); g.add(c);
      }
    }
    // A patriarch's encampment — a cluster of tents round a fire, not a lone hut.
    const camp = ctx.book.id === 'genesis' || ctx.book.id === 'samuel';
    const embers = [];
    if (camp) {
      for (const [dx, dz, sc, rot] of [[-11, 5, 0.72, 0.6], [10, -6, 0.64, -0.9], [-8, -9, 0.6, 2.1]]) {
        const t = new THREE.Group();
        const b = box(9, 3.4, 5.5, MAT.cloth); b.position.y = 1.7; t.add(b);
        const rl = plane(10, 4, MAT.clothDark); rl.rotation.set(-Math.PI / 2 + 0.75, 0, 0); rl.position.set(0, 4.6, -1.6); t.add(rl);
        const rr = rl.clone(); rr.rotation.x = -Math.PI / 2 - 0.75; rr.position.z = 1.6; t.add(rr);
        const dr = emissivePlane(1.6, 2.6, ctx.book.palette.accent, 0.8); dr.position.set(0, 1.4, 2.79); t.add(dr);
        t.position.set(dx, 0, dz); t.rotation.y = rot; t.scale.setScalar(sc);
        g.add(t);
      }
      // the camp fire
      const fireGlow = makeSprite(0xffb35e, 8, 0.5); fireGlow.position.set(1, 1.4, 6); g.add(fireGlow);
      for (let i = 0; i < 4; i++) { const e = makeSprite(0xffdf9e, 1.6, 0.8, true); embers.push(e); g.add(e); }
      const pen = box(0.2, 0.9, 8, MAT.woodDark); pen.position.set(-14, 0.5, -2); g.add(pen); // a low fold wall
    }
    if (clouds.length || embers.length) {
      g.userData.update = (t) => {
        clouds.forEach((c, i) => { c.position.x = (i - 1) * 3.4 + Math.sin(t * 0.24 + i * 2) * 1.8; });
        embers.forEach((e, i) => {
          const q = ((t * 0.5 + i * 0.25) % 1);
          e.position.set(1 + Math.sin(i * 3 + t * 2) * 0.8, 1.4 + q * 5, 6 + Math.cos(i) * 0.6);
          e.material.opacity = 0.85 * (1 - q);
        });
      };
    }
    g.scale.setScalar(camp ? 1.5 : 1.35);
    ctx.facePath = true;
    ctx.focusH = camp ? 8 : 6;
    return { group: g, update: g.userData.update };
  },

  altar(ctx) {
    const g = new THREE.Group();
    const rng = ctx.rng;
    for (let i = 0; i < 7; i++) {
      const s = blob(1 + rng() * 0.7, MAT.stone);
      s.scale.y *= 0.55;
      const a = (i / 7) * Math.PI * 2;
      const r = i < 4 ? 1.3 : 0.7;
      s.position.set(Math.cos(a) * r, 0.5 + (i < 4 ? 0 : 0.9), Math.sin(a) * r);
      s.rotation.set(rng(), rng(), rng());
      g.add(s);
    }
    for (let i = 0; i < 3; i++) {
      const w = cyl(0.12, 0.12, 2.6, MAT.woodDark, 5);
      w.rotation.set(0.3 + rng() * 0.4, rng() * 3, 1.2 + rng() * 0.3);
      w.position.set((rng() - 0.5) * 0.8, 1.9, (rng() - 0.5) * 0.8);
      g.add(w);
    }
    const carmel = ctx.book.id === 'kings';
    const flame = flameGroup(ctx, carmel ? 2.6 : 1, true);
    flame.position.y = 2.2; g.add(flame);
    if (carmel) {
      const shaft = makeSprite(0xffcf7d, 1, 0.4);
      shaft.scale.set(5, 60, 1); shaft.position.y = 30; g.add(shaft);
    }
    if (ctx.book.id === 'genesis' && ctx.story && ctx.story.data.flare) {
      // the thicket, and something waiting in it
      for (let i = 0; i < 3; i++) {
        const b = blob(1.4 + rng() * 0.8, MAT.leafDark, 1);
        b.position.set(4.5 + i * 1.8, 0.8, (rng() - 0.5) * 3);
        b.scale.y *= 0.8;
        g.add(b);
      }
      const ramGlow = makeSprite(0xffe9b8, 3.2, 0.5);
      ramGlow.position.set(5.8, 1.4, 0); g.add(ramGlow);
    }
    if (ctx.book.id === 'numbers') {
      // seven altars and a star holding its place
      const star = makeSprite(0xfff2c9, 5, 1, true);
      star.position.set(0, 46, 0); g.add(star);
      const ray = makeSprite(0xfff2c9, 1, 0.25);
      ray.scale.set(1.1, 26, 1); ray.position.set(0, 34, 0); g.add(ray);
    }
    ctx.focusH = 4;
    return { group: g, update: flame.userData.update };
  },

  pillarOfFire(ctx) {
    const g = new THREE.Group();
    const mat = columnMaterial(0xffdf9e, 0xff5a2a, false);
    const col = columnMesh(5.5, 64, mat);
    g.add(col);
    const glow = makeSprite(0xff9a4a, 30, 0.5); glow.position.y = 8; g.add(glow);
    const glowTop = makeSprite(0xffdf9e, 18, 0.35); glowTop.position.y = 56; g.add(glowTop);

    let sea = null;
    if (ctx.book.id === 'exodus' && ctx.story) {
      sea = buildSeaWalls(ctx);
      g.add(sea.group);
    }
    ctx.focusH = 30;
    return {
      group: g,
      update: (t) => {
        mat.uniforms.uTime.value = t;
        if (sea) {
          for (let i = 0; i < sea.fish.length; i++) {
            const f = sea.fish[i];
            f.position.y = f.userData.by + Math.sin(t * 0.5 + f.userData.ph) * 1.6;
            f.rotation.z = Math.sin(t * 0.7 + f.userData.ph) * 0.15;
          }
          for (let i = 0; i < sea.floor.length; i++) sea.floor[i].material.opacity = 0.1 + 0.06 * Math.sin(t * 1.3 + i);
        }
      },
    };
  },

  pillarOfCloud(ctx) {
    const g = new THREE.Group();
    const mat = columnMaterial(0xe8e4dc, 0x9a968f, true);
    const col = columnMesh(8, 52, mat);
    g.add(col);
    const glow = makeSprite(0xd8d4cf, 24, 0.2);
    glow.material.blending = THREE.NormalBlending;
    glow.position.y = 40; g.add(glow);

    const drifts = !ctx.story && (ctx.book.id === 'exodus' || ctx.book.id === 'numbers');
    const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
    const r = ctx.region;
    ctx.focusH = 26;
    return {
      group: g,
      update: (t, dt, camD) => {
        mat.uniforms.uTime.value = t;
        if (drifts) {
          const target = clamp(camD + 330, r.d0 + 160, r.d1 - 90);
          journey.sample(target, smp);
          const u = -46;
          g.position.set(
            smp.pos.x + smp.lat.x * u,
            heightAt(target, u),
            smp.pos.z + smp.lat.z * u,
          );
        }
      },
    };
  },

  burningBush(ctx) {
    const g = new THREE.Group();
    const bush = blob(2.2, lam(0x2a3d24, { emissive: 0x4a1a05, emissiveIntensity: 0.5 }), 1);
    bush.position.y = 1.6; bush.scale.y *= 0.85; g.add(bush);
    const sparks = [];
    for (let i = 0; i < 3; i++) {
      const s = makeSprite(0xffb36b, 2.4, 0.8, true);
      s.position.set((ctx.rng() - 0.5) * 2, 1.4 + ctx.rng() * 1.4, (ctx.rng() - 0.5) * 2);
      sparks.push(s); g.add(s);
    }
    const halo = makeSprite(0xff9a4a, 9, 0.4); halo.position.y = 2; g.add(halo);
    const embers = [];
    for (let i = 0; i < 5; i++) {
      const e = makeSprite(0xffcf8a, 0.7, 0.8, true);
      embers.push(e); g.add(e);
    }
    ctx.focusH = 3;
    return {
      group: g,
      update: (t) => {
        sparks.forEach((s, i) => { s.material.opacity = 0.55 + 0.4 * Math.sin(t * 7 + i * 2.4); });
        embers.forEach((e, i) => {
          const q = ((t * 0.5 + i * 0.21) % 1);
          e.position.set(Math.sin(i * 9 + t) * 1.4, 1.6 + q * 5, Math.cos(i * 7) * 1.4);
          e.material.opacity = 0.8 * (1 - q);
        });
      },
    };
  },

  tablets(ctx) {
    const g = new THREE.Group();
    const slabs = new THREE.Group();
    for (const s of [-1, 1]) {
      const slab = new THREE.Group();
      const bodyMat = lam(0x9a938a, { emissive: 0x1a1610, emissiveIntensity: 0.4 });
      const body = box(2.1, 3.2, 0.5, bodyMat); body.position.y = 1.6; slab.add(body);
      const top = cyl(1.05, 1.05, 0.5, bodyMat, 10);
      top.rotation.x = Math.PI / 2; top.position.y = 3.2; slab.add(top);
      slab.position.x = s * 1.2;
      slab.rotation.z = s * -0.1;
      slabs.add(slab);
    }
    const spark = makeSprite(0xfff2c9, 6, 0.45); spark.position.y = 4.4; slabs.add(spark);
    g.add(slabs);

    let update;
    if (ctx.book.id === 'exodus') {
      // Sinai itself: a granite mass wrapped in restless cloud
      const graniteA = lam(0x453c35);
      const graniteB = lam(0x37302a);
      const peaks = [[0, 0, -30, 62, 145], [-52, 0, -62, 44, 96], [48, 0, -70, 40, 84]];
      for (const [px, py, pz, r, h] of peaks) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 6, 3), ctx.rng() > 0.5 ? graniteA : graniteB);
        cone.position.set(px, h / 2 - 4, pz);
        cone.rotation.y = ctx.rng() * Math.PI;
        g.add(cone);
      }
      slabs.position.set(0, 42, 6);
      slabs.scale.setScalar(2.6);
      const clouds = [];
      for (let i = 0; i < 10; i++) {
        const c = makeSprite(0x232028, 52 + (i % 5) * 9, 0.5);
        c.material.blending = THREE.NormalBlending;
        clouds.push(c); g.add(c);
      }
      const flash = makeSprite(0xfff2c9, 55, 0); flash.position.set(0, 122, -30); g.add(flash);
      update = (t) => {
        clouds.forEach((c, i) => {
          const a = t * 0.045 * (i % 2 ? 1 : -1) + i * 1.23;
          const rr = 20 + (i % 5) * 6;
          c.position.set(Math.cos(a) * rr, 102 + (i % 3) * 14 + Math.sin(t * 0.2 + i) * 7, -30 + Math.sin(a) * rr);
        });
        const storm = Math.sin(t * 1.3) * Math.sin(t * 3.7 + 1.4) * Math.sin(t * 0.61);
        flash.material.opacity = storm > 0.82 ? 0.8 : 0;
        spark.material.opacity = 0.35 + (storm > 0.82 ? 0.5 : 0);
      };
      ctx.focusH = 60;
    } else {
      ctx.focusH = 3;
    }
    ctx.facePath = true;
    return { group: g, update };
  },

  serpentPole(ctx) {
    const g = new THREE.Group();
    const pole = cyl(0.22, 0.3, 14, MAT.woodDark, 6); pole.position.y = 7; g.add(pole);
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const q = i / 40;
      const a = q * Math.PI * 5;
      const r = 1.1 - q * 0.75;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 9 + q * 4.2, Math.sin(a) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 48, 0.28, 5),
      lam(0xc98a3a, { emissive: 0x6b3a08, emissiveIntensity: 1 }),
    );
    g.add(tube);
    const head = blob(0.45, lam(0xd8a04a, { emissive: 0x8a4a10, emissiveIntensity: 1.2 }));
    head.position.set(0.35, 13.4, 0); g.add(head);
    const glow = makeSprite(0xffb36b, 8, 0.5); glow.position.y = 12; g.add(glow);
    const shaft = makeSprite(0xffcf8a, 1, 0.2); shaft.scale.set(2, 22, 1); shaft.position.y = 10; g.add(shaft);
    ctx.focusH = 12;
    return { group: g };
  },

  furnace(ctx) {
    const g = new THREE.Group();
    const wallMat = MAT.stoneDark;
    const back = box(7, 9, 1, wallMat); back.position.set(0, 4.5, -3); g.add(back);
    for (const s of [-1, 1]) { const side = box(1, 9, 6, wallMat); side.position.set(s * 3.5, 4.5, 0); g.add(side); }
    const top = box(8, 1.6, 7, wallMat); top.position.y = 9.2; g.add(top);
    const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff7a2a).multiplyScalar(1.15) });
    const inner = plane(6.6, 8.6, glowMat); inner.position.set(0, 4.4, -2.4); g.add(inner);
    const figures = [];
    for (let i = 0; i < 4; i++) {
      const tall = i === 3;
      const f = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.45, tall ? 2.3 : 1.7, 3, 6),
        ghostMat(0xffffff, tall ? 0.95 : 0.75),
      );
      f.position.set((i - 1.2) * 1.35 + (tall ? 0.4 : 0), tall ? 2.6 : 2.1, -1 - (tall ? 0.7 : 0));
      figures.push(f); g.add(f);
    }
    g.scale.setScalar(1.3);
    const heat = makeSprite(0xff9a4a, 16, 0.45); heat.position.set(0, 5, 1); g.add(heat);
    const vent = [];
    for (let i = 0; i < 4; i++) { const e = makeSprite(0xffb36b, 1, 0.7, true); vent.push(e); g.add(e); }
    ctx.facePath = true;
    ctx.focusH = 5;
    return {
      group: g,
      update: (t) => {
        glowMat.color.setHex(0xff7a2a).multiplyScalar(1.3 + 0.5 * Math.sin(t * 6.3) * Math.sin(t * 2.7));
        figures[3].material.opacity = 0.65 + 0.3 * Math.sin(t * 1.7);
        vent.forEach((e, i) => {
          const q = ((t * 0.7 + i * 0.25) % 1);
          e.position.set(Math.sin(i * 5 + t * 2) * 1.5, 10 + q * 7, 0);
          e.material.opacity = 0.7 * (1 - q);
        });
      },
    };
  },

  bones(ctx) {
    const N = 170;
    const geo = new THREE.CylinderGeometry(0.15, 0.19, 2.1, 5);
    const boneMat = lam(0xe8e0cc, { emissive: 0x2a2618, emissiveIntensity: 0.35 });
    const mesh = new THREE.InstancedMesh(geo, boneMat, N);
    const rng = ctx.rng;
    const start = [], end = [];
    const dummy = new THREE.Object3D();
    const clusters = [];
    for (let i = 0; i < 26; i++) {
      clusters.push({ x: (rng() - 0.5) * 70, z: (rng() - 0.5) * 40 });
    }
    for (let i = 0; i < N; i++) {
      const sx = (rng() - 0.5) * 85, sz = (rng() - 0.5) * 52;
      start.push({
        pos: new THREE.Vector3(sx, 0.25, sz),
        rot: new THREE.Euler(Math.PI / 2 + (rng() - 0.5) * 0.4, rng() * Math.PI * 2, 0),
      });
      const c = clusters[i % clusters.length];
      end.push({
        pos: new THREE.Vector3(c.x + (rng() - 0.5) * 1.6, 1.1 + (rng() - 0.3), c.z + (rng() - 0.5) * 1.6),
        rot: new THREE.Euler((rng() - 0.5) * 0.5, rng() * Math.PI * 2, (rng() - 0.5) * 0.5),
        delay: rng() * 0.5,
      });
    }
    const g = new THREE.Group();
    g.add(mesh);
    const breath = makeSprite(0xd8f07a, 38, 0); breath.position.y = 7; g.add(breath);
    // keep the bone-field on the near side of the river
    if (ctx.book.id === 'ezekiel') ctx.overrideU = -(34 + ctx.rng() * 26);
    let lastP = -1;
    const apply = (p) => {
      for (let i = 0; i < N; i++) {
        const q = clamp((p - end[i].delay) / 0.5, 0, 1);
        const e = q * q * (3 - 2 * q);
        dummy.position.lerpVectors(start[i].pos, end[i].pos, e);
        dummy.rotation.set(
          lerp(start[i].rot.x, end[i].rot.x, e),
          lerp(start[i].rot.y, end[i].rot.y, e),
          lerp(start[i].rot.z, end[i].rot.z, e),
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    };
    apply(0);
    ctx.focusH = 4;
    return {
      group: g,
      update: (t, dt, camD) => {
        const delta = ctx.placement.d - camD;
        const p = smoothstep(130, -50, delta); // they stand as you walk among them
        breath.material.opacity = 0.42 * Math.sin(clamp(p, 0, 1) * Math.PI);
        if (Math.abs(p - lastP) > 0.004) { apply(p); lastP = p; }
      },
    };
  },

  wall(ctx) {
    const g = new THREE.Group();
    const segs = [];
    const title = ctx.story ? ctx.story.data.title : '';
    const mode = /Rahab/.test(title) ? 'rahab' : /Jericho/.test(title) ? 'fall' : 'stand';

    if (mode === 'rahab') {
      // a standing city wall with one lit window and a scarlet cord let down
      const rng2 = ctx.rng;
      for (let i = 0; i < 7; i++) {
        const seg = box(11, 6.6, 1.8, i % 2 ? MAT.stone : MAT.stoneLight);
        seg.position.set((i - 3) * 11.6, 3.3, (rng2() - 0.5) * 1.0);
        seg.rotation.y = (rng2() - 0.5) * 0.1;
        g.add(seg);
      }
      const win = emissivePlane(1.6, 2.2, ctx.book.palette.accent, 1.1);
      win.position.set(2, 4.6, 0.95); g.add(win);
      const winGlow = makeSprite(0xffd98c, 5, 0.4); winGlow.position.set(2, 4.6, 1.4); g.add(winGlow);
      const cord = box(0.22, 3.8, 0.22, new THREE.MeshBasicMaterial({ color: new THREE.Color(0xe8342a).multiplyScalar(1.3) }));
      cord.position.set(2, 2.7, 1.05); g.add(cord);
      const cordGlow = makeSprite(0xff3a2a, 3.4, 0.5); cordGlow.position.set(2, 2.7, 1.45); g.add(cordGlow);
      ctx.facePath = true;
      ctx.focusH = 6;
      return { group: g };
    }

    const rng = ctx.rng;
    for (let i = 0; i < 7; i++) {
      const seg = box(11, 5.5, 1.6, MAT.stone);
      seg.position.set((i - 3) * 11.6, 2.75, (rng() - 0.5) * 1.2);
      seg.rotation.y = (rng() - 0.5) * 0.14;
      g.add(seg); segs.push(seg);
    }
    if (mode === 'broken') {
      segs.forEach((s, i) => {
        if (i % 3 === 1) { s.position.y = 0.6; s.rotation.z = (rng() - 0.5) * 0.9; }
      });
      ctx.focusH = 4;
      return { group: g };
    }
    const gaps = mode === 'rebuild' ? [1, 3, 5] : null;
    if (mode === 'rebuild') gaps.forEach(i => { segs[i].position.y = -3.2; });
    ctx.focusH = 4;
    return {
      group: g,
      update: (t, dt, camD) => {
        const delta = ctx.placement.d - camD;
        // Jericho stands until you're upon it, then comes down as you pass;
        // Nehemiah's gaps close as you arrive.
        const p = mode === 'fall' ? smoothstep(40, -35, delta) : smoothstep(130, -20, delta);
        segs.forEach((s, i) => {
          const stagger = clamp(p * 1.6 - i * 0.09, 0, 1);
          if (mode === 'fall') {
            s.position.y = 2.75 - stagger * 4.5; // rubble stays half-buried
            s.rotation.z = stagger * (i % 2 ? 0.55 : -0.45);
            s.rotation.x = stagger * (i % 3 ? 0.2 : -0.25);
          } else if (gaps && gaps.includes(i)) {
            s.position.y = -3.2 + stagger * 5.95;
          }
        });
      },
    };
  },

  well(ctx) {
    const g = new THREE.Group();
    const cistern = ctx.book.id === 'jeremiah';
    const r = cistern ? 2.2 : 1.5;
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const s = box(1.2, 0.9, 0.7, cistern ? MAT.stoneDark : MAT.stone);
      s.position.set(Math.cos(a) * r, 0.45, Math.sin(a) * r);
      s.rotation.y = -a;
      g.add(s);
    }
    if (!cistern) {
      for (const s of [-1, 1]) { const p = cyl(0.12, 0.12, 2.6, MAT.wood, 5); p.position.set(s * r, 1.6, 0); g.add(p); }
      const bar = cyl(0.1, 0.1, 3.4, MAT.wood, 5); bar.rotation.z = Math.PI / 2; bar.position.y = 2.8; g.add(bar);
      const rope = cyl(0.03, 0.03, 1.6, MAT.woodDark, 4); rope.position.y = 2; g.add(rope);
    } else {
      const rope = cyl(0.04, 0.04, 4, MAT.cloth, 4); rope.position.set(0.4, 0.4, 0); g.add(rope);
      const deep = makeSprite(0xff8a5e, 3.4, 0.3); deep.position.y = -0.6; g.add(deep);
    }
    ctx.focusH = 2.5;
    return { group: g };
  },

  ladder(ctx) {
    const g = new THREE.Group();
    const H = 52, lean = 0.16;
    const railOps = [0.95, 0.7, 0.45, 0.2];
    for (const s of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        const seg = box(0.28, H / 4, 0.28, new THREE.MeshLambertMaterial({
          color: 0xd8cfb8, transparent: true, opacity: railOps[i], flatShading: true,
          emissive: 0x8a7a4a, emissiveIntensity: 0.5,
        }));
        seg.position.set(s * 1.3, H / 8 + i * (H / 4), 0);
        g.add(seg);
      }
    }
    for (let i = 0; i < 11; i++) {
      const q = i / 10;
      const rung = box(2.6, 0.2, 0.2, new THREE.MeshLambertMaterial({
        color: 0xd8cfb8, transparent: true, opacity: 0.9 * (1 - q * 0.75), flatShading: true,
        emissive: 0x8a7a4a, emissiveIntensity: 0.5,
      }));
      rung.position.y = 2 + q * (H - 4);
      g.add(rung);
    }
    g.rotation.z = lean;
    const pillow = box(1.6, 0.9, 1.1, MAT.stone); pillow.position.set(2.5, 0.45, 1); g.add(pillow);
    const shaft = makeSprite(0xfff2c9, 1, 0.16); shaft.scale.set(7, H + 14, 1);
    shaft.position.set(-4, H / 2, 0); shaft.material.rotation = -lean; g.add(shaft);
    const motes = [];
    for (let i = 0; i < 9; i++) { const m = makeSprite(0xfff2c9, 1.7, 0.8, true); motes.push(m); g.add(m); }
    ctx.focusH = 22;
    return {
      group: g,
      update: (t) => {
        motes.forEach((m, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          let q = ((t * 0.07 * (1 + i * 0.13) + i * 0.31) % 1);
          if (dir < 0) q = 1 - q;
          m.position.set(-q * lean * H * 6.2 * 0.16 + Math.sin(i) * 0.5, 1 + q * (H - 2), 0);
          m.material.opacity = 0.85 * Math.sin(Math.PI * clamp(q, 0.02, 0.98));
        });
      },
    };
  },

  rainbow(ctx) {
    const g = new THREE.Group();
    const cols = [0xff6a5e, 0xffb36b, 0xffe98c, 0x8cd88a, 0x8aa8ff];
    cols.forEach((c, i) => {
      const arc = new THREE.Mesh(
        new THREE.TorusGeometry(120 + i * 5, 2.2, 5, 48, Math.PI),
        ghostMat(c, 0.18),
      );
      g.add(arc);
    });
    // Centred on the path and squared to the direction of travel, so the
    // traveler approaches and passes beneath a full arch.
    ctx.overrideU = 0;
    ctx.alignToPath = true;
    ctx.focusH = 80;
    return { group: g };
  },

  menorah(ctx) {
    const g = new THREE.Group();
    const stem = cyl(0.14, 0.22, 3.2, MAT.gold, 6); stem.position.y = 1.6; g.add(stem);
    const flames = [];
    for (let i = 0; i < 3; i++) {
      const r = 0.75 + i * 0.65;
      const arm = new THREE.Mesh(new THREE.TorusGeometry(r, 0.1, 5, 14, Math.PI), MAT.gold);
      arm.position.y = 2.6; g.add(arm);
      for (const s of [-1, 1]) {
        const up = cyl(0.09, 0.09, 0.9 - i * 0.12, MAT.gold, 5);
        up.position.set(s * r, 3.05 - i * 0.06, 0); g.add(up);
      }
    }
    for (let i = -3; i <= 3; i++) {
      const f = makeSprite(0xffdf9e, 1.1, 0.9, true);
      f.position.set(i * 0.7, i === 0 ? 3.75 : 3.5, 0);
      flames.push(f); g.add(f);
    }
    const glow = makeSprite(0xffce8a, 6, 0.4); glow.position.y = 3.4; g.add(glow);
    ctx.focusH = 3.4;
    return {
      group: g,
      update: (t) => { flames.forEach((f, i) => { f.material.opacity = 0.7 + 0.3 * Math.sin(t * 8 + i * 1.9); }); },
    };
  },

  vineyard(ctx) {
    const g = new THREE.Group();
    const rng = ctx.rng;
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 5; i++) {
        const x = i * 4 - 8, z = row * 5 - 2.5;
        const post = cyl(0.1, 0.14, 2.2, MAT.woodDark, 5);
        post.position.set(x, 1.1, z); g.add(post);
        const leafy = blob(1.1 + rng() * 0.5, MAT.leaf, 0);
        leafy.position.set(x, 2.4, z); leafy.scale.y *= 0.7; g.add(leafy);
        if (rng() > 0.4) {
          const gr = blob(0.4, MAT.grape, 0);
          gr.position.set(x + (rng() - 0.5), 1.6, z + (rng() - 0.5));
          gr.scale.y *= 1.4; g.add(gr);
        }
      }
    }
    if (ctx.book.id === 'numbers') { // the cluster of Eshcol
      const pole = cyl(0.1, 0.1, 5.5, MAT.wood, 5);
      pole.rotation.z = Math.PI / 2; pole.position.set(0, 2.6, -6); g.add(pole);
      const g1 = blob(1.1, MAT.grape, 1); g1.position.set(-0.5, 1.6, -6); g1.scale.y *= 1.5; g.add(g1);
      const g2 = blob(0.9, MAT.grape, 1); g2.position.set(0.7, 1.8, -6); g2.scale.y *= 1.4; g.add(g2);
    }
    if (ctx.book.id === 'the-twelve') { // a door of hope in the valley
      const frame = new THREE.Group();
      const l = box(0.4, 5, 0.4, MAT.wood); l.position.set(-1.6, 2.5, 0); frame.add(l);
      const rr = box(0.4, 5, 0.4, MAT.wood); rr.position.set(1.6, 2.5, 0); frame.add(rr);
      const top = box(4, 0.4, 0.4, MAT.wood); top.position.y = 5; frame.add(top);
      const light = emissivePlane(2.9, 4.6, ctx.book.palette.accent, 0.9);
      light.position.set(0, 2.4, 0); frame.add(light);
      frame.position.set(0, 0, 6);
      g.add(frame);
      ctx.facePath = true;
    }
    ctx.focusH = 3;
    return { group: g };
  },

  boat(ctx) {
    const g = new THREE.Group();
    const hull = box(7.5, 1.9, 3, MAT.woodDark); hull.position.y = 0.6; g.add(hull);
    for (const s of [-1, 1]) {
      const prow = box(3.2, 1.7, 2.2, MAT.woodDark);
      prow.position.set(s * 4.6, 0.75, 0);
      prow.rotation.y = s * 0.45;
      g.add(prow);
    }
    const mast = cyl(0.12, 0.16, 6.5, MAT.wood, 5); mast.position.y = 4; g.add(mast);
    const boom = cyl(0.08, 0.08, 4.4, MAT.wood, 5); boom.rotation.z = Math.PI / 2;
    boom.position.y = 5.9; g.add(boom);
    const sail = box(4.2, 0.5, 0.3, MAT.cloth); sail.position.y = 5.5; g.add(sail);
    if (ctx.region.book.terrain.water === 'sea') {
      ctx.overrideU = (ctx.placement.u < 0 ? -1 : 1) * (200 + ctx.rng() * 60);
      if (ctx.region.book.id === 'the-twelve') ctx.overrideU = -(210 + ctx.rng() * 50);
      ctx.floatOnWater = true;
    }
    ctx.focusH = 4;
    return {
      group: g,
      update: (t) => {
        g.rotation.z = Math.sin(t * 0.9 + ctx.seed * 9) * 0.09;
        g.rotation.x = Math.sin(t * 0.7 + 2) * 0.06;
        if (ctx.baseY != null) g.position.y = ctx.baseY + Math.sin(t * 0.8) * 0.5;
      },
    };
  },

  stones(ctx) {
    const g = new THREE.Group();
    const rng = ctx.rng;
    const id = ctx.book.id;
    if (id === 'joshua') {
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const s = box(1, 2 + rng() * 0.7, 0.7, MAT.stoneLight);
        s.position.set(Math.cos(a) * 6, 1, Math.sin(a) * 6);
        s.rotation.y = -a; s.rotation.z = (rng() - 0.5) * 0.12;
        g.add(s);
      }
    } else if (id === 'samuel') {
      for (let i = 0; i < 5; i++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.5, 7, 5), MAT.stoneLight);
        s.position.set((rng() - 0.5) * 2.4, 0.4, (rng() - 0.5) * 2.4);
        s.scale.y = 0.8; g.add(s);
      }
      const glow = makeSprite(0xffdf9e, 3.5, 0.3); glow.position.y = 1; g.add(glow);
    } else if (id === 'deuteronomy') {
      // blessing and curse, one on each side of the road
      for (const s of [-1, 1]) {
        const slab = box(4.5, 6.5, 1, s > 0 ? MAT.stoneLight : MAT.stoneDark);
        slab.position.set(s * 60, 3.2, 0);
        slab.rotation.y = s * -0.5;
        g.add(slab);
        if (s > 0) {
          const warm = makeSprite(0xffd98c, 12, 0.5); warm.position.set(60, 5, 2); g.add(warm);
        } else {
          const cold = makeSprite(0x5a6a8a, 10, 0.3); cold.position.set(-60, 5, 2); g.add(cold);
        }
      }
      ctx.overrideU = 0;
    } else if (id === 'chronicles') {
      // a river of names, running toward a son
      for (let i = 0; i < 22; i++) {
        const side = i % 2 ? 1 : -1;
        const s = box(0.8, 1.3 + (i / 22) * 1.4, 0.5, MAT.stoneLight);
        s.position.set(side * (7 + rng() * 2), 0.8, i * 9);
        g.add(s);
        if (i > 15) {
          const m = makeSprite(0xffe6a8, 2, (i - 15) * 0.09);
          m.position.set(side * 7.5, 2.2, i * 9);
          g.add(m);
        }
      }
      ctx.alignToPath = true;
    } else if (id === 'job') {
      const mound = blob(4, lam(0x6a6258), 1); mound.scale.y = 0.35; mound.position.y = 0.7; g.add(mound);
      for (let i = 0; i < 3; i++) {
        const e = makeSprite(0xd1a05e, 1.2, 0.4, true);
        e.position.set((rng() - 0.5) * 4, 1.6 + rng(), (rng() - 0.5) * 4);
        g.add(e);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        const s = blob(0.8 + rng() * 0.5, MAT.stone);
        s.scale.y *= 0.6;
        s.position.set((rng() - 0.5) * 2, 0.4 + i * 0.5, (rng() - 0.5) * 2);
        s.rotation.set(rng(), rng(), rng());
        g.add(s);
      }
    }
    ctx.focusH = 3;
    return { group: g };
  },

  palms(ctx) {
    const g = new THREE.Group();
    const rng = ctx.rng;
    const n = 4 + Math.floor(rng() * 2);
    for (let p = 0; p < n; p++) {
      const palm = new THREE.Group();
      const h = 7 + rng() * 4;
      let px = 0;
      for (let i = 0; i < 3; i++) {
        const seg = cyl(0.22 - i * 0.04, 0.3 - i * 0.04, h / 3, MAT.wood, 6);
        px += (rng() - 0.2) * 0.5;
        seg.position.set(px, h / 6 + i * (h / 3), 0);
        seg.rotation.z = px * 0.12;
        palm.add(seg);
      }
      for (let i = 0; i < 7; i++) {
        const frond = plane(0.9, 4.2, new THREE.MeshLambertMaterial({
          color: 0x3d6b44, side: THREE.DoubleSide, flatShading: true,
        }));
        const a = (i / 7) * Math.PI * 2;
        frond.position.set(px + Math.cos(a) * 1.4, h + 0.4, Math.sin(a) * 1.4);
        frond.rotation.set(Math.PI / 2 - 0.7, a, 0, 'YXZ');
        palm.add(frond);
      }
      const ox = (rng() - 0.5) * 22, oz = (rng() - 0.5) * 22;
      palm.position.set(ox, groundDelta(ctx, ox, oz), oz);
      g.add(palm);
    }
    ctx.focusH = 8;
    return { group: g };
  },

  cedars(ctx) {
    const g = new THREE.Group();
    const rng = ctx.rng;
    for (let p = 0; p < 5; p++) {
      const h = 12 + rng() * 7;
      const tree = new THREE.Group();
      const trunk = cyl(0.3, 0.6, h * 0.45, MAT.woodDark, 6);
      trunk.position.y = h * 0.22; tree.add(trunk);
      for (let i = 0; i < 4; i++) {
        const q = i / 4;
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(2.6 * (1 - q * 0.55), h * 0.28, 7), MAT.leafDark);
        cone.position.y = h * (0.35 + q * 0.2);
        tree.add(cone);
      }
      const ox = (rng() - 0.5) * 26, oz = (rng() - 0.5) * 26;
      tree.position.set(ox, groundDelta(ctx, ox, oz), oz);
      g.add(tree);
    }
    ctx.focusH = 12;
    return { group: g };
  },

  throne(ctx) {
    const g = new THREE.Group();
    const id = ctx.book.id;
    if ((id === 'isaiah' || id === 'daniel') && ctx.story) {
      // high and lifted up — a colossal ghost against the sky
      const m = ghostMat(id === 'daniel' ? 0xc9d8ff : 0xfff2d8, 0.12);
      const seat = box(30, 9, 26, m); seat.position.y = 0; g.add(seat);
      const back = box(30, 44, 6, m); back.position.set(0, 24, -11); g.add(back);
      for (const s of [-1, 1]) { const arm = box(6, 14, 22, m); arm.position.set(s * 14, 8, 0); g.add(arm); }
      for (const s of [-1, 1]) {
        const shaft = makeSprite(id === 'daniel' ? 0xc9d8ff : 0xfff2c9, 1, 0.12);
        shaft.scale.set(16, 200, 1); shaft.position.set(s * 20, -80, 8); g.add(shaft);
      }
      const smokes = [];
      for (let i = 0; i < 5; i++) {
        const s = makeSprite(id === 'daniel' ? 0xaab8d8 : 0xb8a89a, 40 + i * 12, 0.14);
        s.material.blending = THREE.NormalBlending;
        smokes.push(s); g.add(s);
      }
      // "coming with the clouds of heaven" — real raymarched volumetric clouds
      const cloudMats = [];
      if (id === 'daniel') {
        for (let i = 0; i < 3; i++) {
          const cm = volumetricCloudMaterial(0xd8e2ff);
          cm.uniforms.uScale.value = 1 + i * 0.4;
          const plane = new THREE.Mesh(new THREE.PlaneGeometry(420, 200), cm);
          plane.position.set((i - 1) * 60, -30 - i * 14, -20 - i * 40);
          plane.renderOrder = 1;
          cloudMats.push(cm); g.add(plane);
        }
      }
      ctx.skyHeight = 210;
      ctx.overrideU = (ctx.placement.u < 0 ? -1 : 1) * 440;
      ctx.focusH = 0;
      return {
        group: g,
        update: (t) => {
          smokes.forEach((s, i) => {
            s.position.set(Math.sin(t * 0.1 + i * 2.2) * 30, -26 - i * 12 + Math.sin(t * 0.16 + i) * 6, 10);
          });
          cloudMats.forEach(cm => { cm.uniforms.uTime.value = t; });
        },
      };
    }
    if (id === 'ezekiel') {
      // wheels within wheels beneath a storm-lit seat
      const m = ghostMat(0x9ec8e8, 0.2);
      const seat = box(5, 1.6, 4.4, m); seat.position.y = 30; g.add(seat);
      const back = box(5, 6, 1, m); back.position.set(0, 33.6, -1.8); g.add(back);
      const w1 = new THREE.Mesh(new THREE.TorusGeometry(6, 0.5, 6, 24), ghostMat(0xd8f07a, 0.4));
      w1.position.y = 21; g.add(w1);
      const w2 = new THREE.Mesh(new THREE.TorusGeometry(6, 0.5, 6, 24), ghostMat(0xd8f07a, 0.4));
      w2.position.y = 21; w2.rotation.y = Math.PI / 2; g.add(w2);
      const eyeGlow = makeSprite(0xd8f07a, 20, 0.3); eyeGlow.position.y = 21; g.add(eyeGlow);
      const under = makeSprite(0x8fae9a, 30, 0.25); under.position.y = 10; g.add(under);
      ctx.focusH = 22;
      return {
        group: g,
        update: (t) => {
          w1.rotation.x = t * 0.9;
          w2.rotation.z = t * 0.7;
          eyeGlow.material.opacity = 0.22 + 0.14 * Math.sin(t * 2.3);
        },
      };
    }
    // an earthly seat, and a lamp kept burning
    const dais1 = box(9, 1, 7, MAT.stoneLight); dais1.position.y = 0.5; g.add(dais1);
    const dais2 = box(6.5, 1, 5, MAT.stoneLight); dais2.position.y = 1.5; g.add(dais2);
    const seat = box(2.6, 1.4, 2.2, MAT.gold); seat.position.y = 2.7; g.add(seat);
    const back = box(2.6, 3.6, 0.5, MAT.gold); back.position.set(0, 4.4, -0.9); g.add(back);
    const lamp = makeSprite(0xffdf9e, 3, 0.85, true); lamp.position.set(0, 6.8, 0); g.add(lamp);
    const lampGlow = makeSprite(0xffce8a, 8, 0.3); lampGlow.position.set(0, 6.6, 0); g.add(lampGlow);
    ctx.facePath = true;
    ctx.focusH = 4;
    return {
      group: g,
      update: (t) => { lamp.material.opacity = 0.7 + 0.25 * Math.sin(t * 5.1); },
    };
  },

  manger(ctx) {
    const g = new THREE.Group();
    for (const s of [-1, 1]) {
      const side = box(2.4, 0.8, 0.18, MAT.wood);
      side.position.set(0, 0.7, s * 0.55); side.rotation.x = s * 0.35; g.add(side);
      const end = box(0.18, 0.8, 1.2, MAT.wood);
      end.position.set(s * 1.15, 0.7, 0); end.rotation.z = s * -0.3; g.add(end);
      const leg = box(0.16, 0.9, 0.16, MAT.woodDark);
      leg.position.set(s * 0.8, 0.45, s * 0.3); g.add(leg);
    }
    const straw = blob(0.8, lam(0xc9a85e), 0); straw.scale.y = 0.35; straw.position.y = 0.85; g.add(straw);
    const warm = makeSprite(0xffe0a0, 3.2, 0.5); warm.position.y = 1.2; g.add(warm);
    const star = makeSprite(0xfff2c9, 3.4, 0.9, true); star.position.y = 34; g.add(star);
    const ray = makeSprite(0xfff2c9, 1, 0.14); ray.scale.set(1.4, 30, 1); ray.position.y = 18; g.add(ray);
    ctx.facePath = true;
    ctx.focusH = 2;
    return { group: g };
  },
};

// ---- story-bound set pieces, registered as regular props -------------------
BUILDERS.passover = passoverDoors;
BUILDERS.whirlwind = whirlwind;

// A glowing plane of Hebrew type drawn to a canvas (using the loaded Frank Ruhl
// Libre webfont) — crisp scripture that can float in 3D space.
function hebrewPlane(text, worldW, colorHex) {
  const cw = 1024, ch = 256;
  const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const draw = () => {
    const c = cv.getContext('2d');
    c.clearRect(0, 0, cw, ch);
    c.fillStyle = '#fff';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = "500 168px 'Frank Ruhl Libre', 'Times New Roman', serif";
    c.shadowColor = colorHex; c.shadowBlur = 30;
    c.fillText(text, cw / 2, ch / 2 + 8);
    c.fillText(text, cw / 2, ch / 2 + 8);
    tex.needsUpdate = true;
  };
  draw();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(worldW, worldW * ch / cw), mat);
  return m;
}

// A churning fluid surface: domain-warped fBm flow makes turbulent, advecting
// water with foam crests — the floodwaters.
function fluidWaterMaterial() {
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    uTime: { value: 0 }, uLevel: { value: 0 }, uSun: { value: new THREE.Color(0xbcd8ee) },
  }]);
  return new THREE.ShaderMaterial({
    uniforms, transparent: true, fog: true, side: THREE.DoubleSide, depthWrite: false,
    vertexShader: `
      varying vec3 vW;
      #include <fog_pars_vertex>
      void main(){
        vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `
      varying vec3 vW; uniform float uTime; uniform vec3 uSun;
      #include <fog_pars_fragment>
      float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }
      float n(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      float fbm(vec2 p){ float s=0.,a=.5; for(int i=0;i<5;i++){ s+=a*n(p); p=p*2.03+vec2(1.7); a*=.5; } return s; }
      void main(){
        vec2 p = vW.xz*0.028;
        vec2 q = vec2(fbm(p+uTime*0.05), fbm(p+vec2(5.2,1.3)-uTime*0.04));
        float f = fbm(p + q*2.4 + uTime*0.03);
        vec3 deep=vec3(0.10,0.20,0.30), mid=vec3(0.30,0.50,0.64);
        vec3 col = mix(deep, mid, f);
        float foam = smoothstep(0.56,0.74,f);
        col = mix(col, vec3(0.85,0.9,0.95), foam*0.85);
        col += uSun * pow(f,2.5) * 0.4 + 0.05;
        gl_FragColor = vec4(col, 0.94);
        #include <fog_fragment>
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

// Dancing refracted light on the water — caustics.
BUILDERS.caustics = function (ctx) {
  const g = new THREE.Group();
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xd6f2ff) } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float uTime; uniform vec3 uColor;
      float caustic(vec2 uv){
        vec2 p = mod(uv*6.28318, 6.28318) - 250.0; vec2 i = p; float c=1.0, inten=0.005;
        for(int n=0;n<5;n++){ float t=uTime*(1.0-(3.5/float(n+1)));
          i = p + vec2(cos(t-i.x)+sin(t+i.y), sin(t-i.y)+cos(t+i.x));
          c += 1.0/length(vec2(p.x/(sin(i.x+t)/inten), p.y/(cos(i.y+t)/inten))); }
        c /= 5.0; c = 1.17 - pow(c, 1.4); return pow(abs(c), 8.0); }
      void main(){
        float k = caustic(vUv*3.0);
        float edge = smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*smoothstep(0.0,0.15,vUv.y)*smoothstep(1.0,0.85,vUv.y);
        gl_FragColor = vec4(uColor, clamp(k,0.0,1.0)*edge*0.9);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(60, 220), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0.5;
  g.add(plane);
  const glow = makeSprite(0xbfe8f5, 26, 0.2); glow.position.set(0, 3, 0); g.add(glow);
  ctx.overrideU = 55;   // over the river channel
  ctx.alignToPath = true; ctx.focusH = 3;
  return { group: g, update: (t) => { mat.uniforms.uTime.value = t; } };
};

BUILDERS.flood = function (ctx) {
  const g = new THREE.Group();
  const mat = fluidWaterMaterial();
  const water = new THREE.Mesh(new THREE.PlaneGeometry(900, 900, 1, 1), mat);
  water.rotation.x = -Math.PI / 2;
  g.add(water);
  // Noah's ark riding the flood
  const ark = new THREE.Group();
  const hull = box(24, 6, 9, MAT.woodDark); hull.position.y = 3.4; ark.add(hull);
  const cabin = box(12, 3.2, 6.4, MAT.wood); cabin.position.y = 8; ark.add(cabin);
  const win = emissivePlane(1.4, 1.1, ctx.book.palette.accent, 1.4); win.position.set(3, 8.2, 3.3); ark.add(win);
  const dove = makeSprite(0xf0ece0, 1.4, 0.9, true); ark.add(dove);
  ark.position.set(24, 0, -8); g.add(ark);
  ctx.overrideU = 0; ctx.alignToPath = true; ctx.focusH = 8;
  return {
    group: g,
    update: (t, dt, camD) => {
      mat.uniforms.uTime.value = t;
      const drop = smoothstep(30, -150, ctx.placement.d - camD);   // the waters abate as you pass
      water.position.y = 10 - drop * 26;                            // floods the land, then drains
      ark.rotation.z = Math.sin(t * 0.5) * 0.04;
      ark.position.y = 10 - drop * 26;
      const dq = ((t * 0.1) % 1);
      dove.position.set(4 + Math.sin(t) * 8, 12 + Math.sin(t * 0.7) * 3, 4 + Math.cos(t * 0.6) * 8);
      dove.material.opacity = 0.85;
    },
  };
};

// Ezra opens the book and the words of the Torah rise, lifted up over the people.
BUILDERS.wordsrising = function (ctx) {
  const g = new THREE.Group();
  // a pulpit of wood
  const base = box(6, 4, 4, MAT.wood); base.position.y = 2; g.add(base);
  const bookL = plane(3.4, 2.4, MAT.cloth); bookL.rotation.set(-1.15, 0, 0.05); bookL.position.set(-1.7, 4.5, 0.2); g.add(bookL);
  const bookR = plane(3.4, 2.4, MAT.cloth); bookR.rotation.set(-1.15, 0, -0.05); bookR.position.set(1.7, 4.5, 0.2); g.add(bookR);
  const glow = makeSprite(ctx.book.palette.accent, 10, 0.4); glow.position.set(0, 6, 0); g.add(glow);
  // rising Hebrew words
  const WORDS = ['תּוֹרָה', 'בְּרֵאשִׁית', 'שְׁמַע', 'דָּבָר', 'אָמֵן'];
  const words = [];
  for (let i = 0; i < WORDS.length; i++) {
    const w = hebrewPlane(WORDS[i], 15, ctx.book.palette.accent);
    words.push({ m: w, ph: i * 1.3, x: (i % 2 ? 1 : -1) * (2 + Math.random() * 1.5) });
    g.add(w);
  }
  ctx.facePath = true;
  ctx.focusH = 12;
  return {
    group: g,
    update: (t) => {
      for (const wd of words) {
        const q = ((t * 0.16 + wd.ph) % 1);
        wd.m.position.set(wd.x + Math.sin(t * 0.5 + wd.ph) * 0.6, 6 + q * 20, 1);
        wd.m.material.opacity = Math.sin(q * Math.PI) * 0.95;
      }
    },
  };
};

// The colossus of empires (gold head to feet of clay) pre-fractured into shards
// that fly on ballistic arcs as the stone strikes and grows into a mountain.
BUILDERS.shatter = function (ctx) {
  const g = new THREE.Group();
  const rng = ctx.rng;
  const SECTIONS = [
    [0, 9, 8, 0x8a7f6a],    // feet — iron mixed with clay
    [9, 27, 6.5, 0x565b62], // legs — iron
    [27, 41, 8.5, 0xa9743a],// belly & thighs — bronze
    [41, 57, 9.5, 0xc9cdd6],// chest & arms — silver
    [57, 70, 6.5, 0xcaa54a],// head — gold
  ];
  const shards = [];
  for (const [y0, y1, r, col] of SECTIONS) {
    const mat = lam(col, { emissive: new THREE.Color(col).multiplyScalar(0.12), emissiveIntensity: 1 });
    const n = Math.round((y1 - y0) * 1.4);
    for (let i = 0; i < n; i++) {
      const sz = 2.2 + rng() * 3.2;
      const b = box(sz, sz * (0.7 + rng() * 0.6), sz, mat);
      const a = rng() * Math.PI * 2, rr = rng() * r;
      const rest = new THREE.Vector3(Math.cos(a) * rr, y0 + rng() * (y1 - y0), Math.sin(a) * rr);
      b.position.copy(rest);
      const restRot = new THREE.Euler(rng() * 0.4, rng() * Math.PI, rng() * 0.4);
      b.rotation.copy(restRot);
      g.add(b);
      const out = rest.clone().setY(0).normalize();
      shards.push({
        mesh: b, rest, restRot,
        vel: new THREE.Vector3(out.x * (6 + rng() * 10), 6 + rng() * 12, out.z * (6 + rng() * 10)),
        ang: new THREE.Vector3((rng() - 0.5) * 4, (rng() - 0.5) * 4, (rng() - 0.5) * 4),
        delay: (rest.y / 70) * 0.5,   // feet shatter first
      });
    }
  }
  // the stone cut without hands
  const stone = blob(4.5, lam(0x6e6e78), 1); stone.position.set(0, 4, 34); g.add(stone);
  const dust = makeSprite(0xbfb6a8, 30, 0); dust.position.set(0, 6, 0); g.add(dust);
  ctx.facePath = true;
  ctx.focusH = 44;
  return {
    group: g,
    update: (t, dt, camD) => {
      const delta = ctx.placement.d - camD;           // approaching when > 0
      const stoneT = smoothstep(140, 26, delta);        // stone flies to the feet
      stone.position.set(0, 4 + stoneT * 2, 34 - stoneT * 30);
      const grow = 1 + smoothstep(24, -70, delta) * 9;  // then becomes a great mountain
      stone.scale.setScalar(grow);
      const sp = smoothstep(46, -34, delta);            // shatter progress 0→1
      dust.material.opacity = 0.5 * Math.sin(clamp(sp, 0, 1) * Math.PI);
      for (const s of shards) {
        const st = clamp((sp - s.delay) / Math.max(0.05, 1 - s.delay), 0, 1);
        const tt = st * 2.6;
        s.mesh.position.set(
          s.rest.x + s.vel.x * tt,
          Math.max(0.5, s.rest.y + s.vel.y * tt - 5.0 * tt * tt),
          s.rest.z + s.vel.z * tt);
        s.mesh.rotation.set(s.restRot.x + s.ang.x * tt, s.restRot.y + s.ang.y * tt, s.restRot.z + s.ang.z * tt);
      }
    },
  };
};

// Jacob wrestling till daybreak — two figures locked at the Jabbok ford, the
// stranger blazing with light, the moment the name Israel is given.
BUILDERS.wrestle = function (ctx) {
  const g = new THREE.Group();
  const capsule = (r, h, mat) => new THREE.Mesh(new THREE.CapsuleGeometry(r, h, 4, 8), mat);
  // Jacob — earthy, straining, leaning in
  const jacob = capsule(0.9, 3.0, lam(0x5a4433));
  jacob.position.set(-1.3, 2.6, 0); jacob.rotation.z = 0.42; g.add(jacob);
  const jHead = blob(0.7, lam(0x6a5340)); jHead.position.set(-2.0, 4.3, 0); g.add(jHead);
  // the stranger — radiant, immovable
  const angel = capsule(1.0, 3.4, lam(0xe8d79a, { emissive: 0x8a7a3a, emissiveIntensity: 1.0 }));
  angel.position.set(1.3, 2.9, 0); angel.rotation.z = -0.5; g.add(angel);
  const aHead = blob(0.75, lam(0xf0e2ad, { emissive: 0x8a7a3a, emissiveIntensity: 0.9 }));
  aHead.position.set(2.0, 4.7, 0); g.add(aHead);
  // gripping arms between them
  for (const [x, y, rot, mat] of [[-0.2, 3.4, 0.5, lam(0x5a4433)], [0.2, 3.7, -0.5, lam(0xe8d79a, { emissive: 0x8a7a3a, emissiveIntensity: 0.9 })]]) {
    const arm = cyl(0.22, 0.26, 2.4, mat, 5); arm.position.set(x, y, 0.3); arm.rotation.z = rot; g.add(arm);
  }
  // the touched hip, out of joint
  const hip = makeSprite(0xff8a5e, 3.2, 0.6); hip.position.set(-0.3, 2.2, 0.4); g.add(hip);
  // a great radiant burst — daybreak breaking over the struggle
  const burst = makeSprite(0xfff2c9, 22, 0.55); burst.position.set(0.4, 4.0, -1.5); g.add(burst);
  const rays = [];
  for (let i = 0; i < 8; i++) {
    const ray = makeSprite(0xffe9b8, 1, 0.3);
    ray.scale.set(2.4, 34, 1); ray.material.rotation = (i / 8) * Math.PI;
    ray.position.set(0.4, 4.0, -1.6); rays.push(ray); g.add(ray);
  }
  const halo = makeSprite(0xffe0a0, 40, 0.18); halo.position.set(0.4, 4, -2); g.add(halo);
  ctx.facePath = true;
  ctx.focusH = 5;
  return {
    group: g,
    update: (t) => {
      const grip = Math.sin(t * 1.6) * 0.05;
      jacob.rotation.z = 0.42 + grip; angel.rotation.z = -0.5 - grip;
      g.rotation.y = Math.sin(t * 0.25) * 0.16;
      burst.material.opacity = 0.5 + 0.18 * Math.sin(t * 2.3);
      hip.material.opacity = 0.5 + 0.25 * Math.sin(t * 5);
      rays.forEach((r, i) => { r.material.rotation = (i / 8) * Math.PI + t * 0.1; });
    },
  };
};

// A cached equirectangular "sky" environment: bright zenith, pale blue band,
// warm horizon. Gives glass and crystal something luminous to reflect/refract.
let _skyEnv = null;
function skyEnvMap() {
  if (_skyEnv) return _skyEnv;
  const w = 512, h = 256;
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const c = cv.getContext('2d');
  const grd = c.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0.0, '#f6fbff');
  grd.addColorStop(0.42, '#bcd6f4');
  grd.addColorStop(0.62, '#e7d9c6');
  grd.addColorStop(0.7, '#f4e8d4');
  grd.addColorStop(1.0, '#5a4636');
  c.fillStyle = grd; c.fillRect(0, 0, w, h);
  // a soft sun on the horizon
  const sun = c.createRadialGradient(w * 0.5, h * 0.6, 4, w * 0.5, h * 0.6, 70);
  sun.addColorStop(0, 'rgba(255,250,235,0.95)'); sun.addColorStop(1, 'rgba(255,250,235,0)');
  c.fillStyle = sun; c.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(cv);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  _skyEnv = tex;
  return tex;
}

// "Under his feet as it were a paved work of a sapphire stone, and as it were
// the body of heaven in his clearness." A true planar mirror (Reflector) laid on
// a raised dais reflects the glory and the heavens back to the elders. At the
// camera's grazing angle the sapphire floor catches the whole sky.
BUILDERS.sapphire = function (ctx) {
  const g = new THREE.Group();
  const W = 150, D = 360;
  // a low polished plinth so the mirror stands clear of the rolling ground
  const plinth = box(W + 16, 6, D + 16, MAT.stoneDark); plinth.position.y = -1.2; g.add(plinth);
  const mirror = new Reflector(new THREE.PlaneGeometry(W, D), {
    color: 0x8399c8, textureWidth: 1024, textureHeight: 1024, clipBias: 0.003,
  });
  mirror.rotation.x = -Math.PI / 2;
  mirror.position.y = 2.05;
  g.add(mirror);
  // a sapphire wash so the stone reads deep blue even where reflection is dim
  const tint = new THREE.Mesh(new THREE.PlaneGeometry(W, D),
    new THREE.MeshBasicMaterial({ color: 0x2246a0, transparent: true, opacity: 0.30, depthWrite: false, blending: THREE.AdditiveBlending }));
  tint.rotation.x = -Math.PI / 2; tint.position.y = 2.1; g.add(tint);
  // pale pavement border framing the sapphire floor
  for (const s of [-1, 1]) {
    const kerb = box(7, 2.2, D + 16, MAT.stoneLight); kerb.position.set(s * (W / 2 + 4), 2.0, 0); g.add(kerb);
  }
  // the glory hovering ahead over the pavement — the radiance the floor mirrors
  const glory = new THREE.Group(); glory.position.set(0, 52, 40);
  const core = makeSprite(0xf3f6ff, 66, 0.5); glory.add(core);
  const halo = makeSprite(0x9fc0ff, 150, 0.16); glory.add(halo);
  const sapphireDisc = new THREE.Mesh(new THREE.CircleGeometry(22, 40),
    new THREE.MeshBasicMaterial({ color: 0x9cc0ff, transparent: true, opacity: 0.6, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  sapphireDisc.lookAt(0, 0, -1); glory.add(sapphireDisc);
  const rays = [];
  for (let i = 0; i < 10; i++) {
    const ray = makeSprite(0xdce8ff, 1, 0.26); ray.scale.set(5, 110, 1);
    ray.material.rotation = (i / 10) * Math.PI; glory.add(ray); rays.push(ray);
  }
  g.add(glory);
  // elders standing along the edges, small and dark against the light
  const rngE = ctx.rng;
  for (let i = 0; i < 24; i++) {
    const side = i % 2 ? 1 : -1;
    const fig = box(0.8, 3.2 + rngE() * 0.6, 0.8, MAT.dark);
    fig.position.set(side * (W / 2 - 3 - rngE() * 5), 3.6, -D / 2 + 14 + rngE() * (D - 28));
    g.add(fig);
  }
  ctx.alignToPath = true; ctx.overrideU = 0; ctx.focusH = 16;
  return {
    group: g,
    update: (t) => {
      core.material.opacity = 0.44 + 0.1 * Math.sin(t * 1.1);
      sapphireDisc.material.opacity = 0.5 + 0.15 * Math.sin(t * 0.8 + 1);
      glory.rotation.y = t * 0.05;
      rays.forEach((r, i) => { r.material.rotation = (i / 10) * Math.PI + t * 0.06; });
    },
  };
};

// "Behold, I create new heavens and a new earth." An avenue of crystal — faceted
// spires of physically-based transmission glass that refract the mountains and
// sky behind them and reflect the heavens from a sky env-map, so the whole city
// glitters. The path threads down the middle.
BUILDERS.crystal = function (ctx) {
  const g = new THREE.Group();
  const rng = ctx.rng;
  const env = skyEnvMap();
  const glass = new THREE.MeshPhysicalMaterial({
    transmission: 0.92, thickness: 6, roughness: 0.04, metalness: 0.0,
    ior: 1.5, dispersion: 2.6, iridescence: 0.8, iridescenceIOR: 1.3,
    attenuationColor: new THREE.Color(0xbfe0ff), attenuationDistance: 90,
    specularIntensity: 1.0, clearcoat: 0.7, clearcoatRoughness: 0.08,
    envMap: env, envMapIntensity: 1.6,
    emissive: new THREE.Color(0x2a5a9c), emissiveIntensity: 0.22,
    color: 0xffffff, transparent: true, opacity: 0.9, side: THREE.FrontSide,
  });
  const spires = [];
  const bases = [];
  // an avenue: spires line both sides, a clear corridor down the centre
  const layout = [
    [-22, -60, 78, 9], [24, -30, 66, 8], [-26, 0, 90, 10], [28, 34, 58, 7],
    [-24, 60, 70, 8], [22, 96, 50, 6], [-30, -110, 54, 7], [30, -150, 46, 6],
  ];
  for (const [x, z, h, r] of layout) {
    const seg = 5 + Math.floor(rng() * 2);
    // a faceted spire: tall prism capped by a pyramid
    const spire = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.72, r, h * 0.68, seg), glass);
    shaft.position.y = h * 0.34; spire.add(shaft);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.72, h * 0.4, seg), glass);
    cap.position.y = h * 0.68 + h * 0.2; spire.add(cap);
    spire.position.set(x, 0, z);
    spire.rotation.y = rng() * Math.PI;
    g.add(spire); spires.push({ s: spire, h });
    // inner ember so each spire glows from within
    const ember = makeSprite(0xcfe8ff, r * 1.5, 0.5);
    ember.position.set(x, h * 0.5, z); g.add(ember); bases.push(ember);
  }
  // a jasper-pale foundation avenue underfoot
  const road = box(30, 1.6, 320, MAT.stoneLight); road.position.set(0, 0.4, -10); g.add(road);
  // radiance crowning the whole city — "the glory of God did lighten it"
  const crown = makeSprite(0xeaf3ff, 90, 0.2); crown.position.set(0, 96, 0); g.add(crown);
  ctx.alignToPath = true; ctx.overrideU = 0; ctx.focusH = 40;
  return {
    group: g,
    update: (t) => {
      for (let i = 0; i < spires.length; i++) {
        spires[i].s.rotation.y += 0.0012 * (i % 2 ? 1 : -1);
        bases[i].material.opacity = 0.4 + 0.14 * Math.sin(t * 0.7 + i);
      }
    },
  };
};

// "Wheels within wheels", the living creatures, a sapphire throne and the fire
// and rainbow of the glory — rendered as an ethereal cloud of thousands of soft
// gaussian splats (the concept borrowed from gaussian-splatting) rather than
// hard geometry, so the whole vision shimmers and never resolves into an idol.
BUILDERS.chariot = function (ctx) {
  const g = new THREE.Group();
  const rng = ctx.rng;
  const tex = getGlowTexture();
  // build one Points cloud from structured shells, each point carrying a colour
  const pts = [];
  const cols = [];
  const spin = [];   // which points belong to the whirling wheels (>=0 = wheel id)
  const pushPt = (x, y, z, c, wheel = -1) => { pts.push(x, y, z); cols.push(c.r, c.g, c.b); spin.push(wheel); };
  const amber = new THREE.Color(0xffbf6a).multiplyScalar(0.6), topaz = new THREE.Color(0xffe6a8).multiplyScalar(0.62);
  const sapph = new THREE.Color(0x6da2ff).multiplyScalar(0.62), whitefire = new THREE.Color(0xfff4dc).multiplyScalar(0.6);
  // four whirling wheels — each a torus, "a wheel in the middle of a wheel"
  const wheelPos = [[-16, 10, -12], [16, 10, -12], [-16, 10, 14], [16, 10, 14]];
  for (let w = 0; w < 4; w++) {
    const [cx, cy, cz] = wheelPos[w];
    for (let i = 0; i < 320; i++) {
      const a = rng() * Math.PI * 2, rr = 9 + (rng() - 0.5) * 1.2;
      const tube = (rng() - 0.5) * 1.4;
      // two perpendicular rings sharing a centre = wheel within a wheel
      if (i % 2 === 0) { pushPt(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, cz + tube, amber.clone().lerp(topaz, rng()), w); }
      else { pushPt(cx + tube, cy + Math.sin(a) * rr, cz + Math.cos(a) * rr, amber.clone().lerp(topaz, rng()), w); }
    }
  }
  // the living-creature radiance — a shimmering column of white fire
  for (let i = 0; i < 900; i++) {
    const a = rng() * Math.PI * 2, rr = (0.3 + rng() * 0.7) * (8 - rng() * 3);
    const y = 6 + rng() * 44;
    pushPt(Math.cos(a) * rr, y, Math.sin(a) * rr, whitefire.clone().lerp(amber, rng() * 0.5));
  }
  // the sapphire throne above the firmament — a blue dome cluster
  for (let i = 0; i < 700; i++) {
    const u = rng(), v = rng();
    const th = u * Math.PI * 2, ph = Math.acos(1 - v * 0.9);
    const rr = 12 + (rng() - 0.5) * 2;
    pushPt(Math.sin(ph) * Math.cos(th) * rr, 52 + Math.cos(ph) * rr * 0.8, Math.sin(ph) * Math.sin(th) * rr,
      sapph.clone().lerp(whitefire, rng() * 0.4));
  }
  // the rainbow of the brightness round about — a hued arc over the throne
  for (let i = 0; i < 500; i++) {
    const a = Math.PI * (0.08 + rng() * 0.84);
    const rr = 30 + (rng() - 0.5) * 1.6;
    const hue = 0.0 + (a / Math.PI) * 0.85;
    const c = new THREE.Color().setHSL(hue, 0.7, 0.5).multiplyScalar(0.72);
    pushPt(Math.cos(a) * rr, 52 + Math.sin(a) * rr, -18 + (rng() - 0.5) * 3, c);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  geo.setAttribute('acolor', new THREE.Float32BufferAttribute(cols, 3));
  geo.setAttribute('wheel', new THREE.Float32BufferAttribute(spin, 1));
  const seeds = new Float32Array(spin.length); for (let i = 0; i < seeds.length; i++) seeds[i] = rng();
  geo.setAttribute('seed', new THREE.Float32BufferAttribute(seeds, 1));
  const uniforms = { uTime: { value: 0 }, uPx: { value: 1 }, uMap: { value: tex }, uFade: { value: 1 } };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime, uPx; attribute vec3 acolor; attribute float wheel; attribute float seed;
      varying vec3 vC; varying float vTw;
      void main(){
        vC = acolor; vTw = 0.5 + 0.28*sin(uTime*3.0 + seed*40.0);
        vec3 p = position;
        if(wheel >= 0.0){                       // roll each wheel in its own vertical plane
          float cx = mod(wheel,2.0) < 0.5 ? -16.0 : 16.0;
          float ang = uTime*1.1*(wheel < 1.5 ? 1.0 : -1.0);
          float s=sin(ang), co=cos(ang);
          vec2 d = vec2(p.x - cx, p.y - 10.0);
          p.x = cx + d.x*co - d.y*s; p.y = 10.0 + d.x*s + d.y*co;
        }
        vec4 mv = modelViewMatrix * vec4(p,1.0);
        gl_PointSize = uPx*3.0*(300.0/-mv.z);
        gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: `
      uniform sampler2D uMap; uniform float uFade; varying vec3 vC; varying float vTw;
      void main(){ float m=texture2D(uMap,gl_PointCoord).r; if(m<0.02) discard;
        gl_FragColor=vec4(vC, m*vTw*uFade);
        #include <tonemapping_fragment>
        #include <colorspace_fragment> }`,
  });
  const cloud = new THREE.Points(geo, mat);
  cloud.frustumCulled = false;
  g.add(cloud);
  // a soft base halo grounding the vision in flame
  const flame = makeSprite(0xff7a3a, 26, 0.16); flame.position.y = 8; g.add(flame);
  ctx.facePath = true; ctx.overrideU = 42; ctx.focusH = 34; ctx.skyHeight = 22;
  const beatD = ctx.placement.d;
  return {
    group: g,
    update: (t, dt, camD) => {
      uniforms.uTime.value = t;
      uniforms.uPx.value = Math.min(window.devicePixelRatio || 1, 2);
      const prox = 1 - Math.min(1, Math.abs(camD - beatD) / 300);
      uniforms.uFade.value = 0.35 + 0.65 * prox;      // swells as you draw near
      flame.material.opacity = (0.12 + 0.08 * Math.sin(t * 4.0)) * prox;
    },
  };
};

// "There shall come a Star out of Jacob." A brilliant star hangs in the night
// sky, a long thick tail of light streaming down out of the land — a luminous
// tapering trail (a MeshLine-style ribbon) bright at the star and fading to
// nothing along its length.
BUILDERS.startrail = function (ctx) {
  const g = new THREE.Group();
  // the tail sweeps up out of Jacob (low, behind) to the star (high, ahead)
  const HEAD = new THREE.Vector3(18, 90, 34);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-96, 8, -46), new THREE.Vector3(-52, 34, -24),
    new THREE.Vector3(-14, 62, 2), new THREE.Vector3(2, 80, 20), HEAD,
  ]);
  const tube = new THREE.TubeGeometry(curve, 180, 2.4, 10, false);
  const trailMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xfff0c0) }, uFade: { value: 1 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: `varying float vU; varying vec2 vC; void main(){ vU=uv.x; vC=uv;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying float vU; varying vec2 vC; uniform float uTime, uFade; uniform vec3 uColor;
      void main(){
        float body = smoothstep(0.0, 0.85, vU);        // fade to nothing at the tail
        float head = smoothstep(0.9, 1.0, vU) * 1.8;   // hot core at the star
        float shimmer = 0.85 + 0.15*sin(uTime*3.0 + vU*30.0);
        float cross = smoothstep(0.35, 0.5, vC.y) * smoothstep(0.65, 0.5, vC.y); // brighter core line
        float a = (body*0.7 + head) * (0.6 + 0.4*cross) * shimmer * uFade;
        if(a < 0.01) discard;
        gl_FragColor = vec4(uColor * (0.8 + head), clamp(a,0.0,1.0));
        #include <tonemapping_fragment>
        #include <colorspace_fragment> }`,
  });
  const trail = new THREE.Mesh(tube, trailMat); g.add(trail);
  // the star itself — a hot brilliant core with radiating spikes
  const star = new THREE.Group(); star.position.copy(HEAD);
  const core = makeSprite(0xffffff, 11, 0.95); star.add(core);
  const glow = makeSprite(0xffe6a0, 30, 0.45); star.add(glow);
  const spark = makeSprite(0xfff4d0, 9, 0.9, true); star.add(spark);
  const rays = [];
  for (let i = 0; i < 4; i++) {
    const ray = makeSprite(0xfff0cf, 1, 0.5); ray.scale.set(2.2, 44, 1);
    ray.material.rotation = (i / 4) * Math.PI; star.add(ray); rays.push(ray);
  }
  g.add(star);
  // a low altar mound where Balaam looks up and beholds it
  const mound = cyl(5, 7, 3, MAT.stoneDark, 6); mound.position.set(-8, 1.5, 26); g.add(mound);
  const altarGlow = makeSprite(0xffcaa0, 7, 0.3); altarGlow.position.set(-8, 4, 26); g.add(altarGlow);
  ctx.facePath = true; ctx.focusH = 88; ctx.skyHeight = 18;
  const beatD = ctx.placement.d;
  return {
    group: g,
    update: (t, dt, camD) => {
      trailMat.uniforms.uTime.value = t;
      const prox = 1 - Math.min(1, Math.abs(camD - beatD) / 340);
      trailMat.uniforms.uFade.value = 0.4 + 0.6 * prox;
      const pulse = 0.8 + 0.2 * Math.sin(t * 2.2);
      core.material.opacity = 0.95 * pulse; glow.material.opacity = 0.45 * pulse;
      spark.material.rotation = t * 1.6;
      star.position.y = HEAD.y + Math.sin(t * 0.5) * 1.2;   // a gentle drift in the heavens
      rays.forEach((r, i) => { r.material.rotation = (i / 4) * Math.PI + t * 0.05; });
      altarGlow.material.opacity = 0.24 + 0.1 * Math.sin(t * 3);
    },
  };
};

// The binding of Isaac on Mount Moriah — an altar, the bound son, Abraham with
// the knife raised, the voice from heaven that stays his hand, and the ram
// caught in a thicket. A cinematic keyframe sequence (see camera.js) scrubs the
// camera through the whole scene as you scroll.
BUILDERS.moriah = function (ctx) {
  const g = new THREE.Group();
  // the mount — a raised rocky knoll
  const mount = blob(15, MAT.stoneDark, 1); mount.scale.set(1.5, 0.7, 1.5); mount.position.y = -5; g.add(mount);
  const mount2 = blob(9, MAT.stone, 1); mount2.scale.set(1.2, 0.6, 1.2); mount2.position.set(-6, -2, 5); g.add(mount2);
  // the altar: stacked stones topped with a wood pile
  const altar = new THREE.Group(); altar.position.y = 3;
  for (let i = 0; i < 3; i++) { const s = box(9 - i * 1.2, 1.6, 7 - i, i % 2 ? MAT.stone : MAT.stoneLight); s.position.y = i * 1.5; altar.add(s); }
  for (let i = 0; i < 5; i++) { const w = cyl(0.3, 0.3, 6.2, MAT.woodDark, 5); w.rotation.z = Math.PI / 2; w.rotation.y = i * 0.5; w.position.set((i - 2) * 0.9, 5.0, 0); altar.add(w); }
  g.add(altar);
  // Isaac bound upon the wood
  const isaac = new THREE.Mesh(new THREE.CapsuleGeometry(1.1, 3.6, 4, 8), lam(0xcaa678));
  isaac.rotation.z = Math.PI / 2; isaac.position.set(0, 8.7, 0); g.add(isaac);
  // Abraham standing over him, arm and knife lifted
  const abe = new THREE.Group(); abe.position.set(0, 3, -4.8);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(1.2, 4, 4, 8), lam(0x5a4636)); body.position.y = 4; abe.add(body);
  const head = blob(1.1, lam(0x6a5340)); head.position.y = 7.4; abe.add(head);
  const arm = cyl(0.3, 0.3, 4.2, lam(0x5a4636), 5); arm.position.set(1.6, 8.6, 0); arm.rotation.z = -0.6; abe.add(arm);
  const knife = box(0.16, 2.6, 0.5, MAT.stoneLight); knife.position.set(3.0, 10.8, 0); knife.rotation.z = -0.35; abe.add(knife);
  const glint = makeSprite(0xffffff, 2.6, 0.7); glint.position.set(3.0, 10.8, 0); abe.add(glint);
  g.add(abe);
  // the voice from heaven that stays the hand — a shaft of light and a burst
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(2, 7, 60, 12, 1, true), ghostMat(0xfff2c9, 0.14));
  beam.position.set(2, 34, 4); g.add(beam);
  const burst = makeSprite(0xfff2c9, 30, 0.4); burst.position.set(2, 42, 6); g.add(burst);
  const rays = [];
  for (let i = 0; i < 6; i++) { const r = makeSprite(0xffe9b8, 1, 0.3); r.scale.set(2.4, 40, 1); r.material.rotation = (i / 6) * Math.PI; r.position.set(2, 40, 6); g.add(r); rays.push(r); }
  // the ram caught in a thicket — the substitute provided
  const thicket = new THREE.Group(); thicket.position.set(-16, 0, 6);
  const bush = blob(3.2, MAT.leafDark, 1); bush.scale.set(1.5, 1, 1.2); bush.position.y = 2.6; thicket.add(bush);
  const bush2 = blob(2.2, MAT.leaf, 0); bush2.position.set(1.6, 2.2, 1); thicket.add(bush2);
  const ram = new THREE.Mesh(new THREE.CapsuleGeometry(1.3, 2.8, 4, 8), lam(0xe6dcc4, { emissive: 0x2a2213, emissiveIntensity: 0.6 })); ram.rotation.z = Math.PI / 2; ram.position.set(0, 3.4, 1.6); thicket.add(ram);
  const ramHead = blob(1.1, lam(0xefe6cf, { emissive: 0x2a2213, emissiveIntensity: 0.6 })); ramHead.position.set(2.6, 3.6, 1.6); thicket.add(ramHead);
  for (const s of [-1, 1]) { const horn = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.17, 6, 10, Math.PI * 1.3), MAT.bone); horn.position.set(2.9, 4.2, 1.6 + s * 0.5); horn.rotation.set(Math.PI / 2, 0, 0.6); thicket.add(horn); }
  const ramGlow = makeSprite(0xffe6b0, 11, 0.5); ramGlow.position.set(0.6, 4.2, 1.6); thicket.add(ramGlow);
  const ramBeam = makeSprite(0xfff2d0, 6, 0.28); ramBeam.scale.set(6, 22, 1); ramBeam.position.set(0.6, 10, 1); thicket.add(ramBeam);
  g.add(thicket);
  ctx.alignToPath = true; ctx.overrideU = 22; ctx.focusH = 8;
  return {
    group: g,
    update: (t) => {
      const stay = 0.6 + 0.4 * Math.sin(t * 1.6);
      burst.material.opacity = 0.3 + 0.18 * stay;
      beam.material.opacity = 0.10 + 0.08 * stay;
      glint.material.opacity = 0.5 + 0.4 * Math.abs(Math.sin(t * 2.2));
      rays.forEach((r, i) => { r.material.rotation = (i / 6) * Math.PI + t * 0.08; });
      ramGlow.material.opacity = 0.2 + 0.1 * Math.sin(t * 2 + 1);
    },
  };
};

// Two doorframes alone on the plain, blood-marked, and the traveler passes
// between them.
function passoverDoors(ctx) {
  const g = new THREE.Group();
  const bloodMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xe83424).multiplyScalar(1.5), side: THREE.DoubleSide,
  });
  // decal material: the daubed blood projected onto the wood
  const decalMat = new THREE.MeshBasicMaterial({
    map: bloodTexture(), transparent: true, color: 0xb52a1a,
    depthTest: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4,
  });
  const marks = [];
  // project a blood decal onto a target box mesh (front +z face) — Exodus 12:22,
  // "strike the lintel and the two side posts with the blood"
  const daub = (frame, target, size, seed) => {
    target.updateWorldMatrix(true, false);
    const rnd = mulberry32(seed);
    const pos = new THREE.Vector3(target.position.x + (rnd() - 0.5) * 0.3, target.position.y + (rnd() - 0.5) * 2, 0.45);
    const orient = new THREE.Euler(0, 0, rnd() * Math.PI);
    const dg = new DecalGeometry(target, pos, orient, size);
    const decal = new THREE.Mesh(dg, decalMat);
    frame.add(decal);
    return decal;
  };
  for (const s of [-1, 1]) {
    const frame = new THREE.Group();
    for (const px of [-2.4, 2.4]) {
      const post = box(0.8, 7.6, 0.8, MAT.woodDark); post.position.set(px, 3.8, 0); frame.add(post);
      post.updateMatrix(); post.matrixWorld.copy(post.matrix);
      marks.push(daub(frame, post, new THREE.Vector3(2.2, 4.4, 1.6), 100 + px * 7 + s));
      marks.push(daub(frame, post, new THREE.Vector3(1.8, 2.6, 1.6), 200 + px * 5 + s));
    }
    const lintel = box(6.4, 0.9, 0.9, MAT.woodDark); lintel.position.y = 7.9; frame.add(lintel);
    lintel.updateMatrix(); lintel.matrixWorld.copy(lintel.matrix);
    marks.push(daub(frame, lintel, new THREE.Vector3(5.4, 1.4, 1.6), 300 + s));
    const doorLight = new THREE.Mesh(unitPlane, new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffb36b).multiplyScalar(0.5), transparent: true, opacity: 0.5,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    doorLight.scale.set(4.4, 7.2, 1);
    doorLight.position.set(0, 3.8, 0);
    frame.add(doorLight);
    const hearth = makeSprite(0xffb36b, 9, 0.4); hearth.position.set(0, 3.2, 0.6); frame.add(hearth);
    const bloodGlow = makeSprite(0xff3a2a, 7, 0.35); bloodGlow.position.set(0, 7.9, 0.4); frame.add(bloodGlow);
    frame.position.set(0, 0, s * 14);
    frame.rotation.y = Math.PI / 2; // doorway faces along the path
    g.add(frame);
  }
  ctx.overrideU = 0;
  ctx.alignToPath = true;
  ctx.focusH = 7;
  return {
    group: g,
    update: (t) => {
      for (let i = 0; i < marks.length; i++) {
        marks[i].material.color.setHex(0xe83424).multiplyScalar(1.35 + 0.35 * Math.sin(t * 1.6 + i));
      }
    },
  };
}

// A column of fire-wind climbing out of the land.
function whirlwind(ctx) {
  const g = new THREE.Group();
  const embers = [];
  for (let i = 0; i < 15; i++) {
    const e = makeSprite(i % 4 === 0 ? 0xffdf9e : 0xff8a3e, 1.6 + ctx.rng() * 1.6, 0.8, true);
    embers.push({ s: e, ph: ctx.rng() * 9, sp: 0.09 + ctx.rng() * 0.05 });
    g.add(e);
  }
  const shaft = makeSprite(0xffcf8a, 1, 0.16); shaft.scale.set(6, 52, 1); shaft.position.y = 26; g.add(shaft);
  const baseGlow = makeSprite(0xff9a4a, 10, 0.35); baseGlow.position.y = 2; g.add(baseGlow);
  ctx.focusH = 24;
  return {
    group: g,
    update: (t) => {
      for (const e of embers) {
        const q = ((t * e.sp + e.ph) % 1);
        const a = q * 28 + e.ph * 7;
        const r = 6.5 * (1 - q * 0.62);
        e.s.position.set(Math.cos(a) * r, q * 46, Math.sin(a) * r);
        e.s.material.opacity = 0.85 * (1 - q) * (0.7 + 0.3 * Math.sin(t * 7 + e.ph));
      }
    },
  };
}

// The parted sea: two trembling walls of water with a dry road between.
function buildSeaWalls(ctx) {
  const g = new THREE.Group();
  const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  // deep at the seabed, bright and foaming toward the crest
  const mat = new THREE.MeshLambertMaterial({
    vertexColors: true, transparent: true, opacity: 0.86,
    emissive: 0x123a54, emissiveIntensity: 1.0, side: THREE.DoubleSide, flatShading: false,
  });
  const DEEP = new THREE.Color(0x0a2740), MID = new THREE.Color(0x1f6a9a), CREST = new THREE.Color(0xbfe8f5);
  const _c = new THREE.Color();
  const H = 46, step = 8, U = 30;
  const d0 = ctx.placement.d - 95, d1 = ctx.placement.d + 165;
  const rows = Math.ceil((d1 - d0) / step) + 1;

  for (const s of [-1, 1]) {
    const positions = [], colors = [], normals = [], idx = [];
    for (let r = 0; r < rows; r++) {
      const d = d0 + r * step; journey.sample(d, smp);
      const u = s * U;
      const wobble = Math.sin(r * 0.6) * 1.4;
      const bx = smp.pos.x + smp.lat.x * (u + wobble), bz = smp.pos.z + smp.lat.z * (u + wobble);
      const by = heightAt(d, u) - 2;
      positions.push(bx, by, bz, bx, by + H, bz);
      _c.copy(DEEP); colors.push(_c.r, _c.g, _c.b);
      _c.copy(MID).lerp(CREST, 0.5); colors.push(_c.r, _c.g, _c.b);
      const nx = -s * smp.lat.x, nz = -s * smp.lat.z;
      normals.push(nx, 0, nz, nx, 0, nz);
    }
    for (let r = 0; r < rows - 1; r++) { const a = r * 2; idx.push(a, a + 1, a + 2, a + 2, a + 1, a + 3); }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    const wall = new THREE.Mesh(geo, mat);
    wall.frustumCulled = false;
    g.add(wall);
    // foam crest ridge along the top
    for (let r = 0; r < rows; r += 2) {
      const d = d0 + r * step; journey.sample(d, smp);
      const u = s * U;
      const f = makeSprite(0xdff2ff, 7, 0.55);
      f.position.set(smp.pos.x + smp.lat.x * u, heightAt(d, u) - 2 + H, smp.pos.z + smp.lat.z * u);
      g.add(f);
    }
  }

  // fish suspended in the standing water
  const fish = [];
  const fishMat = new THREE.MeshBasicMaterial({ color: 0x0a2a3a, transparent: true, opacity: 0.55 });
  for (let i = 0; i < 10; i++) {
    const d = d0 + (0.2 + 0.6 * (i / 10)) * (d1 - d0); journey.sample(d, smp);
    const s = i % 2 ? 1 : -1, u = s * (U - 2);
    const f = new THREE.Mesh(new THREE.OctahedronGeometry(1.4 + Math.random() * 0.8, 0), fishMat);
    f.scale.set(2.4, 0.9, 0.7);
    const by = heightAt(d, u) + 8 + Math.random() * 24;
    f.position.set(smp.pos.x + smp.lat.x * u, by, smp.pos.z + smp.lat.z * u);
    f.userData.by = by; f.userData.ph = Math.random() * 9;
    fish.push(f); g.add(f);
  }
  // wet seabed glow on the road floor
  const floor = [];
  for (let i = 0; i < 5; i++) {
    const d = d0 + (i + 0.5) / 5 * (d1 - d0); journey.sample(d, smp);
    const fl = makeSprite(0x8fd0e8, 34, 0.14);
    fl.position.set(smp.pos.x, heightAt(d, 0) + 0.4, smp.pos.z);
    floor.push(fl); g.add(fl);
  }

  g.userData.isWorldSpace = true;
  return { group: g, mat, fish, floor };
}

// "The Sun of righteousness shall arise with healing in his wings." A dawn built
// from Rayleigh-style atmospheric scattering: a sky dome tinted by the sun's
// angle blooms in as you reach Malachi, the sun cresting the horizon ahead.
BUILDERS.dawn = function (ctx) {
  const g = new THREE.Group();
  const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  journey.sample(ctx.placement.d, smp);
  const fwd = new THREE.Vector3(smp.tan.x, 0, smp.tan.z).normalize();
  // the sun rises just above the horizon, ahead down the path
  const sunDir = new THREE.Vector3(fwd.x, 0.11, fwd.z).normalize();
  const dome = new THREE.ShaderMaterial({
    uniforms: { uSun: { value: sunDir }, uFade: { value: 0 } },
    side: THREE.BackSide, transparent: true, depthWrite: false, depthTest: false,
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vDir; uniform vec3 uSun; uniform float uFade;
      void main(){
        float up = clamp(vDir.y, 0.0, 1.0);
        vec3 zenith = vec3(0.11, 0.24, 0.58);
        vec3 horizon = vec3(1.0, 0.48, 0.26);
        vec3 sky = mix(horizon, zenith, pow(up, 0.42));
        float s = max(dot(normalize(vDir), uSun), 0.0);
        vec3 disc = vec3(1.0, 0.88, 0.66) * pow(s, 300.0) * 3.0;   // the sun's body
        vec3 halo = vec3(1.0, 0.74, 0.48) * pow(s, 8.0) * 0.45;    // scattering round the sun
        vec3 col = sky + disc + halo;
        gl_FragColor = vec4(col, uFade);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1600, 32, 20), dome);
  sky.renderOrder = -10; g.add(sky);
  // the sun's body and rays on the horizon ahead, for extra radiance
  const sunPos = fwd.clone().multiplyScalar(1400); sunPos.y = 150;
  const sun = makeSprite(0xfff2dc, 90, 0.7); sun.position.copy(sunPos); g.add(sun);
  const halo = makeSprite(0xffcf90, 240, 0.16); halo.position.copy(sunPos); g.add(halo);
  const rays = [];
  for (let i = 0; i < 8; i++) { const r = makeSprite(0xffe6bc, 1, 0.14); r.scale.set(22, 520, 1); r.material.rotation = (i / 8) * Math.PI; r.position.copy(sunPos); g.add(r); rays.push(r); }
  ctx.overrideU = 0; ctx.alignToPath = true; ctx.skyHeight = 0; ctx.focusH = 60;
  const beatD = ctx.placement.d;
  return {
    group: g,
    update: (t, dt, camD) => {
      const prox = 1 - Math.min(1, Math.abs(camD - beatD) / 380);
      dome.uniforms.uFade.value = prox * 0.72;
      const pulse = 0.6 + 0.12 * Math.sin(t * 0.8);
      sun.material.opacity = 0.6 * prox * pulse; halo.material.opacity = 0.16 * prox;
      rays.forEach((r, i) => { r.material.rotation = (i / 8) * Math.PI + t * 0.03; r.material.opacity = 0.1 * prox; });
    },
  };
};

// "Can these bones live?" A GPU shape-morph: a field of bone-dust particles
// carries two positions — scattered on the ground, and gathered into standing
// figures. As you approach, the morph runs bone to bone and an exceeding great
// army stands upon its feet (Ezekiel 37).
BUILDERS.drybones = function (ctx) {
  const g = new THREE.Group();
  const rng = ctx.rng;
  const posA = [], posB = [], seeds = [];
  // a host of standing figures gathered from the dust
  const rows = 6, cols = 6, PPF = 130;
  for (let fi = 0; fi < rows * cols; fi++) {
    const gx = ((fi % cols) - (cols - 1) / 2) * 15 + (rng() - 0.5) * 5;
    const gz = (Math.floor(fi / cols) - (rows - 1) / 2) * 16 + (rng() - 0.5) * 5;
    for (let p = 0; p < PPF; p++) {
      const y = rng() * 17;
      // a rough standing silhouette: legs, torso, shoulders, head
      let r;
      if (y < 8) r = 0.7; else if (y < 14) r = 1.9; else if (y < 15.5) r = 2.4; else r = 1.4;
      const a = rng() * Math.PI * 2, rr = Math.sqrt(rng()) * r;
      const legSplit = y < 8 ? (rng() < 0.5 ? -1 : 1) * 1.0 : 0;
      const bx = gx + Math.cos(a) * rr + legSplit, bz = gz + Math.sin(a) * rr;
      if (Math.abs(bx) < 4) continue;   // keep a narrow corridor clear down the path
      posB.push(bx, y, bz);
      // its scattered dust on the ground nearby
      posA.push(gx + (rng() - 0.5) * 11, 0.2 + rng() * 0.6, gz + (rng() - 0.5) * 11);
      seeds.push(rng());
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(posB.slice(), 3)); // dummy, unused
  geo.setAttribute('aPosA', new THREE.Float32BufferAttribute(posA, 3));
  geo.setAttribute('aPosB', new THREE.Float32BufferAttribute(posB, 3));
  geo.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 8, 0), 400);
  const uniforms = { uMorph: { value: 0 }, uPx: { value: 1 }, uMap: { value: getGlowTexture() } };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false,
    vertexShader: `
      attribute vec3 aPosA, aPosB; attribute float aSeed; uniform float uMorph, uPx;
      varying float vM;
      void main(){
        float delay = aSeed * 0.5;                       // staggered assembly, bone to bone
        float m = clamp((uMorph - delay) / 0.5, 0.0, 1.0);
        m = m * m * (3.0 - 2.0 * m);
        vM = m;
        vec3 p = mix(aPosA, aPosB, m);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uPx * (2.2 + 1.4 * m) * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform sampler2D uMap; varying float vM;
      void main(){ float a = texture2D(uMap, gl_PointCoord).r; if(a < 0.05) discard;
        vec3 bone = mix(vec3(0.44,0.40,0.33), vec3(0.66,0.62,0.52), vM);
        gl_FragColor = vec4(bone, a * (0.36 + 0.4 * vM));
        #include <tonemapping_fragment>
        #include <colorspace_fragment> }`,
  });
  const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; g.add(pts);
  // a breath-of-life wind wash over the valley
  const breath = makeSprite(0xdfe8ff, 40, 0.12); breath.position.set(0, 12, 0); g.add(breath);
  ctx.alignToPath = true; ctx.overrideU = 0; ctx.focusH = 14;
  const beatD = ctx.placement.d;
  return {
    group: g,
    update: (t, dt, camD) => {
      uniforms.uPx.value = Math.min(window.devicePixelRatio || 1, 2);
      // scattered dust as you approach; assembles and stands as you arrive
      const approach = smoothstep(beatD - 240, beatD + 30, camD);
      uniforms.uMorph.value = approach;
      breath.material.opacity = 0.14 * (approach * (1 - approach)) * 4 + 0.02;   // a wind at the joining
    },
  };
};

// Ruth gleaning in Boaz's field: an InstancedMesh of thousands of barley stalks
// bending in a wind field computed in the vertex shader (Ruth 2).
BUILDERS.barley = function (ctx) {
  const g = new THREE.Group();
  const rng = ctx.rng;
  const blade = new THREE.PlaneGeometry(0.18, 2.6, 1, 4);
  blade.translate(0, 1.3, 0);   // base at the ground
  const mat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTime: { value: 0 } }]),
    side: THREE.DoubleSide, fog: true,
    vertexShader: `
      uniform float uTime; varying float vH;
      #include <fog_pars_vertex>
      void main(){
        vH = uv.y;
        vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float ph = wp.x * 0.14 + wp.z * 0.14;
        float gust = sin(uTime * 1.2 + ph) + 0.5 * sin(uTime * 2.6 + ph * 1.7);
        float bend = gust * pow(vH, 1.6) * 1.5;
        wp.x += bend; wp.z += bend * 0.45;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `
      varying float vH;
      #include <fog_pars_fragment>
      void main(){
        vec3 col = mix(vec3(0.40,0.30,0.13), vec3(0.92,0.78,0.36), vH);
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const N = 6500;
  const field = new THREE.InstancedMesh(blade, mat, N);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pos = new THREE.Vector3();
  let n = 0;
  for (let i = 0; i < N * 2 && n < N; i++) {
    const x = (rng() - 0.5) * 150, z = (rng() - 0.5) * 150;
    if (Math.abs(x) < 6) continue;   // leave a corridor down the path
    const s = 0.7 + rng() * 0.9;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rng() * Math.PI);
    sc.set(s, s * (0.8 + rng() * 0.5), s);
    pos.set(x, 0, z);
    m4.compose(pos, q, sc);
    field.setMatrixAt(n++, m4);
  }
  field.count = n;
  field.instanceMatrix.needsUpdate = true;
  field.frustumCulled = false;
  g.add(field);
  // sheaves already bound, standing in the field
  const sheafMat = lam(0xc9a44a);
  for (let i = 0; i < 6; i++) {
    const sheaf = cyl(1.2, 0.5, 3.4, sheafMat, 7);
    sheaf.position.set((rng() - 0.5) * 90, 1.7, (rng() - 0.5) * 90);
    sheaf.rotation.z = (rng() - 0.5) * 0.2; g.add(sheaf);
  }
  // Ruth, bent to glean; Boaz standing near
  const ruth = new THREE.Group(); ruth.position.set(-14, 0, 10);
  const rBody = new THREE.Mesh(new THREE.CapsuleGeometry(1.0, 2.2, 4, 8), lam(0x7a5a48)); rBody.rotation.x = 0.7; rBody.position.y = 2.2; ruth.add(rBody);
  const rHead = blob(0.8, lam(0x8a6a52)); rHead.position.set(0, 3.4, 1.1); ruth.add(rHead); g.add(ruth);
  const boaz = new THREE.Group(); boaz.position.set(16, 0, -6);
  const bBody = new THREE.Mesh(new THREE.CapsuleGeometry(1.2, 3.4, 4, 8), lam(0x4a5340)); bBody.position.y = 3.4; boaz.add(bBody);
  const bHead = blob(1.0, lam(0x6a5340)); bHead.position.y = 6.6; boaz.add(bHead); g.add(boaz);
  const warm = makeSprite(0xffd89a, 26, 0.14); warm.position.set(0, 10, 0); g.add(warm);
  ctx.alignToPath = true; ctx.overrideU = 0; ctx.focusH = 8;
  return {
    group: g,
    update: (t) => { mat.uniforms.uTime.value = t; warm.material.opacity = 0.1 + 0.05 * Math.sin(t * 0.7); },
  };
};

// ---- placement manager -----------------------------------------------------
export function buildProps(scene) {
  const root = new THREE.Group();
  root.name = 'props';
  const updaters = [];
  const gates = [];
  const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  let seedCounter = 7;

  const jobs = [];
  for (const region of journey.regions) {
    for (const pl of region.placements) {
      const builder = BUILDERS[pl.type];
      if (!builder) continue;
      jobs.push({ region, pl, builder });
    }
  }

  for (const { region, pl, builder } of jobs) {
    {
      const rng = mulberry32(region.index * 991 + Math.floor(pl.d));
      const ctx = {
        placement: pl, region, book: region.book, story: pl.story,
        rng, seed: seedCounter++ * 0.618 % 1,
        overrideU: null, skyHeight: null, floatOnWater: false, alignToPath: false,
        facePath: false, focusH: 6, baseY: null,
      };
      let res;
      try { res = builder(ctx); } catch (e) { console.warn('prop failed', pl.type, e); continue; }
      const g = res.group;

      const u = ctx.overrideU != null ? ctx.overrideU : pl.u;
      journey.sample(pl.d, smp);
      const wx = smp.pos.x + smp.lat.x * u;
      const wz = smp.pos.z + smp.lat.z * u;
      let wy;
      if (ctx.skyHeight != null) wy = heightAt(pl.d, 0) + ctx.skyHeight;
      else if (ctx.floatOnWater) wy = waterLevelAt(pl.d, 'sea') + 0.4;
      else wy = heightAt(pl.d, u) - 0.4;
      ctx.baseY = wy;

      const hasWorldSpaceChild = g.children.some(c => c.userData.isWorldSpace);
      if (hasWorldSpaceChild) {
        // split world-space pieces (sea walls) out before positioning
        const ws = g.children.filter(c => c.userData.isWorldSpace);
        ws.forEach(c => { g.remove(c); root.add(c); });
      }
      g.position.set(wx, wy, wz);
      if (ctx.facePath && u !== 0) {
        const s = Math.sign(u);
        g.rotation.y = Math.atan2(-s * smp.lat.x, -s * smp.lat.z) + (rng() - 0.5) * 0.15;
      } else {
        const yaw = Math.atan2(smp.tan.x, smp.tan.z);
        g.rotation.y = ctx.alignToPath ? yaw : yaw + (rng() - 0.5) * 0.8;
      }
      root.add(g);

      if (pl.story) {
        pl.story.worldPos = new THREE.Vector3(wx, wy + ctx.focusH, wz);
      }
      if (res.update) updaters.push({ d: pl.d, fn: res.update, range: 900 });
      gates.push({ d: pl.d, g });
    }
  }

  scene.add(root);
  return {
    update(camD, time, dt) {
      for (const u of updaters) {
        if (Math.abs(u.d - camD) < u.range) u.fn(time, dt, camD);
      }
      for (const gt of gates) {
        // Show a set piece only as its beat approaches and just past it, so
        // the visual always matches the caption and nothing looms far out of
        // sequence (delta > 0 = still ahead).
        const delta = gt.d - camD;
        gt.g.visible = delta < 760 && delta > -430;
      }
    },
  };
}
