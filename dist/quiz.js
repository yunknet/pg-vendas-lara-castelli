(function () {
  'use strict';
  const { questions, validAnswers, calculateProfile } = window.LaraQuiz;
  const key = 'lara-quiz-v1';
  let state = { step: 0, answers: Array(questions.length).fill(null), completed: false };
  let advancing = false;
  let timer;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && validAnswers(saved.answers, false) && Number.isInteger(saved.step) && saved.step >= 0 && saved.step < questions.length) {
      state = { step: saved.step, answers: saved.answers, completed: saved.completed === true && validAnswers(saved.answers) };
      // An incomplete session cannot skip unanswered questions.
      const firstMissing = state.answers.indexOf(null);
      if (firstMissing !== -1) state.step = Math.min(state.step, firstMissing);
    }
  } catch { /* Browsing remains usable without storage. */ }
  const $ = id => document.getElementById(id);
  function save() { try { sessionStorage.setItem(key, JSON.stringify(state)); } catch { /* Optional persistence. */ } }
  function focusTitle(id) {
    $(id).focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function updateProgress() {
    const count = state.answers.filter(answer => answer !== null).length;
    $('quiz-progress').max = questions.length;
    $('quiz-progress').value = count;
    $('progress-label').textContent = Math.round(count / questions.length * 100) + '%';
    $('step-label').textContent = state.completed ? 'Seu resultado' : 'Pergunta ' + (state.step + 1) + ' de ' + questions.length;
  }
  function drawQuestion(focus = false) {
    advancing = false;
    $('questions-panel').hidden = false;
    $('result-panel').hidden = true;
    const question = questions[state.step];
    $('quiz-title').textContent = question.title;
    $('quiz-kicker').textContent = question.kicker;
    $('question-note').textContent = question.note;
    $('quiz-picture').hidden = !question.picture;
    $('quiz-options').replaceChildren();
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.setAttribute('aria-pressed', String(state.answers[state.step] === index));
      const icon = document.createElement('span');
      icon.className = 'option-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = option.icon;
      const label = document.createElement('span');
      label.textContent = option.label;
      const arrow = document.createElement('span');
      arrow.className = 'option-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '›';
      button.append(icon, label, arrow);
      button.addEventListener('click', () => choose(index));
      $('quiz-options').append(button);
    });
    $('quiz-back').disabled = state.step === 0;
    updateProgress();
    if (focus) focusTitle('quiz-title');
  }
  function choose(index) {
    if (advancing) return;
    advancing = true;
    state.answers[state.step] = index;
    $('quiz-options').querySelectorAll('button').forEach((button, i) => {
      button.setAttribute('aria-pressed', String(index === i));
      button.disabled = true;
    });
    $('quiz-back').disabled = true;
    updateProgress();
    save();
    timer = setTimeout(() => {
      if (state.step === questions.length - 1) {
        state.completed = true;
        save();
        drawResult(true);
      } else {
        state.step++;
        save();
        drawQuestion(true);
      }
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
  }
  function drawResult(focus = false) {
    if (!validAnswers(state.answers)) return drawQuestion(focus);
    const result = calculateProfile(state.answers);
    advancing = false;
    $('questions-panel').hidden = true;
    $('result-panel').hidden = false;
    $('result-title').textContent = result.profile.title;
    $('result-description').textContent = result.profile.body;
    $('result-goal').textContent = result.goal;
    $('result-action-title').textContent = result.profile.actionTitle;
    $('result-action').textContent = result.profile.action;
    $('result-context').textContent = result.context;
    const checkout = window.laraCheckoutUrl();
    if (checkout) {
      $('result-cta').href = checkout;
      $('result-cta').replaceChildren(document.createTextNode('Quero meu acesso agora ↗'));
    }
    updateProgress();
    if (focus) focusTitle('result-title');
  }
  $('quiz-back').addEventListener('click', () => {
    if (advancing || state.step === 0) return;
    state.step--;
    save();
    drawQuestion(true);
  });
  $('quiz-restart').addEventListener('click', () => {
    clearTimeout(timer);
    state = { step: 0, answers: Array(questions.length).fill(null), completed: false };
    save();
    $('result-details').open = false;
    drawQuestion(true);
  });
  $('result-cta').addEventListener('click', event => {
    if (!window.laraCheckoutUrl()) {
      event.preventDefault();
      $('result-details').open = true;
      $('result-details').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
      $('result-details').querySelector('summary').focus({ preventScroll: true });
    }
  });
  state.completed ? drawResult() : drawQuestion();
})();
