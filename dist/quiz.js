(function () {
  'use strict';
  const { questions, validAnswers, calculateProfile } = window.LaraQuiz;
  const key = 'lara-quiz-v3';
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
    $('question-note').hidden = !question.note;
    $('quiz-kicker').hidden = !question.kicker;
    $('quiz-picture').hidden = !question.picture;
    if (question.picture) {
      const picture = $('quiz-picture');
      picture.querySelector('img').src = question.picture.src;
      picture.querySelector('img').alt = question.picture.alt;
      picture.querySelector('strong').textContent = question.picture.title;
      picture.querySelector('small').textContent = question.picture.tag;
    }
    $('quiz-opening').hidden = state.step !== 0;
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

    const question = questions[state.step];
    const option = question?.options?.[index];
    if (typeof window.laraTrackPixel === 'function') {
      window.laraTrackPixel('QuizStep', {
        step: state.step + 1,
        total_steps: questions.length,
        question: question?.title || '',
        answer: option?.label || ''
      }, true);
    }

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
    $('quiz-opening').hidden = true;
    $('result-panel').hidden = false;
    $('result-title').textContent = result.profile.title;
    $('result-goal').textContent = result.goal;

    if (typeof window.laraTrackPixel === 'function') {
      window.laraTrackPixel('Lead', {
        content_name: result.profile.title,
        goal: result.goal
      });
      window.laraTrackPixel('QuizComplete', {
        profile: result.key,
        goal: result.goal
      }, true);
    }

    $('result-panel').querySelectorAll('[data-checkout]').forEach(link => {
      const plan = link.getAttribute('data-checkout');
      const target = plan === 'mensal'
        ? (window.LARA_CONFIG?.checkoutMensal || 'https://lastlink.com/p/CF7FF860C/checkout-payment/')
        : (window.LARA_CONFIG?.checkoutAnual || 'https://lastlink.com/p/CC766B758/checkout-payment/');
      if (typeof window.laraAttachUtms === 'function') {
        link.href = window.laraAttachUtms(target);
      }
      link.onclick = () => {
        if (typeof window.laraTrackCheckout === 'function') {
          window.laraTrackCheckout(plan);
        }
      };
    });
    const checkout = window.laraCheckoutUrl();
    if (checkout && $('result-cta')) {
      $('result-cta').href = checkout;
      $('result-cta').onclick = () => {
        if (typeof window.laraTrackCheckout === 'function') {
          window.laraTrackCheckout('mensal');
        }
      };
      $('result-cta').innerHTML = '<span>Quero meu acesso agora</span><svg class="icon-arrow" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    updateProgress();
    if (focus) { focusTitle('result-title'); celebrate(); }
  }

  function celebrate() {
    document.querySelector('.confetti')?.remove();
    const layer = document.createElement('div'); layer.className = 'confetti'; layer.setAttribute('aria-hidden','true');
    const colors=['#ff597b','#ffc857','#5cd6b0','#71a7ff','#c185ff'];
    for(let i=0;i<64;i++){
      const piece=document.createElement('i');
      piece.style.setProperty('--x',Math.random()*100+'%');
      piece.style.setProperty('--drift',(Math.random()-.5)*180+'px');
      piece.style.setProperty('--delay',Math.random()*.6+'s');
      piece.style.setProperty('--turn',Math.random()*720+'deg');
      piece.style.background=colors[i%colors.length]; layer.append(piece);
    }
    document.body.append(layer);setTimeout(()=>layer.remove(),4000);
  }
  $('quiz-back').addEventListener('click', () => {
    if (advancing || state.step === 0) return;
    state.step--;
    save();
    drawQuestion(true);
  });
  $('quiz-restart').addEventListener('click', () => {
    clearTimeout(timer);
    document.querySelector('.confetti')?.remove();
    state = { step: 0, answers: Array(questions.length).fill(null), completed: false };
    save();
    $('result-details').open = false;
    drawQuestion(true);
  });
  const resultCta = $('result-cta');
  if (resultCta) {
    resultCta.addEventListener('click', event => {
      if (!window.laraCheckoutUrl()) {
        event.preventDefault();
        $('result-details').open = true;
        $('result-details').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
        $('result-details').querySelector('summary').focus({ preventScroll: true });
      }
    });
  }
  if (typeof window.laraTrackPixel === 'function' && !state.completed) {
    window.laraTrackPixel('ViewContent', { content_name: 'Quiz Lara Castelli' });
  }
  state.completed ? drawResult() : drawQuestion();
})();
