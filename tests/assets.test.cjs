const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../dist');
let total = 0;
for (const page of ['index.html', 'quiz.html']) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const references = [...html.matchAll(/(?:href|src)="([^"]+\.(?:css|js)(?:\?[^"]*)?)"/g)];
  assert.equal(references.length, page === 'index.html' ? 3 : 6);
  for (const [, reference] of references) {
    const match = /^assets\/([a-z-]+)\.([a-f0-9]{12})\.(css|js)$/.exec(reference);
    assert.ok(match, 'Unversioned dependency: ' + reference);
    const [, name, hash, extension] = match;
    const source = fs.readFileSync(path.join(root, name + '.' + extension), 'utf8').replace(/\r\n/g, '\n');
    const served = fs.readFileSync(path.join(root, reference), 'utf8').replace(/\r\n/g, '\n');
    assert.deepEqual(served, source, 'Rebuild assets after changing ' + name);
    assert.equal(crypto.createHash('sha256').update(source).digest('hex').slice(0, 12), hash);
    total++;
  }
}
console.log('PASS: ' + total + ' page dependencies match their source and content hash.');
