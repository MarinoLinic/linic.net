// TimeVisualization.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Square from '../components/TimeVisualization_Square'
import { timeConversion } from '../utils/functions/timeConversion'

interface Params {
	years: string
	months: string
	weeks: string
	startDate: string
}

const TimeVisualization = () => {
	const { startDate, endDate }: any = useParams() // fix TS

	const [passedWeeks, setPassedWeeks] = useState(0)
	const [totalWeeks, setTotalWeeks] = useState(0)

	useEffect(() => {
		const today = new Date()
		const inputStartDate = new Date(startDate) // Assuming startDate is in the format 'YYYY-MM-DD'
		const inputEndDate = new Date(endDate) // Assuming endDate is in the format 'YYYY-MM-DD'

		// Calculating miliseconds
		const totalDiff = inputEndDate.getTime() - inputStartDate.getTime()
		const passedDiff = today.getTime() - inputStartDate.getTime()

		// Creating time objects
		const timeTotal = timeConversion(totalDiff)
		const timePassed = timeConversion(passedDiff)
		const timeLeft = timeConversion(totalDiff - passedDiff)

		// Testing via console.log
		console.log('Percentage passed:', (passedDiff / totalDiff) * 100) // testing
		console.log(timeLeft)
		console.log(timePassed)
		console.log(timeTotal)

		// State
		setPassedWeeks(timePassed.weeks)
		setTotalWeeks(timeTotal.weeks)
	}, [startDate, endDate])

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

	return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderSquares()}</div>
}

export default TimeVisualization
