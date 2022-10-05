import { useState } from 'react';
import Circles from './components/Circles';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col text-center mt-64 justify-center">
			<p className="text-quarternary uppercase">junior web developer</p>
			<h1>Marino Linić</h1>
			<div className="my-4 flex justify-center">
				<img src="ml.jpg" alt="Image of Marino Linic" className="w-36 h-36 grayscale hover:grayscale-0 rounded-3xl" />
			</div>
			<h2 className="text-3xl">Hello!</h2>
			<p className="">
				Visit my <a href="https://linktr.ee/marino.linic">social media</a>!
			</p>
			<div className="my-4">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
			</div>
			<Circles />
		</div>
	);
}

export default App;
