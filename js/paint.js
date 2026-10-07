/* =============================================================================
   LISA BRUNSON — PAINT
   Hand-painted brush strokes, drawn as SVG with rough, bristly edges (the
   #rough filter at the top of index.html). Any element with a data-paint
   attribute gets painted to its own size, and repainted when it resizes:

     data-paint="stroke"  one horizontal brush stroke filling the element
     data-paint="block"   a wide block with brushed top and bottom edges
     data-paint="edge"    a band with a brushed top edge (the footer)

     data-colour  any CSS colour, e.g. "var(--red)"
     data-seed    a number; the same seed always paints the same stroke
     data-ragged  strokes start and end at slightly different places
     data-flat    no tapered tips (for shelf segments that join up)

   Used for the rainbow behind her name, the rainbow sign on the quote wall,
   the seven bands of "What I believe", the sunny block behind "Sage and
   palo santo", the oil shelf, the hot-pink block behind the kind words, the
   menu and the footer. Nothing here needs editing.
   ========================================================================== */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  function rng(seed) {
    var t = (seed * 9301 + 49297) >>> 0;
    return function () {
      t = (t + 0x6D2B79F5) >>> 0;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f(n) { return (Math.round(n * 10) / 10).toString(); }

  /* A closed, smooth outline through the points (curves via midpoints). */
  function smooth(p) {
    var n = p.length, mid = function (a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
    var m = mid(p[n - 1], p[0]), d = "M" + f(m[0]) + " " + f(m[1]);
    for (var i = 0; i < n; i++) {
      var q = mid(p[i], p[(i + 1) % n]);
      d += " Q" + f(p[i][0]) + " " + f(p[i][1]) + " " + f(q[0]) + " " + f(q[1]);
    }
    return d + " Z";
  }

  /* One horizontal brush stroke inside w x h: tapered tips, wobbly edges,
     a slight bow along its length. */
  function strokeOutline(w, h, r, opt) {
    var x0 = opt.x0 || 0, x1 = w - (opt.x1 || 0), len = x1 - x0;
    var n = Math.max(6, Math.round(len / 48));
    var tipL = opt.flat ? 0 : Math.min(h * 1.2, len * 0.07);
    var tipR = opt.flat ? 0 : Math.min(h * 1.5, len * 0.09);
    var bow = (r() - 0.5) * h * 0.16, top = [], bot = [], i;
    for (i = 0; i <= n; i++) {
      var t = i / n, x = x0 + tipL + (len - tipL - tipR) * t, b = Math.sin(t * Math.PI) * bow;
      top.push([x, h * 0.08 + (r() - 0.5) * h * 0.13 + b]);
      bot.push([x, h * 0.92 + (r() - 0.5) * h * 0.13 + b]);
    }
    if (opt.flat) { top[0][0] = x0; bot[0][0] = x0; top[n][0] = x1; bot[n][0] = x1; }
    var pts = [[x0, h * (0.4 + r() * 0.2)]].concat(top, [[x1, h * (0.38 + r() * 0.22)]], bot.reverse());
    if (opt.flat) pts = top.concat(bot);
    return smooth(pts);
  }

  /* Dry-brush streaks: thin lighter slivers along the stroke. */
  function streaks(w, h, r, opt) {
    var x0 = opt.x0 || 0, x1 = w - (opt.x1 || 0), len = x1 - x0, d = "";
    var count = Math.max(2, Math.min(9, Math.round(len / 160)));
    for (var k = 0; k < count; k++) {
      var y = h * (0.22 + r() * 0.56), th = Math.max(0.8, h * (0.025 + r() * 0.035));
      var sx = x0 + len * r() * 0.7, sw = len * (0.12 + r() * 0.3);
      if (sx + sw > x1 - 6) sw = Math.max(10, x1 - 6 - sx);
      d += "M" + f(sx) + " " + f(y) + " Q" + f(sx + sw / 2) + " " + f(y - th) + " " + f(sx + sw) + " " + f(y) +
        " Q" + f(sx + sw / 2) + " " + f(y + th) + " " + f(sx) + " " + f(y) + " Z ";
    }
    return d;
  }

  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    return e;
  }

  function paint(host) {
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    if (host._painted === w + "x" + h) return;
    host._painted = w + "x" + h;

    var type = host.getAttribute("data-paint"), colour = host.getAttribute("data-colour") || "var(--yellow)";
    var seed = parseFloat(host.getAttribute("data-seed")) || 7, r = rng(seed);
    var svg = el("svg", { "class": "paint", viewBox: "0 0 " + w + " " + h, preserveAspectRatio: "none", "aria-hidden": "true", focusable: "false" });
    var g = el("g", { filter: "url(#rough)" });
    var main = el("path", {}), d;

    if (type === "block" || type === "edge") {
      var n = Math.max(8, Math.round(w / 70)), topEdge = [], botEdge = [], j;
      for (j = 0; j <= n; j++) {
        var x = (w * j) / n;
        topEdge.push([x, (type === "edge" ? h * 0.18 : 0) + r() * Math.min(18, h * 0.3)]);
        botEdge.push([x, type === "edge" ? h + 4 : h - r() * 18]);
      }
      var poly = [[-20, topEdge[0][1]]].concat(topEdge, [[w + 20, topEdge[n][1]], [w + 20, botEdge[n][1]]], botEdge.reverse(), [[-20, botEdge[n][1]]]);
      d = "M" + poly.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join(" L") + " Z";
      g.appendChild(main);
      if (type === "block") {
        /* long, faint brush marks across the block */
        var marks = "", count = Math.round(h / 34);
        for (var m = 0; m < count; m++) {
          var y = 24 + (h - 48) * r(), th = 1.5 + r() * 3.5, sx = w * r() * 0.8, sw = w * (0.15 + r() * 0.45);
          marks += "M" + f(sx) + " " + f(y) + " Q" + f(sx + sw / 2) + " " + f(y - th) + " " + f(sx + sw) + " " + f(y) +
            " Q" + f(sx + sw / 2) + " " + f(y + th) + " " + f(sx) + " " + f(y) + " Z ";
        }
        g.appendChild(el("path", { d: marks, fill: "#fff", "fill-opacity": "0.12" }));
      }
    } else {
      var ragged = host.hasAttribute("data-ragged");
      var opt = {
        flat: host.hasAttribute("data-flat"),
        x0: ragged ? w * r() * 0.06 : 0,
        x1: ragged ? w * r() * 0.05 : 0
      };
      d = strokeOutline(w, h, r, opt);
      var s = streaks(w, h, r, opt);
      g.appendChild(main);
      if (s) {
        var lite = el("path", { d: s, fill: "#fff", "fill-opacity": "0.16" });
        g.appendChild(lite);
      }
    }
    main.setAttribute("d", d);
    main.style.fill = colour;
    if (!main.parentNode) g.appendChild(main);
    svg.appendChild(g);

    var old = host.querySelector(":scope > svg.paint");
    if (old) host.replaceChild(svg, old); else host.insertBefore(svg, host.firstChild);
    host.classList.add("is-painted");
  }

  var hosts = Array.prototype.slice.call(document.querySelectorAll("[data-paint]"));
  hosts.forEach(paint);
  if ("ResizeObserver" in window) {
    var queue = [], raf = 0;
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (e) { if (queue.indexOf(e.target) < 0) queue.push(e.target); });
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { var q = queue; queue = []; q.forEach(paint); });
    });
    hosts.forEach(function (h) { ro.observe(h); });
  } else {
    window.addEventListener("resize", function () { hosts.forEach(paint); });
  }
})();
