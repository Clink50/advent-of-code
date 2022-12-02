const fs = require('fs');

async function part1() {
  const NUM_OF_DAYS = 256;
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split(',').map(Number);
  let answer = 0;

  let school = input;

  for (let day = 1; day <= NUM_OF_DAYS; day++) {
    school.forEach((fish, i) => {
      if (fish === 0) {
        school[i] = 6;
        school.push(8);
      } else {
        school[i]--;
      }
    });
    console.log({day});
    console.log(school.length);
  }

  answer = school.length;

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  // PART 2 WAS TAKIN' FROM HERE:
  // https://www.reddit.com/r/adventofcode/comments/r9z49j/comment/ho4rf7d
  // Not smart enough to think of more performant solution

  const NUM_OF_DAYS = 256;
  const input = (await fs.promises.readFile('sample.txt', 'utf-8')).split(',').map(Number);
  let answer = 0;

  // Create array as # of fish life (9 days)
  let school = new Array(9).fill(0);

  // Fill array with fish at day
  input.forEach((fish) => {
    school[fish]++;
  });

  for (let day = 1; day <= NUM_OF_DAYS; day++) {
    // Remove number of fish at index (day 0) 0 from the array
    const birthingFish = school.shift();
    // Take the number of fish and add it to the end of the array
    school.push(birthingFish);
    // Increment the fish at day 6
    school[6] += birthingFish;
  }

  // Count the total number of fish
  answer = school.reduce((a, v) => a + v, 0);

  console.log(`Part 2: ${answer}`);
}

part1();
// part2();