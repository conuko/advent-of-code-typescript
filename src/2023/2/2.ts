import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const games = input.split('\n');

function getMaxCubesCount(game: string): {
	red: number;
	green: number;
	blue: number;
} {
	let maxRed = 0,
		maxGreen = 0,
		maxBlue = 0;

	const colorMatches = game.match(/\d+ (red|green|blue)/g);
	if (!colorMatches) return { red: 0, green: 0, blue: 0 };

	for (const match of colorMatches) {
		const [countStr, color] = match.split(' ');
		const count = parseInt(countStr);

		switch (color) {
			case 'red':
				maxRed = Math.max(maxRed, count);
				break;
			case 'green':
				maxGreen = Math.max(maxGreen, count);
				break;
			case 'blue':
				maxBlue = Math.max(maxBlue, count);
				break;
		}
	}

	return { red: maxRed, green: maxGreen, blue: maxBlue };
}

let totalPower = 0;

games.forEach((game) => {
	const { red, green, blue } = getMaxCubesCount(game);
	const power = red * green * blue;
	totalPower += power;
});

console.log(`Total power of the sets: ${totalPower}`);
