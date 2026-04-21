export const CV_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&display=swap');

.cv-page,
.cv-page *,
.cv-page *::before,
.cv-page *::after {
	box-sizing: border-box;
}

.cv-page {
	--cv-primary: #0f172a;
	--cv-primary-hover: #020617;
	--cv-accent: #334155;
	--cv-link-hover: #2563eb;
	--cv-text: #1e293b;
	--cv-text-secondary: #475569;
	--cv-text-muted: #94a3b8;
	--cv-border: #e2e8f0;
	--cv-border-accent: #cbd5e1;
	--cv-bg-subtle: #f8fafc;
	--cv-dot: #94a3b8;

	font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
	line-height: 1.55;
	color: var(--cv-text);
	font-size: 14px;
	padding: 24px 0;
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
	transition: color 0.15s;
}
.cv-page a:hover { color: var(--cv-link-hover); }

.cv-page h1, .cv-page h2, .cv-page h3 { line-height: 1.15; margin: 0; }
.cv-page p { font-size: inherit; font-weight: 400; line-height: 1.55; margin: 0; }
.cv-page img { border: none !important; }
.cv-page img:hover { border: none !important; }
.cv-page ul { list-style: none; margin: 0; padding: 0; }
.cv-page strong { font-weight: 600; }
.cv-page button:focus { outline: 2px solid var(--cv-link-hover); outline-offset: 2px; }

/* Controls */
.cv-controls {
	width: 210mm;
	max-width: 95%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 8px;
	margin-bottom: 12px;
}
.cv-download-btn {
	background: var(--cv-primary) !important;
	color: white !important;
	border: none !important;
	padding: 10px 22px !important;
	border-radius: 8px !important;
	cursor: pointer;
	font-size: 13px !important;
	font-weight: 500 !important;
	transition: all 0.2s ease;
	font-family: inherit;
	letter-spacing: 0.025em;
}
.cv-download-btn:hover {
	background: var(--cv-primary-hover) !important;
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
	border-color: transparent !important;
}
.cv-lang-btn {
	background: white !important;
	color: var(--cv-text) !important;
	border: 1px solid var(--cv-border) !important;
	padding: 10px 22px !important;
	border-radius: 8px !important;
	cursor: pointer;
	font-size: 13px !important;
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
	box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04);
	border: 1px solid var(--cv-border);
}
.cv-content { padding: 48px 56px; }

/* Header */
.cv-header {
	display: flex;
	align-items: flex-start;
	gap: 24px;
	margin-bottom: 36px;
}
.cv-profile-image {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid var(--cv-border) !important;
	flex-shrink: 0;
	margin-top: 2px;
}
.cv-profile-image:hover { border-color: var(--cv-border) !important; }
.cv-header-content { flex-grow: 1; }
.cv-name {
	font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
	font-size: 2.125em !important;
	font-weight: 700;
	color: var(--cv-primary);
	line-height: 1.1;
	letter-spacing: -0.02em;
	margin-bottom: 2px;
}
.cv-title-text {
	font-size: 1em !important;
	color: var(--cv-text-secondary);
	font-weight: 500;
	margin-top: 4px;
}
.cv-contact-info {
	margin-top: 14px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 4px 0;
}
.cv-contact-item {
	color: var(--cv-text-secondary) !important;
	text-decoration: none;
	font-size: 0.8125em;
	font-weight: 400 !important;
	transition: color 0.15s;
	letter-spacing: 0.005em;
}
.cv-contact-item:not(:last-child)::after {
	content: '\\00B7';
	margin: 0 10px;
	color: var(--cv-border-accent);
	font-weight: 800;
	font-size: 1.1em;
}
.cv-contact-item:hover { color: var(--cv-link-hover) !important; }

/* Sections */
.cv-section {
	margin-bottom: 26px;
	break-inside: avoid;
	page-break-inside: avoid;
}
.cv-section:last-child { margin-bottom: 0; }
.cv-page .cv-section-title {
	font-size: 0.875em !important;
	font-weight: 600;
	color: var(--cv-primary);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	margin-bottom: 0;
	padding-bottom: 10px;
	border-bottom: 1.5px solid var(--cv-border);
	line-height: 1.3;
}

/* Non-timeline content after section title */
.cv-section-title + .cv-skills-grid,
.cv-section-title + .cv-data-list,
.cv-section-title + p {
	margin-top: 14px;
}

/* Timeline items */
.cv-experience-item,
.cv-education-item,
.cv-project-item {
	position: relative;
	padding-left: 22px;
	padding-bottom: 18px;
	break-inside: avoid;
	page-break-inside: avoid;
}
.cv-experience-item:not(:last-child),
.cv-education-item:not(:last-child),
.cv-project-item:not(:last-child) {
	border-left: 1px solid var(--cv-border);
}
.cv-experience-item:last-child,
.cv-education-item:last-child,
.cv-project-item:last-child { padding-bottom: 0; }

