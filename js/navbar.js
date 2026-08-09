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
    '<a href="' + wordmarkHref + '" class="nav-wordmark">the way we walk</a>' +
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
    // together until scrolled 20% of a viewport height down, then fade in
    // together with the background — one shared trigger, no earlier
    // partial transition.
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
