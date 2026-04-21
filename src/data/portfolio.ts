export interface PortfolioLink {
	label: string
	url: string
	internal?: boolean
}

export type PortfolioProjectSectionId = 'featured' | 'main' | 'archive'

export interface PortfolioProjectSection {
	id: PortfolioProjectSectionId
	eyebrow: string
	title: string
	description?: string
}

export interface PortfolioProject {
	title: string
	year: string
	section: PortfolioProjectSectionId
	priority: number
	tech: string[]
	description: string[]
	image?: string
	image2?: string
	links: PortfolioLink[]
	note?: string
	wip?: boolean
}

export interface PortfolioMiniProject {
	title: string
	year: string
	tech: string[]
	description: string
	links: PortfolioLink[]
	images?: string[]
}

export interface PortfolioPythonScript {
	label: string
	url: string
}

export const PORTFOLIO_PROJECT_SECTIONS: PortfolioProjectSection[] = [
	{
		id: 'featured',
		eyebrow: 'Top tier',
		title: 'Featured Projects',
		description: 'Most representative work for product thinking, implementation quality, and technical depth.'
	},
	{
		id: 'main',
		eyebrow: 'More work',
		title: 'Additional Projects',
		description: 'Strong supporting projects with clear learning value and practical implementation.'
	},
	{
		id: 'archive',
		eyebrow: 'Archive',
		title: 'Early Projects',
		description: 'Older projects that show progression and experimentation.'
	}
]

