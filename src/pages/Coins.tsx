import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Navigation from '../components/_Navigation'
import FadeIn from '../components/pets/FadeIn'
import coinsData from '../data/coins.json'
import {
	ComposableMap,
	Geographies,
	Geography,
} from 'react-simple-maps'

/* ── flag image helper ─────────────────────────────── */

function getFlagUrl(iso: string): string {
	// Historical country codes → use a fallback icon
	const historical = ['AH', 'SU', 'CS', 'YU']
	if (historical.includes(iso)) {
		return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect fill="%23333" width="30" height="20"/><text x="15" y="15" font-size="12" text-anchor="middle" fill="%23888">🏛️</text></svg>'
	}
	// FlagCDN: w40 = 40px width, keeps aspect ratio
	return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`
}

/* ── types ──────────────────────────────────────────── */

interface Coin {
	country: string
	iso: string
	currency: string
	'denom.': string
	'sym.': string
	amount: number | string
	year: number
	period: string
	active: string
	copies: number | string
	magnetic: string
	unc: string
	mint: string
	'corr.': string
	commemorative: string
}

/* ── helpers ────────────────────────────────────────── */

const countrySlug = (name: string) =>
	name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

/*
 * world-atlas@2 only exposes { name } per country.
 * We map our coin country names → topojson country names so the choropleth
 * can color countries correctly (including historical entities).
 */
const COIN_TO_GEO: Record<string, string[]> = {
	'Austria-Hungary': ['Austria'],
	'Russian Empire': ['Russia'],
	'USSR': ['Russia'],
	'Czechoslovakia': ['Czechia', 'Czech Republic', 'Slovakia'],
	'Yugoslavia': ['Serbia', 'Bosnia and Herzegovina', 'Bosnia and Herz.', 'Croatia', 'Slovenia', 'Montenegro', 'North Macedonia', 'Macedonia', 'Kosovo'],
	'United Kingdom': ['United Kingdom', 'England'],
	'Bosnia & Herzegovina': ['Bosnia and Herzegovina', 'Bosnia and Herz.'],
	'Czechia': ['Czechia', 'Czech Republic', 'Czech Rep.'],
	'United States': ['United States', 'United States of America'],
}

/* reverse: topojson name → our coin country name(s) */
function buildGeoToCoinMap(coinCountries: string[]): Map<string, string[]> {
	const map = new Map<string, string[]>()
	for (const cc of coinCountries) {
		const geoNames = COIN_TO_GEO[cc] || [cc]
		for (const gn of geoNames) {
			const arr = map.get(gn) || []
			if (!arr.includes(cc)) arr.push(cc)
			map.set(gn, arr)
		}
		// also index by own name in case topojson matches exactly
		const arr = map.get(cc) || []
		if (!arr.includes(cc)) arr.push(cc)
		map.set(cc, arr)
	}
	return map
}

/* count every coin row as unique */
function getUniqueTypes(coins: Coin[]) {
	return coins
}

/* ── Numista image URL builder ─────────────────────── */
function getCoinImageUrl(coin: Coin): string {
	return `/coins/${countrySlug(coin.country)}-${coin.amount}-${coin['denom.'].replace(/\s+/g, '-')}-${coin.year}${coin.commemorative ? '-comm' : ''}.webp`
}

function getCoinFallbackSearch(coin: Coin): string {
	const q = encodeURIComponent(
		`${coin.country} ${coin.amount} ${coin['denom.']} ${coin.year}${coin.commemorative ? ' ' + coin.commemorative : ''}`
	)
	return `https://en.numista.com/catalogue/index.php?r=${q}&ct=coin`
}

/* ── constants ──────────────────────────────────────── */

const STEAMPUNK_GOLD = '#c9a84c'
const STEAMPUNK_COPPER = '#b87333'
const STEAMPUNK_BRASS = '#cd9b1d'
const STEAMPUNK_DARK = '#1a1510'
const STEAMPUNK_DARKER = '#0f0d09'
const STEAMPUNK_BORDER = 'rgba(201,168,76,0.25)'
const STEAMPUNK_TEXT = '#e8dcc8'
const STEAMPUNK_MUTED = '#8a7e6a'

