const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => line.replace(/\r/g, ''));

  // Skip the first line
  lines.shift();

  let index = 3;
  let treeCount = 0;

  lines.forEach((row) => {
    // Wrap around otherwise index will just keep increasing
    const rowIndex = index % row.length;

    if (row[rowIndex] === '#') {
      treeCount += 1;
    }

    index += 3;
  });

  console.log(`Part 1: ${treeCount}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => line.replace(/\r/g, ''));
  const slopes = [
    {
      x: 1,
      y: 1
    },
    {
      x: 3,
      y: 1
    },
    {
      x: 5,
      y: 1
    },
    {
      x: 7,
      y: 1
    },
    {
      x: 1,
      y: 2
    },
  ];
  const treeCounts = [];

  slopes.forEach(({ x, y }) => {
    let index = x;
    let treeCount = 0;

    for (let i = y; i < lines.length; i += y) {
      const row = lines[i];
      // Wrap around otherwise index will just keep increasing
      const rowIndex = index % row.length;

      if (row[rowIndex] === '#') {
        treeCount += 1;
      }

      index += x;
    };

    treeCounts.push(treeCount);
  });

  const answer = treeCounts.reduce((a, b) => a * b, 1);
  console.log(`Part 2: ${answer}`);
}

part1();
part2();