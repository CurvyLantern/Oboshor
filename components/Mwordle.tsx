import { Row } from './Row';

import { ToastContainer } from 'react-toastify';
import { useKeyup } from '../utils/useKeyupEvent';
import { useWordle } from '../utils/useWordle';
import { Keyboard } from './Keyboard';

const Mwordle = ({ answer }: { answer: string }) => {
	const { handleFn, rowIndex, invalidWord, keyStateMap, rowDataGrid } = useWordle(answer);
	useKeyup(handleFn);
	return (
		<div className='my-5'>
			<div>{answer}</div>
			<div className='flex flex-col gap-1 select-none items-center'>
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
			<div className='max-w-3xl mt-4 mx-auto'>
				<Keyboard onKeypress={handleFn} prompts={keyStateMap} />
			</div>
			<ToastContainer position='top-center' limit={1} hideProgressBar autoClose={100} />
		</div>
	);
};

export default Mwordle;
