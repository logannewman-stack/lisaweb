/* =============================================================================
   LISA BRUNSON — SITE BEHAVIOUR
   Reads js/content.js and builds the repeated parts of the page:
     - the navigation (menu, current section)
     - the wall of quote signs
     - the painted rainbow of words she believes in
     - the session steps, and the winding path between them
     - the oil bottles, the kind words, the luggage tags, the postcard
     - the hand-drawn arrows around her logo
     - a minute of breath
   Brush strokes are painted afterwards by js/paint.js.
   Nothing here needs editing for content.
   ========================================================================== */
(function () {
  "use strict";

  var L = window.LISA || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function f(n) { return (Math.round(n * 10) / 10).toString(); }
  /* run fn after layout changes size (fonts loading, resizing, rotating) */
  function whenResized(el, fn) {
    var raf = 0;
    var run = function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(fn); };
    if ("ResizeObserver" in window) new ResizeObserver(run).observe(el);
    else window.addEventListener("resize", run);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    window.addEventListener("load", run);
    run();
  }
  var RAINBOW = ["var(--red)", "var(--orange)", "var(--yellow)", "var(--green)", "var(--blue)", "var(--indigo)", "var(--violet)"];
  var NEW_TAB = '<span class="sr-only"> (opens in a new tab)</span>';

  /* ---- Small things ------------------------------------------------------- */
  var thisYear = String(new Date().getFullYear());
  $$("#year, #postmark-year").forEach(function (el) { el.textContent = thisYear; });
  var tagline = $("#tagline");
  if (tagline && L.tagline) tagline.textContent = L.tagline;
  if (L.shop && L.shop.url) {
    $$(".js-shop").forEach(function (a) { a.href = L.shop.url; });
    if (L.shop.label) $$(".js-shop-label").forEach(function (s) { s.textContent = L.shop.label; });
    var shopNote = $("#oils-note");
    if (shopNote && L.shop.note) shopNote.textContent = L.shop.note;
  }

  /* =========================================================================
     NAVIGATION — the sticker bar, the sunny menu, the current section
     ====================================================================== */
  var nav = $("#nav"), toggle = $("#nav-toggle"), menu = $("#menu");
  var links = $$(".nav__links a");
  var SCRIBBLE = '<svg class="scribble" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
    '<path vector-effect="non-scaling-stroke" d="M2 7 C12 2.5 19 2.5 28 6 S44 10.5 54 6.5 S71 2 81 6 S93 9.5 98 4.5"/></svg>';
  links.forEach(function (a) { a.insertAdjacentHTML("beforeend", SCRIBBLE); });

  var tracked = links.filter(function (a) { return !a.parentNode.classList.contains("nav__menu-book"); });
  var sections = tracked.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  var ticking = false;
  function markCurrent() {
    ticking = false;
    var line = window.innerHeight * 0.38, current = null;
    sections.forEach(function (s) {
      if (!s) return;
      var r = s.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = s.id;
    });
    tracked.forEach(function (a) {
      var on = !!current && a.getAttribute("href") === "#" + current;
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(markCurrent); } }, { passive: true });
  window.addEventListener("resize", markCurrent);
  markCurrent();

  if (nav && toggle && menu) {
    var outside = [$("main"), $(".footer"), $(".skip")];
    var isOpen = function () { return nav.classList.contains("is-open"); };
    var openMenu = function () {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "Close";
      document.body.style.overflow = "hidden";
      outside.forEach(function (el) { if (el) el.inert = true; });
      var first = $("a", menu);
      if (first) setTimeout(function () { first.focus(); }, 60);
    };
    var closeMenu = function (refocus) {
      if (!isOpen()) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      document.body.style.overflow = "";
      outside.forEach(function (el) { if (el) el.inert = false; });
      if (refocus) toggle.focus();
    };
    toggle.addEventListener("click", function () { if (isOpen()) closeMenu(true); else openMenu(); });
    links.concat($$(".nav__brand, .nav__cta")).forEach(function (a) {
      a.addEventListener("click", function () { closeMenu(false); });
    });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && isOpen()) closeMenu(true); });
    var wide = window.matchMedia("(min-width: 1100px)");
    var onWide = function (e) { if (e.matches) closeMenu(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* =========================================================================
     THE WORDS ON MY WALLS — each quote painted on its own kind of sign
     ====================================================================== */
  /* tilt in degrees for each kind of sign; about half hang straight */
  var TILT = { wood: 0, salmon: 1.2, rainbow: 0, plaque: 0, sky: -1.2, pillow: 1.4 };
  var NOTE_COLOURS = ["var(--note)", "var(--pink)", "var(--sky)", "var(--note)", "var(--mint)", "var(--pink)"];
  var NOTE_TILTS = [-1.6, 0, 0, 1.4, 0, -1.8];
  var NOTE_PINS = ["var(--red)", "var(--blue)", "var(--green)", "var(--violet)", "var(--orange)", "var(--blue)"];
  var HANGER = '<svg class="hanger" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path vector-effect="non-scaling-stroke" d="M1 40 L50 2 L99 40"/></svg><span class="nail" aria-hidden="true"></span>';
  var CROWN = '<svg class="sign__crown" viewBox="0 0 66 44" aria-hidden="true" focusable="false">' +
    '<path d="M9 35 L6 13 L20 24 L33 6 L46 24 L60 13 L57 35 Z" style="fill:var(--silver)" stroke="#5E6676" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<path d="M9 35 H57 V41 H9 Z" style="fill:var(--silver)" stroke="#5E6676" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<circle cx="33" cy="5.5" r="3.4" style="fill:var(--pink)" stroke="#5E6676" stroke-width="1.8"/>' +
    '<circle cx="6" cy="12.5" r="2.8" style="fill:var(--sky)" stroke="#5E6676" stroke-width="1.8"/>' +
    '<circle cx="60" cy="12.5" r="2.8" style="fill:var(--sky)" stroke="#5E6676" stroke-width="1.8"/>' +
    '<circle cx="21" cy="30" r="1.9" fill="#fff"/><circle cx="33" cy="29" r="2.3" fill="#fff"/><circle cx="45" cy="30" r="1.9" fill="#fff"/></svg>';
  var LOTUS = '<svg class="sign__lotus" viewBox="0 0 44 26" aria-hidden="true" focusable="false">' +
    '<path d="M22 2 C16.5 9 16.5 17 22 24 C27.5 17 27.5 9 22 2 Z"/><path d="M22 24 C14 23.5 7.5 18 5 11 C12 11.5 18 16 22 24 Z"/>' +
    '<path d="M22 24 C30 23.5 36.5 18 39 11 C32 11.5 26 16 22 24 Z"/><path d="M8 25 H36"/></svg>';
  var WASH = '<span class="sky__wash" aria-hidden="true"><svg viewBox="0 0 300 300" preserveAspectRatio="none" focusable="false"><g filter="url(#wash)">' +
    '<path d="M-14 26 C60 -12 168 8 240 14 C306 22 320 92 302 152 C288 212 304 262 232 302 C150 322 58 304 8 292 C-22 242 -12 160 -16 110 C-20 70 -22 48 -14 26 Z" style="fill:var(--sky)" opacity=".42"/>' +
    '<path d="M24 16 C88 -4 182 14 236 38 C276 58 254 110 190 112 C118 116 34 96 24 16 Z" style="fill:var(--blue)" opacity=".12"/>' +
    '<path d="M150 196 C212 176 292 206 292 252 C292 292 200 302 150 282 C108 264 108 210 150 196 Z" style="fill:var(--violet)" opacity=".1"/>' +
    "</g></svg></span>";
  var MINI_RAINBOW = (function () {
    var s = '<svg class="sky__rainbow" viewBox="0 0 124 74" aria-hidden="true" focusable="false"><g fill="none" stroke-width="6.4">';
    RAINBOW.forEach(function (c, i) {
      var r = 52 - i * 6;
      s += '<path d="M' + (62 - r) + " 68 A" + r + " " + r + " 0 0 1 " + (62 + r) + ' 68" style="stroke:' + c + '"/>';
    });
    var cloud = "C0 62 8 57 15 61 C17 52 31 52 33 61 C40 59 45 66 40 72 Z";
    s += '</g><g style="fill:#fff;stroke:var(--ink)" stroke-width="2" stroke-linejoin="round">' +
      '<path d="M-2 72 ' + cloud + '"/><path transform="translate(124 0) scale(-1 1)" d="M-2 72 ' + cloud + '"/></g></svg>';
    return s;
  })();
  var PILLOW = '<svg class="pillow__shape" viewBox="0 0 200 172" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
    '<path d="M14 15 Q100 -5 186 15 Q207 86 186 157 Q100 177 14 157 Q-7 86 14 15 Z" fill="url(#velvet)"/>' +
    '<path d="M25 26 Q100 9 175 26 Q192 86 175 146 Q100 163 25 146 Q8 86 25 26 Z" fill="none" style="stroke:var(--gold)" stroke-width="2" stroke-dasharray="1 6" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
    '<g style="fill:var(--gold)"><circle cx="14" cy="15" r="4"/><circle cx="186" cy="15" r="4"/><circle cx="14" cy="157" r="4"/><circle cx="186" cy="157" r="4"/></g></svg>';

  function quoteText(q) {
    return "<p>" + esc(q.text) + "</p>" + (q.by ? '<footer class="sign__by">' + esc(q.by) + "</footer>" : "");
  }
  function sign(q, seed) {
    var look = q.look, body = quoteText(q);
    var open = '<blockquote class="sign sign--' + look + '" style="--tilt:' + (TILT[look] || 0) + 'deg">';
    switch (look) {
      case "wood":
        return open + HANGER + body + "</blockquote>";
      case "salmon":
        return open + '<span class="tape" aria-hidden="true"></span>' + CROWN + body + "</blockquote>";
      case "rainbow":
        return open + '<span class="tape tape--pink" style="--tape-tilt:4deg" aria-hidden="true"></span><span class="rainbow-stack" aria-hidden="true">' +
          RAINBOW.map(function (c, i) { return '<span data-paint="stroke" data-colour="' + c + '" data-seed="' + (seed + i) + '" data-ragged="1"></span>'; }).join("") +
          "</span>" + body + "</blockquote>";
      case "plaque":
        return open + body + LOTUS + "</blockquote>";
      case "sky":
        return open + '<span class="tape tape--blue" aria-hidden="true"></span>' + WASH + MINI_RAINBOW + body + "</blockquote>";
      case "pillow":
        return open + PILLOW + '<span class="pin" style="--pin:var(--gold)" aria-hidden="true"></span>' + body + "</blockquote>";
    }
    return "";
  }
  function note(q, k) {
    var hold = k % 3 === 2
      ? '<span class="tape" style="--tape-tilt:' + (k % 2 ? 4 : -4) + 'deg" aria-hidden="true"></span>'
      : '<span class="pin" style="--pin:' + NOTE_PINS[k % NOTE_PINS.length] + '" aria-hidden="true"></span>';
    return '<blockquote class="note" style="--note-c:' + NOTE_COLOURS[k % NOTE_COLOURS.length] + ";--tilt:" + NOTE_TILTS[k % NOTE_TILTS.length] + 'deg">' +
      hold + quoteText(q) + "</blockquote>";
  }

  var wall = $("#wall");
  var quotes = (L.quotes || []).filter(function (q) { return q && q.text; });
  if (wall && quotes.length) {
    var items = [], pending = [], noteCount = 0;
    var flushNotes = function () {
      if (!pending.length) return;
      items.push('<li class="wall__item wall__item--notes"><div class="notes">' + pending.join("") + "</div></li>");
      pending = [];
    };
    quotes.forEach(function (q, i) {
      var look = TILT.hasOwnProperty(q.look) ? q.look : "note";
      if (look === "note") {
        pending.push(note(q, noteCount++));
        if (pending.length === 2) flushNotes();
        return;
      }
      flushNotes();
      items.push('<li class="wall__item wall__item--' + look + '">' + sign({ text: q.text, by: q.by, look: look }, 400 + i * 10) + "</li>");
    });
    flushNotes();
    wall.innerHTML = items.join("");

    /* A tidy masonry: each sign takes as many 2px rows as it is tall, and the
       grid drops the next one into the shortest column. */
    var layoutWall = function () {
      var cols = getComputedStyle(wall).gridTemplateColumns.split(" ").filter(Boolean).length;
      var wallItems = $$(".wall__item", wall);
      if (cols < 2) {
        wall.classList.remove("is-masonry");
        wallItems.forEach(function (it) { it.style.gridRowEnd = ""; });
        return;
      }
      wall.classList.add("is-masonry");
      var row = parseFloat(getComputedStyle(wall).gridAutoRows) || 2;
      wallItems.forEach(function (it) { it.style.gridRowEnd = "span " + Math.ceil(it.offsetHeight / row); });
    };
    whenResized(wall, layoutWall);
  }

  /* =========================================================================
     WHAT I BELIEVE — the words, lettered on seven painted bands
     ====================================================================== */
  var bands = $("#bands");
  if (bands && L.values && L.values.length) {
    var B = 7, n = L.values.length, per = Math.floor(n / B), extra = n % B, k = 0, html = "";
    for (var b = 0; b < B; b++) {
      var count = per + (b < extra ? 1 : 0), words = L.values.slice(k, k + count);
      k += count;
      html += '<li class="band"><span class="band__paint" data-paint="stroke" data-colour="var(--band-' + (b + 1) + ')" data-seed="' + (101 + b * 3) + '" data-ragged="1" aria-hidden="true"></span>' +
        '<ul class="band__words" role="list">' + words.map(function (w) {
          return '<li class="word word--' + esc(w.face || "sans") + (w.big ? " word--big" : "") + '">' + esc(w.text) + "</li>";
        }).join("") + "</ul></li>";
    }
    bands.innerHTML = html;
  }

  /* =========================================================================
     A SESSION — five numbered stickers, joined by a hand-drawn dotted path
     ====================================================================== */
  var steps = $("#steps"), trail = $("#trail-path");
  function curveThrough(p) {
    var d = "M" + f(p[0][0]) + " " + f(p[0][1]);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += " C" + f(p1[0] + (p2[0] - p0[0]) / 6) + " " + f(p1[1] + (p2[1] - p0[1]) / 6) + " " +
        f(p2[0] - (p3[0] - p1[0]) / 6) + " " + f(p2[1] - (p3[1] - p1[1]) / 6) + " " + f(p2[0]) + " " + f(p2[1]);
    }
    return d;
  }
  if (steps && L.steps) {
    steps.innerHTML = L.steps.map(function (s, i) {
      var c = (i % 5) + 1;
      return '<li class="step" style="--c:var(--step-' + c + ");--c-ink:var(--step-" + c + '-ink)">' +
        '<span class="step__num" aria-hidden="true">' + (i + 1) + "</span>" +
        '<div class="step__body"><h3 class="step__name">' + esc(s.name) + '</h3><p class="step__text">' + esc(s.text) + "</p></div></li>";
    }).join("");
    if (trail) {
      var drawTrail = function () {
        var box = trail.getBoundingClientRect();
        var pts = $$(".step__num", steps).map(function (el) {
          var r = el.getBoundingClientRect();
          return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
        });
        if (pts.length < 2) { trail.innerHTML = ""; return; }
        var first = pts[0], last = pts[pts.length - 1];
        var vertical = Math.abs(pts[1][1] - first[1]) > Math.abs(pts[1][0] - first[0]);
        var lead = vertical ? [first[0] + 20, first[1] - 50] : [first[0] - 90, first[1] + 34];
        var end = vertical ? [last[0] + 34, last[1] + 76] : [last[0] + 96, last[1] - 30];
        var heart = "M0 -3 C-3 -10 -13 -8 -11 0 C-10 5 -4 9 0 12 C4 9 10 5 11 0 C13 -8 3 -10 0 -3 Z";
        trail.innerHTML = '<path d="' + curveThrough([lead].concat(pts, [end])) + '"/>' +
          '<path class="trail__end" transform="translate(' + f(end[0]) + " " + f(end[1] + 6) + ') rotate(' + (vertical ? 8 : -8) + ')" d="' + heart + '"/>';
      };
      whenResized(steps, drawTrail);
    }
  }

  /* =========================================================================
     THE OILS — amber dropper bottles on a painted kraft shelf
     ====================================================================== */
  var BOTTLE = '<svg class="oil__bottle" viewBox="0 0 80 150" aria-hidden="true" focusable="false">' +
    '<path d="M31 31 C29 15 33 5 40 5 C47 5 51 15 49 31 Z" style="fill:var(--ink)"/>' +
    '<path d="M35 11 C36 8 38 7 40 7" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>' +
    '<rect x="25" y="29" width="30" height="14" rx="4" style="fill:var(--gold);stroke:var(--ink)" stroke-width="2.5"/>' +
    '<path d="M30 43 H50 V51 H30 Z" fill="url(#amber)" style="stroke:var(--ink)" stroke-width="2.5"/>' +
    '<path d="M16 65 C16 55 24 51 34 51 H46 C56 51 64 55 64 65 V136 C64 142 60 146 54 146 H26 C20 146 16 142 16 136 Z" fill="url(#amber)" style="stroke:var(--ink)" stroke-width="2.5"/>' +
    '<path d="M23 64 V131" stroke="rgba(255,255,255,.42)" stroke-width="4" stroke-linecap="round"/>' +
    '<rect x="19.5" y="77" width="41" height="47" rx="9" style="fill:var(--oil);stroke:#fff" stroke-width="3"/>' +
    '<path d="M40 87 C35.5 94 33.5 98 33.5 102 A6.5 6.5 0 0 0 46.5 102 C46.5 98 44.5 94 40 87 Z" fill="#fff" style="stroke:var(--ink)" stroke-width="1.6"/></svg>';
  var oilList = $("#oil-list");
  if (oilList && L.oils) {
    oilList.innerHTML = L.oils.map(function (o, i) {
      return '<li class="oil" style="--oil:var(--' + esc(o.colour || "violet") + ')">' + BOTTLE +
        '<div class="oil__shelf" data-paint="stroke" data-colour="var(--kraft)" data-seed="' + (300 + i * 7) + '" data-flat="1"><span class="oil__name">' + esc(o.name) + "</span></div>" +
        (o.note ? '<p class="oil__note">' + esc(o.note) + "</p>" : "") + "</li>";
    }).join("");
  }

  /* =========================================================================
     KIND WORDS — three sticky notes, pinned
     ====================================================================== */
  var testimonials = $("#testimonials");
  if (testimonials && L.testimonials) {
    var KC = ["var(--note)", "var(--sky)", "var(--card)"], KT = [-2, 1.5, -1], KP = ["var(--red)", "var(--indigo)", "var(--green)"];
    testimonials.innerHTML = L.testimonials.map(function (t, i) {
      return '<blockquote class="kind__note" style="--note-c:' + KC[i % 3] + ";--tilt:" + KT[i % 3] + 'deg">' +
        '<span class="pin" style="--pin:' + KP[i % 3] + '" aria-hidden="true"></span>' +
        "<p>" + esc(t.text) + "</p>" + (t.by ? "<footer>" + esc(t.by) + "</footer>" : "") + "</blockquote>";
    }).join("");
  }

  /* =========================================================================
     THE STORY OF MY LOGO — hand-drawn arrows from each note to its symbol
     ====================================================================== */
  var logoMap = $("#logo-map"), arrows = $("#logo-arrows"), logo = $("#logo-large");
  /* where each symbol sits on the 120 x 120 drawing */
  var TARGETS = { lotus: [41, 33], dots: [77, 10], moon: [31, 79], eye: [68, 73] };
  if (logoMap && arrows && logo) {
    var drawArrows = function () {
      if (getComputedStyle(arrows).display === "none") { arrows.innerHTML = ""; return; }
      var box = arrows.getBoundingClientRect(), lb = logo.getBoundingClientRect(), out = "";
      $$(".meaning", logoMap).forEach(function (m, i) {
        var t = TARGETS[m.getAttribute("data-point")];
        if (!t) return;
        var tx = lb.left - box.left + lb.width * t[0] / 120, ty = lb.top - box.top + lb.height * t[1] / 120;
        var dt = $("dt", m).getBoundingClientRect();
        var onLeft = dt.left + dt.width / 2 < lb.left + lb.width / 2;
        var sx = (onLeft ? dt.right + 14 : dt.left - 14) - box.left, sy = dt.top + dt.height * 0.55 - box.top;
        var dx = tx - sx, dy = ty - sy, len = Math.sqrt(dx * dx + dy * dy) || 1;
        var ex = tx - dx / len * 9, ey = ty - dy / len * 9;
        var bend = (onLeft ? 1 : -1) * (i < 2 ? -0.22 : 0.22);
        var cx = (sx + ex) / 2 - dy * bend, cy = (sy + ey) / 2 + dx * bend;
        var ang = Math.atan2(ey - cy, ex - cx), h = 12;
        out += '<path d="M' + f(sx) + " " + f(sy) + " Q" + f(cx) + " " + f(cy) + " " + f(ex) + " " + f(ey) + '"/>' +
          '<path d="M' + f(ex + Math.cos(ang + 2.6) * h) + " " + f(ey + Math.sin(ang + 2.6) * h) + " L" + f(ex) + " " + f(ey) +
          " L" + f(ex + Math.cos(ang - 2.5) * h) + " " + f(ey + Math.sin(ang - 2.5) * h) + '"/>';
      });
      arrows.innerHTML = out;
    };
    whenResized(logoMap, drawArrows);
  }

  /* =========================================================================
     WORK WITH ME — luggage tags, and the postcard
     ====================================================================== */
  var STRING = '<svg class="tag__string" viewBox="0 0 56 106" aria-hidden="true" focusable="false">' +
    '<path d="M28 103 C26 86 40 76 36 58 C32 40 14 42 18 24 C21 12 33 8 41 3"/><path d="M28 103 C30 88 44 80 39 60" opacity=".5"/></svg>';
  var offerList = $("#offer-list");
  if (offerList && L.offerings) {
    offerList.innerHTML = L.offerings.map(function (o, i) {
      var c = (i % 3) + 1, subject = encodeURIComponent("Booking: " + o.name);
      var meta = [o.length, o.who].filter(Boolean).join(" · ");
      return '<li class="tag">' + STRING +
        '<span class="pin tag__pin" style="--pin:' + RAINBOW[(i * 2) % 7] + '" aria-hidden="true"></span>' +
        '<div class="tag__shape"><div class="tag__card" style="--c:var(--tag-' + c + ");--c-ink:var(--tag-" + c + '-ink)">' +
        '<h3 class="tag__name">' + esc(o.name) + "</h3>" +
        (meta ? '<p class="tag__meta">' + esc(meta) + "</p>" : "") +
        '<p class="tag__blurb">' + esc(o.blurb) + "</p>" +
        '<a class="btn tag__book ' + (c === 1 ? "tag__book--light" : "btn--navy") + '" href="mailto:' + esc(L.email || "") + "?subject=" + subject + '">Book<span class="sr-only">: ' + esc(o.name) + "</span></a>" +
        "</div></div></li>";
    }).join("");
  }
  var contactLines = $("#contact-lines");
  if (contactLines) {
    var lines = ['<li><span class="postcard__to">To</span>' + esc(L.name || "Lisa Brunson") + "</li>"];
    if (L.email) lines.push('<li><a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></li>");
    if (L.instagram) lines.push('<li><a href="https://instagram.com/' + esc(L.instagram) + '" target="_blank" rel="noopener">@' + esc(L.instagram) + " on Instagram" + NEW_TAB + "</a></li>");
    if (L.location) lines.push("<li>" + esc(L.location) + "</li>");
    contactLines.innerHTML = lines.join("");
  }
  var footerLinks = $("#footer-links");
  if (footerLinks) {
    var ARROW = '<svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 11 L11 5 M6 5 H11 V10"/></svg>';
    var fl = [];
    if (L.instagram) fl.push('<a href="https://instagram.com/' + esc(L.instagram) + '" target="_blank" rel="noopener">Instagram' + NEW_TAB + "</a>");
    if (L.email) fl.push('<a href="mailto:' + esc(L.email) + '">Email</a>');
    if (L.shop && L.shop.url) fl.push('<a href="' + esc(L.shop.url) + '" target="_blank" rel="noopener">' + esc(L.shop.label || "Shop my oils") + ARROW + NEW_TAB + "</a>");
    footerLinks.innerHTML = fl.join("");
  }

  /* =========================================================================
     A MINUTE OF BREATH — four in, seven held, eight out, three times
     ====================================================================== */
  var breath = $("#breath"), breathBtn = $("#breath-btn"), breathCue = $("#breath-cue"), breathNum = $("#breath-num");
  if (breath && breathBtn && breathCue) {
    var PHASES = [["in", 4, "Breathe in"], ["hold", 7, "Hold"], ["out", 8, "Breathe out"]];
    var CYCLES = 3, restCue = breathCue.textContent, startLabel = breathBtn.textContent;
    var running = false, timer = 0;
    var rest = function () {
      if (!breathNum) return;
      breathNum.textContent = "4\u00b77\u00b78";
      breathNum.classList.add("is-rest");
    };
    rest();
    var setPhase = function (name) {
      breath.classList.remove("is-in", "is-hold", "is-out");
      if (name) breath.classList.add("is-" + name);
    };
    var setCue = function (label, count) {
      breathCue.innerHTML = '<span class="breath__phase">' + esc(label) + '</span><span class="sr-only">, ' + count + "</span>";
      if (breathNum) { breathNum.textContent = count; breathNum.classList.remove("is-rest"); }
    };
    var finish = function (msg) {
      running = false;
      clearTimeout(timer);
      setPhase("");
      breathBtn.textContent = startLabel;
      breathCue.textContent = msg || restCue;
      rest();
    };
    var runPhase = function (cycle, phase) {
      if (!running) return;
      if (cycle >= CYCLES) { finish("That is a minute. Carry it with you."); return; }
      var p = PHASES[phase], left = p[1];
      setPhase(p[0]);
      setCue(p[2], left);
      var tick = function () {
        if (!running) return;
        left -= 1;
        if (left > 0) { setCue(p[2], left); timer = setTimeout(tick, 1000); }
        else if (phase < PHASES.length - 1) runPhase(cycle, phase + 1);
        else runPhase(cycle + 1, 0);
      };
      timer = setTimeout(tick, 1000);
    };
    breathBtn.addEventListener("click", function () {
      if (running) { finish(restCue); return; }
      running = true;
      breathBtn.textContent = "Stop";
      runPhase(0, 0);
    });
  }
})();
