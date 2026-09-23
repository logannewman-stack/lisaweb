/* =============================================================================
   LISA BRUNSON — SITE BEHAVIOUR
   Reads js/content.js and brings the page to life:
     - the navigation (menu, tone, current section)
     - the quotes turning around the centre, and the featured quote
     - the words she believes in, the session steps, the kind words
     - the offerings and contact lines
     - a minute of breath
   Nothing here needs editing for content.
   ========================================================================== */
(function () {
  "use strict";

  var L = window.LISA || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- Small things ------------------------------------------------------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
  var tagline = $("#tagline");
  if (tagline && L.tagline) tagline.textContent = L.tagline;

  /* =========================================================================
     THE CANVAS — one continuous wash of colour behind the whole page.
     Each section's colour is held where its content sits and melts into the
     next colour across the space between sections.
     ====================================================================== */
  var probe = document.createElement("i");
  probe.style.cssText = "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none";
  document.body.appendChild(probe);
  function groundOf(el) {
    var raw = getComputedStyle(el).getPropertyValue("--ground").trim();
    if (!raw) return "";
    probe.style.background = raw;
    var c = getComputedStyle(probe).backgroundColor;
    return c && c !== "rgba(0, 0, 0, 0)" ? c : "";
  }
  var canvas = $("#canvas");
  var BLEND = 160; // the least distance over which one colour becomes the next
  function paintCanvas() {
    if (!canvas) return;
    var blocks = $$("[data-tone]").filter(function (el) { return el.id !== "top" && groundOf(el); });
    if (!blocks.length) return;
    var scrollY = window.scrollY || window.pageYOffset;
    var stops = [], prev = null;
    blocks.forEach(function (el, i) {
      var colour = groundOf(el);
      var rect = el.getBoundingClientRect(), cs = getComputedStyle(el);
      var top = rect.top + scrollY;
      var padTop = parseFloat(cs.paddingTop) || 0, padBottom = parseFloat(cs.paddingBottom) || 0;
      if (i === 0) {
        stops.push(colour + " 0px");
      } else {
        // hold the previous colour until its content ends, and settle on the
        // new colour before this content begins: the change lives in the gap
        var start = prev.contentBottom + 20, end = top + padTop * 0.85;
        if (end - start < BLEND) start = end - BLEND;
        stops.push(prev.colour + " " + Math.round(start) + "px");
        stops.push(colour + " " + Math.round(end) + "px");
      }
      prev = { colour: colour, contentBottom: rect.bottom + scrollY - padBottom };
    });
    stops.push(prev.colour + " 100%");
    canvas.style.height = document.documentElement.scrollHeight + "px";
    canvas.style.background = "linear-gradient(to bottom, " + stops.join(", ") + ")";
  }
  var canvasTimer = 0;
  function repaintSoon() { clearTimeout(canvasTimer); canvasTimer = setTimeout(paintCanvas, 60); }
  paintCanvas();
  window.addEventListener("load", paintCanvas);
  window.addEventListener("resize", repaintSoon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintCanvas);
  if ("ResizeObserver" in window) new ResizeObserver(repaintSoon).observe(document.body);

  /* =========================================================================
     NAVIGATION
     ====================================================================== */
  var nav = $("#nav"), hero = $("#top"), toggle = $("#nav-toggle"), heroPhoto = $(".hero__photo");
  var toned = $$("[data-tone]").filter(function (el) { return el !== document.documentElement; });
  var links = $$(".nav__links a");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      nav.classList.toggle("is-scrolled", y > 24);
      if (heroPhoto && !reduceMotion) heroPhoto.style.transform = "translate3d(0," + Math.round(Math.min(y, 1600) * 0.22) + "px,0)";
      if (hero) nav.classList.toggle("is-past-hero", hero.getBoundingClientRect().bottom < 90);
      var barY = 36, midY = window.innerHeight * 0.45, current = null;
      for (var i = 0; i < toned.length; i++) {
        var r = toned[i].getBoundingClientRect();
        if (r.top <= barY && r.bottom > barY) {
          document.documentElement.setAttribute("data-tone", toned[i].getAttribute("data-tone"));
          var g = groundOf(toned[i]);
          if (g) nav.style.setProperty("--nav-ground", g);
        }
        if (r.top <= midY && r.bottom > midY) current = toned[i].id;
      }
      links.forEach(function (a) {
        a.classList.toggle("is-current", !!current && a.getAttribute("href") === "#" + current);
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if (toggle) {
    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) { closeMenu(); return; }
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "Close";
      document.body.style.overflow = "hidden";
    });
    links.forEach(function (a) { a.addEventListener("click", function () { if (nav.classList.contains("is-open")) closeMenu(); }); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && nav.classList.contains("is-open")) closeMenu(); });
  }

  /* =========================================================================
     QUOTES — two rings turning around the centre, one quote featured at a time
     ====================================================================== */
  var quotes = (L.quotes || []).filter(function (q) { return q && q.text; });
  var ringSvg = $(".ring__svg");
  var outerText = ringSvg && $(".ring__outer text", ringSvg);
  var innerText = ringSvg && $(".ring__inner text", ringSvg);
  var outerPath = $("#ring-path-outer"), innerPath = $("#ring-path-inner");

  function measure(textEl, str) {
    var probe = document.createElementNS("http://www.w3.org/2000/svg", "text");
    probe.setAttribute("visibility", "hidden");
    probe.textContent = str;
    textEl.parentNode.appendChild(probe);
    var len = probe.getComputedTextLength();
    probe.parentNode.removeChild(probe);
    return len;
  }
  function fillRing(textEl, pathEl, pathId, candidates, used) {
    if (!textEl || !pathEl) return;
    var circumference = pathEl.getTotalLength();
    var pool = candidates.filter(function (q) { return used.indexOf(q) < 0; });
    pool.sort(function (a, b) { return a.text.length - b.text.length; });
    pool.forEach(function (q) { q._len = measure(textEl, q.text); });
    var chosen = [];
    for (var k = Math.min(5, pool.length); k >= 1; k--) {
      var slot = circumference / k;
      var take = pool.slice(0, k);
      var longest = take.reduce(function (m, q) { return Math.max(m, q._len); }, 0);
      if (longest <= slot * 0.86) { chosen = take; break; }
    }
    if (!chosen.length && pool.length) chosen = [pool[0]];
    chosen.forEach(function (q) { used.push(q); });
    textEl.innerHTML = chosen.map(function (q, i) {
      var offset = (i / chosen.length) * 100;
      return '<textPath href="#' + pathId + '" startOffset="' + offset.toFixed(2) + '%">' + esc(q.text) + "</textPath>";
    }).join("");
  }
  function layoutRings() {
    if (!ringSvg || !quotes.length) return;
    var used = [];
    fillRing(innerText, innerPath, "ring-path-inner", quotes, used);
    fillRing(outerText, outerPath, "ring-path-outer", quotes, used);
  }

  var featured = $("#featured"), featuredText = $("#featured-text"), featuredBy = $("#featured-by");
  var qi = 0, qTimer = 0, qVisible = true;
  function showQuote(i, instant) {
    if (!featured || !quotes.length) return;
    var q = quotes[i % quotes.length];
    var swap = function () {
      featuredText.textContent = q.text;
      featuredBy.textContent = q.by || "";
      featured.classList.remove("is-fading");
    };
    if (instant || reduceMotion) { swap(); return; }
    featured.classList.add("is-fading");
    setTimeout(swap, 560);
  }
  function nextQuote() { qi = (qi + 1) % quotes.length; showQuote(qi); armQuotes(); }
  function armQuotes() {
    clearTimeout(qTimer);
    if (!qVisible || quotes.length < 2 || reduceMotion) return;
    qTimer = setTimeout(nextQuote, 9000);
  }
  if (quotes.length) {
    showQuote(0, true);
    var nextBtn = $("#quote-next");
    if (nextBtn) nextBtn.addEventListener("click", nextQuote);
    if (quotes.length < 2 && nextBtn) nextBtn.hidden = true;
    var ringEl = $("#ring");
    if (ringEl && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { qVisible = entries[0].isIntersecting; armQuotes(); }, { threshold: 0.2 }).observe(ringEl);
    } else {
      armQuotes();
    }
    var relayout = 0;
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(layoutRings, layoutRings);
    layoutRings();
    window.addEventListener("resize", function () { clearTimeout(relayout); relayout = setTimeout(layoutRings, 200); });
  }

  /* =========================================================================
     WHAT I BELIEVE — words set like cut-out lettering
     ====================================================================== */
  var words = $("#words");
  if (words && L.values) {
    words.innerHTML = L.values.map(function (w, i) {
      var rot = (((i * 7) % 9) - 4) * 0.6;
      var cls = "word word--" + (w.face || "sans") + (w.big ? " word--big" : "");
      return '<span class="' + cls + '" data-tint="' + esc(w.tint || "") + '" style="--rot:' + rot.toFixed(1) + 'deg">' + esc(w.text) + "</span>";
    }).join("");
  }

  /* =========================================================================
     A SESSION — the steps, in order
     ====================================================================== */
  var steps = $("#steps");
  if (steps && L.steps) {
    steps.innerHTML = L.steps.map(function (s) {
      return '<li class="step"><h3 class="step__name">' + esc(s.name) + '</h3><p class="step__text">' + esc(s.text) + "</p></li>";
    }).join("");
  }

  /* =========================================================================
     KIND WORDS
     ====================================================================== */
  var testimonials = $("#testimonials");
  if (testimonials && L.testimonials) {
    testimonials.innerHTML = L.testimonials.map(function (t, i) {
      var colours = ["var(--gold)", "var(--blush)", "var(--paper)"];
      return '<blockquote class="kind__quote"><p>' + esc(t.text) + "</p>" +
        (t.by ? '<footer><span data-paint="' + colours[i % colours.length] + '">' + esc(t.by) + "</span></footer>" : "") + "</blockquote>";
    }).join("");
  }

  /* =========================================================================
     OFFERINGS AND CONTACT
     ====================================================================== */
  var offerList = $("#offer-list");
  if (offerList && L.offerings) {
    offerList.innerHTML = L.offerings.map(function (o) {
      var subject = encodeURIComponent("Booking: " + o.name);
      var meta = [o.length, o.who].filter(Boolean).join(", ");
      return '<li class="offer"><div><h3 class="offer__name">' + esc(o.name) + "</h3>" +
        (meta ? '<p class="offer__meta">' + esc(meta) + "</p>" : "") + "</div>" +
        '<p class="offer__blurb">' + esc(o.blurb) + "</p>" +
        '<a class="btn btn--paper offer__book" href="mailto:' + esc(L.email || "") + "?subject=" + subject + '">Book</a></li>';
    }).join("");
  }
  var contactLines = $("#contact-lines");
  if (contactLines) {
    var lines = [];
    if (L.email) lines.push('<li><a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></li>");
    if (L.instagram) lines.push('<li><a href="https://instagram.com/' + esc(L.instagram) + '" rel="noopener" target="_blank">Instagram, @' + esc(L.instagram) + "</a></li>");
    if (L.location) lines.push("<li>" + esc(L.location) + "</li>");
    contactLines.innerHTML = lines.join("");
  }

  /* =========================================================================
     A MINUTE OF BREATH — four in, seven held, eight out, three times
     ====================================================================== */
  var breath = $("#breath"), breathBtn = $("#breath-btn"), breathCue = $("#breath-cue");
  if (breath && breathBtn && breathCue) {
    var PHASES = [["in", 4, "Breathe in"], ["hold", 7, "Hold"], ["out", 8, "Breathe out"]];
    var CYCLES = 3, restCue = breathCue.textContent, startLabel = breathBtn.textContent;
    var running = false, timer = 0;
    function setCue(label, n) {
      breathCue.innerHTML = esc(label) + (n != null ? '<span class="breath__count">' + n + "</span>" : "");
    }
    function runPhase(cycle, phase) {
      if (!running) return;
      if (cycle >= CYCLES) { finish("That is a minute. Carry it with you."); return; }
      var p = PHASES[phase], left = p[1];
      breath.className = "breath is-" + p[0];
      setCue(p[2], left);
      var tick = function () {
        if (!running) return;
        left -= 1;
        if (left > 0) { setCue(p[2], left); timer = setTimeout(tick, 1000); }
        else if (phase < PHASES.length - 1) runPhase(cycle, phase + 1);
        else runPhase(cycle + 1, 0);
      };
      timer = setTimeout(tick, 1000);
    }
    function finish(msg) {
      running = false;
      clearTimeout(timer);
      breath.className = "breath";
      breathBtn.textContent = startLabel;
      breathCue.textContent = msg || restCue;
    }
    breathBtn.addEventListener("click", function () {
      if (running) { finish(restCue); return; }
      running = true;
      breathBtn.textContent = "Stop";
      runPhase(0, 0);
    });
  }
})();
