import { useState, useEffect } from 'react'
import Circles from './components/Circles'
import Loader from './components/Loader'

function App() {
	const [count, setCount] = useState(0)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(false)
	}, [])

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-col items-center justify-center h-screen">
					<h5 className="text-quarternary uppercase">junior web developer</h5>
					<h1>Marino Linić</h1>
					<div className="my-4 flex justify-center">
						<img src="ml.jpg" alt="Image of Marino Linic" className="w-36 h-36 grayscale hover:grayscale-0 rounded-3xl" />
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
			)}
		</>
	)
}

export default App
