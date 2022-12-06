const fs = require('fs');

async function part1() {
  let answer;

  const groups = (await fs.promises.readFile('./04/input.txt', 'utf-8'))
    .split('\n')
    .map((group) => group
      .split(',')
      .map((pair) => pair
        .split('-')
        .map((num) => +num)));

  answer = groups.reduce((sum, group) => {
    const [elf1RangeFrom, elf1RangeTo] = group[0]
    const [elf2RangeFrom, elf2RangeTo] = group[1];

    if ((elf1RangeFrom >= elf2RangeFrom && elf1RangeTo <= elf2RangeTo) ||
      (elf2RangeFrom >= elf1RangeFrom && elf2RangeTo <= elf1RangeTo)) {
      sum += 1;
    }

    return sum;
  }, 0);

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  let answer;

  const groups = (await fs.promises.readFile('./04/input.txt', 'utf-8'))
    .split('\n')
    .map((group) => group
      .split(',')
      .map((pair) => pair
        .split('-')
        .map((num) => +num)));

  answer = groups.reduce((sum, group) => {
    const [elf1RangeFrom, elf1RangeTo] = group[0]
    const [elf2RangeFrom, elf2RangeTo] = group[1];

    if (
      (elf1RangeFrom >= elf2RangeFrom && elf1RangeTo <= elf2RangeTo) ||
      (elf2RangeFrom >= elf1RangeFrom && elf2RangeTo <= elf1RangeTo) ||
      (elf1RangeTo >= elf2RangeFrom && elf2RangeTo >= elf1RangeFrom)
    ) {
      console.log(elf1RangeFrom, elf1RangeTo);
      console.log(elf2RangeFrom, elf2RangeTo);
      sum += 1;
    }

    return sum;
  }, 0);

  console.log(`Part 2: ${answer}`);
}

part1();
part2();