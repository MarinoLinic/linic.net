import { useState } from 'react'

const SalaryCalculator = () => {
	// Porez na dohodak u Hrvatskoj
	const [brutoPlaca, setBrutoPlaca] = useState(10000)
	let valuta = 'HRK'

	function izracun_place(bruto: number) {
		let porez, izracun
		let prirez = 0.14 // Rijeka: 14%
		let mirovinsko = 0.2 // 20%
		let minimalac = 4000
		let porezna_granica = 30000

		// određivanje stope poreza
		porez = bruto - bruto * mirovinsko - minimalac < porezna_granica ? 0.2 : 0.3

		// ne oporezuje se ništa ispod neto koji je manji ili odgovara minimalcu
		if (bruto - bruto * mirovinsko > minimalac) {
			izracun = bruto - bruto * mirovinsko - (bruto - bruto * mirovinsko - minimalac) * porez * (1 + prirez)
		} else izracun = bruto - bruto * mirovinsko

		return izracun // neto
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen text-xl font-semibold leading-relaxed">
			<input
				className="bg-text text-primary mb-8 text-center font-extrabold text-3xl"
				type="text"
				name="bruto"
				value={brutoPlaca}
				autoComplete="off"
				placeholder={brutoPlaca.toString()}
				onChange={(e) => setBrutoPlaca(e.target.value)}
			/>
			<div>
				{[
					['my-0 text-text', 'text-text', 'Bruto mjesečno:', brutoPlaca, valuta],
					['my-0 text-text', 'text-tertiary', 'Neto mjesečno:', izracun_place(brutoPlaca).toFixed(2), valuta],
					[
						'my-0 text-text',
						'text-quarternary',
						'Mjesečna razlika:',
						(izracun_place(brutoPlaca) - brutoPlaca).toFixed(2),
						valuta
					],
					[
						'my-4 text-secondary',
						'text-secondary',
						'De facto porez:',
						`${(100 - (izracun_place(brutoPlaca) / brutoPlaca) * 100).toFixed(2)}%`,
						'plaće'
					],
					['my-0 text-text', 'text-text', 'Bruto godišnje:', (brutoPlaca * 12).toFixed(2), valuta],
					['my-0 text-text', 'text-text', 'Neto godišnje:', (izracun_place(brutoPlaca) * 12).toFixed(2), valuta],
					[
						'my-0 text-text',
						'text-quarternary',
						'Godišnja razlika:',
						(izracun_place(brutoPlaca) * 12 - brutoPlaca * 12).toFixed(2),
						valuta
					]
				].map(([margin, color, desc, value, currency]) => (
					<div key={desc} className={`${margin}`}>
						{desc}{' '}
						<span className={`${color}`}>
							{value} {currency}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default SalaryCalculator
