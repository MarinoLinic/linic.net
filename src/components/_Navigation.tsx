import { useState } from 'react'
import { Link } from 'react-router-dom'

type NavGroup = { type: 'group'; title: string; items: { title: string; url: string }[] }
type NavLink = { type: 'link'; title: string; url: string }
type NavItem = NavLink | NavGroup

const navItems: NavItem[] = [
	{ type: 'link', title: 'About', url: '/about' },
	{ type: 'link', title: 'Portfolio', url: '/portfolio' },
	{ type: 'link', title: 'Résumé/CV', url: '/cv' },
	{ type: 'group', title: 'Collections', items: [
		{ title: 'Animals', url: '/animals' }
	]},
	{ type: 'group', title: 'Projects', items: [
		{ title: 'Countdown', url: '/countdown' },
		{ title: 'Time visualizer', url: '/time-visualization' },
		{ title: 'Salary tax calculator', url: '/porez-na-dohodak' },
	]},
]

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [openGroup, setOpenGroup] = useState<string | null>(null)

	return (
		<>
			{openGroup && (
				<div className="fixed inset-0 z-40" onClick={() => setOpenGroup(null)} />
			)}
			<nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-background/85">
				<div className="flex items-center justify-between max-w-5xl mx-auto px-6 py-4">
					<Link to="/">
						<img src="/logo.svg" alt="Marino Linic logo" className="w-8 border-0 hover:border-0" />
					</Link>

					{/* Desktop links */}
					<div className="hidden md:flex items-center gap-6">
						{navItems.map((item) => {
							if (item.type === 'link') {
								return (
									<Link key={item.title} to={item.url} className="text-sm text-muted hover:text-text transition-colors font-medium">
										{item.title}
									</Link>
								)
							}
							const isOpen = openGroup === item.title
							return (
								<div key={item.title} className="relative z-50">
									<button
										onClick={() => setOpenGroup(isOpen ? null : item.title)}
										className="flex items-center gap-1 text-sm text-muted hover:text-text transition-colors font-medium bg-transparent hover:bg-transparent border-0 hover:border-0 p-0 leading-none focus:outline-none">
										{item.title}
										<span className={`text-[11px] transition-transform duration-200 inline-block ${isOpen ? 'rotate-180' : ''}`}>▾</span>
									</button>
									{isOpen && (
										<div className="absolute top-full left-0 mt-2.5 min-w-[140px] rounded-xl border border-white/10 py-1.5 shadow-xl"
											style={{ background: 'rgba(13,22,40,0.97)' }}>
											{item.items.map(sub => (
												<Link key={sub.title} to={sub.url}
													onClick={() => setOpenGroup(null)}
													className="block px-4 py-2 text-sm text-muted hover:text-text hover:bg-white/5 transition-colors">
													{sub.title}
												</Link>
											))}
										</div>
									)}
								</div>
							)
						})}
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
						{navItems.map((item) => {
							if (item.type === 'link') {
								return (
									<Link
										key={item.title}
										to={item.url}
										className="text-sm text-muted hover:text-text transition-colors font-medium"
										onClick={() => setIsMenuOpen(false)}>
										{item.title}
									</Link>
								)
							}
							return (
								<div key={item.title}>
									<p className="text-[10px] text-muted/40 uppercase tracking-widest mb-2">{item.title}</p>
									<div className="flex flex-col gap-3 pl-3 border-l border-white/8">
										{item.items.map(sub => (
											<Link
												key={sub.title}
												to={sub.url}
												className="text-sm text-muted hover:text-text transition-colors font-medium"
												onClick={() => setIsMenuOpen(false)}>
												{sub.title}
											</Link>
										))}
									</div>
								</div>
							)
						})}
					</div>
				)}
			</nav>
		</>
	)
}

export default Navigation
