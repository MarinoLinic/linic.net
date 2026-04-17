interface Props {
	title: string
	timerYears?: string
	timerMonths?: string
	timerDays?: string
	timerHours?: string
	timerMinutes?: string
	timerSeconds?: string
	showYears?: boolean
	showMonths?: boolean
	showDays?: boolean
}

const lbl = 'text-[10px] font-semibold tracking-[0.25em] uppercase text-muted'

const Clock = ({ 
	title, 
	timerYears = '00', 
	timerMonths = '00', 
	timerDays = '00', 
	timerHours = '00', 
	timerMinutes = '00', 
	timerSeconds = '00',
	showYears = false,
	showMonths = false,
	showDays = false
}: Props) => {
	const hasCalendar = showYears || showMonths || showDays

	return (
		<div className="flex flex-col items-center gap-8 px-8 text-center">
			<p className="text-xs font-medium tracking-[0.35em] uppercase text-muted">{title}</p>

			{hasCalendar && (
				<div className="flex items-end gap-10">
					{showYears && (
						<div className="flex flex-col items-center gap-2 w-20">
							<span className="text-5xl font-light text-secondary tabular-nums leading-none">{timerYears}</span>
							<span className={lbl}>Years</span>
						</div>
					)}
					{showMonths && (
						<div className="flex flex-col items-center gap-2 w-20">
							<span className="text-5xl font-light text-secondary tabular-nums leading-none">{timerMonths}</span>
							<span className={lbl}>Months</span>
						</div>
					)}
					{showDays && (
						<div className="flex flex-col items-center gap-2 w-20">
							<span className="text-5xl font-light text-secondary tabular-nums leading-none">{timerDays}</span>
							<span className={lbl}>Days</span>
						</div>
					)}
				</div>
			)}

			{hasCalendar && (
				<div className="w-56 h-px bg-gradient-to-r from-transparent via-tertiary/25 to-transparent" />
			)}

			{/*
			 * Two-row layout with fixed column widths solves shifting:
			 * numbers row and labels row share identical w- values,
			 * invisible colon spacers keep label columns aligned.
			 */}
			<div className="flex flex-col items-center gap-3">
				<div className="flex items-center">
					<span className="text-6xl font-bold text-quarnary tabular-nums leading-none w-24 text-center">{timerHours}</span>
					<span className="text-3xl font-extralight text-quarnary/30 leading-none w-10 text-center">:</span>
					<span className="text-6xl font-bold text-quarnary tabular-nums leading-none w-24 text-center">{timerMinutes}</span>
					<span className="text-3xl font-extralight text-quarnary/30 leading-none w-10 text-center">:</span>
					<span className="text-6xl font-bold text-quarnary tabular-nums leading-none w-24 text-center">{timerSeconds}</span>
				</div>
				<div className="flex items-center">
					<span className={`${lbl} w-24 text-center`}>Hours</span>
					<span className="w-10 invisible select-none text-xs">:</span>
					<span className={`${lbl} w-24 text-center`}>Minutes</span>
					<span className="w-10 invisible select-none text-xs">:</span>
					<span className={`${lbl} w-24 text-center`}>Seconds</span>
				</div>
			</div>
		</div>
	)
}

export default Clock
