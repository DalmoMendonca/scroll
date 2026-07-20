// One ambient particle field that follows the camera and re-themes itself
// per region: temple dust, manna, embers, petals, ash, rain, star-motes.
import * as THREE from 'three';
import { journey } from './path.js';
import { getGlowTexture } from './utils.js';
import { BOOKS } from './data.js';

const MODES = {
  dust:   { a: '#d8c49a', b: '#b09468', size: 1.5, fall: 0.6,  drift: 2.5, flutter: 0.5, alpha: 0.30, twinkle: 0.2 },
  stars:  { a: '#cfe0ff', b: '#ffffff', size: 1.2, fall: 0.05, drift: 0.3, flutter: 0.2, alpha: 0.45, twinkle: 1 },
  embers: { a: '#ffb36b', b: '#ff5a2a', size: 1.6, fall: -6.5, drift: 2,   flutter: 1.4, alpha: 0.5,  twinkle: 0.8 },
  manna:  { a: '#fff3d0', b: '#ffe9a8', size: 1.7, fall: 3.5,  drift: 1,   flutter: 0.9, alpha: 0.45, twinkle: 0.3 },
  petals: { a: '#ff9eae', b: '#e86a8a', size: 1.9, fall: 2.8,  drift: 3,   flutter: 2.4, alpha: 0.4,  twinkle: 0.2 },
  ash:    { a: '#9a8f88', b: '#5a5350', size: 1.8, fall: 2.2,  drift: 5,   flutter: 1.0, alpha: 0.35, twinkle: 0.1 },
  rain:   { a: '#9fb8cc', b: '#7a99b5', size: 1.0, fall: 55,   drift: 7,   flutter: 0,   alpha: 0.3,  twinkle: 0 },
  gold:   { a: '#ffe0a0', b: '#ffc46b', size: 1.6, fall: -1.2, drift: 1.5, flutter: 0.8, alpha: 0.45, twinkle: 0.5 },
};
for (const m of Object.values(MODES)) {
  m.colA = new THREE.Color(m.a);
  m.colB = new THREE.Color(m.b);
}

// One mode key per paramRegion (intro + books + outro), aligned with journey.weights.
const REGION_MODES = ['stars', ...BOOKS.map(b => b.particles || 'dust'), 'gold'];

const N = 2200;
const BOX = new THREE.Vector3(760, 190, 760);

export class Particles {
  constructor(scene) {
    const geo = new THREE.BufferGeometry();
    const seeds = new Float32Array(N * 4);
    for (let i = 0; i < N * 4; i++) seeds[i] = Math.random();
    // dummy position attribute (real position computed in shader from seed)
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

    this.uniforms = {
      uTime: { value: 0 },
      uCenter: { value: new THREE.Vector3() },
      uColA: { value: new THREE.Color() },
      uColB: { value: new THREE.Color() },
      uSize: { value: 1.5 },
      uFall: { value: 0 },
      uDrift: { value: 0 },
      uFlutter: { value: 0 },
      uAlpha: { value: 0.4 },
      uTwinkle: { value: 0 },
      uPx: { value: 1 },
      uMap: { value: getGlowTexture() },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */`
        attribute vec4 aSeed;
        uniform float uTime, uSize, uFall, uDrift, uFlutter, uPx, uTwinkle;
        uniform vec3 uCenter;
        varying float vFade;
        varying float vSeed;
        const vec3 BOX = vec3(${BOX.x.toFixed(1)}, ${BOX.y.toFixed(1)}, ${BOX.z.toFixed(1)});
        void main() {
          vSeed = aSeed.w;
          vec3 base = aSeed.xyz * BOX;
          vec3 p = base + vec3(
            uDrift * uTime * (0.6 + aSeed.w) + sin(uTime * 0.7 + aSeed.w * 40.0) * uFlutter * 6.0,
            -uFall * uTime * (0.7 + 0.6 * aSeed.x) + sin(uTime * 0.9 + aSeed.w * 60.0) * uFlutter * 2.0,
            uDrift * 0.4 * uTime + cos(uTime * 0.6 + aSeed.w * 50.0) * uFlutter * 6.0
          );
          vec3 lo = uCenter - BOX * 0.5;
          p = mod(p - lo, BOX) + lo;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float dist = length(p - uCenter);
          vFade = smoothstep(400.0, 260.0, dist) * smoothstep(3.0, 11.0, -mv.z);
          float tw = mix(1.0, 0.55 + 0.45 * sin(uTime * 2.4 + aSeed.w * 90.0), uTwinkle);
          vFade *= tw;
          gl_PointSize = clamp(uSize * (0.6 + aSeed.y) * uPx * (240.0 / -mv.z), 0.0, 42.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        uniform vec3 uColA, uColB;
        uniform float uAlpha;
        uniform sampler2D uMap;
        varying float vFade;
        varying float vSeed;
        void main() {
          float m = texture2D(uMap, gl_PointCoord).r;
          vec3 col = mix(uColA, uColB, vSeed);
          gl_FragColor = vec4(col, m * uAlpha * vFade);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });

    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  update(d, time, camPos, pixelRatio) {
    const u = this.uniforms;
    u.uTime.value = time;
    u.uCenter.value.copy(camPos);
    u.uPx.value = Math.min(pixelRatio, 2);

    const w = journey.weights(d);
    let norm = 0;
    for (let i = 1; i < w.length; i += 2) norm += w[i];
    let size = 0, fall = 0, drift = 0, flutter = 0, alpha = 0, twinkle = 0;
    u.uColA.value.setRGB(0, 0, 0);
    u.uColB.value.setRGB(0, 0, 0);
    for (let i = 0; i < w.length; i += 2) {
      const m = MODES[REGION_MODES[w[i]]] || MODES.dust;
      const wi = w[i + 1] / norm;
      size += m.size * wi; fall += m.fall * wi; drift += m.drift * wi;
      flutter += m.flutter * wi; alpha += m.alpha * wi; twinkle += m.twinkle * wi;
      u.uColA.value.r += m.colA.r * wi; u.uColA.value.g += m.colA.g * wi; u.uColA.value.b += m.colA.b * wi;
      u.uColB.value.r += m.colB.r * wi; u.uColB.value.g += m.colB.g * wi; u.uColB.value.b += m.colB.b * wi;
    }
    u.uSize.value = size; u.uFall.value = fall; u.uDrift.value = drift;
    u.uFlutter.value = flutter; u.uAlpha.value = alpha; u.uTwinkle.value = twinkle;
  }
}
