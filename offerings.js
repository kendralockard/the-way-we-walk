// ---------------------------------------------------------------------------
// EDIT YOUR TRIPS HERE. Add, remove, or change entries in this one list and
// both the cards on the offerings page and the sign-up dropdown update
// automatically. `image` is optional — leave it as "" to show the grey
// placeholder.
// ---------------------------------------------------------------------------
var trips = [
  {
    name: "Mini Trip for young ones",
    dates: "[ dates ]",
    location: "[ location ]",
    description: "[ A short description of the trip. ]",
    image: "", // e.g. "images/trip1.jpg"
  },
];

(function () {
  var cards = document.getElementById("trip-cards");
  var select = document.getElementById("trip-select");
  if (!cards || !select) return; // not on the offerings page

  // Escape any characters that would break the HTML/attribute strings.
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  trips.forEach(function (trip) {
    var media = trip.image
      ? '<img src="' +
        esc(trip.image) +
        '" class="w3-image" style="width:100%" alt="' +
        esc(trip.name) +
        '" />'
      : '<div class="w3-light-grey w3-center" style="display:flex;align-items:center;justify-content:center;min-height:200px;">' +
        '<i class="fa fa-picture-o w3-jumbo w3-text-grey"></i></div>';

    var col = document.createElement("div");
    col.className = "w3-col m4 w3-margin-bottom";
    col.innerHTML =
      '<div class="w3-card w3-round w3-white">' +
      media +
      '<div class="w3-container w3-padding-16">' +
      "<h4>" +
      esc(trip.name) +
      "</h4>" +
      '<p class="w3-text-grey">' +
      '<i class="fa fa-calendar w3-margin-right"></i>' +
      esc(trip.dates) +
      "<br />" +
      '<i class="fa fa-map-marker w3-margin-right"></i>' +
      esc(trip.location) +
      "</p>" +
      "<p>" +
      esc(trip.description) +
      "</p>" +
      '<a href="#signup" class="w3-button w3-black w3-round w3-medium" data-trip="' +
      esc(trip.name) +
      '">see details &rarr;</a>' +
      "</div></div>";
    cards.appendChild(col);

    var opt = document.createElement("option");
    opt.textContent = trip.name;
    select.appendChild(opt);
  });

  // A catch-all option after the specific trips.
  var general = document.createElement("option");
  general.textContent = "not sure yet / general interest";
  select.appendChild(general);

  // Clicking a card's "request a spot" pre-selects that trip in the form.
  cards.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-trip]");
    if (btn) select.value = btn.getAttribute("data-trip");
  });
})();
