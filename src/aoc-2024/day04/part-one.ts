import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`);
const lines = file.toString().split('\n');

// const directions = [
//   [0, 1], // Right
//   [1, 0], // Down
//   [0, -1], // Left
//   [-1, 0], // Up
//   [1, 1], // Down Right
//   [1, -1], // Down Left
//   [-1, 1], // Up Right
//   [-1, -1], // Up Left
// ];

let total = 0;

const directions = {
  right: [
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  down: [
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  left: [
    [0, -1],
    [0, -2],
    [0, -3],
  ],
  up: [
    [-1, 0],
    [-2, 0],
    [-3, 0],
  ],
  downRight: [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  downLeft: [
    [1, -1],
    [2, -2],
    [3, -3],
  ],
  upRight: [
    [-1, 1],
    [-2, 2],
    [-3, 3],
  ],
  upLeft: [
    [-1, -1],
    [-2, -2],
    [-3, -3],
  ],
};

for (let x = 0; x < lines.length; x++) {
  for (let y = 0; y < lines[x].length; y++) {
    if (lines[x][y] === 'X') {
      total += search(x, y);
    }
  }
}

function search(x: number, y: number): number {
  let count = 0;
  const word = 'XMAS';

  for (const direction in directions) {
    const steps = directions[direction];
    let found = true;
    for (let k = 0; k < steps.length; k++) {
      const [dx, dy] = steps[k];
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= lines.length || ny < 0 || ny >= lines[nx].length || lines[nx][ny] !== word[k + 1]) {
        found = false;
        break;
      }
    }
    if (found) {
      count++;
    }
  }

  return count;
}

console.log(total); // should return 18 with test input
