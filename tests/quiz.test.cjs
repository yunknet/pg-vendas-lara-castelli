const assert = require('node:assert/strict');
const { questions, profiles, calculateProfile, validAnswers } = require('../dist/quiz-data.js');
const winners = new Set();
let combinations = 0;
for (let n = 0; n < 4 ** questions.length; n++) {
  const answers = Array.from({ length: questions.length }, (_, i) => (n >> (2 * i)) & 3);
  const result = calculateProfile(answers);
  const max = Math.max(...Object.values(result.scores));
  assert.equal(result.scores[result.key], max, 'Winner must have the highest score');
  const preference = questions.at(-1).options[answers.at(-1)].priority;
  if (result.scores[preference] === max) assert.equal(result.key, preference, 'Explicit priority wins ties');
  assert.equal(result.context, questions[2].options[answers[2]].context);
  assert.ok(result.goal && result.profile.action && result.profile.body);
  winners.add(result.key);
  combinations++;
}
assert.deepEqual([...winners].sort(), Object.keys(profiles).sort(), 'All profiles are reachable');
for (const invalid of [null, [], Array(6).fill(null), Array(6).fill(4), Array(6).fill(-1), Array(6).fill('0'), [0, 0, 0, 0, 0, NaN]]) {
  assert.equal(validAnswers(invalid), false);
  assert.throws(() => calculateProfile(invalid), TypeError);
}
assert.equal(validAnswers(Array(6).fill(null), false), true);
assert.equal(calculateProfile([0, 0, 2, 3, 0, 0]).key, 'clareza');
assert.equal(calculateProfile([1, 1, 0, 3, 2, 1]).key, 'treino');
assert.equal(calculateProfile([3, 2, 3, 0, 3, 2]).key, 'alimentacao');
assert.equal(calculateProfile([2, 3, 1, 1, 1, 3]).key, 'constancia');
console.log('PASS: ' + combinations + ' combinations, all four profiles, ties and invalid inputs.');
