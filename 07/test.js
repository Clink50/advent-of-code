const graph = new Array(6).fill(0);

for (let index = 0; index < graph.length; index++) {
  graph[index] = new Array(6).fill(0);
}

const insertNode = (r, c) => {
  r = r - 1;
  c = c - 1;
  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      if (r === row && c === col) {
        graph[row][col] = 1;
        graph[col][row] = 1;
      }
    }
  }
}

const printGraph = () => {
  let graphline = " ";
  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      graphline += graph[row][col];
      graphline += " ";
      if (col == graph.length - 1) {
        console.log(graphline);
        graphline = ' ';
      }
    }
  }
}

insertNode(1, 2);
insertNode(1, 5);
insertNode(2, 3);
insertNode(2, 5);
insertNode(3, 4);
insertNode(4, 5);
insertNode(4, 6);

printGraph();