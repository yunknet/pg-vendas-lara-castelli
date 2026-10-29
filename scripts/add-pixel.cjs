const fs = require('node:fs');
const path = require('node:path');

const pixelSnippet = [
  '  <!-- Meta Pixel Code -->',
  '  <script>',
  '  !function(f,b,e,v,n,t,s)',
  '  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?',
  '  n.callMethod.apply(n,arguments):n.queue.push(arguments)};',
  '  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';',
  '  n.queue=[];t=b.createElement(e);t.async=!0;',
  '  t.src=v;s=b.getElementsByTagName(e)[0];',
  '  s.parentNode.insertBefore(t,s)}(window, document,\'script\',',
  '  \'https://connect.facebook.net/en_US/fbevents.js\');',
  '  fbq(\'init\', \'1841329007288706\');',
  '  fbq(\'track\', \'PageView\');',
  '  </script>',
  '  <noscript><img height="1" width="1" style="display:none"',
  '  src="https://www.facebook.com/tr?id=1841329007288706&ev=PageView&noscript=1"',
  '  /></noscript>',
  '  <!-- End Meta Pixel Code -->'
];

for (const page of ['index.html', 'quiz.html']) {
  const file = path.resolve(__dirname, '../dist', page);
  let content = fs.readFileSync(file, 'utf8');
  const isCrlf = content.includes('\r\n');
  const nl = isCrlf ? '\r\n' : '\n';
  const snippet = pixelSnippet.join(nl);

  if (content.includes('1841329007288706')) {
    console.log(`Pixel already present in ${page}.`);
  } else {
    const target = '</head>';
    const replacement = snippet + nl + target;
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Pixel successfully added to ${page}.`);
  }
}
