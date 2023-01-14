import { AppProps } from 'next/app';
import 'react-simple-keyboard/build/css/index.css';
import '../styles/tailwind.css';
import '../styles/keyboard.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
