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

		// Each combination needs 2 bits to represent 3 operators (00: +, 01: *, 10: ||)
		for (let i = 0; i < 1 << (operatorCount * 2); i++) {
			let result = numbers[0];
			let valid = true;

			for (let j = 0; j < operatorCount; j++) {
				const opType = (i >> (j * 2)) & 3;
				const nextNum = numbers[j + 1];
				let concat: number;

				switch (opType) {
					case 0: // Addition
						result += nextNum;
						break;
					case 1: // Multiplication
						result *= nextNum;
						break;
					case 2: // Concatenation
						concat = parseInt(`${result}${nextNum}`);
						if (concat > Number.MAX_SAFE_INTEGER) {
							valid = false;
							break;
						}
						result = concat;
						break;
					default:
						valid = false;
				}

				if (!valid) break;
			}

			if (valid) {
				possibleResults.add(result);
			}
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
