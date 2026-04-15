import { useState, useEffect } from 'react'

const AnimalImage = ({
	name,
	alt,
	className,
	style,
	onClick,
	priority = false,
	thumb = false
}: {
	name: string
	alt: string
	className?: string
	style?: React.CSSProperties
	onClick?: () => void
	priority?: boolean
	thumb?: boolean
}) => {
	const baseName = thumb ? `${name}-thumb` : name
	const [srcIdx, setSrcIdx] = useState(0)

	useEffect(() => { setSrcIdx(0) }, [name, thumb])

	const sources = [`/pets/${baseName}.webp`, `/pets/${name}.jpg`, `/pets/${name}.JPG`]

	if (srcIdx >= sources.length) return null

	return (
		<img
			src={sources[srcIdx]}
			alt={alt}
			className={className}
			style={style}
			onClick={onClick}
			loading={priority ? 'eager' : 'lazy'}
			decoding="async"
			onError={() => setSrcIdx((i) => i + 1)}
		/>
	)
}

export default AnimalImage
