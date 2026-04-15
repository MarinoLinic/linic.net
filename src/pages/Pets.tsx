import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'
import Navigation from '../components/_Navigation'
import tanksData from '../data/tanks.json'
import animalsData from '../data/pets.json'

interface Tank {
	id: string
	name: string
	type: string
	volume: string
	brand: string
	category: string
	length_cm: number
	width_cm: number
	height_cm: number
	img: string[]
	vid: string[]
}

interface Animal {
	tank: string
	count: string
	organism: string
	species: string
	family: string
	function: string
	type: string
	longevity: string
	diurnality: string
	domesticity: string
	location: string
	hereSince: string
	img: string[]
	vid: string[]
	description: string
}

/* ── helpers ─────────────────────────────────────────────── */

function getTimeSince(dateStr: string): string {
	const start = new Date(dateStr + 'T00:00:00')
	const now = new Date()
	if (start > now) return 'arriving soon'

	let years = now.getFullYear() - start.getFullYear()
	let months = now.getMonth() - start.getMonth()
	let days = now.getDate() - start.getDate()

	if (days < 0) {
		months--
		const prev = new Date(now.getFullYear(), now.getMonth(), 0)
		days += prev.getDate()
	}
	if (months < 0) {
		years--
		months += 12
	}

	const parts: string[] = []
	if (years > 0) parts.push(years === 1 ? '1 year' : `${years} years`)
	if (months > 0) parts.push(months === 1 ? '1 month' : `${months} months`)
	if (years === 0 && days > 0) parts.push(days === 1 ? '1 day' : `${days} days`)

	return parts.join(', ') || 'today'
}

function formatDate(dateStr: string): string {
	return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}

const functionAccent: Record<string, string> = {
	omnivore: '#f59e0b',
	grazer: '#10b981',
	scavenger: '#eab308',
	'filter-feeder': '#0ea5e9',
	producer: '#84cc16',
	carnivore: '#ef4444'
}

const functionBadge: Record<string, string> = {
	omnivore: 'bg-amber-500/15 text-amber-300',
	grazer: 'bg-emerald-500/15 text-emerald-300',
	scavenger: 'bg-yellow-500/15 text-yellow-300',
	'filter-feeder': 'bg-sky-500/15 text-sky-300',
	producer: 'bg-lime-500/15 text-lime-300',
	carnivore: 'bg-red-500/15 text-red-300'
}

const typeIcon: Record<string, string> = {
	fish: '\u{1F41F}',
	snail: '\u{1F40C}',
	shrimp: '\u{1F990}',
	crab: '\u{1F980}',
	'brittle star': '\u{2B50}',
	chiton: '\u{1F41A}',
	worm: '\u{1FAB1}',
	plankton: '\u{1F9A0}',
	alga: '\u{1F33F}'
}

/* ── fade-in on scroll ───────────────────────────────────── */

const FadeIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setVisible(true)
					obs.disconnect()
				}
			},
			{ threshold: 0.08 }
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? 'translateY(0)' : 'translateY(24px)',
				transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
			}}
		>
			{children}
		</div>
	)
}

/* ── bubbles ─────────────────────────────────────────────── */

const Bubbles = () => {
	const bubbles = useMemo(
		() =>
			Array.from({ length: 22 }, (_, i) => ({
				id: i,
				left: Math.random() * 100,
				size: 3 + Math.random() * 6,
				delay: Math.random() * 14,
				duration: 10 + Math.random() * 16,
				opacity: 0.06 + Math.random() * 0.12
			})),
		[]
	)

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
			{bubbles.map((b) => (
				<span
					key={b.id}
					className="absolute rounded-full"
					style={{
						left: `${b.left}%`,
						bottom: '-20px',
						width: b.size,
						height: b.size,
						background: `radial-gradient(circle at 30% 30%, rgba(78, 205, 196, ${b.opacity + 0.08}), rgba(78, 205, 196, ${b.opacity * 0.25}))`,
						animation: `bubbleRise ${b.duration}s ease-in ${b.delay}s infinite`
					}}
				/>
			))}
		</div>
	)
}

