import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const findValidUpdateMiddePageNumbers = (input: string): number => {
	const [rulesStr, updatesStr] = input.split('\n\n');

	// Parse rules into a Set of strings for quick lookup
	const rules = new Set(
		rulesStr
			.split('\n')
			.filter((line) => line.trim())
			.map((line) => line.trim())
	);

	return updatesStr
		.split('\n')
		.filter((line) => line.trim())
		.map((line) => line.split(',').map(Number))
		.filter((update) => {
			// Check each pair of numbers in the update
			for (let i = 0; i < update.length; i++) {
				for (let j = i + 1; j < update.length; j++) {
					// If we find a rule that's violated, the update is invalid
					if (rules.has(`${update[j]}|${update[i]}`)) {
						return false;
					}
				}
			}
			return true;
		})
		.map((update) => update[Math.floor(update.length / 2)])
		.reduce((sum, middle) => sum + middle, 0);
};

console.log(findValidUpdateMiddePageNumbers(input));
