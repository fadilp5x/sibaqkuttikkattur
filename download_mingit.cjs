const fs = require('fs');
const https = require('https');
const path = require('path');

const destZip = path.join(process.env.TEMP, 'mingit.zip');
const file = fs.createWriteStream(destZip);

console.log('Downloading MinGit...');
function get(url) {
  https.get(url, { headers: { 'User-Agent': 'Node' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Redirecting to:', res.headers.location);
      get(res.headers.location);
      return;
    }
    if (res.statusCode !== 200) {
      console.error('Failed to download:', res.statusCode);
      return;
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('MinGit zip downloaded successfully, size:', fs.statSync(destZip).size);
    });
  }).on('error', (err) => {
    console.error('Download error:', err.message);
  });
}

get('https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip');
