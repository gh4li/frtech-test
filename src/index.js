const Mower = require('./Mower.js');
const MowerHandler = require('./MowerHandler');
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf8').split("\n");
const lawn = data[0].split(' ').map(c => parseInt(c));
let i = 1;
while (i < data.length) {
  const position = data[i].split(' ')
  const initPosition = [parseInt(position[0]), parseInt(position[1])];
  const direction = position[2];
  const mower = new Mower(initPosition, direction, lawn);
  const handler = new MowerHandler(mower);
  const commands = data[i + 1].split('');
  handler.operate(commands);
  console.log(mower.position);
  i += 2;
}
