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
// (iOS especially) don't support. So on small screens we fake it in JS by
// nudging each background's vertical position as it scrolls through the
// viewport. Percentage positioning with `background-size: cover` means the
// image always stays covered — no gaps are ever revealed.
(function () {
  var mq = window.matchMedia("(max-width: 768px)");
  var layers = document.querySelectorAll(".bgimg-1, .bgimg-2, .bgimg-3, .bgimg-4");
  var ticking = false;

  function render() {
    ticking = false;
    var winH = window.innerHeight;
    for (var i = 0; i < layers.length; i++) {
      var el = layers[i];
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > winH) continue; // off-screen, skip
      // progress: ~0 as the section enters from the bottom, ~1 as it leaves
      // the top. Map that to a 30%–70% vertical background position.
      var progress = (winH - rect.top) / (winH + rect.height);
      var pos = 50 + (progress - 0.5) * 40;
      el.style.backgroundPositionY = pos + "%";
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
      layers[i].style.backgroundPositionY = "";
    }
  }

  function sync() {
    if (mq.matches) {
      render();
    } else {
      clear(); // hand control back to the CSS fixed parallax on desktop
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", sync);
  sync(); // set the correct state on initial load
})();
