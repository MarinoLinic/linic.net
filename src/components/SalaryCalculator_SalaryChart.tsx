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

const fmt = (n: number) => n.toFixed(2)

const CustomTooltip = ({ active, payload, t }: any) => {
	if (!active || !payload?.length) return null
	const d = payload[0].payload
	return (
		<div className="bg-surface2 border border-divider rounded-lg px-3 py-2 text-sm font-mono">
			<p className="text-muted mb-1">{fmt(d.bruto)}€ {t?.chartGross?.split(' ')[0]?.toLowerCase() || 'bruto'}</p>
			<p className="text-tertiary-light">{t?.chartNet || 'neto'}: {fmt(d.neto)}€</p>
			<p className="text-quarternary">{t?.chartDiff || 'razlika'}: {fmt(d.razlika)}€</p>
		</div>
	)
}

const PercentTooltip = ({ active, payload, t }: any) => {
	if (!active || !payload?.length) return null
	const d = payload[0].payload
	return (
		<div className="bg-surface2 border border-divider rounded-lg px-3 py-2 text-sm font-mono">
			<p className="text-muted">{fmt(d.bruto)}€ {t?.chartGross?.split(' ')[0]?.toLowerCase() || 'bruto'}</p>
			<p className="text-tertiary-light">{t?.chartTax || 'porez'}: {d.postotak}%</p>
		</div>
	)
}

const SalaryChart = ({ dataArr, t }: any) => {
	const grossLabel = t?.chartGross || 'Bruto plaća'
	const pctLabel = t?.chartPercent || 'Postotak (%)'
	const netLabel = t?.chartNet || 'neto'
	const diffLabel = t?.chartDiff || 'razlika'

	return (
		<>
			<div className="w-full h-72 md:h-[350px]">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={dataArr}>
						<XAxis type="number" dataKey="bruto" tick={{ fontSize: 10, fill: '#8c8aa8' }} label={{ value: grossLabel, fill: '#8c8aa8', dy: 10, fontSize: 13 }} />
						<YAxis orientation="left" tick={{ fontSize: 12, fill: '#8c8aa8' }} label={{ value: pctLabel, position: 'insideLeft', angle: -90, dy: 50, fill: '#8c8aa8', fontSize: 13 }} />
						<Line type="monotone" dataKey="postotak" stroke="#7c70ff" fill="none" dot={false} />
						<Tooltip content={<PercentTooltip t={t} />} />
						<ReferenceLine x={dataArr[0].datapointS} stroke="#ff5c7c" label={{ value: `${dataArr[0].datapoint}%`, fill: '#ff5c7c', dy: -60, dx: 40 }} ifOverflow="extendDomain" />
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="w-full h-72 md:h-[350px] mt-6">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={dataArr}>
						<XAxis type="number" dataKey="bruto" tick={{ fontSize: 10, fill: '#8c8aa8' }} label={{ value: grossLabel, fill: '#8c8aa8', dy: 10, fontSize: 13 }} />
						<YAxis fontSize={10} tick={{ fill: '#8c8aa8' }} />
						<Area type="monotone" dataKey="bruto" stroke="#60a5fa" fill="none" dot={false} name={t?.gross || 'bruto'} />
						<Area type="monotone" dataKey="neto" stroke="#7c70ff" fill="none" dot={false} name={netLabel} />
						<Area type="monotone" dataKey="razlika" stroke="#ff5c7c" fill="#ff5c7c" fillOpacity={0.15} dot={false} name={diffLabel} />
						<Tooltip content={<CustomTooltip t={t} />} />
						<Legend wrapperStyle={{ color: '#8c8aa8', fontSize: 12 }} />
						<ReferenceLine x={dataArr[0].datapointS} stroke="#ff5c7c" label={{ value: `${fmt(dataArr[0].datapointN)}€`, fill: '#ff5c7c', dy: -60, dx: 65 }} ifOverflow="extendDomain" />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</>
	)
}

export default SalaryChart
