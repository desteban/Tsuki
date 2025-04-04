import { editor } from 'monaco-editor';


enum ThemeNamesEditor {
	darkCustom = 'dark-custom',
}

export enum ThemesEditor {
	dark = 'vs-dark',
	light = 'light',
	darkContrast = 'hc-black',
	lightContrast = 'hc-light',
	'themeCustom' = ThemeNamesEditor.darkCustom,
}

type ItemTheme = {
	name: string;
	theme: editor.IStandaloneThemeData;
};

export const customThemesEditor: ItemTheme[] = [
	{
		name: ThemeNamesEditor.darkCustom,
		theme: {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ token: '', foreground: '#F0F0F0', background: '#222222' },
				{ token: 'comment', foreground: '#6A9955' },
				{ token: 'keyword', foreground: '#C586C0' },
			],
			colors: {
				'editor.background': '#222222',
				'editor.foreground': '#F0F0F0',
			},
		},
	},
];
