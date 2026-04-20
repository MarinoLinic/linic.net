import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

// ─── CV data (static imports) ────────────────────────────────────
import enSections from '../assets/cv/english/sections.json'
import enPersonalInfo from '../assets/cv/english/personalInfo.json'
import enExperience from '../assets/cv/english/experience.json'
import enProjects from '../assets/cv/english/projects.json'
import enEducation from '../assets/cv/english/education.json'
import enSkills from '../assets/cv/english/skills.json'
import enCertifications from '../assets/cv/english/certifications.json'
import enLanguages from '../assets/cv/english/languages.json'
import hrSections from '../assets/cv/croatian/sections.json'
import hrPersonalInfo from '../assets/cv/croatian/personalInfo.json'
import hrExperience from '../assets/cv/croatian/experience.json'
import hrProjects from '../assets/cv/croatian/projects.json'
import hrEducation from '../assets/cv/croatian/education.json'
import hrSkills from '../assets/cv/croatian/skills.json'
import hrCertifications from '../assets/cv/croatian/certifications.json'
import hrLanguages from '../assets/cv/croatian/languages.json'
import cvPic from '../assets/cv/pic.jpg'

// ─── Types ───────────────────────────────────────────────────────
interface ContactItem { value: string; included: boolean; tags: string }
interface PersonalInfo {
	name: string; title: string; location: string; profileImage: string
	contact: Record<string, ContactItem>
	summaries: Record<string, string>
}
interface SectionConfig { id: string; title: string; dataSource?: string }
interface ExperienceItem {
	title: string; company: string; duration: string; location: string
	descriptions: Record<string, string>; included: boolean; tags: string
}
interface ProjectItem {
	title: string; description: string; technologies: string
	included: boolean; tags: string
}
interface EducationItem {
	degree: string; field: string | null; institution: string; duration: string
	included: boolean; tags: string
}
interface SkillItem { name: string; included: boolean; tags: string }
interface LanguageItem { name: string; proficiency: string; included: boolean; tags: string }

// ─── Helpers ─────────────────────────────────────────────────────
function filterByTag<T extends { included?: boolean; tags?: string }>(items: any, tag: string | null): T[] {
	if (!Array.isArray(items)) return []
	if (items.length > 0 && typeof items[0] === 'string') return items
	if (!tag) return items.filter((i: any) => i.included)
	return items.filter((i: any) => i.tags && i.tags.split(',').includes(tag))
}

function getDescription(item: ExperienceItem, tag: string | null): string {
	if (!tag || !item.descriptions) return item.descriptions?.general || ''
	return item.descriptions[tag] || item.descriptions.general || ''
}

function getSummary(summaries: Record<string, string>, tag: string | null): string {
	if (!tag) return summaries.general
	return summaries[tag] || summaries.general
}

// ─── Tag labels ──────────────────────────────────────────────────
const TAG_LABELS: Record<string, string> = {
	frontend: 'Frontend',
	backend: 'Backend',
	python: 'Python',
	web: 'Web',
	automation: 'Automation',
	testing: 'Testing',
	nontech: 'Non-tech',
}

