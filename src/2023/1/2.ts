import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const total: number[] = [];

const numberMappings = {
	one: 'one1one',
	two: 'two2two',
	three: 'three3three',
	four: 'four4four',
	five: 'five5five',
	six: 'six6six',
	seven: 'seven7seven',
	eight: 'eight8eight',
	nine: 'nine9nine',
};

for (let line of inputArray) {
	for (const num of Object.keys(numberMappings)) {
		line = line.replaceAll(num, numberMappings[num]);
	}

	const numbers = line.split('').filter((el) => !Number.isNaN(parseInt(el)));
	const result = parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);

	!Number.isNaN(result) && total.push(result);
}

const solution = total.reduce((a, b) => a + b, 0);

console.log(solution);
