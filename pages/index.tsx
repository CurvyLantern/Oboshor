import { Poppins } from '@next/font/google';
import Mwordle from '../components/Mwordle';
import 'react-toastify/dist/ReactToastify.css';
import { GetStaticProps } from 'next';
import { getRandomWord } from '../utils/inputExistsInList';

const poppins = Poppins({
	weight: ['400', '800'],
	subsets: ['latin'],
});

const HomePage = ({ answer }: { answer: string }) => {
	return (
		<main className={`${poppins.className} flex flex-col min-h-screen overflow-hidden`}>
			<section className='shadow-md shadow-green-400'>
				<header className='flex items-center justify-center h-20 bg-neutral-800 text-sky-100'>
					<h1 className='text-green-200'>Mwordle</h1>
				</header>
			</section>
			<section className='flex-1 bg-slate-600 '>
				<Mwordle answer={answer} />
			</section>
		</main>
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
