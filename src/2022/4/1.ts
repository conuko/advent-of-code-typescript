import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let count = 0;

inputArray.forEach((line) => {
	const [first, second] = line.split(',');

	const [firstLowNumber, firstHighNumber] = first
		.split('-')
		.map((x) => parseInt(x));
	const [secondLowNumber, secondHighNumber] = second
		.split('-')
		.map((x) => parseInt(x));

	// Check if the range of the first numbers is contained in the range of the second numbers
	if (
		secondLowNumber >= firstLowNumber &&
		secondHighNumber <= firstHighNumber
	) {
		count++;

		// Check if the range of the second numbers is contained in the range of the first numbers
	} else if (
		firstLowNumber >= secondLowNumber &&
		firstHighNumber <= secondHighNumber
	) {
		count++;
	}
});

console.log(count);
