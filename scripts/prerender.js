/**
 * Build-time prerender script for SEO.
 *
 * After `vite build` completes, this script copies `dist/index.html` to each
 * route path (e.g. `dist/about/index.html`) and injects the correct <title>,
 * <meta name="description">, Open Graph, Twitter, and canonical tags for that
 * route. Netlify (and most static hosts) will serve the matching file before
 * falling back to the SPA redirect, giving crawlers static HTML with proper
 * meta tags.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const INDEX_HTML = join(DIST, 'index.html')

const DEFAULT_OG_IMAGE = 'https://linic.net/ml.jpg'

const ROUTE_SEO = {
	'/': {
		title: 'Marino Linić — Web Developer & Photographer',
		description: "Welcome to the official website of Marino Linić. I'm a web developer, photographer, musician, and naturalist based in Zagreb, Croatia.",
		ogTitle: 'Marino Linić — Web Developer & Photographer',
		ogDescription: "Welcome to the official website of Marino Linić. I'm a web developer, photographer, musician, and naturalist based in Zagreb, Croatia.",
		canonical: 'https://linic.net/',
	},
	'/about': {
		title: 'About — Marino Linić',
		description: "Learn more about Marino Linić — background in computer science, music, photography, and zoology. University of Rijeka graduate, Zagreb-based developer.",
		ogTitle: 'About — Marino Linić',
		canonical: 'https://linic.net/about',
	},
	'/socials': {
		title: 'Socials — Marino Linić',
		description: "Connect with Marino Linić across the web. Links to GitHub, LinkedIn, Instagram, Unsplash, iNaturalist, Medium, and more.",
		ogTitle: 'Socials — Marino Linić',
		canonical: 'https://linic.net/socials',
	},
	'/cv': {
		title: 'CV / Résumé — Marino Linić',
		description: "View Marino Linić's résumé and CV. Filter by role — developer, writer, photographer, and more. Available in English and Croatian.",
		ogTitle: 'CV / Résumé — Marino Linić',
		canonical: 'https://linic.net/cv',
	},
	'/portfolio': {
		title: 'Portfolio — Marino Linić',
		description: "Browse Marino Linić's development portfolio — web apps, tools, visualizations, and open-source projects built with React, TypeScript, and more.",
		ogTitle: 'Portfolio — Marino Linić',
		canonical: 'https://linic.net/portfolio',
	},
	'/income-tax/hr': {
		title: 'Kalkulator Plaće — Marino Linić',
		description: "Besplatni kalkulator plaće i poreza na dohodak za Hrvatsku. Izračunajte bruto u neto plaću s obzirom na olakšice i gradske stope.",
		ogTitle: 'Kalkulator Plaće i Poreza — Marino Linić',
		canonical: 'https://linic.net/income-tax/hr',
	},
	'/income-tax/en': {
		title: 'Croatian Salary Calculator — Marino Linić',
		description: "Free Croatian salary and income tax calculator. Calculate net salary from gross, including personal allowances and city tax rates.",
		ogTitle: 'Croatian Salary Calculator — Marino Linić',
		canonical: 'https://linic.net/income-tax/en',
	},
	'/animals': {
		title: 'Animals — Marino Linić',
		description: "A living catalogue of animals I keep — freshwater and marine aquarium species with photos, taxonomy, and care notes.",
		ogTitle: 'Animals — Marino Linić',
		canonical: 'https://linic.net/animals',
	},
	'/coins': {
		title: 'Coins — Marino Linić',
		description: "A curated coin collection displayed on an interactive world map. Browse by country and currency with historical and modern states.",
		ogTitle: 'Coins — Marino Linić',
		canonical: 'https://linic.net/coins',
	},
	'/404': {
		title: 'Page Not Found — Marino Linić',
		description: "The requested page could not be found.",
		noindex: true,
	},
}

const ALL_ROUTES = [
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

function getRouteSEO(path) {
	const exact = ROUTE_SEO[path]
	if (exact) return exact
	if (path.startsWith('/income-tax/')) return ROUTE_SEO['/income-tax/en']
	return {
		title: 'Marino Linić',
		description: "Marino Linic's official information hub and portfolio.",
	}
}

function injectMetaTags(html, route) {
	const seo = getRouteSEO(route)
	const title = seo.title
	const description = seo.description
	const ogTitle = seo.ogTitle || title
	const ogDescription = seo.ogDescription || description
	const ogImage = DEFAULT_OG_IMAGE
	const ogType = 'website'
	const canonical = seo.canonical || `https://linic.net${route}`
	const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow'

	// Replace <title>
	html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)

	// Replace or inject description
	if (html.includes('name="description"')) {
		html = html.replace(
			/<meta[^>]*name="description"[^>]*>/,
			`<meta name="description" content="${escapeHtml(description)}" />`
		)
	} else {
		html = html.replace('</head>', `<meta name="description" content="${escapeHtml(description)}" />\n\t\t</head>`)
	}

	// Replace or inject robots
	if (html.includes('name="robots"')) {
		html = html.replace(
			/<meta[^>]*name="robots"[^>]*>/,
			`<meta name="robots" content="${robots}" />`
		)
	} else {
		html = html.replace('</head>', `<meta name="robots" content="${robots}" />\n\t\t</head>`)
	}

	// Replace or inject canonical
	if (html.includes('rel="canonical"')) {
		html = html.replace(
			/<link[^>]*rel="canonical"[^>]*>/,
			`<link rel="canonical" href="${escapeHtml(canonical)}" />`
		)
	} else {
		html = html.replace('</head>', `<link rel="canonical" href="${escapeHtml(canonical)}" />\n\t\t</head>`)
	}

	// Open Graph tags
	const ogTags = [
		{ prop: 'og:title', content: ogTitle },
		{ prop: 'og:description', content: ogDescription },
		{ prop: 'og:type', content: ogType },
		{ prop: 'og:url', content: canonical },
		{ prop: 'og:image', content: ogImage },
		{ prop: 'og:site_name', content: 'Marino Linić' },
	]

	for (const { prop, content } of ogTags) {
		const regex = new RegExp(`<meta[^>]*property="${prop}"[^>]*>`)
		const tag = `<meta property="${prop}" content="${escapeHtml(content)}" />`
		if (regex.test(html)) {
			html = html.replace(regex, tag)
		} else {
			html = html.replace('</head>', `${tag}\n\t\t</head>`)
		}
	}

	// Twitter tags
	const twitterTags = [
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: ogTitle },
		{ name: 'twitter:description', content: ogDescription },
		{ name: 'twitter:image', content: ogImage },
	]

	for (const { name, content } of twitterTags) {
		const regex = new RegExp(`<meta[^>]*name="${name}"[^>]*>`)
		const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`
		if (regex.test(html)) {
			html = html.replace(regex, tag)
		} else {
			html = html.replace('</head>', `${tag}\n\t\t</head>`)
		}
	}

	return html
}

function escapeHtml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function main() {
	let html = ''
	try {
		html = readFileSync(INDEX_HTML, 'utf-8')
	} catch {
		console.error('Error: dist/index.html not found. Run `vite build` first.')
		process.exit(1)
	}

	for (const route of ALL_ROUTES) {
		const injected = injectMetaTags(html, route)
		const outPath =
			route === '/'
				? join(DIST, 'index.html')
				: join(DIST, route, 'index.html')
		mkdirSync(dirname(outPath), { recursive: true })
		writeFileSync(outPath, injected, 'utf-8')
		console.log(`Prerendered: ${route} → ${outPath.replace(DIST, 'dist')}`)
	}

	console.log(`\nPrerendered ${ALL_ROUTES.length} routes.`)
}

main()
