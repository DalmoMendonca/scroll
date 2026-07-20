// The land itself: one long ribbon of faceted terrain following the path,
// with valley, flanking ranges, dunes, sea shelves and river cuts — all
// parameterized per region and blended at borders. Plus water surfaces.
import * as THREE from 'three';
import { journey, RegionParams, CORRIDOR } from './path.js';
import { worldNoise, detailNoise } from './noise.js';
import { clamp, lerp, smoothstep, gauss } from './utils.js';

const DS = 8; // meters between ribbon sections

// Non-uniform cross-section: dense near the path, sparse toward the ranges.
const XS_HALF = [0, 12, 26, 42, 60, 82, 108, 140, 180, 230, 290, 360, 440, 530, 640, 770, CORRIDOR];
const XS = [...XS_HALF.slice(1).reverse().map(v => -v), ...XS_HALF];
const NX = XS.length;

// --- Height field -----------------------------------------------------------
const _P = new RegionParams();
let _lastD = NaN, _und = 0;

function sectionParams(d) {
  if (d !== _lastD) {
    journey.params(d, _P);
    _und = worldNoise.noise(d * 0.0021, 3.7) * 4;
    _lastD = d;
  }
  return _P;
}

export function heightAt(d, u) {
  const P = sectionParams(d);
  const base = P.floorY + _und;
  const { x, z } = journey.worldXZ(d, u);
  const absU = Math.abs(u);
  const valley = smoothstep(P.vs, P.ve, absU);

  const n = worldNoise.fbm(x * 0.006, z * 0.006, 4) * 0.5 + 0.5;
  let h01 = n;
  if (P.ridge > 0.01) {
    const r = worldNoise.ridged(x * 0.006, z * 0.006, 4);
    h01 = lerp(h01, r * r * 1.15, P.ridge);
  }
  if (P.dune > 0.01) {
    const dn = worldNoise.fbm(x * 0.004, z * 0.0025, 3) * 0.5 + 0.5;
    h01 = lerp(h01, dn * 0.8, P.dune * 0.8);
  }

  let h = base + valley * h01 * P.amp;
  const wallN = 0.7 + 0.3 * (worldNoise.fbm(x * 0.002, z * 0.002, 2) * 0.5 + 0.5);
  h += smoothstep(P.wallStart, P.wallEnd, absU) * P.wallH * wallN;

  if (P.sea > 0.01 && u < -80) {
    const sm = P.sea * smoothstep(160, 420, -u);
    h = lerp(h, base - 30, sm);
  }
  if (P.river > 0.01) {
    h -= P.river * gauss(u - 55, 20) * 7;
  }
  h += detailNoise.fbm(x * 0.05, z * 0.05, 2) * 1.6 * (0.3 + 0.7 * valley);
  return h;
}

export function groundY(d, u) { return heightAt(d, u); }
export function waterLevelAt(d, kind) {
  const P = sectionParams(d);
  const base = P.floorY + _und;
  return kind === 'river' ? base - 2.2 : base - 16;
}

// --- Terrain mesh -----------------------------------------------------------
const _col = new THREE.Color();

function vertexColor(d, u, h, out) {
  const P = sectionParams(d);
  const base = P.floorY + _und;
  const { x, z } = journey.worldXZ(d, u);
  const rel = clamp((h - base) / (P.amp + P.wallH * 0.6 + 1), 0, 1);
  out.copy(P.terrainLow).lerp(P.terrainHigh, Math.pow(rel, 0.8));
  const mot = worldNoise.fbm(x * 0.02, z * 0.02, 2) * 0.5 + 0.5;
  out.multiplyScalar(0.9 + 0.2 * mot);
  if (P.river > 0.01) out.multiplyScalar(1 - P.river * gauss(u - 55, 20) * 0.35);
  if (P.sea > 0.01 && u < -80) out.multiplyScalar(1 - P.sea * smoothstep(160, 420, -u) * 0.4);
  const valley = smoothstep(P.vs, P.ve, Math.abs(u));
  out.lerp(P.accent, (1 - valley) * 0.035);
  return out;
}

export function buildTerrain(scene) {
  const group = new THREE.Group();
  group.name = 'terrain';
  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    flatShading: true,
  });

  const totalLen = journey.total + 400;
  const nSections = Math.ceil(totalLen / DS);
  const CHUNK = 256;

  const pos = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };

  for (let c0 = 0; c0 < nSections; c0 += CHUNK) {
    const c1 = Math.min(c0 + CHUNK, nSections);
    const rows = c1 - c0 + 1;
    const positions = new Float32Array(rows * NX * 3);
    const colors = new Float32Array(rows * NX * 3);
    let vi = 0;

    for (let s = c0; s <= c1; s++) {
      const d = s * DS;
      journey.sample(d, pos);
      for (let xi = 0; xi < NX; xi++) {
        const u = XS[xi];
        const wx = pos.pos.x + pos.lat.x * u;
        const wz = pos.pos.z + pos.lat.z * u;
        const h = heightAt(d, u);
        positions[vi * 3] = wx;
        positions[vi * 3 + 1] = h;
        positions[vi * 3 + 2] = wz;
        vertexColor(d, u, h, _col);
        colors[vi * 3] = _col.r; colors[vi * 3 + 1] = _col.g; colors[vi * 3 + 2] = _col.b;
        vi++;
      }
    }

    const index = new Uint32Array((rows - 1) * (NX - 1) * 6);
    let ii = 0;
    for (let r = 0; r < rows - 1; r++) {
      for (let xi = 0; xi < NX - 1; xi++) {
        const a = r * NX + xi, b = a + 1, cIdx = a + NX, dIdx = cIdx + 1;
        index[ii++] = a; index[ii++] = cIdx; index[ii++] = b;
        index[ii++] = b; index[ii++] = cIdx; index[ii++] = dIdx;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setIndex(new THREE.BufferAttribute(index, 1));
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, material);
    mesh.matrixAutoUpdate = false;
    group.add(mesh);
  }

  scene.add(group);
  return group;
}

