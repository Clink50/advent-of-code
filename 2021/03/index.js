const fs = require('fs');

async function part1 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split('\n');

  let index = 0;
  let numExists = true;
  let numsAtIndex = [];
  let commonAndLeast = [];

  while (numExists) {
    for (let [i, num] of input.entries()) {
      if (index === num.length - 1) {
        numExists = false;
      }

      numsAtIndex.push(num[index]);

      if (i === input.length - 1) {
        let zeroes = numsAtIndex.filter(num => num == 0).length;
        let ones = numsAtIndex.filter(num => num == 1).length;

        commonAndLeast.push(zeroes > ones ? { common: 0, least: 1 } : { common: 1, least: 0 });

        index++;
        numsAtIndex = [];
      }
    }
  }

  const reduced = commonAndLeast.reduce((prev, curr) => ({
    gamma: (prev?.gamma ?? '') + curr.common,
    epsilon: (prev?.epsilon ?? '') + curr.least,
  }), {});

  const gamma = parseInt(reduced.gamma, 2);
  const epsilon = parseInt(reduced.epsilon, 2);

  console.log(`Part 1: ${gamma * epsilon}`);
}

function getRating(input, isO2Rating) {
  let index = 0;
  let numExists = true;
  let numsAtIndex = [];
  let updatedInput = input;

  while (numExists) {
    for (let [i, num] of updatedInput.entries()) {
      if (index === num.length - 1) {
        numExists = false;
      }

      numsAtIndex.push({
        [num]: num[index]
      });

      if (i === updatedInput.length - 1) {
        let zeroesObj = numsAtIndex.filter(num => Object.values(num) == 0);
        let onesObj = numsAtIndex.filter(num => Object.values(num) == 1);

        if (isO2Rating) {
          if (zeroesObj.length > onesObj.length) {
            updatedInput = zeroesObj.map((val) => Object.keys(val)).flat();
          } else if (onesObj.length > zeroesObj.length) {
            updatedInput = onesObj.map((val) => Object.keys(val)).flat();
          } else {
            updatedInput = onesObj.map((val) => Object.keys(val)).flat();
          }
        } else {
          if (zeroesObj.length < onesObj.length) {
            updatedInput = zeroesObj.map((val) => Object.keys(val)).flat();
          } else if (onesObj.length < zeroesObj.length) {
            updatedInput = onesObj.map((val) => Object.keys(val)).flat();
          } else {
            updatedInput = zeroesObj.map((val) => Object.keys(val)).flat();
          }
        }
        index++;
        numsAtIndex = [];

        if (updatedInput.length === 1) {
          numExists = false;
        }
      }
    }
  }

  return updatedInput;
}

async function part2 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split('\n');

  const o2 = getRating(input, true);
  const co2 = getRating(input, false);

  const o2Rating = parseInt(o2, 2);
  const co2Rating = parseInt(co2, 2);

  console.log(`Part 2: ${o2Rating * co2Rating}`);
}

// part1();
part2();