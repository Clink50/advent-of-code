const fs = require('fs');

const initialRows = [...Array(128).keys()];
const initialCols = [...Array(8).keys()];

function getSeat (letters) {
  let rows = [...initialRows];
  let cols = [...initialCols];
  for (let index = 0; index < letters.length; index++) {
    const space = letters[index];

    if (space === 'F') {
      rows = rows.splice(0, rows.length / 2);
    } else if (space === 'B') {
      rows = rows.splice(rows.length / 2, rows.length);
    } else if (space === 'R') {
      cols = cols.splice(cols.length / 2, cols.length);
    } else if (space === 'L') {
      cols = cols.splice(0, cols.length / 2);
    }
  }

  const row = Math.min(...rows);
  const col = Math.max(...cols);

  const seatId = (row * 8 + col);
  return seatId;
}

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => line.replace(/\r/g, ''));
  const answers = [];

  lines.forEach((line) => {
    const letters = line.split('');
    answers.push(getSeat(letters));
  });

  const answer1 = Math.max(...answers);
  console.log(`Part 1: ${answer1}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => line.replace(/\r/g, ''));
  const answers = [];
  const found = {};
  let answer2;

  lines.forEach((line) => {
    const letters = line.split('');
    const seatId = getSeat(letters);
    answers.push(seatId);
    found[seatId] = true;
  });

  for (const seatId in found) {
    if (!found[+seatId + 1] && found[+seatId + 2]) {
      answer2 = (+seatId + 1);
    }
  }
  console.log(`Part 2: ${answer2}`);
}

part1();
part2();
