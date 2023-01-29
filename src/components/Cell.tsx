import clsx from 'clsx';
import { motion } from 'framer-motion';
import { GridCellType } from '../types/types';
interface CellProps {
	content: GridCellType;
	cellIndex: number;
}
export const Cell = ({ content, cellIndex }: CellProps) => {
	return (
		<motion.div
			initial={false}
			animate={{
				scale: content.input ? [1.15, 1] : [0.95, 1],
			}}
			style={{
				perspective: '1000px',
			}}>
			<motion.div
				initial={false}
				animate={{
					rotateX: content.state ? [90, 0] : 0,
				}}
				transition={{
					delay: cellIndex * 0.3,
					duration: 0.4,
				}}
				className={clsx({
					'border-solid w-14 h-14 font-extrabold  border-2 border-neutral-800 dark:border-neutral-400   flex items-center justify-center text-3xl ':
						true,
					'bg-green-600 text-white': content.state === 'correct',
					'bg-orange-600 text-white': content.state === 'misplaced',
					'bg-neutral-700 text-white': content.state === 'wrong',
				})}>
				{content.input}
			</motion.div>
		</motion.div>
	);
};