/* ── main component ─────────────────────────────────── */

const Coins = () => {
	const coins = coinsData as Coin[]
	const rafRef = useRef<number>(0)
	const [progress, setProgress] = useState(0)
	const [activeId, setActiveId] = useState('')
	const [tocOpen, setTocOpen] = useState(false)
	const [filterCountry, setFilterCountry] = useState<string | null>(null)
	const [tooltipContent, setTooltipContent] = useState('')
	const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())
	const [hasImages, setHasImages] = useState(false)

	/* ── check if coin images directory has content ── */
	useEffect(() => {
		const testImg = new Image()
		testImg.onload = () => setHasImages(true)
		testImg.onerror = () => setHasImages(false)
		// test with a known likely-existing image
		testImg.src = '/coins/.exists'
	}, [])

	/* ── override body background for steampunk theme ── */
	useEffect(() => {
		const prev = document.body.style.backgroundImage
		document.body.style.backgroundImage = 'none'
		document.body.style.backgroundColor = STEAMPUNK_DARKER
		return () => {
			document.body.style.backgroundImage = prev
			document.body.style.backgroundColor = ''
		}
	}, [])

	/* ── derived data ──────────────────────────────── */

	const countriesMap = useMemo(() => {
		const map = new Map<string, Coin[]>()
		for (const coin of coins) {
			const arr = map.get(coin.country) || []
			arr.push(coin)
			map.set(coin.country, arr)
		}
		// sort by country name
		return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])))
	}, [coins])

	const countries = useMemo(() => [...countriesMap.keys()], [countriesMap])

	const geoToCoin = useMemo(() => buildGeoToCoinMap(countries), [countries])

	// unique coin type count per topojson geo name
	// Only count each country's coins ONCE on the geo they map to.
	// Historical countries (Yugoslavia etc.) split evenly across successors
	// but do NOT inflate the count of modern countries that also have their own coins.
	const uniqueCountByGeoName = useMemo(() => {
		const map = new Map<string, number>()
		for (const [country, countryCoins] of countriesMap) {
			const count = getUniqueTypes(countryCoins).length
			const geoNames = COIN_TO_GEO[country]
			if (geoNames) {
				// Historical entity: mark each successor with this country's count
				// but track separately so it doesn't add to the modern country's count
				for (const gn of geoNames) {
					const key = `__hist__${gn}`
					map.set(key, (map.get(key) || 0) + count)
				}
			} else {
				// Modern country: direct mapping
				map.set(country, (map.get(country) || 0) + count)
			}
		}
		return map
	}, [countriesMap])

	// For the map: get total relevant coin count for a geo name
	// (own coins only, not historical predecessors — keeps numbers honest)
	const getGeoCount = useCallback((geoName: string) => {
		return uniqueCountByGeoName.get(geoName) || 0
	}, [uniqueCountByGeoName])

	// For coloring: has ANY coins (including historical)
	const hasGeoCoins = useCallback((geoName: string) => {
		return (uniqueCountByGeoName.get(geoName) || 0) > 0 ||
			(uniqueCountByGeoName.get(`__hist__${geoName}`) || 0) > 0
	}, [uniqueCountByGeoName])

	// For the ToC: unique coin count per country name
	const uniqueCountByCountry = useMemo(() => {
		const map = new Map<string, number>()
		for (const [country, countryCoins] of countriesMap) {
			map.set(country, getUniqueTypes(countryCoins).length)
		}
		return map
	}, [countriesMap])

	const totalUnique = useMemo(() => getUniqueTypes(coins).length, [coins])

	const oldestYear = useMemo(() => Math.min(...coins.map(c => c.year)), [coins])
	const newestYear = useMemo(() => Math.max(...coins.map(c => c.year)), [coins])

	const filteredCountries = useMemo(() => {
		if (!filterCountry) return countries
		return countries.filter(c => c === filterCountry)
	}, [countries, filterCountry])

	/* ── scroll tracking ───────────────────────────── */

	useEffect(() => {
		const onScroll = () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = requestAnimationFrame(() => {
				const el = document.documentElement
				const scrolled = el.scrollTop
				const total = el.scrollHeight - el.clientHeight
				setProgress(total > 0 ? (scrolled / total) * 100 : 0)

				const threshold = window.innerHeight * 0.45
				const tocEls = document.querySelectorAll('[data-toc]')
				let current = ''
				for (const tocEl of tocEls) {
					if ((tocEl as HTMLElement).getBoundingClientRect().top <= threshold) current = tocEl.id
				}
				setActiveId(current)
			})
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current) }
	}, [])

	/* ── ToC navigation ────────────────────────────── */

	const tocRef = useRef<HTMLElement>(null)
	const tocClickRef = useRef(false)

	const handleTocClick = useCallback((id: string) => {
		tocClickRef.current = true
		const el = document.getElementById(id)
		if (!el) return
		el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		setTimeout(() => {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' })
			setTimeout(() => { tocClickRef.current = false }, 800)
		}, 800)
	}, [])

	useEffect(() => {
		if (tocClickRef.current) return
		const nav = tocRef.current
		if (!activeId || !nav) return
		const active = nav.querySelector(`[data-toc-id="${activeId}"]`) as HTMLElement | null
		if (!active) return
		const navRect = nav.getBoundingClientRect()
		const elRect = active.getBoundingClientRect()
		const elCenter = elRect.top + elRect.height / 2
		const topThreshold = navRect.top + navRect.height * 0.2
		const bottomThreshold = navRect.top + navRect.height * 0.8
		if (elCenter < topThreshold || elCenter > bottomThreshold) {
			const target = active.offsetTop - nav.clientHeight / 2 + active.offsetHeight / 2
			nav.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
		}
	}, [activeId])

	const currentLabel = useMemo(() => {
		if (!activeId) return ''
		const country = countries.find(c => countrySlug(c) === activeId)
		return country || ''
	}, [activeId, countries])

	/* ── map color scale ───────────────────────────── */

	const maxCount = useMemo(() => {
		let max = 1
		for (const [key, val] of uniqueCountByGeoName) {
			if (!key.startsWith('__hist__') && val > max) max = val
		}
		return max
	}, [uniqueCountByGeoName])

	const getCountryColor = useCallback((geoName: string) => {
		const direct = uniqueCountByGeoName.get(geoName) || 0
		const hist = uniqueCountByGeoName.get(`__hist__${geoName}`) || 0
		const count = direct + hist
		if (count === 0) return '#1a1a14'
		const t = Math.pow(Math.min(direct, maxCount) / maxCount, 0.5)
		const r = Math.round(50 + t * 151)
		const g = Math.round(40 + t * 128)
		const b = Math.round(20 + t * 56)
		// historical-only countries get a dimmer tone
		if (direct === 0 && hist > 0) return 'rgb(60,48,25)'
		return `rgb(${r},${g},${b})`
	}, [uniqueCountByGeoName, maxCount])

	/* ── map click handler ─────────────────────────── */

	const handleMapClick = useCallback((geo: any) => {
		const geoName = geo.properties?.name || ''
		const matched = geoToCoin.get(geoName)
		if (!matched || matched.length === 0) return

		// pick first matched coin country
		const matchedCountry = matched[0]
		if (filterCountry === matchedCountry) {
			setFilterCountry(null)
		} else {
			setFilterCountry(matchedCountry)
			setTimeout(() => {
				const el = document.getElementById(countrySlug(matchedCountry))
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}, 100)
		}
	}, [geoToCoin, filterCountry])

	const handleImgError = useCallback((key: string) => {
		setImgErrors(prev => new Set(prev).add(key))
	}, [])

	/* ── render ─────────────────────────────────────── */

	return (
		<>
			{/* progress bar */}
			<div
				className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
				style={{ width: `${progress}%`, background: `linear-gradient(to right, ${STEAMPUNK_COPPER}, ${STEAMPUNK_GOLD}, ${STEAMPUNK_BRASS})` }}
			/>

			<style>{`
				.toc-scroll::-webkit-scrollbar { display: none; }
				.toc-scroll { -ms-overflow-style: none; scrollbar-width: none; }
				@keyframes gear-spin {
					from { transform: rotate(0deg); }
					to   { transform: rotate(360deg); }
				}
				@keyframes gear-spin-reverse {
					from { transform: rotate(0deg); }
					to   { transform: rotate(-360deg); }
				}
				@keyframes steam-rise {
					0%   { opacity: 0.3; transform: translateY(0) scale(1); }
					100% { opacity: 0; transform: translateY(-40px) scale(1.4); }
				}
				@keyframes shimmer-gold {
					0%, 100% { opacity: 0.03; }
					50%      { opacity: 0.08; }
				}
				.coin-row:hover {
					background: rgba(201,168,76,0.06) !important;
				}
				.coin-img-wrapper {
					width: 48px;
					height: 48px;
					border-radius: 50%;
					overflow: hidden;
					border: 2px solid rgba(201,168,76,0.3);
					background: rgba(201,168,76,0.05);
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.coin-img-wrapper img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					border: none !important;
				}
				.coin-img-wrapper img:hover {
					border: none !important;
				}
				.coin-placeholder {
					font-size: 12px;
					font-weight: 700;
					color: ${STEAMPUNK_GOLD};
					text-decoration: none;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background: radial-gradient(circle at 35% 35%, rgba(201,168,76,0.15), rgba(184,115,51,0.08));
				}
				.coin-placeholder:hover {
					background: radial-gradient(circle at 35% 35%, rgba(201,168,76,0.25), rgba(184,115,51,0.15));
				}
				.steampunk-btn {
					background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(184,115,51,0.1));
					border: 1px solid rgba(201,168,76,0.3);
					color: ${STEAMPUNK_GOLD};
					border-radius: 50%;
					width: 40px;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					transition: all 0.2s;
					font-size: 16px;
				}
				.steampunk-btn:hover {
					background: linear-gradient(135deg, rgba(201,168,76,0.25), rgba(184,115,51,0.2));
					border-color: rgba(201,168,76,0.5);
				}
			`}</style>

			<div className="relative z-10 min-h-screen" style={{ background: STEAMPUNK_DARKER, backgroundImage: 'none' }}>
				<Navigation />

				{/* ── hero ──────────────────────────────────── */}
				<header className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${STEAMPUNK_DARK} 0%, ${STEAMPUNK_DARKER} 100%)` }}>
					{/* decorative gears */}
					<div className="absolute -top-12 -right-12 w-48 h-48 opacity-[0.04] pointer-events-none"
						style={{ animation: 'gear-spin 30s linear infinite' }}>
						<svg viewBox="0 0 100 100" fill={STEAMPUNK_GOLD}>
							<path d="M50 10 L54 0 L46 0Z M50 90 L54 100 L46 100Z M10 50 L0 54 L0 46Z M90 50 L100 54 L100 46Z M22 22 L14 17 L17 14Z M78 22 L86 17 L83 14Z M22 78 L14 83 L17 86Z M78 78 L86 83 L83 86Z" />
							<circle cx="50" cy="50" r="30" fill="none" stroke={STEAMPUNK_GOLD} strokeWidth="4" />
							<circle cx="50" cy="50" r="20" fill="none" stroke={STEAMPUNK_GOLD} strokeWidth="2" />
							<circle cx="50" cy="50" r="8" />
						</svg>
					</div>
					<div className="absolute -bottom-16 -left-16 w-64 h-64 opacity-[0.03] pointer-events-none"
						style={{ animation: 'gear-spin-reverse 45s linear infinite' }}>
						<svg viewBox="0 0 100 100" fill={STEAMPUNK_GOLD}>
							<path d="M50 5 L53 0 L47 0Z M50 95 L53 100 L47 100Z M5 50 L0 53 L0 47Z M95 50 L100 53 L100 47Z M18 18 L12 13 L13 12Z M82 18 L88 13 L87 12Z M18 82 L12 87 L13 88Z M82 82 L88 87 L87 88Z M50 15 L52 8 L48 8Z M50 85 L52 92 L48 92Z M15 50 L8 52 L8 48Z M85 50 L92 52 L92 48Z" />
							<circle cx="50" cy="50" r="35" fill="none" stroke={STEAMPUNK_GOLD} strokeWidth="3" />
							<circle cx="50" cy="50" r="22" fill="none" stroke={STEAMPUNK_GOLD} strokeWidth="2" />
							<circle cx="50" cy="50" r="10" />
						</svg>
					</div>

					<div className="max-w-3xl mx-auto px-6 pt-16 pb-6 text-center relative">
						<FadeIn>
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
								<span style={{
									background: `linear-gradient(135deg, ${STEAMPUNK_COPPER}, ${STEAMPUNK_GOLD}, ${STEAMPUNK_BRASS})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}>
									Coins
								</span>
							</h1>
						</FadeIn>
						<FadeIn delay={100}>
							<p style={{ color: STEAMPUNK_MUTED }} className="max-w-lg mx-auto text-base">
								My numismatic collection spanning{' '}
								<span style={{ color: STEAMPUNK_GOLD }} className="font-semibold">
									{countries.length} countries
								</span>{' '}
								and{' '}
								<span style={{ color: STEAMPUNK_GOLD }} className="font-semibold">
									{totalUnique} unique coins
								</span>.{' '}
							</p>
						</FadeIn>
					</div>
				</header>

				{/* ── world map ─────────────────────────────── */}
				<section className="max-w-4xl mx-auto px-4 pb-4 pt-2">
					<FadeIn delay={200}>
						<div
							className="rounded-2xl overflow-hidden relative"
							style={{
								border: `1px solid ${STEAMPUNK_BORDER}`,
								background: `linear-gradient(135deg, ${STEAMPUNK_DARK} 0%, rgba(15,13,9,0.95) 100%)`,
							}}
						>
							{/* tooltip */}
							{tooltipContent && (
								<div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-lg text-xs font-medium pointer-events-none"
									style={{
										background: 'rgba(26,21,16,0.95)',
										border: `1px solid ${STEAMPUNK_BORDER}`,
										color: STEAMPUNK_GOLD,
									}}>
									{tooltipContent}
								</div>
							)}

							{filterCountry && (
								<button
									onClick={() => setFilterCountry(null)}
									className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
									style={{
										background: 'rgba(26,21,16,0.95)',
										border: `1px solid ${STEAMPUNK_BORDER}`,
										color: STEAMPUNK_GOLD,
									}}>
									✕ Clear filter: {filterCountry}
								</button>
							)}

							<ComposableMap
								projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
								width={800}
								height={400}
								style={{ width: '100%', height: 'auto' }}
							>
								<Geographies geography={GEO_URL}>
									{({ geographies }) =>
										geographies.map((geo) => {
											const geoName = geo.properties?.name || ''
											const count = getGeoCount(geoName)
											const hasCoin = hasGeoCoins(geoName)

											return (
												<Geography
													key={geo.rsmKey}
													geography={geo}
													onMouseEnter={() => {
														if (hasCoin) {
															const direct = count
															const hist = uniqueCountByGeoName.get(`__hist__${geoName}`) || 0
															const parts: string[] = []
															if (direct > 0) parts.push(`${direct} coin${direct !== 1 ? 's' : ''}`)
															if (hist > 0) parts.push(`${hist} historical`)
															setTooltipContent(`${geoName}: ${parts.join(' + ')}`)
														}
													}}
													onMouseLeave={() => setTooltipContent('')}
													onClick={() => handleMapClick(geo)}
													style={{
														default: {
															fill: getCountryColor(geoName),
															stroke: 'rgba(201,168,76,0.12)',
															strokeWidth: 0.5,
															outline: 'none',
															cursor: hasCoin ? 'pointer' : 'default',
														},
														hover: {
															fill: hasCoin ? STEAMPUNK_GOLD : '#222218',
															stroke: 'rgba(201,168,76,0.3)',
															strokeWidth: 0.8,
															outline: 'none',
															cursor: hasCoin ? 'pointer' : 'default',
														},
														pressed: {
															fill: STEAMPUNK_COPPER,
															outline: 'none',
														},
													}}
												/>
											)
										})
									}
								</Geographies>
							</ComposableMap>

							{/* legend */}
							<div className="flex items-center justify-center gap-4 pb-3 px-4">
								<span className="text-[10px]" style={{ color: STEAMPUNK_MUTED }}>0</span>
								<div className="h-2 w-32 rounded-full" style={{
									background: `linear-gradient(to right, #32280a, ${STEAMPUNK_COPPER}, ${STEAMPUNK_GOLD})`
								}} />
								<span className="text-[10px]" style={{ color: STEAMPUNK_MUTED }}>{maxCount}+</span>
								<span className="text-[10px] ml-2" style={{ color: STEAMPUNK_MUTED }}>coins</span>
							</div>
						</div>
					</FadeIn>
				</section>

				{/* ── stats bar ─────────────────────────────── */}
				<section className="max-w-3xl mx-auto px-6 py-6">
					<FadeIn delay={300}>
						<div className="flex flex-wrap justify-center gap-6 text-center">
							{[
								{ label: 'Countries', value: countries.length },
								{ label: 'Coins', value: totalUnique },
								{ label: 'Oldest', value: oldestYear },
								{ label: 'Newest', value: newestYear },
							].map(s => (
								<div key={s.label} className="px-4">
									<div className="text-2xl font-bold" style={{ color: STEAMPUNK_GOLD }}>{s.value}</div>
									<div className="text-[11px] uppercase tracking-wider" style={{ color: STEAMPUNK_MUTED }}>{s.label}</div>
								</div>
							))}
						</div>
					</FadeIn>
				</section>

				{/* ── coin list by country ──────────────────── */}
				<main className="max-w-3xl mx-auto px-6 pb-28 lg:pb-20">
					{filteredCountries.map((country) => {
						const countryCoins = countriesMap.get(country)!
						const slug = countrySlug(country)
						const uniqueCount = uniqueCountByCountry.get(country) || 0

						// Group by currency within country
						const byCurrency = new Map<string, Coin[]>()
						for (const c of countryCoins) {
							const arr = byCurrency.get(c.currency) || []
							arr.push(c)
							byCurrency.set(c.currency, arr)
						}

						return (
							<section key={country} id={slug} data-toc className="mb-14">
								<FadeIn>
									<div className="flex items-center gap-3 mb-6 mt-2">
										<div className="h-px flex-1" style={{ background: STEAMPUNK_BORDER }} />
										<div className="flex items-center gap-3 shrink-0">
											<img
												src={getFlagUrl(countryCoins[0].iso)}
												alt={country}
												title={country}
												className="w-6 h-auto rounded-sm shadow-sm pointer-events-none"
												loading="lazy"
											/>
											<h2
												className="text-lg sm:text-xl font-bold"
												style={{ color: STEAMPUNK_TEXT }}
											>
												{country}
											</h2>
											<span
												className="text-xs px-2 py-0.5 rounded-full"
												style={{
													background: 'rgba(201,168,76,0.1)',
													border: `1px solid ${STEAMPUNK_BORDER}`,
													color: STEAMPUNK_GOLD,
												}}
											>
												{uniqueCount} coin{uniqueCount !== 1 ? 's' : ''}
											</span>
										</div>
										<div className="h-px flex-1" style={{ background: STEAMPUNK_BORDER }} />
									</div>
								</FadeIn>

								{[...byCurrency.entries()].map(([currency, currencyCoins]) => (
									<div key={currency} className="mb-6">
										<FadeIn>
											<div className="flex items-center gap-2 mb-3">
												<span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: STEAMPUNK_COPPER }}>
													{currency}
												</span>
												<span className="text-[10px]" style={{ color: STEAMPUNK_MUTED }}>
													({currencyCoins[0].period}{currencyCoins[0].active === 'yes' ? ' · active' : ''})
												</span>
											</div>
										</FadeIn>

										<div className="rounded-xl overflow-x-auto" style={{
											border: `1px solid ${STEAMPUNK_BORDER}`,
											background: `linear-gradient(135deg, rgba(26,21,16,0.8), rgba(15,13,9,0.9))`,
										}}>
											<div className="min-w-[400px]">
												{/* header */}
												<div className="grid grid-cols-[48px_1fr_80px_60px_60px] sm:grid-cols-[48px_1fr_100px_80px_80px_80px] gap-2 px-3 py-2 text-[10px] uppercase tracking-wider font-medium"
													style={{ color: STEAMPUNK_MUTED, borderBottom: `1px solid ${STEAMPUNK_BORDER}` }}>
													<div></div>
													<div>Denomination</div>
													<div className="text-right">Value</div>
													<div className="text-center">Year</div>
													<div className="hidden sm:block text-center">Mag.</div>
													<div className="text-center">Notes</div>
												</div>

												{currencyCoins.map((coin, i) => {
													const coinKey = `${coin.country}-${coin.amount}-${coin['denom.']}-${coin.year}-${coin.commemorative}`
													const imgUrl = getCoinImageUrl(coin)
													const hasImgError = imgErrors.has(coinKey)

													return (
														<div key={i}
															className="coin-row grid grid-cols-[48px_1fr_80px_60px_60px] sm:grid-cols-[48px_1fr_100px_80px_80px_80px] gap-2 px-3 py-2 items-center transition-colors"
															style={{ borderBottom: i < currencyCoins.length - 1 ? `1px solid rgba(201,168,76,0.08)` : 'none' }}>

															{/* coin image */}
															<div className="coin-img-wrapper">
																{hasImages && !hasImgError ? (
																	<img
																		src={imgUrl}
																		alt={`${coin.amount} ${coin['denom.']}`}
																		loading="lazy"
																		onError={() => handleImgError(coinKey)}
																	/>
																) : (
																	<a href={getCoinFallbackSearch(coin)} target="_blank" rel="noopener noreferrer"
																		className="coin-placeholder" title="Search on Numista">
																		{coin['sym.']}
																	</a>
																)}
															</div>

															{/* denomination */}
															<div>
																<span className="text-sm font-medium capitalize" style={{ color: STEAMPUNK_TEXT }}>
																	{coin['denom.']}
																</span>
																{coin.commemorative && (
																	<span className="block text-[10px] mt-0.5 italic" style={{ color: STEAMPUNK_COPPER }}>
																		{coin.commemorative}
																	</span>
																)}
															</div>

															{/* value */}
															<div className="text-right">
																<span className="text-sm font-bold" style={{ color: STEAMPUNK_GOLD }}>
																	{coin.amount}
																</span>
															</div>

															{/* year */}
															<div className="text-center text-sm" style={{ color: STEAMPUNK_TEXT }}>
																{coin.year}
															</div>

															{/* magnetic (desktop) */}
															<div className="hidden sm:flex justify-center">
																{coin.magnetic === 'yes' && (
																	<span className="text-[10px] px-1.5 py-0.5 rounded" style={{
																		background: 'rgba(184,115,51,0.15)',
																		color: STEAMPUNK_COPPER,
																	}}>mag</span>
																)}
															</div>

															{/* notes */}
															<div className="flex justify-center gap-1 flex-wrap">
																{coin.unc === 'yes' && (
																	<span className="text-[9px] px-1 py-0.5 rounded" style={{
																		background: 'rgba(201,168,76,0.15)',
																		color: STEAMPUNK_GOLD,
																	}}>UNC</span>
																)}
																{coin['corr.'] === 'y' && (
																	<span className="text-[9px] px-1 py-0.5 rounded" title="Worn / corroded appearance" style={{
																		background: 'rgba(184,115,51,0.12)',
																		color: STEAMPUNK_MUTED,
																	}}>worn</span>
																)}
																{coin.mint && (
																	<span className="text-[9px] px-1 py-0.5 rounded" style={{
																		background: 'rgba(201,168,76,0.1)',
																		color: STEAMPUNK_MUTED,
																	}}>⚒{coin.mint}</span>
																)}
																{coin.copies && (
																	<span className="text-[9px] px-1 py-0.5 rounded" style={{
																		background: 'rgba(201,168,76,0.1)',
																		color: STEAMPUNK_MUTED,
																	}}>×{Number(coin.copies) + 1}</span>
																)}
															</div>
														</div>
													)
												})}
											</div>
										</div>
									</div>
								))}
							</section>
						)
					})}
				</main>

				{/* ── desktop ToC ───────────────────────────── */}
				<nav ref={tocRef} className="hidden lg:block fixed right-6 top-24 bottom-24 w-48 overflow-y-auto toc-scroll">
					<p className="text-[10px] uppercase tracking-widest mb-3 font-medium" style={{ color: 'rgba(201,168,76,0.3)' }}>
						Countries
					</p>
					{countries.map(country => {
						const slug = countrySlug(country)
						const count = uniqueCountByCountry.get(country) || 0
						return (
							<a
								key={slug}
								href={`#${slug}`}
								onClick={(e) => { e.preventDefault(); handleTocClick(slug) }}
								data-toc-id={slug}
								className="flex items-center justify-between py-1 text-xs transition-colors"
								style={{
									color: activeId === slug ? STEAMPUNK_GOLD : STEAMPUNK_MUTED,
									fontWeight: activeId === slug ? 600 : 400,
								}}
							>
								<span className="flex items-center gap-1.5 truncate">
									<img
										src={getFlagUrl(countriesMap.get(country)![0].iso)}
										alt={country}
										title={country}
										className="w-4 h-auto rounded-sm pointer-events-none"
										loading="lazy"
									/>
									{country}
								</span>
								<span className="text-[9px] opacity-60">{count}</span>
							</a>
						)
					})}
				</nav>

				{/* ── scroll to top/bottom buttons ──────────── */}
				<div className="fixed right-6 bottom-6 z-40 flex flex-col gap-2">
					<button
						className="steampunk-btn"
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						title="Scroll to top"
						style={{ padding: 0 }}
					>
						▲
					</button>
					<button
						className="steampunk-btn"
						onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
						title="Scroll to bottom"
						style={{ padding: 0 }}
					>
						▼
					</button>
				</div>
			</div>

			{/* ── mobile ToC ─────────────────────────────── */}
			{tocOpen && <div className="lg:hidden fixed inset-0 z-30" onClick={() => setTocOpen(false)} />}
			{currentLabel && (
				<div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
					{tocOpen && (
						<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 max-h-[60vh] overflow-y-auto rounded-2xl p-4 shadow-xl toc-scroll"
							style={{
								background: 'rgba(26,21,16,0.97)',
								border: `1px solid ${STEAMPUNK_BORDER}`,
							}}>
							{countries.map(country => {
								const slug = countrySlug(country)
								const count = uniqueCountByCountry.get(country) || 0
								return (
									<a
										key={slug}
										href={`#${slug}`}
										onClick={(e) => { e.preventDefault(); handleTocClick(slug); setTocOpen(false) }}
										className="flex items-center justify-between py-1.5 text-xs transition-colors"
										style={{
											color: activeId === slug ? STEAMPUNK_GOLD : STEAMPUNK_MUTED,
											fontWeight: activeId === slug ? 600 : 400,
										}}
									>
										<span className="flex items-center gap-1.5 truncate">
											<img
												src={getFlagUrl(countriesMap.get(country)![0].iso)}
												alt={country}
												className="w-4 h-auto rounded-sm"
												loading="lazy"
											/>
											{country}
										</span>
										<span className="text-[9px] opacity-60">{count}</span>
									</a>
								)
							})}
						</div>
					)}
					<button
						onClick={() => setTocOpen(!tocOpen)}
						className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm shadow-lg transition-colors"
						style={{
							background: 'rgba(26,21,16,0.95)',
							border: `1px solid ${STEAMPUNK_BORDER}`,
							color: STEAMPUNK_GOLD,
						}}>
						<span className="truncate max-w-[180px]" style={{ color: STEAMPUNK_MUTED }}>{currentLabel}</span>
						<span className="text-[10px]" style={{ color: 'rgba(201,168,76,0.4)' }}>{tocOpen ? '▼' : '▲'}</span>
					</button>
				</div>
			)}
		</>
	)
}


export default Coins
