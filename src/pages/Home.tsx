import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Circles from '../components/_Circles'
import Navigation from '../components/_Navigation'
import { usePageSEO } from '../hooks/usePageSEO'

const Home = () => {
	usePageSEO()
	const [count, setCount] = useState<number>(() => {
		const saved = localStorage.getItem('Clicks')
		return saved ? JSON.parse(saved) : 0
	})

	const [isHovering, setIsHovering] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		localStorage.setItem('Clicks', JSON.stringify(count))
	}, [count])

	return (
		<>
			<div className={loading ? 'hidden' : 'min-h-dvh flex flex-col'}>
				<Navigation />
				<div className="flex flex-col items-center justify-center flex-1">
					{isHovering ? (
						<h5 onMouseOut={() => setIsHovering(false)} className="text-secondary uppercase cursor-default">
							& musician, photographer
						</h5>
					) : (
						<h5 onMouseOver={() => setIsHovering(true)} className="text-quarternary uppercase cursor-default">
							Web developer
						</h5>
					)}

					<h1 className="cursor-default mt-2">Marino Linić</h1>
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
						Visit my socials <Link to="/socials">here</Link>.
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
