import { words, words2 } from '../DB/words';
export const getRandomWord = () => {
	const len = words2.length;
	const randomIdx = Math.round(Math.random() * len + 1);
	return words2[randomIdx];
};

export const inputExistsInList = (input: string) => {
	return words2.includes(input);
};
