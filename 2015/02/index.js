const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const answer = input
    .split('\r\n')
    .map((x) => x.split('x').map(x => +x))
    .reduce((product, [l, w, h]) => {
      const sides = [l*w, w*h, h*l];
      const min = Math.min(...sides);
      product += sides.reduce((sum, num) => sum += (2 * num), 0) + min;
      return product;
    }, 0);

    console.log(`Part 1: ${answer}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const answer = input
    .split('\r\n')
    .map((x) => x.split('x')
      .map(x => +x)
      .sort((a, b) => a - b))
    .reduce((product, [l, w, h]) => product += (2*l + 2*w) + (l*w*h), 0);

  console.log(`Part 2: ${answer}`);
}

part1();
part2();
