// Scroll: native page scroll drives distance along the path. Includes the
// veiled jump (rail navigation) and the self-guided "drift" mode.
import { journey } from './path.js';
import { clamp, damp, prefersReducedMotion } from './utils.js';

export class ScrollManager {
  constructor() {
    this.spacer = document.getElementById('scroll-spacer');
    this.veil = document.getElementById('veil');
    this.d = 0;
    this.target = 0;
    this.drifting = false;
    this.onDriftChange = null;
    this.onFirstScroll = null;
    this._scrolled = false;

    this._resize();
    window.addEventListener('resize', () => this._resize());

    const stop = () => { if (this.drifting) this.stopDrift(); };
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) stop();
    });
    window.addEventListener('scroll', () => {
      if (!this._scrolled && window.scrollY > 40) {
        this._scrolled = true;
        if (this.onFirstScroll) this.onFirstScroll();
      }
    }, { passive: true });
  }

  _resize() {
    const vh = window.innerHeight;
    // whole journey ≈ 120 viewport-heights of scroll
    this.pxPerUnit = clamp((vh * 120) / journey.total, 2.4, 5);
    this.spacer.style.height = Math.round(journey.total * this.pxPerUnit + vh) + 'px';
  }

  update(dt) {
    if (this.drifting) {
      const speed = window.innerHeight * 0.34; // px per second
      window.scrollBy(0, speed * dt);
      const max = document.documentElement.scrollHeight - window.innerHeight - 2;
      if (window.scrollY >= max) this.stopDrift();
    }
    this.target = clamp(window.scrollY / this.pxPerUnit, 0, journey.total - 0.001);
    this.d = damp(this.d, this.target, prefersReducedMotion ? 10 : 2.7, dt);
    if (Math.abs(this.d - this.target) < 0.01) this.d = this.target;
    return this.d;
  }

  jump(dTarget) {
    this.stopDrift();
    this.veil.classList.add('on');
    setTimeout(() => {
      window.scrollTo(0, dTarget * this.pxPerUnit);
      this.d = dTarget;
      this.target = dTarget;
      setTimeout(() => this.veil.classList.remove('on'), 120);
    }, 420);
  }

  startDrift() {
    if (prefersReducedMotion) return;
    this.drifting = true;
    if (this.onDriftChange) this.onDriftChange(true);
  }

  stopDrift() {
    this.drifting = false;
    if (this.onDriftChange) this.onDriftChange(false);
  }

  toggleDrift() {
    if (this.drifting) this.stopDrift(); else this.startDrift();
  }
}
