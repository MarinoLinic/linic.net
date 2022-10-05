interface props {
	title: string
	timerDays: number
	timerHours: number
	timerMinutes: number
	timerSeconds: number
}

const Clock = ({ title, timerDays, timerHours, timerMinutes, timerSeconds }: props) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<h2 className="mb-10 text-gray-400 text-center">{title}</h2>
			<div className="flex items-center justify-center">
				<section>
					<h1 className="text-quarnary">{timerDays}</h1>
					<p>Days</p>
				</section>
				<h3 className="mb-4">:</h3>
				<section>
					<h1 className="text-quarnary">{timerHours}</h1>
					<p>Hours</p>
				</section>{' '}
				<h3 className="mb-4">:</h3>
				<section>
					<h1 className="text-quarnary">{timerMinutes}</h1>
					<p>Minutes</p>
				</section>{' '}
				<h3 className="mb-4">:</h3>
				<section>
					<h1 className="text-quarnary">{timerSeconds}</h1>
					<p>Seconds</p>
				</section>
			</div>
		</div>
	)
}

Clock.defaultProps = {
	timerDays: 10,
	timerHours: 10,
	timerMinutes: 10,
	timerSeconds: 10
}

export default Clock
