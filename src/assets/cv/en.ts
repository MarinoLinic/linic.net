// ─── Personal Info ───────────────────────────────────────────────
export const personalInfo = {
	name: 'Marino Linic',
	title: '',
	location: 'Zagreb, Croatia',
	profileImage: 'pic.jpg',
	contact: {
		website:  { value: 'linic.net',                        included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		phone:    { value: '+385977699443',                    included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		email:    { value: 'marinolinic@gmail.com',            included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		linkedin: { value: 'linkedin.com/in/marino-linic',     included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		github:   { value: 'github.com/MarinoLinic',           included: false, tags: 'developer,backend,frontend,python,web,automation,testing' },
	},
	summaries: {
		all:      'Developer with experience in web development, Python, automation, and testing. Built scraping pipelines, GUI apps, frontend interfaces, and automated browser tests. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator. Comfortable working in both technical and non-technical roles. I also have experience giving lectures.',
		developer:   'Developer with experience in web development, Python scripting, and web scraping. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator. Comfortable working in both technical and non-technical roles. I also have experience giving lectures.',
		general:  'Developer with experience in web development, Python scripting, and web scraping. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator. Comfortable working in both technical and non-technical roles. I also have experience giving lectures.',
		backend:  'Developer with experience in Python, web scraping, and data pipelines. Built server-side scripts, worked with databases, and handled backend infrastructure. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator.',
		frontend: 'Developer focused on frontend technologies, primarily JavaScript and React. Built responsive web interfaces and worked on real projects. Studied Informatics at the University of Rijeka, where I tutored Python and worked as a lab demonstrator.',
		nontech:  'Experienced in customer-facing roles including fundraising, greeting clients, and support. Comfortable working with people, handling different situations calmly, and adapting quickly to new environments. Fluent in English. I can work in both technical and non-technical roles. I also have experience giving lectures.',
	},
}

// ─── Sections ────────────────────────────────────────────────────
export const sections = [
	{ id: 'summary',        title: 'Summary' },
	{ id: 'experience',     title: 'Experience' },
	{ id: 'education',      title: 'Education' },
	{ id: 'lectures',       title: 'Lectures' },
	{ id: 'projects',       title: 'Projects' },
	{ id: 'skills',         title: 'Skills' },
	{ id: 'certifications', title: 'Certifications' },
	{ id: 'languages',      title: 'Languages' },
]

// ─── Experience ──────────────────────────────────────────────────
export const experience = [
	{
		title:    "Escape Room 'Scare Actor' & 'Gamemaster'",
		company:  'Quest Room Zagreb',
		duration: 'November 2025 - Present',
		location: 'Zagreb, Croatia',
		descriptions: {
			general: 'Scare actor and gamemaster for a horror-themed escape room, running games for children and adults across 10 different scenarios. Also handled some administrative tasks. I had a busy working schedule and acquired a good work ethic.',
		},
		included: false,
		tags: 'nontech,frontend,backend',
	},
	{
		title:    'Career Break',
		company:  '',
		duration: 'February 2025 - Present',
		location: 'Zagreb, Croatia',
		descriptions: {
			general:  'Looking after a child in a private household during morning hours. Took a career break for personal (family) reasons.',
			developer:   'Had to take a career break (family responsibilities) while continuing independent development work. You can see my many projects on https://linic.net/portfolio. Currently working part-time in a horror-themed escape room where I am a scare actor and gamemaster. I also handle customers and administration, and acquired a good work ethic due to the busy schedule.',
		},
		included: true,
		tags: 'developer,backend,frontend,python,web,nontech',
	},
	{
		title:    'Web Scraper Intern',
		company:  'Tryp.com',
		duration: 'September 2024 - December 2024',
		location: 'Copenhagen, Denmark',
		descriptions: {
			general:    'Wrote and maintained scraping scripts to automate and collect transport data from various websites. Work included reverse-engineering hidden APIs, filtering data, scheduling tasks, and fixing bugs.',
		},
		included: true,
		tags: 'developer,backend,python,automation,web,frontend',
	},
	{
		title:    'Python Developer',
		company:  'TruePlay',
		duration: 'March 2024 - December 2024',
		location: 'Copenhagen, Denmark',
		descriptions: {
			general:  'Built a Python GUI application for psychological assessments, helped manage backend infrastructure, and contributed to a React-based website.',
		},
		included: true,
		tags: 'developer,backend,frontend,python,web',
	},
	{
		title:    'Housekeeper',
		company:  'Private',
		duration: 'June 2023 - August 2023',
		location: 'Kutná Hora, Czechia',
		descriptions: {
			general: 'Live-in housekeeper for a private household in Czechia over the summer.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Extra Actor',
		company:  '',
		duration: 'May 2023',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Acted as an extra for a British TV series shooting in Croatia.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Testing Automation Intern',
		company:  'Own.Solutions',
		duration: 'July 2022 - August 2022',
		location: 'Rijeka, Croatia',
		descriptions: {
			general:    'Wrote around a dozen automated browser tests using Katalon Studio (Selenium) for a retail application used by thousands of stores.',
		},
		included: true,
		tags: 'developer,automation,testing,web,frontend,backend',
	},
	{
		title:    'Customer Service Representative',
		company:  'Hrvatski Telekom',
		duration: 'June 2021 - September 2021',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Worked as a call centre agent for bonbon, a Croatian mobile virtual network operator.',
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
			general: 'Worked face-to-face with the public to raise funds and awareness for UNICEF campaigns. Talked directly with people and acquired sales skills.',
		},
		included: false,
		tags: 'developer,nontech',
	},
	{
		title:    'Retail Salesworker',
		company:  'Lidl Hrvatska',
		duration: 'February 2021 - May 2021',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Worked part-time as a retail salesworker at Lidl.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Camera Operator',
		company:  'Hope Channel Croatia',
		duration: 'January 2021 - February 2021',
		location: 'Rijeka, Croatia',
		descriptions: {
			general: 'Member of the recording crew for a short TV series.',
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
		tags:         'developer,frontend,web',
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
		tags:        'developer,backend,frontend,python,web,automation,testing,nontech',
	},
	{
		degree:      'International Baccalaureate (IB) Bilingual Diploma',
		field:       null,
		institution: 'Nørre Gymnasium',
		duration:    '',
		included:    true,
		tags:        'developer,backend,frontend,python,web,automation,testing,nontech',
	},
]

// ─── Skills ──────────────────────────────────────────────────────
export const skills = {
	'Programming': [
		{ name: 'Python',     				 			included: true,  tags: 'developer,backend,python,automation,web' },
		{ name: 'JavaScript', 				 			included: true,  tags: 'developer,frontend,web' },
		{ name: 'Groovy',     				 			included: false, tags: 'testing,automation' },
		{ name: 'HTML/CSS',   				 			included: true,  tags: 'developer,frontend,web' },
		{ name: 'SQL',        				 			included: true,  tags: 'developer,backend,python' },
	],
	'Frameworks & Libraries': [
		{ name: 'React',          					included: true,  tags: 'developer,frontend,web' },
		{ name: 'PySimpleGUI',   				 		included: false, tags: 'developer,python' },
		{ name: 'Selenium',      				 		included: true,  tags: 'developer,automation,testing,python,web' },
		{ name: 'BeautifulSoup', 				 		included: false, tags: 'developer,python,web,backend' },
		{ name: 'Katalon Studio', 			 		included: false, tags: 'developer,testing,automation' },
	],
	'Tools & Technologies': [
		{ name: 'Git & GitHub',   				 	included: true,  tags: 'developer,frontend,backend,python,web,automation,testing' },
		{ name: 'Web Scraping',   				 	included: true,  tags: 'developer,backend,python,automation,web' },
		{ name: 'REST APIs',      				 	included: true,  tags: 'developer,frontend,backend,python,web' },
		{ name: 'Chrome DevTools', 			 	 	included: true,  tags: 'developer,frontend,testing,web' },
		{ name: 'PostgreSQL',     				 	included: false, tags: 'developer,backend,python' },
	],
	'Personal': [
		{ name: 'Customer satisfaction',    included: false, tags: 'developer,nontech' },
		{ name: 'Sales', 										included: false, tags: 'developer,nontech' },
		{ name: 'Tutoring',      						included: false, tags: 'developer,nontech' },
		{ name: 'Lecturing',      					included: false, tags: 'developer,nontech' },
		{ name: 'Programming',   						included: false, tags: 'nontech' },
		{ name: 'Software',      						included: false, tags: 'nontech' },
	],
}

// ─── Certifications ──────────────────────────────────────────────
export const certifications = [
	{ name: "DSC Europe '21 Certificate of Attendance",  included: true, tags: 'developer,backend,frontend,python,web,automation,testing' },
	{ name: 'React (Basic) Skill Assessment Completion', included: true, tags: 'developer,frontend,web' },
]

// ─── Lectures ────────────────────────────────────────────────────
export const lectures = [
	{
		title:    'Introduction to Artificial Intelligence',
		venue:    'Nikola Tesla Technical Museum',
		date:     'December 2025',
		location: 'Zagreb, Croatia',
		description: 'Public lecture covering AI fundamentals.',
		url:      'https://www.youtube.com/watch?v=W59GgEU1lgw',
		included: true,
		tags:     'developer,frontend,backend,python,web,automation,testing,nontech',
	},
	{
		title:    'Key Inventions That Shaped the World',
		venue:    'Nikola Tesla Technical Museum',
		date:     'April 2025',
		location: 'Zagreb, Croatia',
		description: 'Historical lecture tracing technological progress from stone tools to artificial intelligence.',
		url:      'https://www.youtube.com/watch?v=ABaCz3CZvSw',
		included: true,
		tags:     'developer,nontech',
	},
]

// ─── Languages ───────────────────────────────────────────────────
export const languages = [
	{ name: 'Croatian', proficiency: 'Native', included: true, tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
	{ name: 'English',  proficiency: 'C2',     included: true, tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
]