// ─── Styles ──────────────────────────────────────────────────────
const CV_STYLES = `
.cv-page,
.cv-page *,
.cv-page *::before,
.cv-page *::after {
	box-sizing: border-box;
}

.cv-page {
	--cv-primary: #1e293b;
	--cv-primary-hover: #0f172a;
	--cv-accent: #3b82f6;
	--cv-text: #1e293b;
	--cv-text-secondary: #64748b;
	--cv-text-muted: #94a3b8;
	--cv-border: #e2e8f0;
	--cv-border-accent: #cbd5e1;
	--cv-bg-subtle: #f8fafc;

	font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
	line-height: 1.6;
	color: var(--cv-text);
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
	min-height: 100vh;
}

.cv-page a {
	color: var(--cv-text-secondary);
	font-weight: 400;
	text-decoration: none;
	transition: all 0.2s ease;
}
.cv-page a:hover { color: var(--cv-accent); }

.cv-page h1, .cv-page h2, .cv-page h3 { line-height: 1.1; }
.cv-page p { font-size: inherit; font-weight: 400; line-height: 1.6; margin: 0; }
.cv-page img { border: none !important; }
.cv-page img:hover { border: none !important; }
.cv-page ul { list-style: none; margin: 0; padding: 0; }
.cv-page strong { font-weight: 600; }
.cv-page button:focus { outline: 2px solid var(--cv-accent); outline-offset: 2px; }

/* Controls */
.cv-controls {
	width: 210mm;
	max-width: 95%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
	margin-bottom: 15px;
}
.cv-download-btn {
	background: var(--cv-primary) !important;
	color: white !important;
	border: none !important;
	padding: 12px 24px !important;
	border-radius: 8px !important;
	cursor: pointer;
	font-size: 14px !important;
	font-weight: 500 !important;
	transition: all 0.2s ease;
	font-family: inherit;
	letter-spacing: 0.025em;
}
.cv-download-btn:hover {
	background: var(--cv-primary-hover) !important;
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(30, 41, 59, 0.15);
	border-color: transparent !important;
}
.cv-lang-btn {
	background: white !important;
	color: var(--cv-text) !important;
	border: 1px solid var(--cv-border) !important;
	padding: 12px 24px !important;
	border-radius: 8px !important;
	cursor: pointer;
	font-size: 14px !important;
	font-weight: 500 !important;
	transition: all 0.2s ease;
	font-family: inherit;
	letter-spacing: 0.025em;
}
.cv-lang-btn:hover {
	background: var(--cv-bg-subtle) !important;
	border-color: var(--cv-border-accent) !important;
}

/* CV Container */
.cv-container {
	width: 210mm;
	min-height: 297mm;
	max-width: 95%;
	margin: 0 auto;
	background: white;
	box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04);
	border: 1px solid var(--cv-border);
	position: relative;
}
.cv-content { padding: 2.5cm; }

/* Header */
.cv-header {
	display: flex;
	align-items: center;
	gap: 28px;
	border-bottom: 1px solid var(--cv-border-accent);
	padding-bottom: 24px;
	margin-bottom: 32px;
}
.cv-profile-image {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid var(--cv-border) !important;
	box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}
.cv-profile-image:hover { border-color: var(--cv-border) !important; }
.cv-header-content { flex-grow: 1; }
.cv-name {
	font-size: 2.75em !important;
	font-weight: 700;
	color: var(--cv-primary);
	line-height: 1.1;
	letter-spacing: -0.025em;
	margin-bottom: 4px;
}
.cv-title-text {
	font-size: 1.25em !important;
	color: var(--cv-accent);
	font-weight: 500;
	margin-top: 6px;
	letter-spacing: 0.01em;
}
.cv-contact-info {
	margin-top: 18px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px 24px;
}
.cv-contact-item {
	color: var(--cv-text-secondary) !important;
	text-decoration: none;
	font-size: 0.875em;
	font-weight: 400 !important;
	transition: all 0.2s ease;
	letter-spacing: 0.01em;
}
.cv-contact-item:hover { color: var(--cv-accent) !important; }

/* Sections */
.cv-section { margin-bottom: 32px; }
.cv-section-title {
	font-size: 1.375em !important;
	font-weight: 600;
	color: var(--cv-primary);
	margin-bottom: 18px;
	padding-bottom: 8px;
	border-bottom: 1px solid var(--cv-border);
	letter-spacing: -0.01em;
}

/* Timeline items */
.cv-experience-item,
.cv-education-item,
.cv-project-item {
	position: relative;
	padding-left: 28px;
	padding-bottom: 24px;
}
.cv-experience-item:not(:last-child),
.cv-project-item:not(:last-child) {
	border-left: 1px solid var(--cv-border);
}
.cv-experience-item:last-child,
.cv-project-item:last-child { padding-bottom: 0; }
.cv-experience-item::before,
.cv-education-item::before,
.cv-project-item::before {
	content: '';
	width: 8px;
	height: 8px;
	background: var(--cv-accent);
	border: 2px solid white;
	border-radius: 50%;
	position: absolute;
	left: -5px;
	top: 6px;
	box-shadow: 0 0 0 1px var(--cv-border);
}
.cv-item-header { margin-bottom: 6px; }
.cv-item-title {
	font-weight: 600;
	font-size: 1.125em;
	color: var(--cv-primary);
	line-height: 1.3;
	letter-spacing: -0.01em;
}
.cv-item-subtitle {
	font-weight: 500;
	color: var(--cv-text-secondary);
	margin-top: 2px;
	letter-spacing: 0.01em;
}
.cv-item-meta {
	color: var(--cv-text-muted);
	font-size: 0.875em;
	font-weight: 400;
	margin-bottom: 10px;
	letter-spacing: 0.01em;
}
.cv-description {
	color: var(--cv-text);
	font-weight: 400;
	line-height: 1.65;
}
.cv-technologies { margin-top: 10px; font-size: 0.875em; line-height: 1.6; }
.cv-technologies strong { color: var(--cv-primary); font-weight: 600; }

/* Skills */
.cv-skills-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 20px;
}
.cv-skill-category-title {
	font-weight: 600;
	color: var(--cv-primary);
	margin-bottom: 6px;
	font-size: 0.9em;
	letter-spacing: 0.025em;
	text-transform: uppercase;
}
.cv-skill-list { color: var(--cv-text); font-weight: 400; line-height: 1.6; }

/* Data lists */
.cv-data-list { list-style: none; }
.cv-data-list li {
	position: relative;
	padding-left: 24px;
	margin-bottom: 6px;
	font-weight: 400;
	line-height: 1.6;
}
.cv-data-list li::before {
	content: '✓';
	color: var(--cv-accent);
	position: absolute;
	left: 0;
	font-weight: 600;
	font-size: 0.875em;
}

/* Back-to-home button (light theme) */
.cv-back-btn {
	position: fixed;
	top: 16px;
	left: 16px;
	z-index: 40;
	display: block;
	padding: 8px;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(4px);
	border: 1px solid var(--cv-border);
	border-radius: 12px;
	transition: all 0.2s;
	text-decoration: none;
}
.cv-back-btn:hover {
	border-color: var(--cv-border-accent);
	box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}
.cv-back-btn img {
	width: 20px;
	height: 20px;
	display: block;
}

/* Tag filter button */
.cv-filter-btn {
	background: white !important;
	color: var(--cv-text) !important;
	border: 1px solid var(--cv-border) !important;
	padding: 12px 24px !important;
	border-radius: 8px !important;
	cursor: pointer;
	font-size: 14px !important;
	font-weight: 500 !important;
	transition: all 0.2s ease;
	font-family: inherit;
	letter-spacing: 0.025em;
	display: flex;
	align-items: center;
	gap: 8px;
}
.cv-filter-btn:hover {
	background: var(--cv-bg-subtle) !important;
	border-color: var(--cv-border-accent) !important;
}
.cv-filter-btn.has-tag {
	border-color: var(--cv-accent) !important;
}
.cv-tag-badge {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	background: #eff6ff;
	color: var(--cv-accent);
	padding: 2px 10px;
	border-radius: 100px;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.02em;
}
.cv-tag-clear {
	cursor: pointer;
	opacity: 0.5;
	transition: opacity 0.15s;
	font-size: 15px;
	line-height: 1;
}
.cv-tag-clear:hover { opacity: 1; }

/* Tag popup */
.cv-tag-overlay {
	position: fixed;
	inset: 0;
	z-index: 100;
	background: rgba(15, 23, 42, 0.4);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	animation: cv-fade-in 0.15s ease;
}
@keyframes cv-fade-in {
	from { opacity: 0; }
	to { opacity: 1; }
}
.cv-tag-popup {
	background: white;
	border-radius: 16px;
	box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);
	padding: 32px;
	max-width: 480px;
	width: 90%;
	animation: cv-popup-in 0.2s ease;
}
@keyframes cv-popup-in {
	from { opacity: 0; transform: scale(0.95) translateY(8px); }
	to { opacity: 1; transform: scale(1) translateY(0); }
}
.cv-tag-popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8px;
}
.cv-tag-popup-title {
	font-size: 1.125em !important;
	font-weight: 600;
	color: var(--cv-primary);
	letter-spacing: -0.01em;
}
.cv-tag-popup-close {
	background: none !important;
	border: none !important;
	padding: 4px 8px !important;
	font-size: 20px !important;
	color: var(--cv-text-muted) !important;
	cursor: pointer;
	border-radius: 6px !important;
	transition: all 0.15s;
	line-height: 1;
}
.cv-tag-popup-close:hover {
	color: var(--cv-text) !important;
	background: var(--cv-bg-subtle) !important;
}
.cv-tag-popup-subtitle {
	color: var(--cv-text-muted);
	font-size: 0.875em;
	margin-bottom: 20px;
}
.cv-tag-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.cv-tag-chip {
	background: var(--cv-bg-subtle) !important;
	color: var(--cv-text-secondary) !important;
	border: 1px solid var(--cv-border) !important;
	padding: 8px 18px !important;
	border-radius: 100px !important;
	cursor: pointer;
	font-size: 13px !important;
	font-weight: 500 !important;
	transition: all 0.15s ease;
	font-family: inherit;
	letter-spacing: 0.01em;
}
.cv-tag-chip:hover {
	background: white !important;
	border-color: var(--cv-accent) !important;
	color: var(--cv-accent) !important;
}
.cv-tag-chip.active {
	background: var(--cv-accent) !important;
	color: white !important;
	border-color: var(--cv-accent) !important;
	font-weight: 600 !important;
}

/* Print */
@media print {
	.cv-no-print { display: none !important; }
	.cv-back-btn { display: none !important; }
	.cv-page { padding: 0; }
	.cv-container {
		box-shadow: none;
		border: none;
		width: 100%;
		max-width: 100%;
		min-height: 0;
	}
	.cv-content { padding: 1cm; }
}
`

