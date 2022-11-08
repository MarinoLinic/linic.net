import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Circles from '../components/Circles'
import Navigation from '../components/Navigation'
import { handleMouseOver, handleMouseOut } from '../utils/functions/handleMouseOver'

const Home = () => {
	const [count, setCount] = useState(() => {
		let cond = localStorage.getItem('Clicks') ? JSON.parse(localStorage.getItem('Clicks')!) : 0
		return cond
	})

	const [isHovering, setIsHovering] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		localStorage.setItem('Clicks', JSON.stringify(count))
	}, [count])

	return (
		<>
			<div className={loading ? 'hidden' : ''}>
				<Navigation />
				<div className="flex flex-col items-center justify-center h-[60vh] md:h-[80vh]">
					{isHovering ? (
						<h5
							onMouseOut={() => {
								handleMouseOut(setIsHovering)
							}}
							className="text-secondary uppercase cursor-default">
							& musician, photographer
						</h5>
					) : (
						<h5
							onMouseOver={() => {
								handleMouseOver(setIsHovering)
							}}
							className="text-quarternary uppercase cursor-default">
							junior web developer
						</h5>
					)}

					<h1 className="cursor-default">Marino Linić</h1>
					<div className="my-4 flex justify-center">
						<img
							src="ml.jpg"
							alt="Image of Marino Linic"
							onLoad={() => setLoading(false)}
							className="w-36 h-36 grayscale hover:grayscale-0 rounded-3xl"
						/>
					</div>
					<h2 className="">Hello!</h2>
					<p className="">
						Visit my socials <Link to="/socials">here</Link> or <a href="https://linktr.ee/marino.linic">here</a>
					</p>
					<div className="my-4">
						<button onClick={() => setCount((count: number) => count + 1)}>count is {count}</button>
					</div>
					<Circles />
				</div>
			</div>
		</>
	)
}

export default Home
