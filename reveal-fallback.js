/* Parallel Perspective — scroll-reveal fallback
   ------------------------------------------------
   style.css drives scroll reveals natively via `animation-timeline: view()`
   (see "MOTION SYSTEM" / "Scroll-driven reveals" in style.css), gated behind
   `@supports`. That CSS feature currently only ships in Chromium — Safari
   and Firefox get none of it, so those visitors saw static, unrevealed
   content instead of the intended fade-up.

   This file is the fallback for everyone else: same elements, same
   fadeUp keyframe, same easing/duration as the native version — just
   triggered by IntersectionObserver instead of the scroll timeline.
   It does nothing at all in browsers where the native CSS already works. */
(function () {
  if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()')) {
    return; // native CSS already handles this browser
  }

  var SELECTOR = [
    '.manifesto-body p',
    '.circle-body section',
    '.circle-body .pull-quote',
    '.panel-block',
    '.excerpt-block',
    '.lens-divider',
    '.closing-line',
    '.reach-out-body .context-line',
    '.reach-out-body #reach-out-action',
    '.reach-out-body .confirmation'
  ].join(',');

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var targets = document.querySelectorAll(SELECTOR);
    if (!targets.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      // content is already visible by default (no base opacity:0 in the
      // stylesheet outside the @supports block) — nothing to do.
      return;
    }

    targets.forEach(function (el) { el.classList.add('js-reveal-pending'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('js-reveal-pending');
          entry.target.classList.add('js-reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  });
})();
