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
	ReferenceArea
} from 'recharts'

const SalaryChart = ({ dataArr }: any) => {
	console.table(dataArr)
	return (
		<div className="w-96 h-96 md:w-[700px] md:h-[350px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={dataArr}>
					<Line type="monotone" dataKey="postotak" stroke="#646cff" fill="none" dot={false} />
					<XAxis
						type="number"
						dataKey="value"
						tick={{ fontSize: 10 }}
						label={{ value: 'Bruto plaća', fill: '#777', dy: 10, fontSize: 15 }}
					/>
					<YAxis
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
					<Tooltip />
					<ReferenceLine
						x={dataArr[0].datapointS}
						stroke="#eb6171"
						label={{ value: `${dataArr[0].datapoint}%`, fill: '#eb6171', dy: -60, dx: 40 }}
						ifOverflow="extendDomain"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default SalaryChart
