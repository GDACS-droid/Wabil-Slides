/* Auto-fit: if a slide's content is taller than the frame, scale it down so
   nothing is ever clipped by the 720px gold frame. Short content is left alone
   (CSS centers it). Deterministic safety net. Must re-run AFTER webfonts load
   (Amiri/Playfair reflow the content), so we hook document.fonts.ready. */
(function () {
  function fit() {
    var c = document.querySelector('.content');
    if (!c || !c.children.length) return;
    c.style.transform = 'none';
    var minT = Infinity, maxB = -Infinity;
    for (var i = 0; i < c.children.length; i++) {
      var r = c.children[i].getBoundingClientRect();
      if (r.top < minT) minT = r.top;
      if (r.bottom > maxB) maxB = r.bottom;
    }
    var need = maxB - minT;
    var avail = c.clientHeight - 12; // a little breathing room
    if (need > avail) {
      var s = Math.max(0.55, avail / need);
      c.style.transformOrigin = 'center center';
      c.style.transform = 'scale(' + s + ')';
    }
  }
  document.addEventListener('DOMContentLoaded', fit);
  window.addEventListener('load', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(fit, 400); // belt-and-suspenders for slow webfont loads
})();
