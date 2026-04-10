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
	'6%': 0.06,
	'5%': 0.05,
	'4%': 0.04,
	'3%': 0.03,
	'2%': 0.02,
	'1%': 0.01,
	'Bez prireza (0%)': 0
}

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

const perChildCoef = [0.7, 1.0, 1.4, 1.9, 2.5, 3.2, 4.0, 4.9, 5.9]

function djeceKoef(n: number): number {
	if (n <= 0) return 0
	let total = 0
	for (let i = 0; i < Math.min(n, 9); i++) total += perChildCoef[i]
	if (n > 9) {
		let prev = 5.9, inc = 1.1
		for (let i = 10; i <= n; i++) { prev += inc; total += prev; inc += 0.1 }
	}
	return parseFloat(total.toFixed(1))
}

const Stepper = ({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (v: number) => void; min?: number }) => (
	<div className="flex items-center justify-between">
		<span className="text-muted text-sm">{label}</span>
		<div className="flex items-center gap-3">
			<button
				type="button"
				className="w-7 h-7 rounded-full border border-white/10 text-muted hover:text-text hover:border-white/20 font-mono text-sm flex items-center justify-center transition-colors"
				onClick={() => onChange(Math.max(min, value - 1))}>−</button>
			<span className="text-text font-mono w-4 text-center">{value}</span>
			<button
				type="button"
				className="w-7 h-7 rounded-full border border-white/10 text-muted hover:text-text hover:border-white/20 font-mono text-sm flex items-center justify-center transition-colors"
				onClick={() => onChange(value + 1)}>+</button>
		</div>
	</div>
)

