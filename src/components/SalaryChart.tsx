import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const SalaryChart = ({ dataArr }: any) => {
	console.log(dataArr)
	return (
		<div className="w-96 h-96 md:w-[700px] md:h-[350px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={dataArr}>
					<Line type="monotone" dataKey="postotak" stroke="#8884d8" />
					<XAxis
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
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default SalaryChart
