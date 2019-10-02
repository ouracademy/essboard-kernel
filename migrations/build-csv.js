const fs = require('fs');
const path = require('path');
const checkpoints = require('./source.js');
const data = checkpoints
  .map(x => [
    x.checkpoint.length === 3
      ? `"${parseInt(x.checkpoint / 10)}-${parseInt(x.checkpoint % 10)}"`
      : `"${parseInt(x.checkpoint / 100)}-${parseInt(x.checkpoint % 100)}"`,
    x.state,
    `"${x.name ? x.name : ''}"`,
    `"${x.name}"`,
    !!x.name,
  ])
  .map(arr => arr.join(','))
  .join('\n');

fs.writeFileSync(path.join(__dirname, 'checkpoints.csv'), data, 'utf8');
