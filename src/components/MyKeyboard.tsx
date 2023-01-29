import { Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { letterState } from '../types/types';

interface WrapperProps {
	activeKey: string;
	onKeypress: (key: string) => void;
	prompts: Map<string, Exclude<letterState, undefined>>;
}
export const KeyboardWrapper = ({ activeKey, onKeypress, prompts }: WrapperProps) => {
	const { wrong, misplaced, correct } = useMemo(() => {
		let temp = {
			wrong: [''],
			misplaced: [''],
			correct: [''],
		};
		prompts.forEach((value, key) => {
			temp[value].push(key);
		});
		return temp;
	}, [prompts]);
	return (
		<MyKeyboard
			onKeyPress={onKeypress}
			layout={{
				default: ['q w e r t y u i o p', 'a s d f g h j k l', 'enter z x c v b n m backspace'],
			}}
			buttonTheme={{
				'bg-green-500 dark:bg-green-500': correct.join(' '),
				'bg-orange-500 dark:bg-orange-500': misplaced.join(' '),
				' bg-neutral-300 dark:bg-neutral-800': wrong.join(' '),
			}}
		/>
	);
};

interface KeyboardInterface {
	buttonTheme: Record<string, string>;
	layout: Record<string, string[]>;
	onKeyPress: (key: string) => void;
}
const MyKeyboard = ({ buttonTheme, layout, onKeyPress }: KeyboardInterface) => {
	const detailedLayout = useMemo(() => {
		let temp = [];
		const bt = Object.entries(buttonTheme);
		for (let r of layout.default) {
			let rArr = r.split(' ').map(k => {
				let css = '';

				for (let [c, b] of bt) {
					if (b.toLowerCase().split(' ').includes(k)) {
						css = c;
						break;
					}
				}

				return { key: k, class: css };
			});
			temp.push(rArr);
		}
		return temp;
	}, [layout, buttonTheme]);

	return (
		<motion.div
			onTap={event => {
				const target = event.target as HTMLElement;
				if (target.tagName.toLowerCase() !== 'button') return;

				if (target.textContent === 'enter') {
					onKeyPress('Enter');
				} else if (target.textContent === 'backspace') {
					onKeyPress('Backspace');
				} else {
					onKeyPress(target.textContent!);
				}
			}}
			className='bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 flex flex-col gap-[6px] p-2 rounded-md select-none'>
			{detailedLayout.map((row, rowIndex) => {
				return <KeyboardRow key={rowIndex} layout={row} />;
			})}
		</motion.div>
	);
};
const KeyboardRow = ({ layout }: { layout: { key: string; class: string }[] }) => {
	return (
		<div className='flex justify-center gap-[6px]'>
			{layout.map((cell, cellIndex) => {
				return <KeyboardCell key={cellIndex} layout={cell} />;
			})}
		</div>
	);
};

const KeyboardCell = ({ layout }: { layout: { key: string; class: string } }) => {
	return (
		<motion.button
			type='button'
			initial={false}
			whileTap={{
				scale: 0.95,
			}}
			className={`${layout.class}  keyboard_button__dark keyboard_button`}>
			{layout.key}
		</motion.button>
	);
};
