import { showNotification } from '@mantine/notifications';
import { useRef, useState } from 'react';
import { GridCellType, GridDataType, GridRowType, letterState } from '../types/types';
import { keyPressAllowed } from '../utils/AllowedKeys';
import { inputExistsInList } from '../utils/inputExistsInList';
import { KeyBackspace, KeyEnter } from '../utils/keys';
import { useResult } from './useResult';
class CellObject {
	array: GridRowType = [
		{ input: '', state: undefined },
		{ input: '', state: undefined },
		{ input: '', state: undefined },
		{ input: '', state: undefined },
		{ input: '', state: undefined },
		{ input: '', state: undefined },
	];
}
export const useWordle = (answer: string) => {
	const [rowDataGrid, setRowDataGrid] = useState<GridDataType>([
		new CellObject().array,
		new CellObject().array,
		new CellObject().array,
		new CellObject().array,
		new CellObject().array,
		new CellObject().array,
	]);
	const [invalidWord, setInvalidWord] = useState(false);
	const [rowIndex, setRowIndex] = useState(0);
	const [colIndex, setColIndex] = useState(0);
	const [keyStateMap, setKeyStateMap] = useState<Map<string, Exclude<letterState, undefined>>>(new Map());
	const [activeKey, setActiveKey] = useState('');
	const timeoutRef = useRef<number>(0);
	const { result, state } = useResult(rowDataGrid);

	const handleFn = (key: string) => {
		if (result === 'win' || state === 'finished') return;
		if (!keyPressAllowed(key)) return;
		setActiveKey(key);
		if (rowIndex >= 6) {
			// final match
			return;
		}
		switch (key) {
			case KeyEnter:
				{
					// toast.clearWaitingQueue();
					//see if any cell is empty
					if (colIndex < 6) {
						showNotification({
							message: 'not enough words',
							color: 'orange',
						});
						return;
					}
					const tempRowArr = rowDataGrid[rowIndex];
					const inputString = tempRowArr.map(cell => cell.input).join('');
					if (!inputExistsInList(inputString)) {
						window.clearTimeout(timeoutRef.current);

						showNotification({
							message: 'invalid word',
						});
						setInvalidWord(true);
						timeoutRef.current = window.setTimeout(() => {
							setInvalidWord(false);
						}, 2000);
						return;
					}
					//comapre with ans
					let ansLetters: GridCellType[] = answer.split('').map(l => ({ input: l, state: undefined }));

					// Check if it's a direct hit
					tempRowArr.forEach((cell, cellIdx) => {
						if (cell.input === ansLetters[cellIdx].input) {
							ansLetters[cellIdx].state = 'correct';
							tempRowArr[cellIdx].state = 'correct';
						}
					});

					// Check if the letter exists in any place

					tempRowArr.forEach((cell, cellIdx) => {
						// if direct hit then skip
						if (cell.state) return;
						// else

						for (let ansIdx = 0; ansIdx < ansLetters.length; ansIdx++) {
							const ans = ansLetters[ansIdx];
							if (ans.state) continue;

							const matches = ans.input === cell.input;
							if (matches) {
								ansLetters[ansIdx].state = 'misplaced';
								tempRowArr[cellIdx].state = 'misplaced';

								break;
							} else {
								tempRowArr[cellIdx].state = 'wrong';
							}
						}
					});

					tempRowArr.forEach(cell => {
						if (!cell.state) return;
						const has = keyStateMap.has(cell.input);
						if (has) {
							const hasCorrectValue = keyStateMap.get(cell.input);
							if (hasCorrectValue === 'correct') return;
						}
						keyStateMap.set(cell.input, cell.state);
					});
					setKeyStateMap(new Map(keyStateMap));

					setRowDataGrid([...rowDataGrid]);

					setRowIndex(prev => Math.min(prev + 1, 6));
					setColIndex(0);
				}
				break;
			case KeyBackspace:
				{
					const tempColIndex = Math.max(colIndex - 1, 0);
					setColIndex(tempColIndex);
					rowDataGrid[rowIndex][tempColIndex].input = '';
					setRowDataGrid([...rowDataGrid]);
				}
				break;
			default:
				{
					if (colIndex >= 6) {
						break;
					}
					rowDataGrid[rowIndex][colIndex].input = key.toUpperCase();
					setRowDataGrid([...rowDataGrid]);

					// increase column index
					setColIndex(prev => Math.min(prev + 1, 6));
				}
				break;
		}
	};

	return {
		invalidWord,
		rowIndex,
		colIndex,
		keyStateMap,
		handleFn,
		rowDataGrid,
		activeKey,
		result,
		gameState: state,
	};
};
