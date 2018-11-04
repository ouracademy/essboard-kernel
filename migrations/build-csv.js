const checkpoints = require('./checkpoints');

const fs = require('fs');
const path = require('path');
const data = checkpoints
  .map(x => [x.identifier, x.state, x.name, x.description, x.type])
  .map(arr => arr.join(','))
  .join('\n');

fs.writeFileSync(path.join(__dirname, 'checkpoints.csv'), data, 'utf8');
