import fs from 'fs';

const solve = (input: string): number => {
	const lines = input.split('\n').filter((line) => line.trim());
	let sum = 0;

	for (const line of lines) {
		const [target, numbersStr] = line.split(': ');
		const numbers = numbersStr.split(' ').map(Number);
		const targetNum = parseInt(target);

		// Try all possible combinations of operators
		const possibleResults = new Set<number>();
		const operatorCount = numbers.length - 1;

		// Each bit in the binary number represents an operator (0 for +, 1 for *)
		for (let i = 0; i < 1 << operatorCount; i++) {
			let result = numbers[0];

			for (let j = 0; j < operatorCount; j++) {
				// Use bit to determine operator
				const useMultiply = (i & (1 << j)) !== 0;
				const nextNum = numbers[j + 1];

				result = useMultiply ? result * nextNum : result + nextNum;
			}

			possibleResults.add(result);
		}

		// If target is possible, add it to sum
		if (possibleResults.has(targetNum)) {
			sum += targetNum;
		}
	}

	return sum;
};

const main = () => {
	const start = performance.now();

	const input = fs.readFileSync('input.txt', 'utf8');
	const answer = solve(input);

	const end = performance.now();
	console.log(`Answer: ${answer}`);
	console.log(`Time: ${(end - start).toFixed(2)}ms`);
};

main();
