import { useState, useEffect, useRef } from 'react'
import PortfolioList from '../components/Portfolio_PortfolioList'
import Navigation from '../components/_Navigation'
import { PORTFOLIO_COPY } from '../data/portfolio'

const Portfolio = () => {
	const rafRef = useRef<number>(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = requestAnimationFrame(() => {
				const el = document.documentElement
				const scrolled = el.scrollTop
				const total = el.scrollHeight - el.clientHeight
				setProgress(total > 0 ? (scrolled / total) * 100 : 0)
			})
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			cancelAnimationFrame(rafRef.current)
		}
	}, [])

	return (
		<>
			<div
				className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
				style={{ width: `${progress}%`, background: 'linear-gradient(to right, #7c70ff, #ff5c7c, #d94fc0)' }}
			/>
			<Navigation />
			<div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">
				<div className="py-12">
					<h1 className="text-text">{PORTFOLIO_COPY.page.title}</h1>
					<p className="text-muted mt-2">{PORTFOLIO_COPY.page.subtitle}</p>
				</div>
				<PortfolioList />
			</div>
		</>
	)
}

export default Portfolio
