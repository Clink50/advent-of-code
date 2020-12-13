const fs = require('fs');

const Constants = {
  EMPTY: 'L',
  FLOOR: '.',
  OCCUPIED: '#'
};

const getAdjacent = (lines, i, j) => {
  const adjacent = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      // ignore yourself
      if (x == 0 && y == 0) {
        continue;
      }
      else {
        if (!lines[i + x] || !lines[i + x][j + y]) continue;
        adjacent.push(lines[i + x][j + y]);
      }
    }
  }

  return adjacent;
};

async function part1 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  let lines = input.split('\r\n').map((x) => x.split(''));

  while (true) {
    let updatedLines = lines.map((x) => x.map((y) => y));

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        const adjacent = getAdjacent(lines, i, j);
        const numOccupied = adjacent.filter((val) => val === Constants.OCCUPIED).length;
        if (char === Constants.EMPTY && numOccupied < 1) {
          updatedLines[i][j] = Constants.OCCUPIED;
        } else if (char === Constants.OCCUPIED && numOccupied >= 4) {
          updatedLines[i][j] = Constants.EMPTY;
        }
      }
    }

    if (JSON.stringify(updatedLines) === JSON.stringify(lines)) {
      console.log('Part 1:', updatedLines.join('').match(/#/g).length);
      break;
    }

    lines = updatedLines;
  }
}


part1();
// part2();