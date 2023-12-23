import fs from 'fs';
import { isNumber, findTouch } from './1';

const input = fs.readFileSync('input.txt', 'utf8');

const isGear = (str: string): boolean => {
	return str === '*';
};

const sumOfAllGear = (input: string): number => {
	let total = 0;

	const rows = input
		.trim()
		.split('\n')
		.map((row) => row.split(''));

	const H = rows.length;
	const W = rows[0].length;

	// keep track of all gear touches
	// if we see another number touching the same gear -> add to total, remove touch from map
	const gearTouches = new Map<string, number>();
	const getGearKey = (x: number, y: number) => x + ',' + y;

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

				const gearTouch = findTouch(rows, y, x0, x1, isGear);

				if (gearTouch !== null) {
					const gearKey = getGearKey(gearTouch[0], gearTouch[1]);
					const number = Number(rows[y].slice(x0, x1 + 1).join(''));

					const gearValue = gearTouches.get(gearKey);
					if (gearValue !== undefined) {
						total += gearValue * number;
						gearTouches.delete(gearKey);
					} else {
						gearTouches.set(gearKey, number);
					}
				}

				x0 = null;
			}
		}

		if (x0 !== null) {
			// number finished at EOL
			const x1 = W - 1;

			const gearTouch = findTouch(rows, y, x0, x1, isGear);

			if (gearTouch !== null) {
				const gearKey = getGearKey(gearTouch[0], gearTouch[1]);
				const number = Number(rows[y].slice(x0, x1 + 1).join(''));

				const gearValue = gearTouches.get(gearKey);
				if (gearValue !== undefined) {
					total += gearValue * number;
					gearTouches.delete(gearKey);
				} else {
					gearTouches.set(gearKey, number);
				}
			}
		}
	}

	return total;
};

console.log(
	`The Sum of all of the gear ratios in the engine schematic: ${sumOfAllGear(
		input
	)}`
);
