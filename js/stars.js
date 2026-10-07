/* =============================================================================
   LISA BRUNSON — THE NIGHT SKY
   One fixed sky behind the whole page: small gold stars, a few in the jewel
   colours, twinkling slowly, with a handful of four-point glints. The stars
   drift a little as the page scrolls, so the sky feels deep.
   Pauses when the tab is hidden; under reduced motion it is drawn once and
   holds still. Tuning knobs are at the top.
   ========================================================================== */
(function () {
  "use strict";
  var canvas = document.getElementById("sky");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var DENSITY = 6200;   // one star per this many square pixels of screen
  var MIN_STARS = 70, MAX_STARS = 260;
  var GLINTS = 5;       // four-point gold stars
  var PARALLAX = 0.05;  // how far the deepest layer drifts per pixel scrolled
  var FPS = 30;
  // [theme colour, weight]: mostly gold, then the jewels. The colours are read
  // from css/theme.css, so the sky follows any change made there.
  var PALETTE = [
    ["--gold-light", 9], ["--gold", 7], ["--ivory", 4],
    ["--ruby", 1], ["--carnelian", 1], ["--citrine", 1], ["--emerald", 1],
    ["--sapphire", 1.4], ["--amethyst", 1.4], ["--moonstone", 1.4]
  ];
  var rootStyle = getComputedStyle(document.documentElement);
  function themeRGB(name) {
    var v = rootStyle.getPropertyValue(name).trim(), m = /^#([0-9a-f]{6})$/i.exec(v);
    if (!m) return [241, 220, 166];
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  var COLOURS = PALETTE.map(function (p) { var c = themeRGB(p[0]); return [c[0], c[1], c[2], p[1]]; });

  var W = 0, H = 0, dpr = 1, stars = [], glints = [], sprites = {}, glintSprite = null;
  var running = false, raf = 0, last = 0, t = 0, scrollY = 0;

  // A fixed seed so the sky is the same on every visit.
  var seed = 7;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function pickColour() {
    var total = 0, i;
    for (i = 0; i < COLOURS.length; i++) total += COLOURS[i][3];
    var r = rand() * total;
    for (i = 0; i < COLOURS.length; i++) { r -= COLOURS[i][3]; if (r <= 0) return COLOURS[i]; }
    return COLOURS[0];
  }
  // a soft round sprite per colour: a bright core and a faint halo
  function sprite(c) {
    var key = c.join(",");
    if (sprites[key]) return sprites[key];
    var s = document.createElement("canvas"), size = 32, g;
    s.width = s.height = size;
    var x = s.getContext("2d");
    g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",1)");
    g.addColorStop(0.18, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",.9)");
    g.addColorStop(0.36, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",.22)");
    g.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
    x.fillStyle = g;
    x.fillRect(0, 0, size, size);
    sprites[key] = s;
    return s;
  }
  function makeGlint() {
    var s = document.createElement("canvas"), size = 48;
    s.width = s.height = size;
    var x = s.getContext("2d"), m = size / 2;
    var g = x.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, "rgba(248,233,194,.55)");
    g.addColorStop(1, "rgba(248,233,194,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, size, size);
    x.fillStyle = "rgba(246,226,170,1)";
    x.beginPath();
    x.moveTo(m, 2);
    x.quadraticCurveTo(m + 2, m - 2, size - 2, m);
    x.quadraticCurveTo(m + 2, m + 2, m, size - 2);
    x.quadraticCurveTo(m - 2, m + 2, 2, m);
    x.quadraticCurveTo(m - 2, m - 2, m, 2);
    x.fill();
    return s;
  }

  function build() {
    seed = 7;
    var count = Math.max(MIN_STARS, Math.min(MAX_STARS, Math.round((W * H) / DENSITY)));
    stars = [];
    for (var i = 0; i < count; i++) {
      var c = pickColour(), big = rand() < 0.08;
      stars.push({
        x: rand(), y: rand(),
        r: big ? 1.5 + rand() * 1.3 : 0.55 + rand() * 0.95,
        a: 0.35 + rand() * 0.55,
        speed: 0.25 + rand() * 0.9,
        phase: rand() * Math.PI * 2,
        depth: 0.25 + rand() * 0.75,
        img: sprite(c)
      });
    }
    glints = [];
    for (var j = 0; j < GLINTS; j++) {
      glints.push({ x: 0.04 + rand() * 0.92, y: 0.04 + rand() * 0.92, s: 4 + rand() * 4, speed: 0.15 + rand() * 0.25, phase: rand() * Math.PI * 2, depth: 0.6 + rand() * 0.4 });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var i, s, y, alpha, size;
    for (i = 0; i < stars.length; i++) {
      s = stars[i];
      y = s.y * H - (reduceMotion ? 0 : scrollY * PARALLAX * s.depth);
      y = ((y % H) + H) % H;
      alpha = reduceMotion ? s.a * 0.85 : s.a * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
      size = s.r * 6;   // the sprite's core is a sixth of its size
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.drawImage(s.img, s.x * W - size / 2, y - size / 2, size, size);
    }
    for (i = 0; i < glints.length; i++) {
      s = glints[i];
      y = s.y * H - (reduceMotion ? 0 : scrollY * PARALLAX * s.depth);
      y = ((y % H) + H) % H;
      alpha = reduceMotion ? 0.45 : 0.18 + 0.45 * Math.pow(0.5 + 0.5 * Math.sin(t * s.speed + s.phase), 3);
      ctx.globalAlpha = alpha;
      ctx.drawImage(glintSprite, s.x * W - s.s, y - s.s, s.s * 2, s.s * 2);
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / FPS - 2) return;
    t += Math.min(0.1, (now - last) / 1000 || 0.03);
    last = now;
    draw();
  }
  function start() {
    if (running || reduceMotion || document.hidden) return;
    running = true; last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

  function resize() {
    var w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    var changed = Math.abs(w - W) > 1 || Math.abs(h - H) > 80;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!changed && stars.length) return;
    W = Math.max(1, Math.round(w)); H = Math.max(1, Math.round(h));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    draw();
  }

  glintSprite = makeGlint();
  var resizeTimer = 0;
  window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); });
  window.addEventListener("scroll", function () {
    scrollY = window.scrollY || window.pageYOffset;
    if (!running && !reduceMotion && !document.hidden) draw();
  }, { passive: true });
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  scrollY = window.scrollY || window.pageYOffset;
  resize();
  start();
})();
