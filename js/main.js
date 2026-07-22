// Bootstrap: renderer, lights, world assembly, camera choreography, main loop.
import * as THREE from 'three';
import { journey, RegionParams, INTRO_LEN } from './path.js';
import { buildTerrain, buildWater, heightAt } from './terrain.js';
import { buildLandmarks } from './landmarks.js';
import { buildSky } from './sky.js';
import { Particles } from './particles.js';
import { buildThread } from './thread.js';
import { buildProps } from './props.js';
import { buildCreatures } from './creatures.js';
import { buildScatter } from './scatter.js';
import { Atmosphere } from './fx.js';
import { Overlay } from './overlay.js';
import { ScrollManager } from './scroll.js';
import { CameraDirector } from './camera.js';
import { Post } from './post.js';
import { GPUFlow } from './gpuflow.js';
import { GPUFlock } from './gpuflock.js';
import { clamp, lerp, smoothstep, gauss, damp, makeSprite, prefersReducedMotion } from './utils.js';

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

// moon — a second celestial body for the night regions, which turns to blood
// at Joel's darkened sun.
const moonGlow = makeSprite(0xbccadd, 240, 0); moonGlow.renderOrder = 0;
const moonDisc = makeSprite(0xeef3fb, 78, 0, true); moonDisc.material.blending = THREE.NormalBlending;
scene.add(moonGlow); scene.add(moonDisc);
const moonDir = new THREE.Vector3();
const MOON_PALE = new THREE.Color(0xeef3fb);
const MOON_BLOOD = new THREE.Color(0x8a1408);
const moonCol = new THREE.Color();

// world
buildTerrain(scene);
const water = buildWater(scene);
const landmarks = buildLandmarks(scene);
const sky = buildSky(scene);
const thread = buildThread(scene);
const particles = new Particles(scene);
const props = buildProps(scene);
const creatures = buildCreatures(scene, (book) => new THREE.Color(book.palette.accent));
const scatter = buildScatter(scene);
const atmosphere = new Atmosphere(scene);

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
const director = new CameraDirector();
const post = new Post(renderer, scene, camera);

// Beats that flare with divine radiance get a bloom boost.
const BLOOM_BEATS = [
  ['genesis', /Creation begins/, 0.7], ['genesis', /binding|Ram/, 0.4],
  ['exodus', /burning bush/, 0.6], ['exodus', /crosses the sea/, 0.5],
  ['exodus', /Ten Words/, 0.5], ['exodus', /tabernacle is filled with glory/, 0.95],
  ['numbers', /bronze serpent/, 0.4], ['numbers', /star from Jacob/, 0.6],
  ['kings', /Baal on Carmel/, 0.75], ['kings', /Solomon builds and dedicates/, 0.5],
  ['isaiah', /sees YHWH enthroned/, 0.55], ['isaiah', /new heavens/, 0.75],
  ['the-twelve', /Joel promises the Spirit/, 0.5],
  ['psalms', /priest-king/, 0.5], ['daniel', /son of man/, 0.6],
  ['ezekiel', /divine chariot/, 0.6], ['chronicles', /Cyrus/, 0.5],
];
const bloomBeats = [];
for (const [book, re, boost] of BLOOM_BEATS) {
  const region = journey.regions.find(r => r.book.id === book);
  const story = region && region.stories.find(s => re.test(s.data.title));
  if (story) bloomBeats.push({ d: story.d, boost });
}
const ecclRegion = journey.regions.find(r => r.book.id === 'ecclesiastes');
const songRegion = journey.regions.find(r => r.book.id === 'song-of-songs');
function bandW(region, d) {
  return smoothstep(region.d0 - 40, region.d0 + 140, d) * (1 - smoothstep(region.d1 - 140, region.d1 + 40, d));
}
const postTarget = {};

// Joel's "sun to darkness, moon to blood" — the eclipse beat.
let joelD = null;
{
  const twelve = journey.regions.find(r => r.book.id === 'the-twelve');
  const joel = twelve && twelve.stories.find(s => /Joel promises/.test(s.data.title));
  if (joel) joelD = joel.d;
}

