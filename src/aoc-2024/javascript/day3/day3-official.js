// npx http-server -o /day3/day3-input.txt 

// Read the input file
async function getData() {
  try {
    const res = await fetch("http://127.0.0.1:8080/day3/day3-input.txt");
    const text = await res.text();
    return text;
  } catch (e) {
    console.error(e);
    return "";
  }
}

async function main() {
  let input = await getData();

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

  console.log(total); // Output example: 2*4 + 3*7 + 32*64 + 11*8 + 8*5
}

main();