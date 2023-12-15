import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const isDigit = (str: string) => {
	return /^\d$/.test(str);
};

const getResultNumbers = (inputArray: string[]) => {
	const numbers: number[] = [];

	inputArray.forEach((line) => {
		const firstDigit = line.split('').find((word) => isDigit(word));

		const secondDigit = line
			.split('')
			.reverse()
			.find((word) => isDigit(word));

		const result = parseInt(`${firstDigit}${secondDigit}`);

		!Number.isNaN(result) && numbers.push(result);
	});

	return numbers;
};

const result = getResultNumbers(inputArray).reduce((a, b) => a + b, 0);

console.log(result);
