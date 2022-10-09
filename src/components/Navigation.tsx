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
						['Countdown', '/flight']
					].map(([title, url]) => (
						<div key={title} className="px-2">
							<a href={url} className="text-text">
								{title}
							</a>
						</div>
					))}
				</div>
			</div>
		</nav>
	)
}

export default Navigation
