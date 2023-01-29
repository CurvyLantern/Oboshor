import { useEffect, useRef } from 'react';

export const useKeyup = (cb: (key: string) => void) => {
	const callbackRef = useRef(cb);
	useEffect(() => {
		callbackRef.current = cb;
	});
	useEffect(() => {
		const h = ({ key }: KeyboardEvent) => callbackRef.current(key);
		window.addEventListener('keyup', h);
		return () => window.removeEventListener('keyup', h);
	}, []);
};
