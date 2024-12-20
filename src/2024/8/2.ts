import fs from 'fs';

type Position = {
	x: number;
	y: number;
};

type Antenna = {
	pos: Position;
	freq: string;
};

const isCollinear = (p1: Position, p2: Position, p3: Position): boolean => {
	// Calculate area of triangle formed by three points
	// If area is 0, points are collinear
	const area =
		p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
	return area === 0;
};

const solve = (input: string): number => {
	const grid = input.split('\n').filter((line) => line.trim());
	const height = grid.length;
	const width = grid[0].length;

	// Find all antennas
	const antennas: Antenna[] = [];
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const char = grid[y][x];
			if (char !== '.' && char !== '#') {
				antennas.push({ pos: { x, y }, freq: char });
			}
		}
	}

	// Track unique antinode positions
	const antinodes = new Set<string>();

	// Group antennas by exact frequency (case-sensitive)
	const freqGroups = new Map<string, Antenna[]>();
	antennas.forEach((antenna) => {
		if (!freqGroups.has(antenna.freq)) {
			freqGroups.set(antenna.freq, []);
		}
		freqGroups.get(antenna.freq)?.push(antenna);
	});

	// Check each point in the grid
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const point: Position = { x, y };

			// Check each frequency group
			freqGroups.forEach((group) => {
				// Skip frequencies with only one antenna
				if (group.length < 2) return;

				// For each point, check if it's collinear with any two antennas
				for (let i = 0; i < group.length; i++) {
					for (let j = i + 1; j < group.length; j++) {
						const a1 = group[i];
						const a2 = group[j];

						// Only check collinearity, don't restrict to between antennas
						if (isCollinear(point, a1.pos, a2.pos)) {
							antinodes.add(`${x},${y}`);
							break; // Found an antinode for this point with this frequency
						}
					}
				}
			});
		}
	}

	return antinodes.size;
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
