const assert=require('node:assert/strict');
const {questions,profiles,calculateProfile,validAnswers}=require('../dist/quiz-data.js');
let combinations=0;const winners=new Set();
function visit(answers){if(answers.length<questions.length){questions[answers.length].options.forEach((_,i)=>visit([...answers,i]));return;}
 const result=calculateProfile(answers),max=Math.max(...Object.values(result.scores));
 assert.equal(result.scores[result.key],max);const preferred=questions.at(-1).options[answers.at(-1)].priority;
 if(result.scores[preferred]===max)assert.equal(result.key,preferred);
 assert.ok(result.goal&&result.profile.title);winners.add(result.key);combinations++;
}
visit([]);assert.deepEqual([...winners].sort(),Object.keys(profiles).sort());
for(const bad of [null,[],Array(6).fill(null),[0,[0],0,0,0,0],[0,6,0,0,0,0],[0,0,0,0,0,NaN]]){assert.equal(validAnswers(bad),false);assert.throws(()=>calculateProfile(bad),TypeError)}
assert.equal(validAnswers(Array(6).fill(null),false),true);
assert.ok(questions.every(q=>!q.multiple));
console.log('PASS: '+combinations+' combinations, single choice, all profiles and invalid answers.');
