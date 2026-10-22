// Shared navigation. Keep answers out of URLs, analytics and checkout parameters.
window.laraQuizLink = function () {
  const url = new URL('quiz.html', window.location.href);
  const current = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
    if (current.has(key)) url.searchParams.set(key, current.get(key).slice(0, 200));
  });
  return url.href;
};

document.querySelectorAll('[data-quiz]').forEach(link => { link.href = window.laraQuizLink(); });

window.laraAttachUtms = function (baseUrl) {
  try {
    const url = new URL(baseUrl);
    const current = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
      if (current.has(key)) url.searchParams.set(key, current.get(key).slice(0, 200));
    });
    return url.href;
  } catch {
    return baseUrl;
  }
};

document.querySelectorAll('[data-checkout]').forEach(link => {
  const plan = link.getAttribute('data-checkout');
  const target = plan === 'mensal'
    ? (window.LARA_CONFIG?.checkoutMensal || 'https://lastlink.com/p/CF7FF860C/checkout-payment/')
    : (window.LARA_CONFIG?.checkoutAnual || 'https://lastlink.com/p/CC766B758/checkout-payment/');
  link.href = window.laraAttachUtms(target);
});

window.laraCheckoutUrl = function () {
  return window.LARA_CONFIG?.checkoutMensal || 'https://lastlink.com/p/CF7FF860C/checkout-payment/';
};
