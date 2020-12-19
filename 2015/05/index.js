const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const answer = input.split('\r\n')
    .reduce((strings, line) => {
      const isEnoughVowels = line.match(/a|e|i|o|u/gi)?.length >= 3;
      const isLetterTwice = line.match(/([a-z])\1/i);
      const substringExists = line.match(/ab|cd|pq|xy/gi)?.length > 0;

      return strings += (!substringExists && isEnoughVowels && isLetterTwice) ? 1 : 0;
    }, 0);

  console.log(`Part 1: ${answer}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const answer = input.split('\r\n')
    .reduce((strings, line) => {
      const between = line.match(/(.).\1/)?.length > 0;
      const repeat = line.match(/(..).*\1/)?.length > 0;

      return strings += (between && repeat) ? 1 : 0;
    }, 0);

  console.log(`Part 2: ${answer}`);
}

// part1();
part2();
