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

// Hero title fades out quickly on scroll — fully gone within ~10% of a
// viewport height, independent of and faster than the nav reveal.
(function () {
  var heroInner = document.querySelector(".hero-inner");
  if (!heroInner) return;

  function update() {
    var opacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.1));
    heroInner.style.opacity = opacity;
  }

  window.addEventListener("scroll", update);
  update();
})();
