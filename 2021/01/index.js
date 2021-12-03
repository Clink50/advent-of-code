const fs = require('fs');

async function part1 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split('\n');;
  console.log(`Part 1: ${getCount(input)}`);
}

async function part2 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split('\n');
  let sums = [];

  for (const [index, value] of input.entries()) {
    if (!+input[index + 1] || !+input[index + 2]) {
      break;
    }

    let sum = +value + +input[index + 1] + +input[index + 2];
    sums.push(sum);
  }

  console.log(`Part 2: ${getCount(sums)}`);
}

function getCount(input) {
  let count = 0;

  input.reduce((previous, current, index) => {
    if (index === 0) {
      return previous;
    }

    if (+current > previous) {
      count++;
    }

    return current;
  }, 0);

  return count;
}

part1();
part2();