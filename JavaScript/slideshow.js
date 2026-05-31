document.querySelectorAll('.slideshow').forEach(ss => {
  const track  = ss.querySelector('.slideshow-track');
  const imgs   = Array.from(track.querySelectorAll('img'));
  const dotsEl = ss.querySelector('.ss-dots');
  const total  = imgs.length;
  let current  = 0;
  let timer;

  // Force each image to exactly the container width so the track is always total * 100%
  function setWidths() {
    const w = ss.offsetWidth;
    imgs.forEach(img => {
      img.style.minWidth = w + 'px';
      img.style.width    = w + 'px';
    });
  }

  setWidths();
  window.addEventListener('resize', () => {
    setWidths();
    goTo(current); // recalculate translate after resize
  });

  // Build dots
  imgs.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'ss-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(index) {
    current = (index + total) % total;
    const w = ss.offsetWidth;
    track.style.transform = `translateX(-${current * w}px)`;
    ss.querySelectorAll('.ss-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    if (total > 1) {
      timer = setInterval(() => goTo(current + 1), 4000);
    }
  }

  ss.querySelector('.ss-prev').addEventListener('click', () => goTo(current - 1));
  ss.querySelector('.ss-next').addEventListener('click', () => goTo(current + 1));

  // Hide arrows and dots if only 1 image
  if (total <= 1) {
    ss.querySelector('.ss-prev').style.display = 'none';
    ss.querySelector('.ss-next').style.display = 'none';
    dotsEl.style.display = 'none';
  }

  resetTimer();
});