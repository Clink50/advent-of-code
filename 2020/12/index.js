const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  let lines = input.split('\r\n');

  const instructions = {
    'N': 0,
    'S': 0,
    'E': 0,
    'W': 0
  };

  let currentDirection = 'E';

  for (const line of lines) {
    let [_, action, amount] = line.match(/([A-Z])(\d+)/);
    amount = +amount;


  }

  console.log(instructions);
}


part1();
// part2();