// Per-book atmosphere: a distinct thing filling the air of each region —
// god-rays, aurora, drifting sand, shooting stars, embers, spores, low mist,
// light pillars, fireflies, snow-glow. Effects follow the camera; intensity is
// blended across region borders so books dissolve into one another.
import * as THREE from 'three';
import { journey } from './path.js';
import { DIRECTIONS } from './direction.js';
import { getGlowTexture, getSparkTexture, clamp } from './utils.js';

const EFFECTS = ['godRays', 'aurora', 'sandstorm', 'shootingStars', 'spores',
  'emberStorm', 'mist', 'snowGlow', 'lightPillars', 'fireflySwarm', 'heavyFog'];

// atmosphere per paramRegion (intro + 24 books + outro)
function regionAtmos() {
  const prs = journey.paramRegions;
  return prs.map((r, i) => {
    if (i === 0 || i === prs.length - 1) return 'none';
    const dir = DIRECTIONS[journey.regions[i - 1].book.id];
    return dir ? dir.atmosphere : 'none';
  });
}

function additive(color, opacity) {
  return new THREE.SpriteMaterial({ map: getGlowTexture(), color, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false });
}

export class Atmosphere {
  constructor(scene) {
    this.scene = scene;
    this.atmos = regionAtmos();
    this.intensity = {}; for (const e of EFFECTS) this.intensity[e] = 0;
    this.g = new THREE.Group();
    this.g.frustumCulled = false;
    scene.add(this.g);
    this._build();
  }

