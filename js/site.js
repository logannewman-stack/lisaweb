/* =============================================================================
   LISA BRUNSON — SITE BEHAVIOUR
   Reads js/content.js and brings the page to life:
     - the header (velvet glass once scrolled, the current section, the menu)
     - her quotes: two drifting lines and one in the middle
     - the litany of what she believes
     - the five session cards, and the rail they become on smaller screens
     - the oils on their shelf, and every link to her shop
     - a minute of breath
     - kind words, one at a time
     - the offerings and the contact lines
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
  function svgUse(id, cls) {
    return '<svg' + (cls ? ' class="' + cls + '"' : "") + ' aria-hidden="true" focusable="false"><use href="#' + id + '"/></svg>';
  }
  function onVisible(el, cb) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { cb(true); return; }
    new IntersectionObserver(function (entries) { cb(entries[0].isIntersecting); }, { threshold: 0.05 }).observe(el);
  }

  /* Colours by name: the jewels, and the chakra names that map to them. */
  var JEWELS = {
    ruby: "var(--ruby)", carnelian: "var(--carnelian)", citrine: "var(--citrine)", emerald: "var(--emerald)",
    sapphire: "var(--sapphire)", amethyst: "var(--amethyst)", moonstone: "var(--moonstone)", blush: "var(--blush)",
    gold: "var(--gold)",
    root: "var(--ruby)", sacral: "var(--carnelian)", solar: "var(--citrine)", heart: "var(--emerald)",
    throat: "var(--sapphire)", third: "var(--amethyst)", crown: "var(--moonstone)", rose: "var(--blush)",
    mint: "var(--emerald)", teal: "var(--sapphire)"
  };
  var CYCLE = ["ruby", "carnelian", "citrine", "emerald", "sapphire", "amethyst", "moonstone"];
  function jewel(name, fallback) { return JEWELS[String(name || "").toLowerCase()] || fallback || "var(--gold)"; }

  /* ---- Small things ------------------------------------------------------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
  var tagline = $("#tagline");
  if (tagline && L.tagline) tagline.textContent = L.tagline;

  /* Every link to her shop, from content.js */
  if (L.shop && L.shop.url) {
    $$("#hero-shop, #menu-shop, #oils-shop, #footer-shop").forEach(function (a) {
      a.href = L.shop.url;
      var label = $(".btn__label", a);
      if (label && L.shop.label) label.textContent = L.shop.label;
    });
  }
  var shopNote = $("#oils-note");
  if (shopNote && L.shop && L.shop.note) shopNote.textContent = L.shop.note;
  var fInsta = $("#footer-instagram"), fEmail = $("#footer-email");
  if (fInsta) { if (L.instagram) fInsta.href = "https://instagram.com/" + encodeURIComponent(L.instagram); else fInsta.hidden = true; }
  if (fEmail) { if (L.email) fEmail.href = "mailto:" + L.email; else fEmail.hidden = true; }

  /* =========================================================================
     HEADER — velvet glass once scrolled; the section you are in; the menu
     ====================================================================== */
  var header = $("#header"), toggle = $("#menu-toggle"), menu = $("#menu");
  var navLinks = $$("#menu .nav__group a");
  var targets = navLinks.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-scrolled", y > 24);
      // the current section is the last one whose top has passed the reading line
      var line = window.innerHeight * 0.4, current = -1, best = -Infinity;
      targets.forEach(function (el, i) {
        if (!el) return;
        var r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > 0 && r.top > best) { best = r.top; current = i; }
      });
      navLinks.forEach(function (a, i) {
        if (i === current) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if (toggle && menu) {
    var outside = $$("main, .footer, .skip");
    var isOpen = function () { return header.classList.contains("is-open"); };
    var focusables = function () {
      return $$("a[href], button", header).filter(function (el) { return el.offsetParent !== null || el === toggle; });
    };
    var openMenu = function () {
      header.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "Close";
      document.documentElement.classList.add("is-menu-open");
      outside.forEach(function (el) { el.setAttribute("inert", ""); });
      var first = navLinks[0];
      if (first) setTimeout(function () { first.focus(); }, 60);
    };
    var closeMenu = function (returnFocus) {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      document.documentElement.classList.remove("is-menu-open");
      outside.forEach(function (el) { el.removeAttribute("inert"); });
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", function () { if (isOpen()) closeMenu(true); else openMenu(); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { if (isOpen()) closeMenu(false); }); });
    document.addEventListener("keydown", function (ev) {
      if (!isOpen()) return;
      if (ev.key === "Escape") { ev.preventDefault(); closeMenu(true); return; }
      if (ev.key === "Tab") {
        var f = focusables(), firstEl = f[0], lastEl = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === firstEl) { ev.preventDefault(); lastEl.focus(); }
        else if (!ev.shiftKey && document.activeElement === lastEl) { ev.preventDefault(); firstEl.focus(); }
      }
    });
    var wide = window.matchMedia("(min-width: 1100px)");
    var onWide = function () { if (wide.matches && isOpen()) closeMenu(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* =========================================================================
     QUOTES — two lines drifting in opposite directions, one in the middle
     ====================================================================== */
  var quotes = (L.quotes || []).filter(function (q) { return q && q.text; });

  function fillMarquee(box, list, speed) {
    if (!box || !list.length) return;
    var track = $(".marquee__track", box);
    var items = list.map(function (q) {
      return '<li class="marquee__item"><span>' + esc(q.text) + "</span>" + svgUse("star4", "marquee__star") + "</li>";
    }).join("");
    var render = function (copies) {
      var once = new Array(copies + 1).join(items);
      track.innerHTML = '<ul class="marquee__list">' + once + '</ul><ul class="marquee__list" aria-hidden="true">' + once + "</ul>";
    };
    var size = function () {
      if (reduceMotion) { render(1); return; }
      var copies = 1;
      render(copies);
      var w = track.firstChild.getBoundingClientRect().width;
      while (w > 0 && w * copies < window.innerWidth * 1.2 && copies < 6) copies++;
      if (copies > 1) render(copies);
      var full = track.firstChild.getBoundingClientRect().width;
      track.style.setProperty("--dur", Math.round(full / speed) + "s");
    };
    size();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
    // phones fire resize as the address bar comes and goes; only a new width matters
    var t = 0, lastW = window.innerWidth;
    window.addEventListener("resize", function () {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(t); t = setTimeout(size, 250);
    });
    onVisible(box, function (on) { box.classList.toggle("is-paused", !on); });
  }
  fillMarquee($("#marquee-a"), quotes.filter(function (q, i) { return i % 2 === 0; }), 34);
  fillMarquee($("#marquee-b"), quotes.filter(function (q, i) { return i % 2 === 1; }), 28);

  var featured = $("#featured"), nextQuoteBtn = $("#quote-next");
  if (featured && quotes.length) {
    featured.innerHTML = quotes.map(function (q, i) {
      return '<figure class="featured__quote' + (q.text.length > 90 ? " is-long" : "") + (i === 0 ? " is-active" : "") + '"' + (i ? ' aria-hidden="true"' : "") + ">" +
        "<blockquote><p>" + esc(q.text) + "</p></blockquote>" +
        (q.by ? '<figcaption class="featured__by">' + esc(q.by) + "</figcaption>" : "") + "</figure>";
    }).join("");
    var fItems = $$(".featured__quote", featured), qi = 0, qTimer = 0, qVisible = false, qHold = false;
    var showQuote = function (i) {
      qi = (i + fItems.length) % fItems.length;
      fItems.forEach(function (el, k) {
        el.classList.toggle("is-active", k === qi);
        if (k === qi) el.removeAttribute("aria-hidden"); else el.setAttribute("aria-hidden", "true");
      });
    };
    var armQuotes = function () {
      clearTimeout(qTimer);
      if (reduceMotion || !qVisible || qHold || document.hidden || fItems.length < 2) return;
      qTimer = setTimeout(function () { featured.setAttribute("aria-live", "off"); showQuote(qi + 1); armQuotes(); }, 9000);
    };
    if (nextQuoteBtn) {
      if (fItems.length < 2) nextQuoteBtn.hidden = true;
      nextQuoteBtn.addEventListener("click", function () { featured.setAttribute("aria-live", "polite"); showQuote(qi + 1); armQuotes(); });
    }
    var fBox = featured.parentNode;
    fBox.addEventListener("mouseenter", function () { qHold = true; armQuotes(); });
    fBox.addEventListener("mouseleave", function () { qHold = false; armQuotes(); });
    fBox.addEventListener("focusin", function () { qHold = true; armQuotes(); });
    fBox.addEventListener("focusout", function () { qHold = false; armQuotes(); });
    document.addEventListener("visibilitychange", armQuotes);
    onVisible(fBox, function (on) { qVisible = on; armQuotes(); });
  }

  /* =========================================================================
     WHAT I BELIEVE — a litany of words, each in a jewel colour
     ====================================================================== */
  var words = $("#words");
  if (words && L.values) {
    var vals = L.values, cyc = 0, prevColour = "";
    words.innerHTML = vals.map(function (w, i) {
      var tint = String(w.tint || "").toLowerCase(), colour, foil = tint === "glitter";
      if (foil) colour = "var(--gold)";
      else if (JEWELS[tint]) colour = JEWELS[tint];
      else {
        var nextTint = vals[i + 1] ? String(vals[i + 1].tint || "").toLowerCase() : "";
        var nextColour = JEWELS[nextTint] || "", guard = 0;
        do { colour = "var(--" + CYCLE[cyc % CYCLE.length] + ")"; cyc++; guard++; }
        while ((colour === prevColour || colour === nextColour) && guard < CYCLE.length);
      }
      prevColour = colour;
      var cls = "litany__word" + (i % 2 ? " is-italic" : "") + (w.big ? " is-big" : "") + (foil ? " is-foil" : "");
      return '<li class="' + cls + '" style="--jewel:' + colour + '">' + (i ? svgUse("star4", "litany__star") : "") +
        '<span class="litany__text">' + esc(w.text) + "</span></li>";
    }).join("");
    // hide the star in front of the first word on each line
    var markLines = function () {
      var items = words.children, prev = null;
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        el.classList.toggle("is-line-start", !prev || el.offsetTop >= prev.offsetTop + prev.offsetHeight - 2);
        prev = el;
      }
    };
    markLines();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(markLines);
    var lt = 0;
    window.addEventListener("resize", function () { clearTimeout(lt); lt = setTimeout(markLines, 120); });
  }

  /* =========================================================================
     A SESSION — five cards, I to V; a rail with buttons on smaller screens
     ====================================================================== */
  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  var rail = $("#steps");
  if (rail && L.steps) {
    var n = L.steps.length;
    rail.innerHTML = L.steps.map(function (s, i) {
      var moon = n > 1 ? Math.round(i * 4 / (n - 1)) : 4;   // new moon to full
      return '<li class="card" style="--jewel:' + jewel(s.jewel, "var(--" + CYCLE[i % CYCLE.length] + ")") + '">' +
        '<span class="card__num" aria-hidden="true">' + (ROMAN[i] || i + 1) + "</span>" +
        '<span class="card__window" aria-hidden="true">' + svgUse("moon-" + moon, "card__moon") + "</span>" +
        '<h3 class="card__title">' + esc(s.name) + "</h3>" +
        '<p class="card__text">' + esc(s.text) + "</p></li>";
    }).join("");

    var controls = $("#deck-controls"), prevBtn = $("#steps-prev"), nextBtn = $("#steps-next");
    var cardStep = function () {
      var card = $(".card", rail);
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
      return card ? card.getBoundingClientRect().width + gap : 300;
    };
    var setDisabled = function (btn, off) {
      if (!btn) return;
      if (off) btn.setAttribute("aria-disabled", "true"); else btn.removeAttribute("aria-disabled");
    };
    var updateRail = function () {
      var max = rail.scrollWidth - rail.clientWidth;
      var scrollable = max > 4;
      if (controls) controls.hidden = !scrollable;
      if (scrollable) rail.setAttribute("tabindex", "0"); else rail.removeAttribute("tabindex");
      setDisabled(prevBtn, rail.scrollLeft <= 4);
      setDisabled(nextBtn, rail.scrollLeft >= max - 4);
    };
    var go = function (dir, btn) {
      if (btn && btn.getAttribute("aria-disabled") === "true") return;
      rail.scrollBy({ left: dir * cardStep(), behavior: reduceMotion ? "auto" : "smooth" });
    };
    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1, prevBtn); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1, nextBtn); });
    var rt = 0;
    rail.addEventListener("scroll", function () { cancelAnimationFrame(rt); rt = requestAnimationFrame(updateRail); }, { passive: true });
    window.addEventListener("resize", updateRail);
    updateRail();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateRail);
  }

  /* =========================================================================
     THE OILS — bottles on a gold shelf, each with a jewel halo
     ====================================================================== */
  var BOTTLE = '<svg class="oil__bottle" viewBox="0 0 60 120" aria-hidden="true" focusable="false">' +
    '<path d="M24.5 4.5h11a2.5 2.5 0 0 1 2.5 2.5v13.5H22V7a2.5 2.5 0 0 1 2.5-2.5Z" style="fill:var(--night);stroke:var(--gold)" stroke-width="1.1"/>' +
    '<path d="M25.5 8.5v8.5M28.5 8.5v8.5M31.5 8.5v8.5M34.5 8.5v8.5" style="stroke:var(--gold)" stroke-opacity=".5" stroke-width=".8"/>' +
    '<rect x="20.5" y="20.5" width="19" height="6.5" rx="1.6" style="fill:var(--gold-deep);stroke:var(--gold)" stroke-width="1"/>' +
    '<path d="M24.5 27h11v3.6c0 2 1.6 3.4 4.2 4.7 4.6 2.3 7.8 5.9 7.8 11.3V106a8 8 0 0 1-8 8H20.5a8 8 0 0 1-8-8V46.6c0-5.4 3.2-9 7.8-11.3 2.6-1.3 4.2-2.7 4.2-4.7Z" fill="url(#glass)" style="stroke:var(--gold)" stroke-width="1.1"/>' +
    '<rect x="16.5" y="55" width="27" height="40" rx="2.2" style="fill:var(--jewel)"/>' +
    '<rect x="18.6" y="57.1" width="22.8" height="35.8" rx="1.3" fill="none" stroke="rgba(255,255,255,.6)" stroke-width=".7"/>' +
    '<path d="M30 63.5c-3 4.6-4.4 6.9-4.4 9.3a4.4 4.4 0 0 0 8.8 0c0-2.4-1.4-4.7-4.4-9.3Z" fill="rgba(255,255,255,.92)"/>' +
    '<path d="M23.5 84.5h13M25.5 88h9" stroke="rgba(255,255,255,.7)" stroke-width="1" stroke-linecap="round"/>' +
    '<path d="M17.4 45v56" stroke="rgba(255,255,255,.3)" stroke-width="1.6" stroke-linecap="round"/>' +
    "</svg>";
  var oilList = $("#oil-list");
  if (oilList && L.oils) {
    oilList.innerHTML = L.oils.map(function (o, i) {
      return '<li class="oil" style="--jewel:' + jewel(o.colour, "var(--" + CYCLE[(i * 2) % CYCLE.length] + ")") + '">' +
        '<span class="oil__halo" aria-hidden="true"></span>' + BOTTLE +
        '<span class="oil__text"><span class="oil__name">' + esc(o.name) + "</span>" +
        (o.note ? '<span class="oil__note">' + esc(o.note) + "</span>" : "") + "</span></li>";
    }).join("");
  }

  /* =========================================================================
     A MINUTE OF BREATH — four in, seven held, eight out, three times
     ====================================================================== */
  var breath = $("#breath"), breathBtn = $("#breath-btn"), breathCue = $("#breath-cue"), breathCount = $("#breath-count");
  if (breath && breathBtn && breathCue && breathCount) {
    var PHASES = [["in", 4, "Breathe in"], ["hold", 7, "Hold"], ["out", 8, "Breathe out"]];
    var CYCLES = 3, restCue = breathCue.textContent, restCount = breathCount.innerHTML, startLabel = breathBtn.textContent;
    var bRunning = false, bTimer = 0;
    var setPhase = function (name) {
      breath.classList.remove("is-in", "is-hold", "is-out");
      if (name) breath.classList.add("is-" + name);
    };
    var finish = function (msg) {
      bRunning = false;
      clearTimeout(bTimer);
      breath.classList.remove("is-running");
      setPhase(null);
      breathBtn.textContent = startLabel;
      breathCount.innerHTML = restCount;
      breathCue.textContent = msg || restCue;
    };
    var runPhase = function (cycle, phase) {
      if (!bRunning) return;
      if (cycle >= CYCLES) { finish("That is a minute. Carry it with you."); return; }
      var p = PHASES[phase], left = p[1];
      setPhase(p[0]);
      breathCue.textContent = p[2];
      breathCount.textContent = String(left);
      var tick = function () {
        if (!bRunning) return;
        left -= 1;
        if (left > 0) { breathCount.textContent = String(left); bTimer = setTimeout(tick, 1000); }
        else if (phase < PHASES.length - 1) runPhase(cycle, phase + 1);
        else runPhase(cycle + 1, 0);
      };
      bTimer = setTimeout(tick, 1000);
    };
    breathBtn.addEventListener("click", function () {
      if (bRunning) { finish(restCue); return; }
      bRunning = true;
      breath.classList.add("is-running");
      breathBtn.textContent = "Stop";
      runPhase(0, 0);
    });
  }

  /* =========================================================================
     KIND WORDS — one at a time, the moon marking which
     ====================================================================== */
  var tStack = $("#testimonials"), T = (L.testimonials || []).filter(function (t) { return t && t.text; });
  if (tStack && T.length) {
    tStack.innerHTML = T.map(function (t, i) {
      return '<figure class="testimonial' + (i === 0 ? " is-active" : "") + '"' + (i ? ' aria-hidden="true"' : "") + ">" +
        "<blockquote><p>" + esc(t.text) + "</p></blockquote>" +
        (t.by ? "<figcaption>" + esc(t.by) + "</figcaption>" : "") + "</figure>";
    }).join("");
    var tItems = $$(".testimonial", tStack), tDots = $("#kind-dots"), tBox = $("#testimonials-box");
    var ti = 0, tTimer = 0, tHold = false, tVisible = false;
    if (tDots) {
      tDots.innerHTML = T.map(function (t, i) {
        return '<button class="phase-btn" type="button" aria-controls="testimonials" aria-label="Kind words ' + (i + 1) + " of " + T.length + '"' +
          (i === 0 ? ' aria-current="true"' : "") + ">" + svgUse("moon-0", "is-new") + svgUse("moon-4", "is-full") + "</button>";
      }).join("");
    }
    var tButtons = $$(".phase-btn", tDots);
    var showT = function (i) {
      ti = (i + tItems.length) % tItems.length;
      tItems.forEach(function (el, k) {
        el.classList.toggle("is-active", k === ti);
        if (k === ti) el.removeAttribute("aria-hidden"); else el.setAttribute("aria-hidden", "true");
      });
      tButtons.forEach(function (b, k) { if (k === ti) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    };
    var armT = function () {
      clearTimeout(tTimer);
      if (reduceMotion || tHold || !tVisible || document.hidden || tItems.length < 2) return;
      tTimer = setTimeout(function () { tStack.setAttribute("aria-live", "off"); showT(ti + 1); armT(); }, 8000);
    };
    var userGo = function (i) { tStack.setAttribute("aria-live", "polite"); showT(i); armT(); };
    var kc = $("#kind-controls");
    if (kc && tItems.length > 1) kc.hidden = false;
    var kp = $("#kind-prev"), kn = $("#kind-next");
    if (kp) kp.addEventListener("click", function () { userGo(ti - 1); });
    if (kn) kn.addEventListener("click", function () { userGo(ti + 1); });
    tButtons.forEach(function (b, k) { b.addEventListener("click", function () { userGo(k); }); });
    if (tBox) {
      tBox.addEventListener("mouseenter", function () { tHold = true; armT(); });
      tBox.addEventListener("mouseleave", function () { tHold = false; armT(); });
      tBox.addEventListener("focusin", function () { tHold = true; armT(); });
      tBox.addEventListener("focusout", function () { tHold = false; armT(); });
    }
    document.addEventListener("visibilitychange", armT);
    onVisible(tBox || tStack, function (on) { tVisible = on; armT(); });
  }

  /* =========================================================================
     WORK WITH ME — the offerings, and the ways to say hello
     ====================================================================== */
  var OFFER_JEWELS = ["var(--ruby)", "var(--sapphire)", "var(--amethyst)"];
  // keep "One-to-one" on one line
  function keepHyphens(text) { return esc(text).replace(/(\S+-\S+)/g, '<span class="nowrap">$1</span>'); }
  var offerList = $("#offer-list");
  if (offerList && L.offerings) {
    offerList.innerHTML = L.offerings.map(function (o, i) {
      var subject = encodeURIComponent("Booking: " + o.name);
      var meta = [o.length, o.who].filter(Boolean).map(function (m) { return "<span>" + esc(m) + "</span>"; });
      return '<li><article class="offer" style="--jewel:' + jewel(o.jewel, OFFER_JEWELS[i % OFFER_JEWELS.length]) + '">' +
        '<span class="offer__gem" aria-hidden="true"></span>' +
        '<h3 class="offer__name"><span>' + keepHyphens(o.name) + "</span></h3>" +
        (meta.length ? '<p class="offer__meta">' + meta.join("") + "</p>" : "") +
        '<p class="offer__blurb">' + esc(o.blurb) + "</p>" +
        '<a class="btn btn--outline offer__book" href="mailto:' + esc(L.email || "") + "?subject=" + subject + '" aria-label="Book: ' + esc(o.name) + '">Book</a>' +
        "</article></li>";
    }).join("");
  }
  var contactLines = $("#contact-lines");
  if (contactLines) {
    var lines = [];
    if (L.email) lines.push("<li>" + svgUse("star4") + '<a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></li>");
    if (L.instagram) lines.push("<li>" + svgUse("star4") + '<a href="https://instagram.com/' + esc(encodeURIComponent(L.instagram)) + '" target="_blank" rel="noopener">Instagram, @' + esc(L.instagram) + '<span class="sr-only"> (opens in a new tab)</span></a></li>');
    if (L.location) lines.push("<li>" + svgUse("star4") + "<span>" + esc(L.location) + "</span></li>");
    contactLines.innerHTML = lines.join("");
  }
})();
