import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CV_STYLES } from './cv/styles'
import { CV_DATA, cvPic, TAG_LABELS, ESSENTIAL_TAGS, filterByTag, getDescription, getSummary } from './cv/cvdata'
import type { ContactItem, SectionConfig, ExperienceItem, ProjectItem, EducationItem, SkillItem, LanguageItem, LectureItem } from './cv/types'
import { usePageSEO } from '../hooks/usePageSEO'

// ─── Location colours ───────────────────────────────────────────
const LOC_COLORS: Record<string, { dot: string; line: string; label: string }> = {
	'Zagreb':      { dot: '#9bafc8', line: '#dce8f2', label: '#7a98b4' },
	'Copenhagen':  { dot: '#c49090', line: '#f0dada', label: '#a86060' },
	'Kopenhagen':  { dot: '#c49090', line: '#f0dada', label: '#a86060' },
	'Czechia':     { dot: '#a5a895', line: '#dfdfd0', label: '#828472' },
	'\u010ce\u0161ka':      { dot: '#a5a895', line: '#dfdfd0', label: '#828472' },
	'Rijeka':      { dot: '#88b4a5', line: '#d0e8de', label: '#5f9080' },
}
const INST_LOC: Record<string, string> = {
	'University of Rijeka': 'Rijeka',
	'N\u00f8rre Gymnasium':      'Copenhagen',
}
const getLocColor = (str: string) => {
	const key = Object.keys(LOC_COLORS).find(k => str.includes(k))
	return key ? LOC_COLORS[key] : null
}