  _build() {
    // god-rays: fanned elongated additive sprites anchored toward the sun
    this.rays = [];
    for (let i = 0; i < 7; i++) {
      const s = new THREE.Sprite(additive(0xfff2c9, 0));
      s.center.set(0.5, 0);
      this.rays.push(s); this.g.add(s);
    }
    // aurora: wavy horizontal bands
    this.aurora = [];
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1600, 200, 24, 1),
        new THREE.MeshBasicMaterial({ color: [0x6affc0, 0x8ab8ff, 0xc79aff][i], transparent: true,
          opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
      this.aurora.push(m); this.g.add(m);
    }
    // sandstorm: big drifting haze sheets
    this.sand = [];
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color: 0xcaa46a,
        transparent: true, opacity: 0, depthWrite: false }));
      s.scale.set(700, 300, 1); this.sand.push(s); this.g.add(s);
    }
    // shooting stars
    this.streaks = [];
    for (let i = 0; i < 4; i++) {
      const s = new THREE.Sprite(additive(0xffffff, 0));
      s.center.set(0.5, 0.5);
      this.streaks.push({ s, t0: i * 2.3, dur: 1.1, active: false }); this.g.add(s);
    }
    // light pillars: vertical columns
    this.pillars = [];
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Sprite(additive(0xffe6b0, 0));
      s.center.set(0.5, 0); s.scale.set(10, 120, 1);
      this.pillars.push(s); this.g.add(s);
    }
    // point clouds: spores, embers, fireflies (reused)
    this.clouds = {
      spores: this._points(900, 0xbfe9c0, 2.0, true),
      emberStorm: this._points(1100, 0xff8a3a, 1.7, false),
      fireflySwarm: this._points(500, 0xffe27a, 1.6, true),
    };
    // low mist band
    this.mist = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color: 0xcfd6dd,
      transparent: true, opacity: 0, depthWrite: false }));
    this.mist.scale.set(900, 120, 1); this.g.add(this.mist);
    // snow-glow shimmer motes
    this.snow = this._points(700, 0xeaf2ff, 1.4, true);
  }

  _points(n, color, size, twinkle) {
    const geo = new THREE.BufferGeometry();
    const seeds = new Float32Array(n * 4);
    for (let i = 0; i < n * 4; i++) seeds[i] = Math.random();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    const uniforms = {
      uTime: { value: 0 }, uCenter: { value: new THREE.Vector3() },
      uColor: { value: new THREE.Color(color) }, uSize: { value: size },
      uOpacity: { value: 0 }, uRise: { value: 1 }, uTwinkle: { value: twinkle ? 1 : 0 },
      uPx: { value: 1 }, uMap: { value: getSparkTexture() },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec4 aSeed; uniform float uTime,uSize,uRise,uPx,uTwinkle; uniform vec3 uCenter;
        varying float vF; varying float vS;
        const vec3 BOX = vec3(360.0,150.0,360.0);
        void main(){
          vS=aSeed.w;
          vec3 base=aSeed.xyz*BOX;
          vec3 p=base+vec3(sin(uTime*0.5+aSeed.w*30.0)*10.0, uRise*uTime*(3.0+aSeed.x*4.0), cos(uTime*0.4+aSeed.w*20.0)*10.0);
          vec3 lo=uCenter-BOX*0.5; p=mod(p-lo,BOX)+lo;
          vec4 mv=modelViewMatrix*vec4(p,1.0);
          float d=length(p-uCenter);
          vF=smoothstep(320.0,180.0,d)*smoothstep(4.0,14.0,-mv.z);
          vF*=mix(1.0,0.5+0.5*sin(uTime*2.5+aSeed.w*80.0),uTwinkle);
          gl_PointSize=clamp(uSize*(0.6+aSeed.y)*uPx*(220.0/-mv.z),0.0,40.0);
          gl_Position=projectionMatrix*mv;
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform float uOpacity; uniform sampler2D uMap; varying float vF;
        void main(){ float m=texture2D(uMap,gl_PointCoord).r; gl_FragColor=vec4(uColor,m*uOpacity*vF);
          #include <tonemapping_fragment>
          #include <colorspace_fragment> }`,
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false; this.g.add(pts);
    return { pts, uniforms };
  }

  update(d, time, camPos, sunDir, P, pixelRatio) {
    // blended intensity per effect
    const w = journey.weights(d);
    let norm = 0; for (let i = 1; i < w.length; i += 2) norm += w[i];
    for (const e of EFFECTS) this.intensity[e] = 0;
    for (let i = 0; i < w.length; i += 2) {
      const a = this.atmos[w[i]];
      if (a && this.intensity[a] !== undefined) this.intensity[a] += w[i + 1] / norm;
    }
    const I = this.intensity;
    const px = Math.min(pixelRatio, 2);

    // god-rays
    const rayI = I.godRays;
    for (let i = 0; i < this.rays.length; i++) {
      const s = this.rays[i];
      s.material.opacity = rayI * (0.10 + 0.05 * Math.sin(time * 0.5 + i));
      if (s.material.opacity > 0.005) {
        s.position.copy(camPos).addScaledVector(sunDir, 500).add(new THREE.Vector3(0, -60 + i * 4, 0));
        s.scale.set(26, 620, 1);
        s.material.rotation = (i - 3) * 0.11 + Math.sin(time * 0.2) * 0.03;
        s.material.color.copy(P.sun);
      }
    }
    // aurora
    for (let i = 0; i < this.aurora.length; i++) {
      const m = this.aurora[i];
      m.material.opacity = I.aurora * (0.16 + 0.06 * Math.sin(time * 0.4 + i * 2));
      if (m.material.opacity > 0.005) {
        m.position.set(camPos.x, camPos.y + 220 + i * 60, camPos.z - 200);
        m.rotation.x = -Math.PI / 2.4;
        const pos = m.geometry.attributes.position;
        for (let v = 0; v <= 24; v++) {
          const y = Math.sin(v * 0.5 + time * (0.6 + i * 0.2) + i) * 40;
          pos.setY(v, y); pos.setY(v + 25, y);
        }
        pos.needsUpdate = true;
      }
    }
    // sandstorm
    for (let i = 0; i < this.sand.length; i++) {
      const s = this.sand[i];
      s.material.opacity = I.sandstorm * (0.12 + 0.05 * Math.sin(time * 0.7 + i * 1.4));
      if (s.material.opacity > 0.005) {
        const drift = (time * (30 + i * 8)) % 900 - 450;
        s.position.set(camPos.x + Math.sin(i) * 120 + drift * 0.3, camPos.y + 6 + i * 10, camPos.z - 120 - i * 40);
        s.material.color.copy(P.fog).lerp(new THREE.Color(0xcaa46a), 0.5);
      }
    }
    // shooting stars
    for (const st of this.streaks) {
      const phase = (time - st.t0) % 6.0;
      st.active = I.shootingStars > 0.15 && phase < st.dur;
      if (st.active) {
        const q = phase / st.dur;
        st.s.material.opacity = I.shootingStars * Math.sin(q * Math.PI) * 0.9;
        const ang = st.t0 * 2.1;
        st.s.position.set(camPos.x + Math.cos(ang) * 300 - q * 260, camPos.y + 180 - q * 90, camPos.z - 260 + Math.sin(ang) * 200);
        st.s.scale.set(90, 4, 1);
        st.s.material.rotation = -0.5;
      } else st.s.material.opacity = 0;
    }
    // light pillars
    for (let i = 0; i < this.pillars.length; i++) {
      const s = this.pillars[i];
      s.material.opacity = I.lightPillars * (0.14 + 0.06 * Math.sin(time * 0.6 + i * 1.7));
      if (s.material.opacity > 0.005) {
        const ang = i * 1.7, r = 120 + i * 40;
        s.position.set(camPos.x + Math.cos(ang) * r, camPos.y - 20, camPos.z + 60 + Math.sin(ang) * r);
        s.material.color.copy(P.accent);
      }
    }
    // point clouds
    const setCloud = (c, inten, rise, opa) => {
      c.uniforms.uOpacity.value = inten * opa;
      c.uniforms.uRise.value = rise;
      c.uniforms.uTime.value = time;
      c.uniforms.uCenter.value.copy(camPos);
      c.uniforms.uPx.value = px;
      c.pts.visible = inten > 0.01;
    };
    setCloud(this.clouds.spores, I.spores, 0.9, 0.5);
    setCloud(this.clouds.emberStorm, I.emberStorm, 2.2, 0.55);
    setCloud(this.clouds.fireflySwarm, I.fireflySwarm, 0.15, 0.7);
    setCloud(this.snow, I.snowGlow, 0.4, 0.5);
    // low mist
    this.mist.material.opacity = (I.mist + I.heavyFog) * 0.16;
    if (this.mist.material.opacity > 0.005) {
      this.mist.position.set(camPos.x, camPos.y - 14, camPos.z - 40);
      this.mist.material.color.copy(P.fog).lerp(new THREE.Color(0xffffff), 0.25);
    }

    return {
      fogFarMul: 1 - I.heavyFog * 0.45 - I.sandstorm * 0.3 - I.mist * 0.2,
      exposureMul: 1 + I.snowGlow * 0.12 - I.heavyFog * 0.1,
    };
  }
}