/* ── image with jpg/JPG fallback ─────────────────────────── */

const AnimalImage = ({
	name,
	alt,
	className,
	style,
	onClick
}: {
	name: string
	alt: string
	className?: string
	style?: React.CSSProperties
	onClick?: () => void
}) => {
	const [ext, setExt] = useState('jpg')
	const [failed, setFailed] = useState(false)

	if (failed) return null

	return (
		<img
			src={`/pets/${name}.${ext}`}
			alt={alt}
			className={className}
			style={style}
			onClick={onClick}
			onError={() => {
				if (ext === 'jpg') setExt('JPG')
				else setFailed(true)
			}}
		/>
	)
}

/* ── lightbox gallery (images + optional video) ──────────── */

type GallerySlide = { type: 'image'; name: string } | { type: 'video'; url: string }

function buildSlides(images: string[], vids: string[]): GallerySlide[] {
	const slides: GallerySlide[] = images.map((name) => ({ type: 'image', name }))
	for (const vid of vids) {
		const m = vid.match(/(?:v=|youtu\.be\/)([-\w]+)/)
		if (m) slides.push({ type: 'video', url: `https://www.youtube.com/embed/${m[1]}` })
	}
	return slides
}

const ZOOM_SCALE = 2.8

const Lightbox = ({
	slides,
	startIndex,
	organism,
	onClose
}: {
	slides: GallerySlide[]
	startIndex: number
	organism: string
	onClose: () => void
}) => {
	const [idx, setIdx] = useState(startIndex)
	const [zoomed, setZoomed] = useState(false)
	const [origin, setOrigin] = useState('50% 50%')
	const imgRef = useRef<HTMLDivElement>(null)

	const prev = useCallback(() => { setZoomed(false); setIdx((i) => (i - 1 + slides.length) % slides.length) }, [slides.length])
	const next = useCallback(() => { setZoomed(false); setIdx((i) => (i + 1) % slides.length) }, [slides.length])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') { if (zoomed) setZoomed(false); else onClose() }
			if (e.key === 'ArrowLeft') prev()
			if (e.key === 'ArrowRight') next()
		}
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKey)
		return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
	}, [onClose, prev, next, zoomed])

	const handleImageClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		const slide = slides[idx]
		if (slide.type !== 'image') return

		if (zoomed) {
			setZoomed(false)
			return
		}

		const el = imgRef.current
		if (!el) return
		const rect = el.getBoundingClientRect()
		const xPct = ((e.clientX - rect.left) / rect.width) * 100
		const yPct = ((e.clientY - rect.top) / rect.height) * 100
		setOrigin(`${xPct}% ${yPct}%`)
		setZoomed(true)
	}

	const handleZoomedMove = (e: React.MouseEvent) => {
		if (!zoomed) return
		const el = imgRef.current
		if (!el) return
		const rect = el.getBoundingClientRect()
		const xPct = ((e.clientX - rect.left) / rect.width) * 100
		const yPct = ((e.clientY - rect.top) / rect.height) * 100
		setOrigin(`${xPct}% ${yPct}%`)
	}

	const slide = slides[idx]

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={() => { if (zoomed) setZoomed(false); else onClose() }}>
			<div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

			<button onClick={onClose}
				className="absolute top-5 right-5 z-10 text-white/60 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
				&times;
			</button>

			{slides.length > 1 && (
				<>
					<button onClick={(e) => { e.stopPropagation(); prev() }}
						className="absolute left-4 z-10 text-white/60 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
						&#8249;
					</button>
					<button onClick={(e) => { e.stopPropagation(); next() }}
						className="absolute right-4 z-10 text-white/60 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
						&#8250;
					</button>
				</>
			)}

			{slide.type === 'image' ? (
				<div
					ref={imgRef}
					className={`relative max-w-4xl max-h-[85vh] px-4 overflow-hidden ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
					onClick={handleImageClick}
					onMouseMove={handleZoomedMove}
				>
					<AnimalImage name={slide.name} alt={organism}
						className="max-h-[80vh] w-auto mx-auto rounded-xl object-contain border-0 hover:border-0 select-none"
						style={{
							transform: zoomed ? `scale(${ZOOM_SCALE})` : 'scale(1)',
							transformOrigin: origin,
							transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
						}}
					/>
				</div>
			) : (
				<div className="relative px-4" onClick={(e) => e.stopPropagation()}>
					<iframe title={organism} src={slide.url} allowFullScreen
						className="w-[80vw] max-w-3xl aspect-video rounded-xl border-0" />
				</div>
			)}

			{slides.length > 1 && (
				<p className="absolute bottom-6 text-white/50 text-sm font-medium tracking-wide">
					{idx + 1} / {slides.length}{slide.type === 'video' ? ' (video)' : ''}
				</p>
			)}
		</div>
	)
}

/* ── tank modal ──────────────────────────────────────────── */

const TankModal = ({ tank, allAnimals, onClose, onOpenGallery }: {
	tank: Tank
	allAnimals: Animal[]
	onClose: () => void
	onOpenGallery: (slides: GallerySlide[], startIndex: number, organism: string) => void
}) => {
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKey)
		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKey)
		}
	}, [onClose])

	const tankSlides: GallerySlide[] = buildSlides(tank.img || [], tank.vid || [])
	const inhabitants = allAnimals.filter(a => a.tank === tank.id && a.count !== '0')

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
			<div
				className="relative max-w-md w-full max-h-[85vh] rounded-2xl border border-accent/30 overflow-hidden flex flex-col"
				style={{ background: 'linear-gradient(135deg, #0d2137 0%, #0a1628 50%, #0d1f3c 100%)' }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="h-1.5 w-full bg-gradient-to-r from-accent/60 via-accent-light/50 to-accent/60 shrink-0" />

				<div className="p-6 overflow-y-auto">
					<div className="flex items-start justify-between mb-5">
						<div>
							<h3 className="text-text text-xl">{tank.name}</h3>
							<p className="text-muted text-sm mt-1">{tank.brand} &middot; {tank.type}</p>
						</div>
						<button
							onClick={onClose}
							className="text-muted hover:text-text border-white/10 px-2 py-0.5 text-lg leading-none"
						>
							&times;
						</button>
					</div>

					{tank.img.length > 0 && (
						<>
							<div className="relative group/timg cursor-pointer mb-3"
								onClick={() => onOpenGallery(tankSlides, 0, tank.name)}>
								<AnimalImage
									name={tank.img[0]}
									alt={tank.name}
									className="w-full rounded-xl border border-white/10"
								/>
								<div className="absolute inset-0 rounded-xl bg-black/0 group-hover/timg:bg-black/30 transition-colors flex items-center justify-center">
									<span className="text-white/0 group-hover/timg:text-white/90 transition-colors text-sm font-medium tracking-wide">
										{tankSlides.length > 1 ? `View gallery (${tankSlides.length})` : 'View full image'}
									</span>
								</div>
								{tankSlides.length > 1 && (
									<div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-0.5 text-xs text-white/80 font-medium">
										1 / {tankSlides.length}
									</div>
								)}
							</div>
							{tank.img.length > 1 && (
								<div className="flex gap-2 mb-5 overflow-x-auto pb-1">
									{tank.img.map((im, i) => (
										<button key={im}
											className="shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-colors p-0 bg-transparent"
											onClick={() => onOpenGallery(tankSlides, i, tank.name)}>
											<AnimalImage name={im} alt={`${tank.name} ${i + 1}`}
												className="h-14 w-20 object-cover border-0 hover:border-0 rounded-none" />
										</button>
									))}
								</div>
							)}
						</>
					)}

					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-xl p-3 bg-white/5 border border-white/5">
							<p className="text-muted text-xs uppercase tracking-wider mb-1">Volume</p>
							<p className="text-accent font-semibold text-lg">{tank.volume}</p>
						</div>
						<div className="rounded-xl p-3 bg-white/5 border border-white/5">
							<p className="text-muted text-xs uppercase tracking-wider mb-1">Water</p>
							<p className="text-accent font-semibold text-lg capitalize">{tank.category}</p>
						</div>
						<div className="rounded-xl p-3 bg-white/5 border border-white/5 col-span-2">
							<p className="text-muted text-xs uppercase tracking-wider mb-1">Dimensions</p>
							<p className="text-accent font-semibold text-lg">{tank.length_cm} &times; {tank.width_cm} &times; {tank.height_cm} cm</p>
						</div>
					</div>

					{inhabitants.length > 0 && (
						<div className="mt-5">
							<p className="text-muted text-xs uppercase tracking-wider mb-3">Inhabitants &middot; {inhabitants.length} species</p>
							<div className="space-y-2">
								{inhabitants.map(a => (
									<div key={a.organism} className="flex items-center justify-between gap-3 text-sm rounded-lg px-3 py-2 bg-white/3 border border-white/5">
										<div className="min-w-0">
											<p className="text-text truncate">{a.organism}</p>
											<p className="text-muted text-xs italic truncate">{a.species}</p>
										</div>
										<span className="shrink-0 text-accent text-xs font-semibold">&times;{a.count}</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

/* ── animal entry (vertical, spacious) ──────────────────────── */

const AnimalEntry = ({ animal, index, tankCategory, onOpenGallery }: {
	animal: Animal
	index: number
	tankCategory: string
	onOpenGallery: (slides: GallerySlide[], startIndex: number, organism: string) => void
}) => {
	const accent = functionAccent[animal.function] || '#8c8aa8'
	const badge = functionBadge[animal.function] || 'bg-faint/15 text-muted'
	const slides = useMemo(() => buildSlides(animal.img, animal.vid), [animal.img, animal.vid])
	const totalMedia = slides.length
	const [imgIdx, setImgIdx] = useState(0)

	const countLabel = (() => {
		const c = animal.count
		if (c === '1') return null
		if (c === '100+') return 'Colony (100+)'
		const n = parseInt(c)
		if (!isNaN(n)) return `${n} kept`
		return c
	})()

	return (
		<FadeIn delay={index * 50}>
			<article
				className="rounded-2xl border border-white/8 overflow-hidden transition-all duration-300
					hover:border-white/15 hover:shadow-lg hover:shadow-accent/5"
				style={{
					background: 'linear-gradient(160deg, rgba(13,33,55,0.7) 0%, rgba(12,11,20,0.85) 100%)',
					borderLeft: `3px solid ${accent}`
				}}
			>
				{/* hero image */}
				{animal.img.length > 0 && (
					<div className="relative group/img cursor-pointer" onClick={() => onOpenGallery(slides, imgIdx, animal.organism)}>
						<AnimalImage
							key={animal.img[imgIdx]}
							name={animal.img[imgIdx]}
							alt={animal.organism}
							className="w-full max-h-[400px] object-cover border-0 hover:border-0 rounded-none"
						/>
						<div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
							<span className="text-white/0 group-hover/img:text-white/90 transition-colors text-sm font-medium tracking-wide">
								{totalMedia > 1 ? `View gallery (${totalMedia})` : 'View full image'}
							</span>
						</div>
						{animal.img.length > 1 && (
							<>
								<button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + animal.img.length) % animal.img.length) }}
									className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-colors">
									&#8249;
								</button>
								<button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % animal.img.length) }}
									className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-colors">
									&#8250;
								</button>
							</>
						)}
						<span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white/60 border border-white/10">
							{tankCategory}
						</span>
						{animal.img.length > 1 && (
							<div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs text-white/80 font-medium">
								{imgIdx + 1} / {animal.img.length}
							</div>
						)}
					</div>
				)}

				<div className="p-6 sm:p-8">
					{/* name + count */}
					<div className="flex items-start justify-between gap-4 mb-1">
						<h3 className="text-text text-xl sm:text-2xl font-bold leading-tight">{animal.organism}</h3>
						{countLabel && (
							<span className="shrink-0 text-accent text-lg font-bold tracking-tight mt-0.5">
								{countLabel}
							</span>
						)}
					</div>

					{/* species */}
					<p className="text-muted text-base italic mb-5">{animal.species}</p>

					{/* trait badges */}
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/8 text-sm leading-none" title={animal.type}>
							{typeIcon[animal.type] || '\u{1F4A7}'}
						</span>
						<span className={`text-xs font-semibold rounded-full px-3 py-1 ${badge}`}>
							{animal.function}
						</span>
						<span
							className={`text-xs font-semibold rounded-full px-3 py-1 ${
								animal.domesticity === 'wild'
									? 'bg-cyan-500/10 text-cyan-300'
									: 'bg-purple-500/10 text-purple-300'
							}`}
						>
							{animal.domesticity}
						</span>
					</div>

					{/* info rows */}
					{animal.description && (
						<p className="text-sm text-muted/90 leading-relaxed mb-5">
							{animal.description}
						</p>
					)}

					{animal.vid.length > 0 && (
						<button
							className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light transition-colors mb-5 group/vid"
							onClick={() => onOpenGallery(slides, slides.findIndex(s => s.type === 'video'), animal.organism)}>
							<span className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center group-hover/vid:bg-accent/25 transition-colors">
								<span className="text-xs ml-0.5">&#9654;</span>
							</span>
							Watch video{animal.vid.length > 1 ? 's' : ''}
						</button>
					)}

					<div className="space-y-3 text-sm">
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Here since</span>
							<span className="text-text">
								{formatDate(animal.hereSince)}
								<span className="text-accent-light ml-1.5">({getTimeSince(animal.hereSince)})</span>
							</span>
						</div>
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Activity</span>
							<span className="text-text">{animal.diurnality}</span>
						</div>
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Longevity</span>
							<span className="text-text">
								{animal.longevity === 'indefinite' ? 'indefinite' : `${animal.longevity} years`}
							</span>
						</div>
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Origin</span>
							<span className="text-text">{animal.location}</span>
						</div>
					</div>

					{/* thumbnail strip for gallery (images + video) */}
					{totalMedia > 1 && (
						<div className="flex gap-2 mt-6 overflow-x-auto pb-1">
							{animal.img.map((im, i) => (
								<button key={im}
									className="shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-colors p-0 bg-transparent"
									onClick={() => onOpenGallery(slides, i, animal.organism)}>
									<AnimalImage name={im} alt={`${animal.organism} ${i + 1}`}
										className="h-16 w-24 object-cover border-0 hover:border-0 rounded-none" />
								</button>
							))}
							{animal.vid.length > 0 && slides.filter(s => s.type === 'video').map((s, vi) => {
							const vidId = s.type === 'video' ? s.url.split('/embed/')[1] : ''
							return (
								<button key={`vid-${vi}`}
									className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-colors p-0 bg-transparent relative"
									onClick={() => onOpenGallery(slides, animal.img.length + vi, animal.organism)}>
									<img src={`https://img.youtube.com/vi/${vidId}/mqdefault.jpg`} alt="Video" className="w-full h-full object-cover border-0 hover:border-0 rounded-none" />
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
										<span className="text-white text-lg drop-shadow">&#9654;</span>
									</div>
								</button>
							)
						})}
						</div>
					)}

					{/* video-only (no images) */}
					{animal.img.length === 0 && animal.vid.length > 0 && (
						<button
							className="mt-5 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-accent font-semibold hover:bg-accent/10 transition-colors"
							onClick={() => onOpenGallery(slides, 0, animal.organism)}>
							&#9654; Watch video{animal.vid.length > 1 ? 's' : ''}
						</button>
					)}
				</div>
			</article>
		</FadeIn>
	)
}

