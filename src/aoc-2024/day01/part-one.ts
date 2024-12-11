import { readFileSync } from 'fs';
import { sum } from 'lodash';

const file = readFileSync(`${__dirname}/input.txt`);
const lines = file.toString().split('\n');
const pairs = lines.map((line) => line.split(/\s+/));

const list1 = [];
const list2 = [];
pairs.forEach(([left, right]) => {
  list1.push(left);
  list2.push(right);
});

const list1Sorted = list1.sort((a, b) => a - b);
const list2Sorted = list2.sort((a, b) => a - b);

const diffs = list1Sorted.map((left, index) => {
  return Math.abs(left - list2Sorted[index]);
});

console.log(sum(diffs));
