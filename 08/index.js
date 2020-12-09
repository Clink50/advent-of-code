const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\r\n');

  let acc = 0;
  let operationsRun = [];

  for (let index = 0; index < lines.length; index++) {
    const operation = lines[index];
    const run = operationsRun.some((value) => value.operation === operation && index === value.index);

    if (run) {
      break;
    }

    operationsRun.push({
      operation,
      index
    });

    const [type, step] = operation.split(' ');
    if (type === 'nop') {
      continue;
    } else if (type === 'acc') {
      let number = +(step.match(/\d+/g) || [0])[0];
      const isPlus = /\+\d/.test(step);
      if (isPlus) {
        acc += number;
      } else {
        acc -= number;
      }
    } else if (type === 'jmp') {
      number = +(step.match(/\d+/g) || [0])[0];
      const isPlus = /\+\d/.test(step);
      if (isPlus) {
        index = (index - 1) + number;
      } else {
        index = (index - 1) - number;
      }
    }
  }

  console.log(`Part 1: ${acc}`);
}

function executeProgram(lines) {
  let acc = 0;
  let operationsRun = [];

  for (let index = 0; index < lines.length; index++) {
    const operation = lines[index];
    const run = operationsRun.some((value) => value.operation === operation && index === value.index);

    if (run) {
      return -1;
    }

    operationsRun.push({
      operation,
      index
    });

    const [type, step] = operation.split(' ');
    if (type === 'nop') {
      continue;
    } else if (type === 'acc') {
      let number = +(step.match(/\d+/g) || [0])[0];
      const isPlus = /\+\d/.test(step);
      if (isPlus) {
        acc += number;
      } else {
        acc -= number;
      }
    } else if (type === 'jmp') {
      number = +(step.match(/\d+/g) || [0])[0];
      const isPlus = /\+\d/.test(step);
      if (isPlus) {
        index = (index - 1) + number;
      } else {
        index = (index - 1) - number;
      }
    }
  }

  return acc;
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\r\n');
  let acc = 0;

  for (let index = 0; index < lines.length; index++) {
    let operation = lines[index];

    const [type] = operation.split(' ');

    if (type === 'jmp') {
      lines[index] = operation.replace(/jmp/g, 'nop');
    } else if (type === 'nop') {
      lines[index] = operation.replace(/nop/g, 'jmp');
    }

    acc = executeProgram(lines);

    if (acc !== -1) {
      console.log(`Part 2: ${acc}`);
      break;
    } else {
      lines[index] = operation;
    }
  }
}

part1();
part2();