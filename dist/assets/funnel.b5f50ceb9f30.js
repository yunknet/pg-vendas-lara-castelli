// Shared navigation and Meta Pixel funnel tracking.
window.laraTrackPixel = function (event, data, isCustom) {
  try {
    if (typeof window.fbq === 'function') {
      if (isCustom) {
        window.fbq('trackCustom', event, data);
      } else {
        window.fbq('track', event, data);
      }
    }
  } catch {
    /* Silent catch so ad blockers don't interrupt navigation */
  }
};

window.laraQuizLink = function () {
  const url = new URL('quiz.html', window.location.href);
  const current = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
    if (current.has(key)) url.searchParams.set(key, current.get(key).slice(0, 200));
  });
  return url.href;
};

document.querySelectorAll('[data-quiz]').forEach(link => {
  link.href = window.laraQuizLink();
  link.addEventListener('click', () => {
    window.laraTrackPixel('StartQuiz', { content_name: 'Quiz Lara Castelli' }, true);
  });
});

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

window.laraTrackCheckout = function (plan) {
  const isAnual = plan === 'anual';
  window.laraTrackPixel('InitiateCheckout', {
    content_name: isAnual ? 'Plano Anual' : 'Plano Mensal',
    value: isAnual ? 297.90 : 27.90,
    currency: 'BRL'
  });
};

document.querySelectorAll('[data-checkout]').forEach(link => {
  const plan = link.getAttribute('data-checkout');
  const target = plan === 'mensal'
    ? (window.LARA_CONFIG?.checkoutMensal || 'https://lastlink.com/p/CF7FF860C/checkout-payment/')
    : (window.LARA_CONFIG?.checkoutAnual || 'https://lastlink.com/p/CC766B758/checkout-payment/');
  link.href = window.laraAttachUtms(target);
  link.addEventListener('click', () => window.laraTrackCheckout(plan));
});

window.laraCheckoutUrl = function () {
  return window.LARA_CONFIG?.checkoutMensal || 'https://lastlink.com/p/CF7FF860C/checkout-payment/';
};
