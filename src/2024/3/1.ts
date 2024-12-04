import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const sumValidMultiplications = (input: string): number => {
	// Regular expression to match valid mul(X,Y) patterns
	// - Matches 'mul' followed immediately by '('
	// - Captures 1-3 digits for first number
	// - Requires exactly one comma
	// - Captures 1-3 digits for second number
	// - Must end with ')'
	const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

	let sum = 0;
	let match: RegExpExecArray | null;

	// Find all matches in the input
	while ((match = mulRegex.exec(input)) !== null) {
		const [, num1Str, num2Str] = match;

		const num1 = parseInt(num1Str, 10);
		const num2 = parseInt(num2Str, 10);

		// Add the product to the sum
		sum += num1 * num2;
	}

	return sum;
};

const result = sumValidMultiplications(input);
console.log(`Sum of all valid multiplications: ${result}`);
