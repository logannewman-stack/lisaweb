/* ==========================================================================
   Strands of Grace: site behaviour. No libraries.
   Every page reads completely without this file; it only adds:
    1. the frosted header and the reading-progress line
    2. the phone menu (focus trapped)
    3. the quote carousel, and the kind-words carousel on phones
    4. the 4-7-8 breathing exercise
    5. the phone booking bar and the back-to-top pearl
    6. scroll-reveal (sections and cards rise in once, never under reduced motion)
    7. the FAQ accordion (animated open and close, one open at a time)
    8. the growing message box
    9. the booking form: session cards and ?session=, validation, sending
   10. the gold strand on the story timeline
   11. the six strands of my life: the tree of life and its summaries
   12. on Stay Connected, "Book a session" scrolls to the form in place
   The two previews (?ink=charcoal|plum and ?tagline=1|2) are applied by the
   small script in each page's <head>, before anything paints.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var slice = function (list) { return Array.prototype.slice.call(list); };
  var behavior = function () { return reduceMotion.matches ? 'auto' : 'smooth'; };

  /* Everything that reacts to scrolling shares one frame. */
  var onScroll = [];
  var ticking = false;
  var runScroll = function () {
    ticking = false;
    onScroll.forEach(function (fn) { fn(); });
  };
  var scheduleScroll = function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(runScroll); }
  };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);

  /* 1. Header: a frosted ivory backdrop once scrolled, and a thin gold line
        along its bottom edge that grows with the reading progress -------------- */
  var header = document.querySelector('[data-header]');
  var progress = document.querySelector('[data-progress]');
  if (header) {
    onScroll.push(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (progress) {
        var max = root.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      }
    });
  }

  /* 2. Phone menu: full-screen overlay, focus trapped while open ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var label = toggle.querySelector('.menu-toggle__label');
    var desktop = window.matchMedia('(min-width: 68em)');
    var outside = [document.querySelector('.skip-link'), document.getElementById('main'), document.querySelector('.site-footer'), document.querySelector('[data-phone-bar]'), document.querySelector('[data-to-top]')];
    toggle.hidden = false;

    var isOpen = function () { return toggle.getAttribute('aria-expanded') === 'true'; };
    var focusables = function () {
      return [toggle].concat(slice(nav.querySelectorAll('a[href], button:not([disabled])')));
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

  /* A swipe on touch: calls back with -1 (next) or 1 (previous). */
  var onSwipe = function (el, fn) {
    var x0 = null, y0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      x0 = y0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) fn(dx < 0 ? -1 : 1);
    }, { passive: true });
  };

  /* 3. Words I keep close: one quote at a time, previous and next, arrow keys
        and swipe; nothing advances on its own ---------------------------------- */
  slice(document.querySelectorAll('[data-quotes]')).forEach(function (box) {
    var items = slice(box.querySelectorAll('.quotes__item'));
    var controls = box.querySelector('[data-quotes-controls]');
    var next = box.querySelector('[data-quotes-next]');
    var prev = box.querySelector('[data-quotes-prev]');
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
    var show = function (n) {
      items[index].classList.remove('is-current');
      index = (n + items.length) % items.length;
      items[index].classList.add('is-current');
      if (current) current.textContent = index + 1;
      live.textContent = 'Quote ' + (index + 1) + ' of ' + items.length + ': ' + items[index].textContent.trim();
    };
    next.addEventListener('click', function () { show(index + 1); });
    if (prev) prev.addEventListener('click', function () { show(index - 1); });
    box.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    });
    onSwipe(box, function (dir) { show(index - dir); });
  });

  /* Kind words: on phones the three cards sit in a snapping track with
        previous and next; on wide screens all three show and the controls hide. */
  var kind = document.querySelector('[data-kind]');
  if (kind) {
    var track = kind.querySelector('[data-kind-track]');
    var kindControls = kind.querySelector('[data-kind-controls]');
    var kindPrev = kind.querySelector('[data-kind-prev]');
    var kindNext = kind.querySelector('[data-kind-next]');
    if (track && kindControls) {
      kindControls.hidden = false;
      track.setAttribute('tabindex', '0');
      var cards = slice(track.children);
      var step = function (dir) {
        var w = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
        track.scrollBy({ left: dir * w, behavior: behavior() });
      };
      if (kindPrev) kindPrev.addEventListener('click', function () { step(-1); });
      if (kindNext) kindNext.addEventListener('click', function () { step(1); });
      track.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
        else if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
      });
    }
  }

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

  /* 5. The phone booking bar and the back-to-top pearl -------------------- */
  var bar = document.querySelector('[data-phone-bar]');
  var toTop = document.querySelector('[data-to-top]');
  if (bar || toTop) {
    var phone = window.matchMedia('(max-width: 47.99em)');
    var hero = document.querySelector('main > section:first-of-type');
    var book = document.getElementById('book');
    var siteFooter = document.querySelector('.site-footer');
    var bookOnScreen = false;
    var footerOnScreen = false;
    var updateBars = function () {
      var y = window.scrollY;
      var pastHero = hero ? y > hero.offsetTop + hero.offsetHeight - 120 : y > window.innerHeight;
      if (bar) {
        bar.hidden = false;
        root.classList.toggle('has-phone-bar', phone.matches);
        bar.classList.toggle('is-visible', phone.matches && pastHero && !bookOnScreen && !footerOnScreen);
      }
      if (toTop) {
        toTop.hidden = false;
        toTop.classList.toggle('is-visible', y > window.innerHeight);
      }
    };
    if ('IntersectionObserver' in window) {
      var watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === book) bookOnScreen = entry.isIntersecting;
          if (entry.target === siteFooter) footerOnScreen = entry.isIntersecting;
        });
        updateBars();
      }, { threshold: 0 });
      if (book) watcher.observe(book);
      if (siteFooter) watcher.observe(siteFooter);
    }
    onScroll.push(updateBars);
    updateBars();
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: behavior() });
        var main = document.getElementById('main');
        if (main) main.focus({ preventScroll: true });
      });
    }
  }

  /* 6. Scroll-reveal: sections and cards rise 14px and fade in once, with a
        stagger inside card rows and timelines. Anything already on screen when
        the page opens is left alone, and nothing moves under reduced motion. --- */
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    var targets = slice(document.querySelectorAll('[data-reveal]'));
    slice(document.querySelectorAll('[data-reveal-children]')).forEach(function (group) {
      slice(group.children).forEach(function (child, i) {
        child.style.setProperty('--i', i);
        targets.push(child);
      });
    });
    var fold = window.innerHeight * 0.92;
    var pending = targets.filter(function (el) { return el.getBoundingClientRect().top > fold; });
    pending.forEach(function (el) { el.classList.add('reveal'); });
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -4% 0px' });
    pending.forEach(function (el) { revealer.observe(el); });
  }

  /* 7. Good to know: the accordion opens and closes with a soft height
        animation, one answer at a time; under reduced motion it is native. ---- */
  slice(document.querySelectorAll('[data-accordion]')).forEach(function (list) {
    var items = slice(list.querySelectorAll('details'));
    var settle = function (body, after) {
      var done = function () {
        body.style.height = '';
        body.style.overflow = '';
        body.style.transition = '';
        body.removeEventListener('transitionend', done);
        if (after) after();
      };
      body.addEventListener('transitionend', done);
    };
    var open = function (d) {
      var body = d.querySelector('[data-accordion-body]');
      d.open = true;
      var h = body.scrollHeight;
      body.style.height = '0px';
      body.style.overflow = 'hidden';
      settle(body);
      window.requestAnimationFrame(function () {
        body.style.transition = 'height 0.32s cubic-bezier(0.22, 0.61, 0.36, 1)';
        body.style.height = h + 'px';
      });
    };
    var close = function (d) {
      var body = d.querySelector('[data-accordion-body]');
      body.style.height = body.scrollHeight + 'px';
      body.style.overflow = 'hidden';
      settle(body, function () { d.open = false; });
      window.requestAnimationFrame(function () {
        body.style.transition = 'height 0.26s cubic-bezier(0.22, 0.61, 0.36, 1)';
        body.style.height = '0px';
      });
    };
    items.forEach(function (d) {
      var summary = d.querySelector('summary');
      if (!summary || !d.querySelector('[data-accordion-body]')) return;
      summary.addEventListener('click', function (event) {
        if (reduceMotion.matches) {
          items.forEach(function (o) { if (o !== d) o.open = false; });
          return;
        }
        event.preventDefault();
        if (d.open) { close(d); return; }
        items.forEach(function (o) { if (o !== d && o.open) close(o); });
        open(d);
      });
    });
  });

  /* 8. The message box grows with what is written, up to a sensible height. */
  slice(document.querySelectorAll('textarea[data-grow]')).forEach(function (area) {
    var MAX = 420;
    var grow = function () {
      area.style.height = 'auto';
      var h = Math.min(area.scrollHeight + 2, MAX);
      area.style.height = h + 'px';
      area.style.overflowY = area.scrollHeight + 2 > MAX ? 'auto' : 'hidden';
    };
    area.addEventListener('input', grow);
    grow();
  });

  /* 9. Booking: the session cards, ?session=, gentle validation, sending ---- */
  var form = document.querySelector('[data-booking]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var radios = slice(form.querySelectorAll('input[name="session"]'));
    var first = document.getElementById('f-session');

    /* The card group answers like the select it replaced (options and
       selectedIndex), for anything that reads #f-session the old way. */
    if (first && radios.length) {
      var labelOf = function (r) {
        var l = r.closest('label') || form.querySelector('label[for="' + r.id + '"]');
        return l ? l.textContent.trim() : r.value;
      };
      try {
        Object.defineProperty(first, 'options', { get: function () {
          return radios.map(function (r) { return { value: r.value, text: labelOf(r) }; });
        } });
        Object.defineProperty(first, 'selectedIndex', { get: function () {
          var found = 0;
          radios.forEach(function (r, n) { if (r.checked) found = n; });
          return found;
        } });
      } catch (e) { /* older engines: nothing depends on it */ }
    }

    var pick = function (key) {
      var match = null;
      radios.forEach(function (r) { if (r.getAttribute('data-session') === key) match = r; });
      if (match) match.checked = true;
      return match;
    };
    var applySession = function () {
      var key = new URLSearchParams(window.location.search).get('session');
      return key ? !!pick(key) : false;
    };
    applySession();
    window.addEventListener('popstate', applySession);

    /* Gentle validation: the browser's checks, our words, shown under the field
       once it has been visited, and for every field on submit. */
    var messages = {
      'f-name': 'Please add your name.',
      'f-email': 'Please add an email address I can reply to.',
      'f-message': 'Please add a short message.'
    };
    var fields = Object.keys(messages).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    form.noValidate = true;
    var check = function (field, force) {
      var ok = field.validity.valid;
      var box = document.getElementById(field.id + '-error');
      var wrap = field.closest('.field');
      var show = !ok && (force || field.getAttribute('data-touched') === '1');
      if (box) box.textContent = show ? messages[field.id] : '';
      if (show) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
      if (wrap) wrap.classList.toggle('is-invalid', show);
      return ok;
    };
    fields.forEach(function (field) {
      field.addEventListener('blur', function () { field.setAttribute('data-touched', '1'); check(field); });
      field.addEventListener('input', function () { if (field.getAttribute('data-touched') === '1') check(field); });
    });

    var submit = form.querySelector('[type="submit"]');
    var sendLabel = submit ? submit.textContent : 'Send';
    var setSending = function (on) {
      if (submit) { submit.disabled = on; submit.textContent = on ? 'Sending...' : sendLabel; }
      form.classList.toggle('is-sending', on);
    };
    var success = form.querySelector('[data-form-success]');
    var showSuccess = function () {
      setSending(false);
      status.textContent = '';
      form.classList.add('is-sent');
      if (success) { success.hidden = false; success.focus(); }
    };

    form.addEventListener('submit', function (event) {
      var valid = fields.map(function (field) { return check(field, true); }).every(Boolean);
      if (!valid) {
        event.preventDefault();
        var firstBad = null;
        fields.forEach(function (field) { if (!firstBad && !field.validity.valid) firstBad = field; });
        if (firstBad) firstBad.focus();
        return;
      }
      event.preventDefault();
      status.textContent = '';
      if ((form.getAttribute('action') || '').indexOf('your-form-id') !== -1) {
        window.setTimeout(function () {
          status.textContent = 'The booking form will be switched on before launch, so this message was not sent.';
        }, 60);
        return;
      }
      var data = new window.FormData(form);
      if (data.get('website')) { showSuccess(); return; }   /* the honeypot: not a person */
      data.delete('website');
      setSending(true);
      window.fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (res) { if (!res.ok) throw new Error(String(res.status)); showSuccess(); })
        .catch(function () {
          setSending(false);
          /* The error offers her email address as a way round. */
          status.textContent = 'Something went wrong and your message was not sent. Please try again, ';
          var direct = document.createElement('a');
          direct.href = 'mailto:lisa@mystrandsofgrace.com';
          direct.textContent = 'or email me directly';
          status.appendChild(direct);
          status.appendChild(document.createTextNode('.'));
        });
    });

    /* The Book buttons on this page choose the session without a reload. */
    slice(document.querySelectorAll('a[href*="?session="]')).forEach(function (link) {
      link.addEventListener('click', function (event) {
        var url = new URL(link.href, window.location.href);
        if (url.pathname !== window.location.pathname || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        window.history.pushState(null, '', url.search + url.hash);
        var chosen = pick(url.searchParams.get('session'));
        var target = document.getElementById('book');
        /* Focus first: moving focus would cut a smooth scroll short. */
        if (chosen) chosen.focus({ preventScroll: true });
        if (target) target.scrollIntoView({ behavior: behavior(), block: 'start' });
      });
    });
  }

  /* 10. Our Story: a gold strand that meanders through each year's pearl --- */
  var timeline = document.querySelector('[data-timeline]');
  if (timeline) {
    var strand = timeline.querySelector('[data-timeline-strand]');
    var path = strand && strand.querySelector('path');
    var nodes = slice(timeline.querySelectorAll('[data-node]'));
    var wide = window.matchMedia('(min-width: 56em)');
    var round1 = function (n) { return Math.round(n * 10) / 10; };
    /* Layout positions, not screen ones, so the reveal's lift never bends the strand. */
    var within = function (el) {
      var x = 0, y = 0;
      while (el && el !== timeline) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
      return [x, y];
    };

    var draw = function () {
      if (!path || nodes.length < 2) return;
      var w = timeline.offsetWidth;
      var h = timeline.offsetHeight;
      strand.setAttribute('viewBox', '0 0 ' + round1(w) + ' ' + round1(h));
      var pts = nodes.map(function (node) {
        var o = within(node);
        return [round1(o[0] + node.offsetWidth / 2), round1(o[1] + node.offsetHeight / 2)];
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

  /* 11. The six strands of my life, in one of three templates Lisa is
        choosing between: the tree of life (the default, and the markup without
        JavaScript), arches (cards that turn over) and pearls (a tablist on a
        gold strand). ?strands=arches|pearls|tree sets the class on <html>; the
        chosen template is swapped in from its <template>, so only one is ever
        on the page.
        Tree and pearls: each strand shows its summary in the panel, on hover
        after a short pause (passing over a node changes nothing), tap, click,
        Enter or Space. Arrow keys move along the strands, Home and End jump to
        the first and last, Escape returns to the resting state, My Roots.
        Arches: a card turns over on hover, focus, tap, Enter or Space, one at
        a time; Escape or a tap on its back turns it back. ------------------- */
  var strandsSection = document.getElementById('six-strands');
  if (strandsSection) {
    var wanted = root.classList.contains('strands-arches') ? 'arches' : root.classList.contains('strands-pearls') ? 'pearls' : 'tree';
    var liveVariant = strandsSection.querySelector('[data-strands]');
    var chosen = strandsSection.querySelector('template[data-strands-template="' + wanted + '"]');
    if (liveVariant && chosen && liveVariant.getAttribute('data-strands') !== wanted) {
      var resting = document.createElement('template');
      resting.setAttribute('data-strands-template', liveVariant.getAttribute('data-strands'));
      liveVariant.parentNode.insertBefore(resting, liveVariant);
      resting.content.appendChild(liveVariant);
      chosen.parentNode.replaceChild(document.importNode(chosen.content, true), chosen);
    }
  }
  var strandsBox = document.querySelector('[data-strands]');
  var variant = strandsBox ? strandsBox.getAttribute('data-strands') : null;
  var strandNodes = strandsBox ? slice(strandsBox.querySelectorAll('button[data-strand]')) : [];
  var summaries = strandsBox ? slice(strandsBox.querySelectorAll('[data-strand-summary]')) : [];
  var ripple = function (el) {
    if (reduceMotion.matches) return;
    el.classList.remove('is-ripple');
    void el.offsetWidth;   /* restart the animation */
    el.classList.add('is-ripple');
  };

  if ((variant === 'tree' || variant === 'pearls') && strandNodes.length && summaries.length) {
    var strandPanel = strandsBox.querySelector('[data-strand-panel]');
    var stateAttr = variant === 'pearls' ? 'aria-selected' : 'aria-expanded';
    var countNow = strandsBox.querySelector('[data-pearls-current]');
    var pearlControls = strandsBox.querySelector('[data-pearls-controls]');
    var currentIndex = -1;
    var hoverTimer = null;
    var lastPointer = 'mouse';
    var selectStrand = function (index, withRipple) {
      if (index === currentIndex) return;
      currentIndex = index;
      var key = strandNodes[index].getAttribute('data-strand');
      strandNodes.forEach(function (n, k) { n.setAttribute(stateAttr, k === index ? 'true' : 'false'); });
      summaries.forEach(function (sum) { sum.classList.toggle('is-current', sum.getAttribute('data-strand-summary') === key); });
      if (countNow) countNow.textContent = index + 1;
      if (withRipple) ripple(strandNodes[index]);
    };
    /* On a phone the panel sits under the strands: if a tap opens a summary
       that is entirely below the screen, bring its top into view. */
    var showPanel = function () {
      var top = strandPanel.getBoundingClientRect().top;
      if (top > window.innerHeight - 90) window.scrollBy({ top: top - window.innerHeight + 260, behavior: behavior() });
    };
    strandPanel.classList.add('is-enhanced');
    strandPanel.setAttribute('aria-live', 'polite');
    if (pearlControls) pearlControls.hidden = false;
    selectStrand(0, false);
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { strandPanel.classList.add('is-animated'); });
    });

    strandNodes.forEach(function (node, i) {
      node.addEventListener('pointerdown', function (event) { lastPointer = event.pointerType || 'mouse'; });
      node.addEventListener('click', function () {
        window.clearTimeout(hoverTimer);
        selectStrand(i, true);
        if (lastPointer === 'touch') showPanel();
        lastPointer = 'mouse';
      });
      node.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse') return;
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(function () { selectStrand(i, true); }, 120);
      });
      node.addEventListener('pointerleave', function () { window.clearTimeout(hoverTimer); });
      node.addEventListener('keydown', function (event) {
        var n = strandNodes.length;
        var to = null;
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight') to = (i + 1) % n;
        else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') to = (i - 1 + n) % n;
        else if (event.key === 'Home') to = 0;
        else if (event.key === 'End') to = n - 1;
        if (to === null) return;
        event.preventDefault();
        strandNodes[to].focus();
        selectStrand(to, true);
      });
    });
    var step = function (dir) { selectStrand((currentIndex + dir + strandNodes.length) % strandNodes.length, true); };
    var prevStrand = strandsBox.querySelector('[data-pearls-prev]');
    var nextStrand = strandsBox.querySelector('[data-pearls-next]');
    if (prevStrand) prevStrand.addEventListener('click', function () { step(-1); });
    if (nextStrand) nextStrand.addEventListener('click', function () { step(1); });
    strandsBox.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || currentIndex === 0) return;
      var inside = strandsBox.contains(document.activeElement);
      selectStrand(0, false);
      if (inside) strandNodes[0].focus();
    });
  }

  if (variant === 'arches' && strandNodes.length) {
    var arches = strandNodes.map(function (button) { return button.closest('.arch'); });
    var openArch = null;
    var archTimer = null;
    var quietFocus = false;
    var setArch = function (arch, open) {
      if (!arch) return;
      arch.classList.toggle('is-open', open);
      arch.querySelector('[data-strand]').setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) ripple(arch);
    };
    var openOne = function (arch) {
      if (openArch === arch) return;
      if (openArch) setArch(openArch, false);
      openArch = arch;
      setArch(arch, true);
    };
    var closeOne = function (arch) {
      if (openArch !== arch) return;
      setArch(arch, false);
      openArch = null;
    };
    strandsBox.classList.add('is-enhanced');
    arches.forEach(function (arch, i) {
      var button = strandNodes[i];
      var back = arch.querySelector('[data-strand-summary]');
      button.addEventListener('click', function () { window.clearTimeout(archTimer); openOne(arch); });
      button.addEventListener('focus', function () { if (!quietFocus) openOne(arch); });
      arch.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse') return;
        window.clearTimeout(archTimer);
        archTimer = window.setTimeout(function () { openOne(arch); }, 110);
      });
      arch.addEventListener('pointerleave', function (event) {
        if (event.pointerType !== 'mouse') return;
        window.clearTimeout(archTimer);
        if (!arch.contains(document.activeElement)) closeOne(arch);
      });
      /* A tap or click on the back of a turned card (not on its link) turns it back. */
      back.addEventListener('click', function (event) {
        if (event.target.closest('a')) return;
        closeOne(arch);
      });
      arch.addEventListener('keydown', function (event) {
        var n = arches.length;
        var to = null;
        if (event.key === 'Escape' && openArch === arch) {
          event.preventDefault();
          closeOne(arch);
          quietFocus = true;
          button.focus();
          quietFocus = false;
          return;
        }
        if (event.target !== button) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') to = (i + 1) % n;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') to = (i - 1 + n) % n;
        if (to === null) return;
        event.preventDefault();
        strandNodes[to].focus();
      });
    });
  }

  /* 12. On Stay Connected the booking form is on this page: "Book a session"
        (the header button and the phone bar) scrolls to it without a reload,
        keeping any ?session= choice. -------------------------------------- */
  var bookHere = document.getElementById('book');
  if (bookHere && document.querySelector('[data-booking]')) {
    slice(document.querySelectorAll('a[href$="connect.html#book"]')).forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        if (window.location.hash !== '#book') window.history.pushState(null, '', '#book');
        bookHere.scrollIntoView({ behavior: behavior(), block: 'start' });
      });
    });
  }
})();

