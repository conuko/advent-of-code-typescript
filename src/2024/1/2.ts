import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n').filter((line) => line.trim() !== '');

// Separate and parse left and right numbers
const lists = inputArray.map((line) => {
	const [left, right] = line.split(/\s+/).map(Number);
	return { left, right };
});

// Separate into left and right arrays
const leftList = lists.map((pair) => pair.left);
const rightList = lists.map((pair) => pair.right);

// Create frequency map of right list
const rightFrequencyMap = rightList.reduce((acc, num) => {
	acc.set(num, (acc.get(num) || 0) + 1);
	return acc;
}, new Map<number, number>());

// Calculate similarity score
const similarityScore = leftList.reduce((total, leftNum) => {
	const frequency = rightFrequencyMap.get(leftNum) || 0;
	return total + leftNum * frequency;
}, 0);

console.log('Total similarity score:', similarityScore);
