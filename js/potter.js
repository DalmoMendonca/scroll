// The potter's wheel: a clay vessel whose surface is the live output of a
// Gray-Scott reaction-diffusion simulation — organic veins forever forming,
// marring and reshaping the clay as the wheel turns (Jeremiah 18:3-4).
import * as THREE from 'three';
import { GPURD } from './gpurd.js';
import { makeSprite, clamp } from './utils.js';

export class Potter {
  constructor(renderer, scene, anchor, latDir) {
    this.beatD = anchor.z;   // overwritten by caller
    this.range = 420;
    this.group = new THREE.Group();
    this.group.position.copy(anchor);
    // face the vessel toward the path
    if (latDir) this.group.rotation.y = Math.atan2(latDir.x, latDir.z);

    this.rd = new GPURD(renderer, 200);

    // the clay vessel — a lathe of revolution
    const prof = [[0.2, 0], [3.4, 0.5], [4.8, 3], [5.6, 7], [4.4, 12], [3.0, 15.5], [3.7, 17.5], [3.5, 19]];
    const pts = prof.map(([r, y]) => new THREE.Vector2(r, y));
    const geo = new THREE.LatheGeometry(pts, 72);
    this.potMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
        uRD: { value: null },
        uClayDark: { value: new THREE.Color(0x5a3320) },
        uClayLite: { value: new THREE.Color(0xb07348) },
        uGlow: { value: new THREE.Color(0xff9a4a) },
        uLight: { value: new THREE.Vector3(0.5, 0.8, 0.3).normalize() },
      }]),
      fog: true,
      vertexShader: `
        varying vec2 vUv; varying vec3 vN;
        #include <fog_pars_vertex>
        void main(){
          vUv = uv; vN = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,
      fragmentShader: `
        varying vec2 vUv; varying vec3 vN;
        uniform sampler2D uRD; uniform vec3 uClayDark, uClayLite, uGlow, uLight;
        #include <fog_pars_fragment>
        void main(){
          float v = texture2D(uRD, vUv).y;             // chemical V = reshaped clay
          vec3 clay = mix(uClayDark, uClayLite, smoothstep(0.15, 0.5, v));
          float diff = clamp(dot(normalize(vN), uLight) * 0.6 + 0.5, 0.0, 1.0);
          vec3 col = clay * diff;
          float vein = smoothstep(0.35, 0.5, v) * smoothstep(0.72, 0.55, v);  // glowing seam of new-forming clay
          col += uGlow * vein * 0.5;
          gl_FragColor = vec4(col, 1.0);
          #include <fog_fragment>
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    this.pot = new THREE.Mesh(geo, this.potMat);
    this.group.add(this.pot);

    // the wheel and its stone base
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 1.2, 40),
      new THREE.MeshLambertMaterial({ color: 0x6b5142, flatShading: true }));
    wheel.position.y = -1; this.group.add(wheel);
    this.wheel = wheel;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(3, 5, 8, 12),
      new THREE.MeshLambertMaterial({ color: 0x4a382c, flatShading: true }));
    base.position.y = -5; this.group.add(base);

    // the potter, a dark seated form at the wheel
    const potter = new THREE.Group();
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(2.2, 4, 4, 8),
      new THREE.MeshLambertMaterial({ color: 0x2a2018, flatShading: true }));
    torso.position.set(0, 6, 11); torso.rotation.x = 0.5; potter.add(torso);
    const head = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 0),
      new THREE.MeshLambertMaterial({ color: 0x33271d, flatShading: true }));
    head.position.set(0, 11, 9.5); potter.add(head);
    this.group.add(potter);

    // a warm hearth glow at the wheel
    this.glow = makeSprite(0xffb060, 20, 0.22); this.glow.position.y = 8; this.group.add(this.glow);

    this.group.visible = false;
    scene.add(this.group);
  }

  update(dt, time, camD, pixelRatio) {
    const active = Math.abs(camD - this.beatD) < this.range;
    this.group.visible = active;
    if (!active) return;
    this.rd.step(6);
    this.potMat.uniforms.uRD.value = this.rd.texture;
    this.pot.rotation.y = time * 1.3;         // the wheel turns
    this.wheel.rotation.y = time * 1.3;
    const prox = 1 - Math.min(1, Math.abs(camD - this.beatD) / this.range);
    this.glow.material.opacity = (0.14 + 0.08 * Math.sin(time * 3)) * prox;
  }
}
