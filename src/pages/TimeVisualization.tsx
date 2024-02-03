// TimeVisualization.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Square from '../components/TimeVisualization_Square'
import TimeTable from '../components/TimeVisualization_Table'
import { timeConversion } from '../utils/functions/timeConversion'

interface Params {
	startDate: string
	endDate: string
}

const TimeVisualization = () => {
	const { startDate, endDate }: any = useParams() // fix TS

	const dateOptions = ['Days', 'Weeks', 'Months', 'Years']
	const [dateOptionChosen, setDateOptionChosen] = useState('Weeks')

	// ------------------- Date calculation

	const today = new Date()
	const inputStartDate = new Date(startDate) // YYYY-MM-DD
	const inputEndDate = new Date(endDate) // YYYY-MM-DD

	// Calculating miliseconds
	const totalDiff = inputEndDate.getTime() - inputStartDate.getTime()
	const elapsedDiff = today.getTime() - inputStartDate.getTime()

	// Creating time objects
	const timeTotal = timeConversion(totalDiff)
	const timeElapsed = timeConversion(elapsedDiff)
	const timeLeft = timeConversion(totalDiff - elapsedDiff)

	// ------------------- Rendering the visualization

	const renderSquares = (total: any, elapsed: any) => {
		const squares = []
		for (let i = 0; i < total; i++) {
			if (i < elapsed) {
				squares.push(<Square key={i} filled index={i} />)
			} else {
				squares.push(<Square key={i} index={i} />)
			}
		}
		return squares
	}

	// ------------------- JSX

	return (
		<div className="md:mx-48 md:my-12 mx-4 my-4">
			<div className="md:my-8 my-4">
				<h2 className="md:my-8 my-4 text-center text-quarnary">
					{startDate} ... to ... {endDate}
				</h2>
				<h4 className="md:my-8 text-center text-quarternary">
					Percent elapsed: {((elapsedDiff / totalDiff) * 100).toFixed(2)}%
				</h4>
				<div className="md:visible md:flex md:flex-row md:justify-between hidden">
					<section>
						<TimeTable timeObj={timeTotal} desc="total" />
					</section>
					<section>
						<TimeTable timeObj={timeElapsed} desc="elapsed" />
					</section>
					<section>
						<TimeTable timeObj={timeLeft} desc="left" />
					</section>
				</div>
				<div className="flex justify-center my-4">
					<select
						title="Date Options"
						name="dateOptions"
						className="bg-text text-primary text-center font-extrabold"
						onChange={(e) => setDateOptionChosen(e.target.value)}>
						{dateOptions.map((index) => (
							<option value={index}>{index}</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex flex-wrap">{renderSquares(timeTotal.weeks, timeElapsed.weeks)}</div>
		</div>
	)
}

export default TimeVisualization
