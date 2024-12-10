// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

// npx http-server -o /day4/day4-test.txt 

// Read the input file
async function getData() {
  try {
    const res = await fetch("http://127.0.0.1:8080/day4/day4-test.txt");
    const text = await res.text();
    return text;
  } catch (e) {
    console.error(e);
    return "";
  }
}

async function main() {
  let input = await getData();

  let count = 0;
  // const regex = /(?:XMAS|SAMX)/gm
  const regex1 = /XMAS/gm;
  const regex2 = /SAMX/gm;

  const rows = input.split("\n");
  // console.log(rows); // Output: [ 'MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM', 'MSAMASMSMX', 'XMASAMXAMM', 'XXAMMXXAMA', 'SMSMSASXSS', 'SAXAMASAAA', 'MAMMMXMMMM', 'MXMXAXMASX' ]

  function checkForMatch(val) {
    if (val.match(regex1)) {
      count++;
    }
    if (val.match(regex2)) {
      count++;
    }
  }

  // HORIZONTAL and BACKWARDS
  function checkHorizontal(rows) {
    rows.forEach(row => {
      checkForMatch(row);
    });
  }

  checkHorizontal(rows);

  console.log(count); // Output: 5

  const matrix = rows.map(row => row.split(""));

  // console.log(matrix); // Output: [ [ 'M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M' ], [ 'M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A' ], [ 'A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M' ], [ 'M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X' ], [ 'X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M' ], [ 'X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A' ], [ 'S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S' ], [ 'S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A' ], [ 'M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M' ], [ 'M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X' ] ]

  // VERTICAL
  function checkVertical(matrix) {
    matrix.forEach((_, i) => {
      let vertical = "";
      for (let j = 0; j < matrix.length; j++) {
        vertical += matrix[j][i];
      }
      checkForMatch(vertical);
    });
  }
  checkVertical(matrix);

  console.log(count); // Output: 8 (5 horizontal + 3 vertical)

  // DIAGONAL
  function checkDiagonals(matrix) {
    let diagonal = "";
    matrix.forEach((_, i) => {
      console.log(i + " " + matrix[i]);
      if (matrix[i][i]) {
        diagonal += matrix[i][i];
      }
    });
    console.log(diagonal);
    checkForMatch(diagonal);
  }
  checkDiagonals(matrix);

  console.log(count); // Output: 18 (5 + 3 vertical + 10 diagonal)
}
main();


/* WORD SEARCG ALGORITHM
function wordSearch(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (searchFrom(row, col, word, 0)) {
        return true;
      }
    }
  }
  return false;
}

function searchFrom(row, col, word, index) {
  if (index === word.length) {
    return true; // Found the word
  }

  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    return false; // Out of bounds
  }

  if (grid[row][col] !== word[index]) {
    return false; // Letter doesn't match
  }

  // Try all directions
  const directions = [
    [0, 1],  // Right
    [0, -1], // Left
    [1, 0],  // Down
    [-1, 0], // Up
    [1, 1],  // Diagonal Down-Right
    [-1, -1], // Diagonal Up-Left
    [1, -1], // Diagonal Down-Left
    [-1, 1], // Diagonal Up-Right
  ];

  for (const [dx, dy] of directions) {
    if (searchFrom(row + dx, col + dy, word, index + 1)) {
      return true;
    }
  }

  return false;
}
*/