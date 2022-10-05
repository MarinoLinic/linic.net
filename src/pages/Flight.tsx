import { useState, useEffect } from 'react'
import Clock from '../components/Clock'
import Circles from '../components/Circles'
import { clockString } from '../utils/functions/clockString'

const Flight = () => {
	const [timerDays, setTimerDays] = useState('')
	const [timerHours, setTimerHours] = useState('')
	const [timerMinutes, setTimerMinutes] = useState('')
	const [timerSeconds, setTimerSeconds] = useState('')

	let interval: any
	let title: string = 'Time until flight to the Czech Republic'

	const startTimer = () => {
		const countDownDate = new Date('October 12, 2022, 11:25').getTime()

		interval = setInterval(() => {
			const now = new Date().getTime()

			const timeLeft = countDownDate - now

			const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000)) as any
			const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) as any
			const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60)) as any
			const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000) as any

			if (timeLeft < 0) {
				// Stop Timer
				clearInterval(interval.current)
			} else {
				// Update Timer
				setTimerDays(clockString(days))
				setTimerHours(clockString(hours))
				setTimerMinutes(clockString(minutes))
				setTimerSeconds(clockString(seconds))
			}
		})
	}

	useEffect(() => {
		startTimer()
	})

	return (
		<div className="flex items-center justify-center h-screen">
			<Clock
				title={title}
				timerDays={timerDays}
				timerHours={timerHours}
				timerMinutes={timerMinutes}
				timerSeconds={timerSeconds}
			/>
			<Circles />
		</div>
	)
}

export default Flight
