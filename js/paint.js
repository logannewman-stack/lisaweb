/* =============================================================================
   LISA BRUNSON — PAINT
   Hand-painted brush strokes, drawn as SVG with rough edges:
     - a rainbow arc behind the portrait in the hero
     - a painted underline beneath every section heading, in its flag colour
     - small strokes under the kind words
     - the stacked rainbow in the footer
   Every stroke is generated from a seed, so the page paints the same way
   each time it loads. Nothing here needs editing for content.
   ========================================================================== */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var FLAGS = ["var(--root)", "var(--sacral)", "var(--solar)", "var(--heart)", "var(--throat)", "var(--third)", "var(--crown)"];

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

  /* A horizontal stroke of width w and height h, tapered at both ends, with
     a slightly uneven top and bottom edge. */
  function strokePath(w, h, seed) {
    var r = rng(seed), n = 12, tip = Math.min(h * 0.9, w * 0.08), top = [], bot = [], i, x;
    for (i = 0; i <= n; i++) {
      x = tip + (w - 2 * tip) * (i / n);
      top.push([x, h * 0.2 + (r() - 0.5) * h * 0.26]);
      bot.push([x, h * 0.8 + (r() - 0.5) * h * 0.26]);
    }
    var d = "M" + f(0.5) + " " + f(h * (0.42 + r() * 0.16));
    for (i = 0; i <= n; i++) d += " L" + f(top[i][0]) + " " + f(top[i][1]);
    d += " L" + f(w - 0.5) + " " + f(h * (0.42 + r() * 0.16));
    for (i = n; i >= 0; i--) d += " L" + f(bot[i][0]) + " " + f(bot[i][1]);
    return d + " Z";
  }

  function svg(viewW, viewH, cls, stretch) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 " + viewW + " " + viewH);
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    if (stretch) s.setAttribute("preserveAspectRatio", "none");
    if (cls) s.setAttribute("class", cls);
    return s;
  }
  function path(d, fill, seed) {
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    p.setAttribute("fill", fill);
    p.setAttribute("filter", "url(#rough)");
    return p;
  }

  /* ---- Painted underlines: any element with data-paint="<colour>" ------- */
  var seed = 11;
  Array.prototype.forEach.call(document.querySelectorAll("[data-paint]"), function (el) {
    var colour = el.getAttribute("data-paint") || "var(--gold)";
    var s = svg(240, 24, "paint", true);
    s.appendChild(path(strokePath(240, 24, seed++), colour));
    el.insertBefore(s, el.firstChild);
    el.classList.add("is-painted");
  });

  /* ---- A rough painted top edge on every colour block -------------------- */
  Array.prototype.forEach.call(document.querySelectorAll(".chakra, .quotes, .footer"), function (sec, i) {
    var e = svg(1200, 30, "edge", true);
    var pth = path(strokePath(1200, 30, 300 + i), "currentColor");
    pth.setAttribute("style", "fill: var(--ground, var(--velvet))");
    e.appendChild(pth);
    sec.insertBefore(e, sec.firstChild);
  });

  /* ---- The rainbow arc in the hero -------------------------------------- */
  var arcHost = document.getElementById("rainbow-arc");
  if (arcHost) {
    var s = svg(420, 230, "rainbow-arc__svg", false);
    var cx = 210, cy = 214, radius = 196, width = 18;
    FLAGS.forEach(function (colour, i) {
      var rr = radius - i * (width + 1.5);
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", "M" + f(cx - rr) + " " + f(cy) + " A" + f(rr) + " " + f(rr) + " 0 0 1 " + f(cx + rr) + " " + f(cy));
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", colour);
      p.setAttribute("stroke-width", width);
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("filter", "url(#rough)");
      s.appendChild(p);
    });
    arcHost.appendChild(s);
  }

  /* ---- The stacked rainbow in the footer -------------------------------- */
  var stackHost = document.getElementById("rainbow-stack");
  if (stackHost) {
    var st = svg(420, 168, "rainbow-stack__svg", false), r2 = rng(99);
    FLAGS.forEach(function (colour, i) {
      var w = 300 + r2() * 100, x = (420 - w) / 2 + (r2() - 0.5) * 40, y = 6 + i * 22;
      var g = document.createElementNS(NS, "g");
      g.setAttribute("transform", "translate(" + f(x) + " " + f(y) + ") rotate(" + f((r2() - 0.5) * 3) + " " + f(w / 2) + " 11)");
      g.appendChild(path(strokePath(w, 22, 200 + i), colour));
      st.appendChild(g);
    });
    stackHost.appendChild(st);
  }
})();
