import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const findXShapedMAS = (input: string): number => {
	const grid = input.split('\n').filter((line) => line.length > 0);
	const height = grid.length;
	const width = grid[0].length;
	let count = 0;

	// Check each possible center point of an X
	for (let row = 1; row < height - 1; row++) {
		for (let col = 1; col < width - 1; col++) {
			// The center must be 'A'
			if (grid[row][col] !== 'A') continue;

			const diagonal1 = [
				[grid[row - 1][col - 1], grid[row][col], grid[row + 1][col + 1]],
				[grid[row + 1][col + 1], grid[row][col], grid[row - 1][col - 1]],
			];
			const diagonal2 = [
				[grid[row - 1][col + 1], grid[row][col], grid[row + 1][col - 1]],
				[grid[row + 1][col - 1], grid[row][col], grid[row - 1][col + 1]],
			];

			// Check if we have MAS in either direction on both diagonals
			const diagonal1HasMAS = diagonal1.some((d) => d.join('') === 'MAS');
			const diagonal2HasMAS = diagonal2.some((d) => d.join('') === 'MAS');

			// Only count if both diagonals form MAS
			if (diagonal1HasMAS && diagonal2HasMAS) {
				count++;
			}
		}
	}

	return count;
};

const result = findXShapedMAS(input);
console.log(`Found ${result} X-shaped MAS patterns`);
