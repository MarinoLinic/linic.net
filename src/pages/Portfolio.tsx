import PortfolioList from '../components/Portfolio_PortfolioList'
import Navigation from '../components/_Navigation'

const Portfolio = () => {
	return (
		<>
			<Navigation />
			<div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">
				<div className="py-12">
					<h1 className="text-text">Portfolio</h1>
					<p className="text-muted mt-2">Projects from 2020 to present</p>
				</div>
				<PortfolioList />
			</div>
		</>
	)
}

export default Portfolio
