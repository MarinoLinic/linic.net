import { useState, useEffect, useRef, useCallback } from 'react'
import type { GallerySlide } from '../../types/pets'
import AnimalImage from './AnimalImage'

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
						priority
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

export default Lightbox
