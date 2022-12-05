import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let count = 0;

const createRangedArray = (s: number, e: number): number[] => {
	return [...Array(e - s + 1).keys()].map((x) => x + s);
};

inputArray.forEach((line) => {
	const [first, second] = line.split(',');

	const [firstLowNumber, firstHighNumber] = first
		.split('-')
		.map((x) => parseInt(x));
	const [secondLowNumber, secondHighNumber] = second
		.split('-')
		.map((x) => parseInt(x));

	const firstArray = createRangedArray(firstLowNumber, firstHighNumber);
	const secondArray = createRangedArray(secondLowNumber, secondHighNumber);

	for (const x of firstArray) {
		if (secondArray.includes(x)) {
			count++;
			break;
		}
	}
});

console.log(count);
