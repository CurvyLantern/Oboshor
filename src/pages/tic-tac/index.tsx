import { AspectRatio, Box, Button, Center, Paper, SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconX, IconCircle } from '@tabler/icons';

type CellType = {
	value: 0 | 1 | undefined;
	index: number;
	played: boolean;
};
type CheckType = {
	cell: CellType;
	ni: number;
	rowIndex: number;
};
const isEven = (n: number) => {
	return n % 2 === 0;
};

const TicTac = ({ currentRole }: { currentRole: 0 | 1 }) => {
	const [grid, setGrid] = useState<CellType[]>(() =>
		Array(9)
			.fill(0)
			.map((v, idx) => ({ value: undefined, index: idx, played: false }))
	);
	const [role, setRole] = useState<CellType['value']>(currentRole);
	const cellInRow = Math.sqrt(grid.length);
	const normalizeIndex = (cell: CellType) => {
		return cell.index % cellInRow;
	};
	const deriveRowIndex = (cell: CellType) => {
		const idx = Math.floor(cell.index / cellInRow);
		return idx;
	};
	const checkVertical = ({ cell, ni, rowIndex }: CheckType): boolean => {
		for (let i = 0; i < cellInRow; i++) {
			const gIdx = i * cellInRow + ni;
			const match = cell.value === grid[gIdx].value;
			if (!match) return false;
		}
		return true;
	};
	const checkHorizontal = ({ cell, ni, rowIndex }: CheckType): boolean => {
		for (let i = 0; i < cellInRow; i++) {
			const gIdx = rowIndex * cellInRow + i;
			const match = cell.value === grid[gIdx].value;
			if (!match) return false;
		}
		return true;
	};
	const checkDiagonal = ({ cell, ni, rowIndex }: CheckType): boolean => {
		const even = isEven(ni + rowIndex);
		console.log({ even });
		if (even) {
			/// left to right
			const ltr = [0, 4, 8];
			const rtl = [2, 4, 6];

			let temp = ltr;
			if (ltr.includes(ni + rowIndex * cellInRow)) {
				temp = ltr;
			} else {
				temp = rtl;
			}

			for (const cellIndex of temp) {
				const match = cell.value === grid[cellIndex].value;
				if (!match) return false;
			}
			return true;

			/// right to left
		}
		return false;
	};

	const handleClick = (cell: CellType) => {
		const gridCell = grid[cell.index];
		if (gridCell.played) return;
		gridCell.value = role;
		gridCell.played = true;

		const ci = cell.index;
		//recursive function

		// it is middle cell
		// everyone is connected with this one

		// other cells
		const ni = normalizeIndex(cell);
		const rowIndex = deriveRowIndex(cell);
		const condition1 = checkDiagonal({ cell, ni, rowIndex });
		const condition2 = checkHorizontal({ cell, ni, rowIndex });
		const condition3 = checkVertical({ cell, ni, rowIndex });

		if (condition1 || condition2 || condition3) {
			console.log('you have won');
		} else {
			const onGoing = grid.some(cell => cell.played === false);
			if (!onGoing) {
				console.log('Draw Draw');
			}
		}

		setRole(cur => (cur === 0 ? 1 : 0));
	};

	// game logic
	// even and odd

	const reset = () => {
		setGrid(() => {
			return Array(9)
				.fill(0)
				.map((v, idx) => ({ value: undefined, index: idx, played: false }));
		});
		setRole(0);
	};

	return (
		<div>
			{typeof role === 'number' && <div>player {role + 1}&apos;s turn</div>}
			<Center>
				<Box p={'lg'}>
					<SimpleGrid cols={3}>
						{grid.map(cell => {
							return (
								<Paper
									shadow='sm'
									radius='md'
									p='sm'
									key={cell.index}
									className='active:cursor-grabbing box-border w-32 h-32 cursor-pointer'
									onClick={() => {
										handleClick(cell);
									}}>
									{cell.value === 0 ? (
										<IconX size={'100%'} />
									) : cell.value === 1 ? (
										<IconCircle size={'100%'} />
									) : null}
								</Paper>
							);
						})}
					</SimpleGrid>
				</Box>
			</Center>
			<Button
				onClick={() => {
					reset();
				}}>
				Reset
			</Button>
		</div>
	);
};

export const getStaticProps = () => {
	const randomRole = Math.random() < 0.5 ? 0 : 1;
	return {
		props: {
			currentRole: randomRole,
		},
	};
};

export default TicTac;
