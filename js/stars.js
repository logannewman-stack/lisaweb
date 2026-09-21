/* =============================================================================
   LISA BRUNSON — RAYS OF DOTS
   The velvet section behind the quotes: small gold dots, like the dotted rays
   of light in her tattoo, drifting slowly upward and breathing. The pointer
   makes the nearby ones glow. Tuning knobs are at the top.
   ========================================================================== */
(function () {
  "use strict";
  var canvas = document.getElementById("stars");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var host = canvas.parentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var small = window.matchMedia("(max-width: 760px)").matches;

  var COUNT = small ? 70 : 140;   // how many dots
  var DRIFT = 6;                  // px per second, upward
  var COLOURS = ["231,211,162", "233,162,150", "150,190,232", "196,180,228"]; // gold, blush, sky, lilac

  var W = 0, H = 0, dpr = 1, dots = [], t = 0, last = 0, running = false, visible = true, raf = 0;
  var pointer = { x: -9999, y: -9999, on: false };

  function spawn(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: 0.7 + Math.random() * 1.6,
      a: 0.25 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.9,
      sway: Math.random() * Math.PI * 2,
      c: COLOURS[Math.random() < 0.55 ? 0 : 1 + Math.floor(Math.random() * 3)]
    };
  }
  function step(dt) {
    t += dt;
    while (dots.length < COUNT) dots.push(spawn(false));
    for (var i = dots.length - 1; i >= 0; i--) {
      var d = dots[i];
      d.y -= DRIFT * d.speed * dt;
      d.x += Math.sin(t * 0.3 + d.sway) * 4 * dt;
      if (d.y < -6) dots[i] = spawn(false);
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var breathe = 0.65 + 0.35 * Math.sin(t * 0.9 + d.phase);
      var glow = 0;
      if (pointer.on) {
        var dx = d.x - pointer.x, dy = d.y - pointer.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) glow = 1 - dist / 160;
      }
      var alpha = Math.min(1, d.a * breathe + glow * 0.6);
      var r = d.r + glow * 1.4;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgb(" + d.c + ")";
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fill();
      if (glow > 0.2) {
        ctx.globalAlpha = glow * 0.25;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }
  function start() { if (running || reduceMotion) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  function resize() {
    var rect = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (var i = 0; i < COUNT; i++) dots.push(spawn(true));
    if (reduceMotion) { t = 1; draw(); }
  }
  host.addEventListener("pointermove", function (ev) {
    var rect = host.getBoundingClientRect();
    pointer.x = ev.clientX - rect.left; pointer.y = ev.clientY - rect.top; pointer.on = true;
  });
  host.addEventListener("pointerleave", function () { pointer.on = false; });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.02 }).observe(host);
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else if (visible) start(); });
  var timer = 0;
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(resize, 150); });
  resize();
  if (!reduceMotion) start();
})();
