// Fixed-attachment parallax backgrounds (see the "Parallax Settings" block in
// style.css) freeze scrolling entirely when this page is embedded in a
// cross-origin iframe — a known Chrome bug. Detect embedding and fall back to
// normal scroll-attachment there, same as the existing mobile fallback.
if (window.self !== window.top) {
  document.documentElement.classList.add("embedded");
}
