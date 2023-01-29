import { Row } from './Row';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAudio } from 'react-use';
import { useKeyup } from '../hooks/useKeyupEvent';
import { useWordle } from '../hooks/useWordle';
import { KeyboardWrapper } from './MyKeyboard';
interface MwordleInterface {
	answer: string;
	onWin: (obj: any) => void;
	onLose: (obj: any) => void;
}
const Mwordle = ({ answer, onLose, onWin }: MwordleInterface) => {
	const { gameState, result, activeKey, handleFn, rowIndex, invalidWord, keyStateMap, rowDataGrid } =
		useWordle(answer);

	const [audio, state, controls, ref] = useAudio({
		src: '/keypress.mp3',
		autoPlay: false,
	});
	useEffect(() => {
		controls.volume(0.3);
	}, [controls]);

	const onKeyPress = (key: string) => {
		handleFn(key);
		controls.seek(0);
		controls.play();
	};
	useKeyup(onKeyPress);

	useEffect(() => {
		if (result === 'win') {
			onWin(rowDataGrid);
		} else if (result === 'lose') {
			onLose(rowDataGrid);
		}
	}, [result, onWin, onLose, rowDataGrid]);

	return (
		<div className='my-5'>
			<div className='dark:text-gray-300 flex flex-col items-center gap-1 text-gray-600 select-none'>
				{rowDataGrid.map((row, rowIdx) => {
					return (
						<Row
							invalidWord={invalidWord}
							activeRowIndex={rowIndex}
							thisRowIndex={rowIdx}
							rowState={row}
							key={rowIdx}
						/>
					);
				})}
			</div>
			<div className='max-w-3xl mx-auto mt-4'>
				<KeyboardWrapper activeKey={activeKey} onKeypress={onKeyPress} prompts={keyStateMap} />
			</div>
			{/* <ToastContainer position='top-center' limit={1} hideProgressBar autoClose={500} /> */}
			<div className='hidden'>{audio}</div>
		</div>
	);
};

export default Mwordle;
