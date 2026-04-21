import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BackButton from '../components/_BackButton'
import { usePageSEO } from '../hooks/usePageSEO'

const TimeVisualizationChoose = () => {
	usePageSEO()
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
			<form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
				<div className="flex flex-col gap-1">
					<label className="text-xs text-muted uppercase tracking-wider">Start date</label>
					<input
						className="bg-surface border border-white/10 text-text text-center rounded-lg px-4 py-2 font-mono hover:border-tertiary/50 transition-colors"
						type="date"
						value={start}
						required
						onChange={(e) => setStart(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs text-muted uppercase tracking-wider">End date</label>
					<input
						className="bg-surface border border-white/10 text-text text-center rounded-lg px-4 py-2 font-mono hover:border-tertiary/50 transition-colors"
						type="date"
						value={end}
						required
						onChange={(e) => setEnd(e.target.value)}
					/>
				</div>
				<button type="submit" className="mt-2 border-tertiary/40 hover:border-tertiary">
					Visualize →
				</button>
			</form>
		</div>
	)
}

export default TimeVisualizationChoose
