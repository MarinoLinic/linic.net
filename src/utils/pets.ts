import type { GallerySlide } from '../types/pets'

/* ── date helpers ─────────────────────────────────────────── */

export function getTimeSince(dateStr: string): string {
	const start = new Date(dateStr + 'T00:00:00')
	const now = new Date()
	if (start > now) return 'arriving soon'

	let years = now.getFullYear() - start.getFullYear()
	let months = now.getMonth() - start.getMonth()
	let days = now.getDate() - start.getDate()

	if (days < 0) {
		months--
		const prev = new Date(now.getFullYear(), now.getMonth(), 0)
		days += prev.getDate()
	}
	if (months < 0) {
		years--
		months += 12
	}

	const parts: string[] = []
	if (years > 0) parts.push(years === 1 ? '1 year' : `${years} years`)
	if (months > 0) parts.push(months === 1 ? '1 month' : `${months} months`)
	if (years === 0 && days > 0) parts.push(days === 1 ? '1 day' : `${days} days`)

	return parts.join(', ') || 'today'
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}

/* ── slug ─────────────────────────────────────────────────── */

export function animalSlug(name: string): string {
	return 'a-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')
}

/* ── gallery slide builder ────────────────────────────────── */

export function buildSlides(images: string[], vids: string[]): GallerySlide[] {
	const slides: GallerySlide[] = images.map((name) => ({ type: 'image', name }))
	for (const vid of vids) {
		const m = vid.match(/(?:v=|youtu\.be\/)([-\w]+)/)
		if (m) slides.push({ type: 'video', url: `https://www.youtube.com/embed/${m[1]}` })
	}
	return slides
}

/* ── lookup tables ────────────────────────────────────────── */

export const functionAccent: Record<string, string> = {
	omnivore: '#f59e0b',
	grazer: '#10b981',
	scavenger: '#eab308',
	'filter-feeder': '#0ea5e9',
	producer: '#84cc16',
	carnivore: '#ef4444'
}

export const functionBadge: Record<string, string> = {
	omnivore: 'bg-amber-500/15 text-amber-300',
	grazer: 'bg-emerald-500/15 text-emerald-300',
	scavenger: 'bg-yellow-500/15 text-yellow-300',
	'filter-feeder': 'bg-sky-500/15 text-sky-300',
	producer: 'bg-lime-500/15 text-lime-300',
	carnivore: 'bg-red-500/15 text-red-300'
}

export const typeIcon: Record<string, string> = {
	fish: '\u{1F41F}',
	snail: '\u{1F40C}',
	shrimp: '\u{1F990}',
	crab: '\u{1F980}',
	'brittle star': '\u{2B50}',
	chiton: '\u{1F41A}',
	worm: '\u{1FAB1}',
	plankton: '\u{1F9A0}',
	alga: '\u{1F33F}'
}
