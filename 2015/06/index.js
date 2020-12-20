const fs = require('fs');

const gridSize = 1000;
const createInitialGrid = () => {
  const grid = [];

  for (let x = 0; x < gridSize; x++) {
    const row = [];
    for (let y = 0; y < gridSize; y++) {
      row.push({
        x,
        y,
        lit: false,
        brightness: 0
      });
    }
    grid.push(row);
  }

  return grid;
}

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const grid = createInitialGrid();

  const answer = input.split('\r\n')
    .map((line) => line.split(/^(.*) (\d+,\d+) through (\d+,\d+)$/).slice(1))
    .reduce((litLights, [instruction, firstCoord, secondCoord]) => {
      const [x1, y1] = firstCoord.split(',').map((coord) => +coord);
      const [x2, y2] = secondCoord.split(',').map((coord) => +coord);

      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          switch(instruction) {
            case 'turn on':
              if (!grid[x][y].lit) litLights += 1;
              grid[x][y].lit = true;
              break;
            case 'turn off': {
              if (grid[x][y].lit) litLights -= 1;
              grid[x][y].lit = false;
              break;
            }
            case 'toggle':
              if (grid[x][y].lit) litLights -= 1;
              else litLights += 1;
              grid[x][y].lit = !grid[x][y].lit;
              break;
            default:
              console.log('Instruction not included.');
              break;
          }
        }
      }

      return litLights;
    }, 0);

  console.log(`Part 1: ${answer}`);
}

async function part2 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const grid = createInitialGrid();

  const answer = input.split('\r\n')
    .map((line) => line.split(/^(.*) (\d+,\d+) through (\d+,\d+)$/).slice(1))
    .reduce((brightness, [instruction, firstCoord, secondCoord]) => {
      const [x1, y1] = firstCoord.split(',').map((coord) => +coord);
      const [x2, y2] = secondCoord.split(',').map((coord) => +coord);

      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          switch(instruction) {
            case 'turn on':
              brightness += 1;
              grid[x][y].brightness += 1;
              break;
            case 'turn off': {
              brightness -= grid[x][y].brightness > 0 ? 1 : 0;
              grid[x][y].brightness -= grid[x][y].brightness > 0 ? 1 : 0;
              break;
            }
            case 'toggle':
              brightness += 2;
              grid[x][y].brightness += 2;
              break;
            default:
              console.log('Instruction not included.');
              break;
          }
        }
      }

      return brightness;
    }, 0);

  console.log(`Part 2: ${answer}`);
}

part1();
part2();
