// The typographic layer: hero, oversized book headings, story captions
// anchored to world positions, the outro, and the progress rail.
import * as THREE from 'three';
import { journey } from './path.js';
import { SECTION_NAMES } from './data.js';
import { clamp, smoothstep, lerp } from './utils.js';

const _v = new THREE.Vector3();

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

export class Overlay {
  constructor(container, scroll) {
    this.root = container;
    this.scroll = scroll;
    this.items = [];

    // ---- hero ----
    const hero = el('div', 'hero', `
      <div class="hero-eyebrow">One unbroken scroll &middot; Torah &middot; Nevi&rsquo;im &middot; Ketuvim</div>
      <h1 class="hero-he" lang="he">בְּרֵאשִׁית</h1>
      <div class="hero-en">In the beginning</div>
      <p class="hero-sub">A journey through every book of the Hebrew Bible —
      its waters and wildernesses, its fires and songs —
      and the one thread of light that runs all the way through.</p>
    `);
    this.root.appendChild(hero);
    this.hero = hero;

    // ---- book headings + stories ----
    for (const r of journey.regions) {
      const b = r.book;
      const ord = String(b.ordinal).padStart(2, '0');
      const head = el('div', 'book-h', `
        <div class="bh-eyebrow">${ord} &middot; ${SECTION_NAMES[b.section] || b.section} &middot; ${b.en}</div>
        <div class="bh-he" lang="he">${b.he}</div>
        <div class="bh-translit">${b.translit}</div>
        <div class="bh-line">${b.oneLine}</div>
      `);
      head.style.setProperty('--accent', b.palette.accent);
      this.root.appendChild(head);
      this.items.push({ kind: 'head', elem: head, r, shown: false });

      for (const s of r.stories) {
        const versesHtml = s.data.verses.map(v =>
          `<p class="st-verse">${v.t}<span class="st-ref">${v.ref}</span></p>`).join('');
        const echoHtml = s.data.echo
          ? `<div class="st-echo">${s.data.echo.t}<span class="st-ref">${s.data.echo.ref}</span></div>`
          : '';
        const st = el('div', 'story', `
          <div class="st-title">${s.data.title}</div>
          ${versesHtml}
          ${echoHtml}
        `);
        st.style.setProperty('--accent', b.palette.accent);
        this.root.appendChild(st);
        this.items.push({ kind: 'story', elem: st, s, shown: false, side: null, echoEl: st.querySelector('.st-echo') });
      }
    }

    // ---- outro ----
    const outro = el('div', 'outro', `
      <div class="ot-he" lang="he">וְיָעַל</div>
      <div class="ot-line">&ldquo;Whoever is among you of all his people &mdash; let him go up.&rdquo;</div>
      <div class="ot-sub">The scroll ends. The story doesn&rsquo;t.</div>
      <button id="again" type="button">Begin again</button>
    `);
    this.root.appendChild(outro);
    this.outro = outro;
    outro.querySelector('#again').addEventListener('click', () => this.scroll.jump(0));

    // ---- progress rail ----
    this.buildRail();
  }

  buildRail() {
    const rail = document.getElementById('rail');
    const track = el('div', 'rail-track');
    this.railFill = el('div', 'rail-fill');
    track.appendChild(this.railFill);
    rail.appendChild(track);
    const list = el('div', 'rail-books');
    let lastSection = null;
    this.dots = [];
    for (const r of journey.regions) {
      if (r.book.section !== lastSection) {
        lastSection = r.book.section;
        list.appendChild(el('div', 'rail-sec', SECTION_NAMES[lastSection] || lastSection));
      }
      const dot = el('button', 'rail-dot');
      dot.type = 'button';
      dot.title = `${r.book.en} · ${r.book.translit}`;
      dot.setAttribute('aria-label', `Go to ${r.book.en}`);
      dot.style.setProperty('--accent', r.book.palette.accent);
      dot.addEventListener('click', () => this.scroll.jump(r.d0 + 90));
      list.appendChild(dot);
      this.dots.push({ dot, r });
    }
    rail.appendChild(list);
  }

  update(d, camera, W, H) {
    // hero
    const heroOp = 1 - smoothstep(50, 330, d);
    this.setShown(this.hero, heroOp > 0.01);
    if (heroOp > 0.01) {
      this.hero.style.opacity = heroOp.toFixed(3);
      this.hero.style.transform = `translate(-50%, calc(-50% - ${(d * 0.42).toFixed(1)}px))`;
    }

    // outro
    const oq = smoothstep(journey.outroStart + 200, journey.outroStart + 620, d);
    this.setShown(this.outro, oq > 0.01);
    if (oq > 0.01) {
      this.outro.style.opacity = oq.toFixed(3);
      this.outro.style.pointerEvents = oq > 0.5 ? 'auto' : 'none';
    }

    // books + stories
    for (const it of this.items) {
      if (it.kind === 'head') {
        const delta = d - it.r.d0;
        const vis = delta > -170 && delta < 470;
        this.setShown(it.elem, vis);
        if (!vis) continue;
        const q = clamp((delta + 170) / 640, 0, 1);
        const op = Math.pow(Math.sin(Math.PI * q), 0.9);
        it.elem.style.opacity = op.toFixed(3);
        const ty = lerp(26, -34, q);
        it.elem.style.transform = `translate(-50%, -50%) translateY(${ty.toFixed(2)}vh) scale(${(0.97 + q * 0.05).toFixed(3)})`;
      } else {
        const delta = it.s.d - d;
        const vis = delta > -80 && delta < 260 && it.s.worldPos;
        this.setShown(it.elem, vis);
        if (!vis) { it.side = null; continue; }
        // Decide a stable side (left/right of screen) once, from where the
        // set piece first projects — then pin the panel so scripture holds
        // still long enough to read instead of drifting with the camera.
        if (it.side === null) {
          _v.copy(it.s.worldPos).project(camera);
          it.side = _v.x <= 0 ? 'L' : 'R';
        }
        const opIn = 1 - smoothstep(185, 245, delta);    // appear on approach
        const opOut = smoothstep(-70, -35, delta);       // linger past the beat
        const opacity = clamp(opIn * opOut, 0, 1);
        const panelW = Math.min(384, W - 44);
        const left = it.side === 'L' ? Math.round(W * 0.05) : Math.round(W - panelW - W * 0.05);
        const top = Math.round(clamp(H * (it.side === 'L' ? 0.17 : 0.25), 74, H - 340));
        it.elem.style.opacity = opacity.toFixed(3);
        it.elem.style.left = left + 'px';
        it.elem.style.top = top + 'px';
        if (it.echoEl) {
          it.echoEl.style.opacity = (opacity * (1 - smoothstep(70, 155, delta))).toFixed(3);
        }
      }
    }

    // rail
    this.railFill.style.height = ((d / journey.total) * 100).toFixed(2) + '%';
    const region = journey.regionAt(d);
    for (const { dot, r } of this.dots) {
      dot.classList.toggle('active', region === r);
      dot.classList.toggle('passed', d > r.d1);
    }
  }

  setShown(elem, show) {
    const isShown = elem.style.display !== 'none' && elem.style.display !== '';
    if (show && !isShown) elem.style.display = 'block';
    else if (!show && elem.style.display !== 'none') elem.style.display = 'none';
  }
}
