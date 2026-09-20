/* =============================================================================
   LISA BRUNSON — SAGE SMOKE
   The hero canvas: soft smoke rising from the bottom of the screen, drifting
   through a curl-noise field, and a bowl struck every so often that sends a
   thin gold ring outward. The pointer pushes the smoke aside.
   Nothing here needs editing for content. Tuning knobs are at the top.
   ========================================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("smoke");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var small = window.matchMedia("(max-width: 760px)").matches;

  /* ---- Tuning ------------------------------------------------------------ */
  var COUNT       = small ? 70 : 150;   // how many puffs live at once
  var RISE        = 11;                 // upward drift, px per second
  var CURL        = 36;                 // strength of the swirl
  var SPRITE      = 256;                // sprite resolution
  var ALPHA       = small ? 0.08 : 0.062; // opacity of a single puff
  var STRIKE_MIN  = 7, STRIKE_MAX = 13; // seconds between bowl strikes
  var RING_SPEED  = 150;                // px per second the ring expands
  var SAGE        = [176, 190, 168];    // rgb of the smoke
  var WARM        = [226, 174, 99];     // rgb of the occasional warm puff
  var GOLD        = "226,174,99";       // the ring

  var W = 0, H = 0, dpr = 1;
  var puffs = [], rings = [];
  var t = 0, last = 0, nextStrike = 3.2;
  var running = false, visible = true, raf = 0;
  var pointer = { x: -9999, y: -9999, vx: 0, vy: 0, on: false, lastX: 0, lastY: 0, lastT: 0 };

  /* ---- Perlin noise, 2D ---------------------------------------------------- */
  var perm = new Uint8Array(512);
  (function () {
    var p = [], i, j, tmp;
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); tmp = p[i]; p[i] = p[j]; p[j] = tmp; }
    for (i = 0; i < 512; i++) perm[i] = p[i & 255];
  })();
  function fade(x) { return x * x * x * (x * (x * 6 - 15) + 10); }
  function lerp(a, b, x) { return a + (b - a) * x; }
  function grad(h, x, y) { h &= 3; return (h < 2 ? x : -x) + ((h === 0 || h === 2) ? y : -y); }
  function noise(x, y) {
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    var u = fade(x), v = fade(y);
    var A = perm[X] + Y, B = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
      lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u), v);
  }

  /* ---- Sprites: one soft disc per colour ---------------------------------- */
  function makeSprite(rgb) {
    var c = document.createElement("canvas");
    c.width = c.height = SPRITE;
    var g = c.getContext("2d");
    var r = SPRITE / 2;
    var grd = g.createRadialGradient(r, r, 0, r, r, r);
    grd.addColorStop(0, "rgba(" + rgb.join(",") + ",1)");
    grd.addColorStop(0.35, "rgba(" + rgb.join(",") + ",0.55)");
    grd.addColorStop(0.7, "rgba(" + rgb.join(",") + ",0.14)");
    grd.addColorStop(1, "rgba(" + rgb.join(",") + ",0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, SPRITE, SPRITE);
    return c;
  }
  var spriteSage = makeSprite(SAGE), spriteWarm = makeSprite(WARM);

  /* ---- Puffs -------------------------------------------------------------- */
  function spawn(preAged) {
    var p = {
      x: W * (0.5 + (Math.random() - 0.5) * 0.22),
      y: H + 30 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 6,
      vy: -(RISE * 0.6 + Math.random() * RISE),
      r: (small ? 34 : 44) + Math.random() * (small ? 46 : 84),
      life: 0,
      ttl: 16 + Math.random() * 10,
      warm: Math.random() < 0.16,
      seed: Math.random() * 100
    };
    if (preAged) {
      // used for the first frame and for reduced motion: start mid-life, mid-air
      p.life = Math.random() * p.ttl * 0.85;
      p.y = H - (p.life / p.ttl) * H * 1.15 + (Math.random() - 0.5) * 80;
      p.x += (noise(p.seed, p.life * 0.1) * 160);
    }
    return p;
  }

  function step(dt) {
    t += dt;
    while (puffs.length < COUNT) puffs.push(spawn(false));

    var s = 0.0019, e = 0.02, k = CURL * dt;
    for (var i = puffs.length - 1; i >= 0; i--) {
      var p = puffs[i];
      p.life += dt;
      var nx = p.x * s, ny = p.y * s + t * 0.035, sd = p.seed;
      // curl of the noise field: divergence-free, so the smoke folds instead of clumping
      var dNdy = (noise(nx + sd, ny + e) - noise(nx + sd, ny - e)) / (2 * e);
      var dNdx = (noise(nx + e + sd, ny) - noise(nx - e + sd, ny)) / (2 * e);
      p.vx += dNdy * k;
      p.vy += -dNdx * k * 0.6 - 2.2 * dt;   // slight buoyancy
      // the pointer pushes smoke aside
      if (pointer.on) {
        var dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy, R = 240;
        if (d2 < R * R) {
          var d = Math.sqrt(d2) || 1, f = (1 - d / R);
          p.vx += (dx / d) * f * 140 * dt + pointer.vx * f * 0.06;
          p.vy += (dy / d) * f * 140 * dt + pointer.vy * f * 0.06;
        }
      }
      p.vx *= 0.985; p.vy *= 0.99;
      var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy), cap = 60;
      if (sp > cap) { p.vx *= cap / sp; p.vy *= cap / sp; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.life > p.ttl || p.y < -p.r * 2 || p.x < -p.r * 2 || p.x > W + p.r * 2) puffs[i] = spawn(false);
    }

    // the bowl is struck now and then
    nextStrike -= dt;
    if (nextStrike <= 0) {
      strike();
      nextStrike = STRIKE_MIN + Math.random() * (STRIKE_MAX - STRIKE_MIN);
    }
    for (var j = rings.length - 1; j >= 0; j--) {
      rings[j].age += dt;
      if (rings[j].age > rings[j].ttl) rings.splice(j, 1);
    }
  }

  function strike() {
    var cx = W / 2, cy = H * 0.56;
    rings.push({ x: cx, y: cy, age: 0, ttl: 6.5, delay: 0 });
    rings.push({ x: cx, y: cy, age: -0.55, ttl: 6.5, delay: 0 });
    // the strike also stirs the smoke a little
    for (var i = 0; i < puffs.length; i++) {
      var p = puffs[i], dx = p.x - cx, dy = p.y - cy, d = Math.sqrt(dx * dx + dy * dy) || 1;
      if (d < 320) { p.vx += (dx / d) * 9; p.vy += (dy / d) * 9; }
    }
  }

  function envelope(p) {
    var u = p.life / p.ttl;
    var fadeIn = Math.min(1, u / 0.14);
    var fadeOut = u > 0.55 ? 1 - (u - 0.55) / 0.45 : 1;
    return fadeIn * fadeOut * fadeOut;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < puffs.length; i++) {
      var p = puffs[i];
      var a = ALPHA * envelope(p);
      if (a <= 0.002) continue;
      var rr = p.r * (1 + (p.life / p.ttl) * 1.1);
      ctx.globalAlpha = a;
      ctx.drawImage(p.warm ? spriteWarm : spriteSage, p.x - rr, p.y - rr, rr * 2, rr * 2);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1;
    for (var j = 0; j < rings.length; j++) {
      var g = rings[j];
      if (g.age < 0) continue;
      var u = g.age / g.ttl;
      var r = g.age * RING_SPEED;
      ctx.globalAlpha = Math.pow(1 - u, 2.2) * 0.55;
      ctx.strokeStyle = "rgba(" + GOLD + ",1)";
      ctx.beginPath();
      ctx.arc(g.x, g.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ---- Loop --------------------------------------------------------------- */
  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduceMotion) staticFrame();
  }

  function staticFrame() {
    // one calm frame of haze, no motion
    puffs = [];
    for (var i = 0; i < COUNT; i++) puffs.push(spawn(true));
    rings = [{ x: W / 2, y: H * 0.56, age: 2.2, ttl: 6.5 }];
    draw();
  }

  /* ---- Pointer ------------------------------------------------------------ */
  hero.addEventListener("pointermove", function (ev) {
    var rect = hero.getBoundingClientRect();
    var x = ev.clientX - rect.left, y = ev.clientY - rect.top, now = performance.now();
    if (pointer.on) {
      var dtp = Math.max(1, now - pointer.lastT) / 1000;
      pointer.vx = (x - pointer.lastX) / dtp;
      pointer.vy = (y - pointer.lastY) / dtp;
    }
    pointer.x = x; pointer.y = y; pointer.on = true;
    pointer.lastX = x; pointer.lastY = y; pointer.lastT = now;
  });
  hero.addEventListener("pointerleave", function () { pointer.on = false; pointer.vx = pointer.vy = 0; });

  /* ---- Only run while the hero is on screen ------------------------------- */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.02 }).observe(hero);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else if (visible) start();
  });

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  resize();
  // start with a formed haze rather than an empty sky
  for (var i = 0; i < COUNT; i++) puffs.push(spawn(true));
  if (reduceMotion) staticFrame(); else start();
})();
