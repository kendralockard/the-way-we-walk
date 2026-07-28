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

  function render(dark) {
    var linksHtml = links
      .map(function (l) {
        return '<a href="' + l.href + '" class="' + linkClass(l.key, dark) + '">' + l.label + "</a>";
      })
      .join("");
    var wordmarkClass = "nav-wordmark " + (dark ? "nav-wordmark-dark" : "nav-wordmark-light");
    return (
      '<div class="nav-inner">' +
      '<a href="' + wordmarkHref + '" class="' + wordmarkClass + '">The Way We Walk</a>' +
      '<div class="nav-links">' + linksHtml + "</div>" +
      "</div>"
    );
  }

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  if (onIndex) {
    // Transparent over the hero, solidifies once scrolled past it.
    nav.className = "site-nav nav-fixed";
    nav.innerHTML = render(false);
    window.addEventListener("scroll", function () {
      var scrolled = window.scrollY > 80;
      if (scrolled === nav.classList.contains("scrolled")) return;
      nav.classList.toggle("scrolled", scrolled);
      nav.innerHTML = render(scrolled);
    });
  } else {
    // No hero on interior pages — nav is solid and sticky from the start.
    nav.className = "site-nav nav-sticky";
    nav.innerHTML = render(true);
  }
})();
