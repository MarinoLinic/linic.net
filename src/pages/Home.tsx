import { useState, useEffect } from 'react'
import Circles from '../components/Circles'
import Loader from '../components/Loader'
import Navigation from '../components/Navigation'
import { handleMouseOver, handleMouseOut } from '../utils/functions/handleMouseOver'

const Home = () => {
	const [count, setCount] = useState(0)
	const [isHovering, setIsHovering] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}, [])

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="h-screen">
					<Navigation />
					<div className="flex flex-col items-center justify-center h-[80vh]">
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
								className="w-36 h-36 grayscale hover:grayscale-0 rounded-3xl"
							/>
						</div>
						<h2 className="">Hello!</h2>
						<p className="">
							Visit my <a href="https://linktr.ee/marino.linic">social media</a>!
						</p>
						<div className="my-4">
							<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
						</div>
						<Circles />
					</div>
				</div>
			)}
		</>
	)
}

export default Home
