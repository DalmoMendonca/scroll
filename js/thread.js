// The scarlet thread: one continuous vein of light that travels the entire
// journey, faint or burning by era, flaring at five moments, and finally
// pouring over the horizon into the dawn.
import * as THREE from 'three';
import { journey, RegionParams } from './path.js';
import { heightAt } from './terrain.js';
import { THREAD_COLORS } from './data.js';
import { clamp, gauss, smoothstep } from './utils.js';

const STEP = 12;
const RADIAL = 5;

export function buildThread(scene) {
  // gather flare points (the five brightest burns)
  const flares = [];
  for (const r of journey.regions) {
    for (const s of r.stories) if (s.data.flare) flares.push(s.d);
  }

  const d0 = 60;
  const d1 = journey.total + 260;
  const count = Math.floor((d1 - d0) / STEP);

  const positions = new Float32Array((count + 1) * RADIAL * 3);
  const glows = new Float32Array((count + 1) * RADIAL);
  const dists = new Float32Array((count + 1) * RADIAL);

  const P = new RegionParams();
  const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  let vi = 0;

  for (let i = 0; i <= count; i++) {
    const d = d0 + i * STEP;
    journey.params(d, P);
    journey.sample(d, smp);

    const uOff = 10 * Math.sin(d * 0.013) + 14 * Math.sin(d * 0.0031);
    let glow = P.threadGlow;
    let lift = 0;
    for (const fd of flares) {
      glow += gauss(d - fd, 22) * 0.85;
      lift += gauss(d - fd, 40) * 5;
    }
    // final pour into the dawn
    const rise = smoothstep(journey.outroStart + 120, d1 - 60, d);
    lift += rise * rise * 110;
    glow = clamp(glow + rise * 0.5, 0.03, 1.4);
    // taper away at both ends of the tube
    glow *= smoothstep(d0, d0 + 90, d) * (1 - smoothstep(d1 - 100, d1 - 15, d));

    const gy = heightAt(d, uOff) + 1.1 + lift;
    const cx = smp.pos.x + smp.lat.x * uOff;
    const cz = smp.pos.z + smp.lat.z * uOff;
    const radius = 0.4 + glow * 0.35;

    for (let rIdx = 0; rIdx < RADIAL; rIdx++) {
      const a = (rIdx / RADIAL) * Math.PI * 2;
      const ca = Math.cos(a) * radius, sa = Math.sin(a) * radius;
      positions[vi * 3] = cx + smp.lat.x * ca;
      positions[vi * 3 + 1] = gy + sa;
      positions[vi * 3 + 2] = cz + smp.lat.z * ca;
      glows[vi] = glow;
      dists[vi] = d;
      vi++;
    }
  }

  const index = [];
  for (let i = 0; i < count; i++) {
    for (let rIdx = 0; rIdx < RADIAL; rIdx++) {
      const a = i * RADIAL + rIdx;
      const b = i * RADIAL + ((rIdx + 1) % RADIAL);
      const c = a + RADIAL, dI = b + RADIAL;
      index.push(a, c, b, b, c, dI);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aGlow', new THREE.BufferAttribute(glows, 1));
  geo.setAttribute('aD', new THREE.BufferAttribute(dists, 1));
  geo.setIndex(index);
  geo.computeBoundingSphere();

  const uniforms = {
    uTime: { value: 0 },
    uCore: { value: new THREE.Color(THREAD_COLORS.core) },
    uBright: { value: new THREE.Color(THREAD_COLORS.bright) },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    vertexShader: /* glsl */`
      attribute float aGlow;
      attribute float aD;
      varying float vGlow;
      varying float vD;
      varying float vDist;
      void main() {
        vGlow = aGlow;
        vD = aD;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDist = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform vec3 uCore, uBright;
      varying float vGlow;
      varying float vD;
      varying float vDist;
      void main() {
        float pulse = 0.5 + 0.5 * sin(vD * 0.045 - uTime * 2.4);
        float pulse2 = 0.5 + 0.5 * sin(vD * 0.012 - uTime * 0.9 + 2.0);
        // gold in the mid-range, returning to crimson at the fiercest burns
        float toGold = smoothstep(0.12, 0.7, vGlow) - 0.55 * smoothstep(0.85, 1.25, vGlow);
        vec3 col = mix(uCore, uBright, clamp(toGold, 0.0, 1.0));
        float fade = exp(-max(0.0, vDist - 420.0) / 360.0);
        float a = clamp(vGlow, 0.0, 1.1) * (0.3 + 0.4 * pulse + 0.17 * pulse2) * fade;
        gl_FragColor = vec4(col * (0.9 + vGlow * 0.55), a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  return {
    mesh,
    update(time) { uniforms.uTime.value = time; },
  };
}