export const PORTFOLIO_COPY = {
	page: {
		title: 'Portfolio',
		subtitle: 'Projects from 2020 to present'
	},
	miniProjects: {
		eyebrow: 'Experiments',
		title: 'Smaller Works & Experiments'
	},
	pythonScripts: {
		eyebrow: 'ongoing',
		title: 'Python Scripts',
		description: 'I love making small Python scripts to solve problems and automate tedious tasks.'
	}
} as const

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
	{
		title: 'This Website',
		year: '2024',
		section: 'featured',
		priority: 1,
		tech: ['Vite', 'React', 'TypeScript', 'Tailwind', 'MDX', 'ReCharts', 'Axios'],
		description: [
			"The website you're scrolling through is my attempt at designing my own portfolio and blog. Hopefully, you like it.",
			"Several mini projects are hosted: an income tax calculator which visualizes distribution, a time counter using props, and a hidden few I'm still working on. LocalStorage is used on the homepage."
		],
		image: 'linic.gif',
		links: [{ label: 'GitHub', url: 'https://github.com/MarinoLinic/linic.net' }]
	},
	{
		title: 'Chronica Omnium — Curated History of the World',
		year: '2023',
		section: 'featured',
		priority: 3,
		tech: ['Vite', 'React', 'TypeScript', 'Python', 'Leaflet', 'Plotly'],
		description: [
			'This project displays one large JSON file compiled from a CSV I personally filled with over 500 historical events (goal: 2,000) and over a dozen attributes, with the purpose of making sense of world history. By compressing and prioritizing events, I can allow people to more easily have a general picture they can use as a reference frame for memorizing historical information.',
			"I used Python for Wikipedia scraping and recursive data processing. On the React side: custom URLs via useParams, filtering on various attributes, Plotly charts, Leaflet maps, and scrollbar page percentage counting. Even though development is on pause, I'm excited about this tool and intend to use it as an educational resource."
		],
		image: 'https://i.imgur.com/9pQOLNv.jpg',
		links: [
			{ label: 'Live site', url: 'https://world-history-test.netlify.app/' },
			{ label: 'GitHub', url: 'https://github.com/MarinoLinic/chronica-omnium' },
			{ label: 'Early spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1fzc67WveqqNbZZohmLSg8ERfQ_rPP-YJSuce0c1j-uc/edit?usp=sharing' }
		],
		note: 'Requires 2000px+ screen. Development is on pause — intended as an educational resource.',
		wip: true
	},
	{
		title: 'Income Tax Calculator',
		year: '2023',
		section: 'featured',
		priority: 2,
		tech: ['React', 'ReCharts', 'TypeScript', 'Tailwind'],
		description: [
			"I made this to calculate my own taxes in Croatia. I've made sure to do input sanitization, and explained and visualized how the law works step-by-step. This is by far the most feature-rich tool for income tax in Croatia — which, admittedly, doesn't say too much!"
		],
		image: 'https://i.imgur.com/peIAE6x.png',
		links: [
			{ label: 'Try it', url: '/porez-na-dohodak', internal: true },
			{ label: 'GitHub', url: 'https://github.com/MarinoLinic/linic.net/blob/master/src/pages/SalaryCalculator.tsx' }
		],
		note: 'Screenshot may be outdated.'
	},
	{
		title: '2D Platformer — FIDIT Slayer',
		year: '2023',
		section: 'main',
		priority: 1,
		tech: ['JavaScript'],
		description: [
			"A funny (to my friends and I) full-fledged one-level platformer game Dorian Manjarić and I made in pure JavaScript. It has a boss fight and everything. We built this with OOP principles in mind; I would often jump in if there was a persistent bug, so I made and fixed our collision detection system among a few other key elements of gameplay.",
			'I voice acted, made the custom design, and composed the main theme in Omnisphere and FL Studio. Otherwise I was more focused on designing the game and optimizing code.'
		],
		image: 'https://manjaric.com/images/fiditslayer/fiditslayer1.png',
		links: [
			{ label: 'Play it', url: 'https://fiditslayer.manjaric.com/' },
			{ label: 'Watch playthrough', url: 'https://www.youtube.com/watch?v=TDLpS5BP7FU' },
			{ label: 'GitHub', url: 'https://github.com/dorian305/FIDIT-Slayer' }
		],
		note: 'Not responsive. Requires 2000px+ screen.'
	},
	{
		title: 'Django Insect Museum',
		year: '2023',
		section: 'main',
		priority: 2,
		tech: ['Django', 'Python'],
		description: [
			"Along with Ivan Matejčić, I created a functional CRUD application that lets the user manipulate entries in Django for a fictional insect museum. Unit tests were created using django.test. It's a rudimentary application, but a good opportunity to learn Django. And, the name? It was my idea."
		],
		links: [{ label: 'GitHub', url: 'https://github.com/MarinoLinic/django-zavrsni-muzej-kukaca' }]
	},
	{
		title: 'Naval Wars — Next.js Travian Clone',
		year: '2022',
		section: 'main',
		priority: 3,
		tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Tailwind', 'NextAuth'],
		description: [
			"I worked on this with a good friend, Kalciphoz, who created a successful Terraria mod: KRPG. We were both just getting into web development and decided to make a Travian clone in Next.js to learn frontend dev. We created a login system via OAuth 2.0, a Prisma + SQL backend, and a character selection screen.",
			'I learned a substantial amount about React and Next.js via this project, and Kalciphoz taught me some relevant coding principles — there were files where my code was way more of a mess than it should have been. The project was deemed too ambitious, and we both needed to focus on other priorities.'
		],
		image: 'https://i.imgur.com/48tnxiD.png',
		image2: 'character.gif',
		links: [
			{ label: 'GitHub', url: 'https://github.com/MarinoLinic/NavalWars' },
			{ label: "Kalciphoz's KRPG mod", url: 'https://www.youtube.com/watch?v=QldqCHEaqCc&feature=youtu.be' }
		],
		note: 'Development paused.'
	},
	{
		title: 'C++ Clicker Game',
		year: '2021',
		section: 'archive',
		priority: 1,
		tech: ['C++', 'SFML', 'Visual Studio'],
		description: [
			'An original game I worked on with Marin Martuslović in C++ and the SFML library. All graphic assets were custom-made. The game follows the typical incremental clicker formula — wealth is gradually acquired via clicking and passive income streams. Players can change their name and gender.',
			'We found ourselves addicted to our own game, as did our professor.'
		],
		image: 'clicker.gif',
		links: [{ label: 'GitHub', url: 'https://github.com/MarinoLinic/Clicker_game_CPP' }]
	},
	{
		title: 'Flappy Bird Clone',
		year: '2021',
		section: 'archive',
		priority: 2,
		tech: ['JavaScript', 'HTML', 'CSS'],
		description: [
			'An original Flappy Bird clone Dorian Manjarić and I made in vanilla JavaScript. This was an important milestone in my understanding of JavaScript. I also built a small stopwatch application during this phase of my learning.'
		],
		image: 'https://i.imgur.com/dF3qsZo.png',
		links: [
			{ label: 'Play it', url: 'https://marinolinic.github.io/Flappy_Ghost/flappy.html' },
			{ label: 'GitHub', url: 'https://github.com/MarinoLinic/Flappy_Ghost' }
		]
	},
	{
		title: 'Photographic Studio',
		year: '2020',
		section: 'archive',
		priority: 3,
		tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 4'],
		description: [
			'My first web project. A basic HTML/CSS website for a made-up photographic studio using Bootstrap 4. It includes Google Maps, a picture grid, a video, an image carousel, and Font Awesome icons. A web design oriented project.'
		],
		image: 'https://i.imgur.com/9Tt4BVT.png',
		links: [
			{ label: 'Live site', url: 'https://marinolinic.github.io/HTML_CSS_Project_1/' },
			{ label: 'GitHub', url: 'https://github.com/MarinoLinic/HTML_CSS_Project_1' }
		]
	}
]