/* ── former animal entry (muted, compact) ───────────────────── */

const FormerAnimalEntry = ({ animal, index, tankCategory, onOpenGallery }: {
	animal: Animal
	index: number
	tankCategory: string
	onOpenGallery: (slides: GallerySlide[], startIndex: number, organism: string) => void
}) => {
	const slides = useMemo(() => buildSlides(animal.img, animal.vid), [animal.img, animal.vid])
	const totalMedia = slides.length
	const [imgIdx, setImgIdx] = useState(0)

	return (
		<FadeIn delay={index * 50}>
			<article
				className="rounded-2xl border border-white/8 overflow-hidden grayscale opacity-50"
				style={{ background: 'linear-gradient(160deg, rgba(13,33,55,0.5) 0%, rgba(12,11,20,0.7) 100%)' }}
			>
				{/* hero image */}
				{animal.img.length > 0 && (
					<div className="relative group/img cursor-pointer" onClick={() => onOpenGallery(slides, imgIdx, animal.organism)}>
						<AnimalImage
							key={animal.img[imgIdx]}
							name={animal.img[imgIdx]}
							alt={animal.organism}
							className="w-full max-h-[300px] object-cover border-0 hover:border-0 rounded-none"
						/>
						<div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
							<span className="text-white/0 group-hover/img:text-white/90 transition-colors text-sm font-medium tracking-wide">
								{totalMedia > 1 ? `View gallery (${totalMedia})` : 'View full image'}
							</span>
						</div>
						{animal.img.length > 1 && (
							<>
								<button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + animal.img.length) % animal.img.length) }}
									className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-colors">
									&#8249;
								</button>
								<button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % animal.img.length) }}
									className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-colors">
									&#8250;
								</button>
							</>
						)}
						<span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white/60 border border-white/10">
							{tankCategory}
						</span>
						{animal.img.length > 1 && (
							<div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs text-white/80 font-medium">
								{imgIdx + 1} / {animal.img.length}
							</div>
						)}
					</div>
				)}

				<div className="p-6 sm:p-8">
					{/* name + "no longer kept" */}
					<div className="flex items-start justify-between gap-4 mb-1">
						<h3 className="text-text text-xl sm:text-2xl font-bold leading-tight">{animal.organism}</h3>
						<span className="shrink-0 text-xs text-muted/60 font-medium mt-1.5">no longer kept</span>
					</div>

					{/* species */}
					<p className="text-muted text-base italic mb-5">{animal.species}</p>

					{/* trait badges */}
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/8 text-sm leading-none opacity-60" title={animal.type}>
							{typeIcon[animal.type] || '\u{1F4A7}'}
						</span>
						<span className="text-xs font-semibold rounded-full px-3 py-1 bg-white/5 text-muted">
							{animal.function}
						</span>
						<span className="text-xs font-semibold rounded-full px-3 py-1 bg-white/5 text-muted">
							{animal.domesticity}
						</span>
					</div>

					{animal.description && (
						<p className="text-sm text-muted/70 leading-relaxed mb-5">
							{animal.description}
						</p>
					)}

					{/* info rows — no origin, no here_since */}
					<div className="space-y-3 text-sm">
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Activity</span>
							<span className="text-muted">{animal.diurnality}</span>
						</div>
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Longevity</span>
							<span className="text-muted">
								{animal.longevity === 'indefinite' ? 'indefinite' : `${animal.longevity} years`}
							</span>
						</div>
					</div>

					{/* thumbnail strip */}
					{totalMedia > 1 && (
						<div className="flex gap-2 mt-6 overflow-x-auto pb-1">
							{animal.img.map((im, i) => (
								<button key={im}
									className="shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors p-0 bg-transparent"
									onClick={() => onOpenGallery(slides, i, animal.organism)}>
									<AnimalImage name={im} alt={`${animal.organism} ${i + 1}`}
										className="h-16 w-24 object-cover border-0 hover:border-0 rounded-none" />
								</button>
							))}
							{animal.vid.length > 0 && slides.filter(s => s.type === 'video').map((s, vi) => {
							const vidId = s.type === 'video' ? s.url.split('/embed/')[1] : ''
							return (
								<button key={`vid-${vi}`}
									className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors p-0 bg-transparent relative"
									onClick={() => onOpenGallery(slides, animal.img.length + vi, animal.organism)}>
									<img src={`https://img.youtube.com/vi/${vidId}/mqdefault.jpg`} alt="Video" className="w-full h-full object-cover border-0 hover:border-0 rounded-none" />
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
										<span className="text-white text-lg drop-shadow">&#9654;</span>
									</div>
								</button>
							)
						})}
						</div>
					)}
				</div>
			</article>
		</FadeIn>
	)
}

