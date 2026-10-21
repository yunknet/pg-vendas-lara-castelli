const destination = window.LARA_CONFIG?.conversionUrl;
if (destination && /^https:\/\//.test(destination)) {
  document.querySelectorAll('.conversion').forEach(link => {
    link.href = destination;
    link.innerHTML = 'Quero saber como participar <span>↗</span>';
    link.removeAttribute('target');
  });
}
document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
  item.querySelector('summary span').textContent = item.open ? '−' : '+';
}));
