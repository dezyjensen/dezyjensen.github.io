/* Dezy Jensen: personal site scripts. Small, dependency-free. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Day / night ---------- */
  function currentTheme() { return root.getAttribute("data-theme") === "day" ? "day" : "night"; }

  function applyTheme(theme, remember) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-set-theme]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-theme") === theme));
    });
    if (remember) { try { localStorage.setItem("theme", theme); } catch (e) {} }
    drawSky();
  }

  document.querySelectorAll("[data-set-theme]").forEach(function (b) {
    b.addEventListener("click", function () { applyTheme(b.getAttribute("data-set-theme"), true); });
  });

  // Follow the device setting live, unless the visitor picked a theme themselves
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) {}
      if (!saved) applyTheme(e.matches ? "day" : "night", false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }

  /* ---------- Sky: stars at night, faint sparkles by day ---------- */
  var canvas = document.getElementById("stars");
  var ctx = canvas && canvas.getContext("2d");

  function drawSky() {
    if (!ctx) return;
    var w = document.documentElement.clientWidth;
    var h = document.body.scrollHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var seed = 7;
    var rand = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var density = (w * h) / 3200;

    if (currentTheme() === "night") {
      for (var i = 0; i < density; i++) {
        var x = rand() * w, y = rand() * h, r = rand() * 1.3 + 0.2, a = rand() * 0.7 + 0.15;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283);
        ctx.fillStyle = "rgba(244,239,230," + a + ")"; ctx.fill();
      }
    } else {
      for (var j = 0; j < density / 8; j++) {
        var dx = rand() * w, dy = rand() * h, dr = rand() * 1.6 + 0.6, da = rand() * 0.22 + 0.06;
        ctx.beginPath(); ctx.arc(dx, dy, dr, 0, 6.283);
        ctx.fillStyle = "rgba(182,90,63," + da + ")"; ctx.fill();
      }
    }
  }

  // A few gently twinkling stars (night only, via CSS)
  var tw = document.getElementById("twinkles");
  if (tw && !reduceMotion) {
    var s2 = 11, rnd = function () { s2 = (s2 * 9301 + 49297) % 233280; return s2 / 233280; };
    for (var k = 0; k < 22; k++) {
      var star = document.createElement("span");
      star.className = "twinkle";
      star.style.left = (rnd() * 100) + "%";
      star.style.top = (rnd() * 2600) + "px";
      star.style.animationDelay = (-rnd() * 4).toFixed(2) + "s";
      star.style.animationDuration = (3 + rnd() * 3).toFixed(2) + "s";
      tw.appendChild(star);
    }
  }

  var resizeTimer;
  window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawSky, 150); });
  window.addEventListener("load", drawSky);

  /* ---------- Constellation stories ---------- */
  var buttons = document.querySelectorAll(".star-btn");
  var yr = document.getElementById("story-yr");
  var title = document.getElementById("story-title");
  var text = document.getElementById("story-text");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.getElementById("s-" + btn.getAttribute("data-story"));
      if (!src) return;
      var ps = src.querySelectorAll("p");
      yr.textContent = ps[0].textContent;
      title.textContent = src.querySelector("h3").textContent;
      text.textContent = ps[1].textContent;
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    });
  });

  /* ---------- Reveal sections on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  applyTheme(currentTheme(), false);
})();