// ─── Component ───────────────────────────────────────────────────
const CV = () => {
	usePageSEO()
	const [searchParams, setSearchParams] = useSearchParams()
	const lang = searchParams.get('lang') || 'en'
	const urlTag = searchParams.get('tag')
	const tag = urlTag || 'all'
	const [showTagPopup, setShowTagPopup] = useState(false)
	const [showMoreTags, setShowMoreTags] = useState(false)

	const langKey = lang === 'hr' ? 'hr' : 'en'
	const { sections, personalInfo, dataMap } = CV_DATA[langKey]

	// First visit: no tag in URL → check localStorage, else show popup
	useEffect(() => {
		if (searchParams.get('tag')) return
		const saved = localStorage.getItem('cv-preferred-tag')
		const params = new URLSearchParams(searchParams)
		params.set('tag', saved || 'developer')
		setSearchParams(params, { replace: true })
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

	const selectTag = (newTag: string) => {
		const params = new URLSearchParams(searchParams)
		params.set('tag', newTag)
		localStorage.setItem('cv-preferred-tag', newTag)
		setSearchParams(params)
		setShowTagPopup(false)
	}

	const renderContactInfo = (contact: Record<string, ContactItem>) =>
		Object.entries(contact).map(([key, details]) => {
			const show = tag === 'all' || details.tags?.split(',').includes(tag)
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
					return <a key={key} href={`https://${details.value}`} className="cv-contact-item" target="_blank" rel="noreferrer">linic.net</a>
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
				if (items.length) content = items.map((exp, i) => {
					const lc = getLocColor(exp.location)
					return (
						<div key={i} className="cv-experience-item" style={lc ? { '--cv-timeline-dot': lc.dot, '--cv-timeline-line': lc.line } as React.CSSProperties : {}}>
							<div className="cv-item-header">
								<div className="cv-item-title">{exp.title}</div>
								<div className="cv-item-subtitle">{exp.company}</div>
							</div>
							<div className="cv-item-meta">
								<span>{exp.duration}</span>
								{' | '}
								<span className="cv-item-location" style={lc ? { color: lc.label } : {}}>{exp.location}</span>
							</div>
							<p className="cv-description">{getDescription(exp, tag)}</p>
						</div>
					)
				})
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
				if (items.length) content = items.map((edu, i) => {
					const lc = getLocColor(INST_LOC[edu.institution] ?? edu.institution)
					return (
						<div key={i} className="cv-education-item" style={lc ? { '--cv-timeline-dot': lc.dot, '--cv-timeline-line': lc.line } as React.CSSProperties : {}}>
							<div className="cv-item-header">
								<div className="cv-item-title">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
								<div className="cv-item-subtitle">{edu.institution}</div>
							</div>
							{edu.duration && <div className="cv-item-meta">{edu.duration}</div>}
						</div>
					)
				})
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
			case 'lectures': {
				const items = filterByTag<LectureItem>(data, tag)
				if (items.length) content = items.map((lecture, i) => {
					const lc = getLocColor(lecture.location)
					return (
						<div key={i} className="cv-lecture-item" style={lc ? { '--cv-timeline-dot': lc.dot, '--cv-timeline-line': lc.line } as React.CSSProperties : {}}>
							<div className="cv-item-header">
								<div className="cv-item-title">{lecture.title}</div>
								<div className="cv-item-subtitle">{lecture.venue}</div>
							</div>
							<div className="cv-item-meta">
								<span>{lecture.date}</span>
								{' | '}
								<span className="cv-item-location" style={lc ? { color: lc.label } : {}}>{lecture.location}</span>
								{lecture.url && (
									<>
										{' | '}
										<a href={lecture.url} target="_blank" rel="noreferrer" className="cv-lecture-link">youtu.be/{lecture.url.split('v=')[1]}</a>
									</>
								)}
							</div>
							{lecture.description && <p className="cv-description">{lecture.description}</p>}
						</div>
					)
				})
				break
			}
		}

		if (!content) return null
		const sectionClass = `cv-section${section.id === 'experience' ? ' cv-section-experience' : ''}`
		return (
			<div key={section.id} className={sectionClass}>
				<h3 className="cv-section-title">{section.title}</h3>
				{content}
			</div>
		)
	}

	const essentialTags = allTags.filter(t => ESSENTIAL_TAGS.includes(t))
	const extraTags = allTags.filter(t => !ESSENTIAL_TAGS.includes(t))

	return (
		<>
			<style>{CV_STYLES}</style>
			<div className="cv-page">
				{showTagPopup && (
					<div className="cv-tag-overlay" onClick={() => { setShowTagPopup(false); setShowMoreTags(false) }}>
						<div className="cv-tag-popup" onClick={e => e.stopPropagation()}>
							<div className="cv-tag-popup-header">
								<span className="cv-tag-popup-title">{lang === 'en' ? 'Filter by role' : 'Filtriraj po ulozi'}</span>
								<button className="cv-tag-popup-close" onClick={() => { setShowTagPopup(false); setShowMoreTags(false) }}>×</button>
							</div>
							<p className="cv-tag-popup-subtitle">
								{lang === 'en'
									? 'Select a specialty to tailor the CV content'
									: 'Odaberite specijalizaciju za prilagodbu sadržaja'}
							</p>
							<div className="cv-tag-grid">
								<button className={`cv-tag-chip${tag === 'all' ? ' active' : ''}`} onClick={() => selectTag('all')}>
									{lang === 'en' ? 'All' : 'Sve'}
								</button>
								{essentialTags.map(t => (
									<button key={t} className={`cv-tag-chip${tag === t ? ' active' : ''}`} onClick={() => selectTag(t)}>
										{TAG_LABELS[t] || t}
									</button>
								))}
							</div>
							{extraTags.length > 0 && (
								<>
									<button className={`cv-tag-toggle${showMoreTags ? ' expanded' : ''}`} onClick={() => setShowMoreTags(!showMoreTags)}>
										{showMoreTags
											? (lang === 'en' ? 'Show less' : 'Prikaži manje')
											: (lang === 'en' ? 'More specialties...' : 'Više specijalizacija...')}
									</button>
									{showMoreTags && (
										<div className="cv-tag-grid">
											{extraTags.map(t => (
												<button key={t} className={`cv-tag-chip${tag === t ? ' active' : ''}`} onClick={() => selectTag(t)}>
													{TAG_LABELS[t] || t}
												</button>
											))}
										</div>
									)}
								</>
							)}
						</div>
					</div>
				)}

				<Link to="/" className="cv-back-btn cv-no-print">
					<img src="/logo.svg" alt="Home" />
				</Link>

				<div className="cv-toolbar cv-no-print">
					<button className="cv-toolbar-btn cv-toolbar-filter" onClick={() => setShowTagPopup(true)}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
						<span className="cv-toolbar-label">{lang === 'en' ? 'Filter' : 'Filtriraj'}: {tag === 'all' ? (lang === 'en' ? 'All' : 'Sve') : (TAG_LABELS[tag] || tag)}</span>
					</button>
					<button className="cv-toolbar-btn cv-toolbar-lang" onClick={toggleLang}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
						<span className="cv-toolbar-label">{lang === 'en' ? 'Hrvatski' : 'English'}</span>
					</button>
					<button className="cv-toolbar-btn cv-toolbar-download" onClick={() => window.print()}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						<span className="cv-toolbar-label">{lang === 'en' ? 'Download PDF' : 'Preuzmi PDF'}</span>
					</button>
				</div>

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
