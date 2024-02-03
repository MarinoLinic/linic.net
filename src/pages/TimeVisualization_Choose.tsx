import { Link } from 'react-router-dom'
import { useState } from 'react'

const TimeVisualizationChoose = () => {
	const [start, setStart] = useState('1999-10-13')
	const [end, setEnd] = useState('2079-10-13')

	function handleSubmit() {
		const urlT = `time-visualization/start=${start}&end=${end}`
		window.location.href = urlT
	}

	return (
		<div className="my-8 flex-col">
			<div className="flex justify-evenly">
				<form>
					<div>
						<div className="flex flex-col my-4">
							<label>START (YYYY-MM-DD):</label>
							<input
								className="text-center text-primary"
								type="text"
								required
								placeholder={start}
								onChange={(e) => setStart(e.target.value)}
							/>
						</div>
						<div className="flex flex-col my-4">
							<label>END (YYYY-MM-DD):</label>
							<input
								className="text-center text-primary"
								type="text"
								required
								placeholder={end}
								onChange={(e) => setEnd(e.target.value)}
							/>
						</div>
					</div>
				</form>
			</div>
			<div className="w-full text-center">
				<button
					onClick={() => {
						handleSubmit()
					}}>
					Submit
				</button>
			</div>
		</div>
	)
}

export default TimeVisualizationChoose
