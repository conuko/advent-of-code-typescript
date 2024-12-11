import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const findIncorrectUpdateMiddles = (input: string): number => {
	const [rulesStr, updatesStr] = input.split('\n\n');

	// Parse rules into a Map for quick lookup
	const rules = new Map<number, Set<number>>();
	rulesStr.split('\n').forEach((rule) => {
		const [before, after] = rule.split('|').map(Number);
		if (!rules.has(before)) rules.set(before, new Set());
		rules.get(before)?.add(after);
	});

	// Helper to compare two pages
	const shouldComeBefore = (a: number, b: number): boolean => {
		// Direct rule check
		if (rules.get(b)?.has(a)) return false;
		if (rules.get(a)?.has(b)) return true;

		// Recursive check for indirect rules
		const seen = new Set<number>();
		const check = (x: number, target: number): boolean => {
			if (x === target) return true;
			if (seen.has(x)) return false;
			seen.add(x);
			return Array.from(rules.get(x) || []).some((next) => check(next, target));
		};

		// Check both directions
		return check(a, b) || !check(b, a);
	};

	// Sort function using the rules
	const sortByRules = (pages: number[]): number[] =>
		[...pages].sort((a, b) => (shouldComeBefore(b, a) ? 1 : -1));

	return updatesStr
		.split('\n')
		.filter((line) => line.trim())
		.map((line) => line.split(',').map(Number))
		.filter((update) => {
			// Check if already sorted
			const sorted = sortByRules(update);
			return !update.every((num, i) => num === sorted[i]);
		})
		.map((update) => {
			const sorted = sortByRules(update);
			return sorted[Math.floor(sorted.length / 2)];
		})
		.reduce((sum, middle) => sum + middle, 0);
};

console.log(findIncorrectUpdateMiddles(input));
