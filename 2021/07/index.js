const fs = require('fs');

async function part1() {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split(',')
    .map(Number);
  let sortedInput = [...input].sort((a, b) => a - b);
  let middle = Math.floor(sortedInput.length / 2);
  let median = sortedInput.length % 2 !== 0 ? sortedInput[middle] : (sortedInput[middle - 1] + sortedInput[middle]) / 2;

  console.log(median);

  let answer = 0;

  input.forEach((position) => {
    console.log(position);

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
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split(',').map(Number);
  let answer = 0;



  console.log(`Part 2: ${answer}`);
}

part1();
// part2();