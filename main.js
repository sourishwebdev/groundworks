(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-nav-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function animateCount(el, target, duration) {
    var start = 0;
    var startTime = null;

    function frame(ts) {
      if (startTime === null) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(start + (target - start) * eased));
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reducedMotion && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-count") || "0", 10);
          if (!isNaN(target)) {
            animateCount(el, target, 1200);
          }
          observer.unobserve(el);
        });
      },
      { root: null, threshold: 0.4 }
    );

    counters.forEach(function (c) {
      obs.observe(c);
    });
  } else {
    counters.forEach(function (c) {
      var t = parseInt(c.getAttribute("data-count") || "0", 10);
      if (!isNaN(t)) c.textContent = String(t);
    });
  }

  var portfolioDialog = document.getElementById("portfolio-modal");
  var portfolioOpen = document.querySelector("[data-open-portfolio]");

  if (portfolioDialog && portfolioOpen && typeof portfolioDialog.showModal === "function") {
    portfolioOpen.addEventListener("click", function () {
      portfolioDialog.showModal();
    });

    portfolioDialog.querySelectorAll("[data-close-portfolio]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        portfolioDialog.close();
      });
    });

    portfolioDialog.addEventListener("click", function (e) {
      if (e.target === portfolioDialog) {
        portfolioDialog.close();
      }
    });
  } else if (portfolioOpen && portfolioDialog) {
    portfolioOpen.addEventListener("click", function () {
      window.location.hash = "services";
    });
  }
})();
