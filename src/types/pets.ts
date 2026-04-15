export interface Tank {
	id: string
	name: string
	type: string
	volume: string
	brand: string
	category: string
	length_cm: number
	width_cm: number
	height_cm: number
	img: string[]
	vid: string[]
}

export interface Animal {
	tank: string
	count: string
	organism: string
	species: string
	family: string
	function: string
	type: string
	longevity: string
	diurnality: string
	domesticity: string
	location: string
	hereSince: string
	img: string[]
	vid: string[]
	description: string
}

export type GallerySlide = { type: 'image'; name: string } | { type: 'video'; url: string }
