// Per-book ground cover: instanced low-poly flora/objects strewn along each
// region's corridor, so a forest book, a wheat book, a reed-marsh book and a
// graveyard book read as completely different landscapes. One InstancedMesh per
// (region, type), gated by camera distance so only the current book draws.
import * as THREE from 'three';
import { journey } from './path.js';
import { heightAt } from './terrain.js';
import { DIRECTIONS } from './direction.js';
import { mulberry32, clamp } from './utils.js';

// ---- vertex-colored geometry helpers ---------------------------------------
function colored(geo, hex) {
  const c = new THREE.Color(hex);
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}
function merge(geos) {
  const parts = geos.map(g => (g.index ? g.toNonIndexed() : g));
  parts.forEach(g => g.computeVertexNormals());
  let total = 0;
  for (const g of parts) total += g.attributes.position.count;
  const pos = new Float32Array(total * 3), col = new Float32Array(total * 3), nor = new Float32Array(total * 3);
  let o = 0;
  for (const g of parts) {
    pos.set(g.attributes.position.array, o * 3);
    col.set(g.attributes.color.array, o * 3);
    nor.set(g.attributes.normal.array, o * 3);
    o += g.attributes.position.count;
  }
  const m = new THREE.BufferGeometry();
  m.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  m.setAttribute('color', new THREE.BufferAttribute(col, 3));
  m.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  return m;
}
const cone = (r, h, seg = 6) => new THREE.ConeGeometry(r, h, seg);
const cyl = (rt, rb, h, seg = 5) => new THREE.CylinderGeometry(rt, rb, h, seg);
const boxG = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const ico = (r, d = 0) => new THREE.IcosahedronGeometry(r, d);
function at(geo, x, y, z, sx, sy, sz) {
  if (sx !== undefined) geo.scale(sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz);
  geo.translate(x, y, z);
  return geo;
}

// ---- element prototypes (one merged geometry per type) ---------------------
const PROTO = {};
function proto(type) {
  if (PROTO[type]) return PROTO[type];
  let g;
  switch (type) {
    case 'forest': {
      const trunk = colored(at(cyl(0.16, 0.28, 2.4, 5), 0, 1.2, 0), 0x5a3f2a);
      const f1 = colored(at(cone(1.5, 3, 6), 0, 3.4, 0), 0x35502e);
      const f2 = colored(at(cone(1.1, 2.2, 6), 0, 4.7, 0), 0x2e4628);
      g = merge([trunk, f1, f2]); break;
    }
    case 'oliveGrove': {
      const trunk = colored(at(cyl(0.22, 0.34, 1.8, 5), 0, 0.9, 0), 0x6b5a44);
      const c1 = colored(at(ico(1.4, 0), -0.3, 2.4, 0.2), 0x8a9a72);
      const c2 = colored(at(ico(1.1, 0), 0.6, 2.9, -0.3), 0x9aa982);
      g = merge([trunk, c1, c2]); break;
    }
    case 'cedars': {
      const trunk = colored(at(cyl(0.2, 0.4, 2.2, 5), 0, 1.1, 0), 0x4a3524);
      const layers = [];
      for (let i = 0; i < 4; i++) layers.push(colored(at(cone(2.4 - i * 0.5, 1.6, 7), 0, 2.4 + i * 1.4, 0), 0x243c22));
      g = merge([trunk, ...layers]); break;
    }
    case 'palms': {
      const trunk = colored(at(cyl(0.18, 0.28, 5.5, 5), 0, 2.75, 0), 0x6e5334);
      const fr = [];
      for (let i = 0; i < 6; i++) {
        const f = colored(boxG(3.2, 0.12, 0.7), 0x3d6b44);
        const a = (i / 6) * Math.PI * 2;
        f.rotateZ(-0.5); f.rotateY(a); f.translate(Math.cos(a) * 1.4, 5.6, Math.sin(a) * 1.4);
        fr.push(f);
      }
      g = merge([trunk, ...fr]); break;
    }
    case 'deadTrees': {
      const trunk = colored(at(cyl(0.12, 0.3, 3.4, 5), 0, 1.7, 0), 0x2e2620);
      const b1 = colored(at(cyl(0.06, 0.1, 1.8, 4), 0.7, 3.0, 0), 0x2e2620); b1.rotateZ(0.7);
      const b2 = colored(at(cyl(0.05, 0.09, 1.5, 4), -0.6, 3.4, 0.2), 0x2e2620); b2.rotateZ(-0.8);
      g = merge([trunk, b1, b2]); break;
    }
    case 'thornbush': {
      const b = colored(at(ico(1.1, 0), 0, 0.7, 0, 1, 0.6, 1), 0x4a3f2a);
      const s1 = colored(at(cyl(0.02, 0.05, 1, 4), 0.5, 1.1, 0.2), 0x6a5a3a); s1.rotateZ(0.8);
      g = merge([b, s1]); break;
    }
    case 'reeds': {
      const parts = [];
      for (let i = 0; i < 7; i++) {
        const bl = colored(boxG(0.06, 2 + (i % 3) * 0.6, 0.06), 0x6a7a44);
        bl.rotateZ((i - 3) * 0.06);
        bl.translate((i - 3) * 0.16, 1 + (i % 3) * 0.3, (i % 2) * 0.12);
        parts.push(bl);
      }
      g = merge(parts); break;
    }
    case 'wheat': {
      const parts = [];
      for (let i = 0; i < 6; i++) {
        const st = colored(boxG(0.04, 1.4, 0.04), 0xc9a85e);
        st.rotateZ((i - 3) * 0.05); st.translate((i - 3) * 0.09, 0.7, (i % 2) * 0.08);
        parts.push(st);
        const head = colored(at(ico(0.14, 0), (i - 3) * 0.09, 1.45, (i % 2) * 0.08, 0.6, 1.4, 0.6), 0xe8c96a);
        parts.push(head);
      }
      g = merge(parts); break;
    }
    case 'flowers': {
      const parts = [];
      for (let i = 0; i < 4; i++) {
        const st = colored(boxG(0.03, 0.8, 0.03), 0x4a6b3d);
        st.translate((i - 2) * 0.18, 0.4, (i % 2) * 0.1); parts.push(st);
        const bloom = colored(at(ico(0.16, 0), (i - 2) * 0.18, 0.82, (i % 2) * 0.1, 1, 0.5, 1),
          [0xff9eae, 0xffe08f, 0xd8a8ff, 0xffffff][i % 4]);
        parts.push(bloom);
      }
      g = merge(parts); break;
    }
    case 'rocks': {
      const r1 = colored(at(ico(1, 0), 0, 0.4, 0, 1, 0.7, 1), 0x6a6258);
      const r2 = colored(at(ico(0.6, 0), 0.9, 0.3, 0.3, 1, 0.7, 1), 0x5a534a);
      g = merge([r1, r2]); break;
    }
    case 'tents': {
      const body = colored(at(boxG(2.6, 1.4, 1.8), 0, 0.7, 0), 0xbdb08e);
      const roofL = colored(boxG(1.7, 0.14, 1.9), 0x9a8f70); roofL.rotateX(0); roofL.rotateZ(0.7); roofL.translate(-0.6, 1.5, 0);
      const roofR = colored(boxG(1.7, 0.14, 1.9), 0x9a8f70); roofR.rotateZ(-0.7); roofR.translate(0.6, 1.5, 0);
      g = merge([body, roofL, roofR]); break;
    }
    case 'gravestones': {
      const s = colored(at(boxG(0.9, 1.5, 0.24), 0, 0.75, 0), 0x6a6560);
      g = merge([s]); break;
    }
    case 'lampposts': {
      const post = colored(at(cyl(0.08, 0.1, 3, 5), 0, 1.5, 0), 0x2a2620);
      const lamp = colored(at(ico(0.32, 0), 0, 3.1, 0), 0xffd98c);
      g = merge([post, lamp]); break;
    }
    default: g = merge([colored(at(ico(0.6, 0), 0, 0.4, 0), 0x6a6258)]);
  }
  PROTO[type] = g;
  return g;
}

