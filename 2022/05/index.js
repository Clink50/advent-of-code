const fs = require('fs');

function getStackInput(input) {
  let stackInput = input
    .split('\n\n')[0]
    .split('\n')
    .map((line) => line.split(''));

  let indices = stackInput[stackInput.length - 1].reduce((indices, line, index) => {
    if (/\d+/g.test(line)) indices.push(index);
    return indices;
  }, []);

  const stacks = [];
  indices.forEach((idx) => {
    const stack = [];
    stackInput.forEach((line, index) => {
      if (index === stackInput.length - 1 || (!line[idx]?.trim() ?? true)) return;
      stack.push(line[idx]);
    });
    stacks.push(stack);
  });

  return stacks;
}

function getInstructions(input) {
  let instructionSet = [];
  input
    .split('\n\n')[1]
    .split('\n')
    .forEach((line) => {
      [...line.matchAll(/move (\d+) from (\d+) to (\d+)/g)]
        .forEach((match) => {
          instructionSet.push({
            move: +match[1],
            // subtract 1 so that the indexes start at 0 instead of 1
            indexFrom: match[2] - 1,
            indexTo: match[3] - 1,
          });
        });
    });

  return instructionSet;
}

function getInput(input) {
  const stacks = getStackInput(input);
  const instructions = getInstructions(input);

  return {
    stacks,
    instructions,
  };
}

async function part1() {
  let answer;

  const input = (await fs.promises.readFile('./05/input.txt', 'utf-8'));
  const { stacks, instructions } = getInput(input);
  instructions.forEach(({ move, indexFrom, indexTo }) => {
    for (let index = 0; index < move; index++) {
      const removed = stacks[indexFrom].shift();
      stacks[indexTo].unshift(removed);
    }
  });

  answer = stacks.map((stack) => stack[0]).join('');

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  let answer;

  const input = (await fs.promises.readFile('./05/input.txt', 'utf-8'));
  const { stacks, instructions } = getInput(input);

  instructions.forEach(({ move, indexFrom, indexTo }) => {
    const removed = stacks[indexFrom].splice(0, move);
    stacks[indexTo] = removed.concat(stacks[indexTo]);
  });

  answer = stacks.map((stack) => stack[0]).join('');

  console.log(`Part 2: ${answer}`);
}

part1();
part2();