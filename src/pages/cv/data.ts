import type { SectionConfig, PersonalInfo, ExperienceItem } from './types'

// ─── CV data (static imports) ────────────────────────────────────
import enSectionsRaw from '../../assets/cv/english/sections.json'
import enPersonalInfo from '../../assets/cv/english/personalInfo.json'
import enExperience from '../../assets/cv/english/experience.json'
import enProjects from '../../assets/cv/english/projects.json'
import enEducation from '../../assets/cv/english/education.json'
import enSkills from '../../assets/cv/english/skills.json'
import enCertifications from '../../assets/cv/english/certifications.json'
import enLanguages from '../../assets/cv/english/languages.json'
import hrSectionsRaw from '../../assets/cv/croatian/sections.json'
import hrPersonalInfo from '../../assets/cv/croatian/personalInfo.json'
import hrExperience from '../../assets/cv/croatian/experience.json'
import hrProjects from '../../assets/cv/croatian/projects.json'
import hrEducation from '../../assets/cv/croatian/education.json'
import hrSkills from '../../assets/cv/croatian/skills.json'
import hrCertifications from '../../assets/cv/croatian/certifications.json'
import hrLanguages from '../../assets/cv/croatian/languages.json'
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
const enSections = reorderSections(enSectionsRaw)
const hrSections = reorderSections(hrSectionsRaw)

// ─── Tag labels ──────────────────────────────────────────────────
export const TAG_LABELS: Record<string, string> = {
	frontend: 'Frontend',
	backend: 'Backend',
	python: 'Python',
	web: 'Web',
	automation: 'Automation',
	testing: 'Testing',
	nontech: 'Non-tech',
}

// ─── Static data map ─────────────────────────────────────────────
export const CV_DATA: Record<string, { sections: SectionConfig[]; personalInfo: PersonalInfo; dataMap: Record<string, any> }> = {
	en: {
		sections: enSections as SectionConfig[],
		personalInfo: enPersonalInfo as unknown as PersonalInfo,
		dataMap: { experience: enExperience, projects: enProjects, education: enEducation, skills: enSkills, certifications: enCertifications, languages: enLanguages },
	},
	hr: {
		sections: hrSections as SectionConfig[],
		personalInfo: hrPersonalInfo as unknown as PersonalInfo,
		dataMap: { experience: hrExperience, projects: hrProjects, education: hrEducation, skills: hrSkills, certifications: hrCertifications, languages: hrLanguages },
	},
}
