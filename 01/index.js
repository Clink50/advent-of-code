// const goal = 2020;

// // Part 1
// for (let i = 0; i < inputs.length; i++) {
//   let first = inputs[i];

//   for (let j = 0; j < inputs.length; j++) {
//     let second = inputs[j + 1];

//       let part1 = first + second;

//       if (part1 === goal) {
//         let part1 = first * second;
//         console.log(part1);
//       }

//       for (let k = 0; k < inputs.length; k++) {
//         let third = inputs[k + 2];

//         let part2 = first + second + third;

//         if (part2 === goal) {
//           let part2 = first * second * third;
//           console.log(part2);
//         }
//       }
//   }
// }

const fs = require('fs');

const goal = 2020;

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => (line.replace(/\r/g, ''), +line));

  // Part 1
  for (let i = 0; i < lines.length; i++) {
    let first = lines[i];

    for (let j = 0; j < lines.length; j++) {
      let second = lines[j + 1];

      let part1 = first + second;

      if (part1 === goal) {
        answer1 = first * second;
      }

      for (let k = 0; k < lines.length; k++) {
        let third = lines[k + 2];

        let part2 = first + second + third;

        if (part2 === goal) {
          answer2 = first * second * third;
        }
      }
    }
  }
}

part1().then(() => {
  console.log(`Part 1: ${answer1}`);
  console.log(`Part 2: ${answer2}`);
});
