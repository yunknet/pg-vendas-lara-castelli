const assert = require('node:assert/strict');
const { questions, profiles, calculateProfile, validAnswers } = require('../dist/quiz-data.js');
const winners = new Set(); let combinations = 0;
for(let a=0;a<4;a++)for(let mask=1;mask<16;mask++)for(let c=0;c<4;c++)for(let d=0;d<4;d++)for(let e=0;e<4;e++){
 const selected=[0,1,2,3].filter(i=>mask&(1<<i)); const answers=[a,selected,c,d,e];
 const r=calculateProfile(answers),max=Math.max(...Object.values(r.scores)),preference=questions.at(-1).options[e].priority;
 assert.equal(r.scores[r.key],max);if(r.scores[preference]===max)assert.equal(r.key,preference);
 assert.equal(r.context,questions[2].options[c].context);assert.ok(r.goal&&r.profile.action);winners.add(r.key);combinations++;
}
assert.deepEqual([...winners].sort(),Object.keys(profiles).sort());
for(const bad of [null,[],[0,[],0,0,0],[0,[0,0],0,0,0],[0,[4],0,0,0],[0,0,0,0,0],[0,[0],0,0,NaN],Array(5).fill(null)]){assert.equal(validAnswers(bad),false);assert.throws(()=>calculateProfile(bad),TypeError)}
assert.equal(validAnswers(Array(5).fill(null),false),true);
assert.equal(validAnswers([0,[0,2],null,null,null],false),true);
console.log('PASS: '+combinations+' combinations; multiple selections, all profiles, ties and invalid answers.');
