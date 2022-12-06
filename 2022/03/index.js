const fs = require('fs');

function getLetterCount(line) {
  return line
    .split('')
    .reduce((obj, letter) => {
      obj[letter] = obj[letter] + 1 || 1;
      return obj;
    }, {});
}

function getLetterPriority(letter) {
  console.log(letter);
  if (letter === letter.toUpperCase()) {
    return letter.charCodeAt() - 38;
  } else {
    return letter.charCodeAt() - 96;
  }
}

async function part1() {
  const answer = (await fs.promises.readFile('./03/input.txt', 'utf-8'))
    .split('\n')
    .map(line => {
      const first = Object.keys(getLetterCount(line.slice(0, line.length / 2)));
      const second = Object.keys(getLetterCount(line.slice(line.length / 2)));
      const intersection = first.find(element => second.includes(element));
      return getLetterPriority(intersection);
    })
    .reduce((acc, curr) => acc += curr);

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  let answer = 0;
  (await fs.promises.readFile('./03/input.txt', 'utf-8'))
    .split('\n')
    .reduce((acc, curr, index) => {
      acc.push(curr);

      if ((index + 1) % 3 === 0) {
        const first = Object.keys(getLetterCount(acc[0]));
        const second = Object.keys(getLetterCount(acc[1]));
        const third = Object.keys(getLetterCount(acc[2]));
        const intersection = first.find(element => second.includes(element) && third.includes(element));

        answer += getLetterPriority(intersection);
        acc = [];
      }

      return acc;
    }, []);

  console.log(`Part 2: ${answer}`);
}

// part1();
part2();