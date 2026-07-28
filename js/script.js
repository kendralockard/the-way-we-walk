// Scroll-reveal: each major section on the home page fades up into view the
// first time it crosses 15% visibility, then stops observing it.
(function () {
  var targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
