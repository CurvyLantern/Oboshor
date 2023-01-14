import { useState, useEffect } from 'react';
import { keyPressAllowed } from '../utils/AllowedKeys';

const useKeyPress = () => {
	const [keyPressed, setKeyPressed] = useState('');
	const [keyCode, setKeyCode] = useState('');
	useEffect(() => {
		const upHandler = (event: KeyboardEvent) => {
			if (!keyPressAllowed(event.key)) return;

			setKeyPressed(event.key);
			setKeyCode(event.code);
		};
		window.addEventListener('keyup', upHandler);
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keyup', upHandler);
		};
	}, []);
	return {
		keyPressed,
		keyCode,
	};
};
export { useKeyPress };
