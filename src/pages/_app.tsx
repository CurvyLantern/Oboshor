import '../styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { RootLayout } from '../layouts/RootLayout';

export const MyApp = (props: AppProps & { colorScheme: ColorScheme }) => {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
	setCookie('mantine-color-scheme', colorScheme, { maxAge: 60 * 60 * 24 * 30 });

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		// when color scheme is updated save it to cookie
		setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
	};

	return (
		<ThemeProvider attribute='class' themes={['light', 'dark']} enableColorScheme>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
					<NotificationsProvider>
						<RootLayout>
							<Component {...pageProps} />
						</RootLayout>
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</ThemeProvider>
	);
};
MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	// get color scheme from cookie
	colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});

export default MyApp;
