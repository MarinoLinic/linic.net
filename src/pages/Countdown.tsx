import { useState, useEffect, useRef } from 'react'
import Clock from '../components/Countdown_Clock'
import Circles from '../components/_Circles'
import BackButton from '../components/_BackButton'
import { clockString } from '../utils/functions/clockString'
import { usePageSEO } from '../hooks/usePageSEO'

interface Props {
	date: string
	title: string
}

const Countdown = ({ date, title }: Props) => {
	usePageSEO()
	const [timerYears, setTimerYears] = useState('00')
	const [timerMonths, setTimerMonths] = useState('00')
	const [timerDays, setTimerDays] = useState('00')
	const [timerHours, setTimerHours] = useState('00')
	const [timerMinutes, setTimerMinutes] = useState('00')
	const [timerSeconds, setTimerSeconds] = useState('00')

	const [showYears, setShowYears] = useState(false)
	const [showMonths, setShowMonths] = useState(false)
	const [showDays, setShowDays] = useState(false)

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const calculateTimeLeft = (targetDate: Date) => {
		const now = new Date()
		const timeLeft = targetDate.getTime() - now.getTime()

		if (timeLeft < 0) {
			return {
				years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
				showYears: false, showMonths: false, showDays: false
			}
		}

		// Calculate years and months
		let years = targetDate.getFullYear() - now.getFullYear()
		let months = targetDate.getMonth() - now.getMonth()
		let days = targetDate.getDate() - now.getDate()
		let hours = targetDate.getHours() - now.getHours()
		let minutes = targetDate.getMinutes() - now.getMinutes()
		let seconds = targetDate.getSeconds() - now.getSeconds()

		// Handle negative values by borrowing
		if (seconds < 0) {
			seconds += 60
			minutes--
		}
		if (minutes < 0) {
			minutes += 60
			hours--
		}
		if (hours < 0) {
			hours += 24
			days--
		}
		if (days < 0) {
			const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0)
			days += lastMonth.getDate()
			months--
		}
		if (months < 0) {
			months += 12
			years--
		}

		// Determine what to show
		const showYears = years > 0
		const showMonths = years > 0 || months > 0
		const showDays = years > 0 || months > 0 || days > 0

		return { years, months, days, hours, minutes, seconds, showYears, showMonths, showDays }
	}

	useEffect(() => {
		const countDownDate = new Date(date)
		
		// Calculate initial values immediately
		const timeData = calculateTimeLeft(countDownDate)
		
		setTimerYears(clockString(timeData.years))
		setTimerMonths(clockString(timeData.months))
		setTimerDays(clockString(timeData.days))
		setTimerHours(clockString(timeData.hours))
		setTimerMinutes(clockString(timeData.minutes))
		setTimerSeconds(clockString(timeData.seconds))
		
		setShowYears(timeData.showYears)
		setShowMonths(timeData.showMonths)
		setShowDays(timeData.showDays)

		intervalRef.current = setInterval(() => {
			const timeData = calculateTimeLeft(countDownDate)
			
			setTimerYears(clockString(timeData.years))
			setTimerMonths(clockString(timeData.months))
			setTimerDays(clockString(timeData.days))
			setTimerHours(clockString(timeData.hours))
			setTimerMinutes(clockString(timeData.minutes))
			setTimerSeconds(clockString(timeData.seconds))
			
			setShowYears(timeData.showYears)
			setShowMonths(timeData.showMonths)
			setShowDays(timeData.showDays)
		}, 1000)

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [date])

	return (
		<div className="flex items-center justify-center h-[80vh] md:h-screen">
			<BackButton />
			<div>
				<Clock
					title={title}
					timerYears={timerYears}
					timerMonths={timerMonths}
					timerDays={timerDays}
					timerHours={timerHours}
					timerMinutes={timerMinutes}
					timerSeconds={timerSeconds}
					showYears={showYears}
					showMonths={showMonths}
					showDays={showDays}
				/>
				<div className="mt-10 flex items-center justify-center gap-3 text-muted/50">
					<div className="h-px w-8 bg-current" />
					<span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
						{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
						{' · '}
						{new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
					</span>
					<div className="h-px w-8 bg-current" />
				</div>
			</div>
			<Circles />
		</div>
	)
}

export default Countdown
