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
window.laraCheckoutUrl = function () {
  try {
    const url = new URL(window.LARA_CONFIG?.conversionUrl || '');
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
};
