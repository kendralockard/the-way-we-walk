// Contact form: open the visitor's email client addressed to Avalon
function sendMessage(event) {
  event.preventDefault();
  var form = event.target;
  var name = encodeURIComponent(form.name.value);
  var email = encodeURIComponent(form.email.value);
  var message = encodeURIComponent(form.message.value);
  var subject = "Website inquiry from " + name;
  var body = message + "%0D%0A%0D%0AFrom: " + name + " (" + email + ")";
  window.location.href =
    "mailto:avalonqian@gmail.com?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    body;
  return false;
}

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
