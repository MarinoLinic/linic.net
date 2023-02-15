import PortfolioList from '../components/PortfolioList'
import Navigation from '../components/Navigation'

const Portfolio = () => {
	return (
		<>
			<Navigation />
			<h1 className="mt-16 text-center text-quarnary">Marino Linić's Portfolio</h1>
			<PortfolioList />
		</>
	)
}

export default Portfolio
