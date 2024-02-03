export function timeConversionFloor(time: number) {
	const miliseconds = time
	const seconds = Math.floor(time / 1000)
	const minutes = Math.floor(time / (1000 * 60))
	const hours = Math.floor(time / (1000 * 60 * 60))
	const days = Math.floor(time / (1000 * 60 * 60 * 24))
	const weeks = Math.floor(time / (1000 * 60 * 60 * 24 * 7))
	const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30.437))
	const years = Math.floor(time / (1000 * 60 * 60 * 24 * 365.25))
	const decades = Math.floor(time / (1000 * 60 * 60 * 24 * 365.25 * 10))

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

export function timeConversionCeil(time: number) {
	const miliseconds = time
	const seconds = Math.ceil(time / 1000)
	const minutes = Math.ceil(time / (1000 * 60))
	const hours = Math.ceil(time / (1000 * 60 * 60))
	const days = Math.ceil(time / (1000 * 60 * 60 * 24))
	const weeks = Math.ceil(time / (1000 * 60 * 60 * 24 * 7))
	const months = Math.ceil(time / (1000 * 60 * 60 * 24 * 30.437))
	const years = Math.ceil(time / (1000 * 60 * 60 * 24 * 365.25))
	const decades = Math.ceil(time / (1000 * 60 * 60 * 24 * 365.25 * 10))

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
