import { useEffect, useState } from 'react';
import { GridDataType } from '../types/types';
type StateType = 'ongoing' | 'finished' | 'paused';
type ResultType = 'win' | 'lose' | undefined;
export const useResult = (grid: GridDataType) => {
	const [state, setState] = useState<StateType>('ongoing');
	const [result, setResult] = useState<ResultType>(undefined);
	useEffect(() => {
		// if the game is finished then do not do anything
		if (state === 'finished') return;
		// simplify grid
		const simpleGrid = grid.map(row => row.map(cell => cell.state));
		// loop over all the rows
		gridloop: for (let r = 0; r < simpleGrid.length; r++) {
			let row = simpleGrid[r];

			// initialy we will think correct count is 0
			let correctCount = 0;

			// loop over all the cells
			rowloop: for (let c = 0; c < row.length; c++) {
				let cell = row[c];

				//if cell is undefined then player is still playing
				if (!cell) {
					setState('ongoing');
					break gridloop;
				}

				if (cell === 'correct') {
					correctCount++;
				}
			}

			// if correct count is 6 then game is finished and you have won
			if (correctCount === 6) {
				setState('finished');
				setResult('win');
				break gridloop;
			}

			// check if this is the last row. if it is and correctCount is
			// less than 6 then you have lost
			if (r === simpleGrid.length - 1 && correctCount < 6) {
				setState('finished');
				setResult('lose');
			}
		}
	}, [grid, state]);

	return {
		state,
		result,
	};
};
