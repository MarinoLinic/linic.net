import postList from '../assets/rgPosts.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const PostList = () => {
	const excerptList = postList.map((post) => {
		return post.content.split(' ').slice(0, 20).join(' ')
	})
	return (
		<div className="md:mt-20 md:mx-20 mt-12 mx-12">
			<h1 className="mb-2 md:text-start text-center">UNIRI: Računalna grafika</h1>
			<h5 className="mt-8 md:mt-0 md:text-start text-center">
				Ovo je blog{' '}
				<a href="/" className="text-quarternary hover:text-quarternary">
					Marina Linića
				</a>{' '}
				(ak. g. 2022/23) za dokumentaciju projekata iz kolegija Računalna grafika.
			</h5>
			<div className="grid grid-cols-1 md:grid-cols-3 my-16 gap-10">
				{postList.length &&
					postList.map((post, i) => {
						return (
							<div>
								<h2>
									<a className="text-text hover:text-text" href={`/rg/${post.id}`}>
										{post.title}
									</a>
								</h2>
								<small>
									<a className="text-quarnary hover:text-quarnary" href={`/rg/${post.id}`}>
										{post.date}
									</a>
								</small>
								<ReactMarkdown children={excerptList[i]} />
								<small>
									<a href={`/rg/${post.id}`}>Nastavite čitati...</a>
								</small>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default PostList
