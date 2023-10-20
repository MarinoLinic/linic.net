import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'

const Socials = () => {
	const [loading, setLoading] = useState(true)

	let links = [
		['', 'Facebook', 'https://www.facebook.com/marino.linic'],
		['', 'Twitter', 'https://twitter.com/MarinoLinic'],
		['', 'Instagram', 'https://instagram.com/marino.linic'],
		['', 'LinkedIn', 'https://www.linkedin.com/in/marino-linic/'],
		['', 'GitHub', 'https://github.com/MarinoLinic'],
		['', 'Unsplash', 'https://unsplash.com/@marinolinic'],
		['', 'iNaturalist', 'https://www.inaturalist.org/people/5691431'],
		['', 'Medium', 'https://marinolinic.medium.com/'],
		['', 'Goodreads', 'https://www.goodreads.com/user/show/76388574-marino-lini'],
		['', 'Wikipedia', 'https://en.wikipedia.org/wiki/User:LinicMarino'],
		['', 'YouTube (programming)', 'https://www.youtube.com/channel/UC-TXTkze3ZC7WBtzg6Z99jg'],
		['', 'YouTube (music)', 'https://www.youtube.com/channel/UC1nUn8ThCuFM_8VZijqnXyQ'],
		['', 'YouTube (entomology)', 'https://www.youtube.com/channel/UC_VLETxZwt9He99CBEMPXXg']
	]

	return (
		<>
			<Navigation />

			<div className={loading ? 'hidden' : ''}>
				<main className="flex flex-col justify-center items-center my-8 md:my-14">
					<img
						src="https://i.imgur.com/YWpVRdK.jpg"
						alt="Picture of me."
						className="w-36 h-36 rounded-full mb-4"
						onLoad={() => setLoading(false)}
					/>
					<div className="flex flex-col max-w-sm w-10/12">
						{links.map(([img, text, url]) => (
							<a className="text-text my-2" href={url}>
								<button className="w-full bg-slate-600 hover:text-stone-200 hover:border-stone-200">{text}</button>
							</a>
						))}
					</div>
					<section>
						<img src="WhiteSignature.svg" alt="Signature" className="w-32 mt-4 hover:border-transparent" />
					</section>
				</main>
			</div>
		</>
	)
}

export default Socials
