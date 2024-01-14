import History from '../assets/content/portfolio/history.mdx'
import Salary from '../assets/content/portfolio/salary.mdx'
import Clicker from '../assets/content/portfolio/clicker.mdx'
import Photography from '../assets/content/portfolio/photography.mdx'
import Flappy from '../assets/content/portfolio/flappy.mdx'
import Fidit from '../assets/content/portfolio/fidit.mdx'
import Other from '../assets/content/portfolio/other.mdx'

const PortfolioList = () => {
	return (
		<section className="flex items-center justify-center">
			<div className="md:w-[600px] w-[300px] text-center my-16 items-center justify-center">
				<History />
				<br /> <br />
				<hr />
				<br /> <br />
				<Salary />
				<br /> <br />
				<hr />
				<br /> <br />
				<Fidit />
				<br /> <br />
				<hr />
				<br /> <br />
				<Clicker />
				<br /> <br />
				<hr />
				<br /> <br />
				<Flappy />
				<br /> <br />
				<hr />
				<br /> <br />
				<Photography />
				<br /> <br />
				<hr />
				<br /> <br />
				<div className="text-left">
					<Other />
				</div>
			</div>
		</section>
	)
}

export default PortfolioList
