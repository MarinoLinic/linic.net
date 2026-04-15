import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Navigation from '../components/_Navigation'
import type { Tank, Animal, GallerySlide } from '../types/pets'
import { getTimeSince, animalSlug } from '../utils/pets'
import FadeIn from '../components/pets/FadeIn'
import AnimalImage from '../components/pets/AnimalImage'
import Lightbox from '../components/pets/Lightbox'
import TankModal from '../components/pets/TankModal'
import AnimalEntry from '../components/pets/AnimalEntry'
import FormerAnimalEntry from '../components/pets/FormerAnimalEntry'
import tanksData from '../data/tanks.json'
import animalsData from '../data/pets.json'

/* ── main page ───────────────────────────────────────────── */

const Animals = () => {
	const tanks = tanksData as Tank[]
	const allAnimals = animalsData as Animal[]
	const rafRef = useRef<number>(0)
	const [activeTank, setActiveTank] = useState<Tank | null>(null)
	const [gallery, setGallery] = useState<{ slides: GallerySlide[]; index: number; organism: string } | null>(null)
	const [showTable, setShowTable] = useState(false)
	const activeAnimals = useMemo(() => allAnimals.filter(a => a.count !== '0'), [allAnimals])
	const [progress, setProgress] = useState(0)
	const [activeId, setActiveId] = useState('')
	const [tocOpen, setTocOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = requestAnimationFrame(() => {
				const el = document.documentElement
				const scrolled = el.scrollTop
				const total = el.scrollHeight - el.clientHeight
				setProgress(total > 0 ? (scrolled / total) * 100 : 0)

				const tocEls = document.querySelectorAll('[data-toc]')
				let current = ''
				for (const tocEl of tocEls) {
					if ((tocEl as HTMLElement).getBoundingClientRect().top <= 120) current = tocEl.id
				}
				setActiveId(current)
			})
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current) }
	}, [])

	const openGallery = useCallback((slides: GallerySlide[], index: number, organism: string) => {
		setGallery({ slides, index, organism })
	}, [])

	const tocRef = useRef<HTMLElement>(null)
	const tocClickRef = useRef(false)

	const handleTocClick = useCallback((id: string) => {
		tocClickRef.current = true
		const el = document.getElementById(id)
		if (!el) return
		el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		// Correction: images loading above may shift layout during smooth scroll
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
		const tank = tanks.find(t => t.id === activeId)
		if (tank) return tank.name
		const a = allAnimals.find(x => animalSlug(x.organism) === activeId)
		if (a) return a.organism
		return ''
	}, [activeId, tanks, allAnimals])

	return (
		<>
			<div
				className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
				style={{ width: `${progress}%`, background: 'linear-gradient(to right, #7c70ff, #ff5c7c, #d94fc0)' }}
			/>
			<style>{`
				.toc-scroll::-webkit-scrollbar { display: none; }
				.toc-scroll { -ms-overflow-style: none; scrollbar-width: none; }
				@keyframes shimmer {
					0%, 100% { opacity: 0.03; }
					50%      { opacity: 0.07; }
				}
			`}</style>

			<div className="relative z-10 min-h-screen">
				<Navigation />

				{/* ── hero ──────────────────────────────────────── */}
				<header className="relative overflow-hidden">
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background: 'radial-gradient(ellipse at 50% -20%, rgba(78,205,196,0.10) 0%, transparent 60%)'
						}}
					/>
					<div
						className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
						style={{
							background: 'linear-gradient(170deg, rgba(78,205,196,0.05) 0%, transparent 50%)',
							animation: 'shimmer 6s ease-in-out infinite'
						}}
					/>

					<div className="max-w-3xl mx-auto px-6 pt-16 pb-14 text-center relative">
						<FadeIn>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
							<span className="bg-gradient-to-r from-accent via-accent-light to-cyan-300 bg-clip-text text-transparent">
								Animals
							</span>
						</h1>
					</FadeIn>
					<FadeIn delay={100}>
						<p className="text-muted max-w-lg mx-auto text-base">
							A collection of organisms I keep — currently{' '}
							<span onClick={() => setShowTable(true)} className="text-accent font-semibold hover:text-accent-light transition-colors cursor-pointer underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60">
								{activeAnimals.length} species
							</span>.
						</p>
					</FadeIn>
					</div>
				</header>

				{/* ── tank sections ─────────────────────────────── */}
				<main className="max-w-3xl mx-auto px-6 pb-28 lg:pb-20">
					{tanks.map((tank) => {
						const tankAnimals = allAnimals.filter((p) => p.tank === tank.id && p.organism)
						const active = tankAnimals.filter((p) => p.count !== '0')
						const former = tankAnimals.filter((p) => p.count === '0')

						return (
							<section key={tank.id} id={tank.id} data-toc className="mb-20">
								{/* tank header */}
								<FadeIn>
									<button
										onClick={() => setActiveTank(tank)}
										className="w-full text-left mb-10 group/tank rounded-2xl border border-accent/20
									hover:border-accent/50 p-5 sm:p-6 transition-colors duration-300
									hover:shadow-lg hover:shadow-accent/5"
										style={{
											background:
												'linear-gradient(135deg, rgba(78,205,196,0.06) 0%, rgba(13,33,55,0.5) 50%, rgba(78,205,196,0.03) 100%)'
										}}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												{tank.img.length > 0 ? (
													<div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover/tank:border-accent/40 transition-colors">
														<AnimalImage
															name={tank.img[0]}
															alt={tank.name}
															className="w-full h-full object-cover border-0 hover:border-0 rounded-none"
															wrapperClassName="h-full"
															thumb
														/>
													</div>
												) : (
													<div
														className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
														style={{
															background:
																tank.category === 'freshwater'
																	? 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.08))'
																	: 'linear-gradient(135deg, rgba(78,205,196,0.25), rgba(6,182,212,0.08))'
														}}
													>
														<div
															className="w-3 h-3 rounded-full"
															style={{
																background:
																	tank.category === 'freshwater'
																		? 'linear-gradient(135deg, #3b82f6, #60a5fa)'
																		: 'linear-gradient(135deg, #4ecdc4, #06b6d4)'
															}}
														/>
													</div>
												)}
												<div>
													<h3 className="text-text text-lg sm:text-xl font-bold group-hover/tank:text-accent transition-colors">
														{tank.name}
													</h3>
													<p className="text-muted text-sm">
														{tank.volume} &middot; {tank.category} &middot; {active.length} species
													</p>
												</div>
											</div>
											<span className="text-muted text-sm hidden sm:inline group-hover/tank:text-accent transition-colors">
												Details &#8594;
											</span>
										</div>
									</button>
								</FadeIn>

								{/* active animals — vertical feed */}
								<div className="space-y-6">
									{active.map((animal) => (
									<div key={animal.organism} id={animalSlug(animal.organism)} data-toc>
										<AnimalEntry animal={animal} tankCategory={tank.category} onOpenGallery={openGallery} />
									</div>
								))}
								</div>

								{/* former animals */}
								{former.length > 0 && (
									<div className="mt-12">
										<FadeIn>
											<div className="flex items-center gap-3 mb-6">
												<div className="h-px flex-1 bg-white/5" />
												<p className="text-muted text-xs uppercase tracking-widest shrink-0">
													Former Inhabitants
												</p>
												<div className="h-px flex-1 bg-white/5" />
											</div>
										</FadeIn>
										<div className="space-y-6">
											{former.map((animal) => (
										<div key={animal.organism} id={animalSlug(animal.organism)} data-toc>
											<FormerAnimalEntry animal={animal} tankCategory={tank.category} onOpenGallery={openGallery} />
										</div>
									))}
										</div>
									</div>
								)}
							</section>
						)
					})}
				</main>

				{/* ── desktop table of contents ─────────────── */}
				<nav ref={tocRef} className="hidden lg:block fixed right-6 top-24 bottom-24 w-48 overflow-y-auto toc-scroll">
					<p className="text-muted/40 text-[10px] uppercase tracking-widest mb-3 font-medium">On this page</p>
					{tanks.map(tank => {
						const ta = allAnimals.filter(a => a.tank === tank.id && a.organism)
						const act = ta.filter(a => a.count !== '0')
						const fmr = ta.filter(a => a.count === '0')
						return (
							<div key={tank.id} className="mb-4">
								<a
									href={`#${tank.id}`}
									onClick={(e) => { e.preventDefault(); handleTocClick(tank.id) }}
									data-toc-id={tank.id}
									className={`block text-xs font-semibold py-1 transition-colors ${activeId === tank.id ? 'text-accent' : 'text-muted/60 hover:text-muted'}`}
								>
									{tank.name}
								</a>
								<div className="border-l border-white/8 ml-1 pl-3 space-y-px">
									{act.map(a => {
										const slug = animalSlug(a.organism)
										return (
											<a key={slug} href={`#${slug}`} data-toc-id={slug}
												onClick={(e) => { e.preventDefault(); handleTocClick(slug) }}
												className={`block text-[11px] py-0.5 transition-colors truncate ${activeId === slug ? 'text-accent' : 'text-muted/40 hover:text-muted/70'}`}>
												{a.organism}
											</a>
										)
									})}
									{fmr.length > 0 && (
										<p className="text-[9px] text-muted/25 uppercase tracking-wider mt-1.5 mb-0.5">Former</p>
									)}
									{fmr.map(a => {
										const slug = animalSlug(a.organism)
										return (
											<a key={slug} href={`#${slug}`} data-toc-id={slug}
												onClick={(e) => { e.preventDefault(); handleTocClick(slug) }}
												className={`block text-[11px] py-0.5 transition-colors truncate ${activeId === slug ? 'text-accent/60' : 'text-muted/25 hover:text-muted/40'}`}>
												{a.organism}
											</a>
										)
									})}
								</div>
							</div>
						)
					})}
				</nav>
			</div>

			{/* ── mobile TOC ─────────────────────────────────── */}
			{tocOpen && <div className="lg:hidden fixed inset-0 z-30" onClick={() => setTocOpen(false)} />}
			{currentLabel && (
				<div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
					{tocOpen && (
						<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 max-h-[60vh] overflow-y-auto rounded-2xl border border-white/10 p-4 shadow-xl toc-scroll"
							style={{ background: 'rgba(13,22,40,0.97)' }}>
							{tanks.map(tank => {
								const ta = allAnimals.filter(a => a.tank === tank.id && a.organism)
								const act = ta.filter(a => a.count !== '0')
								const fmr = ta.filter(a => a.count === '0')
								return (
									<div key={tank.id} className="mb-3">
										<a href={`#${tank.id}`}
											onClick={(e) => { e.preventDefault(); handleTocClick(tank.id); setTocOpen(false) }}
											className={`block text-xs font-semibold py-1 transition-colors ${activeId === tank.id ? 'text-accent' : 'text-muted/60 hover:text-muted'}`}>
											{tank.name}
										</a>
										<div className="border-l border-white/8 ml-1 pl-3 space-y-px">
											{act.map(a => {
												const slug = animalSlug(a.organism)
												return (
													<a key={slug} href={`#${slug}`}
														onClick={(e) => { e.preventDefault(); handleTocClick(slug); setTocOpen(false) }}
														className={`block text-[11px] py-0.5 transition-colors truncate ${activeId === slug ? 'text-accent' : 'text-muted/40 hover:text-muted/70'}`}>
														{a.organism}
													</a>
												)
											})}
											{fmr.length > 0 && (
												<p className="text-[9px] text-muted/25 uppercase tracking-wider mt-1.5 mb-0.5">Former</p>
											)}
											{fmr.map(a => {
												const slug = animalSlug(a.organism)
												return (
													<a key={slug} href={`#${slug}`}
														onClick={(e) => { e.preventDefault(); handleTocClick(slug); setTocOpen(false) }}
														className={`block text-[11px] py-0.5 transition-colors truncate ${activeId === slug ? 'text-accent/60' : 'text-muted/25 hover:text-muted/40'}`}>
														{a.organism}
													</a>
												)
											})}
										</div>
									</div>
								)
							})}
						</div>
					)}
					<button
						onClick={() => setTocOpen(!tocOpen)}
						className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 text-sm shadow-lg transition-colors hover:border-white/20"
						style={{ background: 'rgba(13,22,40,0.95)' }}>
						<span className="text-muted/60 truncate max-w-[180px]">{currentLabel}</span>
						<span className="text-muted/40 text-[10px]">{tocOpen ? '\u25BC' : '\u25B2'}</span>
					</button>
				</div>
			)}

			{/* lightbox */}
			{gallery && (
				<Lightbox
					slides={gallery.slides}
					startIndex={gallery.index}
					organism={gallery.organism}
					onClose={() => setGallery(null)}
				/>
			)}

			{/* tank detail modal */}
			{activeTank && <TankModal tank={activeTank} allAnimals={allAnimals} onClose={() => setActiveTank(null)} onOpenGallery={openGallery} />}

			{showTable && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowTable(false)}>
					<div className="absolute inset-0 bg-black/80" />
					<div
						className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl border border-accent/30 overflow-hidden flex flex-col"
						style={{ background: 'linear-gradient(135deg, #0d2137 0%, #0a1628 50%, #0d1f3c 100%)' }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="h-1.5 w-full bg-gradient-to-r from-accent/60 via-accent-light/50 to-accent/60 shrink-0" />
						<div className="p-6 flex items-start justify-between shrink-0">
							<div>
								<h3 className="text-text text-xl">Species Overview</h3>
								<p className="text-muted text-sm mt-1">{activeAnimals.length} active species</p>
							</div>
							<button onClick={() => setShowTable(false)} className="text-muted hover:text-text border-white/10 px-2 py-0.5 text-lg leading-none">
								&times;
							</button>
						</div>
						<div className="overflow-auto px-6 pb-6">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-muted text-xs uppercase tracking-wider border-b border-white/10">
										<th className="text-left py-2 pr-4 font-medium">Tank</th>
										<th className="text-left py-2 pr-4 font-medium">Type</th>
										<th className="text-left py-2 pr-4 font-medium">Name</th>
										<th className="text-left py-2 pr-4 font-medium">Species</th>
										<th className="text-right py-2 pr-4 font-medium">Count</th>
										<th className="text-left py-2 pr-4 font-medium">Function</th>
										<th className="text-left py-2 pr-4 font-medium">Family</th>
										<th className="text-left py-2 font-medium">Kept for</th>
									</tr>
								</thead>
								<tbody>
									{activeAnimals.map(a => {
										const t = tanks.find(tk => tk.id === a.tank)
										return (
											<tr key={a.organism} className="border-b border-white/5 hover:bg-white/3 transition-colors">
												<td className="py-2.5 pr-4 text-muted whitespace-nowrap">{t?.name || a.tank}</td>
												<td className="py-2.5 pr-4 text-muted">{a.type}</td>
												<td className="py-2.5 pr-4 text-text">{a.organism}</td>
												<td className="py-2.5 pr-4 text-muted italic">{a.species}</td>
												<td className="py-2.5 pr-4 text-accent text-right">{a.count}</td>
												<td className="py-2.5 pr-4 text-muted">{a.function}</td>
												<td className="py-2.5 pr-4 text-muted">{a.family}</td>
												<td className="py-2.5 text-muted whitespace-nowrap">{getTimeSince(a.hereSince)}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Animals