const SalaryCalculator = () => {
	const [brutoPlaca, setBrutoPlaca] = useState(1300)
	const [grad, setGrad] = useState(prirez_gradovi['Zagreb (18%)'])
	const [djeca, setDjeca] = useState(0)
	const [clanovi, setClanovi] = useState(0)
	const [invalidnost, setInvalidnost] = useState(0)
	const [invalidnost100, setInvalidnost100] = useState(0)

	const koeficijent = parseFloat((djeceKoef(djeca) + clanovi * 0.7 + invalidnost * 0.4 + invalidnost100 * 1.5).toFixed(1))
	const gradovi = Object.keys(prirez_gradovi)
	const netoPlaca = izracun_place(brutoPlaca, koeficijent, grad)
	const taxPercent = brutoPlaca > 0 ? (100 - (netoPlaca / brutoPlaca) * 100) : 0
	const fmt = (n: number) => n.toFixed(2)

	const safeKoef = koeficijent
	const mirovinsko    = brutoPlaca * 0.2
	const nakonMirov    = brutoPlaca * 0.8
	const odbitak       = safeKoef * 331.81 + 530.9
	const oporezivaBaza = Math.max(0, nakonMirov - odbitak)
	const porezStopa    = oporezivaBaza < 3981.69 ? 0.2 : 0.3
	const iznosPoreza   = oporezivaBaza * porezStopa
	const iznosPrireza  = iznosPoreza * grad

	const osnovica = 331.81
	const ukupnoPorezPrirez = iznosPoreza + iznosPrireza
	const ukupnoOdbici = mirovinsko + ukupnoPorezPrirez

	const statistike: any[] = [{
		bruto: 1, postotak: (20).toFixed(2), neto: 0.8, razlika: 0.2,
		datapointS: brutoPlaca, datapoint: taxPercent.toFixed(2), datapointN: netoPlaca
	}]
	for (let i = 1; i < 25; i++) {
		const b = parseFloat((osnovica * i).toFixed(2))
		const net = parseFloat(izracun_place(b, koeficijent, grad).toFixed(2))
		const percent = (100 - (net / b) * 100).toFixed(2)
		statistike.push({ bruto: b, postotak: percent, neto: net, razlika: parseFloat((b - net).toFixed(2)) })
		if (osnovica * (i + 1) > brutoPlaca && osnovica * i < brutoPlaca) {
			statistike.push({
				bruto: parseFloat(brutoPlaca.toFixed(2)),
				postotak: taxPercent.toFixed(2),
				neto: parseFloat(netoPlaca.toFixed(2)),
				razlika: parseFloat((brutoPlaca - netoPlaca).toFixed(2))
			})
		}
	}

	return (
		<div className="max-w-3xl mx-auto px-4 md:px-8 pt-16 pb-12 min-h-screen">
			<BackButton />

			<div className="mb-10">
				<p className="text-muted text-xs uppercase tracking-widest font-mono mb-1">kalkulator</p>
				<h2 className="text-text">Porez na dohodak</h2>
				<p className="text-muted text-sm mt-1">
					Izračun neto plaće prema{' '}
					<a href="https://www.zakon.hr/z/85/Zakon-o-porezu-na-dohodak">Zakonu o porezu na dohodak</a>
				</p>
			</div>

			<div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10 mb-4">
				<div className="flex-1">
					<label className="text-xs text-muted uppercase tracking-wider block mb-1">Bruto plaća</label>
					<div className="flex items-baseline gap-1">
						<input
							className="bg-transparent text-secondary font-bold outline-none w-full border-b border-secondary/20 pb-1 font-mono text-4xl md:text-5xl placeholder:text-secondary/30"
							type="text" placeholder="1300" autoComplete="off"
							onChange={(e) => setBrutoPlaca(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
						/>
						<span className="text-secondary/50 text-2xl font-mono">€</span>
					</div>
				</div>
				<div>
					<label className="text-xs text-muted uppercase tracking-wider block mb-1">
						Grad — prirez{' '}
						<a href="https://www.rrif.hr/pregled_stopa_prireza_porezu_na_dohodak-5-strucnainformacija/">?</a>
					</label>
					<select
						title="gradovi"
						className="bg-transparent text-text font-semibold outline-none cursor-pointer w-full border-b border-white/10 pb-1 text-lg"
						onChange={(e) => setGrad(prirez_gradovi[e.target.value])}>
						{gradovi.map((g) => (
							<option key={g} value={g} className="bg-background">{g}</option>
						))}
					</select>
				</div>
			</div>

			<div className="space-y-2 mb-6">
				<p className="text-xs text-muted uppercase tracking-wider mb-2">
					Osobni odbitak{' '}
					<a href="https://i.imgur.com/cLqPuOE.png">?</a>
					{koeficijent > 0 && <span className="text-text font-mono normal-case ml-2">koef. {koeficijent.toFixed(1)}</span>}
				</p>
				<Stepper label="Uzdržavana djeca" value={djeca} onChange={setDjeca} />
				<Stepper label="Uzdržavani članovi obitelji" value={clanovi} onChange={setClanovi} />
				<Stepper label="Invalidnost (koef. 0,4)" value={invalidnost} onChange={setInvalidnost} />
				<Stepper label="Invalidnost 100% (koef. 1,5)" value={invalidnost100} onChange={setInvalidnost100} />
			</div>

			<hr className="opacity-10 mb-10" />

			<div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12 mb-4">
				<div>
					<p className="text-muted text-xs uppercase tracking-widest mb-2">Bruto</p>
					<p className="text-secondary text-5xl md:text-6xl font-bold font-mono leading-none">{fmt(brutoPlaca)}€</p>
				</div>
				<span className="text-quarternary text-3xl md:text-4xl font-bold font-mono">→</span>
				<div>
					<p className="text-muted text-xs uppercase tracking-widest mb-2">Neto</p>
					<p className="text-tertiary text-5xl md:text-6xl font-bold font-mono leading-none">{fmt(netoPlaca)}€</p>
				</div>
			</div>

			<span className="text-quarternary text-2xl md:text-3xl font-bold font-mono">−{fmt(brutoPlaca - netoPlaca)}€</span>
			<span className="text-quarternary text-lg font-mono ml-2">({taxPercent.toFixed(1)}%)</span>
			<p className="text-muted text-xs uppercase tracking-widest mt-1 mb-10">izgubljeno mjesečno</p>

			<p className="text-muted leading-relaxed">
				Godišnje: <span className="text-tertiary font-mono font-semibold text-lg">{fmt(netoPlaca * 12)}€</span> neto
				od <span className="text-secondary/80 font-mono">{fmt(brutoPlaca * 12)}€</span> bruto
				——— gubiš <span className="text-quarternary font-mono font-semibold text-lg">{fmt((brutoPlaca - netoPlaca) * 12)}€</span> godišnje
			</p>

			<hr className="opacity-10 my-12" />

			<SalaryChart dataArr={statistike} />

			<hr className="opacity-10 my-12" />

			<h3 className="text-text mb-1">Kako se izračunava?</h3>
			<p className="text-muted text-sm mb-10">Korak-po-korak izračun za zadani unos.</p>

			<div className="space-y-10">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="text-muted font-mono text-sm">01</span>
						<span className="text-text font-semibold">Mirovinsko osiguranje</span>
						<span className="text-muted font-mono text-xs">čl. 62</span>
					</div>
					<p className="text-muted text-sm mb-3">
						20% bruto plaće odlazi u mirovinsko osiguranje — 15% u I. stup i 5% u II. stup.
					</p>
					<p className="text-quarternary text-3xl font-bold font-mono">−{fmt(mirovinsko)}€</p>
					<p className="text-muted text-sm font-mono mt-1">preostaje {fmt(nakonMirov)}€</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="text-muted font-mono text-sm">02</span>
						<span className="text-text font-semibold">Osobni odbitak</span>
						<span className="text-muted font-mono text-xs">čl. 14</span>
					</div>
					<p className="text-muted text-sm mb-1">
						Neoporezivi dio plaće koji se ne oporezuje. Osnovni odbitak: <span className="text-text font-mono">530,90€</span>.
					</p>
					{safeKoef > 0 && (
						<div className="text-muted text-sm mb-1 space-y-0.5">
							{djeca > 0 && <p>Djeca ({djeca}): koef. <span className="text-text font-mono">{djeceKoef(djeca).toFixed(1)}</span></p>}
							{clanovi > 0 && <p>Uzdržavani članovi ({clanovi}): koef. <span className="text-text font-mono">{(clanovi * 0.7).toFixed(1)}</span></p>}
							{invalidnost > 0 && <p>Invalidnost ({invalidnost}): koef. <span className="text-text font-mono">{(invalidnost * 0.4).toFixed(1)}</span></p>}
							{invalidnost100 > 0 && <p>Invalidnost 100% ({invalidnost100}): koef. <span className="text-text font-mono">{(invalidnost100 * 1.5).toFixed(1)}</span></p>}
							<p>Ukupni koef. <span className="text-text font-mono">{koeficijent.toFixed(1)}</span> × 331,81€ = <span className="text-text font-mono">{fmt(koeficijent * 331.81)}€</span></p>
						</div>
					)}
					<p className="text-muted text-sm mb-3">
						Ukupni odbitak: <span className="text-text font-mono">{fmt(odbitak)}€</span>.
						Od prethodnih {fmt(nakonMirov)}€ oduzimamo {fmt(odbitak)}€ odbitka.
					</p>
					{oporezivaBaza > 0 ? (
						<>
							<p className="text-muted text-sm font-mono">{fmt(nakonMirov)}€ − {fmt(odbitak)}€ =</p>
							<p className="text-secondary text-3xl font-bold font-mono">{fmt(oporezivaBaza)}€</p>
							<p className="text-muted text-sm font-mono mt-1">oporeziva baza</p>
						</>
					) : (
						<>
							<p className="text-success text-3xl font-bold font-mono">Nema poreza</p>
							<p className="text-muted text-sm font-mono mt-1">prihod ispod odbitka — neto = {fmt(nakonMirov)}€</p>
						</>
					)}
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="text-muted font-mono text-sm">03</span>
						<span className="text-text font-semibold">Porez na dohodak</span>
						<span className="text-muted font-mono text-xs">čl. 24</span>
					</div>
					<p className="text-muted text-sm mb-3">
						Stopa od 20% do 3.981,69€, 30% iznad. Na oporezivoj bazi od <span className="text-text font-mono">{fmt(oporezivaBaza)}€</span> primjenjuje se stopa od {(porezStopa * 100).toFixed(0)}%.
					</p>
					<p className="text-muted text-sm font-mono">{fmt(oporezivaBaza)}€ × {(porezStopa * 100).toFixed(0)}% =</p>
					<p className="text-quarternary text-3xl font-bold font-mono">−{fmt(iznosPoreza)}€</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="text-muted font-mono text-sm">04</span>
						<span className="text-text font-semibold">Prirez ({(grad * 100).toFixed(0)}%)</span>
						<span className="text-muted font-mono text-xs">Pogl. IV.</span>
					</div>
					<p className="text-muted text-sm mb-3">
						Prirez lokalne samouprave — plaća se kao postotak izračunatog poreza od <span className="text-text font-mono">{fmt(iznosPoreza)}€</span>.
					</p>
					<p className="text-muted text-sm font-mono">{fmt(iznosPoreza)}€ × {(grad * 100).toFixed(0)}% =</p>
					<p className="text-quarternary text-3xl font-bold font-mono">−{fmt(iznosPrireza)}€</p>
				</div>
			</div>

			<hr className="opacity-10 my-12" />

			<h3 className="text-text mb-6">Ukupno</h3>
			<div className="space-y-3 mb-4">
				<div className="flex justify-between items-baseline">
					<span className="text-muted">Mirovinsko (I. + II. stup)</span>
					<span className="text-quarternary font-mono font-bold text-xl">−{fmt(mirovinsko)}€</span>
				</div>
				<div className="flex justify-between items-baseline">
					<span className="text-muted">Porez + prirez</span>
					<span className="text-quarternary font-mono font-bold text-xl">−{fmt(ukupnoPorezPrirez)}€</span>
				</div>
				<hr className="opacity-10" />
				<div className="flex justify-between items-baseline">
					<span className="text-muted">Ukupni odbici</span>
					<span className="text-quarternary font-mono font-bold text-2xl">−{fmt(ukupnoOdbici)}€</span>
				</div>
			</div>
			<div className="flex justify-between items-baseline mt-6">
				<span className="text-text text-lg font-semibold">Neto plaća</span>
				<span className="text-tertiary font-mono font-bold text-3xl">{fmt(netoPlaca)}€</span>
			</div>

			<hr className="opacity-10 my-12" />

			<p className="text-muted text-sm text-center">
				Autor: <Link to="/">Marino Linić</Link>
			</p>
		</div>
	)
}

export default SalaryCalculator
