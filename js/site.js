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
  var GROUND = {
    top: "var(--night)", quotes: "var(--dusk)", story: "var(--dusk)",
    vision: "var(--kraft)", sound: "var(--mist)", cleansing: "var(--mist)", mark: "var(--mist)",
    offerings: "var(--morning)", contact: "var(--morning)"
  };
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
          var g = GROUND[toned[i].id];
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
    for (var k = Math.min(4, pool.length); k >= 1; k--) {
      var slot = circumference / k;
      var take = pool.slice(0, k);
      var longest = take.reduce(function (m, q) { return Math.max(m, q._len); }, 0);
      if (longest <= slot * 0.8) { chosen = take; break; }
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
     VISION BOARD
     ====================================================================== */
  var motifCount = 0;
  var MOTIFS = {
    sunrise: function (id) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6AEB4"/><stop offset=".6" stop-color="#F2DCC6"/><stop offset=".6" stop-color="#B9C9C2"/><stop offset="1" stop-color="#93A9A4"/></linearGradient></defs>' +
        '<rect width="100" height="100" fill="url(#' + id + ')"/><circle cx="50" cy="60" r="15" fill="#E2AE63" opacity=".92"/><rect x="0" y="60" width="100" height="40" fill="#9FB4AE" opacity=".6"/>' +
        '<path d="M8 70 H38 M54 70 H92 M18 80 H60 M70 80 H88 M30 90 H72" stroke="#F3F5EE" stroke-width="1" opacity=".8"/>';
    },
    mountains: function (id) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9EEE5"/><stop offset="1" stop-color="#C5D0C2"/></linearGradient></defs>' +
        '<rect width="100" height="100" fill="url(#' + id + ')"/><circle cx="76" cy="22" r="7" fill="#F3F5EE"/>' +
        '<path d="M0 78 L22 46 L38 64 L56 34 L74 58 L88 44 L100 62 V100 H0 Z" fill="#6F8874" opacity=".85"/>' +
        '<path d="M0 88 L18 70 L34 84 L50 66 L70 86 L84 74 L100 84 V100 H0 Z" fill="#4F6552"/>';
    },
    bowls: function (id) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3F5EE"/><stop offset="1" stop-color="#E8DBC5"/></linearGradient></defs>' +
        '<rect width="100" height="100" fill="url(#' + id + ')"/><g fill="none" stroke="#8A6A3A" stroke-width="1.2">' +
        '<circle cx="34" cy="40" r="20"/><circle cx="34" cy="40" r="13" opacity=".55"/><circle cx="70" cy="62" r="17"/><circle cx="70" cy="62" r="10" opacity=".55"/><circle cx="40" cy="80" r="12"/><circle cx="40" cy="80" r="6" opacity=".55"/></g>';
    },
    garden: function (id) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#DCE5D8"/><stop offset="1" stop-color="#F3F5EE"/></linearGradient></defs>' +
        '<rect width="100" height="100" fill="url(#' + id + ')"/><g fill="none" stroke="#4F6552" stroke-width="1.4" stroke-linecap="round">' +
        '<path d="M50 94 C50 60 50 40 50 18"/><path d="M50 76 C36 74 28 64 26 52 C40 54 48 62 50 76 Z"/><path d="M50 60 C64 58 72 48 74 36 C60 38 52 46 50 60 Z"/><path d="M50 44 C38 42 30 34 28 24 C40 26 48 32 50 44 Z"/><path d="M50 30 C58 28 64 22 66 14 C58 16 52 22 50 30 Z"/></g>';
    },
    circle: function (id) {
      var dots = "";
      for (var i = 0; i < 10; i++) {
        var a = (i / 10) * Math.PI * 2;
        dots += '<circle cx="' + (50 + Math.cos(a) * 21).toFixed(1) + '" cy="' + (50 + Math.sin(a) * 21).toFixed(1) + '" r="3.4"/>';
      }
      return '<rect width="100" height="100" fill="#E8DBC5"/><g fill="#A8606F" opacity=".9">' + dots + '</g><circle cx="50" cy="50" r="5" fill="none" stroke="#7F571B" stroke-width="1.2"/>';
    },
    moon: function (id) {
      return '<defs><radialGradient id="' + id + '" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#4A3556"/><stop offset="1" stop-color="#1C1A33"/></radialGradient></defs>' +
        '<rect width="100" height="100" fill="url(#' + id + ')"/><circle cx="50" cy="38" r="15" fill="#F2ECE2"/>' +
        '<g fill="#F2ECE2" opacity=".7"><circle cx="18" cy="20" r="1"/><circle cx="82" cy="26" r="1.3"/><circle cx="72" cy="70" r="1"/><circle cx="26" cy="74" r="1.2"/><circle cx="88" cy="56" r=".8"/></g>';
    },
    water: function (id) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D8D6"/><stop offset="1" stop-color="#8FAAA9"/></linearGradient></defs>' +
        '<rect width="100" height="100" fill="url(#' + id + ')"/><g fill="none" stroke="#F3F5EE" stroke-width="1" opacity=".9">' +
        '<ellipse cx="50" cy="58" rx="9" ry="3.5"/><ellipse cx="50" cy="58" rx="21" ry="8.5"/><ellipse cx="50" cy="58" rx="35" ry="14.5"/><ellipse cx="50" cy="58" rx="50" ry="21"/></g>';
    }
  };
  function motifSvg(name) {
    var fn = MOTIFS[name] || MOTIFS.sunrise;
    var id = "m" + (++motifCount);
    return '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + fn(id) + "</svg>";
  }

  var board = $("#board");
  if (board && L.board) {
    board.innerHTML = L.board.map(function (item, i) {
      var cls = "pin pin--" + item.type + (item.w > 1 ? " pin--wide" : "") + (item.h > 1 ? " pin--tall" : "");
      var style = "--rot:" + (item.rot || 0) + "deg;--tape:" + (((i * 7) % 9) - 4) + "deg";
      if (item.type === "image") {
        var media = item.src
          ? '<img src="' + esc(item.src) + '" alt="' + esc(item.caption || "") + '" loading="lazy">'
          : motifSvg(item.motif);
        return '<figure class="' + cls + '" style="' + style + '"><div class="pin__img">' + media + "</div>" +
          (item.caption ? '<figcaption class="pin__caption">' + esc(item.caption) + "</figcaption>" : "") + "</figure>";
      }
      return '<div class="' + cls + '" style="' + style + '">' + esc(item.text) + "</div>";
    }).join("");
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
