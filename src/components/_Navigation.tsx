import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
	['About', '/about'],
	['Portfolio', '/portfolio'],
	['Résumé/CV', '/cv'],
	['Countdown', '/countdown'],
	['Time visualizer', '/time-visualization'],
	['Neto kalkulator', '/porez-na-dohodak']
]

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-background/85">
			<div className="flex items-center justify-between max-w-5xl mx-auto px-6 py-4">
				<Link to="/">
					<img src="/logo.svg" alt="Marino Linic logo" className="w-8 border-0 hover:border-0" />
				</Link>

				{/* Desktop links */}
				<div className="hidden md:flex items-center gap-6">
					{navLinks.map(([title, url]) => (
						<Link key={title} to={url} className="text-sm text-muted hover:text-text transition-colors font-medium">
							{title}
						</Link>
					))}
				</div>

				{/* Mobile toggle */}
				<button
					className="md:hidden border-white/10 text-base px-3 py-1"
					onClick={() => setIsMenuOpen(!isMenuOpen)}>
					{isMenuOpen ? '✕' : '☰'}
				</button>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4">
					{navLinks.map(([title, url]) => (
						<Link
							key={title}
							to={url}
							className="text-sm text-muted hover:text-text transition-colors font-medium"
							onClick={() => setIsMenuOpen(false)}>
							{title}
						</Link>
					))}
				</div>
			)}
		</nav>
	)
}

export default Navigation
