import { useState, useEffect, useRef } from 'react'
import Clock from '../components/Countdown_Clock'
import Circles from '../components/_Circles'
import { clockString } from '../utils/functions/clockString'

interface Props {
	date: string
	title: string
}

const Countdown = ({ date, title }: Props) => {
	const [timerDays, setTimerDays] = useState('')
	const [timerHours, setTimerHours] = useState('')
	const [timerMinutes, setTimerMinutes] = useState('')
	const [timerSeconds, setTimerSeconds] = useState('')

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		const countDownDate = new Date(date).getTime()

		intervalRef.current = setInterval(() => {
			const now = new Date().getTime()
			const timeLeft = countDownDate - now

			const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
			const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
			const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60))
			const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)

			if (timeLeft < 0) {
				clearInterval(intervalRef.current!)
				setTimerDays(clockString(0))
				setTimerHours(clockString(0))
				setTimerMinutes(clockString(0))
				setTimerSeconds(clockString(0))
			} else {
				setTimerDays(clockString(days))
				setTimerHours(clockString(hours))
				setTimerMinutes(clockString(minutes))
				setTimerSeconds(clockString(seconds))
			}
		}, 1000)

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [date])

	return (
		<div className="flex items-center justify-center h-[80vh] md:h-screen">
			<div>
				<Clock
					title={title}
					timerDays={timerDays}
					timerHours={timerHours}
					timerMinutes={timerMinutes}
					timerSeconds={timerSeconds}
				/>
				<h5 className="pt-10 text-secondary text-center">{date}</h5>
			</div>
			<Circles />
		</div>
	)
}

export default Countdown
