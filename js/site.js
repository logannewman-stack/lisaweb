/* Strands of Grace: site behaviour. No libraries.
   Every page reads completely without this file: it only adds the previews
   of the two open decisions (?ink, ?tagline), the header hairline and
   reading-progress line, the phone menu, the six pearls on About Me, the
   one-at-a-time quotes, the kind-words carousel on phones, the scroll guide,
   the phone booking bar, the back-to-top pearl, the scroll reveals, the
   breathing exercise, the timeline arrows, the offering details, the FAQ
   animation, and the booking form's session cards, validation and sending. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function $(selector, scope) { return (scope || doc).querySelector(selector); }
  function $$(selector, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(selector)); }

  /* run a function at most once per frame, on scroll and resize */
  function onScroll(fn) {
    var ticking = false;
    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; fn(); });
    }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    fn();
  }

  function scrollBehavior() { return reduceMotion.matches ? 'auto' : 'smooth'; }

  /* ---- Previews of the two open decisions -------------------------------
     ?ink=charcoal turns every heading charcoal (the headings all take their
     colour from --heading) and ?ink=plum turns them back to deep plum;
     ?tagline=2 shows the second story line on the home page and ?tagline=1
     the first. The choice is kept in sessionStorage for the rest of the
     visit in that tab. The same few lines run inline in each page's <head>
     so the class is on <html> before the first paint; this copy keeps the
     page right if that snippet is ever removed. Nothing links to these. */
  function applyPreviews() {
    var params = null;
    var store = null;
    try { params = new URLSearchParams(window.location.search); } catch (e) { params = null; }
    try { store = window.sessionStorage; } catch (e) { store = null; }
    function pick(key, allowed) {
      var value = params ? params.get(key) : null;
      if (value && allowed.indexOf(value) > -1) {
        try { if (store) store.setItem('sog-' + key, value); } catch (e) { /* private mode */ }
        return value;
      }
      try { value = store ? store.getItem('sog-' + key) : null; } catch (e) { value = null; }
      return allowed.indexOf(value) > -1 ? value : allowed[0];
    }
    root.classList.toggle('ink-charcoal', pick('ink', ['plum', 'charcoal']) === 'charcoal');
    root.classList.toggle('tagline-2', pick('tagline', ['1', '2']) === '2');
  }
  applyPreviews();

  /* ---- Header: a gold hairline once scrolled, a reading-progress line ---- */
  function initHeader() {
    var header = $('.site-header');
    if (!header) return;
    var line = $('[data-progress-line]', header);

    onScroll(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
      if (!line) return;
      var max = root.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      line.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    });
  }

  /* ---- Phone menu: full-screen overlay, focus trapped while open -------- */
  function initMenu() {
    var toggle = $('[data-menu-toggle]');
    var menu = $('[data-menu]');
    if (!toggle || !menu) return;

    var label = $('[data-menu-label]', toggle);
    var brand = $('.brand');
    var small = window.matchMedia('(max-width: 1099.98px)');
    var outside = $$('body > *').filter(function (el) {
      return !el.contains(menu) && el.tagName !== 'SCRIPT';
    });
    var isOpen = false;

    function focusables() {
      var inMenu = $$('a[href], button:not([disabled])', menu);
      return [brand, toggle].concat(inMenu).filter(Boolean);
    }

    function setOutsideInert(on) {
      outside.forEach(function (el) {
        if (on) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
    }

    function open() {
      isOpen = true;
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      if (label) label.textContent = 'Close';
      root.classList.add('menu-open');
      setOutsideInert(true);
      var first = $('a[href]', menu);
      if (first) first.focus();
    }

    function close(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Menu';
      root.classList.remove('menu-open');
      setOutsideInert(false);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      if (isOpen) close(true);
      else open();
    });

    menu.addEventListener('click', function (event) {
      if (isOpen && event.target.closest('a')) close(false);
    });

    doc.addEventListener('keydown', function (event) {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== 'Tab') return;
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      var active = doc.activeElement;
      if (items.indexOf(active) === -1) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    var onChange = function (event) { if (!event.matches) close(false); };
    if (small.addEventListener) small.addEventListener('change', onChange);
    else if (small.addListener) small.addListener(onChange);
  }

  /* ---- About Me: the six strands of my life, "Six pearls" ---------------
     Six large pearls on a gold strand behave as a tablist: a click, a tap,
     Enter or Space (and, with a mouse, simply resting on a pearl) chooses
     a strand; the arrow keys, Home and End move along the strand; Previous
     and Next walk it too. The chosen pearl lifts and glints and its summary
     shows in the panel below, where a small clasp follows it. Without this
     script all six summaries are listed in order. */
  function initSixPearls() {
    var box = $('[data-six-pearls]');
    if (!box) return;

    var list = $('[data-sp-tabs]', box);
    var tabs = $$('[data-strand]', list);
    var panels = tabs.map(function (tab) { return doc.getElementById(tab.getAttribute('aria-controls')); });
    if (!tabs.length || panels.some(function (p) { return !p; })) return;

    var stage = $('[data-sp-stage]', box);
    var nav = $('[data-sp-nav]', box);
    var prev = $('[data-sp-prev]', box);
    var next = $('[data-sp-next]', box);
    var current = $('[data-sp-current]', box);
    var total = $('[data-sp-total]', box);
    var live = $('[data-sp-live]', box);
    var heading = $('h2', box.closest('section') || doc);
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    var index = -1;
    var hoverTimer = null;

    list.setAttribute('role', 'tablist');
    if (heading && heading.id) list.setAttribute('aria-labelledby', heading.id);
    tabs.forEach(function (tab, i) {
      tab.setAttribute('role', 'tab');
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
    });
    if (nav) nav.hidden = false;
    if (total) total.textContent = String(tabs.length);

    function nameOf(i) {
      var n = $('.sp__name', tabs[i]);
      return n ? n.textContent.trim() : '';
    }

    /* the clasp on the panel's gold rule sits under the chosen pearl */
    function placeClasp() {
      if (!stage || index < 0) return;
      var bead = $('.sp__bead', tabs[index]) || tabs[index];
      var b = bead.getBoundingClientRect();
      var s = stage.getBoundingClientRect();
      stage.style.setProperty('--x', (b.left + b.width / 2 - s.left).toFixed(1) + 'px');
    }

    function glint(tab) {
      if (reduceMotion.matches) return;
      tab.classList.remove('is-glinting');
      void tab.offsetWidth;
      tab.classList.add('is-glinting');
      window.setTimeout(function () { tab.classList.remove('is-glinting'); }, 1000);
    }

    function select(i, opts) {
      opts = opts || {};
      i = (i + tabs.length) % tabs.length;
      if (opts.focus) tabs[i].focus();
      if (i === index) return;
      var first = index < 0;
      index = i;
      tabs.forEach(function (tab, n) {
        tab.setAttribute('aria-selected', n === i ? 'true' : 'false');
        panels[n].classList.toggle('is-current', n === i);
      });
      if (current) current.textContent = String(i + 1);
      placeClasp();
      if (!first) glint(tabs[i]);
      if (opts.announce && live) live.textContent = nameOf(i) + ', ' + (i + 1) + ' of ' + tabs.length;
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i); });
      /* with a mouse, resting on a pearl is enough */
      tab.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse' || !finePointer.matches) return;
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(function () { select(i); }, 110);
      });
      tab.addEventListener('pointerleave', function () { window.clearTimeout(hoverTimer); });
    });

    list.addEventListener('keydown', function (event) {
      var from = tabs.indexOf(doc.activeElement);
      if (from < 0) from = index;
      var to = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') to = from + 1;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') to = from - 1;
      else if (event.key === 'Home') to = 0;
      else if (event.key === 'End') to = tabs.length - 1;
      if (to === null) return;
      event.preventDefault();
      select(to, { focus: true });
    });

    if (prev) prev.addEventListener('click', function () { select(index - 1, { announce: true }); });
    if (next) next.addEventListener('click', function () { select(index + 1, { announce: true }); });

    window.addEventListener('resize', placeClasp);
    if ('ResizeObserver' in window) new ResizeObserver(placeClasp).observe(box);

    /* a light runs along the strand once, when the section first arrives */
    if (!reduceMotion.matches && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          box.classList.add('is-lit');
          io.disconnect();
        });
      }, { threshold: .35 });
      io.observe(list);
    }

    select(0);
  }

  /* ---- Words I keep close: one quote at a time ------------------------- */
  function initQuotes() {
    var list = $('[data-quotes]');
    var nav = $('[data-quote-nav]');
    if (!list || !nav) return;

    var items = $$('.quote', list);
    var prev = $('[data-quote-prev]', nav);
    var next = $('[data-quote-next]', nav);
    var current = $('[data-quote-current]', nav);
    var total = $('[data-quote-total]', nav);
    var live = $('[data-quote-live]');
    var stage = list.parentNode;
    var index = 0;

    list.classList.add('is-ready');
    nav.hidden = false;
    if (total) total.textContent = String(items.length);

    /* the stage is as tall as the quote on show; ease from the old height to the new */
    var settle = null;
    function easeHeight(from) {
      if (settle) window.clearTimeout(settle);
      list.style.height = '';
      if (reduceMotion.matches) return;
      var to = list.offsetHeight;
      if (Math.abs(to - from) < 2) return;
      list.style.height = from + 'px';
      void list.offsetHeight;
      window.requestAnimationFrame(function () { list.style.height = to + 'px'; });
      settle = window.setTimeout(function () { list.style.height = ''; }, 700);
    }
    list.addEventListener('transitionend', function (event) {
      if (event.target === list && event.propertyName === 'height') list.style.height = '';
    });

    function show(i, announce) {
      var from = list.offsetHeight;
      index = (i + items.length) % items.length;
      items.forEach(function (item, n) {
        item.classList.toggle('is-current', n === index);
      });
      if (announce) easeHeight(from);
      if (current) current.textContent = String(index + 1);
      if (announce && live) {
        live.textContent = 'Quote ' + (index + 1) + ' of ' + items.length + ': ' + items[index].textContent.trim();
      }
    }

    prev.addEventListener('click', function () { show(index - 1, true); });
    next.addEventListener('click', function () { show(index + 1, true); });
    nav.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1, true); }
      if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1, true); }
    });

    /* a swipe on touch moves to the next or previous quote */
    var startX = null;
    var startY = null;
    stage.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse') return;
      startX = event.clientX;
      startY = event.clientY;
    });
    stage.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dy) < 60) show(dx < 0 ? index + 1 : index - 1, true);
    });
    stage.addEventListener('pointercancel', function () { startX = null; });

    show(0, false);
  }

  /* ---- Kind words: a swipeable row on phones, with Previous and Next ---- */
  function initKind() {
    var track = $('[data-kind]');
    var nav = $('[data-kind-nav]');
    if (!track || !nav) return;

    var items = $$(':scope > li', track);
    var prev = $('[data-kind-prev]', nav);
    var next = $('[data-kind-next]', nav);
    var small = window.matchMedia('(max-width: 819.98px)');
    var ticking = false;

    function step() {
      return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth;
    }

    function update() {
      ticking = false;
      var max = track.scrollWidth - track.clientWidth;
      var scrolls = small.matches && max > 4;
      nav.hidden = !scrolls;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
    }

    function go(direction) {
      var i = Math.round(track.scrollLeft / step()) + direction;
      i = Math.max(0, Math.min(items.length - 1, i));
      track.scrollTo({ left: items[i].offsetLeft, behavior: scrollBehavior() });
    }

    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('keydown', function (event) {
      if (!small.matches) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    });
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---- The strand that follows the page's sections (every page) -------- */
  function initGuide() {
    var guide = $('[data-guide]');
    var progress = $('[data-progress]');
    if (!guide) return;

    var links = $$('a[href^="#"]', guide);
    var sections = links.map(function (a) { return doc.getElementById(a.getAttribute('href').slice(1)); });
    var pearls = progress ? $$('.pearl', progress) : [];
    var currentIndex = -2;
    var ticking = false;

    if (progress) progress.classList.add('is-tracking');

    function update() {
      ticking = false;
      var line = window.innerHeight * 0.45;
      var idx = -1;
      sections.forEach(function (section, i) {
        if (section && section.getBoundingClientRect().top <= line) idx = i;
      });
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) idx = sections.length - 1;
      if (idx === currentIndex) return;
      currentIndex = idx;
      links.forEach(function (a, i) {
        a.classList.toggle('is-current', i === idx);
        if (i === idx) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
      pearls.forEach(function (pearl, i) {
        pearl.classList.toggle('is-lit', i <= idx);
        pearl.classList.toggle('is-current', i === idx);
      });
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  }

  /* ---- Phone: the Book a session bar, shown past the hero, hidden over
     the booking form and the footer ------------------------------------- */
  function initBookBar() {
    var bar = $('[data-book-bar]');
    if (!bar) return;

    var small = window.matchMedia('(max-width: 819.98px)');
    var hero = $('.hero') || $('.page-hero');
    var blockers = [$('#book'), $('.site-footer')].filter(Boolean);
    var covered = blockers.map(function () { return false; });

    bar.hidden = false;

    function update() {
      var past = window.scrollY > (hero ? hero.offsetTop + hero.offsetHeight - 80 : 240);
      var blocked = covered.some(Boolean);
      var show = small.matches && past && !blocked;
      bar.classList.toggle('is-shown', show);
      root.classList.toggle('has-book-bar', show);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          covered[blockers.indexOf(entry.target)] = entry.isIntersecting;
        });
        update();
      }, { threshold: 0 });
      blockers.forEach(function (el) { io.observe(el); });
    }
    onScroll(update);
  }

  /* ---- Back to top: a pearl that appears after one screen -------------- */
  function initToTop() {
    var button = $('[data-to-top]');
    if (!button) return;

    button.hidden = false;
    onScroll(function () {
      button.classList.toggle('is-shown', window.scrollY > window.innerHeight);
    });
    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      var main = $('#main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    });
  }

  /* ---- Scroll reveal: sections and cards rise once as they arrive ------- */
  function initReveal() {
    var items = $$('[data-reveal], [data-reveal-stagger]');
    if (!items.length) return;

    items.forEach(function (el) {
      if (!el.hasAttribute('data-reveal-stagger')) return;
      Array.prototype.forEach.call(el.children, function (child, i) {
        child.style.setProperty('--n', String(Math.min(i, 9)));
      });
    });

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-instant', 'is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var tall = entry.boundingClientRect.height > window.innerHeight * 0.6;
        if (entry.intersectionRatio < 0.15 && !tall) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: [0, 0.15] });

    var vh = window.innerHeight;
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      /* anything already on screen shows at once; nothing above the fold waits */
      if (r.top < vh && r.bottom > 0) el.classList.add('is-instant', 'is-visible');
      else io.observe(el);
    });
  }

  /* ---- A minute for you: 4-7-8 breathing, three rounds ----------------- */
  function initBreath() {
    var box = $('[data-breath]');
    var toggle = $('[data-breath-toggle]');
    if (!box || !toggle) return;

    var live = $('[data-breath-live]');
    var done = $('[data-breath-done]');
    var roundText = $('[data-round-text]', box);
    var roundPearls = $$('[data-round]', box);
    var PHASES = [
      { key: 'in', name: 'Breathe in', secs: 4 },
      { key: 'hold', name: 'Hold', secs: 7 },
      { key: 'out', name: 'Breathe out', secs: 8 }
    ];
    var ROUNDS = 3;
    var rows = PHASES.map(function (p) { return $('[data-phase-row="' + p.key + '"]', box); });
    var timer = null;
    var round = 0;
    var phase = 0;
    var left = 0;

    toggle.hidden = false;

    function countEl(i) { return rows[i] ? $('.phase__count', rows[i]) : null; }

    function resetRows() {
      rows.forEach(function (row, i) {
        if (!row) return;
        row.classList.remove('is-active');
        var c = countEl(i);
        if (c) c.textContent = String(PHASES[i].secs);
      });
    }

    function showRound() {
      if (roundText) roundText.textContent = timer ? 'Round ' + Math.min(round + 1, ROUNDS) + ' of ' + ROUNDS : 'Three rounds';
      roundPearls.forEach(function (pearl, i) { pearl.classList.toggle('is-done', i < round); });
    }

    function startPhase() {
      var p = PHASES[phase];
      left = p.secs;
      box.setAttribute('data-phase', p.key);
      resetRows();
      if (rows[phase]) rows[phase].classList.add('is-active');
      var c = countEl(phase);
      if (c) c.textContent = String(left);
      if (live) live.textContent = p.name;
      showRound();
    }

    function stopTimer() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function finish() {
      stopTimer();
      box.removeAttribute('data-phase');
      resetRows();
      round = ROUNDS;
      showRound();
      toggle.textContent = 'Begin';
      if (done) done.hidden = false;
      if (live && done) live.textContent = done.textContent.trim();
    }

    function tick() {
      left -= 1;
      if (left > 0) {
        var c = countEl(phase);
        if (c) c.textContent = String(left);
        return;
      }
      phase += 1;
      if (phase === PHASES.length) {
        phase = 0;
        round += 1;
        if (round >= ROUNDS) { finish(); return; }
      }
      startPhase();
    }

    function start() {
      stopTimer();
      round = 0;
      phase = 0;
      if (done) done.hidden = true;
      toggle.textContent = 'Stop';
      timer = window.setInterval(tick, 1000);
      startPhase();
    }

    function stop() {
      stopTimer();
      box.removeAttribute('data-phase');
      resetRows();
      round = 0;
      showRound();
      toggle.textContent = 'Begin';
      if (live) live.textContent = '';
    }

    toggle.addEventListener('click', function () {
      if (timer) stop();
      else start();
    });

    showRound();
  }

  /* ---- Our story: timeline arrows, only when the strand overflows ------- */
  function initTimeline() {
    var track = $('[data-timeline]');
    var controls = $('[data-timeline-controls]');
    if (!track || !controls) return;

    var prev = $('[data-timeline-prev]', controls);
    var next = $('[data-timeline-next]', controls);
    var ticking = false;

    function stepSize() {
      var item = $('.tl-item', track);
      return item ? item.getBoundingClientRect().width : track.clientWidth * 0.8;
    }

    function update() {
      ticking = false;
      var max = track.scrollWidth - track.clientWidth;
      var scrolls = max > 4 && window.getComputedStyle(track).overflowX !== 'visible';
      controls.hidden = !scrolls;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
    }

    function go(direction) {
      track.scrollBy({ left: direction * stepSize(), behavior: scrollBehavior() });
    }

    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    update();
  }

  /* ---- Details: the offering notes open on wide screens, the FAQ animates */
  function initDetails() {
    var wide = window.matchMedia('(min-width: 900px)');
    if (wide.matches) {
      $$('details[data-know]').forEach(function (d) { d.open = true; });
    }

    $$('details[data-faq]').forEach(function (d) {
      var summary = $('summary', d);
      var body = $('.faq__a', d);
      if (!summary || !body || typeof body.animate !== 'function') return;
      var running = null;

      summary.addEventListener('click', function (event) {
        if (reduceMotion.matches) return;   /* the native toggle, at once */
        event.preventDefault();
        if (running) running.cancel();
        body.style.overflow = 'hidden';
        if (d.open) {
          var from = body.offsetHeight;
          running = body.animate(
            [{ height: from + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
            { duration: 220, easing: 'ease-out' }
          );
          running.onfinish = function () { d.open = false; body.style.overflow = ''; running = null; };
        } else {
          /* one open at a time */
          $$('details[data-faq][open]').forEach(function (other) { if (other !== d) other.open = false; });
          d.open = true;
          var to = body.offsetHeight;
          running = body.animate(
            [{ height: '0px', opacity: 0 }, { height: to + 'px', opacity: 1 }],
            { duration: 260, easing: 'ease-out' }
          );
          running.onfinish = function () { body.style.overflow = ''; running = null; };
        }
      });
    });
  }

  /* ---- Booking form: session cards, ?session= preselect, inline
     validation, a growing message box, sending, and the pre-launch guard -- */
  function initBooking() {
    var form = $('[data-booking-form]');
    if (!form) return;

    var select = $('#f-session', form);
    var radios = $$('[data-session-radio]', form);
    var status = $('[data-form-status]', form);
    var fields = $('[data-form-fields]', form);
    var success = $('[data-form-success]', form);
    var nextSteps = $('[data-next-steps]');
    var submit = $('[data-form-submit]', form);
    var textarea = $('#f-message', form);
    var honeypot = $('[name="website"]', form);
    var wanted = null;
    try { wanted = new URLSearchParams(window.location.search).get('session'); } catch (e) { wanted = null; }

    var MESSAGES = {
      sending: 'Sending...',
      error: 'Something went wrong and your message was not sent. Please try again, or ',
      errorLink: 'email me directly',
      errorEnd: '.',
      guard: 'The booking form will be switched on before launch, so this message was not sent.'
    };

    /* the cards take over from the select, which stays as the no-script fallback */
    function syncFromCards() {
      var checked = radios.filter(function (r) { return r.checked; })[0];
      if (checked && select) select.value = checked.value;
    }
    function syncToCards() {
      if (!select) return;
      radios.forEach(function (r) { r.checked = r.value === select.value; });
    }
    if (radios.length && select) {
      radios.forEach(function (r) {
        r.name = 'session';
        r.addEventListener('change', syncFromCards);
      });
      select.disabled = true;
      syncToCards();
    }

    if (select && wanted) {
      var match = $$('option', select).some(function (option) { return option.value === wanted; });
      if (match) {
        select.value = wanted;
        syncToCards();
      }
    }

    /* inline validation: the browser decides, the page explains */
    form.noValidate = true;
    var inputs = ['f-name', 'f-email', 'f-message'].map(function (id) { return $('#' + id, form); }).filter(Boolean);

    function validate(input, show) {
      var ok = input.validity.valid;
      var field = input.closest('.field');
      var message = $('[data-error-for="' + input.id + '"]', form);
      if (ok) {
        input.removeAttribute('aria-invalid');
        if (message) message.textContent = '';
        if (field) field.classList.remove('is-invalid');
      } else if (show) {
        input.setAttribute('aria-invalid', 'true');
        if (message) message.textContent = input.getAttribute('data-error') || 'Please check this field.';
        if (field) field.classList.add('is-invalid');
      }
      return ok;
    }

    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { validate(input, true); });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid')) validate(input, true);
      });
    });

    /* the message box grows with its content, up to a sensible height */
    if (textarea) {
      var MAX = 520;
      var grow = function () {
        textarea.style.height = 'auto';
        var wanted = textarea.scrollHeight + 1;
        textarea.style.height = Math.min(wanted, MAX) + 'px';
        textarea.style.overflowY = wanted > MAX ? 'auto' : 'hidden';
      };
      textarea.addEventListener('input', grow);
      grow();
    }

    function setSending(on) {
      if (!submit) return;
      submit.disabled = on;
      submit.textContent = on ? MESSAGES.sending : 'Send';
    }

    /* the error ends with "email me directly" as a mailto link to Lisa */
    var EMAIL = 'lisa@mystrandsofgrace.com';
    function showError() {
      if (!status) return;
      status.textContent = '';
      var link = doc.createElement('a');
      link.className = 'inline-link';
      link.href = 'mailto:' + EMAIL;
      link.textContent = MESSAGES.errorLink;
      status.appendChild(doc.createTextNode(MESSAGES.error));
      status.appendChild(link);
      status.appendChild(doc.createTextNode(MESSAGES.errorEnd));
    }

    function showSuccess() {
      if (fields) fields.hidden = true;
      if (nextSteps) nextSteps.hidden = true;
      if (status) status.textContent = '';
      if (success) {
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus({ preventScroll: false });
      }
    }

    form.addEventListener('submit', function (event) {
      var invalid = inputs.filter(function (input) { return !validate(input, true); });
      if (invalid.length) {
        event.preventDefault();
        invalid[0].focus();
        return;
      }

      var action = form.getAttribute('action') || '';
      if (action.indexOf('your-form-id') !== -1) {
        event.preventDefault();
        if (!status) return;
        status.textContent = '';
        window.setTimeout(function () { status.textContent = MESSAGES.guard; }, 60);
        return;
      }

      if (typeof window.fetch !== 'function' || typeof window.FormData !== 'function') return;   /* plain submit */
      event.preventDefault();
      if (honeypot && honeypot.value) { showSuccess(); return; }

      if (status) status.textContent = '';
      setSending(true);
      window.fetch(action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error(String(response.status));
          setSending(false);
          showSuccess();
        })
        .catch(function () {
          setSending(false);
          showError();
        });
    });
  }

  function init() {
    initHeader();
    initMenu();
    initSixPearls();
    initQuotes();
    initKind();
    initGuide();
    initBookBar();
    initToTop();
    initReveal();
    initBreath();
    initTimeline();
    initDetails();
    initBooking();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
