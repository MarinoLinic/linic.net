import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SalaryChart from '../components/SalaryCalculator_SalaryChart'
import BackButton from '../components/_BackButton'
import { salaryTranslations, type SalaryLang } from '../i18n/salary'
import { usePageSEO } from '../hooks/usePageSEO'

const OSOBNI_ODBITAK = 600.00
const MIROVINSKO_STOPA = 0.20 // 15% I. stup + 5% II. stup
const MJESECNA_GRANICA = 5000.00 // čl. 24 st. 3

function izracun_place(bruto: number, koeficijent: number, nizaStopa: number, visaStopa: number): number {
	if (isNaN(koeficijent) || koeficijent < 0) koeficijent = 0

	const odbitak = OSOBNI_ODBITAK * (1 + koeficijent)
	const mirovinsko = bruto * MIROVINSKO_STOPA
	const osnovica = Math.max(0, bruto - mirovinsko - odbitak)

	const porezNizi = Math.min(osnovica, MJESECNA_GRANICA) * nizaStopa
	const porezVisi = Math.max(0, osnovica - MJESECNA_GRANICA) * visaStopa
	const porez = porezNizi + porezVisi

	return bruto - mirovinsko - porez
}

const perChildCoef = [0.5, 0.7, 1.0, 1.4, 1.9, 2.5, 3.2, 4.0, 4.9]

function djeceKoef(n: number): number {
	if (n <= 0) return 0
	let total = 0
	for (let i = 0; i < Math.min(n, 9); i++) total += perChildCoef[i]
	if (n > 9) {
		let prev = 4.9, inc = 1.1
		for (let i = 10; i <= n; i++) { prev += inc; total += prev; inc += 0.1 }
	}
	return parseFloat(total.toFixed(1))
}

