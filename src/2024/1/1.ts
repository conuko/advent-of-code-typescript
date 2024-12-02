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

// Sort both lists
const sortedLeft = [...leftList].sort((a, b) => a - b);
const sortedRight = [...rightList].sort((a, b) => a - b);

// Calculate total distance between lists
const totalDistance = sortedLeft.reduce((sum, leftNum, index) => {
	const rightNum = sortedRight[index];
	const distance = Math.abs(leftNum - rightNum);
	return sum + distance;
}, 0);

console.log('Total distance between lists:', totalDistance);
