import { useState, useEffect } from 'react'

const AnimalImage = ({
	name,
	alt,
	className,
	wrapperClassName,
	style,
	onClick,
	priority = false,
	thumb = false
}: {
	name: string
	alt: string
	className?: string
	wrapperClassName?: string
	style?: React.CSSProperties
	onClick?: () => void
	priority?: boolean
	thumb?: boolean
}) => {
	const baseName = thumb ? `${name}-thumb` : name
	const [srcIdx, setSrcIdx] = useState(0)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => { setSrcIdx(0); setLoaded(false) }, [name, thumb])

	const sources = [`/pets/${baseName}.webp`, `/pets/${name}.jpg`, `/pets/${name}.JPG`]

	if (srcIdx >= sources.length) return null

	return (
		<div
			className={`relative overflow-hidden ${wrapperClassName ?? ''}`}
			style={!loaded && !thumb ? { aspectRatio: '4/3' } : undefined}
		>
			{!loaded && <div className="absolute inset-0 img-skeleton" />}
			<img
				src={sources[srcIdx]}
				alt={alt}
				className={`${className ?? ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
				style={style}
				onClick={onClick}
				loading={priority ? 'eager' : 'lazy'}
				decoding="async"
				onLoad={() => setLoaded(true)}
				onError={() => setSrcIdx((i) => i + 1)}
			/>
		</div>
	)
}

export default AnimalImage
