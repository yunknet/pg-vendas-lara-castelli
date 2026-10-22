(function (root) {
  'use strict';
  const questions = [
    { kicker: 'RESPONDA DO SEU JEITO', title: 'Como você se sente com seu corpo depois de emagrecer?', note: 'Não existe resposta certa. Escolha a que mais combina com você.', picture: { src: 'assets/quiz-momento.png', alt: 'Mulher adulta com roupa esportiva diante de um espelho na academia', title: 'Seu corpo mudou. O cuidado continua.', tag: 'UMA NOVA FASE' }, options: [
      { icon: '🪞', label: 'Me sinto melhor, mas a flacidez ainda incomoda', scores: { clareza: 2 } },
      { icon: '💪', label: 'Emagreci, mas esperava mais definição', scores: { treino: 2 } },
      { icon: '🌱', label: 'Quero voltar a cuidar de mim com mais constância', scores: { constancia: 2 } },
      { icon: '✨', label: 'Estou bem e quero continuar melhorando', scores: { constancia: 1 } }
    ]},
    { kicker: 'VAMOS ENTENDER SEU MOMENTO', title: 'O que mais faz falta nessa nova fase?', note: 'Pense no que você gostaria de entender ou organizar hoje.', options: [
      { icon: '🤔', label: 'Entender o que fazer em relação à flacidez', scores: { clareza: 3 } },
      { icon: '🏋️', label: 'Saber como treinar buscando mais definição', scores: { treino: 3 } },
      { icon: '🥗', label: 'Organizar minha alimentação', scores: { alimentacao: 3 } },
      { icon: '🤝', label: 'Ter apoio para continuar, sem me perder na rotina', scores: { constancia: 3 } }
    ]},
    { kicker: 'UM OLHAR PARA A ROTINA', title: 'Como o exercício entra na sua semana hoje?', note: 'Escolha o cenário mais próximo da sua rotina atual.', picture: { src: 'assets/quiz-rotina.png', alt: 'Mulher adulta com roupa esportiva em uma academia', title: 'Um passo de cada vez. No seu ritmo.', tag: 'SEU MOMENTO' }, options: [
      { icon: '🌱', label: 'Ainda não comecei ou estou recomeçando', scores: { treino: 3 }, context: 'Você contou que está começando ou recomeçando. Seu ponto de partida merece respeitar esse momento.' },
      { icon: '🗓️', label: 'Faço de vez em quando, sem uma sequência', scores: { constancia: 3 }, context: 'Você contou que o exercício ainda acontece de vez em quando. Organizar a continuidade é uma parte importante do seu começo.' },
      { icon: '🤔', label: 'Já treino, mas tenho dúvidas sobre o que fazer', scores: { treino: 2, clareza: 1 }, context: 'Você já treina e quer mais direção. Vale levar suas dúvidas e objetivos para a orientação que receber.' },
      { icon: '✅', label: 'Já tenho uma rotina e quero continuar cuidando dela', scores: { constancia: 1 }, context: 'Você já tem uma rotina de exercícios. Essa base pode fazer parte da próxima etapa do seu cuidado.' }
    ]},
    { kicker: 'E A ALIMENTAÇÃO?', title: 'Como estão suas escolhas no dia a dia?', note: 'Sem julgamento: o objetivo é conhecer seu momento.', options: [
      { icon: '🥗', label: 'Ainda não sei como organizar essa nova fase', scores: { alimentacao: 3 } },
      { icon: '🔄', label: 'Consigo por alguns dias, depois me desorganizo', scores: { constancia: 2, alimentacao: 1 } },
      { icon: '💭', label: 'Já me organizo, mas tenho dúvidas', scores: { alimentacao: 2 } },
      { icon: '✅', label: 'Tenho uma rotina alimentar bem organizada', scores: {} }
    ]},
    { kicker: 'O QUE ESTÁ NO CAMINHO?', title: 'O que mais dificulta cuidar de você hoje?', note: 'Escolha a dificuldade que mais pesa neste momento.', options: [
      { icon: '🧩', label: 'Muita informação e pouca clareza sobre o que fazer', scores: { clareza: 3 } },
      { icon: '⏰', label: 'Encaixar o cuidado no meu dia a dia', scores: { constancia: 3 } },
      { icon: '🎯', label: 'Conectar meu treino ao objetivo que quero buscar', scores: { treino: 3 } },
      { icon: '🍽️', label: 'Saber como organizar minha alimentação', scores: { alimentacao: 3 } }
    ]},
    { kicker: 'AGORA, O QUE IMPORTA PARA VOCÊ', title: 'Qual seria o melhor primeiro passo?', note: 'Sua prioridade ajuda a dar direção ao resultado.', options: [
      { icon: '🪞', label: 'Entender melhor o cuidado com a flacidez e a definição', scores: { clareza: 5 }, priority: 'clareza' },
      { icon: '🏋️', label: 'Organizar meus treinos para buscar mais definição', scores: { treino: 5 }, priority: 'treino' },
      { icon: '🥗', label: 'Ter mais direção para organizar minha alimentação', scores: { alimentacao: 5 }, priority: 'alimentacao' },
      { icon: '💚', label: 'Construir uma rotina de cuidado que eu consiga manter', scores: { constancia: 5 }, priority: 'constancia' }
    ]}
  ];
  const profiles = {
    clareza: { title: 'Seu começo pede mais clareza.', body: 'Suas respostas destacam a vontade de entender o que faz sentido para o seu corpo depois do emagrecimento. Separar os objetivos ajuda a escolher o próximo passo com expectativas mais claras.', actionTitle: 'Entenda o que você quer cuidar.', action: 'Buscar definição muscular é diferente de remover excesso de pele. Treino e alimentação podem fazer parte do cuidado com a composição corporal; a pele que sobrou precisa de avaliação individual. Leve essa diferença em conta ao organizar seus objetivos.' },
    treino: { title: 'Seu próximo foco é dar direção ao treino.', body: 'A busca por definição apareceu com destaque nas suas respostas. O seu interesse agora é entender como colocar o exercício a serviço dessa nova fase.', actionTitle: 'Transforme seu objetivo em direção.', action: 'Comece identificando o que você quer desenvolver e como o exercício cabe na sua rotina. A proposta reúne orientação de treino, alimentação e acompanhamento para apoiar esse começo.' },
    alimentacao: { title: 'Seu próximo foco é organizar a alimentação.', body: 'Suas respostas apontam dúvidas e vontade de organizar melhor as escolhas do dia a dia. Essa é uma parte do cuidado que merece atenção junto com o treino.', actionTitle: 'Olhe para sua rotina real.', action: 'Observe em quais momentos é mais difícil se organizar e quais dúvidas você gostaria de esclarecer. Esse é um ponto de partida para aproveitar as orientações de alimentação e conectá-las ao restante do cuidado.' },
    constancia: { title: 'Seu próximo foco é a continuidade.', body: 'Você quer cuidar do corpo e encontrar espaço para isso na vida real. Suas respostas destacam a importância de ter direção e apoio para continuar.', actionTitle: 'Comece pelo que cabe no seu dia.', action: 'Identifique os momentos em que o cuidado costuma ficar para depois. A proposta conecta treino, alimentação e acompanhamento para apoiar a passagem da intenção para uma rotina.' }
  };
  function validAnswers(answers, complete = true) {
    return Array.isArray(answers) && answers.length === questions.length && answers.every((a, i) => (!complete && a === null) || (Number.isInteger(a) && a >= 0 && a < questions[i].options.length));
  }
  function calculateProfile(answers) {
    if (!validAnswers(answers)) throw new TypeError('Respostas incompletas ou inválidas.');
    const scores = Object.fromEntries(Object.keys(profiles).map(key => [key, 0]));
    answers.forEach((answer, i) => Object.entries(questions[i].options[answer].scores).forEach(([key, weight]) => { scores[key] += weight; }));
    const preferred = questions.at(-1).options[answers.at(-1)].priority;
    const ranking = Object.keys(scores).sort((a, b) => scores[b] - scores[a] || (a === preferred ? -1 : b === preferred ? 1 : 0));
    return { key: ranking[0], scores, profile: profiles[ranking[0]], goal: questions.at(-1).options[answers.at(-1)].label, context: questions[2].options[answers[2]].context };
  }
  root.LaraQuiz = { questions, profiles, validAnswers, calculateProfile };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.LaraQuiz;
})(typeof window !== 'undefined' ? window : globalThis);
