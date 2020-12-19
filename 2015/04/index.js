const fs = require('fs');
const crypto = require('crypto');

async function part1 () {
  const input = 'ckczppom';
  let answer = 0;
  let hash = '';

  while (!hash.match(/^00000/)) {
    const md5 = crypto.createHash('md5');
    answer++;
    md5.update(input + answer, 'utf-8');
    hash = md5.digest('hex');
  }

  console.log(`Part 1: ${answer}`);
}

async function part2 () {
  const input = 'ckczppom';
  let answer = 0;
  let hash = '';

  while (!hash.match(/^000000/)) {
    const md5 = crypto.createHash('md5');
    answer++;
    md5.update(input + answer, 'utf-8');
    hash = md5.digest('hex');
  }

  console.log(`Part 2: ${answer}`);
}

part1();
part2();
