const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

// Regular expression to match numbers inside parentheses after "mul"
const regex = /mul\((\d+),(\d+)\)/g;

let match;
const allNumbers = [];

while ((match = regex.exec(input)) !== null) {
  allNumbers.push(Number(match[1]), Number(match[2]));
}

function splitNumbersIntoGroupsOfTwo(arr) {
  const groups = [];
  for (let i = 0; i < arr.length; i += 2) {
    groups.push(arr.slice(i, i + 2));
  }
  return groups;
}

function multiply(arr) {
  return arr[0] * arr[1];
}

const groups = splitNumbersIntoGroupsOfTwo(allNumbers);

let total = 0;
groups.forEach(group => {
  total += multiply(group);
});

console.log(total); // Output: 2*4 + 3*7 + 32*64 + 11*8 + 8*5