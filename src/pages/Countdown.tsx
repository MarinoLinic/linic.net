import { useState, useEffect } from 'react'
import Clock from '../components/Countdown_Clock'
import Circles from '../components/_Circles'
import { clockString } from '../utils/functions/clockString'

interface props {
	date: string
	title: string
}

const Countdown = (props: props) => {
	const [timerDays, setTimerDays] = useState('')
	const [timerHours, setTimerHours] = useState('')
	const [timerMinutes, setTimerMinutes] = useState('')
	const [timerSeconds, setTimerSeconds] = useState('')

	let interval: any

	const startTimer = (date: string) => {
		const countDownDate = new Date(props.date).getTime()

		interval = setInterval(() => {
			const now = new Date().getTime()

			const timeLeft = countDownDate - now

			const days: number = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
			const hours: number = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
			const minutes: number = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60))
			const seconds: number = Math.floor((timeLeft % (60 * 1000)) / 1000)

			if (timeLeft < 0) {
				// Stop Timer
				clearInterval(interval.current)
				setTimerDays(clockString(0))
				setTimerHours(clockString(0))
				setTimerMinutes(clockString(0))
				setTimerSeconds(clockString(0))
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
		startTimer(props.date)
	})

	return (
		<div className="flex items-center justify-center h-[80vh] md:h-screen">
			<div>
				<Clock
					title={props.title}
					timerDays={timerDays}
					timerHours={timerHours}
					timerMinutes={timerMinutes}
					timerSeconds={timerSeconds}
				/>
				<h5 className="pt-10 text-secondary text-center">{props.date}</h5>
			</div>
			<Circles />
		</div>
	)
}

export default Countdown
