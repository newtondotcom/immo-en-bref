import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function urlizeName(name: string) {
	return name.toLowerCase().replace(/ /g, '~');
}

export function unurlizeName(name: string) {
	return name.replace(/~/g, ' ');
}
