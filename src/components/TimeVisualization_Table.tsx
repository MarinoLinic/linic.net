const TimeTable = ({ timeObj, desc }: any) => {
	return (
		<section>
			{Object.entries(timeObj).map(([key, value]) => (
				<p key={key}>
					{key.charAt(0).toUpperCase() + key.slice(1)} {desc}: {value}
				</p>
			))}
		</section>
	)
}

export default TimeTable
