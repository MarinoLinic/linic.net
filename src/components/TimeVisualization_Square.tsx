import { memo, useRef, useEffect, useState } from 'react'
import type { MouseEvent } from 'react'

const CELL = 18
const SQ   = 16

interface Popup { vx: number; vy: number; idx: number }
interface Props {
	total: number
	elapsed: number
	unit: string
	onSelect: (n: number | null) => void
}

const SquaresGrid = memo(({ total, elapsed, unit, onSelect }: Props) => {
	const canvasRef    = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const colsRef      = useRef(1)
	const selectedRef  = useRef<number | null>(null)
	const totalRef     = useRef(total)
	const elapsedRef   = useRef(elapsed)
	const onSelectRef  = useRef(onSelect)
	const [popup, setPopup] = useState<Popup | null>(null)

	totalRef.current   = total
	elapsedRef.current = elapsed
	onSelectRef.current = onSelect

	function draw() {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		const dpr     = window.devicePixelRatio || 1
		const cols    = colsRef.current
		const tot     = totalRef.current
		const el      = elapsedRef.current

		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

		for (let i = 0; i < tot; i++) {
			const col = i % cols
			const row = Math.floor(i / cols)
			const x   = col * CELL
			const y   = row * CELL

			if (i === selectedRef.current) {
				ctx.globalAlpha = 1
				ctx.fillStyle   = '#4ecdc4'
			} else if (i < el) {
				ctx.globalAlpha = 1
				ctx.fillStyle   = '#7c70ff'
			} else {
				ctx.globalAlpha = 0.22
				ctx.fillStyle   = '#7c70ff'
			}
			ctx.fillRect(x, y, SQ, SQ)
		}
		ctx.globalAlpha = 1
	}

	function initCanvas() {
		const canvas    = canvasRef.current
		const container = containerRef.current
		if (!canvas || !container) return
		const w    = container.offsetWidth
		const cols = Math.max(1, Math.floor(w / CELL))
		colsRef.current = cols
		const rows = Math.ceil(totalRef.current / cols)
		const dpr  = window.devicePixelRatio || 1
		canvas.width        = w * dpr
		canvas.height       = rows * CELL * dpr
		canvas.style.width  = w + 'px'
		canvas.style.height = rows * CELL + 'px'
		draw()
	}

	useEffect(() => {
		selectedRef.current = null
		setPopup(null)
		onSelectRef.current(null)
		initCanvas()
	}, [total, elapsed, unit])

	useEffect(() => {
		initCanvas()
		const container = containerRef.current
		if (!container) return
		const ro = new ResizeObserver(initCanvas)
		ro.observe(container)
		return () => ro.disconnect()
	}, [])

	function handleClick(e: MouseEvent<HTMLCanvasElement>) {
		const canvas = canvasRef.current
		if (!canvas) return
		const rect  = canvas.getBoundingClientRect()
		const dpr   = window.devicePixelRatio || 1
		const scaleX = (canvas.width / dpr) / rect.width
		const scaleY = (canvas.height / dpr) / rect.height
		const x      = (e.clientX - rect.left) * scaleX
		const y      = (e.clientY - rect.top)  * scaleY
		const col    = Math.floor(x / CELL)
		const row    = Math.floor(y / CELL)
		const idx    = row * colsRef.current + col

		if (idx < 0 || idx >= totalRef.current) return

		if (selectedRef.current === idx) {
			selectedRef.current = null
			setPopup(null)
			onSelectRef.current(null)
		} else {
			selectedRef.current = idx
			const vy = e.clientY < 60 ? e.clientY + 14 : e.clientY - 40
			setPopup({ vx: e.clientX, vy, idx })
			onSelectRef.current(idx + 1)
		}
		draw()
	}

	return (
		<div ref={containerRef} className="relative w-full">
			<canvas
				ref={canvasRef}
				onClick={handleClick}
				style={{ cursor: 'pointer', display: 'block' }}
			/>
			{popup && (
				<div
					style={{
						position: 'fixed',
						left: popup.vx + 14,
						top:  popup.vy,
						background: '#181626',
						border: '1px solid #3a3858',
						color: '#f0eef8',
						padding: '5px 12px',
						borderRadius: '8px',
						fontSize: '13px',
						fontFamily: 'monospace',
						whiteSpace: 'nowrap',
						zIndex: 50,
						pointerEvents: 'none',
						boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
					}}
				>
					{unit} {popup.idx + 1} of {total.toLocaleString()}
				</div>
			)}
		</div>
	)
})

SquaresGrid.displayName = 'SquaresGrid'

export default SquaresGrid
