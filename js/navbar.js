// Shared site navigation. Injected into <div id="site-nav"> on each page so the
// navbar only has to be edited in one place.
//
// To change nav links, edit the `links` array below.
(function () {
  // Build a relative prefix back to the site root from the current page's directory.
  var dirs = location.pathname.replace(/\/[^/]*$/, "").split("/").filter(Boolean);
  var prefix = "../".repeat(dirs.length);

  var page = location.pathname.split("/").pop();
  var onIndex = page === "" || page === "index.html";
  var home = onIndex ? "" : prefix + "index.html";
  var onOfferings = page === "offerings.html" || dirs.indexOf("trips") !== -1;

  var links = [
    { key: "offerings", label: "offerings", href: prefix + "offerings.html" },
    { key: "about", label: "about", href: home + "#about" },
    { key: "contact", label: "contact", href: home + "#contact" },
  ];

  var wordmarkHref = onIndex ? "#home" : home;

  var spiralPath =
    '<svg class="spiral-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.00,9.20 L10.29,9.09 L10.65,9.10 L11.02,9.26 L11.35,9.56 L11.57,10.00 L11.64,10.53 L11.52,11.10 L11.19,11.64 L10.68,12.08 L10.00,12.34 L9.23,12.37 L8.44,12.14 L7.73,11.65 L7.19,10.91 L6.89,10.00 L6.90,8.99 L7.23,7.99 L7.90,7.11 L8.85,6.46 L10.00,6.12 L11.25,6.16 L12.46,6.61 L13.51,7.45 L14.28,8.61 L14.65,10.00 L14.57,11.48 L14.01,12.91 L13.00,14.14 L11.63,15.01 L10.00,15.42 L8.28,15.30 L6.63,14.63 L5.24,13.46 L4.26,11.87 L3.81,10.00 L3.97,8.04 L4.74,6.18 L6.09,4.62 L7.90,3.53 L10.00,3.04 L12.20,3.23 L14.27,4.12 L16.00,5.64 L17.21,7.66 L17.73,10.00 L17.50,12.44 L16.50,14.72 L14.82,16.63 L12.58,17.94 L10.00,18.50" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none" /></svg>';

  function linkClass(key, dark) {
    if (!dark) return "nav-link nav-link-light";
    return "nav-link " + (key === "offerings" && onOfferings ? "nav-link-active" : "nav-link-dark");
  }

  function render(dark, revealed) {
    var linksHtml = links
      .map(function (l) {
        return '<a href="' + l.href + '" class="' + linkClass(l.key, dark) + '">' + l.label + "</a>";
      })
      .join("");
    var wordmarkClass = "nav-wordmark " + (dark ? "nav-wordmark-dark" : "nav-wordmark-light");
    var revealClass = revealed ? "nav-reveal-visible" : "nav-reveal-hidden";
    return (
      '<div class="nav-inner">' +
      '<a href="' + wordmarkHref + '" class="' + wordmarkClass + " " + revealClass + '">the way we walk' + spiralPath + "</a>" +
      '<div class="nav-links ' + revealClass + '">' + linksHtml + "</div>" +
      "</div>"
    );
  }

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  if (onIndex) {
    // Transparent over the hero, solidifies once scrolled past it. The
    // wordmark+icon and the nav links all stay invisible together until the
    // hero title has scrolled out of view (20% of viewport height), then
    // fade in together with the background — one shared trigger, no earlier
    // partial transition.
    nav.className = "site-nav nav-fixed";
    nav.innerHTML = render(false, false);
    window.addEventListener("scroll", function () {
      var pastHero = window.scrollY > window.innerHeight * 0.2;
      var wasPastHero = nav.dataset.pastHero === "true";
      if (pastHero === wasPastHero) return;
      nav.classList.toggle("scrolled", pastHero);
      nav.dataset.pastHero = String(pastHero);
      nav.innerHTML = render(pastHero, pastHero);
    });
  } else {
    // No hero on interior pages — nav is solid and sticky from the start,
    // wordmark always visible.
    nav.className = "site-nav nav-sticky";
    nav.innerHTML = render(true, true);
  }
})();
