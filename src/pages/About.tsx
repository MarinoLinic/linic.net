import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navigation from '../components/_Navigation'

const FadeSection = ({ children }: { children: ReactNode }) => {
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
			{ threshold: 0.05 }
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<section
			ref={ref}
			className="space-y-4"
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? 'translateY(0)' : 'translateY(18px)',
				transition: 'opacity 0.65s ease, transform 0.65s ease'
			}}
		>
			{children}
		</section>
	)
}

const AnimatedStat = ({ value, label }: { value: number; label: string }) => {
	const [count, setCount] = useState(0)
	const [started, setStarted] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
			{ threshold: 0.8 }
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!started || value === 0) return
		const duration = 1800
		const startTime = performance.now()
		const animate = (now: number) => {
			const progress = Math.min((now - startTime) / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3)
			setCount(Math.round(eased * value))
			if (progress < 1) requestAnimationFrame(animate)
		}
		requestAnimationFrame(animate)
	}, [started, value])

	return (
		<p>
			{label}: <span ref={ref} className="text-secondary font-semibold">{count.toLocaleString()}</span>
		</p>
	)
}

const About = () => {
	const [iNat, setINat] = useState({
		observations_count: 2424,
		species_count: 1051,
		identifications_count: 6003,
		login_exact: 'marinolinic',
		created_at: '2022-05-17T22:58:06+00:00',
		icon_url: 'https://static.inaturalist.org/attachments/users/icons/5691431/medium.jpg?1655436998'
	}) as any

	const [unsplash] = useState({ views: 9476275, downloads: 51058 })

	useEffect(() => {
		const fetchData = async () => {
			const inat = await axios('https://api.inaturalist.org/v1/users/5691431')

			// const unsp = await axios.get('https://api.unsplash.com/users/marinolinic/statistics', {
			// 	headers: { Authorization: 'Client-ID ' + import.meta.env.VITE_UNSPLASH_KEY }
			// })

			setINat(inat.data.results[0])
			// setUnsplash({ views: unsp.data.views.total, downloads: unsp.data.downloads.total })
		}
		fetchData()
	}, [])

	const [loading, setLoading] = useState(true)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			const el = document.documentElement
			const scrolled = el.scrollTop
			const total = el.scrollHeight - el.clientHeight
			setProgress(total > 0 ? (scrolled / total) * 100 : 0)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const birthday = new Date('1999-10-13')
	const today = new Date()
	let age = today.getFullYear() - birthday.getFullYear()
	const m = today.getMonth() - birthday.getMonth()
	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) age--

	return (
		<div className={loading ? 'hidden' : ''}>
			<div
				className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
				style={{
					width: `${progress}%`,
					background: 'linear-gradient(to right, #7c70ff, #ff5c7c, #d94fc0)',
					transition: 'width 0.1s linear'
				}}
			/>

			<Navigation />

			<div className="md:w-1/3 w-full mx-auto px-8 md:px-0 flex flex-col pb-16">
				<div className="mt-8">
					<h1>About</h1>
				</div>
				<div className="my-4">
					<img src="https://i.imgur.com/W7VlpVE.jpg" alt="Images of me." onLoad={() => setLoading(false)} />
				</div>

				<FadeSection>
					<p>
						I am {age} years old and currently reside in Zagreb, Croatia.
						My programming skills include TypeScript, Python, React, SQL, and web development more broadly. I can also do technical writing.
					</p>
					<p>
						I graduated from the University of Rijeka with a <strong>bachelor's degree in Informatics</strong>{' '}
						on September 27, 2023.
					</p>
				</FadeSection>
				<hr className="my-10 opacity-20" />

				<FadeSection>
					<h2>Socials</h2>
					<p>
						I have a lot of these. You can see them at <Link to="/socials">/socials</Link>. Also see my{' '}
						<Link to="/cv">résumé</Link> here.
					</p>
				</FadeSection>
				<hr className="my-10 opacity-20" />

				<FadeSection>
					<h2>Computer Science</h2>
					<img src="https://i.imgur.com/kQPDGhl.jpg" alt="A snippet of my code." />
					<p>
						I started programming when I started university. My knowledge is substantially
						derived from self-study. Right around the time I enrolled, I downloaded a simple
						jumping game with ~400 lines of C++. I spent that weekend completely glued to my screen, editing and
						tinkering with the code. This enabled me to skip studying for the rest of my semester, because the experience taught me the fundamentals of programming.
					</p>
					<p>
						I got into web development later and made a collection of projects you can see
						at <Link to="/portfolio">/portfolio</Link>.
					</p>
					<p>
						In 2023 I wrote{' '}
						<a href="https://marinolinic.medium.com/but-what-is-the-virtual-dom-feda1cad4a89">this text</a> about
						the virtual DOM in React, but the series was discontinued.
					</p>
				</FadeSection>
				<hr className="my-10 opacity-20" />

				<FadeSection>
					<h2>Music</h2>
					<iframe
						title="Me singing Falling in Love"
						className="w-full h-auto md:h-[220px]"
						src="https://www.youtube.com/embed/Pu8hpzilROI"
					/>
					<p>I come from a somewhat musical family. This helped me start singing early.</p>
					<p>
						I used to practice composing: here's a sample of an attempt to remaster{' '}
						<a href="https://www.youtube.com/watch?v=id0kbyKCG8c">Fairy Fountain</a> from The Legend of Zelda:
						Ocarina of Time:
					</p>
					<audio controls src="/Fairy Fountain.mp3"></audio>
				</FadeSection>
				<hr className="my-10 opacity-20" />

				<FadeSection>
					<h2>Photography</h2>
					<img src="https://i.imgur.com/pNEK2NN.jpg" alt="An image of fish." />
					<p>
						You can see my <a href="https://unsplash.com/MarinoLinic">Unsplash account</a> where my photographs are available for free under theCC license. I also have an old{' '}
						<a href="https://www.viewbug.com/member/MarinoLinic">ViewBug account</a>.
					</p>
					<AnimatedStat value={unsplash.views} label="Views on Unsplash" />
					<AnimatedStat value={unsplash.downloads} label="Downloads on Unsplash" />
				</FadeSection>
				<hr className="my-10 opacity-20" />

				<FadeSection>
					<h2>Zoology</h2>
					<img
						alt="Me with a cat snake."
						className="md:object-cover object-scale-down w-full h-auto"
						src="https://i.imgur.com/3RfaRwt.jpg"
					/>
					<p>Zoology shaped my childhood and early adolescence.</p>
					<p>
						When I was 14, I stumbled upon a male specimen of{' '}
						<i>
							<a href="https://www.inaturalist.org/observations/117533411">Trigonidium cicindeloides</a>
						</i>
						. It turned out to be the first confirmation of the species' existence in Croatia in 50 years. My
						name appears in{' '}
						<a href="https://zenodo.org/record/5993822#:~:text=Otok%2C%20Bra%C4%8D%2C%20Molat)%20(-,Lini%C4%87%2014.VIII.2014,-%2C%20Rebrina%20%26%20Brigi%C4%87%2019">
							The first annotated checklist of Croatian crickets and grasshoppers
						</a>{' '}
						by{' '}
						<a href="https://www.researchgate.net/publication/329842940_The_first_annotated_checklist_of_Croatian_crickets_and_grasshoppers_Orthoptera_Ensifera_Caelifera">
							Skejo et al. (2018)
						</a>.
					</p>
					<p>
						In 2022, I registered my account on iNaturalist as{' '}
						<a href="https://www.inaturalist.org/people/marinolinic">{iNat.login_exact}</a> and documented{' '}
						<a href="https://www.inaturalist.org/lifelists/marinolinic?view=tree">{iNat.species_count} species</a>{' '}
						while helping with {iNat.identifications_count} identifications. (Live count!)
					</p>
					<AnimatedStat value={iNat.species_count} label="Species documented on iNaturalist" />
					<AnimatedStat value={iNat.identifications_count} label="Identifications contributed" />
					<p>Here's one of the last videos I made:</p>
					<iframe
						title="Me handling a European cat snake"
						className="w-full h-auto md:h-[220px]"
						src="https://www.youtube.com/embed/EitN8LWrQyw"
					/>
				</FadeSection>
				<hr className="my-10 opacity-20" />

				<p className="text-center">
					Contact me at <span className="text-quarnary">marinolinic@gmail.com</span>
				</p>
				<section className="flex justify-center mt-4 mb-8">
					<img src="WhiteSignature.svg" alt="Signature" className="w-1/3 hover:border-transparent" />
				</section>
			</div>
		</div>
	)
}

export default About
