/*
  Strands of Grace, option A "Classic grace": behaviour. No libraries.
  Every page reads completely without this file; it only adds:
   1. the header that condenses into a slim bar once scrolled, and the
      reading-progress line along its bottom edge
   2. the phone menu (focus stays inside while open; Escape closes it)
   3. the carousels: "Words I keep close" and "Kind words", with previous and
      next, arrow keys and a swipe on touch
   4. "What I believe": hides the pearl that would start a wrapped line
   5. the 4-7-8 breathing exercise
   6. the booking form: session cards, hints, inline validation, the
      ?session= preselect, sending with fetch and the thank-you
   7. "Good to know" details on the offerings (closed on phones) and the
      question accordion
   8. the scroll reveal, the phone booking bar and Back to top
   9. the six strands on About Me: six arched cards that turn to show
      their summary (hover with a mouse, a tap, or Enter/Space)
  The two previews (?ink=charcoal|plum and ?tagline=2) are applied by the
  small script in each page's <head>, before the first paint, so headings
  never flash in the wrong colour.
*/
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktop = window.matchMedia("(min-width: 960px)");
  // the full navigation row needs this much room; below it the Menu button
  var wideNav = window.matchMedia("(min-width: 1100px)");
  var motionOk = function () {
    return !reducedMotion.matches;
  };
  var onMedia = function (mq, fn) {
    if (mq.addEventListener) mq.addEventListener("change", fn);
    else if (mq.addListener) mq.addListener(fn);
  };

  /* 1. Header ------------------------------------------------------------ */
  var header = document.querySelector("[data-header]");
  var bar = header && header.querySelector(".site-header__bar");
  var heroLogo = document.querySelector(".hero__emblem");
  var progress = document.querySelector("[data-progress]");

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
      var limit = wideNav.matches ? mastheadHeight : 8;
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
      if (progress) {
        var max = root.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progress.style.transform = "scaleX(" + p.toFixed(4) + ")";
        progress.classList.toggle("is-active", y > 2);
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
      document.querySelector("[data-book-bar]"),
      document.querySelector("[data-to-top]"),
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

    onMedia(wideNav, function () {
      if (wideNav.matches && isOpen()) setOpen(false, false);
    });
  }

  /* 3. Carousels: one item at a time, previous and next, arrow keys, swipe */
  var carousel = function (box, sel, describe) {
    var items = box.querySelectorAll(sel.item);
    var prev = box.querySelector(sel.prev);
    var next = box.querySelector(sel.next);
    var index = box.querySelector(sel.index);
    var live = box.querySelector(sel.live);
    if (!items.length || !next) return;
    var current = 0;

    var show = function (n) {
      items[current].classList.remove("is-current");
      current = (n + items.length) % items.length;
      items[current].classList.add("is-current");
      if (index) index.textContent = String(current + 1);
      if (live) live.textContent = describe(current + 1, items.length, items[current].textContent.replace(/\s+/g, " ").trim());
    };

    next.addEventListener("click", function () {
      show(current + 1);
    });
    if (prev) {
      prev.addEventListener("click", function () {
        show(current - 1);
      });
    }

    // left and right arrows while a control inside has focus
    box.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        show(current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(current - 1);
      }
    });

    // a swipe on touch
    var startX = null;
    var startY = null;
    box.addEventListener("touchstart", function (event) {
      var t = event.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
    }, { passive: true });
    box.addEventListener("touchend", function (event) {
      if (startX === null) return;
      var t = event.changedTouches[0];
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      startX = startY = null;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
  };

  Array.prototype.forEach.call(document.querySelectorAll("[data-quotes]"), function (box) {
    carousel(box, { item: ".quotes__item", prev: "[data-quote-prev]", next: "[data-quote-next]", index: "[data-quote-index]", live: "[data-quote-live]" },
      function (i, n, text) { return "Quote " + i + " of " + n + ": " + text; });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-carousel]"), function (box) {
    carousel(box, { item: ".kind__item", prev: "[data-prev]", next: "[data-next]", index: "[data-index]", live: "[data-live]" },
      function (i, n, text) { return i + " of " + n + ": " + text; });
  });

  /* 4. What I believe: no pearl at the start of a wrapped line ------------ */
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

  /* 5. A minute for you: breathe in for 4, hold for 7, out for 8, 3 rounds */
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

  /* 6. Booking form -------------------------------------------------------- */
  var form = document.querySelector("[data-booking-form]");
  var sessionSelect = document.getElementById("f-session");
  var sessionCards = Array.prototype.slice.call(document.querySelectorAll("[data-session-cards] input[type=radio]"));

  // With JavaScript the cards are the control and the select is kept in step
  // with them (it stays the fallback without JavaScript)
  if (sessionSelect && sessionCards.length) {
    sessionSelect.removeAttribute("name");
    sessionCards.forEach(function (radio) {
      radio.name = "session";
      radio.addEventListener("change", function () {
        if (radio.checked) sessionSelect.value = radio.value;
      });
    });
  }

  var chooseSession = function (key) {
    if (!sessionSelect || !key) return false;
    var option = sessionSelect.querySelector('option[data-session="' + key + '"]');
    if (!option) return false;
    sessionSelect.value = option.value;
    sessionCards.forEach(function (radio) {
      radio.checked = radio.getAttribute("data-session") === key;
    });
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
        if (book) book.scrollIntoView({ behavior: motionOk() ? "smooth" : "auto", block: "start" });
        var name = document.getElementById("f-name");
        if (name) name.focus({ preventScroll: true });
      });
    });
  }

  if (form) {
    var status = form.querySelector("[data-form-status]");
    var fields = form.querySelector("[data-form-fields]");
    var success = form.querySelector("[data-form-success]");
    var submit = form.querySelector("[data-submit]");
    var honeypot = form.querySelector("[data-honeypot]");
    var MESSAGES = {
      "f-name": "Please add your name.",
      "f-email": "Please add an email address I can reply to.",
      "f-message": "Please add a short message."
    };
    var SUCCESS = "Your message is on its way, and I will reply within a day or two.";
    // the error line ends with Lisa's email as a link: [before, link text, after]
    var ERROR = ["Something went wrong and your message was not sent. Please try again, or ", "email me directly", "."];
    var EMAIL = "lisa@mystrandsofgrace.com";
    var GUARD = "The booking form will be switched on before launch, so this message was not sent.";

    // the browser's bubbles are replaced by inline messages
    form.setAttribute("novalidate", "");

    var inputs = Object.keys(MESSAGES).map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    var errorFor = function (input) {
      return document.getElementById(input.id + "-error");
    };

    var validate = function (input) {
      var error = errorFor(input);
      var ok = input.validity.valid;
      input.setAttribute("aria-invalid", ok ? "false" : "true");
      if (error) error.textContent = ok ? "" : MESSAGES[input.id];
      return ok;
    };

    inputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value !== "" || input.getAttribute("aria-invalid") === "true" || input.hasAttribute("data-touched")) validate(input);
        input.setAttribute("data-touched", "");
      });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validate(input);
      });
    });

    // the message box grows with its content
    var autogrow = form.querySelector("[data-autogrow]");
    if (autogrow && !(window.CSS && CSS.supports && CSS.supports("field-sizing", "content"))) {
      var grow = function () {
        autogrow.style.height = "auto";
        autogrow.style.height = Math.min(autogrow.scrollHeight + 2, 384) + "px";
      };
      autogrow.addEventListener("input", grow);
      grow();
    }

    var setSending = function (sending) {
      if (!submit) return;
      submit.disabled = sending;
      submit.textContent = sending ? "Sending..." : "Send";
    };

    var setStatus = function (message) {
      if (!status) return;
      status.textContent = "";
      window.setTimeout(function () {
        if (typeof message === "string") {
          status.textContent = message;
          return;
        }
        var link = document.createElement("a");
        link.href = "mailto:" + EMAIL;
        link.textContent = message[1];
        status.appendChild(document.createTextNode(message[0]));
        status.appendChild(link);
        status.appendChild(document.createTextNode(message[2]));
      }, 60);
    };

    var showSuccess = function () {
      setSending(false);
      if (fields) fields.hidden = true;
      if (success) {
        success.hidden = false;
        var title = success.querySelector(".form__success-title");
        if (title) {
          title.setAttribute("tabindex", "-1");
          title.focus({ preventScroll: true });
        }
      }
      setStatus(SUCCESS);
    };

    form.addEventListener("submit", function (event) {
      var firstInvalid = null;
      inputs.forEach(function (input) {
        input.setAttribute("data-touched", "");
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        event.preventDefault();
        firstInvalid.focus();
        return;
      }
      if (honeypot && honeypot.value) {
        event.preventDefault();
        showSuccess();
        return;
      }
      if ((form.getAttribute("action") || "").indexOf("your-form-id") !== -1) {
        event.preventDefault();
        setStatus(GUARD);
        return;
      }
      if (!window.fetch || !window.FormData) return;
      event.preventDefault();
      setSending(true);
      if (status) status.textContent = "";
      window.fetch(form.getAttribute("action"), {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (response) {
        if (!response.ok) throw new Error("not sent");
        showSuccess();
      }).catch(function () {
        setSending(false);
        setStatus(ERROR);
      });
    });
  }

  /* 7. Good to know: offering details, and the question accordion --------- */
  var offerDetails = document.querySelectorAll("[data-offer-details]");
  if (offerDetails.length) {
    var applyOffer = function () {
      Array.prototype.forEach.call(offerDetails, function (details) {
        details.open = desktop.matches;
      });
    };
    applyOffer();
    onMedia(desktop, applyOffer);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-accordion]"), function (accordion) {
    var items = Array.prototype.slice.call(accordion.querySelectorAll("details"));

    var settle = function (details, panel, open) {
      panel.style.height = "";
      details.open = open;
      details.removeAttribute("data-animating");
    };

    var animate = function (details, open) {
      var panel = details.querySelector(".faq__answer");
      if (!panel || !motionOk()) {
        details.open = open;
        return;
      }
      if (details.hasAttribute("data-animating")) return;
      details.setAttribute("data-animating", "");
      if (open) details.open = true;
      var from = open ? 0 : panel.scrollHeight;
      var to = open ? panel.scrollHeight : 0;
      panel.style.height = from + "px";
      panel.getBoundingClientRect();
      var done = function (event) {
        if (event && event.target !== panel) return;
        panel.removeEventListener("transitionend", done);
        window.clearTimeout(fallback);
        settle(details, panel, open);
      };
      var fallback = window.setTimeout(done, 400);
      panel.addEventListener("transitionend", done);
      panel.style.height = to + "px";
    };

    items.forEach(function (details) {
      var summary = details.querySelector("summary");
      if (!summary) return;
      summary.addEventListener("click", function (event) {
        event.preventDefault();
        if (details.open) {
          animate(details, false);
          return;
        }
        items.forEach(function (other) {
          if (other !== details && other.open) animate(other, false);
        });
        animate(details, true);
      });
    });
  });

  /* 8. Reveal, the phone booking bar and Back to top ---------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("is-visible");
      });
    } else {
      Array.prototype.forEach.call(document.querySelectorAll("[data-stagger]"), function (group) {
        var i = 0;
        Array.prototype.forEach.call(group.children, function (child) {
          if (child.classList.contains("reveal")) {
            child.style.setProperty("--reveal-delay", (i * 90) + "ms");
            i += 1;
          }
        });
      });
      var revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -4% 0px" });
      var viewportHeight = window.innerHeight;
      Array.prototype.forEach.call(reveals, function (el) {
        var rect = el.getBoundingClientRect();
        // anything already on screen shows at once, never late
        if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
          el.classList.add("reveal--instant", "is-visible");
        } else {
          revealer.observe(el);
        }
      });
    }
  }

  var bookBar = document.querySelector("[data-book-bar]");
  if (bookBar && "IntersectionObserver" in window) {
    var phone = window.matchMedia("(max-width: 959.98px)");
    var hero = document.querySelector(".hero, .page-hero");
    var bookSection = document.getElementById("book");
    var footer = document.querySelector(".site-footer");
    var seen = { hero: true, book: false, footer: false };
    bookBar.hidden = false;

    var renderBar = function () {
      var show = phone.matches && !seen.hero && !seen.book && !seen.footer;
      bookBar.classList.toggle("is-visible", show);
      document.body.classList.toggle("has-book-bar", show);
    };

    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) seen.hero = entry.isIntersecting;
        else if (entry.target === bookSection) seen.book = entry.isIntersecting;
        else if (entry.target === footer) seen.footer = entry.isIntersecting;
      });
      renderBar();
    }, { threshold: 0 });
    [hero, bookSection, footer].forEach(function (el) {
      if (el) watcher.observe(el);
    });
    onMedia(phone, renderBar);
  }

  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    toTop.hidden = false;
    var topTicking = false;
    var updateTop = function () {
      topTicking = false;
      toTop.classList.toggle("is-visible", window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", function () {
      if (!topTicking) {
        topTicking = true;
        window.requestAnimationFrame(updateTop);
      }
    }, { passive: true });
    updateTop();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: motionOk() ? "smooth" : "auto" });
      var main = document.getElementById("main");
      if (main) main.focus({ preventScroll: true });
    });
  }

  /* 9. The six strands: six arched cards that turn -------------------------
     A card is open while it is pinned (clicked, tapped, Enter or Space),
     hovered with a mouse, or holds keyboard focus that arrived with Tab.
     One card is pinned at a time. Escape, or a tap on the back of the card,
     turns it back to rest. The button's aria-expanded follows what shows. */
  var arches = document.querySelector("[data-arches]");
  if (arches) {
    var cards = Array.prototype.map.call(arches.querySelectorAll("[data-strand]"), function (button) {
      return {
        button: button,
        item: button.closest(".arches__item"),
        summary: document.getElementById(button.getAttribute("aria-controls")),
        enterTimer: null,
        leaveTimer: null
      };
    });
    var pinned = null;
    var hovered = null;
    var focused = null;
    var quiet = null;
    var viaTab = false;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    var cardFor = function (el) {
      var item = el && el.closest ? el.closest(".arches__item") : null;
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].item === item) return cards[i];
      }
      return null;
    };

    var isShown = function (card) {
      if (quiet === card) return false;
      return pinned === card || hovered === card || focused === card;
    };

    var render = function () {
      cards.forEach(function (card) {
        var shown = isShown(card);
        card.item.classList.toggle("is-open", shown);
        card.button.setAttribute("aria-expanded", shown ? "true" : "false");
      });
    };

    var pin = function (card) {
      pinned = card;
      quiet = null;
      render();
    };

    var rest = function (card) {
      if (pinned === card) pinned = null;
      quiet = card;
      // focus on the back would be lost as it hides: return it to the front
      if (card.summary && card.summary.contains(document.activeElement)) {
        card.button.focus({ preventScroll: true });
      }
      render();
    };

    cards.forEach(function (card) {
      card.button.addEventListener("click", function (event) {
        // Enter and Space (detail 0) turn the card either way; a click or a
        // tap on the front, which only shows while the card rests, opens it
        if (event.detail === 0 && isShown(card)) rest(card);
        else pin(card);
      });

      if (card.summary) {
        card.summary.addEventListener("click", function (event) {
          if (!event.target.closest("a")) rest(card);
        });
      }

      card.item.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "mouse" || !finePointer.matches) return;
        window.clearTimeout(card.leaveTimer);
        card.enterTimer = window.setTimeout(function () {
          hovered = card;
          render();
        }, 110);
      });

      card.item.addEventListener("pointerleave", function (event) {
        if (event.pointerType !== "mouse") return;
        window.clearTimeout(card.enterTimer);
        if (quiet === card && focused !== card) quiet = null;
        card.leaveTimer = window.setTimeout(function () {
          if (hovered === card) {
            hovered = null;
            render();
          }
        }, 140);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Tab") viaTab = true;
    }, true);
    document.addEventListener("pointerdown", function () {
      viaTab = false;
    }, true);

    arches.addEventListener("focusin", function (event) {
      var card = cardFor(event.target);
      if (focused && focused !== card) focused = null;
      if (card && viaTab) focused = card;
      render();
    });

    arches.addEventListener("focusout", function (event) {
      var card = cardFor(event.target);
      if (!card || card.item.contains(event.relatedTarget)) return;
      if (focused === card) focused = null;
      if (quiet === card) quiet = null;
      render();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || document.body.classList.contains("menu-open")) return;
      var card = cardFor(document.activeElement) || pinned;
      if (card && isShown(card)) {
        event.preventDefault();
        rest(card);
      }
    });

    render();
  }
})();
