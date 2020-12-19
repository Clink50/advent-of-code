const fs = require('fs');

async function part1 () {
  console.time('Part 1 Time');
  const input = await fs.promises.readFile('input.txt', 'utf-8');

  let santaPos = {
    x: 1,
    y: 0
  };

  const pastPositions = [{ ...santaPos }];

  const answer = input.split('').reduce((housesVisited, direction) => {
    switch(direction) {
      case '^':
        santaPos.y += 1;
        break;
      case 'v':
        santaPos.y -= 1;
        break;
      case '>':
        santaPos.x += 1;
        break;
      case '<':
        santaPos.x -= 1;
        break;
    }

    if (!pastPositions.some((pos) => pos.x === santaPos.x && pos.y === santaPos.y)) {
      housesVisited += 1;
    }

    pastPositions.push({ ...santaPos });
    return housesVisited;
  }, 1);

  console.log(`Part 1: ${answer}`);
  console.timeEnd('Part 1 Time');
}

const changeCoord = (direction, position) => {
  switch(direction) {
    case '^':
      position.y += 1;
      break;
    case 'v':
      position.y -= 1;
      break;
    case '>':
      position.x += 1;
      break;
    case '<':
      position.x -= 1;
      break;
  }

  return position;
};

async function part2 () {
  console.time('Part 2 Time');
  const input = await fs.promises.readFile('input.txt', 'utf-8');

  let santaPos = {
    x: 1,
    y: 0
  };
  let roboSantaPos = { ...santaPos };
  const pastPositions = [{ ...santaPos }];

  const answer = input.split('').reduce((housesVisited, direction, index) => {
    const currentSantaPos = index % 2 === 0 ? changeCoord(direction, santaPos) : changeCoord(direction, roboSantaPos);

    if (!pastPositions.some((pos) => pos.x === currentSantaPos.x && pos.y === currentSantaPos.y)) {
      housesVisited += 1;
    }

    pastPositions.push({ ...currentSantaPos });
    return housesVisited;
  }, 1);

  console.log(`\nPart 2: ${answer}`);
  console.timeEnd('Part 2 Time');
}

// More performant to have unique positions instead of pushing every position
part1();
part2();
