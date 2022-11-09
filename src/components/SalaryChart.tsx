import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Area,
	AreaChart,
	ReferenceLine,
	ReferenceArea,
	Legend
} from 'recharts'

const SalaryChart = ({ dataArr }: any) => {
	console.table(dataArr)
	return (
		<div className="w-96 h-96 md:w-[700px] md:h-[350px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={dataArr}>
					<XAxis
						type="number"
						dataKey="bruto"
						tick={{ fontSize: 10 }}
						label={{ value: 'Bruto plaća', fill: '#777', dy: 10, fontSize: 15 }}
					/>
					<YAxis
						orientation="left"
						tick={{ fontSize: 20 }}
						label={{
							value: 'Postotak (%)',
							position: 'insideLeft',
							angle: -90,
							dy: 50,
							fill: '#777',
							fontSize: 15
						}}
					/>
					<Line type="monotone" dataKey="postotak" stroke="#646cff" fill="none" dot={false} />
					<Tooltip />
					<ReferenceLine
						x={dataArr[0].datapointS}
						stroke="#eb6171"
						label={{ value: `${dataArr[0].datapoint}%`, fill: '#eb6171', dy: -60, dx: 40 }}
						ifOverflow="extendDomain"
					/>
				</LineChart>
			</ResponsiveContainer>

			<br />
			<br />

			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={dataArr}>
					<XAxis
						type="number"
						dataKey="bruto"
						tick={{ fontSize: 10 }}
						label={{ value: 'Bruto plaća', fill: '#777', dy: 10, fontSize: 15 }}
					/>
					<YAxis fontSize={10} />
					<Area type="monotone" dataKey="bruto" stroke="#646cff" fill="none" dot={false} />
					<Area type="monotone" dataKey="neto" stroke="#d65f9e" fill="none" dot={false} />
					<Area type="monotone" dataKey="razlika" stroke="#ffe69d" fill="#ffe69d" dot={false} />
					<Tooltip />
					<Legend />
					<ReferenceLine
						x={dataArr[0].datapointS}
						stroke="#eb6171"
						label={{ value: `${dataArr[0].datapointN} kn`, fill: '#eb6171', dy: -60, dx: 45 }}
						ifOverflow="extendDomain"
					/>
				</AreaChart>
			</ResponsiveContainer>

			<br />
			<br />
			<br />
		</div>
	)
}

export default SalaryChart
