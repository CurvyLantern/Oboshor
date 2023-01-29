import Link from 'next/link';
import { AppShell, Box, Burger, Flex, Header, Navbar, NavLink, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { ColorToggle } from '../components/ColorToggle';
import { useRouter } from 'next/router';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const router = useRouter();

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			navbar={
				<Navbar
					className='dark:bg-zinc-900'
					p='md'
					hiddenBreakpoint='sm'
					hidden={!opened}
					width={{ sm: 200, lg: 300 }}>
					<NavLink
						href={{
							pathname: '/',
						}}
						label='Mwordle'
						component={Link}
						active={router.pathname === '/'}
					/>
					<NavLink
						href={{
							pathname: '/tic-tac',
						}}
						label='Tic-Tac'
						component={Link}
						active={router.pathname === '/tic-tac'}
					/>
				</Navbar>
			}
			header={
				<Header height={{ base: 50, md: 70 }} className='flex items-center'>
					<div className='ml-8'>
						<Burger
							opened={opened}
							onClick={() => setOpened(o => !o)}
							size='sm'
							color={theme.colors.gray[6]}
							mr='xl'
						/>
					</div>

					<Text className='ml-auto'>Mwordle</Text>
					<div className='ml-auto mr-8'>
						<ColorToggle />
					</div>
				</Header>
			}>
			{children}
		</AppShell>
	);
};
