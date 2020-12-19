const fs = require('fs');

const createInitialGrid = () => {
  const grid = [];

  for (let row = 0; row < 1000; row++) {
    const r = [];
    for (let col = 0; col < 1000; col++) {
      r.push({
        x: row,
        y: col,
        lit: false
      });
    }
    grid.push(r);
  }

  return grid;
}

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const grid = createInitialGrid();

  const answer = input.split('\r\n')
    .map((line) => line.split(/^(.*) (\d+,\d+) through (\d+,\d+)$/).slice(1))
    .reduce((litLights, [instruction, firstCoord, secondCoord]) => {
      const [x1, y1] = firstCoord.split(',');
      const [x2, y2] = secondCoord.split(',');

      for (let row = x1; x2 - row >= 0; row++) {
        for (let col = y1; y2 - col >= 0; col++) {
          if (instruction === 'turn on') {
            litLights += grid[row][col].lit ? 0 : 1;
            grid[row][col].lit = true;
          } if (instruction === 'turn off') {
            litLights += !grid[row][col].lit ? 0 : -1;
            grid[row][col].lit = false;
          } if (instruction === 'toggle') {
            grid[row][col].lit = !grid[row][col].lit;
            litLights += grid[row][col].lit ? 1 : -1;
          }
        }
      }

      return litLights;
    }, 0);

  console.log(`Part 1: ${answer}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');

  const answer = input.split('\r\n')
    .map((line) => line.split(/^(.*) (\d+,\d+) through (\d+,\d+)$/).slice(1))
    .reduce((brightness, [instruction, firstCoord, secondCoord]) => {
      const [x1, y1] = firstCoord.split(',');
      const [x2, y2] = secondCoord.split(',');

      for (let row = x1; x2 - row >= 0; row++) {
        for (let col = y1; y2 - col >= 0; col++) {
          if (instruction === 'turn on') {
            brightness += 1;
          } if (instruction === 'turn off') {
            if (brightness !== 0) {
              brightness -= 1;
            }
          } if (instruction === 'toggle') {
            brightness += 2;
          }
        }
      }
      console.log(brightness);
      return brightness;
    }, 0);

  console.log(`Part 2: ${answer}`);
}

// part1();
part2();
