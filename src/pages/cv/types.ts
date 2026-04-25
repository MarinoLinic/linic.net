export interface ContactItem { value: string; included: boolean; tags: string }
export interface PersonalInfo {
	name: string; title: string; location: string; profileImage: string
	contact: Record<string, ContactItem>
	summaries: Record<string, string>
}
export interface SectionConfig { id: string; title: string }
export interface ExperienceItem {
	title: string; company: string; duration: string; location: string
	descriptions: Record<string, string>; included: boolean; tags: string
}
export interface ProjectItem {
	title: string; description: string; technologies: string
	included: boolean; tags: string
}
export interface EducationItem {
	degree: string; field: string | null; institution: string; duration: string
	included: boolean; tags: string
}
export interface SkillItem { name: string; included: boolean; tags: string }
export interface LanguageItem { name: string; proficiency: string; included: boolean; tags: string }
export interface LectureItem {
	title: string
	venue: string
	date: string
	location: string
	description?: string
	url?: string
	included: boolean
	tags: string
}
