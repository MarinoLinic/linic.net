// ─── Personal Info ───────────────────────────────────────────────
export const personalInfo = {
	name: 'Marino Linić',
	title: '',
	location: 'Zagreb, Hrvatska',
	profileImage: 'pic.jpg',
	contact: {
		website:  { value: 'linic.net',                        included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		phone:    { value: '+385977699443',                    included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		email:    { value: 'marinolinic@gmail.com',            included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		linkedin: { value: 'linkedin.com/in/marino-linic',     included: true,  tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
		github:   { value: 'github.com/MarinoLinic',           included: false, tags: 'developer,backend,frontend,python,web,automation,testing' },
	},
	summaries: {
		all:      'Developer s iskustvom u web razvoju, Pythonu, automatizaciji i testiranju. Razvijao sam scraping pajplajnove, GUI aplikacije, frontend sučelja i automatizirane testove. Studirao sam informatiku na Sveučilištu u Rijeci, gdje sam bio demonstrator za kolegij u Pythonu. Dobro se snalazim u tehničkim i netehničkim ulogama, a imam iskustva i s predavanjima.',
		developer:   'Developer s iskustvom u web razvoju, Python skriptiranju i web scrapingu. Studirao sam informatiku na Sveučilištu u Rijeci, gdje sam radio kao Python tutor i laboratorijski demonstrator. Dobro se snalazim u tehničkim i netehničkim ulogama. Imam iskustva i s predavanjima.',
		general:  'Developer s iskustvom u web razvoju, Python skriptiranju i web scrapingu. Studirao sam informatiku na Sveučilištu u Rijeci, gdje sam radio kao Python tutor i laboratorijski demonstrator. Dobro se snalazim u tehničkim i netehničkim ulogama. Imao sam iskustva i s predavanjima.',
		backend:  'Developer s iskustvom u Pythonu, web scrapingu i data pajplajnovima. Pisao sam server-side skripte, radio sam s bazama podataka i upravljao backend infrastrukturom. Studirao sam informatiku na Sveučilištu u Rijeci, gdje sam bio demonstrator za kolegij u Pythonu.',
		frontend: 'Developer usmjeren na frontend tehnologije, primarno JavaScript i React. Gradio sam web aplikacije i radio na stvarnim projektima. Studirao sam informatiku na Sveučilištu u Rijeci, gdje sam bio demonstrator za kolegij u Pythonu.',
		nontech:  'Imam iskustvo u radu s klijentima kroz fundraising, korisničku podršku, rad na recepciji i administraciju. Ugodan sam u radu s ljudima, miran u raznim situacijama i brz u prilagodbi novim okruženjima. Tečno govorim engleski. Dobro se snalazim i u tehničkim ulogama, a imam iskustva i s predavanjima.',
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
		title:    'Glumac i gamemaster u horror escape roomu',
		company:  'Quest Room Zagreb',
		duration: 'Studeni 2025. - danas',
		location: 'Zagreb, Hrvatska',
		descriptions: {
			general: 'Vodio sam i glumio u igrama za djecu i odrasle kroz 10 različitih scenarija. Uz to sam obavljao administrativne poslove. Imao sam ispunjen raspored i stekao dobru radnu etiku.',
		},
		included: false,
		tags: 'developer,nontech,frontend,backend',
	},
	{
		title:    'Pauza u karijeri',
		company:  '',
		duration: 'Veljača 2025. - danas',
		location: 'Zagreb, Hrvatska',
		descriptions: {
			general:  'Briga o djetetu u jutarnjim satima. Uzeo sam pauzu u karijeri zbog osobnih (obiteljskih) razloga.',
			developer:   'Morao sam uzeti pauzu u karijeri (obiteljske obaveze) uz nastavak samostalnog razvoja. Možete pogledati moje projekte na https://linic.net/portfolio. Trenutno radim part-time u horror escape roomu gdje sam glumac i gamemaster. Bavim se i korisničkom podrškom i administracijom te sam stekao dobru radnu etiku zbog ispunjenog rasporeda.',
		},
		included: true,
		tags: 'developer,backend,frontend,python,web,nontech',
	},
	{
		title:    'Pripravnik za web scraping',
		company:  'Tryp.com',
		duration: 'Rujan 2024. - Prosinac 2024.',
		location: 'Kopenhagen, Danska',
		descriptions: {
			general:    'Pisao sam i održavao scraping skripte za automatizirano prikupljanje transportnih podataka s raznih web stranica. Posao je uključivao pronalaženje skrivenih API-ja, filtriranje podataka, zakazivanje zadataka i ispravljanje bugova.',
		},
		included: true,
		tags: 'developer,backend,python,automation,web,frontend',
	},
	{
		title:    'Python Developer',
		company:  'TruePlay',
		duration: 'Ožujak 2024. - Prosinac 2024.',
		location: 'Kopenhagen, Danska',
		descriptions: {
			general:  'Razvio sam Python GUI aplikaciju za psihološku evaluaciju, pomagao sam u upravljanju backend infrastrukturom i radio sam na web stranici temeljenoj na Reactu.',
		},
		included: true,
		tags: 'developer,backend,frontend,python,web',
	},
	{
		title:    'Kućni pomoćnik',
		company:  'Privatno',
		duration: 'Lipanj 2023. - Kolovoz 2023.',
		location: 'Kutná Hora, Češka',
		descriptions: {
			general: 'Živio sam i radio kao kućni pomoćnik u privatnom domaćinstvu u Češkoj tijekom ljeta.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Statist',
		company:  '',
		duration: 'Svibanj 2023.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general: 'Radio sam kao statist na snimanju britanske TV serije u Rijeci.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Pripravnik za automatizaciju testiranja',
		company:  'Own.Solutions',
		duration: 'Srpanj 2022. - Kolovoz 2022.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general:    'Napisao sam desetak automatiziranih testova koristeći Katalon Studio (Selenium) za aplikaciju koju koriste tisuće trgovina.',
		},
		included: true,
		tags: 'developer,automation,testing,web,frontend,backend',
	},
	{
		title:    'Agent u korisničkoj podršci',
		company:  'Hrvatski Telekom',
		duration: 'Lipanj 2021. - Rujan 2021.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general: 'Radio sam kao agent u pozivnom centru za bonbon.',
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
			general: 'Radio sam s javnošću na prikupljanju sredstava i podizanju svijesti o UNICEF-ovim kampanjama. Pričao sam direktno s ljudima i dobio prodajne vještine.',
		},
		included: false,
		tags: 'developer,nontech',
	},
	{
		title:    'Prodavač',
		company:  'Lidl Hrvatska',
		duration: 'Veljača 2021. - Svibanj 2021.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general: 'Radio part-time kao prodavač u Lidlu.',
		},
		included: false,
		tags: 'nontech',
	},
	{
		title:    'Snimatelj',
		company:  'Hope Channel Croatia',
		duration: 'Siječanj 2021. - Veljača 2021.',
		location: 'Rijeka, Hrvatska',
		descriptions: {
			general: 'Član snimateljske ekipe za kratku TV seriju u Hope Channel Croatia.',
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
		tags:         'developer,frontend,web',
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
		tags:        'developer,backend,frontend,python,web,automation,testing,nontech',
	},
	{
		degree:      'International Baccalaureate (IB) dvojezična diploma',
		field:       null,
		institution: 'Nørre Gymnasium',
		duration:    '',
		included:    true,
		tags:        'developer,backend,frontend,python,web,automation,testing,nontech',
	},
]

// ─── Skills ──────────────────────────────────────────────────────
export const skills = {
	'Programski jezici': [
		{ name: 'Python',      included: true,  tags: 'developer,backend,python,automation,web' },
		{ name: 'JavaScript',  included: true,  tags: 'developer,frontend,web' },
		{ name: 'Groovy',      included: false, tags: 'testing,automation' },
		{ name: 'HTML/CSS',    included: true,  tags: 'developer,frontend,web' },
		{ name: 'SQL',         included: true,  tags: 'developer,backend,python' },
	],
	'Okviri i biblioteke': [
		{ name: 'React',          included: true,  tags: 'developer,frontend,web' },
		{ name: 'PySimpleGUI',    included: false, tags: 'developer,python' },
		{ name: 'Selenium',       included: true,  tags: 'developer,automation,testing,python,web' },
		{ name: 'BeautifulSoup',  included: false, tags: 'developer,python,web,backend' },
		{ name: 'Katalon Studio', included: false, tags: 'developer,testing,automation' },
	],
	'Alati i tehnologije': [
		{ name: 'Git & GitHub',    included: true,  tags: 'developer,frontend,backend,python,web,automation,testing' },
		{ name: 'Web Scraping',    included: true,  tags: 'developer,backend,python,automation,web' },
		{ name: 'REST API',        included: true,  tags: 'developer,frontend,backend,python,web' },
		{ name: 'Chrome DevTools', included: true,  tags: 'developer,frontend,testing,web' },
		{ name: 'PostgreSQL',      included: false, tags: 'developer,backend,python' },
	],
	'Osobne vještine': [
		{ name: 'Zadovoljstvo korisnika', included: false, tags: 'developer,nontech' },
		{ name: 'Prodaja',               included: false, tags: 'developer,nontech' },
		{ name: 'Podučavanje',           included: false, tags: 'developer,nontech' },
		{ name: 'Predavanja',            included: false, tags: 'developer,nontech' },
		{ name: 'Programiranje',         included: false, tags: 'nontech' },
		{ name: 'Softver',               included: false, tags: 'nontech' },
	],
}

// ─── Certifications ──────────────────────────────────────────────
export const certifications = [
	{ name: 'Certifikat o sudjelovanju - DSC Europe \'21',          included: true, tags: 'developer,backend,frontend,python,web,automation,testing' },
	{ name: 'Potvrda o završenoj procjeni vještina - React (osnovno)', included: true, tags: 'developer,frontend,web' },
]

// ─── Languages ───────────────────────────────────────────────────
export const languages = [
	{ name: 'Hrvatski', proficiency: 'Izvorni govornik', included: true, tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
	{ name: 'Engleski', proficiency: 'C2',               included: true, tags: 'developer,frontend,backend,python,web,automation,testing,nontech' },
]
