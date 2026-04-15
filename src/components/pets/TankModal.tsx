import { useEffect } from 'react'
import type { Tank, Animal, GallerySlide } from '../../types/pets'
import { buildSlides } from '../../utils/pets'
import AnimalImage from './AnimalImage'

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
												className="h-14 w-20 object-cover border-0 hover:border-0 rounded-none" thumb />
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

export default TankModal
