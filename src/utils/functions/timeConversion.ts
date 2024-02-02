export function timeConversion(time: number) {
	const miliseconds = time
	const seconds = Math.round(time / 1000)
	const minutes = Math.round(time / (1000 * 60))
	const hours = Math.round(time / (1000 * 60 * 60))
	const days = Math.round(time / (1000 * 60 * 60 * 24))
	const weeks = Math.round(time / (1000 * 60 * 60 * 24 * 7))
	const months = Math.round(time / (1000 * 60 * 60 * 24 * 30.437))
	const years = Math.round(time / (1000 * 60 * 60 * 24 * 365.25))
	const decades = Math.round(time / (1000 * 60 * 60 * 24 * 365.25 * 10))

	return {
		miliseconds,
		seconds,
		minutes,
		hours,
		days,
		weeks,
		months,
		years,
		decades
	}
}
