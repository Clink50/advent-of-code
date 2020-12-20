const fs = require('fs');

const calculateSignal = (wireInstructions, [left, right]) => {
  const [signal] = left.match(/^(\d+|[a-z]+)$/)?.slice(1) || [];
  if (signal) {
    if (!isNaN(+signal)) wireInstructions[right] = +signal;
    else wireInstructions[right] = wireInstructions[signal];
    return wireInstructions;
  }

  const [complement] = left.match(/^NOT ([a-z]+)$/)?.slice(1) || [];
  if (complement) {
    wireInstructions[right] = ~wireInstructions[complement] + 2**16;
    return wireInstructions;
  }

  const [leftSide, operator, rightSide] = left.split(/^([a-z]+|[0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z]+|[a-z0-9]|[0-9]+)$/)?.slice(1);
  switch (operator) {
    case 'AND':
      wireInstructions[right] = wireInstructions[leftSide] & wireInstructions[rightSide];
      break;
    case 'OR':
      wireInstructions[right] = wireInstructions[leftSide] | wireInstructions[rightSide];
      break;
    case 'LSHIFT':
      wireInstructions[right] = wireInstructions[leftSide] << rightSide;
      break;
    case 'RSHIFT':
      wireInstructions[right] = wireInstructions[leftSide] >> rightSide;
      break;
    default:
      console.log('Bitwise Operator does not exist.');
      break;
  }

  return wireInstructions;
};

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');

  const answer = input.split('\r\n')
    .map((instruction) => instruction.split(/ -> /))
    .reduce(calculateSignal, { solved: false });

  console.log(answer);
  // console.log(`Part 1: ${answer.a}`);
}

async function part2 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  const lines = input.split('\r\n');


  console.log(`Part 2: ${answer}`);
}

part1();
// part2();
