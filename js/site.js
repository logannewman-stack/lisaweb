/* =============================================================================
   LISA BRUNSON — SITE BEHAVIOUR
   Reads js/content.js and brings the page to life:
     - the navigation (tone, menu, current section)
     - the quotes turning around the lotus, and the featured quote
     - the vision board
     - the instruments and the sounds they make (made in the browser)
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
     NAVIGATION
     ====================================================================== */
  var nav = $("#nav"), hero = $("#top"), toggle = $("#nav-toggle");
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
      if (hero) nav.classList.toggle("is-past-hero", hero.getBoundingClientRect().bottom < 90);

      // which ground sits under the bar, and which section fills the screen
      var barY = 36, midY = window.innerHeight * 0.45, current = null;
      for (var i = 0; i < toned.length; i++) {
        var r = toned[i].getBoundingClientRect();
        if (r.top <= barY && r.bottom > barY) {
          document.documentElement.setAttribute("data-tone", toned[i].getAttribute("data-tone"));
          var g = getComputedStyle(toned[i]).backgroundColor;
          if (g && g !== "rgba(0, 0, 0, 0)" && g !== "transparent") nav.style.setProperty("--nav-ground", g);
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
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.forEach(function (a) {
      a.addEventListener("click", function () {
        if (!nav.classList.contains("is-open")) return;
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && nav.classList.contains("is-open")) toggle.click();
    });
  }

  /* =========================================================================
     QUOTES — two rings turning around the lotus, one quote featured at a time
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
      new IntersectionObserver(function (entries) {
        qVisible = entries[0].isIntersecting;
        armQuotes();
      }, { threshold: 0.2 }).observe(ringEl);
    } else {
      armQuotes();
    }
    var relayout = 0;
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(layoutRings, layoutRings);
    layoutRings();
    window.addEventListener("resize", function () {
      clearTimeout(relayout);
      relayout = setTimeout(layoutRings, 200);
    });
  }

  /* =========================================================================
     ON MY WALLS — the quotes that have a photo
     ====================================================================== */
  var walls = $("#walls");
  if (walls) {
    walls.innerHTML = quotes.filter(function (q) { return q.photo; }).map(function (q) {
      return '<figure class="wall"><img src="' + esc(q.photo) + '" alt="' + esc(q.alt || "") + '" loading="lazy">' +
        '<figcaption>' + esc(q.text) + "</figcaption></figure>";
    }).join("");
  }

  /* =========================================================================
     VISION BOARD — the real board, and the words on it
     ====================================================================== */
  var boardPhoto = $("#board-photo"), words = $("#words"), B = L.board || {};
  if (boardPhoto && B.photo) {
    boardPhoto.className = "board-photo taped";
    boardPhoto.innerHTML = '<img src="' + esc(B.photo) + '" alt="' + esc(B.alt || "") + '" loading="lazy">' +
      (B.caption ? "<figcaption>" + esc(B.caption) + "</figcaption>" : "");
  }
  if (words && B.words) {
    words.innerHTML = B.words.map(function (w, i) {
      var rot = (((i * 7) % 9) - 4) * 0.6;
      var cls = "word word--" + (w.face || "sans") + (w.big ? " word--big" : "");
      return '<span class="' + cls + '" data-tint="' + esc(w.tint || "") + '" style="--rot:' + rot.toFixed(1) + 'deg">' + esc(w.text) + "</span>";
    }).join("");
  }

  /* =========================================================================
     HER SPACE
     ====================================================================== */
  var spaceGrid = $("#space-grid");
  if (spaceGrid && L.space) {
    spaceGrid.innerHTML = L.space.map(function (s) {
      var cls = "spot spot--" + (s.shape || "square") + (s.frame === "petal" ? " spot--petal" : "");
      return '<figure class="' + cls + '"><div class="spot__img"><img src="' + esc(s.photo) + '" alt="' + esc(s.alt || "") + '" loading="lazy"></div>' +
        (s.caption ? "<figcaption>" + esc(s.caption) + "</figcaption>" : "") + "</figure>";
    }).join("");
  }

  /* =========================================================================
     THE TATTOO, beside the mark
     ====================================================================== */
  var tattoo = $("#tattoo");
  if (tattoo && L.tattoo && L.tattoo.photo) {
    tattoo.innerHTML = '<img src="' + esc(L.tattoo.photo) + '" alt="' + esc(L.tattoo.alt || "") + '" loading="lazy">' +
      "<figcaption>On her wrist: the crescent, the phases, the eye, the rays of dots.</figcaption>";
  }

  /* =========================================================================
     INSTRUMENTS — drawings, and the sounds they make
     ====================================================================== */
  var oceanDots = "";
  [[38, 58], [46, 64], [56, 61], [63, 67], [42, 70], [52, 72], [60, 74], [48, 78], [35, 66], [66, 58], [55, 55], [44, 56]].forEach(function (d) {
    oceanDots += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="1.7"/>';
  });
  var ART = {
    bowl: '<ellipse cx="50" cy="40" rx="30" ry="9"/><path d="M20 40 C20 62 33 72 50 72 C67 72 80 62 80 40"/><ellipse cx="50" cy="75" rx="13" ry="3" opacity=".6"/><path d="M62 18 L84 32" stroke-width="3"/><circle cx="86" cy="33" r="4" fill="currentColor" stroke="none"/>',
    drum: '<circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="27" opacity=".55"/><path d="M50 16 V84 M16 50 H84 M26 26 L74 74 M74 26 L26 74" opacity=".3"/>',
    rattle: '<ellipse cx="50" cy="34" rx="19" ry="22"/><path d="M50 56 V88 M44 88 H56"/><g fill="currentColor" stroke="none" opacity=".7"><circle cx="43" cy="30" r="1.6"/><circle cx="52" cy="24" r="1.6"/><circle cx="57" cy="36" r="1.6"/><circle cx="47" cy="42" r="1.6"/><circle cx="55" cy="46" r="1.6"/></g>',
    chimes: '<path d="M50 6 V22"/><ellipse cx="50" cy="24" rx="15" ry="4"/><path d="M35 24 V68 M65 24 V68"/><ellipse cx="50" cy="68" rx="15" ry="4"/><path d="M42 30 V70 M50 30 V72 M58 30 V70" opacity=".45"/><path d="M50 72 V90"/><circle cx="50" cy="92" r="2.6" fill="currentColor" stroke="none"/>',
    flute: '<g transform="rotate(-30 50 50)"><rect x="8" y="44" width="84" height="12" rx="6"/><path d="M20 44 V36 H32 V44"/><g fill="currentColor" stroke="none"><circle cx="46" cy="50" r="2.1"/><circle cx="55" cy="50" r="2.1"/><circle cx="64" cy="50" r="2.1"/><circle cx="73" cy="50" r="2.1"/><circle cx="82" cy="50" r="2.1"/></g></g>',
    tingsha: '<circle cx="32" cy="60" r="17"/><circle cx="32" cy="60" r="5"/><circle cx="68" cy="42" r="17"/><circle cx="68" cy="42" r="5"/><path d="M32 43 C32 22 68 16 68 25" opacity=".7"/>',
    ocean: '<circle cx="50" cy="50" r="34"/><path d="M18 56 Q50 72 82 56" opacity=".4"/><g fill="currentColor" stroke="none" opacity=".75">' + oceanDots + "</g>"
  };

  var instrumentsEl = $("#instruments");
  if (instrumentsEl && L.instruments) {
    instrumentsEl.innerHTML = L.instruments.map(function (it, i) {
      var media = it.photo
        ? '<img src="' + esc(it.photo) + '" alt="">'
        : '<svg viewBox="0 0 100 100" aria-hidden="true">' + (ART[it.art] || ART.bowl) + "</svg>";
      return '<button class="instrument" type="button" data-voice="' + esc(it.voice) + '" data-index="' + i + '" aria-label="Hear the ' + esc(it.name.toLowerCase()) + '">' +
        '<span class="stage">' + media + "</span>" +
        '<span><span class="instrument__name">' + esc(it.name) + "</span>" +
        (it.note ? '<span class="instrument__note" style="display:block">' + esc(it.note) + "</span>" : "") +
        '<span class="instrument__hint" style="display:block">Tap to hear</span></span></button>';
    }).join("");
  }

  /* ---- The sound engine: everything is synthesised, no audio files -------- */
  var audio = null, master = null, noiseBuffer = null;
  function ensureAudio() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audio) {
      audio = new AC();
      master = audio.createGain();
      master.gain.value = 0.32;
      var comp = audio.createDynamicsCompressor();
      comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.005; comp.release.value = 0.4;
      master.connect(comp);
      comp.connect(audio.destination);
      var len = audio.sampleRate * 2;
      noiseBuffer = audio.createBuffer(1, len, audio.sampleRate);
      var data = noiseBuffer.getChannelData(0);
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    if (audio.state === "suspended") audio.resume();
    return audio;
  }
  function tone(ac, out, freq, gain, at, attack, decay, type) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(gain, 0.0002), at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    o.connect(g); g.connect(out);
    o.start(at); o.stop(at + attack + decay + 0.05);
    return o;
  }
  function noise(ac, out, at, dur, gain, filterType, freq, q) {
    var src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    src.buffer = noiseBuffer; src.loop = true;
    f.type = filterType; f.frequency.value = freq; f.Q.value = q || 0.8;
    g.gain.setValueAtTime(gain, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(f); f.connect(g); g.connect(out);
    src.start(at); src.stop(at + dur + 0.05);
    return { source: src, filter: f, gain: g };
  }
  function bowl(ac, out, f0, ratios, amps, decay, shimmer) {
    var now = ac.currentTime;
    ratios.forEach(function (r, i) {
      [-1, 1].forEach(function (side) {
        var f = f0 * r * (1 + side * shimmer * (1 + i * 0.6));
        tone(ac, out, f, amps[i] * 0.42, now, 0.015 + i * 0.01, decay * (1 - i * 0.14), "sine");
      });
    });
    noise(ac, out, now, 0.05, 0.12, "bandpass", f0 * 4, 2);
  }
  var VOICES = {
    crystal: function (ac, out) { bowl(ac, out, 528, [1, 2.0, 3.01, 4.2], [1, 0.22, 0.09, 0.03], 10, 0.0018); },
    tibetan: function (ac, out) { bowl(ac, out, 196, [1, 2.71, 5.42, 8.93], [1, 0.55, 0.25, 0.08], 8.5, 0.0035); },
    drum: function (ac, out) {
      var now = ac.currentTime;
      [0, 0.46].forEach(function (dt, i) {
        var at = now + dt, vol = i ? 0.55 : 1;
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(150, at);
        o.frequency.exponentialRampToValueAtTime(46, at + 0.32);
        g.gain.setValueAtTime(0.9 * vol, at);
        g.gain.exponentialRampToValueAtTime(0.0001, at + 0.95);
        o.connect(g); g.connect(out); o.start(at); o.stop(at + 1);
        noise(ac, out, at, 0.13, 0.35 * vol, "lowpass", 520, 0.7);
      });
    },
    rattle: function (ac, out) {
      var now = ac.currentTime;
      for (var i = 0; i < 14; i++) {
        var at = now + i * 0.055 + Math.random() * 0.012;
        noise(ac, out, at, 0.04, 0.5 * (1 - i / 16), "bandpass", 3600 + Math.random() * 800, 1.2);
      }
    },
    chimes: function (ac, out) {
      var now = ac.currentTime, notes = [1318.5, 1567.98, 1760, 2093, 2349.3, 2637];
      for (var i = 0; i < 6; i++) {
        var f = notes[Math.floor(Math.random() * notes.length)], at = now + i * (0.09 + Math.random() * 0.06);
        tone(ac, out, f, 0.22, at, 0.005, 2.8, "sine");
        tone(ac, out, f * 2.76, 0.05, at, 0.005, 1.2, "sine");
      }
    },
    flute: function (ac, out) {
      var now = ac.currentTime, phrase = [[440, 1.1], [523.25, 0.9], [659.25, 1.5]], at = now;
      phrase.forEach(function (n) {
        var f = n[0], dur = n[1];
        var o = ac.createOscillator(), g = ac.createGain(), lfo = ac.createOscillator(), lg = ac.createGain();
        o.type = "sine"; o.frequency.value = f;
        lfo.frequency.value = 5.2; lg.gain.value = 0;
        lg.gain.setValueAtTime(0, at); lg.gain.linearRampToValueAtTime(3.5, at + 0.35);
        lfo.connect(lg); lg.connect(o.frequency);
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(0.28, at + 0.12);
        g.gain.setValueAtTime(0.28, at + dur - 0.25);
        g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        o.connect(g); g.connect(out);
        o.start(at); lfo.start(at); o.stop(at + dur + 0.05); lfo.stop(at + dur + 0.05);
        tone(ac, out, f * 2, 0.07, at, 0.12, dur - 0.12, "sine");
        noise(ac, out, at, dur, 0.035, "bandpass", f * 2.2, 3);
        at += dur - 0.08;
      });
    },
    tingsha: function (ac, out) {
      var now = ac.currentTime;
      [2480, 2492, 6620, 9300].forEach(function (f, i) {
        tone(ac, out, f, [0.3, 0.3, 0.09, 0.04][i], now, 0.004, 4.2 - i * 0.6, "sine");
      });
      noise(ac, out, now, 0.03, 0.15, "highpass", 5000, 1);
    },
    ocean: function (ac, out) {
      var now = ac.currentTime, dur = 5.5;
      var n = noise(ac, out, now, dur, 0.0001, "lowpass", 600, 0.6);
      n.gain.gain.cancelScheduledValues(now);
      n.gain.gain.setValueAtTime(0.0001, now);
      n.gain.gain.exponentialRampToValueAtTime(0.5, now + 1.4);
      n.gain.gain.exponentialRampToValueAtTime(0.08, now + 2.6);
      n.gain.gain.exponentialRampToValueAtTime(0.42, now + 3.8);
      n.gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      n.filter.frequency.setValueAtTime(500, now);
      n.filter.frequency.exponentialRampToValueAtTime(2400, now + 1.4);
      n.filter.frequency.exponentialRampToValueAtTime(400, now + 2.6);
      n.filter.frequency.exponentialRampToValueAtTime(2000, now + 3.8);
      n.filter.frequency.exponentialRampToValueAtTime(300, now + dur);
    }
  };

  if (instrumentsEl) {
    instrumentsEl.addEventListener("click", function (ev) {
      var btn = ev.target.closest(".instrument");
      if (!btn) return;
      var ac = ensureAudio();
      var voice = VOICES[btn.getAttribute("data-voice")] || VOICES.crystal;
      if (ac) voice(ac, master);
      btn.classList.remove("is-playing");
      void btn.offsetWidth; // restart the ripple
      btn.classList.add("is-playing");
      var hint = $(".instrument__hint", btn);
      if (hint) { hint.textContent = ac ? "Playing" : "Sound is not available in this browser"; }
      clearTimeout(btn._t);
      btn._t = setTimeout(function () {
        btn.classList.remove("is-playing");
        if (hint) hint.textContent = "Tap to hear";
      }, 2600);
    });
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
        '<a class="btn offer__book" href="mailto:' + esc(L.email || "") + "?subject=" + subject + '">Book</a></li>';
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
