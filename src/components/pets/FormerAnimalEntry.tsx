import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import type { Animal, GallerySlide } from '../../types/pets'
import { buildSlides, typeIcon } from '../../utils/pets'
import AnimalImage from './AnimalImage'

const FormerAnimalEntry = ({ animal, tankCategory, onOpenGallery }: {
	animal: Animal
	tankCategory: string
	onOpenGallery: (slides: GallerySlide[], startIndex: number, organism: string) => void
}) => {
	const slides = useMemo(() => buildSlides(animal.img, animal.vid), [animal.img, animal.vid])
	const totalMedia = slides.length
	const [imgIdx, setImgIdx] = useState(0)

	const thumbRef = useRef<HTMLDivElement>(null)
	const [thumbEdge, setThumbEdge] = useState({ left: false, right: false })

	const updateThumbEdge = useCallback(() => {
		const el = thumbRef.current
		if (!el) return
		setThumbEdge({
			left: el.scrollLeft > 2,
			right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2
		})
	}, [])

	useEffect(() => {
		updateThumbEdge()
		const el = thumbRef.current
		if (!el) return
		const ro = new ResizeObserver(updateThumbEdge)
		ro.observe(el)
		return () => ro.disconnect()
	}, [updateThumbEdge])

	return (
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
							wrapperClassName="max-h-[300px]"
						/>
						<div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
							<span className="text-white/0 group-hover/img:text-white/90 transition-colors text-sm font-medium tracking-wide">
								{totalMedia > 1 ? `View gallery (${totalMedia})` : 'View full image'}
							</span>
						</div>
						{animal.img.length > 1 && (
							<>
								<button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + animal.img.length) % animal.img.length) }}
									className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white text-lg w-7 h-7 sm:text-xl sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/60 border border-white/15 hover:border-white/30 transition-colors">
									&#8249;
								</button>
								<button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % animal.img.length) }}
									className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white text-lg w-7 h-7 sm:text-xl sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/60 border border-white/15 hover:border-white/30 transition-colors">
									&#8250;
								</button>
							</>
						)}
						<span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white/60 border border-white/10">
							{tankCategory}
						</span>
						{animal.img.length > 1 && (
							<div className="absolute bottom-3 right-3 bg-black/70 rounded-lg px-2.5 py-1 text-xs text-white/80 font-medium">
								{imgIdx + 1} / {animal.img.length}
							</div>
						)}
					</div>
				)}

				<div className="p-6 sm:p-8">
					{animal.img.length === 0 && (
						<span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-white/5 text-muted/60 inline-block mb-3">
							{tankCategory}
						</span>
					)}
					{/* name + "no longer kept" */}
					<div className="flex items-start justify-between gap-4 mb-1">
						<h3 className="text-text text-xl sm:text-2xl font-bold leading-tight">{animal.organism}</h3>
						<span className="shrink-0 text-xs text-muted/60 font-medium mt-1.5">no longer kept</span>
					</div>

					{/* species */}
					<p className="text-muted text-base italic mb-5">{animal.species}</p>

					{/* trait badges */}
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<span className="text-base leading-none cursor-default select-none opacity-60" title={animal.type}>
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
						<div className="flex items-baseline gap-2">
							<span className="text-muted w-24 shrink-0">Life stage</span>
							<span className="text-muted">{animal.life_stage}</span>
						</div>
					</div>

					{/* thumbnail strip */}
					{(animal.img.length > 1 || animal.vid.length > 0) && (
						<div className="relative mt-6">
							{thumbEdge.left && (
								<div className="absolute left-0 top-0 bottom-1 w-10 z-10 pointer-events-none"
									style={{ background: 'linear-gradient(to right, #0c0b14, transparent)' }} />
							)}
							{thumbEdge.right && (
								<div className="absolute right-0 top-0 bottom-1 w-10 z-10 pointer-events-none"
									style={{ background: 'linear-gradient(to left, #0c0b14, transparent)' }} />
							)}
							<div ref={thumbRef} className="flex gap-2 overflow-x-auto pb-1" onScroll={updateThumbEdge}>
								{animal.img.map((im, i) => (
									<button key={im}
										className="shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors p-0 bg-transparent"
										onClick={() => onOpenGallery(slides, i, animal.organism)}>
										<AnimalImage name={im} alt={`${animal.organism} ${i + 1}`}
											className="h-16 w-24 object-cover border-0 hover:border-0 rounded-none" thumb />
									</button>
								))}
								{animal.vid.length > 0 && slides.filter(s => s.type === 'video').map((s, vi) => {
									const vidId = s.type === 'video' ? s.url.split('/embed/')[1] : ''
									return (
										<button key={`vid-${vi}`}
											className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors p-0 bg-transparent relative"
											onClick={() => onOpenGallery(slides, animal.img.length + vi, animal.organism)}>
											<img src={`https://img.youtube.com/vi/${vidId}/mqdefault.jpg`} alt="Video" className="w-full h-full object-cover border-0 hover:border-0 rounded-none" loading="lazy" decoding="async" />
											<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
												<span className="text-white text-lg drop-shadow">&#9654;</span>
											</div>
										</button>
									)
								})}
							</div>
						</div>
					)}
				</div>
			</article>
	)
}

export default FormerAnimalEntry
