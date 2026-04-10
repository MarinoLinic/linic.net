/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				background: '#0c0b14',
				surface: '#181626',
				primary: '#2d2a46',
				secondary: '#ffd166',
				tertiary: '#7c70ff',
				quarternary: '#ff5c7c',
				quarnary: '#d94fc0',
				accent: '#4ecdc4',
				text: '#f0eef8',
				muted: '#8c8aa8',
				dimWhite: 'rgba(255, 255, 255, 0.7)',
				dimBlue: 'rgba(9, 151, 124, 0.1)'
			},
			visibility: ['group-hover']
		},
		screens: {
			xs: '480px',
			ss: '620px',
			sm: '768px',
			md: '1060px',
			lg: '1200px',
			xl: '1700px'
		}
	},
	plugins: []
}
