import tailwindcssAnimate from 'tailwindcss-animate';
// const tailwindcssAnimate = import "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
				'haiti-50': '#f4edff',
				'haiti-100': '#eadeff',
				'haiti-200': '#dbc3ff',
				'haiti-300': '#c99fff',
				'haiti-400': '#bf79ff',
				'haiti-500': '#b859fb',
				'haiti-600': '#b43bf0',
				'haiti-700': '#a02ed4',
				'haiti-800': '#8028ab',
				'haiti-900': '#662887',
				'haiti-950': '#291035',
        'japan-50': '#f4f4f4',
        'japan-100': '#e5e5e5',
        'japan-200': '#d7d7d7',
        'japan-300': '#c6c6c6',
        'japan-400': '#b3b3b3',
        'japan-500': '#a9a9a9',
        'mercury-50': '#f8f8f8',
        'mercury-100': '#f1eff0',
        'mercury-200': '#eae8e9',
        'mercury-300': '#d3ced1',
        'mercury-400': '#b8b1b4',
        'mercury-500': '#9e959a',
        'mercury-600': '#857d81',
        'mercury-700': '#6e676b',
        'mercury-800': '#5d575a',
        'mercury-900': '#504c4e',
        'mercury-950': '#292628',
			},
		},
	},
	plugins: [tailwindcssAnimate],
};
