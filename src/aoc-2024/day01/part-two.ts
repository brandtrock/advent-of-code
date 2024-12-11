import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`);
const lines = file.toString().split('\n');
const pairs = lines.map((line) => line.split(/\s+/));

const list1 = [];
const list2 = [];
pairs.forEach(([left, right]) => {
  list1.push(left);
  list2.push(right);
});

const list1Dict = {};
list1.forEach((value) => {
  list1Dict[value] = (list1Dict[value] || 0) + 1;
});

// convert list2 into a dictionary
const list2Dict = {};
list2.forEach((value) => {
  list2Dict[value] = (list2Dict[value] || 0) + 1;
});

let total2 = 0;
Object.keys(list1Dict).forEach((key) => {
  if (list2Dict[key]) {
    total2 += Math.abs(Number(key) * list2Dict[key] * list1Dict[key]);
  }
});

console.log(total2);
