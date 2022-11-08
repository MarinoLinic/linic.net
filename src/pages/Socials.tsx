import { useState, useEffect } from 'react'

const Socials = () => {
	const [loading, setLoading] = useState(false)

	let links = [
		['', 'Facebook', 'https://www.facebook.com/marino.linic'],
		['', 'Twitter', 'https://twitter.com/MarinoLinic'],
		['', 'Instagram', 'https://instagram.com/marino.linic'],
		['', 'LinkedIn', 'https://www.linkedin.com/in/marino-linic/'],
		['', 'GitHub', 'https://github.com/MarinoLinic'],
		['', 'Unsplash', 'https://unsplash.com/MarinoLinic'],
		['', 'iNaturalist', 'https://www.inaturalist.org/people/5691431'],
		['', 'Medium', 'https://marinolinic.medium.com/'],
		['', 'Goodreads', 'https://www.goodreads.com/user/show/76388574-marino-lini'],
		['', 'YouTube (programming)', 'https://www.youtube.com/channel/UC-TXTkze3ZC7WBtzg6Z99jg'],
		['', 'YouTube (music)', 'https://www.youtube.com/channel/UC1nUn8ThCuFM_8VZijqnXyQ'],
		['', 'YouTube (entomology)', 'https://www.youtube.com/channel/UC_VLETxZwt9He99CBEMPXXg']
	]

	return (
		<>
			<div className={loading ? 'hidden' : ''}>
				<main className="flex flex-col justify-center items-center my-16 md:my-28">
					<img src="/ml2.jpg" alt="Picture of me" className="w-36 h-36 rounded-full mb-4" />
					<div className="flex flex-col max-w-sm w-10/12">
						{links.map(([img, text, url]) => (
							<a className="text-text my-2" href={url}>
								<button className="w-full">{text}</button>
							</a>
						))}
					</div>
					<section>
						<img src="WhiteSignature.svg" alt="Signature" className="w-32 mt-4" />
					</section>
				</main>
			</div>
		</>
	)
}

export default Socials
