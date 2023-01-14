'use client';
import { useEffect, useRef, useState } from 'react';
import SimpleKeyboard from 'react-simple-keyboard';
import { letterState } from '../types/types';
import { KeyBackspace, KeyEnter } from '../utils/keys';

interface KeyBoardInterface {
	prompts: Map<string, Exclude<letterState, undefined>>;
	onKeypress: (val: string) => void;
}
const Keyboard = ({ prompts, onKeypress }: KeyBoardInterface) => {
	const keyboard = useRef();
	const [layout] = useState({
		default: ['q w e r t y u i o p', 'a s d f g h j k l', '{enter} z x c v b n m {bksp}'],
	});
	const [themeButtons, setThemeButtons] = useState({
		correct: '',
		misplaced: '',
		wrong: '',
	});
	const onChange = () => {};
	const handleKeypress = (button: string) => {
		if (button === '{bksp}') {
			onKeypress(KeyBackspace);
		} else if (button === '{enter}') {
			onKeypress(KeyEnter);
		} else {
			onKeypress(button);
		}
	};
	useEffect(() => {
		let temp: { correct: string[]; misplaced: string[]; wrong: string[] } = {
			correct: [],
			misplaced: [],
			wrong: [],
		};
		prompts.forEach((value, k) => {
			let key = k.toLowerCase();
			temp[value].push(key);
		});

		setThemeButtons({
			correct: temp.correct.join(' '),
			misplaced: temp.misplaced.join(' '),
			wrong: temp.wrong.join(' '),
		});
	}, [prompts]);

	return (
		<SimpleKeyboard
			theme={`hg-theme-default hg-layout-default myTheme`}
			buttonTheme={[
				{
					class: 'hg-correct',
					buttons: themeButtons.correct,
				},
				{
					class: 'hg-misplaced',
					buttons: themeButtons.misplaced,
				},
				{
					class: 'hg-wrong',
					buttons: themeButtons.wrong,
				},
			]}
			keyboardRef={r => (keyboard.current = r)}
			layout={layout}
			onChange={onChange}
			onKeyPress={handleKeypress}
		/>
	);
};
export { Keyboard };
