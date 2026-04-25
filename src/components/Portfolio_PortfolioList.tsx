import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
	PORTFOLIO_COPY,
	PORTFOLIO_MINI_PROJECTS,
	PORTFOLIO_PROJECTS,
	PORTFOLIO_PROJECT_SECTIONS,
	PORTFOLIO_PYTHON_SCRIPTS,
	type PortfolioLink,
	type PortfolioMiniProject,
	type PortfolioProject,
	type PortfolioProjectSectionId
} from '../data/portfolio'

const cardRenderStyle: CSSProperties = {
	contentVisibility: 'auto',
	containIntrinsicSize: '1px 860px'
}

const miniCardRenderStyle: CSSProperties = {
	contentVisibility: 'auto',
	containIntrinsicSize: '1px 500px'
}

const isExternalUrl = (src: string) => /^https?:\/\//i.test(src)

const PortfolioImage = ({
	src,
	alt,
	className,
	wrapperClassName,
	priority = false,
	aspectRatio = '16 / 9',
	sizes = '(max-width: 768px) 100vw, 768px'
}: {
	src: string
	alt: string
	className?: string
	wrapperClassName?: string
	priority?: boolean
	aspectRatio?: string
	sizes?: string
}) => {
	const candidates = useMemo(() => {
		if (isExternalUrl(src)) return [{ src }]

		const normalizedSrc = src.startsWith('/') ? src : `/${src}`
		const stem = src.replace(/^\/+/, '').replace(/\.[^/.]+$/, '')

		return [
			{
				src: `/portfolio/${stem}.webp`,
				srcSet: `/portfolio/${stem}-mobile.webp 800w, /portfolio/${stem}.webp 1200w`
			},
			{ src: normalizedSrc }
		]
	}, [src])

	const [srcIdx, setSrcIdx] = useState(0)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setSrcIdx(0)
		setLoaded(false)
	}, [src])

	if (srcIdx >= candidates.length) return null
	const current = candidates[srcIdx]

	return (
		<div className={`relative overflow-hidden ${wrapperClassName ?? ''}`} style={!loaded ? { aspectRatio } : undefined}>
			{!loaded && <div className="absolute inset-0 img-skeleton" />}
			<img
				src={current.src}
				srcSet={current.srcSet}
				sizes={current.srcSet ? sizes : undefined}
				alt={alt}
				className={`${className ?? ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
				loading={priority ? 'eager' : 'lazy'}
				fetchPriority={priority ? 'high' : 'low'}
				decoding="async"
				onLoad={() => setLoaded(true)}
				onError={() => setSrcIdx((i) => i + 1)}
			/>
		</div>
	)
}

const LinkChip = ({ label, url, internal }: PortfolioLink) => {
	const isPrimary = ['try it', 'play it', 'live site'].includes(label.toLowerCase())
	const isGitHub = label.toLowerCase() === 'github'

	const baseClasses = "text-sm rounded-lg px-3 py-1.5 transition-all duration-200 font-medium"
	const primaryClasses = "bg-accent/20 text-accent border border-accent/40 hover:bg-accent/30 hover:border-accent/60"
	const gitHubClasses = "bg-secondary/15 text-secondary border border-secondary/30 hover:bg-secondary/25 hover:border-secondary/50"
	const defaultClasses = "bg-primary/40 text-text border border-white/15 hover:bg-primary/60 hover:border-white/30"

	const classes = `${baseClasses} ${isPrimary ? primaryClasses : isGitHub ? gitHubClasses : defaultClasses}`

	return internal
		? <Link to={url} className={classes}>{label} →</Link>
		: <a href={url} className={classes}>{label} ↗</a>
}

const TechTag = ({ t }: { t: string }) => (
	<span className="text-xs bg-primary/50 text-tertiary/80 px-2.5 py-1 rounded-full font-mono border border-white/5">{t}</span>
)

const toYearNumber = (year: string) => Number.parseInt(year, 10) || 0

const isPreAI = (year: string) => toYearNumber(year) <= 2023

const ProjectCard = ({ title, year, tech, description, image, image2, links, note, wip, priorityImage = false }: PortfolioProject & { priorityImage?: boolean }) => (
	<article className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8 space-y-5" style={cardRenderStyle}>
		<div className="flex flex-wrap items-baseline gap-3">
			<span className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">{year}</span>
			{wip && <span className="text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20 px-2.5 py-0.5 rounded-full">in progress</span>}
			{isPreAI(year) && <span className="text-xs font-mono text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">Pre-AI</span>}
			<h3 className="text-text">{title}</h3>
		</div>
		<div className="flex flex-wrap gap-2">
			{tech.map(t => <TechTag key={t} t={t} />)}
		</div>
		<div className="space-y-3">
			{description.map((para, i) => <p key={i} className="text-muted leading-relaxed">{para}</p>)}
		</div>
		{note && <p className="text-xs text-secondary/60 italic border-l-2 border-secondary/30 pl-3">{note}</p>}
		{image && (
			<PortfolioImage
				src={image}
				alt={title}
				priority={priorityImage}
				className="rounded-xl w-full max-h-72 object-cover border-0 hover:border-0"
			/>
		)}
		{image2 && (
			<PortfolioImage
				src={image2}
				alt={title}
				className="rounded-xl w-full max-h-72 object-cover border-0 hover:border-0"
			/>
		)}
		<div className="flex flex-wrap gap-3 pt-1">
			{links.map(l => <LinkChip key={l.label} {...l} />)}
		</div>
	</article>
)

const MiniCard = ({ title, year, tech, description, links, images }: PortfolioMiniProject) => (
	<article className="bg-surface/50 border border-white/5 rounded-xl p-4 space-y-3" style={miniCardRenderStyle}>
		<div className="flex flex-wrap items-baseline gap-2">
			<span className="text-xs font-mono text-muted">{year}</span>
			<h4 className="text-text text-base font-semibold">{title}</h4>
		</div>
		<div className="flex flex-wrap gap-1.5">
			{tech.map(t => <span key={t} className="text-xs bg-primary/40 text-tertiary/70 px-2 py-0.5 rounded-full font-mono">{t}</span>)}
		</div>
		<p className="text-muted text-sm leading-relaxed">{description}</p>
		{images?.map((img, i) => (
			<PortfolioImage
				key={i}
				src={img}
				alt={`${title} preview ${i + 1}`}
				className="rounded-lg w-full max-h-44 object-cover border-0 hover:border-0"
				sizes="(max-width: 768px) 100vw, 360px"
			/>
		))}
		<div className="flex flex-wrap gap-2">
			{links.map(l => <a key={l.label} href={l.url} className="text-xs text-muted border border-white/10 rounded-lg px-2.5 py-1 hover:border-tertiary/50 hover:text-text transition-colors">{l.label} ↗</a>)}
		</div>
	</article>
)

const PortfolioList = () => {
	const groupedProjects = useMemo(() => {
		const bySection: Record<PortfolioProjectSectionId, PortfolioProject[]> = {
			featured: [],
			main: [],
			archive: []
		}

		for (const project of PORTFOLIO_PROJECTS) {
			bySection[project.section].push(project)
		}

		for (const key of Object.keys(bySection) as PortfolioProjectSectionId[]) {
			bySection[key].sort((a, b) => a.priority - b.priority || toYearNumber(b.year) - toYearNumber(a.year))
		}

		return bySection
	}, [])

	return (
		<div className="space-y-10">
			{PORTFOLIO_PROJECT_SECTIONS.map((section) => {
				const projects = groupedProjects[section.id]
				if (projects.length === 0) return null

				return (
					<section key={section.id} className="space-y-5">
						<div>
							<div className="flex items-center gap-3 mb-2">
								<span className="text-xs font-mono text-muted uppercase tracking-wider">{section.eyebrow}</span>
								<h3 className="text-text">{section.title}</h3>
							</div>
							{section.description && <p className="text-muted text-sm leading-relaxed max-w-2xl">{section.description}</p>}
						</div>
						<div className="space-y-6">
							{projects.map((p, idx) => (
								<ProjectCard
									key={p.title}
									{...p}
									priorityImage={section.id === 'featured' && idx === 0}
								/>
							))}
						</div>
					</section>
				)
			})}

			<div className="pt-2">
			<div className="flex items-center gap-3 mb-6">
				<span className="text-xs font-mono text-muted uppercase tracking-wider">{PORTFOLIO_COPY.miniProjects.eyebrow}</span>
				<h3 className="text-text">{PORTFOLIO_COPY.miniProjects.title}</h3>
			</div>
			<div className="grid md:grid-cols-2 gap-4">
				{PORTFOLIO_MINI_PROJECTS.map(p => <MiniCard key={p.title} {...p} />)}
			</div>
		</div>

		<article className="bg-surface/50 border border-white/5 rounded-xl p-6 space-y-4" style={miniCardRenderStyle}>
			<div className="flex items-baseline gap-3">
				<span className="text-xs font-mono text-muted">{PORTFOLIO_COPY.pythonScripts.eyebrow}</span>
				<h4 className="text-text font-semibold">{PORTFOLIO_COPY.pythonScripts.title}</h4>
			</div>
			<p className="text-muted text-sm">{PORTFOLIO_COPY.pythonScripts.description}</p>
			<ul className="space-y-2">
				{PORTFOLIO_PYTHON_SCRIPTS.map(s => (
					<li key={s.label}>
						<a href={s.url} className="text-sm text-muted hover:text-text transition-colors">→ {s.label}</a>
					</li>
				))}
			</ul>
		</article>
		</div>
	)
}

export default PortfolioList
