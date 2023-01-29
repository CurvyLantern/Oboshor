import { useTheme } from 'next-themes';
import { ActionIcon, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useEffect, useState } from 'react';

export const ColorToggle = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { setTheme } = useTheme();
	const dark = colorScheme === 'dark';
	return (
		<ActionIcon
			onClick={() => {
				toggleColorScheme();
				setTheme(colorScheme === 'dark' ? 'light' : 'dark');
			}}
			size='lg'
			sx={t => ({
				backgroundColor: dark ? t.colors.dark[6] : t.colors.gray[0],
				color: dark ? t.colors.yellow[4] : t.colors.blue[6],
			})}>
			{dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
		</ActionIcon>
	);
};
