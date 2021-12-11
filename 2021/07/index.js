const fs = require('fs');

async function part1() {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split(',')
    .map(Number);
  let sortedInput = [...input].sort((a, b) => a - b);
  let middle = Math.floor(sortedInput.length / 2);
  let median = sortedInput.length % 2 !== 0 ? sortedInput[middle] : (sortedInput[middle - 1] + sortedInput[middle]) / 2;

  let answer = 0;

  input.forEach((position) => {
    if (position > median) {
      for (position; position > median; position--) {
        answer++;
      }
    } else {
      for (position; position < median; position++) {
        answer++;
      }
    }
  });

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  // PART 2 WAS TAKIN' FROM HERE:
  // https://www.reddit.com/r/adventofcode/comments/rar7ty/comment/hnmnqvm
  // Don't know math so I didn't know about a Gauss Method (triangular number)

  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split(',')
    .map(Number);

  // Keep up with each crabs fuel
  let fuel = [];

  // Go from smallest to largest number (of crabs)
  for (let i = Math.min(...input); i <= Math.max(...input); i++) {
    // Set an initial fuel cost for each crab
    fuel[i] = 0;

    // Go through each crab in the input
    for (let j = 0; j < input.length; j++) {
      // Do some math to figure out the fuel for each crab
      const positionDiff = Math.abs(input[j] - i);
      fuel[i] += positionDiff * ((positionDiff + 1) / 2);
    }
  }

  console.log(`Part 2: ${Math.min(...fuel)}`);
}

// part1();
part2();