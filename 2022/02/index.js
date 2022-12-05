const fs = require('fs');

async function part1() {
  const convert = {
    a: 1, // rock
    b: 2, // paper
    c: 3, // scissors

    x: 1, // rock
    y: 2, // paper
    z: 3, // scissors
  };

  // value of 0 - draw
  // -2 - you lose
  // -1 - you win
  // 2 - you win
  // 1 - you lose

  const lines = (await fs.promises.readFile('./02/input.txt', 'utf-8'))
    .split('\n')
    .map(line => line
      .split(' ')
      .map(letter => letter.toLowerCase()));

  const sum = lines.reduce((acc, curr) => {
    const [opp, me] = curr;

    // value of 0 - draw
    // -2 - you lose
    // -1 - you win
    // 2 - you win
    // 1 - you lose

    const subtraction = convert[opp] - convert[me];

    if (subtraction === 2 || subtraction === -1) {
      // Win = 6 points
      acc += convert[me] + 6;
    } else if (subtraction === -2 || subtraction === 1) {
      // Lose = 0 points
      acc += convert[me];
    } else {
      // Draw = 3 points
      acc += convert[me] + 3;
    }

    return acc;
  }, 0);

  const answer = sum;

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  const convert = {
    a: 1, // rock
    b: 2, // paper
    c: 3, // scissors

    x: 1, // lose
    y: 2, // draw
    z: 3, // win
  };

  const lines = (await fs.promises.readFile('./02/input.txt', 'utf-8'))
    .split('\n')
    .map(line => line
      .split(' ')
      .map(letter => letter.toLowerCase()));

  const sum = lines.reduce((acc, curr) => {
    const [opp, outcome] = curr;
    const arr = ['a', 'b', 'c'];

    let index = arr.indexOf(opp);

    if (outcome === 'y') {
      // Draw = 6 points
      acc += convert[opp] + 3;
    } else if (outcome === 'x') {
      // Lose = 0 points
      index -= 1;
      if (index < 0) index = 2;
      acc += convert[arr[index]];
    } else {
      console.log(index);
      // Win = 3 points
      index += 1;
      if (index > arr.length - 1) index = 0;
      acc += convert[arr[index]] + 6;
    }

    return acc;
  }, 0);

  const answer = sum;

  console.log(`Part 1: ${answer}`);
}

part1();
part2();