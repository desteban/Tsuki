import { ReactNode, createContext, useEffect, useState } from 'react';

type themes = 'light' | 'dark';

interface Context {
	theme: themes;
	changeTheme(): void;
}

export const ThemeContext = createContext<Context>({ theme: 'light', changeTheme() {} });

export function ThemeContextProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<themes>(() => {
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
