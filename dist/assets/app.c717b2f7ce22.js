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
