import { useState } from 'react'
import { Link } from 'react-router-dom'
import SalaryChart from '../components/SalaryCalculator_SalaryChart'
import BackButton from '../components/_BackButton'

const prirez_gradovi: Record<string, number> = {
	'Zagreb (18%)': 0.18,
	'Split (15%)': 0.15,
	'Rijeka (13%)': 0.13,
	'Osijek (13%)': 0.13,
	'Zadar (12%)': 0.12,
	'Velika gorica (12%)': 0.12,
	'Pula (12%)': 0.12,
	'Slavonski brod (6%)': 0.06,
	'Karlovac (9%)': 0.09,
	'Varaždin (7.5%)': 0.075,
	'Sisak (10%)': 0.1,
	'Dubrovnik (10%)': 0.1,
	'8%': 0.08,
	'7%': 0.07,
	'5%': 0.05,
	'4%': 0.04,
	'3%': 0.03,
	'2%': 0.02,
	'1%': 0.01,
	'Bez prireza (0%)': 0
}

interface Stat {
	label: string
	value: string | number
	suffix?: string
	labelClass?: string
	valueClass?: string
}

const StatRow = ({ label, value, suffix = '', labelClass = '', valueClass = '' }: Stat) => (
	<div className={labelClass}>
		{label} <span className={valueClass}>{value}{suffix ? ` ${suffix}` : ''}</span>
	</div>
)

function izracun_place(bruto: number, koeficijent: number, prirez: number): number {
	if (isNaN(koeficijent) || koeficijent < 0) koeficijent = 0

	const osnovica_eur = 331.81
	const mirovinsko_stopa = 0.2 // 15% + 5%
	const minimalac_eur = 530.9
	const porezna_granica_eur = 3981.69
	const odbitak = koeficijent * osnovica_eur + minimalac_eur
	const mirovinsko = bruto * mirovinsko_stopa
	const porez = bruto - mirovinsko - odbitak < porezna_granica_eur ? 0.2 : 0.3

	return bruto - mirovinsko > odbitak
		? bruto - mirovinsko - (bruto - mirovinsko - odbitak) * porez * (1 + prirez)
		: bruto - mirovinsko
}