const EMISSIVE = new Set(['flowers', 'lampposts']);

export function buildScatter(scene) {
  const root = new THREE.Group();
  root.name = 'scatter';
  const gates = [];
  const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  const dummy = new THREE.Object3D();

  for (const region of journey.regions) {
    const dir = DIRECTIONS[region.book.id];
    if (!dir || !dir.scatter || dir.scatter === 'none') continue;
    const type = dir.scatter;
    const density = clamp(dir.scatterDensity ?? 0.5, 0, 1);
    const geo = proto(type);
    const mat = new THREE.MeshLambertMaterial({
      vertexColors: true, flatShading: true,
      emissive: EMISSIVE.has(type) ? 0x332200 : 0x000000,
      emissiveIntensity: EMISSIVE.has(type) ? 0.5 : 0,
    });

    const rng = mulberry32(region.index * 2777 + 31);
    const spacing = 24 - density * 15;            // denser = closer
    const rows = Math.max(1, Math.floor((region.len - 200) / spacing));
    const perRow = 1 + Math.round(density * 3);
    const count = Math.min(1400, rows * perRow);
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    mesh.frustumCulled = false;
    let idx = 0;

    const water = region.book.terrain.water;
    for (let r = 0; r < rows && idx < count; r++) {
      const d = region.d0 + 120 + r * spacing + (rng() - 0.5) * spacing;
      journey.sample(d, smp);
      for (let k = 0; k < perRow && idx < count; k++) {
        const side = rng() > 0.5 ? 1 : -1;
        // keep clear of the path centre and the river channel
        let u = side * (26 + rng() * 240 * (0.4 + density * 0.6));
        if (water === 'river' && Math.abs(u - 55) < 26) u += 40 * side;
        const wx = smp.pos.x + smp.lat.x * u;
        const wz = smp.pos.z + smp.lat.z * u;
        const wy = heightAt(d, u) - 0.3;
        const s = 0.7 + rng() * 0.8;
        dummy.position.set(wx, wy, wz);
        dummy.rotation.set(0, rng() * Math.PI * 2, 0);
        dummy.scale.set(s, s * (0.85 + rng() * 0.4), s);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx++, dummy.matrix);
      }
    }
    mesh.count = idx;
    mesh.instanceMatrix.needsUpdate = true;
    root.add(mesh);
    gates.push({ mesh, d0: region.d0 - 300, d1: region.d1 + 300 });
  }

  scene.add(root);
  return {
    update(camD) {
      for (const g of gates) g.mesh.visible = camD > g.d0 && camD < g.d1;
    },
  };
}
