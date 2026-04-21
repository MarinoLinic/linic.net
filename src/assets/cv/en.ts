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
		all:      'Developer with experience in web development, Python, automation, and testing. Built scraping pipelines, GUI apps, frontend interfaces, and automated browser tests. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator.',
		general:  'Developer with experience in web development, Python scripting, and web scraping. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator. Comfortable working in both technical and non-technical roles.',
		backend:  'Developer with experience in Python, web scraping, and data pipelines. Built server-side scripts, worked with databases, and handled backend infrastructure. Studied Informatics at the University of Rijeka with a focus on software engineering.',
		frontend: 'Developer focused on frontend technologies, primarily JavaScript and React. Built responsive web interfaces and worked on real client-facing projects. Studied Informatics at the University of Rijeka.',
		python:   'Python developer with a focus on web scraping, automation, and desktop applications. Studied Informatics at the University of Rijeka, where I tutored Python for two years.',
		nontech:  'Experienced in customer-facing roles including fundraising and support. Comfortable working with people, handling different situations calmly, and adapting quickly to new environments. Fluent in English.',
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
		title:    'Career Break',
		company:  '',
		duration: 'February 2025 - Present',
		location: 'Zagreb, Croatia',
		descriptions: {
			general:  'Teaching and looking after child during morning hours. I needed to take a career break for private (family) reasons. In the evenings, I was a scare actor, gamemaster, and administrator in an escape room. I had a busy working schedule and acquired a good work ethic.',
		},
		included: true,
		tags: 'backend,frontend,python,web,nontech',
	},
	{
		title:    'Web Scraper Intern',
		company:  'Tryp.com',
		duration: 'September 2024 - December 2024',
		location: 'Copenhagen, Denmark',
		descriptions: {
			general:    'Wrote and maintained scraping scripts to collect transport data from various websites. Work included reverse-engineering hidden APIs, filtering data, scheduling tasks, and fixing bugs.',
			backend:    'Built data pipelines to extract transport data via APIs and direct scraping. Handled data filtering, database insertion, and automated scheduling.',
			python:     'Used Python with Selenium and BeautifulSoup for web scraping, data processing, and automation.',
			automation: 'Built an automated ticket purchasing system with Selenium and set up scheduled pipelines for regular data collection.',
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
			general:  'Built a Python GUI application for psychological assessments, helped manage backend infrastructure, and contributed to a React-based website.',
			backend:  'Managed the infrastructure for a psychological evaluation platform, keeping it stable and running smoothly.',
			frontend: 'Built and maintained components for a client-facing website in JavaScript and React.',
			python:   'Built a GUI application in PySimpleGUI with a custom algorithm for tracking-based psychological assessment.',
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
			general:    'Wrote around a dozen automated browser tests using Katalon Studio (Selenium-based) for a retail application used by thousands of stores.',
			automation: 'Wrote browser automation tests with Selenium and Katalon Studio, improving QA coverage for a large retail application.',
			testing:    'Wrote and maintained automated test scripts in Groovy for a large retail application.',
		},
		included: true,
		tags: 'automation,testing,web',
	},
	{
		title:    'Customer Support Agent',
		company:  'Hrvatski Telekom',
		duration: 'June 2021 - September 2021',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Provided customer support as a call centre agent for bonbon.',
			nontech: 'Provided customer support as a call centre agent for bonbon.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Face-to-Face Fundraiser',
		company:  'UNICEF',
		duration: 'June 2020 - February 2022',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Worked face-to-face with the public to raise funds and awareness for UNICEF campaigns.',
			nontech: 'Worked face-to-face with the public to raise funds and awareness for UNICEF campaigns.',
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
	{ name: "DSC Europe '21 Certificate of Attendance",  included: true, tags: 'backend,frontend,python,web,automation,testing' },
	{ name: 'React (Basic) Skill Assessment Completion', included: true, tags: 'frontend,web' },
]

// ─── Languages ───────────────────────────────────────────────────
export const languages = [
	{ name: 'Croatian', proficiency: 'Native', included: true, tags: 'frontend,backend,python,web,automation,testing,nontech' },
	{ name: 'English',  proficiency: 'C2',     included: true, tags: 'frontend,backend,python,web,automation,testing,nontech' },
]
