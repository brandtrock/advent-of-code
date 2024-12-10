// PART ONE

// function arraysEqual(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) return false;
//   }
//   return true;
// }

// const input = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `;

// // Turn the input into an array of numbers with each row length of 5
// const reports = input.trim().split('\n').map(line => line.trim().split(' ').map(Number));

// // Function to check if an array is sorted in ascending or descending order
// function isSorted(arr) {
//   let ascending = true;
//   let descending = true;
//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] > arr[i + 1]) ascending = false;
//     if (arr[i] < arr[i + 1]) descending = false;
//   }
//   return ascending || descending;
// }

// // Iterate over the reports
// let safe = 0;
// reports.forEach(report => {
//   if (isSorted(report) && report.length === new Set(report).size) {
//     let isGood = true;
//     for (let i = 0; i < report.length - 1; i++) {
//       const diff = Math.abs(report[i] - report[i + 1]);
//       if (diff < 1 || diff > 3) {
//         isGood = false;
//         break;
//       }
//     }
//     if (isGood) safe++;
//   }
// });

// console.log('safe: ', safe);

// PART TWO

/* 
PART ONE REPORTS
7 6 4 2 1 - safe
1 2 7 8 9 - unsafe
9 7 6 2 1 - unsafe
1 3 2 4 5 - unsafe
8 6 4 4 1 - unsafe
1 3 6 7 9 - safe
SAFE: 2
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
*/

/* 
PART TWO REPORTS
7 6 4 2 1 - safe
1 2 7 8 9 - unsafe
9 7 6 2 1 - unsafe
1 3 2 4 5 - safe
8 6 4 4 1 - safe
1 3 6 7 9 - safe
SAFE: 4
*/

const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

// Turn the input into an array of numbers with each row length of 5
const reports = input.trim().split('\n').map(line => line.trim().split(' ').map(Number));


// function arraysEqual(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) return false;
//   }
//   return true;
// }

// function getSign(nodeA, nodeB) {
//   return nodeA < nodeB ? "increasing" : "decreasing";
// }

// function modifyReportForSafety(report) {
//   let prevSign = null;
//   let skipOnce = false;
//   let tempReport = [...report];
//   tempReport.forEach((level, i) => {
//     let leftNode = level;
//     let rightNode = report[i + 1] ? report[i + 1] : null;
//     let nextNode = report[i + 2] ? report[i + 2] : null;
//     let currSign = getSign(leftNode, rightNode);
   
//     if (prevSign === null) {
//       prevSign = currSign;
//     } 

//     if (prevSign !== currSign && !skipOnce) {
//       let nextNodeSign = getSign(rightNode, nextNode);
//       if (prevSign === nextNodeSign) {
//         let diff = Math.abs(leftNode - rightNode);
//         if (diff < 1 || diff > 3) {
//           tempReport.splice(i + 1, 1);
//           console.log('tempReport: ', tempReport);
//           skipOnce = true;
//         }
//       } else if (prevSign === nextNodeSign) {
//         let diff = Math.abs(leftNode - nextNode);
//         if (diff < 1 || diff > 3) {
//           tempReport.splice(i, 1);
//           console.log('tempReport: ', tempReport);
//           skipOnce = true;
//         }
//       }
//     }

//     if(!skipOnce) {

//     }

//     if (i === tempReport.length - 1) {
//       console.log('tempReport: ', tempReport);
//       checkReportSafety(tempReport);
//     }
//   });
// }

// function checkReportSafety(report) {
//   let reportData = 0;
//   report.forEach((level, i) => {
//     let diff = Math.abs(level - report[i + 1]);

//     if (diff < 1 || diff > 3) {
//       console.log('diff: NOT SAFE', diff);
//     } else {
//     	reportData++;
//     }
//     if (i === report.length - 1 && reportData === report.length) {
//       safe++;
//     }
//   });
// }

// let safe = 0;
// reports.forEach(report => {
//   let tempReport = [...report].sort((a, b) => a - b);
//   let tempReportRev = [...report].sort((a, b) => b - a);

//   if (arraysEqual(report, tempReport) || arraysEqual(report, tempReportRev)) {
//     checkReportSafety(report);
//   } else {
//     modifyReportForSafety(report);
//   }
// });


const isReportSafe = (report) => {
	let asc = true;
	let desc = true;
	let safeDiff = true;
	let last = undefined;
	for (const level of report) {
		if (last !== undefined && level <= last) {
			asc = false;
		}

		if (last !== undefined && level >= last) {
			desc = false;
		}

		if (last !== undefined) {
			const diff = Math.abs(last - level);
			if (diff < 1 || diff > 3) {
				safeDiff = false;
				break;
			}
		}

		if (!asc && !desc) {
			break;
		}

		last = level;
	}

	return (asc || desc) && safeDiff;
};

let results = reports.filter((report) => {
  let safe = isReportSafe(report);
  for (let i = 0; i < report.length && !safe; i++) {
    const copyOfReport = [...report];
    copyOfReport.splice(i, 1);
    safe = isReportSafe(copyOfReport);
  }
  return safe;
}).length;

console.log('results: ', results); // 4
// console.log('safe: ', safe); // 3