// ─── Static data map ─────────────────────────────────────────────
const CV_DATA: Record<string, { sections: SectionConfig[]; personalInfo: PersonalInfo; dataMap: Record<string, any> }> = {
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

// ─── Component ───────────────────────────────────────────────────
const CV = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const lang = searchParams.get('lang') || 'en'
	const tag = searchParams.get('tag') || null
	const [showTagPopup, setShowTagPopup] = useState(false)

	const langKey = lang === 'hr' ? 'hr' : 'en'
	const { sections, personalInfo, dataMap } = CV_DATA[langKey]

	// Override body / :root background for light theme
	useEffect(() => {
		const prevBodyBg = document.body.style.background
		const prevBodyBgImage = document.body.style.backgroundImage
		const prevBodyBgAttachment = document.body.style.backgroundAttachment
		document.body.style.background = '#f8fafc'
		document.body.style.backgroundImage = 'none'
		document.body.style.backgroundAttachment = 'unset'

		const root = document.documentElement
		const prevRootColor = root.style.color
		const prevRootBg = root.style.backgroundColor
		root.style.color = '#1e293b'
		root.style.backgroundColor = '#f8fafc'

		document.title = 'Marino Linić - CV'

		return () => {
			document.body.style.background = prevBodyBg
			document.body.style.backgroundImage = prevBodyBgImage
			document.body.style.backgroundAttachment = prevBodyBgAttachment
			root.style.color = prevRootColor
			root.style.backgroundColor = prevRootBg
			document.title = 'Marino Linić'
		}
	}, [])

	const toggleLang = () => {
		const params = new URLSearchParams(searchParams)
		params.set('lang', lang === 'en' ? 'hr' : 'en')
		setSearchParams(params)
	}

	const allTags = useMemo(() => {
		const tags = new Set<string>()
		Object.values(dataMap).forEach(data => {
			const items = Array.isArray(data) ? data : Object.values(data).flat()
			;(items as any[]).forEach(item => {
				if (item?.tags) item.tags.split(',').forEach((t: string) => tags.add(t.trim()))
			})
		})
		return Array.from(tags).sort()
	}, [dataMap])

	const selectTag = (newTag: string | null) => {
		const params = new URLSearchParams(searchParams)
		if (newTag) params.set('tag', newTag)
		else params.delete('tag')
		setSearchParams(params)
		setShowTagPopup(false)
	}

	const renderContactInfo = (contact: Record<string, ContactItem>) =>
		Object.entries(contact).map(([key, details]) => {
			const show = (!tag && details.included) || (tag && details.tags?.split(',').includes(tag))
			if (!show) return null
			switch (key) {
				case 'email':
					return <a key={key} href={`mailto:${details.value}`} className="cv-contact-item">{details.value}</a>
				case 'phone':
					return <span key={key} className="cv-contact-item">{details.value}</span>
				case 'linkedin':
					return <a key={key} href={`https://${details.value}`} className="cv-contact-item" target="_blank" rel="noreferrer">linkedin.com/in/marino-linic</a>
				case 'github':
					return <a key={key} href={`https://${details.value}`} className="cv-contact-item" target="_blank" rel="noreferrer">github.com/MarinoLinic</a>
				case 'website':
					return <a key={key} href={`https://${details.value}`} className="cv-contact-item" target="_blank" rel="noreferrer">linic.netlify.app</a>
				default: return null
			}
		})

	const renderSection = (section: SectionConfig) => {
		const data = dataMap[section.id]
		let content: React.ReactNode = null

		switch (section.id) {
			case 'summary':
				if (personalInfo) content = <p>{getSummary(personalInfo.summaries, tag)}</p>
				break
			case 'experience': {
				const items = filterByTag<ExperienceItem>(data, tag)
				if (items.length) content = items.map((exp, i) => (
					<div key={i} className="cv-experience-item">
						<div className="cv-item-header">
							<div className="cv-item-title">{exp.title}</div>
							<div className="cv-item-subtitle">{exp.company}</div>
						</div>
						<div className="cv-item-meta"><span>{exp.duration}</span> | <span>{exp.location}</span></div>
						<p className="cv-description">{getDescription(exp, tag)}</p>
					</div>
				))
				break
			}
			case 'projects': {
				const items = filterByTag<ProjectItem>(data, tag)
				if (items.length) content = items.map((proj, i) => (
					<div key={i} className="cv-project-item">
						<div className="cv-item-header">
							<div className="cv-item-title">{proj.title}</div>
						</div>
						<p className="cv-description">{proj.description}</p>
						<div className="cv-technologies"><strong>Technologies:</strong> {proj.technologies}</div>
					</div>
				))
				break
			}
			case 'education': {
				const items = filterByTag<EducationItem>(data, tag)
				if (items.length) content = items.map((edu, i) => (
					<div key={i} className="cv-education-item">
						<div className="cv-item-header">
							<div className="cv-item-title">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
							<div className="cv-item-subtitle">{edu.institution}</div>
						</div>
						{edu.duration && <div className="cv-item-meta">{edu.duration}</div>}
					</div>
				))
				break
			}
			case 'skills': {
				if (!data || typeof data !== 'object') break
				const categories = Object.entries(data as Record<string, SkillItem[]>)
					.map(([category, skillList]) => ({
						category,
						skills: filterByTag<SkillItem>(skillList, tag).map(s => s.name),
					}))
					.filter(cat => cat.skills.length > 0)
				if (categories.length) content = (
					<div className="cv-skills-grid">
						{categories.map((cat, i) => (
							<div key={i} className="cv-skill-category">
								<div className="cv-skill-category-title">{cat.category}</div>
								<div className="cv-skill-list">{cat.skills.join(', ')}</div>
							</div>
						))}
					</div>
				)
				break
			}
			case 'certifications': {
				const items = filterByTag<any>(data, tag)
				if (items.length) content = (
					<ul className="cv-data-list">
						{items.map((cert: any, i: number) => <li key={i}>{cert.name || cert}</li>)}
					</ul>
				)
				break
			}
			case 'languages': {
				const items = filterByTag<LanguageItem>(data, tag)
				if (items.length) content = (
					<ul className="cv-data-list">
						{items.map((l, i) => <li key={i}><strong>{l.name}:</strong> {l.proficiency}</li>)}
					</ul>
				)
				break
			}
		}

		if (!content) return null
		return (
			<div key={section.id} className="cv-section">
				<h3 className="cv-section-title">{section.title}</h3>
				{content}
			</div>
		)
	}

	return (
		<>
			<style>{CV_STYLES}</style>
			<div className="cv-page">
				<Link to="/" className="cv-back-btn cv-no-print">
					<img src="/logo.svg" alt="Home" />
				</Link>

				<div className="cv-controls cv-no-print">
					<button className={`cv-filter-btn${tag ? ' has-tag' : ''}`} onClick={() => setShowTagPopup(true)}>
						{tag ? (
							<span className="cv-tag-badge">
								{TAG_LABELS[tag] || tag}
								<span className="cv-tag-clear" onClick={e => { e.stopPropagation(); selectTag(null) }}>×</span>
							</span>
						) : (
							lang === 'en' ? 'Filter by role' : 'Filtriraj po ulozi'
						)}
					</button>
					<button className="cv-lang-btn" onClick={toggleLang}>
						{lang === 'en' ? 'Hrvatski' : 'English'}
					</button>
					<button className="cv-download-btn" onClick={() => window.print()}>
						{lang === 'en' ? 'Download as PDF' : 'Preuzmi kao PDF'}
					</button>
				</div>

				{showTagPopup && (
					<div className="cv-tag-overlay" onClick={() => setShowTagPopup(false)}>
						<div className="cv-tag-popup" onClick={e => e.stopPropagation()}>
							<div className="cv-tag-popup-header">
								<span className="cv-tag-popup-title">{lang === 'en' ? 'Filter by role' : 'Filtriraj po ulozi'}</span>
								<button className="cv-tag-popup-close" onClick={() => setShowTagPopup(false)}>×</button>
							</div>
							<p className="cv-tag-popup-subtitle">
								{lang === 'en'
									? 'Select a specialty to tailor the CV content'
									: 'Odaberite specijalizaciju za prilagodbu sadržaja'}
							</p>
							<div className="cv-tag-grid">
								<button className={`cv-tag-chip${!tag ? ' active' : ''}`} onClick={() => selectTag(null)}>
									{lang === 'en' ? 'All' : 'Sve'}
								</button>
								{allTags.map(t => (
									<button key={t} className={`cv-tag-chip${tag === t ? ' active' : ''}`} onClick={() => selectTag(t)}>
										{TAG_LABELS[t] || t}
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				<div className="cv-container">
					<div className="cv-content">
						<div className="cv-header">
							<img src={cvPic} alt="Profile" className="cv-profile-image" />
							<div className="cv-header-content">
								<h1 className="cv-name">{personalInfo.name}</h1>
								{personalInfo.title && <h2 className="cv-title-text">{personalInfo.title}</h2>}
								<div className="cv-item-meta">{personalInfo.location}</div>
								<div className="cv-contact-info">{renderContactInfo(personalInfo.contact)}</div>
							</div>
						</div>

						{sections.map(renderSection)}
					</div>
				</div>
			</div>
		</>
	)
}

export default CV
