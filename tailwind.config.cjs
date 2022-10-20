/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				primary: '#393f5f',
				secondary: '#ffe69d',
				tertiary: '#646cff',
				quarternary: '#eb6171',
				quarnary: '#d65f9e',
				background: '#242424',
				text: '#dedede',
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
