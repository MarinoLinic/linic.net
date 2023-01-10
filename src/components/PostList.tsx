import { Link } from 'react-router-dom'
import postList from '../assets/rgPosts.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const PostList = () => {
	const excerptList = postList.map((post) => {
		return post.content.split(' ').slice(0, 10).join(' ')
	})
	return (
		<div className="md:mt-20 md:mx-20 mt-12 mx-12">
			<h1 className="mb-2 md:text-start text-center">UNIRI: Računalna grafika</h1>
			<h5 className="mt-8 md:mt-0 md:text-start text-center">
				Ovo je blog{' '}
				<Link to="/" className="text-quarternary hover:text-quarternary">
					Marina Linića
				</Link>{' '}
				(ak. g. 2022/23) za dokumentaciju projekata iz kolegija Računalna grafika.{' '}
				<a href="https://drive.google.com/drive/folders/1-EbQyVuDqMYiLW8L-u4AKm74FNmhQTF7?usp=share_link">Ovdje</a>{' '}
				se nalazi direktorij na Google Disku.
			</h5>
			<div className="grid grid-cols-1 md:grid-cols-3 my-16 gap-8 md:gap-48">
				{postList.length &&
					postList.map((post, i) => {
						return (
							<div>
								<h2>
									<Link className="text-text hover:text-text" to={`/rg/${post.id}`}>
										{post.title}
									</Link>
								</h2>
								<Link to={`/rg/${post.id}`}>
									<img
										src={post.image}
										alt="Post image"
										className="object-scale-down mt-2 w-full h-2/3 grayscale hover:grayscale-0"
									/>
								</Link>
								<small>
									<Link className="text-quarnary hover:text-quarnary" to={`/rg/${post.id}`}>
										{post.date}
									</Link>
								</small>
								<ReactMarkdown children={excerptList[i]} />
								<small>
									<Link to={`/rg/${post.id}`}>Nastavite čitati...</Link>
								</small>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default PostList
