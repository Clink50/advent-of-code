const fs = require('fs');

async function part1 () {
  const input = await fs.promises.readFile('input.txt', 'utf-8');

  const wireInstructions = input.split('\r\n')
    .map((instructions) => instructions.split(/^(?:([a-z\d]+) )?(?:(AND|OR|LSHIFT|RSHIFT|NOT) )?([a-z\d]+) -> ([a-z]+)$/).splice(1))
    .reduce((wires, [source, gate, value, wire]) => {
      if (!isNaN(source)) source = +source;
      if (!isNaN(value)) value = +value;

      wires[wire] = [source, gate, value];
      return wires;
    }, {});



  console.log(answer);
}

async function part2 () {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  const lines = input.split('\r\n');


  console.log(`Part 2: ${answer}`);
}

part1();
// part2();
