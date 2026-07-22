// A GPGPU flow field: particle positions live in a float texture and are
// advected each frame on the GPU by a curl-noise field — divergence-free,
// swirling, never converging. Used for the Spirit poured out (Joel).
import * as THREE from 'three';
import { GPUComputationRenderer } from '../vendor/jsm/misc/GPUComputationRenderer.js';
import { getGlowTexture, clamp } from './utils.js';

const POS_SHADER = `
  uniform float uTime, uDelta; uniform vec3 uAnchor, uSpan;
  float hash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float vnoise(vec3 x){ vec3 i=floor(x),f=fract(x); f=f*f*(3.0-2.0*f);
    return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
               mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
  vec3 noise3(vec3 p){ return vec3(vnoise(p), vnoise(p+19.3), vnoise(p-41.7)); }
  vec3 curl(vec3 p){
    const float e=0.28;
    vec3 dx=vec3(e,0,0),dy=vec3(0,e,0),dz=vec3(0,0,e);
    vec3 px0=noise3(p-dx),px1=noise3(p+dx);
    vec3 py0=noise3(p-dy),py1=noise3(p+dy);
    vec3 pz0=noise3(p-dz),pz1=noise3(p+dz);
    float x=(py1.z-py0.z)-(pz1.y-pz0.y);
    float y=(pz1.x-pz0.x)-(px1.z-px0.z);
    float z=(px1.y-px0.y)-(py1.x-py0.x);
    return normalize(vec3(x,y,z)+1e-5);
  }
  void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 P = texture2D(texturePosition, uv);
    vec3 pos = P.xyz; float life = P.w;
    vec3 flow = curl(pos*0.02 + vec3(0.0,0.0,uTime*0.05)) * 9.0;
    flow.y -= 6.0;                                   // poured out, falling
    pos += flow * uDelta;
    life -= uDelta * 0.22;
    if(life < 0.0 || pos.y < uAnchor.y - uSpan.y){
      vec3 r = vec3(hash(vec3(uv,uTime)), hash(vec3(uv,uTime+3.1)), hash(vec3(uv,uTime+7.7)));
      pos = uAnchor + vec3((r.x-0.5)*uSpan.x, uSpan.y*0.5 + r.y*uSpan.y*0.5, (r.z-0.5)*uSpan.z);
      life = 0.6 + r.z*0.6;
    }
    gl_FragColor = vec4(pos, life);
  }`;

export class GPUFlow {
  constructor(renderer, scene, anchor, color, span) {
    this.anchor = anchor.clone();
    this.range = 460;
    this.beatD = anchor.z; // set precisely by caller
    const W = 110, H = 110, N = W * H;
    this.gpu = new GPUComputationRenderer(W, H, renderer);
    const tex = this.gpu.createTexture();
    const arr = tex.image.data;
    for (let i = 0; i < N; i++) {
      arr[i * 4] = anchor.x + (Math.random() - 0.5) * span.x;
      arr[i * 4 + 1] = anchor.y + (Math.random() - 0.5) * span.y;
      arr[i * 4 + 2] = anchor.z + (Math.random() - 0.5) * span.z;
      arr[i * 4 + 3] = Math.random();
    }
    this.posVar = this.gpu.addVariable('texturePosition', POS_SHADER, tex);
    this.gpu.setVariableDependencies(this.posVar, [this.posVar]);
    Object.assign(this.posVar.material.uniforms, {
      uTime: { value: 0 }, uDelta: { value: 0.016 },
      uAnchor: { value: this.anchor }, uSpan: { value: span.clone() },
    });
    this.posVar.wrapS = THREE.ClampToEdgeWrapping;
    this.posVar.wrapT = THREE.ClampToEdgeWrapping;
    const err = this.gpu.init();
    if (err) console.warn('GPUFlow init', err);

    const geo = new THREE.BufferGeometry();
    const refs = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) { refs[i * 2] = (i % W) / W; refs[i * 2 + 1] = Math.floor(i / W) / H; }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('ref', new THREE.BufferAttribute(refs, 2));
    geo.boundingSphere = new THREE.Sphere(this.anchor, 1e6);
    this.uniforms = {
      uPositions: { value: null }, uPx: { value: 1 }, uFade: { value: 0 },
      uColor: { value: new THREE.Color(color) }, uMap: { value: getGlowTexture() },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform sampler2D uPositions; uniform float uPx; attribute vec2 ref; varying float vL;
        void main(){ vec4 P=texture2D(uPositions,ref); vL=clamp(P.w,0.0,1.0);
          vec4 mv=modelViewMatrix*vec4(P.xyz,1.0);
          gl_PointSize=uPx*2.4*(300.0/-mv.z)*vL; gl_Position=projectionMatrix*mv; }`,

      fragmentShader: `
        uniform vec3 uColor; uniform float uFade; uniform sampler2D uMap; varying float vL;
        void main(){ float m=texture2D(uMap,gl_PointCoord).r; gl_FragColor=vec4(uColor,m*vL*uFade);
          #include <tonemapping_fragment>
          #include <colorspace_fragment> }`,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.visible = false;
    scene.add(this.points);
  }

  update(dt, time, camD, pixelRatio) {
    const active = Math.abs(camD - this.beatD) < this.range;
    this.points.visible = active;
    if (!active) return;
    this.posVar.material.uniforms.uTime.value = time;
    this.posVar.material.uniforms.uDelta.value = clamp(dt, 0.001, 0.04);
    this.gpu.compute();
    this.uniforms.uPositions.value = this.gpu.getCurrentRenderTarget(this.posVar).texture;
    this.uniforms.uPx.value = Math.min(pixelRatio, 2);
    const prox = 1 - Math.min(1, Math.abs(camD - this.beatD) / this.range);
    this.uniforms.uFade.value = prox * prox * 0.55;
  }
}
