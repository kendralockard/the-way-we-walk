// ---------------------------------------------------------------------------
// EDIT YOUR TRIPS HERE. Add, remove, or change entries in this one list and
// the cards on the offerings page update automatically.
// `image` is optional — leave it as "" to show the diagonal-stripe placeholder.
// `detail` is optional — a second line shown below the name on the card.
// `page` is the path to the trip's detail page, relative to the site root.
// ---------------------------------------------------------------------------
var trips = [
  {
    name: "Mini Trip for young ones",
    detail: "(ages 5-10)",
    dates: "June 29 - July 3",
    location: "surrounding Bay Area",
    description:
      "A week full of day trips exploring the Bay Area.  Offered to young ones aged 5 to 10.",
    image: "images/mini-trip-for-kids-2.jpeg",
    page: "trips/mini-trip.html",
  },
  {
    name: "Topographic Map and Compass Navigation Class",
    dates: "September 25 & October 17",
    location: "Marin Headlands",
    description:
      "Come and learn how to situate yourself in relationship to the land using a topographic map and compass.",
    image: "images/topo-map-compass.jpeg",
    page: "trips/topographic-map-compass.html",
  },
];

(function () {
  var cards = document.getElementById("trip-cards");
  var template = document.getElementById("trip-card-template");
  if (!cards || !template) return; // not on the offerings page

  trips.forEach(function (trip) {
    var card = template.content.cloneNode(true).firstElementChild;
    var img = card.querySelector(".trip-card-image");
    var placeholder = card.querySelector(".trip-card-placeholder");

    if (trip.image) {
      img.src = trip.image;
      img.alt = trip.name;
      placeholder.remove();
    } else {
      img.remove();
    }

    card.querySelector(".trip-card-name").textContent = trip.name;
    var detailEl = card.querySelector(".trip-card-detail");
    if (trip.detail) {
      detailEl.textContent = trip.detail;
    } else {
      detailEl.remove();
    }
    card.querySelector(".trip-dates .trip-meta-text").textContent = trip.dates;
    card.querySelector(".trip-location .trip-meta-text").textContent = trip.location;
    card.querySelector(".trip-desc").textContent = trip.description;
    card.querySelector("a").href = trip.page;

    cards.appendChild(card);
  });
})();
