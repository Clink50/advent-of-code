const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\r\n');


  console.log(`Part 1: ${lines}`);
}

// async function part2 () {
//   const input = await fs.promises.readFile('sample.txt', 'utf-8');
//   const lines = input.split('\n').map((num) => +num);


//   console.log(`Part 2: ${nextNum}`);
// }

part1();
// part2();