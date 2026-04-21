export interface PageSEO {
	title: string
	description: string
	ogTitle?: string
	ogDescription?: string
	ogImage?: string
	ogType?: string
	canonical?: string
	noindex?: boolean
}

const SITE_NAME = 'Marino Linić'
const BASE_URL = 'https://linic.net'
const DEFAULT_OG_IMAGE = 'https://linic.net/ml.jpg'

export const DEFAULT_SEO: PageSEO = {
	title: SITE_NAME,
	description:
		"Official website of Marino Linić — web developer, photographer, musician, and naturalist from Zagreb, Croatia. Explore my portfolio, CV, projects, and more.",
	ogTitle: SITE_NAME,
	ogDescription:
		"Official website of Marino Linić — web developer, photographer, musician, and naturalist from Zagreb, Croatia.",
	ogImage: DEFAULT_OG_IMAGE,
	ogType: 'website',
}

export const ROUTE_SEO: Record<string, PageSEO> = {
	'/': {
		title: `${SITE_NAME} — Web Developer & Photographer`,
		description:
			"Welcome to the official website of Marino Linić. I'm a web developer, photographer, musician, and naturalist based in Zagreb, Croatia.",
		ogTitle: `${SITE_NAME} — Web Developer & Photographer`,
		ogDescription:
			"Welcome to the official website of Marino Linić. I'm a web developer, photographer, musician, and naturalist based in Zagreb, Croatia.",
		canonical: `${BASE_URL}/`,
	},
	'/about': {
		title: `About — ${SITE_NAME}`,
		description:
			"Learn more about Marino Linić — background in computer science, music, photography, and zoology. University of Rijeka graduate, Zagreb-based developer.",
		ogTitle: `About — ${SITE_NAME}`,
		canonical: `${BASE_URL}/about`,
	},
	'/socials': {
		title: `Socials — ${SITE_NAME}`,
		description:
			"Connect with Marino Linić across the web. Links to GitHub, LinkedIn, Instagram, Unsplash, iNaturalist, Medium, and more.",
		ogTitle: `Socials — ${SITE_NAME}`,
		canonical: `${BASE_URL}/socials`,
	},
	'/cv': {
		title: `CV / Résumé — ${SITE_NAME}`,
		description:
			"View Marino Linić's résumé and CV. Filter by role — developer, writer, photographer, and more. Available in English and Croatian.",
		ogTitle: `CV / Résumé — ${SITE_NAME}`,
		canonical: `${BASE_URL}/cv`,
	},
	'/portfolio': {
		title: `Portfolio — ${SITE_NAME}`,
		description:
			"Browse Marino Linić's development portfolio — web apps, tools, visualizations, and open-source projects built with React, TypeScript, and more.",
		ogTitle: `Portfolio — ${SITE_NAME}`,
		canonical: `${BASE_URL}/portfolio`,
	},
	'/income-tax/hr': {
		title: `Kalkulator Plaće — ${SITE_NAME}`,
		description:
			"Besplatni kalkulator plaće i poreza na dohodak za Hrvatsku. Izračunajte bruto u neto plaću s obzirom na olakšice i gradske stope.",
		ogTitle: `Kalkulator Plaće i Poreza — ${SITE_NAME}`,
		canonical: `${BASE_URL}/income-tax/hr`,
	},
	'/income-tax/en': {
		title: `Croatian Salary Calculator — ${SITE_NAME}`,
		description:
			"Free Croatian salary and income tax calculator. Calculate net salary from gross, including personal allowances and city tax rates.",
		ogTitle: `Croatian Salary Calculator — ${SITE_NAME}`,
		canonical: `${BASE_URL}/income-tax/en`,
	},
	'/time-visualization': {
		title: `Time Visualizer — ${SITE_NAME}`,
		description:
			"Visualize time between two dates. See decades, years, months, weeks, days, hours, minutes, and seconds in an interactive grid.",
		ogTitle: `Time Visualizer — ${SITE_NAME}`,
		canonical: `${BASE_URL}/time-visualization`,
	},
	'/time-visualization/result': {
		title: `Time Visualization — ${SITE_NAME}`,
		description:
			"Interactive time range visualization. See elapsed and remaining time in decades, years, months, weeks, days, hours, minutes, and seconds.",
		ogTitle: `Time Visualization — ${SITE_NAME}`,
		canonical: `${BASE_URL}/time-visualization/result`,
	},
	'/animals': {
		title: `Animals — ${SITE_NAME}`,
		description:
			"A living catalogue of animals I keep — freshwater and marine aquarium species with photos, taxonomy, and care notes.",
		ogTitle: `Animals — ${SITE_NAME}`,
		canonical: `${BASE_URL}/animals`,
	},
	'/coins': {
		title: `Coins — ${SITE_NAME}`,
		description:
			"A curated coin collection displayed on an interactive world map. Browse by country and currency with historical and modern states.",
		ogTitle: `Coins — ${SITE_NAME}`,
		canonical: `${BASE_URL}/coins`,
	},
	'/404': {
		title: `Page Not Found — ${SITE_NAME}`,
		description: "The requested page could not be found.",
		noindex: true,
	},
}

export function getRouteSEO(path: string): PageSEO {
	const exact = ROUTE_SEO[path]
	if (exact) return { ...DEFAULT_SEO, ...exact }

	// Fallback for /income-tax/* routes
	if (path.startsWith('/income-tax/')) {
		return { ...DEFAULT_SEO, ...ROUTE_SEO['/income-tax/en'] }
	}

	// Default fallback
	return DEFAULT_SEO
}

export const ALL_ROUTES = [
	'/',
	'/about',
	'/socials',
	'/cv',
	'/portfolio',
	'/income-tax/hr',
	'/income-tax/en',
	'/animals',
	'/coins',
]
