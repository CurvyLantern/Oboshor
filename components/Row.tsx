import { Cell } from './Cell';
import { GridRowType } from '../types/types';
import { motion } from 'framer-motion';

interface RowProps {
	rowState: GridRowType;
	activeRowIndex: number;
	thisRowIndex: number;
	invalidWord: boolean;
}
export const Row = ({ thisRowIndex, rowState, activeRowIndex, invalidWord = false }: RowProps) => {
	const wiggle = invalidWord && thisRowIndex === activeRowIndex;
	return (
		<motion.div
			initial={false}
			animate={{
				x: wiggle ? [-12, 12, -10, 10, -6, 6, -3, 3, 0] : 0,
			}}
			transition={{
				duration: 0.4,
			}}
			className=' flex gap-1'>
			{rowState.map((cellContent, cellIdx) => (
				<Cell cellIndex={cellIdx} key={cellIdx} content={cellContent} />
			))}
		</motion.div>
	);
};
