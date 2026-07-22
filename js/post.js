// Post-processing pipeline (three.js r170 addons): bloom for divine radiance,
// depth-of-field for intimate beats, and a custom grade pass (saturation,
// contrast, tint, vignette, film grain) for per-book mood. Driven per-frame.
import * as THREE from 'three';
import { EffectComposer } from '../vendor/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../vendor/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../vendor/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from '../vendor/jsm/postprocessing/BokehPass.js';
import { ShaderPass } from '../vendor/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from '../vendor/jsm/postprocessing/OutputPass.js';
import { damp } from './utils.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uSat: { value: 1 }, uContrast: { value: 1 }, uBright: { value: 1 },
    uVignette: { value: 0.18 }, uGrain: { value: 0 }, uTime: { value: 0 },
    uTint: { value: new THREE.Color(0, 0, 0) }, uTintAmt: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    varying vec2 vUv; uniform sampler2D tDiffuse;
    uniform float uSat,uContrast,uBright,uVignette,uGrain,uTime,uTintAmt; uniform vec3 uTint;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    void main(){
      vec3 c = texture2D(tDiffuse,vUv).rgb;
      c *= uBright;
      c = (c - 0.18) * uContrast + 0.18;            // contrast around linear mid-grey
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      c = mix(vec3(l), c, uSat);                     // saturation
      c = mix(c, uTint * (l + 0.15), uTintAmt);      // toward a mood tint
      float d = distance(vUv, vec2(0.5));
      c *= 1.0 - uVignette * smoothstep(0.35, 0.85, d);
      c += (hash(vUv * 900.0 + uTime) - 0.5) * uGrain;  // film grain
      gl_FragColor = vec4(max(c, 0.0), 1.0);
    }`,
};

export class Post {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));

    this.bokeh = new BokehPass(scene, camera, { focus: 60, aperture: 0.0004, maxblur: 0.01 });
    this.bokeh.enabled = false;
    this.composer.addPass(this.bokeh);

    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.35, 0.55, 0.75);
    this.composer.addPass(this.bloom);

    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);

    this.out = new OutputPass();
    this.out.renderToScreen = true;
    this.composer.addPass(this.out);

    this.cur = { bloom: 0.35, focus: 60, blur: 0, sat: 1, contrast: 1, bright: 1, vignette: 0.18, grain: 0, tintAmt: 0 };
    this._tint = new THREE.Color();
  }

  setSize(w, h, dpr) {
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(w, h);
  }

  // target: { bloom, focus, blur, sat, contrast, bright, vignette, grain, tint(hex), tintAmt }
  update(dt, time, target) {
    const c = this.cur, k = 3.5;
    c.bloom = damp(c.bloom, target.bloom ?? 0.35, k, dt);
    c.focus = damp(c.focus, target.focus ?? 60, k, dt);
    c.blur = damp(c.blur, target.blur ?? 0, k, dt);
    c.sat = damp(c.sat, target.sat ?? 1, k, dt);
    c.contrast = damp(c.contrast, target.contrast ?? 1, k, dt);
    c.bright = damp(c.bright, target.bright ?? 1, k, dt);
    c.vignette = damp(c.vignette, target.vignette ?? 0.18, k, dt);
    c.grain = damp(c.grain, target.grain ?? 0, k, dt);
    c.tintAmt = damp(c.tintAmt, target.tintAmt ?? 0, k, dt);

    this.bloom.strength = c.bloom;
    this.bokeh.enabled = c.blur > 0.0006;
    this.bokeh.uniforms.focus.value = c.focus;
    this.bokeh.uniforms.maxblur.value = c.blur;
    const u = this.grade.uniforms;
    u.uSat.value = c.sat; u.uContrast.value = c.contrast; u.uBright.value = c.bright;
    u.uVignette.value = c.vignette; u.uGrain.value = c.grain; u.uTime.value = time;
    u.uTintAmt.value = c.tintAmt;
    if (target.tint) this._tint.set(target.tint);
    u.uTint.value.copy(this._tint);
  }

  render() { this.composer.render(); }
}
