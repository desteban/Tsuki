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
				haiti: {
          DEFAULT: '#06b6d4',
					50: '#f4edff',
					100: '#eadeff',
					200: '#dbc3ff',
					300: '#c99fff',
					400: '#bf79ff',
					500: '#b859fb',
					600: '#b43bf0',
					700: '#a02ed4',
					800: '#8028ab',
					900: '#662887',
					950: '#291035',
				},
				japan: {
					50: '#f4f4f4',
					100: '#e5e5e5',
					200: '#d7d7d7',
					300: '#c6c6c6',
					400: '#b3b3b3',
					500: '#a9a9a9',
				},
				mercury: {
					50: '#f8f8f8',
					100: '#f1eff0',
					200: '#eae8e9',
					300: '#d3ced1',
					400: '#b8b1b4',
					500: '#9e959a',
					600: '#857d81',
					700: '#6e676b',
					800: '#5d575a',
					900: '#504c4e',
					950: '#292628',
				},
			},
		},
	},
	plugins: [tailwindcssAnimate],
};
