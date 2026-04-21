// ─── Personal Info ───────────────────────────────────────────────
export const personalInfo = {
	name: 'Marino Linić',
	title: '',
	location: 'Zagreb, Hrvatska',
	profileImage: 'pic.jpg',
	contact: {
		website:  { value: 'linic.net',                        included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		phone:    { value: '+385977699443',                    included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		email:    { value: 'marinolinic@gmail.com',            included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		linkedin: { value: 'linkedin.com/in/marino-linic',     included: true,  tags: 'frontend,backend,python,web,automation,testing,nontech' },
		github:   { value: 'github.com/MarinoLinic',           included: false, tags: 'backend,frontend,python,web,automation,testing' },
	},
	summaries: {
		all:      'Developer s iskustvom u web razvoju, Pythonu, automatizaciji i testiranju. Razvijao scraping pajplajnove, GUI aplikacije, frontend sučelja i automatizirane testove. Studirao informatiku na Sveučilištu u Rijeci, gdje sam radio kao Python tutor i laboratorijski demonstrator.',
		general:  'Developer s iskustvom u web razvoju, Python skriptiranju i web scrapingu. Studirao informatiku na Sveučilištu u Rijeci, gdje sam radio kao Python tutor i laboratorijski demonstrator. Dobro se snalazim u tehničkim i netehničkim ulogama.',
		backend:  'Developer s iskustvom u Pythonu, web scrapingu i data pajplajnovima. Pisao server-side skripte, radio s bazama podataka i upravljao backend infrastrukturom. Studirao informatiku na Sveučilištu u Rijeci s naglaskom na softversko inženjerstvo.',
		frontend: 'Developer usmjeren na frontend tehnologije, primarno JavaScript i React. Gradio responzivna web sučelja i radio na stvarnim klijentskim projektima. Studirao informatiku na Sveučilištu u Rijeci.',
		python:   'Python developer s naglaskom na web scraping, automatizaciju i desktop aplikacije. Studirao informatiku na Sveučilištu u Rijeci, gdje sam dvije godine radio kao Python tutor.',
		nontech:  'Iskustvo u radu s klijentima kroz fundraising i korisničku podršku. Ugodan u radu s ljudima, miran u raznim situacijama i brz u prilagodbi novim okruženjima. Tečno govorim engleski.',
	},
}

// ─── Sections ────────────────────────────────────────────────────
export const sections = [
	{ id: 'summary',        title: 'Sažetak' },
	{ id: 'experience',     title: 'Radno iskustvo' },
	{ id: 'projects',       title: 'Projekti' },
	{ id: 'education',      title: 'Obrazovanje' },
	{ id: 'skills',         title: 'Vještine' },
	{ id: 'certifications', title: 'Certifikati' },
	{ id: 'languages',      title: 'Jezici' },
]

// ─── Experience ──────────────────────────────────────────────────
export const experience = [
	{
		title:    'Pauza u karijeri',
		company:  '',
		duration: 'Veljača 2025. - danas',
		location: 'Zagreb, Hrvatska',
		descriptions: {
			general:  'Briga o djetetu u jutarnjim satima. Uzeo sam pauzu u karijeri zbog privatnih (obiteljskih) razloga. Navečer sam radio kao glumac strave, gamemaster i administrator u sobi bijega. Imao sam ispunjen raspored i stekao dobru radnu etiku.',
		},
		included: true,
		tags: 'backend,frontend,python,web,nontech',
	},
	{
		title:    'Pripravnik za web scraping',
		company:  'Tryp.com',
		duration: 'Rujan 2024. - Prosinac 2024.',
		location: 'Kopenhagen, Danska',
		descriptions: {
			general:    'Pisao i održavao scraping skripte za prikupljanje transportnih podataka s raznih web stranica. Posao je uključivao pronalaženje skrivenih API-ja, filtriranje podataka, zakazivanje zadataka i ispravljanje grešaka.',
			backend:    'Gradio podatkovne pajplajnove za izdvajanje transportnih podataka putem API-ja i direktnog scrapinga. Upravljao filtriranjem podataka, unosom u baze i automatiziranim rasporedom.',
			python:     'Koristio Python sa Seleniumom i BeautifulSoupom za web scraping, obradu podataka i automatizaciju.',
			automation: 'Izgradio automatizirani sustav za kupnju karata pomoću Seleniuma i postavio planirane pajplajnove za redovito prikupljanje podataka.',
		},
		included: true,
		tags: 'backend,python,automation,web',
	},
	{
		title:    'Python Developer',
		company:  'TruePlay',
		duration: 'Ožujak 2024. - Prosinac 2024.',
		location: 'Kopenhagen, Danska',
		descriptions: {
			general:  'Razvio Python GUI aplikaciju za psihološke procjene, pomagao u upravljanju backend infrastrukturom i radio na web stranici temeljenoj na Reactu.',
			backend:  'Upravljao infrastrukturom za platformu za psihološke evaluacije i brinuo o njenoj stabilnosti i dostupnosti.',
			frontend: 'Gradio i održavao komponente za klijentsku web stranicu u JavaScriptu i Reactu.',
			python:   'Izgradio GUI aplikaciju u PySimpleGUI-u s prilagođenim algoritmom za procjenu praćenja za psihološke svrhe.',
		},
		included: true,
		tags: 'backend,frontend,python,web',
	},
	{
		title:    'Pripravnik za automatizaciju testiranja',
		company:  'Own.Solutions',
		duration: 'Srpanj 2022. - Kolovoz 2022.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general:    'Napisao desetak automatiziranih testova preglednika koristeći Katalon Studio (temeljen na Seleniumu) za maloprodajnu aplikaciju koju koriste tisuće trgovina.',
			automation: 'Pisao testove za automatizaciju preglednika sa Seleniumom i Katalon Studiom, poboljšavajući QA pokrivenost za veliku maloprodajnu aplikaciju.',
			testing:    'Pisao i održavao automatizirane testne skripte u Groovyju za veliku maloprodajnu aplikaciju.',
		},
		included: true,
		tags: 'automation,testing,web',
	},
	{
		title:    'Agent u korisničkoj podršci',
		company:  'Hrvatski Telekom',
		duration: 'Lipanj 2021. - Rujan 2021.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general: 'Pružao korisničku podršku kao agent u pozivnom centru za bonbon.',
			nontech: 'Pružao sam korisničku podršku kao agent u pozivnom centru za bonbon.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'F2F terenski predstavnik i fundraiser',
		company:  'UNICEF',
		duration: 'Lipanj 2020. - Veljača 2022.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general: 'Radio s javnošću na prikupljanju sredstava i podizanju svijesti za UNICEF-ove kampanje.',
			nontech: 'Radio s javnošću na prikupljanju sredstava i podizanju svijesti za UNICEF-ove kampanje.',
		},
		included: false,
		tags: 'nontech',
	},
]

// ─── Projects ────────────────────────────────────────────────────
export const projects = [
	{
		title:        'Osobna portfolio web stranica',
		description:  'Moderna, responzivna portfolio web stranica izrađena u Reactu i postavljena na Netlify. Sadrži dinamički sadržaj i čist, korisnički orijentiran dizajn za prikaz projekata i vještina.',
		technologies: 'React, JavaScript, HTML5, CSS3, Netlify',
		included:     true,
		tags:         'frontend,web',
	},
]

// ─── Education ───────────────────────────────────────────────────
export const education = [
	{
		degree:      'Prvostupnik (Baccalaureus)',
		field:       'Informatika',
		institution: 'Sveučilište u Rijeci',
		duration:    '',
		included:    true,
		tags:        'backend,frontend,python,web,automation,testing,nontech',
	},
	{
		degree:      'International Baccalaureate (IB) dvojezična diploma',
		field:       null,
		institution: 'Nørre Gymnasium',
		duration:    '',
		included:    true,
		tags:        'backend,frontend,python,web,automation,testing,nontech',
	},
]

// ─── Skills ──────────────────────────────────────────────────────
export const skills = {
	'Programski jezici': [
		{ name: 'Python',      included: true,  tags: 'backend,python,automation,web' },
		{ name: 'JavaScript',  included: true,  tags: 'frontend,web' },
		{ name: 'Groovy',      included: false, tags: 'testing,automation' },
		{ name: 'HTML/CSS',    included: true,  tags: 'frontend,web' },
		{ name: 'SQL',         included: true,  tags: 'backend,python' },
	],
	'Okviri i biblioteke': [
		{ name: 'React',          included: true,  tags: 'frontend,web' },
		{ name: 'PySimpleGUI',    included: false, tags: 'python' },
		{ name: 'Selenium',       included: true,  tags: 'automation,testing,python,web' },
		{ name: 'BeautifulSoup',  included: false, tags: 'python,web,backend' },
		{ name: 'Katalon Studio', included: false, tags: 'testing,automation' },
	],
	'Alati i tehnologije': [
		{ name: 'Git & GitHub',    included: true,  tags: 'frontend,backend,python,web,automation,testing' },
		{ name: 'Web Scraping',    included: true,  tags: 'backend,python,automation,web' },
		{ name: 'REST API',        included: true,  tags: 'frontend,backend,python,web' },
		{ name: 'Chrome DevTools', included: true,  tags: 'frontend,testing,web' },
		{ name: 'PostgreSQL',      included: false, tags: 'backend,python' },
	],
	'Osobne vještine': [
		{ name: 'Timski rad',    included: false, tags: 'nontech' },
		{ name: 'Komunikacija', included: false, tags: 'nontech' },
		{ name: 'Podučavanje',  included: false, tags: 'nontech' },
		{ name: 'Programiranje', included: false, tags: 'nontech' },
		{ name: 'Softver',      included: false, tags: 'nontech' },
	],
}

// ─── Certifications ──────────────────────────────────────────────
export const certifications = [
	{ name: 'Certifikat o sudjelovanju - DSC Europe \'21',          included: true, tags: 'backend,frontend,python,web,automation,testing' },
	{ name: 'Potvrda o završenoj procjeni vještina - React (osnovno)', included: true, tags: 'frontend,web' },
]

// ─── Languages ───────────────────────────────────────────────────
export const languages = [
	{ name: 'Hrvatski', proficiency: 'Izvorni govornik', included: true, tags: 'frontend,backend,python,web,automation,testing,nontech' },
	{ name: 'Engleski', proficiency: 'C2',               included: true, tags: 'frontend,backend,python,web,automation,testing,nontech' },
]
