const fs = require('node:fs');
const path = require('node:path');

const file = path.resolve(__dirname, '../dist/quiz-data.js');
let s = fs.readFileSync(file, 'utf8');

const replacements = [
  // Q1: Você usa ou já usou alguma caneta emagrecedora?
  { from: '"icon": "✅",\r\n        "label": "Já usei"', to: '"icon": "⏱️",\r\n        "label": "Já usei"' },
  { from: '"icon": "🌱",\r\n        "label": "Emagreci sem usar canetas"', to: '"icon": "🏃‍♀️",\r\n        "label": "Emagreci sem usar canetas"' },
  { from: '"icon": "💭",\r\n        "label": "Ainda estou conhecendo essa fase"', to: '"icon": "🔍",\r\n        "label": "Ainda estou conhecendo essa fase"' },

  // Q2: Qual caneta você usa ou já usou?
  { from: '"icon": "💉",\r\n        "label": "Outra / usei mais de uma"', to: '"icon": "🔄",\r\n        "label": "Outra / usei mais de uma"' },
  { from: '"icon": "🌱",\r\n        "label": "Nunca usei"', to: '"icon": "✨",\r\n        "label": "Nunca usei"' },

  // Q3: O que mais incomoda você hoje?
  { from: '"icon": "🤔",\r\n        "label": "A flacidez depois de emagrecer"', to: '"icon": "🪞",\r\n        "label": "A flacidez depois de emagrecer"' },
  { from: '"icon": "🏋️",\r\n        "label": "A falta de definição no corpo"', to: '"icon": "💪",\r\n        "label": "A falta de definição no corpo"' },
  { from: '"icon": "🥗",\r\n        "label": "Não saber o que comer"', to: '"icon": "🍽️",\r\n        "label": "Não saber o que comer"' },
  { from: '"icon": "🤝",\r\n        "label": "Não conseguir manter uma rotina"', to: '"icon": "🗓️",\r\n        "label": "Não conseguir manter uma rotina"' },

  // Q4: Você faz exercícios hoje?
  { from: '"icon": "🌱",\r\n        "label": "Ainda não comecei ou estou recomeçando"', to: '"icon": "👟",\r\n        "label": "Ainda não comecei ou estou recomeçando"' },
  { from: '"icon": "🗓️",\r\n        "label": "Faço de vez em quando, sem uma sequência"', to: '"icon": "⏱️",\r\n        "label": "Faço de vez em quando, sem uma sequência"' },
  { from: '"icon": "🤔",\r\n        "label": "Já treino, mas tenho dúvidas sobre o que fazer"', to: '"icon": "🏋️‍♀️",\r\n        "label": "Já treino, mas tenho dúvidas sobre o que fazer"' },
  { from: '"icon": "✅",\r\n        "label": "Já tenho uma rotina e quero continuar cuidando dela"', to: '"icon": "🔥",\r\n        "label": "Já tenho uma rotina e quero continuar cuidando dela"' },

  // Q5: Como está sua alimentação?
  { from: '"icon": "🥗",\r\n        "label": "Ainda não sei como organizar essa nova fase"', to: '"icon": "🤷‍♀️",\r\n        "label": "Ainda não sei como organizar essa nova fase"' },
  { from: '"icon": "🔄",\r\n        "label": "Consigo por alguns dias, depois me desorganizo"', to: '"icon": "📉",\r\n        "label": "Consigo por alguns dias, depois me desorganizo"' },
  { from: '"icon": "💭",\r\n        "label": "Já me organizo, mas tenho dúvidas"', to: '"icon": "🥑",\r\n        "label": "Já me organizo, mas tenho dúvidas"' },
  { from: '"icon": "✅",\r\n        "label": "Tenho uma rotina alimentar bem organizada"', to: '"icon": "🥗",\r\n        "label": "Tenho uma rotina alimentar bem organizada"' },

  // Q6: O que você mais quer melhorar?
  { from: '"icon": "🪞",\r\n        "label": "Cuidar da flacidez e buscar mais definição"', to: '"icon": "💪",\r\n        "label": "Cuidar da flacidez e buscar mais definição"' },
  { from: '"icon": "🏋️",\r\n        "label": "Ter um treino para seguir"', to: '"icon": "📋",\r\n        "label": "Ter um treino para seguir"' },
  { from: '"icon": "🥗",\r\n        "label": "Organizar minha alimentação"', to: '"icon": "🥑",\r\n        "label": "Organizar minha alimentação"' },
  { from: '"icon": "💚",\r\n        "label": "Cuidar de mim com mais frequência"', to: '"icon": "🌸",\r\n        "label": "Cuidar de mim com mais frequência"' }
];

let replaced = 0;
for (const { from, to } of replacements) {
  // Support both CRLF and LF in memory
  const normalizedFrom = from.replace(/\r\n/g, '\n');
  const normalizedFile = s.replace(/\r\n/g, '\n');
  if (normalizedFile.includes(normalizedFrom)) {
    // Replace while preserving CRLF
    s = s.replace(from, to);
    if (!s.includes(to)) {
      // Try with LF if CRLF didn't match directly
      s = s.replace(normalizedFrom, to.replace(/\r\n/g, '\n'));
    }
    replaced++;
  } else {
    console.error('NOT FOUND in file:', from);
  }
}

fs.writeFileSync(file, s, 'utf8');
console.log(`Successfully updated ${replaced} of ${replacements.length} quiz icons.`);
