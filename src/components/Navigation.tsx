import { Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<nav className="md:sticky md:top-0 pt-8">
			<div className="flex flex-wrap container justify-between mx-auto px-6 md:px-0">
				<a href="/">
					<img src="/logo.svg" alt="Marino Linic logo" className="w-8 border-0" />
				</a>
				<div className="flex flex-col md:flex-row">
					{[
						['Resume/CV', '/cv'],
						['Računalna grafika', '/rg'],
						['Countdown', '/countdown'],
						['Neto kalkulator', '/salary']
					].map(([title, url]) => (
						<div key={title} className="px-2">
							<Link to={url} className="text-text">
								{title}
							</Link>
						</div>
					))}
				</div>
			</div>
		</nav>
	)
}

export default Navigation
