// TimeVisualization.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Square from '../components/TimeVisualization_Square'
import TimeTable from '../components/TimeVisualization_Table'
import { timeConversionFloor, timeConversionCeil } from '../utils/functions/timeConversion'

type RouteParams = {
	startDate: string
	endDate: string
}

const TimeVisualization = () => {
	const { startDate = '1999-10-13', endDate = '2079-10-13' } = useParams<RouteParams>()

	// ------------------- Date calculation

	const today = new Date()
	const inputStartDate = new Date(startDate) // YYYY-MM-DD
	const inputEndDate = new Date(endDate) // YYYY-MM-DD

	// Calculating miliseconds
	const totalDiff = inputEndDate.getTime() - inputStartDate.getTime()
	const elapsedDiff = today.getTime() - inputStartDate.getTime()

	// Creating time objects
	const timeTotal = timeConversionCeil(totalDiff)
	const timeElapsed = timeConversionFloor(elapsedDiff)
	const timeLeft = timeConversionCeil(totalDiff - elapsedDiff)

	const percentElapsed = ((elapsedDiff / totalDiff) * 100).toFixed(2)

	// ------------------- Rendering the visualization

	const renderSquares = (total: any, elapsed: any, unit: any) => {
		const squares = []
		for (let i = 0; i < total; i++) {
			if (i < elapsed) {
				squares.push(<Square key={i} filled index={i} unit={unit} />)
			} else {
				squares.push(<Square key={i} index={i} unit={unit} />)
			}
		}
		return squares
	}

	// ------------------- State stuff

	const dateOptions = ['Weeks', 'Months', 'Years', 'Days']
	const [dateOptionChosen, setDateOptionChosen] = useState({
		total: timeTotal.weeks,
		elapsed: timeElapsed.weeks,
		left: timeLeft.weeks,
		unit: 'Week'
	})

	function toggleDate(chosen: any) {
		if (chosen === 'Days') {
			setDateOptionChosen({ total: timeTotal.days, elapsed: timeElapsed.days, left: timeLeft.days, unit: 'Day' })
		}
		if (chosen === 'Weeks') {
			setDateOptionChosen({
				total: timeTotal.weeks,
				elapsed: timeElapsed.weeks,
				left: timeLeft.weeks,
				unit: 'Weel'
			})
		}
		if (chosen === 'Months') {
			setDateOptionChosen({
				total: timeTotal.months,
				elapsed: timeElapsed.months,
				left: timeLeft.months,
				unit: 'Month'
			})
		}
		if (chosen === 'Years') {
			setDateOptionChosen({
				total: timeTotal.years,
				elapsed: timeElapsed.years,
				left: timeLeft.years,
				unit: 'Year'
			})
		}
	}

	// ------------------- Updating every x seconds

	const [time, setTime] = useState(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), 8000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	// ------------------- JSX

	return (
		<div className="md:mx-48 md:my-12 mx-4 my-4">
			<div className="md:my-8 my-4">
				<h2 className="md:my-8 my-4 text-center text-quarnary">
					{startDate} ... to ... {endDate}
				</h2>
				<div className="md:my-8 text-center">
					<h4 className="my-2 text-quarternary">Percent elapsed:</h4>
					<div className="w-full flex justify-center">
						<div className="w-1/2 bg-text rounded-md overflow-hidden">
							<div
								style={{
									backgroundColor: '#eb6171',
									width: `${parseFloat(percentElapsed)}%`
								}}>
								{percentElapsed}%
							</div>
						</div>
					</div>
				</div>
				<div className="md:visible md:flex md:flex-row md:justify-around hidden">
					<section>
						<TimeTable timeObj={timeTotal} desc="total" chosen={dateOptionChosen.total} />
					</section>
					<section>
						<TimeTable timeObj={timeElapsed} desc="elapsed" chosen={dateOptionChosen.elapsed} />
					</section>
					<section>
						<TimeTable timeObj={timeLeft} desc="left" chosen={dateOptionChosen.left} />
					</section>
				</div>
				<div className="flex justify-center my-4 mt-6">
					<select
						title="Date Options"
						name="dateOptions"
						className="bg-text text-primary text-center font-extrabold rounded-md"
						onChange={(e) => toggleDate(e.target.value)}>
						{dateOptions.map((index) => (
							<option value={index}>{index}</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex flex-wrap">
				{renderSquares(dateOptionChosen.total, dateOptionChosen.elapsed, dateOptionChosen.unit)}
			</div>
		</div>
	)
}

export default TimeVisualization
