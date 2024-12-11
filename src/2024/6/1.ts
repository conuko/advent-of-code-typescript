import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

type Position = {
	x: number;
	y: number;
};

type Direction = 'up' | 'right' | 'down' | 'left';

const findGuardPath = (input: string): number => {
	const grid = input.split('\n').filter((line) => line.trim());
	const height = grid.length;
	const width = grid[0].length;

	// Find starting position
	let currentPos: Position = { x: 0, y: 0 };
	let currentDir: Direction = 'up';

	for (let y = 0; y < height; y++) {
		const x = grid[y].indexOf('^');
		if (x !== -1) {
			currentPos = { x, y };
			break;
		}
	}

	// Track visited positions using string keys "x,y"
	const visited = new Set<string>();
	visited.add(`${currentPos.x},${currentPos.y}`);
	console.log(visited);

	// Direction changes when turning right
	const turnRight: Record<Direction, Direction> = {
		up: 'right',
		right: 'down',
		down: 'left',
		left: 'up',
	};

	// Movement deltas for each direction
	const moves: Record<Direction, Position> = {
		up: { x: 0, y: -1 },
		right: { x: 1, y: 0 },
		down: { x: 0, y: 1 },
		left: { x: -1, y: 0 },
	};

	const maxSteps = grid.length * grid[0].length * 4; // Maximum possible unique positions * directions
	let steps = 0;

	while (steps < maxSteps) {
		steps++;
		// Check position in front
		const move = moves[currentDir];
		const nextX = currentPos.x + move.x;
		const nextY = currentPos.y + move.y;

		// Check if next position is out of bounds or blocked
		if (nextY < 0 || nextY >= height || nextX < 0 || nextX >= width) {
			break; // Guard left the map
		}

		if (grid[nextY][nextX] === '#') {
			// Turn right if blocked
			currentDir = turnRight[currentDir];
		} else {
			// Move forward
			currentPos = { x: nextX, y: nextY };
			visited.add(`${currentPos.x},${currentPos.y}`);
		}
	}

	return visited.size;
};

console.log(findGuardPath(input));
