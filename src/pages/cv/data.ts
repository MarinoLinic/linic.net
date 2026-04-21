import type { SectionConfig, PersonalInfo, ExperienceItem } from './types'
import * as en from '../../assets/cv/en'
import * as hr from '../../assets/cv/hr'
export { default as cvPic } from '../../assets/cv/pic.jpg'

// ─── Helpers ─────────────────────────────────────────────────────
export function filterByTag<T extends { included?: boolean; tags?: string }>(items: any, tag: string | null): T[] {
	if (!Array.isArray(items)) return []
	if (items.length > 0 && typeof items[0] === 'string') return items
	if (tag === 'all') return items
	if (!tag) return items.filter((i: any) => i.included)
	return items.filter((i: any) => i.tags && i.tags.split(',').includes(tag))
}

export function getDescription(item: ExperienceItem, tag: string | null): string {
	if (!tag || tag === 'all' || !item.descriptions) return item.descriptions?.general || ''
	return item.descriptions[tag] || item.descriptions.general || ''
}

export function getSummary(summaries: Record<string, string>, tag: string | null): string {
	if (!tag) return summaries.general
	return summaries[tag] || summaries.general
}

// ─── Reorder sections: education before projects ─────────────────
function reorderSections(sections: any[]) {
	const edu = sections.find(s => s.id === 'education')
	const proj = sections.find(s => s.id === 'projects')
	if (!edu || !proj) return sections
	const eduIdx = sections.indexOf(edu)
	const projIdx = sections.indexOf(proj)
	if (eduIdx > projIdx) {
		const reordered = [...sections]
		reordered.splice(eduIdx, 1)
		reordered.splice(projIdx, 0, edu)
		return reordered
	}
	return sections
}

// ─── Tag labels ──────────────────────────────────────────────────
export const TAG_LABELS: Record<string, string> = {
	frontend:   'Frontend',
	backend:    'Backend',
	python:     'Python',
	web:        'Web',
	automation: 'Automation',
	testing:    'Testing',
	nontech:    'Non-tech',
}

// ─── Essential tags (shown by default in popup) ─────────────────
export const ESSENTIAL_TAGS = ['backend', 'frontend', 'nontech']

// ─── Static data map ─────────────────────────────────────────────
export const CV_DATA: Record<string, { sections: SectionConfig[]; personalInfo: PersonalInfo; dataMap: Record<string, any> }> = {
	en: {
		sections:     reorderSections(en.sections) as SectionConfig[],
		personalInfo: en.personalInfo as unknown as PersonalInfo,
		dataMap: { experience: en.experience, projects: en.projects, education: en.education, skills: en.skills, certifications: en.certifications, languages: en.languages },
	},
	hr: {
		sections:     reorderSections(hr.sections) as SectionConfig[],
		personalInfo: hr.personalInfo as unknown as PersonalInfo,
		dataMap: { experience: hr.experience, projects: hr.projects, education: hr.education, skills: hr.skills, certifications: hr.certifications, languages: hr.languages },
	},
}
