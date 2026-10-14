/*
  Strands of Grace, option A "Classic grace": behaviour. No libraries.
  Every page reads completely without this file; it only adds:
   1. the header that condenses into a slim bar once scrolled
   2. the phone menu (focus stays inside while open; Escape closes it)
   3. "Words I keep close": one quote at a time with a Next quote button
   4. "Kind words": one at a time with previous and next buttons
   5. "What I believe": hides the pearl that would start a wrapped line
   6. the 4-7-8 breathing exercise
   7. the booking form guard and the ?session= preselect
*/
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktop = window.matchMedia("(min-width: 960px)");

  /* 1. Header ------------------------------------------------------------ */
  var header = document.querySelector("[data-header]");
  var bar = header && header.querySelector(".site-header__bar");
  var heroLogo = document.querySelector(".hero__logo");

  if (header && bar) {
    var condensed = false;
    var brandShown = false;
    var ticking = false;
    var mastheadHeight = 0;
    var brandAt = 0;

    var measure = function () {
      if (!condensed) {
        mastheadHeight = bar.getBoundingClientRect().height;
        header.style.setProperty("--masthead-h", mastheadHeight + "px");
      }
      brandAt = heroLogo
        ? heroLogo.getBoundingClientRect().bottom + window.scrollY - bar.offsetHeight
        : 0;
    };

    var update = function () {
      ticking = false;
      var y = window.scrollY;
      // on desktop the bar appears once the masthead has gone; on phones the
      // bar is always there and only gains a hairline once the page moves
      var limit = desktop.matches ? mastheadHeight : 8;
      var shouldCondense = condensed ? y > limit - 48 : y > limit;
      if (shouldCondense !== condensed) {
        condensed = shouldCondense;
        header.classList.toggle("is-condensed", condensed);
      }
      var shouldShowBrand = y > brandAt;
      if (shouldShowBrand !== brandShown) {
        brandShown = shouldShowBrand;
        header.classList.toggle("show-brand", brandShown);
      }
    };

    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      measure();
      update();
    });
    window.addEventListener("load", function () {
      measure();
      update();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        measure();
        update();
      });
    }
  }

  /* 2. Phone menu -------------------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("site-nav");

  if (toggle && nav && header) {
    var label = toggle.querySelector("[data-menu-label]");
    var outside = [
      document.querySelector(".skip-link"),
      document.querySelector("main"),
      document.querySelector(".site-footer")
    ].filter(Boolean);

    var isOpen = function () {
      return toggle.getAttribute("aria-expanded") === "true";
    };

    var focusables = function () {
      return Array.prototype.filter.call(
        header.querySelectorAll("a[href], button:not([disabled])"),
        function (el) {
          return el.offsetWidth > 0 || el.offsetHeight > 0;
        }
      );
    };

    var setOpen = function (open, returnFocus) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? "Close" : "Menu";
      document.body.classList.toggle("menu-open", open);
      outside.forEach(function (el) {
        if (open) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
      if (open) {
        var first = nav.querySelector("a[href]");
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", function () {
      setOpen(!isOpen(), false);
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false, true);
        return;
      }
      if (event.key !== "Tab") return;
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !header.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !header.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (isOpen() && event.target.closest("a")) setOpen(false, false);
    });

    var closeOnDesktop = function () {
      if (desktop.matches && isOpen()) setOpen(false, false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", closeOnDesktop);
    else if (desktop.addListener) desktop.addListener(closeOnDesktop);
  }

  /* 3. Words I keep close ------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll("[data-quotes]"), function (box) {
    var items = box.querySelectorAll(".quotes__item");
    var next = box.querySelector("[data-quote-next]");
    var index = box.querySelector("[data-quote-index]");
    var live = box.querySelector("[data-quote-live]");
    if (!items.length || !next) return;
    var current = 0;

    next.addEventListener("click", function () {
      items[current].classList.remove("is-current");
      current = (current + 1) % items.length;
      items[current].classList.add("is-current");
      if (index) index.textContent = String(current + 1);
      if (live) {
        live.textContent = "Quote " + (current + 1) + " of " + items.length + ": " + items[current].textContent.trim();
      }
    });
  });

  /* 4. Kind words -------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-carousel]"), function (box) {
    var items = box.querySelectorAll(".kind__item");
    var prev = box.querySelector("[data-prev]");
    var next = box.querySelector("[data-next]");
    var index = box.querySelector("[data-index]");
    var live = box.querySelector("[data-live]");
    if (!items.length || !prev || !next) return;
    var current = 0;

    var show = function (n) {
      items[current].classList.remove("is-current");
      current = (n + items.length) % items.length;
      items[current].classList.add("is-current");
      if (index) index.textContent = String(current + 1);
      if (live) {
        live.textContent = (current + 1) + " of " + items.length + ": " + items[current].textContent.replace(/\s+/g, " ").trim();
      }
    };

    prev.addEventListener("click", function () {
      show(current - 1);
    });
    next.addEventListener("click", function () {
      show(current + 1);
    });
  });

  /* 5. What I believe: no pearl at the start of a wrapped line ------------ */
  var words = document.querySelector("[data-words]");
  if (words) {
    var markLineStarts = function () {
      var top = null;
      Array.prototype.forEach.call(words.children, function (item) {
        var y = item.offsetTop;
        item.classList.toggle("is-line-start", top === null || y > top + 4);
        top = y;
      });
    };
    markLineStarts();
    if ("ResizeObserver" in window) new ResizeObserver(markLineStarts).observe(words);
    else window.addEventListener("resize", markLineStarts);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(markLineStarts);
  }

  /* 6. A minute for you: breathe in for 4, hold for 7, out for 8, 3 rounds */
  var circle = document.querySelector("[data-breathe]");
  var breatheButton = document.querySelector("[data-breathe-toggle]");

  if (circle && breatheButton) {
    var cue = circle.querySelector("[data-breathe-cue]");
    var count = circle.querySelector("[data-breathe-count]");
    var round = circle.querySelector("[data-breathe-round]");
    var message = document.querySelector("[data-breathe-message]");
    var restingCount = count ? count.innerHTML : "";
    var PHASES = [
      { key: "in", cue: "Breathe in", seconds: 4 },
      { key: "hold", cue: "Hold", seconds: 7 },
      { key: "out", cue: "Breathe out", seconds: 8 }
    ];
    var ROUNDS = 3;
    var timer = null;
    var running = false;

    var stop = function (finished) {
      window.clearTimeout(timer);
      running = false;
      circle.removeAttribute("data-phase");
      circle.style.removeProperty("--phase-dur");
      breatheButton.textContent = "Begin";
      if (cue) cue.textContent = "";
      if (count) count.innerHTML = restingCount;
      if (round) round.textContent = "";
      if (message) message.textContent = finished ? "That was a minute just for you. Carry it with you." : "";
    };

    var tick = function (roundNumber, phaseIndex, secondsLeft) {
      var phase = PHASES[phaseIndex];
      if (secondsLeft === phase.seconds) {
        circle.style.setProperty("--phase-dur", phase.key === "hold" ? "0.4s" : phase.seconds + "s");
        circle.setAttribute("data-phase", phase.key);
        if (cue) cue.textContent = phase.cue;
        if (round) round.textContent = "Round " + roundNumber + " of " + ROUNDS;
      }
      if (count) count.textContent = String(secondsLeft);
      timer = window.setTimeout(function () {
        if (secondsLeft > 1) {
          tick(roundNumber, phaseIndex, secondsLeft - 1);
        } else if (phaseIndex < PHASES.length - 1) {
          tick(roundNumber, phaseIndex + 1, PHASES[phaseIndex + 1].seconds);
        } else if (roundNumber < ROUNDS) {
          tick(roundNumber + 1, 0, PHASES[0].seconds);
        } else {
          stop(true);
        }
      }, 1000);
    };

    breatheButton.addEventListener("click", function () {
      if (running) {
        stop(false);
        return;
      }
      running = true;
      breatheButton.textContent = "Stop";
      if (message) message.textContent = "";
      tick(1, 0, PHASES[0].seconds);
    });
  }

  /* 7. Booking form: the guard, and the session chosen from the address --- */
  var form = document.querySelector("[data-booking-form]");
  var sessionSelect = document.getElementById("f-session");

  var chooseSession = function (key) {
    if (!sessionSelect || !key) return false;
    var option = sessionSelect.querySelector('option[data-session="' + key + '"]');
    if (!option) return false;
    sessionSelect.value = option.value;
    return true;
  };

  if (sessionSelect) {
    try {
      chooseSession(new URLSearchParams(window.location.search).get("session"));
    } catch (error) {
      /* an old browser without URLSearchParams keeps the default choice */
    }

    // Book buttons on this page choose the session without reloading
    Array.prototype.forEach.call(document.querySelectorAll("[data-session-link]"), function (link) {
      link.addEventListener("click", function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (!chooseSession(link.getAttribute("data-session-link"))) return;
        event.preventDefault();
        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", link.getAttribute("href"));
        }
        var book = document.getElementById("book");
        if (book) book.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
        var name = document.getElementById("f-name");
        if (name) name.focus({ preventScroll: true });
      });
    });
  }

  if (form) {
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (event) {
      if ((form.getAttribute("action") || "").indexOf("your-form-id") === -1) return;
      event.preventDefault();
      if (status) {
        status.textContent = "";
        window.setTimeout(function () {
          status.textContent = "The booking form will be switched on before launch, so this message was not sent.";
        }, 60);
      }
    });
  }
})();
