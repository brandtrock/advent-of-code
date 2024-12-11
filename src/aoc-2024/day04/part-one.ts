import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input-test.txt`);
const lines = file.toString().split('\n');
const matrix = lines.map((line) => line.split(''));

/* MATRIX with test input (input-test.txt):
[ 
  [ 'M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M' ], 
  [ 'M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A' ], 
  [ 'A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M' ], 
  [ 'M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X' ], 
  [ 'X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M' ], 
  [ 'X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A' ], 
  [ 'S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S' ], 
  [ 'S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A' ], 
  [ 'M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M' ], 
  [ 'M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X' ] 
]
*/

const xmas = 'XMAS';
let count = 0;

function checkXmas(matrix: string[][], row: number, col: number, index: number): boolean {
  if (index === xmas.length) {
    return true; // Found "XMAS"
  }

  if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length) {
    return false; // Out of bounds
  }

  if (matrix[row][col] !== xmas[index]) {
    return false; // Not the correct letter
  }

  // Check all directions
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
    [1, 1], // Down Right
    [1, -1], // Down Left
    [-1, 1], // Up Right
    [-1, -1], // Up Left
  ];

  for (const direction of directions) {
    const newRow = row + direction[0];
    const newCol = col + direction[1];

    if (checkXmas(matrix, newRow, newCol, index + 1)) {
      return true;
    }
  }

  return false;
}

function findXmas(matrix: string[][]): number {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === xmas[0]) {
        if (checkXmas(matrix, i, j, 0)) {
          count++;
        }
      }
    }
  }

  return count;
}

console.log(findXmas(matrix)); // should return 18 with test input