const CITY_PRESETS = [
	{ name: 'Zagreb',         lower: 23.0, higher: 33.0 },
	{ name: 'Split',          lower: 21.5, higher: 32.0 },
	{ name: 'Rijeka',         lower: 20.0, higher: 25.0 },
	{ name: 'Osijek',         lower: 20.0, higher: 30.0 },
	{ name: 'Zadar',          lower: 20.0, higher: 30.0 },
	{ name: 'Slavonski Brod', lower: 20.0, higher: 30.0 },
	{ name: 'Pula',           lower: 22.0, higher: 32.0 },
	{ name: 'Karlovac',       lower: 19.0, higher: 29.0 },
	{ name: 'Varaždin',       lower: 21.0, higher: 32.0 },
	{ name: 'Šibenik',        lower: 20.0, higher: 30.0 },
	{ name: 'Sisak',          lower: 21.6, higher: 31.6 },
	{ name: 'Velika Gorica',  lower: 20.0, higher: 30.0 },
]

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
	usePageSEO()
	const { lang } = useParams<{ lang: string }>()
	const t = salaryTranslations[(lang === 'en' ? 'en' : 'hr') as SalaryLang]

	const [brutoPlaca, setBrutoPlaca] = useState(2000)
	const [nizaStopa, setNizaStopa] = useState(() => {
		const saved = localStorage.getItem('salaryTaxNizaStopa')
		return saved ? parseFloat(saved) : 23
	})
	const [visaStopa, setVisaStopa] = useState(() => {
		const saved = localStorage.getItem('salaryTaxVisaStopa')
		return saved ? parseFloat(saved) : 33
	})
	const [selectedCity, setSelectedCity] = useState<string | null>(() => localStorage.getItem('salaryTaxCity'))
	const [djeca, setDjeca] = useState(0)
	const [clanovi, setClanovi] = useState(0)
	const [invalidnost, setInvalidnost] = useState(0)
	const [invalidnost100, setInvalidnost100] = useState(0)

	useEffect(() => {
		localStorage.setItem('salaryTaxNizaStopa', nizaStopa.toString())
	}, [nizaStopa])

	useEffect(() => {
		localStorage.setItem('salaryTaxVisaStopa', visaStopa.toString())
	}, [visaStopa])

	useEffect(() => {
		if (selectedCity) localStorage.setItem('salaryTaxCity', selectedCity)
		else localStorage.removeItem('salaryTaxCity')
	}, [selectedCity])

	const handleNizaStopa = (v: number) => { setNizaStopa(v); setSelectedCity(null) }
	const handleVisaStopa = (v: number) => { setVisaStopa(v); setSelectedCity(null) }
	const applyCity = (city: typeof CITY_PRESETS[0]) => {
		setNizaStopa(city.lower); setVisaStopa(city.higher); setSelectedCity(city.name)
	}

	const koeficijent = parseFloat((djeceKoef(djeca) + clanovi * 0.5 + invalidnost * 0.3 + invalidnost100 * 1.0).toFixed(1))
	const nizaStopaDecimal = nizaStopa / 100
	const visaStopaDecimal = visaStopa / 100
	const netoPlaca = izracun_place(brutoPlaca, koeficijent, nizaStopaDecimal, visaStopaDecimal)
	const taxPercent = brutoPlaca > 0 ? (100 - (netoPlaca / brutoPlaca) * 100) : 0
	const fmt = (n: number) => n.toFixed(2)

	const safeKoef = koeficijent
	const mirovinsko    = brutoPlaca * MIROVINSKO_STOPA
	const nakonMirov    = brutoPlaca * (1 - MIROVINSKO_STOPA)
	const odbitak       = OSOBNI_ODBITAK * (1 + safeKoef)
	const oporezivaBaza = Math.max(0, nakonMirov - odbitak)
	const porezNizi     = Math.min(oporezivaBaza, MJESECNA_GRANICA) * nizaStopaDecimal
	const porezVisi     = Math.max(0, oporezivaBaza - MJESECNA_GRANICA) * visaStopaDecimal
	const iznosPoreza   = porezNizi + porezVisi

	const ukupnoOdbici = mirovinsko + iznosPoreza

	const CHART_MAX = 10000
	const CHART_STEPS = 20
	const chartStep = CHART_MAX / CHART_STEPS
	const statistike: any[] = [{
		bruto: 1, postotak: (20).toFixed(2), neto: 0.8, razlika: 0.2,
		datapointS: brutoPlaca, datapoint: taxPercent.toFixed(2), datapointN: netoPlaca
	}]
	for (let i = 1; i <= CHART_STEPS; i++) {
		const b = parseFloat((chartStep * i).toFixed(2))
		const net = parseFloat(izracun_place(b, koeficijent, nizaStopaDecimal, visaStopaDecimal).toFixed(2))
		const percent = (100 - (net / b) * 100).toFixed(2)
		statistike.push({ bruto: b, postotak: percent, neto: net, razlika: parseFloat((b - net).toFixed(2)) })
		if (chartStep * (i + 1) > brutoPlaca && chartStep * i < brutoPlaca) {
			statistike.push({
				bruto: parseFloat(brutoPlaca.toFixed(2)),
				postotak: taxPercent.toFixed(2),
				neto: parseFloat(netoPlaca.toFixed(2)),
				razlika: parseFloat((brutoPlaca - netoPlaca).toFixed(2))
			})
		}
	}

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-12 min-h-screen">
			<BackButton />

			<div className="mb-10">
				<div className="flex items-center justify-between mb-1">
					<p className="text-muted text-xs uppercase tracking-widest font-mono">{t.pageLabel}</p>
					<Link to={t.langSwitchPath} className="text-muted text-xs font-mono uppercase tracking-wider hover:text-text transition-colors">{t.langSwitch}</Link>
				</div>
				<h2 className="text-text">{t.pageTitle}</h2>
				<p className="text-muted text-sm mt-1" dangerouslySetInnerHTML={{ __html: t.pageSubtitle('https://www.zakon.hr/z/85/Zakon-o-porezu-na-dohodak') }} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 md:items-start mb-6">
				<div>
					<label className="text-xs text-muted uppercase tracking-wider block mb-1">{t.grossSalary}</label>
					<div className="flex items-baseline gap-1">
						<input
							className="bg-transparent text-secondary font-bold outline-none w-full border-b border-secondary/20 pb-1 font-mono text-3xl sm:text-4xl md:text-5xl placeholder:text-secondary/30"
							type="text" placeholder={t.placeholder} autoComplete="off"
							onChange={(e) => setBrutoPlaca(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
						/>
						<span className="text-secondary/50 text-xl sm:text-2xl font-mono">€</span>
					</div>
				</div>
				<div>
					<label className="text-xs text-muted uppercase tracking-wider block mb-1">
						{t.taxRatesLabel}{' '}
						<a href="https://www.zakon.hr/z/85/Zakon-o-porezu-na-dohodak">{t.taxRatesArticle}</a>
					</label>
					<div className="flex items-center gap-2 sm:gap-3 mb-3">
						<div className="flex items-baseline gap-1">
							<input
								className="bg-transparent text-text font-semibold outline-none w-14 border-b border-white/10 pb-1 text-lg font-mono text-center"
								type="number" value={nizaStopa} min={15} max={23} step={0.5}
								onChange={(e) => handleNizaStopa(parseFloat(e.target.value) || 0)}
							/>
							<span className="text-muted text-xs sm:text-sm">{t.lowerPct}</span>
						</div>
						<span className="text-muted">/</span>
						<div className="flex items-baseline gap-1">
							<input
								className="bg-transparent text-text font-semibold outline-none w-14 border-b border-white/10 pb-1 text-lg font-mono text-center"
								type="number" value={visaStopa} min={25} max={33} step={0.5}
								onChange={(e) => handleVisaStopa(parseFloat(e.target.value) || 0)}
							/>
							<span className="text-muted text-xs sm:text-sm">{t.higherPct}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<label className="text-xs text-muted uppercase tracking-wider shrink-0">{t.cityPresetsLabel}</label>
						<div className="relative">
							<select
								className="bg-surface border border-white/10 rounded text-xs font-mono text-muted outline-none py-0.5 pl-1.5 pr-6 appearance-none cursor-pointer hover:border-white/20 transition-colors"
								style={{ colorScheme: 'dark' }}
								value={selectedCity ?? ''}
								onChange={(e) => {
									const val = e.target.value
									if (!val) setSelectedCity(null)
									else applyCity(CITY_PRESETS.find(c => c.name === val)!)
								}}
							>
								<option value="" style={{ background: '#181626' }}>{t.cityPresetsPlaceholder}</option>
								{CITY_PRESETS.map(city => (
									<option key={city.name} value={city.name} style={{ background: '#181626' }}>
										{city.name} — {city.lower}% / {city.higher}%
									</option>
								))}
							</select>
							<span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted text-[10px] pointer-events-none">▾</span>
						</div>
						<a
							href="https://www.rrif.hr/stope_poreza_na_dohodak_za_isplate_od_1_sijecnja_2-13-strucnainformacija/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs font-mono shrink-0"
						>
							{t.cityPresetsSource} ↗
						</a>
					</div>
				</div>
			</div>

			<div className="space-y-2 mb-6">
				<p className="text-xs text-muted uppercase tracking-wider mb-2">
					{t.personalAllowanceLabel}
					{koeficijent > 0 && <span className="text-text font-mono normal-case ml-2">{t.coefLabel} {koeficijent.toFixed(1)}</span>}
				</p>
				<Stepper label={t.dependentChildren} value={djeca} onChange={setDjeca} />
				<Stepper label={t.dependentFamily} value={clanovi} onChange={setClanovi} />
				<Stepper label={t.disability03} value={invalidnost} onChange={setInvalidnost} />
				<Stepper label={t.disability10} value={invalidnost100} onChange={setInvalidnost100} />
			</div>

			<hr className="opacity-10 mb-10" />

			<div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-6 md:gap-10 mb-6">
				<div className="min-w-0">
					<p className="text-muted text-xs uppercase tracking-widest mb-1">{t.gross}</p>
					<p className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-none truncate">{fmt(brutoPlaca)}€</p>
				</div>
				<span className="text-quarternary text-xl sm:text-2xl md:text-3xl font-bold font-mono pb-1">→</span>
				<div className="min-w-0">
					<p className="text-muted text-xs uppercase tracking-widest mb-1">{t.net}</p>
					<p className="text-tertiary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-none truncate">{fmt(netoPlaca)}€</p>
				</div>
			</div>

			<div className="flex items-baseline gap-2 flex-wrap">
				<span className="text-quarternary text-xl sm:text-2xl md:text-3xl font-bold font-mono">−{fmt(brutoPlaca - netoPlaca)}€</span>
				<span className="text-quarternary text-sm sm:text-base font-mono">({taxPercent.toFixed(1)}%)</span>
				<span className="text-muted text-xs uppercase tracking-widest">{t.lostMonthly}</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-8 mb-2">
				<div>
					<p className="text-muted text-xs uppercase tracking-widest mb-1">{t.yearlyNet}</p>
					<p className="text-tertiary font-mono font-semibold text-lg">{fmt(netoPlaca * 12)}€</p>
				</div>
				<div>
					<p className="text-muted text-xs uppercase tracking-widest mb-1">{t.yearlyGross}</p>
					<p className="text-secondary/80 font-mono font-semibold text-lg">{fmt(brutoPlaca * 12)}€</p>
				</div>
				<div>
					<p className="text-muted text-xs uppercase tracking-widest mb-1">{t.yearlyLoss}</p>
					<p className="text-quarternary font-mono font-semibold text-lg">{fmt((brutoPlaca - netoPlaca) * 12)}€</p>
				</div>
			</div>

			<hr className="opacity-10 my-12" />

			<SalaryChart dataArr={statistike} t={t} />

			<hr className="opacity-10 my-12" />

			<h3 className="text-text mb-1">{t.howCalculated}</h3>
			<p className="text-muted text-sm mb-8">{t.howCalculatedSub}</p>

			<div className="space-y-8 sm:space-y-10">
				<div>
					<div className="flex items-baseline gap-2 mb-2 flex-wrap">
						<span className="text-muted font-mono text-xs">01</span>
						<span className="text-text font-semibold text-sm sm:text-base">{t.step01Title}</span>
						<span className="text-muted font-mono text-xs">{t.step01Article}</span>
					</div>
					<p className="text-muted text-sm mb-3">{t.step01Desc}</p>
					<p className="text-quarternary text-2xl sm:text-3xl font-bold font-mono">−{fmt(mirovinsko)}€</p>
					<p className="text-muted text-sm font-mono mt-1">{t.step01Remaining} {fmt(nakonMirov)}€</p>
				</div>

				<div>
					<div className="flex items-baseline gap-2 mb-2 flex-wrap">
						<span className="text-muted font-mono text-xs">02</span>
						<span className="text-text font-semibold text-sm sm:text-base">{t.step02Title}</span>
						<span className="text-muted font-mono text-xs">{t.step02Article}</span>
					</div>
					<p className="text-muted text-sm mb-1" dangerouslySetInnerHTML={{ __html: t.step02Desc(fmt(OSOBNI_ODBITAK)) }} />
					{safeKoef > 0 && (
						<div className="text-muted text-sm mb-1 space-y-0.5">
							{djeca > 0 && <p>{t.step02Children} ({djeca}): {t.coefLabel} <span className="text-text font-mono">{djeceKoef(djeca).toFixed(1)}</span></p>}
							{clanovi > 0 && <p>{t.step02Family} ({clanovi}): {t.coefLabel} <span className="text-text font-mono">{(clanovi * 0.5).toFixed(1)}</span></p>}
							{invalidnost > 0 && <p>{t.step02Disability} ({invalidnost}): {t.coefLabel} <span className="text-text font-mono">{(invalidnost * 0.3).toFixed(1)}</span></p>}
							{invalidnost100 > 0 && <p>{t.step02Disability100} ({invalidnost100}): {t.coefLabel} <span className="text-text font-mono">{(invalidnost100 * 1.0).toFixed(1)}</span></p>}
							<p>{t.step02TotalCoef} <span className="text-text font-mono">{koeficijent.toFixed(1)}</span> × {fmt(OSOBNI_ODBITAK)}€ = <span className="text-text font-mono">{fmt(koeficijent * OSOBNI_ODBITAK)}€</span></p>
						</div>
					)}
					<p className="text-muted text-sm mb-3" dangerouslySetInnerHTML={{ __html: t.step02TotalAllowance(fmt(odbitak)) + ' ' + t.step02SubtractFrom(fmt(nakonMirov), fmt(odbitak)) }} />
					{oporezivaBaza > 0 ? (
						<>
							<p className="text-muted text-sm font-mono">{fmt(nakonMirov)}€ − {fmt(odbitak)}€ =</p>
							<p className="text-secondary text-2xl sm:text-3xl font-bold font-mono">{fmt(oporezivaBaza)}€</p>
							<p className="text-muted text-sm font-mono mt-1">{t.step02TaxableBase}</p>
						</>
					) : (
						<>
							<p className="text-success text-2xl sm:text-3xl font-bold font-mono">{t.step02NoTax}</p>
							<p className="text-muted text-sm font-mono mt-1">{t.step02BelowAllowance(fmt(nakonMirov))}</p>
						</>
					)}
				</div>

				<div>
					<div className="flex items-baseline gap-2 mb-2 flex-wrap">
						<span className="text-muted font-mono text-xs">03</span>
						<span className="text-text font-semibold text-sm sm:text-base">{t.step03Title}</span>
						<span className="text-muted font-mono text-xs">{t.step03Article}</span>
					</div>
					<p className="text-muted text-sm mb-3">{t.step03Desc(nizaStopa, fmt(MJESECNA_GRANICA), visaStopa)}</p>
					{oporezivaBaza <= MJESECNA_GRANICA ? (
						<p className="text-muted text-sm font-mono">{fmt(oporezivaBaza)}€ × {nizaStopa}% =</p>
					) : (
						<div className="text-muted text-sm font-mono space-y-0.5 mb-1">
							<p>{fmt(MJESECNA_GRANICA)}€ × {nizaStopa}% = {fmt(porezNizi)}€</p>
							<p>{fmt(oporezivaBaza - MJESECNA_GRANICA)}€ × {visaStopa}% = {fmt(porezVisi)}€</p>
						</div>
					)}
					<p className="text-quarternary text-2xl sm:text-3xl font-bold font-mono">−{fmt(iznosPoreza)}€</p>
				</div>
			</div>

			<hr className="opacity-10 my-8 sm:my-12" />

			<h3 className="text-text mb-6">{t.totalLabel}</h3>
			<div className="space-y-3 mb-4">
				<div className="flex justify-between items-baseline">
					<span className="text-muted text-sm sm:text-base">{t.pensionLabel}</span>
					<span className="text-quarternary font-mono font-bold text-base sm:text-xl">−{fmt(mirovinsko)}€</span>
				</div>
				<div className="flex justify-between items-baseline">
					<span className="text-muted text-sm sm:text-base">{t.incomeTaxLabel}</span>
					<span className="text-quarternary font-mono font-bold text-base sm:text-xl">−{fmt(iznosPoreza)}€</span>
				</div>
				<hr className="opacity-10" />
				<div className="flex justify-between items-baseline">
					<span className="text-muted text-sm sm:text-base">{t.totalDeductions}</span>
					<span className="text-quarternary font-mono font-bold text-xl sm:text-2xl">−{fmt(ukupnoOdbici)}€</span>
				</div>
			</div>
			<div className="flex justify-between items-baseline mt-6">
				<span className="text-text text-lg font-semibold">{t.netSalary}</span>
				<span className="text-tertiary font-mono font-bold text-2xl sm:text-3xl">{fmt(netoPlaca)}€</span>
			</div>

			<hr className="opacity-10 my-12" />

			<p className="text-muted text-sm text-center">
				{t.author}: <Link to="/">Marino Linić</Link>
			</p>
		</div>
	)
}

export default SalaryCalculator
