import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const reports = input.split('\n').filter((line) => line.trim() !== '');

const isSequenceSafe = (levels: number[]): boolean => {
	if (levels.length < 2) return false;

	const isIncreasing = levels[1] > levels[0];

	for (let i = 1; i < levels.length; i++) {
		const diff = levels[i] - levels[i - 1];
		const validDiff = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
		const validDirection = isIncreasing ? diff > 0 : diff < 0;

		if (!validDiff || !validDirection) {
			return false;
		}
	}

	return true;
};

const isReportSafeWithDampener = (report: string): boolean => {
	const levels = report.trim().split(' ').map(Number);

	// First check if it's safe without removing any level
	if (isSequenceSafe(levels)) return true;

	// Try removing each level one at a time
	for (let i = 0; i < levels.length; i++) {
		const modifiedLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
		if (isSequenceSafe(modifiedLevels)) {
			return true;
		}
	}

	return false;
};

const safeReports = reports.filter(isReportSafeWithDampener).length;
console.log(`Number of safe reports with Problem Dampener: ${safeReports}`);
