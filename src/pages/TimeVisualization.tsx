// TimeVisualization.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Square from '../components/TimeVisualization_Square'
import { timeConversion } from '../utils/functions/timeConversion'

interface Params {
	startDate: string
	endDate: string
}

const TimeVisualization = () => {
	const { startDate, endDate }: any = useParams() // fix TS

	const [passedWeeks, setPassedWeeks] = useState(0)
	const [totalWeeks, setTotalWeeks] = useState(0)

	// ------------------- Date calculation

	const today = new Date()
	const inputStartDate = new Date(startDate) // YYYY-MM-DD
	const inputEndDate = new Date(endDate) // YYYY-MM-DD

	// Calculating miliseconds
	const totalDiff = inputEndDate.getTime() - inputStartDate.getTime()
	const passedDiff = today.getTime() - inputStartDate.getTime()

	// Creating time objects
	const timeTotal = timeConversion(totalDiff)
	const timePassed = timeConversion(passedDiff)
	const timeLeft = timeConversion(totalDiff - passedDiff)

	// Testing via console.log
	console.log('Percentage passed:', (passedDiff / totalDiff) * 100)

	// ------------------- Updating state

	useEffect(() => {
		setPassedWeeks(timePassed.weeks)
		setTotalWeeks(timeTotal.weeks)
	}, [startDate, endDate])

	// ------------------- Rendering the visualization

	const renderSquares = () => {
		const squares = []
		for (let i = 0; i < totalWeeks; i++) {
			if (i < passedWeeks) {
				squares.push(<Square key={i} filled index={i} />)
			} else {
				squares.push(<Square key={i} index={i} />)
			}
		}
		return squares
	}

	// ------------------- JSX

	return (
		<div className="mx-48 my-12">
			<div className="my-8">
				<h2 className="text-center my-8">
					{startDate} ... to ... {endDate}
				</h2>
				<div className="flex flex-row justify-between">
					<section>
						{Object.entries(timeTotal).map(([key, value]) => (
							<p key={key}>
								{'Total ' + key.charAt(0).toUpperCase() + key.slice(1)}: {value}
							</p>
						))}
					</section>
					<section>
						{Object.entries(timePassed).map(([key, value]) => (
							<p key={key}>
								{'Passed ' + key.charAt(0).toUpperCase() + key.slice(1)}: {value}
							</p>
						))}
					</section>
					<section>
						{Object.entries(timeLeft).map(([key, value]) => (
							<p key={key}>
								{'Left ' + key.charAt(0).toUpperCase() + key.slice(1)}: {value}
							</p>
						))}
					</section>
				</div>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderSquares()}</div>
		</div>
	)
}

export default TimeVisualization
