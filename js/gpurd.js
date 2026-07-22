// Gray-Scott reaction-diffusion on the GPU: two chemicals diffuse and react in a
// float texture, growing organic Turing patterns that never settle — the clay
// forever being marred and reshaped on the potter's wheel (Jeremiah 18).
import * as THREE from 'three';
import { GPUComputationRenderer } from '../vendor/jsm/misc/GPUComputationRenderer.js';
import { clamp } from './utils.js';

const RD_SHADER = `
  uniform float uFeed, uKill, uDt;
  void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 px = 1.0 / resolution.xy;
    vec2 c = texture2D(texRD, uv).xy;
    // wrap horizontally (around the pot), clamp vertically
    vec2 lap = vec2(0.0);
    lap += texture2D(texRD, uv + vec2(-px.x, 0.0)).xy * 0.2;
    lap += texture2D(texRD, uv + vec2( px.x, 0.0)).xy * 0.2;
    lap += texture2D(texRD, uv + vec2(0.0, -px.y)).xy * 0.2;
    lap += texture2D(texRD, uv + vec2(0.0,  px.y)).xy * 0.2;
    lap += texture2D(texRD, uv + vec2(-px.x,-px.y)).xy * 0.05;
    lap += texture2D(texRD, uv + vec2( px.x,-px.y)).xy * 0.05;
    lap += texture2D(texRD, uv + vec2(-px.x, px.y)).xy * 0.05;
    lap += texture2D(texRD, uv + vec2( px.x, px.y)).xy * 0.05;
    lap += c * -1.0;
    float u = c.x, v = c.y;
    float reaction = u * v * v;
    float du = 0.16 * lap.x - reaction + uFeed * (1.0 - u);
    float dv = 0.08 * lap.y + reaction - (uKill + uFeed) * v;
    vec2 nc = c + vec2(du, dv) * uDt;
    gl_FragColor = vec4(clamp(nc, 0.0, 1.0), 0.0, 1.0);
  }`;

export class GPURD {
  constructor(renderer, size = 200) {
    this.renderer = renderer;
    const W = size, H = size, N = W * H;
    this.gpu = new GPUComputationRenderer(W, H, renderer);
    const tex = this.gpu.createTexture();
    const a = tex.image.data;
    // start saturated with chemical U, then seed scattered blooms of V
    for (let i = 0; i < N; i++) { a[i * 4] = 1; a[i * 4 + 1] = 0; a[i * 4 + 2] = 0; a[i * 4 + 3] = 1; }
    const seeds = 26;
    for (let s = 0; s < seeds; s++) {
      const cx = Math.floor(Math.random() * W), cy = Math.floor(Math.random() * H), r = 3 + Math.floor(Math.random() * 4);
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
        const px = (cx + x + W) % W, py = clamp(cy + y, 0, H - 1);
        const idx = (py * W + px) * 4; a[idx + 1] = 1;
      }
    }
    this.var = this.gpu.addVariable('texRD', RD_SHADER, tex);
    this.gpu.setVariableDependencies(this.var, [this.var]);
    // horizontal wrap so the pattern is seamless around the vessel
    this.var.wrapS = THREE.RepeatWrapping;
    this.var.wrapT = THREE.ClampToEdgeWrapping;
    Object.assign(this.var.material.uniforms, {
      uFeed: { value: 0.037 }, uKill: { value: 0.06 }, uDt: { value: 1.0 },
    });
    const err = this.gpu.init();
    if (err) console.warn('GPURD init', err);
  }

  get texture() { return this.gpu.getCurrentRenderTarget(this.var).texture; }

  // Advance the simulation a few steps (call only near the beat).
  step(iterations = 6) {
    for (let i = 0; i < iterations; i++) this.gpu.compute();
  }
}
