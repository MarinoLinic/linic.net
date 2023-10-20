import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'

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
		views: 4221214,
		downloads: 18363
	}) as any

	useEffect(() => {
		const fetchData = async () => {
			const inat = await axios('https://api.inaturalist.org/v1/users/5691431')

			const unsp = await axios.get('https://api.unsplash.com/users/marinolinic/statistics', {
				headers: {
					Authorization: 'Client-ID ' + key
				}
			})

			setINat(inat.data.results[0])
			setUnsplash({ views: unsp.data.views.total, downloads: unsp.data.downloads.total })
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
					<section>
						<div>
							<p>
								I am {age} years old and currently reside in {habitat}
								{habitatAddition}. I'm learning Danish. I love TypeScript, React, Node, and all things web,
								including work on the backend.{' '}
							</p>
							<p>
								<br></br>
								<p>
									I graduated from the University of Rijeka with a{' '}
									<strong>bachelor's degreee in Informatics</strong> on September 27, 2023.
								</p>
							</p>
						</div>
					</section>
					<br />
					<br />
					<hr />
					<br />
					<br />

					<section>
						<h2>Socials</h2>
						<br />
						<p>
							I have a lot of these. You can see them at <Link to="/socials">/socials</Link>. See my{' '}
							<Link to="/cv">résumé / curriculum vitae here</Link>.
						</p>
					</section>
					<br />
					<br />
					<hr />
					<br />
					<br />

					<section>
						<h2>Computer Science - Newfound Love</h2>
						<br />
						<p>
							I started programming right about the time I started university. My knowledge is substantially
							derived from self-study. I remember when—right around the time I enrolled—I downloaded a small C++
							jumping game with ~400 lines of code. I spent that weekend, completely glued to my screen, editing
							and playing around with the code, only to end up set for the next month of the semester without
							having to pay any attention to my C++ course. Stuff like that really pays off!
						</p>
						<br />
						<p>
							I started getting into web development during my study and made a collection of projects you can see
							at <Link to="/portfolio">/portfolio</Link>.
						</p>
						<br />
						<p>
							Earlier in 2023 I went ahead and delved a bit into React. I wrote{' '}
							<a href="https://marinolinic.medium.com/but-what-is-the-virtual-dom-feda1cad4a89">this text</a> about
							the virtual DOM, but the series was discontinued due to some time constraints.
						</p>
					</section>
					<br />
					<br />
					<hr />
					<br />
					<br />

					<section>
						<h2>Music - A Big Part of Me</h2>
						<br />
						<iframe
							title="Me singing Falling in Love"
							className="w-full h-auto md:h-[220px]"
							src="https://www.youtube.com/embed/Pu8hpzilROI"
						/>
						<br />
						<p>I come from a somewhat musical family. This helped me start singing early.</p>
						<br />
						<p>
							I have a project to help me practice composing: here's a sample of an attempt to remaster
							<a href="https://www.youtube.com/watch?v=id0kbyKCG8c"> Fairy Fountain</a> from The Legend of Zelda:
							Ocarina of Time:
						</p>
						<br />
						<audio controls src="/Fairy Fountain.mp3"></audio>
					</section>
					<br />
					<br />
					<hr />
					<br />
					<br />

					<section>
						<h2>Photography - Though I Wish I Could Draw</h2>
						<br />
						<img src="https://i.imgur.com/pNEK2NN.jpg" alt="An image of fish." />
						<br />
						<p>
							You can see my
							<a href="https://unsplash.com/MarinoLinic"> Unsplash account</a> where I provide access to my
							photographs free of charge under the CC license. I also have an old
							<a href="https://www.viewbug.com/member/MarinoLinic"> ViewBug account </a>.
						</p>
						<br />
						<h5 className="my-1">
							Views on Unsplash: <span className="text-secondary">{Number(unsplash.views).toLocaleString()}</span>
						</h5>
						<h5>
							Downloads on Unsplash:{' '}
							<span className="text-secondary">{Number(unsplash.downloads).toLocaleString()}</span>
						</h5>
					</section>
					<br />
					<br />
					<hr />
					<br />
					<br />

					<section>
						<h2>Zoology - Childhood Addiction</h2>
						<br />
						<img
							alt="Me with a cat snake."
							className="md:object-cover object-scale-down w-full h-auto"
							src="https://i.imgur.com/3RfaRwt.jpg"
						/>
						<br />
						<p>Zoology shaped my childhood and early adolescence.</p>
						<br />
						<p>
							When I was 14, I stumbled upon a male specimen of{' '}
							<i>
								<a href="https://www.inaturalist.org/observations/117533411">Trigonidium cicindeloides</a>
							</i>
							. It turned out this was the first confirmation of the species' existence in Croatia in 50 years. My
							name appears in{' '}
							<a href="https://zenodo.org/record/5993822#:~:text=Otok%2C%20Bra%C4%8D%2C%20Molat)%20(-,Lini%C4%87%2014.VIII.2014,-%2C%20Rebrina%20%26%20Brigi%C4%87%2019">
								The first annotated checklist of Croatian crickets and grasshoppers
							</a>{' '}
							by
							<a href="https://www.researchgate.net/publication/329842940_The_first_annotated_checklist_of_Croatian_crickets_and_grasshoppers_Orthoptera_Ensifera_Caelifera">
								{' '}
								Skejo et al. (2018)
							</a>
							.
						</p>
						<br />
						<div className="flex flex-col md:flex-row">
							<p>
								In 2022, I registered my account on iNaturalist as{' '}
								<a href="https://www.inaturalist.org/people/marinolinic">{iNat.login_exact}</a> and documented
								<a href="https://www.inaturalist.org/lifelists/marinolinic?view=tree">
									{' '}
									{iNat.species_count} species{' '}
								</a>
								while helping with {iNat.identifications_count} identifications.
							</p>
						</div>
						<br />
						<p>Here's one of the last videos I made:</p>
						<br />
						<iframe
							title="Me handling a European cat snake"
							className="w-full h-auto md:h-[220px]"
							src="https://www.youtube.com/embed/EitN8LWrQyw"></iframe>
						<br />
					</section>
					<br />
					<br />
					<hr />
					<br />
					<br />

					<p className="text-center">
						Contact me any time you wish at <span className="text-quarnary">marinolinic@gmail.com</span>,
					</p>
					<br />

					<section className="flex justify-center">
						<img src="WhiteSignature.svg" alt="Signature" className="w-1/3 hover:border-transparent" />
					</section>
					<br />
					<br />
				</div>
			</div>
		</div>
	)
}

export default About
