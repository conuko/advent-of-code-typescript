import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

type Position = {
	x: number;
	y: number;
};

type Direction = 'up' | 'right' | 'down' | 'left';

const simulateGuard = (
	grid: boolean[][],
	startPos: Position,
	startDir: Direction
): boolean => {
	const height = grid.length;
	const width = grid[0].length;
	let currentPos = { ...startPos };
	let currentDir = startDir;

	const turnRight: Record<Direction, Direction> = {
		up: 'right',
		right: 'down',
		down: 'left',
		left: 'up',
	};

	const moves: Record<Direction, Position> = {
		up: { x: 0, y: -1 },
		right: { x: 1, y: 0 },
		down: { x: 0, y: 1 },
		left: { x: -1, y: 0 },
	};

	// Track position AND direction for more accurate loop detection
	const visited = new Set<string>();
	const getStateKey = (pos: Position, dir: Direction) =>
		`${pos.x},${pos.y},${dir}`;

	const maxSteps = height * width * 4;
	let steps = 0;

	while (steps < maxSteps) {
		steps++;
		const stateKey = getStateKey(currentPos, currentDir);

		// If we've seen this exact position and direction before, it's a loop
		if (visited.has(stateKey)) {
			return true;
		}
		visited.add(stateKey);

		const move = moves[currentDir];
		const nextX = currentPos.x + move.x;
		const nextY = currentPos.y + move.y;

		if (nextY < 0 || nextY >= height || nextX < 0 || nextX >= width) {
			return false; // Guard escaped
		}

		if (grid[nextY][nextX]) {
			currentDir = turnRight[currentDir];
		} else {
			currentPos = { x: nextX, y: nextY };
		}
	}

	return false; // No definitive loop found
};

const findLoopPositions = (input: string): number => {
	const start = performance.now();

	const lines = input.split('\n').filter((line) => line.trim());

	// Convert input to boolean grid once (true = blocked)
	const grid = lines.map((row) => row.split('').map((cell) => cell === '#'));

	const height = grid.length;
	const width = grid[0].length;

	// Find starting position more reliably
	let startPos: Position = { x: 0, y: 0 };
	for (let y = 0; y < height; y++) {
		const x = lines[y].indexOf('^');
		if (x !== -1) {
			startPos = { x, y };
			break;
		}
	}

	let loopCount = 0;

	// Try each possible obstruction position
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (grid[y][x] || (x === startPos.x && y === startPos.y)) {
				continue;
			}

			// Modify grid in place
			grid[y][x] = true;
			if (simulateGuard(grid, startPos, 'up')) {
				loopCount++;
			}
			grid[y][x] = false;
		}
	}

	const end = performance.now();
	console.log(`Execution time: ${(end - start).toFixed(2)}ms`);
	return loopCount;
};

console.log(findLoopPositions(input));
