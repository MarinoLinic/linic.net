import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteSEO, DEFAULT_SEO } from '../seo'

const SITE_NAME = 'Marino Linić'
const BASE_URL = 'https://linic.net'

export function usePageSEO() {
	const { pathname } = useLocation()

	useEffect(() => {
		const seo = getRouteSEO(pathname)

		// Title
		document.title = seo.title

		// Meta description
		let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
		if (!metaDesc) {
			metaDesc = document.createElement('meta')
			metaDesc.name = 'description'
			document.head.appendChild(metaDesc)
		}
		metaDesc.content = seo.description

		// Canonical
		let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
		if (seo.canonical) {
			if (!canonical) {
				canonical = document.createElement('link')
				canonical.rel = 'canonical'
				document.head.appendChild(canonical)
			}
			canonical.href = seo.canonical
		} else if (canonical) {
			canonical.remove()
		}

		// Robots
		let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
		if (seo.noindex) {
			if (!robots) {
				robots = document.createElement('meta')
				robots.name = 'robots'
				document.head.appendChild(robots)
			}
			robots.content = 'noindex, nofollow'
		} else if (robots) {
			robots.remove()
		}

		// Open Graph
		setMetaTag('og:title', seo.ogTitle || seo.title)
		setMetaTag('og:description', seo.ogDescription || seo.description)
		setMetaTag('og:type', seo.ogType || DEFAULT_SEO.ogType || 'website')
		setMetaTag('og:url', seo.canonical || `${BASE_URL}${pathname}`)
		setMetaTag('og:image', seo.ogImage || DEFAULT_SEO.ogImage || '')
		setMetaTag('og:site_name', SITE_NAME)

		// Twitter
		setMetaTag('twitter:card', 'summary_large_image')
		setMetaTag('twitter:title', seo.ogTitle || seo.title)
		setMetaTag('twitter:description', seo.ogDescription || seo.description)
		setMetaTag('twitter:image', seo.ogImage || DEFAULT_SEO.ogImage || '')
	}, [pathname])
}

function setMetaTag(property: string, content: string) {
	let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
	if (!tag) {
		tag = document.createElement('meta')
		tag.setAttribute('property', property)
		document.head.appendChild(tag)
	}
	tag.content = content
}
