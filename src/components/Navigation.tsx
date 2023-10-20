import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav className="md:sticky md:top-0 pt-8">
			<div className="flex flex-wrap container justify-between mx-auto px-6 md:px-0">
				<a href="/">
					<img src="/logo.svg" alt="Marino Linic logo" className="w-8 border-0" />
				</a>
				<div className="flex flex-col md:flex-row">
					<div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
						{[
							['About', '/about'],
							['Résumé/CV', '/cv'],
							['Portfolio', '/portfolio'],
							['Countdown', '/countdown'],
							['Neto kalkulator', '/porez-na-dohodak']
						].map(([title, url]) => (
							<div key={title} className="px-2">
								<Link to={url} className="text-text">
									{title}
								</Link>
							</div>
						))}
					</div>
					<button className="md:hidden block" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						☰
					</button>
					<div className="hidden md:flex">
						{[
							['About', '/about'],
							['Résumé/CV', '/cv'],
							['Portfolio', '/portfolio'],
							[
								'Projects',
								[
									['Countdown', '/countdown'],
									['Neto kalkulator', '/porez-na-dohodak']
								]
							]
						].map(([title, url]) => (
							<div key={title} className="px-2">
								{Array.isArray(url) ? (
									<div>
										{title}
										<div className="ml-2">
											{url.map(([subTitle, subUrl]) => (
												<div key={subTitle}>
													<Link to={subUrl} className="text-text">
														{subTitle}
													</Link>
												</div>
											))}
										</div>
									</div>
								) : (
									<Link to={url} className="text-text">
										{title}
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navigation
