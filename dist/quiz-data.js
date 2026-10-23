(function(root){
'use strict';
const questions=[
  {
    "kicker": "",
    "title": "Você usa ou já usou alguma caneta emagrecedora?",
    "note": "",
    "picture": {
      "src": "assets/quiz-comparacao.jpg",
      "alt": "Comparação de antes e depois fornecida pela marca",
      "title": "O emagrecimento foi uma etapa. O cuidado continua.",
      "tag": "SUA PRÓXIMA ETAPA"
    },
    "options": [
      {
        "icon": "💉",
        "label": "Uso atualmente",
        "scores": {}
      },
      {
        "icon": "⏱️",
        "label": "Já usei",
        "scores": {}
      },
      {
        "icon": "🏃‍♀️",
        "label": "Emagreci sem usar canetas",
        "scores": {}
      },
      {
        "icon": "🔍",
        "label": "Ainda estou conhecendo essa fase",
        "scores": {}
      }
    ]
  },
  {
    "kicker": "",
    "title": "Qual caneta você usa ou já usou?",
    "note": "",
    "options": [
      {
        "icon": "💉",
        "label": "Mounjaro (tirzepatida)",
        "scores": {}
      },
      {
        "icon": "💉",
        "label": "Ozempic (semaglutida)",
        "scores": {}
      },
      {
        "icon": "💉",
        "label": "Wegovy (semaglutida)",
        "scores": {}
      },
      {
        "icon": "💉",
        "label": "Saxenda (liraglutida)",
        "scores": {}
      },
      {
        "icon": "🔄",
        "label": "Outra / usei mais de uma",
        "scores": {}
      },
      {
        "icon": "✨",
        "label": "Nunca usei",
        "scores": {}
      }
    ]
  },
  {
    "kicker": "",
    "title": "O que mais incomoda você hoje?",
    "note": "",
    "options": [
      {
        "icon": "🪞",
        "label": "A flacidez depois de emagrecer",
        "scores": {
          "clareza": 3
        }
      },
      {
        "icon": "💪",
        "label": "A falta de definição no corpo",
        "scores": {
          "treino": 3
        }
      },
      {
        "icon": "🍽️",
        "label": "Não saber o que comer",
        "scores": {
          "alimentacao": 3
        }
      },
      {
        "icon": "🗓️",
        "label": "Não conseguir manter uma rotina",
        "scores": {
          "constancia": 3
        }
      }
    ]
  },
  {
    "kicker": "",
    "title": "Você faz exercícios hoje?",
    "note": "",
    "picture": null,
    "options": [
      {
        "icon": "👟",
        "label": "Ainda não comecei ou estou recomeçando",
        "scores": {
          "treino": 3
        }
      },
      {
        "icon": "⏱️",
        "label": "Faço de vez em quando, sem uma sequência",
        "scores": {
          "constancia": 3
        }
      },
      {
        "icon": "🏋️‍♀️",
        "label": "Já treino, mas tenho dúvidas sobre o que fazer",
        "scores": {
          "treino": 2,
          "clareza": 1
        }
      },
      {
        "icon": "🔥",
        "label": "Já tenho uma rotina e quero continuar cuidando dela",
        "scores": {
          "constancia": 1
        }
      }
    ]
  },
  {
    "kicker": "",
    "title": "Como está sua alimentação?",
    "note": "",
    "options": [
      {
        "icon": "🤷‍♀️",
        "label": "Ainda não sei como organizar essa nova fase",
        "scores": {
          "alimentacao": 3
        }
      },
      {
        "icon": "📉",
        "label": "Consigo por alguns dias, depois me desorganizo",
        "scores": {
          "constancia": 2,
          "alimentacao": 1
        }
      },
      {
        "icon": "🥑",
        "label": "Já me organizo, mas tenho dúvidas",
        "scores": {
          "alimentacao": 2
        }
      },
      {
        "icon": "🥗",
        "label": "Tenho uma rotina alimentar bem organizada",
        "scores": {}
      }
    ]
  },
  {
    "kicker": "",
    "title": "O que você mais quer melhorar?",
    "note": "",
    "options": [
      {
        "icon": "💪",
        "label": "Cuidar da flacidez e buscar mais definição",
        "scores": {
          "clareza": 5
        },
        "priority": "clareza"
      },
      {
        "icon": "📋",
        "label": "Ter um treino para seguir",
        "scores": {
          "treino": 5
        },
        "priority": "treino"
      },
      {
        "icon": "🥑",
        "label": "Organizar minha alimentação",
        "scores": {
          "alimentacao": 5
        },
        "priority": "alimentacao"
      },
      {
        "icon": "🌸",
        "label": "Cuidar de mim com mais frequência",
        "scores": {
          "constancia": 5
        },
        "priority": "constancia"
      }
    ]
  }
];
const profiles={
  "clareza": {
    "title": "Quer mais definição depois de emagrecer?"
  },
  "treino": {
    "title": "Comece com um treino para seguir."
  },
  "alimentacao": {
    "title": "Organize sua alimentação sem complicar."
  },
  "constancia": {
    "title": "Tenha um plano para seguir na rotina."
  }
};
function validAnswers(answers,complete=true){return Array.isArray(answers)&&answers.length===questions.length&&answers.every((a,i)=>(!complete&&a===null)||(Number.isInteger(a)&&a>=0&&a<questions[i].options.length));}
function calculateProfile(answers){
 if(!validAnswers(answers))throw new TypeError('Respostas incompletas ou inválidas.');
 const scores=Object.fromEntries(Object.keys(profiles).map(k=>[k,0]));
 answers.forEach((a,i)=>Object.entries(questions[i].options[a].scores).forEach(([k,v])=>scores[k]+=v));
 const preferred=questions.at(-1).options[answers.at(-1)].priority;
 const ranking=Object.keys(scores).sort((a,b)=>scores[b]-scores[a]||(a===preferred?-1:b===preferred?1:0));
 return {key:ranking[0],scores,profile:profiles[ranking[0]],goal:questions.at(-1).options[answers.at(-1)].label};
}
root.LaraQuiz={questions,profiles,validAnswers,calculateProfile};
if(typeof module!=='undefined'&&module.exports)module.exports=root.LaraQuiz;
})(typeof window!=='undefined'?window:globalThis);
