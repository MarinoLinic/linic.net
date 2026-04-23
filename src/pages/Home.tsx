import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Circles from '../components/_Circles'
import Navigation from '../components/_Navigation'
import { usePageSEO } from '../hooks/usePageSEO'
import type { CSSProperties } from 'react'

const NAV_LINKS = [
	{ to: '/socials',   label: 'Socials'   },
	{ to: '/this-page-does-not-exist', label: '404' },
]

const Home = () => {
	usePageSEO()
	const [hovering, setHovering]   = useState(false)
	const [loaded,   setLoaded]     = useState(false)
	const [visible,  setVisible]    = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		if (imgRef.current?.complete) setLoaded(true)
	}, [])

	useEffect(() => {
		if (!loaded) return
		const id = requestAnimationFrame(() => setVisible(true))
		return () => cancelAnimationFrame(id)
	}, [loaded])

	const stagger = (delay: number): CSSProperties => ({
		opacity:    visible ? 1 : 0,
		transform:  visible ? 'none' : 'translateY(12px)',
		transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
	})

	return (
		<div className={`min-h-dvh flex flex-col transition-opacity duration-500${loaded ? '' : ' opacity-0'}`}>
			<Navigation />
			<div className="flex flex-col items-center justify-center flex-1 relative px-6">

				{/* Role — hover slides in the second line */}
				<div
					className="relative h-5 w-full flex justify-center cursor-default mb-3"
					style={stagger(0)}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				>
					<span className={`absolute text-[11px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 text-quarternary ${hovering ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
						Developer
					</span>
					<span className={`absolute text-[11px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 text-secondary ${hovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
						& musician, photographer
					</span>
				</div>

				{/* Name */}
				<h1 className="cursor-default" style={stagger(80)}>Marino Linić</h1>

				{/* Gradient divider */}
				<div
					className="h-px w-16 rounded-full mt-4 mb-5"
					style={{ ...stagger(150), background: 'linear-gradient(90deg, #7c70ff, #ff5c7c, #d94fc0)' }}
				/>

				{/* Photo */}
				<div style={stagger(230)}>
					<img
						ref={imgRef}
						src="ml.jpg"
						alt="Marino Linić"
						onLoad={() => setLoaded(true)}
						className="w-32 h-32 rounded-2xl grayscale hover:grayscale-0 transition-all hover:shadow-[0_0_28px_rgba(124,112,255,0.4)]"
					/>
				</div>

				{/* Tagline */}
				<p className="text-muted/60 text-sm text-center mt-5" style={stagger(310)}>
					Let's get in touch!
				</p>

				{/* Nav pills */}
				<div className="flex gap-2 mt-5 flex-wrap justify-center" style={stagger(390)}>
					{NAV_LINKS.map(({ to, label }) => (
						<Link
							key={to}
							to={to}
							className="px-4 py-1.5 rounded-full text-xs font-semibold bg-surface border border-divider text-muted hover:text-tertiary hover:border-tertiary transition-all duration-200"
						>
							{label}
						</Link>
					))}
				</div>

				<Circles />
			</div>
		</div>
	)
}

export default Home
