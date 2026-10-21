document.querySelectorAll('.faq details').forEach(item => {
  item.addEventListener('toggle', () => {
    const icon = item.querySelector('.toggle-icon');
    if (icon) icon.textContent = item.open ? '−' : '+';
  });
});
