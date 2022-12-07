const fs = require('fs');

async function part1() {
  let answer;
  const charsToCount = 4;

  const input = (await fs.promises.readFile('./06/input.txt', 'utf-8'));

  for (let index = 0; index < input.length; index++) {
    if (new Set(input.slice(index, index + charsToCount)).size === charsToCount) {
      answer = index + charsToCount;
      break;
    }
  }

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  let answer;
  const charsToCount = 14;

  const input = (await fs.promises.readFile('./06/input.txt', 'utf-8'));

  for (let index = 0; index < input.length; index++) {
    if (new Set(input.slice(index, index + charsToCount)).size === charsToCount) {
      answer = index + charsToCount;
      break;
    }
  }

  console.log(`Part 2: ${answer}`);
}

part1();
part2();