// --- Water ------------------------------------------------------------------
export function makeWaterMaterial() {
  const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      uTime: { value: 0 },
      uSunColor: { value: new THREE.Color('#fff3d6') },
      uSunI: { value: 1 },
      uGlint: { value: 1 },
    },
  ]);
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */`
      varying vec3 vColor;
      varying vec3 vWorld;
      attribute vec3 color;
      #include <fog_pars_vertex>
      void main() {
        vColor = color;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vColor;
      varying vec3 vWorld;
      uniform float uTime;
      uniform vec3 uSunColor;
      uniform float uSunI, uGlint;
      #include <fog_pars_fragment>
      void main() {
        float r1 = sin(vWorld.x * 0.31 + uTime * 1.05) * sin(vWorld.z * 0.27 - uTime * 0.85);
        float r2 = sin(vWorld.x * 0.113 - uTime * 0.5 + vWorld.z * 0.131);
        float r3 = sin((vWorld.x + vWorld.z) * 0.173 + uTime * 0.7);
        float ripple = r1 * 0.45 + r2 * 0.33 + r3 * 0.22;
        vec3 col = vColor * (0.9 + 0.16 * ripple);
        float glint = max(0.0, ripple - 0.62) * 1.4;
        col += uSunColor * glint * 0.22 * uSunI * uGlint;
        gl_FragColor = vec4(col, 0.94);
        #include <fog_fragment>
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    fog: true,
    side: THREE.DoubleSide,
  });
  return mat;
}

export function buildWater(scene) {
  const mats = [];
  const group = new THREE.Group();
  group.name = 'water';
  const RIVER_XS = [40, 52, 64, 76];
  const SEA_XS = [-880, -700, -520, -380, -270, -160];
  const pos = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  const mat = makeWaterMaterial();
  mats.push(mat);

  // The waters of the deep: a dark sheet under the opening titles that the
  // young world rises out of as Genesis begins.
  {
    const xs = [-880, -560, -300, -120, 0, 120, 300, 560, 880];
    const d0 = -80, d1 = 640, step = 16;
    const rows = Math.ceil((d1 - d0) / step) + 1;
    const positions = new Float32Array(rows * xs.length * 3);
    const colors = new Float32Array(rows * xs.length * 3);
    let vi = 0;
    for (let s = 0; s < rows; s++) {
      const d = d0 + s * step;
      journey.sample(d, pos);
      const sink = smoothstep(380, 620, d) * 14; // recede as land appears
      const y = journey.floorYAt(d) + 3.6 - sink;
      _col.set('#10142a');
      for (let xi = 0; xi < xs.length; xi++) {
        const u = xs[xi];
        positions[vi * 3] = pos.pos.x + pos.lat.x * u;
        positions[vi * 3 + 1] = y;
        positions[vi * 3 + 2] = pos.pos.z + pos.lat.z * u;
        colors[vi * 3] = _col.r; colors[vi * 3 + 1] = _col.g; colors[vi * 3 + 2] = _col.b;
        vi++;
      }
    }
    const index = [];
    for (let s = 0; s < rows - 1; s++) {
      for (let xi = 0; xi < xs.length - 1; xi++) {
        const a = s * xs.length + xi, b = a + 1, cI = a + xs.length, dI = cI + 1;
        index.push(a, cI, b, b, cI, dI);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setIndex(index);
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.matrixAutoUpdate = false;
    mesh.renderOrder = 1;
    group.add(mesh);
  }

  for (const r of journey.regions) {
    const kind = r.book.terrain.water;
    if (kind !== 'river' && kind !== 'sea' && kind !== 'floodwaters') continue;
    const xs = kind === 'river' ? RIVER_XS : SEA_XS;
    const d0 = r.d0 - 60, d1 = r.d1 + 60;
    const step = 16;
    const rows = Math.ceil((d1 - d0) / step) + 1;
    const positions = new Float32Array(rows * xs.length * 3);
    const colors = new Float32Array(rows * xs.length * 3);
    let vi = 0;
    for (let s = 0; s < rows; s++) {
      const d = d0 + s * step;
      journey.sample(d, pos);
      const y = waterLevelAt(d, kind === 'river' ? 'river' : 'sea');
      const P = sectionParams(d);
      _col.copy(P.skyHorizon).lerp(P.skyTop, 0.55).multiplyScalar(0.85);
      for (let xi = 0; xi < xs.length; xi++) {
        const u = xs[xi];
        positions[vi * 3] = pos.pos.x + pos.lat.x * u;
        positions[vi * 3 + 1] = y;
        positions[vi * 3 + 2] = pos.pos.z + pos.lat.z * u;
        colors[vi * 3] = _col.r; colors[vi * 3 + 1] = _col.g; colors[vi * 3 + 2] = _col.b;
        vi++;
      }
    }
    const index = [];
    for (let s = 0; s < rows - 1; s++) {
      for (let xi = 0; xi < xs.length - 1; xi++) {
        const a = s * xs.length + xi, b = a + 1, cI = a + xs.length, dI = cI + 1;
        index.push(a, cI, b, b, cI, dI);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setIndex(index);
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.matrixAutoUpdate = false;
    mesh.renderOrder = 1;
    group.add(mesh);
  }
  scene.add(group);
  return { group, mats };
}
