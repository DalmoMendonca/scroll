// GPU flock: positions advected on the GPU by a swirling curl-noise field plus
// an orbiting flock attractor, so the birds wheel and bank as an emergent
// murmuration. Rendered as dark bird silhouettes. Used for Elijah's ravens.
import * as THREE from 'three';
import { GPUComputationRenderer } from '../vendor/jsm/misc/GPUComputationRenderer.js';
import { clamp } from './utils.js';

let birdTex = null;
function getBirdTexture() {
  if (birdTex) return birdTex;
  const s = 64, cv = document.createElement('canvas'); cv.width = cv.height = s;
  const c = cv.getContext('2d');
  c.strokeStyle = '#000'; c.lineWidth = 7; c.lineCap = 'round';
  c.beginPath(); c.moveTo(8, 40); c.quadraticCurveTo(24, 20, 32, 34);
  c.quadraticCurveTo(40, 20, 56, 40); c.stroke();
  birdTex = new THREE.CanvasTexture(cv);
  return birdTex;
}

const FLOCK_SHADER = `
  uniform float uTime, uDelta; uniform vec3 uAttract, uSpan;
  float hash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float vn(vec3 x){ vec3 i=floor(x),f=fract(x); f=f*f*(3.0-2.0*f);
    return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
               mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
  vec3 n3(vec3 p){ return vec3(vn(p),vn(p+19.3),vn(p-41.7)); }
  vec3 curl(vec3 p){ const float e=0.3; vec3 dx=vec3(e,0,0),dy=vec3(0,e,0),dz=vec3(0,0,e);
    vec3 x0=n3(p-dx),x1=n3(p+dx),y0=n3(p-dy),y1=n3(p+dy),z0=n3(p-dz),z1=n3(p+dz);
    return normalize(vec3((y1.z-y0.z)-(z1.y-z0.y),(z1.x-z0.x)-(x1.z-x0.z),(x1.y-x0.y)-(y1.x-y0.x))+1e-5); }
  void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 P = texture2D(texturePosition, uv);
    vec3 pos = P.xyz;
    vec3 toCenter = uAttract - pos;
    float dist = length(toCenter);
    vec3 vel = curl(pos*0.03 + vec3(0.0,0.0,uTime*0.08)) * 11.0;   // wheeling
    vel += normalize(toCenter+1e-5) * clamp(dist*0.4, 0.0, 9.0);   // cohesion to flock
    vel -= normalize(toCenter+1e-5) * 6.0 * exp(-dist*0.5);        // separation near center
    pos += vel * uDelta;
    if(dist > uSpan.x * 1.4){
      vec3 r = vec3(hash(vec3(uv,uTime)),hash(vec3(uv,uTime+2.1)),hash(vec3(uv,uTime+5.7)));
      pos = uAttract + (r-0.5)*uSpan;
    }
    gl_FragColor = vec4(pos, 1.0);
  }`;

export class GPUFlock {
  constructor(renderer, scene, anchor, span) {
    this.anchor = anchor.clone();
    this.beatD = anchor.z;
    this.range = 460;
    this.span = span.clone();
    const W = 40, H = 40, N = W * H;
    this.gpu = new GPUComputationRenderer(W, H, renderer);
    const tex = this.gpu.createTexture();
    const arr = tex.image.data;
    for (let i = 0; i < N; i++) {
      arr[i * 4] = anchor.x + (Math.random() - 0.5) * span.x;
      arr[i * 4 + 1] = anchor.y + (Math.random() - 0.5) * span.y;
      arr[i * 4 + 2] = anchor.z + (Math.random() - 0.5) * span.z;
      arr[i * 4 + 3] = 1;
    }
    this.posVar = this.gpu.addVariable('texturePosition', FLOCK_SHADER, tex);
    this.gpu.setVariableDependencies(this.posVar, [this.posVar]);
    Object.assign(this.posVar.material.uniforms, {
      uTime: { value: 0 }, uDelta: { value: 0.016 },
      uAttract: { value: this.anchor.clone() }, uSpan: { value: span.clone() },
    });
    const err = this.gpu.init();
    if (err) console.warn('GPUFlock', err);

    const geo = new THREE.BufferGeometry();
    const refs = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) { refs[i * 2] = (i % W) / W; refs[i * 2 + 1] = Math.floor(i / W) / H; }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('ref', new THREE.BufferAttribute(refs, 2));
    geo.boundingSphere = new THREE.Sphere(this.anchor, 1e6);
    this.uniforms = { uPositions: { value: null }, uPx: { value: 1 }, uFade: { value: 1 }, uMap: { value: getBirdTexture() } };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms, transparent: true, depthWrite: false,
      vertexShader: `uniform sampler2D uPositions; uniform float uPx; attribute vec2 ref;
        void main(){ vec4 P=texture2D(uPositions,ref); vec4 mv=modelViewMatrix*vec4(P.xyz,1.0);
          gl_PointSize=uPx*6.5*(300.0/-mv.z); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform sampler2D uMap; uniform float uFade; void main(){
          float a=texture2D(uMap,gl_PointCoord).a; if(a<0.08) discard;
          gl_FragColor=vec4(0.05,0.04,0.03, a*uFade); }`,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false; this.points.visible = false;
    scene.add(this.points);
    this._a = this.posVar.material.uniforms.uAttract.value;
  }

  update(dt, time, camD, pixelRatio) {
    const active = Math.abs(camD - this.beatD) < this.range;
    this.points.visible = active;
    if (!active) return;
    // the flock centre drifts in a slow ellipse over the brook
    this._a.set(
      this.anchor.x + Math.cos(time * 0.25) * this.span.x * 0.5,
      this.anchor.y + 6 + Math.sin(time * 0.4) * 10,
      this.anchor.z + Math.sin(time * 0.22) * this.span.z * 0.4,
    );
    this.posVar.material.uniforms.uTime.value = time;
    this.posVar.material.uniforms.uDelta.value = clamp(dt, 0.001, 0.04);
    this.gpu.compute();
    this.uniforms.uPositions.value = this.gpu.getCurrentRenderTarget(this.posVar).texture;
    this.uniforms.uPx.value = Math.min(pixelRatio, 2);
    const prox = 1 - Math.min(1, Math.abs(camD - this.beatD) / this.range);
    this.uniforms.uFade.value = clamp(prox * 1.4, 0, 1);
  }
}
