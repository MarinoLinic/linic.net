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
		all:      'Svestrani developer i komunikator s iskustvom u web razvoju, Python skriptiranju, automatizaciji, testiranju i radu s klijentima. Razvijao web scraping cjevovode, GUI aplikacije, frontend sučelja i automatizirane testne pakete. Završio preddiplomski studij informatike na Sveučilištu u Rijeci, gdje je radio kao Python tutor i laboratorijski demonstrator.',
		general:  'Developer s iskustvom u web razvoju, Python skriptiranju i web scrapingu. Završio preddiplomski studij informatike na Sveučilištu u Rijeci, gdje je radio kao Python tutor i laboratorijski demonstrator. Dokazano prilagodljiv i sposoban za brzo učenje u različitim tehničkim i netehničkim ulogama.',
		backend:  'Backend developer s iskustvom u Pythonu, web scrapingu i automatizaciji podatkovnih cjevovoda. Vješt u izradi robusnih poslužiteljskih aplikacija i upravljanju infrastrukturom. Završio preddiplomski studij informatike s naglaskom na softverskom inženjerstvu.',
		frontend: 'Developer usmjeren na frontend tehnologije, uključujući JavaScript i React. Iskustvo u izradi responzivnih i korisnički orijentiranih web aplikacija. Završio preddiplomski studij informatike na Sveučilištu u Rijeci.',
		python:   'Python developer specijaliziran za web scraping, automatizaciju i GUI aplikacije. Dokazana sposobnost arhitekture i implementacije učinkovitih, skalabilnih Python rješenja. Završio preddiplomski studij informatike gdje je radio kao Python tutor.',
		nontech:  'Komunikativna, odgovorna i snalažljiva osoba s iskustvom u direktnom radu s ljudima kroz korisničku podršku i promotivne aktivnosti. Dokazano prilagodljiv različitim radnim okruženjima i vješt u rješavanju problema. Tečno govori engleski jezik.',
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
		title:    'Poduke',
		company:  'Privatno',
		duration: 'Veljača 2025. - danas',
		location: 'Zagreb, Hrvatska',
		descriptions: {
			general:  'Podučavanje i briga o djetetu u privatnom kućanstvu u jutarnjim satima.',
			backend:  'Pružanje specijaliziranih poduka i konzultacija iz koncepata i tehnologija backend razvoja.',
			frontend: 'Podučavanje modernih frontend tehnologija, s naglaskom na JavaScript, React i najbolje prakse u web dizajnu.',
			python:   'Nudenje posvećenih poduka iz Pythona za primjene u rasponu od web scrapinga do analize podataka i razvoja GUI aplikacija.',
			web:      'Podučavanje web razvoja uključujući JavaScript, React, HTML/CSS i Python skriptiranje, s pokrivenošću frontend i backend web koncepata.',
		},
		included: true,
		tags: 'backend,frontend,python,web',
	},
	{
		title:    'Pripravnik za web scraping',
		company:  'Tryp.com',
		duration: 'Rujan 2024. - Prosinac 2024.',
		location: 'Kopenhagen, Danska',
		descriptions: {
			general:    'Razvijao i održavao skripte za web scraping za prikupljanje podataka s različitih transportnih web stranica. Odgovornosti su uključivale pronalaženje skrivenih API-ja, filtriranje podataka, zakazivanje zadataka struganja i ispravljanje grešaka.',
			backend:    'Projektirao robusne podatkovne cjevovode za izdvajanje transportnih podataka putem API-ja i izravnog scrapinga. Upravljao filtriranjem podataka i unosom u baze podataka te automatiziranim rasporedima struganja.',
			python:     'Intenzivno koristio Python s bibliotekama kao što su Selenium i BeautifulSoup za web scraping, obradu podataka i izradu skripti za automatizaciju.',
			automation: 'Izradio i održavao automatizirani sustav pomoću Seleniuma za kupnju karata i stvorio planirane cjevovode za prikupljanje podataka kako bi se osigurala svježina podataka.',
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
			general:  'Razvio Python GUI aplikaciju za psihološke evaluacije, upravljao backend infrastrukturom i doprinosio povezanoj web stranici temeljenoj na Reactu.',
			backend:  'Nadzirao operacije i infrastrukturu za softver za psihološku evaluaciju, osiguravajući stabilnost i performanse.',
			frontend: 'Razvijao i održavao komponente za klijentsku web stranicu koristeći JavaScript i React.',
			python:   'Dizajnirao i implementirao sveobuhvatnu GUI aplikaciju koristeći PySimpleGUI, uključujući složeni algoritam za procjenu unosa praćenja za psihološku analizu.',
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
			general:    'Implementirao desetak automatiziranih testova preglednika koristeći Katalon Studio temeljen na Seleniumu za maloprodajnu aplikaciju koju koriste tisuće trgovina.',
			automation: 'Razvio sveobuhvatne pakete testova za automatizaciju preglednika sa Seleniumom i Katalon Studiom, značajno poboljšavajući učinkovitost osiguranja kvalitete.',
			testing:    'Izrađivao i održavao automatizirane skripte za testiranje za veliku maloprodajnu aplikaciju koristeći Groovy, osiguravajući pouzdanost aplikacije.',
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
			general: 'Angažiran u radu s javnošću s ciljem podizanja svijesti i prikupljanja sredstava za UNICEF-ove kampanje, razvijajući snažne komunikacijske, uvjeravalačke i interpersonalne vještine.',
			nontech: 'Angažiran u radu s javnošću s ciljem podizanja svijesti i prikupljanja sredstava za UNICEF-ove kampanje, razvijajući snažne komunikacijske, uvjeravalačke i interpersonalne vještine.',
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
	{
		title:        'Okvir za web scraping',
		description:  'Razvijen sveobuhvatan Python okvir za automatizirano izdvajanje podataka. Okvir uključuje značajke za zakazivanje zadataka, rukovanje različitim strukturama web stranica i integraciju s bazama podataka.',
		technologies: 'Python, Selenium, BeautifulSoup, PostgreSQL',
		included:     true,
		tags:         'backend,python,automation,web',
	},
	{
		title:        'Desktop aplikacije u PySimpleGUI',
		description:  'Izrađene različite desktop GUI aplikacije koristeći PySimpleGUI za zadatke poput analize podataka i interakcije s korisnikom, uključujući alat dizajniran za psihološke procjene.',
		technologies: 'Python, PySimpleGUI, Data Analysis',
		included:     true,
		tags:         'python',
	},
]

// ─── Education ───────────────────────────────────────────────────
export const education = [
	{
		degree:      'Prvostupnik (Baccalaureus)',
		field:       'Informatika',
		institution: 'Sveučilište u Rijeci',
		duration:    '2023',
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
