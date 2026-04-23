import { useState, useEffect, useRef, type ReactNode } from 'react'
import Navigation from '../components/_Navigation'
import { usePageSEO } from '../hooks/usePageSEO'

type LinkItem = {
	name: string
	url: string
	handle?: string
	accent: string
}

type Group = {
	title: string
	items: LinkItem[]
}

const groups: Group[] = [
		{
		title: 'Professional',
		items: [
			{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/marino-linic/', handle: 'marino-linic', accent: '#0a66c2' },
			{ name: 'GitHub', url: 'https://github.com/MarinoLinic', handle: 'MarinoLinic', accent: '#a3a3a3' },
			{ name: 'Medium', url: 'https://marinolinic.medium.com/', handle: '@marinolinic', accent: '#00ab6c' },
		]
	},
	{
		title: 'Knowledge',
		items: [
			{ name: 'Goodreads', url: 'https://www.goodreads.com/user/show/76388574-marino-lini', handle: 'Marino Linić', accent: '#f9c16d' },
			{ name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/User:LinicMarino', handle: 'LinicMarino', accent: '#a3a3a3' },
			{ name: 'iNaturalist', url: 'https://www.inaturalist.org/people/marinolinic', handle: 'marinolinic', accent: '#74ac00' },
		]
	},
	{
		title: 'Social Media',
		items: [
			{ name: 'Instagram', url: 'https://instagram.com/marino.linic', handle: '@marino.linic', accent: '#e4405f' },
			{ name: 'Facebook', url: 'https://www.facebook.com/marino.linic', handle: 'marino.linic', accent: '#1877f2' },
			{ name: 'X', url: 'https://twitter.com/MarinoLinic', handle: '@MarinoLinic', accent: '#a3a3a3' },
		]
	},
	{
		title: 'Creative',
		items: [
			{ name: 'Unsplash', url: 'https://unsplash.com/@marinolinic', handle: '@marinolinic', accent: '#a3a3a3' },
			{ name: 'YouTube — Impulse Note', url: 'https://www.youtube.com/@ImpulseNote', handle: '@ImpulseNote', accent: '#ff0000' },
			{ name: 'YouTube — Music', url: 'https://www.youtube.com/channel/UC1nUn8ThCuFM_8VZijqnXyQ', handle: '@marinolinicmusic', accent: '#ff0000' },
			{ name: 'YouTube — Entomology', url: 'https://www.youtube.com/channel/UC_VLETxZwt9He99CBEMPXXg', handle: '@marinoliniczoology', accent: '#ff0000' },
		]
	}
]

const getDomain = (url: string) => {
	try { return new URL(url).hostname.replace('www.', '') }
	catch { return '' }
}

const FadeIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
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
				transform: visible ? 'translateY(0)' : 'translateY(20px)',
				transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`
			}}
		>
			{children}
		</div>
	)
}

const Socials = () => {
	usePageSEO()
	const [loading, setLoading] = useState(true)
	const rafRef = useRef<number>(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = requestAnimationFrame(() => {
				const el = document.documentElement
				const scrolled = el.scrollTop
				const total = el.scrollHeight - el.clientHeight
				setProgress(total > 0 ? (scrolled / total) * 100 : 0)
			})
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			cancelAnimationFrame(rafRef.current)
		}
	}, [])

	return (
		<>
			{/* scroll progress */}
			<div
				className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
				style={{ width: `${progress}%`, background: 'linear-gradient(to right, #7c70ff, #ff5c7c, #d94fc0)' }}
			/>

			<Navigation />

			<div className={loading ? 'hidden' : 'min-h-dvh'}>
				<div className="max-w-xl mx-auto px-6 pt-12 pb-28">

					{/* header */}
					<FadeIn>
						<div className="mb-10">
							<h1>
								<span className="bg-gradient-to-r from-tertiary via-quarternary to-quarnary bg-clip-text text-transparent">
									Socials
								</span>
							</h1>
							<p className="text-muted mt-3">Find me across the web.</p>
						</div>
					</FadeIn>

					{/* profile card */}
					<FadeIn delay={80}>
						<div
							className="flex items-center gap-5 mb-12 p-5 rounded-2xl border border-white/[0.07]"
							style={{ background: '#181626' }}
						>
							<img
								src="https://i.imgur.com/YWpVRdK.jpg"
								alt="Marino Linić"
								className="w-16 h-16 rounded-2xl object-cover shrink-0 border-0 hover:border-0"
								onLoad={() => setLoading(false)}
							/>
							<div>
								<p className="text-text font-semibold text-base">Marino Linić</p>
								<p className="text-muted text-sm mt-0.5">Zagreb, Croatia</p>
							</div>
						</div>
					</FadeIn>

					{/* link groups */}
					<div className="space-y-8">
						{groups.map((group, gi) => (
							<FadeIn key={group.title} delay={140 + gi * 70}>
								<div>
									<p className="text-[11px] text-muted/50 uppercase tracking-widest mb-3 font-semibold px-1">
										{group.title}
									</p>
									<div
										className="rounded-2xl border border-white/[0.07] overflow-hidden divide-y divide-white/[0.05]"
										style={{ background: '#181626' }}
									>
										{group.items.map((item) => (
											<a
												key={item.name}
												href={item.url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 group hover:bg-white/[0.04]"
											>
												{/* favicon icon */}
												<div
													className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center"
													style={{ background: `${item.accent}18` }}
												>
													<img
														src={`https://www.google.com/s2/favicons?domain=${getDomain(item.url)}&sz=32`}
														alt={item.name}
														className="w-[18px] h-[18px] border-0 hover:border-0"
													/>
												</div>

												{/* text */}
												<div className="flex-1 min-w-0">
													<p className="text-text text-sm font-semibold truncate group-hover:text-tertiary-light transition-colors">
														{item.name}
													</p>
													{item.handle && (
														<p className="text-muted/60 text-xs truncate mt-0.5">{item.handle}</p>
													)}
												</div>

												{/* arrow */}
												<span className="text-muted/25 text-base group-hover:text-tertiary transition-colors shrink-0 leading-none">
													↗
												</span>
											</a>
										))}
									</div>
								</div>
							</FadeIn>
						))}
					</div>

					{/* signature */}
					<FadeIn delay={500}>
						<div className="flex justify-center mt-16">
							<img src="WhiteSignature.svg" alt="Signature" className="w-32 opacity-70 hover:opacity-100 transition-opacity border-0 hover:border-0" />
						</div>
					</FadeIn>

				</div>
			</div>
		</>
	)
}

export default Socials
