import { useState } from 'react'
import { Link } from 'react-router-dom'
import SalaryChart from '../components/SalaryChart'

const prirez_gradovi: any = {
	Zagreb: 0.18,
	Split: 0.15,
	Rijeka: 0.14,
	Osijek: 0.13,
	Zadar: 0.12,
	'Velika gorica': 0.12,
	Pula: 0.12,
	'Slavonski brod': 0.06,
	Karlovac: 0.09,
	Varaždin: 0.075,
	Sisak: 0.1,
	Dubrovnik: 0.1,
	'Bez prireza': 0
}

const SalaryCalculator = () => {
	const [brutoPlaca, setBrutoPlaca] = useState(10000)
	const [koeficijent, setKoeficijent] = useState(0)
	const [grad, setGrad] = useState(prirez_gradovi['Zagreb'])

	let valuta = 'HRK'

	function brutoHandler(input: number) {
		if (isNaN(input)) setBrutoPlaca(0)
		else setBrutoPlaca(input)
	}

	function izracun_place(bruto: number, koeficijent: number, prirez: number) {
		// sanitization (incomplete)
		// add percentage if 0 entered, and add default value elsewhere if bruto is NaN (empty)
		if (isNaN(koeficijent) || koeficijent < 0) koeficijent = 0

		let porez, izracun
		let osnovica = 2500
		let mirovinsko_stopa = 0.15 + 0.05 // 20%
		let minimalac = 4000
		let porezna_granica = 30000
		let odbitak = koeficijent * osnovica + minimalac
		let mirovinsko = bruto * mirovinsko_stopa

		// određivanje stope poreza
		porez = bruto - mirovinsko - odbitak < porezna_granica ? 0.2 : 0.3

		// ne oporezuje se ništa ispod neto koji je manji ili odgovara odbitku
		if (bruto - mirovinsko > odbitak) {
			izracun = bruto - mirovinsko - (bruto - mirovinsko - odbitak) * porez * (1 + prirez)
		} else izracun = bruto - mirovinsko

		return izracun // neto
	}

	let netoPlaca = izracun_place(brutoPlaca, koeficijent, grad)

	const gradovi = Object.keys(prirez_gradovi)

	/////

	const osnovica = 2500
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
		['my-0 text-text', 'text-text', 'Bruto mjesečno:', brutoPlaca.toFixed(2), valuta],
		['my-0 text-text', 'text-tertiary', 'Neto mjesečno:', netoPlaca.toFixed(2), valuta],
		['my-0 text-text', 'text-quarternary', 'Mjesečna razlika:', (netoPlaca - brutoPlaca).toFixed(2), valuta],
		[
			'my-4 text-secondary',
			'text-secondary',
			'Sveukupni porez:',
			`${(100 - (netoPlaca / brutoPlaca) * 100).toFixed(2)}%`,
			'plaće'
		],
		['my-0 text-text', 'text-text', 'Bruto godišnje:', (brutoPlaca * 12).toFixed(2), valuta],
		['my-0 text-text', 'text-text', 'Neto godišnje:', (netoPlaca * 12).toFixed(2), valuta],
		['my-0 text-text', 'text-text', 'Godišnja razlika:', (netoPlaca * 12 - brutoPlaca * 12).toFixed(2), valuta]
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
			<p>Koeficijent</p>
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
			<div className="my-8">
				<SalaryChart dataArr={statistike} />
			</div>
			<div>
				<p className="my-8">
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
