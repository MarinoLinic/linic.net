import { useState } from 'react'
import { Link } from 'react-router-dom'
import SalaryChart from '../components/SalaryChart'

const prirez_gradovi: any = {
	'Zagreb (18%)': 0.18,
	'Split (15%)': 0.15,
	'Rijeka (14%)': 0.14,
	'Osijek (13%)': 0.13,
	'Zadar (12%)': 0.12,
	'Velika gorica (12%)': 0.12,
	'Pula (12%)': 0.12,
	'Slavonski brod (6%)': 0.06,
	'Karlovac (9%)': 0.09,
	'Varaždin (7.5%)': 0.075,
	'Sisak (10%)': 0.1,
	'Dubrovnik (10%)': 0.1,
	'8%': 0.8,
	'7%': 0.7,
	'5%': 0.5,
	'4%': 0.4,
	'3%': 0.3,
	'2%': 0.2,
	'1%': 0.1,
	'Bez prireza (0%)': 0
}

const SalaryCalculator = () => {
	const [brutoPlaca, setBrutoPlaca] = useState(1000)
	const [koeficijent, setKoeficijent] = useState(0)
	const [grad, setGrad] = useState(prirez_gradovi['Zagreb (18%)'])

	let currency = '€'

	function brutoHandler(input: number) {
		if (isNaN(input)) setBrutoPlaca(0)
		else setBrutoPlaca(input)
	}

	function izracun_place(bruto: number, koeficijent: number, prirez: number) {
		// sanitization (incomplete)
		// add percentage if 0 entered, and add default value elsewhere if bruto is NaN (empty)
		if (isNaN(koeficijent) || koeficijent < 0) koeficijent = 0

		let porez, izracun
		let osnovica_eur = 331.81
		let mirovinsko_stopa = 0.15 + 0.05 // 20%
		let minimalac_eur = 530.9
		let porezna_granica_eur = 3981.69
		let odbitak = koeficijent * osnovica_eur + minimalac_eur
		let mirovinsko = bruto * mirovinsko_stopa

		// određivanje stope poreza
		porez = bruto - mirovinsko - odbitak < porezna_granica_eur ? 0.2 : 0.3

		// ne oporezuje se ništa ispod neto koji je manji ili odgovara odbitku
		if (bruto - mirovinsko > odbitak) {
			izracun = bruto - mirovinsko - (bruto - mirovinsko - odbitak) * porez * (1 + prirez)
		} else izracun = bruto - mirovinsko

		return izracun // neto
	}

	let netoPlaca = izracun_place(brutoPlaca, koeficijent, grad)

	const gradovi = Object.keys(prirez_gradovi)

	/////

	const osnovica = 331.81
	let statistike: any = [
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
		let net = izracun_place(osnovica * i, koeficijent, grad)
		let percent = (100 - (net / (osnovica * i)) * 100).toFixed(2)
		let obj = {
			bruto: osnovica * i,
			postotak: percent,
			neto: net,
			razlika: osnovica * i - net
		}
		statistike.push(obj)

		if (osnovica * (i + 1) > brutoPlaca && osnovica * i < brutoPlaca) {
			let ff = {
				bruto: brutoPlaca,
				postotak: (100 - (netoPlaca / brutoPlaca) * 100).toFixed(2),
				neto: parseFloat(netoPlaca.toFixed(2)),
				razlika: parseFloat((brutoPlaca - netoPlaca).toFixed(2))
			}
			statistike.push(ff)
		}
	}

	/////

	const mainStats = [
		['my-0 text-text', 'text-text', 'Bruto mjesečno:', brutoPlaca.toFixed(2), currency],
		['my-0 text-text', 'text-tertiary', 'Neto mjesečno:', netoPlaca.toFixed(2), currency],
		['my-0 text-text', 'text-quarternary', 'Mjesečna razlika:', (netoPlaca - brutoPlaca).toFixed(2), currency],
		[
			'my-4 text-secondary',
			'text-secondary',
			'Sveukupni porez:',
			`${(100 - (netoPlaca / brutoPlaca) * 100).toFixed(2)}%`,
			'plaće'
		],
		['my-0 text-text', 'text-text', 'Bruto godišnje:', (brutoPlaca * 12).toFixed(2), currency],
		['my-0 text-text', 'text-text', 'Neto godišnje:', (netoPlaca * 12).toFixed(2), currency],
		['my-0 text-text', 'text-text', 'Godišnja razlika:', (netoPlaca * 12 - brutoPlaca * 12).toFixed(2), currency]
	]

	const secondStats = [
		['my-0 text-text', 'text-text', 'Stopa mirovinskog (čl. 62):', '20%', ''],
		['my-0 text-text', 'text-quarternary', 'Iznos plaće nakon mirovinskog:', brutoPlaca * 0.8, currency],
		['my-0 text-text', 'text-text', 'Neoporezivi minimalac (čl. 14):', 530.9, currency],
		[
			'my-0 text-text',
			'text-secondary',
			'Iznos za oporezivanje (koeficijent = 0):',
			brutoPlaca * 0.8 - 530.9,
			currency
		],
		['my-0 text-text', 'text-text', 'Stopa poreza:', '20%', ''],
		['my-0 text-text', 'text-text', 'Stopa poreza je 30% (čl. 24) nakon:', 3981.69, currency],
		['my-0 text-primary', 'text-text', '(^ Može varirati po mjestu prebivališta - Poglavlje IV.)', '', ''],
		['my-0 text-text', 'text-secondary', 'Iznos poreza:', ((brutoPlaca * 0.8 - 530.9) * 0.2).toFixed(2), currency],
		[
			'my-0 text-text',
			'text-secondary',
			'Iznos prireza' + ' (' + (grad * 100).toFixed(0) + '%) :',
			-((brutoPlaca * 0.8 - 530.9) * 0.2 - (brutoPlaca * 0.8 - 530.9) * 0.2 * (1 + grad)).toFixed(2),
			currency
		],
		[
			'my-0 text-text',
			'text-quarternary',
			'Konačni iznos plaće:',
			`${(brutoPlaca * 0.8 - 530.9 - (brutoPlaca * 0.8 - 530.9) * 0.2 * (1 + grad) + 530.9).toFixed(2)}`,
			currency
		]
	]

	return (
		<div className="flex flex-col items-center mt-16 text-xl font-semibold leading-relaxed">
			<h2 className="mb-4 text-text text-center">Porez na dohodak u Hrvatskoj</h2>
			<p>Grad (prirez)</p>
			<select
				title="gradovi"
				name="gradovi"
				className="bg-text text-primary mb-4 text-center font-extrabold text-xl md:text-2xl"
				onChange={(e) => setGrad(prirez_gradovi[e.target.value])}>
				{gradovi.map((grad, prirez) => (
					<option value={grad}>{grad}</option>
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
			<p>Bruto iznos</p>
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
				{mainStats.map(([margin, color, desc, value, currency]) => (
					<div key={desc} className={`${margin}`}>
						{desc}{' '}
						<span className={`${color}`}>
							{value} {currency}
						</span>
					</div>
				))}
			</div>

			{/* Chart */}
			<div className="my-8">
				<SalaryChart dataArr={statistike} />
			</div>

			{/* Calculation */}
			<div>
				{secondStats.map(([margin, color, desc, value, currency]) => (
					<div key={desc} className={`${margin} text-base`}>
						{desc}{' '}
						<span className={`${color}`}>
							{value} {currency}
						</span>
					</div>
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
				<p className="">
					Autor projekta: <Link to="/">Marino Linić</Link>
				</p>
			</div>
		</div>
	)
}

// TODO: Add key as prop
// TODO: Add VAT

/* 
					['my-0 text-text', 'text-text', 'Bruto po satu:', (brutoPlaca / 22 / 8).toFixed(2), valuta],
					['my-0 text-text', 'text-text', 'Neto po satu:', (netoPlaca / 22 / 8).toFixed(2), valuta],
					[
						'my-0 text-text',
						'text-text',
						'Razlika po satu:',
						(netoPlaca / 22 / 8 - brutoPlaca / 22 / 8).toFixed(2),
						valuta
					],
*/

export default SalaryCalculator
