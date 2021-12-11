const fs = require('fs');

function drawLine(point, lineType, grid) {
  let start = 0;
  let end = 0;

  if (lineType === 'horizontal') {
    start = Math.min(point.y1, point.y2);
    end = Math.max(point.y1, point.y2);
  }

  if (lineType === 'vertical') {
    start = Math.min(point.x1, point.x2);
    end = Math.max(point.x1, point.x2);
  }

  if (lineType === 'horizontal' || lineType === 'vertical') {
    for (start; start <= end; start++) {
      let horizontalPointExists = grid.find((p) => (lineType === 'horizontal' && p.x === point.x1 && p.y === start));
      let verticalPointExists = grid.find((p) => (lineType === 'vertical' && p.y === point.y1 && p.x === start));

      if (horizontalPointExists) {
        horizontalPointExists.point++;
      } else if (verticalPointExists) {
        verticalPointExists.point++;
      } else {
        grid.push({
          x: lineType === 'horizontal' ? point.x1 : start,
          y: lineType === 'horizontal' ? start : point.y1,
          point: 1,
        });
      }
    }
  } else {
    let tempX = point.x1;
    let tempY = point.y1;

    let xEnd = tempX > point.x2 ? point.x2 - 1 : point.x2 + 1;
    let yEnd = tempY > point.y2 ? point.y2 - 1 : point.y2 + 1;

    while (tempX !== xEnd && tempY !== yEnd) {
      const pointExists = grid.find((p) => (p.x === tempX && p.y === tempY));

      if (pointExists) {
        pointExists.point++;
      } else {
        grid.push({
          x: tempX,
          y: tempY,
          point: 1,
        });
      }

      tempX += tempX >= xEnd ? -1 : 1;
      tempY += tempY >= yEnd ? -1 : 1;
    }
  }

  return grid;
}

async function part1() {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split('\n')
    .map((coord) => coord.split(' -> '))
    .map((coord) => {
      let start = coord[0].split(',');

      let startX = +start[0];
      let startY = +start[1];

      let end = coord[1].split(',');

      let endX = +end[0];
      let endY = +end[1];

      return {
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
      };
    })

  let answer = 0;
  let grid = [];

  for (let coord of input) {
    if (coord.x1 === coord.x2) {
      // Horizontal line found - +1
      grid = drawLine(coord, 'horizontal', grid);
    }

    if (coord.y1 === coord.y2) {
      // Vertial line found - +1
      grid = drawLine(coord, 'vertical', grid);
    }
  }

  answer = grid.filter((v) => v.point >= 2).length;

  console.log(`Part 1: ${answer}`);
}

async function part2() {
  const input = (await fs.promises.readFile('input.txt', 'utf-8'))
    .split('\n')
    .map((coord) => coord.split(' -> '))
    .map((coord) => {
      let start = coord[0].split(',');

      let startX = +start[0];
      let startY = +start[1];

      let end = coord[1].split(',');

      let endX = +end[0];
      let endY = +end[1];

      return {
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
      };
    })

  let answer = 0;
  let grid = [];

  for (let coord of input) {
    if (coord.x1 === coord.x2) {
      // Horizontal line found - +1
      grid = drawLine(coord, 'horizontal', grid);
    }

    if (coord.y1 === coord.y2) {
      // Vertical line found - +1
      grid = drawLine(coord, 'vertical', grid);
    }

    if (Math.abs(coord.x1 - coord.x2) === Math.abs(coord.y1 - coord.y2)) {
      // Diagonal line found - +1
      grid = drawLine(coord, 'diagonal', grid);
    }
  }

  answer = grid.filter((v) => v.point >= 2).length;

  console.log(`Part 2: ${answer}`);
}

// part1();
part2();