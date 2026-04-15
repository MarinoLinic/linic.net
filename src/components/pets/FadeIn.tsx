import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

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

export default FadeIn
