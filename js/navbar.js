// Shared site navigation. Injected into <div id="site-nav"> on each page so the
// navbar only has to be edited in one place.
//
// To change nav links, edit the `links` array below.
//
// The markup below is built ONCE and then only ever has classNames toggled
// on existing nodes (never innerHTML-replaced) — the drawer/backdrop in
// particular must stay the same DOM node for their slide/fade transitions
// to actually animate; recreating them on every open would make the browser
// paint them already in their final position with nothing to transition from.
(function () {
  // Build a relative prefix back to the site root from the current page's directory.
  var dirs = location.pathname.replace(/\/[^/]*$/, "").split("/").filter(Boolean);
  var prefix = "../".repeat(dirs.length);

  var page = location.pathname.split("/").pop();
  var onIndex = page === "" || page === "index.html";
  var home = onIndex ? "" : prefix + "index.html";
  var onOfferings = page === "offerings.html" || dirs.indexOf("trips") !== -1;
  var onContact = page === "contact.html";

  var wordmarkHref = onIndex ? "#home" : home;

  var links = [
    { key: "home", label: "home", href: wordmarkHref },
    { key: "offerings", label: "offerings", href: prefix + "offerings.html" },
    { key: "about", label: "about", href: home + "#about" },
    { key: "contact", label: "contact", href: prefix + "contact.html" },
  ];

  var spiralPath =
    '<svg class="spiral-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.00,9.20 L10.29,9.09 L10.65,9.10 L11.02,9.26 L11.35,9.56 L11.57,10.00 L11.64,10.53 L11.52,11.10 L11.19,11.64 L10.68,12.08 L10.00,12.34 L9.23,12.37 L8.44,12.14 L7.73,11.65 L7.19,10.91 L6.89,10.00 L6.90,8.99 L7.23,7.99 L7.90,7.11 L8.85,6.46 L10.00,6.12 L11.25,6.16 L12.46,6.61 L13.51,7.45 L14.28,8.61 L14.65,10.00 L14.57,11.48 L14.01,12.91 L13.00,14.14 L11.63,15.01 L10.00,15.42 L8.28,15.30 L6.63,14.63 L5.24,13.46 L4.26,11.87 L3.81,10.00 L3.97,8.04 L4.74,6.18 L6.09,4.62 L7.90,3.53 L10.00,3.04 L12.20,3.23 L14.27,4.12 L16.00,5.64 L17.21,7.66 L17.73,10.00 L17.50,12.44 L16.50,14.72 L14.82,16.63 L12.58,17.94 L10.00,18.50" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none" /></svg>';

  function linkClass(key, dark) {
    if (!dark) return "nav-link nav-link-light";
    var active = (key === "home" && onIndex) || (key === "offerings" && onOfferings) || (key === "contact" && onContact);
    return "nav-link " + (active ? "nav-link-active" : "nav-link-dark");
  }

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  var linksHtml = links
    .map(function (l) {
      return '<a href="' + l.href + '" data-key="' + l.key + '">' + l.label + "</a>";
    })
    .join("");

  // Built once. Scroll only ever updates classNames on wordmarkEl/linkEls/
  // hamburgerEl below; open/close only ever toggles .open on drawerEl/
  // backdropEl. Nothing here gets torn down and recreated after this.
  nav.innerHTML =
    '<div class="nav-inner">' +
    '<a href="' + wordmarkHref + '" class="nav-wordmark">the way we walk' + spiralPath + "</a>" +
    '<div class="nav-links">' + linksHtml + "</div>" +
    '<button type="button" class="nav-hamburger" aria-label="Open menu"><span></span><span></span><span></span></button>' +
    "</div>" +
    '<div class="nav-backdrop"></div>' +
    '<div class="nav-drawer">' +
    '<div class="nav-drawer-head">' +
    '<span class="nav-drawer-title">menu</span>' +
    '<button type="button" class="nav-drawer-close" aria-label="Close menu">&times;</button>' +
    "</div>" +
    '<div class="nav-drawer-links">' + linksHtml + "</div>" +
    "</div>";

  var wordmarkEl = nav.querySelector(".nav-wordmark");
  var navLinksEl = nav.querySelector(".nav-links");
  var linkEls = nav.querySelectorAll(".nav-links a");
  var hamburgerEl = nav.querySelector(".nav-hamburger");
  var drawerEl = nav.querySelector(".nav-drawer");
  var backdropEl = nav.querySelector(".nav-backdrop");
  var closeBtn = nav.querySelector(".nav-drawer-close");
  var drawerLinkEls = nav.querySelectorAll(".nav-drawer-links a");

  var state = { dark: false, revealed: false, menuOpen: false };

  function applyState() {
    var dark = state.dark;
    var revealClass = state.revealed ? " nav-reveal-visible" : " nav-reveal-hidden";
    wordmarkEl.className = "nav-wordmark " + (dark ? "nav-wordmark-dark" : "nav-wordmark-light") + revealClass;
    navLinksEl.className = "nav-links" + revealClass;
    linkEls.forEach(function (a) {
      a.className = linkClass(a.dataset.key, dark);
    });
    hamburgerEl.className = "nav-hamburger " + (dark ? "nav-hamburger-dark" : "nav-hamburger-light") + revealClass;
  }
  applyState();

  // Locks background scroll while the drawer is open. Deliberately not
  // `body.style.overflow = "hidden"` — both html/body are height:100% here,
  // so that would turn body into its own (now-empty) scroll container and
  // the browser resets a newly-hidden container's scroll position to 0,
  // which reads as "the page jumped to the top". Pinning with position:
  // fixed + a negative top offset avoids touching overflow entirely, and
  // restoring scrollY on close puts the page back exactly where it was.
  var scrollLockY = 0;
  function setMenuOpen(open) {
    state.menuOpen = open;
    drawerEl.classList.toggle("open", open);
    backdropEl.classList.toggle("open", open);
    if (open) {
      scrollLockY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollLockY + "px";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // html has scroll-behavior: smooth site-wide, which would otherwise
      // animate this restore into a visible scroll — snap it instead.
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollLockY);
      document.documentElement.style.scrollBehavior = "";
    }
  }

  hamburgerEl.addEventListener("click", function () {
    setMenuOpen(!state.menuOpen);
  });
  closeBtn.addEventListener("click", function () {
    setMenuOpen(false);
  });
  backdropEl.addEventListener("click", function () {
    setMenuOpen(false);
  });
  drawerLinkEls.forEach(function (a) {
    a.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.menuOpen) setMenuOpen(false);
  });

  if (onIndex) {
    // Transparent over the hero, solidifies once scrolled past it. The
    // wordmark+icon, the nav links, and the hamburger all stay invisible
    // together until the hero title has scrolled out of view (20% of
    // viewport height), then fade in together with the background — one
    // shared trigger, no earlier partial transition.
    nav.className = "site-nav nav-fixed";
    window.addEventListener("scroll", function () {
      var pastHero = window.scrollY > window.innerHeight * 0.2;
      if (pastHero === state.revealed) return;
      state.dark = pastHero;
      state.revealed = pastHero;
      nav.classList.toggle("scrolled", pastHero);
      applyState();
    });
  } else {
    // No hero on interior pages — nav is solid and sticky from the start,
    // wordmark always visible.
    nav.className = "site-nav nav-sticky";
    state.dark = true;
    state.revealed = true;
    applyState();
  }
})();
