	/** @type {import('tailwindcss').Config} */
	export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter',
					'sans-serif'
				]
			},
			colors: {
				primary: {
					'50': '#eef2ff',
					'100': '#e0e7ff',
					'200': '#c7d2fe',
					'300': '#a5b4fc',
					'400': '#818cf8',
					'500': '#6366f1',
					'600': '#4f46e5',
					'700': '#4338ca',
					'800': '#3730a3',
					'900': '#312e81',
					'950': '#1e1b4b',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					'50': '#ecfdf5',
					'100': '#d1fae5',
					'200': '#a7f3d0',
					'300': '#6ee7b7',
					'400': '#34d399',
					'500': '#10b981',
					'600': '#059669',
					'700': '#047857',
					'800': '#065f46',
					'900': '#064e3b',
					'950': '#022c22',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					'50': '#fffbeb',
					'100': '#fef3c7',
					'200': '#fde68a',
					'300': '#fcd34d',
					'400': '#fbbf24',
					'500': '#f59e0b',
					'600': '#d97706',
					'700': '#b45309',
					'800': '#92400e',
					'900': '#78350f',
					'950': '#451a03',
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				success: {
					'50': '#f0fdf4',
					'100': '#dcfce7',
					'200': '#bbf7d0',
					'300': '#86efac',
					'400': '#4ade80',
					'500': '#22c55e',
					'600': '#16a34a',
					'700': '#15803d',
					'800': '#166534',
					'900': '#14532d',
					'950': '#052e16'
				},
				warning: {
					'50': '#fff7ed',
					'100': '#ffedd5',
					'200': '#fed7aa',
					'300': '#fdba74',
					'400': '#fb923c',
					'500': '#f97316',
					'600': '#ea580c',
					'700': '#c2410c',
					'800': '#9a3412',
					'900': '#7c2d12',
					'950': '#431407'
				},
				error: {
					'50': '#fef2f2',
					'100': '#fee2e2',
					'200': '#fecaca',
					'300': '#fca5a5',
					'400': '#f87171',
					'500': '#ef4444',
					'600': '#dc2626',
					'700': '#b91c1c',
					'800': '#991b1b',
					'900': '#7f1d1d',
					'950': '#450a0a'
				},
				dark: {
					'100': '#cfd1d9',
					'200': '#a1a3b4',
					'300': '#72758e',
					'400': '#4a4d6e',
					'500': '#1e2039',
					'600': '#181a2e',
					'700': '#121322',
					'800': '#0c0d17',
					'900': '#06060b',
					'950': '#020203'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			backdropBlur: {
				xs: '2px'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
	};