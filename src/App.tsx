import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col text-center mt-56">
			<div className="">
				<p>web engineer</p>
			</div>
			<h1>Marino Linić</h1>
			<div className="my-4">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
			</div>
			<p>Hello!</p>
			<p className="">
				Visit my <a href="https://linktr.ee/marino.linic">social media</a>!
			</p>
		</div>
	);
}

export default App;
