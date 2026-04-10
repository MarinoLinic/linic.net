import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navigation from '../components/_Navigation'

const key = import.meta.env.VITE_UNSPLASH_KEY

const About = () => {
	const [iNat, setINat] = useState({
		observations_count: 2424,
		species_count: 1051,
		identifications_count: 6003,
		login_exact: 'marinolinic',
		created_at: '2022-05-17T22:58:06+00:00',
		icon_url: 'https://static.inaturalist.org/attachments/users/icons/5691431/medium.jpg?1655436998'
	}) as any

	const [unsplash, setUnsplash] = useState({
		views: 4283596,
		downloads: 18751
	}) as any

	useEffect(() => {
		const fetchData = async () => {
			const inat = await axios('https://api.inaturalist.org/v1/users/5691431')

			// const unsp = await axios.get('https://api.unsplash.com/users/marinolinic/statistics', {
			// 	headers: {
			// 		Authorization: 'Client-ID ' + key
			// 	}
			// })

			setINat(inat.data.results[0])
			// setUnsplash({ views: unsp.data.views.total, downloads: unsp.data.downloads.total })
		}

		fetchData()
	}, [])

	const [loading, setLoading] = useState(true)

	const age: number = 24
	const habitat: string = 'Copenhagen, Denmark'
	const habitatAddition: string | undefined = ', where I moved recently'
	const iNatDate = new Date(iNat.created_at)

	return (
		<div className={loading ? 'hidden' : ''}>
			<Navigation />

			<div className="flex flex-col items-center justify-center md:mt-16 mt-8 md:mx-0 mx-8">
				<div className="md:w-1/3 w-full flex flex-col">
					<div>
						<h1>About</h1>
					</div>
					<div className="my-4">
						<img src="https://i.imgur.com/W7VlpVE.jpg" alt="Images of me." onLoad={() => setLoading(false)} />
					</div>
					<section className="space-y-4">
						<p>
							I am {age} years old and currently reside in {habitat}
							{habitatAddition}. I'm learning Danish!
						</p>
						<p>I love TypeScript, Python, React, SQL, and all things web and programming.</p>
						<p>
							I graduated from the University of Rijeka with a <strong>bachelor's degree in Informatics</strong>{' '}
							on September 27, 2023.
						</p>
					</section>
					<hr className="my-10 opacity-20" />

					<section className="space-y-4">
						<h2>Socials</h2>
						<p>
							I have a lot of these. You can see them at <Link to="/socials">/socials</Link>. See my{' '}
							<Link to="/cv">résumé / curriculum vitae here</Link>.
						</p>
					</section>
					<hr className="my-10 opacity-20" />

					<section className="space-y-4">
						<h2>Computer Science - THE Thing</h2>
						<img src="https://i.imgur.com/kQPDGhl.jpg" alt="A snippet of my code." />
						<p>
							I started programming right about the time I started university. My knowledge is substantially
							derived from self-study. I remember when—right around the time I enrolled—I downloaded a small
							jumping game with ~400 lines of C++. I spent that weekend completely glued to my screen: I was
							editing and playing around with the code only to end up set for the next month of the semester
							without having to pay any attention to my C++ course. Stuff like that really pays off.
						</p>
						<p>
							I started getting into web development during my study and made a collection of projects you can see
							at <Link to="/portfolio">/portfolio</Link>.
						</p>
						<p>
							I love the freedom that comes with coding, and it has been able to capture my attention better than
							any other field. I would love to gain experience in a professional environment and seriously look
							forward to my first job.
						</p>
						<p>
							Earlier in 2023 I went ahead and delved a bit into React. I wrote{' '}
							<a href="https://marinolinic.medium.com/but-what-is-the-virtual-dom-feda1cad4a89">this text</a> about
							the virtual DOM, but the series was discontinued due to some time constraints.
						</p>
					</section>
					<hr className="my-10 opacity-20" />

					<section className="space-y-4">
						<h2>Music - A Big Part of Me</h2>
						<iframe
							title="Me singing Falling in Love"
							className="w-full h-auto md:h-[220px]"
							src="https://www.youtube.com/embed/Pu8hpzilROI"
						/>
						<p>I come from a somewhat musical family. This helped me start singing early.</p>
						<p>
							I have a project to help me practice composing: here's a sample of an attempt to remaster
							<a href="https://www.youtube.com/watch?v=id0kbyKCG8c"> Fairy Fountain</a> from The Legend of Zelda:
							Ocarina of Time:
						</p>
						<audio controls src="/Fairy Fountain.mp3"></audio>
					</section>
					<hr className="my-10 opacity-20" />

					<section className="space-y-4">
						<h2>Photography - Childhood Addiction 1</h2>
						<img src="https://i.imgur.com/pNEK2NN.jpg" alt="An image of fish." />
						<p>
							You can see my
							<a href="https://unsplash.com/MarinoLinic"> Unsplash account</a> where I provide access to my
							photographs free of charge under the CC license. I also have an old
							<a href="https://www.viewbug.com/member/MarinoLinic"> ViewBug account</a>.
						</p>
						<h5>Views on Unsplash: <span className="text-secondary">{Number(unsplash.views).toLocaleString()}</span></h5>
						<h5>Downloads on Unsplash: <span className="text-secondary">{Number(unsplash.downloads).toLocaleString()}</span></h5>
					</section>
					<hr className="my-10 opacity-20" />

					<section className="space-y-4">
						<h2>Zoology - Childhood Addiction 2</h2>
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
							while helping with {iNat.identifications_count} identifications. (These statistics are fetched
							dynamically.)
						</p>
						<p>Here's one of the last videos I made:</p>
						<iframe
							title="Me handling a European cat snake"
							className="w-full h-auto md:h-[220px]"
							src="https://www.youtube.com/embed/EitN8LWrQyw"
						/>
					</section>
					<hr className="my-10 opacity-20" />

					<p className="text-center">
						Contact me any time you wish at <span className="text-quarnary">marinolinic@gmail.com</span>.
					</p>
					<section className="flex justify-center mt-4 mb-8">
						<img src="WhiteSignature.svg" alt="Signature" className="w-1/3 hover:border-transparent" />
					</section>
				</div>
			</div>
		</div>
	)
}

export default About
