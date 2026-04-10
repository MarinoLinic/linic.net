import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BackButton from '../components/_BackButton'

const TimeVisualizationChoose = () => {
	const navigate = useNavigate()
	const [start, setStart] = useState('1999-10-13')
	const [end, setEnd] = useState('2079-10-13')

	function handleSubmit() {
		navigate(`/time-visualization/result?start=${start}&end=${end}`)
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
			<BackButton />
			<h2 className="text-text">Time Visualizer</h2>
			<form className="flex flex-col gap-4 w-full max-w-xs">
				<div className="flex flex-col gap-1">
					<label className="text-sm text-muted uppercase tracking-wider">Start (YYYY-MM-DD)</label>
					<input
						className="bg-surface border border-white/10 text-text text-center rounded-lg px-4 py-2 font-mono"
						type="text"
						required
						placeholder={start}
						onChange={(e) => setStart(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-muted uppercase tracking-wider">End (YYYY-MM-DD)</label>
					<input
						className="bg-surface border border-white/10 text-text text-center rounded-lg px-4 py-2 font-mono"
						type="text"
						required
						placeholder={end}
						onChange={(e) => setEnd(e.target.value)}
					/>
				</div>
				<button type="button" onClick={handleSubmit} className="mt-2 border-tertiary/40 hover:border-tertiary">
					Visualize →
				</button>
			</form>
		</div>
	)
}

export default TimeVisualizationChoose
