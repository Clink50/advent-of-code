const fs = require('fs');

async function part1 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split('\n')
    .reduce((steps, curr, i) => {
      steps.push({
        step: curr.split(' ')[0],
        position: curr.split(' ')[1]
      });
      return steps;
    }, []);

  let position = {
    horizontal: 0,
    depth: 0,
  };

  for (let move of input) {
    switch (move.step) {
      case 'forward':
        position.horizontal += +move.position;
        break;
      case 'up':
        position.depth -= +move.position;
        break;
      case 'down':
        position.depth += +move.position;
        break;
    }
  }

  console.log(`Part 1: ${position.horizontal * position.depth}`);
}

async function part2 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split('\n')
    .reduce((steps, curr, i) => {
      steps.push({
        step: curr.split(' ')[0],
        position: curr.split(' ')[1]
      });
      return steps;
    }, []);

  let position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  for (let move of input) {
    switch (move.step) {
      case 'forward':
        position.horizontal += +move.position;
        position.depth = position.depth + (position.aim * +move.position);
        break;
      case 'up':
        position.aim -= +move.position;
        break;
      case 'down':
        position.aim += +move.position;
        break;
    }
  }

  console.log(`Part 1: ${position.horizontal * position.depth}`);
}

// part1();
part2();