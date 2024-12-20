import fs from 'fs';

type Position = {
	x: number;
	y: number;
};

type Antenna = {
	pos: Position;
	freq: string;
};

const distance = (p1: Position, p2: Position): number => {
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;
	return Math.sqrt(dx * dx + dy * dy);
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
				if (group.length < 2) return;

				// Check each pair of antennas
				for (let i = 0; i < group.length; i++) {
					for (let j = i + 1; j < group.length; j++) {
						const a1 = group[i];
						const a2 = group[j];

						const d1 = distance(point, a1.pos);
						const d2 = distance(point, a2.pos);

						// Check if point is an antinode (one distance is twice the other)
						if (
							Math.abs(d1 - 2 * d2) < 0.0001 ||
							Math.abs(d2 - 2 * d1) < 0.0001
						) {
							// Check if point is collinear with antennas
							const dx1 = a1.pos.x - point.x;
							const dy1 = a1.pos.y - point.y;
							const dx2 = a2.pos.x - point.x;
							const dy2 = a2.pos.y - point.y;

							// Cross product should be close to 0 for collinearity
							if (Math.abs(dx1 * dy2 - dy1 * dx2) < 0.0001) {
								antinodes.add(`${x},${y}`);
							}
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
