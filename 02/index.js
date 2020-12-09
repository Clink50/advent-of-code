const fs = require('fs');

let answer1 = 0;
let answer2 = 0;

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => line.replace(/\r/g, ''));

  lines.forEach((input) => {
    let [policy, password] = input.split(': ');
    let [requirement, letter] = policy.split(' ');
    let [num1, num2] = requirement.split('-');

    const obj = password.split('').reduce((passwordObj, letter) =>
      ((passwordObj[letter] = (passwordObj[letter] || 0) + 1), passwordObj), {});

    if (obj[letter] >= num1 && obj[letter] <= num2) {
      answer1++;
    }

    if ((password[num1 - 1] === letter && password[num2 - 1] !== letter) ||
      (password[num2 - 1] === letter && password[num1 - 1] !== letter)) {
      answer2++;
    }
  });
}

part1().then(() => {
  console.log(`Part 1: ${answer1}`);
  console.log(`Part 2: ${answer2}`);
});
