const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const groups = input
    .split(/\r\n\r\n/g)
    .map((group) => group.split(/\r\n/g));

  let sum = 0;

  groups.forEach((group) => {
    const uniqueAnswers = new Set();

    group.forEach(g => {
      const answers = g.split('');

      answers.forEach(answer => {
        uniqueAnswers.add(answer);
      });
    });

    sum += uniqueAnswers.size;
  });

  console.log(`Part 1: ${sum}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const groups = input
    .split(/\r\n\r\n/g)
    .map((group) => group.split(/\r\n/g));

  let sum = 0;

  groups.forEach((person) => {
    const uniqueAnswers = new Set();

    person.forEach(g => {
      const answers = g.split('');
      answers.forEach(answer => {
        uniqueAnswers.add(answer);
      });
    });

    const arr = Array.from(uniqueAnswers);
    const common = arr.filter((answer) =>
      person.every((resp) => resp.includes(answer))
    );

    sum += common.length;
  });

  console.log(`Part 2: ${sum}`);
}

part1();
part2();