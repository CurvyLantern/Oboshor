import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize, useTimeout, useTimeoutFn } from 'react-use';

import { Dialog } from '@headlessui/react';

type Props = {
	colors?: string[];
	isOpen: boolean;
	mode: 'win' | 'lose';
};
const MyConfetti = ({ isOpen, mode, colors }: Props) => {
	// useTimeoutFn(() => {
	// 	setCount(0);
	// }, 5000);

	// if (colors && colors.length > 0) {
	// 	return (
	// 		<Confetti
	// 			className='relative z-20'
	// 			colors={colors}
	// 			onConfettiComplete={() => {
	// 				setRun(false);
	// 			}}
	// 			width={width}
	// 			height={height}
	// 			numberOfPieces={count}
	// 		/>
	// 	);
	// }
	return (
		<Dialog open={isOpen} as='div' className='relative z-20 pointer-events-none' onClose={() => {}}>
			{({ open }) => {
				return (
					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full hellow-wonder woman'>
							<Dialog.Panel>{open && <Test mode={mode} colors={colors} />}</Dialog.Panel>
						</div>
					</div>
				);
			}}
		</Dialog>
	);
};
const Test = ({ mode, colors }: Omit<Props, 'isOpen'>) => {
	const [run, setRun] = useState(true);
	const [count, setCount] = useState(200);

	const { height, width } = useWindowSize();

	useTimeoutFn(() => {
		setCount(0);
	}, 5000);
	if (mode === 'lose') {
		return (
			<Confetti
				colors={colors}
				run={run}
				onConfettiComplete={() => {
					setRun(false);
				}}
				width={width}
				height={height}
				numberOfPieces={count}
			/>
		);
	}
	return (
		<Confetti
			run={run}
			onConfettiComplete={() => {
				setRun(false);
			}}
			width={width}
			height={height}
			numberOfPieces={count}
		/>
	);
};

export default MyConfetti;
