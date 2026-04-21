import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import SquaresGrid from '../components/TimeVisualization_Square'
import BackButton from '../components/_BackButton'
import { timeConversionFloor, timeConversionCeil } from '../utils/functions/timeConversion'
import { usePageSEO } from '../hooks/usePageSEO'

type ClickKey = 'years' | 'months' | 'weeks' | 'days'
type InfoKey  = 'decades' | 'hours' | 'minutes' | 'seconds'

interface Row { label: string; key: ClickKey | InfoKey; unit?: string }

const allRows: Row[] = [
	{ label: 'Decades', key: 'decades' },
	{ label: 'Years',   key: 'years',   unit: 'Year'  },
	{ label: 'Months',  key: 'months',  unit: 'Month' },
	{ label: 'Weeks',   key: 'weeks',   unit: 'Week'  },
	{ label: 'Days',    key: 'days',    unit: 'Day'   },
	{ label: 'Hours',   key: 'hours'   },
	{ label: 'Minutes', key: 'minutes' },
	{ label: 'Seconds', key: 'seconds' },
]

type ClickRow = Row & { unit: string }
const unitRows = allRows.filter((r): r is ClickRow => r.unit !== undefined)

const formatDate = (dateStr: string) => {
	const [y, m, d] = dateStr.split('-').map(Number)
	return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const TimeVisualization = () => {
	usePageSEO()
	const [searchParams] = useSearchParams()
	const startDate = searchParams.get('start') ?? '1999-10-13'
	const endDate   = searchParams.get('end')   ?? '2079-10-13'

	const today         = new Date()
	const totalDiff     = new Date(endDate).getTime()   - new Date(startDate).getTime()
	const elapsedDiff   = today.getTime()               - new Date(startDate).getTime()

	const timeTotal   = timeConversionCeil(totalDiff)
	const timeElapsed = timeConversionFloor(elapsedDiff)
	const timeLeft    = timeConversionCeil(totalDiff - elapsedDiff)

	const percentElapsed = totalDiff > 0 ? ((elapsedDiff / totalDiff) * 100).toFixed(2) : '0.00'

	const [chosen, setChosen] = useState<ClickRow>(unitRows[2])
	const handleSelect = useCallback((_n: number | null) => {}, [])

	type TObj = Record<ClickKey | InfoKey, number>
	const tot = timeTotal   as unknown as TObj
	const elp = timeElapsed as unknown as TObj
	const lft = timeLeft   as unknown as TObj

	return (
		<div className="max-w-5xl mx-auto px-4 md:px-12 pt-16 pb-12 min-h-screen">
			<BackButton />

			<div className="md:my-8 my-4 space-y-6">

				<div className="text-center space-y-1">
					<p className="text-muted text-sm uppercase tracking-widest font-mono">time range</p>
					<h2 className="text-text">{formatDate(startDate)} — {formatDate(endDate)}</h2>
				</div>

				<div className="max-w-sm mx-auto space-y-2">
					<div className="flex justify-between text-xs text-muted font-mono">
						<span>{formatDate(startDate)}</span>
						<span className="text-tertiary font-semibold">{percentElapsed}%</span>
						<span>{formatDate(endDate)}</span>
					</div>
					<div className="relative h-1.5 bg-primary rounded-full overflow-hidden">
						<div
							className="absolute inset-y-0 left-0 rounded-full bg-tertiary"
							style={{ width: `${parseFloat(percentElapsed)}%` }}
						/>
					</div>
				</div>

				<div className="hidden md:block">
					<table className="w-full text-sm border-collapse">
						<thead>
							<tr>
								<th className="text-left py-2 text-xs font-mono text-muted uppercase tracking-wider w-20" />
								<th className="text-right py-2 text-xs font-mono text-muted uppercase tracking-wider">Total</th>
								<th className="text-right py-2 text-xs font-mono text-tertiary uppercase tracking-wider">Elapsed</th>
								<th className="text-right py-2 text-xs font-mono text-muted uppercase tracking-wider">Left</th>
							</tr>
						</thead>
						<tbody>
							{allRows.map(row => {
								const clickable = row.unit !== undefined
								const active    = clickable && chosen.unit === row.unit
								return (
									<tr
										key={row.key}
										onClick={clickable ? () => setChosen(row as ClickRow) : undefined}
										className={`border-t border-white/5 transition-colors ${clickable ? 'cursor-pointer hover:bg-white/5' : 'opacity-50'} ${active ? 'text-tertiary' : 'text-muted'}`}
									>
										<td className="py-2 font-mono text-xs uppercase tracking-wider">{row.label}</td>
										<td className="py-2 text-right font-mono">{tot[row.key].toLocaleString()}</td>
										<td className={`py-2 text-right font-mono font-semibold ${active ? 'text-tertiary' : ''}`}>{elp[row.key].toLocaleString()}</td>
										<td className="py-2 text-right font-mono">{lft[row.key].toLocaleString()}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>

				<div className="flex justify-center md:hidden">
					<select
						className="bg-surface border border-white/10 text-text text-center rounded-lg px-4 py-1.5 text-sm cursor-pointer hover:border-tertiary/50 transition-colors outline-none"
						value={chosen.label}
						onChange={e => setChosen(unitRows.find(r => r.label === e.target.value) ?? unitRows[2])}>
						{unitRows.map(r => <option key={r.label} value={r.label} className="bg-surface">{r.label}</option>)}
					</select>
				</div>

			</div>

			<SquaresGrid
				total={tot[chosen.key]}
				elapsed={elp[chosen.key]}
				unit={chosen.unit}
				onSelect={handleSelect}
			/>
		</div>
	)
}

export default TimeVisualization
