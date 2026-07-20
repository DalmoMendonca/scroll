// Bootstrap: renderer, lights, world assembly, camera choreography, main loop.
import * as THREE from 'three';
import { journey, RegionParams, INTRO_LEN } from './path.js';
import { buildTerrain, buildWater, heightAt } from './terrain.js';
import { buildSky } from './sky.js';
import { Particles } from './particles.js';
import { buildThread } from './thread.js';
import { buildProps } from './props.js';
import { buildCreatures } from './creatures.js';
import { Overlay } from './overlay.js';
import { ScrollManager } from './scroll.js';
import { clamp, lerp, smoothstep, gauss, damp, prefersReducedMotion } from './utils.js';

const canvas = document.getElementById('world');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch (e) {
  document.getElementById('nogl').hidden = false;
  throw e;
}
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;

const MAX_DPR = 1.75;
let dprLevel = Math.min(window.devicePixelRatio || 1, MAX_DPR);
renderer.setPixelRatio(dprLevel);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0c0a1c, 55, 980);

const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.6, 5200);

// lights
const hemi = new THREE.HemisphereLight(0x8a90b8, 0x2a2438, 0.7);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff3d6, 1);
scene.add(sun);
scene.add(sun.target);
const amb = new THREE.AmbientLight(0xffffff, 0.12);
scene.add(amb);

// world
buildTerrain(scene);
const water = buildWater(scene);
const sky = buildSky(scene);
const thread = buildThread(scene);
const particles = new Particles(scene);
const props = buildProps(scene);
const creatures = buildCreatures(scene, (book) => new THREE.Color(book.palette.accent));

// stories with no prop still need a world anchor for their caption
const smpA = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
for (const r of journey.regions) {
  for (const s of r.stories) {
    if (!s.worldPos) {
      const u = -s.side * 38;
      journey.sample(s.d, smpA);
      s.worldPos = new THREE.Vector3(
        smpA.pos.x + smpA.lat.x * u,
        heightAt(s.d, u) + 10,
        smpA.pos.z + smpA.lat.z * u,
      );
    }
  }
}

const scroll = new ScrollManager();
const overlay = new Overlay(document.getElementById('overlay'), scroll);

// UI wiring
const driftBtn = document.getElementById('drift-btn');
driftBtn.addEventListener('click', () => scroll.toggleDrift());
scroll.onDriftChange = (on) => {
  driftBtn.textContent = on ? 'Pause' : 'Drift';
  driftBtn.classList.toggle('on', on);
};
const hint = document.getElementById('hint');
scroll.onFirstScroll = () => hint.classList.add('gone');
if (prefersReducedMotion) driftBtn.style.display = 'none';

// ---- main loop -------------------------------------------------------------
const P = new RegionParams();
const smp = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
const ahead = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
const sunDir = new THREE.Vector3();
const lookPos = new THREE.Vector3();
const camPos = new THREE.Vector3();

let last = performance.now();
let time = 0;
let roll = 0;
let frameCount = 0;
let emaFrame = 16;
let firstFrame = true;

