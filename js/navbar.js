// Shared site navigation. Injected into <div id="site-nav"> on each page so the
// navbar only has to be edited in one place.
//
// To change nav links, edit the `links` array below.
(function () {
  // Section links (#home/#about/#contact) live on the home page, so prefix them
  // with index.html when we're on any other page.
  var page = location.pathname.split("/").pop();
  var onIndex = page === "" || page === "index.html";
  var home = onIndex ? "" : "index.html";

  var links = [
    { label: "home", href: home + "#home" },
    { label: "offerings", href: "offerings.html" },
    { label: "about", href: home + "#about" },
    { label: "contact", href: home + "#contact" },
  ];

  // Desktop: links hidden on small screens (spacing comes from button padding).
  var desktop = links
    .map(function (l) {
      return (
        '<a href="' +
        l.href +
        '" class="w3-bar-item w3-button w3-hide-small">' +
        l.label +
        "</a>"
      );
    })
    .join("");

  // Mobile: stacked links in the dropdown; tapping one closes the menu.
  var mobile = links
    .map(function (l) {
      return (
        '<a href="' +
        l.href +
        '" class="w3-bar-item w3-button" onclick="toggleFunction()">' +
        l.label +
        "</a>"
      );
    })
    .join("");

  var html =
    '<div class="w3-bar" id="myNavbar">' +
    '<a class="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right" ' +
    'href="javascript:void(0);" onclick="toggleFunction()" title="Toggle Navigation Menu">' +
    '<i class="fa fa-bars"></i></a>' +
    desktop +
    "</div>" +
    '<div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium">' +
    mobile +
    "</div>";

  var mount = document.getElementById("site-nav");
  if (mount) mount.innerHTML = html;
})();
