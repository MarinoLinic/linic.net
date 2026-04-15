import { useMemo } from 'react'

const Bubbles = () => {
	const bubbles = useMemo(
		() =>
			Array.from({ length: 12 }, (_, i) => ({
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
						willChange: 'transform',
				animation: `bubbleRise ${b.duration}s ease-in ${b.delay}s infinite`
					}}
				/>
			))}
		</div>
	)
}

export default Bubbles