/* Connect line to last dot (multiple items only) */
.cv-experience-item:last-child::after,
.cv-education-item:last-child::after,
.cv-project-item:last-child::after {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	height: 11px;
	border-left: 1px solid var(--cv-border);
}
.cv-section-title + .cv-experience-item:last-child::after,
.cv-section-title + .cv-education-item:last-child::after,
.cv-section-title + .cv-project-item:last-child::after {
	display: none;
}

/* First item after section title: padding-top creates gap, border-left connects to title underline */
.cv-section-title + .cv-experience-item,
.cv-section-title + .cv-education-item,
.cv-section-title + .cv-project-item {
	padding-top: 14px;
	border-left: 1px solid var(--cv-border);
}
.cv-section-title + .cv-experience-item:last-child,
.cv-section-title + .cv-education-item:last-child,
.cv-section-title + .cv-project-item:last-child {
	border-left: none;
}
.cv-section-title + .cv-experience-item::before,
.cv-section-title + .cv-education-item::before,
.cv-section-title + .cv-project-item::before {
	top: 21px;
}

.cv-experience-item::before,
.cv-education-item::before,
.cv-project-item::before {
	content: '';
	width: 7px;
	height: 7px;
	background: var(--cv-dot);
	border: 2px solid white;
	border-radius: 50%;
	position: absolute;
	left: -4px;
	top: 7px;
	box-shadow: 0 0 0 1px var(--cv-border-accent);
}
.cv-item-header { margin-bottom: 3px; }
.cv-item-title {
	font-weight: 600;
	font-size: 1em;
	color: var(--cv-primary);
	line-height: 1.35;
	letter-spacing: -0.005em;
}
.cv-item-subtitle {
	font-weight: 500;
	color: var(--cv-text-secondary);
	font-size: 0.9375em;
	margin-top: 1px;
}
.cv-item-meta {
	color: var(--cv-text-muted);
	font-size: 0.8125em;
	font-weight: 400;
	margin-bottom: 6px;
	letter-spacing: 0.01em;
}
.cv-description {
	color: var(--cv-text);
	font-weight: 400;
	line-height: 1.6;
	font-size: 0.9375em;
}
.cv-technologies {
	margin-top: 6px;
	font-size: 0.8125em;
	line-height: 1.5;
	color: var(--cv-text-secondary);
}
.cv-technologies strong { color: var(--cv-primary); font-weight: 600; }

/* Skills */
.cv-skills-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 14px;
}
.cv-skill-category-title {
	font-weight: 600;
	color: var(--cv-primary);
	margin-bottom: 3px;
	font-size: 0.8125em;
	letter-spacing: 0.03em;
	text-transform: uppercase;
}
.cv-skill-list {
	color: var(--cv-text-secondary);
	font-weight: 400;
	line-height: 1.55;
	font-size: 0.9375em;
}

/* Data lists */
.cv-data-list { list-style: none; }
.cv-data-list li {
	position: relative;
	padding-left: 16px;
	margin-bottom: 3px;
	font-weight: 400;
	line-height: 1.55;
	font-size: 0.9375em;
	color: var(--cv-text);
}
.cv-data-list li::before {
	content: '\\203A';
	color: var(--cv-accent);
	position: absolute;
	left: 2px;
	font-weight: 700;
	font-size: 1.1em;
	line-height: 1.45;
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
	padding: 10px 22px !important;
	border-radius: 8px !important;
	cursor: pointer;
	font-size: 13px !important;
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
	background: #f1f5f9;
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
	background: var(--cv-primary) !important;
	color: white !important;
	border-color: var(--cv-primary) !important;
	font-weight: 600 !important;
}

/* Print */
@media print {
	html, body {
		background: white !important;
		background-image: none !important;
	}
	.cv-no-print { display: none !important; }
	.cv-back-btn { display: none !important; }
	.cv-tag-overlay { display: none !important; }
	.cv-page {
		padding: 0;
		font-size: 13px;
		background: white !important;
		min-height: 0;
	}
	.cv-container {
		box-shadow: none;
		border: none;
		width: 100%;
		max-width: 100%;
		min-height: 0;
		background: white !important;
	}
	.cv-content { padding: 1.5cm; }
	.cv-section {
		break-inside: avoid;
		page-break-inside: avoid;
	}
	.cv-experience-item,
	.cv-education-item,
	.cv-project-item {
		break-inside: avoid;
		page-break-inside: avoid;
	}
	.cv-header {
		break-inside: avoid;
		page-break-inside: avoid;
	}
}
`
