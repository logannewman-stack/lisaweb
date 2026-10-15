/* Strands of Grace: site behaviour. No libraries.
   Every page reads completely without this file: it only adds the header
   hairline on scroll, the phone menu, the one-at-a-time quotes, the home
   scroll guide, the breathing exercise, the timeline arrows and the booking
   form guard. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function $(selector, scope) { return (scope || doc).querySelector(selector); }
  function $$(selector, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(selector)); }

  /* ---- Header: a gold hairline once the page has scrolled --------------- */
  function initHeader() {
    var header = $('.site-header');
    if (!header) return;
    var ticking = false;

    function update() {
      ticking = false;
      header.classList.toggle('is-scrolled', window.scrollY > 4);
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ---- Phone menu: full-screen overlay, focus trapped while open -------- */
  function initMenu() {
    var toggle = $('[data-menu-toggle]');
    var menu = $('[data-menu]');
    if (!toggle || !menu) return;

    var label = $('[data-menu-label]', toggle);
    var brand = $('.brand');
    var small = window.matchMedia('(max-width: 1023.98px)');
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

    show(0, false);
  }

  /* ---- Home: the strand that follows the seven sections ---------------- */
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
      track.scrollBy({ left: direction * stepSize(), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
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

  /* ---- Booking form: ?session= preselect and the pre-launch guard ------- */
  function initBooking() {
    var form = $('[data-booking-form]');
    if (!form) return;

    var select = $('#f-session', form);
    var status = $('[data-form-status]', form);
    var wanted = null;
    try { wanted = new URLSearchParams(window.location.search).get('session'); } catch (e) { wanted = null; }

    if (select && wanted) {
      var match = $$('option', select).some(function (option) { return option.value === wanted; });
      if (match) select.value = wanted;
    }

    form.addEventListener('submit', function (event) {
      var action = form.getAttribute('action') || '';
      if (action.indexOf('your-form-id') === -1) return;
      event.preventDefault();
      if (!status) return;
      status.textContent = '';
      window.setTimeout(function () {
        status.textContent = 'The booking form will be switched on before launch, so this message was not sent.';
      }, 60);
    });
  }

  function init() {
    initHeader();
    initMenu();
    initQuotes();
    initGuide();
    initBreath();
    initTimeline();
    initBooking();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
