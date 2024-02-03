const TimeTable = ({ timeObj, desc, chosen }: any) => {
	return (
		<section>
			{Object.entries(timeObj)
				.slice(1)
				.map(([key, value]) => (
					<p key={key} className={`${chosen == value ? 'text-quarnary' : ''}`}>
						{key.charAt(0).toUpperCase() + key.slice(1)} {desc}: {value}
					</p>
				))}
		</section>
	)
}

export default TimeTable
