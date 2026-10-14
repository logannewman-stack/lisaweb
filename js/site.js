/* ==========================================================================
   Strands of Grace: site behaviour. No libraries.
   Every page reads completely without this file; it only adds:
   1. the frosted header once scrolled   4. the 4-7-8 breathing exercise
   2. the phone menu (focus trapped)     5. the booking form guard and ?session=
   3. quotes one at a time               6. the gold strand on the story timeline
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. Header: a frosted ivory backdrop once the page is scrolled -------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var ticking = false;
    var updateHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    updateHeader();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateHeader); }
    }, { passive: true });
  }

  /* 2. Phone menu: full-screen overlay, focus trapped while open ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var label = toggle.querySelector('.menu-toggle__label');
    var desktop = window.matchMedia('(min-width: 68em)');
    var outside = [document.querySelector('.skip-link'), document.getElementById('main'), document.querySelector('.site-footer')];
    toggle.hidden = false;

    var isOpen = function () { return toggle.getAttribute('aria-expanded') === 'true'; };
    var focusables = function () {
      return [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll('a[href], button:not([disabled])')));
    };
    var onKey = function (event) {
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); return; }
      if (event.key !== 'Tab') return;
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      var index = items.indexOf(document.activeElement);
      if (index === -1) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && index === 0) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); first.focus(); }
    };
    var openMenu = function () {
      root.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      label.textContent = 'Close';
      outside.forEach(function (el) { if (el) el.inert = true; });
      document.addEventListener('keydown', onKey);
      var firstLink = nav.querySelector('a[href]');
      window.requestAnimationFrame(function () { if (firstLink) firstLink.focus(); });
    };
    var closeMenu = function (returnFocus) {
      root.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      label.textContent = 'Menu';
      outside.forEach(function (el) { if (el) el.inert = false; });
      document.removeEventListener('keydown', onKey);
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () {
      if (isOpen()) closeMenu(true); else openMenu();
    });
    nav.addEventListener('click', function (event) {
      if (isOpen() && event.target.closest('a')) closeMenu(false);
    });
    var onBreakpoint = function (event) { if (event.matches && isOpen()) closeMenu(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* 3. Quotes: one at a time, with a Next quote control ------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-quotes]'), function (box) {
    var items = Array.prototype.slice.call(box.querySelectorAll('.quotes__item'));
    var controls = box.querySelector('[data-quotes-controls]');
    var next = box.querySelector('[data-quotes-next]');
    var current = box.querySelector('[data-quotes-current]');
    var total = box.querySelector('[data-quotes-total]');
    var live = box.querySelector('[data-quotes-live]');
    if (items.length < 2 || !next) return;
    var index = 0;
    box.classList.add('is-enhanced');
    controls.hidden = false;
    if (total) total.textContent = items.length;
    items.forEach(function (item, n) { item.classList.toggle('is-current', n === 0); });
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { box.classList.add('is-animated'); });
    });
    next.addEventListener('click', function () {
      items[index].classList.remove('is-current');
      index = (index + 1) % items.length;
      items[index].classList.add('is-current');
      if (current) current.textContent = index + 1;
      live.textContent = 'Quote ' + (index + 1) + ' of ' + items.length + ': ' + items[index].textContent.trim();
    });
  });

  /* 4. A minute for you: breathe in 4, hold 7, out 8, three rounds -------- */
  var breathe = document.querySelector('[data-breathe]');
  if (breathe) {
    var button = breathe.querySelector('[data-breathe-toggle]');
    var cue = breathe.querySelector('[data-breathe-cue]');
    var count = breathe.querySelector('[data-breathe-count]');
    var bloom = breathe.querySelector('[data-breathe-bloom]');
    var pearls = breathe.querySelectorAll('[data-breathe-rounds] .pearl');
    var restText = count.textContent;
    var phases = [
      { name: 'in', label: 'Breathe in', seconds: 4 },
      { name: 'hold', label: 'Hold', seconds: 7 },
      { name: 'out', label: 'Breathe out', seconds: 8 }
    ];
    var ROUNDS = 3;
    var timer = null;
    var running = false;

    button.hidden = false;

    var setPhase = function (phase) {
      bloom.style.setProperty('--phase-dur', phase.seconds + 's');
      breathe.setAttribute('data-phase', phase.name);
      cue.textContent = phase.label;
    };
    var markRounds = function (done) {
      Array.prototype.forEach.call(pearls, function (pearl, n) { pearl.classList.toggle('is-done', n < done); });
    };
    var stop = function (finished) {
      window.clearTimeout(timer);
      running = false;
      button.textContent = 'Begin';
      bloom.classList.remove('is-running');
      breathe.setAttribute('data-phase', finished ? 'done' : 'rest');
      count.textContent = restText;
      count.classList.add('breathe__count--rest');
      cue.textContent = finished ? 'That was a minute just for you. Carry it with you.' : '';
      if (!finished) markRounds(0);
    };
    var start = function () {
      running = true;
      button.textContent = 'Stop';
      bloom.classList.add('is-running');
      count.classList.remove('breathe__count--rest');
      markRounds(0);
      var round = 0;
      var phase = 0;
      var left = phases[0].seconds;
      var ticks = 0;
      var t0 = Date.now();
      setPhase(phases[0]);
      count.textContent = left;
      var tick = function () {
        ticks += 1;
        left -= 1;
        if (left === 0) {
          phase += 1;
          if (phase === phases.length) {
            phase = 0;
            round += 1;
            markRounds(round);
            if (round === ROUNDS) { stop(true); return; }
          }
          left = phases[phase].seconds;
          setPhase(phases[phase]);
        }
        count.textContent = left;
        timer = window.setTimeout(tick, Math.max(0, t0 + (ticks + 1) * 1000 - Date.now()));
      };
      timer = window.setTimeout(tick, 1000);
    };
    button.addEventListener('click', function () {
      if (running) stop(false); else start();
    });
  }

  /* 5. Booking: preselect the session from ?session=, and guard the form -- */
  var form = document.querySelector('[data-booking]');
  if (form) {
    var select = form.querySelector('#f-session');
    var status = form.querySelector('[data-form-status]');
    var applySession = function () {
      var key = new URLSearchParams(window.location.search).get('session');
      if (!key || !select) return false;
      var match = Array.prototype.find.call(select.options, function (option) { return option.getAttribute('data-session') === key; });
      if (match) select.value = match.value;
      return !!match;
    };
    applySession();
    window.addEventListener('popstate', applySession);

    form.addEventListener('submit', function (event) {
      if ((form.getAttribute('action') || '').indexOf('your-form-id') !== -1) {
        event.preventDefault();
        status.textContent = '';
        window.setTimeout(function () {
          status.textContent = 'The booking form will be switched on before launch, so this message was not sent.';
        }, 60);
      }
    });

    /* The Book buttons on this page choose the session without a reload. */
    Array.prototype.forEach.call(document.querySelectorAll('a[href*="?session="]'), function (link) {
      link.addEventListener('click', function (event) {
        var url = new URL(link.href, window.location.href);
        if (url.pathname !== window.location.pathname || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        window.history.pushState(null, '', url.search + url.hash);
        applySession();
        var target = document.getElementById('book');
        if (target) target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
        if (select) select.focus({ preventScroll: true });
      });
    });
  }

  /* 6. Our Story: a gold strand that meanders through each year's pearl --- */
  var timeline = document.querySelector('[data-timeline]');
  if (timeline) {
    var strand = timeline.querySelector('[data-timeline-strand]');
    var path = strand && strand.querySelector('path');
    var nodes = Array.prototype.slice.call(timeline.querySelectorAll('[data-node]'));
    var wide = window.matchMedia('(min-width: 56em)');
    var round1 = function (n) { return Math.round(n * 10) / 10; };

    var draw = function () {
      if (!path || nodes.length < 2) return;
      var box = timeline.getBoundingClientRect();
      var w = box.width;
      var h = box.height;
      strand.setAttribute('viewBox', '0 0 ' + round1(w) + ' ' + round1(h));
      var pts = nodes.map(function (node) {
        var r = node.getBoundingClientRect();
        return [round1(r.left + r.width / 2 - box.left), round1(r.top + r.height / 2 - box.top)];
      });
      if (!wide.matches) {
        /* Phones: the straight CSS strand through every pearl is enough. */
        path.setAttribute('d', '');
        timeline.classList.remove('has-curve');
        return;
      }
      /* Desktop: the strand starts at the first pearl and, between one year
         and the next, sways out into the empty side. Each pearl shares one
         handle length, so the curve passes through it without a kink. */
      var sway = Math.min(w * 0.22, 300);
      var gaps = [];
      for (var g = 0; g < pts.length - 1; g += 1) gaps.push(pts[g + 1][1] - pts[g][1]);
      var handle = pts.map(function (p, j) {
        var before = j > 0 ? gaps[j - 1] : gaps[0];
        var after = j < gaps.length ? gaps[j] : gaps[gaps.length - 1];
        return Math.min(before, after) * 0.42;
      });
      var d = 'M' + pts[0][0] + ' ' + pts[0][1];
      var side = 1;
      for (var i = 0; i < pts.length - 1; i += 1) {
        var a = pts[i];
        var b = pts[i + 1];
        side = i % 2 === 0 ? 1 : -1;
        d += 'C' + round1(a[0] + sway * side) + ' ' + round1(a[1] + handle[i]) + ' ' +
          round1(b[0] + sway * side) + ' ' + round1(b[1] - handle[i + 1]) + ' ' + b[0] + ' ' + b[1];
      }
      /* A short tail below the last pearl, continuing the same direction. */
      var last = pts[pts.length - 1];
      var tail = Math.max(h - last[1], 40);
      var lead = Math.min(handle[pts.length - 1], tail) * 0.6;
      d += 'C' + round1(last[0] - sway * side * 0.6) + ' ' + round1(last[1] + lead) + ' ' +
        last[0] + ' ' + round1(last[1] + tail * 0.55) + ' ' + last[0] + ' ' + round1(last[1] + tail);
      path.setAttribute('d', d);
      timeline.classList.add('has-curve');
    };

    draw();
    if ('ResizeObserver' in window) new window.ResizeObserver(draw).observe(timeline);
    else window.addEventListener('resize', draw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  }
})();
