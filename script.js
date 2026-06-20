// Change style of navbar on scroll
window.onscroll = function () {
  myFunction();
};
function myFunction() {
  var navbar = document.getElementById("myNavbar");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
  } else {
    navbar.className = navbar.className.replace(
      " w3-card w3-animate-top w3-white",
      "",
    );
  }
}

// Toggle mobile menu
function toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Mobile parallax.
// Desktop uses CSS `background-attachment: fixed`, which mobile browsers
// (iOS especially) don't support. So on small screens (see the matching
// @media block in style.css) each section's photo lives in a ::before layer
// that is 15% taller than the section on each side. Here we translate that
// layer via the --py custom property as the section scrolls through view —
// the overhang means the slide never exposes a gap.
(function () {
  var mq = window.matchMedia("(max-width: 768px)");
  var layers = document.querySelectorAll(
    ".bgimg-1, .bgimg-2, .bgimg-3, .bgimg-4",
  );
  var ticking = false;

  function render() {
    ticking = false;
    if (!mq.matches) return; // desktop keeps the native CSS parallax
    var winH = window.innerHeight;
    for (var i = 0; i < layers.length; i++) {
      var el = layers[i];
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > winH) continue; // off-screen, skip
      // progress: ~0 as the section enters from the bottom, ~1 as it leaves
      // the top. At the midpoint the layer is centered (no shift); at the
      // extremes it slides up to 15% of the section height (the CSS overhang).
      var progress = (winH - rect.top) / (winH + rect.height);
      var ty = (0.5 - progress) * 2 * (rect.height * 0.15);
      el.style.setProperty("--py", ty.toFixed(1) + "px");
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(render);
      ticking = true;
    }
  }

  function clear() {
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.removeProperty("--py");
    }
  }

  function sync() {
    if (mq.matches) render();
    else clear();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", sync);
  sync(); // set the correct state on initial load
})();
