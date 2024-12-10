// npx http-server -o /day3/day3-input.txt 

// Read the input file
// async function getData() {
//   try {
//     const res = await fetch("http://127.0.0.1:8080/day3/day3-input.txt");
//     const text = await res.text();
//     return text;
//   } catch (e) {
//     console.error(e);
//     return "";
//   }
// }

async function main() {
  // let input = await getData();
  let input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

  // Regular expression to match numbers inside parentheses after "mul"
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

  let match;
  const allNumbers = [];

  let skip = false;
  while ((match = regex.exec(input)) !== null) {
    if (match[0] === "do()") {
      skip = false;
    } else if (match[0] === "don't()") {
      skip = true;
    }
    if (!skip && match[1] && match[2]) {
      allNumbers.push(Number(match[1]), Number(match[2]));
    }
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

  console.log(total); // Output: 48 (2*4 + 8*5)
}

main();