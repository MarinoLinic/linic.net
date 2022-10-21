const About = () => {
	let age: number = 23
	let habitat: string = 'Rijeka, Croatia'
	let habitatAddition: string | undefined = ', where I was also born'
	let species: number = 617
	let observations: number = 1202
	return (
		<div className="flex flex-col items-center justify-center md:mt-16 mt-8 md:mx-0 mx-8">
			<div className="md:w-1/3 w-full flex flex-col">
				<div>
					<h1>About</h1>
				</div>
				<br />
				<section>
					<div>
						<p>
							I am {age}
							<sup className="text-quarternary hover:cursor-help">?</sup> years old and currently reside in{' '}
							{habitat}
							{habitatAddition}.
						</p>
						<br />
						<p>
							As you can probably tell, I really seem to have taken a liking to JavaScript, React, and all things
							web. I attended the University of Rijeka with a major in Informatics, but gained focus upon my
							personal initiative to learn web development.
						</p>
						<br />
					</div>
					<p>
						The remainder of the page will contain further references to my projects and work including hobbies.
					</p>
				</section>
				<br />
				<br />
				<section>
					<h2>Socials</h2>
					<br />
					<p>Ok, so... I have a lot of these things.</p>
				</section>
				<br />
				<br />
				<section>
					<h2>Computer Science</h2>
					<br />
					<p>Under construction.</p>
				</section>
				<br />
				<br />
				<section>
					<h2>Music</h2>
					<br />
					<p>
						I come from a somewhat musical family. This helped me start singing early, and I learned fundamental
						music theory and playing the piano when I was a child. At 19, I decided to learn to play the guitar,
						and at 21 I started taking singing seriously.
					</p>
					<br />
					<p>
						Music is an enormous part of my life, whether it is background music I listen to at least 50% of my
						waking time or florid music I am blown away by. Performing music never seems to be able to leave my
						life.
					</p>
					<br />
					<p>
						One of my projects to help practice composing relates to my love of Nintendo 64 games I grew up
						playing. It seems like I need to really have a proper close to that chapter of my life. Unfortunately,
						I am busy with other things and it seems it will take a few years. Here's a sample of me beginning to
						remaster
						<a href="https://www.youtube.com/watch?v=id0kbyKCG8c"> Fairy Fountain</a> from The Legend of Zelda:
						Ocarina of Time:
					</p>
					<br />
					<audio controls src="/Fairy Fountain.mp3"></audio>
					<br />
					<p>
						Of course, I also invested some time in creating song covers. That whole thing is also at a pause, but
						I do have<a href="https://www.youtube.com/channel/UC1nUn8ThCuFM_8VZijqnXyQ"> a YouTube channel </a>and
						will be populating it with videos at some point. Here's another sample:
					</p>
					<br />
					<iframe
						title="Me singing Falling in Love"
						className="w-full h-auto md:h-[300px]"
						src="https://www.youtube.com/embed/Pu8hpzilROI"
					/>
				</section>
				<br />
				<br />
				<section>
					<h2>Photography</h2>
					<br />
					<p>
						Photography's also a big one. But I am sort of disappointed with it. I'll make my own portfolio on this
						site as well, but currently the best way to see it is to go to my
						<a href="https://unsplash.com/MarinoLinic"> Unsplash account</a>. I've got
						<strong> over a million views and 5k downloads </strong>on my photos. I also have an old
						<a href="https://www.viewbug.com/member/MarinoLinic"> ViewBug account </a>from when I was a teenager.
					</p>
					<br />
					<p>
						But I think a proper way to show my photography would actually be to display a video I filmed on my...
						phone... when I was 17.
					</p>
					<br />
					<iframe
						title="Jadransko more"
						className="w-full h-auto md:h-[300px]"
						src="https://www.youtube.com/embed/jCOIRbg6zIU"
					/>
					<small className="text-gray-400">(I'm a fan of diving.)</small>
				</section>
				<br />
				<br />
				<section>
					<h2>Graphic Design</h2>
					<br />
					<p>Under construction.</p>
				</section>
				<br />
				<br />
				<section>
					<h2>Zoology</h2>
					<br />
					<img
						alt="Me holding a scorpion"
						className="md:object-cover object-scale-down w-full h-auto"
						src="https://i.imgur.com/xLWm8Uu.jpg"
					/>
					<small className="text-gray-400">
						Me handling <em>Euscorpius italicus</em>. They <em>never</em> sting.
					</small>
					<br />
					<br />
					<p>
						Zoology—and entomology and arachnology in particular—shaped my childhood and early adolescence, and I
						suppose I won't let an introduction get away without it.
					</p>
					<br />
					<p>
						When I was 14, I stumbled upon a male specimen of{' '}
						<i>
							<a href="https://inaturalist.nz/observations/117533411">Trigonidium cicindeloides</a>
						</i>
						. It turned out this was the first confirmation of the species' existence in Croatia in 50 years. It
						continues to be the only observation on the island of Pašman and the first on an Adriatic island. My
						name appears in{' '}
						<a href="https://zenodo.org/record/5993822">
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
					<p>
						I had documented
						<a href="https://www.inaturalist.org/lifelists/marinolinic?view=tree"> {species} species</a> with a
						total of {observations} observations in Croatia and Denmark. I should note that the period in which I
						went ahead and uploaded these findings (mostly including my archives from a decade ago) was brief and
						lasted two months, but I quickly became the top 15 user in the country with one
						<a href="https://www.inaturalist.org/observations/121820870"> global first</a> observation on the site,
						which at this time is no longer the only one. I also bundled together findings that were the first for
						Croatia at the time of upload
						<a href="https://www.inaturalist.org/observations?q=marinoliniccrofirst&search_on=tags"> here</a>.
						Quite an interesting bunch.
					</p>
					<br />
					<p>
						If you're wondering how difficult identifying many arachnid and insect species is,
						<a href="https://www.inaturalist.org/observations/122109349"> check out this thread</a> I wrote on the
						wolf spider genus <em>Trochosa</em>.
					</p>
					<br />
					<p>
						I also have an entire
						<a href="https://www.youtube.com/channel/UC_VLETxZwt9He99CBEMPXXg"> YouTube channel</a> dedicated to
						this hobby.
					</p>
					<br />
					<p>
						If things turned out differently, I might've had a career in this field, but alas, there are better
						things to do!
					</p>
					<br />
					<p>
						Here's one of the last videos I made before deciding I wasn't going to actively spend time on zoology.
						In this case, anyhow, herpetology.
					</p>
					<br />
					<iframe
						title="Me handling a European cat snake"
						className="w-full h-auto md:h-[300px]"
						src="https://www.youtube.com/embed/EitN8LWrQyw"></iframe>
					<br />
					<small className="text-gray-400">
						(As a side note, considering that, at the time of that recording, I had never set foot in the US and
						wasn't a native speaker, people have wondered how I was able to emulate a native US English accent. I
						believe this is intimately related to musicality. Acting, singing, and controlling pronunciation seem
						to be all correlated. I learned this accent by the time I was 12-13 years old, and got it from cinema.
						Languages come naturally to me, albeit I<em> am </em>only bilingual.)
					</small>
				</section>
				<br />
				<br />
				<section>
					<h4>Little Things</h4>
					<br />
					<p>
						If you want to see my{' '}
						<a href="https://www.goodreads.com/review/list/76388574-marino-lini?shelf=favorites">favorite books</a>{' '}
						and <a href="https://www.goodreads.com/review/list/76388574?shelf=read">most books</a> I read.
					</p>
					<p>
						If you want to see my{' '}
						<a href="https://www.grouvee.com/user/134107-MarinoLinic/shelves/750437-favorites/">favorite games</a>{' '}
						and <a href="https://www.grouvee.com/user/134107-MarinoLinic/shelves/750433-played/">most games</a> I
						played.
					</p>
					<p>
						If you want to see my{' '}
						<a href="https://www.imdb.com/list/ls560084407/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=a4427706-4769-4e8a-b171-a3da8f928c6e&pf_rd_r=VC1YX8844VZG0ABWC4ZQ&pf_rd_s=right-4&pf_rd_t=48201&pf_rd_i=watchlist&ref_=wt_otl_5">
							favorite cinema
						</a>{' '}
						and{' '}
						<a href="https://www.imdb.com/user/ur93515176/watchlist?sort=list_order%2Casc&view=detail">
							most cinema
						</a>{' '}
						I watched.
					</p>
					<p>I care about economics, philosophy, genetics, history, and geography.</p>
				</section>
				<br />
				<br />
				<br />
				<br />
				<section className="flex justify-center">
					<img src="WhiteSignature.svg" alt="Signature" className="w-1/3" />
				</section>
				<br />
				<br />
			</div>
		</div>
	)
}

export default About
