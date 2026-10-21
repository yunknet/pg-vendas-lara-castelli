// Fingerprint every CSS/JS dependency so the host's 30-day cache cannot mix releases.
// Original files stay editable. Previously generated assets remain valid for old HTML.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../dist');
const files = ['style.css', 'quiz.css', 'app.js', 'funnel.js', 'config.js', 'quiz-data.js', 'quiz.js'];
const replacements = new Map();
fs.mkdirSync(path.join(root, 'assets'), { recursive: true });
for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
  const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
  const extension = path.extname(file);
  const stem = path.basename(file, extension);
  const output = 'assets/' + stem + '.' + hash + extension;
  fs.writeFileSync(path.join(root, output), content);
  replacements.set(file, output);
}
for (const file of ['index.html', 'quiz.html']) {
  const location = path.join(root, file);
  const html = fs.readFileSync(location, 'utf8').replace(
    /\b(href|src)="([^"]+\.(?:css|js)(?:\?[^"]*)?)"/g,
    (match, attribute, url) => {
      const source = path.basename(url.split('?')[0]).replace(/\.[a-f0-9]{12}(?=\.(?:css|js)$)/, '');
      return replacements.has(source) ? attribute + '="' + replacements.get(source) + '"' : match;
    }
  );
  fs.writeFileSync(location, html);
}
console.log('Fingerprinted ' + files.length + ' assets in both pages.');
