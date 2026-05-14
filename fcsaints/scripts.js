(function () {
  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var year = document.querySelector("[data-year]");
  var form = document.querySelector("[data-reg-form]");
  var status = document.querySelector("[data-form-status]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNavOpen(false);
    });
  }

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = false;
      status.textContent =
        "Thanks — we received your details locally. Hook this form to email or GotSport before going live.";
      var submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.focus();
    });
  }
})();
