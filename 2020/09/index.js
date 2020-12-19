const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\r\n').map((num) => +num);
  const preambleLength = 25;
  let nextNum;
  let sumsObj = {};

  for (let index = 0; index < lines.length; index++) {
    let preamble = [...lines.slice(index, preambleLength + index)];
    nextNum = lines.slice(index + preambleLength, index + preambleLength + 1)[0];

    if (!nextNum) {
      break;
    }

    preamble.forEach((currentNum, _, arr) => {
      const toSum = arr.filter((num) => num !== currentNum);
      const sums = toSum.map((num) => num + currentNum);
      sumsObj[currentNum] = sums;
    });

    let invalidCount = 0;

    for (let index = 0; index < preamble.length; index++) {
      const num = preamble[index];

      if (sumsObj[num].includes(nextNum)) {
        break;
      } else {
        invalidCount++;
      }
    }

    if (invalidCount >= (preambleLength - 1)) {
      break;
    }
  }

  console.log(`Part 1: ${nextNum}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((num) => +num);
  const preambleLength = 25;
  let nextNum;
  let sumsObj = {};

  for (let index = 0; index < lines.length; index++) {
    let preamble = [...lines.slice(index, preambleLength + index)];
    nextNum = lines.slice(index + preambleLength, index + preambleLength + 1)[0];

    if (!nextNum) {
      break;
    }

    preamble.forEach((currentNum, _, arr) => {
      const toSum = arr.filter((num) => num !== currentNum);
      const sums = toSum.map((num) => num + currentNum);
      sumsObj[currentNum] = sums;
    });

    let invalidCount = 0;

    for (let index = 0; index < preamble.length; index++) {
      const num = preamble[index];

      if (sumsObj[num].includes(nextNum)) {
        break;
      } else {
        invalidCount++;
      }
    }

    if (invalidCount >= (preambleLength - 1)) {
      break;
    }
  }

  const usedNumbers = [];
  let set = [];
  let foundObj = {};

  findSet:
  for (let index = 0; index < lines.length; index++) {
    const number = lines[index];

    usedNumbers.push(number);
    set.push(number);

    let sum = number;
    foundObj = {
      set,
      found: false
    };

    const filteredNumbers = lines.filter((num) => !usedNumbers.includes(num));

    for (let num of filteredNumbers) {
      set.push(num);
      sum += num;
      if (sum > nextNum) {
        set = [];
        break;
      } else if (sum === nextNum) {
        foundObj = {
          set,
          found: true,
        };
        break findSet;
      }
    }
  }

  const highest = Math.max(...foundObj.set);
  const lowest = Math.min(...foundObj.set);
  const answer = highest + lowest;

  console.log(`Part 2: ${answer}`);
}

part1();
part2();