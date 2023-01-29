const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');
keys.push('Enter', 'Backspace');
export const keyPressAllowed = (key: string) => keys.includes(key);
