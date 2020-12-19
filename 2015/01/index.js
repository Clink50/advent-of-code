const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const answer = input.split('').reduce((level, p) => p === '(' ? level += 1 : level -= 1, 0);
  console.log(`Part 1: ${answer}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  let answer = 0;
  const floor = input.split('').reduce((level, p, index) => {
    level += p === '(' ? 1 : -1;

    if (level === -1) {
      answer = index + 1;
      return;
    }

    return level;
  }, 0);

  console.log(`Part 2: ${answer}`);
}

part1();
part2();