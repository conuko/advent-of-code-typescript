import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('');
let answer = 0;
const marker = 4;

for (let i = marker; i < inputArray.length; i++) {
	const buffer = inputArray.slice(i - marker, i);
	console.log(buffer.join(''));
	if (allCharsUnique(buffer.join(''))) {
		answer = i;
		break;
	}
}

function allCharsUnique(str: string) {
	for (let i = 0; i < str.length; i++) {
		if (str.indexOf(str[i]) !== i) {
			return false;
		}
	}
	return true;
}

console.log(answer);
