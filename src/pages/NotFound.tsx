import { useEffect } from 'react'
import BackButton from '../components/_BackButton'
import { usePageSEO } from '../hooks/usePageSEO'

const NotFound = () => {
	usePageSEO()
	useEffect(() => {
		document.title = 'Page Not Found — Marino Linić'
		let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
		if (!robots) {
			robots = document.createElement('meta')
			robots.name = 'robots'
			document.head.appendChild(robots)
		}
		robots.content = 'noindex, nofollow'
		return () => { robots?.remove() }
	}, [])
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<BackButton />
			<h1 className="text-quarternary">404</h1>
			<p className="text-muted">Page not found.</p>
		</div>
	)
}

export default NotFound
