import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const findXMAS = (input: string): number => {
	// Convert input into 2D array
	const grid = input.split('\n').filter((line) => line.length > 0);
	const height = grid.length;
	const width = grid[0].length;
	let count = 0;

	// All possible directions to check: right, down-right, down, down-left, left, up-left, up, up-right
	const directions = [
		[0, 1],
		[1, 1],
		[1, 0],
		[1, -1],
		[0, -1],
		[-1, -1],
		[-1, 0],
		[-1, 1],
	];

	// Check each starting position
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			// Try each direction from this position
			for (const [dy, dx] of directions) {
				let found = true;
				const word = 'XMAS';

				// Check if word fits in this direction
				for (let i = 0; i < word.length; i++) {
					const newRow = row + dy * i;
					const newCol = col + dx * i;

					// Check bounds
					if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width) {
						found = false;
						break;
					}

					// Check character match
					if (grid[newRow][newCol] !== word[i]) {
						found = false;
						break;
					}
				}

				if (found) {
					count++;
				}
			}
		}
	}

	return count;
};

const result = findXMAS(input);
console.log(`Found XMAS ${result} times`);
