// Painted sky dome: gradient, sun, procedural stars, storm veils.
import * as THREE from 'three';

export function buildSky(scene) {
  const uniforms = {
    uTop: { value: new THREE.Color('#0b1026') },
    uHorizon: { value: new THREE.Color('#2b3a67') },
    uSunColor: { value: new THREE.Color('#ffd9a0') },
    uSunDir: { value: new THREE.Vector3(0.4, 0.2, 0.89).normalize() },
    uSunI: { value: 1 },
    uStars: { value: 0 },
    uStorm: { value: 0 },
    uTime: { value: 0 },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vDir;
      uniform vec3 uTop, uHorizon, uSunColor;
      uniform vec3 uSunDir;
      uniform float uSunI, uStars, uStorm, uTime;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      float vnoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(vec3(i, 1.0));
        float b = hash(vec3(i + vec2(1.0, 0.0), 1.0));
        float c = hash(vec3(i + vec2(0.0, 1.0), 1.0));
        float d = hash(vec3(i + vec2(1.0, 1.0), 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm2(vec2 p) { return vnoise(p) * 0.65 + vnoise(p * 2.7) * 0.35; }

      void main() {
        vec3 dir = normalize(vDir);
        float horizonness = pow(1.0 - max(dir.y, 0.0), 2.3);
        vec3 col = mix(uTop, uHorizon, horizonness);
        if (dir.y < 0.0) col = uHorizon * (1.0 + dir.y * 1.6);

        // painterly drift in the gradient
        float bands = fbm2(dir.xz * 3.0 + vec2(uTime * 0.008, 0.0)) - 0.5;
        col += col * bands * 0.10;

        // sun disc + halo
        float sd = dot(dir, uSunDir);
        float disc = smoothstep(0.9992, 0.99965, sd);
        float halo = pow(max(sd, 0.0), 90.0) * 0.55;
        float wide = pow(max(sd, 0.0), 7.0) * 0.30;
        col += uSunColor * (disc * 1.6 + halo + wide) * uSunI;

        // stars
        if (uStars > 0.01 && dir.y > 0.0) {
          vec3 cell = floor(dir * 150.0);
          float h = hash(cell);
          float thr = 1.0 - uStars * 0.0034;
          if (h > thr) {
            vec3 f = fract(dir * 150.0) - 0.5;
            float m = smoothstep(0.5, 0.04, length(f));
            float tw = 0.6 + 0.4 * sin(uTime * 2.0 + h * 200.0);
            float horizonMask = smoothstep(0.02, 0.22, dir.y);
            col += vec3(0.92, 0.95, 1.0) * m * tw * 1.5 * uStars * horizonMask * (1.0 - wide);
          }
        }

        // storm veils
        if (uStorm > 0.01) {
          vec2 sp = dir.xz / (0.25 + max(dir.y, 0.02));
          float cn = fbm2(sp * 1.4 + vec2(uTime * 0.012, uTime * 0.004));
          float dark = uStorm * smoothstep(0.42, 0.78, cn) * smoothstep(0.03, 0.35, dir.y);
          col = mix(col, col * 0.32 + vec3(0.015), dark);
        }

        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const geo = new THREE.SphereGeometry(3600, 32, 20);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  mesh.matrixAutoUpdate = true;
  scene.add(mesh);

  function update(p, sunDir, time, camPos) {
    uniforms.uTop.value.copy(p.skyTop);
    uniforms.uHorizon.value.copy(p.skyHorizon);
    uniforms.uSunColor.value.copy(p.sun);
    uniforms.uSunDir.value.copy(sunDir);
    uniforms.uSunI.value = p.sunI;
    uniforms.uStars.value = p.stars;
    uniforms.uStorm.value = p.storm;
    uniforms.uTime.value = time;
    mesh.position.set(camPos.x, camPos.y - 60, camPos.z);
  }

  return { mesh, uniforms, update };
}
