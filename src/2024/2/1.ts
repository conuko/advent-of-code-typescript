import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const reports = input.split('\n').filter((line) => line.trim() !== '');

const isReportSafe = (report: string): boolean => {
	// Convert report string to array of numbers
	const levels = report.trim().split(' ').map(Number);

	// Check if we have at least 2 numbers to compare
	if (levels.length < 2) return false;

	// Determine if sequence should be increasing or decreasing based on first two numbers
	const isIncreasing = levels[1] > levels[0];

	// Check each adjacent pair
	for (let i = 1; i < levels.length; i++) {
		const diff = levels[i] - levels[i - 1];

		// Check if difference is between 1 and 3 (inclusive)
		const validDiff = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;

		// Check if direction matches initial direction
		const validDirection = isIncreasing ? diff > 0 : diff < 0;

		if (!validDiff || !validDirection) {
			return false;
		}
	}

	return true;
};

const safeReports = reports.filter(isReportSafe).length;
console.log(`Number of safe reports: ${safeReports}`);
