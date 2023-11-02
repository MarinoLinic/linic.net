// TimeVisualization.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Square from '../components/Square'

interface Params {
	years: string
	months: string
	weeks: string
	startDate: string
}

const TimeVisualization = () => {
	const { years, months, weeks, startDate }: any = useParams() // fix TS

	const [passedWeeks, setPassedWeeks] = useState(0)
	const [totalWeeks, setTotalWeeks] = useState(0)

	useEffect(() => {
		const today = new Date()
		const inputDate = new Date(startDate) // Assuming startDate is in the format 'YYYY-MM-DD'

		const timeDiff = today.getTime() - inputDate.getTime()
		const weeksPassed = Math.floor(timeDiff / (1000 * 3600 * 24 * 7)) // Calculate weeks
		setPassedWeeks(weeksPassed)

		const totalWeeksCount = years * 52 + months * 4 + parseInt(weeks) // Assuming 1 year has 52 weeks and 1 month has 4 weeks
		setTotalWeeks(totalWeeksCount)
	}, [startDate, years, months, weeks])

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
