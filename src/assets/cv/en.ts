// ─── Personal Info ───────────────────────────────────────────────
export const personalInfo = {
	name: 'Marino Linic',
	title: '',
	location: 'Zagreb, Croatia',
	profileImage: 'pic.jpg',
	contact: {
		website:  { value: 'linic.net',                        included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		phone:    { value: '+385977699443',                    included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		email:    { value: 'marinolinic@gmail.com',            included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		linkedin: { value: 'linkedin.com/in/marino-linic',     included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		github:   { value: 'github.com/MarinoLinic',           included: false, tags: 'backend,frontend,python,web,automation,testing' },
	},
	summaries: {
		all:      'Versatile developer and communicator with experience spanning web development, Python scripting, automation, testing, and customer-facing roles. Built web scraping pipelines, GUI applications, frontend interfaces, and automated testing suites. Completed an undergraduate degree in Informatics at the University of Rijeka, serving as a Python tutor and lab demonstrator.',
		general:  'Developer with experience in web development, Python scripting, and web scraping. Completed an undergraduate degree in Informatics at the University of Rijeka, serving as a Python tutor and lab demonstrator. Proven ability to adapt and learn quickly in various technical and non-technical roles.',
		backend:  'Backend-focused developer with experience in Python, web scraping, and data pipeline automation. Skilled in building robust server-side applications and managing infrastructure. Completed an undergraduate degree in Informatics with a focus on software engineering.',
		frontend: 'Developer with a focus on frontend technologies, including JavaScript and React. Experience building responsive and user-friendly web applications. Completed an undergraduate degree in Informatics at the University of Rijeka.',
		python:   'Python developer specializing in web scraping, automation, and GUI applications. Proven ability to architect and implement efficient, scalable Python solutions. Completed an undergraduate degree in Informatics where I served as a Python tutor.',
		nontech:  'A communicative, responsible, and resourceful individual with experience working directly with people in customer support and promotional roles. Proven to be adaptable to diverse work environments, skilled in problem-solving, and enjoys creating a positive and pleasant atmosphere for all visitors. Speaks English fluently.',
	},
}

// ─── Sections ────────────────────────────────────────────────────
export const sections = [
	{ id: 'summary',        title: 'Summary' },
	{ id: 'experience',     title: 'Experience' },
	{ id: 'projects',       title: 'Projects' },
	{ id: 'education',      title: 'Education' },
	{ id: 'skills',         title: 'Skills' },
	{ id: 'certifications', title: 'Certifications' },
	{ id: 'languages',      title: 'Languages' },
]

// ─── Experience ──────────────────────────────────────────────────
export const experience = [
	{
		title:    'Tutoring / Career Break',
		company:  'Private',
		duration: 'February 2025 - Present',
		location: 'Zagreb, Croatia',
		descriptions: {
			general:  'Teaching and looking after a child in a private household during morning hours.',
			backend:  'Providing specialized tutoring and consultation in backend development concepts and technologies.',
			frontend: 'Teaching modern frontend technologies, focusing on JavaScript, React, and best practices in web design.',
			python:   'Offering dedicated Python tutoring for applications ranging from web scraping to data analysis and GUI development.',
			web:      'Tutoring in web development topics including JavaScript, React, HTML/CSS, and Python scripting, covering both frontend and backend web concepts.',
		},
		included: true,
		tags: 'backend,frontend,python,web',
	},
	{
		title:    'Web Scraper Intern',
		company:  'Tryp.com',
		duration: 'September 2024 - December 2024',
		location: 'Copenhagen, Denmark',
		descriptions: {
			general:    'Developed and maintained web scraping scripts to gather data from various transport websites. Responsibilities included finding hidden APIs, filtering data, scheduling scraping tasks, and fixing bugs.',
			backend:    'Engineered robust data pipelines for extracting transport data via APIs and direct scraping. Managed data filtering and insertion into databases, and automated scraping schedules.',
			python:     'Utilized Python extensively with libraries like Selenium and BeautifulSoup for web scraping, data processing, and creating automation scripts.',
			automation: 'Built and maintained an automated system using Selenium for ticket purchasing and created scheduled data collection pipelines to ensure data freshness.',
		},
		included: true,
		tags: 'backend,python,automation,web',
	},
	{
		title:    'Python Developer',
		company:  'TruePlay',
		duration: 'March 2024 - December 2024',
		location: 'Copenhagen, Denmark',
		descriptions: {
			general:  'Developed a Python GUI application for psychological evaluations, managed backend infrastructure, and contributed to a related React-based website.',
			backend:  'Oversaw operations and infrastructure for a psychological evaluation software, ensuring stability and performance.',
			frontend: 'Developed and maintained components for a client-facing website using JavaScript and React.',
			python:   'Designed and implemented a comprehensive GUI application using PySimpleGUI, including a complex algorithm to assess tracking input for psychological analysis.',
		},
		included: true,
		tags: 'backend,frontend,python,web',
	},
	{
		title:    'Testing Automation Intern',
		company:  'Own.Solutions',
		duration: 'July 2022 - August 2022',
		location: 'Rijeka, Croatia',
		descriptions: {
			general:    'Implemented a dozen automated browser tests using the Selenium-based Katalon Studio for a retail application used by thousands of stores.',
			automation: 'Developed comprehensive browser automation test suites with Selenium and Katalon Studio, significantly improving quality assurance efficiency.',
			testing:    'Authored and maintained automated testing scripts for a large-scale retail application using Groovy, ensuring application reliability.',
		},
		included: true,
		tags: 'automation,testing,web',
	},
	{
		title:    'Face-to-Face Fundraiser',
		company:  'UNICEF',
		duration: 'June 2020 - February 2022',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Engaged with the public to raise awareness and funds for UNICEF campaigns, developing strong communication, persuasion, and interpersonal skills.',
			nontech: 'Engaged with the public to raise awareness and funds for UNICEF campaigns, developing strong communication, persuasion, and interpersonal skills.',
		},
		included: false,
		tags: 'nontech',
	},
]

// ─── Projects ────────────────────────────────────────────────────
export const projects = [
	{
		title:        'Personal Portfolio Website',
		description:  'A modern, responsive portfolio website built with React and deployed on Netlify. It features dynamic content and a clean, user-friendly design to showcase projects and skills.',
		technologies: 'React, JavaScript, HTML5, CSS3, Netlify',
		included:     true,
		tags:         'frontend,web',
	},
	{
		title:        'Web Scraping Framework',
		description:  'Developed a comprehensive Python framework for automated data extraction. This framework includes features for scheduling tasks, handling different website structures, and integrating with databases.',
		technologies: 'Python, Selenium, BeautifulSoup, PostgreSQL',
		included:     true,
		tags:         'backend,python,automation,web',
	},
	{
		title:        'PySimpleGUI Desktop Applications',
		description:  'Created various desktop GUI applications using PySimpleGUI for tasks such as data analysis and user interaction, including a tool designed for psychological assessments.',
		technologies: 'Python, PySimpleGUI, Data Analysis',
		included:     true,
		tags:         'python',
	},
]

// ─── Education ───────────────────────────────────────────────────
export const education = [
	{
		degree:      'Bachelor of Science',
		field:       'Informatics',
		institution: 'University of Rijeka',
		duration:    '',
		included:    true,
		tags:        'backend,frontend,python,web,automation,testing,nontech',
	},
	{
		degree:      'International Baccalaureate (IB) Bilingual Diploma',
		field:       null,
		institution: 'Nørre Gymnasium',
		duration:    '',
		included:    true,
		tags:        'backend,frontend,python,web,automation,testing,nontech',
	},
]

// ─── Skills ──────────────────────────────────────────────────────
export const skills = {
	'Programming': [
		{ name: 'Python',      included: true,  tags: 'backend,python,automation,web' },
		{ name: 'JavaScript',  included: true,  tags: 'frontend,web' },
		{ name: 'Groovy',      included: false, tags: 'testing,automation' },
		{ name: 'HTML/CSS',    included: true,  tags: 'frontend,web' },
		{ name: 'SQL',         included: true,  tags: 'backend,python' },
	],
	'Frameworks & Libraries': [
		{ name: 'React',          included: true,  tags: 'frontend,web' },
		{ name: 'PySimpleGUI',    included: false, tags: 'python' },
		{ name: 'Selenium',       included: true,  tags: 'automation,testing,python,web' },
		{ name: 'BeautifulSoup',  included: false, tags: 'python,web,backend' },
		{ name: 'Katalon Studio', included: false, tags: 'testing,automation' },
	],
	'Tools & Technologies': [
		{ name: 'Git & GitHub',    included: true,  tags: 'frontend,backend,python,web,automation,testing' },
		{ name: 'Web Scraping',    included: true,  tags: 'backend,python,automation,web' },
		{ name: 'REST APIs',       included: true,  tags: 'frontend,backend,python,web' },
		{ name: 'Chrome DevTools', included: true,  tags: 'frontend,testing,web' },
		{ name: 'PostgreSQL',      included: false, tags: 'backend,python' },
	],
	'Personal': [
		{ name: 'Teamwork',      included: false, tags: 'nontech' },
		{ name: 'Communication', included: false, tags: 'nontech' },
		{ name: 'Tutoring',      included: false, tags: 'nontech' },
		{ name: 'Programming',   included: false, tags: 'nontech' },
		{ name: 'Software',      included: false, tags: 'nontech' },
	],
}

// ─── Certifications ──────────────────────────────────────────────
export const certifications = [
	"DSC Europe '21 Certificate of Attendance",
	'React (Basic) Skill Assessment Completion',
]

// ─── Languages ───────────────────────────────────────────────────
export const languages = [
	{ name: 'Croatian', proficiency: 'Native', included: true, tags: 'frontend,backend,python,web,automation,testing,nontech' },
	{ name: 'English',  proficiency: 'C2',     included: true, tags: 'frontend,backend,python,web,automation,testing,nontech' },
]