// Feature 5: the Spirit poured out (Joel) as a GPGPU curl-noise flow field.
let spiritFlow = null;
if (joelD != null) {
  const s = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
  journey.sample(joelD, s);
  const anchor = new THREE.Vector3(s.pos.x, heightAt(joelD, 0) + 34, s.pos.z);
  spiritFlow = new GPUFlow(renderer, scene, anchor, '#ffe6a8', new THREE.Vector3(155, 95, 230));
  spiritFlow.beatD = joelD;
}

// Feature 6: Elijah's ravens as a GPU flock (murmuration).
let ravenFlock = null;
{
  const kings = journey.regions.find(r => r.book.id === 'kings');
  const el = kings && kings.stories.find(s => /fed by ravens/.test(s.data.title));
  if (el) {
    const s = { pos: new THREE.Vector3(), tan: new THREE.Vector3(), lat: new THREE.Vector3() };
    journey.sample(el.d, s);
    const anchor = new THREE.Vector3(s.pos.x + s.lat.x * 55, heightAt(el.d, 55) + 42, s.pos.z + s.lat.z * 55);
    ravenFlock = new GPUFlock(renderer, scene, anchor, new THREE.Vector3(95, 55, 95));
    ravenFlock.beatD = el.d;
  }
}

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
let paused = false;

