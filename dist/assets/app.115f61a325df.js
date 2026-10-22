document.querySelectorAll('.faq details').forEach(item => {
  item.addEventListener('toggle', () => {
    const icon = item.querySelector('.toggle-icon');
    if (icon) icon.textContent = item.open ? '−' : '+';
  });
});

const videos = document.querySelectorAll('video');
videos.forEach(video => video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); })));
const dialog = document.querySelector('.testimonial-dialog');
if (dialog) {
  document.querySelectorAll('[data-testimonial]').forEach(button => button.addEventListener('click', () => {
    dialog.querySelector('img').src = button.dataset.testimonial;
    dialog.querySelector('img').alt = button.querySelector('img').alt;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
}

const film = document.getElementById('hero-film');
if (film) {
  const clips = film.dataset.clips.split(',');
  const toggle = document.querySelector('.film-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, userPaused = reduced.matches;
  const sync = () => { toggle.textContent = userPaused || film.paused ? 'Reproduzir vídeo' : 'Pausar vídeo'; toggle.setAttribute('aria-label', toggle.textContent + ' de fundo'); };
  const play = () => { if (!film.src) film.src = clips[index]; film.muted = true; film.play().then(sync).catch(sync); };
  film.addEventListener('ended', () => { index = (index + 1) % clips.length; film.src = clips[index]; if (!userPaused && !document.hidden) play(); });
  film.addEventListener('play', sync); film.addEventListener('pause', sync);
  toggle.addEventListener('click', () => { userPaused = !film.paused; if (userPaused) film.pause(); else play(); sync(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); else if (!userPaused) play(); });
  reduced.addEventListener('change', event => { if (event.matches) { userPaused = true; film.pause(); sync(); } });
  if (!userPaused) play(); else sync();
}
