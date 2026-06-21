// ---------------------------------------------------------------------------
// EDIT YOUR TRIPS HERE. Add, remove, or change entries in this one list and
// the cards on the offerings page update automatically.
// `image` is optional — leave it as "" to show the grey placeholder.
// `detail` is optional — a second line shown below the name on the card.
// `page` is the filename of the trip's detail page.
// ---------------------------------------------------------------------------
var trips = [
  {
    name: "Mini Trip for young ones",
    detail: "(ages 5-10)",
    dates: "June 29 - July 3",
    location: "surrounding Bay Area",
    description:
      "A week full of day trips exploring the Bay Area.  Offered to young ones aged 5 to 10.",
    image: "images/mini-trip-for-kids-1.jpeg",
    page: "mini-trip.html",
  },
];

(function () {
  var cards = document.getElementById("trip-cards");
  var template = document.getElementById("trip-card-template");
  if (!cards || !template) return; // not on the offerings page

  trips.forEach(function (trip) {
    var col = template.content.cloneNode(true).firstElementChild;
    var img = col.querySelector(".trip-card-image");
    var placeholder = col.querySelector(".trip-card-placeholder");

    if (trip.image) {
      img.src = trip.image;
      img.alt = trip.name;
      placeholder.style.display = "none";
    } else {
      img.style.display = "none";
    }

    col.querySelector(".trip-name").textContent = trip.name;
    var detailEl = col.querySelector(".trip-detail");
    if (trip.detail) {
      detailEl.textContent = trip.detail;
    } else {
      detailEl.style.display = "none";
    }
    col.querySelector(".trip-dates").textContent = trip.dates;
    col.querySelector(".trip-location").textContent = trip.location;
    col.querySelector(".trip-description").textContent = trip.description;
    col.querySelector("a").href = trip.page;

    cards.appendChild(col);
  });
})();
