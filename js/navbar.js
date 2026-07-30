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

  function linkClass(key, dark) {
    if (!dark) return "nav-link nav-link-light";
    return "nav-link " + (key === "offerings" && onOfferings ? "nav-link-active" : "nav-link-dark");
  }

  function render(dark, wordmarkVisible) {
    var linksHtml = links
      .map(function (l) {
        return '<a href="' + l.href + '" class="' + linkClass(l.key, dark) + '">' + l.label + "</a>";
      })
      .join("");
    var wordmarkClass =
      "nav-wordmark " +
      (dark ? "nav-wordmark-dark" : "nav-wordmark-light") +
      " " +
      (wordmarkVisible ? "nav-wordmark-visible" : "nav-wordmark-hidden");
    return (
      '<div class="nav-inner">' +
      '<a href="' + wordmarkHref + '" class="' + wordmarkClass + '">the way we walk</a>' +
      '<div class="nav-links">' + linksHtml + "</div>" +
      "</div>"
    );
  }

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  if (onIndex) {
    // Transparent over the hero, solidifies once scrolled past it. The
    // wordmark itself stays invisible until the hero title has scrolled out
    // of view (20% of viewport height), then fades in.
    nav.className = "site-nav nav-fixed";
    nav.innerHTML = render(false, false);
    window.addEventListener("scroll", function () {
      var scrolled = window.scrollY > 80;
      var pastHero = window.scrollY > window.innerHeight * 0.2;
      var wasScrolled = nav.classList.contains("scrolled");
      var wasPastHero = nav.dataset.pastHero === "true";
      if (scrolled === wasScrolled && pastHero === wasPastHero) return;
      nav.classList.toggle("scrolled", scrolled);
      nav.dataset.pastHero = String(pastHero);
      nav.innerHTML = render(scrolled, pastHero);
    });
  } else {
    // No hero on interior pages — nav is solid and sticky from the start,
    // wordmark always visible.
    nav.className = "site-nav nav-sticky";
    nav.innerHTML = render(true, true);
  }
})();
