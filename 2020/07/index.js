const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  const lines = input.split('\n');
  let answer1;

  console.log(lines);

  // console.log(`Part 1: ${answer1}`);
}


part1();