/* ── main page ───────────────────────────────────────────── */

const Animals = () => {
	const tanks = tanksData as Tank[]
	const allAnimals = animalsData as Animal[]
	const [activeTank, setActiveTank] = useState<Tank | null>(null)
	const [gallery, setGallery] = useState<{ slides: GallerySlide[]; index: number; organism: string } | null>(null)
	const [showTable, setShowTable] = useState(false)
	const activeAnimals = useMemo(() => allAnimals.filter(a => a.count !== '0'), [allAnimals])

	const openGallery = useCallback((slides: GallerySlide[], index: number, organism: string) => {
		setGallery({ slides, index, organism })
	}, [])

	return (
		<>
			<style>{`
				@keyframes bubbleRise {
					0%   { transform: translateY(0) translateX(0); opacity: 0; }
					10%  { opacity: 1; }
					90%  { opacity: 1; }
					100% { transform: translateY(-105vh) translateX(20px); opacity: 0; }
				}
				@keyframes shimmer {
					0%, 100% { opacity: 0.03; }
					50%      { opacity: 0.07; }
				}
			`}</style>

			<Bubbles />

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
								Animals I Keep
							</span>
						</h1>
					</FadeIn>
					<FadeIn delay={100}>
						<p className="text-muted max-w-lg mx-auto text-base">
							A collection of organisms I keep — currently{' '}
							<button onClick={() => setShowTable(true)} className="text-accent font-semibold hover:text-accent-light transition-colors cursor-pointer">
								{activeAnimals.length} species
							</button>.
						</p>
					</FadeIn>
					</div>
				</header>

				{/* ── tank sections ─────────────────────────────── */}
				<main className="max-w-3xl mx-auto px-6 pb-20">
					{tanks.map((tank) => {
						const tankAnimals = allAnimals.filter((p) => p.tank === tank.id && p.organism)
						const active = tankAnimals.filter((p) => p.count !== '0')
						const former = tankAnimals.filter((p) => p.count === '0')

						return (
							<section key={tank.id} className="mb-20">
								{/* tank header */}
								<FadeIn>
									<button
										onClick={() => setActiveTank(tank)}
										className="w-full text-left mb-10 group/tank rounded-2xl border border-accent/20
											hover:border-accent/50 p-5 sm:p-6 transition-all duration-300
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
									{active.map((animal, i) => (
										<AnimalEntry key={animal.organism} animal={animal} index={i} tankCategory={tank.category} onOpenGallery={openGallery} />
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
											{former.map((animal, i) => (
												<FormerAnimalEntry key={animal.organism} animal={animal} index={i} tankCategory={tank.category} onOpenGallery={openGallery} />
											))}
										</div>
									</div>
								)}
							</section>
						)
					})}
				</main>
			</div>

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
					<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
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
