import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const sumEnabledMultiplications = (input: string): number => {
	let sum = 0;
	let enabled = true; // Start with multiplications enabled and change whenever we see a do() or don't()

	const instructionRegex = /(?:mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;
	let match: RegExpExecArray | null;

	while ((match = instructionRegex.exec(input)) !== null) {
		const instruction = match[0];

		if (instruction === 'do()') {
			enabled = true;
		} else if (instruction === "don't()") {
			enabled = false;
		} else if (enabled && match[1] && match[2]) {
			const num1 = parseInt(match[1], 10);
			const num2 = parseInt(match[2], 10);
			sum += num1 * num2;
		}
	}
	return sum;
};

const result = sumEnabledMultiplications(input);
console.log(`Sum of enabled multiplications: ${result}`);