function frame(now) {
  if (!document.hidden) requestAnimationFrame(frame);
  let dt = (now - last) / 1000;
  last = now;
  dt = clamp(dt, 0.0005, 0.05);
  time += dt;

  const d = scroll.update(dt);
  journey.params(d, P);

  // sun
  const az = 0.7 + 0.28 * Math.sin(d * 0.00022);
  const elev = Math.max(P.sunElev, -0.1) * 1.15;
  sunDir.set(
    Math.cos(elev) * Math.sin(az),
    Math.sin(elev) + 0.03,
    Math.cos(elev) * Math.cos(az),
  ).normalize();

  // camera
  journey.sample(d, smp);
  journey.sample(d + 85, ahead);
  const introQ = 1 - clamp(d / INTRO_LEN, 0, 1);
  const craneY = introQ * introQ * 85;
  const outroQ = smoothstep(journey.outroStart + 150, journey.total - 60, d);
  const bob = prefersReducedMotion ? 0 : Math.sin(time * 0.7) * 0.4 + Math.sin(time * 0.43 + 1) * 0.28;
  const sway = prefersReducedMotion ? 0 : Math.sin(time * 0.11) * 0.9;

  camPos.copy(smp.pos);
  camPos.y += 13 + craneY + bob + outroQ * 26;
  camPos.x += smp.lat.x * sway;
  camPos.z += smp.lat.z * sway;

  lookPos.copy(ahead.pos);
  lookPos.y += 11 + craneY * 0.2 + outroQ * 60;

  // glance toward the nearest story's set piece
  const region = journey.regionAt(d);
  if (region) {
    let best = null, bestW = 0;
    for (const s of region.stories) {
      const delta = s.d - d;
      if (delta < -60 || delta > 220 || !s.worldPos) continue;
      const w = gauss(delta - 65, 72);
      if (w > bestW) { bestW = w; best = s; }
    }
    if (best) lookPos.lerp(best.worldPos, clamp(bestW, 0, 1) * 0.42);
  }

  const targetRoll = clamp(-journey.curvature(d) * 900, -0.055, 0.055);
  roll = damp(roll, targetRoll, 2, dt);
  camera.up.set(Math.sin(roll), Math.cos(roll), 0);
  camera.position.copy(camPos);
  camera.lookAt(lookPos);

  // atmosphere
  hemi.color.copy(P.skyHorizon);
  hemi.groundColor.copy(P.terrainLow);
  hemi.intensity = P.hemiI;
  sun.color.copy(P.sun);
  sun.intensity = P.sunI * 1.2;
  sun.position.copy(camPos).addScaledVector(sunDir, 600);
  sun.target.position.copy(camPos);
  scene.fog.color.copy(P.fog);
  scene.fog.far = lerp(1020, 720, P.storm);
  renderer.setClearColor(P.fog);

  sky.update(P, sunDir, time, camPos);
  for (const m of water.mats) {
    m.uniforms.uTime.value = time;
    m.uniforms.uSunColor.value.copy(P.sun);
    m.uniforms.uSunI.value = P.sunI;
    m.uniforms.uGlint.value = clamp(P.sunElev * 5, 0, 1);
  }
  particles.update(d, time, camPos, dprLevel);
  thread.update(time);
  props.update(d, time, dt);
  creatures.update(d, time);
  overlay.update(d, camera, window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);

  if (firstFrame) {
    firstFrame = false;
    const reveal = () => document.getElementById('veil').classList.remove('on');
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(reveal);
      setTimeout(reveal, 1500);
    } else reveal();
  }

  // adaptive quality
  emaFrame = emaFrame * 0.95 + (dt * 1000) * 0.05;
  if (++frameCount % 150 === 0 && emaFrame > 27 && dprLevel > 1) {
    dprLevel = Math.max(1, dprLevel - 0.25);
    renderer.setPixelRatio(dprLevel);
    emaFrame = 16;
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.fov = camera.aspect < 0.8 ? 72 : 62;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);
onResize();

document.getElementById('veil').classList.add('on');
requestAnimationFrame(frame);

// Keep time flowing (slowly) when the tab is hidden, and resume cleanly.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) { last = performance.now(); requestAnimationFrame(frame); }
});
setInterval(() => { if (document.hidden) frame(performance.now()); }, 500);

// Debug/authoring hooks (harmless in production).
window.__scroll = {
  journey,
  setD(d) {
    window.scrollTo(0, d * scroll.pxPerUnit);
    scroll.d = d; scroll.target = d;
  },
  getD() { return scroll.d; },
  book(id) {
    const r = journey.regions.find(x => x.book.id === id);
    if (r) this.setD(r.d0 + 120);
  },
  bench(n = 90) {
    const t0 = performance.now();
    for (let i = 0; i < n; i++) frame(performance.now());
    return (performance.now() - t0) / n;
  },
  // Render one frame at the current (or given) distance and return a JPEG.
  capture(d, w = 960) {
    if (d != null) this.setD(d);
    frame(performance.now());
    frame(performance.now() + 16);
    const c = document.getElementById('world');
    const s = w / c.width;
    const off = document.createElement('canvas');
    off.width = Math.round(c.width * s);
    off.height = Math.round(c.height * s);
    off.getContext('2d').drawImage(c, 0, 0, off.width, off.height);
    return off.toDataURL('image/jpeg', 0.85);
  },
};
