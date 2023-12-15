import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const games = input.split('\n');

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

function isGameValid(game: string): boolean {
	const colorMatches = game.match(/\d+ (red|green|blue)/g);
	if (!colorMatches) return false;

	for (const match of colorMatches) {
		const [countStr, color] = match.split(' ');
		const count = parseInt(countStr);

		if (
			(color === 'red' && count > redCubes) ||
			(color === 'green' && count > greenCubes) ||
			(color === 'blue' && count > blueCubes)
		) {
			return false;
		}
	}

	return true;
}

let validGameIdsSum = 0;

games.forEach((game, index) => {
	if (isGameValid(game)) {
		validGameIdsSum += index + 1; // Game IDs are 1-based
	}
});

console.log(`Sum of IDs of valid games: ${validGameIdsSum}`);
