import { longestCommonSequence } from './utils';

test('find longest common sequence', () => {
	expect(longestCommonSequence([0, 1, 2, 3], [4, 5, 6])).toEqual({ start: 1, length: 0 });
	expect(longestCommonSequence([0, 1, 2, 3], [1, 5, 6])).toEqual({ start: 1, length: 1 });
	expect(longestCommonSequence([3, 2, 6, 6, 3], [2, 6, 6])).toEqual({ start: 1, length: 3 });
	expect(longestCommonSequence([3, 2, 6, 6, 3], [3, 2, 6, 6])).toEqual({ start: 0, length: 4 });
	expect(longestCommonSequence([6, 1, 2, 3, 0, 1, 1, 2, 3, 5, 8, 13, 14], [0, 1, 1, 2, 3, 5, 8, 13, 21])).toEqual({ start: 4, length: 8 });
});