function frame(now) {
  if (paused) return;
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
  const mood = director.mood(d);
  const introQ = 1 - clamp(d / INTRO_LEN, 0, 1);
  const craneY = introQ * introQ * 85;
  const outroQ = smoothstep(journey.outroStart + 150, journey.total - 60, d);
  const bob = prefersReducedMotion ? 0 : (Math.sin(time * 0.7) + 0.7 * Math.sin(time * 0.43 + 1)) * mood.bob;
  const sway = prefersReducedMotion ? 0 : Math.sin(time * 0.11) * mood.sway;

  // ride offset to one side of the path + gentle sway
  const rideU = mood.lateral * 34 + sway;
  camPos.copy(smp.pos);
  camPos.y += 13 + mood.eye + craneY + bob + outroQ * 26;
  camPos.x += smp.lat.x * rideU;
  camPos.z += smp.lat.z * rideU;

  lookPos.copy(ahead.pos);
  lookPos.y += 11 + mood.look + craneY * 0.2 + outroQ * 60;
  // slow searching arc of the gaze
  if (!prefersReducedMotion) {
    const arc = mood.orbit * Math.sin(time * 0.09) * 46;
    lookPos.x += ahead.lat.x * arc;
    lookPos.z += ahead.lat.z * arc;
  }

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

  // dramatic per-beat camera moves (descend, soar, shake, vista, ...)
  const fx = director.drama(d, time, camPos, lookPos, smp, prefersReducedMotion);
  // turn to behold marquee set pieces (Babel, the pyramids, the parted sea...)
  const beholdFov = director.behold(d, time, camPos, lookPos);

  const targetRoll = clamp(-journey.curvature(d) * 900, -0.055, 0.055) * mood.bank + fx.rollAdd;
  roll = damp(roll, targetRoll, 2.6, dt);
  camera.up.set(Math.sin(roll), Math.cos(roll), 0);
  camera.position.copy(camPos);
  camera.lookAt(lookPos);

  const wantFov = baseFov + mood.fov + fx.fovAdd + beholdFov;
  if (Math.abs(camera.fov - wantFov) > 0.02) { camera.fov = wantFov; camera.updateProjectionMatrix(); }

  // eclipse: sun darkened, moon to blood (Joel)
  const eclipse = joelD != null ? gauss(d - joelD, 120) : 0;

  // per-book atmosphere (god-rays, aurora, sand, embers, mist, pillars, ...)
  const afx = atmosphere.update(d, time, camPos, sunDir, P, dprLevel);

  // atmosphere
  hemi.color.copy(P.skyHorizon);
  hemi.groundColor.copy(P.terrainLow);
  hemi.intensity = P.hemiI * (1 - 0.5 * eclipse);
  sun.color.copy(P.sun);
  sun.intensity = P.sunI * 1.2 * (1 - 0.72 * eclipse);
  sun.position.copy(camPos).addScaledVector(sunDir, 600);
  sun.target.position.copy(camPos);
  scene.fog.color.copy(P.fog);
  scene.fog.far = lerp(1020, 720, P.storm) * fx.fogFarMul * afx.fogFarMul;
  renderer.toneMappingExposure = 1.06 * fx.exposureMul * afx.exposureMul * (1 - 0.5 * eclipse);
  renderer.setClearColor(P.fog);

  // moon (offset from the sun's azimuth so it stays in view; swings ahead at
  // the eclipse so the blood-moon is seen)
  const moonAz = 0.7 + 0.28 * Math.sin(d * 0.00022) + 2.25 - eclipse * 1.4;
  const moonEl = 0.4 + 0.12 * Math.sin(d * 0.0004 + 1.3);
  moonDir.set(Math.cos(moonEl) * Math.sin(moonAz), Math.sin(moonEl), Math.cos(moonEl) * Math.cos(moonAz)).normalize();
  moonDisc.position.copy(camPos).addScaledVector(moonDir, 2600);
  moonGlow.position.copy(moonDisc.position);
  const moonVis = clamp(P.stars * 0.95 + eclipse, 0, 1);
  moonCol.copy(MOON_PALE).lerp(MOON_BLOOD, eclipse);
  moonDisc.material.color.copy(moonCol);
  moonGlow.material.color.copy(moonCol);
  moonDisc.material.opacity = moonVis * (0.9 + 0.1 * eclipse);
  moonGlow.material.opacity = moonVis * (0.16 + 0.4 * eclipse);
  const moonScale = 1 + 0.7 * eclipse;
  moonDisc.scale.setScalar(78 * moonScale);
  moonGlow.scale.setScalar(240 * moonScale);

  sky.update(P, sunDir, time, camPos);
  sky.uniforms.uSunI.value *= (1 - 0.72 * eclipse);
  for (const m of water.mats) {
    m.uniforms.uTime.value = time;
    m.uniforms.uSunColor.value.copy(P.sun);
    m.uniforms.uSunI.value = P.sunI;
    m.uniforms.uGlint.value = clamp(P.sunElev * 5, 0, 1);
  }
  particles.update(d, time, camPos, dprLevel);
  if (spiritFlow) spiritFlow.update(dt, time, d, dprLevel);
  if (ravenFlock) ravenFlock.update(dt, time, d, dprLevel);
  thread.update(time);
  landmarks.update(d);
  scatter.update(d);
  props.update(d, time, dt);
  creatures.update(d, time);
  overlay.update(d, camera, window.innerWidth, window.innerHeight);

  // ---- post-processing targets ----
  let bloomBoost = 0;
  for (const bb of bloomBeats) bloomBoost = Math.max(bloomBoost, bb.boost * gauss(d - bb.d, 130));
  const ecclW = bandW(ecclRegion, d);
  const songW = bandW(songRegion, d);
  postTarget.bloom = 0.3 + bloomBoost + eclipse * 0.12;
  postTarget.sat = lerp(1, 0.42, ecclW);
  postTarget.grain = ecclW * 0.11;
  postTarget.vignette = 0.16 + ecclW * 0.2 + songW * 0.1;
  postTarget.contrast = lerp(1, 0.94, ecclW);
  postTarget.bright = 1;
  postTarget.tint = '#ccd4d8';
  postTarget.tintAmt = ecclW * 0.12;
  postTarget.blur = songW * 0.014;
  postTarget.focus = 42;
  if (songW > 0.05 && region) {
    let best = null, bw = 0;
    for (const s of region.stories) { if (!s.worldPos) continue; const w = gauss(s.d - d, 120); if (w > bw) { bw = w; best = s; } }
    if (best) postTarget.focus = camPos.distanceTo(best.worldPos);
  }
  post.update(dt, time, postTarget);

  post.render();

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
    post.setSize(window.innerWidth, window.innerHeight, dprLevel);
    emaFrame = 16;
  }
}

let baseFov = 62;
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  baseFov = camera.aspect < 0.8 ? 72 : 62;
  camera.fov = baseFov;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  post.setSize(window.innerWidth, window.innerHeight, dprLevel);
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
  pause() { paused = true; },
  resume() { if (paused) { paused = false; last = performance.now(); requestAnimationFrame(frame); } },
  // Freeze one fully-updated frame at distance d (for compositing screenshots).
  still(d) {
    if (d != null) this.setD(d);
    paused = false;
    frame(performance.now());
    frame(performance.now() + 16);
    paused = true;
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
