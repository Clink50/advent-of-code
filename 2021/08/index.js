const fs = require('fs');

async function part1() {
  const input = (await fs.promises.readFile('sample.txt', 'utf-8'))
  let answer = 0;



  console.log(`Part 1: ${answer}`);
}

async function part2() {
  const input = (await fs.promises.readFile('sample.txt', 'utf-8'));
  let answer = 0;


  console.log(`Part 2: ${answer}`);
}

part1();
// part2();