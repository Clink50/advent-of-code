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

const next = (seats) => {
  let newSeats = seats.map((x) => x.map((y) => y));

  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      const char = seats[i][j];
      const adjacent = getAdjacent(seats, i, j);
      const numOccupied = adjacent.filter((val) => val === Constants.OCCUPIED).length;
      if (char === Constants.EMPTY && numOccupied < 1) {
        newSeats[i][j] = Constants.OCCUPIED;
      } else if (char === Constants.OCCUPIED && numOccupied >= 4) {
        newSeats[i][j] = Constants.EMPTY;
      }
    }
  }

  return newSeats;
};

async function part1 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  let myInput = input.split('\r\n').map((x) => x.split(''));
  console.log(myInput);
  let output = myInput.map((x) => x.map((y) => y));
  console.log(output);

  console.log('initial');
  output.forEach(line => {
    console.log(line.join(''));
  });

  while (true) {
    let nextOutput = next(output);

    if (JSON.stringify(nextOutput) === JSON.stringify(output)) {
      console.log('\n');
      nextOutput.forEach((line) => console.log(line.join('')));
      console.log('Part 1:', nextOutput.join('').match(/#/g).length);
      break;
    }

    output = next(output);
  }
}

part1();
// part2();