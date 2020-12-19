const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  let lines = input.split('\r\n');


}


part1();
// part2();