export const PORTFOLIO_MINI_PROJECTS: PortfolioMiniProject[] = [
	{
		title: 'p5.js Creative Programming',
		year: '2023',
		tech: ['p5.js', 'JavaScript'],
		description: 'Creative programming experiments with p5.js.',
		links: [{ label: 'Try them', url: 'https://marinolinic.github.io/LinicPetranovic_p5/' }],
		images: ['p5.gif']
	},
	{
		title: 'Facebook Messenger Statistics Analyzer',
		year: '2023',
		tech: ['Python', 'Plotly', 'NumPy'],
		description: 'Exports and analyzes Facebook message JSON: character counts, message frequency per person, and more. Works with any exported Facebook data.',
		links: [{ label: 'GitHub', url: 'https://github.com/MarinoLinic/FB_Statistics_Analyzer/blob/master/main.py' }],
		images: ['https://i.imgur.com/BuwL3pl.png']
	},
	{
		title: 'Discord Statistics Analyzer',
		year: '2023',
		tech: ['Python', 'Plotly', 'NumPy'],
		description: 'Same pipeline applied to Discord group chats. Analyzed message timing — lockdown turned out to be great for data experiments.',
		links: [{ label: 'GitHub (private)', url: 'https://github.com/MarinoLinic/Discord_Statistics_Analyzer' }],
		images: ['https://i.imgur.com/W6hKHGS.png', 'https://i.imgur.com/07KEeiT.png']
	},
	{
		title: 'Monty Hall Simulation',
		year: '2021',
		tech: ['C++'],
		description: "The Monty Hall problem wasn't entirely intuitive to me at 19. So I ran a simulation in C++ to confirm and deeply understand the probability.",
		links: [{ label: 'Source', url: 'https://github.com/MarinoLinic/cpp-playground/blob/main/monty_hall.cpp' }],
		images: ['https://i.imgur.com/CfpkPJq.png']
	},
	{
		title: 'Wave Emoji Blocker Extension',
		year: '2021',
		tech: ['JavaScript'],
		description: "I don't like the 👋 emoji. So I made a browser extension to remove it.",
		links: [{ label: 'Install', url: 'https://github.com/MarinoLinic/hand-waving-emoji-blocker-extension' }]
	},
	{
		title: 'Selenium Browser Spam Bot',
		year: '2021',
		tech: ['Python', 'Selenium'],
		description: "Automated browser spam to stress-test a friend's chatbot infrastructure. A fun way to learn Selenium.",
		links: [{ label: 'Source', url: 'https://github.com/MarinoLinic/SeleniumTests/blob/main/Sigma.py' }]
	}
]

export const PORTFOLIO_PYTHON_SCRIPTS: PortfolioPythonScript[] = [
	{ label: 'Batch create QR codes (a gift to a company)', url: 'https://github.com/MarinoLinic/Create_Batch_QR_Codes' },
	{ label: 'Batch convert MP4 → MP3', url: 'https://github.com/MarinoLinic/batch-convert-mp4-to-mp3/blob/master/main.py' },
	{ label: 'Batch convert DOCX → PDF', url: 'https://github.com/MarinoLinic/Word-to-PDF' },
	{ label: 'Batch hardcode EXIF timestamps on images', url: 'https://github.com/MarinoLinic/hardcode-exif-timestamp-on-images/blob/master/main.py' },
	{ label: 'File iterator helper', url: 'https://github.com/MarinoLinic/Python_Helper_Programs/blob/master/helper-file-iterater.py' },
	{ label: 'Pixel-based level builder concept', url: 'https://github.com/MarinoLinic/Image_Level_Builder_PY' }
]
