const fs = require('fs');

async function part1() {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'));

  const answer = Math.max(...getCals(input));

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'));

  const answer = getCals(input)
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, current) => acc += current);

  console.log(`Part 2: ${answer}`);
}

function getCals(input) {
  return input.split('\n\n')
    .map(input => input
      .split('\n')
      .map(Number)
      .reduce((acc, current) => acc += current));
}

part1();
part2();