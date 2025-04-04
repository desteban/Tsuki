import { ReactNode, createContext, useEffect, useState } from 'react';

export enum ThemesApp {
	light = 'light',
	dark = 'dark',
}

type Themes = keyof typeof ThemesApp;

interface Context {
	theme: Themes;
	changeTheme(): void;
}

export const ThemeContext = createContext<Context>({ theme: ThemesApp.light, changeTheme() {} });

export function ThemeContextProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Themes>(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}

		return 'light';
	});

	useEffect(() => {
		if (theme === 'dark') {
			document.querySelector('html')?.classList.add('dark');
		} else {
			document.querySelector('html')?.classList.remove('dark');
		}
	}, [theme]);

	const changeTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
