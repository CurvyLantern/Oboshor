import { GetStaticProps } from 'next';
import { useState } from 'react';
import { useAudio } from 'react-use';
import { Modal } from '../components/Modal';
import Mwordle from '../components/Mwordle';
import { getRandomWord } from '../utils/inputExistsInList';
import { Text } from '@mantine/core';

import dynamic from 'next/dynamic';
const Confetti = dynamic(() => import('../components/MyConfetti'), { ssr: false });

const HomePage = ({ answer }: { answer: string }) => {
	const [lost, setLost] = useState(false);
	const [win, setWin] = useState(false);
	let [isOpen, setIsOpen] = useState(false);

	const winAudio = useAudio({
		src: '/win.mp3',
		autoPlay: false,
	});
	const loseAudio = useAudio({
		src: '/lose.mp3',
		autoPlay: false,
	});

	const handleWin = () => {
		setWin(true);
		// setIsOpen(true);
		winAudio[2].play();
		console.log('you have won');
	};
	const handleLose = () => {
		setLost(true);
		// setIsOpen(true);
		loseAudio[2].play();
		console.log('you have lost');
	};
	return (
		<>
			<Text>{answer}</Text>
			<section className='flex-1'>
				<Mwordle answer={answer} onLose={handleLose} onWin={handleWin} />
				<p className='text-center'>
					Please play in one go. If you refresh the page game will reset and a new word will be chosen :\
				</p>
			</section>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
					winAudio[2].pause();
					loseAudio[2].pause();
				}}>
				{win ? <p className='text-green-500'>You have won</p> : null}
				{lost ? <p className='text-red-500'>You have lost</p> : null}
			</Modal>
			<Confetti
				isOpen={win || lost}
				mode={win ? 'win' : 'lose'}
				colors={lost ? ['#333', '#444', '#000', '#fff'] : undefined}
			/>
			<div className='hidden'>
				{winAudio[0]}
				{loseAudio[0]}
			</div>
		</>
	);
};
export const getStaticProps: GetStaticProps = async ctx => {
	const answer = getRandomWord();

	return {
		props: {
			answer,
		},
	};
};

export default HomePage;
