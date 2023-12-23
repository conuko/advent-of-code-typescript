import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const isSymbol = (str: string): boolean => {
	return str !== '.';
};

const isNumber = (str: string): boolean => {
	return !Number.isNaN(parseInt(str));
};

/**
 * Checks if number at (x0, y), (x1, y) is touching matching symbol
 * @returns [x, y] of a first matching symbol, null if no matching touches
 */
const findTouch = (
	rows: string[][],
	y: number,
	x0: number,
	x1: number,
	isMatching: (s: string) => boolean
): null | [number, number] => {
	const H = rows.length;
	const W = rows[0].length;

	// check above & below
	for (let x = Math.max(x0 - 1, 0); x <= Math.min(x1 + 1, W - 1); x++) {
		if (y > 0 && isMatching(rows[y - 1][x])) {
			return [x, y - 1];
		}

		if (y < H - 1 && isMatching(rows[y + 1][x])) {
			return [x, y + 1];
		}
	}

	// check left
	if (x0 > 0 && isMatching(rows[y][x0 - 1])) {
		return [x0 - 1, y];
	}

	// check right
	if (x1 < W - 1 && isMatching(rows[y][x1 + 1])) {
		return [x1 + 1, y];
	}
	return null;
};

const getCompleteNumber = (input: string): number => {
	let total = 0;

	const rows = input
		.trim()
		.split('\n')
		.map((row) => row.split(''));

	const H = rows.length;
	const W = rows[0].length;

	// scan the matrix
	for (let y = 0; y < H; y++) {
		// number start x indicator (null if cursor is not at number)
		let x0: number | null = null;

		for (let x = 0; x < W; x++) {
			if (isNumber(rows[y][x]) && x0 === null) {
				// number started
				x0 = x;
			}

			if (!isNumber(rows[y][x]) && x0 !== null) {
				// number finished
				const x1 = x - 1;

				if (findTouch(rows, y, x0, x1, isSymbol) !== null) {
					total += Number(rows[y].slice(x0, x1 + 1).join(''));
				}

				x0 = null;
			}
		}

		if (x0 !== null) {
			// number finished at EOL
			const x1 = W - 1;

			if (findTouch(rows, y, x0, x1, isSymbol) !== null) {
				total += Number(rows[y].slice(x0, x1 + 1).join(''));
			}

			x0 = null;
		}
	}

	return total;
};

console.log(`Sum of all part numbers: ${getCompleteNumber(input)}`);
