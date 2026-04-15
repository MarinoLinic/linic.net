import { useState, useEffect, useRef, useCallback } from 'react'
import type { GallerySlide } from '../../types/pets'
import AnimalImage from './AnimalImage'

const ZOOM_SCALE = 2.8

const tdist = (a: { clientX: number; clientY: number }, b: { clientX: number; clientY: number }) =>
	Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY)

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
	// Desktop zoom (click-to-zoom via transformOrigin)
	const [zoomed, setZoomed] = useState(false)
	const [origin, setOrigin] = useState('50% 50%')
	// Touch zoom (pinch + pan via translate)
	const [tScale, setTScale] = useState(1)
	const [tOffset, setTOffset] = useState({ x: 0, y: 0 })

	const imgRef = useRef<HTMLDivElement>(null)
	const pinchRef = useRef<{ dist: number; scale: number } | null>(null)
	const panRef = useRef<{ x: number; y: number } | null>(null)
	const tapRef = useRef(0)
	const swipeRef = useRef<{ x: number; moved: boolean } | null>(null)
	const touchActiveRef = useRef(false)

	const isTouchZoomed = tScale > 1.05
	const anyZoomed = zoomed || isTouchZoomed

	const resetZoom = useCallback(() => {
		setZoomed(false)
		setTScale(1)
		setTOffset({ x: 0, y: 0 })
	}, [])

	const prev = useCallback(() => { resetZoom(); setIdx((i) => (i - 1 + slides.length) % slides.length) }, [slides.length, resetZoom])
	const next = useCallback(() => { resetZoom(); setIdx((i) => (i + 1) % slides.length) }, [slides.length, resetZoom])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') { if (anyZoomed) resetZoom(); else onClose() }
			if (e.key === 'ArrowLeft') prev()
			if (e.key === 'ArrowRight') next()
		}
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKey)
		return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
	}, [onClose, prev, next, anyZoomed, resetZoom])

	// ── Desktop mouse handlers ──
	const handleImageClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (touchActiveRef.current) { touchActiveRef.current = false; return }
		if (slides[idx].type !== 'image') return
		if (zoomed) { setZoomed(false); return }
		const el = imgRef.current
		if (!el) return
		const rect = el.getBoundingClientRect()
		setOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`)
		setZoomed(true)
	}

	const handleZoomedMove = (e: React.MouseEvent) => {
		if (!zoomed) return
		const el = imgRef.current
		if (!el) return
		const rect = el.getBoundingClientRect()
		setOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`)
	}

	// ── Touch handlers (pinch, pan, double-tap, swipe) ──
	const onTouchStart = useCallback((e: React.TouchEvent) => {
		touchActiveRef.current = true
		if (slides[idx].type !== 'image') return
		if (e.touches.length === 2) {
			pinchRef.current = { dist: tdist(e.touches[0], e.touches[1]), scale: tScale }
			panRef.current = null
			swipeRef.current = null
		} else if (e.touches.length === 1) {
			if (isTouchZoomed) {
				panRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
			} else {
				swipeRef.current = { x: e.touches[0].clientX, moved: false }
			}
			const now = Date.now()
			if (now - tapRef.current < 300) {
				if (isTouchZoomed) resetZoom()
				else { setTScale(ZOOM_SCALE); setTOffset({ x: 0, y: 0 }) }
				swipeRef.current = null
			}
			tapRef.current = now
		}
	}, [idx, slides, tScale, isTouchZoomed, resetZoom])

	const onTouchMove = useCallback((e: React.TouchEvent) => {
		if (e.touches.length === 2 && pinchRef.current) {
			const d = tdist(e.touches[0], e.touches[1])
			setTScale(Math.max(1, Math.min(pinchRef.current.scale * (d / pinchRef.current.dist), 5)))
		} else if (e.touches.length === 1 && isTouchZoomed && panRef.current) {
			const dx = e.touches[0].clientX - panRef.current.x
			const dy = e.touches[0].clientY - panRef.current.y
			panRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
			setTOffset(p => ({ x: p.x + dx / tScale, y: p.y + dy / tScale }))
		} else if (swipeRef.current) {
			swipeRef.current.moved = true
		}
	}, [tScale, isTouchZoomed])

	const onTouchEnd = useCallback((e: React.TouchEvent) => {
		if (swipeRef.current?.moved && e.changedTouches.length === 1) {
			const dx = e.changedTouches[0].clientX - swipeRef.current.x
			if (Math.abs(dx) > 60) { if (dx < 0) next(); else prev() }
		}
		swipeRef.current = null
		pinchRef.current = null
		panRef.current = null
		if (tScale < 1.05) { setTScale(1); setTOffset({ x: 0, y: 0 }) }
	}, [tScale, prev, next])

	// ── Image transform ──
	const imgStyle = tScale !== 1
		? { transform: `scale(${tScale}) translate(${tOffset.x}px, ${tOffset.y}px)`, transformOrigin: 'center center' as const }
		: { transform: zoomed ? `scale(${ZOOM_SCALE})` : 'scale(1)', transformOrigin: origin, transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }

	const slide = slides[idx]

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={() => { if (anyZoomed) resetZoom(); else onClose() }}>
			<div className="absolute inset-0 bg-black/95" />

			<button onClick={onClose}
				className="absolute top-4 right-4 z-10 text-white/80 hover:text-white text-xl w-8 h-8 sm:text-2xl sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 hover:border-white/30 transition-colors">
				&times;
			</button>

			{slides.length > 1 && (
				<>
					<button onClick={(e) => { e.stopPropagation(); prev() }}
						className="absolute left-2 sm:left-4 z-10 text-white/80 hover:text-white text-xl w-8 h-8 sm:text-2xl sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 hover:border-white/30 transition-colors">
						&#8249;
					</button>
					<button onClick={(e) => { e.stopPropagation(); next() }}
						className="absolute right-2 sm:right-4 z-10 text-white/80 hover:text-white text-xl w-8 h-8 sm:text-2xl sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 hover:border-white/30 transition-colors">
						&#8250;
					</button>
				</>
			)}

			{slide.type === 'image' ? (
				<div
					ref={imgRef}
					className={`relative max-w-4xl max-h-[85vh] px-4 overflow-hidden touch-none ${anyZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
					onClick={handleImageClick}
					onMouseMove={handleZoomedMove}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					<AnimalImage name={slide.name} alt={organism}
						className="max-h-[80vh] w-auto mx-auto rounded-xl object-contain border-0 hover:border-0 select-none"
						priority
						style={imgStyle}
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
