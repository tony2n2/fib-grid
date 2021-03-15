export const longestCommonSequence = (arr1, arr2) => {
	const cache = [];
	cache.push(new Array(arr2.length));
	cache.push(new Array(arr2.length));
	let maxEnd = 0;
	let maxLength = 0;
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			if (arr1[i] === arr2[j]) {
				if (i === 0 || j === 0) {
					cache[i % 2][j] = 1;
				} else {
					cache[i % 2][j] = (cache[(i - 1) % 2][j - 1] || 0) + 1;
				}
				if (cache[i % 2][j] > maxLength) {
					maxLength = cache[i % 2][j];
					maxEnd = i;
				}
			} else {
				cache[i % 2][j] = 0;
			}
		}
	}
	return { start: maxEnd - maxLength + 1, length: maxLength };
};