/*
  Sparkles never sit on words. The sky's stars are placed by percentage, so as
  copy changes length (Lisa's own words will replace the placeholders) a star
  can land on a heading or a line of text. After fonts load, after the
  entrance settles and on every resize, any star that touches text in its own
  section is hidden; the rest stay.
*/
(function () {
  "use strict";
  var stars = [].slice.call(document.querySelectorAll(".sky__star"));
  if (!stars.length || !document.createRange) return;

  function touchesText(star) {
    var s = star.getBoundingClientRect();
    if (!s.width || !s.height) return false;
    var scope = star.closest("section, footer, .hero") || document.body;
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    var range = document.createRange();
    for (var node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim()) continue;
      var el = node.parentElement;
      if (!el || el.closest("svg, template, [hidden]")) continue;
      range.selectNodeContents(node);
      var rects = range.getClientRects();
      for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (r.width < 1) continue;
        if (s.left < r.right - 1 && s.right > r.left + 1 && s.top < r.bottom - 1 && s.bottom > r.top + 1) return true;
      }
    }
    return false;
  }

  function settle() {
    stars.forEach(function (star) { star.style.visibility = ""; });
    stars.forEach(function (star) { if (touchesText(star)) star.style.visibility = "hidden"; });
  }

  var timer = 0;
  function later(ms) { window.clearTimeout(timer); timer = window.setTimeout(settle, ms); }

  settle();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  window.addEventListener("load", function () { later(1800); });
  window.addEventListener("resize", function () { later(200); });
})();
