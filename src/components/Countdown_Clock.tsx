import '../styles/rainbow.css'

interface props {
	title: string
	timerDays: string
	timerHours: string
	timerMinutes: string
	timerSeconds: string
}

const Clock = ({ title, timerDays, timerHours, timerMinutes, timerSeconds }: props) => {
	return (
		<div className="flex flex-col items-center justify-center text-center px-8">
			<h2 className="mb-10 text-white opacity-30">{title}</h2>
			<div className="flex items-center justify-center">
				<section>
					<h1 className="text-quarnary">{timerDays}</h1>
					<p className="font-bold">Days</p>
				</section>
				<h3 className="mb-4">:</h3>
				<section>
					<h1 className="text-quarnary">{timerHours}</h1>
					<p className="font-bold">Hrs</p>
				</section>{' '}
				<h3 className="mb-4">:</h3>
				<section>
					<h1 className="text-quarnary">{timerMinutes}</h1>
					<p className="font-bold">Mins</p>
				</section>{' '}
				<h3 className="mb-4">:</h3>
				<section>
					<h1 className="text-quarnary">{timerSeconds}</h1>
					<p className="font-bold">Secs</p>
				</section>
			</div>
		</div>
	)
}

Clock.defaultProps = {
	timerDays: '10',
	timerHours: '10',
	timerMinutes: '10',
	timerSeconds: '10'
}

export default Clock
