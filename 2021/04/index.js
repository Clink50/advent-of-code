const fs = require('fs');

function checkBingo(markedValues) {
  let match = false;
  let bingoValues = [];
  let index = 0;

  // console.log(markedValues)

  for (let myType of ['horizontal', 'veritcal']) {
    for (index; index <= 4; index++) {
      let values = markedValues.filter((value) => myType === 'horizontal' ? value.row === index : value.column === index);
      match = values.length === 5;

      if (match) {
        bingoValues = values;
        break;
      }
    }
    if (match) {
      break;
    }
    index = 0;
  }

  return {
    isBingo: match,
    bingoValues
  };
}

function findNumInBoard(board, randomNum) {
  let found = false;
  let match = {};

  for (const [rowNum, row] of board.entries()) {
    for (const [columnNum, value] of row.entries()) {
      if (value === randomNum) {
        found = true;
        match = {
          value,
          row: rowNum,
          column: columnNum,
        };
        break;
      }
    }
    if (found) break;
  }

  return match;
}

async function part1 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split('\n\n');
  let answer = 0;
  const randomNums = input[0].split(',');
  const boards = input
    .slice(1, input.length)
    .map((board) => board.split('\n')
      .map((row) => row.split(' ')
      .filter((r) => r)));

  console.log(boards);
  console.log(randomNums);

  const marked = {};
  let bingo = false;

  for (const randomNum of randomNums) {
    for (const [boardNum, board] of boards.entries()) {
      console.log(board);

      const match = findNumInBoard(board, randomNum);

      marked[boardNum] = marked[boardNum]?.length > 0 ? [...marked[boardNum], match] : [match];

      console.log(marked[boardNum]);
      const { isBingo, bingoValues } = checkBingo(marked[boardNum]);

      if (isBingo) {
        bingo = true;
        let markedValues = marked[boardNum].map((val) => val.value);
        console.log(markedValues)
        let nonWinningValues = boards[boardNum].flat().filter(x => !markedValues.includes(x));
        console.log(nonWinningValues.flat());
        const sum = nonWinningValues.flat().reduce((a, b) => +a + +b, 0);
        console.log(sum);
        answer = sum * randomNum;
        break;
      }
    }
    if (bingo) {
      break;
    }
  }

  console.log(answer);
  console.log(`Part 1: ${answer}`);
}

function traverseBoard(board, bingoNum, boardNum, marked) {
  // console.log(board);

  const match = findNumInBoard(board, bingoNum);

  marked[boardNum] = marked[boardNum]?.length > 0 ? [...marked[boardNum], match] : [match];

  return marked;
}

async function part2 () {
  const input = (await fs.promises.readFile('input.txt', 'utf-8')).split('\n\n');
  let answer = [];
  const bingoNums = input[0].split(',');
  const boards = input
    .slice(1, input.length)
    .map((board) => board.split('\n')
      .map((row) => row.split(' ')
      .filter((r) => r)));

  // console.log(boards);
  // console.log(bingoNums);

  let marked = {};
  let bingo = false;

  for (const bingoNum of bingoNums) {
    for (const [boardNum, board] of boards.entries()) {
      if (answer.find((key) => key[boardNum])) {
        continue;
      }

      marked = traverseBoard(board, bingoNum, boardNum, marked);

      const { isBingo, bingoValues } = checkBingo(marked[boardNum]);

      console.log({ markedAtBoardNum: marked[boardNum] });
      // console.log(isBingo);

      console.log({boardNum});

      if (isBingo) {
        bingo = true;
        let markedValues = marked[boardNum].map((val) => val.value);
        console.log({markedValues})
        console.log({bingoValues});
        let nonWinningValues = boards[boardNum].flat().filter(x => !markedValues.includes(x));
        console.log({nonWinningValues: nonWinningValues.flat()});
        const sum = nonWinningValues.flat().reduce((a, b) => +a + +b, 0);
        console.log({sum});
        console.log({bingoNum});
        answer.push({ [boardNum]: sum * bingoNum });
      }
    }
  }

  console.log(answer[answer.length - 1]);

  console.log(`Part 2: ${answer[answer.length - 1]}`);
}

// part1();
part2();