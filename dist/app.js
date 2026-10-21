const destination = window.LARA_CONFIG?.conversionUrl;
let checkoutUrl;
try {
  const parsed = new URL(destination);
  if (parsed.protocol === 'https:') checkoutUrl = parsed.href;
} catch {}
if (checkoutUrl) {
  document.querySelectorAll('.conversion').forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => window.location.assign(checkoutUrl));
  });
  document.querySelectorAll('.checkout-note').forEach(note => { note.hidden = true; });
}
document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
  item.querySelector('summary span').textContent = item.open ? '−' : '+';
}));
