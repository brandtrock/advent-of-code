const input = `  
3   4
4   3
2   5
1   3
3   9
3   3
`;

// Match all numbers in the input string
const numbers = input.match(/\d+/g).map(Number);

// Split the numbers into two arrays
const list1 = [];
const list2 = [];

for (let i = 0; i < numbers.length; i += 2) {
  list1.push(numbers[i]);
  list2.push(numbers[i + 1]);
}

console.log(list1); // [3, 4, 2, 1, 3, 3]
console.log(list2); // [4, 3, 5, 3, 9, 3]


// const list1Sum = list1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// const list2Sum = list2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

// const total = Math.abs(list1Sum - list2Sum);


list1.sort();
list2.sort();

let total = 0;

list1.forEach((value, index) => {
  total += Math.abs(value - list2[index]);
});

console.log(total);

// PART TWO

// convert list1 into a dictionary
const list1Dict = {};
list1.forEach((value) => {
  list1Dict[value] = (list1Dict[value] || 0) + 1;
});

console.log('list1Dict', list1Dict);

// convert list2 into a dictionary
const list2Dict = {};
list2.forEach((value) => {
  list2Dict[value] = (list2Dict[value] || 0) + 1;
});

console.log('list2Dict', list2Dict);

let total2 = 0;
Object.keys(list1Dict).forEach((key) => {
  for (key in list2Dict) {
    total2 += Math.abs((Number(key) * list2Dict[key]) * list1Dict[key]);
  }
});

console.log(total2);