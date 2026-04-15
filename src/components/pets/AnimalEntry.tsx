import { useState, useMemo } from 'react'
import type { Animal, GallerySlide } from '../../types/pets'
import { getTimeSince, formatDate, buildSlides, functionAccent, functionBadge, typeIcon } from '../../utils/pets'
import FadeIn from './FadeIn'
import AnimalImage from './AnimalImage'

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
					{animal.img.length === 0 && (
						<span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-white/5 text-muted/60 border border-white/8 inline-block mb-3">
							{tankCategory}
						</span>
					)}
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
						<span className="text-base leading-none cursor-default select-none" title={animal.type}>
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
					{(animal.img.length > 1 || animal.vid.length > 0) && (
						<div className="flex gap-2 mt-6 overflow-x-auto pb-1">
							{animal.img.map((im, i) => (
								<button key={im}
									className="shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-colors p-0 bg-transparent"
									onClick={() => onOpenGallery(slides, i, animal.organism)}>
									<AnimalImage name={im} alt={`${animal.organism} ${i + 1}`}
										className="h-16 w-24 object-cover border-0 hover:border-0 rounded-none" thumb />
								</button>
							))}
							{animal.vid.length > 0 && slides.filter(s => s.type === 'video').map((s, vi) => {
							const vidId = s.type === 'video' ? s.url.split('/embed/')[1] : ''
							return (
								<button key={`vid-${vi}`}
									className="shrink-0 w-24 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-colors p-0 bg-transparent relative"
									onClick={() => onOpenGallery(slides, animal.img.length + vi, animal.organism)}>
									<img src={`https://img.youtube.com/vi/${vidId}/mqdefault.jpg`} alt="Video" className="w-full h-full object-cover border-0 hover:border-0 rounded-none" loading="lazy" decoding="async" />
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

export default AnimalEntry