const SalaryCalculator = () => {
	const [brutoPlaca, setBrutoPlaca] = useState(1300)
	const [koeficijent, setKoeficijent] = useState(0)
	const [grad, setGrad] = useState(prirez_gradovi['Zagreb (18%)'])

	const currency = '€'
	const gradovi = Object.keys(prirez_gradovi)

	function brutoHandler(input: number) {
		setBrutoPlaca(isNaN(input) ? 0 : input)
	}

	const netoPlaca = izracun_place(brutoPlaca, koeficijent, grad)

	const osnovica = 331.81
	const statistike: any[] = [
		{
			bruto: 1,
			postotak: (20).toFixed(2),
			neto: 0.8,
			razlika: 0.2,
			datapointS: brutoPlaca,
			datapoint: (100 - (izracun_place(brutoPlaca, koeficijent, grad) / brutoPlaca) * 100).toFixed(2),
			datapointN: netoPlaca
		}
	]
	for (let i = 1; i < 25; i++) {
		const net = izracun_place(osnovica * i, koeficijent, grad)
		const percent = (100 - (net / (osnovica * i)) * 100).toFixed(2)
		statistike.push({ bruto: osnovica * i, postotak: percent, neto: net, razlika: osnovica * i - net })

		if (osnovica * (i + 1) > brutoPlaca && osnovica * i < brutoPlaca) {
			statistike.push({
				bruto: brutoPlaca,
				postotak: (100 - (netoPlaca / brutoPlaca) * 100).toFixed(2),
				neto: parseFloat(netoPlaca.toFixed(2)),
				razlika: parseFloat((brutoPlaca - netoPlaca).toFixed(2))
			})
		}
	}

	const nakonMirovinskog = brutoPlaca * 0.8
	const oporeziviBruto = nakonMirovinskog - 530.9
	const prirezPostotak = (grad * 100).toFixed(0)

	const mainStats: Stat[] = [
		{ label: 'Bruto mjesečno:', value: brutoPlaca.toFixed(2), suffix: currency },
		{ label: 'Neto mjesečno:', value: netoPlaca.toFixed(2), suffix: currency, valueClass: 'text-tertiary' },
		{ label: 'Mjesečna razlika:', value: (netoPlaca - brutoPlaca).toFixed(2), suffix: currency, valueClass: 'text-quarternary' },
		{ label: 'Sveukupni porez:', value: `${(100 - (netoPlaca / brutoPlaca) * 100).toFixed(2)}%`, suffix: 'plaće', labelClass: 'my-4 text-secondary', valueClass: 'text-secondary' },
		{ label: 'Bruto godišnje:', value: (brutoPlaca * 12).toFixed(2), suffix: currency },
		{ label: 'Neto godišnje:', value: (netoPlaca * 12).toFixed(2), suffix: currency },
		{ label: 'Godišnja razlika:', value: (netoPlaca * 12 - brutoPlaca * 12).toFixed(2), suffix: currency }
	]

	const secondStats: Stat[] = [
		{ label: 'Stopa mirovinskog (čl. 62):', value: '20%' },
		{ label: 'Iznos plaće nakon mirovinskog:', value: nakonMirovinskog, suffix: currency, valueClass: 'text-quarternary' },
		{ label: 'Neoporezivi minimalac (čl. 14):', value: 530.9, suffix: currency },
		{ label: 'Iznos za oporezivanje (koeficijent = 0):', value: oporeziviBruto, suffix: currency, valueClass: 'text-secondary' },
		{ label: 'Stopa poreza:', value: '20%' },
		{ label: 'Stopa poreza je 30% (čl. 24) nakon:', value: 3981.69, suffix: currency },
		{ label: '(^ Može varirati po mjestu prebivališta - Poglavlje IV.)', value: '', labelClass: 'text-primary' },
		{ label: 'Iznos poreza:', value: (oporeziviBruto * 0.2).toFixed(2), suffix: currency, valueClass: 'text-secondary' },
		{ label: `Iznos prireza (${prirezPostotak}%):`, value: (oporeziviBruto * 0.2 * grad).toFixed(2), suffix: currency, valueClass: 'text-secondary' },
		{ label: 'Konačni iznos plaće:', value: (oporeziviBruto - oporeziviBruto * 0.2 * (1 + grad) + 530.9).toFixed(2), suffix: currency, valueClass: 'text-quarternary' }
	]

	return (
		<div className="flex flex-col items-center pt-12 pb-8 min-h-screen text-xl font-semibold leading-relaxed">
			<BackButton />
			<h2 className="mb-4 text-text text-center">Porez na dohodak u Hrvatskoj</h2>
			<p>
				Grad (prirez){' '}
				<a href="https://www.rrif.hr/pregled_stopa_prireza_porezu_na_dohodak-5-strucnainformacija/">?</a>
			</p>
			<select
				title="gradovi"
				name="gradovi"
				className="bg-text text-primary mb-4 text-center font-extrabold text-xl md:text-2xl"
				onChange={(e) => setGrad(prirez_gradovi[e.target.value])}>
				{gradovi.map((grad) => (
					<option key={grad} value={grad}>{grad}</option>
				))}
			</select>
			<p>
				Koeficijent (invaliditet, djeca) <a href="https://i.imgur.com/cLqPuOE.png">?</a>
			</p>
			<input
				className="bg-text text-primary mb-4 text-center font-extrabold text-2xl md:text-3xl"
				type="text"
				name="coefficient"
				autoComplete="off"
				placeholder={koeficijent.toString()}
				onChange={(e) => setKoeficijent(parseFloat(e.target.value))}
			/>
			<p>Bruto iznos (EUR)</p>
			<input
				className="bg-text text-primary mb-8 text-center font-extrabold text-2xl md:text-3xl"
				type="text"
				name="bruto"
				autoComplete="off"
				placeholder={brutoPlaca.toString()}
				onChange={(e) => brutoHandler(parseFloat(e.target.value))}
			/>

			{/* Stats */}
			<div>
				{mainStats.map((stat) => (
					<StatRow key={stat.label} {...stat} />
				))}
			</div>

			{/* Chart */}
			<div className="my-8">
				<SalaryChart dataArr={statistike} />
			</div>

			{/* Calculation */}
			<div className="text-base">
				{secondStats.map((stat) => (
					<StatRow key={stat.label} {...stat} />
				))}
			</div>

			{/* Footer */}
			<div className="my-8">
				<p>
					Pročitajte više:{' '}
					<a href="https://www.zakon.hr/z/85/Zakon-o-porezu-na-dohodak">
						https://www.zakon.hr/z/85/Zakon-o-porezu-na-dohodak
					</a>
				</p>
				<p>
					Autor projekta: <Link to="/">Marino Linić</Link>
				</p>
			</div>
		</div>
	)
}

// TODO: Add VAT

export default SalaryCalculator
